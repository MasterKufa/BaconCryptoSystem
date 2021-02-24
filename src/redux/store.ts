import { createStore } from "redux";
import { defaultState, reducer } from "./reducer";

export const store = createStore(reducer, defaultState)