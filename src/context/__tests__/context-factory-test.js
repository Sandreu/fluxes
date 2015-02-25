jest.dontMock('../context-factory.js');

var contextFactory;

describe('Context', function() {
  
  beforeEach(function() {
    contextFactory = require('../context-factory.js');
  });
  
  it('should throw an error without a context name', function () {
    expect(function() {
      contextFactory({});
    }).toThrow(
      'createContext(...): Class specification must have a `name` attribute.'
    );
  });
  
  it('should init a context with name', function () {
    var context = contextFactory({
      name: 'Test'
    });
    
    expect(context.name).toBe('Test');
  });
})