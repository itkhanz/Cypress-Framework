//https://docs.cypress.io/api/utilities/_
//https://lodash.com/docs/4.17.15#map
//https://lodash.com/docs/4.17.15#orderBy
//https://lodash.com/docs/4.17.15#sortBy
//https://glebbahmutov.com/cypress-examples/recipes/sorted-list.html



//It loops over the list of jQuery prices elements and return the actual prices list
export const extractActualPrices = ($prices) => {
    const innerText = (el) => el.innerText;
    const firstWord = (text) => text.split(' ')[0];
    const justDigits = (str) => str.replace(/[^0-9.]/g, '');
  
    const processedPricesList =  Cypress._.map($prices, (el) =>
        parseFloat(justDigits(firstWord(innerText(el)))),
    )
  
    return processedPricesList;
};

//It returns the text content of the list elements
export const extractProductsName = ($names) => {
    const productNamesList = Cypress._.map($names, (name) => name.innerText);
    return productNamesList;
};




