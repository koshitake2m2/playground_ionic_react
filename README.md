# playground_ionic_react

## setup

1. install Android Studio

- [Download Android Studio &amp; App Tools - Android Developers](https://developer.android.com/studio)

2. create virtual device

- [Create and manage virtual devices | Android Studio | Android Developers](https://developer.android.com/studio/run/managing-avds)

3. install ionic

```bash
npm install -g @ionic/cli
ionic start playground_ionic_react tabs --type react
npm install @capacitor/android
jenv local 17.0
ionic cap add android
ionic cap sync
ionic cap open android
```

4. `Run 'app'` in Android Studio

## tips

```bash
# targetの一覧を表示
ionic cap run android --list
# live reloadでemulatorを起動
ionic cap run android --target Pixel_3a_API_34_extension_level_7_arm64-v8a_1 -l --external
```

## refs

- [Download Android Studio &amp; App Tools - Android Developers](https://developer.android.com/studio)
- [Create and manage virtual devices | Android Studio | Android Developers](https://developer.android.com/studio/run/managing-avds)