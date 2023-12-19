import QuoteEntity from "../entities/QuoteEntity";
import QuoteFilter from "../filters/QuoteFilter";

export default interface QuoteRepository {
	findById(id: QuoteEntity["id"]): Promise<QuoteEntity | null>;
	findAll(filter: QuoteFilter): Promise<QuoteEntity[]>;
	delete(id: QuoteEntity["id"], transaction?: unknown): Promise<void>;
}
