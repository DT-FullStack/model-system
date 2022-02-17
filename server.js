/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/console-browserify/index.js":
/*!**************************************************!*\
  !*** ./node_modules/console-browserify/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*global window, global*/\nvar util = __webpack_require__(/*! util */ \"util\")\nvar assert = __webpack_require__(/*! assert */ \"assert\")\nfunction now() { return new Date().getTime() }\n\nvar slice = Array.prototype.slice\nvar console\nvar times = {}\n\nif (typeof global !== \"undefined\" && global.console) {\n    console = global.console\n} else if (typeof window !== \"undefined\" && window.console) {\n    console = window.console\n} else {\n    console = {}\n}\n\nvar functions = [\n    [log, \"log\"],\n    [info, \"info\"],\n    [warn, \"warn\"],\n    [error, \"error\"],\n    [time, \"time\"],\n    [timeEnd, \"timeEnd\"],\n    [trace, \"trace\"],\n    [dir, \"dir\"],\n    [consoleAssert, \"assert\"]\n]\n\nfor (var i = 0; i < functions.length; i++) {\n    var tuple = functions[i]\n    var f = tuple[0]\n    var name = tuple[1]\n\n    if (!console[name]) {\n        console[name] = f\n    }\n}\n\nmodule.exports = console\n\nfunction log() {}\n\nfunction info() {\n    console.log.apply(console, arguments)\n}\n\nfunction warn() {\n    console.log.apply(console, arguments)\n}\n\nfunction error() {\n    console.warn.apply(console, arguments)\n}\n\nfunction time(label) {\n    times[label] = now()\n}\n\nfunction timeEnd(label) {\n    var time = times[label]\n    if (!time) {\n        throw new Error(\"No such label: \" + label)\n    }\n\n    delete times[label]\n    var duration = now() - time\n    console.log(label + \": \" + duration + \"ms\")\n}\n\nfunction trace() {\n    var err = new Error()\n    err.name = \"Trace\"\n    err.message = util.format.apply(null, arguments)\n    console.error(err.stack)\n}\n\nfunction dir(object) {\n    console.log(util.inspect(object) + \"\\n\")\n}\n\nfunction consoleAssert(expression) {\n    if (!expression) {\n        var arr = slice.call(arguments, 1)\n        assert.ok(false, util.format.apply(null, arr))\n    }\n}\n\n\n//# sourceURL=webpack://model-system/./node_modules/console-browserify/index.js?");

/***/ }),

/***/ "./src/server/api/JsonCollection.ts":
/*!******************************************!*\
  !*** ./src/server/api/JsonCollection.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ \"./node_modules/console-browserify/index.js\");\n\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar JsonCollection = /** @class */ (function () {\n    function JsonCollection(name, array) {\n        var _this = this;\n        if (array === void 0) { array = []; }\n        this.name = name;\n        this.array = array;\n        this.createItem = function (data) {\n            if (data.id && _this.findItem(data.id))\n                throw new Error(\"Item with ID = \".concat(data.id, \" already exists\"));\n            console.log(_this.array);\n            var item = __assign(__assign({}, data), { id: _this.nextId });\n            _this.array.push(item);\n            return item;\n        };\n    }\n    Object.defineProperty(JsonCollection.prototype, \"lastItem\", {\n        get: function () { return this.array.length ? this.array[this.array.length - 1] : null; },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(JsonCollection.prototype, \"lastId\", {\n        get: function () { return this.lastItem ? this.lastItem.id : 0; },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(JsonCollection.prototype, \"nextId\", {\n        get: function () { return this.lastId + 1; },\n        enumerable: false,\n        configurable: true\n    });\n    JsonCollection.prototype.findItem = function (id) {\n        // @ts-ignore\n        return this.array.find(function (_a) {\n            var i = _a.id;\n            return i == id;\n        }) || null;\n    };\n    JsonCollection.prototype.updateItem = function (data) {\n        var existing = this.findItem(data.id);\n        if (!existing)\n            throw new Error(\"Item with ID = \".concat(data.id, \" does not exist\"));\n        var item = __assign(__assign({}, existing), data);\n        this.array.splice(this.array.indexOf(existing), 1, item);\n        return item;\n    };\n    JsonCollection.prototype.createOrUpdateItem = function (data) {\n        return data.id ? this.updateItem(data) : this.createItem(data);\n    };\n    JsonCollection.prototype.deleteItem = function (id) {\n        var existing = this.findItem(id);\n        if (!existing)\n            throw new Error(\"Item with ID = \".concat(id, \" does not exist\"));\n        this.array.splice(this.array.indexOf(existing), 1);\n    };\n    JsonCollection.prototype.getAll = function () { return __spreadArray([], this.array, true); };\n    return JsonCollection;\n}());\nexports[\"default\"] = JsonCollection;\n\n\n//# sourceURL=webpack://model-system/./src/server/api/JsonCollection.ts?");

/***/ }),

/***/ "./src/server/api/JsonDatabase.ts":
/*!****************************************!*\
  !*** ./src/server/api/JsonDatabase.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ \"./node_modules/console-browserify/index.js\");\n\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.JsonDatabase = void 0;\nvar fs_1 = __importDefault(__webpack_require__(/*! fs */ \"fs\"));\nvar path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nvar JsonCollection_1 = __importDefault(__webpack_require__(/*! ./JsonCollection */ \"./src/server/api/JsonCollection.ts\"));\nvar JsonDatabaseRoutes_1 = __importDefault(__webpack_require__(/*! ./JsonDatabaseRoutes */ \"./src/server/api/JsonDatabaseRoutes.ts\"));\nvar JsonDatabase = /** @class */ (function () {\n    function JsonDatabase(jsonFilePath) {\n        var _this = this;\n        this.jsonFilePath = jsonFilePath;\n        this.database = {};\n        this.collections = {};\n        this.getCollection = function (name) {\n            return _this.collections[name] || null;\n        };\n        this.createCollection = function (name) {\n            var collection = new JsonCollection_1.default(name);\n            _this.collections[name] = collection;\n            return collection;\n        };\n        this.findOrCreateCollection = function (name) {\n            var collection = _this.getCollection(name);\n            return collection ? collection : _this.createCollection(name);\n        };\n        this.path = path_1.default.resolve(__dirname, this.jsonFilePath);\n        this.load();\n        this.initializeCollections();\n        this.router = new JsonDatabaseRoutes_1.default(this).router;\n    }\n    JsonDatabase.prototype.load = function () {\n        try {\n            var fileContents = fs_1.default.readFileSync(this.path, 'utf-8');\n            var database = JSON.parse(fileContents);\n            this.database = database;\n        }\n        catch (error) {\n            console.error(error);\n        }\n    };\n    JsonDatabase.prototype.initializeCollections = function () {\n        for (var collectionName in this.database) {\n            this.collections[collectionName] = new JsonCollection_1.default(collectionName, this.database[collectionName]);\n        }\n    };\n    JsonDatabase.prototype.update = function () {\n        var _this = this;\n        try {\n            Object.values(this.collections).forEach(function (collection) {\n                _this.database[collection.name] = collection.getAll();\n            });\n        }\n        catch (error) {\n            console.error(error);\n        }\n    };\n    JsonDatabase.prototype.save = function () {\n        try {\n            this.update();\n            fs_1.default.writeFileSync(this.path, JSON.stringify(this.database, null, '\\t'), { encoding: 'utf-8' });\n        }\n        catch (error) {\n            console.error(error);\n        }\n    };\n    return JsonDatabase;\n}());\nexports.JsonDatabase = JsonDatabase;\nexports[\"default\"] = (function (jsonFilePath, app) {\n    var database = new JsonDatabase(jsonFilePath);\n    app.use(database.router);\n});\n\n\n//# sourceURL=webpack://model-system/./src/server/api/JsonDatabase.ts?");

/***/ }),

