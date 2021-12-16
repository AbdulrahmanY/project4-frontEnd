import { createStore, combineReducers } from "redux";

import usersReducer from "./users/reducer";

const reducers = combineReducers({ usersReducer });
const store = createStore(reducers);

export default store;