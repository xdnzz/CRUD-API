import axios from 'axios';
import './estilo.css';
import {useState} from 'react';
import { Link } from 'react-router-dom';

export default function Cadastrar(){

    const url = 'https://segware-book-api.segware.io/api/sign-up';
    const [dados, setDados] = useState({
        username: '',
        password: ''
    })

    function submit(e){
        e.preventDefault();
        if(dados.username!=="" && dados.password!==""){
            axios.post(url, {
                username: dados.username,
                password: dados.password
            })
            .then(res=>{
                console.log(res);
                if(res.status === 200) {
                    alert('Conta criada com sucesso! Agora você pode logar.');
                }
            })
        } else {
            alert('Ops! Algum camp está vazio!')
        }
       
        
    }
    
    function handle(e){
   
        const newData={...dados};
        newData[e.target.id] = e.target.value;
        setDados(newData);
       
    
    }
    


    return (
   
        <div className="divpai">

            <div className="divfilho">
                <h1>Cadastre-se</h1>
                <form onSubmit={(e)=>submit(e)}>
                    <input onChange={(e)=>handle(e)} type="text" id="username" value={dados.username} placeholder="Login" />
                    <input onChange={(e)=>handle(e)} type="password" id="password" value={dados.password} placeholder="Password" /> <br/>
                    <button type="submit">Logar</button>
                    <Link to="/" className="link">Já possui uma conta? Faça login!</Link>
                </form>
            </div>       
            
        </div>
    )

}

