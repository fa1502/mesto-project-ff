import '../pages/index.css'
import { initialCards, createCard, deleteCard, likeFunc} from './cards.js'
import { openModal, closeModal} from './modal.js'



const allPopup = document.querySelectorAll('.popup')
allPopup.forEach((popup) => {
    popup.classList.add('popup_is-animated');
})



// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');




initialCards.forEach(function (item) {
    cardsContainer.append(createCard(item, deleteCard, likeFunc, contentImageOpen));
});


editButton.addEventListener('click', () => profileEditOpen(popupTypeEdit));
addButton.addEventListener('click', () => addCardOpen(popupNewCard));


function profileEditOpen(popup){
    openModal(popup);
    popup.querySelector('.popup__input_type_name').placeholder = document.querySelector('.profile__title').textContent
    popup.querySelector('.popup__input_type_description').placeholder = document.querySelector('.profile__description').textContent
    popupClosed(popup);
    submitFormEditProfile(popup);
}

function addCardOpen(popup){
    openModal(popup);
    popupClosed(popup);
    submitFormNewCard(popup);
}

function popupClosed(popup){
    const popupClose = popup.querySelector('.popup__close');
    popupClose.addEventListener('click',() => closeModal(popup));

    function clousePopupAndDelHandle(popup){
        closeModal(popup);
        document.removeEventListener('click', removeClassOpenedClickOverlay);
        document.removeEventListener('keydown', removeClassOpenedPressKey);
    }
    function removeClassOpenedClickOverlay(evt){
        if(evt.target == popup){
            clousePopupAndDelHandle(popup);
        }
    }
    function removeClassOpenedPressKey(evt){
        if(evt.key == 'Escape'){
            clousePopupAndDelHandle(popup);
        }
    }
    document.addEventListener('click',  removeClassOpenedClickOverlay);
    document.addEventListener('keydown',  removeClassOpenedPressKey);
};


function contentImageOpen(cardImage){
    const popup_type_image = document.querySelector('.popup_type_image');
    popup_type_image.classList.add('popup_is-opened');
    popup_type_image.querySelector('.popup__image').src = cardImage.src;
    popup_type_image.querySelector('.popup__image').alt = cardImage.alt;
    popup_type_image.querySelector('.popup__caption').textContent = cardImage.alt;
    popupClosed(popup_type_image)
}




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
