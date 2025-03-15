// 允许的值为 -1 以上的整数
export function configRightNumber(value: any) {
  // 不存在这个值
  if (!value) {
    return 0
  }
  if (typeof value === 'string') {
    return parseInt(value, 10) || -1
  }
  if (value < -1) {
    return -1
  }
  return value
}
