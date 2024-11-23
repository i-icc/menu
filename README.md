# menu
自分専用のレシピ・メニュー表

## dir 構成
```
.
├── .github
│   └── workflows
├── src
│   └── menu-client
└── terraform
```
* src
  * アプリケーションファイル
  * menu-client
    * クライアントソース
* terraform
  * IaC 周りのコード
* .github
  * terraform
    * actions のファイル

## deploy
* main へのマージで自動デプロイ
  * テスト環境は特になし
  * とりあえず勉強も兼ねて AWS へ
    * お金もかかるのでしばらくしたら GithubPages か Vercel に乗り換える
