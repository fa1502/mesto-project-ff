

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
        buttonElement.disabled = true;
    buttonElement.classList.add(obj.inactiveButtonClass);
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
}; 