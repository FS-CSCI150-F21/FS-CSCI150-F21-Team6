import React, {useState, useEffect} from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import './App.css';

const convMinSec = minuteValue => minuteValue * 60;

const handleRoomComplete = (pomoscompleted) => {
    if (pomoscompleted % 2 == 0){

    }
}


function App() {
    // these are values that the user can adjust to change the length of their pomos and breaks
  const [ pomodoroLength , updatepomodoroLength ] = useState(25)
  const [ shortBreakLength , updateShortBreakLength ] = useState(5)
  const [ longBreakLength , updateLongBreakLength ] = useState(20)
    // this is what we compare to our pomolength to get our percent and keep track of how long we've been timed
  const [ timerSeconds , updateTimerSeconds ] = useState(convMinSec(pomodoroLength))
  const [ timerMode , updateTimerMode ] = useState('Studying')
  const [ dungeonPercent, updateDP ] = useState(0)
  const [ isRunning, updateIsRunning ] = useState(false)
  const [ pomosCompleted, incrementPomos ] = useState(0);
  // total experience gold and items earned
    const [totalGold, updateTotalGold] = useState(0);
    const [totalExperience, updateTotalExperience] = useState(0);
  //  const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);
    const normalise = (value) => ((value - 0) * 100) / (convMinSec(pomodoroLength) - 0);

    const handleModeChange = () => {
      if (timerMode === 'Studying' && pomosCompleted === 3){
          updateTimerMode('LongBreak');
          incrementPomos(pomosCompleted => pomosCompleted + 1);
          updateTimerSeconds(convMinSec(longBreakLength));
      }
      else if (timerMode === 'Studying'){
          updateTimerMode('Short Break');
          updateTimerSeconds(convMinSec(shortBreakLength));
          incrementPomos(pomosCompleted => pomosCompleted + 1);
      } else{
          updateTimerMode('Studying')
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
            console.log('still running', Math.abs(timerSeconds - convMinSec(pomodoroLength)))
            console.log('check math', pomodoroLength - timerSeconds)
            const timeoutID = setTimeout(() => {
                updateTimerSeconds(timerSeconds => timerSeconds - 1)
            }, 1000)
        }

        if (timerSeconds === 0){
            updateIsRunning(false);
            clearTimeout(timeoutID);
            handleModeChange()
        }

        clearTimeout(timeoutID);
    }, [isRunning, timerSeconds]);

  return (

          <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
             // background: 'pink',
              pt: 5, pb: 5,

          }}>

              <Box sx={{border: 'solid 1px black', pl: 5, pr: 5, mr: 5, width: '9%'}}>
                  <p>Rooms Cleared: {pomosCompleted}</p>
              </Box>


              <Box sx={{width: 500 }}>
                  <h1>{timerMode} {formatSeconds(timerSeconds)}</h1>
                  <LinearProgress variant="determinate" value={normalise(Math.abs(timerSeconds - convMinSec(pomodoroLength)))} sx={{height: 12, width: '100%'}}></LinearProgress>
                 <h1>test</h1>
                  <ButtonGroup variant={'contained'}>
                      <Button onClick={() => updateIsRunning(true)}>START</Button>
                      <Button onClick={() => {
                          updateIsRunning(false)
                          clearTimeout(timeoutID)
                      }}>STOP</Button>
                  </ButtonGroup>
              </Box>

              <Box sx={{border: 'solid 1px black', pl: 5, pr: 5, ml: 5, width: '9%'}}>
                  <p>character name: </p>
                  <p>level:</p>
                  <p>gold: </p>
              </Box>

          </Box>


  );
}

export default App;
