/*
 * @Author: 616749285@qq.com
 * @Date: 2021-05-25 10:56:31
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2021-11-26 17:31:22
 * @Description:  时间相关函数库，主要使用了moment.js，官网地址http://momentjs.cn/docs，建议阅读底部注释内容
 */

/**
 * 导出函数
 * formatDate                 格式化时间
 * formatTime                 格式化时间 - 便捷
 * formatDay                  格式化日期
 * formatMonth                格式化年月
 * genYears                   生成可查询的年份列表
 * genMonths                  生成可查询的月份列表
 * genDaysByDate              根据时间生成当月日期列表
 * getMoment                  获取moment对象
 * getTimestamp               获取时间戳
 * getDateValueByType         根据类型获取时间值
 * getMillisecond             获取毫秒位
 * getSecond                  获取秒位
 * getMinute                  获取分位
 * getHour                    获取小时位
 * getDate                    获取天位
 * getDay                     获取星期位
 * getMonth                   获取月份
 * getWeek                    获取第几个星期
 * getQuarter                 获取季度
 * getYear                    获取年份
 * getWeekStr                 获取星期几
 * getDaysInMonth             获取月份的天数
 * getOffsetTargetDate        获取偏移目标时间
 * getDateRange               获取时间范围
 * getDateDiff                获取两个时间的偏移量
 * getMaxDate                 获取传入时间数组中的最大时间
 * getMinDate                 获取传入时间数组中的最小时间
 * isValidTime                是否为有效时间
 * isDateBefore               当前时间是否在目标时间之前
 * isDateAfter                当前时间是否在目标时间之后
 * isDateBetween              当前时间是否在区间内
 */

