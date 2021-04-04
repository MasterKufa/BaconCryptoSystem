import React from "react"
import { useDispatch } from "react-redux"
import { openHelp } from "../redux/actions"
import { Help } from "./Help"
import "./StaticDecorations.scss"

export const Discriptions = () => {
  const dispatch = useDispatch()
  return (
    <>
      <div className="CryptShifr">Шифр Бэкона</div>
      <div className="BottomAnnotation">
        <div onClick={() => dispatch(openHelp(true))} className="helpSign" />
        <div className="CryptAuthor">
          Учебная программа разработана студентом НИЯУ МИФИ Группы С18-702 Калугер Романом
        </div>
      </div>
      <Help />
    </>
  )
}
