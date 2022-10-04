
let cardList = JSON.parse(localStorage.getItem('cardList')) || [];
let removeMode = false;

document.getElementById('body').onload = () =>{
    // let inputs = document.querySelectorAll('input')
    // inputs.forEach(input => {
    // input.value = '';
    // });
    listMyCards();
    validateInputForm();
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

    if(isPictureEditNull()) {
        document.getElementById('errorText').innerHTML = "Add a picture.";
        document.getElementById('addCardButton').disabled = true;
        return false
    }
    reader.readAsDataURL(document.forms["editForm"]["cardPic"].files[0]);

    document.getElementById('editCardButton').disabled = false;
    document.getElementById('errorText').innerHTML = "Form valid.";

}


const addCard = () => {
    const card = {
        [cardName]:document.forms.inputForm.cardNameInput.value,
        [cardType]:document.forms.inputForm.cardTypeInput.value,
        [manaCost]:document.forms.inputForm.manaCostInput.value,
        [cardPic]:reader.result,
        [cardValue]:document.forms.inputForm.cardValueInput.value,
    }
    cardList.push(card);
}

const editCard = () => {
    const card = {
        [cardName]:document.forms.editForm.cardNameEdit.value,
        [cardType]:document.forms.editForm.cardTypeEdit.value,
        [manaCost]:document.forms.editForm.manaCostEdit.value,
        [cardPic]:reader.result,
        [cardValue]:document.forms.editForm.cardValueEdit.value,
    }
    const filterKey = document.forms["editForm"]["cardName"].value;
    let originalIndex = cardList.map(card => card.cardName).indexOf(document.forms["editForm"]["cardName"].value);
    cardList.splice(originalIndex, 1)
    cardList.push(card);
}

const listMyCards = () => {
    let listOfCards = '';
    cardList.forEach((x, i) => {
        listOfCards += `<li> Card Name: ${x[cardName]}
                        <br> Card Type: ${x[cardType]}
                        <br> Mana Cost: ${x[manaCost]}
                        <br> Card Value: ${x[cardValue]}
                        <br> Picture: <div id=${"pictureId" + i}></div>
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


    cardList.forEach((x, i) => {
        const preview = document.getElementById('pictureId' + i);
        const image = new Image();
        image.height = 160;
        image.width = 120;
        image.title = x[cardName];
        image.src = x[cardPic];
        preview.appendChild(image);
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
    validateInputForm();
}

editCardButton.onclick = (e) => {
    e.preventDefault();
    editCard();
    listMyCards();
    validateEditForm();
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
    validateInputForm();
}

addModeButton.onclick = (e) => {
    e.preventDefault();
    document.getElementById('inputDiv').style.display = "block";
    document.getElementById('editDiv').style.display = "none";
    document.getElementById('searchDiv').style.display = "none";
    listMyCards();
    validateInputForm();
}

editModeButton.onclick = (e) => {
    e.preventDefault();
    document.getElementById('inputDiv').style.display = "none";
    document.getElementById('editDiv').style.display = "block";
    document.getElementById('searchDiv').style.display = "none";
    listMyCards();
    validateInputForm();
    validateEditForm();
}

searchModeButton.onclick = (e) => {
    e.preventDefault();
    document.getElementById('inputDiv').style.display = "none";
    document.getElementById('editDiv').style.display = "none";
    document.getElementById('searchDiv').style.display = "block";
    listMyCards();
    validateInputForm();
}

removeModeButton.onclick = (e) => {
    e.preventDefault();
    removeMode = !removeMode;
        let deleteButtons = document.getElementsByClassName('removeButton')
    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].disabled = !removeMode;
    };
    listMyCards();
    validateInputForm();
}

//Sort functionality
const sortSelector = document.getElementById('cardSort');
const sortTypeSelector = document.getElementById('sortType');
const sortButton = document.getElementById('sortButton');

const sortMyCards = () => {
    if(sortTypeSelector.value == "Ascending") {
    switch(sortSelector.value) {
        case "Card Name":
            cardList.sort((a,b) => {
                if(a.cardName > b.cardName) {
                    return 1;
                } else if (a.cardName < b.cardName) {
                    return -1;
                } else {
                    return 0;
                };
            });
            break;
        case "Card Type":
            cardList.sort((a,b) => {
                if(a.cardType > b.cardType) {
                    return 1;
                } else if (a.cardType < b.cardType) {
                    return -1;
                } else {
                    return 0;
                };
            });
            break;
        case "Mana Cost":
            cardList.sort((a,b) => {
                if(a.manaCost > b.manaCost) {
                    return 1;
                } else if (a.manaCost < b.manaCost) {
                    return -1;
                } else {
                    return 0;
                };
            });
            break;
        case "Card Value":
            cardList.sort((a,b) => {
                if(a.cardValue > b.cardValue) {
                    return 1;
                } else if (a.cardValue < b.cardValue) {
                    return -1;
                } else {
                    return 0;
                };
            });
            break;
    }
} else if (sortTypeSelector.value == "Descending") {
    switch(sortSelector.value) {
        case "Card Name":
            cardList.sort((a,b) => {
                if(a.cardName > b.cardName) {
                    return -1;
                } else if (a.cardName < b.cardName) {
                    return 1;
                } else {
                    return 0;
                };
            });
            break;
        case "Card Type":
            cardList.sort((a,b) => {
                if(a.cardType > b.cardType) {
                    return -1;
                } else if (a.cardType < b.cardType) {
                    return 1;
                } else {
                    return 0;
                };
            });
            break;
        case "Mana Cost":
            cardList.sort((a,b) => {
                if(a.manaCost > b.manaCost) {
                    return -1;
                } else if (a.manaCost < b.manaCost) {
                    return 1;
                } else {
                    return 0;
                };
            });
            break;
        case "Card Value":
            cardList.sort((a,b) => {
                if(a.cardValue > b.cardValue) {
                    return -1;
                } else if (a.cardValue < b.cardValue) {
                    return 1;
                } else {
                    return 0;
                };
            });
            break;
    }
}
}

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