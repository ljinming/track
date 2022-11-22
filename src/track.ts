import pv from "./lib/pv";
import { OPTIONS } from "./type";

const init = (_options: OPTIONS) => {
    console.log('===========_options', _options)
    pv.init(_options);
};
  
export default {init}