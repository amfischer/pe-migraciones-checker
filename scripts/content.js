console.log('content script loaded')

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if(request.message === 'do some magic'){
    await entrar()
    await extranjero()
    await tipoDocumento()
    await numDocumento()
    await fechaNacimiento()
    await fechaEmision()
    await nacionalidad()
    await fechaUltimoMovimiento()
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
  waitFor(500)
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
  waitFor(500)
}

async function fechaNacimiento() {
  const input = document.querySelector("input[formcontrolname=dFechaNacimiento]")

  if(input === null || input.value !== ''){
    return;
  }

  input.parentElement.parentElement.querySelector('button').click()
  waitFor(250);
  document.querySelector('.mat-calendar-period-button').click()
  waitFor(250);
  document.querySelector('.mat-calendar-previous-button').click()
  waitFor(250);
  document.querySelector('.mat-calendar-body-cell[aria-label="1986"]').click()
  waitFor(250);
  document.querySelector('.mat-calendar-body-cell[aria-label="01/05/1986"]').click()
  waitFor(250);
  document.querySelector('.mat-calendar-body-cell[aria-label="25/05/1986"]').click()
  waitFor(500);

}

async function fechaEmision() {
  const input = document.querySelector("input[formcontrolname=sFechaEmision]")

  if(input === null || input.value !== ''){
    return;
  }

  input.parentElement.parentElement.querySelector('button').click()
  waitFor(250);
  document.querySelector('.mat-calendar-period-button').click()
  waitFor(250);
  document.querySelector('.mat-calendar-body-cell[aria-label="2022"]').click()
  waitFor(250);
  document.querySelector('.mat-calendar-body-cell[aria-label="01/06/2022"]').click()
  waitFor(250);
  document.querySelector('.mat-calendar-body-cell[aria-label="07/06/2022"]').click()
  waitFor(500);
}

async function nacionalidad() {
  const matselect = document.querySelector("mat-select[formcontrolname=sIdPais]")

  if(matselect === null || matselect.querySelector('.mat-select-placeholder') === null){
    return;
  }

  matselect.click()
  waitFor(500);
  
  const option = Array.from(document.querySelectorAll('.mat-option-text')).find(el => el.innerText === 'EE.UU');
  option.click();
  waitFor(500);
}

async function fechaUltimoMovimiento() {
  const input = document.querySelector("input[formcontrolname=sFechaUltimoMovimiento]")

  if(input === null || input.value !== ''){
    return;
  }

  input.parentElement.parentElement.querySelector('button').click()
  waitFor(250);
  document.querySelector('.mat-calendar-period-button').click()
  waitFor(250);
  document.querySelector('.mat-calendar-body-cell[aria-label="2022"]').click()
  waitFor(250);
  document.querySelector('.mat-calendar-body-cell[aria-label="01/08/2022"]').click()
  waitFor(250);
  document.querySelector('.mat-calendar-body-cell[aria-label="14/08/2022"]').click()
}