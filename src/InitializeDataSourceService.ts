import sqliteParams from './databases/sqliteParams'
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite'
import { Capacitor } from '@capacitor/core'
import { dataSourceAuthor, initDataSource } from './databases/data-source'

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
      await initDataSource()
      const authorDataSource = dataSourceAuthor

      // Loop through the DataSources
      for (const mDataSource of [authorDataSource]) {
        const database = mDataSource.options.database ?? 'dummy'
        console.log(`Initializing ${database}`)
        await mDataSource.initialize().catch((e) => {
          console.log(`Error initializing ${database}`, e)
          return {}
        })
        if (mDataSource.isInitialized) {
          console.log(`Running migrations for ${mDataSource.options.database}`)
          await mDataSource.runMigrations().catch((e) => {
            console.log(
              `Error running migrations for ${mDataSource.options.database}`,
              e
            )
            return {}
          })
        }
        if (platform === 'web') {
          console.log(`Saving ${mDataSource.options.database} to store`)
          await sqliteParams.connection.saveToStore('my_db')
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
