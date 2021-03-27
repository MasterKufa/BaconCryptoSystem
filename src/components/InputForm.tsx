import React, { useState } from "react"
import "./InputForm.scss"
import Checkbox from "@material-ui/core/Checkbox"
import { FormControlLabel } from "@material-ui/core"
import cn from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { DecryptKeys, Modes, State } from "../redux/reducer"
import { setCryptInput, setDeCryptInput, setDecryptKey } from "../redux/actions"
import { uniq } from "ramda"
import { firstRegimeCryptFactory } from "../CryptoBox/CryptoBoxFirst"
import { EnglishCodes, EnglishLetters, RussianLetters } from "../CryptoBox/PreparedData"
import { Subject } from "rxjs"

type Regime = "encrypt" | "decrypt"
const prepareInput = (str: string) =>
  str
    .replaceAll(/\s+/g, " ")
    .replaceAll(/\s*\/\s*/g, "/")
    .trim()
export const OutputSubject = new Subject()
export const InputForm = () => {
  const { CryptInput, DeCryptInput, decryptKey, LetterCodes, mode, Letters, K1, K2 } = useSelector<State, State>(
    (s) => s
  )
  const dispatch = useDispatch()
  const [regime, setRegime] = useState<Regime>("encrypt")
  const setNewRegime = (r: Regime) => {
    if (regime !== r) {
      setRegime(r)
    }
  }
  const onStartClick = () => {
    console.log(decryptKey === DecryptKeys.K1 ? K1 : K2)
    dispatch(setCryptInput(prepareInput(CryptInput)))
    dispatch(setDeCryptInput(prepareInput(DeCryptInput)))
    OutputSubject.next({ stepType: "clear" })
    if (mode === Modes.CRYPTO && regime === "encrypt") {
      firstRegimeCryptFactory(
        Letters,
        LetterCodes,
        decryptKey === DecryptKeys.K1 ? K1 : K2,
        0
      )(prepareInput(CryptInput), (x) => OutputSubject.next(x))
    }
    if (mode === Modes.CRYPTO && regime === "decrypt") {
      firstRegimeCryptFactory(
        Letters,
        LetterCodes,
        decryptKey === DecryptKeys.K1 ? K1 : K2,
        1
      )(prepareInput(DeCryptInput), (x) => OutputSubject.next(x))
    }
  }
  const isCodeDuplicateError = LetterCodes.length !== uniq(LetterCodes).length
  const hasOtherSymbols = [...CryptInput].some((x) => ![...EnglishLetters, " "].includes(x.toUpperCase()))
  const hasOtherSymbolsDecrypt = [...DeCryptInput].some((x) => ![...EnglishLetters, " ", "/"].includes(x.toUpperCase()))
  const isRunError =
    isCodeDuplicateError ||
    (mode === Modes.CRYPTO && regime === "encrypt" && (!CryptInput || hasOtherSymbols)) ||
    (mode === Modes.CRYPTO && regime === "decrypt" && (!DeCryptInput || hasOtherSymbolsDecrypt))
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className="InputForm"
    >
      <div className="InputRegimeHeader">Выберите режим и параметры</div>
      <div className="InputRegime" onClick={() => setNewRegime("encrypt")}>
        <div className={cn({ RegimeDisabled: regime !== "encrypt" })} />
        <div className="InputRegimeText">Зашифровать</div>
        <div className="InputWrapper">
          <label htmlFor="InputText">Исходное сообщение</label>
          <input
            type="text"
            onChange={(x) => dispatch(setCryptInput(x.target.value))}
            value={CryptInput}
            placeholder="Текст для шифрования"
            id="InputText"
          />
          <div className={cn("inputCryptError", { noDisplay: CryptInput })}>Не может быть пусто</div>
          <div
            className={cn("inputCryptError", {
              noDisplay: !hasOtherSymbols
            })}
          >
            Уберите посторонние символы
          </div>
          <div className={cn("inputCryptError", { noDisplay: !CryptInput || hasOtherSymbols })}></div>
        </div>
      </div>
      <div className="InputRegime" onClick={() => setNewRegime("decrypt")}>
        <div className={cn({ RegimeDisabled: regime !== "decrypt" })} />
        <div className="InputRegimeText">Расшифровать</div>
        <label htmlFor="InputText">Исходное сообщение</label>
        <input
          type="text"
          onChange={(x) => dispatch(setDeCryptInput(x.target.value))}
          value={DeCryptInput}
          placeholder="Текст для расшифровки"
          id="InputText"
        />
        <div className={cn("inputCryptError", { noDisplay: DeCryptInput })}>Не может быть пусто</div>
        <div
          className={cn("inputCryptError", {
            noDisplay: !hasOtherSymbolsDecrypt
          })}
        >
          Уберите посторонние символы
        </div>
        <div className={cn("inputCryptError", { noDisplay: !DeCryptInput || hasOtherSymbolsDecrypt })}></div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                size="medium"
                checked={decryptKey === DecryptKeys.K1}
                onChange={() => {
                  dispatch(setDecryptKey(DecryptKeys.K1))
                }}
              />
            }
            label="Ключ 1"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="medium"
                checked={decryptKey === DecryptKeys.K2}
                onChange={() => {
                  dispatch(setDecryptKey(DecryptKeys.K2))
                }}
              />
            }
            label="Ключ 2"
          />
        </div>
      </div>
      <div className="InputButtonContainer">
        <div
          onClick={onStartClick}
          className={cn("CryptButton", {
            error: isRunError
          })}
        >
          Поехали!
        </div>
        <div className={cn("DuplicateCodeError", { hidden: !isCodeDuplicateError })}>
          Колонка КОД содержит повторения
        </div>
      </div>
    </form>
  )
}
