import React from 'react';
import axios from 'axios'
import $ from 'jquery';


class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = { city: null, country: null, forecast: null, error: null }; 
    }

    getWeather = async (event) => {
      event.preventDefault();
      let city = event.target.city.value;
      let country = event.target.country.value;
      console.log(city, country);

      // client side js code to fetch stuff from a url
      const response = await fetch(`/weather?city=${city}&country=${country}`);
      const weather_data = await response.json(); 
      if(weather_data.error) {
        this.setState({ city: null, country: null, forecast: null, error: weather_data.error})
      }
      else {
        this.setState({ city: weather_data.city, country: weather_data.country, forecast: weather_data.forecast, error: null})
        // console.log(weather_data.city);
        // console.log(weather_data.forecast);
      }
    }

    printForecast = () => {
      if(this.state.forecast) {
        return `${this.state.forecast.desc}. ${this.state.forecast.temp} ${this.state.forecast.rain}`;
      }
    } 

    render() {
        return (
            <div className="Weather">

                <h1>Weather</h1>
                <p>Use this site to get your weather!</p>
                <form onSubmit={this.getWeather}>
                  <input name='city' placeholder='Enter your city'/>
                  <input name='country' placeholder='Enter your country'/>
                  <button>Search</button>
                </form>
                <p>{this.state.forecast && `The weather in ${this.state.city}, ${this.state.country} is:`}</p>
                {this.printForecast()}
            </div>
          );
    }
}

export default Weather;