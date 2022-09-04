import Home from './pages/Home/Home';
import EmployeeInfo from './pages/EmployeeInfo/EmployeeInfo';
import LeptopInfo from './pages/LeptopInfo/LeptopInfo';
import Success from './pages/Success/Success';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/employeerInfo' element={<EmployeeInfo />} />
        <Route path='/leptopInfo' element={<LeptopInfo />} />
        <Route path='/Success' element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
