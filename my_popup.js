import {getCurrentTab, convertUrlParamsToObject} from './utils.js';

// console.log('my_popup.js loaded');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('my_popup.js DOMContentLoaded');


    // check current tab and its url
    const tab = await getCurrentTab();
    console.log('Current tab: ', tab);
    console.log('Current tab URL: ', tab.url);


    // check if the current tab is a YouTube video page
    if (tab.url && tab.url.includes('youtube.com/watch')) {
        console.log('on youtube')

        // get chrome.storage stuff
        chrome.storage.local.get(null, (result) => {
            console.log('Current storage onLoad:', result);


            // does it have bookmarks
            const videoId = convertUrlParamsToObject(tab.url).v;
            const bookmarks = result[videoId] || [];
            console.log('Bookmarks for this video: ', bookmarks);

            const popupContainer = document.getElementById('popup_container');

            // if video has no bookmarks, display: 'no bookmarks yet'
            if (bookmarks.length === 0) {
                const noBookmarksMessage = document.createElement('p');
                noBookmarksMessage.textContent = 'No bookmarks yet.';
                popupContainer.appendChild(noBookmarksMessage);
            } else {

                // bookmarks are found, display all bookmarks as a list in the UI
                console.log('Bookmarks for this video: ', bookmarks);

                // create a UL list with LI and links
                const ul = document.createElement('ul');

                bookmarks.forEach(bookmark => {
                    const li = document.createElement('li');
                    li.style = 'margin-bottom: 10px;';
                    const a = document.createElement('a');
                    a.href = '';
                    a.textContent = bookmark.desc;


                    a.addEventListener('click', (e) => {
                        e.preventDefault();
                        chrome.tabs.sendMessage(tab.id, { type: 'MOVE_TIMESTAMP', time: bookmark.time });
                    });


                    li.appendChild(a);
                    ul.appendChild(li);
                });

                popupContainer.appendChild(ul);
            }


        });

    }




    // const urlObj = convertUrlParamsToObject(tab.url);
    // console.log("urlObj: ", urlObj);

});
