import QuoteEntity from "../../domain/entities/QuoteEntity";
import QuoteFilter from "../../domain/filters/QuoteFilter";
import QuoteRepository from "../../domain/repositories/QuoteRepository";

export default class QuoteMockRepository implements QuoteRepository {
	findAll(filter: QuoteFilter): Promise<QuoteEntity[]> {
		throw new Error("Method not implemented.");
	}

	delete(id: string, transaction?: unknown): Promise<void> {
		throw new Error("Method not implemented.");
	}

	create(quote: QuoteEntity, transaction?: unknown): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
