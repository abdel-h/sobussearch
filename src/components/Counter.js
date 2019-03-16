import React, { Component } from 'react';

export default class Counter extends Component {
    handleOperation = operation => {
        this.props.changePassengers(operation);
    };

    renderOperationSpan = (operationName, operationSign) => {
        if (operationSign === '-' && this.props.value == 1) return;
        return (
            <span
                onClick={() => {
                    this.handleOperation(operationSign);
                }}
                className={`main-search__field__operation main-search__field__operation--${operationName}`}
            >
                {operationSign}
            </span>
        );
    };
    render() {
        let { text, value } = this.props;

        if (1 !== value) {
            text += 's';
        }
        return (
            <div>
                {this.renderOperationSpan('minus', '-')}
                <input
                    type="text"
                    className="main-search__field--text"
                    value={value + ' ' + text}
                />
                {this.renderOperationSpan('plus', '+')}
            </div>
        );
    }
}
