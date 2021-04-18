import { handleActions } from "redux-actions"
import {
  EnglishCodes,
  EnglishLetters,
  PreK1,
  PreK2,
  RussianCodes,
  RussianLetters,
  setEngCodes,
  setRusCodes
} from "../CryptoBox/PreparedData"
import {
  openHelp,
  setCodes,
  setCryptInput,
  setCryptoTransformator,
  setDeCryptInput,
  setDecryptKey,
  setFalsyMessage,
  setK1,
  setK2,
  setLetters,
  setMode,
  setStenoContainer
} from "./actions"

export enum Modes {
  CRYPTO,
  STENO
}
export enum DecryptKeys {
  K1,
  K2
}
export enum CryptoTransformator {
  case = "case",
  italic = "italic",
  color = "color",
  font = "font"
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
  isHelpOpened: boolean
  cryptoTransformator: CryptoTransformator
  stenoContainer: string
  FalsyMessage: string
}
export const defaultState: State = {
  mode: Modes.CRYPTO,
  decryptKey: DecryptKeys.K1,
  K1: PreK1,
  K2: PreK2,
  LetterCodes: EnglishCodes,
  Letters: EnglishLetters,
  CryptInput: "",
  DeCryptInput: "",
  isHelpOpened: false,
  cryptoTransformator: CryptoTransformator.case,
  stenoContainer: "",
  FalsyMessage: ""
}

export const reducer = handleActions<any, any>(
  {
    [setMode as any]: (state, { payload }) => {
      return {
        ...state,
        mode: payload,
        Letters: EnglishLetters,
        LetterCodes: EnglishCodes
      }
    },
    [setFalsyMessage as any]: (state, { payload }) => ({
      ...state,
      FalsyMessage: payload
    }),
    [openHelp as any]: (state, { payload }) => ({
      ...state,
      isHelpOpened: payload
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
    [setCryptoTransformator as any]: (state, { payload }) => ({
      ...state,
      cryptoTransformator: payload
    }),
    [setStenoContainer as any]: (state, { payload }) => ({
      ...state,
      stenoContainer: payload
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
    [setLetters as any]: (state, { payload }) => {
      if (state.Letters[0] === EnglishLetters[0]) {
        setEngCodes(state.LetterCodes)
      }
      if (state.Letters[0] === RussianLetters[0]) {
        setRusCodes(state.LetterCodes)
      }
      console.log("setLetters", payload)
      return {
        ...state,
        Letters: payload
      }
    }
  },
  defaultState
)
