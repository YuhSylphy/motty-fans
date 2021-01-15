import * as React from "react";
import { Paper, Typography } from "@material-ui/core";

import { MareLineTree } from "./components/MareLineTree";

export const MareLine: React.FC = () => {
  return (
    <React.Fragment>
      <Typography variant="h4">牝系図</Typography>
      <Paper>
        <MareLineTree />
      </Paper>
    </React.Fragment>
  );
};
