

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
// import ContactUs from "./pages/contantus/ContactUs";
import Home from "./components/Home/Home";
import BMICalculator from "./components/BMI/BMICalculator";
import Subscribe from "./components/subscribe/Subscribe";
import Contact from "./components/Contact/Contact";
import Gallery from "./components/Gallery/Gallery";
import AboutUs from "./components/AboutUs/AboutUs";
import Exercise from "./components/Exercise/Exercise";
import Profile from "./components/Profile/Profile";
import Page404 from "./components/404/page404";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-svg-core/styles.css';


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/subscribe' element={<Subscribe/>}/>
      <Route path='/BMICalculator' element={<BMICalculator/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/Gallery' element={<Gallery/>}/>
      <Route path='/AboutUs' element={<AboutUs/>}/>
      <Route path='/Exercise' element={<Exercise/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='*' element={< Page404 />}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
