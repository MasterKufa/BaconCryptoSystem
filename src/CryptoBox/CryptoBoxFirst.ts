import { range } from "rxjs"
import { repeat } from "rxjs/operators"
import { uniq } from "ramda"
import { decryptLetterStep1, encryptLetterStep1 } from "./CryptoBoxCommon"

type StepTypes = "letter1" | "letter2" | "step1" | "step2" | "result" | "error"
type Message = {
  from: string
  result: string
  stepType: StepTypes
}
type stepsNotifier = (mes: Message) => void

export const decryptLetterStep2 = (letterCode: string, alphabet: string[], cryptColumn: string[]): string => {
  const index = cryptColumn.findIndex((x) => x === letterCode)
  if (index !== -1 && alphabet.length === cryptColumn.length) {
    return alphabet[index]
  }
  return "?"
}

export const encryptLetterStep2 = (letterCode: string, alphabet: string[], cryptColumn: string[]): string => {
  if (!letterCode.length || alphabet.length !== cryptColumn.length) {
    debugger
    throw new Error("Неверные данные")
  }
  let res = ""
  range(0, letterCode.length).subscribe((i) => {
    const letter = letterCode[i]
    const candidates = cryptColumn.map((x, inx) => (x === letter ? inx : null)).filter((x) => x)
    if (!candidates.length) {
      throw new Error("Не найдено совпадений для символа")
    }
    const randInx = Math.floor(Math.random() * candidates.length)
    res += alphabet[candidates[randInx]!]
  })
  return res
}

enum Modes {
  CRYPT,
  DECRYPT
}
const wordLimiter = "/"
const weights = {
  step1: 0,
  letter1: 1,
  step2: 2,
  letter2: 3,
  result: 4,
  error: 5
}
export const firstRegimeCryptFactory = (alphabet: string[], codes: string[], step2K: string[], mode: Modes) => {
  if (uniq([alphabet.length, codes.length, step2K.length]).length > 1) {
    throw new Error("Разные размеры")
  }
  return (str: string, stepsNotifier: stepsNotifier): void => {
    let buf: Message[] = []
    const ntf = (x?: string, y?: string, z?: StepTypes) => {
      if (z === "error") {
        stepsNotifier({
          from: "",
          result: "",
          stepType: "error"
        })
        return
      }
      if (x && y && z) {
        buf.push({
          from: x,
          result: y,
          stepType: z
        })
      }
      if (z === "result" || !z) {
        buf.sort((a, b) => {
          if (weights[a.stepType] > weights[b.stepType]) return 1
          if (weights[a.stepType] < weights[b.stepType]) return -1
          return 0
        })
        buf.forEach((x) => stepsNotifier(x))
        buf = []
      }
    }
    try {
      let res = ""
      ;[...str.split(mode === Modes.CRYPT ? /\s/ : wordLimiter)].forEach((word, inx, arr) => {
        let step1 = ""
        let step2 = ""
        ;(mode === Modes.CRYPT ? [...word] : [...word.split(/\s/)]).forEach((x, inx1, arr1) => {
          const isSpace = mode === Modes.CRYPT && inx1 !== arr1.length - 1
          const let1 =
            mode === Modes.CRYPT ? encryptLetterStep1(x, alphabet, codes) : decryptLetterStep1(x, alphabet, step2K)
          ntf(x, let1, "letter1")
          step1 += let1 + " "
          const let2 =
            mode === Modes.CRYPT
              ? encryptLetterStep2(let1, alphabet, step2K)
              : decryptLetterStep2(let1, alphabet, codes)
          ntf(let1, let2, "letter2")
          step2 += let2 + (isSpace ? " " : "")
        })

        ntf(word, step1.trim(), "step1")
        ntf(step1, step2.trim(), "step2")
        ntf()
        const notSpace = mode === Modes.CRYPT && inx !== arr.length - 1
        res += step2 + (notSpace ? wordLimiter : " ")
      })
      ntf(str, res.trim(), "result")
    } catch (e) {
      ntf(undefined, undefined, "error")
    }
  }
}
