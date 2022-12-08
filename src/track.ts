import pv from "./lib/pv";
import event from "./lib/event";
import performance from "./lib/performance";
import { OPTIONS } from "./type";


const init = (_options: OPTIONS) => {
    pv.init(_options);
    event.init(_options)
    performance.init(_options)
};
  
export default {init}