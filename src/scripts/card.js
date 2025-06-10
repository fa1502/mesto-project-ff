import {deleteCardFetch, deleteLikeFetch, addLikeFetch} from './api.js'

export const createCard = function (cardData, delFunc, likeFunc, contentImageOpen, userId){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const countLike = cardElement.querySelector('.card__count-like');
  countLike.textContent = cardData.likes.length;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  buttonDelete.addEventListener('click', () => delFunc(cardElement, cardData._id));
  buttonLike.addEventListener('click', () => likeFunc(buttonLike, cardData._id, countLike));
  cardImage.addEventListener('click', () => contentImageOpen(cardData.link, cardData.name));
  if(cardData.owner._id !== userId){
    buttonDelete.remove()
  }
  if(cardData.likes.find( elem => elem._id === userId)){
    buttonLike.classList.toggle('card__like-button_is-active');
  }
  return cardElement;
}

export function deleteCard(card, cardId) {
  deleteCardFetch(cardId)
        .then(() => {
          card.remove();
        })
        .catch((err) => {
          console.log(err);
          })
}



export function likeFunc(buttonLike, cardId, countLike){
    if(buttonLike.classList.contains('card__like-button_is-active')){
        deleteLikeFetch(cardId)
        .then((res) => {
          countLike.textContent = res.likes.length;
          buttonLike.classList.toggle('card__like-button_is-active');   
        })
        .catch((err) => {
          console.log(err);
          })
    }else{
      addLikeFetch(cardId)
        .then((res) => {
          countLike.textContent = res.likes.length;
          buttonLike.classList.toggle('card__like-button_is-active');
        })
        .catch((err) => {
          console.log(err);
          })
      } 
}


