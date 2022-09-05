import Home from './pages/Home/Home';
import EmployeeInfo from './pages/EmployeeInfo/EmployeeInfo';
import LeptopInfo from './pages/LeptopInfo/LeptopInfo';
import Success from './pages/Success/Success';
import { Routes, Route } from 'react-router-dom';
import List from './pages/List/List';
import ListItem from './pages/ListItem/ListItem';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/employeerInfo' element={<EmployeeInfo />} />
        <Route path='/leptopInfo' element={<LeptopInfo />} />
        <Route path='/Success' element={<Success />} />
        <Route path='/List' element={<List />} />
        <Route path='/List/:id' element={<ListItem />} />
      </Routes>
    </div>
  );
}

export default App;
