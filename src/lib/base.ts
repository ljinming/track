/*
上报类型
{
    type:'',大类
    subType: ,小类

}
*/

import axios from "axios"
import { DATA_OPTIONS } from "../type"
import { getUUid } from "./utils";

// 当前应用ID,在整个页面生命周期内不变,单页应用路由变化也不会改变,加载SDK时创建,且只创建一次
const baseUUid = getUUid();


 const emit =(_options:DATA_OPTIONS)=>{ 
     console.log('--emit--d', _options)
    //  axios.post('http://localhost:8000/behavior/insert', { ..._options }).then(res => { 
    //      console.log('===4',res)
    //  })
 
 }



export  {emit,baseUUid}