import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"
import { setMode } from "../redux/actions"
import { State } from "../redux/reducer"
import { CryptoTable } from "./CryptoTable"
import { InputForm } from "./InputForm"
import { OutputScreen } from "./OutputScreen"
import { Discriptions } from "./StaticDecorations"
import "./Tabs.scss"

type Props = {
  headers: string[]
}
export const RegimeTabs: React.FC<Props> = ({ headers }) => {
  const { mode } = useSelector<State, State>((st) => st)
  const dispatch = useDispatch()
  return (
    <Tabs
      onSelect={(index) => {
        dispatch(setMode(index))
      }}
      className="Tabs"
    >
      <TabList className="TabList">
        {headers.map((h: string, inx: number) => (
          <Tab className={`Tab Tab-${inx}`} key={h}>
            {h}
          </Tab>
        ))}
      </TabList>
      <TabPanel>
        <CryptoTable />
        <OutputScreen />
        <InputForm />
        <Discriptions />
      </TabPanel>
      <TabPanel>
        <CryptoTable />
        <OutputScreen />
        <InputForm />
        <Discriptions />
      </TabPanel>
    </Tabs>
  )
}
