document.addEventListener('DOMContentLoaded', function () {
const form = document.getElementById('ContactForm');

if (form) {
    form.addEventListener('submit', function (e) {
    form.addEventListener('submit', function () {
        setTimeout(function () {
        window.location.href = '/pages/thank-you'; // Change this to your thank-you page URL
        }, 1000); // delay to let the form submit
    });
    });
}
});