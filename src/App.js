
import Routes from './routes';
import {BrowserRouter} from 'react-router-dom';
import './estilo.css';
import AuthProvider from './contexts/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 



function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
   </AuthProvider>
  )
}

export default App;