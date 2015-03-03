jest.dontMock('../loader.js');
jest.dontMock('glob');
jest.dontMock('path');

var loader;
var testfolder = __dirname + '/__test_contexts';
var context1 = testfolder + '/context1';
var context2 = testfolder + '/context2';


var contextFactory
    
describe('Loader', function() {
  
  beforeEach(function() {
    loader = require('../loader.js');
    contextFactory = require('../../context/context-factory');
    contextFactory.mockImplementation(function () {
      return {
        addCommand: jest.genMockFunction(),
        addAggregate: jest.genMockFunction()
      };
    });
  });
  
  
  describe('loadDirectory', function() {
    it('should load context directories', function () {
      var fs = require('fs');
      var mock = jest.genMockFunction();
      
      loader.loadContext = mock;
      loader.loadDirectory(testfolder);
      
      expect(mock).toBeCalledWith(testfolder + '/context1');
    });
  });
  
  describe('loadContext', function() {
    
    it('should load context with directory name', function () {
      loader.loadContext(context1);
      
      expect(contextFactory).toBeCalledWith({name:'context1'});
    });
    
    it('should load context with index.js returned object', function () {
      loader.loadContext(context2);
      
      expect(contextFactory).toBeCalledWith({name:'internal_context_name'});
    });
    
    it('should call loadCommandsFolder for the context', function () {
      var mock = jest.genMockFunction();
      
      loader.loadCommandsFolder = mock;
      var context = loader.loadContext(context1);
      
      expect(mock).toBeCalledWith(context, context1 + '/commands');
    });
  });
  
  describe('loadCommandsFolder', function() {
    var context;
    
    beforeEach(function () {
      context = contextFactory();
    });
    
    it('should add commands files on context', function () {
      var command1 = require(context1 + '/commands/command1.js');
      var command2 = require(context1 + '/commands/command2.js');
      
      loader.loadCommandsFolder(context, context1 + '/commands');
      
      expect(context.addCommand).toBeCalledWith('command1', command1);
      expect(context.addCommand).toBeCalledWith('command2', command2);
    });
  });
})