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