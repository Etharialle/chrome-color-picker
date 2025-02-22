document.addEventListener("click", (event) => {
    const color = getComputedStyle(event.target).backgroundColor;
    chrome.runtime.sendMessage({ color });
}, { once: true });
