import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './App.css';

function Page4CreatePoll() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [tags, setTags] = useState('');
  const [isFormValid, setIsFormValid] = useState(false); 
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    checkFormValidity();
  };

  const handleAddOption = () => {
    setOptions([...options, '']); // Add a new empty option
    checkFormValidity();
  }; 

  const handleDeleteOption = (indexToDelete) => {
   if(options.length>2){
    setOptions(prevOptions => prevOptions.filter((_, index) => index!== indexToDelete));
    checkFormValidity();
   }
  };

  const checkFormValidity = () => {
    // Check if question, options, and tags are not empty
    const isValid = question.trim()!== '' && options.every(option => option.trim()!== '') && tags.trim()!== '';
    setIsFormValid(isValid);
  };

  // Call checkFormValidity whenever relevant states change
  useEffect(() => {
    checkFormValidity();
  }, [question, options, tags]);


  const handleCreatePoll = () => {

    if (!isFormValid) {
      alert('Please fill in all required fields.');
      return; // Exit the function if the form is not valid
    }


    const postData = {
      Question: question,
      OptionVote: options.reduce((acc, option) => {
        acc[option] = 0; // Initialize votes for each option as 0
        return acc;
      }, {}),
      Tags: tags.split(',').map(tag => tag.trim()), 
    };
    
    fetch(`http://127.0.0.1:8000/polls/post_question/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => {
        if (response.ok) {
            alert('Poll created successfully');
            navigate(`/`);
        }
        else {

          console.error('Failed to create poll');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

 

  return (
    <div className='div5'> 
      <div className="div4">
        <h4>Question</h4>
        
        <input
          type="text"
          className="button5"
          placeholder="Type your poll question here"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <br />
        <h4>Answer options</h4>
        {options.map((option, index) => (
          <div key={index}>
            
            <input
              type="text"
              className="button5"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={e => handleOptionChange(index, e.target.value)}
            />
            
             {index >= 0 &&  options.length > 2 && ( // Conditionally render the delete button
              <button type="button" className="delete-button" onClick={() => handleDeleteOption(index)}>
                X
              </button>
             )}
            <br /><br />
            
          </div>
        ))}
        <button type="button" className="button6" onClick={handleAddOption}>Add Option</button>
        <br />
        <h4>Comma separated tags</h4>
        <input
          type="text"
          className="button5"
          placeholder="Tag1, Tag2, Tag3"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <br /><br />
      </div>
      <br></br>
      <button type="button" className="button7" onClick={handleCreatePoll} disable={!isFormValid}>Create Poll</button>
    </div>
  );
}

export default Page4CreatePoll;
