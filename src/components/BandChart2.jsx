import { useContext, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { SocketContext } from '../context';

export const BandChart2 = () => {

    const { socket } = useContext( SocketContext );

    useEffect(() => {

        socket.on('current-bands', (bands) => {
            createGraph( bands );
        });
        
    }, [ socket ]);
    
    let myChart;

    const createGraph = ( bands = [] ) => {

        const ctx = document.getElementById('myChart').getContext('2d');

        if ( myChart ) {
            return myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map( band => band.name ),
                datasets: [{
                    label: '# of Votes',
                    data: bands.map( band => band.votes ),
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                events: ['click'],
                indexAxis: 'y',
                scales: {
                    x: {
                        stacked: true
                    }
                }
            }
        });

    };

    return (
        <>
            <canvas id="myChart"></canvas>  
        </>
    );

};