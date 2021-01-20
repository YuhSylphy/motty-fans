import { Paper, Typography } from "@material-ui/core";

import * as React from "react";
import Markdown from "react-markdown";

const markdown = `
# Header

## section

* A
* B
  * B-1
  * **B-2**
`;

export const ChangeLog: React.FC = () => {
  return (
    <React.Fragment>
      <Typography variant="h4">更新</Typography>
      <Paper>
        <Markdown source={markdown} />
      </Paper>
    </React.Fragment>
  );
};
