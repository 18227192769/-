var root = window.player;
var data = null;
var audio = root.audioPlayer;
var indexControl;
var timer = null;
var deg = 0;

function getData(url) {
    $.ajax({
        type: 'get',
        url: url,
        success: function (res) {
            data = res;
            indexControl = root.indexControl(data.length);
            root.render(res[0]);
            audio.getAudio(res[0].audio);
            console.log(data);
            renderSongList();
        }
    })
}
getData('http://localhost:8086/dist/mock/data.json');

function changeSong(select, i) {
    var i = i || '';
    deg = 0;
    indexControl.index = parseInt(indexControl[select](i));
    root.render(data[indexControl.index]);
    audio.getAudio(data[indexControl.index].audio);
    $('.img-box').css({
        'transform' : 'rotate(0deg)',
        'transition' : 'none'
    })
    if (audio.status === 'play') {
        audio.play();
        rotate();
    }
}

function rotate() {
    clearInterval(timer);
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').css({
            'transform' : 'rotate(' + deg + 'deg)',
            'transition' : 'all 1s'
        })
    }, 200);
}

function renderSongList() {
    var str = '';
    data.forEach(function (ele, index, self) {
        str += '<li data-id = ' + index + '>\
                    <span>' + ele.song + '</span>\
                    <span>' + ele.singer + '</span>\
                    <span>' + ele.album + '</span>\
                </li>'
        console.log(arguments);
    })
    $('.song-box').html(str);
    $('.song-box').find('li').on('click', function () {
        indexControl.index = $(this).attr('data-id');
        changeSong('toIndex', indexControl.index);
    })
}

function bindEvent() {
    $('.prev').on('click', function () {
        changeSong('prev');
    });
    $('.next').on('click', function () {
        changeSong('next');
    });
    $('.play').on('click', function () {
        if (audio.status === "pause") {
            audio.play();
            rotate();
        } else {
            audio.pause();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    });
    $('.list').on('click', function () {
        $('.song-list').toggleClass('active');
    });
}
bindEvent();