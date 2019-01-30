import Product from '../../Models/ProductModel';
import sequelize from '../../db';

const getAllProducts = async (req, res) => {
  try {
    const products = await sequelize.query('SELECT * FROM products', { model: Product });
    res.status(200).send(products);
  } catch (err) {
    //  eslint-disable-next-line
    console.error('Error in getAllProducts Controller =>', err);
    res.status(401).send('Impossible to retrieve products.');
  }
};

export default getAllProducts;