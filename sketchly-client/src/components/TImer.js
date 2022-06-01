import React from 'react';
import { useTimer } from 'react-timer-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Timer({ expiryTimestamp }) {

    const onExpireFunction = () => {
        console.log('onExpire called')
    }

    const {
        seconds,
        minutes,
        start,
    } = useTimer({ expiryTimestamp, onExpire: () => onExpireFunction()});
      
      
    return (
        <figure className="timer">
            <FontAwesomeIcon className="timer__stopwatch" icon={"stopwatch"} />
            <div className="timer__circle">
                <p className="timer__seconds">{seconds + (minutes*60)}</p>
            </div>
        </figure>
            
    )
}
