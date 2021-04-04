import { range } from "rxjs"

export const encryptLetterStep1 = (letter: string, alphabet: string[], cryptColumn: string[]): string => {
  const index = alphabet.findIndex((x) => x.toLocaleLowerCase() === letter.toLocaleLowerCase())
  if (index !== -1 && alphabet.length === cryptColumn.length) {
    return cryptColumn[index]
  }
  return "?"
}
export const decryptLetterStep1 = (letterCode: string, alphabet: string[], cryptColumn: string[]): string => {
  if (!letterCode.length || alphabet.length !== cryptColumn.length) {
    throw new Error("Неверные данные")
  }
  let res = ""
  range(0, letterCode.length).subscribe((i) => {
    const symbolInx = alphabet.findIndex((x) => x.toLocaleLowerCase() === letterCode[i].toLocaleLowerCase())
    if (symbolInx === -1) {
      throw new Error("Неверные данные")
    }
    res += cryptColumn[symbolInx]
  })
  return res
}
