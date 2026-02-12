import { useState } from "react";

function App() {
  const [domData, setDomData] = useState<any>(null);

  const onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        return {
          title: document.title,
          url: location.href,
          firstParagraph: document.querySelector("p")?.textContent ?? "",
        };
      },
    });

    setDomData(result[0].result);
  };

  return (
    <>
      <h1>My Extension</h1>

      <button onClick={onclick}>Fetch DOM</button>

      {domData && (
        <pre style={{ textAlign: "left" }}>
          {JSON.stringify(domData, null, 2)}
        </pre>
      )}
    </>
  );
}

export default App;
