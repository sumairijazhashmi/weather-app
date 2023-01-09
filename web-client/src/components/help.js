import React from 'react';
import axios from 'axios'


class Help extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: null }; 
    }

    componentDidMount() {
        axios.get('http://localhost:3000/help')
         .then(response => {
           this.setState({ name : response.data.name })
         })
    }

    render() {
        return (
            <div className="Help">
              <footer className="App-footer">
                <p>{this.state.name} needs help</p>
              </footer>
            </div>
          );
    }
}

export default Help;