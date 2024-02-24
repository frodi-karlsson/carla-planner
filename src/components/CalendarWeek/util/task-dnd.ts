import {type DragSourceHookSpec, type DropTargetHookSpec} from 'react-dnd'
import {Task} from '@/models/Task/Task.model'
import {TimeUnit} from '@/models/TimeUnit/TimeUnit.model'
import {minuteHeight} from './constants'
import {type TaskContext} from '@/types/TaskContext'

type DropTargetUtil = {
	onDrop: NonNullable<DropTargetHookSpec<
	Task,
	void,
	unknown
	>['drop']>;
}

type DragTargetUtil = {
	onDrop: NonNullable<DragSourceHookSpec<
	Task,
	unknown,
	unknown
	>['end']>;
}

const modifyTaskOnDrop = async (
	task: Task,
	deltaTimeUnit: TimeUnit,
	taskContext: TaskContext,
): Promise<void> => {
	const newTask = Task.from({
		type: task.type,
		fields: {
			...task.fields,
			startTime: TimeUnit.from({
				minutes: task.fields.startTime.minutes + deltaTimeUnit.minutes,
			}),
		},
	})
	const {update} = taskContext
	update(task.fields.id, newTask)
}

export const dropTarget = (taskContext: TaskContext): DropTargetUtil => ({
	onDrop(item, monitor) {
		console.log('onDrop', item)
		const diff = monitor.getDifferenceFromInitialOffset()
		const delta = diff?.y

		if (!delta) {
			return
		}

		const deltaTimeUnit = TimeUnit.from({
			minutes: delta / minuteHeight,
		})

		void modifyTaskOnDrop(item, deltaTimeUnit, taskContext)
	},
})

export const dragSource = (): DragTargetUtil => ({
	onDrop(_, monitor) {
		const item = monitor.getItem()
		if (item) {
			console.log(item)
		}
	},
})
