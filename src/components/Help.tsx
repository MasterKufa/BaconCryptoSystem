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
            <div onClick={() => dispatch(openHelp(false))} className="closeCross" />
          </div>
        </div>
      )}
    </>
  )
}
