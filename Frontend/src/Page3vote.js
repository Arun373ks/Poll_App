// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import './App.css';

// function Page3vote() {
// const location = useLocation();

  


//   return (
//     <div className='page2'>
//       <h2>{location.state.question}</h2>
//       <br />
//       {location.state.option.map((option) => (
//           <div key={option.id}>
//             <input
//               type="radio"
//               name="option"
//               id={option.id}
//               value={option.id}
              
//             />
//             <label htmlFor={option.id}>{option}</label>
//             <br />
//           </div>
//         ))}
//       <button className="button4" type="button" >
//         Vote
//       </button>
//     </div>
//   );
// }

// export default Page3vote;



import React,{ useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './App.css';

function Page3vote() {
  const {id}=useParams();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate =useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleVote = () => {
    if (selectedOption === null) {
      alert("Please select an option before voting.");
      return;
    }

   
    fetch(`http://127.0.0.1:8000/polls/Update_vote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incrementoption: selectedOption
      }),
      
    })
      .then((response) => {
        
        if (response.ok) {
          alert("Vote submitted successfully!");
          navigate(`/PollDetail/${id}`)
          
        } else {
          throw new Error('Failed to submit vote.');
        }
      })
      .catch((error) => {
        console.error('Error submitting vote:', error);
        alert('Failed to submit vote. Please try again.');
      });
  };

  return (
    <div className='page2'>
      <h2>{location.state.question}</h2>
      
      {location.state.option.map((option,index) => (
        <div key={index}>
          <input
            key={index}
            type="radio"
            name="option"
            id={index}
            value={option}
            onChange={handleOptionChange}
          />
          <label htmlFor={index}>{option}</label>
          <br></br><br />
        </div>
      ))}
      <br></br>
      <button className="button4" type="button" onClick={handleVote}>
        Vote
      </button>
    </div>
  );
}

export default Page3vote;
