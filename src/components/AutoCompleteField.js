import React, { Component } from 'react';
import Result from './Result';

export default class AutoCompleteField extends Component {
    handleChange = event => {
        this.props.handleChange(event);
    };

    renderAutoCompleteResults = () => {
        console.log(this.props.showResults);
        if (this.props.showResults)
            return (
                <div className="autocomplete-results">
                    {this.props.data.map((d, index) => {
                        const { i, n, c, lat, lng } = d;
                        console.log(n);
                        return (
                            <Result
                                key={index}
                                city={n}
                                country={c}
                                index={i}
                                lat={lat}
                                lng={lng}
                            />
                        );
                    })}
                </div>
            );
    };
    render() {
        return (
            <>
                <input type="text" onChange={this.handleChange} />
                {this.renderAutoCompleteResults()}
            </>
        );
    }
}
