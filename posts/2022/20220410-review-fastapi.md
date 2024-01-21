---
title: 'FastAPIの開発体験が良かった話'
date: 2022-04-10 10:00
categories: 技術 FastAPI 感想
---

## はじめに

Python ベースの Web マイクロフレームワークの一つ、[FastAPI](https://fastapi.tiangolo.com/ja/)で API を作る機会があり、開発体験が良かったのでその感想です。

## 良かった点

### シンプルな設計

大規模アプリケーションでなく、モック API や簡単な RESTful API を作るなどといった、ちょっとした用途でアプリケーションを作る場合は、**できれば最小限のファイル・ディレクトリで構成したい**というのが個人的な好みです。

例えば[Spring Boot](https://spring.io/projects/spring-boot)でアプリケーションを作る場合、jvm 言語特有で「最初のプロジェクトから、複数のパッケージとファイルで構成されている」のですが、`FastAPI`では言ってしまえば、1 ファイルでアプリケーションを実行できます。`Node.js`の Web フレームワーク[Express](https://expressjs.com/ja/)みたいに構成できるので嬉しいです。

例：GET リクエストを受け取るのみの API を作る場合、1 ファイルのみで以下のようにコードを記述するだけで OK

```python
from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/hoge")
def getHoge(id: str = Query(...)) -> JSONResponse:
  # ここでクエリパラメータを受け取り、レスポンスを作る
  # jsonでレスポンスを返す
  return JSONResponse(status_code=200, content={"body": "hoge"})
```

### 直感的な理解のしやすさ

アノテーションベースでリクエストハンドラーを書けるので、ぱっと見で何をやっているのか理解しやすいです。実際に上で書いたサンプルコードをみて、「`hoge`というエンドポイントに`id`というパラメータがついた URI でコールされたとき、中身 json で 200 のレスポンスが返る」と理解はできますよね。（引数`id`がクエリパラメータとぱっと見でわかるかどうかは、`Spring`や`NestJS`で書いたことがあるかによりそうな気がしないこともないが。。自分は`Spring`を業務で使っているのでスッと腑に落ちました）

### Pydantic との組み合わせることで受けられる恩恵の大きさ

[Pydantic](https://pydantic-docs.helpmanual.io/)と`FastAPI`を組み合わせることで、

- 型アノテーションを使用することで、バリデーション・シリアライズが容易
- `OpenAPI`スキーマの自動生成により、仕様書作成が容易

が簡単に実現できます。特にリクエストボディに対して、バリデーション機構をスクラッチから書くことなく`Pydantic`の`BaseModel`と`FastAPI`の`Query`の組み合わせでかけるのはすごく楽。。

また、自動生成された`OpenAPI`スキーマを[SwaggerUI](https://swagger.io/tools/swagger-ui/)・[Redoc](https://redocly.github.io/redoc/)でドキュメント化できるのもクールです！！（当然 description など全てコード内に書いてあげる必要はありますが）

## 最後に

機械学習のモデルを利用した API や簡単なモックを作る必要があるときは`FastAPI`を採用したいです。`FastAPI`はいいぞ。

というかまず`Python`が型アノテーションの追加などでさらに書きやすくなってて嬉しかったです！久々書いてて「これよこれ」と実家に帰った感覚がありました。

`FastAPI`は現在いまだにバージョン 0.X.X の状態なので、開発が本当に盛んです。ぜひ興味があればコントリビュートしてみてはいかがでしょうか！！
