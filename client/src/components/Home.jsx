import React, { useEffect,useState } from 'react';
import axios from 'axios';
import{Grid} from '@material-ui/core'


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
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                style={{height:'100vh'}}
            >
                <div style={{width:100}}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <h2>{clima.dia}</h2>
                        <h1>{clima.tempActual}</h1>
                    </Grid>
                    <Grid 
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <div>
                            <h3>Min</h3>
                            <span>{clima.min}</span>
                        </div>
                        <div>
                            <h3>Max</h3>
                            <span>{clima.max}</span>
                        </div>
                    </Grid>

                </div>
                <div>
                    <img src={clima.img} alt={clima.desc} style={{width:100}}/>
                    <h4>Humedad: {clima.humedad}</h4>
                    <h4>Presion: {clima.presion}</h4>
                </div>

            </Grid>
            
        </>
    )

}

export default Home