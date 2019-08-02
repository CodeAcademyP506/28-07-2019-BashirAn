var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var prev = document.getElementById("prev");
var play = document.getElementById("play");
var next = document.getElementById("next");
var music = document.getElementById("myMusic");
var timeMusic = document.getElementById("musicTime")
var musicLength = document.getElementById("endTimer")
var musicUpdateLength = document.getElementById("startTimer")
var pause = document.getElementById("pause")
var volume = document.getElementById("volume")
pause.style.display = "none";
canvas.width = 400;
canvas.height = 300;
var grd = ctx.createLinearGradient(0.000, 46.000, 300.000, 254.000);
grd.addColorStop(0.221, 'rgba(255, 0, 135, 1.000)');
grd.addColorStop(0.978, 'rgba(0, 12, 255, 1.000)');
ctx.fillStyle = grd;
ctx.fillRect(0, 0, canvas.width, canvas.height);

var cornerRadius = 10;
var rectX = 5;
var rectY = 20;
var rectWidth = canvas.width - 10;
var rectHeight = canvas.height - 40;
ctx.lineJoin = "round";
ctx.lineWidth = cornerRadius
ctx.fillStyle = "rgba(255,255,255,0.63)";
ctx.strokeStyle = "rgba(255,255,255,0.63)"
ctx.strokeRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
ctx.fillRect(15, 30, rectWidth - 20, rectHeight - 20);
music.addEventListener("canplay", function () {
    timeMusic.max = this.duration
    musicLength.innerText = ((this.duration / 60) * 100).toFixed() / 100
})
music.addEventListener("timeupdate", function () {
    timeMusic.value = this.currentTime;
    musicUpdateLength.innerText = (this.currentTime).toFixed() / 100
    var val = ($("#musicTime").val() - $("#musicTime").attr('min')) / ($("#musicTime").attr('max') - $("#musicTime").attr('min'));
    $("#musicTime").css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val + ', #000000), '
        + 'color-stop(' + val + ', #ffffff)'
        + ')'
    );
    var val = ($('#volume').val() - $('#volume').attr('min')) / ($('#volume').attr('max') - $('#volume').attr('min'));
    $('#volume').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val + ', #000000), '
        + 'color-stop(' + val + ', #ffffff)'
        + ')'
    );
    localStorage.setItem("videoData", this.currentTime);
})
music_info();
function music_info() {
    music_img = new Image()
    musicImg = ["queen.jpg", "champions.png", "bruno.jpg"];
    musicName = ["queen", "champions", "bruno"];
    musicList = ["queen.mp3", "champions.mp3", "bruno.mp3"]
    i = 0;
    ctx.clearRect(40, 50, 320, 70)
    music_img.src = musicImg[2]
    music_text = musicName[2]
    music_subText = musicName[2]
    music.src = musicList[2]
    music.volume =  volume.value / 100

    prev.addEventListener("click", function () {
        ctx.clearRect(40, 50, 320, 70)
        if (i >= 0) {
            music_img.src = musicImg[i]
            music_text = musicName[i]
            music_subText = musicName[i]
            music.src = musicList[i]
        music.volume =  volume.value / 100

            music.play();
            if (i == 0) {
                i = 2
            } else {
                i--;
            }

        }
    })
    next.addEventListener("click", function () {
        ctx.clearRect(40, 50, 320, 70)
        if (i <= 2) {
            music_img.src = musicImg[i]
            music_text = musicName[i]
            music_subText = musicName[i]
            music.src = musicList[i]
            music.volume =  volume.value / 100
            music.play();
            if (i == 2) {
                i = 0
            } else {
                i++
            }
        }
    })

    play.addEventListener("click",function(){
            music.play();
            pause.style.display = "inline";
            play.style.display = "none";
        
    })
    pause.addEventListener("click",function(){
        music.pause();
        play.style.display = "inline";
        pause.style.display = "none";
    })

    music_img.onload = function () {
        ctx.drawImage(music_img, 40, 50, 70, 70);
        ctx.font = "18px verdana";
        ctx.fillStyle = "black";
        ctx.fillText(music_text, 130, 80);
        ctx.font = "17px verdana";
        ctx.fillStyle = "black";
        ctx.fillText(music_text, 130, 100);
    }
    volume.addEventListener("change", function () {
        music.volume = this.value / 100
    })

}
$('#musicTime').on("change mousemove", function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    $(this).css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val + ', #000000), '
        + 'color-stop(' + val + ', #ffffff)'
        + ')'
    );
});
$('#volume').on("change mousemove", function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

    $(this).css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val + ', #000000), '
        + 'color-stop(' + val + ', #ffffff)'
        + ')'
    );
});