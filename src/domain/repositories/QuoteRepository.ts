import QuoteEntity from "../entities/QuoteEntity";
import QuoteFilter from "../filters/QuoteFilter";

export default interface QuoteRepository {
	findAll(filter: QuoteFilter): Promise<QuoteEntity[]>;
	delete(id: QuoteEntity["id"], transaction?: unknown): Promise<void>;
	create(quote: QuoteEntity, transaction?: unknown): Promise<void>;
}
