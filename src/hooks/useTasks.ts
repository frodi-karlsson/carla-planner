import {useCallback} from 'react'
import {type Task} from '@/models/Task/Task.types'
import {useStorage} from './useStorage'
import {deserialize} from 'serializr'
import {taskModelSchema} from '@/models/Task/Task.model'
import {taskUtil} from '@/util/TaskUtils'

const tasksKey = 'tasks'

export function useTasks() {
	const [tasks, setTasks] = useStorage<any[]>(tasksKey, [])

	const _tasks: Task[] = tasks?.map(
		task => deserialize(taskModelSchema, task),
	) ?? []

	const _setTasks = useCallback((newTasks: Task[]) => {
		setTasks(taskUtil.toJson(newTasks))
	}, [setTasks])

	return [
		_tasks,
		_setTasks,
	] as const
}
