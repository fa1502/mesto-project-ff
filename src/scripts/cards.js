import { cardTemplate} from './index.js'

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Функция создания карточки
export const createCard = function (cardData, delFunc, likeFunc, contentImageOpen){
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
export function deleteCard(card) {
  card.remove();
}

export function likeFunc(buttonLike){
  buttonLike.classList.toggle('card__like-button_is-active');
}