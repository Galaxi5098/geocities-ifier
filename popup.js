document.getElementById('geocitify').addEventListener('click', async () => {
  const status = document.getElementById('status');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.id) {
    status.textContent = 'No active tab found!';
    return;
  }

  try {
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['styles.css']
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
    status.textContent = '~*~ GeoCities-ified! ~*~';
  } catch (err) {
    status.textContent = 'Cannot modify this page.';
  }
});
