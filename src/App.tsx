import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {
	IonApp,
	IonRouterOutlet,
	setupIonicReact,
} from '@ionic/react'
import {IonReactRouter} from '@ionic/react-router'
import {ellipse, square, triangle} from 'ionicons/icons'
import Tab1 from './pages/Tab1'

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

setupIonicReact()

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				<Route exact path='/'>
					<DndProvider
						backend={HTML5Backend}
					>
						<MainView />
					</DndProvider>
				</Route>
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
)

export default App
