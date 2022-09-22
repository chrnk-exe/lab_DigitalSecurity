const { DataTypes } = require('sequelize');
const sequelize = require('../db/models/index').sequelize;

const Users = require('../db/models/user')(sequelize, DataTypes);
const Articles = require('../db/models/article')(sequelize, DataTypes);
const Comments = require('../db/models/comment')(sequelize, DataTypes);

module.exports = {
    Users,
    Articles,
    Comments,
};
