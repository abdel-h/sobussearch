import React, { Component } from 'react';
import './App.css';
import AutoCompleteField from './components/AutoCompleteField';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            data: [],
            returnData: [],
            departure: '',
            arrival: '',
            selectedDate: new Date()
        };
    }
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
        fetch(`http://localhost:3001/autocomplete/?keyword=${keyword}`)
            .then(res => {
                return res.json();
            })
            .then(res => {
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

    displayAutoCompleteField = (name, data) => {
        const showResults = this.state[name] === '' ? false : true;
        return (
            <AutoCompleteField
                data={data}
                showResults={showResults}
                handleChange={e => {
                    this.doAutoComplete(e, name);
                }}
            />
        );
    };
    render() {
        const { data, returnData } = this.state;
        return (
            <div className="main-search">
                <div className="main-search__field main-search--departure">
                    {this.displayAutoCompleteField('departure', data)}
                </div>
                <div className="main-search__field main-search--destination">
                    {this.displayAutoCompleteField('arrival', returnData)}
                </div>
                <div className="main-search__field main-search-departure-date main-search-date-picker">
                    <DatePicker
                        selected={this.state.selectedDate}
                        onChange={this.dateHasChanged}
                    />
                </div>
                <div className="main-search__field main-search-passengers">
                    <input type="text" />
                </div>
            </div>
        );
    }
}

export default App;
