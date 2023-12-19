import VehicleEntity from "../entities/VehicleEntity";

export default interface VehicleRepository {
	findById(id: VehicleEntity["id"]): Promise<VehicleEntity | null>;
}
