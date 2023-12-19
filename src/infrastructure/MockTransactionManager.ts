import TransactionManager from "../application/TransactionManager";

export default class MockTransactionManager implements TransactionManager {
	runInTransaction<T>(work: (transaction: unknown) => Promise<T>): Promise<T> {
		return work(null);
	}
}
