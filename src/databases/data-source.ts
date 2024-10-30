import { DataSource, type DataSourceOptions } from 'typeorm'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

import sqliteParams from './sqliteParams'
import * as entityList from './entity-list'
import * as migrationList from './migration-list'

export let dataSourceAuthor: DataSource

export const initDataSource: () => Promise<void> = async () => {
  const dbPath = await Filesystem.getUri({
    path: 'my_db.sqlite3',
    directory: Directory.Data,
  })
  console.log('dbPath:', dbPath)
  const dirs = [
    Directory.Cache,
    Directory.Data,
    Directory.Documents,
    Directory.External,
    Directory.ExternalStorage,
    Directory.Library,
  ]
  dirs.forEach(async (dir) => {
    const path = await Filesystem.getUri({
      path: 'txt.txt',
      directory: dir,
    })
    console.log('dir: ', dir, '  ', path.uri)
  })

  const dataSourceConfig: DataSourceOptions = {
    // capacitor
    name: 'authorConnection',
    type: 'capacitor',
    mode: 'no-encryption',
    driver: sqliteParams.connection,
    database: 'my_db',

    // sqlite
    // type: 'sqlite',
    // database: dbPath.uri,
    // driver: sqliteParams.connection,

    // Common
    entities: entityList,
    migrations: migrationList, //["../migrations/author/*{.ts,.js}"]
    // パスて指定するとうまくいかない
    // migrations: ['src/databases/migrations/*.ts'],
    // subscribers: [],
    logging: [/*'query',*/ 'error', 'schema'],
    synchronize: false, // !!!You will lose all data in database if set to `true`
    migrationsRun: false, // Required with capacitor type
  }
  const ds = new DataSource(dataSourceConfig)
  dataSourceAuthor = ds
}

const dbName = 'my_db'
const capacitorDataSourceConfig: DataSourceOptions = {
  name: 'authorConnection',
  type: 'capacitor',
  driver: sqliteParams.connection,
  database: dbName,
  mode: 'no-encryption',
  entities: entityList,
  migrations: migrationList, //["../migrations/author/*{.ts,.js}"]
  // パスて指定するとうまくいかない
  // migrations: ['src/databases/migrations/*.ts'],
  subscribers: [],
  logging: [/*'query',*/ 'error', 'schema'],
  synchronize: false, // !!!You will lose all data in database if set to `true`
  migrationsRun: false, // Required with capacitor type
}

// export const dataSourceAuthor = new DataSource(dataSourceConfig)
// const authorDataSource = {
//   dataSource: dataSourceAuthor,
//   dbName: dbName,
// }

// export default authorDataSource
