(function (exports) {

  if (typeof exports !== 'undefined') {
    var finalEvents = require('final-events');
  }

  /**
   * Constructs a new Timer object with the specified delay and repeatCount states.
   *
   * @class
   * @param {number} delay The delay, in milliseconds, between timer events
   * @param {number} repeatCount The total number of times the timer is set to run. 
   */
  var Timer = function (delay, repeatCount) {
    /** 
     * The total number of times the timer has fired since it started at zero.
     * 
     * @readonly
     * @type {Number}
     */
    this.currentCount = 0;

    /** 
     * The delay, in milliseconds, between timer events.
     * 
     * @type {[type]}
     */
    this.delay = parseInt(delay);

    /** 
     * The total number of times the timer is set to run.
     * 
     * @type {[type]}
     */
    this.repeatCount = parseInt(repeatCount) || -1;

    /** 
     * [read-only] The timer's current state; true if the timer is running, otherwise false.
     *
     * @readonly
     * @type {Boolean}
     */
    this.running = false;

    // ---------------------------
    // private
    // ---------------------------
    this['@timerHandler'] = 0;
    this['@onTick'] = this['@onTick'].bind(this);
  };

  finalEvents.dispatcher(Timer.prototype);

  /**
   * Stops the timer, if it is running, and sets the currentCount property back to 0, like the reset button of a stopwatch.
   * 
   * @return {undefined}
   */
  Timer.prototype.reset = function () {
    if (this.running) {
      this.stop();
    }
    this.currentCount = 0;
  };

  /**
   * Starts the timer, if it is not already running.
   * 
   * @return {undefined}
   */
  Timer.prototype.start = function () {
    if (this.currentCount !== this.repeatCount) {
      this.running = true;
      this['@requestNextTick']();
    }
  };

  /**
   * Stops the timer.
   * 
   * @return {undefined}
   */
  Timer.prototype.stop = function () {
    this.running = false;
    clearTimeout(this['@timerHandler']);
  };

  // -----------------------------------------------------
  // 
  // Private methods
  //
  // -----------------------------------------------------
  
  Timer.prototype['@requestNextTick'] = function () {
    this['@timerHandler'] = setTimeout(this['@onTick'], this.delay);
  };

  Timer.prototype['@onTick'] = function () {
    this.currentCount += 1;
    this.trigger(new TimerEvent(TimerEvent.TIMER));
    if (this.currentCount === this.repeatCount) {
      this.running = false;
      this.trigger(new TimerEvent(TimerEvent.TIMER_COMPLETE));
    } else if (this.running) {
      this['@requestNextTick']();
    }
  };

   /**
   * Constructs a new Timer object with the specified delay and repeatCount states.
   *
   * @param {number} delay The delay, in milliseconds, between timer events
   * @param {number} repeatCount The total number of times the timer is set to run. 
   */
  exports.create = function (delay, repeatCount) {
    return new Timer(delay, repeatCount);
  }

  var TimerEvent = function (type) {
    this.type = type;
  };

  TimerEvent.TIMER = 'timer';
  TimerEvent.TIMER_COMPLETE = 'timerComplete';

  finalEvents.event(TimerEvent.prototype);

  exports.Timer = Timer;
  exports.TimerEvent = TimerEvent;
})(typeof exports === 'undefined' ? this['finalEvents'] : exports);