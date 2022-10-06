
let cardList = JSON.parse(localStorage.getItem('cardList')) || [];
let removeMode = false;
let editMode = false;

document.getElementById('body').onload = () =>{
    resetForms();
    listMyCards();
    validateInputForm();
    showInputForm();
    disableRemoveButtons();
    disableEditButtons();
    empowerClearFormButtons();
    }

const addCardButton = document.getElementById('addCardButton');
const clearFormButton = document.getElementsByClassName('clearFormButton');

const editCardButton = document.getElementById('editCardButton');

const addModeButton = document.getElementById('addModeButton');
const editModeButton = document.getElementById('editModeButton');
const searchModeButton = document.getElementById('searchModeButton');
const removeModeButton = document.getElementById('removeModeButton');

const cardName = 'cardName';
const cardType = 'cardType';
const manaCost = 'manaCost'; 
const cardValue = 'cardValue';
const cardPic = 'cardPic';

let dataURL;
const reader = new FileReader();
reader.onload = () => {
    dataURL = reader.result;
}


//Validation
const validateInputForm = () => {

    if(areAllInputsNull()) {
        document.getElementById('errorText').innerHTML = "";
        document.getElementById('addCardButton').disabled = true;
        return false
    }

    if(isCardNameInputNull()) {
        document.getElementById('errorText').innerHTML = "You need a card name.";
        document.getElementById('addCardButton').disabled = true;
        return false
    }

    if(!isCardNameInputUnique()) {
        document.getElementById('errorText').innerHTML = "Card name in use.";
        document.getElementById('addCardButton').disabled = true;
        return false
    }

    if(isCardTypeInputNull()) {
        document.getElementById('errorText').innerHTML = "Pick a card type.";
        document.getElementById('addCardButton').disabled = true;
        return false
    }

    if(isManaCostInputinvalid()) {
        document.getElementById('errorText').innerHTML = "You need a valid mana cost.";
        document.getElementById('addCardButton').disabled = true;
        return false
    } 

    if(isCardValueInputNull()) {
        document.getElementById('errorText').innerHTML = "How valuable is your card?";
        document.getElementById('addCardButton').disabled = true;
        return false
    }

    if(!isCardValueInputANumber()) {
        document.getElementById('errorText').innerHTML = "You need a valid value.";
        document.getElementById('addCardButton').disabled = true;
        return false
    }

    if(isPictureInputNull()) {
        document.getElementById('errorText').innerHTML = "Add a picture.";
        document.getElementById('addCardButton').disabled = true;
        return false
    }
    reader.readAsDataURL(document.forms["inputForm"]["cardPic"].files[0]);

    document.getElementById('addCardButton').disabled = false;
    document.getElementById('errorText').innerHTML = "Form valid.";

}

const validateEditForm = () => {

    if(areAllEditsNull()) {
        document.getElementById('errorText').innerHTML = "";
        document.getElementById('editCardButton').disabled = true;
        return false
    }

    if(isCardNameEditNull()) {
        document.getElementById('errorText').innerHTML = "You need a card name.";
        document.getElementById('editCardButton').disabled = true;
        return false
    }

    if(isCardNameEditUnique()) {
        document.getElementById('errorText').innerHTML = "Card name not in use.";
        document.getElementById('editCardButton').disabled = true;
        return false
    }

    if(isCardTypeEditNull()) {
        document.getElementById('errorText').innerHTML = "Pick a card type.";
        document.getElementById('editCardButton').disabled = true;
        return false
    }

    if(isManaCostEditinvalid()) {
        document.getElementById('errorText').innerHTML = "You need a valid mana cost.";
        document.getElementById('editCardButton').disabled = true;
        return false
    } 

    if(isCardValueEditNull()) {
        document.getElementById('errorText').innerHTML = "How valuable is your card?";
        document.getElementById('editCardButton').disabled = true;
        return false
    }

    if(!isCardValueEditANumber()) {
        document.getElementById('errorText').innerHTML = "You need a valid value.";
        document.getElementById('editCardButton').disabled = true;
        return false
    }

    // if(isPictureEditNull()) {
    //     document.getElementById('errorText').innerHTML = "Add a picture.";
    //     document.getElementById('addCardButton').disabled = true;
    //     return false
    // }
    // reader.readAsDataURL(document.forms["editForm"]["cardPic"].files[0]);

    document.getElementById('editCardButton').disabled = false;
    document.getElementById('errorText').innerHTML = "Form valid.";

}

addCardButton.onclick = (e) => {
    e.preventDefault();
    addCard();
    resetForms();
    listMyCards();
    validateInputForm();
}

editCardButton.onclick = (e) => {
    e.preventDefault();
    editCard();
    listMyCards();
    validateEditForm();
}

addModeButton.onclick = (e) => {
    e.preventDefault();
    resetForms();
    disableEditButtons();
    showInputForm();
    listMyCards();
    validateInputForm();
}

editModeButton.onclick = (e) => {
    e.preventDefault();
    resetForms();
    disableRemoveButtons();
    enableEditButtons();
    showEditForm();
    listMyCards();
    validateEditForm();
}

searchModeButton.onclick = (e) => {
    e.preventDefault();
    resetForms();
    disableEditButtons();
    showSearchForm();
    listMyCards();
}

removeModeButton.onclick = (e) => {
    e.preventDefault();
    disableEditButtons();
    toggleRemoveMode();
    listMyCards();
    validateInputForm();
}

//Sort functionality
const sortSelector = document.getElementById('cardSort');
const sortTypeSelector = document.getElementById('sortType');
const sortButton = document.getElementById('sortButton');

sortButton.onclick = (e) => {
    e.preventDefault();
    sortMyCards();
    listMyCards();
    validateInputForm();
}


/*
+load cardList from localstorage on page +
+on load, list my cardList+
+on load, clear the form+

pull buttons from the document+

+define the addCard function+

+define the listMyCards function+

+define form validation for card input+

+define clear form button+


make add items form
define add items mode button

make edit items form
define edit items mode button

make search form
define search items mode button

define remove items mode button
make delete buttons enabled/disabled on click
*/