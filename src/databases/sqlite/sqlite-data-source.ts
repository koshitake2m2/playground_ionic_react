import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as entities from '../entities'
import * as migrations from '../migrations'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  // database, entities, migrationsはcliを実行したディレクトリからの相対パスで指定する
  database: 'src/databases/sqlite/tmp/database.sqlite',
  // entities: ['src/databases/entities/*.ts'],
  // migrations: ['src/databases/migrations/*.ts'],
  entities: entities,
  migrations: migrations, //["../migrations/author/*{.ts,.js}"]
  // 以下のような書き方もある
  // entities: [User],
  // migrations: migrations,
  synchronize: false,
  logging: false,
  subscribers: [],
})
