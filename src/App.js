import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

import Form from './components/Form';
import Results from './components/Results';

function App() {

  //set state for information to be assigned later in API calls
  const [barcodeNumber, setBarcode] = useState("0");
  const [dataURL,setDataURL] = useState("");
  const [dataIngredients, setDataIngredients] = useState("");
  const [dataNutrition, setDataNutrition] = useState("");
  //this is a set of labels that goes along with dataNutrition, paired as they are used for graphing, placed here next to dataNutrition for intuitive purposes
  const nutritionLabel = ["sugar", "protein", "fat"]; 

  // this function changes the value for the barcode, it is called in the form component, when called it also calls an Async function
  function changeFormValue(number){
    setBarcode(number);
    fetchFoodData(number)
  }
  
  //this Async function handles the API call, it takes the new barcode from function changeFormValue as an argument
  async function fetchFoodData(number){

    //create a URL from input, send GET to the link and promise chain response
    let URL = "https://us.openfoodfacts.org/api/v0/product/" + number;
    const response = await fetch(URL);
    const dataPromise = await response.json();  

    //status code of a call where there is no product found is 0, therefore in that case set states to empty string and exit
    if(dataPromise.status===0){
        setDataURL("");
        setDataIngredients("");
        setDataNutrition("");
        return
    }
    
    //console.log(dataPromise.product.nutriments);
    //results must have been found, so, states are set using the promise's response, JSON data
    setDataURL(dataPromise.product.image_front_url)
    setDataIngredients(dataPromise.product.ingredients_text)
    setDataNutrition([dataPromise.product.nutriments.sugars_100g, dataPromise.product.nutriments.proteins_100g, dataPromise.product.nutriments.fat_100g]);
    //console.log(dataNutrition);
    return 
}

  //render the app and its components
  //form has the function to control barcode value passed in as props
  //the barcode value has a default of 0, when barcode is 0 the results component is not rendered, so by default on load that component is not present
  //in all other cases, JSON-extracted values or empty strings are passed in as props
  return (
    <div className="app">
      <Form
        numberChange={changeFormValue}

      />
      {barcodeNumber!=="0" && 
        
        <Results
          dataURL={dataURL}
          dataIngredients={dataIngredients}
          dataNutrition={dataNutrition}
          nutritionLabel={nutritionLabel}
        />
      
      }
      
    </div>
  );
}

export default App;
