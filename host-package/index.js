const bson = require('bson');
const { getDependencyObject } = require('dependency-package');

const hostObject = {
  id: new bson.ObjectId(),
};

const dependencyObject = getDependencyObject();

hostObject.id.equals(dependencyObject.id);
