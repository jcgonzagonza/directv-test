// bcrypt password
const bcrypt = require('bcrypt');

class Hash {
	static async getHash(pass) {
		const salt = await bcrypt.genSalt(10);
		// eslint-disable-next-line no-return-await
		return await bcrypt.hash(pass, salt);
	}
}

module.exports = Hash;
