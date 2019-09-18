(function ($, root) {
    function AudioPlayer () {
        this.audio = new Audio();
        this.status = 'pause';
    }

    AudioPlayer.prototype = {
        play : function () {
            this.audio.play();
            this.status = "play";
        },
        pause : function () {
            this.audio.pause();
            this.status = "pause";
        },
        getAudio : function (src) {
            this.audio.src = src;
            this.audio.load();
        }
    }

    root.audioPlayer = new AudioPlayer();

})(window.Zepto, window.player || (window.player = {}))