/**
 * types 类型
 * year | quarter | month | week | day | date | hour | minute | second | millisecond
 */

 import moment from 'moment'
 import {
   YEAR,
   QUARTER,
   MONTH,
   WEEK,
   DAY,
   DATE,
   HOUR,
   MINUTE,
   SECOND,
   MILLISECOND,
   FORMAT_TIME,
   FORMAT_DAY,
   FORMAT_MONTH,
   FORMAT_WEEK
 } from '../config/dictionary.config'
 
 /** ============ 格式化时间部分 ============= */
 
 /**
  * 格式化时间
  * @param {date | string | number} date 时间
  * @param {string} format 格式化字符串
  * @param {string} placeholder 占位符
  * @returns string
  */
 export const formatDate = ({ date, format = FORMAT_TIME, placeholder = '' } = {}) => {
   const _date = moment(date)
   /** 有效时间 */
   if (!isValidTime(_date)) {
     return _date.format(format)
   }
   /** 无效时间，则返回空指定字符串 */
   return placeholder
 }
 
 /**
  * 格式化时间
  * @param {date | string | number} date 时间
  * @param {string} placeholder 占位符
  * @returns string
  * @description 用于直接返回时间格式化字符串
  */
 export const formatTime = (date, placeholder) => formatDate({ date, format: FORMAT_TIME, placeholder })
 
 /**
  * 格式化日期
  * @param {date | string | number} date 时间
  * @param {string} placeholder 占位符
  * @returns string
  * @description 用于直接返回日期格式化字符串
  */
 export const formatDay = (date, placeholder) => formatDate({ date, format: FORMAT_DAY, placeholder })
 
 /**
  * 格式化月份
  * @param {date | string | number} date 时间
  * @param {string} placeholder 占位符
  * @returns string
  * @description 用于直接返回年月格式化字符串
  */
 export const formatMonth = (date, placeholder) => formatDate({ date, format: FORMAT_MONTH, placeholder })
 
 /** ============ 生成器部分 ============= */
 
 /**
  * 生成可查询的年份列表
  * @param {number} offset 当前时间往后偏移年份
  * @param {number} start 开始年份
  * @returns array[{ label, value }]
  */
 export const genYears = (offset = 20, start = 2000) => {
   const target = new Date().getFullYear() + (offset || 1)
   return new Array(target - start).fill(0).map((item, index) => ({ label: index + start, value: index + start }))
 }
 
 /**
  * 生成可查询的月份列表
  * @returns array[{ label, value }]
  */
 export const genMonths = () => {
   return new Array(12).fill(0).map((item, index) => ({ label: index + 1, value: index + 1 }))
 }
 
 /**
  * 根据时间生成当月日期列表
  * @param {date | string | number} date 时间
  * @returns array[{ label, value }]
  */
 export const genDaysByDate = (date = new Date()) => {
   return new Array(getDaysInMonth(date)).fill(0).map((item, index) => {
     const temp = index + 1
     const now = moment(date).date(temp)
     return {
       label: temp,
       value: temp,
       time: now.toDate(),
       weekStr: getWeekStr(now),
       dayStr: formatDay(now)
     }
   })
 }
 
 /** ============ get部分 ============= */
 
 /**
  * 获取moment {}
  * @param {date | string | number} date 时间
  * @returns moment {}
  */
 export const getMoment = date => {
   if (isValidTime(date)) {
     return moment(date)
   }
   return null
 }
 
 /**
  * 获取时间戳
  * @param {date | string | number} date 时间
  * @returns number
  */
 export const getTimestamp = date => moment(date).valueOf()
 
 /**
  * 根据类型获取时间值
  * @param {date | string | number} date 时间
  * @param {*} type 类型 types
  * @returns string
  */
 export const getDateValueByType = (date, type = 'millisecond') => moment(date).get(type)
 
 /** 获取毫秒位 */
 export const getMillisecond = date => getDateValueByType(date, MILLISECOND)
 
 /** 获取秒位 */
 export const getSecond = date => getDateValueByType(date, SECOND)
 
 /** 获取分位 */
 export const getMinute = date => getDateValueByType(date, MINUTE)
 
 /** 获取小时位 */
 export const getHour = date => getDateValueByType(date, HOUR)
 
 /** 获取天位 */
 export const getDate = date => getDateValueByType(date, DATE)
 
 /** 获取星期位 */
 export const getDay = date => getDateValueByType(date, DAY)
 
 /** 获取月份 */
 export const getMonth = date => getDateValueByType(date, MONTH)
 
 /** 获取第几个星期 */
 export const getWeek = date => getDateValueByType(date, WEEK)
 
 /** 获取季度 */
 export const getQuarter = date => getDateValueByType(date, QUARTER)
 
 /** 获取年份 */
 export const getYear = date => getDateValueByType(date, YEAR)
 
 /** 获取星期几 */
 export const getWeekStr = date => moment(date).format(FORMAT_WEEK)
 
 /** 获取月份的天数 */
 export const getDaysInMonth = date => moment(date || new Date()).daysInMonth()
 
 /**
  * 获取偏移目标时间
  * @param {date | string | number} date 时间
  * @param {number} offset 偏移量
  * @param {string} type 类型 types
  * @returns moment {}
  */
 export const getOffsetTargetDate = ({ date, offset = 0, type = DAY }) => {
   if (isValidTime(date)) {
     if (offset === 0) return moment(date)
     if (offset > 0) return moment(date).add(type, offset)
     return moment().subtract(type, offset)
   }
   return void 0
 }
 
 /**
  * 获取时间范围
  * @param {date | string | number} date 时间
  * @param {number} offset 偏移量
  * @param {string} type 类型 types
  * @returns [ moment, moment ]
  */
 export const getDateRange = ({ date = new Date(), offset = 0, type = DAY }) => {
   if (isValidTime(date)) {
     if (offset === 0) return [moment(date), moment(date)]
     if (offset > 0) return [moment(date), getOffsetTargetDate({ date, type, offset })]
     return [getOffsetTargetDate({ date, type, offset }), moment(date)]
   }
 }
 
 /**
  * 获取两个时间的偏移量
  * @param {date | string | number} start 开始时间
  * @param {date | string | number} end 结束时间
  * @param {string} unit 单位，不传返回时间戳
  * @returns number | string
  */
 export const getDateDiff = (start, end, unit = '') => moment(start).diff(moment(end), unit)
 
 /**
  * 获取传入时间数组中的最大时间
  * @param {date | string | number} dates 时间数组
  * @returns moment {}
  * @description 参考了moment.js中的max函数
  */
 export const getMaxDate = (dates = []) => {
   const _dates = dates.filter(item => isValidTime(item)).map(item => moment(item))
   if (_dates.length) {
     return moment.max(_dates)
   }
   return void 0
 }
 
 /**
  * 获取传入时间数组中的最小时间
  * @param {date | string | number} dates 时间数组
  * @returns moment {}
  * @description 参考了moment.js中的min函数
  */
 export const getMinDate = (dates = []) => {
   const _dates = dates.filter(item => isValidTime(item)).map(item => moment(item))
   if (_dates.length) {
     return moment.min(_dates)
   }
   return void 0
 }
 
 /** ============ 判断部分 ============= */
 
 /**
  * 是否为有效时间
  * @param {date} date 时间
  * @returns boolean
  */
 export const isValidTime = date => moment(date).isValid()
 
 /**
  * 当前时间是否在目标时间之前
  * @param {date | string | number} currentDate 当前时间
  * @param {date | string | number} targetDate 目标时间
  * @param {string} type types 如果要将粒度限制为毫秒以外的单位，则将单位作为第二个参数传入。由于第二个参数用于确定精度，且不仅仅是要检查的单个值，因此使用 day 将会检查年份、月份、日期
  * @returns boolean
  * @description moment().isBefore(Moment|String|Number|Date|Array, String)
  */
 export const isDateBefore = (currentDate, targetDate, type = '') => moment(currentDate).isBefore(targetDate, type)
 
 /**
  * 当前时间是否在目标时间之后
  * @param {date | string | number} currentDate 当前时间
  * @param {date | string | number} targetDate 目标时间
  * @param {string} type types 如果要将粒度限制为毫秒以外的单位，则将单位作为第二个参数传入。由于第二个参数用于确定精度，且不仅仅是要检查的单个值，因此使用 day 将会检查年份、月份、日期
  * @returns boolean
  * @description moment().isAfter(Moment|String|Number|Date|Array, String)
  */
 export const isDateAfter = (currentDate, targetDate, type = '') => moment(currentDate).isAfter(targetDate, type)
 
 /**
  * 当前时间是否在区间内
  * @param {date | string | number} currentDate 当前时间
  * @param {date | string | number} start 目标开始时间
  * @param {date | string | number} start 目标结束时间
  * @param {string} type types 如果要将粒度限制为毫秒以外的单位，则将单位作为第二个参数传入。由于第二个参数用于确定精度，且不仅仅是要检查的单个值，因此使用 day 将会检查年份、月份、日期
  */
 export const isDateBetween = (currentDate, { start, end } = {}, type = '') =>
   moment(currentDate).isBetween(start, end, type)
 
 /**
  * 如何获取时间戳
  * moment().valueOf()
  * +moment()
  * new Date().getTime()
  * +new Date()
  */
 
 /** 关于通过增加或者减去时间改变原始的moment
  *  可通过add(type, number) 增加
  *  如：moment().add('day', 1)，相当于在原有时间基础上增加了1天
  *  可通过subtract(type, number)  减去
  *  如：moment().subtract('day', 1)，下给你当与在原有时间基础上减去了1天
  */
 
 /**
  *  关于通过startOf改变原始的moment
  *  moment().startOf('year');     // 设置为今年一月1日上午 12:00
  *  moment().startOf('month');    // 设置为本月1日上午 12:00
  *  moment().startOf('quarter');  // 设置为当前季度的开始，即每月的第一天上午 12:00
  *  moment().startOf('week');     // 设置为本周的第一天上午 12:00
  *  moment().startOf('isoWeek');  // 根据 ISO 8601 设置为本周的第一天上午 12:00
  *  moment().startOf('day');      // 设置为今天上午 12:00
  *  moment().startOf('date');     // 设置为今天上午 12:00
  *  moment().startOf('hour');     // 设置为当前时间，但是 0 分钟、0 秒钟、0 毫秒
  *  moment().startOf('minute');   // 设置为当前时间，但是 0 秒钟、0 毫秒
  *  moment().startOf('second');   // 与 moment().milliseconds(0); 相同
  */
 
 /**
  * 关于通过endOf改变原始的moment
  * 与上面的startOf相反
  * moment().endOf("year");        // 将 moment 设置为今年的 12 月 31 日 23:59:59.999
  */
 
 /**
  * 关于如何显示”几秒前”、“几年前”、“几年内”
  * 可以调用moment().fromNow(Boolean)
  * moment([2007, 0, 29]).fromNow();     // 14 年前
  * moment([2007, 0, 29]).fromNow(true); // 14 年
  */
 
 /**
  * 补充上面的方法，相对于目标时间
  * 可以调用moment().from(Moment|String|Number|Date|Array, Boolean)
  * var a = moment([2007, 0, 28]);
  * var b = moment([2007, 0, 29]);
  * a.from(b) // "1 天前"
  */
 
 /**
  * moment().toObject()
  * 会返回一个包含年份、月份、月份的日期、小时、分钟、秒钟、毫秒的对象
  */
 
 /**
  * moment().isSame(Moment|String|Number|Date|Array, String)
  * 检查一个 moment 是否与另一个 moment 相同。 第一个参数会被解析为 moment（如果尚未解析）
  * 如果要将粒度限制为毫秒以外的单位，则将单位作为第二个参数传入
  */
 
 /**
  * moment().isLeapYear()
  * 是否为闰年
  */
 
 /**
  * moment.isMoment(obj)
  * 是否为moment对象
  */
 
 /**
  * moment.isDate(obj)
  * 是否为原生Date对象
  */
