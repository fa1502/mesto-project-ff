import '../pages/index.css'
import { initialCards} from './cards.js'
import { createCard, deleteCard, likeFunc} from './card.js'
import { openModal, closeModal} from './modal.js'



const allPopup = document.querySelectorAll('.popup')
allPopup.forEach((popup) => {
    popup.classList.add('popup_is-animated');
})



// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
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


initialCards.forEach(function (item) {
    cardsContainer.append(createCard(item, deleteCard, likeFunc, contentImageOpen));
});


editButton.addEventListener('click', () => profileEditOpen(popupTypeEdit));
addButton.addEventListener('click', () => openModal(popupNewCard));


function profileEditOpen(popup){
    openModal(popup);
    inputName.value = profileTitle.textContent
    inputDescription.value = profileDescription.textContent
    //submitFormEditProfile(popup);
}

// function addCardOpen(popup){
//     openModal(popup);
//     //submitFormNewCard(popup);
// }

function contentImageOpen(link, name){
    openModal(popupTypeImage);
    imgPopupTypeImage.src = link;
    imgPopupTypeImage.alt = name;
    captionPopupTypeImage.textContent = name;
}



popupTypeEditClouse.addEventListener('click', () => closeModal(popupTypeEdit));
popupNewCardClouse.addEventListener('click', () => closeModal(popupNewCard));
popupTypeImageClouse.addEventListener('click', () => closeModal(popupTypeImage));





    function submitFormEditProfile(evt) {
        evt.preventDefault(); 
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        closeModal(popupTypeEdit);
    }

formPopupTypeEdit.addEventListener('submit', submitFormEditProfile);

    function submitFormNewCard(evt) {
        evt.preventDefault(); 
        const cardData = {};
        cardData.name = inputCardName.value;
        cardData.link = inputUrl.value;
        cardsContainer.prepend(createCard(cardData, deleteCard, likeFunc, contentImageOpen));
        formPopupNewCard.reset();
        closeModal(popupNewCard);
    }
    
    formPopupNewCard.addEventListener('submit', submitFormNewCard);

