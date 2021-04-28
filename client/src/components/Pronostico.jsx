import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Pronostico.css'

const Pronostico = () =>{

    const [pronostico, setPronostico] = useState([]);

    useEffect(() => {

        const getPronostico = async () =>{
            try{
                const {data} = await axios.get('http://localhost:3001/other');

                setPronostico(data.pronostico);

            }catch(err){
                console.log(err)

            }
        }
        getPronostico();
    }, [])

    
    return(
        <>
            <h1>Pronostico de 5 días</h1>
            <div className='container'>
                {pronostico && pronostico.map((ele, index) => (
                    <div className='containerclima'>
                        <div>
                            <h3>{ele.dia.slice(0,5)}</h3>
                            <img src={ele.img} alt='imagen del clima'/>
                        </div>
                        <div className='containerTemp'>
                            <div>
                                <h3>Min</h3>
                                <span>{ele.min}</span>
                            </div>
                            <div>
                                <h3>Max</h3>
                                <span>{ele.max}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Pronostico;