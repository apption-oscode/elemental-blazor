export function setIndeterminate(checkboxElement, indeterminate) {
    if(checkboxElement){
        checkboxElement.indeterminate = indeterminate;
    }
    else {
        console.warn("Checkbox element is null");
    }
}