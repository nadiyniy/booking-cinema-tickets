enum SessionStateEnum {
    SET_SELECTED_DATE = 'SET_SELECTED_DATE',
    SET_SELECTED_SESSION = 'SET_SELECTED_SESSION',
    SET_SESSIONS = 'SET_SESSIONS',
    GET_SESSIONS = 'GET_SESSIONS',
    GET_DATE_SUCCESS = 'GET_DATE_SUCCESS',
    GET_SESSIONS_SUCCESS = 'GET_SESSIONS_SUCCESS'
}
type SetSelectedDateAction = {
    type: SessionStateEnum.SET_SELECTED_DATE;
    payload: string;
};

type SetSelectedSessionAction = {
    type: SessionStateEnum.SET_SELECTED_SESSION;
    payload: string;
};

type GetDateSuccessAction = {
    type: SessionStateEnum.GET_DATE_SUCCESS;
    payload: string[];
};

type GetSessionsAction = {
    type: SessionStateEnum.GET_SESSIONS;
};

type GetSessionsSuccessAction = {
    type: SessionStateEnum.GET_SESSIONS_SUCCESS;
    payload: string[];
};
export type SessionActionTypes =
    | SetSelectedDateAction
    | SetSelectedSessionAction
    | GetDateSuccessAction
    | GetSessionsAction
    | GetSessionsSuccessAction;
