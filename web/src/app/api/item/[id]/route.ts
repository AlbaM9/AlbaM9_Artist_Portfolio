// app/api/detail/[id]/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createDBConnection() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
    });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
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
                GROUP_CONCAT(DISTINCT img.image_url ORDER BY img.id) AS images,
                GROUP_CONCAT(DISTINCT img.id ORDER BY img.id) AS image_ids,
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
                i.id = ?
            GROUP BY 
                i.id;
        `, [id]);

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }

        const item = {
            id: rows[0].id,
            title: rows[0].title,
            description: rows[0].description,
            detail: rows[0].detail,
            category: rows[0].category,
            linkThingiverse: rows[0].linkThingiverse,
            quotes: rows[0].quotes ? rows[0].quotes.split(',') : [],
            authors: rows[0].authors ? rows[0].authors.split(',') : [],
            images: rows[0].images && rows[0].image_ids ? rows[0].images.split(',').map((url: string, index: number) => ({
                id: rows[0].image_ids.split(',')[index],
                url: url.trim(),
            })) : [],
            tags: rows[0].tags ? rows[0].tags.split(',') : [],
        };

        return NextResponse.json(item, { status: 200 });
    } catch (error) {
        console.error('Error al obtener el ítem:', error);
        return NextResponse.json({ error: 'Error al obtener el ítem' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
