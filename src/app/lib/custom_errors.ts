export class AuthError extends Error {
	constructor(message?: string) {
		super(message);
		Object.setPrototypeOf(this, AuthError.prototype);
		this.name = "AuthError";
	}
}