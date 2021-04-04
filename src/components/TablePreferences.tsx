import { uniq } from "ramda"
import { useDispatch, useSelector } from "react-redux"
import { GenerateCodes } from "../CryptoBox/Common"
import { setCodes, setK1, setLetters } from "../redux/actions"
import { Modes, State } from "../redux/reducer"
import "./TablePreferences.scss"
import cn from "classnames"
import { EnglishCodes, EnglishLetters, RussianCodes, RussianLetters } from "../CryptoBox/PreparedData"

export const TablePreferences = () => {
  const { LetterCodes, mode, Letters } = useSelector<State, State>((st) => st)

  const dispatch = useDispatch()
  const onAlphabetChange = () => {
    if (Letters[0] === EnglishLetters[0]) {
      dispatch(setLetters(RussianLetters))
      dispatch(setCodes(RussianCodes))
    } else {
      dispatch(setLetters(EnglishLetters))
      dispatch(setCodes(EnglishCodes))
    }
  }
  const isCodeDuplicateError = LetterCodes.length !== uniq(LetterCodes).length

  return (
    <div className="TablePreferences">
      <div
        onClick={() => dispatch(setCodes(GenerateCodes(6, LetterCodes.length, ["a", "b"], true)))}
        className="PrefButton"
      >
        Ген. Коды
      </div>
      {mode === Modes.CRYPTO && (
        <div onClick={() => dispatch(setK1(GenerateCodes(1, LetterCodes.length, ["a", "b"])))} className="PrefButton">
          Ген. К1
        </div>
      )}
      {mode === Modes.STENO && (
        <div onClick={onAlphabetChange} className={cn("PrefButton", { disabled: isCodeDuplicateError })}>
          Англ. &lt;-=-&gt; Рус.
        </div>
      )}

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
