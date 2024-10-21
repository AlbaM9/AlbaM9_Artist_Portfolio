// app/api/items/route.ts
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

export async function GET() {
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
            GROUP BY 
                i.id
            ORDER BY 
                i.id;
        `);

        const items = rows.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description,
            detail: row.detail,
            category: row.category,
            linkThingiverse: row.linkThingiverse,
            quotes: row.quotes ? row.quotes.split(',') : [],
            authors: row.authors ? row.authors.split(',') : [],
            images: row.images && row.image_ids ? row.images.split(',').map((url: string, index: number) => ({
                id: row.image_ids.split(',')[index],
                url: url.trim(),
            })) : [],
            tags: row.tags ? row.tags.split(',') : [],
        }));

        if (items.length === 0) {
            return NextResponse.json({ message: 'No items found' }, { status: 404 });
        }

        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        console.error('Error al obtener ítems:', error);
        return NextResponse.json({ error: 'Error al obtener items' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
