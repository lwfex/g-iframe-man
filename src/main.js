/**
 * Created by laiyq@txtws.com on 2016/11/3.
 */
module.exports = function (options) {
    var __idMap = {};
    var _this = this;
    _this.options = {
        $container: null
    };
    $.extend(true, _this.options, options);

    var tpl = require('raw!./main.html');
    _this.$html = $(tpl).appendTo(_this.options.$container);
    _this.$tabContainer = _this.$html.find('.gim-tab-container');
    _this.$windowContainer = _this.$html.find('.gim-windows');

    //打开窗口
    _this.open = function (target) {
        //隐藏
        _this.$tabContainer.children().removeClass("active");
        _this.$windowContainer.children().removeClass('active');
        if (__idMap[target.url]) {
            var id = __idMap[target.url];
            _this.$tabContainer.children().filter('[data-id="' + id + '"]').addClass("active");
            _this.$windowContainer.children().filter('[data-id="' + id + '"]').addClass("active");
        } else {
            var title = target.title;
            var url = target.url;
            var index = 'f' + (new Date()).getTime();
            __idMap[url] = index;
            //新增tab
            var p = '<a href="javascript:;" class="active" data-id="' + index + '">' + title + ' <i class="fa fa-times-circle"></i></a>';
            _this.$tabContainer.append(p);
            var n = '<iframe class="active" name="iframe' + index + '" width="100%" height="100%" src="' + url + '" frameborder="0" data-id="' + index + '" seamless></iframe>';
            _this.$windowContainer.append(n);
        }
    };

    //关闭窗口
    _this.close = function (url) {
        var id = __idMap[url];
        if (id) {
            var $item = _this.$tabContainer.children('a[data-id="' + id + '"]');
            if ($item.length) {
                _this.closeByTab($item);
            }
            delete __idMap[url];
        }
    };

    _this.closeByTab = function ($item) {
        var id = $item.data('id');
        var $frame = _this.$windowContainer.children('iframe[data-id="' + id + '"]');
        var url = $frame.attr('src');
        if ($item.prev().length) {
            var prevId = $item.prev().data('id');
            $item.prev().addClass('active');
            _this.$windowContainer.children('iframe[data-id="' + prevId + '"]').show();
        } else if ($item.next().length) {
            var nextId = $item.next().data('id');
            $item.next().addClass('active');
            _this.$windowContainer.children('iframe[data-id="' + nextId + '"]').show();
        }
        $item.remove();
        $frame.remove();
        delete __idMap[url];
    };

    //点击关闭窗口
    _this.$html.on('click', '.gim-tab-container>a>i', function () {
        _this.closeByTab($(this).parent());
    });

    //点击刷新当前页面
    _this.$html.on('click', '.gim-btn-refresh', function () {
        var $frame = _this.$windowContainer.find('iframe.active');
        if ($frame.length) {
            $frame.attr('src', $frame.attr('src'));
        }
    })
};