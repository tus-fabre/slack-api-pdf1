# slack-api-pdf1

## NodeJSとSlack APIによるいまどきのネットワークプログラミング

### レポートを作成する その1

Slack上でテキスト、表、画像からなるレポートをPDFファイル形式で制作する方法について習得する。2章から8章まで実装した要素部品を組み合わせて対象国の情報、その国の新型コロナウィルスの状況、これまでの履歴を一つのレポートとして統合する。

[動作確認の手順]

1. コマンドプロンプトを開き、ダウンロードしたフォルダへ移動する
1. npm installコマンドでアプリに依存するパッケージをインストールする
1. .envファイルの環境変数SLACK_BOT_TOKEN、SLACK_APP_TOKENとDB_URLが正しく設定されているか確認する
1. アプリを起動する
    $ node ./app.js
1. Slackアプリをインストールしたチャネルのメッセージ欄に「/covid19」と入力する
1. 選択メニューから適当な国を選ぶ
1. 該当国の感染状況の下に[レポート作成]ボタンが配置されていることを確認する
1. ボタンをクリックすると、Report-<国名>-<タイムスタンプ>.pdfファイルをSlackにアップロードする
1. ファイルに見出しと作成日時が記載されていることを確認する
