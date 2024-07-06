"use strict"


document.addEventListener('DOMContentLoaded', () => {
    // const validation = new JustValidate('#form');

    let phone = document.querySelector("#formPhone");
    let im = new Inputmask("+7(999)999-99-99");
    im.mask(phone);

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/mail.php",
            data: $(this).serialize()
        }).done(function() {
            alert('Заявка отправлена!');
            $('form').trigger('reset');
        });
        return false;
    });
});