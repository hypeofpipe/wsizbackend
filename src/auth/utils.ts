import bcrypt = require('bcrypt-nodejs')

export async function hash(password: string) {
    return await bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

export async function compareHash(passwordOne: string, passwordSecond: string) {
    return await bcrypt.compareSync(passwordOne, passwordSecond)
}
