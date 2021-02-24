import React, { useState } from "react"
import "./OutputScreen.scss"

type MessageType = "header" | "step" | "result"
type Message = {
  text: string
  type: MessageType
}
export const OutputScreen = () => {
  const [messageStack, setMessageStack] = useState<Message[]>([])
  return (
    <div className="OutputScreen">
      {messageStack.length ? (
        ""
      ) : (
        <div className="EmptyOutputPlaceholder">Здесь будут показаны этапы шифрования, наслаждайтесь!</div>
      )}
    </div>
  )
}
