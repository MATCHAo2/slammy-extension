// 用語リスト(暫定)
var word_list = ["CPU","RAM"];

// ボタンのidようにボタンの数を数え上げる
var button_num = 0;

// ボタン押下時に実行される関数
function OnClickLink(word) {
    alert(word);
}


// webページの<p>要素のリスト
var paragraphs = document.querySelectorAll("p");

// paragraphsに入った各要素ごとに処理
for (let i=0; i<paragraphs.length; i++) {
    // paragraphはparagraphsの上からi番目の要素
    var paragraph = paragraphs[i];
    var tmp = "";
    
    // 単語一つ一つに対して処理
    for (let j=0; j<word_list.length; j++) {
        // paragraph内の用語をボタンに置換したものをtmpに代入する
         tmp = paragraph.innerHTML.replace(word_list[j], `<a type="button" id='easy-term-auto-${button_num}'>${word_list[j]}</a>`);
         // paragraphとtmpが異なればparagraphのinnerHTMLをtmpに置換
         if (tmp !== paragraph.innerHTML) {
            paragraph.innerHTML = tmp;
            // button_num数え上げ
            button_num += 1;
         }
    }

} //paragraphs[i]の処理終わり
for (let i=0; i<button_num; i++) {
    const button = document.getElementById(`easy-term-auto-${i}`);
    button.addEventListener('click', function () {OnClickLink(button.innerText)});
}
