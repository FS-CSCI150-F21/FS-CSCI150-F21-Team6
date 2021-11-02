import React, {useState, useEffect} from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import './App.css';
const convMinSec = minuteValue => minuteValue * 60;
const ProgressBar = ({pbSeconds, pbLength}) => {
    const progressPercent = Math.floor(100 - ((pbSeconds / pbLength) * 100));
    return (
        <p>{progressPercent}%</p>
    )
}

function App() {
    // these are values that the user can adjust to change the length of their pomos and breaks
  const [ pomodoroLength , updatepomodorLength ] = useState(.05)
  const [ shortBreakLength , updateShortBreakLength ] = useState(.05)
  const [ longBreakLength , updateLongBreakLength ] = useState(20)
    // this is what we compare to our pomolength to get our percent and keep track of how long we've been timed
  const [ timerSeconds , updateTimerSeconds ] = useState(convMinSec(pomodoroLength))
  const [ timerMode , updateTimerMode ] = useState('POMO')
  const [ dungeonPercent, updateDP ] = useState(0)
  const [ isRunning, updateIsRunning ] = useState(false)
  const [ pomosCompleted, incrementPomos ] = useState(0);

    const handleModeChange = () => {
      if (timerMode === 'POMO' && pomosCompleted === 4){
          updateTimerMode('LONGBREAK');
          updateTimerSeconds(convMinSec(longBreakLength));
      }
      else if (timerMode === 'POMO'){
          updateTimerMode('SHORTBREAK');
          updateTimerSeconds(convMinSec(shortBreakLength));
      } else{
          updateTimerMode('POMO')
          updateTimerSeconds(convMinSec(pomodoroLength));
      }
    }

    const formatSeconds = (timerSeconds) => {
        return `${Math.floor(timerSeconds/60)}:${(timerSeconds % 60 > 9) ? timerSeconds % 60 : '0' + timerSeconds % 60}`;
    }
    // this only handles the countdown and is irrelevant to the type of countdown its doing
    const timeoutID = 0;
    useEffect(() => {
        if(isRunning && timerSeconds > 0) {
            console.log('still running', timerSeconds)
            const timeoutID = setTimeout(() => {
                updateTimerSeconds(timerSeconds => timerSeconds - 1)
            }, 1000)
        }

        if (timerSeconds === 0){
            updateIsRunning(false);
            clearTimeout(timeoutID);
            incrementPomos(pomosCompleted => pomosCompleted + 1);
            handleModeChange()
        }

        clearTimeout(timeoutID);
    }, [isRunning, timerSeconds]);

  return (
      <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center'
      }}>
          <Box>
              <LinearProgress variant="determinate" value={timerSeconds}></LinearProgress>
              <h1>{formatSeconds(timerSeconds)}</h1>
              <h1>{timerMode}</h1>
              <h2>Rooms Cleared: {pomosCompleted}</h2>
              <ButtonGroup variant={'contained'}>
                  <Button onClick={() => updateIsRunning(true)}>START</Button>
                  <Button onClick={() => {
                      updateIsRunning(false)
                      clearTimeout(timeoutID)
                  }}>STOP</Button>
              </ButtonGroup>
          </Box>
      </Box>

  );
}

export default App;
