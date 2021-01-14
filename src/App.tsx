import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Family } from "./features/family/Family";
import { Http404 } from "./features/errors/404";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { MenuOutlined } from "@material-ui/icons";
import { MareLine } from "./features/mare-line/MareLine";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          disabled={true}
        >
          <MenuOutlined />
        </IconButton>
        <Typography variant="h6">MOTTV Derby</Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};

const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <Box display="flex" justifyContent="flex-end" margin={theme.spacing(0.2)}>
      <Link href="https://www.youtube.com/user/MOTTYGAMES/" target="__blank">
        MOTTV
      </Link>
    </Box>
  );
};

export const App: React.FC = () => {
  const theme = useTheme();
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <React.Fragment>
        <Header />
        <Box margin={theme.spacing(0.5)}>
          <Switch>
            <Route path="/family">
              <Family />
            </Route>
            <Route path="/mare-line">
              <MareLine />
            </Route>
            <Route exact path="/">
              <Redirect to="/family" />
            </Route>
            <Route>
              <Http404 />
            </Route>
          </Switch>
        </Box>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
};
