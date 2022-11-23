// 用語リスト(暫定)
const word_list = [
    {
        "id": 5,
        "word": "CPU",
        "short_description": "中央演算処理装置の略"
    },
    {
        "id": 6,
        "word": "Ps",
        "short_description": "PhotoShop(フォトショップ)の略称。画像編集ソフトPhotoshop。"
    },
    {
        "id": 7,
        "word": "Ai",
        "short_description": "Illustration(イラストレーター)の略称。グラフィックデザインソフト。"
    }
];

// ボタンのidようにボタンの数を数え上げる
let button_num = 0;

// ポップアップをページの一番上に追加する
let popup = document.createElement('div');
popup.setAttribute('class', 'easy-term-popup');
document.body.appendChild(popup);


// ポップアップを表示する関数
function renderPopup() {
}

// webページの<p>要素のリスト
let paragraphs = document.querySelectorAll("p");

// paragraphsに入った各要素ごとに処理
for (let i=0; i<paragraphs.length; i++) {
    // paragraphはparagraphsの上からi番目の要素
    let paragraph = paragraphs[i];
    let tmp = "";
    
    // 単語一つ一つに対して処理
    for (let j=0; j<word_list.length; j++) {
        // paragraph内の用語をボタンに置換したものをtmpに代入する
         tmp = paragraph.innerHTML.replace(word_list[j]['word'], `<a type="button" id='easy-term-auto-${button_num}'>${word_list[j]['word']}</a>`);
         // paragraphとtmpが異なればparagraphのinnerHTMLをtmpに置換
         if (tmp !== paragraph.innerHTML) {
            paragraph.innerHTML = tmp;
            // button_num数え上げ
            button_num += 1;
         }
    }

} //paragraphs[i]の処理終わり

// ボタンクリックを監視し、クリック時の動作を決める
for (let i=0; i<button_num; i++) {
    let button = document.getElementById(`easy-term-auto-${i}`);
    button.addEventListener('click', function (event) {
        if (popup.style.visibility === 'hidden') {
            for (let j=0; j<word_list.length; j++){
                if (button.innerText === word_list[j]['word']) {
                    popup.innerHTML = `<h1>${button.innerText}とは</h1><br><p>${word_list[j]['short_description']}</p>`;
                }
            }
            popup.style.right = 30 + 'px';
            popup.style.top = 30 + 'px';
            popup.style.visibility = 'visible';
        } else {
            popup.style.visibility = 'hidden';
        }
    });
}
