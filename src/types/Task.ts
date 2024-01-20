export type TimeUnitType = {
	minutes: number;
	unix: number;
	timeString: string;
	add(other: TimeUnitType): TimeUnitType;
}

export type Task = {
	id: string;
	title: string;
	description?: string;
	start: TimeUnitType;
	length: TimeUnitType;
	color: string;
}
