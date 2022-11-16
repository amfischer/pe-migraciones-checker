console.log('content script loaded')

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if(request.message === 'do some magic'){
    await entrar()
    await extranjero()
    await tipoDocumento()
    await numDocumento()
  }
})


async function entrar() {
  const container = document.querySelector("body > app-root > app-identidad > div.intro-custom.intro-main-desktop")
  const button = document.querySelector("body > app-root > app-identidad > div > div > div.col-sm-12.col-md-6.column-left-custom > div:nth-child(2) > button.big-intro-desktop")

  if(container === null || button === null){
    return;
  }

  button.click()
  waitFor(500)
}

async function extranjero() {
  const button = document.querySelector("mat-button-toggle[aria-label=Extranjero]")
  
  if(button === null || button.classList.contains('mat-button-toggle-checked') === true) {
    return;
  }

  button.firstElementChild.click();
  waitFor(500)
}

async function tipoDocumento() {
  const select = document.querySelector("mat-select[formcontrolname=sIdDocumento]")

  if(select === null || select.querySelector('.mat-select-placeholder') === null){
    return;
  }

  select.click()
  waitFor(500);

  const docOptions = document.querySelectorAll("mat-option");
  docOptions.forEach(opt => {
    if(opt.firstElementChild.innerText === 'CARNÉ DE PERMISO TEMPORAL DE PERMANENCIA - CPP') {
      opt.click()
    }
  });
}

async function numDocumento() {
  const input = document.querySelector("input[formcontrolname=sNumeroDocumento]")

  if(input === null || input.value !== ''){
    return;
  }

  input.value = '001817572'
  input.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
  waitFor(500);
  document.querySelector('button.mat-fab').click()
}

