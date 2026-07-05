import { NEW_STRING } from './constants.js';
console.log('my_background.js loaded');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com/watch')) {
        const theUrlParams = Object.fromEntries(new URL(tab.url).searchParams.entries());
        console.log('theUrlParams: ', theUrlParams);

        chrome.tabs.sendMessage(tabId, { type: NEW_STRING, videoId: theUrlParams.v });
    }
});
