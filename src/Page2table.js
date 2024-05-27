import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Chart } from "react-google-charts";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function Page2table() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        const fetchQuestionDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/polls/question_id/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQuestion(data);
            } catch (error) {
                console.error('Error fetching question details:', error);
            }
        };
        fetchQuestionDetails();
    }, [id]);

    const navigate = useNavigate();
    const toVote = () => {
        navigate(`/vote/${id}`, { state: { question: question?.question_text, option: Object.keys(question?.OptionVotes) } });
    };

    return (
        <div className='page2'>
            <div>
                <h2>{question && question.question_text}</h2>
                <button className='button3' onClick={toVote}>
                    Vote
                </button>
            </div>
            <br></br>
            {question && (
                <>
                    <div className='page2table'>
                        <TableContainer>
                            <Table bgcolor="black" className='tableborder'>
                                <TableHead>
                                    <TableRow bgcolor="darkgrey">
                                        <TableCell align='center' className='tableborder'>Number</TableCell>
                                        <TableCell className='tableborder'>Option</TableCell>
                                        <TableCell align='center' className='tableborder'>Votes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody bgcolor="white">
                                    {Object.entries(question.OptionVotes).map(([option, votes], index) => (
                                        <TableRow key={index}>
                                            <TableCell align='center' className='tableborder'>{index + 1}</TableCell>
                                            <TableCell className='tableborder'>{option}</TableCell>
                                            <TableCell align='center' className='tableborder'>{votes}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br />
                        <h5>Tags: {question.tags && question.tags.join(', ')}</h5>
                    </div>

                    <div className='piechart'>
                        {question.OptionVotes && (
                            <Chart
                                width={'100%'}
                                height={'400px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Option', 'Votes'],
                                  ...Object.entries(question.OptionVotes).map(([option, votes]) => [option, votes])
                                ]}
                                options={{
                                    title: 'Votes Distribution',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Page2table;
