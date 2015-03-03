var glob = require('glob');
var path = require("path");
var contextFactory = require('../context/context-factory');

module.exports = {
  loadDirectory: function (folder) {
    glob.sync(folder + '/*').forEach(function (elt) {
      this.loadContext(elt);
    }, this);
  },
  loadContext: function (folder) {
    var context, contextSpec;
    try {
      contextSpec = require(folder);
    } catch (err) {
      var contextName = path.basename(folder);
      contextSpec = { name: contextName };
    }
    
    context = contextFactory(contextSpec);
    
    this.loadAggregatesFolder(context, folder + '/aggregates');
    this.loadCommandsFolder(context, folder + '/commands');
    
    return context;
  },
  loadAggregatesFolder: function (context, folder) {
    glob.sync(folder + '/**/*').forEach(function (elt) {
      var aggregateName = path.basename(elt, path.extname(elt));
      context.addAggregate(aggregateName, require(elt));
    });
  },
  loadCommandsFolder: function (context, folder) {
    glob.sync(folder + '/**/*').forEach(function (elt) {
      var commandName = path.basename(elt, path.extname(elt));
      context.addCommand(commandName, require(elt));
    });
  }
};