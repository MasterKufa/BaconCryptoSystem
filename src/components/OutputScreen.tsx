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
const Resulter: React.FC<any> = ({ result }) => {
  return Array.isArray(result) ? (
    <>
      {result.map((r, i) => (
        <span key={i} className={r.meta ?? ""}>
          {r.text ? r.text : r}
        </span>
      ))}{" "}
    </>
  ) : (
    <span className={result.meta ?? ""}>{result.text ? result.text : result}</span>
  )
}
const StepHeader: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <>
      <div className="StepHeader">
        Шаг № {message.stepType === "step1" ? 1 : message.stepType === "step2" ? 2 : "?"}
      </div>
      <div className="StepFrom">{message.from}</div>
      <div className="StepArrow" />
      <div className="StepResult">
        <Resulter result={message.result} />
      </div>
      <div className="StepMoreHeader">Подробности</div>
    </>
  )
}

const LetterStepper: React.FC<{ m: Message }> = ({ m }) => {
  return (
    <>
      <div className="LetterStepperFrom">{m.from}</div>
      <div className="LetterStepperArrow" />
      <div className="LetterStepperResult">
        <Resulter result={m.result} />
      </div>
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
      if (mes.length && mes.some((x) => x.stepType === "clear")) setMessageStack([])
      setMessageStack((pr: Message[]) => [...pr, ...mes])
    })
  }, [])
  return (
    <div className="OutputScreenWrapper">
      <div className="OutputScreen">
        {messageStack.length ? (
          messageStack.map((m, i, arr) => {
            if (m.from !== " ") {
              switch (m.stepType) {
                case "step1":
                case "step2": {
                  return <StepHeader key={`${i}-${(m.result as any).text ?? m.result}`} message={m} />
                }
                case "letter1":
                case "letter2": {
                  return <LetterStepper key={i + m.from} m={m} />
                }
                case "result":
                  return (
                    <>
                      <div className="StepHeader">Результат</div>
                      <div className="StepFrom">{m.from}</div>
                      <div className="StepArrow" />
                      <div className="StepResultTotal">
                        <Resulter result={m.result} />
                      </div>
                      <div className="empty" />
                    </>
                  )
                case "error":
                  return <div className="ErrorHeader">Ошибка. Проверьте данные.</div>
              }
            }
          })
        ) : (
          <div className="EmptyOutputPlaceholder">Здесь будут показаны этапы шифрования!</div>
        )}
      </div>
    </div>
  )
}
