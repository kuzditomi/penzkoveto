import { AppState } from "../../app.reducer";
import { statisticsAction, ACTION_LOAD_STATISTICS_START, ACTION_LOAD_STATISTICS_START_SUCCESS } from "./statistics.actions";
import { IStatistics } from "../../Models/statistics";

export function statisticsReducer(state: AppState, action: statisticsAction): Loading<IStatistics> {
    switch(action.type){
        case ACTION_LOAD_STATISTICS_START:
            return "loading";
        case ACTION_LOAD_STATISTICS_START_SUCCESS:
            return action.statistics
    }

    return state.statistics;
}

export function defaultStatisticsState(): Loading<IStatistics> {
    return undefined;
}