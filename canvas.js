var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
    '#AF2BBF',
    '#A14EBF',
    '#6C91BF',
    '#5FB0B7',
    '#5BC8AF'
];

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

window.addEventListener('resize',
    function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

function Circle(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.minRadius = r;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        // bouncing off walls
        if( this.x + this.r > innerWidth || this.x - this.r < 0 ) {
            this.dx = -this.dx;
        }
        if( this.y + this.r > innerHeight || this.y - this.r < 0 ) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50
            && this.r < maxRadius) {
            this.r += 1;
        } else if(this.r > this.minRadius) {
            this.r -= 1;
        }

        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for( var i = 0; i < 400; i++ ) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - .5);
        var dy = (Math.random() - .5);
    
        circleArray.push(new Circle(x, y, dx, dy, radius) );
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circleArray.forEach(c => c.update());
    c.font ='30px Arial';
    c.fillStyle = 'black';
    c.textAlign = 'center';
    c.fillText('Under renovation...', c.canvas.width/2, c.canvas.height/2);
}

init();
animate();