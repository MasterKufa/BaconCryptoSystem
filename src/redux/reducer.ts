import { handleActions } from "redux-actions"
import { EnglishCodes, EnglishLetters, PreK1, PreK2, RussianLetters } from "../CryptoBox/PreparedData"
import { setCodes, setCryptInput, setDeCryptInput, setDecryptKey, setK1, setK2, setLetters, setMode } from "./actions"

export enum Modes {
  CRYPTO,
  STENO
}
export enum DecryptKeys {
  K1,
  K2
}
export type State = {
  mode: Modes
  decryptKey: DecryptKeys
  K1: string[]
  K2: string[]
  LetterCodes: string[]
  Letters: string[]
  CryptInput: string
  DeCryptInput: string
}
export const defaultState: State = {
  mode: Modes.CRYPTO,
  decryptKey: DecryptKeys.K1,
  K1: PreK1,
  K2: PreK2,
  LetterCodes: EnglishCodes,
  Letters: EnglishLetters,
  CryptInput: "",
  DeCryptInput: ""
}

export const reducer = handleActions<any, any>(
  {
    [setMode as any]: (state, { payload }) => ({
      ...state,
      mode: payload
    }),
    [setK1 as any]: (state, { payload }) => {
      console.log(state, payload)
      return {
        ...state,
        K1: payload
      }
    },
    [setK2 as any]: (state, { payload }) => ({
      ...state,
      K2: payload
    }),
    [setCryptInput as any]: (state, { payload }) => ({
      ...state,
      CryptInput: payload
    }),
    [setDeCryptInput as any]: (state, { payload }) => ({
      ...state,
      DeCryptInput: payload
    }),
    [setDecryptKey as any]: (state, { payload }) => ({
      ...state,
      decryptKey: payload
    }),
    [setCodes as any]: (state, { payload }) => ({
      ...state,
      LetterCodes: payload
    }),
    [setLetters as any]: (state, { payload }) => ({
      ...state,
      Letters: payload
    })
  },
  defaultState
)
