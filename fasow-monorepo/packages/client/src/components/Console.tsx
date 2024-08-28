import React, { useEffect, useState } from "react";

import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Console as ConsoleFeed, Hook, Unhook } from "console-feed";
import { Message as ComponentMessage } from "console-feed/lib/definitions/Component";
import { HookedConsole, Message } from "console-feed/lib/definitions/Console";

export default function Console() {
  const [logs, setLogs] = useState<Message[]>([]);

  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => {
      Unhook(window.console as HookedConsole);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
        This console will show the logs when the experiment is running.
      </Typography>
      {logs.length ? (
        <>
          <Box sx={{ display: "flex", flex: 1 }}>
            <ConsoleFeed logs={logs as ComponentMessage[]} />
          </Box>
          <Button variant="outlined" onClick={() => setLogs([])}>
            <Add />
            Clear logs
          </Button>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1">No logs</Typography>
          <Typography variant="subtitle2" color="GrayText">
            Start an experiment to get logs
          </Typography>
        </Box>
      )}
    </Box>
  );
}
