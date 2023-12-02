(function () {

'use strict';

/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

/*** 
 * `quotes` array 
***/
let quotes = [
  {
    quote: 'If you\'re going through hell, keep going.',
    source: 'Winston Churchill',
    year: '1965'
  },
  {
    quote: 'I don\'t want to be part of a world where being kind is a weakness.',
    source: 'Keanu Reeves'
  },
  {
    quote: 'Between two evils, I generally like to pick the one I never tried before.',
    source: 'Mae West'
  },
  {
    quote: 'If you can get 1% better each day for one year, you\'ll end up 37 times better by the time you\'re done.',
    source: 'James Clear',
  },
  {
    quote: 'We are all our own little Atlases carrying the weight of a world upon our shoulders.',
    source: 'close friend'
  },
  {
    quote: 'Throw yourself into the unknown with pace and a fury defiant clothe yourself in beauty untold and see life as a means to a triumph.',
    source: 'Gang of Youths',
    cite: 'Achilles Come Down',
    year: 2017
  },
  {
    quote: '',
    source: ''
  },
  {
    quote: '',
    source: ''
  },
  {
    quote: '',
    source: ''
  }
];


/***
 * `getRandomQuote` function
 * Returns a random quote with measures in place to prevent duplicate quotes from appearing, 
 * and to show all quotes at least once before repeating. Does not alter initial quote array.
 *@typedef quoteObject
 *@p
 *@property {quote[]}
***/
let quotesLeft = [];
let quoteLast;
function getRandomQuote () {

  //Build a copy of the quotes array if it isn't there.
  if (quotesLeft.length === 0) {
    quotesLeft = [...quotes].sort(() => Math.random() - 0.5);

    //Ensure a new list does not start with the quote at the end of the last list.
    if (quoteLast === quotesLeft[0] && quotesLeft.length > 1) {
      quotesLeft.pop();
    }
  }

  //Grab a random quote, remove, save, and return it.
  return quoteLast = quotesLeft.splice(random(0, quotesLeft.length - 1), 1)[0];
}

/***
 * `printQuote` function
 * Alters HTML by displaying a random quote within.
 * HTML must contain an id of quote-box for the quote to go in.
***/
function printQuote () {
  const quote = getRandomQuote();

  if (!quote?.quote) {
    throw new Error('Quote was not an object, missing, or an empty string.');
  }

  if (!quote?.source) {
    throw new Error('Quote was missing source property.');
  }

  const $container = document.querySelector('#quote-box');
  $container.innerHTML = '';

  if (!$container) {
    throw new Error('HTML was missing an element with ID of quote-box, for quotes to be inserted into.');
  }

  const $quote = elem('p', 'quote', quote.quote);
  $container.append($quote);

  const $source = elem('p', 'source', quote.source);
  
  if (quote.citation) {
    const $citation = elem('span', 'citation', quote.citation);
    $source.append($citation);
  }

  if (quote.year) {
    const $year = elem('span', 'year', quote.year);
    $source.append($year);
  }

  $container.append($source);
}



/***
 * click event listener for the print quote button
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);
printQuote();



/**
 * Get a random number between min to max.  Inclusive min and max.
 * random(0, 3) can return 0, 1, 2, or 3.
 */
function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Create an HTML element with a given tag, className and text value.
 * returns HTML element.
 */
function elem(tag, className, innerText) {
  const $elem = document.createElement(tag);
  if (className) {
    $elem.className = className;
  }
  if (innerText) {
    $elem.innerText = innerText;
  }

  return $elem;
};


})();