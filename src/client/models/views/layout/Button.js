"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var Button = /** @class */ (function () {
    function Button(_a) {
        var _this = this;
        var text = _a.text, action = _a.action, className = _a.className;
        this.text = 'button';
        this.action = function () { console.log('action', _this.ele); };
        this.className = 'ui button';
        this.text = text;
        this.action = action;
        if (className)
            this.className = className;
        this.ele = document.createElement('div');
        this.ele.className = this.className;
        this.ele.append(this.text);
        this.ele.addEventListener('click', this.action);
        console.log(this);
    }
    Button.ButtonWrapper = function (className) {
        if (className === void 0) { className = 'ui buttons'; }
        var segment = document.createElement('div');
        segment.className = 'ui header';
        var wrap = document.createElement('div');
        wrap.className = className;
        segment.append(wrap);
        return segment;
    };
    Button.create = function (props) {
        var btn = new Button(props);
        return btn.ele;
    };
    return Button;
}());
exports.Button = Button;
