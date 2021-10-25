
import Routes from './routes'
import {BrowserRouter} from 'react-router-dom'
import './estilo.css'


function App(){
  return(
   <BrowserRouter>
    <Routes/>
   </BrowserRouter>
  )
}

export default App;