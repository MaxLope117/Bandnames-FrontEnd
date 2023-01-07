import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BandList, BandAdd } from './components';

const connectSocketServer = () => {

  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  });

  return socket;

};

const App = () => {

  const [ socket ] = useState( () => connectSocketServer() );
  const [ online, setOnline ] = useState(false);
  const [bands, setBands] = useState([]);

  // useEffect(() => {
  //   // console.log(socket);
  //   setOnline( socket.connected )
  // }, [ socket ]);

  useEffect(() => {

    socket.on('connect', () => {
      setOnline( true );
    });

  }, [ socket ]);
  
  useEffect(() => {

    socket.on('disconnect', () => {
      setOnline( false );
    });

  }, [ socket ]);
  
  useEffect(() => {

    socket.on('current-bands', (bands) => {
      // console.log(bands);
      setBands( bands );
    });

  }, [ socket ]);

  const voteBand = ( id ) => {
    // console.log('votar-app', id);
    socket.emit( 'vote-band', id );
  };

  const removeBand = ( id ) => {
    // console.log('votar-app', id);
    socket.emit( 'remove-band', id );
  };

  const changeNameBand = ( id, name ) => {

    socket.emit( 'change-name-band', { id, name });

  };

  const createBand = ( name ) => {

    socket.emit( 'create-band', name );

  }
  
  return (

    <div className="container">

      <div className="alert">
        <p>
          Service status:
          {
            online
             ? (<span className="text-success"> Online</span>)
             : (<span className="text-danger"> Offline</span>)
          }
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">  
        <div className="col-8">
          <BandList 
            data={ bands }
            vote={ voteBand }
            remove={ removeBand }
            change={ changeNameBand }
          />
        </div>
        <div className="col-4">
          <BandAdd 
            create={ createBand }
          />
        </div>
      </div>

    </div>   

  );

};

export default App;