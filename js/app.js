'use strict';

let cardsArray = [];
let flippedCards = [];

function gameMode() {
  let easybtn = document.getElementById('easy');
  let medbtn = document.getElementById('med');
  let hardbtn = document.getElementById('hard');
  let timer = document.querySelector('.timer');
  if (easybtn) {
    easybtn.addEventListener('click', function() {
      startGame(5);
      setTime(20, timer);
    })
    medbtn.addEventListener('click', function() {
      startGame(10);
      setTime(40, timer);
    })
    hardbtn.addEventListener('click', function() {
      startGame(15);
      setTime(80, timer);
    })
  }
} //gameMode

  function startGame(numberOfCards) {
    clear();
    createCardArray(numberOfCards);
    createCards();
    cardClick();
    document.querySelector('.score').innerHTML = 'Score:<span>0</span>';
  } // startGame

  function clear() {
    let cardsDiv = document.querySelector(".cards");
    cardsDiv.innerHTML = "";
    cardsDiv.classList.remove('select');
    cardsArray = [];
  } // clear, resets flex direction

  function createCardArray(numberOfCards) {
    for (let i = 1; i<= numberOfCards; i++) {
      cardsArray.push(i, i); //push duplicates into array
    }
    // Fisher-Yates Shuffle of array
    for (let i = cardsArray.length - 1; i > 0; i--) {
       let j = Math.floor(Math.random() * (i + 1));
       [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
     }
  } // createCardArray

  function createCards() {
    let cardsDiv = document.querySelector(".cards");
    for (let i = 0; i< cardsArray.length; i++) {
      let newCard = document.createElement("div");
      newCard.className = 'card';
      newCard.id = cardsArray[i];
      cardsDiv.appendChild(newCard);

      let card = document.querySelector(".card:last-child"); // fixes only creating one card every loop

      card.innerHTML = '<div class="front"><p> Show! </p></div> \
      <div class="back"><p>' + cardsArray[i] + '</p></div>';
    }
  } //createCards

  function cardClick() {
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i<cards.length; i++) {
      cards[i].addEventListener('click', function() {
        if (!this.classList.contains('flipped') && flippedCards.length < 2) {
          this.classList.toggle('flipped');
          flippedCards.push(this);
          // only lets two cards be flipped at a time
          if (flippedCards.length === 2) {
            checkMatch();

          }
        }
      });
    }
  } // cardClick

  function checkMatch() {
    if (flippedCards[0].getAttribute('id') === flippedCards[1].getAttribute('id')) {
      flippedCards[0].classList.add('match');
      flippedCards[1].classList.add('match');
      flippedCards = [];
      updateScore(4);
    } else {
      setTimeout(flipBack, 700);
      updateScore(-2);
    }
  } // checkMatch

  function flipBack() {
    flippedCards[0].classList.toggle('flipped');
    flippedCards[1].classList.toggle('flipped');
    flippedCards = [];
  } // flipBack

  function endGame() {
    let timer = document.querySelector('.timer').textContent;
    if (document.getElementsByClassName('match').length === cardsArray.length || timer == '00:00') {
      let cardsDiv = document.querySelector(".cards");
      let timerDiv = document.querySelector('.timer');
      setTimeout(function() {
        cardsDiv.classList.add('slowFade');
      }, 1200); // fade out gameboard
      setTimeout(function() {
        cardsDiv.classList.remove('slowFade');
        cardsDiv.classList.add('select'); // reset flex direction
          if (document.getElementsByClassName('match').length === cardsArray.length) {
            cardsDiv.innerHTML = "<div class='win'>You Win! Play Again?</div>"
          } // all matched
          if (timer === '00:00') { // if timer ran out
            cardsDiv.innerHTML = "<div class='win'>Time Out! Play Again?</div>"
          } // timer ran out
          cardsDiv.innerHTML += "<div class='win2'><button id='easy'>Easy</button> \
          <button id='med'>Medium</button> \
          <button id='hard'>Hard</button></div>"
      }, 2300); // settimeout
      setTimeout(gameMode,2301); //waits to run gameMode until buttons are created
    } // if
  } // endGame

function setTime(duration, display) {
  let timer = duration, minutes, seconds;
  let interval = setInterval(function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0 || document.getElementsByClassName('match').length === cardsArray.length) {
        clearInterval(interval); // fix timer continuing
        endGame();
      }
    }, 1000);
} // setTime

function updateScore(points) {
  let score = document.querySelector('.score').lastChild;
  if (parseInt(score.textContent) == 0 && points > 0) {
    score.textContent = parseInt(points);
  } // doesn't let score dip below 0

  else if (parseInt(score.textContent) != 0) {
    score.textContent = parseInt(score.textContent) + parseInt(points);
  }
} // score

// function bestScore() {
//   let score = document.querySelector('.score').lastChild;
//   let bestScore = document.querySelector('.bestScore');
//   let scoreInStorage = localStorage.getItem('bestScore');
//   if ()
// }


// //SAVE SELECTED ITEMS ON WINDOW REFRESH
//
// window.onload = function () {
//   let inStorageArray = localStorage.getItem('userSelectedDesires')
//   if (inStorageArray != '' && inStorageArray != null) {
//     userSelectedDesires = JSON.parse(inStorageArray);
//     for (let i = 0; i < userSelectedDesires.length; i++) {
//       document.getElementById(userSelectedDesires[i] + 'Img').className = 'active'; //for img
//       document.getElementById(userSelectedDesires[i] + 'Img').nextElementSibling.className = 'selected'; //for span
//       document.getElementById(userSelectedDesires[i]).checked = true; //for checkbox
//     } // for
//   } // if
// } //window onload
//
// if (supportLocalStorage()) {
//     if(UNform) {
//       UNform.addEventListener('submit', function(event) {
//       event.preventDefault();
//       let userInput = document.getElementById('userName');
//       localStorage.setItem('userName', userInput.value.toLowerCase());
//       if (userInput.value == false) {
//         alert('Please enter a name to proceed.');
//       } else {
//         toSelector();
//       }
//     })
//   }
// }

  gameMode();
