"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react-native');
var Animated = React.Animated,
    StyleSheet = React.StyleSheet,
    Text = React.Text,
    TouchableHighlight = React.TouchableHighlight;

var Btn = function (_React$Component) {
    _inherits(Btn, _React$Component);

    function Btn() {
        _classCallCheck(this, Btn);

        return _possibleConstructorReturn(this, (Btn.__proto__ || Object.getPrototypeOf(Btn)).apply(this, arguments));
    }

    _createClass(Btn, [{
        key: "setTypeStyle",
        value: function setTypeStyle(element) {
            switch (this.props.type) {
                case "danger":
                case "delete":
                    return styles.btnDanger;
                    break;
                case "primary":
                    return styles.btnPrimary;
                    break;
                case "secondary":
                    return styles.btnSecondary;
                    break;
                case "success":
                    return styles.btnSuccess;
                default:
                    return {};
                    break;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                panDimensions = _props.panDimensions,
                style = _props.style,
                text = _props.text,
                width = _props.width;

            var customStyle = style || {};
            var setWidth = { width: Math.ceil(width) };

            return React.createElement(
                Animated.View,
                { style: [panDimensions] },
                React.createElement(
                    TouchableHighlight,
                    _extends({}, this.props, { style: [styles.btn, this.setTypeStyle(), customStyle] }),
                    React.createElement(
                        Text,
                        { style: [styles.btnText, setWidth] },
                        text
                    )
                )
            );
        }
    }]);

    return Btn;
}(React.Component);

/* Style */

var styles = StyleSheet.create({
    btn: {
        backgroundColor: '#b6bec0',
        flex: 1,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    btnDanger: {
        backgroundColor: '#FF3B30'
    },
    btnPrimary: {
        backgroundColor: '#006fff'
    },
    btnSecondary: {
        backgroundColor: '#fd9427'
    },
    btnSuccess: {
        backgroundColor: '#4cd965'
    },
    btnText: {
        color: '#fff',
        textAlign: 'center'
    }
});

module.exports = Btn;