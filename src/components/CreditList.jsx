import React from 'react';
import Credit from './Credit';
import CreditForm from './CreditForm';
import AccountBalance from './AccountBalance'

import {Link} from 'react-router-dom';

const CreditList = (props) => {
  const creditComponents = props.credits.map((credit, index) => {
    return <Credit
        description={credit.description}
        amount={credit.amount}
        date={credit.date} />;
  });
  
    return (
        <div>
            <h1>Credits</h1>
            <h3><AccountBalance accountBalance={props.accountBalance}/></h3>
            <h2>Add A New Credit</h2>
            <CreditForm 
              addNewCreditToCreditList= {props.addNewCreditToCreditList}/>
            <h2>Account Summary - Credit History</h2>
            <ul>
             {creditComponents} 
            </ul>
            <Link to="/">Go back home!</Link>
        </div>
    );
  }


export default CreditList;