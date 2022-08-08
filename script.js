'use strict';
// Loading all selectors
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// complete loading /hide loader
function complete() {
    loader.hidden = true;
    quoteContainer.hidden =false;
}
// loading function
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    
}
let apiQuotes = []; 


// Get quotes from api

// https://quotes-react.netlify.app/
// Show new quote
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // console.log(quote);
    quoteText.textContent = quote.text;
    if(!quote.author){
        authorText.textContent = "Unknown";
    }
    else{
        authorText.textContent = quote.author;
    }
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    complete();
}

async function getQuotes() {
    const apiURL ="https://type.fit/api/quotes/";
    try {
        loading();
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
        complete();
    }
    catch (error){
        //catch error
        alert("Please load Page again");
    } 
}

//Twitter Function
function tweet() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.textContent}`; 
    window.open(tweetUrl,'_blank');    
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweet);
// Onload
getQuotes();

