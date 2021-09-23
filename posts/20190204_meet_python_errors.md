---
title: 【Python】エラー集
date: 2019-02-04 00:32
categories: 技術 知見 python
---

## Python を書いているときに遭遇したエラー

自分のためにエラー集作ります．他の方も参考にしてくれてもええんですよ！？

> local variable ‘xxx’ referenced before assignment

変数 xxx をローカル変数として認識してしまうエラー．特に関数を使う際に起こりがち．以下例は[参考文献](https://snowtree-injune.com/2018/07/29/post-734/)を参照しています．

```python
def printX():
    # xはローカル変数として認識される
    x = x + 5

x = 2
printX() # local variable 'x' referenced before assignment
```

> index out of bounds

配列に値を格納する際，配列の大きさに対して指定した要素数の値が大きいとき特に表示されるエラー．

```python
array = [1, 3, 4]
print(array[3]) # index out of bounds
```

今回は pandas で csv を読み込んだときに起こったエラーで，その理由としては一行目が header として読み込まれていたため，個数が一致しなかったというものだった(一個格納する値の個数が減ってしまっていた)．

なので，

```python
pandas.read_csv(‘xxx.csv’, header=None)
```

これで解決できた．

## 最後に

たぶんエラーが出るたび更新されていきます，なんか間違った認識等僕がしていたら，ぜひ GitHub の Issue にて指摘お願いします！

## 参考文献

1. https://snowtree-injune.com/2018/07/29/post-734/
