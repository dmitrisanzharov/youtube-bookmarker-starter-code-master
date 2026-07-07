(async () => {
    console.log('my_content.js loaded');

    let videoId = 'none';
    let firstLoadDone = false;

    // load existing bookmarks for this video from storage
    async function loadBookmarksForVideo() {
        return new Promise((resolve) => {
            chrome.storage.local.get(null, (result) => {
                console.log('Current storage onLoad:', result);
                resolve(result);
            });
        });
    }

    function addNewBookmarkEventHandler() {

        // chrome.storage.local.remove(videoId);
        // return;
        
            console.log('============================');
            console.log('videoId', videoId);
            const videoInSeconds = document.getElementsByClassName("video-stream")[0].currentTime; 
            console.log("videoInSeconds: ", videoInSeconds);

            // create bookmark
            const newBookmark = {
                                desc: "Bookmark at " + String(videoInSeconds),
                time: videoInSeconds,
            };
            
            // load bookmarks for this video from storage
            loadBookmarksForVideo().then((result) => {
                console.log('++++++++++++++++++++++++++++');
                console.log('result from loadBookmarksForVideo:', result);

                // check if this is existing video
                const isExistingVideo = result.hasOwnProperty(videoId);
                console.log("isExistingVideo: ", isExistingVideo);


                if (isExistingVideo) {

                    let existingBookmarks = result[videoId];
                    existingBookmarks = [...existingBookmarks, newBookmark].sort((a, b) => a.time - b.time);
                    console.log("existingBookmarks: ", existingBookmarks);

                    chrome.storage.local.set({
                        [videoId]: existingBookmarks
                    });

                } else {

                    console.log("new video");

                    chrome.storage.local.set({
                        [videoId]: [newBookmark]
                    });
                }

           });           

    };

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
            right: 0,
            width: '20%',
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
        bookmarkBtn.addEventListener('click', addNewBookmarkEventHandler);
        bookmarkBtn.src = chrome.runtime.getURL('assets/bookmark.png');
        bookmarkBtn.className = 'ytp-button ' + 'bookmark-btn';
        bookmarkBtn.title = 'Click to bookmark current timestamp';
        bookmarkBtn.disabled = !firstLoadDone;
        Object.assign(bookmarkBtn.style, {
            width: '60px',
            height: '60px'
        });
        devSpaceDiv.appendChild(bookmarkBtn);
    }

    makeDevSpace();

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        // console.log('my_content.js received message:', message);

        if (message.type === 'NEW') {
            videoId = message.videoId;
            console.log('Video ID:', videoId);

        }
    });
})();
