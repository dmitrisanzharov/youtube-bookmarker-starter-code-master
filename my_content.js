console.log('my_content.js loaded');

chrome.runtime.onMessage.addListener((message) => {
    console.log("Message from service worker:", message);
});