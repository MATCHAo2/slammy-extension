// ~~~~~~~~~~変数の定義~~~~~~~~~~~~~ //
// APIのURL
const apiUrl = "https://slamy.tech/api/v1/";

// webページの<p>要素のリスト
let paragraphs = document.querySelectorAll("p");

// 用語リスト
let wordList;

// 用語の解説
let wordDesc;

// ボタンのid用にボタンの数を数え上げる
let buttonNum = 0;

let paragraph;
let child;
let text;
let newNodes=[];
let a;
let i;
let where;
let height;

// ポップアップの構成要素
let popup;
let popupHeader, popupHeaderText, popupCross;
let popupAllDesc, popupShortDesc, popupDescBtn;
let popupDesc, popupDetailDesc, popupImgDesc;
// ~~~~~~~~~~~~変数定義 終~~~~~~~~~~~ //


// ~~~~~~~~~~~~~~実際の処理~~~~~~~~~~~~~~ //
// chromeのlocalstorageから値を取得
chrome.storage.local.get('slammyIsUse', function(event){
    if (event.slammyIsUse) {
/* フォントの読み込み */
let font = document.createElement('link');
font.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
font.setAttribute('rel', 'stylesheet');
document.body.appendChild(font);

/* ポップアップ生成 */
// ポップアップの要素生成
popup = document.createElement('div');
popup.setAttribute('id', 'easy-term-popup');
popup.style.display = 'none';

// ポップアップのヘッダー
popupHeader = document.createElement('header');
popupHeader.setAttribute('id', 'easy-term-header');

popupHeaderText = document.createElement('h1');
popupHeaderText.setAttribute('id', 'easy-term-header-text');
popupHeader.appendChild(popupHeaderText);

popupCross = document.createElement('span');
popupCross.setAttribute('id', 'easy-term-popup-cross');
popupHeader.appendChild(popupCross);

// ポップアップのヘッダーをポップアップの子要素に追加
popup.appendChild(popupHeader);

popupAllDesc = document.createElement('div');
popupAllDesc.setAttribute('id', 'easy-term-popup-all-description');

popupShortDesc = document.createElement('p');
popupShortDesc.setAttribute('id', 'easy-term-short-description');
popupAllDesc.appendChild(popupShortDesc);

popupDescBtn = document.createElement('button');
popupDescBtn.setAttribute('id', 'easy-term-description-button');
popupDescBtn.textContent = '　詳細をみる　';
popupAllDesc.appendChild(popupDescBtn);

// ポップアップの詳細説明の部分
popupDesc = document.createElement('div');
popupDesc.setAttribute('id', 'easy-term-popup-description');
popupDesc.style.display = 'none';

popupDetailDesc = document.createElement('p');
popupDetailDesc.setAttribute('id', 'easy-term-detailed-description');
popupDesc.appendChild(popupDetailDesc);

popupImgDesc = document.createElement('img');
popupImgDesc.setAttribute('id', 'easy-term-image');
popupDesc.appendChild(popupImgDesc);

// 説明部分をpopupAllDescの子要素に追加
popupAllDesc.appendChild(popupDesc);

// popupAllDescをpopupに追加
popup.appendChild(popupAllDesc);

// ポップアップをHTMLの子要素に追加
document.body.appendChild(popup);

/* 「詳細」ボタン押下時の挙動 */
let popupElement = document.getElementById("easy-term-popup");
let wordId = Number(popupElement.getAttribute('name'));
let descButton = document.getElementById("easy-term-description-button");
// イベントリスナ
descButton.addEventListener('click', function(event) {
    // 解説ボタンが配置されたタイミングで、各ボタンのname属性が用語のidになるので、それを取得する
    wordId = Number(popup.getAttribute('name'));
    // 詳細解説が表示されていない場合、APIから説明を持ってくる
    if (popupDesc.style.display === 'none') {
        popupDesc.style.display = 'block';
        fetch(apiUrl + "words/" + wordId, {method: "GET"})
        .then(response => response.json())
        .then(json => {
            document.getElementById('easy-term-detailed-description').innerText = json['detailed_description'];            
            height = popupAllDesc.clientHeight + popupHeader.clientHeight;
            popup.style.height = height + "px";
        });
    // 詳細解説が表示されている場合、詳細解説を非表示にする
    } else {
        popupDesc.style.display = 'none';
        height = popupHeader.clientHeight + popupShortDesc.clientHeight + popupDescBtn.clientHeight;
        popup.style.height = height + 20 + "px";
    }
});
/* 「詳細」ボタン押下時の挙動 終 */

/* ポップアップ生成オワリ */

/* 解説ボタンの配置 */
// APIから用語リストを取得し、解説ボタンをHTML内に配置する
fetch(apiUrl + "words",{method: "GET"})
.then(response => response.json())
.then(json => {
    // json内の単語一つずつ、ページ内にボタンを配置する
    for (let word in json) {
        // ページ内にボタンを配置する
        setButtonsInPage(paragraphs, json[word]['word']);
    }
    // ボタン押下時の挙動を設定する
    height = popupHeader.clientHeight + popupShortDesc.clientHeight + popupDescBtn.clientHeight;
    console.log(height);
    buttonBehavior(popup, buttonNum, json, height)
    /* x(cross)ボタン押下時の挙動 */
    popupCross.addEventListener('click', function (event) {
        popup.style.display = 'none';
        popupDesc.style.display = 'none';
        height = popupAllDesc.clientHeight + popupShortDesc.clientHeight;
        popup.style.height = height + "px";
    });
    /* x(cross)ボタン押下時の挙動 終 */
});
/* 解説ボタンの配置 終 */
}
});
