export interface OPTIONS { 
     requestUrl: string,
    appName: string,
    pv?:boolean,
}
export interface emitOptiosn { 
    type: string,
    subType:string
}

export interface PV_OPTIONS { 
    url: string, //当前url,
    refer: string, //上层url, 从何而来，
    action: number|string,//页面加载来源方式
    width?: number,
    height?:number
}

export interface DATA_OPTIONS { 
    type: string,
    subType: string,
    uuid: string |number,
    data:PV_OPTIONS
}

// enum action_type {
//     navigate = 0,
//     Down,
//     Left,
//     Right
// }