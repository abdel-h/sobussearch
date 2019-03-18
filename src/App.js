import React, { Component } from 'react';
import './App.css';
import AutoCompleteField from './components/AutoCompleteField';
import Counter from './components/Counter';
import DatePicker from 'react-datepicker';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowsAltH);
library.add(faSpinner);

class App extends Component {
    constructor(props) {
        super(props);
        /**
         * State object needs some improvments
         */
        this.state = {
            fetching: false,
            firstLoad: true,
            data: [],
            returnData: [],
            departure: '',
            arrival: '',
            selectedDate: new Date(),
            passengers: 1,
            focusedInput: ''
        };
    }
    /* *
     * Needs improvments to remove the nested if statements.
     * */
    doAutoComplete = (event, field) => {
        const keyword = event.target.value;
        if ('' === keyword) {
            if ('departure' === field) {
                this.setState({ data: [], departure: keyword });
            } else {
                this.setState({ returnData: [], arrival: keyword });
            }
            return;
        }
        this.setState({ fetching: true });
        fetch(`/autocomplete/?keyword=${keyword}`)
            .then(res => {
                return res.json();
            })
            .then(res => {
                this.setState({ fetching: false });
                if ('departure' === field) {
                    this.setState({ data: res, departure: keyword });
                } else {
                    this.setState({ returnData: res, arrival: keyword });
                }
            });
    };

    dateHasChanged = date => {
        this.setState({ selectedDate: date });
    };
    changePassengers = operation => {
        let p = this.state.passengers;
        if ('+' === operation) {
            this.setState({ passengers: ++p });
        } else if ('-' === operation && p > 1) {
            this.setState({ passengers: --p });
        }
    };

    clickedItem = (name, value) => {
        this.setState({ [name]: value });
    };

    doSwitchFields = () => {
        let { data, returnData, departure, arrival } = this.state;
        const newData = [...returnData];
        const newReturnData = [...data];
        const newDeparture = arrival;
        const newArrival = departure;
        this.setState({
            returnData: newReturnData,
            data: newData,
            departure: newDeparture,
            arrival: newArrival
        });
    };
    doSearch = () => {
        let searchObject = {
            departure: this.state.departure,
            arrival: this.state.arrival,
            date: this.state.selectedDate,
            passengers: this.state.passengers
        };
        console.log(searchObject);
    };
    inputFocused = fieldName => {
        setTimeout(() => {
            this.setState({ focusedInput: fieldName });
        }, 100);
    };
    renderIcons = () => {
        const { fetching } = this.state;
        return fetching ? (
            <FontAwesomeIcon icon="spinner" spin />
        ) : (
            <FontAwesomeIcon icon="arrows-alt-h" />
        );
    };
    renderAutoCompleteField = (name, data, placeholder) => {
        const showResults = this.state[name] === '' ? false : true;
        return (
            <AutoCompleteField
                data={data}
                showResults={showResults}
                name={name}
                value={this.state[name]}
                handleChange={e => {
                    this.doAutoComplete(e, name);
                }}
                clickedItem={this.clickedItem}
                inputFocused={this.inputFocused}
                placeholder={placeholder}
            />
        );
    };
    render() {
        const { data, returnData } = this.state;

        return (
            <>
                <div className="main-search">
                    <div className="main-search__field main-search--departure">
                        {this.renderAutoCompleteField(
                            'departure',
                            data,
                            'Departure'
                        )}
                    </div>
                    <div
                        className="main-search--button"
                        onClick={this.doSwitchFields}
                    >
                        {this.renderIcons()}
                    </div>
                    <div className="main-search__field main-search--destination">
                        {this.renderAutoCompleteField(
                            'arrival',
                            returnData,
                            'Arrival'
                        )}
                    </div>
                    <div className="main-search__field main-search-departure-date main-search-date-picker">
                        <DatePicker
                            selected={this.state.selectedDate}
                            onChange={this.dateHasChanged}
                        />
                    </div>
                    <div className="main-search__field main-search-passengers">
                        <Counter
                            text={'Passenger'}
                            value={this.state.passengers}
                            changePassengers={this.changePassengers}
                        />
                    </div>
                </div>
                <button
                    className="main-search__search-btn"
                    onClick={this.doSearch}
                >
                    search
                </button>
            </>
        );
    }
}

export default App;
