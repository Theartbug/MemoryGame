'use strict';

let cardsArray = [];
let flippedCards = [];
let numberOfCards = 6;

(function() {
    function startGame(numberOfCards) {
      createCardArray(numberOfCards);
      createCards();
      cardClick();

  } // startGame

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

  //
  // let bindToCards = function() {
  //   let cards = document.getElementsByClassName('card');
  //   for (let i = 0; i<cards.length; i++) {
  //     cards[i].addEventListener('click', function(){
  //       this.cardClick;
  //     }, false);
  //   }
  // }

  startGame(6);
})();
