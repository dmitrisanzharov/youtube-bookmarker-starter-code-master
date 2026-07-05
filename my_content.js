(async () => {
    const NEW_STRING = 'NEW';

    const all = await chrome.storage.local.get();
    console.log('all global vars', all);


    console.log('my_content.js loaded');


    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('my_content.js received message:', message);

        if (message.type === NEW_STRING) {
            const videoId = message.videoId;
            console.log('Video ID:', videoId);
        }
    });
})();
