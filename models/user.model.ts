import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Users extends Model { }

Users.init({
    // Id generado automaticamente
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    suburb: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zip: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    }
    //usertype id
}, {
    sequelize, modelName: "users",
});

export default Users;