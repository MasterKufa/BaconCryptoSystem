import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { openHelp } from "../redux/actions"
import { State } from "../redux/reducer"
import "./Help.scss"

export const Help = () => {
  const { isHelpOpened } = useSelector<State, State>((st) => st)
  const dispatch = useDispatch()
  return (
    <>
      {isHelpOpened && (
        <div className="BackDrop">
          <div className="helpContainer">
            <div className="helpHeader">Помощь</div>
            <div className={"HelpNote"}>
              -Два режима: криптография/стенография (кнопки в верхних углах, активная кнопка больше и ярче)
            </div>
            <div className={"HelpNote"}>
              -Столбцы крипто-таблицы можно редактировать, нажав на иконку ручки рядом с полем, некорректные значения
              прведут к индикации ошибки
            </div>
            <div className={"HelpNote"}>
              -Подбор ложного сообщения в стено режиме не всегда возможен полностью, так как одна буква в рамках текущих
              буквенных кодов может являться и a, и b, меняя только столбец K2 полное совпадение не гарантируется
            </div>
            <div className={"HelpNote"}>
              -Для переключения режима шифрования и дешифрования нужно кликнуть на затемненную область, сделав ее
              активной
            </div>
            <div onClick={() => dispatch(openHelp(false))} className="closeCross" />
          </div>
        </div>
      )}
    </>
  )
}
