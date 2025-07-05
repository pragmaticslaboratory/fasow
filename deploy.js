const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const API_DIR = path.join(__dirname, 'fasow-api');
const UI_DIR = path.join(__dirname, 'fasow-ui');
const API_PORT = process.env.API_PORT || 3001;
const UI_PORT = process.env.UI_PORT || 3000;

// Function to check if a directory exists
function directoryExists(dir) {
    try {
        return fs.statSync(dir).isDirectory();
    } catch (err) {
        return false;
    }
}

// Function to start a process
function startProcess(name, dir, command, args) {
    console.log(`Starting ${name}...`);

    if (!directoryExists(dir)) {
        console.error(`Error: Directory ${dir} does not exist`);
        return null;
    }

    const process = spawn(command, args, {
        cwd: dir,
        stdio: 'pipe',
        shell: true
    });

    process.stdout.on('data', (data) => {
        console.log(`[${name}] ${data.toString().trim()}`);
    });

    process.stderr.on('data', (data) => {
        console.error(`[${name}] ${data.toString().trim()}`);
    });

    process.on('close', (code) => {
        console.log(`[${name}] process exited with code ${code}`);
    });

    return process;
}

// Main function
async function main() {
    console.log('Fasow Deployment Script');
    console.log('======================');
    console.log(`API will run on port: ${API_PORT}`);
    console.log(`UI will run on port: ${UI_PORT}`);
    console.log('======================\n');

    // Start API
    const apiProcess = startProcess('fasow-api', API_DIR, 'npm', ['run', 'start:dev']);

    // Wait a moment for the API to start before the UI
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Start UI
    const uiProcess = startProcess('fasow-ui', UI_DIR, 'npm', ['run', 'dev']);

    // Handle termination signals
    const shutdown = () => {
        console.log('\nShutting down services...');
        if (apiProcess) apiProcess.kill();
        if (uiProcess) uiProcess.kill();
        process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

// Execute the main function
main().catch(err => {
    console.error('Deployment failed:', err);
    process.exit(1);
});