function Events() {
	
	return {

		on: function (event, callback, context) {
			this.hasOwnProperty('events') || (this.events = {});
			this.events.hasOwnProperty(event) || (this.events[event] = []);
			this.events[event].push([callback, context]);
		},

		trigger: function (event) {
			if (!this.events) {
				return;
			}

          var tail = Array.prototype.slice.call(arguments, 1);
          var callbacks = this.events[event] || [];
          var callback;
          var context;
          
          for (var i = 0; i < callbacks.length; i++) {
            callback = callbacks[i][0];
            context = callbacks[i][1] === undefined ? this : callbacks[i][1];
            callback.apply(context, tail);
          }

      }
      
	};
  
}
var events = new Events();