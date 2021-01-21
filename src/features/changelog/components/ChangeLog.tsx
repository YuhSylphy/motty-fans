import { Paper, Typography, createStyles, makeStyles } from "@material-ui/core";

import * as React from "react";
import Markdown from "react-markdown";

import "github-markdown-css";

const markdown = `
# Header

## section

* A
* B
  * B-1
  * **B-2**
`;

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
    },
  })
);

export const ChangeLog: React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h4">更新</Typography>
      <Paper className={classes.paper}>
        <Markdown source={markdown} />
      </Paper>
      <Paper className={classes.paper}>
        <Markdown source={markdown} className="markdown-body" />
      </Paper>
    </React.Fragment>
  );
};
