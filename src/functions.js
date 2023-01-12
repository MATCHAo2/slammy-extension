function buttonBehavior(popup, button_num, word_list, height) {
    for (let i=0; i<button_num; i++) {
        let button = document.getElementById(`easy-term-auto-${i}`);
        button.addEventListener('click', function (event) {
            if (popup.style.display === 'none') {
                popup.style.display = 'block';
                for (let j=0; j<word_list.length; j++){
                    if (button.name === word_list[j]['word']) {
                        popup.setAttribute('name', word_list[j]['id']);
                        document.getElementById('easy-term-header-text').innerText = word_list[j]['word'];
                        document.getElementById('easy-term-short-description').innerText = word_list[j]['short_description'];
                    }
                }
                height = popupAllDesc.clientHeight + popupHeader.clientHeight;
                popup.style.height = height + "px";
            } else {
                popup.style.display = 'none';
                document.getElementById('easy-term-detailed-description').innerText = "";
            }
        });
    }
}


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
                a.text = ' 解説 ';
                a.id = `easy-term-auto-${buttonNum}`;
                a.name = word;
                a.style.fontSize = '30%';
                a.style.color= '#f1f1f1';
                a.style.fontWeight= '500';
                a.style.background="darkgreen";
                a.style.fontFamily= "Zen Maru Gothic";
                a.style.borderRadius='20px';
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


function ja2Bit ( str ) {
  return ( str.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/) )? true : false;
}


function closePopup(popup, popupDesc, height) {
    popup.style.display = 'none';
    popupDesc.style.display = 'none';
    popup.style.height = height + "px";
}
