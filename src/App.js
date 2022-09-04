import Home from './pages/Home/Home';
import EmployeeInfo from './pages/EmployeeInfo/EmployeeInfo';
import LeptopInfo from './pages/LeptopInfo/LeptopInfo';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className='App'>
      {/* <Home /> */}
      {/* <EmployeeInfo /> */}
      <Routes>
        <Route index element={<Home />} />
        <Route path='/employeerInfo' element={<EmployeeInfo />} />
        <Route path='/leptopInfo' element={<LeptopInfo />} />
      </Routes>
      {/* <LeptopInfo /> */}
    </div>
  );
}

export default App;
