import { combineReducers } from "@reduxjs/toolkit";
import { AuthenticationReducer } from "./authentication.state";

const rootReducer = combineReducers({
    //reducerName: Reducer exported from slice
    authentication: AuthenticationReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;