// import './App.css';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './Home';
// import PollDetail from './PollDetail';
// import Vote from './Vote';
// import CreatPoll from './CreatPoll';


// function App() {
  

//   return (
//      <Router>
      
//         <Routes>
//           <Route path='/' exact Component={Home}/>
//           <Route path='/PollDetail/:id' exact Component={PollDetail}/> 
//           <Route path='/Vote/:id' exact Component={Vote}/>
//           <Route path='/CreatPoll'exact Component={CreatPoll}/>
//         </Routes>
      
//     </Router>
//   );
// }

// export default App;


// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PollDetail from './PollDetail';
import Vote from './Vote';
import CreatPoll from './CreatPoll'; 

function App() {
  return (
  
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/PollDetail/:id' element={<PollDetail />} />
          <Route path='/Vote/:id' element={<Vote />} />
          <Route path='/CreatPoll' element={<CreatPoll />} /> {/* Use correct component */}
        </Routes>
      </Router>
  
  );
}

export default App;
