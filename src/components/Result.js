import React, { Component } from 'react';

export default class Result extends Component {
    render() {
        const { index, city, country, lat, lng } = this.props;
        return <div className="autocomplete-results__results">{city}</div>;
    }
}
