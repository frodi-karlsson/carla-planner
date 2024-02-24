import {renderHook} from '@testing-library/react'
import {useStorage} from './useStorage'
import {act} from 'react-dom/test-utils'
import {createModelSchema, object, primitive} from 'serializr'

describe('useStorage', () => {
	const mockStorage: unknown[] = []
	beforeEach(() => {
		mockStorage.forEach(() => mockStorage.pop())
	})

	class NestTestObject {
		constructor(public c: string) {
			this.c = c
		}
	}

	class TestObject {
		constructor(public id?: string, public a?: string, public b?: NestTestObject) {	}
	}

	test('useStorage get and set a value', async () => {
		const obj = new TestObject('test', 'a', {c: 'c'})
		const bSchema = createModelSchema<NestTestObject>(NestTestObject, {
			c: primitive(),
		})
		const schema = createModelSchema<TestObject>(TestObject, {
			id: primitive(),
			a: primitive(),
			b: object(bSchema),
		})
		const {result} = renderHook(() => useStorage('test', schema))
		const [storage, setStorage, loaded] = result.current
		await loaded()
		act(() => {
			setStorage({})
		})
		setTimeout(() => {
			expect(storage).toEqual({})
		}, 10)
		act(() => {
			setStorage(obj)
		})
		setTimeout(() => {
			expect(storage).toEqual(obj)
		}, 10)
	})
})
