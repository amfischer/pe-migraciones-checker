const migracionesUrl = 'https://agenciavirtual.migraciones.gob.pe/agencia-virtual/identidad'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.message === 'open migraciones website'){
    chrome.tabs.create({url: migracionesUrl, active: true});
  }
})

chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command "${command}" triggered`);

  if(command === 'open-migraciones-page') {
    chrome.tabs.create({url: migracionesUrl, active: true});
  }

  if(command === 'page-interaction') {
    const tab = await getCurrentTab();
    
    if(tab === undefined || tab.url.includes('https://agenciavirtual.migraciones.gob.pe') === false){
      return;
    }

    chrome.tabs.sendMessage(tab.id, {message: 'do some magic'})
  }
  
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

