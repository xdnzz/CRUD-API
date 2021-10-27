import axios from 'axios'

import {useState, useEffect} from 'react'

import './estilo.css'


export default function Feed(){
  
    const accessToken = window.localStorage.getItem('chave');
    const url = 'https://segware-book-api.segware.io/api/feed'
    
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



function handle(e){
   
    const newData={...data};
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData)

}


function submit(e){
    e.preventDefault();
    authAxios.post(url, {
        content: data.content
    })
    .then(res=>{
        console.log(res)
    })
}

function reacao(e){
    e.preventDefault();
    authAxios.post(url, {
        like: false,
        love: false
    })
    .then(res=>{
        console.log(res)
    })
}



useEffect(()=>{
  
    async function loadData(){
      const response = await authAxios.get('https://segware-book-api.segware.io/api/feeds');
      setPegar(response.data);
      console.log(response.data)
    }
  
    loadData()
  }
  ,[])

  

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
                        <div className="renderizar-conteudo">{e.content}</div>
                    )
                })}
            </div>
            
       </div>
    )

}



