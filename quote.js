document.addEventListener('DOMContentLoaded', () => {
    const quoteEl = document.getElementById('quote');
    const authorEl = document.getElementById('author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const tweetBtn = document.getElementById('tweet-quote-btn');
    const copyBtn = document.getElementById('copy-btn');
    const loadingSpinner = document.getElementById('loading-spinner');

    let quotes = [];

    function showLoading() {
        loadingSpinner.style.display = 'block';
        quoteEl.style.display = 'none';
        authorEl.style.display = 'none';
    }

    function hideLoading() {
        loadingSpinner.style.display = 'none';
        quoteEl.style.display = 'block';
        authorEl.style.display = 'block';
    }

    async function loadQuotes() {
        showLoading();
        try {
            const response = await fetch('quotes.json');
            quotes = await response.json();
        } catch (err) {
            console.error('Failed to load quotes.json', err);
            quoteEl.textContent = '"Failed to load quotes."';
            authorEl.textContent = '';
        } finally {
            hideLoading();
        }
    }

    function getRandomQuote() {
        if (quotes.length === 0) return;
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const { quote, author } = quotes[randomIndex];
        quoteEl.textContent = `"${quote}"`;
        authorEl.textContent = `- ${author}`;
    }

    function tweetQuote() {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteEl.textContent + ' ' + authorEl.textContent)}`;
        window.open(url, '_blank');
    }

    async function copyQuote() {
        try {
            await navigator.clipboard.writeText(quoteEl.textContent + ' ' + authorEl.textContent);
            alert('Quote copied!');
        } catch (err) {
            console.error(err);
        }
    }

    newQuoteBtn.addEventListener('click', getRandomQuote);
    tweetBtn.addEventListener('click', tweetQuote);
    copyBtn.addEventListener('click', copyQuote);

    // Load quotes and display first random quote
    loadQuotes().then(getRandomQuote);
});
