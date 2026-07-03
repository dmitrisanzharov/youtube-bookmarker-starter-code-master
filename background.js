console.log('background.js loaded');

// console.log('all tabs', chrome.tabs);

console.log('chrome runtime in background.js', chrome.runtime);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  
    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
        console.log('YouTube video page loaded:', tab.url);
    }

    chrome.tabs.sendMessage(tabId, { tabId: tabId, message: 'hello from background.js' });

    chrome.runtime.sendMessage({ from: "background.js via runtime", message: "runtime " });

});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('============================');
    console.log("Message from content script:", message);
    console.log('sender', sender);
    sendResponse({ from: "background.js", message: "sendResponse in background.js" });
});