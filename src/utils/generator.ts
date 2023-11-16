import { PlannerUnit } from "../types/PlannerUnit";

export class Generators {
  static generateId(units: PlannerUnit[]): string {
    let id = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    while (units.some((unit) => unit.id === id)) {
      id = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    }
    return id;
  }
}
