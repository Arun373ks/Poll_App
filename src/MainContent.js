// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './App.css';

// function MainContent() {
//     const [pollQuestions, setPollQuestions] = useState([]);

//     useEffect(() => {
    //     const fetchPollQuestions = async () => {
    //         try {
    //             const response = await fetch('http://127.0.0.1:8000/polls/get_question/');

    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             console.log(data);
            
    //             const updatedQuestions = data.map(question => {
                   
    //                 const totalVotes = Object.values(question.OptionVote).reduce((sum, votes) => sum + votes, 0);
                    
    //                 return {
    //                     ...question,
    //                     TotalVotes: totalVotes
    //                 };
    //             });
                
               
    //          setPollQuestions(updatedQuestions);
    //         } catch (error) {
    //             console.error('Error fetching poll questions:', error);
    //         }
    //     };
    //     fetchPollQuestions();
    // }, []);
//     return (
//         <div className='right'>
//             <div className='div2'>
//                 <table className='table'>
//                     <thead>
//                         <tr bgcolor="grey" height="100">
//                             <th>Number</th>
//                             <th width="400">Poll Question</th>
//                             <th width="200">Total Votes</th>
//                             <th width="300">Tags</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                     {pollQuestions.map((question, index) => (
//                           <tr key={question.id || index} bgcolor="white" height="100">
//                               <td>{index + 1}</td>
                         
//                               <td><Link to={`/PollDetail/${question.QuestionID}`}>{question.Question}</Link></td>
//                               <td width="200">{question.TotalVotes}</td>
//                               <td width="300">{(question.Tags ).join(', ')}</td>
//                          </tr>     
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// }

// export default MainContent;





// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { AppContext } from './AppContext';

// function MainContent() {
//   const { selectedTags } = useContext(AppContext);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let url = 'http://127.0.0.1:8000/polls/get_question/';
//         if (selectedTags && selectedTags.length > 0) {
//           const tagsQueryString = selectedTags.join('&tag=');
//           url = `http://127.0.0.1:8000/polls/get_polls_by_tag/?tag=${tagsQueryString}`;
//         }
  
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
  
//         const updatedQuestions = data.map(question => ({
//           ...question,
//           TotalVotes: Object.values(question.OptionVote).reduce((sum, votes) => sum + votes, 0)
//         }));
  
//         setFilteredData(updatedQuestions);
//       } catch (error) {
//         console.error('Error fetching data:', error);
      
//       }
//     };
  
//     fetchData();
//   }, [selectedTags]);

  
//   return (
//     <div className='right'>
//       <div className='div2'>
//         <table className='table'>
//           <thead>
//             <tr bgcolor="grey" height="60">
//               <th>Number</th>
//               <th width="400">Poll Question</th>
//               <th width="200">Total Votes</th>
//               <th width="300">Tags</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((question, index) => (
//               <tr key={question.id || index} bgcolor="white" height="100">
//                 <td>{index + 1}</td>
//                 <td><Link to={`/PollDetail/${question.QuestionID}`}>{question.Question}</Link></td>
//                 <td width="200">{question.TotalVotes}</td>
//                 <td width="300">{question.Tags.join(', ')}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default MainContent;



import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';
import { AppContext } from './AppContext';

function MainContent() {
  const { selectedTags } = useContext(AppContext);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://127.0.0.1:8000/polls/get_question/';
        if (selectedTags && selectedTags.length > 0) {
          const tagsQueryString = selectedTags.join('&tag=');
          url = `http://127.0.0.1:8000/polls/get_polls_by_tag/?tag=${tagsQueryString}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        const updatedQuestions = data.map(question => ({
         ...question,
          TotalVotes: Object.values(question.OptionVote).reduce((sum, votes) => sum + votes, 0)
        }));

        setFilteredData(updatedQuestions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedTags]);

  const totalPages = Math.ceil(filteredData.length / 5); // Assuming 5 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='right'>
      <div className='div2'>
        <TableContainer>
          <Table className='tableborder'>
            <TableHead>
              <TableRow bgcolor="darkgrey" height="60">
                <TableCell className='tableborder'>Number</TableCell>
                <TableCell className='tableborder'>Poll Question</TableCell>
                <TableCell className='tableborder'>Total Votes</TableCell>
                <TableCell className='tableborder'>Tags</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((question, index) => (
                <TableRow key={question.id || index} bgcolor="white" height="100">
                  <TableCell align='center' className='tableborder' >{(currentPage-1)*5+index + 1}</TableCell>
                  <TableCell className='tableborder'><Link to={`/PollDetail/${question.QuestionID}` }>{question.Question}</Link></TableCell>
                  <TableCell align='center' className='tableborder'>{question.TotalVotes}</TableCell>
                  <TableCell className='tableborder'>{question.Tags.join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </TableContainer>
      </div>
    </div>
  );
}

export default MainContent;
