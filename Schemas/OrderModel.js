
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_num: {
      type: DataTypes.UUID,
      notNull: true,
    },
    order_status: {
      type: DataTypes.BOOLEAN,
      notNull: true,
    },
    special_instructions: {
      type: DataTypes.STRING,
      notNull: true,
    },
    /* eslint-disable */
    'created_at': {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    'updated_at': {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    },
  /* eslint-enable */
  },
  {
    underscored: true,
    timestamps: true,
  });
  Order.associate = (models) => {
    Order.hasMany(models.ordered_items, {
      onDelete: 'CASCADE',
      foreginKey: {
        // allowNull: false,
      },
    });
  };
  return Order;
};