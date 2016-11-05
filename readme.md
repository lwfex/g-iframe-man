#标签页风格的后台窗口管理器

引入
```html
<link href="../dist/g-iframe-man.css" rel="stylesheet"/>
<script src="../dist/g-iframe-man.js" exports="IframeMan"></script>
```

用法
```javascript
    //打开一个标签页
    man.open({
        title:"标签页",
        url: "http://baidu.com"
    });

    //关闭标签页
    man.close(url);
```

webpack项目中使用:
```javascript
require('g-iframe-man/src/css/main.less');
var IframeMan = require('g-iframe-man');
```