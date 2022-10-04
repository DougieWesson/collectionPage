const areAllInputsNull = () => {
    if (
        document.forms["inputForm"]["cardName"].value == ""
        && document.forms["inputForm"]["cardType"].value == ""
        && document.forms["inputForm"]["manaCost"].value == ""
        && document.forms["inputForm"]["cardValue"].value == ""
        // && document.forms["inputForm"]["cardPic"].value == ""
        ) {
            return true;
        } else {
            return false;
        }

}

const isCardNameInputNull = () => {
    return document.forms["inputForm"]["cardName"].value == "";
}

const isCardNameInputUnique =() => {
    const filterKey = document.forms["inputForm"]["cardName"].value;
    return (cardList.filter((x) => x.cardName === filterKey).length == 0)
}

const isCardTypeInputNull = () => {
    return document.forms["inputForm"]["cardType"].value == "";
}

const isManaCostInputinvalid =() => {
    let cardCost = document.forms["inputForm"]["manaCost"].value;
    let cardCostRegEx = /^[WUBRGXwubrgx0-9]*$/i;
    return !cardCostRegEx.test(cardCost);
}

const isCardValueInputNull = () => {
    return document.forms["inputForm"]["cardValue"].value == "";
}

const isCardValueInputANumber = () => {
    return !isNaN(document.forms["inputForm"]["cardValue"].value);
}

const isPictureInputNull = () => {
    return document.forms["inputForm"]["cardPic"].value == "";
}

const areAllEditsNull = () => {
    if (
        document.forms["editForm"]["cardName"].value == ""
        && document.forms["editForm"]["cardType"].value == ""
        && document.forms["editForm"]["manaCost"].value == ""
        && document.forms["editForm"]["cardValue"].value == ""
        // && document.forms["inputForm"]["cardPic"].value == ""
        ) {
            return true;
        } else {
            return false;
        }

}

const isCardNameEditNull = () => {
    return document.forms["editForm"]["cardName"].value == "";
}

const isCardNameEditUnique =() => {
    const filterKey = document.forms["editForm"]["cardName"].value;
    return (cardList.filter((x) => x.cardName === filterKey).length == 0)
}

const isCardTypeEditNull = () => {
    return document.forms["editForm"]["cardType"].value == "";
}

const isManaCostEditinvalid =() => {
    let cardCost = document.forms["editForm"]["manaCost"].value;
    let cardCostRegEx = /^[WUBRGXwubrgx0-9]*$/i;
    return !cardCostRegEx.test(cardCost);
}

const isCardValueEditNull = () => {
    return document.forms["editForm"]["cardValue"].value == "";
}

const isCardValueEditANumber = () => {
    return !isNaN(document.forms["editForm"]["cardValue"].value);
}

const isPictureEditNull = () => {
    return document.forms["editForm"]["cardPic"].value == "";
}

const toggleRemoveMode = () => {
    removeMode = !removeMode;
        let deleteButtons = document.getElementsByClassName('removeButton')
    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].disabled = !removeMode;
    };
}

const empowerRemoveButtons = () => {
    cardList.forEach((x, i) => {
        document.getElementById('removeId' + i).onclick = () => {
            cardList.splice(i, 1);
            listMyCards();
            localStorage.setItem('cardList', JSON.stringify(cardList));
        };
        });
}

const makeRemoveButtonsConsistent = () => {
    let deleteButtons = document.getElementsByClassName('removeButton')
        if (removeMode == false) {
            for (let i=0; i<deleteButtons.length; i++) {
            deleteButtons[i].disabled = !removeMode;
            };
        }
}

const attachPictureToCard = () => {
    cardList.forEach((x, i) => {
        const preview = document.getElementById('pictureId' + i);
        const image = new Image();
        image.minheight = 180;
        image.width = 120;
        image.title = x[cardName];
        image.src = x[cardPic];
        preview.appendChild(image);
        });
}

const listMyCards = () => {
    let listOfCards = '';
    cardList.forEach((x, i) => {
        listOfCards += `<li> Name: ${x[cardName]}
                        <br> Type: ${x[cardType]}
                        <br> Mana Cost: ${x[manaCost]}
                        <br> Value: ${x[cardValue]}
                        <br><div id=${"pictureId" + i}></div>
                        <br> <input type="button" value="Remove" class="removeButton" id=${"removeId" + i}>
                        </li>`
    });
    document.getElementById('card-list').innerHTML = listOfCards;
    localStorage.setItem('cardList', JSON.stringify(cardList));

    empowerRemoveButtons();
    attachPictureToCard();
    makeRemoveButtonsConsistent();
}

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

const addCard = () => {
    const card = {
        [cardName]:document.forms.inputForm.cardNameInput.value,
        [cardType]:document.forms.inputForm.cardTypeInput.value,
        [manaCost]:document.forms.inputForm.manaCostInput.value,
        [cardPic]:dataURL,
        [cardValue]:document.forms.inputForm.cardValueInput.value,
    }
    cardList.push(card);
    dataURL = '';
}

const editCard = () => {
    const card = {
        [cardName]:document.forms.editForm.cardNameEdit.value,
        [cardType]:document.forms.editForm.cardTypeEdit.value,
        [manaCost]:document.forms.editForm.manaCostEdit.value,
        [cardPic]:dataURL,
        [cardValue]:document.forms.editForm.cardValueEdit.value,
    }
    const filterKey = document.forms["editForm"]["cardName"].value;
    let originalIndex = cardList.map(card => card.cardName).indexOf(document.forms["editForm"]["cardName"].value);
    cardList.splice(originalIndex, 1)
    cardList.push(card);
    dataURL = '';
}