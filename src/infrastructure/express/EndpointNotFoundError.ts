export default class EndpointNotFoundError extends Error {
	constructor(method: string, route: string) {
		super(`Endpoint ${method} ${route} not found.`);
	}
}
