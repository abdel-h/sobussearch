import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            data: []
        };
    }
    doAutoComplete = event => {
        const keyword = event.target.value;
        if ('' === keyword) {
            this.setState({ data: [] });
            return;
        }
        fetch(`http://localhost:3001/autocomplete/?keyword=${keyword}`)
            .then(res => {
                return res.json();
            })
            .then(res => {
                this.setState({ data: res });
            });
    };
    render() {
        const { data } = this.state;
        return (
            <div className="App">
                <input type="text" onChange={this.doAutoComplete} />
                {data.map(d => {
                    return <div>{d.n}</div>;
                })}
            </div>
        );
    }
}

export default App;
