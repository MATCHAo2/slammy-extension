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
// ~~~~~~~~~~~~変数定義 終~~~~~~~~~~~ //


// ~~~~~~~~~~~~関数の定義~~~~~~~~~~~~ //
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
                let last_char = newText.charAt(newText.length);
                if (!ja2Bit(first_char) && !ja2Bit(last_char)) {
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
            if (popup.style.display === 'none') {
                popup.style.display = 'block';
                for (let j=0; j<word_list.length; j++){
                    if (button.name === word_list[j]['word']) {
                        popup.setAttribute('name', word_list[j]['id']);
                        console.log(word_list[j]['id']);
                        document.getElementById('easy-term-header-text').innerText = word_list[j]['word'];
                        document.getElementById('easy-term-short-description').innerText = word_list[j]['short_description'];
                    }
                }
            } else {
                popup.style.display = 'none';
                document.getElementById('easy-term-detailed-description').innerText = "";
                popup.style.height = "150px";
            }
        });
    }
}

// ~~~~~~~~~~~~~~関数定義 終~~~~~~~~~~~~~~ //


// ~~~~~~~~~~~~~~実際の処理~~~~~~~~~~~~~~ //

/* ポップアップ生成 */
// ポップアップの要素生成
let popup = document.createElement('div');
popup.setAttribute('id', 'easy-term-popup');
popup.style.display = 'none';

// ポップアップのヘッダー
let popupHeader = document.createElement('header');
popupHeader.setAttribute('id', 'easy-term-header');

let popupHeaderText = document.createElement('h1');
popupHeaderText.setAttribute('id', 'easy-term-header-text');
popupHeader.appendChild(popupHeaderText);

let popupCross = document.createElement('span');
popupCross.setAttribute('id', 'easy-term-popup-cross');
popupHeader.appendChild(popupCross);

// ポップアップのヘッダーをポップアップの子要素に追加
popup.appendChild(popupHeader);

let popupAllDesc = document.createElement('div');
popupAllDesc.setAttribute('id', 'easy-term-popup-all-description');

let popupShortDesc = document.createElement('p');
popupShortDesc.setAttribute('id', 'easy-term-short-description');
popupAllDesc.appendChild(popupShortDesc);

let popupDescBtn = document.createElement('a');
popupDescBtn.setAttribute('id', 'easy-term-description-button');
popupDescBtn.innerText = '詳細';
popupAllDesc.appendChild(popupDescBtn);

// ポップアップの詳細説明の部分
let popupDesc = document.createElement('div');
popupDesc.setAttribute('id', 'easy-term-popup-description');

let popupDetailDesc = document.createElement('p');
popupDetailDesc.setAttribute('id', 'easy-term-detailed-description');
popupDesc.appendChild(popupDetailDesc);

let popupImgDesc = document.createElement('img');
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
            popup.style.height = "300px";
        });
    // 詳細解説が表示されている場合、詳細解説を非表示にする
    } else {
        popupDesc.style.display = 'none';
        popup.style.height = "150px";
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
    buttonBehavior(popup, buttonNum, json);
    /* x(cross)ボタン押下時の挙動 */
    popupCross.addEventListener('click', function (event) {
        popup.style.display = 'none';
        popupDesc.style.display = 'none';
        popup.style.height = "150px";
    });
    /* x(cross)ボタン押下時の挙動 終 */
});
/* 解説ボタンの配置 終 */
