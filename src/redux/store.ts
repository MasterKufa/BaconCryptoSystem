import { createStore } from "redux"
import { defaultState, reducer } from "./reducer"

export const store = createStore(
  reducer,
  defaultState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)
