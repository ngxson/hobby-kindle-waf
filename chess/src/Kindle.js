/**
 * This module provides Kindle-specific functions
 */

export const screenWidth = window.screen.width;
export const screenHeight = window.screen.height;
export const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
export const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

// gestures
const allowedGestures = ['onswipe', 'onzoom', 'onpinch'];
const gestureCallbacks = {};
const addGestureCallback = (action, callback) => {
  if (!window.kindleAPI) return false;
  if (allowedGestures.indexOf(action) === -1) return false;
  if (!gestureCallbacks[action]) {
    gestureCallbacks[action] = [];
  }
  gestureCallbacks[action].push(callback);
  window.kindleAPI.gestures[action] = function (...args) {
    for (const f of gestureCallbacks[action]) f(...args);
  };
};
const removeGestureCallback = (action, callback) => {
  if (!gestureCallbacks[action]) return;
  const index = gestureCallbacks[action].indexOf(callback);
  gestureCallbacks[action].splice(index, 1);
};
addGestureCallback('onswipe', function (direction) {
  const speed = window.speed || 0.5;
  switch (direction) {
    case 'up':
      return window.scrollBy(0, screenHeight * speed);
    case 'down':
      return window.scrollBy(0, -screenHeight * speed);
    case 'left':
      return window.scrollBy(-screenWidth * speed, 0);
    case 'right':
      return window.scrollBy(screenWidth * speed, 0);
    default:
  }
});
///////


export const KindleAPI = {
  appmgr: {
    /**
     * example: start('com.lab126.booklet.home')
     * @param {String} appUri 
     * @returns 
     */
    start: (appUri) => window.kindleAPI.appmgr.start(appUri),
    /**
     * (Usage unclear. Maybe to exit the current WAF?)
     */
    back: () => window.kindleAPI.appmgr.back(),
  },
  chrome: {
    /**
     * example: setSpinnerState('start', timeout, delay)
     * example: setSpinnerState('stop', 0, 0)
     * (Doesn't seem to work)
     * @param {String} state 
     * @param {Number} timeout 
     * @param {Number} delay 
     * @returns 
     */
    setSpinnerState: (state, timeout, delay) => window.kindleAPI.chrome.setSpinnerState(state, timeout, delay),
    /**
     * example: setTitleBar('hello left', 'world center')
     * (Doesn't seem to work)
     * @param {String} leftText 
     * @param {String} centerText 
     * @returns 
     */
    setTitleBar: (leftText, centerText) => window.kindleAPI.chrome.setTitleBar(leftText || '', centerText || ''),
  },
  device: {
    /**
     * Sets the refresh sensitivity based on the current refresh mode and window refresh threshold
     * @param {boolean} isCustom true => custom; false => auto
     * @param {Number} threshold Holds the eInk window refresh threshold used if refresh mode is manual. This should be a number from 0 and 100. Defaults to 0.
     * @returns 
     */
    setSensitivity: (isCustom, threshold) => window.kindleAPI.device.setSensitivity(!!isCustom, threshold),
    /**
     * Set device orientation
     * TODO: what are possible values?
     * @param {*} orientation
     * @returns 
     */
    setOrientation: (orientation) => window.kindleAPI.device.setOrientation(orientation),
    /**
     * @returns Returns the contact info string
     */
    getContactInfo: () => window.kindleAPI.device.contactInfo,
    /**
     * @returns 1 if Device Control, 2 if Parental and 0 if No control
     */
    getControlStatus: () => window.kindleAPI.device.controlStatus,
    /**
     * @returns True if device has wireless menu enabled, false otherwise
     */
    getIsWirelessMenuEnabled: () => window.kindleAPI.device.isWirelessMenuEnabled,
    /**
     * Encapsulate kindle.device.log to work with wafjs interface
     * Adds level 'info' if none provided
     * @param {*} ev 
     * @param {*} msg 
     * @param {*} level 
     * @returns 
     */
    log: (ev, msg, level) => window.kindleAPI.device.log(ev, msg, level || 'info'),
    /**
     * var dpi = getDPI(); 
     * var pointPerInch = 72;
     * var dialogWidthInPixel = dialogWidthInPoint * dpi / pointPerInch;
     * @returns Device's DPI value
     */
    getDPI: () => window.kindleAPI.device.getDPI(),
    /**
     * getDeviceTypeString
     * @returns 
     */
    getDeviceTypeString: () => window.kindleAPI.device.getDeviceTypeString(),
    /**
     * getSoftwareVersionNumber
     * @returns 
     */
    getSoftwareVersionNumber: () => window.kindleAPI.device.getSoftwareVersionNumber(),
    /**
     * getCSSPixelsPerInch
     * @returns 
     */
    getCSSPixelsPerInch: () => window.kindleAPI.device.getCSSPixelsPerInch(),
  },
  net: {
    /**
     * Determines the user requested connectivity state.  If returns true, this
     * does not mean the device is currently connected to a network.  However,
     * if it returns false, then the device is not connected.
     * @returns True if user has requested connectivity, false if the user has
     *          disabled attempts to connect to a network
     */
    isEnabled: () => window.kindleAPI.net.getWirelessState() === 'on',
    /**
     * Determines if the device currently has a network connection (does not
     * distinguish between types, ie 3G or Wifi
     * @returns True if device has a network connection, false if not
     */
    isConnected: () => window.kindleAPI.net.getActiveInterface() !== 'none',
    /**
     * Enables the device to look for a network connection.  This does not
     * guarantee a connection, only registers the users requested state.
     */
    enable: () => window.kindleAPI.net.setWirelessState('on'),
    /**
     * Disables the device from looking for a network connection.  If the device
     * is currently connected it will disconnect.
     */
    disable: () => window.kindleAPI.net.setWirelessState('off'),
  },
  gestures: {
    /**
     * direction = 'up' | 'down' | 'left' | 'right'
     * @param {*} callback function(direction, x, y)
     * @returns 
     */
    registerOnSwipe: (callback) => addGestureCallback('onswipe', callback),
    unregisterOnSwipe: (callback) => removeGestureCallback('onswipe', callback),
    /**
     * @param {*} callback function()
     * @returns 
     */
    registerOnPinch: (callback) => addGestureCallback('onpinch', callback),
    unregisterOnPinch: (callback) => removeGestureCallback('onpinch', callback),
    /**
     * @param {*} callback function()
     * @returns 
     */
    registerOnZoom: (callback) => addGestureCallback('onzoom', callback),
    unregisterOnZoom: (callback) => removeGestureCallback('onzoom', callback),
    /**
     * Set scrolling (swipe) speed
     * @param {*} speed between 0.0 and 1.0. For example: 0.5 => each swipe scroll 1/2 screen
     */
    setScrollSpeed: (speed) => window.scrollSpeed = speed,
  },
  messaging: {
    /**
     * Equals to lipc-set-prop handler ev message
     * @param {String} handler 
     * @param {String} ev 
     * @param {String} message 
     * @returns 
     */
    sendMessage: (handler, ev, message) => window.kindleAPI.messaging.sendMessage(handler, ev, message),
    /**
     * Equals to lipc-set-prop handler ev message
     * @param {String} handler 
     * @param {String} ev 
     * @param {String} message 
     * @returns 
     */
    sendStringMessage: (handler, ev, message) => window.kindleAPI.messaging.sendStringMessage(handler, ev, message),
    /**
     * Equals to lipc-get-prop
     * @param {String} ev 
     * @param {Function} callback 
     * @returns 
     */
    receiveMessage: (ev, callback) => window.kindleAPI.messaging.receiveMessage(ev, callback),
  }
};