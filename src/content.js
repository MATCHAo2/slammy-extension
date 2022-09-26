// 用語リスト(暫定)
const word_list = [
    ["CPU","CPUとは、コンピュータにおける中心的な処理装置。人間の部位に例えると、頭脳とされることが多い。"],
    ["RAM", "RAMとは、コンピュータで使用するメモリの一分類である。人間の道具に例えると、作業台とされることが多い。"],
];

// ボタンのidようにボタンの数を数え上げる
const button_num = 0;

// ポップアップをページの一番上に追加する
const popup = document.createElement('div');
popup.setAttribute('class', 'easy-term-popup');
document.body.appendChild(popup);

// ポップアップを表示させる関数
function renderPopup(mouseX, mouseY, selection) {
    popup.innerHTML = selection;
    popup.style.top = mouseY + 'px';
    popup.style.left = mouseX + 'px';
    popup.style.visibility = 'visible';
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
         tmp = paragraph.innerHTML.replace(word_list[j][0], `<a type="button" id='easy-term-auto-${button_num}'>${word_list[j][0]}</a>`);
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
        if (popup.style.visibility !== 'hidden') {
            // popupが表示されている場合、クリックしたときに非表示にする
            popup.style.visibility === 'hidden';
        } else {
            // popupが表示されていない場合、クリックしたときにカーソルの近くに表示するようにする
            let selection = window.getSelection().toString();
            if (selection.length > 0) {
                renderPopup(event.clientX, event.clientY, selection);
            }
        }
    });
}
