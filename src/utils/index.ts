import { v4 as uuidv4 } from 'uuid'
import * as _dayjs from 'dayjs'

export const uuid = (): string => uuidv4()

export const parseDate = (date: Date | string, pattern: string): _dayjs.Dayjs => {
  if (!date || !pattern) {
    return
  }

  return _dayjs(date, pattern)
}

export const formatDate = (date: Date | _dayjs.Dayjs | string, format: string): string => {
  if (!date || !format) {
    return
  }

  return _dayjs(date).format(format)
}

export const dayjs = (date: Date | string): _dayjs.Dayjs => _dayjs(date)

export default {
  parseDate,
  formatDate,
  dayjs,
}