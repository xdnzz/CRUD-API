


import axios from 'axios'

import './estilologin.css'

import {Link} from 'react-router-dom'
import {useState} from 'react'




export default function Login(){



    const url = 'https://segware-book-api.segware.io/api/sign-in';
    const [dados, setDados] = useState({
        username: '',
        password: ''
    })

    async function submit(e){
        e.preventDefault();

        if(dados.username !== '' && dados.password!=='' ){
            await axios.post(url, {
                username: dados.username,
                password: dados.password
            })
            .then((res)=>{
                if(res.status === 200) {
             
                localStorage.setItem('chave', res.data);
               
                window.location.href="/feed";

                }if(res.status !== 200 && res.status!==201){
                    console.log(res.status)
                    alert('ops, algo deu errado!');
                    return;
                }
            })

          
            
        } else {
            alert('Ops, algum dos campos está vazio!')
            return;
        }
       
    }
 
    
    function handle(e){
   
        const newData={...dados};
        newData[e.target.id] = e.target.value;
        setDados(newData);
        console.log(newData)
    
    }
    



    return (
   
        <div className="divpai-login">

            <div className="divfilho">
                <h1>Entrar</h1>
                <form onSubmit={(e)=>submit(e)}>
                    <input onChange={(e)=>handle(e)} type="text" id="username" value={dados.username} placeholder="Login" />
                    <input onChange={(e)=>handle(e)} type="password" id="password" value={dados.password} placeholder="Password" /> 
                    <button type="submit">Logar</button>
                    <div>
                    <Link to="/cadastrar" className="link">Não possui conta? Cadastre-se!</Link> <br/> <Link className="forgot-password" to="/recuperar">Esqueci minha senha</Link>
                    </div>
                </form>
            </div>       
            
        </div>
    )

}

