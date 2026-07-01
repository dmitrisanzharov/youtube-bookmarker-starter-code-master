console.log('background.js loaded');

// console.log('all tabs', chrome.tabs);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  
    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com/watch')) {
        console.log('YouTube video page loaded:', tab.url);
    }


});