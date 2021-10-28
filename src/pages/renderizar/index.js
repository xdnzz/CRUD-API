import axios from 'axios'

import {useState, useEffect} from 'react'

import './estilo.css'


export default function Feed(){
  
    const accessToken = window.localStorage.getItem('chave');
    const url = 'https://segware-book-api.segware.io/api/feed';
    const urlReaction = 'https://segware-book-api.segware.io/api/reaction';
    
    const authAxios = axios.create({
      baseURL: url,
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    });


    const [data, setData] = useState({
        content: '',

    });



    const [pegar, setPegar] = useState([]);

    const [id, setId] = useState('');


function handle(e){
   
    const newData={...data};
    newData[e.target.id] = e.target.value;
    setData(newData);
}


function submit(e){
    e.preventDefault();
    authAxios.post(url, {
        content: data.content
    })
    .then(res=>{
        setId(res.data)
        console.log(id)
    })
}

function love(id){
    
    authAxios.post(urlReaction, {
        feedId: id,
        like:false,
        love:true
     
    })
    .then(res=>{
        console.log(id)
    })
}


function like(id){
    
    authAxios.post(urlReaction, {
        feedId: id,
        like:true,
        love:false 
       
        
    })
    .then(res=>{
       console.log(id)
    })
   
}


useEffect(()=>{

  
    async function loadData(){
      const response = await authAxios.get('https://segware-book-api.segware.io/api/feeds');
      setPegar(response.data);         
    }
  
    loadData();
  }
  ,[authAxios])


    return(

       <div className="container-principal">
            <div className="conteudo-postar">
                <form onSubmit={(e)=>submit(e)}>
                    <textarea className="inputs" onChange={(e)=>handle(e)} type="text" id="content" value={data.content}
                    placeholder="Digite aqui o texto a ser publicado"
                    ></textarea>
                   
                    <button type="submit">Publicar </button>
              
                </form>
            </div>
            <div className="div-conteudo">
                
                {pegar.map((e)=>{
                    return(
                        <div className="renderizar-conteudo"><p className="usuario-nome">Por: {e.author.username}</p> 
                            {e.content} <br/>
                            <div className="estilizacao-reacoes"> <p onClick={()=>love(e.id)}>Amei!</p> ㅤ <p onClick={()=>like(e.id)}>Curti!</p> <br/>
                            </div>
                        </div>
                        
                    )
                })} 
            </div>
            
       </div>
    )

}



