var dog,happyDog,dogg;
var dogImg,database,foodS,foodStock;

var feedTime,food;
var Food;
var lastFed=0
var feed,addFood;

function preload(){
    dogImg = loadImage("Dog.png")
    dogg = loadImage("DogSleeping.png")
    happyDog= loadImage("happydog.png")
}

function setup() {
   createCanvas(900, 400);
    database=firebase.database();
    food = new Foods(400,100);
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);

    dog = createSprite(600,250,10,10);
    dog.addImage(dogImg)
    dog.scale = 0.3
    //food=new Foods(290,100,50,50)

    feed=createButton("Feed the dog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood=createButton("Add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)

    NameDog=createInput("Name your Dog")
    NameDog.position(1000,95)
	  
  
}


function draw() {  
  background(46, 139, 87)
  food.display();
  stroke("magenta")
  textSize(20)
  //text("SAY HI TO",900,95)

  feedTime=database.ref('feedTime')
    feedTime.on("value",function(data){
        lastFed=data.val();
    })

    /*Food=database.ref('Food')
    Food.on("value",function(data){
      foodS=data.val;
    })*/
  
  
  
  
  fill(255,255,254);
       // textSize(15)
        /*if (lastFed>=12) {
            text("Last Fed : "+lastFed%12 + "PM",350,30)
        }else{
            text("Last Fed : "+lastFed+ "AM",350,30)           
        }*/
        
        if(lastFed>=12){
          text("Last Feed : "+ lastFed%12 + " PM", 350,30);
         }else if(lastFed==0){
           text("Last Feed : 12 AM",350,30);
         }else{
           text("Last Feed : "+ lastFed + " AM", 350,30);
         }

        drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);
  dog.x=dog.x=400

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
   // foodS:food.getFoodStock(),
    Food:food.getFoodStock(),
    feedTime:hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS)
}
  /*food.updateFoodStock(foodS)
}
function writeStock(x){
  if (x<=0) {
    x=0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    food:x   
  })
}

function writeStock(x){
  if (x<=0) {
    x=x+20
  }
   database.ref('/').update({
    food:x
  })*/
//}

function showError(){
  console.log("Error in writing to the database");
}
 
  /*text("NOTE : Press UP_ARROW Key To Feed Drago Milk!",20,50)
  text("NOTE : Press DOWN_ARROW Key To Refill the milk!",20,400)
  text("Food left :"+ foodS,200,100)*/
  //foodS.update

/*readStock(data);
writeStock(x);
showError();
*/
  //add styles here
