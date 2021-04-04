import React, { useState } from "react"
import "./InputForm.scss"
import Checkbox from "@material-ui/core/Checkbox"
import { FormControlLabel } from "@material-ui/core"
import cn from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { CryptoTransformator, DecryptKeys, Modes, State } from "../redux/reducer"
import {
  setCryptInput,
  setCryptoTransformator,
  setDeCryptInput,
  setDecryptKey,
  setStenoContainer
} from "../redux/actions"
import { mapObjIndexed, uniq } from "ramda"
import { firstRegimeCryptFactory } from "../CryptoBox/CryptoBoxFirst"
import { EnglishCodes, EnglishLetters, RussianLetters } from "../CryptoBox/PreparedData"
import { Subject } from "rxjs"
import { secondRegimeCryptFactory, secondRegimeDeCryptFactory } from "../CryptoBox/CryptoBoxSecond"
import { getTransformator } from "../CryptoBox/CryptoTransformators"

export type Regime = "encrypt" | "decrypt"
const prepareInput = (str: string) =>
  str
    .replaceAll(/\s+/g, " ")
    .replaceAll(/\s*\/\s*/g, "/")
    .trim()

export const OutputSubject = new Subject()
export const InputForm = () => {
  const {
    CryptInput,
    DeCryptInput,
    decryptKey,
    LetterCodes,
    mode,
    Letters,
    K1,
    K2,
    cryptoTransformator,
    stenoContainer
  } = useSelector<State, State>((s) => s)
  const dispatch = useDispatch()
  const [regime, setRegime] = useState<Regime>("encrypt")
  const setNewRegime = (r: Regime) => {
    if (regime !== r) {
      setRegime(r)
    }
  }
  const onStartClick = () => {
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
    // if (mode === Modes.STENO && regime === "encrypt") {
    //   secondRegimeCryptFactory(Letters, LetterCodes, getTransformator(cryptoTransformator, regime))(
    //     prepareInput(CryptInput),
    //     6,
    //     (x) => OutputSubject.next(x)
    //   )
    // }
  }
  const isCodeDuplicateError = LetterCodes.length !== uniq(LetterCodes).length
  const hasOtherSymbols = [...CryptInput].some((x) => ![...EnglishLetters, " "].includes(x.toUpperCase()))
  const hasOtherSymbolsDecrypt = [...DeCryptInput].some((x) => ![...EnglishLetters, " ", "/"].includes(x.toUpperCase()))
  const hasOtherSymbolsSteno = [...CryptInput].some((x) => ![...Letters, " "].includes(x.toUpperCase()))
  const minStenoLenCont = CryptInput.replaceAll(/\s/g, "").length * 6
  const StenoContainerLen = stenoContainer.length >= minStenoLenCont
  const isRunError =
    isCodeDuplicateError ||
    (mode === Modes.CRYPTO && regime === "encrypt" && (!CryptInput || hasOtherSymbols)) ||
    (mode === Modes.CRYPTO && regime === "decrypt" && (!DeCryptInput || hasOtherSymbolsDecrypt)) ||
    (mode === Modes.STENO && regime === "encrypt" && (!StenoContainerLen || hasOtherSymbolsSteno || !CryptInput))
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className="InputForm"
    >
      <div className="InputRegimeHeader">Выберите {mode === Modes.CRYPTO ? "режим и" : ""}параметры</div>
      <div className={"InputRegime" + (mode === Modes.STENO ? " Steno" : "")} onClick={() => setNewRegime("encrypt")}>
        <div className={cn({ RegimeDisabled: regime !== "encrypt" && mode === Modes.CRYPTO })} />
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
        {mode === Modes.STENO && (
          <div className="InputWrapper">
            <label htmlFor="ContainerText">Контейнер</label>
            <textarea
              onChange={(x) => dispatch(setStenoContainer(x.target.value))}
              value={stenoContainer}
              placeholder="Текст-контейнер"
              id="ContainerText"
            />
            <div className={cn("inputCryptError", { noDisplay: StenoContainerLen })}>
              Некорректная длина контейнера (&lt; {minStenoLenCont})
            </div>
            <div
              className={cn("inputCryptError", {
                noDisplay: !hasOtherSymbolsSteno
              })}
            >
              Уберите посторонние символы
            </div>
            <div className={cn("inputCryptError", { noDisplay: !StenoContainerLen || hasOtherSymbolsSteno })}></div>
          </div>
        )}
      </div>
      <div className="InputRegime" onClick={() => setNewRegime("decrypt")}>
        {mode === Modes.CRYPTO ? (
          <>
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
          </>
        ) : (
          <div className="StenoCheckboxes">
            <FormControlLabel
              control={
                <Checkbox
                  size="medium"
                  checked={cryptoTransformator === CryptoTransformator.case}
                  onChange={() => {
                    dispatch(setCryptoTransformator(CryptoTransformator.case))
                  }}
                />
              }
              label="Загл./строч. буквы"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="medium"
                  checked={cryptoTransformator === CryptoTransformator.color}
                  onChange={() => {
                    dispatch(setCryptoTransformator(CryptoTransformator.color))
                  }}
                />
              }
              label="Красный/Черный цвет"
            />

            <FormControlLabel
              control={
                <Checkbox
                  size="medium"
                  checked={cryptoTransformator === CryptoTransformator.font}
                  onChange={() => {
                    dispatch(setCryptoTransformator(CryptoTransformator.font))
                  }}
                />
              }
              label="TNR/Arial"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="medium"
                  checked={cryptoTransformator === CryptoTransformator.italic}
                  onChange={() => {
                    dispatch(setCryptoTransformator(CryptoTransformator.italic))
                  }}
                />
              }
              label="Прямой/Курсив"
            />
          </div>
        )}
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
