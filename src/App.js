
import './App.css';
import Signup from './componenets/login/registration/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthSuccess from './componenets/login/registration/Login/AuthSuccess';
import Dashboard from './componenets/Dashboard/dashboard';
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup />} ></Route>
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path='/dashboard' element={<Dashboard />} ></Route>
        
      </Routes>
    </Router>



    // <Signup />
  );
}
 
export default App;




