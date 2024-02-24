import {Preferences} from '@capacitor/preferences'
import {deserialize, serialize, type ClazzOrModelSchema} from 'serializr'
const {get: getPreferences, set: setPreferences} = Preferences

import {useCallback, useEffect, useRef, useState} from 'react'
import {arraySchema} from '@/models/ArrayHolder/ArrayHolder.schema'
import {type ArrayHolder} from '@/models/ArrayHolder/ArrayHolder.model'

const appName = 'frodi-karlsson.carla-planner'

function getFullKey(key: string) {
	return `${appName}.${key}`
}

export function useStorage<T>(key: string, schema: ClazzOrModelSchema<T>, id: (v: T) => string): {current: T[]; add: (value: T) => void; remove: (value: T) => void; update: (id: string, value: T) => void} {
	const [storedValue, setStoredValue] = useState<T[]>([])
	const loadedRef = useRef(false)

	const waitForLoad = async () => {
		if (!loadedRef.current) {
			await new Promise<void>(resolve => {
				const interval = setInterval(() => {
					if (loadedRef.current) {
						clearInterval(interval)
						resolve()
					}
				}, 10)
			})
		}
	}

	useEffect(() => {
		void readStorage<T>(key, schema).then(res => {
			setStoredValue(res)
			loadedRef.current = true
		})
	}, [])

	const addValue = useCallback((value: T) => {
		void waitForLoad().then(() => {
			setStoredValue(old => {
				if (!old?.some(v => id(v) === id(value))) {
					return [...(old ?? []), value]
				}

				return old
			})
		})
	}, [])

	const removeValue = useCallback((value: T) => {
		void waitForLoad().then(() => {
			setStoredValue(old => (old ?? []).filter(v => id(v) !== id(value)))
		})
	}, [])

	const updateValue = useCallback((oId: string, value: T) => {
		void waitForLoad().then(() => {
			setStoredValue(old => (old ?? []).map(v => id(v) === oId ? value : v))
		})
	}, [])

	useEffect(() => {
		void setStorage(key, storedValue, schema)
	}, [storedValue])

	return {current: storedValue, add: addValue, remove: removeValue, update: updateValue}
}

export async function readStorage<T>(key: string, schema: ClazzOrModelSchema<T>): Promise<T[]> {
	const fromStorage = await getPreferences({key: getFullKey(key)})
	if (!fromStorage.value) {
		return []
	}

	return deserialize(arraySchema(schema), JSON.parse(fromStorage.value)).array
}

export async function setStorage<T>(key: string, value: T[], schema: ClazzOrModelSchema<T>): Promise<boolean> {
	try {
		const serialized: unknown = serialize<ArrayHolder<T>>(arraySchema<T>(schema), {array: value})
		const json = JSON.stringify(serialized)
		await setPreferences({key: getFullKey(key), value: json})
		return true
	} catch (error) {
		return false
	}
}
