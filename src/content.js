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

let paragraph;
let child;
let text;
let newNodes=[];
let a;
let i;
let where;


// 関数の定義 //
// 引数に与えられた文字列が日本語であるかどうかを判定する関数
function ja2Bit ( str ) {
  return ( str.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/) )? true : false;
}


// ページ内にボタンを配置する関数
function setButtonsInPage(paragraphs, word) {
    // paragraphsに入っているノードごとに処理
    for (i=0; i<paragraphs.length; i++) {
        // paragraphはparagraphsの上からi番目の要素
        paragraph = paragraphs[i];

        // paragraphの子ノードを一つずつ処理
        for (let j=0; j<paragraph.childNodes.length; j++) {
            // childはparagraphの子ノード
            child = paragraph.childNodes[j];
            // textはparagraphのテキスト
            text = child.textContent;
            // whereは単語がtextの中で出てくる位置
            where = text.indexOf(word);
            // newNodesを空にしておく
            newNodes = [];
            if(where !== -1) {
                // textに用語が含まれていれば新しいテキストノードとaタグの子要素を作成する
                // textを用語以前と用語より後に分割し、それぞれnewTextとnewText2に代入する
                newText = text.substr(0, where+word.length);
                newText2 = text.substr(where+word.length);
                // newText2の1文字目が日本語でない場合、ここより下の行は実行しない
                let first_char = newText2.charAt(1);
                console.log(first_char);
                if (!ja2Bit(first_char)) {
                    continue;
                }
                // aタグのノードを作成する
                a = document.createElement('a');
                a.text = '解説';
                a.id = `easy-term-auto-${buttonNum}`;
                a.name = word;
                a.style.fontSize = '30%';
                // 新しいノードをnewNodesにまとめておく
                newNodes.push(document.createTextNode(newText)) 
                newNodes.push(a);
                newNodes.push(document.createTextNode(newText2));

                // paragraphの新しいchildと置き換える古いchildを削除
                paragraph.removeChild(child);

                // paragraphに新しいテキストノードを挿入する
                for (let x=newNodes.length-1; x>=0; x--) {
                    paragraph.insertBefore(newNodes[x], paragraph.childNodes[j]);
                }

                // HTMLタグのid用の変数を数え上げ
                buttonNum++;
                // 新しい要素が2つ追加されているので、jを2繰り上げ
                j += 2;
            }
        }
    }
}

// ボタンクリックを監視し、クリック時の動作を決める
function buttonBehavior(popup, button_num, word_list) {
    for (let i=0; i<button_num; i++) {
        let button = document.getElementById(`easy-term-auto-${i}`);
        button.addEventListener('click', function (event) {
            if (popup.style.visibility === 'hidden') {
                popup.style.visibility = 'visible';
                for (let j=0; j<word_list.length; j++){
                    if (button.name === word_list[j]['word']) {
                        popup.innerHTML = `<h1>${button.name}とは</h1><br><p>${word_list[j]['short_description']}</p>`;
                    }
                }
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
    // json内の単語一つずつ、ページ内にボタンを配置する
    for (let word in json) {
        // ページ内にボタンを配置する
        setButtonsInPage(paragraphs, json[word]['word']);
    }
    // ボタン押下時の挙動を設定する
    buttonBehavior(popup, buttonNum, json);
});




