console.log('my_content.js loaded');

// console.log('chrome runtime in my_content.js', chrome.runtime);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message from service worker:", message);
});


// console.log('sending message from my_content.js to background.js');
chrome.runtime.sendMessage({ from: "my_content.js", message: "hello from content script" }); 


chrome.runtime.sendMessage({ from: "my_content.js via runtime message 2", message: "message 2" }, (response) => {
    console.log('response in my_content.js', response);
});