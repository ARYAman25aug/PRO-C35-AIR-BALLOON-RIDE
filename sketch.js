var balloon, background;
function preload() {
  backgroundImg = loadImage("1.png")
  balloonImage = loadAnimation("2.png", "3.png", "4.png");
}

function setup(){
   database = firebase.database();
   console.log(database);
    createCanvas(1500,700);

balloon = createSprite (100,400, 20, 20)
  balloon.addAnimation("balloon", balloonImage);
  balloon.scale = 0.4;

  var balloonPos=database.ref('balloon/position')
  balloonPos.on("value",readPos)
}

function draw(){

    background(backgroundImg);
  
        if(keyDown(LEFT_ARROW)){
            updatePos(-10,0)
            balloon.x = balloon.x - 10;
        }
        else if(keyDown(RIGHT_ARROW)){
            updatePos(10,0)
            balloon.x = balloon.x + 10;
        }
        else if(keyDown(UP_ARROW)){
            updatePos(0,-10)
            balloon.y = balloon.y - 10;
        }
        else if(keyDown(DOWN_ARROW)){
            updatePos(0,10)
             balloon.y = balloon.y + 10;
        }
        drawSprites();
    }
function updatePos(x,y){
database.ref('balloon/position').set({
    'x':height.x+x,
    'y':height.y+y
})
}
    
function readPos(data){
    height=data.val();
    balloon.x=height.x;
    balloon.y=height.y
}
