import axios from 'axios'

import './estilo.css'

import {Link} from 'react-router-dom'
import {useState} from 'react'

export default function Login(){

    const url = 'https://segware-book-api.segware.io/api/sign-in';
    const [dados, setDados] = useState({
        username: '',
        password: ''
    })

    function submit(e){
        e.preventDefault();
        axios.post(url, {
            username: dados.username,
            password: dados.password
        })
        .then(res=>{
            console.log(res.data)
        })
    }
    
    function handle(e){
   
        const newData={...dados};
        newData[e.target.id] = e.target.value;
        setDados(newData);
        console.log(newData)
    
    }
    



    return (
   
        <div className="divpai">

            <div className="divfilho">
                <h1>Login</h1>
                <form onSubmit={(e)=>submit(e)}>
                    <input onChange={(e)=>handle(e)} type="text" id="username" value={dados.username} placeholder="Login" />
                    <input onChange={(e)=>handle(e)} type="password" id="password" value={dados.password} placeholder="Password" /> <br/>
                    <button type="submit">Logar</button>
                    <Link to="/cadastrar" className="link">Não possui conta? Cadastre-se!</Link>
                </form>
            </div>       
            
        </div>
    )

}
