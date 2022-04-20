'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react-native');
var Animated = React.Animated,
    PanResponder = React.PanResponder,
    StyleSheet = React.StyleSheet,
    View = React.View;


var Btn = require('./components/btn.js');

var Swipeout = function (_React$Component) {
  _inherits(Swipeout, _React$Component);

  _createClass(Swipeout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var panX = this.state.panX;


      setTimeout(this.measureSwipeout.bind(this));
      panX.addListener(function (value) {
        return _this2.panListener(value.value);
      });
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var open = this.props.open;

      var nextOpen = nextProps.open;

      if (open != nextProps.open) {
        if (!nextOpen) {
          this.handleClose(200);
        } else {
          this.handleOpen(200, nextOpen === "right" ? -this.state.rightWidth : this.state.leftWidth);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var panX = this.state.panX;


      panX.removeAllListeners();
    }
  }]);

  function Swipeout(props) {
    _classCallCheck(this, Swipeout);

    var _this = _possibleConstructorReturn(this, (Swipeout.__proto__ || Object.getPrototypeOf(Swipeout)).call(this, props));

    _this.state = {
      height: 0,
      leftBtnWidthDefault: 0,
      leftBtnWidths: [],
      leftOpen: false,
      leftVisible: false,
      leftWidth: 0,
      panX: new Animated.Value(0),
      rightBtnWidthDefault: 0,
      rightBtnWidths: [],
      rightOpen: false,
      rightVisible: false,
      rightWidth: 0,
      scroll: true,
      self: _this,
      speedDefault: 100,
      width: 0
    };

    _this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        return true;
      },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
        return true;
      },
      onPanResponderGrant: function onPanResponderGrant() {
        var _this$state = _this.state,
            panX = _this$state.panX,
            leftOpen = _this$state.leftOpen,
            rightOpen = _this$state.rightOpen;

        if (leftOpen || rightOpen) panX.setOffset(panX._value);
      },
      onPanResponderMove: Animated.event([null, {
        dx: _this.state.panX
      }]),
      onPanResponderRelease: function onPanResponderRelease(e, gestureState) {
        _this.handleEnd(e, gestureState);
      },
      onPanResponderTerminate: function onPanResponderTerminate(e, gestureState) {
        _this.handleEnd(e, gestureState);
      }
    });
    return _this;
  }

  _createClass(Swipeout, [{
    key: 'btnWidth',
    value: function btnWidth(btn) {
      var hasCustomWidth = btn.props && btn.props.style && btn.props.style.width;
      return hasCustomWidth ? btn.props.style.width : false;
    }
  }, {
    key: 'btnsWidthTotal',
    value: function btnsWidthTotal(width, group, side) {
      var _this3 = this;

      var customWidths = [];

      group.forEach(function (btn) {
        _this3.btnWidth(btn) ? customWidths.push(_this3.btnWidth(btn)) : null;
      });

      var customWidthTotal = customWidths.reduce(function (a, b) {
        return a + b;
      }, 0);
      var defaultWidth = (width - customWidthTotal) / (5 - customWidths.length);
      var defaultWidthsTotal = (group.length - customWidths.length) * defaultWidth;

      this.setState(side === 'left' ? { leftBtnWidthDefault: defaultWidth } : { rightBtnWidthDefault: defaultWidth });

      return customWidthTotal + defaultWidthsTotal;
    }
  }, {
    key: 'setBtnsWidth',
    value: function setBtnsWidth(left, right) {
      var _this4 = this;

      var _state = this.state,
          leftDefault = _state.leftBtnWidthDefault,
          rightDefault = _state.rightBtnWidthDefault;

      var leftWidths = [];
      var rightWidths = [];

      left ? left.forEach(function (btn) {
        leftWidths.push(_this4.btnWidth(btn) ? _this4.btnWidth(btn) : leftDefault);
      }) : null;

      right ? right.forEach(function (btn) {
        rightWidths.push(_this4.btnWidth(btn) ? _this4.btnWidth(btn) : rightDefault);
      }) : null;

      this.setState({
        leftBtnWidths: leftWidths,
        rightBtnWidths: rightWidths
      });
    }
  }, {
    key: 'handleBtnPress',
    value: function handleBtnPress(btn) {
      var speedDefault = this.state.speedDefault;


      if (btn.props && btn.props.onPress) btn.props.onPress();
      if (btn.autoClose) this.handleClose(speedDefault * 2);
    }
  }, {
    key: 'handleClose',
    value: function handleClose(duration) {
      var onClose = this.props.onClose;

      if (onClose) onClose();

      Animated.timing(this.state.panX, {
        duration: duration,
        toValue: 0
      }).start();
    }
  }, {
    key: 'handleEnd',
    value: function handleEnd(e, gestureState) {
      var onSwipeEnd = this.props.onSwipeEnd;
      var _state2 = this.state,
          speedDefault = _state2.speedDefault,
          panX = _state2.panX,
          leftOpen = _state2.leftOpen,
          leftWidth = _state2.leftWidth,
          rightOpen = _state2.rightOpen,
          rightWidth = _state2.rightWidth;


      var move = gestureState.moveX;
      var moved = Math.abs(move) > 0;
      var change = move - gestureState.x0;
      var velocity = Math.abs(gestureState.vx);
      var speed = 200 / velocity;
      var duration = speed > speedDefault ? Math.min(speed, 200) : speedDefault;
      var leftShouldOpen = change > 0 && move && this.shouldOpen(change, leftWidth, velocity, leftOpen, rightOpen);
      var rightShouldOpen = change < 0 && move && this.shouldOpen(change, rightWidth, velocity, rightOpen, leftOpen);

      panX.flattenOffset();

      if (onSwipeEnd) onSwipeEnd();

      if (moved && !rightOpen && !leftOpen) {
        if (rightShouldOpen) {
          this.handleOpen(duration, -rightWidth);
        } else if (leftShouldOpen) {
          this.handleOpen(duration, leftWidth);
        } else {
          this.handleClose(speedDefault);
        }
        this.setState({
          leftOpen: leftShouldOpen,
          rightOpen: rightShouldOpen
        });
      } else {
        this.handleClose(speedDefault);
        this.setState({
          leftOpen: false,
          rightOpen: false
        });
      }
    }
  }, {
    key: 'handleOpen',
    value: function handleOpen(duration, toValue) {
      var onOpen = this.props.onOpen;

      if (onOpen) onOpen();

      Animated.timing(this.state.panX, {
        duration: duration,
        toValue: toValue
      }).start();
    }
  }, {
    key: 'handleStart',
    value: function handleStart() {
      var onSwipeStart = this.props.onSwipeStart;

      if (onSwipeStart) onSwipeStart();
      this.setState({ scroll: false });
    }
  }, {
    key: 'measureSwipeout',
    value: function measureSwipeout() {
      var _this5 = this;

      this.refs.swipeout.measure(function (a, b, width, height, px, py) {
        var _props = _this5.props,
            left = _props.left,
            right = _props.right;


        _this5.setState({
          height: height,
          width: width,
          leftWidth: left ? _this5.btnsWidthTotal(width, left, 'left') : 0,
          rightWidth: right ? _this5.btnsWidthTotal(width, right, 'right') : 0
        });

        _this5.setBtnsWidth(left, right);
      });
    }
  }, {
    key: 'panListener',
    value: function panListener(value) {
      var _state3 = this.state,
          leftOpen = _state3.leftOpen,
          rightOpen = _state3.rightOpen,
          scroll = _state3.scroll;


      var leftVisible = value > 5;
      var rightVisible = value < 5;
      var panning = leftVisible || rightVisible;
      if (scroll && panning) this.handleStart();

      this.setState({
        scroll: !panning,
        leftVisible: leftOpen || leftVisible,
        rightVisible: rightOpen || rightVisible
      });
    }
  }, {
    key: 'returnBtnDimensions',
    value: function returnBtnDimensions(i, side) {
      var _state4 = this.state,
          height = _state4.height,
          leftBtnWidths = _state4.leftBtnWidths,
          leftWidth = _state4.leftWidth,
          panX = _state4.panX,
          rightBtnWidths = _state4.rightBtnWidths,
          rightWidth = _state4.rightWidth,
          scroll = _state4.scroll,
          w = _state4.width;


      var width = !scroll ? panX.interpolate(side === 'left' ? { inputRange: [0, leftWidth], outputRange: [0, leftBtnWidths[i]] } : { inputRange: [-rightWidth, 0], outputRange: [rightBtnWidths[i], 0] }) : 0;

      return {
        height: height,
        width: width
      };
    }
  }, {
    key: 'shouldOpen',
    value: function shouldOpen(min, width, velocity, isOpen, isOpenOpposite) {
      var velocityMin = 0.3;
      var open = isOpen || isOpenOpposite;
      var minAbs = Math.abs(min);
      var openMin = minAbs > width / 2 && !open;
      var openFast = velocity > velocityMin && !open && minAbs > 0;
      var remainOpen = false;

      return openMin || openFast || remainOpen;
    }
  }, {
    key: 'styleBtns',
    value: function styleBtns(show, left, right, inputRange, outputRange) {
      var _state5 = this.state,
          height = _state5.height,
          panX = _state5.panX,
          scroll = _state5.scroll;


      return {
        height: height,
        left: left ? 0 : null,
        opacity: show ? 1 : 0,
        right: right ? 0 : null,
        width: !scroll ? panX.interpolate({ inputRange: inputRange, outputRange: outputRange }) : 0
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          left = _props2.left,
          right = _props2.right,
          style = _props2.style;
      var _state6 = this.state,
          leftBtnWidths = _state6.leftBtnWidths,
          rightBtnWidths = _state6.rightBtnWidths,
          height = _state6.height,
          panX = _state6.panX,
          props = _state6.props,
          scroll = _state6.scroll,
          self = _state6.self,
          leftVisible = _state6.leftVisible,
          rightVisible = _state6.rightVisible,
          w = _state6.width;


      var customStyle = style || {};

      var xContent = !scroll ? panX.interpolate({
        inputRange: [-w, 0, w],
        outputRange: [right ? -w : 0, 0, left ? w : 0]
      }) : 0;

      var styleBtnsLeft = this.styleBtns(leftVisible, true, false, [0, w], [0, w]);
      var styleBtnsRight = this.styleBtns(rightVisible, false, true, [-w, 0], [w, 0]);

      return React.createElement(
        View,
        { ref: 'swipeout', style: [styles.container, customStyle] },
        left && leftVisible && w ? React.createElement(
          Animated.View,
          _extends({}, this.state.panResponder.panHandlers, {
            style: [styles.btns, styleBtnsLeft] }),
          left.map(function (btn, i) {
            var btnProps = btn.props ? btn.props : [];
            return React.createElement(Btn, _extends({
              key: i,
              panDimensions: self.returnBtnDimensions(i, 'left'),
              text: btn.text,
              type: btn.type,
              width: leftBtnWidths[i]
            }, btnProps, {
              onPress: function onPress() {
                return self.handleBtnPress(btn);
              } }));
          })
        ) : React.createElement(View, null),
        right && rightVisible && w ? React.createElement(
          Animated.View,
          _extends({}, this.state.panResponder.panHandlers, {
            style: [styles.btns, styleBtnsRight] }),
          right.map(function (btn, i) {
            var btnProps = btn.props ? btn.props : [];
            return React.createElement(Btn, _extends({
              key: i,
              panDimensions: self.returnBtnDimensions(i, 'right'),
              text: btn.text,
              type: btn.type,
              width: rightBtnWidths[i]
            }, btnProps, {
              onPress: function onPress() {
                return self.handleBtnPress(btn);
              } }));
          })
        ) : React.createElement(View, null),
        React.createElement(
          Animated.View,
          _extends({}, this.state.panResponder.panHandlers, {
            style: { flex: 2, transform: [{ translateX: xContent }] } }),
          children
        )
      );
    }
  }]);

  return Swipeout;
}(React.Component);

;

var styles = StyleSheet.create({
  btns: {
    backgroundColor: 'blue',
    flex: 1,
    flexDirection: 'row',
    height: 20,
    overflow: 'hidden',
    position: 'absolute'
  },
  container: {
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row'
  }
});

module.exports = Swipeout;