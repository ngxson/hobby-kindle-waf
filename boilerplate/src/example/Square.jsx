import React from 'react';
import { viewportWidth } from '../Kindle';

const styleObj = {
  width: `${viewportWidth / 10}px`,
  height: `${viewportWidth / 10}px`,
};

function Square(props) {
  //If there is an error, a css class will be added
  const styles = props.error ? "square square-editable error" : "square square-editable";
  return props.isInitValue ? (
    <input 
      readOnly
      style={styleObj}
      className= "square" 
      value= {props.value} 
      />      
  ) : (
    <input     
      style={styleObj}  
      className= {styles} 
      onChange= {(e) => props.onChange(e, props.square)}
    />  
  )
}

export default Square;