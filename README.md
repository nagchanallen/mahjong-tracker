# mahjong-tracker

[![CI](https://github.com/nagchanallen/mahjong-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/nagchanallen/mahjong-tracker/actions/workflows/ci.yml)
[![License](https://badgen.net/github/license/nagchanallen/mahjong-tracker)](https://github.com/nagchanallen/mahjong-tracker/blob/master/LICENSE)
[![Last Commit](https://badgen.net/github/last-commit/nagchanallen/mahjong-tracker)](https://github.com/nagchanallen/mahjong-tracker/commits/master)

天鳳の対局情報をリアルタイムで追跡するクロスプラットフォームのデスクトップアプリです。
A cross-platform Electron desktop app for watching live Tenhou games in real time.

## 機能　 Features

- 天鳳の対局をリアルタイムで一覧表示（60 秒ごとに自動更新）
- ゲーム種別でフィルタリング（四人/三人、段位卓/特上卓/鳳凰卓）
- お気に入りプレイヤーを登録し、対局開始時に通知を受信
- macOS / Windows / Linux 対応

---

- Live game list from Tenhou, auto-refreshed every 60 seconds
- Filter by game type (four/three player, lobby level)
- Track favourite players and receive desktop notifications when they enter a game
- Runs on macOS, Windows, and Linux

## 必要条件　 Prerequisites

- [Node.js](https://nodejs.org/) v24 or later
- [Yarn](https://yarnpkg.com/) v1

## セットアップ手順　 Setup

```bash
git clone https://github.com/nagchanallen/mahjong-tracker.git
cd mahjong-tracker
yarn install
yarn start
```

## ビルド　 Build

Produces platform-specific distributables in `out/make/`.

```bash
yarn make
```

## 技術スタック　 Tech Stack

|          |                                                                           |
| -------- | ------------------------------------------------------------------------- |
| Runtime  | [Electron](https://www.electronjs.org/) 33                                |
| UI       | [React](https://react.dev/) 17 + [Blueprint.js](https://blueprintjs.com/) |
| Language | [TypeScript](https://www.typescriptlang.org/) 5                           |
| Bundler  | [electron-forge](https://www.electronforge.io/) 7 + webpack 5             |

## ライセンス　 License

MIT
