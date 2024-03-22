# playground_ionic_react

## setup

1. install Android Studio

- [Download Android Studio &amp; App Tools - Android Developers](https://developer.android.com/studio)

2. create virtual device

- [Create and manage virtual devices | Android Studio | Android Developers](https://developer.android.com/studio/run/managing-avds)

3. install ionic

```bash
# install ionic
npm install -g @ionic/cli

# setup project
ionic start playground_ionic_react tabs --type react
cd playground_ionic_react

# install java 17
brew install homebrew/cask-versions/corretto17
jenv add /Library/Java/JavaVirtualMachines/amazon-corretto-17.jdk/Contents/Home
jenv local 17.0

# setup android
npm install @capacitor/android
ionic cap add android
ionic cap sync

# open Android Studio
ionic cap open android

# other
npm i -D prettier eslint-config-prettier
```

4. `Run 'app'` in Android Studio

## tips

```bash
# targetの一覧を表示
ionic cap run android --list
# live reloadでemulatorを起動
ionic cap run android --target Pixel_3a_API_34_extension_level_7_arm64-v8a_1 -l --external
```

```bash
# sqliteでmigration fileを生成する
npx typeorm-ts-node-esm migration:run --dataSource src/databases/sqlite/sqlite-data-source.ts
npx typeorm-ts-node-esm migration:create src/databases/migrations/MANUALxXXX
npx typeorm-ts-node-esm migration:generate --dataSource src/databases/sqlite/sqlite-data-source.ts --pretty src/databases/migrations/XXX

# sqlite
sqlite3 src/databases/sqlite/tmp/database.sqlite

```

## develop on local

```bash
ionic start
```

## TODO

- [ ] sqlite3 web
- [ ] sqlite3 android

## refs

- [Download Android Studio &amp; App Tools - Android Developers](https://developer.android.com/studio)
- [Create and manage virtual devices | Android Studio | Android Developers](https://developer.android.com/studio/run/managing-avds)
- [Ionic 7 SQLite Database CRUD App Example Tutorial using React and @capacitor-community/sqlite | JeepQ Capacitor Plugins Tutorials](https://jepiqueau.github.io/2023/08/31/Ionic7React-SQLite-CRUD-App.html)
- [sqlite/docs/TypeORM-Usage-From-5.6.0.md at master · capacitor-community/sqlite · GitHub](https://github.com/capacitor-community/sqlite/blob/master/docs/TypeORM-Usage-From-5.6.0.md)
