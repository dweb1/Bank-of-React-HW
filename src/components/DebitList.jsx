import React from 'react';
import Debit from './Debit';
import DebitForm from './DebitForm';
import AccountBalance from './AccountBalance'

import {Link} from 'react-router-dom';

const DebitList = (props) => {
  const debitComponents = props.debits.map((debit, index) => {
    return <Debit
        description={debit.description}
        amount={debit.amount}
        date={debit.date} />;
  });
  
    return (
        <div>
            <h1>Debits</h1>
            <h3><AccountBalance accountBalance={props.accountBalance}/></h3>
            <h2>Add A New Debit</h2>
            <DebitForm 
              addNewDebitToDebitList= {props.addNewDebitToDebitList}/>
            <h2>Account Summary - Debit History</h2>
            <ul>
             {debitComponents} 
            </ul>
            <Link to="/">Go back home!</Link>
        </div>
    );
  }


export default DebitList;