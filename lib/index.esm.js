import React, { forwardRef, useState, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".index-module_slot_wrap__ZT-DX {\n  display: inline-block;\n  white-space: nowrap;\n}\n\n.index-module_slot__DpPgW {\n  display: inline-block;\n  overflow: hidden;\n  text-align: center;\n  vertical-align: middle;\n  will-change: transform;\n}\n\n.index-module_dot__4Vlor {\n  display: inline-block;\n  vertical-align: middle;\n  text-align: center;\n}";
var styles = {"slot_wrap":"index-module_slot_wrap__ZT-DX","slot":"index-module_slot__DpPgW","dot":"index-module_dot__4Vlor"};
styleInject(css_248z);

var classNames = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.filter(Boolean).join(' ');
};
var range = function (start, end) {
    var result = [];
    for (var i = start; i < end; i += 1) {
        result.push(i);
    }
    return result;
};
var random = function (min, max) {
    var r = Math.random() * (max - min);
    return Math.floor(r + min);
};

var DUMMY_NUMBER_COUNT = 6;
var SEPARATOR = [',', '.'];
function SlotCounter(_a, ref) {
    var value = _a.value, fontWidth = _a.fontWidth;
    var _b = useState(false), active = _b[0], setActive = _b[1];
    var _c = useState(value), localValue = _c[0], setLocalValue = _c[1];
    var reloadAnimation = useCallback(function () {
        setActive(false);
        setTimeout(function () { return setActive(true); }, 20);
    }, []);
    useEffect(function () {
        reloadAnimation();
        setTimeout(function () { return setLocalValue(value); }, 300);
    }, [value, reloadAnimation]);
    useImperativeHandle(ref, function () { return ({
        reload: reloadAnimation,
    }); });
    var fontHeight = useMemo(function () {
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.visibility = 'hidden';
        div.style.top = '0';
        div.style.left = '0';
        div.innerHTML = '0';
        document.body.appendChild(div);
        var height = div.offsetHeight;
        document.body.removeChild(div);
        return height;
    }, []);
    var numStyle = {
        fontWidth: fontWidth,
        height: fontHeight,
        lineHeight: "".concat(fontHeight, "px"),
    };
    return (React.createElement("div", { className: classNames(styles.slot_wrap, active && styles.active) }, localValue
        .toString()
        .split('')
        .map(function (v, i) {
        if (SEPARATOR.includes(v)) {
            return (React.createElement("span", { key: i, className: styles.dot, style: { lineHeight: "".concat(fontHeight, "px") } }, v));
        }
        return (React.createElement("div", { key: i, className: styles.slot, style: { height: fontHeight } },
            React.createElement("div", { className: styles.numbers, style: __assign({ transition: 'none' }, (active && {
                    transform: "translateY(-".concat(fontHeight * DUMMY_NUMBER_COUNT, "px)"),
                    transition: "transform 0.6s ".concat(i * 0.1, "s ease-in-out"),
                })) },
                range(0, DUMMY_NUMBER_COUNT).map(function (slotIndex) { return (React.createElement("div", { key: slotIndex, className: styles.num, style: numStyle }, slotIndex === 0 ? v : random(1, 10))); }),
                React.createElement("div", { className: styles.num, style: numStyle }, v))));
    })));
}
var index = forwardRef(SlotCounter);

export { index as default };
//# sourceMappingURL=index.esm.js.map
