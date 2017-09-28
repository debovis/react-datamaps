'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _datamaps = require('datamaps');

var _datamaps2 = _interopRequireDefault(_datamaps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAP_CLEARING_PROPS = ['height', 'scope', 'setProjection', 'width'];

var propChangeRequiresMapClear = function propChangeRequiresMapClear(oldProps, newProps) {
	return MAP_CLEARING_PROPS.some(function (key) {
		return oldProps[key] !== newProps[key];
	});
};

var Datamap = function (_React$Component) {
	_inherits(Datamap, _React$Component);

	function Datamap(props) {
		_classCallCheck(this, Datamap);

		var _this = _possibleConstructorReturn(this, (Datamap.__proto__ || Object.getPrototypeOf(Datamap)).call(this, props));

		_this.onClick = _this.onClick.bind(_this);
		_this.resizeMap = _this.resizeMap.bind(_this);
		return _this;
	}

	_createClass(Datamap, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.responsive) {
				window.addEventListener('resize', this.resizeMap);
			}
			this.drawMap();
			var m = this.map,
			    that = this;

			this.map.svg.selectAll('.datamaps-subunit').on('click', function (geo) {
				console.log(m.options.data);
				that.onClick(m.options.data);
			});
		}
	}, {
		key: 'onClick',
		value: function onClick(e) {
			console.log(e);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			if (propChangeRequiresMapClear(this.props, newProps)) {
				this.clear();
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.drawMap();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.clear();
			if (this.props.responsive) {
				window.removeEventListener('resize', this.resizeMap);
			}
		}
	}, {
		key: 'clear',
		value: function clear() {
			var container = this.refs.container;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {

				for (var _iterator = Array.from(container.childNodes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var child = _step.value;

					container.removeChild(child);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			delete this.map;
		}
	}, {
		key: 'drawMap',
		value: function drawMap() {
			var _props = this.props,
			    arc = _props.arc,
			    arcOptions = _props.arcOptions,
			    bubbles = _props.bubbles,
			    bubbleOptions = _props.bubbleOptions,
			    data = _props.data,
			    graticule = _props.graticule,
			    labels = _props.labels,
			    updateChoroplethOptions = _props.updateChoroplethOptions,
			    props = _objectWithoutProperties(_props, ['arc', 'arcOptions', 'bubbles', 'bubbleOptions', 'data', 'graticule', 'labels', 'updateChoroplethOptions']);

			var map = this.map;

			if (!map) {
				map = this.map = new _datamaps2.default(_extends({}, props, {
					data: data,
					element: this.refs.container
				}));
			} else {
				map.updateChoropleth(data, updateChoroplethOptions);
			}

			if (arc) {
				map.arc(arc, arcOptions);
			}

			if (bubbles) {
				map.bubbles(bubbles, bubbleOptions);
			}

			if (graticule) {
				map.graticule();
			}

			if (labels) {
				map.labels();
			}
		}
	}, {
		key: 'resizeMap',
		value: function resizeMap() {
			this.map.resize();
		}
	}, {
		key: 'render',
		value: function render() {
			var style = _extends({
				height: '100%',
				position: 'relative',
				width: '100%'
			}, this.props.style);

			return _react2.default.createElement('div', { ref: 'container', style: style });
		}
	}]);

	return Datamap;
}(_react2.default.Component);

Datamap.propTypes = {
	arc: _propTypes2.default.array,
	arcOptions: _propTypes2.default.object,
	bubbleOptions: _propTypes2.default.object,
	bubbles: _propTypes2.default.array,
	data: _propTypes2.default.object,
	graticule: _propTypes2.default.bool,
	height: _propTypes2.default.any,
	labels: _propTypes2.default.bool,
	responsive: _propTypes2.default.bool,
	style: _propTypes2.default.object,
	updateChoroplethOptions: _propTypes2.default.object,
	width: _propTypes2.default.any,
	onClick: _propTypes2.default.func
};
exports.default = Datamap;