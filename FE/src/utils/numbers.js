
function parseInt(stringValue){
    if(stringValue==='' || !stringValue){
        return 0;
    }
    return Number.parseInt(stringValue);
}

export {parseInt};