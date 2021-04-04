import { Regime } from "../components/InputForm"
import { CryptoTransformator } from "../redux/reducer"

type MetaString = {
  text: string
  meta: any
}

type cryptTr = (sourceBin: string, container: string, mode: Modes) => MetaString
type deCryptTr = (sourceCont: string, mode: Modes) => string
enum Modes {
  CRYPT,
  DECRYPT
}

export function caseTransformatorCrypt(sourceBin: string, container: string, mode: Modes): MetaString {
  if (sourceBin === "a") {
    return {
      text: container,
      meta: "uppercase"
    }
  } else {
    return {
      text: container,
      meta: "lowercase"
    }
  }
}
export function caseTransformatorDeCrypt(sourceCont: MetaString, mode: Modes): string {
  if (sourceCont.meta === "uppercase") {
    return "a"
  } else {
    return "b"
  }
}
export function cursiveTransformatorCrypt(sourceBin: string, container: string, mode: Modes): MetaString {
  if (sourceBin === "a") {
    return {
      text: container,
      meta: "italic"
    }
  } else {
    return {
      text: container,
      meta: "normal"
    }
  }
}
export function cursiveTransformatorDeCrypt(sourceCont: MetaString, mode: Modes): string {
  if (sourceCont.meta === "italic") {
    return "a"
  } else {
    return "b"
  }
}
export function colorTransformatorCrypt(sourceBin: string, container: string, mode: Modes): MetaString {
  if (sourceBin === "a") {
    return {
      text: container,
      meta: "red"
    }
  } else {
    return {
      text: container,
      meta: "black"
    }
  }
}
export function colorTransformatorDeCrypt(sourceCont: MetaString, mode: Modes): string {
  if (sourceCont.meta === "red") {
    return "a"
  } else {
    return "b"
  }
}
export function fontTransformatorCrypt(sourceBin: string, container: string, mode: Modes): MetaString {
  if (sourceBin === "a") {
    return {
      text: container,
      meta: "TNR"
    }
  } else {
    return {
      text: container,
      meta: "Arial"
    }
  }
}
export function fontTransformatorDeCrypt(sourceCont: MetaString, mode: Modes): string {
  if (sourceCont.meta === "TNR") {
    return "a"
  } else {
    return "b"
  }
}
export const getTransformator = (type: CryptoTransformator, regime: Regime) => {
  if (regime === "encrypt") {
    switch (type) {
      case CryptoTransformator.case:
        return caseTransformatorCrypt
      case CryptoTransformator.font:
        return fontTransformatorCrypt
      case CryptoTransformator.italic:
        return cursiveTransformatorCrypt
      case CryptoTransformator.color:
        return colorTransformatorCrypt
      default:
        return caseTransformatorCrypt
    }
  }
  return caseTransformatorCrypt
}
