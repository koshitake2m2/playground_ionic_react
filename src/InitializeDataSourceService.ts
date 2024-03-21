import sqliteParams from './databases/sqliteParams'
import authorDataSource from './databases/data-source'
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite'

export class InitializeDataSourceService {
  constructor() {}

  async init(): Promise<void> {
    // https://github.com/capacitor-community/sqlite/blob/master/docs/TypeORM-Usage-From-5.6.0.md

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
    } else {
      customElements.define('jeep-sqlite', JeepSqlite)
      window.addEventListener('DOMContentLoaded', async () => {
        const jeepEl = document.createElement('jeep-sqlite')
        document.body.appendChild(jeepEl)
        customElements
          .whenDefined('jeep-sqlite')
          .then(async () => {
            await sqliteParams.connection.initWebStore()
            await initializeDataSources()
          })
          .catch((err) => {
            console.log(`Error: ${err}`)
            throw new Error(`Error: ${err}`)
          })
      })
    }
  }
}
