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
    citation: 'Winston Churchill',
    year: '1965'
  },
  {
    quote: 'I don\'t want to be part of a world where being kind is a weakness.',
    citation: 'Keanu Reeves'
  },
  {
    quote: 'Between two evils, I generally like to pick the one I never tried before.',
    citation: 'Mae West'
  },
  'If you can get 1% better each day for one year, you\'ll end up 37 times better by the time you\'re done.',
];

/**
 * Init quotes array to contain similar object type,
 * and for citation and year to be empty string if they don't exist.
 * 'Live long and prosper.' => {quote: 'Live long and prosper.', citation: '', year: ''}
 */

quotes = quotes.map(quote => {
  if (typeof quote === 'string') {
    quote = {quote};
  }
  quote.citation = quote.citation ?? '';
  quote.year = quote.year ?? '';
  return quote;
})


/***
 * `getRandomQuote` function
 * Returns a random quote with measures in place to prevent duplicate quotes from appearing, 
 * and to show all quotes at least once before repeating. Does not alter initial quote array.
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
 * Alters HTML by displaying a random quote.  HTML must have structure of:
 * <id="quote-box">
 *  <class="quote"></>
 *  <class="year"></>
 *  <class="citation"></>
 * </>
***/
function printQuote () {
  const $container = document.querySelector('#quote-box');
  const $quote = document.createElement()
  const $year  = document.querySelector('#quote-box .year');
  const $cite  = document.querySelector('#quote-box .citation');

  if (!$quote) {
    throw new Error('HTML was missing quote element.');
  }
  if (!$year) {
    throw new Error('HTML was missing year element.');
  }
  if (!$cite) {
    throw new Error('HTML was missing citation element.');
  }

  const {quote, year, citation} = getRandomQuote();
  $quote.innerText = quote;
  $year.innerText  = year;
  $cite.innerText  = citation;

  $year.setAttribute('display', year?     'inherit': 'hidden');
  $cite.setAttribute('display', citation? 'inherit': 'hidden');
}



/***
 * click event listener for the print quote button
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);





/**
 * Get a random number between min to max.  Inclusive min and max.
 * random(0, 3) can return 0, 1, 2, or 3.
 */
function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}