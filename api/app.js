const express = require('express');
const bodyParser = require('body-parser');
const {default: Axios} = require('axios');


const server = express();
const PORT = 3001;

//-----------------------openweathermap-----------------------//
const urlApi = 'http://api.openweathermap.org/data/2.5/';
const city = 'santiago';
const key = '39c445c6e6887be90682a3d469114d07'
//-----------------------------------------------------------//
server.use(bodyParser.json());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


server.get('/', (req, res)=>{
    res.send('back de climAPP')
});


//Trae solo el dia de hoy
server.get('/today', async (req, res)=>{

    try{
        const {data} = await Axios.get(`${urlApi}weather?q=${city}&lang=es&units=metric&appid=${key}`)
        res.status(200).json({
            dia:'Hoy',
            tempActual: `${Math.round(data.main.temp)}ºC`,
            min:`${Math.round(data.main.temp_min)}ºC`,
            max:`${Math.round(data.main.temp_max)}ºC`,
            humedad:`${data.main.humidity}%`,
            presion:`${data.main.pressure}mbar`,
            img:`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            desc:data.weather[0].description
        })
    }catch(err){
        res.status(400).json({
            message:'error',
            err
        })
    }
    
});


//Busca la maxima y la minima
const pronostico = (data) =>{
    let newObj = {}
    let clima = []

    //Agrupo por fechas para visualizar mejor 
    data.forEach(ele =>{
        if(!newObj.hasOwnProperty(`dia${ele.dt_txt.slice(0,10)}`)){
            newObj[`dia${ele.dt_txt.slice(0,10)}`]={
                clima:[]
            }
        }
        newObj[`dia${ele.dt_txt.slice(0,10)}`].clima.push({
            dia: ele.dt_txt.slice(0,10).split('-').reverse().join('/'),
            max:ele.main.temp_max,
            min:ele.main.temp_min,
            img:`http://openweathermap.org/img/wn/${ele.weather[0].icon}.png`
        })

    })

    for(const element in newObj){
        let max = 0;
        let min = 0;

        for (let i = 0; i < newObj[element].clima.length; i++) {
            if(newObj[element].clima[i].max> max ){
                max = newObj[element].clima[i].max;
            }
            if(newObj[element].clima[i].min< min || min === 0){
                min = newObj[element].clima[i].min
            }
            
        }

        clima.push({
            dia:newObj[element].clima[0].dia,
            max: `${Math.round(max)}ºC`,
            min: `${Math.round(min)}ºC`,
            img:newObj[element].clima[0].img

        })
        
    }


    
    return {pronostico: clima };
}

//Trae los proximo 5 dias
server.get('/other', async (req, res)=>{
    try{
        const {data} = await Axios.get(`${urlApi}forecast?q=${city}&lang=es&units=metric&appid=${key}`)
        res.json(pronostico(data.list))
    }catch(err){
        res.status(400).json({
            message:'error',
            err
        })
    }
})


//Levanta el server
server.listen(PORT,()=>{
    console.log(`corriendo en puerto: ${PORT}`);
});


