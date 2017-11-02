'use strict';

let cardsArray = [];
let flippedCards = [];

  function startGame(numberOfCards) {
    clear();
    createCardArray(numberOfCards);
    createCards();
    cardClick();
  } // startGame

  function clear() {
    let cardsDiv = document.querySelector(".cards");
    cardsDiv.innerHTML = "";
    cardsDiv.classList.remove('select');
    cardsArray = [];
  } // clear

  function gameMode() {
    let easybtn = document.getElementById('easy');
    let medbtn = document.getElementById('med');
    let hardbtn = document.getElementById('hard');
    let timer = document.querySelector('.timer');
    if (easybtn) {
      easybtn.addEventListener('click', function() {
        startGame(1);
        setTime(5, timer);
      })
      medbtn.addEventListener('click', function() {
        startGame(10);
        setTime(100, timer);
      })
      hardbtn.addEventListener('click', function() {
        startGame(15);
        setTime(120, timer);
      })
    }
  } //gameMode

  function createCardArray(numberOfCards) {
    for (let i = 1; i<= numberOfCards; i++) {
      cardsArray.push(i, i);
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
      newCard.id= cardsArray[i];
      cardsDiv.appendChild(newCard);

      let card = document.querySelector(".card:last-child");

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

          if (flippedCards.length === 2) {
            checkMatch();
            endGame();
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
    } else {
      setTimeout(flipBack, 700);
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
      }, 1200);
      setTimeout(function() {
        cardsDiv.classList.remove('slowFade');
        cardsDiv.classList.add('select');
          if (document.getElementsByClassName('match').length === cardsArray.length) {
            cardsDiv.innerHTML = "<div class='win'>You Win! Play Again?</div>"
          } else {
            cardsDiv.innerHTML = "<div class='win'>Time Out! Play Again?</div>"
          }
        cardsDiv.innerHTML += "<div class='win2'><button id='easy'>Easy</button> \
        <button id='med'>Medium</button> \
        <button id='hard'>Hard</button></div>";
      }, 2300);
      setTimeout(gameMode,2301);
    }
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
        clearInterval(interval);
        endGame();
      }
    }, 1000);
} // setTime

  gameMode();
