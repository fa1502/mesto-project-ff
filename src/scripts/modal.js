export function openModal(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('click',  removeClassOpenedClickOverlay);
    document.addEventListener('keydown',  removeClassOpenedPressKey);
}

export function closeModal(popup){
    popup.classList.remove('popup_is-opened')
    document.removeEventListener('click', removeClassOpenedClickOverlay);
    document.removeEventListener('keydown', removeClassOpenedPressKey);
}

    function removeClassOpenedClickOverlay(evt){
        const popup = document.querySelector('.popup_is-opened');
        if(evt.target === popup){
            closeModal(popup);
        }
    }
    function removeClassOpenedPressKey(evt){
        const popup = document.querySelector('.popup_is-opened');
        if(evt.key === 'Escape'){
            closeModal(popup);
        }
    }