function makeCircles() {

    var canvas = document.getElementById('background'),
    circleColors = {'home':null,'ielop':null,'about':null,'team':null}, colorTransition=null,
    renderTheme = document.body.className, changeColor=false, indexChange = -1, 
    menuLinks = document.getElementsByClassName('menu-link'), currentTransition = null,
    dimensions = [40,14,6], circles = [], paused = false;
    context = canvas.getContext("2d");

    // get user displaysize
    canvas.width = ('innerWidth' in window)?window.innerWidth:document.documentElement.clientWidth;
    canvas.height = ('innerHeight' in window)?window.innerHeight:document.documentElement.clientHeight;

    function newWindowSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    /**
     * Color Definitions
     ****************************/

    // Circle colors allowed
    circleColors['home']=["#fff","#4F1F42","#CADC70"];
    circleColors['team']=["#fff","#4F1F42","#CADC70"];
    circleColors['ielop']=["#CADC70","#fff","#4F1F42"];
    circleColors['about']=["#4F1F42","#fff","#CADC70"];

    // colorTransition = {
    //     // White to purple
    //     "#fff#4F1F42":['#F6F4F6','#EDE9EC','#E5DDE3','#DCD2D9','#D3C7D0','#CABCC6','#C1B1BD','#B9A5B3','#B09AAA',
    //         '#A78FA0','#9E8497','#95798E','#8D6D84','#84627B','#7B5771','#724C68','#69415E','#613555','#582A4B'],
    //     // White to green
    //     "#fff#CADC70":['#FCFDF8','#FAFCF1','#F7FAEA','#F4F8E2','#F2F6DB','#EFF4D4','#ECF3CD','#EAF1C6','#E7EFBF',
    //         '#E4EEB8','#E2ECB0','#DFEAA9','#DDE8A2','#DAE69B','#D7E594','#D5E38D','#D2E185','#CFE07E','#CDDE77'],
    //     //purple to green
    //     "#CADC70#4F1F42":['#552844','#5B3247','#613B49','#68454B','#6E4E4E','#745850','#7A6152','#806B54','#867457',
    //         '#8C7E59','#93875B','#99905E','#9F9A60','#A5A362','#ABAD64','#B1B667','#B8C069','#BEC96B','#C4D36E',]
    // }


    /**
     * Methods Definitions
     */

    // Define circles to be used in the site
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
                color: circleColors[renderTheme][i],
                radious:dimensions[i]*number
            };
        };

        circles.push(circle);
    }

    // Render circles
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

    //Change circles color
    function renderColorTransition() {
        for (var i = 0; i < circles.length; i++) {
            for (var j = 0; j < 3; j++) {
                // console.log(renderTheme);
                // console.log(circleColors[renderTheme][j]);
                circles[i][j].color = circleColors[renderTheme][j];
            }
        }
    }

    // The animation home loop
    function animationLoop() {
        var c, speed = 1;

        if( !paused){
                
            // Clear canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
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
                    circles[i][0].directionY="up";
                    circles[i][1].directionY="up";
                    circles[i][2].directionY="up";
                }

                if(c.posX<=c.radious && c.directionX=="left") {
                    circles[i][0].directionX="right";
                    circles[i][1].directionX="right";
                    circles[i][2].directionX="right";
                }
                else if( c.posX>=(window.innerWidth-c.radious) && c.directionX=="right" ) {
                    circles[i][0].directionX="left";
                    circles[i][1].directionX="left";
                    circles[i][2].directionX="left";
                }

            }
        }

        setTimeout(animationLoop, 33);
    } //end function animationLoop

    // Flag to do transition to other color
    function activateRender(event){
        event.preventDefault();
        var target = event.target.tagName!="SPAN"?event.target:event.target.parentNode,
        newTheme = target.parentNode.getAttribute('alt');

        console.log(newTheme);
        if(newTheme!='home') paused=true;
        else paused=false;
        // Change theme only if is different
        if(renderTheme!=newTheme){
            renderTheme=newTheme;

            // render new color for circles
            renderColorTransition();
            context.clearRect(0, 0, canvas.width, canvas.height);
            renderContent();
            // console.log(renderTheme);
        }
    }

    //Attach event to change color canvas
    if (document.addEventListener) {
        for (var i = 0; i < menuLinks.length; i++) {
            menuLinks[i].addEventListener('click', activateRender, false);
            window.addEventListener('resize',newWindowSize,false);
        }
    } else if (document.attachEvent)  {
        for (var i = 0; i < menuLinks.length; i++) {
            menuLinks[i].attachEvent('onclick', activateRender);
            window.addEventListener('onresize',newWindowSize);
        }
    }

    // Start Animation
    for (var i = 0; i < 4; i++) {
        defineCircle(i+0.5);
    }

    animationLoop();

} //end function makeCircles

// Canvas 
makeCircles();