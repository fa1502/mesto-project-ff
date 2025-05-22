import '../pages/index.css'
import { initialCards } from './cards.js'



const allPopup = document.querySelectorAll('.popup')
allPopup.forEach((popup) => {
    popup.classList.add('popup_is-animated');
})



// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const deleteButton = document.querySelector('.card__delete-button');
const profile__edit_button = document.querySelector('.profile__edit-button');
const profile__add_button = document.querySelector('.profile__add-button');
const popup_type_image = document.querySelector('.popup_type_image');
// const formElement = document.querySelector('.popup__form');
// const nameInput = formElement.querySelector('.popup__input_type_name');
// const jobInput = formElement.querySelector('.popup__input_type_description');

// @todo: Функция создания карточки
const createCard = function (cardData, delFunc, likeFunc, contentImageOpen){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    const buttonLike = cardElement.querySelector('.card__like-button');
    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;
    buttonDelete.addEventListener('click', () => delFunc(cardElement));
    buttonLike.addEventListener('click', () => likeFunc(buttonLike));
    cardImage.addEventListener('click', () => contentImageOpen(cardImage));
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

function likeFunc(buttonLike){
    buttonLike.classList.toggle('card__like-button_is-active');
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    cardsContainer.append(createCard(item, deleteCard, likeFunc, contentImageOpen));
});


profile__edit_button.addEventListener('click', profileEditOpen);
profile__add_button.addEventListener('click', newCardOpen);
//cardsContainer.addEventListener('click', contentImageOpen);

function contentImageOpen(cardImage){
    const popup_type_image = document.querySelector('.popup_type_image');
    popup_type_image.classList.add('popup_is-opened');
    console.log(cardImage);
    popup_type_image.querySelector('.popup__image').src = cardImage.src;
    popup_type_image.querySelector('.popup__image').alt = cardImage.alt;
    popup_type_image.querySelector('.popup__caption').textContent = cardImage.alt;
    popupClosed(popup_type_image)
}


function profileEditOpen(){
    const popup_type_edit = document.querySelector('.popup_type_edit');
    popup_type_edit.classList.add('popup_is-opened');
    popup_type_edit.querySelector('.popup__input_type_name').placeholder = document.querySelector('.profile__title').textContent
    popup_type_edit.querySelector('.popup__input_type_description').placeholder = document.querySelector('.profile__description').textContent
    popupClosed(popup_type_edit);
    submitFormEditProfile(popup_type_edit);
}

function newCardOpen(){
    const popup_new_card = document.querySelector('.popup_type_new-card');
    popup_new_card.classList.add('popup_is-opened');
    popupClosed(popup_new_card);
    submitFormNewCard(popup_new_card);
}

function popupClosed(popup){
    const popupClose = popup.querySelector('.popup__close');
    popupClose.addEventListener('click',() => popup.classList.remove('popup_is-opened'));
    function removeClassOpened(){
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('click', removeClassOpened);
        document.removeEventListener('keydown', removeClassOpenedPressKey);
        if(popup.classList.contains('popup_type_new-card')){
            console.log('test');
        }
    }
    function removeClassOpenedClickOverlay(evt){
        if(evt.target == popup){
            removeClassOpened();
        }
    }
    function removeClassOpenedPressKey(evt){
        if(evt.key == 'Escape'){
            removeClassOpened();
        }
    }
    document.addEventListener('click', removeClassOpenedClickOverlay);
    document.addEventListener('keydown', removeClassOpenedPressKey);
};

function submitFormEditProfile(popup){
    const formElement = popup.querySelector('.popup__form');
    const nameInput = formElement.querySelector('.popup__input_type_name');
    const jobInput = formElement.querySelector('.popup__input_type_description');
    function handleFormSubmit(evt) {
        evt.preventDefault(); 
        const nameInputValue = nameInput.value;
        const jobInputValue = jobInput.value;
        const profileTitle = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');
        profileTitle.textContent = nameInputValue;
        profileDescription.textContent = jobInputValue;
    }
    formElement.addEventListener('submit', handleFormSubmit);
}



function submitFormNewCard(popup){
    const formElement = popup.querySelector('.popup__form');
    const nameCard = formElement.querySelector('.popup__input_type_card-name');
    const urlCard = formElement.querySelector('.popup__input_type_url');
    const cardData = {};
    function handleFormSubmit(evt) {
        evt.preventDefault(); 
        cardData.name = nameCard.value;
        cardData.link = urlCard.value;
        cardsContainer.prepend(createCard(cardData, deleteCard, likeFunc, contentImageOpen));
        nameCard.value = '';
        urlCard.value = '';
        formElement.removeEventListener('submit', handleFormSubmit);
        popup.classList.remove('popup_is-opened');
    }
    formElement.addEventListener('submit', handleFormSubmit);
}
