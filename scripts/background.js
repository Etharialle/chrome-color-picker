chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.color) {
        console.log("Picked color:", message.color);
    }
});
