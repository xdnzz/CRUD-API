import axios from 'axios'

import {useState, useEffect} from 'react'

import './renderizar.css'


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

    const [search, getSearch] = useState('')


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
        alert(`Você amou essa publicação, se havia uma reação anteriormente, ela foi removida! :D Id da publicação: ${id}`)
       
    })
}

function sair() {
    localStorage.clear();
    window.location.href="/";
}
function like(id){
    
    authAxios.post(urlReaction, {
        feedId: id,
        like:true,
        love:false           
    })
    .then(res=>{
        alert(`Você curtiu essa publicação, se havia uma reação anteriormente, ela foi removida! :D Id da publicação: ${id}`)
    //as reações estão sendo atreladas de "Muitos para muitoso", cada feedID é o ID de um post, só para exibir o console unicamente e ver que está retornando o ID da publicação
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
           <button className="botao-sair" onClick={()=>sair()}>Sair</button>
            <div className="conteudo-postar"> 
                <input value={search} onChange={(e)=> {getSearch(e.target.value)} } type="text"
                 className="busca"
                 placeholder="Buscar postagem por nome de usuário"
                 />
                <form onSubmit={(e)=>submit(e)}>
                    <textarea className="inputs" onChange={(e)=>handle(e)} type="text" id="content" value={data.content}
                    placeholder="Digite aqui o texto a ser publicado"
                    ></textarea>
                   
                    <button type="submit">Publicar </button>
              
                </form>
            </div>
            <div className="div-conteudo">
                
                {pegar.filter((bus)=>{
                    if(search == ""){
                        return bus
                    } else if(
                        bus.author.username.toLowerCase().includes(search.toLowerCase())) {
                            return bus
                        }
                }).map((e)=>{
                    return(
                        <div className="renderizar-conteudo"><p className="usuario-nome">Por: {e.author.username}</p> <br/>
                            <p>{e.content}</p> <br/>
                            <div className="estilizacao-reacoes"> <p onClick={()=>love(e.id)} style={{color: '#FF0000', cursor: 'pointer'}}>Amei!</p> ㅤ <p onClick={()=>like(e.id)} style={{color: '#0040FF', cursor: 'pointer'}}>Curti!</p> <br/>
                            </div>
                        </div>
                        
                    )
                })} 
            </div>
            
       </div>
    )

}



