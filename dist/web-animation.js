/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/WebAnimation.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/WebAnimation.js":
/*!*****************************!*\
  !*** ./src/WebAnimation.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return WebAnimation; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// strict\nvar WebAnimation =\n/*#__PURE__*/\nfunction () {\n  function WebAnimation() {\n    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n    _classCallCheck(this, WebAnimation);\n\n    _defineProperty(this, \"_duration\", void 0);\n\n    _defineProperty(this, \"_startTime\", 0);\n\n    _defineProperty(this, \"_isStopped\", true);\n\n    _defineProperty(this, \"_onStop\", void 0);\n\n    _defineProperty(this, \"_onStep\", void 0);\n\n    _defineProperty(this, \"_onFinish\", void 0);\n\n    _defineProperty(this, \"_easing\", void 0);\n\n    _defineProperty(this, \"_rAF\", void 0);\n\n    this._duration = options && options.duration || 1000;\n    this._rAF = options && options.rAF || window.requestAnimationFrame.bind(window);\n\n    this._easing = options && options.easing || function (n) {\n      return n;\n    };\n\n    this._onStep = options && options.onStep || null;\n    this._onStop = options && options.onStop || null;\n    this._onFinish = options && options.onFinish || null;\n    this._onTick = this._onTick.bind(this);\n  }\n\n  _createClass(WebAnimation, [{\n    key: \"setOnStop\",\n    value: function setOnStop(onStop) {\n      this._onStop = onStop;\n    }\n  }, {\n    key: \"setOnStep\",\n    value: function setOnStep(onStep) {\n      this._onStep = onStep;\n    }\n  }, {\n    key: \"setOnFinish\",\n    value: function setOnFinish(onFinish) {\n      this._onFinish = onFinish;\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      if (this._isStopped) {\n        return;\n      }\n\n      this._isStopped = true;\n\n      if (this._onStop) {\n        var progress = this.getProgressData();\n\n        this._onStop(progress);\n      }\n    }\n  }, {\n    key: \"run\",\n    value: function run() {\n      this._isStopped = false;\n      this._startTime = Date.now();\n\n      this._rAF(this._onTick);\n    }\n  }, {\n    key: \"getProgressData\",\n    value: function getProgressData() {\n      var elapsedTime = Date.now() - this._startTime;\n\n      var isFinished = elapsedTime >= this._duration;\n      var ratio = Math.min(1, elapsedTime / this._duration);\n\n      var tween = this._easing(ratio);\n\n      return {\n        elapsedTime: elapsedTime,\n        ratio: ratio,\n        tween: tween,\n        isFinished: isFinished\n      };\n    }\n    /**\n     * @private\n     */\n\n  }, {\n    key: \"_onTick\",\n    value: function _onTick() {\n      if (this._isStopped) {\n        return;\n      }\n\n      var progress = this.getProgressData();\n\n      if (this._onStep) {\n        this._onStep(progress);\n      }\n\n      if (progress.isFinished) {\n        this._isStopped = true;\n\n        if (this._onFinish) {\n          this._onFinish(progress);\n        }\n\n        return;\n      }\n\n      this._rAF(this._onTick);\n    }\n  }]);\n\n  return WebAnimation;\n}();\n\n\n\n//# sourceURL=webpack:///./src/WebAnimation.js?");

/***/ })

/******/ });