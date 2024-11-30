# menu
自分専用のレシピ・メニュー表
site url : https://i-icc-menu.vercel.app/

## dir 構成
```
.
├── .github
│   └── workflows
├── src
│   ├── menu-client
│   └── menu-cms
└── terraform
```
* src
  * アプリケーションファイル
  * menu-client
    * クライアントソース
  * menu-cms
    * コンテンツマネジメント
* terraform
  * IaC 周りのコード
* .github
  * workflows
    * actions のファイル

## deploy
### menu-client
* main へのマージで自動デプロイ
  * テスト環境は特になし
  * とりあえず勉強も兼ねて AWS へ
    * ~お金もかかるのでしばらくしたら GithubPages か Vercel に乗り換える~
    * 現在は vercel にデプロイしてます


### menu-cms
* 適当なPCでホスティングしています
* <img width="1141" alt="スクリーンショット 2024-11-30 13 53 05" src="https://github.com/user-attachments/assets/f0115027-087e-47ba-9ef5-41a6a140d658">
