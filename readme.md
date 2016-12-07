#标签页风格的后台窗口管理器

引入
```html
<link href="../dist/g-iframe-man.min.css" rel="stylesheet"/>
<script src="../dist/g-iframe-man.min.js"></script>
```

用法
```javascript
    //创建一个窗口管理器
    var man = new GIframeMan({
        $container: $('.container')
    });
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
var GIframeMan = require('g-iframe-man');
```