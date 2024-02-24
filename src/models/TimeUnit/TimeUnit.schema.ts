import {TimeUnit} from './TimeUnit.model'
import {createModelSchema, primitive} from 'serializr'

export const timeUnitSchema = createModelSchema<TimeUnit>(TimeUnit, {
	minutes: primitive(),
}, context => TimeUnit.from({
	minutes: context.json.minutes as number,
}))
