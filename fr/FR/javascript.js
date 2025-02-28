window.addEventListener('load', canvasApp, false);

var play_left = false;
var play_right = false;
var stroke_color_left = "rgb(255, 80, 0";
var stroke_color_right = "rgb(255, 80, 0";
var timerLeft;
var timerRight;

function start_left() {
    play_left = !play_left;
    if (play_left) {
        playAudio();
        stroke_color_left = "rgb(0, 255, 0)";
        document.getElementById("play_button_left").style.color = "black";
        document.getElementById("play_button_left").style.background = "rgb(0, 255, 0";
    } else {
        pauseAudio();
        stroke_color_left = "rgb(255, 80, 0";
        document.getElementById("play_button_left").style.color = "white";
        document.getElementById("play_button_left").style.background = "rgb(255, 80, 0";
    }
}
function start_right() {
    play_right = !play_right;
    if (play_right) {
		playAudio();
        stroke_color_right = "rgb(0, 255, 0)";
        document.getElementById("play_button_right").style.color = "black";
        document.getElementById("play_button_right").style.background = "rgb(0, 255, 0";
    } else {
		pauseAudio();
        stroke_color_right = "rgb(255, 80, 0";
        document.getElementById("play_button_right").style.color = "white";
        document.getElementById("play_button_right").style.background = "rgb(255, 80, 0";
    }
}

function canvasApp() {
    if (!document.createElement('canvas').getContext) {
        return;
    }
    var time_player_left = "00:00:00";
    var time_player_right = "00:00:00";

    var theCanvas = document.getElementById('canvas');
    var context = theCanvas.getContext('2d');

    var img = document.getElementById("bg_1");


    var radius = 120;
    var step_left = 1;
    var step_right = 1;

    var circleX1 = 250;
    var circleY1 = 250;

    var circleX2 = 900;
    var circleY2 = 250;


    var ball_1 = { x1: 0, y1: 0, angle: 0 };
    var ball_2 = { x2: 0, y2: 0, angle: 135 };

    //MusicStuff
    const mp3file = "./FR/ahmna.mp3"
    const audioContext = new window.AudioContext()
    const audio = new Audio(mp3file)
    var papaTime
    let papa = document.getElementById("demo")
    papaDura = papa.duration
    papa.addEventListener("timeupdate",function(){
        papaTime = papa.currentTime*1000
        
         console.log(papa.duration)
    })
    function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        secs = (secs <10)? "0"+secs : secs
        // var hrs = (s - mins) / 60;
      
        return  mins + ':' + secs + ':' + Math.floor(ms);
      }

    function timer(x,y,time, color ="#FFF", font = "arial",fontsize = 23){
        this.time = time
        this.x = x
        this.y = y
        this.color = color
        // this.text = text
        this.font = font
        this.fontsize = fontsize

        this.draw = () =>{
            context.fillStyle = this.color;
            context.font = this.fontsize + "px " + this.font;
            context.fillText(this.time, this.x, this.y);
        }
        this.update = (time) => {
            if(time){
                this.time = msToTime(time)
            }
            this.draw()
        }
    }

    function drawCanvas() {

        //Hintergrundbild


        //Hintergrund
        context.fillStyle = 'rgb(50, 50, 50)';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);



        // Trennlinie Mitte
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = "silver";
        context.moveTo(theCanvas.width * 0.5, 25);
        context.lineTo(theCanvas.width * 0.5, 425);
        context.stroke();
        context.closePath();

        var radAngle = ball_1.angle * Math.PI / 180;
        ball_1.x1 = circleX1 + radius * Math.cos(radAngle);
        ball_1.y1 = circleY1 + radius * Math.sin(radAngle);

        var radAngle = ball_2.angle * Math.PI / 180;
        ball_2.x2 = circleX2 + radius * Math.cos(radAngle);
        ball_2.y2 = circleY2 + radius * Math.sin(radAngle);

        if (play_left) {
            ball_1.angle += step_left;

        }
        if (play_right) {
            ball_2.angle += step_right;
        }
        //Hintergrund Player links zeichnen
        context.fillStyle = "black";
        context.strokeStyle = stroke_color_left;
        context.lineWidth = 5;
        context.beginPath();
        context.arc(250, 250, 150, 90, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
        context.fill();

        //Innenkreis Player links zeichnen
        context.strokeStyle = stroke_color_left;
        context.lineWidth = 2;
        context.beginPath();
        context.arc(250, 250, 60, 90, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();

        //Zeitanzeige links
        timerLeft.update(papaTime)


        // context.fillStyle = "white";
        // context.font = "22px Verdana";
        // context.fillText(time_player_left, 198, 258);

        //Marker links zeichnen
        context.fillStyle = stroke_color_left;
        context.strokeStyle = "white";
        context.beginPath();
        context.arc(ball_1.x1, ball_1.y1, 20, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
        context.stroke();

        //Hintergrund Player rechts zeichnen
        context.fillStyle = "black";
        context.strokeStyle = stroke_color_right;
        context.lineWidth = 5;
        context.beginPath();
        context.arc(900, 250, 150, 90, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
        context.fill();

        //Innenkreis Player rechts zeichnen
        context.strokeStyle = stroke_color_right;
        context.lineWidth = 2;
        context.beginPath();
        context.arc(900, 250, 60, 90, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();

        //Zeitanzeige rechts
        timerRight.update("21:12:33")

        //Marker rechts zeichnen
        context.fillStyle = stroke_color_right;
        context.strokeStyle = "white";
        context.beginPath();
        context.arc(ball_2.x2, ball_2.y2, 20, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
        context.stroke();

    }

    function init(){
        timerLeft = new timer(198, 258,"00:00:00")
        timerRight = new timer(850, 258,"21:21:12")
    }

    function renderingLoop() {
        requestAnimationFrame(renderingLoop);
        drawCanvas();
    }
    init();
    renderingLoop();

}

var audio;
window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
    audio = document.getElementById('demo');
}

function playAudio() {
    audio.play()
}

function pauseAudio() {
    audio.pause()
}

function increaseVolume() {
    audio.volume += 0.1
}

function decreaseVolume() {
    audio.volume -= 0.1
}







