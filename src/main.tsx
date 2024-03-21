import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'reflect-metadata'
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite'
import { InitializeDataSourceService } from './InitializeDataSourceService'

customElements.define('jeep-sqlite', JeepSqlite)

const initializeDataSources = new InitializeDataSourceService()
initializeDataSources.init()

// TODO: いい感じに待ってください. globalなstateで管理する？
await new Promise((r) => setTimeout(r, 1000))

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
