// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const deleteButton = document.querySelector('.card__delete-button');
const addButton = document.querySelector('.profile__add-button');
// @todo: Функция создания карточки
const creatCard = function (alt, src, delFunc){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').alt = alt;
    cardElement.querySelector('.card__image').src = src;
    cardElement.querySelector('.card__delete-button').addEventListener('click', delFunc);
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(evt){
    evt.target.parentNode.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
    placesList.append(creatCard(item.name, item.link, deleteCard));
});


/*addButton.addEventListener('click', function () {
    placesList.append(creatCard(initialCards[0].name, initialCards[0].link, deleteCard));
  });
 */ 

