import { useSocket } from '../hooks';
import { SocketContext } from './SocketContext';

export const SocketProvider = ({ children }) => {

    const { socket, online } = useSocket('http://localhost:8080');

    return (

        <SocketContext.Provider value={{ socket, online }}>
            { children }        
        </SocketContext.Provider>

    );

};