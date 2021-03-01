import dayjs from 'dayjs'

export enum DT_FORMAT {
  YMDHM = 'YYYY-MM-DD HH:mm',
  YMD = 'YYYY-MM-DD',
  Y = 'YYYY',
  HM = 'HH:mm',
}

export const ymdhm = (value?: string) => dayjs(value).format(DT_FORMAT.YMDHM)
export const ymd = (value?: string) => dayjs(value).format(DT_FORMAT.YMD)
export const y = (value?: string) => dayjs(value).format(DT_FORMAT.Y)
export const hm = (value?: string) => dayjs(value).format(DT_FORMAT.HM)
