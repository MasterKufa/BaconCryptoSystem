import React from "react"
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"
import { CryptoTable } from "./CryptoTable"
import { InputForm } from "./InputForm"
import { OutputScreen } from "./OutputScreen"
import { Discriptions } from "./StaticDecorations"
import "./Tabs.scss"

type Props = {
  headers: string[]
}
export const RegimeTabs: React.FC<Props> = ({ headers }) => (
  <Tabs className="Tabs">
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
      <h2>Any content 3</h2>
    </TabPanel>
  </Tabs>
)
