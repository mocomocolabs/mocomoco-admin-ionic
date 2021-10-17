import { Task as TaskType } from 'mobx-task'

export type Task = TaskType<[], void>

export type TaskByString = TaskType<[string], void>

// eslint-disable-next-line
export type TaskBy<T extends any> = TaskType<[T], void>

export type TaskByNumber = TaskType<[number], void>
// eslint-disable-next-line
export type TaskByAs<T extends any, R extends any> = TaskType<[T], R>

// eslint-disable-next-line
export type TaskBy2As<T extends any, U extends any, R extends any> = TaskType<[T, U], R>
