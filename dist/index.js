!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types")):"function"==typeof define&&define.amd?define(["react","prop-types"],t):"object"==typeof exports?exports.TypeWriter=t(require("react"),require("prop-types")):e.TypeWriter=t(e.React,e.PropTypes)}(this,function(e,t){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(t,n){t.exports=e},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.componentTokenAt=t.styleComponentSubstring=void 0;var r=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(r);t.styleComponentSubstring=function(){function e(e){var n=e.props,r=n.children,o=(n.stamp,n.style,{children:i.default.Children.map(r,t)});return o?i.default.cloneElement(e,o):e}function t(t){if("string"!=typeof t)return e(t);var a=t.length+u;if(a>n&&(!r||u<r)){var s=n-u,l=r?r-u:a,f=t.substring(0,s),p=t.substring(s,l),c=t.substring(l,a);t=[f,i.default.createElement("span",{style:o},p),c]}return u=a,t}var n=void 0,r=void 0,o=void 0,u=void 0;return function(t,i,a,s){return o=i||{},a>s?(r=a,n=s):(n=a||0,r=s),u=0,e(t)}}(),t.componentTokenAt=function(){function e(n){if(null!=n.props){var r=n.props.children,o=i.default.Children.count(r),u=0,a=void 0;for(Array.isArray(r)||(r=[r]);!a&&u<o;){var s=r[u++];"string"!=typeof s?a=e(s):t-s.length<0?a=s.charAt(t):t-=s.length}return a}}var t=void 0;return function(n,r){if(!(r<0))return t=r,e(n)}}()},function(e,n){e.exports=t},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),l=r(s),f=n(2),p=r(f),c=n(1),d=function(e){function t(e){i(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={visibleChars:0},n._handleTimeout=n._handleTimeout.bind(n),n}return u(t,e),a(t,[{key:"componentDidMount",value:function(){this._timeoutId=setTimeout(this._handleTimeout,this.props.initDelay)}},{key:"componentWillUnmount",value:function(){clearInterval(this._timeoutId)}},{key:"shouldComponentUpdate",value:function(e,t){var n=this.props.children,r=e.children,i=n!==r;return this.state.visibleChars!==t.visibleChars||i}},{key:"componentDidUpdate",value:function(e,t){if(e.children!=this.props.children)return void this.restart();var n=this.props,r=n.maxDelay,i=n.minDelay,o=n.delayMap,u=n.onTypingEnd,a=n.onTyped,s=(0,c.componentTokenAt)(this,t.visibleChars),l=(0,c.componentTokenAt)(this,this.state.visibleChars);if(s&&a&&a(s,t.visibleChars),l){var f="string"==typeof s,p=Math.round(Math.random()*(r-i)+i);if(o)for(var d=0;d<o.length;d++){var h=o[d];if(h.at===t.visibleChars||f&&s.match(h.at)){p+=h.delay;break}}this._timeoutId=setTimeout(this._handleTimeout,p)}else u&&u()}},{key:"restart",value:function(){var e=this;clearInterval(this._timeoutId),this.setState({visibleChars:0},function(){e._timeoutId=setTimeout(e._handleTimeout,e.props.initDelay)})}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.fixed,r=this.state.visibleChars,i=l.default.createElement("span",null,t),o=n?{visibility:"hidden"}:{display:"none"};return(0,c.styleComponentSubstring)(i,o,r)}},{key:"_handleTimeout",value:function(){var e=this.props.isTyping?1:0,t=this.state.visibleChars;this.setState({visibleChars:t+e})}}]),t}(l.default.Component);d.propTypes={fixed:p.default.bool,delayMap:p.default.arrayOf(p.default.shape({at:p.default.oneOfType([p.default.string,p.default.number,p.default.instanceOf(RegExp)]),delay:p.default.number})),isTyping:p.default.bool,maxDelay:p.default.number,minDelay:p.default.number,onTypingEnd:p.default.func,onTyped:p.default.func},d.defaultProps={isTyping:!1,initDelay:1e3,maxDelay:100,minDelay:20},t.default=d,e.exports=t.default}])});