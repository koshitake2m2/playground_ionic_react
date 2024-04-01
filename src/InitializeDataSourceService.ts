import sqliteParams from './databases/sqliteParams'
import authorDataSource from './databases/data-source'
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite'
import { Capacitor } from '@capacitor/core'

export class InitializeDataSourceService {
  constructor() {}

  async init(): Promise<void> {
    // https://github.com/capacitor-community/sqlite/blob/master/docs/TypeORM-Usage-From-5.6.0.md
    const platform = Capacitor.getPlatform()

    const initializeDataSources = async () => {
      //check sqlite connections consistency
      await sqliteParams.connection.checkConnectionsConsistency().catch((e) => {
        console.log('Error connection.checkConnectionsConsistency', e)
        return {}
      })

      // Loop through the DataSources
      for (const mDataSource of [authorDataSource]) {
        console.log(`Initializing ${mDataSource.dbName}`)
        await mDataSource.dataSource.initialize().catch((e) => {
          console.log(`Error initializing ${mDataSource.dbName}`, e)
          return {}
        })
        if (mDataSource.dataSource.isInitialized) {
          console.log(`Running migrations for ${mDataSource.dbName}`)
          await mDataSource.dataSource.runMigrations().catch((e) => {
            console.log(`Error running migrations for ${mDataSource.dbName}`, e)
            return {}
          })
        }
        if (platform === 'web') {
          console.log(`Saving ${mDataSource.dbName} to store`)
          await sqliteParams.connection.saveToStore(mDataSource.dbName)
        }
      }
    }

    if (platform !== 'web') {
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
