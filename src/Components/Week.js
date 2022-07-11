import React from 'react'
import Day from './Day'

const Week = ({year, month, week, setUpdatePage, currentUserUid}) => {
  return (
    <div className='week-container'>
        {
            week.map(dayObject => (
              <Day key={`${year}${month}${dayObject===null ? Math.random()*1000:dayObject.day}`} 
                                year={year}
                                month={month}
                                dayObject={dayObject}
                                setUpdatePage={setUpdatePage}
                                currentUserUid={currentUserUid}
                                />
            ))
        }
    </div>
  )
}

export default Week