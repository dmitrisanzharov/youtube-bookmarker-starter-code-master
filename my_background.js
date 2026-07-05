import { NEW_STRING, EXPORTED_STRING } from './constants.js';

console.log('============================');
console.log('EXPORTED_STRING', EXPORTED_STRING);

chrome.storage.local.set({ 'omg1': 'omgString1' }); 
chrome.storage.local.set({ 'omg2': 'omgString2' }); 

console.log('my_background.js loaded');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('youtube.com/watch')) {
        const theUrlParams = Object.fromEntries(new URL(tab.url).searchParams.entries());
        console.log('theUrlParams: ', theUrlParams);

        chrome.tabs.sendMessage(tabId, { type: NEW_STRING, videoId: theUrlParams.v });
    }
});
