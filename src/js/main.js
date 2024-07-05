"use strict"

document.addEventListener('DOMContentLoaded', () => {

    let phone = document.querySelector("#formPhone");
    let im = new Inputmask("+7(999)999-99-99");
    im.mask(phone);

});