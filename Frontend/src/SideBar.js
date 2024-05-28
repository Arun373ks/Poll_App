// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './App.css';

// function SideBar() {
//   const [pollTags, setPollTags] = useState([]);

//   useEffect(() => {
//     const fetchPollTags = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/polls/get_all_tags');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();

      
//         if (typeof data === 'object' && Array.isArray(data.Tags)) {
//           setPollTags(data.Tags);
//         } else {
//           console.error('Fetched data format is not as expected:', data);
//         }

//       } catch (error) {
//         console.error('Error fetching poll tags:', error);
        
//       }
//     };

//     fetchPollTags();
//   }, []);

//   return (
//     <div className="left">
//       <div>
//       <Link to='/CreatPoll' ><button className="button" type="button">Create Poll</button></Link>
//       </div>
//       <div className="checkbox">
//        <div className='left2'>
//         {pollTags.map((tag) => (
//           <ul  key={tag}>
            
//             <input
//               type="checkbox"
//               value={tag}
//             />
//             {tag}
//           </ul>
          
//         ))}
//         </div> 
//         <br />
//         <br />
//         <div>
//           <button className="button2" type="button">Filter by tags</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideBar;

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import './App.css';

function Sidebar() {
  const {  setSelectedTags } = useContext(AppContext);
  const [pollTags, setPollTags] = useState([]);
  const [selectedTagsTemp, setSelectedTagsTemp] = useState([]);

  useEffect(() => {
    const fetchPollTags = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/polls/get_all_tags');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (Array.isArray(data.Tags)) {
          setPollTags(data.Tags);
        } else {
          console.error('Fetched data format is not as expected:', data);
        }
      } catch (error) {
        console.error('Error fetching poll tags:', error);
      }
    };

    fetchPollTags();
  }, []);

  const handleTagChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTagsTemp([...selectedTagsTemp, value]);
    } else {
      setSelectedTagsTemp(selectedTagsTemp.filter(tag => tag !== value));
    }
  };

  const handleFilterByTags = () => {
    setSelectedTags(selectedTagsTemp);
  };

  return (
    <div className="left">
      <div>
        <Link to='/CreatPoll'><button className="button" type="button">Create Poll</button></Link>
      </div>
      <br></br>
      <div className="checkbox" >
        <div className='left2'>
          {pollTags.map((tag) => (
            <ul key={tag}>
              <label>
                <input
                  type="checkbox"
                  value={tag}
                  checked={selectedTagsTemp.includes(tag)}
                  onChange={handleTagChange}
                  
                />
                
                {tag}
              </label>
            </ul>
          ))}
        </div>
        <br />
        <br />
        <div>
          <button className="button2" type="button" onClick={handleFilterByTags}>Filter by tags</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
