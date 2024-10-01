import './Start.css'
import { useNavigate } from 'react-router-dom';
const Start = () => {
    const navigate=useNavigate();
    const handleStart=()=>{
      navigate('/flip');
    }
  return (
    <div className='container'>
      <h1 className='heading'>Memory Game</h1>
      <button className='btn' onClick={handleStart}>Lets get Started</button>
    </div>
  )
}

export default Start
