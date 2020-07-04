const targetPage: string = "/https:\/\/www\.acmicpc\.net\/problem\/*/"

chrome.tabs.onActivated.addListener(function (info) {
    chrome.tabs.get(info.tabId, function (change) {
        if(change.url == undefined){
            chrome.browserAction.setPopup({tabId: info.tabId, popup: ''});
            chrome.browserAction.setIcon({path: 'icon-disabled.png', tabId: info.tabId});
        }
        else if (change.url.match(targetPage) == null) {
            chrome.browserAction.setPopup({ tabId: info.tabId, popup: '' });
            chrome.browserAction.setIcon({ path: 'icon-disabled.png', tabId: info.tabId });
        }
        else {
            chrome.browserAction.setPopup({ tabId: info.tabId, popup: 'popup.html' });
            chrome.browserAction.setIcon({ path: 'icon.png', tabId: info.tabId });
        }
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, change, tab) {
    if(change.url == undefined){
        return;
    }
    else if (tab.url.match(targetPage) == null) {
        chrome.browserAction.setPopup({ tabId: tabId, popup: '' });
        chrome.browserAction.setIcon({ path: 'icon-disabled.png', tabId: tabId });
    }
    else {
        chrome.browserAction.setPopup({ tabId: tabId, popup: 'popup.html' });
        chrome.browserAction.setIcon({ path: 'icon.png', tabId: tabId });
    }
});

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.popupMounted) {
        console.log('eventPage notified that Popup.tsx has mounted.');
    }

    return isResponseAsync;
});