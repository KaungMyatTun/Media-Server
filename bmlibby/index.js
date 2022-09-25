let bcrypt = require('bcrypt');
let encode = (plainPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(plainPassword, salt, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });
    })
}

let compare = (plainPassword, hasPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hasPassword, (error, bool) => {
            if (error) reject(err);
            resolve(bool);
        })
    })
}
module.exports = {
    encode,
    compare
}