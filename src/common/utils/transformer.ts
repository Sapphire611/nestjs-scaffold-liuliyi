import { Transform } from 'class-transformer';

export function ParseInt(valueFn?: (value: any) => any) {
  return Transform(params => {
    const { value } = params;
    if (valueFn && typeof valueFn === 'function') {
      return valueFn(value);
    }
    return parseInt(value, 10);
  });
}

export function ParseBoolean(valueFn?: (value: any) => any) {
  return Transform(params => {
    const { value } = params;
    if (valueFn && typeof valueFn === 'function') {
      return valueFn(value);
    }
    // 将字符串 "true"（不区分大小写）转换为布尔值 true，其他值都转换为 false
    return value.toString().toLowerCase() === 'true';
  });
}
