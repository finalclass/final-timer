var finalTimer = require('../index.js');

describe('finalTimer', function () {
  
  it('can set the listener', function  () {
    var timer = new finalTimer.Timer(10, 1);
    var timerEventFired = false;
    var timerCompleteEventFired = false;

    timer.on('timer', function (event) {
      timerEventFired = true;
    });

    timer.on('timerComplete', function (event) {
      timerCompleteEventFired = true;
    });

    timer.start();

    waitsFor(function () {
      return timerEventFired && timerCompleteEventFired;
    }, 100);

    runs(function () {
      expect(timerEventFired).toBeTruthy();
      expect(timerCompleteEventFired).toBeTruthy();
    });
  });

  it('has to be started', function (next) {
    var timer = new finalTimer.Timer(1, 1);
    var timerEventFired = false;

    timer.on('timer', function (event) {
      timerEventFired = true;
    });

    setTimeout(function () {
      expect(timerEventFired).not.toBeTruthy();
      next();
    }, 10);
  });

});