import React from 'react';
import axios from 'axios'


class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = { location: null, name: null }; 
    }

    componentDidMount() {
        axios.get('http://localhost:3000/about')
         .then(response => {
           this.setState({ title : response.data.title, name : response.data.name })
         })
    }

    render() {
        return (
            <div className="About">
              <header className="App-header">
                <p>{this.state.title}</p>
                <p>Created by {this.state.name}</p>
              </header>
            </div>
          );
    }
}

// function About() {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     fetch("/api")
//       .then((res) => res.json())
//       .then((data) => setData(data.message));
//   }, []);

  
// }

export default About;