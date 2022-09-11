// 用語リスト(暫定)
var word_list = ["CPU","RAM"];


// injectしたいコードを一つの関数にまとめる
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
         tmp = paragraph.innerHTML.replace(word_list[j], `<button type="button" class='easy-term-auto'>${word_list[j]}</button>`);
         if (tmp !== paragraph) {
            paragraph.innerHTML = tmp;
         }
    }

} //paragraphs[i]の処理終わり

var elements = document.getElementsByClassName("easy-term-auto");
for (let i=0; i<elements.length; i++) {
    var element = elements[i];
    element.addEventListener("click", function () {OnClickLink(element.innerText)});
}
