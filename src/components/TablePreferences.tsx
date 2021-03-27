import { FormControlLabel, Checkbox } from "@material-ui/core"
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { Provider, useDispatch, useSelector } from "react-redux"
import { Table, Column, AutoSizer } from "react-virtualized"
import { Subject } from "rxjs"
import { dispatch } from "rxjs/internal/observable/pairs"
import { GenerateCodes } from "../CryptoBox/Common"
import { EnglishCodes, EnglishLetters, PreK1, PreK2 } from "../CryptoBox/PreparedData"
import { setCodes, setDecryptKey, setK1, setK2, setLetters } from "../redux/actions"
import { DecryptKeys, State } from "../redux/reducer"
import { store } from "../redux/store"
import "./TablePreferences.scss"

export const TablePreferences = () => {
  const { LetterCodes } = useSelector<State, State>((st) => st)

  const dispatch = useDispatch()
  return (
    <div className="TablePreferences">
      <div
        onClick={() => dispatch(setCodes(GenerateCodes(6, LetterCodes.length, ["a", "b"], true)))}
        className="PrefButton"
      >
        Ген. Коды
      </div>
      <div onClick={() => dispatch(setK1(GenerateCodes(1, LetterCodes.length, ["a", "b"])))} className="PrefButton">
        Ген. К1
      </div>

      {/* <FormControlLabel
        control={
          <Checkbox
            size="medium"
            checked={true}
            onChange={() => {
              dispatch({})
            }}
          />
        }
        label="Ключ 1"
      /> */}
    </div>
  )
}
