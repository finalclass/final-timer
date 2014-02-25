# Final-Timer

Timer class (wrapper for setTimeout and setInterval). Based on AS3 Timer class

### Read the source code, it's well documented.

### Example

```js
var finalTimer = require('final-timer');

var timer = new finalTimer.Timer(1000, 1);

timer.on('timerComplete', function (event) {
  console.log('called after 1 sec.');
});
```