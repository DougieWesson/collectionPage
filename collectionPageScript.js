
let cardList = JSON.parse(localStorage.getItem('cardList')) || [];
let removeMode = false;

document.getElementById('body').onload = () =>{
    // let inputs = document.querySelectorAll('input')
    // inputs.forEach(input => {
    // input.value = '';
    // });
    listMyCards();
    validateForm();
    document.getElementById('inputDiv').style.display = "block";
    document.getElementById('editDiv').style.display = "none";
    document.getElementById('searchDiv').style.display = "none";
    let deleteButtons = document.getElementsByClassName('removeButton')
    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].disabled = true;
    };
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

    if(!isCardNameUnique()) {
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

    // if(isPictureInputNull()) {
    //     document.getElementById('errorText').innerHTML = "Add a picture.";
    //     document.getElementById('addCardButton').disabled = true;
    //     return false
    // }

    document.getElementById('addCardButton').disabled = false;
    document.getElementById('errorText').innerHTML = "Form valid.";

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
                        <br> <input type="button" value="Remove" class="removeButton" id=${"removeId" + i}>
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
        let deleteButtons = document.getElementsByClassName('removeButton')
    if (removeMode == false) {
        for (let i=0; i<deleteButtons.length; i++) {
            deleteButtons[i].disabled = !removeMode;
        };
    }
}

addCardButton.onclick = (e) => {
    e.preventDefault();
    addCard();
    // let inputs = document.querySelectorAll('input')
    // inputs.forEach(input => {
    // input.value = '';
    // });
    listMyCards();
    validateForm();
}

clearFormButton.onclick = (e) => {
    e.preventDefault();
    let inputs = document.getElementsByTagName('input');
    for(i=0; i<inputs.length; i++) {
        if(inputs[i].type.toLowerCase() == "text") {
            inputs[i].value = '';
        };
    };
    
    listMyCards();
    validateForm();
}

addModeButton.onclick = (e) => {
    e.preventDefault();
    document.getElementById('inputDiv').style.display = "block";
    document.getElementById('editDiv').style.display = "none";
    document.getElementById('searchDiv').style.display = "none";
    listMyCards();
    validateForm();
}

editModeButton.onclick = (e) => {
    e.preventDefault();
    document.getElementById('inputDiv').style.display = "none";
    document.getElementById('editDiv').style.display = "block";
    document.getElementById('searchDiv').style.display = "none";
    listMyCards();
    validateForm();
}

searchModeButton.onclick = (e) => {
    e.preventDefault();
    document.getElementById('inputDiv').style.display = "none";
    document.getElementById('editDiv').style.display = "none";
    document.getElementById('searchDiv').style.display = "block";
    listMyCards();
    validateForm();
}

removeModeButton.onclick = (e) => {
    e.preventDefault();
    removeMode = !removeMode;
        let deleteButtons = document.getElementsByClassName('removeButton')
    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].disabled = !removeMode;
    };
    listMyCards();
    validateForm();
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