
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
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
    user_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    timestamp: {
      type: DataTypes.DATE,
      notNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreginKey: {
        allowNull: false,
      },
    });
  };
  return Order;
};
