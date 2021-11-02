import React, {useState, useEffect} from 'react'
const ProgressBar = ({pbSeconds, pbLength}) => {
    const progressPercent = ((pbLength - pbSeconds)/ pbLength) * 100;
    return (
        <p>{progressPercent}%</p>
    )
}
function App() {
  const [ seconds, updateSeconds ] = useState(25*60)
  const [ dungeonPercent, updateDP ] = useState(0)
  const [ isRunning, updateIsRunning ] = useState(false)
  const timeoutID = 0;
  const testPomoLength = 25 * 60;
    const secToMin = (seconds) => {
        return `${Math.floor(seconds/60)}:${(seconds % 60 > 9) ? seconds % 60 : '0' + seconds % 60}`;
    }

    const startTimer = () => {
        updateIsRunning(true);
    }

    useEffect(() => {
        if(isRunning) {
            console.log('wtf is going on')
            const timeoutID = setTimeout(() => {
                updateSeconds(seconds => seconds - 1)
            }, 1000)
        }

        if (seconds === 1){
            clearInterval(timeoutID);
            updateIsRunning(false);
            console.log('state change here')
        }

        clearInterval(timeoutID);
    }, [isRunning, seconds]);

  return (
    <div>
        <ProgressBar pbSeconds={seconds} pbLength={testPomoLength}/>
        <div>{secToMin(seconds)}</div>
        <button onClick={() => updateIsRunning(true)}>START</button>
        <button onClick={() => updateIsRunning(false)}>STOP</button>
    </div>

  );
}

export default App;
