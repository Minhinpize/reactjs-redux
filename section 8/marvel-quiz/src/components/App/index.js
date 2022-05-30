import { Routes, Route } from 'react-router-dom'
import '../../App.css';
import ErrorPage from '../ErrorPage';
import Footer from '../Footer';
import ForgetPassword from '../ForgetPassword';
import Header from '../Header';
import Landing from '../Landing';
import Login from '../Login';
import Signup from '../SignUp';
import Welcome from '../Welcome';

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget-password' element={<ForgetPassword />} />

        <Route path='*' element={<ErrorPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
