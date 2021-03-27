export const GenerateCodes = (codeLen: number, amount: number, vars: string[], uniq: boolean = false): string[] => {
  const generated: string[] = []
  return Array(amount)
    .fill(null)
    .map((x) => {
      const gen = () =>
        Array(codeLen)
          .fill(null)
          .map((t) => vars[Math.floor(Math.random() * vars.length)])
          .join("")
      let res = gen()
      while (uniq && generated.includes(res)) {
        res = gen()
      }
      generated.push(res)
      return res
    })
}
