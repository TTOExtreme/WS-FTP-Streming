var crp = require('crypto-js');

function sha512(mess) {
    let r = crp.SHA512(mess).toString();
    return r;
}


function crypt(key, mess) {
    let r = crp.AES.encrypt(mess, key).toString();
    return r;
}

function uncrypt(key, crypt_mess) {
    if (crypt_mess == "0") { return "0"; }
    let r = crp.AES.decrypt(crypt_mess, key);
    return r.toString(crp.enc.Utf8);
}

var rs = require('randomstring');
const ger_crypt = () => {
    return rs.generate({
        charset: 'VFRPRXh0cmVtZS1MdWNhc1JhbWFsaG9DYW1hcm90dG8tMTIvMDMvMTk5OC1HZW5lcmF0ZWQtaW4tMTA6MzMtMDMvMDQvMjAxOA',
        length: 32
    }).toString();
};

module.exports = { crypt, uncrypt, sha512, ger_crypt };