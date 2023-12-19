import Validator from "../application/Validator";

export default class MockValidator implements Validator {
	validateInput(data: unknown): void {
		throw new Error("Method not implemented.");
	}
	validateOutput(data: unknown): void {
		throw new Error("Method not implemented.");
	}
}
