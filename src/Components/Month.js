import React from 'react'
import Week from './Week';

const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Month = ({year, month, monthData, setUpdatePage, currentUserUid}) => {   
    const lastDayOfTheMonth = new Date(year, month, 0).getDate();

    const monthMatrix = [];
    let day = 1;
    let week = 0;


    // Constructing a matrix for the given year and month
    while(day<=lastDayOfTheMonth){
        monthMatrix.push([]);

        for(let i=0; i<7; i++){
            let date = new Date(year, month, day);
            let dayOfTheWeek = date.getDay();

            if(day<=lastDayOfTheMonth && dayOfTheWeek===i){
                let mood=0;

                if(monthData!==undefined){
                    let dayObject = monthData.days.find(d=>d.date===day);
                    if(dayObject!==undefined) mood=dayObject.mood;
                }

                monthMatrix[week][i] = {
                    "day":day,
                    "mood":mood,
                };

                day++;
            }else{
                monthMatrix[week][i] = null;
            }
        }
        week++;
    }

  return (
    <div className='month-container'>
        <div className='month-header'>{monthName[month]}</div>
        <div className='week-header'>
            <p>Sun</p>
            <p>Mon</p>
            <p>Tue</p>
            <p>Wed</p>
            <p>Thur</p>
            <p>Fri</p>
            <p>Sat</p>
        </div>
        {
            monthMatrix.map((row, index) => <Week key={year+month+index} 
                                                    week={row} 
                                                    year={year} 
                                                    month={month} 
                                                    setUpdatePage={setUpdatePage}
                                                    currentUserUid={currentUserUid}/>)
        }
    </div>
  )
}

export default Month