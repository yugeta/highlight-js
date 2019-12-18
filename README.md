HighLight.js
==

![title-banner](docs/banner.png)

```
Author : Yugeta.Koji
Date   : 2019.06.03
```

# Summary
WEBページのテキスト項目で任意のキーワードをハイライト表示させるライブラリ

# Speficication
- [highlight] 任意キーワードを<span>タグでくくってcss装飾を行う。
- [back]      戻す時に、textNodeが分割される症状を改善

- [form-input-text] ページ内の特定のフォーム（input text）の入力文字列を動的にハイライト
- [form-select]     ページ内に設置されているselectタグの値に沿ったハイライト
- [form]            ページ内のform項目のvalue値により動的ハイライト
- [query]           ページ読み込み時に、任意のクエリ値を検知してハイライト
- [hash]            ページ読み込み時に、ハッシュ値を検知して動的ハイライト（リンククリック対応）
- [draggable]       ページのマウスカーソルが選択しているエリアのキーワードと同じ文字列をハイライト（textarea内も対象）

- [save]  過去に検索したキーワードを記憶
- [count] ページ内に同じキーワードが何個あるか表示
- [move]  ページ内の同じキーワードに瞬時に移動できる機能
- 


# setup
1. load-library
```
<link rel="stylesheet" href="highlight.css">
<script src="highlight.js"></script>
```

2. start
```
<script>
  new $$highlight({
    highlight_class : "",
    form_selector : ""
  });
</script>
```


# OtherTools
- Browser-extension
- 
