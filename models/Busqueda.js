const axios = require('axios')

class Busquedas {

    historial = ['Bogota','Madrid','Santiago de chile' ]

    constructor (){
        // Todo: leer si existe
    }

    get paramsMapbox(){
        return{
           'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'language': 'es'
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
         console.log(resp.data)
         
      

      return[]
        } catch (error) {
            return[]
        }
        
    }

}

//https://api.mapbox.com/geocoding/v5/mapbox.places/madrid.json?&proximity=-73.990593%2C40.740121&types=place%2Cpostcode%2Caddress%2Ccountry%2Cregion%2Cdistrict%2Clocality%2Cneighborhood%2Cpoi&&



module.exports = Busquedas;

