# ポケみくじ

PokeAPI を使用した、シンプルなポケモンおみくじアプリです。

デプロイ URL: https://masvc.github.io/test_PokeAPI/

## 機能

1. ポケモンおみくじ
   - 「おみくじを引く」ボタンをクリックすると、ランダムなポケモンとおみくじメッセージが表示されます
   - ポケモンの画像、日本語名、タイプ、高さ、重さ、特性などの情報が表示されます
   - おみくじメッセージには、その日の運勢と詳細なアドバイスが含まれます

## 使用技術

- HTML5
- CSS3
- JavaScript (ES6+)
- [PokeAPI](https://pokeapi.co/)
- PWA (Progressive Web App)対応
  - Service Worker
  - マニフェストファイル
  - オフライン対応
  - ホーム画面への追加機能

## 特徴

- モバイルフレンドリーなレスポンシブデザイン
- モンスターボールのアニメーション効果
- 日本語対応（ポケモン名、タイプ、特性）
- PWA 対応によるネイティブアプリのような使用感

## 使い方

1. Web ブラウザでアプリケーションを開きます
2. 「おみくじを引く」ボタンをクリックします
3. モンスターボールのアニメーション後、ランダムなポケモンとおみくじ結果が表示されます
4. スマートフォンの場合、ホーム画面に追加してアプリとして使用することもできます

## 注意事項

- インターネット接続が必要です（初回アクセス時）
- PWA 機能により、一度読み込んだ内容は一部オフラインでも使用可能です
- PokeAPI の利用制限に従って使用してください
