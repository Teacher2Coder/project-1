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

// Function for search bar

document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('dropdownInput');
  const dropdown = document.getElementById('mcu-movies');

// sort items in dropdown list in alabetical order
  function sortList(ul) {
    var ul = document.getElementById(ul);
  
    Array.from(ul.getElementsByTagName("LI"))
      .sort((a, b) => a.textContent.localeCompare(b.textContent))
      .forEach(li => ul.appendChild(li));
  }
  
  sortList("mcu-movies");

  function filterFunction() {
      const filter = input.value.toUpperCase();
      const items = dropdown.getElementsByTagName('button');

      // Show the dropdown movies
      dropdown.classList.add('show');

      // Loop through all items, and hide those who don't match the search query
      Array.from(items).forEach(item => {
          if (item.textContent.toUpperCase().indexOf(filter) > -1) {
              item.parentElement.style.display = '';
          } else {
              item.parentElement.style.display = 'none';
          }
      });
  }

  function closeDropdown(event) {
      if (!event.target.matches('#dropdownInput')) {
          dropdown.classList.remove('show');
      }
  }
 

  // Attach the filterFunction to the input event
  input.addEventListener('keyup', filterFunction);

  // Close the dropdown if clicked outside the menu
  window.addEventListener('click', closeDropdown,);

  // Close the dropdown when an movie choice is clicked
  dropdown.addEventListener('click', function(event) {
      if (event.target.tagName === 'BUTTON') {
          dropdown.classList.remove('show');
      }
      // clear data?
      input.value = "";
  });
});
