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
    if (!codeEx || str.length * codeEx.length < container.length) {
      throw new Error("Маленький контейнер")
    }
    const activeCont = [...container].map((x) => ({ text: x, meta: null }))
    let curIndex = 0
    const ntf = (x: string, y: string | MetaString, z: StepTypes) => {
      stepsNotifier({
        from: x,
        result: y,
        stepType: z
      })
    }
    ;[...str].forEach((x) => {
      const let1 = encryptLetterStep1(x, alphabet, codes)
      ntf(x, let1, "letter1")
      ;[...let1].forEach((l) => {
        while (blank.test(activeCont[curIndex].text)) {
          curIndex += 1
        }
        activeCont[curIndex] = (literTransformator as cryptTr)(l, activeCont[curIndex].text, Modes.CRYPT)

        ntf(l, activeCont[curIndex], "letter2")
        curIndex += 1
      })
    })
    ntf(str, activeCont.slice(0, curIndex + 1) as any, "result")
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
