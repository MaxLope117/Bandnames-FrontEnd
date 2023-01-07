import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context';

export const BandList = () => {

    const [ bands, setBands ] = useState([]);

    const { socket } = useContext( SocketContext );

    useEffect(() => {

        socket.on('current-bands', (bands) => {
            // console.log(bands);
            setBands( bands );
        });

        return () => socket.off('current-bands');

    }, [ socket ]);

    const changeName = ( event, id ) => {

        const newName = event.target.value;
        
        setBands( bands => bands.map( band => {
            
            if( band.id === id ) {
                band.name = newName;
            }

            return band;

        }));

    };

    const onFocusPeriod = ( id, name ) => {
        // console.log(id);
        socket.emit( 'change-name-band', { id, name });
    };

    const voteBand = ( id ) => {
        // console.log('votar-app', id);
        socket.emit( 'vote-band', id )        
    };

    const removeBand = ( id ) => {
        // console.log('votar-app', id);
        socket.emit( 'remove-band', id );
    };

    const createRows = () => {

        return (
            bands.map( ({ id, name, votes }) => (
                <tr key={ id }>
                    <td>
                        <button 
                          className="btn btn-primary"
                          onClick={ () => voteBand( id ) }
                        >
                            +1
                        </button>
                    </td>
                    <td>
                        <input
                          className="form-control"
                          value={ name }
                          onChange={ (event) => changeName( event, id ) }
                          onBlur={ () => onFocusPeriod( id, name ) }
                        />
                    </td>
                    <td> <h3> { votes } </h3> </td>
                    <td>
                        <button 
                          className="btn btn-danger"
                          onClick={ () => removeBand( id ) }
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        );

    };

    return (

        <>
            {/* <h3>Bandas Actuales</h3> */}

            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Votes</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { createRows() }
                </tbody>
            </table>
        </>

    )
}
