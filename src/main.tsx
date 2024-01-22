import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {testTasks} from './util/TestTasks'
import {type CustomWindow} from './types/CustomWindow'
import {taskUtil} from './util/TaskUtils'

const container = document.getElementById('root')

declare let window: CustomWindow

const setTestTasks = () => {
	const taskJson = taskUtil.toJson(testTasks)
	window.localStorage.setItem('CapacitorStorage.frodi-karlsson.carla-planner.tasks', taskJson)
}

window.setTestTasks = setTestTasks

window.setTestTasks()

const root = createRoot(container!)
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
