console.log('background.js loaded');

// console.log('all tabs', chrome.tabs);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  
    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
        console.log('YouTube video page loaded:', tab.url);
    }

    chrome.tabs.sendMessage(tabId, { tabId: tabId, message: 'hello from background.js' });


});