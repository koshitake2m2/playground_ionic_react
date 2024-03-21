import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'reflect-metadata'
import './index'
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite'
import { InitializeDataSourceService } from './InitializeDataSourceService'
import sqliteParams from './databases/sqliteParams'
import authorDataSource from './databases/data-source'

customElements.define('jeep-sqlite', JeepSqlite)

// const initializeDataSources = new InitializeDataSourceService()
// initializeDataSources.init()

const initializeDataSources = async () => {
  //check sqlite connections consistency
  await sqliteParams.connection.checkConnectionsConsistency().catch((e) => {
    console.log(e)
    return {}
  })

  // Loop through the DataSources
  for (const mDataSource of [authorDataSource]) {
    // initialize
    await mDataSource.dataSource.initialize()
    if (mDataSource.dataSource.isInitialized) {
      // run the migrations
      await mDataSource.dataSource.runMigrations()
    }
    if (sqliteParams.platform === 'web') {
      await sqliteParams.connection.saveToStore(mDataSource.dbName)
    }
  }
}

if (sqliteParams.platform !== 'web') {
  initializeDataSources()
  // Now depending on the Framework render your APP
} else {
  window.addEventListener('DOMContentLoaded', async () => {
    const jeepEl = document.createElement('jeep-sqlite')
    document.body.appendChild(jeepEl)
    customElements
      .whenDefined('jeep-sqlite')
      .then(async () => {
        await sqliteParams.connection.initWebStore()
        await initializeDataSources()
        // Now depending on the Framework render your APP
      })
      .catch((err) => {
        console.log(`Error: ${err}`)
        throw new Error(`Error: ${err}`)
      })
  })
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
