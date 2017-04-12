(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["TypeWriter"] = factory(require("react"), require("prop-types"));
	else
		root["TypeWriter"] = factory(root["React"], root["PropTypes"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentTokenAt = exports.styleComponentSubstring = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Enclosing scope for local state variables.
var styleComponentSubstring = exports.styleComponentSubstring = function () {

  var _start = void 0;
  var _end = void 0;
  var _styles = void 0;
  var _index = void 0;

  // Will deep clone the component tree, wrapping any text within
  // the start/end with a styled span.
  function alterComponent(component) {
    var _component$props = component.props,
        children = _component$props.children,
        stamp = _component$props.stamp,
        style = _component$props.style;

    var cloneProps = { children: _react2.default.Children.map(children, alterChild) };

    if (cloneProps) {
      return _react2.default.cloneElement(component, cloneProps);
    } else {
      return component;
    }
  }

  // Alters any text in the child, checking if the text falls within
  // the start/end range.
  function alterChild(child) {

    if (typeof child !== 'string') {

      return alterComponent(child);
    } else {

      var strEnd = child.length + _index;

      if (strEnd > _start && (!_end || _index < _end)) {

        // compute relative string start and end indexes
        var relStartIndex = _start - _index,
            relEndIndex = _end ? _end - _index : strEnd;

        // generate the substrings
        var unstyledTextLeft = child.substring(0, relStartIndex),
            styledText = child.substring(relStartIndex, relEndIndex),
            unstyledTextRight = child.substring(relEndIndex, strEnd);

        var styledSpan = _react2.default.createElement(
          'span',
          { style: _styles },
          styledText
        );

        child = [unstyledTextLeft, styledSpan, unstyledTextRight];
      }

      _index = strEnd;

      return child;
    }
  }

  /**
   * Styles the in any text nodes that are decendants of the component
   * if they fall within the specified range. Ranges are relative to
   * all the text within the component including text in decendant nodes.
   * A specific characters index is calculated as the number of all characters
   * indexed before it in an pre-order traversal of the tree minus one.
   *
   * Example:
   * styleComponentSubstring(<p>Hello <a>World</a></p>, {color: 'blue'}, 3, 8);
   * >>> <p>Hel<span style="color: blue">lo </span><a><span style="color: blue">Wo</span>rld</a></p>
   *
   * @param  {React Component} component The component to be cloned.
   * @param  {Object} styles    The styles to be applied to the text.
   * @param  {Number} start     The start index.
   * @param  {Number} end       The end index.
   * @return {React Component}
   */
  return function (component, styles, start, end) {

    // reset local state variables
    _styles = styles || {};

    if (start > end) {
      _end = start;
      _start = end;
    } else {
      _start = start || 0;
      _end = end;
    }

    _index = 0;

    return alterComponent(component);
  };
}();

// returns the character at the components text index position.
var componentTokenAt = exports.componentTokenAt = function () {

  var _index = void 0;

  function findComponentTokenAt(component) {
    if (component.props == null) {
      return;
    }

    var children = component.props.children;

    var childCount = _react2.default.Children.count(children);
    var childIndex = 0;
    var token = void 0;

    if (childCount <= 1) {
      children = [children];
    }

    while (!token && childIndex < childCount) {

      var child = children[childIndex++];

      if (typeof child !== 'string') {
        token = findComponentTokenAt(child);
      } else if (_index - child.length < 0) {
        token = child.charAt(_index);
      } else {
        _index -= child.length;
      }
    }

    return token;
  }

  /**
   * Returns the token/character at the components text index position.
   * The index position is the index of a string of all text nodes
   * concatinated depth first.
   *
   * @param  {React Component} component Component to search.
   * @param  {Number} index     The index position.
   * @return {Char}           The token at the index position.
   */
  return function (component, index) {

    if (index < 0) {
      return undefined;
    }

    _index = index;
    return findComponentTokenAt(component);
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TypeWriter
 */
var TypeWriter = function (_React$Component) {
  _inherits(TypeWriter, _React$Component);

  function TypeWriter(props) {
    _classCallCheck(this, TypeWriter);

    var _this = _possibleConstructorReturn(this, (TypeWriter.__proto__ || Object.getPrototypeOf(TypeWriter)).call(this, props));

    _this.state = {
      visibleChars: 0
    };

    _this._handleTimeout = _this._handleTimeout.bind(_this);
    return _this;
  }

  _createClass(TypeWriter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._timeoutId = setTimeout(this._handleTimeout, this.props.initDelay);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this._timeoutId);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;

      var children = this.props.children;

      var nextChildren = nextProps.children;
      var childrenAreStrings = typeof children === 'string' && typeof nextChildren === 'string';
      // TODO Implement childrenChanged for non-string children as well
      var childrenChanged = childrenAreStrings && children !== nextChildren;
      var visibleCharsChanged = this.state.visibleChars !== nextState.visibleChars;

      return visibleCharsChanged || childrenChanged;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props,
          maxDelay = _props.maxDelay,
          minDelay = _props.minDelay,
          delayMap = _props.delayMap,
          onTypingEnd = _props.onTypingEnd,
          onTyped = _props.onTyped;

      var token = (0, _utils.componentTokenAt)(this, prevState.visibleChars);
      var nextToken = (0, _utils.componentTokenAt)(this, this.state.visibleChars);

      if (token && onTyped) {
        onTyped(token, prevState.visibleChars);
      }

      // check the delay map for additional delays at the index.
      if (nextToken) {
        var tokenIsString = typeof token === 'string';
        var timeout = Math.round(Math.random() * (maxDelay - minDelay) + minDelay);

        if (delayMap) {
          for (var i = 0; i < delayMap.length; i++) {
            var mapping = delayMap[i];
            if (mapping.at === prevState.visibleChars || tokenIsString && token.match(mapping.at)) {
              timeout += mapping.delay;
              break;
            }
          }
        }

        this._timeoutId = setTimeout(this._handleTimeout, timeout);
      } else if (onTypingEnd) {
        onTypingEnd();
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.setState({
        visibleChars: 0
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          fixed = _props2.fixed;
      var visibleChars = this.state.visibleChars;

      var container = _react2.default.createElement(
        'span',
        null,
        children
      );
      var hideStyle = fixed ? { visibility: 'hidden' } : { display: 'none' };

      return (0, _utils.styleComponentSubstring)(container, hideStyle, visibleChars);
    }
  }, {
    key: '_handleTimeout',
    value: function _handleTimeout() {
      var increment = this.props.isTyping ? 1 : 0;
      var visibleChars = this.state.visibleChars;


      this.setState({
        visibleChars: visibleChars + increment
      });
    }
  }]);

  return TypeWriter;
}(_react2.default.Component);

TypeWriter.propTypes = {
  fixed: _propTypes2.default.bool,
  delayMap: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    at: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.instanceOf(RegExp)]),
    delay: _propTypes2.default.number
  })),
  isTyping: _propTypes2.default.bool,
  maxDelay: _propTypes2.default.number,
  minDelay: _propTypes2.default.number,
  onTypingEnd: _propTypes2.default.func,
  onTyped: _propTypes2.default.func
};

TypeWriter.defaultProps = {
  isTyping: false,
  initDelay: 1000,
  maxDelay: 100,
  minDelay: 20
};

exports.default = TypeWriter;
module.exports = exports['default'];

/***/ })
/******/ ]);
});