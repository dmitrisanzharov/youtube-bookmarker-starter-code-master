(async () => {
    console.log('my_content.js loaded');


    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('my_content.js received message:', message);

        if (message.type === 'NEW') {
            const videoId = message.videoId;
            console.log('Video ID:', videoId);
        }
    });
})();
