// 去除object中为空的值
export const filterObject = function (obj: any, predicate = (value: any) => value !== undefined) {
  const result: any = {};
  Object.keys(obj).forEach(key => {
    if (predicate(obj[key])) {
      result[key] = obj[key];
    }
  });
  return result;
};
