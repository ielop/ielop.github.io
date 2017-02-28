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

    function defineCircle(number){
        var circle,
        newX = Math.random()>0.5?window.innerWidth:0,
        newY = Math.random()>0.5?window.innerHeight:0,
        biggestRadious = dimensions[0]*number,
        dX,dY,
        circle = {};
        // Start render outside vision canvas

        if(newY>0){
            newY = newY-biggestRadious;
            dY="up";
        }
        else {
            newY = newY+biggestRadious;
            dY="down";
        }

        if(newX>0){
            newX = newX-biggestRadious;
            dX="left";
        }
        else {
            newX = newX+biggestRadious;
            dX="right";
        }

        for (var i = 0; i < 3; i++) {
            circle[i] ={
                posX: newX,
                posY: newY,
                directionX:dX,
                directionY:dY,
                color: circleColors[i],
                radious:dimensions[i]*number
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
        var c;
        context.clearRect(0, 0, canvas.width, canvas.height);
        speed = 1;
        renderContent();
        for (var i = 0; i < circles.length; i++) {
            // Invert moviment
            for (var j = 0; j < 3; j++) {
                c = circles[i][j];

                if( c.directionY=="up" ){
                    c.posY -= speed;
                }
                else{
                    c.posY += speed;
                }

                if( c.directionX=="left" ){
                    c.posX -= speed;
                }
                else{
                    c.posX += speed;
                }
            }
            c=circles[i][0];

            if(c.posY<=c.radious && c.directionY=="up") {
                circles[i][0].directionY="down";
                circles[i][1].directionY="down";
                circles[i][2].directionY="down";
            }
            else if( c.posY>=(window.innerHeight-c.radious) && c.directionY=="down" ) {
                // console.log("Y:"+c.posY)
                // console.log("R:"+c.radious)
                circles[i][0].directionY="up";
                circles[i][1].directionY="up";
                circles[i][2].directionY="up";
            }

            if(c.posX<=c.radious && c.directionX=="left") {
                // console.log("X:"+c.posX)
                // console.log("R:"+c.radious)
                circles[i][0].directionX="right";
                circles[i][1].directionX="right";
                circles[i][2].directionX="right";
            }
            else if( c.posX>=(window.innerWidth-c.radious) && c.directionX=="right" ) {
                // console.log("X:"+c.posX)
                // console.log("R:"+c.radious)
                circles[i][0].directionX="left";
                circles[i][1].directionX="left";
                circles[i][2].directionX="left";
            }

        }
        setTimeout(animationLoop, 33);
    } //end function animationLoop

    for (var i = 0; i < 4; i++) {
        defineCircle(i+0.5);
    }

    animationLoop();
} //end function makeCircles

makeCircles();