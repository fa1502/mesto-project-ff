const serverURL = 'https://nomoreparties.co/v1/wff-cohort-39'
const tokken = '1f32eed6-4700-423b-84f1-c35d36de2fbb'

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
} 

export const submitProfileValue = (nameValue, jobValue) => {
    return fetch(`${serverURL}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: tokken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue,
            about: jobValue
        })
        })
        .then(res => checkResponse(res))
} 

export const submitCardValue = (cardNameValue, linkValue) => {
    return fetch(`${serverURL}/cards`, {
        method: 'POST',
        headers: {
            authorization: tokken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardNameValue,
            link: linkValue
        })
        })
        .then(res => checkResponse(res))
} 

export const submitAvatarValue = (avatarLinkValue) => {
    return fetch(`${serverURL}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: tokken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarLinkValue
        })
        })
        .then(res => checkResponse(res))
}

export const loadProfile = () => {
    return fetch(`${serverURL}/users/me`, {
        headers: {
            authorization: tokken
        }
        })
        .then(res => checkResponse(res))
    }


export const deleteCardFetch = (cardId) => {
    return  fetch(`${serverURL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: tokken,
            'Content-Type': 'application/json'
        }
        })
        .then(res => checkResponse(res))
    }


export const deleteLikeFetch = (cardId) => {
    return fetch(`${serverURL}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: tokken,
            'Content-Type': 'application/json'
          }
        })
        .then(res => checkResponse(res))
    }

export const addLikeFetch = (cardId) => {
    return   fetch(`${serverURL}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: tokken,
            'Content-Type': 'application/json'
          }
        })
        .then(res => checkResponse(res))
    }

export const loadCards = () => {return fetch('https://nomoreparties.co/v1/wff-cohort-39/cards ', {
  headers: {
    authorization: '1f32eed6-4700-423b-84f1-c35d36de2fbb'
  }
})
.then(res => checkResponse(res))
}