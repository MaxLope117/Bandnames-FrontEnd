import { useState } from 'react';

export const BandAdd = ({ create }) => {

    const [ valor, setValor ] = useState('');

    const onSubmit = ( event ) => {

        event.preventDefault();

        if( valor.trim().length > 0 ){

            create( valor );

            setValor('');

        };

    }

    return (
    
        <>
            <h4>Agregar Banda</h4>

            <form onSubmit={ onSubmit }>

                <input 
                  className="form-control"
                  placeholder="Nombre de la banda"
                  value={ valor }
                  onChange={ event => setValor( event.target.value ) }
                />

            </form>

        </>

    );

};
