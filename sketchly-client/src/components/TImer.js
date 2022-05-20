import React from 'react';
import { useTimer } from 'react-timer-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Timer({ expiryTimestamp }) {
    const {
      seconds,
      minutes,
      start,
    } = useTimer({ expiryTimestamp, onExpire: () => console.log('onExpire called') });
  
  
    return (
        <figure className="timer">
            <FontAwesomeIcon className="timer__stopwatch" icon={"stopwatch"} />
            <div className="timer__circle">
                <p className="timer__seconds">{seconds + (minutes*60)}</p>
            </div>
        </figure>
            
    )
}