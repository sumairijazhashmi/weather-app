const express = require("express")
const app = express()

const weather = require('./utils/weather')

// define paths for express config
// to setup a *static* folder so that express can show it:
const path = require('path')
// const public_directory_path = path.join(__dirname, '../public')
// const views_path = path.join(__dirname, "../templates")

// setup hbs and views location 
// hbs templating lib to render dynamic code + allow for reusable code
// app.set('view engine', 'hbs') // now all of the stuff that you render on the screen (the dynamic content) should be in the views directory
// app.set('views', views_path)

// setup static directory to serve
// app.use(express.static(public_directory_path))


// console.log(__dirname)
// console.log(__filename)


// tell what server should do when someone tries to get a resource from a route file
// arg 1: route file, arg 2: function
// functions arguments: req and res
// req contains the incoming request to the server
// res contains a bunch of funcs allowing us to customize what we will send back to the requestor

// can send html elements or json objects thru res.send
// res.send sends something back to the requestor


// // allow cors
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

const port = process.env.PORT || 3000;

app.get('', (req, res) => {
    // renders views - arg name needs to match file name
    res.render("index", {
        title : 'weather app',
        name : 'sih'
    })
})

app.get("/api", (req, res) => {
    res.json({ 
        message: "Hello from server!",
        title : "weather app",
        name : "sih"
    });
});
  

app.get('/about', (req, res) => {
    res.send({
        title : 'weather app',
        name : 'sih'
    });
});

app.get("/help", (req, res) => {
    res.send({
        name : 'sumair'
    })
})

app.get('/weather', async (req, res) => {
    if(!req.query.city || !req.query.country) {
        return res.send({
            error: "You must provide a valid city and country!"
        })
    }
//
    let returnObject = {desc: null, temp: null, rain: null}
    const city = req.query.city;
    const country = req.query.country;

    await weather.current_weather(city, country, (error, data) => {
        if(error) {
            return res.send({
                error : "Invalid city or country!"
            })
        }

        const temp = data.main.temp; // toCelsius(response.data.main.temp).toFixed(2); 
        returnObject.desc = data.weather[0].main;
        returnObject.temp = `The temperature right now is ${temp} degrees celsius.`;
    })
    
    await weather.forecast_weather(city, country, (error, data) => {
        if(error) {
            return res.send({
                error : "Invalid city or country!"
            })
        }

        const chance_rain = data.list[0].pop; 
        returnObject.rain = `The chance of rain is ${chance_rain}%.`;
    })


    return res.send({
        city: city,
        country: country,
        forecast : returnObject
        // location : "Lahore,pk",
    })
})

// app.get('/products', (req, res) => {

//     if(!req.query.search) {
//         return res.send({
//             error : "You must provide a search term!"
//         })
//         // the return statement prevents the code down below to run as otherwise sending 2 requests that causes an error
//     }
    
//     // info of the query string in the url is in req
//     console.log(req.query.search)

//     res.send({
//         products : []
//     })
// })

// 404 page if user picks some other page
app.get('*', (req, res) => {
    res.send("My 404 page")
})

// start the server and listen on port 3000
app.listen(port, () => {
    console.log("server is up on port 3000")
})