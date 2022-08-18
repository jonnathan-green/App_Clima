require('dotenv').config()
const {leerInput, inquirerMenu, pausa, listarLugares } = require('./Helpers/inquirer');
const Busquedas = require('./models/Busqueda');



const main = async () =>{

    const busquedas = new Busquedas();
    let opt;

do{

    opt = await inquirerMenu();

    switch (opt) {
        case 1:
            // mostrar mensaje 
            const termino = await leerInput('Ciudad: ')

            // Buscar Lugares
            const lugares = await busquedas.ciudad( termino )
            
            // Seleccionar el lugar
            const id = await listarLugares(lugares)
            if (id === '0') continue;
            const lugarSel = lugares.find(l => l.id === id);
            
            // Guardar en DB 

            busquedas.agregarHistorial(lugarSel.nombre)

            //Clima

            const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);


            // Mostrar resultados
            console.clear();
            console.log('\n Informacion de la ciudad \n'.cyan)
            console.log('Ciudad: ', lugarSel.nombre);
            console.log('Latitud: ', lugarSel.lat);
            console.log('Longitud: ', lugarSel.lng);
            console.log('Temperatura: ', clima.min);
            console.log('Minima:,  ', clima.max);
            console.log('Maxima: ', clima.desc.cyan);
            break;
    
        default:
            break;

            case 2:
                busquedas.historial.forEach((lugar, i) =>{
                    const index = `${i + 1}.`.cyan;
                    console.log(`${index} ${lugar}`)
                })

             break;
    }
    


   if (opt !== 0) await pausa()

}while ( opt !== 0)



}




main();


// cd "C:\Users\WINDOWS10\Documents\Jonnathan Green\Cursos\N ode.js\Seccion6_Clima"