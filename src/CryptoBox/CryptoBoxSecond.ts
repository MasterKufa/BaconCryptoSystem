import { uniq } from "ramda"
import { of } from "rxjs"
import { bufferCount } from "rxjs/operators"
import { CryptoTransformator } from "../redux/reducer"
import { encryptLetterStep1, decryptLetterStep1 } from "./CryptoBoxCommon"
import { encryptLetterStep2, decryptLetterStep2 } from "./CryptoBoxFirst"

type StepTypes = "letter1" | "letter2" | "step1" | "step2" | "result"
type Message = {
  from: string | MetaString
  result: string | MetaString
  stepType: StepTypes
}
type stepsNotifier = (mes: Message) => void
type MetaString = {
  text: string
  meta: any
}
type cryptTr = (sourceBin: string, container: string, mode: Modes) => MetaString
type deCryptTr = (sourceCont: MetaString, mode: Modes) => string
type LiterTransformator = cryptTr | deCryptTr
enum Modes {
  CRYPT,
  DECRYPT
}

const wordLimiter = " "
const blank = /\s/
export const secondRegimeCryptFactory = (
  alphabet: string[],
  codes: string[],
  container: string,
  literTransformator: LiterTransformator
) => {
  if (uniq([alphabet.length, codes.length]).length > 1) {
    throw new Error("Разные размеры")
  }
  return (str: string, stepsNotifier: stepsNotifier): void => {
    const codeEx = codes.find((x) => x)
    if (!codeEx || str.replaceAll(/\s/g, "").length * codeEx.length > container.replaceAll(/\s/g, "").length) {
      throw new Error("Маленький контейнер")
    }
    const activeCont = [...container].map((x) => ({ text: x, meta: null }))
    const ntf = (x: string, y: string | MetaString, z: StepTypes) => {
      stepsNotifier({
        from: x,
        result: y,
        stepType: z
      })
    }
    const firstStep: { x: string; let1: string }[] = []
    const secondStep: { l: string; let2: { text: string; meta: null } }[] = []
    let blanks = 0
    let considerableLets = -1
    ;[...str].forEach((x, i) => {
      const let1 = encryptLetterStep1(x, alphabet, codes)
      firstStep.push({ x: x, let1 })
      if (let1 === "?") return
      considerableLets++
      ;[...let1].forEach((l, j) => {
        let inxProto = considerableLets * 6 + j + blanks
        while (activeCont[inxProto].text === " ") {
          blanks++
          inxProto = considerableLets * 6 + j + blanks
        }
        activeCont[inxProto] = (literTransformator as cryptTr)(l, activeCont[inxProto].text, Modes.CRYPT)
        secondStep.push({ l, let2: activeCont[inxProto] })
      })
    })
    const firstRes = firstStep.map((x) => x.let1).join("")
    ntf(str, firstRes, "step1")
    ;[...firstStep].forEach((x, i) => ntf(x.x, x.let1, "letter1"))
    ntf(firstRes, secondStep.map((x) => x.let2) as any, "step2")
    secondStep.forEach((x, i) => ntf(x.l, x.let2, "letter2"))

    ntf(str, activeCont as any, "result")
  }
}

export const secondRegimeDeCryptFactory = (
  alphabet: string[],
  codes: string[],
  literTransformator: LiterTransformator
) => {
  if (uniq([alphabet.length, codes.length]).length > 1) {
    throw new Error("Разные размеры")
  }
  return (str: MetaString[], letCodeLen: number, stepsNotifier: stepsNotifier): void => {
    const activeCont1: string[] = []
    const activeCont2: string[] = []

    const ntf = (x: MetaString | string, y: string, z: StepTypes) => {
      stepsNotifier({
        from: x,
        result: y,
        stepType: z
      })
    }
    ;[...str.filter((x) => !blank.test(x.text))].forEach((x, index) => {
      const let1 = (literTransformator as deCryptTr)(x, Modes.DECRYPT)
      activeCont1.push(let1)
      ntf(x, let1, "letter1")
    })
    of(...activeCont1)
      .pipe(bufferCount(letCodeLen))
      .subscribe((code) => {
        const let2 = decryptLetterStep2(code.join(""), alphabet, codes)
        activeCont2.push(let2)
        ntf(code.join(""), let2, "letter2")
      })
    ntf(str as any, activeCont2.join(""), "result")
  }
}
