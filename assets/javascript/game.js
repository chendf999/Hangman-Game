
var wordList = ["Tokyo", "New York", "San Paulo", "Seoul", "Mexico City", "Osaka", "Manila", "Mumbai", "Delhi", "Jakarta", "Lagos", "Kolkata", "Cairo", "Los Angeles", "Buenos Aires", "Rio de Janeiro", "Moscow", "Shanghai", "Karachi", "Paris", "Istanbul", "Nagoya", "Beijing", "Chicago", "London", "Shenzhen", "Essen", "Tehran", "Bogota", "Lima", "Bangkok", "Johannesburg", "Chennai", "Taipei", "Baghdad", "Santiago", "Bangalore", "Hyderabad", "St Petersburg", "Philadelphia", "Lahore", "Kinshasa", "Miami", "Ho Chi Minh City", "Madrid", "Tianjin", "Kuala Lumpur", "Toronto", "Milan", "Shenyang", "Dallas", "Boston", "Belo Horizonte", "Khartoum", "Riyadh", "Singapore", "Washington", "Detroit", "Barcelona", "Houston", "Athens", "Berlin", "Sydney", "Atlanta", "Guadalajara", "San Francisco", "Montreal", "Monterey", "Melbourne", "Ankara", "Recife", "Phoenix", "Durban", "Porto Alegre", "Dalian", "Jeddah", "Seattle", "Cape Town", "San Diego", "Fortaleza", "Curitiba", "Rome", "Naples", "Minneapolis", "Tel Aviv", "Birmingham", "Frankfurt", "Lisbon", "Manchester", "San Juan", "Katowice", "Tashkent", "Fukuoka", "Baku", "St Louis", "Baltimore", "Sapporo", "St Petersburg", "Taichung", "Warsaw"];

var newGame = true;
var winNum = 0;
var remainGuesses = 5;

var randomWord = "";
var dashNum = 100;
var allPressed = "";

var currentContent = document.getElementById("current");
var guessedContent = document.getElementById("guessed");
var remainContent = document.getElementById("remain");
var resultContent = document.getElementById("result");
var winsContent = document.getElementById("wins");
var audio = document.getElementById("soundEffects");

document.onkeyup = function (event) {
  var userPress = String.fromCharCode(event.keyCode).toLowerCase();

  /*-------------------------------------
  | new game
  -------------------------------------*/

  if (newGame === true){
    randomWordCap = wordList[Math.floor(Math.random() * wordList.length)];
    randomWord = randomWordCap.toLowerCase();
    dashNum = randomWord.length;

    // console.log(randomWord);

    // get src and show image
    var imageIndex = wordList.indexOf(randomWordCap);
    var imageLink = "";

    if (imageIndex < 9) {
      imageLink = "./assets/images/" + "00" + (imageIndex +1) + ".png";
    } else if (9 <= imageIndex < 99) {
      imageLink = "./assets/images/" + "0" + (imageIndex +1) + ".png";
    } else {
      imageLink = "./assets/images/" + (imageIndex +1) + ".png";
    }
    flag.src = imageLink;

    // show placeholder
    currentContent.textContent = "Current Word:  "
    currentContent.setAttribute("class","");

    for (i=0; i<randomWord.length; i++) {
      var placeholder = document.createElement("span");
      placeholder.textContent = "_ "
      placeholder.setAttribute("id", "dash" + [i]);
      currentContent.appendChild(placeholder);
   }

   // reset game
   resultContent.textContent = "";
   guessedContent.textContent = "Letters Guessed: ";
   remainGuesses = 10;
   allPressed = "";
   newGame = false;
  }

  /*-------------------------------------
  | on-going game
  -------------------------------------*/

  else {
    var letterIndex = randomWord.indexOf(userPress);
    var repeatIndex = allPressed.indexOf(userPress);
    allPressed = allPressed + userPress;

    // wrong
    if (letterIndex === -1 && repeatIndex === -1) {
      var letterWrong = document.createElement("span");
      letterWrong.textContent = userPress + ", ";
      guessedContent.appendChild(letterWrong);
      remainGuesses--;
      audio.src = "./assets/sound/guesswrong.wav";
    }

    // right
    else if (repeatIndex === -1){
      for (var i=0; i<randomWord.length; i++){
        if (userPress === randomWord[i]) {
          var letterRight = document.getElementById("dash" + [i]);
          letterRight.textContent = userPress + " ";
          dashNum--;
          audio.src = "./assets/sound/guessright.wav";
          }
        }
    }
    audio.play();
  }

  /*-------------------------------------
  | win or lose
  -------------------------------------*/

  if (remainGuesses === 0) {
    resultContent.textContent = "It's " + randomWord + "! Try again!";
    newGame = true;
    audio.src = "./assets/sound/gameover.wav";
    audio.play();
  }

  else if (remainGuesses === 2) {
    resultContent.textContent = "Come On!";
  }

  else if (remainGuesses === 1) {
    resultContent.textContent = "Last Chance!";
  }

  else if (dashNum === 0) {
    resultContent.textContent = "You Win!";
    winNum++;
    newGame = true;
    audio.src = "./assets/sound/gamewin.wav";
    audio.play();
  }

  remainContent.textContent = ":   " + remainGuesses;
  winsContent.textContent = winNum;
}
