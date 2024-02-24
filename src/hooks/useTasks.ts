import {useCallback, useEffect, useState} from 'react'
import {type Task} from '@/models/Task/Task.model'
import {useStorage} from './useStorage'
import {TaskArrayHolder} from '@/models/TaskArrayHolder/TaskArrayHolder.model'
import {taskArraySchema} from '@/models/TaskArrayHolder/TaskArrayHolder.schema'

const tasksKey = 'tasks'

export function useTasks() {
	const [dbTasks, setDbTasks, waitUntilLoaded] = useStorage<TaskArrayHolder>(tasksKey, taskArraySchema)
	const [tasks, setTasks] = useState<Task[]>([])

	useEffect(() => {
		void waitUntilLoaded().then(() => {
			if (dbTasks) {
				setTasks(dbTasks.array)
			}
		})
	}, [dbTasks])

	const addTask = useCallback((task: Task) => {
		void waitUntilLoaded().then(() => {
			if (!dbTasks) {
				console.error('dbTasks not loaded')
				return
			}

			if (dbTasks.array.some(t => t.fields.id === task.fields.id)) {
				return
			}

			const newTasks = dbTasks.array.concat(task)

			setDbTasks(new TaskArrayHolder(newTasks))
		})
	}, [dbTasks])

	const removeTask = useCallback((task: Task) => {
		void waitUntilLoaded().then(() => {
			if (!dbTasks) {
				return
			}

			setDbTasks(new TaskArrayHolder(dbTasks.array.filter(t => t.fields.id !== task.fields.id)))
		})
	}, [dbTasks])

	const updateTask = useCallback((task: Task, newTask: Task) => {
		void waitUntilLoaded().then(() => {
			if (!dbTasks) {
				return
			}

			const newTasks = dbTasks.array.map(t => {
				if (t.fields.id === task.fields.id) {
					return newTask
				}

				return t
			})
			setDbTasks(new TaskArrayHolder(newTasks))
		})
	}, [dbTasks, setDbTasks])

	return [tasks, {addTask, removeTask, updateTask}, waitUntilLoaded] as const
}
