  // Select all <a> or <button> elements with href="#form"
  var buttons = document.querySelectorAll('a[href="#form"], button[href="#form"]');
  var formTarget = document.querySelector('.custom-liquid');

  buttons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault(); // Prevent default anchor behavior
      formTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });


  var buttonsFAQ = document.querySelectorAll('a[href="#faq"], button[href="#faq"]');
  var formTargetFAQ = document.querySelector('.shopify-section.accordion-faq');

  buttonsFAQ.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault(); // Prevent default anchor behavior
      formTargetFAQ.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  var buttonsAMERICAN = document.querySelectorAll('a[href="#cask-american"], button[href="#cask-american"]');
  var formTargetAMERICAN = document.querySelectorAll('div[aria-title="American Standard Barrel (Ex-Bourbon)"]')[1];

  buttonsAMERICAN.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault(); // Prevent default anchor behavior
      formTargetAMERICAN.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

    var buttonsHOG = document.querySelectorAll('a[href="#cask-hogshead"], button[href="#cask-hogshead"]');
    var formTargetHOG = document.querySelectorAll('div[aria-title="Hogshead (Ex-Sherry Cask)"]')[1];

  buttonsHOG.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault(); // Prevent default anchor behavior
      formTargetHOG.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });