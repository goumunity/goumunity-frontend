
function parsePrice(stringValue){
    if(stringValue==='' || !stringValue){
        return 0;
    }
    return Number.parseInt(stringValue);
}

function setFunData(category, data){
    if (category === 'FUN') {
        data.price = null;
        data.afterPrice = null;
        data.savingCategory = null;
    }
}

export {parsePrice, setFunData};