(function (root) {
    function Control(len) {
        this.index = 0;
        this.len = len;
    }

    Control.prototype = {
        prev : function () {
            return this.dealIndex(-1);
        },
        next : function () {
            return this.dealIndex(1);
        },
        toIndex : function (i) {
            return i;
        },
        dealIndex : function (val) {
            var len = this.len;
            var curIndex = (this.index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }

    root.indexControl = function (len) {
        return new Control(len);
    }

})(window.player || (window.player = {}))