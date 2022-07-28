import {combineReducers, createStore} from "redux";
import AppReducer from "./reducers/AppReducer";

let reducers = combineReducers({
    AppComponent: AppReducer
})

let store = createStore(reducers);
window.store = store;

export default store;