document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button .modal-content .box') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // function setupCloseButton() {
        // Get the modal and the close button elements
        const modal = document.getElementById('modal-js-example');
        const modal2 = document.getElementById('modal-js-example2');
        const modal3 = document.getElementById('modal-js-example3');
        const modal4 = document.getElementById('modal-js-example4');
        const modal5 = document.getElementById('modal-js-example5');

        const closeButtons = document.querySelectorAll('.video-buttons');
      
        // Add an event listener to each close button
        closeButtons.forEach((button) => {
          button.addEventListener('click', () => {
            closeModal(modal);
            closeModal(modal2);
            closeModal(modal3);
            closeModal(modal4);
            closeModal(modal5);
          });
        });


    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
      }
    });
  });