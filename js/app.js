'use strict';

let cardsArray = [];
let flippedCards = [];
let numberOfCards = 2;

(function() {
  function startGame(numberOfCards) {
    clear();
    createCardArray(numberOfCards);
    createCards();
    cardClick();
    gameMode();
  } // startGame

  function clear() {
    let cardsDiv = document.querySelector(".cards");
    cardsDiv.innerHTML = "";
  } // clear

  function gameMode() {
    let easybtn = document.getElementById('easy');
    let medbtn = document.getElementById('med');
    let hardbtn = document.getElementById('hard');
    if (easybtn && medbtn && hardbtn) {
      easybtn.addEventListener('click', function() {
        startGame(5);
      })
      medbtn.addEventListener('click', function() {
        startGame(10);
      })
      hardbtn.addEventListener('click', function() {
        startGame(15);
      })
    }
  } //gameMode

  let createCardArray = function(numberOfCards) {
    for (let i = 1; i<= numberOfCards; i++) {
      cardsArray.push(i, i);
    }
    // Fisher-Yates Shuffle of array
    for (let i = cardsArray.length - 1; i > 0; i--) {
       let j = Math.floor(Math.random() * (i + 1));
       [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
     }
  } // createCardArray

  let createCards = function() {
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

  let cardClick = function() {
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i<cards.length; i++) {
      cards[i].addEventListener('click', function() {
        if (!this.classList.contains('flipped') && flippedCards.length < 2) {
          this.classList.toggle('flipped');
          flippedCards.push(this);

          if (flippedCards.length === 2) {
            checkMatch();
            winGame();
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
  }

  function flipBack() {
    flippedCards[0].classList.toggle('flipped');
    flippedCards[1].classList.toggle('flipped');

    flippedCards = [];
  }

  function winGame() {
    if (document.getElementsByClassName('match').length === cardsArray.length) {
      let cardsDiv = document.querySelector(".cards")
      setTimeout(function() {
        cardsDiv.classList.add('slowFade');
      }, 1200);
      window.setTimeout(function() {
        cardsDiv.classList.remove('slowFade');
        cardsDiv.classList.add('select');
        cardsDiv.innerHTML = "<div class='win'>You Win! Play Again?</div> \
        <div><button id='easy' class='win2'>Easy</button> \
        <button id='med' class='win2'>Medium</button> \
        <button id='hard' class='win2'>Hard</button></div>";
      }, 2300);
    }
  }



  startGame(1);
})();
