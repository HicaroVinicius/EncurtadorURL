
import pool from '../dbconfig/dbconnector';
import makeid from '../helpers/makeid';

class EncurtadorController {

    public async save(req: any, res: any) {
        try {
            // Recuperando url do body
            const url = req.body.url;
            if(!url){
                res.send('URL não identificada no body. Por favor, tente novamente!');
            }
            // Criando o URL encurtada
            let id = makeid();
            // Criando conexão com banco de dados
            const client = await pool.connect();
            // Criando tabela, caso ainda não exista
            const createSQL =  {
                text: `CREATE TABLE IF NOT EXISTS
                    encurtador
                    (
                    id serial NOT NULL,
                    encurtado text NOT NULL,
                    time   timestamp    NOT NULL,
                    url text NOT NULL,
                    PRIMARY KEY (id)
                    );`
            };
            await client.query(createSQL);

            // Buscando se já existe uma URL encurtada com o mesmo valor da gerada
            // e que ainda esteja válida (dentro do espaço de tempo de vida útil)
            const sql = "SELECT * FROM encurtador WHERE encurtado = $1 and time >= $2";
            const { rows } = await client.query(sql,[id, new Date(Date.now() - 1000 * 60 * 5).toISOString()]);
            if(rows.length > 0){
                // Se já existir uma url encurtado com mesmo identificador, faz uma segunda tentativa
                id = makeid();
                const { rows } = await client.query(sql,[id, new Date(Date.now() - 1000 * 60 * 5).toISOString()]);
                if(rows.length > 0){
                    // Fechando conexão com o banco de dados
                    client.release();
                    res.send('URL gerada já existe. Por favor, tente novamente!');
                }
            }

            // Inserindo informações para redirecionamento no banco de dados
            const insertUrl = await client.query(`INSERT INTO encurtador
            (encurtado, time, url)
            VALUES ($1, $2, $3) returning *`, [id, new Date(Date.now()).toISOString(), url]);
            
            // Fechando conexão com o banco de dados
            client.release();

            // Conferindo se as informações foram salvas no banco de dados
            if(insertUrl.rows.length > 0){
                const baseURL = process.env.BASE_URL || 'http://localhost:8081/';
                res.send({ newUrl: `${baseURL}${id}`});
            }else{
                res.send('Ocorreu um erro. Por favor, tente novamente!');
            }

        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

}

export default EncurtadorController;