import { Epic, combineEpics } from "redux-observable";
import { mergeMap } from "rxjs/operators";

import { horseDefsActions, HorseDefsAction } from ".";
import { fetchHorseDefs } from "./core/horse";

export const fetchDefsEpic: Epic<HorseDefsAction> = (action$) =>
  action$
    .ofType(horseDefsActions.init.type)
    .pipe(
      mergeMap(async () =>
        horseDefsActions.set({ list: await fetchHorseDefs() })
      )
    );

export const epic = combineEpics(fetchDefsEpic);
