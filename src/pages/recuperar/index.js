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
        const resposta =  axios.get(url)
        .then(res=>{
          const lerDados = JSON.stringify(res)
          const converterDados = JSON.parse(lerDados)
          alert('Sua senha é: ' + converterDados.data.password)
          
        })
        
    }



    return (
   
        <div className="divpai">

            <div className="divfilho">
                <p>Esqueceu sua senha?<br/>Digite seu login para recuperá-la</p>
       
                    <input onChange={(e)=>handle(e)} type="text" id="username" value={dados.username} placeholder="Login" />
                    <br/>
                    <button onClick={()=>pegarSenha()}>Recuperar senha</button>
              
            </div>       
            
        </div>
    )

}

