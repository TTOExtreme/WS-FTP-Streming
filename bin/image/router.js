const Router = require('koa-router');
const static = require('koa-static');

const fs = require("fs");
const getStat = require('util').promisify(fs.stat);
const path = require('path')

const router = new Router();
//response.sendFile(path.join(__dirname + '/../../ftp/teste/img.png'))
router.get('*', async (req, res) => {
    const filePath = path.join(__dirname + '/../../ftp/teste/img.png');
    /*
        this.type = "image/png";
        this.body = fs.readFileSync(filePath);
        //const stat = await getStat(filePath);
        //  console.log(stat);
    
        // informações sobre o tipo do conteúdo e o tamanho do arquivo
        /*res.writeHead(200, {
            'Content-Type': 'img/png',
            'Content-Length': stat.size
        });
    
        const stream = fs.createReadStream(filePath, { highWaterMark });
    
        // só exibe quando terminar de enviar tudo
        stream.on('end', () => console.log('acabou'));
    
        // faz streaming do audio 
        stream.pipe(res);
        //*/
});

module.exports = router;