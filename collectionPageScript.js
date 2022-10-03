
let cardList = JSON.parse(localStorage.getItem('cardList')) || [];

document.getElementsByClassName('body').onload = () =>{
    let inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
    input.value = '';
    });
    listMyCards();
    document.getElementById('inputDiv').disabled = false;
    document.getElementById('editDiv').style.display = "none";
    document.getElementById('searchDiv').style.display = "none";
    document.getElementById('removeMode').disabled = true;
    }

const addCardButton = document.getElementById('addCardButton');
const clearFormButton = document.getElementsByClassName('clearFormButton');

const addModeButton = document.getElementById('addModeButton');
const editModeButton = document.getElementById('editModeButton');
const searchModeButton = document.getElementById('searchModeButton');
const removeModeButton = document.getElementById('removeModeButton');

const cardName = 'cardName';
const cardType = 'cardType';
const cardCost = 'cardCost';
const cardPic = 'cardPic';


//Validation
const validateForm = () => {

    // if(areAllNull()) {
    //     document.getElementById('errorText').innerHTML = "";
    //     document.getElementById('addCardButton').disabled = true;
    //     return false
    // }

    if(0) {
        document.getElementById('errorText').innerHTML = "";
        document.getElementById('addCardButton').disabled = true;
        return false
    }

}


const addCard = () => {
    const card = {
        [cardName]:document.forms.inputForm.cardNameInput.value,
        [cardType]:document.forms.inputForm.cardTypeInput.value,
        [cardCost]:document.forms.inputForm.cardCostInput.value,
        [cardPic]:document.forms.inputForm.cardPicInput.value,
    }
    cardList.push(card);
}

const listMyCards = () => {
    let listOfCards = '';
    cardList.forEach((x, i) => {
        listOfCards += `<li> Card Name: ${x[cardName]}
                        <br> Card Type: ${x[cardType]}
                        <br> Card Cost: ${x[cardCost]}
                        <br> Picture: ${x[cardPic]}
                        <br> <input type="button" value="Remove" id=${"removeId" + i}>
                        <br>
                        </li>`
    });
    document.getElementById('card-list').innerHTML = listOfCards;
    localStorage.setItem('cardList', JSON.stringify(cardList));
    cardList.forEach((x, i) => {
        document.getElementById('removeId' + i).onclick = () => {
            cardList.splice(i, 1);
            listMyCards();
            localStorage.setItem('cardList', JSON.stringify(cardList));
        };
    
        });
}

addCardButton.onclick = (e) => {
    e.preventDefault();
    addCard();
    let inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
    input.value = '';
    });
    listMyCards();
}

clearFormButton.onclick = (e) => {
    e.preventDefault();
    let inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        input.value = '';
    });
    listMyCards();
}


/*
load cardList from localstorage on page +
on load, list my cardList+
on load, clear the form+

pull buttons from the document+

define the addCard function+

define the listMyCards function+

define form validation for card input

define clear form button+


make add items form
define add items mode button

make edit items form
define edit items mode button

make search form
define search items mode button

define remove items mode button
make delete buttons enabled/disabled on click
*/