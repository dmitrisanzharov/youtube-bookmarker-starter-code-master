(async () => {
    console.log('my_content.js loaded');

    function waitForElement(selector, callback) {
        const existing = document.querySelector(selector);

        if (existing) {
            callback(existing);
            return;
        }

        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector);

            if (element) {
                observer.disconnect();
                callback(element);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

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

        // add element to the dom
        const redSquare = document.createElement('div');
        Object.assign(redSquare.style, {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'red',
            marginLeft: '10px'
        });

        waitForElement('#top-row ytd-menu-renderer', (container) => {
            console.log('Found!', container);
            container.appendChild(redSquare);
        });
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