/***/ "./src/server/api/JsonDatabaseRoutes.ts":
/*!**********************************************!*\
  !*** ./src/server/api/JsonDatabaseRoutes.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express_1 = __webpack_require__(/*! express */ \"express\");\n// interface ReqWithBody\n// GET      /:collection\n// POST     /:collection\n// PUT      /:collection/:id\n// DELETE   /:collection/:id\nvar JsonDatabaseRoutes = /** @class */ (function () {\n    function JsonDatabaseRoutes(database) {\n        var _this = this;\n        this.database = database;\n        this.router = (0, express_1.Router)();\n        this.collection = this.database.findOrCreateCollection;\n        this.getCollection = function (req, res) {\n            var name = req.params.collection;\n            res.json(_this.collection(name).getAll());\n        };\n        this.addToCollection = function (req, res) {\n            var name = req.params.collection;\n            var item = _this.collection(name).createItem(req.body);\n            _this.database.save();\n            res.json(item);\n        };\n        this.updateItem = function (req, res) {\n            var _a = req.params, name = _a.collection, requestId = _a.id;\n            var payloadId = req.body.id;\n            if (requestId != payloadId)\n                res.status(422).json({ error: 'Invalid data' });\n            var item = _this.collection(name).updateItem(req.body);\n            _this.database.save();\n            res.json(item);\n        };\n        this.deleteItem = function (req, res) {\n            var _a = req.params, name = _a.collection, id = _a.id;\n            var item = _this.collection(name).deleteItem(id);\n            _this.database.save();\n            res.json(item);\n        };\n        this.router.route('/:collection')\n            .get(this.getCollection)\n            .post(this.addToCollection);\n        this.router.route('/:collection/:id')\n            .put(this.updateItem)\n            .delete(this.deleteItem);\n    }\n    return JsonDatabaseRoutes;\n}());\nexports[\"default\"] = JsonDatabaseRoutes;\n\n\n//# sourceURL=webpack://model-system/./src/server/api/JsonDatabaseRoutes.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ \"./node_modules/console-browserify/index.js\");\n\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n// load up the express framework and body-parser helper\n// const express = require('express');\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\n// const bodyParser = require('body-parser');\n// const path = require('path');\nvar body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\nvar path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nvar JsonDatabase_1 = __importDefault(__webpack_require__(/*! ./api/JsonDatabase */ \"./src/server/api/JsonDatabase.ts\"));\n// import JsonDatabaseRouter from './api/JsonDatabaseRoutes';\n// create an instance of express to serve our end points\nvar app = (0, express_1.default)();\n// serve static files generated by Parcel\napp.use(express_1.default.static('dist'));\n// configure express instance with some body-parser settings\n// including handling JSON data\napp.use(body_parser_1.default.json());\napp.use(body_parser_1.default.urlencoded({ extended: true }));\napp.get('/', function (req, res) {\n    res.sendFile(path_1.default.join(__dirname, 'index.html'));\n});\n(0, JsonDatabase_1.default)('db.json', app);\napp.listen(3000, function () { return console.log('Listening on port 3000'); });\n\n\n//# sourceURL=webpack://model-system/./src/server/server.ts?");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/server.ts");
/******/ 	
/******/ })()
;