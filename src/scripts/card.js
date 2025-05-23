
// @todo: Функция создания карточки
export const createCard = function (cardData, delFunc, likeFunc, contentImageOpen){
  const cardTemplate = document.querySelector('#card-template').content;
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
  cardImage.addEventListener('click', () => contentImageOpen(cardData.link, cardData.name));
  return cardElement;
}
// @todo: Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

export function likeFunc(buttonLike){
  buttonLike.classList.toggle('card__like-button_is-active');
}