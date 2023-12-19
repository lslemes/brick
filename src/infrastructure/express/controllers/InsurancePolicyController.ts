import { NextFunction, Request, Response, Router } from "express";
import AddVehicleToInsurancePolicyUseCase from "../../../application/use-cases/AddVehicleToInsurancePolicyUseCase";
import CreateInsurancePolicyUseCase from "../../../application/use-cases/CreateInsurancePolicyUseCase";
import GetInsurancePolicyUseCase from "../../../application/use-cases/GetInsurancePolicyUseCase";
import RemoveVehicleFromInsurancePolicyUseCase from "../../../application/use-cases/RemoveVehicleFromInsurancePolicyUseCase";
import CreateInsurancePolicyOutput from "../../../domain/contracts/output/CreateInsurancePolicyOutput";
import GetInsurancePolicyOutput from "../../../domain/contracts/output/GetInsurancePolicyOutput";
import HttpStatusCode from "../HttpStatusCode";

export default class InsurancePolicyController {
	public readonly router = Router();

	constructor(
		private readonly addVehicleToInsurancePolicyUseCase: AddVehicleToInsurancePolicyUseCase,
		private readonly createInsurancePolicyUseCase: CreateInsurancePolicyUseCase,
		private readonly getInsurancePolicyUseCase: GetInsurancePolicyUseCase,
		private readonly removeVehicleFromInsurancePolicyUseCase: RemoveVehicleFromInsurancePolicyUseCase,
	) {
		this.initializeEndpoints();
	}

	private initializeEndpoints() {
		this.router.post("/:id/add-vehicle", this.addVehicleToInsurancePolicy.bind(this));
		this.router.post("/", this.createInsurancePolicy.bind(this));
		this.router.get("/:id", this.getInsurancePolicy.bind(this));
		this.router.post("/:id/remove-vehicle", this.removeVehicleFromInsurancePolicy.bind(this));
	}

	private async addVehicleToInsurancePolicy(req: Request, res: Response<void>, next: NextFunction) {
		try {
			await this.addVehicleToInsurancePolicyUseCase.execute({
				insurancePolicyId: String(req.params.id),
				quoteIds: req.body.quoteIds,
				vehicleId: req.body.vehicleId,
			});
			return res.status(HttpStatusCode.NO_CONTENT).end();
		} catch (error) {
			return next(error);
		}
	}

	private async createInsurancePolicy(req: Request, res: Response<CreateInsurancePolicyOutput>, next: NextFunction) {
		try {
			const insurancePolicy = await this.createInsurancePolicyUseCase.execute({
				proposalId: req.body.proposalId,
			});
			return res.status(HttpStatusCode.CREATED).json(insurancePolicy);
		} catch (error) {
			return next(error);
		}
	}

	private async getInsurancePolicy(req: Request, res: Response<GetInsurancePolicyOutput>, next: NextFunction) {
		try {
			const insurancePolicy = await this.getInsurancePolicyUseCase.execute({
				insurancePolicyId: String(req.params.id),
			});
			return res.status(HttpStatusCode.OK).json(insurancePolicy);
		} catch (error) {
			return next(error);
		}
	}

	private async removeVehicleFromInsurancePolicy(req: Request, res: Response<void>, next: NextFunction) {
		try {
			await this.removeVehicleFromInsurancePolicyUseCase.execute({
				insurancePolicyId: String(req.params.id),
				vehicleId: req.body.vehicleId,
			});
			return res.status(HttpStatusCode.NO_CONTENT).end();
		} catch (error) {
			return next(error);
		}
	}
}
