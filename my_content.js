(async () => {
    console.log('my_content.js loaded');

    function makeDevSpace() {
        const devSpaceDiv = document.createElement('div');
        Object.assign(devSpaceDiv.style, {
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            background: 'gray',
            color: 'black',
            fontSize: '20px',
            zIndex: '999999',
            padding: '8px'
        });
        // devSpaceDiv.textContent = 'Dev Space: This is a development space for testing and debugging.';
        document.body.appendChild(devSpaceDiv);

        // add button
        const bookmarkBtn = document.createElement('img');
        bookmarkBtn.src = chrome.runtime.getURL('assets/bookmark.png');
        bookmarkBtn.className = 'ytp-button ' + 'bookmark-btn';
        bookmarkBtn.title = 'Click to bookmark current timestamp';
        Object.assign(bookmarkBtn.style, {
            width: '60px',
            height: '60px'
        });
        devSpaceDiv.appendChild(bookmarkBtn);
    }

    makeDevSpace();

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('my_content.js received message:', message);

        if (message.type === 'NEW') {
            const videoId = message.videoId;
            console.log('Video ID:', videoId);
        }
    });
})();
