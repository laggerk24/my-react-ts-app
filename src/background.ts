console.log("Inside Inject ts file");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab.url) return;

  chrome.scripting.executeScript({
    target: { tabId },
    files: ["inject.js"]
  });
});