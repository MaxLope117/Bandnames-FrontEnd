import { SocketProvider } from './context';
import HomePage from './pages/HomePage';

export const BandNamesApp = () => {

    return (
        
        <SocketProvider>
            <HomePage />
        </SocketProvider>

    );

};
