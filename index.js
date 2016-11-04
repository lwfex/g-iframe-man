/**
 * Created by laiyq@txtws.com on 2016/11/3.
 */
(function () {
    var scriptArr = document.getElementsByTagName("script");
    var curScript = scriptArr[scriptArr.length - 1];
    if (curScript.src.match(/g-iframe-man/)) {
        //独立使用
        var exportName = $(curScript).attr('exports');
        if (!exportName) {
            console.error('please use as: <script src="[g-iframe-man url]" exports="[the name you want]"></script>');
            return;
        }
        window[exportName] = require('./src/main.js');
    } else {
        module.exports = require('./src/main.js');
    }
})();