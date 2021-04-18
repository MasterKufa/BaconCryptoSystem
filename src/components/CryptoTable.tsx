import cn from "classnames"
import React, { ChangeEvent, KeyboardEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { Provider, useDispatch, useSelector } from "react-redux"
import { Table, Column, AutoSizer } from "react-virtualized"
import { Subject } from "rxjs"
import { EnglishCodes, EnglishLetters, PreK1, PreK2 } from "../CryptoBox/PreparedData"
import { setCodes, setK1, setK2, setLetters } from "../redux/actions"
import { Modes, State } from "../redux/reducer"
import { store } from "../redux/store"
import "./CryptoTable.scss"
import { TablePreferences } from "./TablePreferences"
import { useTable } from "react-table"

type DataKeys = "K1" | "K2" | "LetterCodes"
type LabelProps = {
  label: string
  dataKey: DataKeys
  inx: number
}
const getInnerText = (str: string) => str.replaceAll(/<.*>/g, "")

const EDITABLE_COLUMNS = 3
const dataKeys = ["K1", "K2", "LetterCodes"]

const isError = (str: string, type: DataKeys): boolean => {
  const opts = ["a", "b"]
  if (type === "LetterCodes") {
    return !(str.length === 6 && [...str].every((x) => opts.includes(x)))
  }
  if (type === "K1" || type === "K2") {
    return !(str.length === 1 && [...str].every((x) => opts.includes(x)))
  }
  return true
}
const forcer = new Subject()
const EditableLabel: React.FC<LabelProps> = ({ label, dataKey, inx }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [labelInner, setLabelInner] = useState<string>(label)
  const { K1, K2, LetterCodes } = useSelector<State, State>((s) => s)
  const data = { K1, K2, LetterCodes }
  const dispatch = useDispatch()
  useEffect(() => {
    setLabelInner(data[dataKey][inx])
  }, [K1, K2, LetterCodes])
  const onEditClick = () => {
    forcer.next(0)
    if (!isEdit) setIsEdit(true)
  }
  const close = () => {
    const x = { K1, K2, LetterCodes }
    if (x[dataKey as "K1" | "K2" | "LetterCodes"][inx] !== labelInner) {
      changeOutput(labelInner)
    }
    setIsEdit(false)
  }
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    forcer.subscribe(() => {
      close()
    })
  }, [])
  useEffect(() => {
    if (isEdit) inputRef.current?.focus()
  }, [isEdit])
  const changeOutput = (val: string) => {
    switch (dataKey) {
      case "K1":
        dispatch(setK1(K1.map((x, i) => (i === inx ? val : x))))
        break
      case "K2":
        dispatch(setK2(K2.map((x, i) => (i === inx ? val : x))))
        break
      case "LetterCodes":
        dispatch(setCodes(LetterCodes.map((x, i) => (i === inx ? val : x))))
        break
      default:
        break
    }
  }
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLabelInner(e.target.value)
  }
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !_isError) {
      e.preventDefault()
      close()
    }
  }
  const _isError = isError(labelInner, dataKey)
  return (
    <div onClick={onEditClick} className="EditCell">
      {isEdit ? (
        <>
          <input
            ref={inputRef}
            className={cn("CellEditInput", { error: _isError })}
            value={labelInner}
            onKeyDown={onKeyDown}
            onChange={onInputChange}
          />
          <div onClick={close} className={cn("CellEditCheck", { disabled: _isError })} />
        </>
      ) : (
        <>
          <span>{data[dataKey][inx]}</span>
          <div className="EditIcon" />
        </>
      )}
    </div>
  )
}
export const CryptoTable = () => {
  const { K1, K2, LetterCodes, mode, Letters } = useSelector<State, State>((s) => s)
  const prepareRows = () =>
    Letters.map((item, inx) => ({
      letter: item,
      code: <EditableLabel key={"c" + item} dataKey="LetterCodes" label={LetterCodes[inx]} inx={inx} />,
      k1: <EditableLabel key={"k1" + item} dataKey="K1" label={K1[inx]} inx={inx} />,
      k2: <EditableLabel key={"k2" + item} dataKey="K2" label={K2[inx]} inx={inx} />
    }))
  const columns = useMemo(
    () =>
      [
        {
          Header: "Символ",
          accessor: "letter"
        },
        {
          Header: "Код",
          accessor: "code"
        }
      ].concat(
        mode === Modes.CRYPTO
          ? [
              {
                Header: "K1",
                accessor: "k1"
              },
              {
                Header: "K2",
                accessor: "k2"
              }
            ]
          : []
      ),
    [mode]
  )
  const data = useMemo(() => prepareRows(), [Letters, LetterCodes, K1, K2])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data } as any)

  return (
    <div className="TableWrapper">
      <div className="TablePane">
        <table className="CryptoTable" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="ReactVirtualized__Table__row ReactVirtualized__Table__headerRow"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="ReactVirtualized__Table__headerColumn"
                    style={{
                      width: mode === Modes.CRYPTO ? "100px" : "200px"
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr className="ReactVirtualized__Table__row" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          width: mode === Modes.CRYPTO ? "100px" : "200px"
                        }}
                        className="ReactVirtualized__Table__rowColumn"
                      >
                        {cell.render("Cell")}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <TablePreferences />
    </div>
  )
  // }
  //   return (
  //     <div className="TableWrapper">

  //       <Table
  //         className="CryptoTable"
  //         width={400}
  //         height={836}
  //         headerHeight={56}
  //         rowHeight={30}
  //         rowCount={Letters[0] === EnglishLetters[0] ? 26 : 33}
  //         rowGetter={prepareRows}
  //       >
  //         <Column label="Символ" className={"Letters"} dataKey="letter" width={columnW} />
  //         <Column width={columnW} label="Код" className={"LetterCodes"} dataKey="code" />
  //         {mode === Modes.CRYPTO && <Column width={columnW} label="K1" className={"K1"} dataKey="k1" />}
  //         {mode === Modes.CRYPTO && <Column width={columnW} label="K2" className={"K2"} dataKey="k2" />}
  //       </Table>
  //       <TablePreferences />
  //     </div>
  //   )
}
