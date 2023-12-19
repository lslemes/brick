import VehicleEntity from "../../domain/entities/VehicleEntity";
import VehicleRepository from "../../domain/repositories/VehicleRepository";

export default class VehicleMockRepository implements VehicleRepository {
	findById(id: string): Promise<VehicleEntity | null> {
		throw new Error("Method not implemented.");
	}
}
