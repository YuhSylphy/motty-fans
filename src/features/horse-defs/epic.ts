import { Epic, combineEpics } from "redux-observable";

import { horseDefsActions, HorseDefsAction } from ".";
import { withIndicator, IndicatorAction } from "../indicator";
import { fetchHorseDefs } from "./core/horse";

export const fetchDefsEpic: Epic<
  HorseDefsAction | IndicatorAction,
  HorseDefsAction | IndicatorAction
> = (action$) =>
  action$
    .ofType(horseDefsActions.init.type)
    .pipe(
      withIndicator("horse-defs/fetch", async () =>
        horseDefsActions.set({ list: await fetchHorseDefs() })
      )
    );

export const epic = combineEpics(fetchDefsEpic);
