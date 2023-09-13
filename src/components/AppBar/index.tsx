import { IconButton, AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";
import { ThemeToggle } from "../ThemeToggle";

interface IProps {
  pageTitle: string;
}

const AppBar: React.FC<IProps> = ({ pageTitle }) => {
  return (
    <MuiAppBar>
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          {pageTitle}
        </Typography>
        <ThemeToggle />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
