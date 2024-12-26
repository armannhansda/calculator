document.addEventListener('DOMContentLoaded', function() {
  // Get the display element
  const display = document.querySelector('#display');
  // Get all button elements with class 'boxes'
  const buttons = document.getElementsByClassName('boxes');
  let cal = '';
  display.innerHTML = cal;

  // Function to handle button clicks
  function handleButtonClick(buttonText) {
    // Handle clear button
    if (buttonText === 'c') {
      cal = '';
    }
    // Handle equals button
    else if (buttonText === '=') {
      try {
        // Evaluate the expression and convert to string
        cal = eval(cal).toString();
      } catch (error) {
        cal = 'Error';
      }
    }
    // Handle backspace button
    else if(buttonText === '⌫' || buttonText === 'Backspace'){
      // Remove the last character
      cal = cal.slice(0, -1);
    }
    // Handle percentage button
    else if(buttonText === '%') {
      try {
        // Evaluate the expression and divide by 100
        cal = (eval(cal) / 100).toString();
      } catch (error) {
        cal = 'Error';
      }
    }
    // Update display for other buttons
    else {
      cal += buttonText;
    }
    
    // Update the display with the current calculation
    display.innerHTML = cal;
  }

  // Function to animate button press
  function animateButtonPress(button) {
    button.style.boxShadow = '1px 1px #c1c1c1, inset 1px 1px rgb(0, 0, 0)';
    setTimeout(() => {
      button.style.boxShadow = '1px 1px black, inset 1px 1px rgb(201, 201, 201)';
    }, 100);
  }

  // Add click event listeners to all buttons
  Array.from(buttons).forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent;
      handleButtonClick(buttonText);
      animateButtonPress(this);
    });
  });

  // Add keydown event listener for keyboard support
  document.addEventListener('keydown', function(event) {
    const key = event.key;
    const validKeys = '0123456789+-*/%=cBackspace';
    if (validKeys.includes(key)) {
      handleButtonClick(key === 'Backspace' ? '⌫' : key);
      // Find the corresponding button and animate it
      const button = Array.from(buttons).find(btn => btn.textContent === (key === 'Backspace' ? '⌫' : key));
      if (button) {
        animateButtonPress(button);
      }
    } else if (key === 'Enter') {
      handleButtonClick('=');
      // Find the corresponding button and animate it
      const button = Array.from(buttons).find(btn => btn.textContent === '=');
      if (button) {
        animateButtonPress(button);
      }
    }
  });
});