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
const back_color = "#c060fa";
const front_color = "#eddbf9";
var img_array1 = [card_back1, card_back2, card_back3, card_back4, card_back5, card_back6, card_back7, card_back8];
var img_array2 = [card_back1, card_back2, card_back3, card_back4, card_back5, card_back6, card_back7, card_back8];
var img_array3 = [card_back1, card_back2, card_back3, card_back4, card_back5, card_back6, card_back7, card_back8];
const deck_card_names = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
                         'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four'];
var card_img_obj = new Map();
//  game variables
// matched_cards must be global to access.
const matched_cards = [];
var flipped_card = false;
var second_card_match = false;
var first_card = {'card_id': null, 'new_src': null};
var second_card = {'card_id': null, 'new_src': null};
var third_card = {'card_id': null, 'new_src': null};
var matches_found = 0;
var star_count = 0;
var moves = 0;
// timer is for pausing the card flip on no-match
var timer;
//     the stop-clock variables
var stop_clock = null;
var seconds = 0;
var minutes = 0;

function activate_all_unmatched(){
  var matched_length = matched_cards.length;
  console.log(matched_length);

  for(var i=0; i< deck.length; i++){
    var element = deck[i];
    var card_id = element.getAttribute("id");
    if(matched_cards.includes(card_id)){
      //pass
    }
    else{
    element.style.pointerEvents = 'auto';
    element.src = card_front;
    element.style.backgroundColor = back_color;
    }
  }; // for loop
};

function deactivate_all(){
  for(var i = 0; i < deck.length; i++){
    let card = deck[i];
    card.style.pointerEvents = 'none';
  };

}
function reset_active(){
  for(var i = 0; i < deck.length; i++){
    let card = deck[i];
    card.style.pointerEvents = 'auto';
  };
}

function clear_card_info(){
  //  set card key- values to null.
  first_card.card_id = null;
  first_card.new_src = null;
  second_card.card_id = null;
  second_card.new_src = null;
  third_card.card_id = null;
  third_card.new_src = null;
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
  if(star_count < 0){
    star_count = 0;
  }
  if(star_count > 3){
    star_count = 3;
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


function reset_flip(){
  // reset first_card, second_card, & third card set values to null
  window.clearInterval(timer);
  //alert("reset flip of the third kind")
  flipped_card = false;
  second_card_match = false;
  clear_card_info();
  activate_all_unmatched();
;}

// ------------------------//
//   Main functio of game:
//--------------------------//


function flip_card(){
  //  variables in use:
  moves += 1;
  var card_id = this.id;

  var new_src = card_img_obj.get(card_id);
  var back_image = new_src.toString();
  var element = document.getElementById(card_id);
  element.style.pointerEvents = 'none';
  this.src = back_image;
  this.style.backgroundColor = front_color;

  //    ---- logic operators ----

  if(!flipped_card){
    // first card selected:
    console.log("first card selected");
    flipped_card = true;
    first_card.card_id = card_id;
    first_card.new_src = back_image;

  }

  else if(flipped_card === true && second_card_match === false){
    // second card selected
    //console.log("second card selected")
    second_card.card_id = card_id;
    second_card.new_src = back_image;
    if(first_card.new_src === second_card.new_src){
      //match continue
      second_card_match = true;
      // add cards id string to matched_cards
    }
    else{
      deactivate_all();
      // NOT a match, reset
      flipped_card = false;
      second_card_match = false;
      star_count -= 1;
      stars();
      // setting the interval here keeps the card images from changing too fast
      timer = window.setInterval(reset_flip, 500);
      // in the reset_flip() activate_all_unmatched();

    }
  }
    else{
      //console.log("third card selected")
      deactivate_all();
      third_card.card_id = card_id;
      third_card.new_src = back_image;
      flipped_card = false;
      second_card_match = false;
      if(first_card.new_src === second_card.new_src && second_card.new_src === third_card.new_src){
        //console.log("third match!")
        //  it's a three way MATCH
        // do not activate, do not reset flip
        // add card.id to array: matched_cards
        var first_element = document.getElementById(first_card.card_id);
        var second_element = document.getElementById(second_card.card_id);
        var third_element = document.getElementById(third_card.card_id);
        var first = first_element.getAttribute("id");
        var second = second_element.getAttribute("id");
        var third = third_element.getAttribute("id");
        matched_cards.push(first);
        matched_cards.push(second);
        matched_cards.push(third);
        matches_found += 1;
        star_count += 1;
        stars();
        clear_card_info();
        activate_all_unmatched();

        if(matches_found >= 8){
          congrats()
          clear_clock();
        }
      }

      else{
        // NOT a match
        star_count -= 1;
        stars();
        deactivate_all();
        //console.log("not a 3 card match!")
        // card info cleared in activate_all()
        // setting the interval here keeps the card images from changing too fast
        // cards reactivated in reset_flip
        timer = window.setInterval(reset_flip, 500);

      }
    }
};



//--------------------------------//
//   shuffling and assigning img  //
//--------------------------------//


function assign_imgs(imgArray1, imgArray2, imgArray3, card_map, deck){
  var indeck = 0;
  //assign first shuffled images to map
  for (var i = 0; i<imgArray1.length; i++){
    var img_to_add = imgArray1[i];
    var card_to_add_it_to = deck[indeck];
    card_map.set(card_to_add_it_to, img_to_add);
    indeck += 1;

  };
  //assign second shuffled images to map
  for (var i = 0; i<imgArray2.length; i++){
    var img_to_add = imgArray2[i];
    var card_to_add_it_to = deck[indeck];
    card_map.set(card_to_add_it_to, img_to_add);
    indeck += 1;

  };
  //assing third shuffled images to map
  for (var i = 0; i<imgArray2.length; i++){
    var img_to_add = imgArray3[i];
    var card_to_add_it_to = deck[indeck];
    card_map.set(card_to_add_it_to, img_to_add);
    indeck += 1;

  };
};


function shuffleArray(array) {
   //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   //  the Durstenfeld shuffle
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
};




function clear_clock(){
  if(stop_clock != null){
    window.clearInterval(stop_clock);
  }
  seconds = 0;
  minutes = 0;
};


function empty_matches(){
  while(matched_cards.length > 0){
    matched_cards.pop();
  };
};

function run_game(){
  var button = document.getElementById("play_button");
  button.innerHTML = "New Game";
  clear_clock();
  clear_congrats();
  reset_active();
  empty_matches();

  star_count = 0;
  moves = 0;
  matches_found = 0;
  flipped_card = false;
  second_card_match = false;

  for (let i=0; i<deck.length; i++){
    let element = deck[i];
    element.addEventListener("click", flip_card);
    element.src = card_front;
    element.style.backgroundColor = back_color;
  };
  stars();
  shuffleArray(img_array1);
  shuffleArray(img_array2);
  shuffleArray(img_array3);
  assign_imgs(img_array1, img_array2, img_array3, card_img_obj, deck_card_names);
  stop_clock = window.setInterval(increment, 1000);

};
