
export const createCard = function (cardData, delFunc, likeFunc, contentImageOpen){
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
  if(cardData.owner._id !== "040654428fb28bc42167382a"){
    buttonDelete.remove()
  }
  if(cardData.likes.find( elem => elem._id === '040654428fb28bc42167382a')){
    buttonLike.classList.toggle('card__like-button_is-active');
  }
  return cardElement;
}

export function deleteCard(card, cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '1f32eed6-4700-423b-84f1-c35d36de2fbb',
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
          .then((data) => {
          console.log(data);
        })
  card.remove();
}



export function likeFunc(buttonLike, cardId, countLike){
    if(buttonLike.classList.contains('card__like-button_is-active')){
    fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '1f32eed6-4700-423b-84f1-c35d36de2fbb',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(res => countLike.textContent = res.likes.length)
    }else{
    fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: '1f32eed6-4700-423b-84f1-c35d36de2fbb',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(res => countLike.textContent = res.likes.length)
      }  
  buttonLike.classList.toggle('card__like-button_is-active');   
}



