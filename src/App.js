import './App.css';
import { useEffect, useRef, useState } from 'react';
import { ref, onValue} from "firebase/database";
import {database} from './firebase/firebase-config';
import {signup, login, signout } from './firebase/auth.js'
import Month from './Components/Month';
import happy2 from './images/happy2.svg'
import excited2 from './images/excited2.svg'
import sad2 from './images/sad2.svg'
import angry2 from './images/angry2.svg'
import normal2 from './images/normal2.svg'


const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // 0 is January, 11 is December

function App() {
  const yearRef = useRef(null);
  const [year, setYear] = useState(2022);
  const [moodCount, setMoodCount] = useState([0, 0, 0, 0, 0, 0]);
  const [firebaseData, setFirebaseData] = useState([]);
  const [updatePage, setUpdatePage] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");

  // Handle input changes
  const handleYearChange = (e) =>{
    if(currentUser) setYear(e.target.value);
  }

  const handleSignupEmailChange = e =>{
    setSignupEmail(e.target.value);
    setAuthError("");
  }

  const handleSignupPasswordChange = e =>{
    setSignupPassword(e.target.value);
    setAuthError("");
  }

  const handleLoginEmailChange = e =>{
    setLoginEmail(e.target.value);
    setAuthError("");
  }

  const handleLoginPasswordChange = e =>{
    setLoginPassword(e.target.value);
    setAuthError("");
  }

  // Default of the selection dom element is current year
  useEffect(()=>{
    if(currentUser) yearRef.current.value=new Date(Date.now()).getFullYear();
  },[currentUser])

 // Update page after user logged in, selected a different year or selected a mood for a particular day
  useEffect(()=>{
    if(currentUser){
      fetchDataFromFirebase();
    }
  }, [year, updatePage, currentUser])
  

  // Update mood count
  useEffect(()=>{
    if(currentUser){
      let count = [0, 0, 0, 0, 0, 0];

      firebaseData.forEach(month => {
        let days = month.days;
        
        days.forEach(d=>{
          count[d.mood]++;
        })
      })

      setMoodCount(count)
    }
  }, [firebaseData]);


  // Fetch data from Firebase database
  const fetchDataFromFirebase = () => {
    if(currentUser){
      let data = [];
      const yearDBRef = ref(database, 'moods/' + currentUser.uid +"/" + year);
  
      onValue(yearDBRef, (snapshot) => {
        snapshot.forEach((m) => {
          const month = m.key;
          const days = m.val().days;
  
          let daysArray = [];
          for( const day in days){
            daysArray.push(days[day])
          }
  
          data.push({
            "month": month,
            "days":daysArray
          })
        })
  
        setFirebaseData(data);
      });
    }
  }


  return (
    <div className="App">
      {
        currentUser===null ?
          <div className='auth-page'>
            <div className='title-container'>
                <h1>M<span className='green'>o</span><span className='green'>o</span>d <span className='yellow'>T</span>r<span className='aquamarine'>a</span><span className='blue'>c</span>ke<span className='red'>r</span></h1>
                <div className='auth-page-images'>
                  <img src={excited2} alt="logo"/>
                  <img src={happy2} alt="logo"/>
                  <img src={normal2} alt="logo"/>
                  <img src={sad2} alt="logo"/>
                  <img src={angry2} alt="logo"/>
                </div>
            </div>

            <div className='auth-container'>
                <div className='auth-sub-container'>
                    <p>Sign Up</p>
                    <form onSubmit={e=>signup(e, signupEmail, signupPassword, setSignupEmail, setSignupPassword, setCurrentUser, setAuthError)}>
                        <label>Email</label>
                        <input type="text" value={signupEmail} onChange={e=>handleSignupEmailChange(e)}/>
                        <label>password</label>
                        <input type="password" value={signupPassword} onChange={e=>handleSignupPasswordChange(e)}/>
                        <button>Sign Up</button>
                    </form>
                  </div>

                  <div className='auth-sub-container'>
                    <p>Login</p>
                    <form onSubmit={e=>login(e, loginEmail, loginPassword, setLoginEmail, setLoginPassword, setCurrentUser, setAuthError)}>
                        <label>Email</label>
                        <input type="text" value={loginEmail} onChange={e=>handleLoginEmailChange(e)}/>
                        <label>password</label>
                        <input type="password" value={loginPassword} onChange={e=>handleLoginPasswordChange(e)}/>
                        <button>Login</button>
                    </form>
                </div>
            </div>

            <div className='auth-error-container'>
              <p className='auth-error'>{authError}</p>
            </div>
          </div>

          :
           
          <div className='container'>
            <div className='sidebar-container'>
              <div className='user-info-container'>
                <p className='email'>{currentUser.email}</p>
                <button className='signout-btn' onClick={()=>signout(setCurrentUser)}>Sign out</button>
              </div>

              <h1 className='title'>M<span className='green'>o</span><span className='green'>o</span>d <span className='yellow'>T</span>r<span className='aquamarine'>a</span><span className='blue'>c</span>ke<span className='red'>r</span></h1>
              
              <div className='mood-stat-container'>
                <div className='mood-stat'>
                    <img src={excited2} alt="excited-icon"/>
                    <p>{moodCount[5]} days</p>
                </div>

                <div className='mood-stat'>
                    <img src={happy2} alt="happy-icon"/>
                    <p>{moodCount[4]} days</p>
                </div>

                <div className='mood-stat'>
                    <img src={normal2} alt="normal-icon"/>
                    <p>{moodCount[3]} days</p>
                </div>

                <div className='mood-stat'>
                    <img src={sad2} alt="sad-icon"/>
                    <p>{moodCount[2]} days</p>
                </div>

                <div className='mood-stat'>
                    <img src={angry2} alt="angry-icon"/>
                    <p>{moodCount[1]} days</p>
                </div>
              </div>
            </div>
            <div className='calendar-container'>
              <div className='year-title'>
                <select className='year-selection' onChange={(e)=>handleYearChange(e)} ref={yearRef}>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
              <div className='year-container'>
                {
                  months.map(month => <Month  key={year+month} 
                                              year={year} 
                                              month={month} 
                                              monthData={firebaseData.find(m=>parseInt(m.month)===month)}
                                              setUpdatePage={setUpdatePage}
                                              currentUserUid={currentUser.uid}/>)
                }
              </div>
            </div>
          </div>

      }

    </div>
  );
}

export default App;








