(function () {

'use strict';

const automaticRefreshInterval = 1000 * 20;
let lastRefresh;

/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

/*** 
 * `quotes` array 
 * @typedef quoteArray
 * @property {quoteObject[]}
 * 
 * @typedef quoteObject
 * @property {string} quote    - the quote itself
 * @property {string} source   - who said the quote
 * @property {string} [citation]   - where the quote came from
 * @property {string|number} [year]   - year it was coined
 * @property {string[]} [tags] - an array of phrases to categorize similar quotes
 * @property {linkObject} [link] - a link to the 
 * 
 * @typedef linkObject
 * @property {string} text - Text displayed for the link.
 * @property {string} href - The http(s) link itself.
 * 
 */
let quotes = [
  {
    quote: 'Let us not seek the Republican answer or the Democratic answer, but the right answer.',
    source: 'John F Kennedy',
    citation: 'Speech at Loyola College Alumni Banquet',
    year: '1958',
    tags: ['presidents', 'motivation'],
    link: {
      text: 'JFKLibrary',
      href: 'https://www.jfklibrary.org/archives/other-resources/john-f-kennedy-speeches/baltimore-md-19580218'
    }
  },
  {
    quote: 'If you\'re going through hell, keep going.',
    source: 'Winston Churchill',
    tags: ['presidents', 'motivation'],
    link: {
      text: 'Quora',
      href: 'https://www.quora.com/What-did-Churchill-mean-when-he-said-If-you-are-going-through-hell-keep-going'
    },
    year: '1965'
  },
  {
    quote: 'I don\'t want to be part of a world where being kind is a weakness.',
    source: 'Keanu Reeves'
  },
  {
    quote: 'Between two evils, I generally like to pick the one I never tried before.',
    source: 'Mae West',
    tags: ['choices']
  },  
  {
    quote: 'If you can get 1% better each day for one year, you\'ll end up 37 times better by ' +
    'the time you\'re done.',
    source: 'James Clear',
    tags: ['motivation'],
    link: {
      text: 'Youtube',
      href: 'https://www.youtube.com/watch?v=U_nzqnXWvSo'
    }
  },
  {
    quote: 'We are all our own little Atlases carrying the weight of a world upon our shoulders.',
    source: 'close friend'
  },
  {
    quote: 'Happiness doesn’t depend on any external conditions, it is governed by our mental attitude.',
    source: 'Dale Carnige'
  }
];

/**
 * Init quotes to have uniform properties, and ensure quotes are not missing required 
 * quote and source props.
*/
quotes = quotes.map((quote, i) => {
  if (!quote.quote) {
    throw new Error(`Quote of index ${i} was missing required quote property.`);
  }
  if (!quote.source) {
    throw new Error(`Quote of index ${i} was missing required source property.`);
  }
  if (quote.link && !quote.link.text) {
    throw new Error(`Quote of index ${i} has citation property that was missing .text.  Eg: {quote, source, link: {text}}`);
  }
  if (quote.link && !quote.link.href) {
    throw new Error(`Quote of index ${i} has citation property that was missing .href.  Eg: {quote, source, link: {href}}`);
  }


  quote.citation   = quote.citation ?? null;
  quote.year       = quote.year     ?? null;
  quote.tags       = quote.tags     ?? [];
  return quote;
});


/***
 * `getRandomQuote` function
 * Returns a random quote with measures in place to prevent duplicate quotes from appearing, 
 * and to show all quotes at least once before repeating. Does not alter initial quote array.
 *@returns {quoteObject}
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
 * Alters HTML by displaying a random quote within, and also calls changeBackground().
 * HTML must contain an id of quote-box for the quote to go in.
***/
function printQuote () {
  changeBackground();
  lastRefresh = Date.now();
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

  if (quote.link) {
    const $link = elem('a', undefined, quote.link.text);
    $link.setAttribute('href', quote.link.href);
    $source.append($link);
  }

  $container.append($source);

  if (quote.tags.length > 0) {
    const $tags = elem('p', 'tags');
    quote.tags.forEach(tag => {
      const $tag = elem('span', 'tag', tag);
      $tags.append($tag);
    });
    $container.append($tags);
  }

}


/**
 * Changes the body background color to be a random linear gradient with a light color scheme.
 */
function changeBackground () {
  const $body = document.querySelector('body');
  const min = 210;
  let rgb = `rgb(${random(min, 255)}, ${random(min, 255)}, ${random(min, 255)})`;
  let style = `radial-gradient(circle at center, white 50%, ${rgb});`;
  style = rgb;
  console.log(style);
  $body.style.setProperty('background', style);
}



/**
 * Get a random number between min and max.  Inclusive min and max.
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 * @example
 * random(0,3);
 * //returns 0, 1, 2, or 3
 */
function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Create an HTML element with a given tag, className and text value.
 * @param {string} tag - Required element tag name.
 * @param {string} [className] - Optional class name to give to the element.
 * @param {string} [innerText] - Optional inner text to give to the element.
 * @returns {Element}
 * @throws {Error} Will throw error if tag name is missing.
 * @example
 * elem('p', 'quote', 'You can do hard things.');
 * //returns <p class="quote">You can do hard things</p>
 */
function elem(tag, className, innerText) {
  if (!tag) {
    throw new Error('elem() must be called with a tag name');
  }

  const $elem = document.createElement(tag);
  if (className) {
    $elem.className = className;
  }
  if (innerText) {
    $elem.innerText = innerText;
  }

  return $elem;
};








/***
 * click event listener for the print quote button
 * and call printQuote once to clear the filler text
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);
printQuote();


/** 
 * Set an automatic refresh, and only refresh if
 *  the load quote button hasn't been clicked in a while.
 */
setInterval(() => {
  if (Date.now() >= lastRefresh + automaticRefreshInterval) {
    printQuote();
  }
}, 1000); 



})();




