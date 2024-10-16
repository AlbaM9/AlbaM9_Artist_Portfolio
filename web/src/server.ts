import express, { Request, Response } from 'express';
import next from 'next';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();



async function createDBConnection() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
    });
}

interface Item {
    id: number;
    title: string;
    description: string;
    detail: string;
    category?: string;
    linkThingiverse?: string;
    quotes?: string[];
    authors?: string[];
    images?: string[];
    tags?: string[];
}

app.prepare().then(() => {
    const server = express();
    server.use(express.json());


    server.get('/api/items', async (req: Request, res: Response): Promise<void> => {
        let connection;

        try {
            connection = await createDBConnection();
            const [rows]: [mysql.RowDataPacket[], any] = await connection.query(`
             SELECT 
                    i.id,
                    i.title,
                    i.description,
                    i.detail,
                    i.category,
                    i.linkThingiverse,
                    GROUP_CONCAT(DISTINCT q.quote) AS quotes,
                    GROUP_CONCAT(DISTINCT q.author) AS authors,
                    GROUP_CONCAT(DISTINCT img.image_url ORDER BY img.id) AS images,  -- Ordenar por id aquí
                    GROUP_CONCAT(DISTINCT img.id ORDER BY img.id) AS image_ids,       -- Asegurar el mismo orden
                    GROUP_CONCAT(DISTINCT t.tag) AS tags
                FROM 
                    Items i
                LEFT JOIN 
                    Quotes q ON i.id = q.item_id
                LEFT JOIN 
                    Images img ON i.id = img.item_id
                LEFT JOIN 
                    Item_Tags it ON i.id = it.item_id
                LEFT JOIN 
                    Tags t ON it.tag_id = t.id
                GROUP BY 
                    i.id
                ORDER BY 
                    i.id;
            `);

            const items: Item[] = rows.map(row => ({
                id: row.id,
                title: row.title,
                description: row.description,
                detail: row.detail,
                category: row.category,
                linkThingiverse: row.linkThingiverse,
                quotes: row.quotes || '',
                authors: row.authors || '',
                images: row.images && rows[0].image_ids ? row.images.split(',').map((url: string, index: number) => ({
                    id: row.image_ids.split(',')[index], // Obtiene el ID correspondiente de image_ids
                    url: url.trim() // Agrega la URL de la imagen
                })) : [], // Si no hay imágenes, devuelve un array vacío
                tags: row.tags ? row.tags.split(',') : []
            }));




            if (items.length === 0) {
                res.status(404).json({ message: 'No items found' });
                return;
            }


            res.status(200).json(items);


        } catch (error) {
            console.error('Error al obtener ítems:', error);
            res.status(500).json({ error: 'Error al obtener items' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    });

    server.get('/api/detail/:id', async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        let connection;

        try {
            connection = await createDBConnection();
            const [rows]: [mysql.RowDataPacket[], any] = await connection.query(`
              SELECT 
                    i.id,
                    i.title,
                    i.description,
                    i.detail,
                    i.category,
                    i.linkThingiverse,
                    GROUP_CONCAT(DISTINCT q.quote) AS quotes,
                    GROUP_CONCAT(DISTINCT q.author) AS authors,
                    GROUP_CONCAT(DISTINCT img.image_url ORDER BY img.id) AS images,  -- Ordenar por id aquí
                    GROUP_CONCAT(DISTINCT img.id ORDER BY img.id) AS image_ids,       -- Asegurar el mismo orden
                    GROUP_CONCAT(DISTINCT t.tag) AS tags
                FROM 
                    Items i
                LEFT JOIN 
                    Quotes q ON i.id = q.item_id
                LEFT JOIN 
                    Images img ON i.id = img.item_id
                LEFT JOIN 
                    Item_Tags it ON i.id = it.item_id
                LEFT JOIN 
                    Tags t ON it.tag_id = t.id
                     WHERE 
                i.id = ?  -- Asegúrate de filtrar por el ID
                GROUP BY 
                    i.id
                ORDER BY 
                    i.id;
            `, [id]);

            if (rows.length === 0) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }


            const item = {
                id: rows[0].id,
                title: rows[0].title,
                description: rows[0].description,
                detail: rows[0].detail,
                category: rows[0].category,
                linkThingiverse: rows[0].linkThingiverse,
                quote: rows[0].quotes || '', // Asegúrate de que estás usando quotes y author correctamente
                author: rows[0].authors || '',
                images: rows[0].images && rows[0].image_ids ? rows[0].images.split(',').map((url: string, index: number) => ({
                    id: rows[0].image_ids.split(',')[index], // Esto debe ser el mismo índice
                    url: url.trim()
                })) : [],
                tags: rows[0].tags ? rows[0].tags.split(',') : []
            };


            res.status(200).json(item);
        } catch (error) {
            console.error('Error al obtener el ítem:', error);
            res.status(500).json({ error: 'Error al obtener el ítem' });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    });


    server.all('*', (req: Request, res: Response) => {
        return handle(req, res);
    });

    server.listen(3000, (err?: any) => {
        if (err) throw err;
        console.log('Server ready on http://localhost:3000');
    });
});
