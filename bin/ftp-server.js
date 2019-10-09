const ftp = require("basic-ftp")
const fs = require("fs")

example()

async function example() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "localhost",
            user: "tto",
            password: "123",
            secure: true
        })
        console.log(await client.list())
        await client.upload(fs.createReadStream("README.md"), "README.md")
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}