import { Epic, combineEpics } from "redux-observable";

import { changeLogActions, ChangeLogAction } from "..";
import { withIndicator, IndicatorAction } from "../../indicator";
import { fetchChangeLogs } from "./logic";

export const fetchDefsEpic: Epic<
  ChangeLogAction | IndicatorAction,
  ChangeLogAction | IndicatorAction
> = (action$) =>
  action$
    .ofType(changeLogActions.init.type)
    .pipe(
      withIndicator("change-logs/fetch", async () =>
        changeLogActions.set(await fetchChangeLogs())
      )
    );

export const epic = combineEpics(fetchDefsEpic);
