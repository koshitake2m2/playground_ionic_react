import { DataSource, type DataSourceOptions } from 'typeorm'
import sqliteParams from './sqliteParams'
import * as entityList from './entity-list'
import * as migrationList from './migration-list'

const dbName = 'my_db'

const dataSourceConfig: DataSourceOptions = {
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
export const dataSourceAuthor = new DataSource(dataSourceConfig)
const authorDataSource = {
  dataSource: dataSourceAuthor,
  dbName: dbName,
}

export default authorDataSource
