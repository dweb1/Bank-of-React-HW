import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import UserProfile from './components/UserProfile';
import DebitList from './components/DebitList';
import CreditList from './components/CreditList';

class App extends Component {

  constructor() {
    super();

    this.state = {
      debits: [],
      credits: [],
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
  }

  _addNewDebitToDebitList = (newDebit) => {
    const debits = [...this.state.debits];
    debits.push(newDebit);
    this.setState({debits});
    this._calculateAccountBalance();
  }

  _addNewCreditToCreditList = (newCredit) => {
    const credits = [...this.state.credits];
    credits.push(newCredit);
    this.setState({credits});
    this._calculateAccountBalance();
  }

   _getDebits = () => {
    axios.get('http://localhost:4000/debits')
    .then((response) => {
      this.setState({
        debits: response.data
      })
  })
  }

  _getCredits = () => {
    axios.get('http://localhost:4000/credits')
    .then((response) => {
      this.setState({
        credits: response.data
      })
    })
  }

  _calculateAccountBalance = () => {
    const totalCredits = this.state.credits.reduce((totalCredits, credit) => {
      return totalCredits + credit.amount;
    }, 0)
    
    const totalDebits =this.state.debits.reduce((totalDebits, debit) => {
      return totalDebits + debit.amount;
    }, 0)

    return totalCredits - totalDebits
  }

  componentWillMount () {
    this._getCredits();
    this._getDebits();
  }

  render() {
    const accountBalance = this._calculateAccountBalance();

    const CreditComponent = () => (
      <CreditList
        credits={this.state.credits}
        addNewCreditToCreditList = {this._addNewCreditToCreditList}
        accountBalance={accountBalance}/>);

    const DebitComponent = () => (
      <DebitList
        debits={this.state.debits} 
        addNewDebitToDebitList={this._addNewDebitToDebitList}
        accountBalance={accountBalance}/>);

    const HomeComponent = () => (
      <Home 
        accountBalance={accountBalance}/>);

    const UserProfileComponent = () => (
        <UserProfile 
          userName={this.state.currentUser.userName} 
          memberSince={this.state.currentUser.memberSince} />);

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/debit" render={DebitComponent}/>
            <Route exact path="/credit" render={CreditComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;