import { createAction } from "redux-actions"
import { DecryptKeys, Modes } from "./reducer"
export const setMode = createAction<Modes>("SET_MODE")
export const setCodes = createAction<string[]>("SET_CODES")
export const setLetters = createAction<string[]>("SET_LETTERS")
export const setK1 = createAction<string[]>("SET_K1")
export const setK2 = createAction<string[]>("SET_K2")
export const setCryptInput = createAction<string>("SET_CRYPT_INPUT")
export const setDeCryptInput = createAction<string>("SET_DECRYPT_INPUT")

export const setDecryptKey = createAction<DecryptKeys>("SET_DecryptKey")
