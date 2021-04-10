class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
    async start(){
        if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
          }
          form = new Form()
          form.display();
        }
        
        Player1 = createSprite(100, 200);
        Player1.scale = 0.10;
        Player1.addImage("Gladiator",Player_img);
        Player2 = createSprite(300,200);
        Player2.addImage("Gladiator",Player_img);
        Player2.scale = 0.10;
        Player3 = createSprite(500,200);
        Player3.addImage("Gladiator",Player_img);
        Player3.scale = 0.10;
        Player4 = createSprite(700,200);
        Player4.addImage("Gladiator",Player_img);
        Player4.scale = 0.10;
        Players = [Player1, Player2, Player3, Player4];
       
        bullet1 = createSprite(400,400);
        bullet1.scale = 0.05;
        bullet1.addImage("Meteor", bullet_img)
        bullet2 = createSprite(400,400);
        bullet2.scale = 0.05;
        bullet2.addImage("Meteor", bullet_img)
        bullet3 = createSprite(400,400);
        bullet3.scale = 0.05;
        bullet3.addImage("Meteor", bullet_img)
        bullet4 = createSprite(400,400);
        bullet4.scale = 0.05;
        bullet4.addImage("Meteor", bullet_img)
        Bullets = [bullet1,bullet2,bullet3,bullet4];


        bullet1.depth = Player1.depth;
        Player1.depth = Player1.depth + 1;
        bullet2.depth = Player2.depth;
        Player2.depth = Player2.depth + 1;
        bullet3.depth = Player3.depth;
        Player3.depth = Player3.depth + 1;
        bullet4.depth = Player4.depth;
        Player4.depth = Player4.depth + 1;

       

      }
      play(){
        form.hide();

        Player.getPlayerInfo();
        Player.getBulletsInfo();
        if(allPlayers !== undefined){
          background(rgb(198,135,103));
          image(coliseum, 0, 0,displayWidth, displayHeight);
          
          //var display_position = 100;
          
          //index of the array
          var index = 0;
    
          //x and y position of the cars
          var x;
          var y;

          var bx,by;
    
          for(var plr in allPlayers){
            //add 1 to the index for every loop
            index = index + 1 ;
    
            //position the cars a little away from each other in x direction
            x = displayWidth + allPlayers[plr].distance2 - 700;
            //use data form the database top display the cars in y direction
            y = displayHeight - allPlayers[plr].distance - 450;

            bx = displayWidth + allPlayers[plr].bxp - 700;
            by = displayHeight - allPlayers[plr].byp - 450;


            Players[index-1].x = x;
            Players[index-1].y = y;
            Bullets[index-1].x = bx;
            Bullets[index-1].y = by;

            if (index === player.index){
              stroke(10);
              fill("red");
              ellipse(x,y,60,60);                 
              Players[index - 1].shapeColor = "red";
              //camera.position.x = displayWidth/2;
              //camera.position.y = Players[index-1].y;
             // if(keyCode === 32){
               // Bullets[index - 1].velocityX = 10;
             // }
            }
           
            //textSize(15);
            //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
          }
    
        }
    
        if(keyIsDown(UP_ARROW) && player.index !== null){
          player.distance +=10
          player.byp +=10
          player.update();
        }
        if(keyCode===32 && player.index !== null){
          player.bxp +=10
          player.update();
        }
        if(keyIsDown(DOWN_ARROW) && player.index !== null){
          player.distance -=10
          player.byp -=10
          player.update();
        }
        if(keyIsDown(LEFT_ARROW) && player.index !== null){
          player.distance2 -=10
          player.bxp -=10
          player.update();
        }
        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
          player.distance2 +=10
          player.bxp +=10
          player.update();
        }
        if(player.distance > 3860){
          gameState = 2;
          player.rank+=1;
        }
        if(bullet1.isTouching(edges[1])) {
          console.log("edges");
          
       //   console.log(Player1.bxp)
       //   Player1.bxp -=10;
        }

    
        drawSprites();
      }

      end(){
        console.log("Game Ended");
        console.log("Player Rank:"+ player.rank)
      }
}