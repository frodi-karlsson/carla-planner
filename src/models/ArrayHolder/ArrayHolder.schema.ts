import {type ClazzOrModelSchema, createModelSchema, list, object} from 'serializr'
import {ArrayHolder} from './ArrayHolder.model'

export const arraySchema = <T>(schema: ClazzOrModelSchema<T>) => createModelSchema<ArrayHolder<T>>(ArrayHolder, {
	array: list(object(schema)),
})
