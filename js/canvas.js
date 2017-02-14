var canvas = $("#background").get(0);
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Circle colors allowed
var circleColors = new Array();
circleColors[0]="#fff";
circleColors[1]="#4F1F42";
circleColors[2]="#CBE86B";

var dimensions = [40,14,6];

var circles = [];

function makeCircles() {

    function defineCircle(){
        var circle,
        newX = Math.random()>0.5?window.innerWidth:0,
        newY = Math.random()>0.5?window.innerHeight:0,
        random = Math.random()*5;
        circle = {};
        // Start render outside vision canvas
        if(newY>0){
            newY = newY+2*dimensions[0]*random;
        }
        else {
            newY = newY-2*dimensions[0]*random;
        }

        if(newX>0){
            newX = newX+2*dimensions[0]*random;
        }
        else {
            newX = newX-2*dimensions[0]*random;
        }
        for (var i = 0; i < 3; i++) {
            circle[i] ={
                posX: newX,
                posY: newY,
                color: circleColors[i],
                radious:dimensions[i]*random
            };
        };

        circles.push(circle);
    }

    function renderContent() {
        for (var i = 0; i < circles.length; i++) {
            for (var j = 0; j < 3; j++) {
                var c = circles[i][j];
                context.fillStyle = c.color;
                context.beginPath();
                context.arc(c.posX, c.posY, c.radious, 0, 2 * Math.PI);
                context.fill();
            }
        }
    } //end function renderContent

    function animationLoop() {
        canvas.width = canvas.width,
        speed = 1;
        renderContent();
        for (var i = 0; i < circles.length; i++) {
            // Invert moviment
            for (var j = 0; j < 3; j++) {
                var c = circles[i][j];
                if(c.posY>c.radious*2) c.posY -= speed;
                else c.posY -= speed;

                if(c.posX>c.radious*2) c.posX -= speed;
                else c.posX -= speed;
            }
        }
        setTimeout(animationLoop, 33);
    } //end function animationLoop

    for (var i = 0; i < 3; i++) {
        defineCircle();
    }

    animationLoop();
} //end function makeCircles

makeCircles();