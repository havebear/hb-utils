/*
 * @Author: 616749285@qq.com
 * @Date: 2021-05-28 15:47:04
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2021-05-28 16:54:29
 * @Description:  树相关的方法
 */

/**
 * 数组转树
 * @param {array} data 列表
 * @param {string | number} parent 父值
 * @param {string} parentKey 父值键值
 * @param {string} childrenKey 子级数组键值
 * @param {string} currentKey 当前主键
 * @param {function} processItem 生成节点过程中处理节点函数，返回一个对象
 * @returns array
 * array2Tree({
 *   list: arr,
 *   parent: '0',
 *   parentKey: 'parentId',
 *   currentKey: 'id',
 *   processItem: item => ({ isLeaf: !item.children.length })
 * })
 */
const array2Tree = ({
  data = [],
  parent,
  parentKey = 'parentId',
  childrenKey = 'children',
  currentKey = 'id',
  processItem
} = {}) => {
  if (!data || !data.length) return []
  const result = []
  let temp
  data.forEach(item => {
    if (item[parentKey] === parent) {
      result.push(item)
      temp = array2Tree({ data, parent: item[currentKey], parentKey, currentKey })
      if (temp.length > 0) {
        item[childrenKey] = temp
        item.checked = false
      }
      if (processItem) {
        Object.assign(item, processItem(item, temp))
      }
    }
  })
  return result
}

/**
 * 树转数组
 * @param {array} tree 树结构数据
 * @param {string} key 子级数组键值
 * @returns array
 */
const tree2Array = (tree = [], key = 'children') => {
  if (!tree || !tree.length) return []
  const result = []
  tree.forEach(item => {
    result.push({
      ...item,
      [key]: void 0
    })
    if (item[key] && item[key].length) {
      result.push(...tree2Array(item[key]))
    }
  })
  return result
}

/**
 * 根据属性差找树节点
 * @param {array} data 树结构数据
 * @param {string} key 查找属性键值
 * @param {string} value 差找属性值
 * @param {string} childrenKey 子级数组键值
 * @returns object
 */
const getTreeNodeByAttr = ({ data, key = 'id', value, childrenKey = 'children' }) => {
  let result = null
  if (!data || !data.length) {
    return
  }
  for (let i = 0; i < data.length; i++) {
    if (result != null) {
      break
    }
    const item = data[i]
    if (item[key] === value) {
      result = item
      break
    } else if (item[childrenKey] && item[childrenKey][0]) {
      result = getTreeNodeByAttr({ data: item[childrenKey], key, value, childrenKey })
    }
  }
  return result
}

export { array2Tree, tree2Array, getTreeNodeByAttr }
