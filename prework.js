
const deck = document.getElementsByClassName('card_image');
const card_front = "snowflake-regular.svg";
const card_back1 = "socks-solid.svg";
const card_back2 = "anchor-solid.svg";
const card_back3 = "avianex-brands.svg";
const card_back4 = "bath-solid.svg";
const card_back5 = "canadian-maple-leaf-brands.svg";
const card_back6 = "cloud-sun-rain-solid.svg";
const card_back7 = "pagelines-brands.svg";
const card_back8 = "tree-solid.svg";
var img_array1 = [card_back1, card_back2, card_back3, card_back4, card_back5, card_back6, card_back7, card_back8];
var img_array2 = [card_back1, card_back2, card_back3, card_back4, card_back5, card_back6, card_back7, card_back8];
const deck_card_names = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']
var card_img_obj = new Map();

//  cards matches, sources, current, score values
var flipped_card = false;
var first_card = {'card_id': null, 'new_src': null};
var second_card = {'card_id': null, 'new_src': null};
var matches_found = 0;
var star_count = 0;
var moves = 0;
// timer is for pausing the card flip on no-match
var timer;
//     the stop-clock variables
var stop_clock = null;
var seconds = 0;
var minutes = 0;

function clear_card_info(){
  //  set card key- values to null.
  first_card.card_id = null;
  first_card.new_src = null;
  second_card.card_id = null;
  second_card.new_src = null;
}

function increment(){
  var time_element_seconds = document.getElementById("time_element_seconds");
  var time_element_minutes = document.getElementById("time_element_minutes");
  seconds += 1;
  if(seconds > 59){
    minutes += 1;
    seconds = 0;
  }

  time_element_minutes.innerHTML = minutes;
  time_element_seconds.innerHTML = seconds;
  //alert(time_element_seconds);
};


function stars(){
  if(star_count > 3){
    //pass
  }
  else if(star_count == 3){
    star = document.getElementById('star3');
    star.style.color = 'blue';
  }
  else if(star_count == 2){
    star = document.getElementById('star2');
    star.style.color = 'blue';
  }
  else if(star_count == 1){
    star = document.getElementById('star1');
    star.style.color = 'blue';
  }
  else{
      star_count = 0;
      star1 = document.getElementById('star3');
      star2 = document.getElementById('star2');
      star3 = document.getElementById('star1');
      star1.style.color = 'black';
      star2.style.color = 'black';
      star3.style.color = 'black';
  }
};

function congrats(){
  var element = document.getElementById("winner")
  var move_stat = moves.toString();
  var message = "You win!<br>" + "your moves: " + move_stat;
  element.innerHTML = message;
};

function clear_congrats(){
  var element = document.getElementById("winner")
  var message = ""
  element.innerHTML = message;

}


function flip_card(){
  //alert("card flipped, event listener active");
  moves += 1;
  var card_id = this.id;
  var new_src = card_img_obj.get(card_id);
  var back_image = new_src.toString();
  this.src = back_image;

  if(!flipped_card){
  flipped_card = true;
  first_card.card_id = card_id;
  first_card.new_src = back_image;
  console.log("first card source = ");
  console.log(first_card.new_src);
  }

  else if(flipped_card){

    second_card.card_id = card_id;
    second_card.new_src = back_image;
    console.log(second_card.new_src);
    flipped_card = false;
    //console.log(first_card.new_src);
    if(first_card.new_src === second_card.new_src){
      matches_found += 1;
      star_count += 1;
      stars();
      clear_card_info();

      if(matches_found >= 8){
        congrats()
        clear_clock();
      }
    }

    else{

      flipped_card = false;
      star_count -= 1;
      stars();
      var card1Id = first_card.card_id;
      var card2Id = second_card.card_id;
      timer = window.setInterval(reset_flip, 1000, card1Id, card2Id);

    }
  }
};

function assign_imgs(imgArray1, imgArray2, card_map, deck){
  var indeck = 0;
  //assign first shuffled images to map
  for (var i = 0; i<imgArray1.length; i++){
    var img_to_add = imgArray1[i];
    var card_to_add_it_to = deck[indeck];
    card_map.set(card_to_add_it_to, img_to_add);
    indeck += 1;
    //alert(indeck);
  };
  //assign second shuffled images to map
  for (var i = 0; i<imgArray2.length; i++){
    var img_to_add = imgArray2[i];
    var card_to_add_it_to = deck[indeck];
    card_map.set(card_to_add_it_to, img_to_add);
    indeck += 1;
    //alert(indeck);
  };
}


function shuffleArray(array) {
   //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   //  the Durstenfeld shuffle
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
}



function reset_flip(card1_id, card2_id){
  // reset first_card, second_card, set values to null
  console.log("reset_flip activated");
  console.log(card1_id);
  console.log(card2_id);
  window.clearInterval(timer);
  flipped_card = false;
  element1 = document.getElementById(card1_id);
  element2 = document.getElementById(card2_id);
  element1.src = card_front;
  element2.src = card_front;
  clear_card_info();
;}


function clear_clock(){
  if(stop_clock != null){
    window.clearInterval(stop_clock);
  }
  seconds = 0;
  minutes = 0;
};

function run_game(){
  clear_clock();
  clear_congrats();
  moves = 0;
  flipped_card = false;
  for (let i=0; i<deck.length; i++){
    let element = deck[i];
    //alert(i);
    element.addEventListener("click", flip_card);
    element.src = card_front;
  };
  shuffleArray(img_array1);
  shuffleArray(img_array2);
  assign_imgs(img_array1, img_array2, card_img_obj, deck_card_names);
  stop_clock = window.setInterval(increment, 1000);

  //alert(img_array1); alert(img_array2);
};
