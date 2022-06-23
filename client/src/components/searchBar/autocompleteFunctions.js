export const onSuggestionsClearRequested = (setProducts)=> setProducts([]); 

export const onSuggestionsFetchRequested = (setProducts, filtered) => setProducts(filtered); 

export const getSuggestionValue = (suggestion) => `${suggestion.name}`;

