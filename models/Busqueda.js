const axios = require('axios')

class Busquedas {

    historial = ['Bogota','Madrid','Santiago de chile' ]

    constructor (){
        // Todo: leer si existe
    }

    get paramsMapbox(){
        return{
            'access_token': '',
            'limit' : 5,
            'lenguage' : 'es'
        }
    }

    async ciudad (lugar= ''){

        try {
         //peticion http

         const intance = axios.create({
            baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
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




module.exports = Busquedas;