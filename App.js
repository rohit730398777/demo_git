import logo from './logo.svg';
import './App.css';
// import '../ExpenseItem.css';
import React, { useEffect, useState } from 'react';
import Expenses from './Expenses/Expenses';
import NewExpenses from './NewExpenses/NewExpenses';

let DUMMY_EXPENSE=[];


function App() {

  // let expenseDate=new Date(2025, 7, 21);
  // let expenseTitle= "Car Insurance";
  // let expensePrice= 200;

    // const expenses=[
  //   {id:'e1', 
  //   title:'car Insurance', 
  //   date:new Date(2025, 7, 21),
  //   amount:300},
  //      {id:'e2', 
  //   title:'House Rent', 
  //   date:new Date(2025, 8, 25),
  //   amount:400},
  //      {id:'e3', 
  //   title:'Tution Fees', 
  //   date:new Date(2025, 9, 15),
  //   amount:700},
  
  // ];

  
  const [expenses,setExpense]= useState(DUMMY_EXPENSE);

  function FetchData(){
    fetch('http://localhost:5000/expenses')
    .then((response) => {
        return response.json();
      })
      .then((data)=>{
    // console.log(data);
    setExpense(data);
  })
  .catch((error)=>{
    console.error('Error fetching data:', error);
      });
    }
useEffect(()=>{
  FetchData();
},[] );


// useEffect(()=>{
//   fetch('http://localhost:5000/expenses').then(
//     response=>{
//       return response.json();
//     }
//   ).then(
//     data=>{
//     // console.log(data);
//     setExpense(data);
//   }
// )
// useEffect(()=>{
//   FetchData();
// })
// },[] );

  const addExpenseHandler=(expense)=>{
    // console.log(expense);
    // const updatedExpense=[expense,...expenses];
    // setExpense(updatedExpense);
    fetch('http://localhost:5000/expenses',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(expense)
    }).then(()=>{
      FetchData();
    }
  );


  }


  return (
    <div className="App">
    <h1>Expense Tracker in ReactJS</h1>
    <NewExpenses onaddExpense={addExpenseHandler}></NewExpenses>
    <Expenses item={expenses}/>
    </div>
  );
}

export default App;
