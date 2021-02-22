import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import encurtadorRouter from './routers/encurtadorRouter';
import pool from './dbconfig/dbconnector';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
    }

    private dbConnect() {
        pool.connect(function (err, client, done) {
            if (err) throw new Error(err.message);
            console.log('Connected');
          }); 
    }

    private routerConfig() {
        this.app.use('/encurtador', encurtadorRouter);
        this.app.get('/:id', async function(req, res) {
            const id = req.params.id;
            if(id){
                // Criando conexão com banco de dados
                const client = await pool.connect();
                const sql = "SELECT * FROM encurtador WHERE encurtado = $1 and time >= $2";
                const { rows } = await client.query(sql,[id, new Date(Date.now() - 1000 * 60 * 5).toISOString()]);
                // Fechando conexão com o banco de dados
                client.release();
                if(rows.length > 0){
                    res.redirect(rows[0].url);
                }else{
                    res.send('URL inválida. Cada URL gerada tem vida útil de 5 minutos');
                }
            }else{
                res.send('URL não encontrada nos parametros. Por favor, tente novamente!');
            }
          });
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;