---
title: 【PyTorch】学習時，推論(テスト)時での注意/model.eval()←めちゃくちゃ大事
date: 2018-11-24 23:33
categories: 技術 研究 知見
---

## はじめに

PyTorch を使って Deep Learning の学習(train)，推論(validation，test)の部分を実装していた時にはまった罠を紹介します．

## PyTorch での学習・推論の際のモデルの切り替え

<a href="https://pytorch.org/tutorials/">PyTorch tutorial</a>に，

- 学習時: <code>model.train()</code>
- 推論時: <code>model.eval()</code>

とコードに書かれてあります．
model の中に batchnormalization 層や dropout 層が含まれていた場合，これらは学習時では使うが推論時では使わないと言う指定をしてあげなければいけません．なぜならこれらは学習を効率よく行うためのテクニックであって**推論時では使われないもの**だからです．

supervisor が渡してくれたコードにはこの二つが書いておらず，書かなくても別にいいものだとずっと放置していたため，このミスに気づくのに 2 週間ほどかかりました…
そのため推論の結果も散々で頭を悩まされていました…おそらくこのミスは一生忘れることがないと思います．

## 最後に

ですがこのミスのおかげで PyTorch，Deep Learning の知識をより深めることができたので結果オーライかなと…思い込みます！！
