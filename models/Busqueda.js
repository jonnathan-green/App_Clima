const fs = require('fs');

const axios = require('axios');


class Busquedas {

    historial = [] ;
    dbPath = './DB/database.json'

    constructor (){
        // Todo: leer si existe
        this.leerDB();
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

    get historialCapitalizado(){
        return this.historial.map( lugar =>{

            let palabras = lugar.split('');
            palabras = palabras.map(p => p[0].toLowerCase() + p.substring(1));
            return palabras.join('')
                }); 
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

    agregarHistorial(lugar = ''){
        // Prevenir duplicados 
        if(this.historial.includes(lugar.toLocaleLowerCase() )){
            return;
        }

        this.historial = this.historial.splice(0,5);


        this.historial.unshift(lugar.toLocaleLowerCase() )

        // Gracar en DB
        this.guardarDB();

    }

    guardarDB(){
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))

    }

    leerDB(){
        if(!fs.existsSync(this.dbPath))return;

        const info = fs.readFileSync(this.dbPath, {enconding: 'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;

    }
 


}


module.exports = Busquedas;

