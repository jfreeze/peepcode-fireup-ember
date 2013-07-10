App = Ember.Application.create({
    LOG_BINDINGS                  : true,
    LOG_TRANSITIONS               : true,
    LOG_TRANSITIONS_INTERNAL      : true, // Feel free to turn this off 
    LOG_VIEW_LOOKUPS              : true,
    LOG_ACTIVE_GENERATION         : true,
    LOG_STACKTRACE_ON_DEPRECATION : true 
});

App.Router.map(function() {
  this.resource('tables', function() {
    this.resource('table', {path: "/:table_id"});
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('tables');
  }
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('food').set('model', App.Food.find());
  }
});

App.TablesRoute = Ember.Route.extend({
  model: function() {
    return App.Table.find();
  }
});

// Commenting this out produces an error in the logs, but does not affect operation
App.TableController = Ember.ObjectController.extend();

App.FoodController = Ember.ArrayController.extend({
  needs: ['table'],
  addFood: function(food) {
    var table = this.controllerFor('table').get('model'),
    tabItems = table.get('tab.tabItems');
    // var tabItems = this.get('table.tab.tabItems');

    tabItems.createRecord({
      food: food,
      cents: food.get('cents')
    });
  }
});

// Auto Generated
// App.TableRoute = Ember.Route.extend({
//   model: function(params) {
//     return App.Table.find(params.table_id);
//   },
// });

Ember.Handlebars.registerBoundHelper('money', function(value){
  return(value % 100 === 0 ? value / 100 + '.00' :
  parseInt(value / 100, 10) + '.' + value % 100);
});