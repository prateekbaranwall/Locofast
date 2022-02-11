import './App.css';
import Homepage from './component/HomePage/homepage'
import Login from './component/login/login'
import Blog from './component/HomePage/blog'
import Sign_up from './component/sign_up/sign_up'
import {Route, Routes} from "react-router-dom";
import {useState} from "react";
import Create from "./component/HomePage/create/create"
import Edit from "./component/HomePage/create/edit"

function App() {
  const [ user, setLoginUser] = useState({})
  const [contacts, setContacts] = useState([]);
  return (
    
    <div className="App">
      <Routes>
        <Route path="/" element={<Sign_up/>}/> 
         {user && user._id ? <Route path="/homepage/:id" element={<Homepage/>} /> : <Route path="/homepage" element={<Login setLoginUser={setLoginUser}/>} />   }
         {user && user._id ? <Route path="/create/:id" element={<Create setContacts={setContacts}/>} /> : <Route path="/homepage" element={<Login setLoginUser={setLoginUser}/>} />   }
        <Route path="/login" element={<Login setLoginUser={setLoginUser}/>} /> 
        <Route path="/edit/:id/:blogid" element={<Edit/>}/>
        <Route path="/homepage/:id/:blogid" element={<Blog/>} />
        {/* <Route path="/homepage/:id/search/:key" element={<Homepage/>} /> */}
      </Routes>

    </div>
  );
}

export default App;
