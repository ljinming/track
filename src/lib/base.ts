/*
上报类型
{
    type:'',大类
    subType: ,小类

}
*/

import axios from "axios"
import { DATA_OPTIONS } from "../type"

//in


 const emit =(_options:DATA_OPTIONS)=>{ 
     console.log('----d', _options)
     axios.post('http://localhost:8000/behavior', { ..._options }).then(res => { 
         console.log('===4',res)
     })
 }

function getUUid (){ 
    return new Date().getTime()
}

export  {emit,getUUid}