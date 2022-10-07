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

const empowerEditButtons = () => {
    cardList.forEach((x, i) => {
        document.getElementById('editId' + i).onclick = () => {
            let cardIndex = i;
            populateEditForm(cardIndex);
            listMyCards();
        };
        });
}

const disableRemoveButtons = () => {
    let deleteButtons = document.querySelectorAll('.removeButton')
    deleteButtons.forEach((button) => {
        removeMode = false;
        button.disabled = true;
        button.style.display = "none";
    })
}

const disableEditButtons = () => {
    let editButtons = document.querySelectorAll('.editButton')
    editButtons.forEach((button) => {
        editMode = false;
        button.disabled = true;
        button.style.display = "none";
    })
}

const enableEditButtons = () => {
    let editButtons = document.querySelectorAll('.editButton')
    editButtons.forEach((button) => {
        editMode = true;
        button.disabled = false;
        button.style.display = "block";
    })
}

const makeRemoveButtonsConsistent = () => {
    let deleteButtons = document.querySelectorAll('.removeButton')
        if (removeMode == false) {
            deleteButtons.forEach((button) => {
                button.disabled = true;
                button.style.display = "none";
            })
        } else if (removeMode == true) {
            deleteButtons.forEach((button) => {
                button.disabled = false;
                button.style.display = "block";
            })
        }
}

const makeEditButtonsConsistent = () => {
    let editButtons = document.querySelectorAll('.editButton')
        if (editMode == false) {
            editButtons.forEach((button) => {
                button.disabled = true;
                button.style.display = "none";
            })
        } else if (editMode == true) {
            editButtons.forEach((button) => {
                button.disabled = false;
                button.style.display = "block";
            })
        }
}

const attachPictureToCard = () => {
    cardList.forEach((x, i) => {
        const preview = document.getElementById('pictureId' + i);
        const image = new Image();
        image.height = 210;
        image.width = 140;
        image.title = x[cardName];
        image.src = x[cardPic];
        preview.appendChild(image);
        });
}

const listMyCards = () => {
    let listOfCards = '';
    cardList.forEach((x, i) => {
        const convertedMana = iconiseManaCost(x[manaCost])
        listOfCards += `<li> Name: ${x[cardName]}
                        <br> Type: ${x[cardType]}
                        <br> Mana Cost: <span class="manaCostDisplay"> ${convertedMana}</span>
                        <br> Value: ${x[cardValue]}
                        <br> <div id=${"pictureId" + i}></div>
                        <br> <button class="removeButton" id=${"removeId" + i}> Remove </button> <button class="editButton" id=${"editId" + i}> Edit Card </button>
                        </li>`
    });
    document.getElementById('card-list').innerHTML = listOfCards;
    localStorage.setItem('cardList', JSON.stringify(cardList));

    empowerRemoveButtons();
    empowerEditButtons();
    attachPictureToCard();
    makeRemoveButtonsConsistent();
    makeEditButtonsConsistent();
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
                if(Number(a.cardValue) > Number(b.cardValue)) {
                    return 1;
                } else if (Number(a.cardValue) < Number(b.cardValue)) {
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
                if(Number(a.cardValue) > Number(b.cardValue)) {
                    return -1;
                } else if (Number(a.cardValue) < Number(b.cardValue)) {
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
        [manaCost]:formatManaCost(document.forms.inputForm.manaCostInput.value),
        [cardPic]:dataURL,
        [cardValue]:Number(document.forms.inputForm.cardValueInput.value),
    }
    cardList.push(card);
    dataURL = '';
}

const editCard = () => {
    let originalIndex = cardList.map(card => card.cardName).indexOf(document.forms["editForm"]["cardName"].value);
    cardList[originalIndex][cardType] = document.forms.editForm.cardTypeEdit.value;
    cardList[originalIndex][manaCost] = formatManaCost(document.forms.editForm.manaCostEdit.value);
    cardList[originalIndex][cardValue] = document.forms.editForm.cardValueEdit.value;
}

const resetForms = () => {
    document.getElementById("inputForm").reset();
    document.getElementById("editForm").reset();
    document.getElementById("searchForm").reset();
}

const empowerClearFormButtons = () => {
    let clearFormButtons = document.querySelectorAll('.clearFormButton')
    clearFormButtons.forEach((button) => {
        button.onclick = (e) => {
            e.preventDefault();
            resetForms();
            listMyCards();
            validateInputForm();
            validateEditForm();
        }
    });
}

const showInputForm = () => {
    document.getElementById('inputDiv').style.display = "block";
    document.getElementById('editDiv').style.display = "none";
    document.getElementById('searchDiv').style.display = "none";
}

const showEditForm = () => {
    document.getElementById('inputDiv').style.display = "none";
    document.getElementById('editDiv').style.display = "block";
    document.getElementById('searchDiv').style.display = "none";
} 

const showSearchForm = () => {
    document.getElementById('inputDiv').style.display = "none";
    document.getElementById('editDiv').style.display = "none";
    document.getElementById('searchDiv').style.display = "block";
}

const populateEditForm = (cardIndex) => {
        document.forms.editForm.cardNameEdit.value = cardList[cardIndex][cardName];
        document.forms.editForm.cardTypeEdit.value = cardList[cardIndex][cardType];
        document.forms.editForm.manaCostEdit.value = cardList[cardIndex][manaCost];
        document.forms.editForm.cardValueEdit.value = cardList[cardIndex][cardValue];
        // document.forms.editForm.cardPicEdit.value = cardList[originalIndex][cardPic];
        validateEditForm();
}

const formatManaCost = (rawManaCost) => {
    let sortKey = "xwubrg"
    let characters = rawManaCost.toLowerCase();
    let letters = characters.split("").filter(i => sortKey.includes(i) === true);
    let numbers = characters.split("").filter(i => sortKey.includes(i) === false);
    let manaSort = sortKey.split("").reduce((total, amount, index,) => {
        total[amount] = index;
        return total;
    }, {});
    let sortedLetters = numbers.concat(letters.sort((a,b) => {
        return manaSort[a] - manaSort[b];
    })).join("");
    return sortedLetters;
}

const iconiseManaCost = (xManaCost) => {
    let sortKey = "xwubrg"
    let characters = xManaCost.toLowerCase();
    let letters = characters.split("").filter(i => sortKey.includes(i) === true);
    let numbers = characters.split("").filter(i => sortKey.includes(i) === false).join("").split(" ");
    numbers.push(...letters);
    let spreadManaCost = numbers;
    console.log(typeof(spreadManaCost))
    let iconisedManaCost = '';
    spreadManaCost.forEach((icon) => {
        if (icon !== '') {
            iconisedManaCost = iconisedManaCost + `<i class="ms ms-${icon}"></i>`
        }
    })
    return iconisedManaCost;
}