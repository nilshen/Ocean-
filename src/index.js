// const Garbage = require("./scripts/garbage")
// const Player = require("./scripts/player")
// window.MovingObject = MovingObject;
// window.GameView = GameView;
// window.Game = Game;
// window.Monster = Monster;
// window.Garbage = Garbage;
// window.Player = Player;

document.addEventListener("DOMContentLoaded", () => {

    const canvasBoard = document.getElementById("canvasBoard");
    canvasBoard.width = 1400;
    canvasBoard.height = 800;
    const ctxBoard = canvasBoard.getContext('2d');


    // var background = new Image();
    // background.src = "./assets/SPONGEBOB.png";

    // background.onload = function () {
    //     ctxBoard.drawImage(background.src, 0, 0);
    // };

 // let gameFrame = 0;
    const edgePosition = canvasBoard.getBoundingClientRect();
    // window.addEventListener('resize', function (){
    //     return edgePosition
    // })

    const arrMouse = [];
    let hue = 0;

    const mouse = {
        x: undefined,
        y: undefined,
    };

    canvasBoard.addEventListener('mousemove', function (event) {
        mouse.x = event.x;
        mouse.y = event.y;

        for (let i = 0; i < 4; i++) {
            arrMouse.push(new mouseBubble());
        }
    });

    class mouseBubble {
        constructor() {
            this.x = mouse.x - edgePosition.left;
            this.y = mouse.y - edgePosition.top;

            this.size = Math.random() * 15 + 1;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;
            this.color = 'hsl(' + hue + ', 100%, 50%)';
        }
        updateMouse() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }

        drawMouse() {
            ctxBoard.fillStyle = this.color;
            ctxBoard.beginPath();
            ctxBoard.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctxBoard.fill();

        }
    }

    function mouseBubbleEffect() {
        for (let i = 0; i < arrMouse.length; i++) {
            arrMouse[i].updateMouse();
            arrMouse[i].drawMouse();

            if (arrMouse[i].size > 30) {
                arrMouse.splice(i, 1);
                i--;
            }
        }
    }


    //Player 
    function Player(x, y, radius, color) {
        this.x = canvasBoard.width / 2;
        this.y = canvasBoard.height / 2;
        this.radius = radius;
        this.color = color;
    }

    Player.prototype.drawPlayer = function () {
        ctxBoard.beginPath();
        ctxBoard.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctxBoard.fillStyle = this.color;
        ctxBoard.fill();
    };


    Player.prototype.movePlayer = function () {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;

        if (this.x !== mouse.x) {
            this.x -= dx;
        }
        if (this.y !== mouse.y) {
            this.y -= dy;
        }
    };

    const player = new Player(300, 300, 30, "blue");
    // player.drawPlayer();
    // console.log(player);


    //Monster
    function Monster() {
        this.x = Math.random() * canvasBoard.width;
        this.y = Math.random() * (canvasBoard.height / 2);
        this.radius = Math.random() + 30;
        this.speedX = Math.random() * 10;
        this.speedY = Math.random() * 10;
    }

    Monster.prototype.draw = function () {
        ctxBoard.fillStyle = 'red';
        // ctxBoard.strokeStyle = 'yellow';
        // ctxBoard.lineWidth = 5;
        ctxBoard.beginPath();
        ctxBoard.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctxBoard.fill();
        // ctxBoard.stroke();
    };

    Monster.prototype.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };

    const monster = new Monster();
    monster.draw();



    //Garbage
    const arrGarbage = [];
    function Garbage() {
        this.x = Math.random() * canvasBoard.width;
        //Commented this out because the garbage needs to fall from the ceiling;
        this.y = Math.random() //* canvasBoard.height; 
        this.radius = 20;
        this.speedX = (Math.random() * 20 - 9.5) / 4; //goes two ways left/right  
        this.speedY = Math.random() * 3 + 2;
        // this.draw();
        this.distance;

    }

    Garbage.prototype.draw = function () {
        ctxBoard.fillStyle = "yellow";
        ctxBoard.beginPath();
        ctxBoard.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctxBoard.fill();
        ctxBoard.closePath();

    };

    Garbage.prototype.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };

    function addGarbage() {
        for (let i = 0; i < 20; i++) {
            arrGarbage.push(new Garbage());
        }
    }

//first try. code work but garbage disappear before hit the ground. 
    function flowGarbage() {
        for (let i = 0; i < arrGarbage.length; i++) {
            arrGarbage[i].move();
            arrGarbage[i].draw();
        }

        for (let j = 0; j < arrGarbage.length; j++) {
            if (arrGarbage[j].y > canvasBoard.height) {
                arrGarbage.splice(j, 1);    //should have been arrGarbage.splice(j, 1) not arrGarbage.splice(arrGarbage[j], 1)!!!!
            }
        }

        while (arrGarbage.length < 8) {
            arrGarbage.push(new Garbage());
        }
    }

    // function flowGarbage() {
    //     if (gameFrame % 30 === 0) {
    //         arrGarbage.push(new Garbage())
    //     }

    //     for (let i = 0; i < arrGarbage.length; i++) {
    //         arrGarbage[i].move()
    //         arrGarbage[i].draw()
    //         if (arrGarbage[i].y > canvasBoard.height) {
    //             arrGarbage.splice(i, 1);
    //     }
    // }
    // }

    function animate() {
        ctxBoard.clearRect(0, 0, canvasBoard.width, canvasBoard.height);
        // drawPlayer()
        // movePlayer()

        flowGarbage();
        // gameFrame++;
        ctxBoard.fillStyle = 'rgba(1,1,1,0)';
        ctxBoard.fillRect(0, 0, canvasBoard.width, canvasBoard.height);
        mouseBubbleEffect();
        hue += 3;
        canvasBoard.getBoundingClientRect()
        requestAnimationFrame(animate);
    }
    animate();



});