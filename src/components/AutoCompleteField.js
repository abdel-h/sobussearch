import React, { Component } from 'react';
import Result from './Result';

export default class AutoCompleteField extends Component {
    constructor(props) {
        super(props);
        this.showResults = true;
    }
    handleChange = event => {
        this.props.handleChange(event);
    };
    handleVisibility = () => {
        console.log(this.props.name, this.props.renderResults);
        this.props.switchVisibility(this.props.name);
    };
    render() {
        return (
            <>
                <input
                    type="text"
                    value={this.props.value}
                    onChange={this.handleChange}
                    onBlur={this.handleVisibility}
                    onFocus={this.handleVisibility}
                    className="main-search__field--text"
                />
                {this.renderAutoCompleteResults()}
            </>
        );
    }
    renderAutoCompleteResults = () => {
        const { showResults, renderResults, name } = this.props;
        if (showResults && !renderResults)
            return (
                <div className="autocomplete-results">
                    {this.props.data.map((d, index) => {
                        const { i, n, c, lat, lng } = d;
                        return (
                            <Result
                                key={index}
                                city={n}
                                country={c}
                                index={i}
                                lat={lat}
                                lng={lng}
                                inputName={this.props.name}
                                clickedItem={this.props.clickedItem}
                            />
                        );
                    })}
                </div>
            );
    };
}
