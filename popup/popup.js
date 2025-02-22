document.addEventListener("DOMContentLoaded", () => {
    const pickColorButton = document.getElementById("pickColor");
    const colorDisplay = document.getElementById("colorDisplay");

    pickColorButton.addEventListener("click", async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: pickColor
            });
        } catch (error) {
            console.error("Error picking color:", error);
        }
    });

    function pickColor() {
        document.addEventListener("click", (event) => {
            const color = getComputedStyle(event.target).backgroundColor;
            chrome.runtime.sendMessage({ color });
        }, { once: true });
    }

    chrome.runtime.onMessage.addListener((message) => {
        if (message.color) {
            colorDisplay.textContent = `Selected Color: ${message.color}`;
            colorDisplay.style.backgroundColor = message.color;
        }
    });
});
