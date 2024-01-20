import {type Task, type TaskJsonObj} from '@/types/Task'
import {TimeUnit} from '@/util/TimeUnit'

export const taskUtil = {
	toJson(tasks: Task[]): string {
		const taskJsonObjs: TaskJsonObj[] = tasks.map(task => {
			const start = task.start.minutes
			const length = task.length.minutes

			const ret = {
				...task,
				start,
				length,
			}
			console.log('ret', ret)
			return ret
		})

		return JSON.stringify(taskJsonObjs)
	},
	fromJson(json: string): Task[] {
		const taskJsonObjs: TaskJsonObj[] = JSON.parse(json) as TaskJsonObj[]
		return taskJsonObjs.map(taskJsonObj => {
			const start = new TimeUnit(taskJsonObj.start)
			const length = new TimeUnit(taskJsonObj.length)

			return {
				...taskJsonObj,
				start,
				length,
			}
		})
	},
}
