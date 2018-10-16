import bcrypt from "bcrypt-nodejs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const Helper = {

	hashPassword(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
	},

	comparePassword(hashPassword, password) {
		return bcrypt.compareSync(password, hashPassword)
	},

	isValidEmail(email) {
		return /\S+@\S+\.\S+/.test(email)
	},
	isAnInteger(id) {
		return /^\d+$/.test(id)
	},
	sanitizeInput(input) {
		return input.replace(/[^\w\s]/gi, "")
	},
	generateToken(id, admin) {
		const token = jwt.sign({
			userId: id,
			isAdmin: admin
		},
		process.env.SECRET, { expiresIn: "7d" }
		)
		return token
	}
}

export default Helper
