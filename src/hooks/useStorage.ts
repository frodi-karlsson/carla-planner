import {useEffect, useState} from 'react'
import {Preferences} from '@capacitor/preferences'
const {get: getPreferences, set: setPreferences} = Preferences

const appName = 'frodi-karlsson.carla-planner'

const getStorage = async<D>(key: string, defaultValue: string | D) => {
	const {value} = await getPreferences({
		key: `${appName}.${key}`,
	})
	let returnValue: string | D | undefined
	try {
		if (value) {
			returnValue = JSON.parse(value) as D
		}
	} catch (e) {
		returnValue = value ?? undefined
	}

	return returnValue ?? defaultValue
}

export const useStorage = <D>(key: string, defaultValue: D) => {
	const [value, setValue] = useState<D>()

	const setFromString = (value: string) => {
		try {
			setValue(JSON.parse(value) as D | undefined ?? defaultValue)
		} catch (e) {
			setValue(value as D)
		}
	}

	useEffect(() => {
		if (value ?? typeof value === 'string') {
			let newValue: string | D
			try {
				newValue = JSON.stringify(value)
			} catch (e) {
				newValue = value
			}

			void setPreferences({
				key: `${appName}.${key}`,
				value: newValue as string,
			})
		} else {
			void getStorage(key, defaultValue).then(v => {
				setValue(typeof v === 'string' ? JSON.parse(v) as D : v)
			})
		}
	}, [key, value, defaultValue])

	return [value, setFromString] as const
}
