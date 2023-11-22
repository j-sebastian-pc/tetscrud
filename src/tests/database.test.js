const mysql = require('mysql2/promise');

async function insertProduct(connection, product) {
 try {
    await connection.execute(
      'INSERT INTO productos (nombre, precio) VALUES (?, ?)',
      [product.nombre, product.precio]
    );
    return true; // Éxito en la inserción
 } catch (error) {
    throw error;
 }
}

async function updateProduct(connection, productId, newPrice) {
 try {
    await connection.execute(
      'UPDATE productos SET precio = ? WHERE id = ?',
      [newPrice, productId]
    );
    return true; // Éxito en la actualización
 } catch (error) {
    throw error;
 }
}

async function deleteProduct(connection, productId) {
 try {
    await connection.execute('DELETE FROM productos WHERE id = ?', [productId]);
    return true; // Éxito en la eliminación
 } catch (error) {
    throw error;
 }
}

describe('Operaciones CRUD de productos', () => {
 let connection;

 beforeAll(async () => {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'productos', // Utiliza la base de datos principal
    });
    await connection.beginTransaction();
 });

 afterAll(async () => {
    await connection.rollback();
    await connection.end();
 });

 it('Debería insertar un nuevo producto', async () => {
    const newProduct = {
      nombre: 'Nuevo ',
      precio: 99.99,
    };

    const success = await insertProduct(connection, newProduct);
    expect(success).toBe(true);
 });

 it('Debería actualizar el precio de un producto', async () => {
    const productId = 11; // ID de un producto existente
    const newPrice = 129.99;

    const success = await updateProduct(connection, productId, newPrice);
    expect(success).toBe(true);
 });

 it('Debería eliminar un producto', async () => {
    const productId = 1; // ID de un producto existente

    const success = await deleteProduct(connection, productId);
    expect(success).toBe(true);
 });

 // ... Más pruebas
});