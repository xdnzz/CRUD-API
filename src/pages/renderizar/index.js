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

useEffect(()=>{
  
    async function loadData(){
      const response = await authAxios.get('https://segware-book-api.segware.io/api/feeds');
      setPegar(response.data);
  
      
    }
  
    loadData()
  }
  ,[authAxios])

    return(

       <div className="container">
            <div className="content">
                <form onSubmit={(e)=>submit(e)}>
                    <input className="inputs" onChange={(e)=>handle(e)} type="text" id="content" value={data.content}/>
                    <button type="submit">Publicar </button>
              
                </form>
            </div>
            <div className="conteudo">
                {pegar.map((e)=>{
                    return(
                        <div className="renderizado">{e.content}</div>
                    )
                })}
            </div>
            
       </div>
    )

}



