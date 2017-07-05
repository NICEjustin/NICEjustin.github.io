//创建天空背景类
function Sky(option) {
    this.ctx = option.ctx;
    this.skyImg = option.skyImg;
    this.x = option.x;
    this.y = option.y || 0;


    this.skyW = option.skyImg.width;
    this.speed = 2;
}
Sky.prototype = {
    constructor: Sky,
    draw: function () {
        this.x -= this.speed;
        if (this.x < -this.skyW) {
            this.x += 2 * this.skyW
        }
        this.ctx.drawImage(this.skyImg, this.x, this.y);
    }
}


//创建小鸟类
function Bird(option) {
    this.ctx = option.ctx;
    this.birdImg = option.birdImg;
    this.canvasX = option.canvasX;
    this.canvasY = option.canvasY;

    this.birdImgW = option.birdImg.width / 3;
    this.birdImgH = option.birdImg.height;
    this.birdX = 0;
    this.birdIndex = 0;
    this.birdSpeed = 0;
    this.g = 0.0003;
    this.maxAngle = 45;
    this.maxSpeed = 0.45;
}
Bird.prototype = {
    constructor: Sky,
    draw: function (offsetT) {
        this.birdX = this.birdIndex * this.birdImgW;
        this.birdSpeed = this.birdSpeed + this.g * offsetT;
        var distance = this.birdSpeed * offsetT + this.g * this.birdSpeed * this.birdSpeed / 2;
        this.canvasY += distance;
        var currentAngle = this.maxAngle * this.birdSpeed / this.maxSpeed;
        this.ctx.save();
        this.ctx.translate(this.canvasX + this.birdImgW / 2, this.canvasY + this.birdImgH / 2);
        this.ctx.rotate(Math.PI / 180 * currentAngle);
        this.ctx.drawImage(this.birdImg, this.birdX, 0, this.birdImgW, this.birdImgH, -this.birdImgW / 2, -this.birdImgH / 2, this.birdImgW,
            this.birdImgH);
        this.ctx.restore();
        this.birdIndex++;
        if (this.birdIndex > 2) {
            this.birdIndex = 0;
        }
    }
}

//创建管道类
function Pipe(option) {
    this.ctx = option.ctx;
    this.topImg = option.topImg;
    this.bottomImg = option.bottomImg;
    this.x = option.x;

    this.width = option.topImg.width;
    this.topH = option.topImg.height;
    this.topY = 0;
    this.bottomY = 0;
    this.space = 150;
    this.speed = 2;
    this.getY();
}
Pipe.prototype = {
    contructor: Pipe,
    draw: function () {
        this.x -= this.speed;
        if (this.x < -3 * this.width) {
            this.x += 3 * this.width * 6;
            this.getY();
        }
        this.ctx.drawImage(this.topImg, this.x, this.topY);
        this.ctx.rect(this.x, 0, this.width, this.topY + this.topH);
        this.ctx.drawImage(this.bottomImg, this.x, this.bottomY);
        this.ctx.rect(this.x, this.bottomY, this.width, canvas.height - this.bottomY);
    },
    getY: function () {
        this.topY = -(Math.random() * 250 + 120);
        this.bottomY = this.topY + this.space + this.topH;
    }
}

//创建陆地类
function Land(option) {
    this.ctx = option.ctx;
    this.landImg = option.landImg;
    this.x = option.x;
    this.y = option.y || 0;

    this.landW = option.landImg.width;
    this.landH = option.landImg.height;
    this.speed = 2;
}
Land.prototype = {
    constructor: Land,
    draw: function () {
        this.x -= this.speed;
        if (this.x < -this.landW) {
            this.x += 4 * this.landW
        }
        this.ctx.drawImage(this.landImg, this.x, this.y);
    }
}

//获取加载外部图片
function loadImage(arr, callback) {
    var count = 0;
    var imgList = [];
    for (var i = 0; i < arr.length; i++) {
        var img = new Image();
        img.src = "./images/" + arr[i] + ".png";
        imgList[arr[i]] = img;
        img.onload = function () {
            count++;
            if (count == arr.length) {
                callback(imgList);
            }
        }
    }
}

//设置游戏进行时间
function SetTime(option) {
    this.ctx = option.ctx;
    this.gameStart = option.gameStart;
    this.draw()
}
SetTime.prototype = {
    constructor: SetTime,
    draw: function () {
        this.ctx.save();
        var gameOver = Date.now();
        var timing = (gameOver - this.gameStart) / 1000;
        var hour = Math.floor(timing / 3600);
        var minute = Math.floor(timing / 60 % 60);
        var second = Math.floor(timing % 60);
        var milliseconds = Math.floor(timing % 1 * 1000);
        var str = "游戏时间 " + hour + "时 " + minute + "分 " + second + "秒 " + milliseconds + "毫秒";
        this.ctx.textBaseline = "top";
        this.ctx.font = "20px 微软雅黑";
        this.ctx.fillText(str, 500, 0);
        this.ctx.restore();
    }
}

function startText(str) {
    ctx.save();
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "20px 微软雅黑";
    ctx.fillText(str, canvas.width / 2, canvas.height / 2);
    ctx.restore();
}