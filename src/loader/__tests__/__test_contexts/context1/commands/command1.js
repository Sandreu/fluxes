module.exports = {
  aggregates: ['Agg1', 'Agg2'],
  payload: {
    foo: function () { return true; }
  },
  process: function () {
    this.$emitDomainEvent('CommandHandled', this.payload);
  }
};