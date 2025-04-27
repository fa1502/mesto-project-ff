// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const deleteButton = document.querySelector('.card__delete-button');

// @todo: Функция создания карточки
const createCard = function (cardData, delFunc){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const card = document.querySelector('.card');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;
    buttonDelete.addEventListener('click', () => delFunc(card)); //Подскажите, почему удаляется только одна карточка?
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    cardsContainer.append(createCard(item, deleteCard));
});