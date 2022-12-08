import { OPTIONS } from "../type";
import { baseUUid, emit } from "./base";
import { normalizePerformanceRecord } from "./utils";

interface Supported { 
   performance: boolean;
    getEntriesByType: boolean;
    PerformanceObserver: boolean;
    MutationObserver: boolean;
    PerformanceNavigationTiming: boolean; //PerformanceNavigationTiming 提供了用于存储和检索有关浏览器文档事件的指标的方法和属性。例如，此接口可用于确定加载或卸载文档需要多少时间
}


// 兼容判断
const supported:Supported = {
  performance: !!window.performance,
  getEntriesByType: !!(window.performance && performance.getEntriesByType),
  PerformanceObserver: 'PerformanceObserver' in window,
  MutationObserver: 'MutationObserver' in window,
  PerformanceNavigationTiming: 'PerformanceNavigationTiming' in window,
 // PerformanceTiming:'PerformanceTiming' in window,
};


const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry:any) => {
    console.log(`${entry.name}: domComplete time: ${entry.domComplete}ms`);
  });
});

observer.observe({ type: "navigation", buffered: true });

/**
 * 发送首次页面性能数据
 */
function observeNavigationTiming() { 
  const times: Record<string,any>= {
    fmp: 0,
  };
  const { performance } = window;
  let timing: PerformanceTiming | PerformanceEntry | PerformanceNavigationTiming | any = performance.timing;
  console.log(timing)
  
  if (supported.getEntriesByType) {
    const paintEntries = performance.getEntriesByType('paint');
    if (paintEntries.length) times.fmp = paintEntries[paintEntries.length - 1].startTime;

     //优先使用 navigation v2 
    if (supported.PerformanceNavigationTiming) { 

      const nt2Timing = performance.getEntriesByType('navigation')[0];
      console.log('====35345',nt2Timing)
    if (nt2Timing) timing = nt2Timing;
    }

  }
  // 白屏时间 (从请求开始到浏览器开始解析第一批HTML文档字节的时间差)
  times.fpt = timing.responseEnd - timing.fetchStart;

   // 从开始发起这个页面的访问开始算起,减去重定向跳转的时间,在performanceV2版本下才进行计算,v1版本的fetchStart是时间戳而不是相对于访问起始点的相对时间
  //if (times.fmp && supported.PerformanceNavigationTiming) times.fmp -= timing.fetchStart;

  times.tti = timing.domInteractive - timing.fetchStart; // 首次可交互时间

  times.ready = timing.domContentLoadedEventEnd - timing.fetchStart; // HTML加载完成时间

 times.loadon = timing.loadEventStart - timing.fetchStart; // 页面完全加载时间

  times.firstbyte = timing.responseStart - timing.domainLookupStart; // 首包时间

  times.dns = timing.domainLookupEnd - timing.domainLookupStart; // dns查询耗时

  times.appcache = timing.domainLookupStart - timing.fetchStart; // dns缓存时间

  times.tcp = timing.connectEnd - timing.connectStart; // tcp连接耗时
    
    times.ttfb = timing.responseStart - timing.requestStart; // 请求响应耗时

  times.trans = timing.responseEnd - timing.responseStart; // 内容传输耗时

  times.dom = timing.domInteractive - timing.responseEnd; // dom解析耗时

  times.res = timing.loadEventStart - timing.domContentLoadedEventEnd; // 同步资源加载耗时

  times.ssllink = timing.connectEnd - timing.secureConnectionStart; // SSL安全连接耗时

  times.redirect = timing.redirectEnd - timing.redirectStart; // 重定向时间

  times.unloadTime = timing.unloadEventEnd - timing.unloadEventStart; // 上一个页面的卸载耗时

  console.log('====3times', times)
 
  emit({
  type: 'performance',
  subType: 'page',
  data:normalizePerformanceRecord({
    ...times,
  }),
  uuid:baseUUid,
});
}


function init(_options: OPTIONS) { 
    const { performanceFirstResource,performanceCore} = _options;
  if (!performanceFirstResource && !performanceCore) return
     observeNavigationTiming()


}

export default {init}