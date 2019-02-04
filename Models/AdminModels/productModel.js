import sequelize from '../../db';
import CONSTANTS from '../../_CONSTANTS';
import QUERIES from '../rawqueries';

async function deleteProduct(productId) {
  sequelize.query(`${QUERIES.deleteProductById}`, {
    replacements: { productId },
    type: sequelize.QueryTypes.DELETE,
  });
}

async function addProduct(toBeInserted) {
  return sequelize.query(`${QUERIES.insertIntoProducts}`, {
    replacements: {
      name: toBeInserted.name,
      description: toBeInserted.description,
      price: toBeInserted.price,
      vat_rate: CONSTANTS.vatRate,
      discount: toBeInserted.discount,
      tags: JSON.stringify(toBeInserted.tags),
      images: JSON.stringify(toBeInserted.images),
      category_id: toBeInserted.category_id,
    },
    type: sequelize.QueryTypes.INSERT,
  });
}

async function addToProductProperties(toBeInserted, productId) {
  const productProperties = toBeInserted;
  return Promise.all(
    productProperties.map(props => sequelize.query(`${QUERIES.insertIntoProductProperties}`, {
      replacements: {
        category_id: props.category_id,
        property_name: props.property_name,
        units: props.units,
        property_value: props.property_value,
        productId,
      },
    })),
  );
}

async function updateProduct(toInsert, productId) {
  await sequelize.query(`${QUERIES.updateProduct}`, {
    replacements: {
      productId,
      name: toInsert.name,
      description: toInsert.description,
      price: toInsert.price,
      vat_rate: CONSTANTS.vatRate,
      discount: toInsert.discount,
      tags: JSON.stringify(toInsert.tags),
      images: JSON.stringify(toInsert.images),
      category_id: toInsert.category_id,
    },
    type: sequelize.QueryTypes.INSERT,
  });
}

async function updateProductProperties(toInsert, productId) {
  // delete all the product properties
  await sequelize.query(`${QUERIES.deleteProductProperties}`, {
    replacements: { productId },
    type: sequelize.QueryTypes.DELETE,
  });
  // after deletion put it back in the database
  await Promise.all(
    toInsert.map(props => sequelize.query(`${QUERIES.insertIntoProductProperties}`, {
      replacements: {
        category_id: props.category_id,
        property_name: props.property_name,
        units: props.units,
        property_value: props.property_value,
        productId,
      },
    })),
  );
}

const productModel = {
  addProduct,
  addToProductProperties,
  updateProduct,
  updateProductProperties,
  deleteProduct,
};
export default productModel;
