export function findObjectByName(obj, targetName) {
  // 如果当前对象是数组，遍历数组中的每个元素
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = findObjectByName(item, targetName)
      if (result) return result // 如果找到匹配的对象，返回结果
    }
  } else if (obj && typeof obj === 'object') {
    // 如果当前对象是普通对象，遍历其所有键值对
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === 'name' && obj[key] === targetName) {
          // 如果当前键是 'name' 且值为 targetName，返回当前对象
          return obj
        }
        if (typeof obj[key] === 'object') {
          // 如果当前值是对象或数组，递归查找
          const result = findObjectByName(obj[key], targetName)
          if (result) return result // 如果找到匹配的对象，返回结果
        }
      }
    }
  }
  // 如果没有找到匹配的对象，返回 null
  return null
}
