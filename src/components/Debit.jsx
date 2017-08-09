import React, {Component} from 'react';

class Debit extends Component {
    render(){
        return(
            <li>
                <p>Description: {this.props.description}</p>
                <p>Amount: -{this.props.amount}</p>
                <p>Date: {this.props.date}</p>
            </li>
        )
    }
}


export default Debit;