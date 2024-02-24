import React, {createContext, useEffect, useState} from 'react'
import {Route} from 'react-router-dom'
import {
	IonApp,
	IonRouterOutlet,
	setupIonicReact,
} from '@ionic/react'
import {IonReactRouter} from '@ionic/react-router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.scss'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import MainView from './pages/MainView/MainView'
import {useTasks} from './hooks/useTasks'
import {testTasks} from './util/TestTasks'

setupIonicReact()

const App: React.FC = () => {
	const taskHook = useTasks()
	const [, taskStorage, hasLoaded] = taskHook
	const [loaded, setLoaded] = useState(false)
	const taskContext = createContext(taskHook)

	useEffect(() => {
		const addTestTasks = async () => {
			for await (const task of testTasks) {
				await hasLoaded()
				taskStorage.addTask(task)
			}

			setLoaded(true)
		}

		void addTestTasks()
	}, [])

	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route exact path='/'>
						<taskContext.Provider value={taskHook}>
							<DndProvider
								backend={HTML5Backend}
							>
								<taskContext.Consumer>
									{taskContext =>
										<MainView taskContext={taskContext}/>
									}
								</taskContext.Consumer>
							</DndProvider>
						</taskContext.Provider>
					</Route>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
}

export default App
