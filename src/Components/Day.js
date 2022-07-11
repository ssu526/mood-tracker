import React, {useEffect, useState } from 'react'
import { ref, set} from "firebase/database";
import { database } from '../firebase/firebase-config';
import happy from '../images/happy.svg'
import excited from '../images/excited.svg'
import sad from '../images/sad.svg'
import angry from '../images/angry.svg'
import normal from '../images/normal.svg'
import unknown from '../images/unknown.svg'

const icon_src = [unknown, angry, sad, normal, happy, excited];

const Day = ({year, month, dayObject, setUpdatePage, currentUserUid}) => { 
  const [showMoodInput, setShowMoodInput] = useState(false);
  const [mood, setMood] = useState(0);

  let current = new Date(Date.now());
  let currentYear = current.getFullYear();
  let currentMonth = current.getMonth();
  let currentDay = current.getDate();

  useEffect(()=>{
    if(dayObject!==null){
      setMood(dayObject.mood);
    }
  }, [dayObject]);


  const handleMoodSelection = (selection) => {
    setMood(selection);
    setShowMoodInput(false);
    writeUserData(year, month, dayObject.day, selection);
    setUpdatePage(prev=>!prev);
  }

  // Update Firebase database
  function writeUserData(year, month, day, mood) {
    set(ref(database, 'moods/' + currentUserUid + "/" + year + "/" + month + "/days/"+day+"/"), {
      date:day,
      mood:mood
    });
  }
  
  return (
    <div className='day-container'>
        {
          dayObject===null ? 
          <div className='day'></div>
          :
          <div className={`day actualDay ${currentYear===year && currentMonth===month && currentDay===dayObject.day ? "today":""} ${showMoodInput ? "selectedDay":""}`}
                onClick={(e)=>setShowMoodInput(prev=>!prev)}>
            <p>{dayObject.day}</p>
            <img className="current-mood" src={icon_src[mood]} alt="icon"/>
          </div>
        }

        <div className={`mood-input ${showMoodInput ? "showMoodInput":""}`}>
          <div className='mood-selector'>
            <div className='mood-option' onClick={()=>handleMoodSelection(1)}><img src={angry} alt="angry-icon"/></div>
            <div className='mood-option' onClick={()=>handleMoodSelection(2)}><img src={sad} alt="sad icon"/></div>
            <div className='mood-option' onClick={()=>handleMoodSelection(3)}><img src={normal} alt="normal icon"/></div>
            <div className='mood-option' onClick={()=>handleMoodSelection(4)}><img src={happy} alt="happy icon"/></div>
            <div className='mood-option' onClick={()=>handleMoodSelection(5)}><img src={excited} alt="excited icon"/></div>
          </div>
        </div>
    </div>
  )
}

export default Day