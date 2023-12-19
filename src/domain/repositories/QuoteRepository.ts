import QuoteEntity from "../entities/QuoteEntity";

export default interface QuoteRepository {
	findById(id: QuoteEntity["id"]): Promise<QuoteEntity | null>;
}
