import React, { useState } from "react";

//this function controls the form component for where values are added and the button that adds functionality to the form
//it takes in as props a function that controls the barcode state in the parent component
function Form(props) {

    //function triggered by form button
    function buttonSubmit(event){
        event.preventDefault();
        //grab the value stored in the form, then pass it up to the parent component via the function passed in as props
        let formNumber=document.getElementById("number-input")
        props.numberChange(formNumber.value);
    }

    //render the form and button, event handler fires the associated function 
    return(
       
        <div className="form" id="formId">
            <form>
                <label className ="form-label" htmlFor="input">
                    Search by barcode number, try 04963406 if you don't know one
                </label>

                <input
                    type="text"
                    id="number-input"
                    placeholder="0"
                    defaultValue="0"
                    name="number"

                />
                
                <button className="button" onClick={buttonSubmit}>Click</button>


            </form>
        </div>

    )

}

export default Form; 

