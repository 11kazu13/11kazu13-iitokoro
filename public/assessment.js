'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  resultDivided.innerText = '';
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  tweetDivided.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたの推し診断') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたの推し診断';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

// 推しの候補リスト
const oshiList = [
  {
    name: '岩本照',
    group: 'Snow Man（STARTO ENTERTAINMENT）',
    trait: 'ストイックさと面倒見の良さ'
  },
  {
    name: '渡辺翔太',
    group: 'Snow Man（STARTO ENTERTAINMENT）',
    trait: '誠実さとこだわりの強さ'
  },
  {
    name: 'ジェシー',
    group: 'SixTONES（STARTO ENTERTAINMENT）',
    trait: '明るさと場を動かす力'
  },
  {
    name: '松村北斗',
    group: 'SixTONES（STARTO ENTERTAINMENT）',
    trait: '繊細さと芯の強さ'
  },
  {
    name: '道枝駿佑',
    group: 'なにわ男子（STARTO ENTERTAINMENT）',
    trait: '透明感と丁寧な表現力'
  },
  {
    name: '大橋和也',
    group: 'なにわ男子（STARTO ENTERTAINMENT）',
    trait: '親しみやすさと安定感'
  },
  {
    name: '向井地美音',
    group: 'AKB48（AKB48公式プロジェクト）',
    trait: '堅実さとリーダーシップ'
  },
  {
    name: '小栗有以',
    group: 'AKB48（AKB48公式プロジェクト）',
    trait: '華やかさと努力家な一面'
  },
  {
    name: '賀喜遥香',
    group: '乃木坂46（乃木坂46合同会社）',
    trait: '柔らかさと真面目さ'
  },
  {
    name: '遠藤さくら',
    group: '乃木坂46（乃木坂46合同会社）',
    trait: '清涼感と芯の強さ'
  },
  {
    name: 'RM',
    group: 'BTS（BIGHIT MUSIC／HYBE）',
    trait: '知性と表現の幅広さ'
  },
  {
    name: 'Jung Kook',
    group: 'BTS（BIGHIT MUSIC／HYBE）',
    trait: '多才さと安定した実力'
  },
  {
    name: 'Bang Chan',
    group: 'Stray Kids（JYP Entertainment）',
    trait: '頼もしさと気配り'
  },
  {
    name: 'Felix',
    group: 'Stray Kids（JYP Entertainment）',
    trait: 'ユニークさと魅力的な声'
  },
  {
    name: 'SANA',
    group: 'TWICE（JYP Entertainment）',
    trait: '愛嬌と明るいムード'
  },
  {
    name: 'Jisoo',
    group: 'BLACKPINK（YG Entertainment）',
    trait: '上品さと安定感'
  }
];

/**
 * 名前の文字列を渡すとおすすめの推しを返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfcharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfcharCode % oshiList.length;
  const oshi = oshiList[index];

  const result =
    `${userName}さんにおすすめの推しは「${oshi.name}」です！\n` +
    `所属: ${oshi.group}\n` +
    `${userName}さんと相性がいい理由: ${oshi.trait}が${userName}さんの心に響きます。` +
    `ぜひ${oshi.name}を推してみてください！`;

  return result;
}

// テストコード
console.assert(
  assessment('太郎').includes('太郎さんにおすすめの推しは'),
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
