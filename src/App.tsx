import React from "react"
import logo from "./logo.svg"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import { RegimeTabs } from "./components/Tabs"
import { Modes } from "./CryptoBox/PreparedData"

function App() {
  return <RegimeTabs headers={Modes} />
}

export default App
