import axios from 'axios'

import './estilo.css'

import {useState} from 'react'

export default function Recuperar(){

    

    const [dados, setDados] = useState({
        username: '',
  
    })

    const url = `https://segware-book-api.segware.io/api/forgot-password/${dados.username}`;

    
    function handle(e){
   
        const newData={...dados};
        newData[e.target.id] = e.target.value;
        setDados(newData);
        console.log(newData)        
    
    }

     function pegarSenha(){
        axios.get(url)
        .then(res=>{
          const lerDados = JSON.stringify(res)
          const converterDados = JSON.parse(lerDados)
          alert('Sua senha é: ' + converterDados.data.password)
          window.location.href="/";
        })
        
    }



    return (
   
        <div className="divpai-recuperar">

            <div className="divfilhorecuperar">
                <p>Esqueceu sua senha?<br/>Digite seu login para recuperá-la</p>
       
                    <div className="input-button"><input onChange={(e)=>handle(e)} type="text" id="username" value={dados.username} placeholder="Nome de usuário" />
                    <br/>
                    <button onClick={()=>pegarSenha()}>Recuperar senha</button></div>
              
            </div>       
            
        </div>
    )

}

