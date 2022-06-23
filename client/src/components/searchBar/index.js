import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { GlobalContainer, SearchIcon } from "./searchElements";
import { useDispatch, useSelector } from "react-redux";
import { searchProductSync } from "../../redux/actions/sync";
import { searchProductAsync } from "../../redux/actions/async";
import Autosuggest from "react-autosuggest";
import "./autoStyles.scss"
import axios from "axios";


export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.selectedTheme);

  // ==================================
  const productsF = useSelector(state=> state.main.products.filtered);
  const allProducts = useSelector(state=> state.main.products.all)
  const [products, setProducts] = useState(productsF ? productsF:[]); 

  const renderSuggestion = (suggestion)=> (
    <div onClick={()=> handleSelect(suggestion.name)}>
        {`${suggestion.name}`}
    </div>); 

    const onSuggestionsClearRequested = ()=>setProducts(allProducts); 

    const onSuggestionsFetchRequested = ({value}) => setProducts(filterProducts(value)); 
    const getSuggestionValue = (suggestion) => `${suggestion.name}`
    
    const handleSelect = (product)=> {
      setInput("");
      dispatch(searchProductAsync(product))
    } 

    const filterProducts=(value)=>{
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
    
      let filteredProducts = allProducts.filter(product=>{
        let completeName = product.name;
        if(completeName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(inputValue)){
          return product;
        }
      });
      return inputLength===0 ? [] : filteredProducts;
    }

    const getData = ()=> {
      axios.get("http://localhost:3001/api/v1/products").then(response=>{
        setProducts(response.data);
      })
    }
  // ================================
  const handleChange = (e) => {
    setInput(e.target.value);
    dispatch(searchProductSync(e.target.value));
  };

  const handleClean = ()=> {
    dispatch(searchProductSync(""))
  }
  const inputProps = {
    placeholder: "Product name",
    value: input,
    onChange: handleChange,
  };

  useEffect(()=> {
    getData();
  }, [])
  return (
    <GlobalContainer>
      <Autosuggest
        suggestions={products}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={()=> setInput("")}
      />
      <button onClick={handleClean}>Clean</button>
      <SearchIcon theme={theme} onClick={handleSelect}>
        <AiOutlineSearch />
      </SearchIcon>
    </GlobalContainer>
  );
}
