const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
var Player1, Player2, Player3, Player4;
var allPlayers, allBullets;
var Players = [];
var Bullets = [];
var Player_img;
var coliseum, newColiseum;
var gameState = 0;
var form, player, playerCount, game;
var bullet1, bullet2, bullet3, bullet4, bullet_img;
var bulletgrp;
var edges;
var engine, world;
var ground;
function preload(){
    coliseum = loadImage("Coliseum.png");
    newColiseum = loadImage("RealColiseum.jpg")
    Player_img = loadImage("Gladiator.png");
    bullet_img = loadImage("Meteor.png");
}
function setup(){
    engine = Engine.create();
    world = engine.world;

    canvas = createCanvas(displayWidth, displayHeight);
    edges = createEdgeSprites();
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background(coliseum);
    Engine.update(engine);
    if(playerCount === 4){
        game.update(1);
      }
      if(gameState === 1){
        clear();
        game.play();
      }
      if(gameState === 2){
        game.end();
      }
}