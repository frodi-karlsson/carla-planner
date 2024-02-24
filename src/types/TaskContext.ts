import {type useStorage} from '@/hooks/useStorage'
import {type Task} from '@/models/Task/Task.model'

export type TaskContext = ReturnType<typeof useStorage<Task>>
