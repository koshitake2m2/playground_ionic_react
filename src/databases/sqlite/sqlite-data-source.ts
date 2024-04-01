import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as entityList from '../entity-list'
import * as migrationList from '../migration-list'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  // database, entities, migrationsはcliを実行したディレクトリからの相対パスで指定する
  database: 'src/databases/sqlite/database.sqlite',
  // entities: ['src/databases/entities/*.ts'],
  // migrations: ['src/databases/migrations/*.ts'],
  entities: entityList,
  migrations: migrationList, //["../migrations/author/*{.ts,.js}"]
  // 以下のような書き方もある
  // entities: [User],
  // migrations: migrations,
  synchronize: false,
  logging: false,
  subscribers: [],
})
