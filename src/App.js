import React, {useState, useEffect} from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios';
import TimerDisplay from './components/Timer.js';
import CharacterDisplay from './components/CharacterDisplay';
import RoomDisplay from './components/RoomDisplay';
import QuestDisplay from './components/QuestDisplay';
import TimeMath from "./services/TimeMath";
// Menu
import TimerAdjust from "./components/Menu/TimerAdjust";
import FriendsList from "./components/Menu/FriendsList";
import ItemShop from "./components/Menu/ItemShop";


function App() {
  const [ pomodoro , setPomodoro ] = useState(25)
  const [ shortBreak , setShortBreak ] = useState(5)
  const [ longBreak , setLongBreak ] = useState(20)
  const [ timerSeconds , setTimerSeconds ] = useState(TimeMath.convMinSec(pomodoro))
  const [ timerMode , setTimerMode ] = useState('Questing')
  const [ isRunning, setIsRunning ] = useState(false)
  const [ pomosCompleted, setPomosCompleted ] = useState(0);
  const [character, setCharacterState] = useState({name: "", level: 0, exp: 0, expReq: 0, gold: 0})
  const [activeTask, setActiveTask] = useState("")

    const handleRoomComplete = () => {

    }

    const handleModeChange = () => {
      if (timerMode === 'Questing' && pomosCompleted === 3){
          setTimerMode('Long Camp');
          setPomosCompleted(pomosCompleted => pomosCompleted + 1);
          setTimerSeconds(TimeMath.convMinSec(longBreak));
      }
      else if (timerMode === 'Questing'){
          setTimerMode('Short Camp');
          setTimerSeconds(TimeMath.convMinSec(shortBreak));
          setPomosCompleted(pomosCompleted => pomosCompleted + 1);
      } else{
          setTimerMode('Questing')
          setTimerSeconds(TimeMath.convMinSec(pomodoro));
      }
    }

    useEffect(() =>{
        axios.get('http://localhost:3001/data')
            .then(
                response => {
                    const character = response.data[0].character;
                    // investigate destructuring for cleaner code
                    setCharacterState(character)
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

              <RoomDisplay pomosCompleted={pomosCompleted} multiplier={1} />

              <Box>
                  <Box sx={{mb: 5, minWidth: 400}}>
                      <LinearProgress variant="determinate" value={TimeMath.normalise(Math.abs(timerSeconds - TimeMath.convMinSec(pomodoro)),pomodoro)} sx={{height: 12, width: '100%'}}/>
                      <TimerDisplay
                          timerMode={timerMode}
                          timer={TimeMath.formatSeconds(timerSeconds)}
                          reward={pomosCompleted % 2 === 0 ? '`Gold`' : 'Exp'}
                          activeTask = {activeTask}
                      />
                  </Box>
                  <ButtonGroup variant={'contained'}>
                      <Button onClick={() => setIsRunning(true)}>START</Button>
                      <Button onClick={() => {
                          setIsRunning(false)
                          clearTimeout(timeoutID)
                      }}>STOP</Button>
                  </ButtonGroup>
                <QuestDisplay setActiveTask={setActiveTask} />
              </Box>
              <Box sx={{ml: 10, width: '9%', display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <CharacterDisplay character={character} />
                  {/* might be able to use a stack here instead (probably more preferred by mui standards) */}
                  <Box sx={{display: "flex"}}>
                          <TimerAdjust pomodoro={pomodoro} setPomodoro={setPomodoro} shortBreak={shortBreak} setShortBreak={setShortBreak} longBreak={longBreak} setLongBreak={setLongBreak} setTimerSeconds={setTimerSeconds} />
                          <FriendsList/>
                          <ItemShop/>
                  </Box>
              </Box>



          </Box>
  );
}

export default App;
