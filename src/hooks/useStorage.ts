import {Preferences} from '@capacitor/preferences'
import {deserialize, serialize, type ClazzOrModelSchema} from 'serializr'
const {get: getPreferences, set: setPreferences} = Preferences

import {useEffect, useRef, useState, type Dispatch, type SetStateAction} from 'react'

const appName = 'frodi-karlsson.carla-planner'

type SetValue<T> = Dispatch<SetStateAction<T>>

function getFullKey(key: string) {
	return `${appName}.${key}`
}

export async function init<T>(key: string, schema: ClazzOrModelSchema<T>) {
	const fromStorage = await readStorage<T>(key, schema)
	return fromStorage
}

export function useStorage<T>(key: string, schema: ClazzOrModelSchema<T>): [T | undefined, SetValue<T | undefined>, () => Promise<void>] {
	const [storedValue, setStoredValue] = useState<T | undefined>()
	const loadedRef = useRef(false)

	useEffect(() => {
		void readStorage<T>(key, schema).then(res => {
			if (res) {
				setStoredValue(res)
			}

			loadedRef.current = true
		})
	}, [])

	const setValue = (value: SetStateAction<T | undefined>) => {
		if (!loadedRef.current) {
			console.error('Tried to set value before storage was loaded')
			return
		}

		loadedRef.current = false
		const newValue = value instanceof Function ? value(storedValue) : value
		setStoredValue(newValue)
		void setStorage<T | undefined>(getFullKey(key), newValue, schema).then(() => {
			loadedRef.current = true
		})
	}

	const waitUntilLoaded = async () => {
		if (!loadedRef.current) {
			await new Promise(resolve => {
				const interval = setInterval(() => {
					if (loadedRef.current) {
						clearInterval(interval)
						resolve(undefined)
					}
				}, 100)
			})
		}
	}

	return [storedValue, setValue, waitUntilLoaded]
}

export async function readStorage<T>(key: string, schema: ClazzOrModelSchema<T>): Promise<T | undefined> {
	const fromStorage = await getPreferences({key: getFullKey(key)})
	if (!fromStorage.value) {
		return undefined
	}

	return deserialize(schema, JSON.parse(fromStorage.value))
}

export async function setStorage<T>(key: string, value: T, schema: ClazzOrModelSchema<T>): Promise<boolean> {
	try {
		await setPreferences({key, value: JSON.stringify(serialize(schema, value))})
		return true
	} catch (error) {
		console.warn(`Error setting storage key "${key}":`, error)
		return false
	}
}
