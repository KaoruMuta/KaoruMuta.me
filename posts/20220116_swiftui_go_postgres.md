---
title: SwiftUI+Golang+Heroku Postgresで遊んでみた感想と知見
date: 2022-01-16 19:33
categories: 技術 iOS SwiftUI Golang PostgreSQL Heroku
---

## はじめに

あけましておめでとうございます。今年もよろしくお願いいたします。

本年度一発目の記事は、技術のインプットアウトプット通じての備忘録シリーズです。

## 作ったもの

今回サンプルとしてつくったものは単語帳アプリです。
ざっと機能としては

- ユーザーが設定したカテゴリを選択
- 選択後カテゴリに該当する単語が出現、答えを任意のタイミングで見ることができる

のシンプルな感じで 1 日で開発が終わるようなレベルに設定しました。ちなみに*ユーザーは自分しかいない前提で進めています*

## 採用技術

技術は以下の通りです。採用理由は**自分が使いたかったから**！！（結局興味があったりモチベが出るものが一番いいのよ個人開発は）

- Client (app): SwiftUI+Combine
- Server: Golang(フレームワーク: gin)
- DB: Heroku Postgres

バックエンド側は Heroku フル活用で事足りるはずなので使わせてもらって、アプリ側は久々 SwiftUI で書きました

## 得た知見（ハマったところ多め）

Client, Server, DB, Heroku 周りで詰まったところをまとめます。これは余談ですが、Go で作ったアプリケーションを Heroku で扱う[公式チュートリアル](https://devcenter.heroku.com/ja/articles/getting-started-with-go?singlepage=true)が優秀すぎて、想像以上にスムーズにできたのでよかったです

### SwiftUI で元の画面に戻る処理

UIKit でいう`dismiss(animated:)`を SwiftUI でやるには`PresentationMode`構造体にアクセスして、`dismiss()`を呼んであげます

```swift
// 遷移元のView

// presentationModeの環境変数を取得
@Environment(\.presentationMode) var presentationMode

// 元画面に戻る処理
presentationMode.wrappedValue.dismiss()
```

iOS15 以降なら、環境変数`presentationMode`でなく`dismiss`にアクセスすればすんなりできそうです

参考: https://capibara1969.com/3146/

### NavigationLink で遷移した画面の上に謎のスペースができる際の対処法

UI を調整している時に、なぜか上側に謎のスペースができていたので`navigationBarTitleDisplayMode`を`.inline`に指定して解決

```swift
HogeView {
    // SwiftUI.View
}
.navigationBarTitleDisplayMode(.inline)
```

参考: https://www.hfoasi8fje3.work/entry/2020/12/30/%E3%80%90SwiftUI%E3%80%91NavigationLink%E3%81%A7%E9%81%B7%E7%A7%BB%E3%81%97%E3%81%9F%E7%94%BB%E9%9D%A2%E3%81%AE%E4%B8%8A%E9%83%A8%E3%81%AB%E8%AC%8E%E3%81%AE%E4%BD%99%E7%99%BD%E3%81%8C%E7%99%BA%E7%94%9F

### 特定の処理が終わったタイミングで NavigationLink を使って画面遷移したい

API との通信処理が終わったあとに画面遷移をしたいときは、`NavigationLink`の`isActive`フラグを通信が終わった時に`true`に変えてあげることで実現できます。

```swift
NavigationLink(destination: QuizView(words: viewModel.words), isActive: $shouldShowQuizView) {
                    Button(action: {
                        viewModel.fetchWords(by: selectedCategoryId, success: {
                            // success callbackのときにshouldShowQuizViewをtrueにする
                            self.shouldShowQuizView = true
                        }, failure: {
                            print("Failed to fetch data from api")
                        })
                    }) {
                        Text("START")
                    }
                }
```

参考: https://blog.studysapuri.jp/entry/2021/09/18/iosdc-swiftui-navigationlink-push-navigation

### Heroku デプロイで`app not compatible with buildpack` (Go 編)

以下コマンドで go のバージョンとモジュールの依存関係を記した`go.mod`を作成し、デプロイしてあげて解決。

```go
go mod init {GIT_REPOSITORY_URL}
```

参考: https://stackoverflow.com/questions/48841627/cant-push-simple-golang-project-to-heroku

### Heroku デプロイで `cannot execute binary file: Exec format error`

ローカルでコンパイルの際に OS とアーキテクチャ の指定をしてあげてクロスコンパイル、その後バイナリをデプロイすることで解決

```bash
## fish
env GOOS=linux GOARCH=amd64 go build -o bin/terminology-memo-api -v .
```

参考

- https://stackoverflow.com/questions/63412744/deploy-to-heroku-error-cannot-execute-binary-file-exec-format-error
- https://qiita.com/Utr/items/9469c1611abe8a0a3486

### Heroku デプロイで`app[web.1]: bash: bin/: No such file or directory`

`Procfile`でバイナリの存在するパスを記して解決

```
web: bin/{BINARY_NAME}
```

参考: 上述の公式チュートリアル

### Go で作ったアプリケーションで`no required module provides package`

下記コマンドを実行して依存しているモジュールを更新

```go
go mod tidy
```

参考: https://sumito.jp/2021/04/23/no-required-module-provides-package-github-com/

### 改行コードを PostgreSQL で扱う

E を追加したい文字列の先頭にいれてあげて解決

```sql
INSERT INTO words (name) VALUES (E'明日\n晴れるかな')
```

参考: https://knowledge.reontosanta.com/archives/303

### `updated_at`を自動的に更新してくれる制約を追加

MySQL なら`on update current_timestamp`を DDL に追加してあげるだけで OK だが、PostgreSQL だと同等の機能がないので、トリガーを描いてあげる必要がある。。。ので、このサイトを参考に書かせていただきました

参考: https://www.raythebm.net/weblog/archives/249

## 最後に

やる気が出た時にガツッとやる開発は久々だったが、楽しいしまた違う学びがある。
