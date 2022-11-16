const loadBtn = document.getElementById('load-migraciones-website');

loadBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({
    message: 'open migraciones website'
  })
})