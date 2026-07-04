(() => {
    console.log('my_content.js loaded');

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('my_content.js received message:', message);
    });
})();
