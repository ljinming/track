/**
 * 格式化性能记录,小数位数保留最多两位,等于0的字段不传输,标记为undefined
 */
export function normalizePerformanceRecord(e:Record<string,any>):Record<string,any>  {
  Object.keys(e).forEach((p) => {
    const v = e[p];
    if (typeof v === 'number') e[p] = v === 0 ? undefined : parseFloat(v.toFixed(2));
  });
  return e;
}

export function getUUid (){ 
    return new Date().getTime()
}