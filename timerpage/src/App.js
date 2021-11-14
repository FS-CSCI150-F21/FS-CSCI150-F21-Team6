import React, {useState, useEffect} from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios';
import TimerDisplay from './components/Timer.js';
import CharacterDisplay from './components/CharacterDisplay';
import RoomDisplay from './components/RoomDisplay';
import TimeMath from './services/TimeMath';
import Rewards from './services/Rewards';

function App() {
    // these are values that the user can adjust to change the length of their pomos and breaks
  const [ pomodoroLength , setpomodoroLength ] = useState(.05)
  const [ shortBreakLength , setShortBreakLength ] = useState(5)
  const [ longBreakLength , setLongBreakLength ] = useState(20)
    // this is what we compare to our pomolength to get our percent and keep track of how long we've been timed
  const [ timerSeconds , setTimerSeconds ] = useState(TimeMath.convMinSec(pomodoroLength))
  const [ timerMode , setTimerMode ] = useState('Studying')
  const [ isRunning, setIsRunning ] = useState(false)
  const [ open, setOpen ] = useState(false)
  const [ pomosCompleted, incrementPomos ] = useState(0);
  const multiplier = pomosCompleted - .5;
  const [character, setCharacterState] = useState({name: "", level: 0, gold: 0})
    const {name, level, gold} = character;

    const handleModeChange = () => {
      if (timerMode === 'Studying' && pomosCompleted === 3){
          setTimerMode('LongBreak');
          incrementPomos(pomosCompleted => pomosCompleted + 1);
          setTimerSeconds(TimeMath.convMinSec(longBreakLength));
      }
      else if (timerMode === 'Studying'){
          setTimerMode('Short Break');
          setTimerSeconds(TimeMath.convMinSec(shortBreakLength));
          incrementPomos(pomosCompleted => pomosCompleted + 1);
      } else{
          setTimerMode('Studying')
          setTimerSeconds(TimeMath.convMinSec(pomodoroLength));
      }
    }

    useEffect(() =>{
        axios.get('http://localhost:3001/data')
            .then(
                response => {
                    setCharacterState({name: response.data.name, level: response.data.level, gold: response.data.gold})
                }
            )
            .catch(error => {
                console.log(error)
            })
    },[])

    const timeoutID = 0;
    useEffect(() => {
        if(isRunning && timerSeconds > 0) {
            const timeoutID = setTimeout(() => {
                setTimerSeconds(timerSeconds => timerSeconds - 1)
            }, 1000)
        }
        if (timerSeconds === 0){
            setIsRunning(false);
            clearTimeout(timeoutID);
            handleModeChange()
            Rewards.handleRoomComplete(pomosCompleted)
        }
        clearTimeout(timeoutID);
    }, [isRunning, timerSeconds]);

  return (
          <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: 'baseline',
              pt: 5, pb: 5,
          }}>

              <RoomDisplay pomosCompleted={pomosCompleted} multiplier={multiplier}></RoomDisplay>

              <Box>
                  <Box sx={{mb: 5, minWidth: 400}}>
                      <LinearProgress variant="determinate" value={TimeMath.normalise(Math.abs(timerSeconds - TimeMath.convMinSec(pomodoroLength)),pomodoroLength)} sx={{height: 12, width: '100%'}}></LinearProgress>
                      <TimerDisplay timerMode={timerMode} timer={TimeMath.formatSeconds(timerSeconds)} reward={pomosCompleted % 2 === 0 ? '`Gold`' : 'Exp'}></TimerDisplay>
                  </Box>

                  <ButtonGroup variant={'contained'}>
                      <Button onClick={() => setIsRunning(true)}>START</Button>
                      <Button onClick={() => {
                          setIsRunning(false)
                          clearTimeout(timeoutID)
                      }}>STOP</Button>
                  </ButtonGroup>
              </Box>

                <CharacterDisplay name={name} level={level} gold={gold} ></CharacterDisplay>
          </Box>
  );
}

export default App;
