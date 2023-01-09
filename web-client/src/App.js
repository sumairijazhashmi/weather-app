import logo from './logo.svg';
import './App.css';
import React from 'react';
import Weather from './components/weather'
import About from './components/about'
import Help from './components/help'

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
        <header className="App-header">
          <p>{!data ? "Loading..." : data}</p>
        </header>
        <Weather/>
        <About/>
        <Help/>
    </div>
  );
}

export default App;
