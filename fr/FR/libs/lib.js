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
        this.time = msToTime(time)

        this.draw()
    }
}