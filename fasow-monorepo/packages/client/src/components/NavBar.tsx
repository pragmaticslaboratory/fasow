import { Campaign } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function NavBar() {
  const handleOpenUserMenu = () => {
    window.location.href = "https://github.com/sasow-org/sasow-ts/";
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #0069c0, #2196f3)",
      }}
    >
      <Toolbar>
        <Campaign fontSize="large" />
        <Typography
          variant="h6"
          component="a"
          sx={{
            ml: 2,
            flexGrow: 1,
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Flexible Agent Simulator for Open WOM
        </Typography>
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ color: "white", mr: 2, ":hover": { borderRadius: 1 } }}
        >
          <GitHubIcon />
          <Typography
            variant="body2"
            color="white"
            sx={{
              ml: 1,
              flexGrow: 1,
              fontWeight: 500,
              opacity: 0.8,
            }}
          >
            Open in GitHub
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
