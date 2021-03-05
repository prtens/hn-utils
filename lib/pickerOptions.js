import dayjs from 'dayjs'

/**
 * @param {*} time 
 * @returns 
 */
export function banDay(time) {
  const current = dayjs(time).valueOf()
  const begin = dayjs().subtract(1, 'day').valueOf()
  return begin > current
}