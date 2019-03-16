import React, { Component } from 'react';
import Result from './Result';

export default class AutoCompleteField extends Component {
    constructor(props) {
        super(props);
        this.showResults = true;
        this.state = {
            focused: false
        };
    }
    handleChange = event => {
        this.props.handleChange(event);
    };
    render() {
        return (
            <>
                <input
                    placeholder={this.props.placeholder}
                    type="text"
                    value={this.props.value}
                    onChange={this.handleChange}
                    className="main-search__field--text"
                    onFocus={() => {
                        this.inputFocusChanged();
                    }}
                    onBlur={() => {
                        this.inputFocusChanged();
                    }}
                />
                {this.renderAutoCompleteResults()}
            </>
        );
    }
    inputFocusChanged = () => {
        setTimeout(() => {
            this.setState({ focused: !this.state.focused });
        }, 100);
    };
    renderAutoCompleteResults = () => {
        const { showResults } = this.props;
        if (showResults && this.state.focused)
            if (this.props.data.length) {
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
            } else {
                return (
                    <div className="autocomplete-results">Invalid Location</div>
                );
            }
    };
}
