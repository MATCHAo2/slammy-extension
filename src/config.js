// ~~~~~関数定義~~~~~ //
// 保存ボタンを押されたときにchromeのlocal storageに設定項目を保存
function save_configs() {
    let isUse = document.getElementById('easy-term-config-is-use').checked;
    chrome.storage.local.set({
        slammyIsUse: isUse
    }, function() {
        let message = document.getElementById('easy-term-config-message');
        message.innerText = '保存しました！再読み込みで反映されます！';
    });
}

// 設定を開いた時に、設定項目の値をHTMLに反映させる関数
function restore_configs() {
    chrome.storage.local.get("slammyIsUse", function(value) {
        document.getElementById('easy-term-config-is-use').checked = value.slammyIsUse;
    });
}

// ~~~~~関数定義 終~~~~~//

document.addEventListener('DOMContentLoaded', restore_configs);
document.getElementById('easy-term-config-save').addEventListener('click', save_configs);
