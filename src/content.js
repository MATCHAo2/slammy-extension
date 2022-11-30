// 変数の定義 //
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



// 関数の定義 //
// ページ内にボタンを配置する関数
function setButtonsInPage(paragraphs, word_list) {
    // paragraphsに入った各要素ごとに処理
    for (let i=0; i<paragraphs.length; i++) {
        // paragraphはparagraphsの上からi番目の要素
        let paragraph = paragraphs[i];
        let tmp = "";

        // 単語一つ一つに対して処理
        for (let j=0; j<word_list.length; j++) {
            // paragraph内の用語をボタンに置換したものをtmpに代入する
            tmp = paragraph.innerHTML.replace(word_list[j]['word'], `${word_list[j]['word']}<a type="button" id='easy-term-auto-${buttonNum}' name='${word_list[j]['word']}' style='font-size:30%'>解説</a>`);
            // paragraphとtmpが異なればparagraphのinnerHTMLをtmpに置換
            if (tmp !== paragraph.innerHTML) {
                paragraph.innerHTML = tmp;
                // buttonNum数え上げ
                buttonNum += 1;
            }
        }

    } //paragraphs[i]の処理終わり
}

// ボタンクリックを監視し、クリック時の動作を決める
function buttonBehavior(popup, button_num, word_list) {
    for (let i=0; i<button_num; i++) {
        let button = document.getElementById(`easy-term-auto-${i}`);
        button.addEventListener('click', function (event) {
            if (popup.style.visibility === 'hidden') {
                popup.style.visibility = 'visible';
                for (let j=1; j<=word_list.length; j++){
                    if (button.name === word_list[j]['word']) {
                        popup.innerHTML = `<h1>${button.name}とは</h1><br><p>${word_list[j]['short_description']}</p>`;
                    }
                }
                let extend_btn = document.createElement("a");
                extend_btn.innerText = "詳細";
                extend_btn.id = "easy-term-popup-extend_btn";
                popup.appendChild(extend_btn);
            } else {
                popup.style.visibility = 'hidden';
            }
        });
    }
}

// p要素解析 //
// ポップアップ生成
let popup = document.createElement('div');
popup.setAttribute('class', 'easy-term-popup');
document.body.appendChild(popup);

// APIから用語リスト取得
fetch(apiUrl + "words",{method: "GET"})
.then(response => response.json())
.then(json => {
    // wordListにjsonを代入しておく
    wordList = json;
    // ページ内にボタンを配置する
    setButtonsInPage(paragraphs, json);
    // ボタン押下時の挙動を設定する
    buttonBehavior(popup, buttonNum, json);
});




