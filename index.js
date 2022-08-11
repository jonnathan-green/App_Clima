const {leerInput, inquirerMenu, pausa } = require('./Helpers/inquirer');
const Busquedas = require('./models/Busqueda');

const main = async () =>{

    const busquedas = new Busquedas();
    let opt;

do{

    opt = await inquirerMenu();

    switch (opt) {
        case 1:
            // mostrar mensaje 
            const lugar = await leerInput('Ciudad: ')
            await busquedas.ciudad( lugar )

            // Buscar Ciudad

            // Seleccionar el lugar

            //Clima

            // Mostrar resultados

            console.log('\n Informacion de la ciudad \n'.cyan)
            console.log('Ciudad: ')
            console.log('Latitud: ')
            console.log('Longitud: ')
            console.log('Temperatura: ')
            console.log('Minima: ')
            console.log('Maxima: ')
            break;
    
        default:
            break;
    }
    


   if (opt !== 0) await pausa()

}while ( opt !== 0)



}




main();


// cd "C:\Users\WINDOWS10\Documents\Jonnathan Green\Cursos\N ode.js\Seccion6_Clima"