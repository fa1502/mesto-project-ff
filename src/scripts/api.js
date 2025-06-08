export const submitProfileValue = (nameValue, jobValue) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '1f32eed6-4700-423b-84f1-c35d36de2fbb',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue,
            about: jobValue
        })
        })
        .then(res => {
        if (res.ok) {
        return res;
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
        console.log(err);
        }); 
} 

export const submitCardValue = (cardNameValue, linkValue) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-39/cards', {
        method: 'POST',
        headers: {
            authorization: '1f32eed6-4700-423b-84f1-c35d36de2fbb',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardNameValue,
            link: linkValue
        })
        }).then(res => {
        if (res.ok) {
        return res;
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
        console.log(err);
        })
} 

export const submitAvatarValue = (avatarLinkValue) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '1f32eed6-4700-423b-84f1-c35d36de2fbb',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarLinkValue
        })
        }).then(res => {
        if (res.ok) {
        return res;
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
        console.log(err);
        })
}

export const loadProfile = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me ', {
  headers: {
    authorization: '1f32eed6-4700-423b-84f1-c35d36de2fbb'
  }
}).then(res => {
        if (res.ok) {
        return res;
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
        console.log(err);
        })
}

