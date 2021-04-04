import { of, range } from "rxjs"
import { concatAll, map, reduce, repeat, switchMap, tap } from "rxjs/operators"
import { decryptLetterStep2, encryptLetterStep2, firstRegimeCryptFactory } from "./CryptoBoxFirst"
import { secondRegimeCryptFactory } from "./CryptoBoxSecond"
import { caseTransformatorCrypt } from "./CryptoTransformators"

let EnglishLetters: string[] = []
let PreK1: string[] = []
let PreK2: string[] = []

const Modes = ["Криптографический режим", "Стеганографический режим"]

range(65, 26)
  .pipe(
    map((x) => String.fromCharCode(x)),
    reduce((acc: string[], x: string) => {
      acc.push(x)
      return acc
    }, [])
  )
  .subscribe((x) => {
    EnglishLetters = x
  })

of("a", "b")
  .pipe(
    switchMap((x) => of(x).pipe(repeat(13))),
    concatAll(),
    reduce((acc: string[], x: string) => {
      acc.push(x)
      return acc
    }, [])
  )
  .subscribe((x) => (PreK1 = x))
of("b", "a")
  .pipe(
    repeat(13),
    reduce((acc: string[], x: string) => {
      acc.push(x)
      return acc
    }, [])
  )
  .subscribe((x) => (PreK2 = x))
const RussianLetters = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я"
]
let EnglishCodes = [
  "aabbbb",
  "ababbb",
  "abbabb",
  "aabbab",
  "ababba",
  "aababb",
  "aaabab",
  "abaaba",
  "abbaab",
  "aabbaa",
  "aaabba",
  "aaaabb",
  "aaaaab",
  "aaaaaa",
  "abaaaa",
  "abbaaa",
  "abbbaa",
  "aabbba",
  "aaabbb",
  "abaabb",
  "aabaab",
  "aaabaa",
  "aaaaba",
  "abaaab",
  "aabaaa",
  "ababaa"
]

let RussianCodes = [
  "aabbbb",
  "ababbb",
  "abbabb",
  "aabbab",
  "ababba",
  "aababb",
  "aaabab",
  "abaaba",
  "abbaab",
  "aabbaa",
  "aaabba",
  "aaaabb",
  "aaaaab",
  "aaaaaa",
  "abaaaa",
  "abbaaa",
  "abbbaa",
  "aabbba",
  "aaabbb",
  "abaabb",
  "aabaab",
  "aaabaa",
  "aaaaba",
  "abaaab",
  "aabaaa",
  "ababaa",
  "babbbb",
  "bbabbb",
  "bbbabb",
  "babbab",
  "bbabba",
  "bababb",
  "baabab"
]
export const setRusCodes = (x: string[]) => {
  RussianCodes = x
}
export const setEngCodes = (x: string[]) => {
  EnglishCodes = x
}
// console.log(encryptLetterStep1("C", EnglishLetters, EnglishCodes))
// console.log(encryptLetterStep2("bbabb", EnglishLetters, PreK1))
// console.log(decryptLetterStep1("ROEYQ", EnglishLetters, PreK1))
// console.log(decryptLetterStep2("bbabb", EnglishLetters, EnglishCodes))
// firstRegimeCryptFactory(EnglishLetters, EnglishCodes, PreK1, 0)("CAT DOG", (x) => console.log(x))
// firstRegimeCryptFactory(
//   EnglishLetters,
//   EnglishCodes,
//   PreK2,
//   1
// )("USGPS CTQVN QGHUZ/CYSFO ZGHBD LHUFP", (x) => console.log(x))
// secondRegimeCryptFactory(
//   EnglishLetters,
//   EnglishCodes,
//   "Hello o my hello yes",
//   caseTransformatorCrypt
// )("CAT", (x) => console.log(x))

export { Modes, PreK1, PreK2, EnglishLetters, RussianLetters, RussianCodes, EnglishCodes }
