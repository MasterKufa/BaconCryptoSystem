import React, { useEffect, useState } from "react"
import { bufferTime, filter, takeWhile } from "rxjs/operators"
import { OutputSubject } from "./InputForm"
import "./OutputScreen.scss"

type StepTypes = "letter1" | "letter2" | "step1" | "step2" | "result" | "clear" | "error"
type Message = {
  from: string
  result: string
  stepType: StepTypes
}
const StepHeader: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <>
      <div className="StepHeader">
        Шаг № {message.stepType === "step1" ? 1 : message.stepType === "step2" ? 2 : "?"}
      </div>
      <div className="StepFrom">{message.from}</div>
      <div className="StepArrow" />
      <div className="StepResult">{message.result}</div>
      <div className="StepMoreHeader">Подробности</div>
    </>
  )
}

const LetterStepper: React.FC<{ m: Message }> = ({ m }) => {
  return (
    <>
      <div className="LetterStepperFrom">{m.from}</div>
      <div className="LetterStepperArrow" />
      <div className="LetterStepperResult">{m.result}</div>
    </>
  )
}

export const OutputScreen = () => {
  const [messageStack, setMessageStack] = useState<Message[]>([])
  useEffect(() => {
    OutputSubject.pipe(
      bufferTime(100),
      filter((x: any[]) => !!x.length)
    ).subscribe((mes: any[]) => {
      console.log("pipe", mes)
      if (mes.length && mes.some((x) => x.stepType === "clear")) setMessageStack([])
      setMessageStack((pr: Message[]) => [...pr, ...mes])
    })
  }, [])
  console.log(messageStack)
  return (
    <div className="OutputScreenWrapper">
      <div className="OutputScreen">
        {messageStack.length ? (
          messageStack.map((m, i, arr) => {
            switch (m.stepType) {
              case "step1":
              case "step2": {
                return <StepHeader key={`${i}-${m.result}`} message={m} />
              }
              case "letter1":
              case "letter2": {
                return <LetterStepper m={m} />
              }
              case "result":
                return (
                  <>
                    <div className="StepHeader">Результат</div>
                    <div className="StepFrom">{m.from}</div>
                    <div className="StepArrow" />
                    <div className="StepResult">{m.result}</div>
                    <div className="empty" />
                  </>
                )
              case "error":
                return <div className="ErrorHeader">Ошибка. Проверьте данные.</div>
            }
          })
        ) : (
          <div className="EmptyOutputPlaceholder">Здесь будут показаны этапы шифрования, наслаждайтесь!</div>
        )}
      </div>
    </div>
  )
}
