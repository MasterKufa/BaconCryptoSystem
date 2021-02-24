import React from "react"
import { Table, Column, AutoSizer } from "react-virtualized"
import { EnglishCodes, EnglishLetters, PreK1, PreK2 } from "../CryptoBox/PreparedData"
import "./CryptoTable.scss"

const prepareRows = ({ index }: { index: number }) => {
  return {
    letter: EnglishLetters[index] ?? "?",
    code: EnglishCodes[index] ?? "?",
    k1: PreK1[index] ?? "?",
    k2: PreK2[index] ?? "?"
  }
}
export const CryptoTable = () => {
  return (
    <Table
      className="CryptoTable"
      width={400}
      height={976}
      headerHeight={40}
      rowHeight={36}
      rowCount={26}
      rowGetter={prepareRows}
    >
      <Column label="Символ" dataKey="letter" width={100} />
      <Column width={100} label="Код" dataKey="code" />
      <Column width={100} label="K1" dataKey="k1" />
      <Column width={100} label="K2" dataKey="k2" />
    </Table>
  )
}
