const axios = require('axios')

class Busquedas {

    historial = ['Bogota','Madrid','Santiago de chile' ]

    constructor (){
        // Todo: leer si existe
    }

    get paramsMapbox(){
        return{
           'access_token': process.env.MAPBOX_KEY,
            'limit':10,
            'language': 'es'
        }
    }

    get paramsWeather(){
        return{
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }



    async ciudad (lugar= ''){

        try {
         //peticion http

         const intance = axios.create({
            baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json?`,
            params: this.paramsMapbox
         })
         // Retornar los lugares
         const resp = await intance.get();
        return resp.data.features.map( lugar => ({

            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1],

        }));

     
        } catch (error) {
            return[]
        }
        
    }

    async climaLugar (lat, lon){
        try {
            //instancia de axios.create()

            const instanceClima = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: {...this.paramsWeather, lat, lon}

        })

        const resp = await instanceClima.get();
        const {weather, main} = resp.data;

            //resp.data

            return{
                desc:weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error)
            
        }
    }

}


module.exports = Busquedas;

//https://api.openweathermap.org/data/2.5/weather?lat=4.59889&lon=-74.08083&appid=ceae8d2043b6bf8e75986ed5af623a9b&units=metric&lang=es