import { DataSource, type DataSourceOptions } from 'typeorm'
import sqliteParams from './sqliteParams'
import * as entities from './entities'
import * as migrations from './migrations'

const dbName = 'my_db'

const dataSourceConfig: DataSourceOptions = {
  name: 'authorConnection',
  type: 'capacitor',
  driver: sqliteParams.connection,
  database: dbName,
  mode: 'no-encryption',
  entities: entities,
  migrations: migrations, //["../migrations/author/*{.ts,.js}"]
  subscribers: [],
  logging: [/*'query',*/ 'error', 'schema'],
  synchronize: false, // !!!You will lose all data in database if set to `true`
  migrationsRun: false, // Required with capacitor type
}
export const dataSourceAuthor = new DataSource(dataSourceConfig)
const authorDataSource = {
  dataSource: dataSourceAuthor,
  dbName: dbName,
}

export default authorDataSource
