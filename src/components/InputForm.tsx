import React, { useState } from "react"
import "./InputForm.scss"
import Checkbox from "@material-ui/core/Checkbox"
import { FormControlLabel } from "@material-ui/core"
import cn from "classnames"

type Regime = "encrypt" | "decrypt"
type DecryptKey = "K1" | "K2"

export const InputForm = () => {
  const [regime, setRegime] = useState<Regime>("encrypt")
  const setNewRegime = (r: Regime) => {
    if (regime !== r) {
      setRegime(r)
    }
  }
  const [decryptKey, setDecryptKey] = useState<DecryptKey>("K1")
  return (
    <form className="InputForm">
      <div className="InputRegimeHeader">Выберите режим и параметры</div>
      <div className="InputRegime" onClick={() => setNewRegime("encrypt")}>
        <div className={cn({ RegimeDisabled: regime !== "encrypt" })} />
        <div className="InputRegimeText">Зашифровать</div>
        <div className="InputWrapper">
          <label htmlFor="InputText">Исходное сообщение</label>
          <input type="text" placeholder="Текст для шифрования" id="InputText" />
        </div>
      </div>
      <div className="InputRegime" onClick={() => setNewRegime("decrypt")}>
        <div className={cn({ RegimeDisabled: regime !== "decrypt" })} />

        <div className="InputRegimeText">Расшифровать</div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                size="medium"
                checked={decryptKey === "K1"}
                onChange={() => {
                  setDecryptKey("K1")
                }}
              />
            }
            label="Ключ 1"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="medium"
                checked={decryptKey === "K2"}
                onChange={() => {
                  setDecryptKey("K2")
                }}
              />
            }
            label="Ключ 2"
          />
        </div>
      </div>
      <div className="InputButtonContainer">
        <button className="CryptButton">Поехали!</button>
      </div>
    </form>
  )
}
