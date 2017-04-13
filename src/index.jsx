import React from 'react';
import PropTypes from 'prop-types'
import { styleComponentSubstring, componentTokenAt } from './utils';

/**
 * TypeWriter
 */
class TypeWriter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleChars: 0
    };

    this._handleTimeout = this._handleTimeout.bind(this);
  }

  componentDidMount() {
    this._timeoutId = setTimeout(this._handleTimeout, this.props.initDelay);
  }

  componentWillUnmount() {
    clearInterval(this._timeoutId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const children = this.props.children;
    const nextChildren = nextProps.children;
    const childrenChanged = children !== nextChildren;
    const visibleCharsChanged = this.state.visibleChars !== nextState.visibleChars;

    return (visibleCharsChanged || childrenChanged);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.children != this.props.children) {
      this.restart()
      return
    }

    const { maxDelay, minDelay, delayMap, onTypingEnd, onTyped } = this.props;
    const token = componentTokenAt(this, prevState.visibleChars);
    const nextToken = componentTokenAt(this, this.state.visibleChars);

    if (token && onTyped) {
      onTyped(token, prevState.visibleChars);
    }

    // check the delay map for additional delays at the index.
    if (nextToken) {
      const tokenIsString = (typeof token === 'string');
      let timeout = Math.round(Math.random() * (maxDelay - minDelay) + minDelay);

      if (delayMap) {
        for (let i = 0; i < delayMap.length; i++) {
          let mapping = delayMap[i];
          if ((mapping.at === prevState.visibleChars) ||
              (tokenIsString && token.match(mapping.at))) {
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

  restart() {
    clearInterval(this._timeoutId);
    this.setState({
      visibleChars: 0
    }, () => {
      this._timeoutId = setTimeout(this._handleTimeout, this.props.initDelay);
    });
  }

  render() {
    const { children, fixed } = this.props;
    const { visibleChars } = this.state;
    const container = <span>{children}</span>;
    const hideStyle = fixed ? { visibility: 'hidden' } : { display: 'none' };

    return styleComponentSubstring(container, hideStyle, visibleChars);
  }

  _handleTimeout() {
    const increment = this.props.isTyping ? 1 : 0;
    const { visibleChars } = this.state;

    this.setState({
      visibleChars: visibleChars + increment
    });
  }
}

TypeWriter.propTypes = {
  fixed: PropTypes.bool,
  delayMap: PropTypes.arrayOf(PropTypes.shape({
    at: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(RegExp)
    ]),
    delay: PropTypes.number
  })),
  isTyping: PropTypes.bool,
  maxDelay: PropTypes.number,
  minDelay: PropTypes.number,
  onTypingEnd: PropTypes.func,
  onTyped: PropTypes.func
};

TypeWriter.defaultProps = {
  isTyping: false,
  initDelay: 1000,
  maxDelay: 100,
  minDelay: 20
};

export default TypeWriter;
