'use strict';

/*
 * [FILE] covid19_pdf.js
 *
 * [DESCRIPTION]
 *  新型コロナウィルスの感染状況をPDFファイルとして出力する関数を定義するファイル
 * 
 */

const PdfPrinter = require('pdfmake');
const util = require("util");
const stream = require("stream");
const fs = require("fs");
const { currentTimeStamp } = require('./current_time');
//const { httpGet } = require('./http_get');
require('dotenv').config();
//const BASE_URL=process.env.BASE_URL;
const LOCAL_FOLDER = process.env.LOCAL_FOLDER;
// ファイル保存時の同期処理に用いる
const finished = util.promisify(stream.finished);

// PDFファイルに用いるフォントの設定
const fonts = {
  IPAexGothic: {
    normal: './fonts/ipaexg.ttf',
    bold: './fonts/ipaexg.ttf'
  }
};

/*
 * [FUNCTION] pdfGenerateFile()
 *
 * [DESCRIPTION]
 *  新型コロナウィルスの感染状況の内容をPDFドキュメントファイルとして作成する
 * 
 * [INPUTS]
 *  datetime - 日時
 *  country - 対象となる国名
 * 
 * [OUTPUTS]
 *  成功: 作成されたPDFファイル名
 *  失敗: null
 */

exports.pdfGenerateFile = async (datetime, country) => {
  let output_file = null;

  let timestamp = currentTimeStamp();
  output_file = LOCAL_FOLDER + "/Report-" + country + "-" + timestamp + ".pdf";

  const docDefinition = {
    // PDFドキュメントの内容
    content: [
      // 見出し
      { text: 'COVID-19 レポート', style: 'title' },
      // 時刻の表示
      { text: '作成時刻: ' + datetime, style: 'datetime' },
    ],
    // スタイルを定義する
    styles: {
      title: { // 見出し
        font: 'IPAexGothic',
        fontSize: 24,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      }, // 時刻
      datetime: {
        font: 'IPAexGothic',
        fontSize: 16,
        alignment: 'right',
        margin: [0, 5, 0, 5]
      }
    }, // 初期スタイル
    defaultStyle: {
      font: 'IPAexGothic',
      fontSize: 14,
    }
  };

  // ドキュメントの内容をPDFファイルとして出力する
  try {
    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const ws = fs.createWriteStream(output_file);
    pdfDoc.pipe(ws);
    pdfDoc.end();
    await finished(ws);
    console.log("[INFO] ", output_file, 'has been saved.');
  } catch (ex) {
    console.error(ex.name + ": " + ex.message);
    output = null;
  }

  return output_file;
}

/*
 * END OF FILE
 */