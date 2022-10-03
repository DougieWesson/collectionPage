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

const isCardNameUnique =() => {
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