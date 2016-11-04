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
        var $item = null;
        //隐藏
        _this.$tabContainer.children().removeClass("active");
        _this.$windowContainer.children().removeClass('active');
        if (__idMap[target.url]) {
            var id = __idMap[target.url];
            $item = _this.$tabContainer.children().filter('[data-id="' + id + '"]').addClass("active");
            _this.$windowContainer.children().filter('[data-id="' + id + '"]').addClass("active");
        } else {
            var title = target.title;
            var url = target.url;
            var index = 'f' + (new Date()).getTime();
            __idMap[url] = index;
            //新增tab
            $item = $('<a href="javascript:;" class="active" data-id="' + index + '">' + title + ' <i class="fa fa-times-circle"></i></a>');
            _this.$tabContainer.append($item);
            var n = '<iframe class="active" name="iframe' + index + '" width="100%" height="100%" src="' + url + '" frameborder="0" data-id="' + index + '" seamless></iframe>';
            _this.$windowContainer.append(n);
        }
        //是否显示上下切换按钮
        _this.whetherShowTabRoll($item);
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
            if ($item.is('.active')) {
                $item.prev().addClass('active');
                _this.$windowContainer.children('iframe[data-id="' + prevId + '"]').addClass('active');
            }
        } else if ($item.next().length) {
            var nextId = $item.next().data('id');
            if ($item.is('.active')) {
                $item.next().addClass('active');
                _this.$windowContainer.children('iframe[data-id="' + nextId + '"]').addClass('active');
            }
        }
        $item.remove();
        $frame.remove();
        //是否隐藏上下切换按钮
        _this.whetherHideTabRoll(_this.$tabContainer.find('.active'));
        delete __idMap[url];
    };

    //是否显示上下切换按钮
    _this.whetherShowTabRoll = function ($item) {
        //是否显示切换按钮
        var $tabRoll = _this.$html.find('.gim-tab-roll');
        if (!$tabRoll.is(':visible')) {
            if (_this.$tabContainer.height() > 40) {
                $tabRoll.show();
                resizeTabBarWidth();
            }
        }
        //自动定位tab页
        if ($item && $item.length) {
            _this.$tabContainer.css("margin-top", -($item.position().top) || 0);
        }
    };

    //是否隐藏上下切换按钮
    _this.whetherHideTabRoll = function ($item) {
        //是否隐藏切换按钮
        var $tabRoll = _this.$html.find('.gim-tab-roll');
        if ($tabRoll.is(':visible')) {
            if (_this.$tabContainer.height() == 40) {
                $tabRoll.hide();
                resizeTabBarWidth();
            }
        }
        if ($item && $item.length) {
            //自动定位tab页
            _this.$tabContainer.css("margin-top", -($item.position().top) || 0);
        }
    };

    //重置标签栏的宽度
    function resizeTabBarWidth() {
        _this.$tabContainer.css('padding-right', _this.$html.find('.gim-tool-bar-right').width());
    }

    //点击激活
    _this.$html.on('click', '.gim-tab-container>a:not(".active")', function () {
        var $item = $(this);
        _this.$tabContainer.children().removeClass('active');
        _this.$windowContainer.children().removeClass('active');
        $item.addClass('active');
        _this.$windowContainer.children('iframe[data-id="' + $item.data('id') + '"]').addClass('active');
    });

    //点击关闭窗口
    _this.$html.on('click', '.gim-tab-container>a>i', function () {
        _this.closeByTab($(this).parent());
        return false;
    });

    //显示上一个任务栏
    _this.$html.on('click', '.gim-prev', function () {
        var old = _this.$tabContainer.css("margin-top").replace(/^(-?\d+).*$/, '$1');
        old = 40 + parseInt(old);
        _this.$tabContainer.css("margin-top", old > 0 ? 0 : old);
    });

    //显示下一个任务栏
    _this.$html.on('click', '.gim-next', function () {
        var old = _this.$tabContainer.css("margin-top").replace(/^(-?\d+).*$/, '$1');
        old = -40 + parseInt(old);
        var min = 40 - _this.$tabContainer.height();
        _this.$tabContainer.css("margin-top", old < min ? min : old);
    });

    //点击刷新当前页面
    _this.$html.on('click', '.gim-btn-refresh', function () {
        var $frame = _this.$windowContainer.find('iframe.active');
        if ($frame.length) {
            $frame.attr('src', $frame.attr('src'));
        }
    });

    //窗口大小变化时
    $(window).on('resize', function () {
        _this.whetherShowTabRoll(_this.$tabContainer.find('.active'));
        _this.whetherHideTabRoll(_this.$tabContainer.find('.active'));
    });

    _this.show = function () {
        resizeTabBarWidth();
    }
};