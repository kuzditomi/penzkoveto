import { Action } from "redux";
import { IStatistics } from "../../Models/statistics";
import { Repository } from "../../Shared/Repository/Repository";

export const ACTION_LOAD_STATISTICS_START = 'STATISTICS_LOAD_START';
export const ACTION_LOAD_STATISTICS_START_SUCCESS = 'STATISTICS_LOAD_SUCCESS';

export interface IActionStatisticsLoadStart extends Action {
    type: 'STATISTICS_LOAD_START',
}

export interface IActionStatisticsLoadSuccess extends Action {
    type: 'STATISTICS_LOAD_SUCCESS',
    statistics: IStatistics
}

export type statisticsAction = IActionStatisticsLoadStart | IActionStatisticsLoadSuccess;

export function dispatchStatistiscLoad(): IActionStatisticsLoadStart {
    return {
        type: ACTION_LOAD_STATISTICS_START
    };
}

export function dispatchStatisticsLoadSuccess(statistics: IStatistics): IActionStatisticsLoadSuccess {
    return {
        type: ACTION_LOAD_STATISTICS_START_SUCCESS,
        statistics
    };
}

export function loadStatistics() {
    return (dispatch: any) => {
        dispatch(dispatchStatistiscLoad());

        Repository.Instance.GetStatistics()
            .then((statistics: IStatistics) => {
                dispatch(dispatchStatisticsLoadSuccess(statistics))
            });
            // .catch(() => {
            //     dispatch(dispatchTokenFailed());
            // });
    }
}