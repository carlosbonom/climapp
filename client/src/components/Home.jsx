import React, { useEffect,useState } from 'react';
import axios from 'axios';
import './Home.css'

const Home = () =>{

    const [clima, setClima] = useState({})

    useEffect(()=>{
        const getClimaHoy = async () =>{
            try{
                const {data} = await axios.get('http://localhost:3001/today');

                setClima(data);

            }catch(err){
                console.log(err)

            }
        }
        getClimaHoy();
    },[])

    return(
        <>
            <h1>Santiago, Chile</h1>
            <div className='containerHome'>
                <div className='tempContent'>
                    <div>
                        <h2>{clima.dia}</h2>
                        <h1>{clima.tempActual}</h1>
                    </div>
                    <div className='containerHomeTemp'>
                        <div>
                            <h3>Min</h3>
                            <span>{clima.min}</span>
                        </div>
                        <div>
                            <h3>Max</h3>
                            <span>{clima.max}</span>
                        </div>
                    </div>

                </div>
                <div>
                    <img src={clima.img} alt={clima.desc} style={{width:100}}/>
                    <h4>Humedad: {clima.humedad}</h4>
                    <h4>Presión: {clima.presion}</h4>
                </div>

            </div>
            
        </>
    )

}

export default Home