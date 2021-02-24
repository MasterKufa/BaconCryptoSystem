import { handleActions } from "redux-actions"
import { setMode } from "./actions"

export enum Modes {
    CRYPTO,
    STENO
}
type State = {
    mode: Modes
}
export const defaultState: State ={
    mode: Modes.CRYPTO
}

export const reducer = handleActions<any, any>({
    [setMode as any]: (state, {payload}) => ({
        ...state, mode: payload
    })
}, defaultState)