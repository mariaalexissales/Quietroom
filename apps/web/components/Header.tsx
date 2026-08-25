import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Menu, User } from "lucide-react";

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          "& .MuiIconButton-root, & .MuiButton-root": { color: "inherit" },
        }}
      >
        <Box sx={{ justifySelf: "start" }}>
          <IconButton>
            <Menu />
          </IconButton>
        </Box>
        <Button variant="text">
          <Typography sx={{ justifySelf: "center" }}>Quiet Room</Typography>
        </Button>
        <Box sx={{ justifySelf: "end" }}>
          <IconButton>
            <User />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
