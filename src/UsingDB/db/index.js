const pgp = require("pg-promise")()
const dotenv = require("dotenv")

dotenv.config()

const db = pgp(process.env.DATABASE_URL)

export default {

	query(text, params){
  
		return new Promise((resolve, reject) => {
			db.any(text, params)
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
}
