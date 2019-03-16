import React, { Component } from 'react';

export default class Result extends Component {
    handleClick = event => {
        const { inputName } = this.props;
        this.props.clickedItem(inputName, this.props.city);
    };
    render() {
        const { index, city, country, lat, lng } = this.props;
        return (
            <div
                className="autocomplete-results__results"
                onClick={this.handleClick}
            >
                {city}
                <span className="autocomplete-results__results--country">
                    {country}
                </span>
            </div>
        );
    }
}
