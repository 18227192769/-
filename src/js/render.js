(function ($, root) {

    function renderImage (src) {
        var image = new Image();
        image.src = src;
        image.onload = function () {
            $('.img-box img').attr('src', src);
            root.blurImg(image, $('body'));
        }
    }

    function renderInfo (data) {
        $('.song-name').text(data.song);
        $('.singer-name').text(data.singer);
        $('.album-name').text(data.album);
    }

    function renderIsLike (islike) {
        if (islike) {
            $('.like').addClass('liking');
        } else {
            $('.like').removeClass('liking');
        }
    }

    root.render = function (data) {
        renderImage(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    };
})(window.Zepto, window.player || (window.player = {}))