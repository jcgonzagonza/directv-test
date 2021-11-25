class Server {
	private message: string;

	constructor(message: string) {
		this.message = message;
	}

	getMessage(): string {
		return this.message;
	}
}
const server = new Server('New Constructor');

console.log(server.getMessage());
