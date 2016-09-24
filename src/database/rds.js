'use strict'

const Sequelize = require('sequelize');

const conn = process.env.RDS_CONN;

var sequelize = new Sequelize(conn);

module.exports = sequelize