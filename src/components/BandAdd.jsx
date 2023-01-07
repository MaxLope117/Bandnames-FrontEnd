import { useContext, useState } from 'react';
import { SocketContext } from '../context';

export const BandAdd = () => {

    const [ valor, setValor ] = useState('');

    const { socket } = useContext( SocketContext );

    const onSubmit = ( event ) => {

        event.preventDefault();

        if( valor.trim().length > 0 ){

            socket.emit( 'create-band', { name : valor } );

            setValor('');

        };

    }

    return (
    
        <>
            <h4>Add Band</h4>

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
