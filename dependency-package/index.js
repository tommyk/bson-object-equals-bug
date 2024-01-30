const bson = require('bson');

const getDependencyObject = () => ({
  id: new bson.ObjectId(),
})

module.exports = { getDependencyObject };