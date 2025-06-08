import '../pages/index.css'
import { createCard, deleteCard, likeFunc} from './card.js'
import { openModal, closeModal} from './modal.js'
import {enableValidation} from './validation.js'
import {submitProfileValue, submitCardValue, submitAvatarValue, loadProfile} from './api.js'

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
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    submitProfileValue(nameInput.value, jobInput.value);
    closeModal(popupTypeEdit);
}


function submitFormNewCard(evt) {
    evt.preventDefault(); 
    renderLoading(true);
    const cardData = {};
    cardData.name = inputCardName.value;
    cardData.link = inputUrl.value;
    cardData.likes = [];
    cardData.owner = {_id:"040654428fb28bc42167382a"}
    cardsContainer.prepend(createCard(cardData, deleteCard, likeFunc, contentImageOpen));
        submitCardValue(inputCardName.value, inputUrl.value)
        .finally(() => renderLoading(false)); 
    formPopupNewCard.reset();
    clearValidation(formPopupNewCard, obj);
    closeModal(popupNewCard);
}


function submitFormEditAvatar(evt) {
     evt.preventDefault(); 
     renderLoading(true);
    submitAvatarValue(inputAvatarLink.value)
        .finally(() => renderLoading(false)); 
}



editButton.addEventListener('click', () => profileEditOpen(popupTypeEdit));
addButton.addEventListener('click', () => openModal(popupNewCard));
profileImage.addEventListener('click', () => openModal(popupTypeEditAvatar));
popupTypeEditClouse.addEventListener('click', () => closeModal(popupTypeEdit));
popupNewCardClouse.addEventListener('click', () => closeModal(popupNewCard));
popupTypeImageClouse.addEventListener('click', () => closeModal(popupTypeImage));
popupTypeEditAvatarClouse.addEventListener('click', () => closeModal(popupTypeEditAvatar));
formPopupTypeEdit.addEventListener('submit', submitFormEditProfile);
formPopupNewCard.addEventListener('submit', submitFormNewCard);
formPopupTypeEditAvatar.addEventListener('submit', submitFormEditAvatar);

enableValidation(obj);


const clearValidation = (profileForm, validationConfig) => {
    const button = profileForm.querySelector(`${validationConfig.submitButtonSelector}`)
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
    const formError = profileForm.querySelector('.form__input-error');
    formError.classList.remove(obj.errorClass);
    formError.textContent = ''
    const inputElement = profileForm.querySelectorAll(validationConfig.inputSelector)
    inputElement.forEach(elem => elem.classList.remove(obj.inputErrorClass))    
}



loadProfile()
.then(res => res.json())
.then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
    profileAvatar.setAttribute('style', `background-image: url(${result.avatar});`)
  });



const loadCards = fetch('https://nomoreparties.co/v1/wff-cohort-39/cards ', {
  headers: {
    authorization: '1f32eed6-4700-423b-84f1-c35d36de2fbb'
  }
})
  .then(res => res.json())
  .then((result) => {
    result.forEach(function (item) {
    cardsContainer.append(createCard(item, deleteCard, likeFunc, contentImageOpen));
    });
  });



const promises = [loadCards]

Promise.all(promises)


function renderLoading(isLoading) {
  if(isLoading){
    buttonSubmitNewCard.textContent = 'Сохранение...'
    buttonSubmitEditAvatar.textContent = 'Сохранение...'
  }else{
    buttonSubmitNewCard.textContent = 'Сохранить'
    buttonSubmitEditAvatar.textContent = 'Сохранить'
  }
}