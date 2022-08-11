const inquirer = require('inquirer')
require("colors")

const preguntas = [
    {
        type: 'list',
        name: 'Opcion',
        message: '¿Que procedimiento desea reaizar?',
        choices:[
            {
                    value: 1,
                    name: `${'1.'.brightMagenta} Buscar Ciudad`
            },
            {
                    value: 2,
                    name: `${'2.'.brightMagenta} Historial` 
            },
            {
                    value: 0,
                    name: `${'0.'.brightMagenta} Salir`
            },
            
        ]
    }
]

const inquirerMenu = async () => {
    
    console.clear();
    console.log('======================='.cyan);
    console.log('Seleccione una opcion'.brightMagenta);
    console.log('========================\n'.cyan) 

const {Opcion} = await inquirer.prompt(preguntas); // Se destrucutura opcion, ya que no necesitamos un objeto si el nombre de el.

    return Opcion;

}

const pausa = async  () => {

    const preguntaInput = {
        type: 'input',
        name: 'Enter',
        message: `Presione ${'Enter'.cyan} para continuar`
    
        }
   console.log('\n');
    await inquirer.prompt(preguntaInput);
}

 const leerInput = async (message) => {

        const question = [
                {
                type: 'input',
                name: 'desc',
                message,
                validate(value){
                        if(value.length === 0 ){
                                return 'Debe escoger alguna opcion'
                        }
                        return true;
                }
                }
        ]

        const {desc} = await  inquirer.prompt(question)
        return desc;
 }

 const listadoTareasBorrar = async (tareas = []) =>{
        const choices = tareas.map( (tarea, i) =>{

                const index = `${i + 1}.`.cyan
                return {
                        value: tarea.id,
                        name:`${index} ${tarea.desc}`
                }
        })

        choices.unshift({
                value: '0',
                name: '0.'.cyan + ' cancelar'
        })

        const preguntas =  [
        {
                type: 'list',
                name: 'id',
                message: 'Borrar',
                choices
        }
        ]       
        const {id} = await inquirer.prompt(preguntas);
        return id;
}

        const confirmar = async (message)=> {

                const question  = [
                        {
                                type: 'confirm',
                                name: 'ok',
                                message
                        }
                ];
                const {ok} = await inquirer.prompt(question);
                return ok;
        }

        const mostrarListadoCheklist = async (tareas = []) =>{
                const choices = tareas.map( (tarea, i) =>{
        
                        const index = `${i + 1}.`.cyan

                        return {
                                value: tarea.id,
                                name:`${index} ${tarea.desc}`,
                                checked: (tarea.completadoEn) ? true : false
                        }
                })

                const pregunta =  [
                {
                        type: 'checkbox',
                        name: 'ids',
                        message: 'Selecciones',
                        choices
                }
                ]       
                const {ids} = await inquirer.prompt(pregunta);
                return ids;
        }
 module.exports ={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheklist

 }
 