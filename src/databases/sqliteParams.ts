// https://github.com/capacitor-community/sqlite/blob/master/docs/TypeORM-Usage-From-5.6.0.md
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite'
const sqliteConnection: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
const sqlitePlugin = CapacitorSQLite
const sqliteParams = {
  connection: sqliteConnection,
  plugin: sqlitePlugin,
}
export default sqliteParams
