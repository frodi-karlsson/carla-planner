export type TimeUnitType = {
	minutes: number;
	unix: number;
}

export type Task = {
	id: string;
	title: string;
	description?: string;
	start: TimeUnitType;
	length: TimeUnitType;
	color: string;
}
