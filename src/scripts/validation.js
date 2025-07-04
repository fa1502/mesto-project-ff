

const showInputError = (formElement, inputElement, errorMessage, obj) => {

    const formError= formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  formError.classList.remove(obj.errorClass);
  formError.textContent = ''
  inputElement.setCustomValidity("");
};



const isValid = (formElement, inputElement, obj) => {

    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};




const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, buttonElement, obj);
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
}; 

export const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) {
    disabledButtonState( buttonElement, obj)
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
}; 

const disabledButtonState = (buttonElement, obj) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(obj.inactiveButtonClass);
}

export const clearValidation = (form, validationConfig) => {
    const inputs = form.querySelectorAll('.popup__input')
    const inputElements = form.querySelectorAll(validationConfig.inputSelector) 
    inputElements.forEach((inputElement) => {hideInputError(form, inputElement, validationConfig) }) 
    inputs.forEach( (input) => {if(input.value == ''){
    const button = form.querySelector(`${validationConfig.submitButtonSelector}`)
    disabledButtonState(button, validationConfig); 
    }})
}

//ну вроде сейчас точно правильно.. вроде