(async () => {
    console.log('my_content.js loaded');

    const { typeNew } = await chrome.storage.local.get('typeNew');
    console.log("newString: ", typeNew);

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('my_content.js received message:', message);

        if (message.type === typeNew) {
            const videoId = message.videoId;
            console.log('Video ID:', videoId);
        }
    });
})();
