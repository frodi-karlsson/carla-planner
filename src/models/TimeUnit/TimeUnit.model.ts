import {TimeUnit, type TimeUnitProps} from './TimeUnit.types'
import {createModelSchema, primitive, type ModelSchema, getDefaultModelSchema} from 'serializr'

export const timeUnitSchema = createModelSchema<TimeUnit>(TimeUnit, {
	minutes: primitive(),
}, context => TimeUnit.from({
	minutes: context.json.minutes as number,
}))
