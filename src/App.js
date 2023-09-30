import { useState } from 'react';

import Header from './components/Header'
import Keypad from './components/Keypad'

import './App.css';


import moonIcon from './asset/moon.gif'
import sunIcon from './asset/sun.png'



const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
  const[isDarkMode,setMode]=useState(false);
  const[expression,setExpression]=useState("");
  const[result,setresult]=useState("");
  const[history,sethistory]=useState([]);

  const handelKeyPress=(keyCode,key)=>{
    if(!keyCode) return;

    if(!usedKeyCodes.includes(keyCode))return;
    else if(numbers.includes(key)){
      if(key==="0"){
        if(expression.length===0)return
      }
      calculateRes(expression + key)
      setExpression(expression + key);
    }


    else if(operators.includes(key)){
      if(!expression)return
      const lastChar=expression.slice(-1)
      if(operators.includes(lastChar))return
      if(lastChar===".")return
      setExpression(expression + key);
    }
    else if(key==="."){
      if(!expression)return
      const lastChar=expression.slice(-1);
      if(!numbers.includes(lastChar))return;
      setExpression(expression + key)
    }
    else if(keyCode===13){
      if(!expression)return;
      calculateRes(expression);
      const temphistory=[...history]
      
      if(temphistory.length>20)temphistory=temphistory.splice(0,1);
      temphistory.push(expression);
      sethistory(temphistory);

    }
    else if(keyCode===8){
      if(!expression)return
      calculateRes(expression.slice(0,-1))
      setExpression(expression.slice(0,-1))
    }

  };

  const calculateRes=(exp)=>{
        if(!exp)return;
        const lastChar=exp.slice(-1)
        if(!numbers.includes(lastChar))exp=exp.slice(0,-1)

        const answer =eval(exp).toFixed(1) + "";
        setresult(answer);
        
  }

  return (
    <div className="app"
    tabIndex="0"
     onKeyDown={(event)=>handelKeyPress(event.keyCode,event.key)}
     data-theme={isDarkMode ? "dark" : ""} >
        <div className='app_calculator'>
              <div className='app_calculator_navbar'>
                <div className='app_calculator_navbar_toggle' onClick={()=>setMode(!isDarkMode)}>
                  <div className={`app_calculator_navbar_toggle_circle 
                                      ${
                                          isDarkMode ? "app_calculator_navbar_toggle_circle_active":"app_calculator_navbar_toggle_circle"
                                        }
                                 `}>
                  </div>
                  <img src={isDarkMode ? moonIcon: sunIcon} alt='mode'/>
                </div>
             </div>
                <Header expression={expression} result={result} history={history} />   
                <Keypad handelKeyPress={handelKeyPress}/>                       
        </div>
    </div>
  );
}

export default App;
