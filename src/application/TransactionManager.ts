export default interface TransactionManager {
	runInTransaction<T>(work: (transaction: unknown) => Promise<T>): Promise<T>;
}
