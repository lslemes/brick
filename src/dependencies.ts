import AddVehicleToInsurancePolicyUseCase from "./application/use-cases/AddVehicleToInsurancePolicyUseCase";
import CreateInsurancePolicyUseCase from "./application/use-cases/CreateInsurancePolicyUseCase";
import GetInsurancePolicyUseCase from "./application/use-cases/GetInsurancePolicyUseCase";
import RemoveVehicleFromInsurancePolicyUseCase from "./application/use-cases/RemoveVehicleFromInsurancePolicyUseCase";
import MockValidator from "./infrastructure/MockValidator";
import InsurancePolicyController from "./infrastructure/express/controllers/InsurancePolicyController";
import InsurancePolicyMockRepository from "./infrastructure/mockRepositories/InsurancePolicyMockRepository";
import ProposalMockRepository from "./infrastructure/mockRepositories/ProposalMockRepository";
import QuoteMockRepository from "./infrastructure/mockRepositories/QuoteMockRepository";
import VehicleMockRepository from "./infrastructure/mockRepositories/VehicleMockRepository";
import MockTransactionManager from "./infrastructure/mockTransactionManager";

const mockTransactionManager = new MockTransactionManager();
const mockValidator = new MockValidator();

// repositories
const insurancePolicyMockRepository = new InsurancePolicyMockRepository();
const proposalMockRepository = new ProposalMockRepository();
const quoteMockRepository = new QuoteMockRepository();
const vehicleMockRepository = new VehicleMockRepository();

// use cases
const addVehicleToInsurancePolicyUseCase = new AddVehicleToInsurancePolicyUseCase(
	mockTransactionManager,
	insurancePolicyMockRepository,
	quoteMockRepository,
	vehicleMockRepository,
	mockValidator,
);
const createInsurancePolicyUseCase = new CreateInsurancePolicyUseCase(
	proposalMockRepository,
	insurancePolicyMockRepository,
	mockValidator,
);
const getInsurancePolicyUseCase = new GetInsurancePolicyUseCase(insurancePolicyMockRepository, mockValidator);
const removeVehicleFromInsurancePolicyUseCase = new RemoveVehicleFromInsurancePolicyUseCase(
	mockTransactionManager,
	vehicleMockRepository,
	insurancePolicyMockRepository,
	quoteMockRepository,
	mockValidator,
);

// controllers
export const insurancePolicyController = new InsurancePolicyController(
	addVehicleToInsurancePolicyUseCase,
	createInsurancePolicyUseCase,
	getInsurancePolicyUseCase,
	removeVehicleFromInsurancePolicyUseCase,
);
