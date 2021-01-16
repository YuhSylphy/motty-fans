import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const Indicator: React.FC = () => {
  const classes = useStyles();
  const { awaits } = useSelector((state: RootState) => state.indicator);

  const waiting = useMemo(() => Object.values(awaits).some((x) => x > 0), [
    awaits,
  ]);

  return (
    <Backdrop className={classes.backdrop} open={waiting}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
