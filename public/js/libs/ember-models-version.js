App.Table = Ember.Model.extend({
  id: Ember.attr()
});

App.Food = Ember.Model.extend({
  name: Ember.attr('string'),
  imageUrl: Ember.attr('string'),
  cents: Ember.attr('number')
});

App.Food.adapter = Ember.Adapter.create({
  findAll: function(klass, records) {
    var url = "/food.json";
    $.getJSON(url, function(data) { records.load(klass, data.food); })

  }
})

App.Table.adapter = Ember.Adapter.create({
  find: function(klass, id) {
    var url = "/tables/"+id;
    var table = App.Table.create();

    $.getJSON(url)
      .then(function(data) {
        table.setProperties(data);
      });

    table.set("id",id); // <-- THIS

    return table; 
  },

  findAll: function(klass, records) {
    var url = "/tables.json";
    $("#tables-error").html('');
    $.getJSON(url)
      .then(function(data) { records.load(klass, data.tables); })
      .then(null, function(err) {
        var msg = "Error GET: "+url+"\n"+"Status: "+err.status+"\n"+err.statusText;
        $("#tables-error").html(msg);
      })
  }

});

