import { OPTIONS, PV_OPTIONS } from "../type";
import { emit, getUUid } from "./base";

/*
PV/UV:PV(page view)，即页面浏览量或点击量。
UV:指访问某个站点或点击某条新闻的不同IP地址的人数
用户在每一个页面的停留时间
用户通过什么入口来访问该网页
用户在相应的页面中触发的行为


action 
navigate - 网页通过点击链接,地址栏输入,表单提交,脚本操作等方式加载
reload - 网页通过“重新加载”按钮或者location.reload()方法加载
back_forward - 网页通过“前进”或“后退”按钮加载
reserved - 任何其他来源的加载
#


pvHashtag 是否监听hash变化
*/



const init = (options: OPTIONS) => { 
    if (options.pv) {
        let pvObj: PV_OPTIONS = {
        url: "",
        refer: "",
        action: ""
            };
        // 页面点击量
        pvObj.url = window.location.href; // 当前路由
        pvObj.refer = document.referrer; // 从何而来
        pvObj.action = window.performance.navigation.type;
        pvObj.width = document.body.clientWidth; //页面宽度
        pvObj.height = document.body.clientHeight //页面高度

        emit({
            type:'behavior',
            subType: 'pv',
            uuid: getUUid(),
            data: { ...pvObj}
        })
    }
}



export default {init};