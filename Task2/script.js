
setTimeout(() => {
    let formElement = document.forms['formElement'];

    formElement.addEventListener("focusin", () => event.target.classList.add('focused'));
    formElement.addEventListener("focusout", () => event.target.classList.remove('focused'));
}, 100);