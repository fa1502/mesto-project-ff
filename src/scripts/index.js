import '../pages/index.css'
import { createCard, deleteCard, likeFunc} from './card.js'
import { openModal, closeModal} from './modal.js'
import {enableValidation, clearValidation} from './validation.js'
import {submitProfileValue, submitCardValue, submitAvatarValue, loadProfile, loadCards} from './api.js'

let userId

const allPopup = document.querySelectorAll('.popup')
const cardsContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const popupTypeEditClouse = popupTypeEdit.querySelector('.popup__close');
const popupNewCardClouse = popupNewCard.querySelector('.popup__close');
const popupTypeImageClouse = popupTypeImage.querySelector('.popup__close');
const imgPopupTypeImage = popupTypeImage.querySelector('.popup__image')
const captionPopupTypeImage = popupTypeImage.querySelector('.popup__caption')
const formPopupTypeEdit = popupTypeEdit.querySelector('.popup__form');
const nameInput = formPopupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = formPopupTypeEdit.querySelector('.popup__input_type_description');
const formPopupNewCard = popupNewCard.querySelector('.popup__form');
const inputCardName = formPopupNewCard.querySelector('.popup__input_type_card-name');
const inputUrl = formPopupNewCard.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');
const popupTypeEditAvatarClouse = popupTypeEditAvatar.querySelector('.popup__close');
const formPopupTypeEditAvatar = popupTypeEditAvatar.querySelector('.popup__form');
const inputAvatarLink = formPopupTypeEditAvatar.querySelector('.popup__input');
const buttonSubmitNewCard = formPopupNewCard.querySelector('.popup__button')
const buttonSubmitEditAvatar = formPopupTypeEditAvatar.querySelector('.popup__button')
const buttonSubmitEditProfile = formPopupTypeEdit.querySelector('.popup__button')

const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}



allPopup.forEach((popup) => {
    popup.classList.add('popup_is-animated');
})



function profileEditOpen(popup){
    openModal(popup);
    inputName.value = profileTitle.textContent
    inputDescription.value = profileDescription.textContent
    clearValidation(formPopupTypeEdit, obj)
}
          
function contentImageOpen(link, name){
    openModal(popupTypeImage);
    imgPopupTypeImage.src = link;
    imgPopupTypeImage.alt = name;
    captionPopupTypeImage.textContent = name;
}


function submitFormEditProfile(evt) {
    evt.preventDefault(); 
    renderLoading(true, buttonSubmitEditProfile);
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    submitProfileValue(nameInput.value, jobInput.value)
      .then(()=> closeModal(popupTypeEdit))
      .catch((err) => {
      console.log(err);
      })
      .finally(() => renderLoading(false, buttonSubmitEditProfile)); 
}


function submitFormNewCard(evt) {
    evt.preventDefault(); 
    renderLoading(true, buttonSubmitNewCard);
        submitCardValue(inputCardName.value, inputUrl.value)
          .then((cardData) => {
                cardsContainer.prepend(createCard(cardData, deleteCard, likeFunc, contentImageOpen, userId));
          })
          .catch((err) => {
          console.log(err);
          })
          .finally(() => renderLoading(false, buttonSubmitNewCard)); 
    formPopupNewCard.reset();
    clearValidation(formPopupNewCard, obj);
    closeModal(popupNewCard);
}


function submitFormEditAvatar(evt) {
     evt.preventDefault(); 
     renderLoading(true, buttonSubmitEditAvatar);
    submitAvatarValue(inputAvatarLink.value)
      .then((res) => profileAvatar.setAttribute('style', `background-image: url(${res.avatar});`))
        .catch((err) => {
        console.log(err);
        })
        .finally(() => renderLoading(false, buttonSubmitEditAvatar)); 
}



editButton.addEventListener('click', () => profileEditOpen(popupTypeEdit));
addButton.addEventListener('click', () => {disableButtonSubmit(popupNewCard, obj); openModal(popupNewCard)});
profileImage.addEventListener('click', () => {disableButtonSubmit(popupTypeEditAvatar, obj);openModal(popupTypeEditAvatar)});
popupTypeEditClouse.addEventListener('click', () => closeModal(popupTypeEdit));
popupNewCardClouse.addEventListener('click', () => closeModal(popupNewCard));
popupTypeImageClouse.addEventListener('click', () => closeModal(popupTypeImage));
popupTypeEditAvatarClouse.addEventListener('click', () => closeModal(popupTypeEditAvatar));
formPopupTypeEdit.addEventListener('submit', submitFormEditProfile);
formPopupNewCard.addEventListener('submit', submitFormNewCard);
formPopupTypeEditAvatar.addEventListener('submit', submitFormEditAvatar);

enableValidation(obj);


// const clearValidation = (profileForm, validationConfig) => {
//     const button = profileForm.querySelector(`${validationConfig.submitButtonSelector}`)
//     button.disabled = true;
//     button.classList.add(validationConfig.inactiveButtonClass);
//     const formError = profileForm.querySelectorAll('.form__input-error');
//     formError.forEach((item) => {
//     item.classList.remove(obj.errorClass);
//     item.textContent = ''})
//     const inputElement = profileForm.querySelectorAll(validationConfig.inputSelector)
//     inputElement.forEach(elem => elem.classList.remove(obj.inputErrorClass))    
// }

const disableButtonSubmit = (form, validationConfig) => {
    const inputs = form.querySelectorAll('.popup__input')
    inputs.forEach( (input) => {if(input.value == ''){
    const button = form.querySelector(`${validationConfig.submitButtonSelector}`)
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
    }})
}



const promises = [loadCards(), loadProfile()]

Promise.all(promises)
  .then((result) => {
    profileTitle.textContent = result[1].name;
    profileDescription.textContent = result[1].about;
    profileAvatar.setAttribute('style', `background-image: url(${result[1].avatar});`)
    userId = result[1]._id
    result[0].forEach(function (item) {
    cardsContainer.append(createCard(item, deleteCard, likeFunc, contentImageOpen, userId));
    });
  })
  .catch((err) => {
    console.log(err);
    });



function renderLoading(isLoading, button) {
  if(isLoading){
    button.textContent = 'Сохранение...'
  }else{
    button.textContent = 'Сохранить'
  }
}