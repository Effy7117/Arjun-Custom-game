class Player {
    constructor(){
      this.index = null;
      this.distance = 0;
      this.name = null;
      this.rank = null;
      this.distance2 = 0;
      this.bxp = 0;
      this.byp = 0;
    }
  
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }
  
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance, 
        distance2: this.distance2,
        bxp:this.bxp,
        byp:this.byp
      });
    }
  
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }
    static getBulletsInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allBullets = data.val();
      })
    }
}