import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from "react-plotly.js/factory";

//this function renders the results of the AJAX call to API
//it takes in as props values that the parent component got from the call, ingredients, image URL, labels for an x-axis and values for a y-axis
function Results(props) {

    //assign to variables the value the props bring in, create a Plot element using the imported library
    //then assign to variable info all the needed information to graph, so in the render part a single variable can be passed into the Plot element
    let xAxis = props.nutritionLabel;
    let yAxis = props.dataNutrition;
    const Plot = createPlotlyComponent(Plotly);
    let info = {type: 'bar', x: xAxis, y:yAxis}; 

    //render all the results, a single variable info is passed into the component, it is defined by props above, it is an object of various values
    //falsey type checking is used, empty results are passed in as empty strings for props which resolve false, therefore a logical operation
    //can conditionally render elements depending on whether strings are passed in with info (true) or empty (false)
    //in example, result not found results in empty url string, so when url props is false (empty), an error message can be displayed
    return(
        <div className="results-div">

            
            {!props.dataURL && <p>This number is erroneous or not in the food database. </p>}
            
            <img src={props.dataURL}/>
            <p>{props.dataIngredients}</p>
            
            {props.dataURL &&
            <Plot
                data={[
                    info
                ]}
                layout={{width: 540, height: 360, title: 'Per 100g serving, macronutrients in grams'}}
            />
            }

        </div>            

    )
}

export default Results; 

