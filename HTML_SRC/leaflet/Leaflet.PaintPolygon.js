! function(n) {
    var e = {};

    function t(i) {
        if (e[i]) return e[i].exports;
        var r = e[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return n[i].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }
    t.m = n, t.c = e, t.d = function(n, e, i) {
        t.o(n, e) || Object.defineProperty(n, e, {
            enumerable: !0,
            get: i
        })
    }, t.r = function(n) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(n, "__esModule", {
            value: !0
        })
    }, t.t = function(n, e) {
        if (1 & e && (n = t(n)), 8 & e) return n;
        if (4 & e && "object" == typeof n && n && n.__esModule) return n;
        var i = Object.create(null);
        if (t.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: n
            }), 2 & e && "string" != typeof n)
            for (var r in n) t.d(i, r, function(e) {
                return n[e]
            }.bind(null, r));
        return i
    }, t.n = function(n) {
        var e = n && n.__esModule ? function() {
            return n.default
        } : function() {
            return n
        };
        return t.d(e, "a", e), e
    }, t.o = function(n, e) {
        return Object.prototype.hasOwnProperty.call(n, e)
    }, t.p = "", t(t.s = 8)
}([function(module, exports, __webpack_require__) {
    var factory;
    "undefined" != typeof self && self, factory = function() {
        return function(n) {
            var e = {};

            function t(i) {
                if (e[i]) return e[i].exports;
                var r = e[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return n[i].call(r.exports, r, r.exports, t), r.l = !0, r.exports
            }
            return t.m = n, t.c = e, t.d = function(n, e, i) {
                t.o(n, e) || Object.defineProperty(n, e, {
                    enumerable: !0,
                    get: i
                })
            }, t.r = function(n) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(n, "__esModule", {
                    value: !0
                })
            }, t.t = function(n, e) {
                if (1 & e && (n = t(n)), 8 & e) return n;
                if (4 & e && "object" == typeof n && n && n.__esModule) return n;
                var i = Object.create(null);
                if (t.r(i), Object.defineProperty(i, "default", {
                        enumerable: !0,
                        value: n
                    }), 2 & e && "string" != typeof n)
                    for (var r in n) t.d(i, r, function(e) {
                        return n[e]
                    }.bind(null, r));
                return i
            }, t.n = function(n) {
                var e = n && n.__esModule ? function() {
                    return n.default
                } : function() {
                    return n
                };
                return t.d(e, "a", e), e
            }, t.o = function(n, e) {
                return Object.prototype.hasOwnProperty.call(n, e)
            }, t.p = "", t(t.s = "./main.js")
        }({
            "./main.js":
                /*!*****************!*\
                  !*** ./main.js ***!
                  \*****************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.difference = exports.xor = exports.intersection = exports.union = undefined;\n\nvar _src = __webpack_require__(/*! ./src */ "./src/index.js");\n\nvar _src2 = _interopRequireDefault(_src);\n\nvar _operation = __webpack_require__(/*! ./src/operation */ "./src/operation.js");\n\nvar _operation2 = _interopRequireDefault(_operation);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar union = exports.union = function union(geom) {\n  for (var _len = arguments.length, moreGeoms = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n    moreGeoms[_key - 1] = arguments[_key];\n  }\n\n  return (0, _src2.default)(_operation2.default.types.UNION, geom, moreGeoms);\n};\n\nvar intersection = exports.intersection = function intersection(geom) {\n  for (var _len2 = arguments.length, moreGeoms = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n    moreGeoms[_key2 - 1] = arguments[_key2];\n  }\n\n  return (0, _src2.default)(_operation2.default.types.INTERSECTION, geom, moreGeoms);\n};\n\nvar xor = exports.xor = function xor(geom) {\n  for (var _len3 = arguments.length, moreGeoms = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {\n    moreGeoms[_key3 - 1] = arguments[_key3];\n  }\n\n  return (0, _src2.default)(_operation2.default.types.XOR, geom, moreGeoms);\n};\n\nvar difference = exports.difference = function difference(subjectGeom) {\n  for (var _len4 = arguments.length, clippingGeoms = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {\n    clippingGeoms[_key4 - 1] = arguments[_key4];\n  }\n\n  return (0, _src2.default)(_operation2.default.types.DIFFERENCE, subjectGeom, clippingGeoms);\n};\n\n//# sourceURL=webpack://polygon-clipping/./main.js?')
                },
            "./node_modules/qheap/index.js":
                /*!*************************************!*\
                  !*** ./node_modules/qheap/index.js ***!
                  \*************************************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    eval('module.exports = __webpack_require__(/*! ./lib/qheap.js */ "./node_modules/qheap/lib/qheap.js");\n\n\n//# sourceURL=webpack://polygon-clipping/./node_modules/qheap/index.js?')
                },
            "./node_modules/qheap/lib/qheap.js":
                /*!*****************************************!*\
                  !*** ./node_modules/qheap/lib/qheap.js ***!
                  \*****************************************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval("/**\n * nodejs heap, classic array implementation\n *\n * Items are stored in a balanced binary tree packed into an array where\n * node is at [i], left child is at [2*i], right at [2*i+1].  Root is at [1].\n *\n * Copyright (C) 2014-2017 Andras Radics\n * Licensed under the Apache License, Version 2.0\n */\n\n\n\nmodule.exports = Heap;\n\nfunction isBeforeDefault( a, b ) { return a < b; }\n\nfunction Heap( opts ) {\n    opts = opts || {};\n    if (typeof opts === 'function') opts = {compar: opts};\n\n    if (opts.compar) {\n        this._isBefore = function(a, b) { return opts.compar(a,b) < 0 };\n    } else if (opts.comparBefore) {\n        this._isBefore = opts.comparBefore;\n    } else {\n        this._isBefore = isBeforeDefault;\n    }\n    this.length = 0;\n    this._freeSpace = opts.freeSpace ? this._trimArraySize : false;\n    this._list = new Array(opts.size || 100);\n}\n\nHeap.prototype._list = null;\nHeap.prototype._compar = null;\nHeap.prototype._isBefore = null;\nHeap.prototype._freeSpace = null;\nHeap.prototype.length = 0;\n\n/*\n * insert new item at end, and bubble up\n */\nHeap.prototype.insert = function Heap_insert( item ) {\n    var idx = ++this.length;\n    var list = this._list;\n    list[idx] = item;\n\n    while (idx > 1) {\n        var parentidx = idx >> 1;\n        var parentval = list[parentidx];\n        if (!(this._isBefore(item, parentval))) break;\n        list[idx] = parentval;\n        idx = parentidx;\n    }\n    list[idx] = item;\n};\nHeap.prototype.append = Heap.prototype.insert;\nHeap.prototype.push = Heap.prototype.insert;\nHeap.prototype.unshift = Heap.prototype.insert;\nHeap.prototype.enqueue = Heap.prototype.insert;\n\nHeap.prototype.peek = function Heap_peek( ) {\n    return this.length > 0 ? this._list[1] : undefined;\n};\n\nHeap.prototype.size = function Heap_size( ) {\n    return this.length;\n};\n\n/*\n * return the root, and bubble down last item from top root position\n * when bubbling down, r: root idx, c: child sub-tree root idx, cv: child root value\n * Note that the child at (c == this.length) does not have to be tested in the loop,\n * since its value is the one being bubbled down, so can loop `while (c < len)`.\n *\n * Note that a redundant (c < len &&) test before the c vs c+1 compar lets node v0.10\n * run 4x faster; v4, v5 and v6 run faster without it if using _isBefore and not\n * raw _compar.\n *\n * Note that this version runs faster than the two-pass pull-up-new-root then\n * bubble-up-last-value-from-hole approach (except when inserting pre-sorted data).\n */\nHeap.prototype.remove = function Heap_remove( ) {\n    if (this.length < 1) return undefined;\n    var ret = this._list[1];\n    var itm = this._list[this.length];\n\n    var r = 1, c = 2, cv;\n    var len = this.length;\n    while (c < len) {\n        cv = this._list[c];\n        if (this._isBefore(this._list[c+1], cv)) { cv = this._list[c+1] ; c = c+1 }\n        if (!(this._isBefore(cv, itm))) break;\n        this._list[r] = cv;\n        r = c;\n        c = c << 1;\n    }\n    this._list[len] = 0;\n    this.length = --len;\n    if (len) this._list[r] = itm;\n    if (this._freeSpace) this._freeSpace(this._list, len);\n\n    return ret;\n};\nHeap.prototype.shift = Heap.prototype.remove;\nHeap.prototype.pop = Heap.prototype.remove;\nHeap.prototype.dequeue = Heap.prototype.remove;\n\n/*\n * Free unused storage slots in the _list.\n * The default is to unconditionally gc, use the options to omit when not useful.\n */\nHeap.prototype.gc = function Heap_gc( options ) {\n    if (!options) options = {};\n\n    var minListLength = options.minLength;      // smallest list that will be gc-d\n    if (minListLength === undefined) minListLength = 0;\n\n    var minListFull = options.minFull;          // list utilization below which to gc\n    if (minListFull === undefined) minListFull = 1.00;\n\n    if (this._list.length >= minListLength && (this.length < this._list.length * minListFull)) {\n        // gc reallocates the array to free the unused storage slots at the end\n        // use splice to actually free memory; 7% slower than setting .length\n        // note: list.slice makes the array slower to insert to??  splice is better\n        this._list.splice(this.length+1, this._list.length);\n    }\n}\n\nHeap.prototype._trimArraySize = function Heap__trimArraySize( list, len ) {\n    if (len > 10000 && list.length > 4 * len) {\n        // use slice to actually free memory; 7% slower than setting .length\n        // note: list.slice makes the array slower to insert to??  splice is better\n        list.splice(len+1, list.length);\n    }\n}\n\nHeap.prototype._check = function Heap__check( ) {\n    var isBefore = this._isBefore;\n    var _compar = function(a, b) { return isBefore(a, b) ? -1 : 1 };\n\n    var i, p, fail = 0;\n    for (i=this.length; i>1; i--) {\n        // error if parent should go after child, but not if don`t care\n        p = i >>> 1;\n        // swapping the values must change their ordering, otherwise the\n        // comparison is a tie.  (Ie, consider the ordering func (a <= b)\n        // that for some values reports both that a < b and b < a.)\n        if (_compar(this._list[p], this._list[i]) > 0 &&\n            _compar(this._list[i], this._list[p]) < 0)\n        {\n            fail = i;\n        }\n    }\n    if (fail) console.log(\"failed at\", (fail >>> 1), fail);\n    return !fail;\n}\n\n// optimize access\nHeap.prototype = Heap.prototype;\n\n\n//# sourceURL=webpack://polygon-clipping/./node_modules/qheap/lib/qheap.js?")
                },
            "./node_modules/splaytree/index.js":
                /*!*****************************************!*\
                  !*** ./node_modules/splaytree/index.js ***!
                  \*****************************************/
                /*! exports provided: default */
                function(module, __webpack_exports__, __webpack_require__) {
                    "use strict";
                    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tree; });\n/* follows \"An implementation of top-down splaying\"\n * by D. Sleator <sleator@cs.cmu.edu> March 1992\n */\n\n/**\n * @typedef {*} Key\n */\n\n\n/**\n * @typedef {*} Value\n */\n\n\n/**\n * @typedef {function(node:Node):void} Visitor\n */\n\n\n/**\n * @typedef {function(a:Key, b:Key):number} Comparator\n */\n\n\n/**\n * @param {function(node:Node):string} NodePrinter\n */\n\n\n/**\n * @typedef {Object}  Node\n * @property {Key}    Key\n * @property {Value=} data\n * @property {Node}   left\n * @property {Node}   right\n */\n\nclass Node {\n\n  constructor (key, data) {\n    this.key    = key;\n    this.data   = data;\n    this.left   = null;\n    this.right  = null;\n  }\n}\n\nfunction DEFAULT_COMPARE (a, b) { return a > b ? 1 : a < b ? -1 : 0; }\n\n\n/**\n * Simple top down splay, not requiring i to be in the tree t.\n * @param {Key} i\n * @param {Node?} t\n * @param {Comparator} comparator\n */\nfunction splay (i, t, comparator) {\n  if (t === null) return t;\n  let l, r, y;\n  const N = new Node();\n  l = r = N;\n\n  while (true) {\n    const cmp = comparator(i, t.key);\n    //if (i < t.key) {\n    if (cmp < 0) {\n      if (t.left === null) break;\n      //if (i < t.left.key) {\n      if (comparator(i, t.left.key) < 0) {\n        y = t.left;                           /* rotate right */\n        t.left = y.right;\n        y.right = t;\n        t = y;\n        if (t.left === null) break;\n      }\n      r.left = t;                               /* link right */\n      r = t;\n      t = t.left;\n    //} else if (i > t.key) {\n    } else if (cmp > 0) {\n      if (t.right === null) break;\n      //if (i > t.right.key) {\n      if (comparator(i, t.right.key) > 0) {\n        y = t.right;                          /* rotate left */\n        t.right = y.left;\n        y.left = t;\n        t = y;\n        if (t.right === null) break;\n      }\n      l.right = t;                              /* link left */\n      l = t;\n      t = t.right;\n    } else {\n      break;\n    }\n  }\n  /* assemble */\n  l.right = t.left;\n  r.left = t.right;\n  t.left = N.right;\n  t.right = N.left;\n  return t;\n}\n\n\n/**\n * @param  {Key}        i\n * @param  {Value}      data\n * @param  {Comparator} comparator\n * @param  {Tree}       tree\n * @return {Node}      root\n */\nfunction insert (i, data, t, comparator, tree) {\n  const node = new Node(i, data);\n\n  tree._size++;\n\n  if (t === null) {\n    node.left = node.right = null;\n    return node;\n  }\n\n  t = splay(i, t, comparator);\n  const cmp = comparator(i, t.key);\n  if (cmp < 0) {\n    node.left = t.left;\n    node.right = t;\n    t.left = null;\n  } else if (cmp >= 0) {\n    node.right = t.right;\n    node.left = t;\n    t.right = null;\n  }\n  return node;\n}\n\n\n/**\n * Insert i into the tree t, unless it's already there.\n * @param  {Key}        i\n * @param  {Value}      data\n * @param  {Comparator} comparator\n * @param  {Tree}       tree\n * @return {Node}       root\n */\nfunction add (i, data, t, comparator, tree) {\n  const node = new Node(i, data);\n\n  if (t === null) {\n    node.left = node.right = null;\n    tree._size++;\n    return node;\n  }\n\n  t = splay(i, t, comparator);\n  const cmp = comparator(i, t.key);\n  if (cmp === 0) return t;\n  else {\n    if (cmp < 0) {\n      node.left = t.left;\n      node.right = t;\n      t.left = null;\n    } else if (cmp > 0) {\n      node.right = t.right;\n      node.left = t;\n      t.right = null;\n    }\n    tree._size++;\n    return node;\n  }\n}\n\n\n/**\n * Deletes i from the tree if it's there\n * @param {Key}        i\n * @param {Tree}       tree\n * @param {Comparator} comparator\n * @param {Tree}       tree\n * @return {Node}      new root\n */\nfunction remove (i, t, comparator, tree) {\n  let x;\n  if (t === null) return null;\n  t = splay(i, t, comparator);\n  if (i === t.key) {               /* found it */\n    if (t.left === null) {\n      x = t.right;\n    } else {\n      x = splay(i, t.left, comparator);\n      x.right = t.right;\n    }\n    tree._size--;\n    return x;\n  }\n  return t;                         /* It wasn't there */\n}\n\n\nfunction split (key, v, comparator) {\n  let left, right;\n  if (v === null) {\n    left = right = null;\n  } else {\n    v = splay(key, v, comparator);\n\n    const cmp = comparator(v.key, key);\n    if (cmp === 0) {\n      left  = v.left;\n      right = v.right;\n    } else if (cmp < 0) {\n      right   = v.right;\n      v.right = null;\n      left    = v;\n    } else {\n      left   = v.left;\n      v.left = null;\n      right  = v;\n    }\n  }\n  return { left, right };\n}\n\n\nfunction merge (left, right, comparator) {\n  if (right === null) return left;\n  if (left  === null) return right;\n\n  right = splay(left.key, right, comparator);\n  right.left = left;\n  return right;\n}\n\n\n/**\n * Prints level of the tree\n * @param  {Node}                        root\n * @param  {String}                      prefix\n * @param  {Boolean}                     isTail\n * @param  {Array<string>}               out\n * @param  {Function(node:Node):String}  printNode\n */\nfunction printRow (root, prefix, isTail, out, printNode) {\n  if (root) {\n    out(`${ prefix }${ isTail ? '└── ' : '├── ' }${ printNode(root) }\\n`);\n    const indent = prefix + (isTail ? '    ' : '│   ');\n    if (root.left)  printRow(root.left,  indent, false, out, printNode);\n    if (root.right) printRow(root.right, indent, true,  out, printNode);\n  }\n}\n\n\nclass Tree {\n\n  constructor (comparator = DEFAULT_COMPARE) {\n    this._comparator = comparator;\n    this._root = null;\n    this._size = 0;\n  }\n\n\n  /**\n   * Inserts a key, allows duplicates\n   * @param  {Key}    key\n   * @param  {Value=} data\n   * @return {Node|null}\n   */\n  insert (key, data) {\n    return this._root = insert(key, data, this._root, this._comparator, this);\n  }\n\n\n  /**\n   * Adds a key, if it is not present in the tree\n   * @param  {Key}    key\n   * @param  {Value=} data\n   * @return {Node|null}\n   */\n  add (key, data) {\n    return this._root = add(key, data, this._root, this._comparator, this);\n  }\n\n\n  /**\n   * @param  {Key} key\n   * @return {Node|null}\n   */\n  remove (key) {\n    this._root = remove(key, this._root, this._comparator, this);\n  }\n\n\n  /**\n   * Removes and returns the node with smallest key\n   * @return {?Node}\n   */\n  pop () {\n    let node = this._root;\n    if (node) {\n      while (node.left) node = node.left;\n      this._root = splay(node.key,  this._root, this._comparator);\n      this._root = remove(node.key, this._root, this._comparator, this);\n      return { key: node.key, data: node.data };\n    }\n    return null;\n  }\n\n\n  /**\n   * @param  {Key} key\n   * @return {Node|null}\n   */\n  findStatic (key) {\n    let current   = this._root;\n    const compare = this._comparator;\n    while (current) {\n      const cmp = compare(key, current.key);\n      if (cmp === 0)    return current;\n      else if (cmp < 0) current = current.left;\n      else              current = current.right;\n    }\n    return null;\n  }\n\n\n  /**\n   * @param  {Key} key\n   * @return {Node|null}\n   */\n  find (key) {\n    if (this._root) {\n      this._root = splay(key, this._root, this._comparator);\n      if (this._comparator(key, this._root.key) !== 0) return null;\n    }\n    return this._root;\n  }\n\n\n  /**\n   * @param  {Key} key\n   * @return {Boolean}\n   */\n  contains (key) {\n    let current   = this._root;\n    const compare = this._comparator;\n    while (current) {\n      const cmp = compare(key, current.key);\n      if (cmp === 0)    return true;\n      else if (cmp < 0) current = current.left;\n      else              current = current.right;\n    }\n    return false;\n  }\n\n\n  /**\n   * @param  {Visitor} visitor\n   * @param  {*=}      ctx\n   * @return {SplayTree}\n   */\n  forEach (visitor, ctx) {\n    let current = this._root;\n    const Q = [];  /* Initialize stack s */\n    let done = false;\n\n    while (!done) {\n      if (current !==  null) {\n        Q.push(current);\n        current = current.left;\n      } else {\n        if (Q.length !== 0) {\n          current = Q.pop();\n          visitor.call(ctx, current);\n\n          current = current.right;\n        } else done = true;\n      }\n    }\n    return this;\n  }\n\n\n  /**\n   * Walk key range from `low` to `high`. Stops if `fn` returns a value.\n   * @param  {Key}      low\n   * @param  {Key}      high\n   * @param  {Function} fn\n   * @param  {*?}       ctx\n   * @return {SplayTree}\n   */\n  range (low, high, fn, ctx) {\n    const Q = [];\n    const compare = this._comparator;\n    let node = this._root, cmp;\n\n    while (Q.length !== 0 || node) {\n      if (node) {\n        Q.push(node);\n        node = node.left;\n      } else {\n        node = Q.pop();\n        cmp = compare(node.key, high);\n        if (cmp > 0) {\n          break;\n        } else if (compare(node.key, low) >= 0) {\n          if (fn.call(ctx, node)) return this; // stop if smth is returned\n        }\n        node = node.right;\n      }\n    }\n    return this;\n  }\n\n\n  /**\n   * Returns array of keys\n   * @return {Array<Key>}\n   */\n  keys () {\n    const keys = [];\n    this.forEach(({ key }) => keys.push(key));\n    return keys;\n  }\n\n\n  /**\n   * Returns array of all the data in the nodes\n   * @return {Array<Value>}\n   */\n  values () {\n    const values = [];\n    this.forEach(({ data }) => values.push(data));\n    return values;\n  }\n\n\n  /**\n   * @return {Key|null}\n   */\n  min() {\n    if (this._root) return this.minNode(this._root).key;\n    return null;\n  }\n\n\n  /**\n   * @return {Key|null}\n   */\n  max() {\n    if (this._root) return this.maxNode(this._root).key;\n    return null;\n  }\n\n\n  /**\n   * @return {Node|null}\n   */\n  minNode(t = this._root) {\n    if (t) while (t.left) t = t.left;\n    return t;\n  }\n\n\n  /**\n   * @return {Node|null}\n   */\n  maxNode(t = this._root) {\n    if (t) while (t.right) t = t.right;\n    return t;\n  }\n\n\n  /**\n   * Returns node at given index\n   * @param  {number} index\n   * @return {?Node}\n   */\n  at (index) {\n    let current = this._root, done = false, i = 0;\n    const Q = [];\n\n    while (!done) {\n      if (current) {\n        Q.push(current);\n        current = current.left;\n      } else {\n        if (Q.length > 0) {\n          current = Q.pop();\n          if (i === index) return current;\n          i++;\n          current = current.right;\n        } else done = true;\n      }\n    }\n    return null;\n  }\n\n\n  /**\n   * @param  {Node}   d\n   * @return {Node|null}\n   */\n  next (d) {\n    let root = this._root;\n    let successor = null;\n\n    if (d.right) {\n      successor = d.right;\n      while (successor.left) successor = successor.left;\n      return successor;\n    }\n\n    const comparator = this._comparator;\n    while (root) {\n      const cmp = comparator(d.key, root.key);\n      if (cmp === 0) break;\n      else if (cmp < 0) {\n        successor = root;\n        root = root.left;\n      } else root = root.right;\n    }\n\n    return successor;\n  }\n\n\n  /**\n   * @param  {Node} d\n   * @return {Node|null}\n   */\n  prev (d) {\n    let root = this._root;\n    let predecessor = null;\n\n    if (d.left !== null) {\n      predecessor = d.left;\n      while (predecessor.right) predecessor = predecessor.right;\n      return predecessor;\n    }\n\n    const comparator = this._comparator;\n    while (root) {\n      const cmp = comparator(d.key, root.key);\n      if (cmp === 0) break;\n      else if (cmp < 0) root = root.left;\n      else {\n        predecessor = root;\n        root = root.right;\n      }\n    }\n    return predecessor;\n  }\n\n\n  /**\n   * @return {SplayTree}\n   */\n  clear() {\n    this._root = null;\n    this._size = 0;\n    return this;\n  }\n\n\n  /**\n   * @return {NodeList}\n   */\n  toList() {\n    return toList(this._root);\n  }\n\n\n  /**\n   * Bulk-load items. Both array have to be same size\n   * @param  {Array<Key>}    keys\n   * @param  {Array<Value>}  [values]\n   * @param  {Boolean}       [presort=false] Pre-sort keys and values, using\n   *                                         tree's comparator. Sorting is done\n   *                                         in-place\n   * @return {AVLTree}\n   */\n  load (keys = [], values = [], presort = false) {\n    let size = keys.length;\n    const comparator = this._comparator;\n\n    // sort if needed\n    if (presort) sort(keys, values, 0, size - 1, comparator);\n\n    if (this._root === null) { // empty tree\n      this._root = loadRecursive(this._root, keys, values, 0, size);\n      this._size = size;\n    } else { // that re-builds the whole tree from two in-order traversals\n      const mergedList = mergeLists(this.toList(), createList(keys, values), comparator);\n      size = this._size + size;\n      this._root = sortedListToBST({ head: mergedList }, 0, size);\n    }\n    return this;\n  }\n\n\n  /**\n   * @return {Boolean}\n   */\n  isEmpty() { return this._root === null; }\n\n  get size () { return this._size; }\n\n\n  /**\n   * @param  {NodePrinter=} printNode\n   * @return {String}\n   */\n  toString (printNode = (n) => n.key) {\n    const out = [];\n    printRow(this._root, '', true, (v) => out.push(v), printNode);\n    return out.join('');\n  }\n\n\n  update (key, newKey, newData) {\n    const comparator = this._comparator;\n    let { left, right } = split(key, this._root, comparator);\n    this._size--;\n    if (comparator(key, newKey) < 0) {\n      right = insert(newKey, newData, right, comparator, this);\n    } else {\n      left = insert(newKey, newData, left, comparator, this);\n    }\n    this._root = merge(left, right, comparator);\n  }\n\n\n  split(key) {\n    return split(key, this._root, this._comparator);\n  }\n}\n\n\nfunction loadRecursive (parent, keys, values, start, end) {\n  const size = end - start;\n  if (size > 0) {\n    const middle = start + Math.floor(size / 2);\n    const key    = keys[middle];\n    const data   = values[middle];\n    const node   = { key, data, parent };\n    node.left    = loadRecursive(node, keys, values, start, middle);\n    node.right   = loadRecursive(node, keys, values, middle + 1, end);\n    return node;\n  }\n  return null;\n}\n\n\nfunction createList(keys, values) {\n  const head = { next: null };\n  let p = head;\n  for (let i = 0; i < keys.length; i++) {\n    p = p.next = { key: keys[i], data: values[i] };\n  }\n  p.next = null;\n  return head.next;\n}\n\n\nfunction toList (root) {\n  var current = root;\n  var Q = [], done = false;\n\n  const head = { next: null };\n  let p = head;\n\n  while (!done) {\n    if (current) {\n      Q.push(current);\n      current = current.left;\n    } else {\n      if (Q.length > 0) {\n        current = p = p.next = Q.pop();\n        current = current.right;\n      } else done = true;\n    }\n  }\n  p.next = null; // that'll work even if the tree was empty\n  return head.next;\n}\n\n\nfunction sortedListToBST(list, start, end) {\n  const size = end - start;\n  if (size > 0) {\n    const middle = start + Math.floor(size / 2);\n    const left = sortedListToBST(list, start, middle);\n\n    const root = list.head;\n    root.left = left;\n\n    list.head = list.head.next;\n\n    root.right = sortedListToBST(list, middle + 1, end);\n    return root;\n  }\n  return null;\n}\n\n\nfunction mergeLists (l1, l2, compare = (a, b) => a - b) {\n  const head = {}; // dummy\n  let p = head;\n\n  let p1 = l1;\n  let p2 = l2;\n\n  while (p1 !== null && p2 !== null) {\n    if (compare(p1.key, p2.key) < 0) {\n      p.next = p1;\n      p1 = p1.next;\n    } else {\n      p.next = p2;\n      p2 = p2.next;\n    }\n    p = p.next;\n  }\n\n  if (p1 !== null)      p.next = p1;\n  else if (p2 !== null) p.next = p2;\n\n  return head.next;\n}\n\n\nfunction sort(keys, values, left, right, compare) {\n  if (left >= right) return;\n\n  const pivot = keys[(left + right) >> 1];\n  let i = left - 1;\n  let j = right + 1;\n\n  while (true) {\n    do i++; while (compare(keys[i], pivot) < 0);\n    do j--; while (compare(keys[j], pivot) > 0);\n    if (i >= j) break;\n\n    let tmp = keys[i];\n    keys[i] = keys[j];\n    keys[j] = tmp;\n\n    tmp = values[i];\n    values[i] = values[j];\n    values[j] = tmp;\n  }\n\n  sort(keys, values,  left,     j, compare);\n  sort(keys, values, j + 1, right, compare);\n}\n\n\n//# sourceURL=webpack://polygon-clipping/./node_modules/splaytree/index.js?")
                },
            "./src/bbox.js":
                /*!*********************!*\
                  !*** ./src/bbox.js ***!
                  \*********************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.getUniqueCorners = exports.getBboxOverlap = exports.doBboxesOverlap = exports.isInBbox = undefined;\n\nvar _flp = __webpack_require__(/*! ./flp */ "./src/flp.js");\n\n/**\n * A bounding box has the format:\n *\n *  { ll: { x: xmin, y: ymin }, ur: { x: xmax, y: ymax } }\n *\n */\n\nvar isInBbox = exports.isInBbox = function isInBbox(bbox, point) {\n  var xmin = bbox.ll.x;\n  var ymin = bbox.ll.y;\n  var xmax = bbox.ur.x;\n  var ymax = bbox.ur.y;\n  var xpt = point.x;\n  var ypt = point.y;\n  return (0, _flp.cmp)(xmin, xpt) <= 0 && (0, _flp.cmp)(xpt, xmax) <= 0 && (0, _flp.cmp)(ymin, ypt) <= 0 && (0, _flp.cmp)(ypt, ymax) <= 0;\n};\n\nvar doBboxesOverlap = exports.doBboxesOverlap = function doBboxesOverlap(b1, b2) {\n  return !((0, _flp.cmp)(b2.ur.x, b1.ll.x) < 0 || (0, _flp.cmp)(b1.ur.x, b2.ll.x) < 0 || (0, _flp.cmp)(b2.ur.y, b1.ll.y) < 0 || (0, _flp.cmp)(b1.ur.y, b2.ll.y) < 0);\n};\n\n/* Returns either null, or a bbox (aka an ordered pair of points)\n * If there is only one point of overlap, a bbox with identical points\n * will be returned */\nvar getBboxOverlap = exports.getBboxOverlap = function getBboxOverlap(b1, b2) {\n  if (!doBboxesOverlap(b1, b2)) return null;\n\n  // find the middle two X values\n  var lowerX = b1.ll.x < b2.ll.x ? b2.ll.x : b1.ll.x;\n  var upperX = b1.ur.x < b2.ur.x ? b1.ur.x : b2.ur.x;\n\n  // find the middle two Y values\n  var lowerY = b1.ll.y < b2.ll.y ? b2.ll.y : b1.ll.y;\n  var upperY = b1.ur.y < b2.ur.y ? b1.ur.y : b2.ur.y;\n\n  // put those middle values together to get the overlap\n  return { ll: { x: lowerX, y: lowerY }, ur: { x: upperX, y: upperY } };\n};\n\n/* Returns a list of unique corners.\n * Will contain one, two or four points */\nvar getUniqueCorners = exports.getUniqueCorners = function getUniqueCorners(bbox) {\n  var xmin = bbox.ll.x;\n  var ymin = bbox.ll.y;\n  var xmax = bbox.ur.x;\n  var ymax = bbox.ur.y;\n  var xEq = (0, _flp.cmp)(xmin, xmax) === 0;\n  var yEq = (0, _flp.cmp)(ymin, ymax) === 0;\n  if (xEq && yEq) return [{ x: xmin, y: ymin }];\n  if (xEq) return [{ x: xmin, y: ymin }, { x: xmin, y: ymax }];\n  if (yEq) return [{ x: xmin, y: ymin }, { x: xmax, y: ymin }];\n  return [{ x: xmin, y: ymin }, { x: xmin, y: ymax }, { x: xmax, y: ymin }, { x: xmax, y: ymax }];\n};\n\n//# sourceURL=webpack://polygon-clipping/./src/bbox.js?')
                },
            "./src/clean-input.js":
                /*!****************************!*\
                  !*** ./src/clean-input.js ***!
                  \****************************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.errorOnSelfIntersectingRings = exports.cleanRing = exports.cleanMultiPoly = exports.forceMultiPoly = exports.pointsAsObjects = undefined;\n\nvar _flp = __webpack_require__(/*! ./flp */ \"./src/flp.js\");\n\nvar _vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n\n/* Given input geometry as a standard array-of-arrays geojson-style\n * geometry, return one that uses objects as points, for better perf */\nvar pointsAsObjects = exports.pointsAsObjects = function pointsAsObjects(geom) {\n  // we can handle well-formed multipolys and polys\n  var output = [];\n  if (!Array.isArray(geom)) {\n    throw new Error('Input is not a Polygon or MultiPolygon');\n  }\n  for (var i = 0, iMax = geom.length; i < iMax; i++) {\n    if (!Array.isArray(geom[i])) {\n      throw new Error('Input is not a Polygon or MultiPolygon');\n    }\n    output.push([]);\n    for (var j = 0, jMax = geom[i].length; j < jMax; j++) {\n      if (!Array.isArray(geom[i][j])) {\n        throw new Error('Input is not a Polygon or MultiPolygon');\n      }\n      if (geom[i][j].length === 2) {\n        output[i].push({ x: geom[i][j][0], y: geom[i][j][1] });\n        continue;\n      }\n      output[i].push([]);\n      for (var k = 0, kMax = geom[i][j].length; k < kMax; k++) {\n        if (!Array.isArray(geom[i][j][k]) || geom[i][j][k].length !== 2) {\n          throw new Error('Input is not a Polygon or MultiPolygon');\n        }\n        output[i][j].push({ x: geom[i][j][k][0], y: geom[i][j][k][1] });\n      }\n    }\n  }\n  return output;\n};\n\n/* WARN: input modified directly */\nvar forceMultiPoly = exports.forceMultiPoly = function forceMultiPoly(geom) {\n  if (Array.isArray(geom)) {\n    if (geom.length === 0) return; // allow empty multipolys\n\n    if (Array.isArray(geom[0])) {\n      if (Array.isArray(geom[0][0])) {\n        if (typeof geom[0][0][0].x === 'number' && typeof geom[0][0][0].y === 'number') {\n          // multipolygon\n          return;\n        }\n      }\n      if (typeof geom[0][0].x === 'number' && typeof geom[0][0].y === 'number') {\n        // polygon\n        geom.unshift(geom.splice(0));\n        return;\n      }\n    }\n  }\n  throw new Error('Unrecognized input - not a polygon nor multipolygon');\n};\n\n/* WARN: input modified directly */\nvar cleanMultiPoly = exports.cleanMultiPoly = function cleanMultiPoly(multipoly) {\n  var i = 0;\n  while (i < multipoly.length) {\n    var poly = multipoly[i];\n    if (poly.length === 0) {\n      multipoly.splice(i, 1);\n      continue;\n    }\n\n    var exteriorRing = poly[0];\n    cleanRing(exteriorRing);\n    // poly is dropped if exteriorRing is degenerate\n    if (exteriorRing.length === 0) {\n      multipoly.splice(i, 1);\n      continue;\n    }\n\n    var j = 1;\n    while (j < poly.length) {\n      var interiorRing = poly[j];\n      cleanRing(interiorRing);\n      if (interiorRing.length === 0) poly.splice(j, 1);else j++;\n    }\n\n    i++;\n  }\n};\n\n/* Clean ring:\n *  - remove duplicate points\n *  - remove colinear points\n *  - remove rings with no area (less than 3 distinct points)\n *  - close rings (last point should equal first)\n *\n * WARN: input modified directly */\nvar cleanRing = exports.cleanRing = function cleanRing(ring) {\n  if (ring.length === 0) return;\n  if ((0, _flp.cmpPoints)(ring[0], ring[ring.length - 1]) !== 0) {\n    ring.push({ x: ring[0].x, y: ring[0].y }); // copy by value\n  }\n\n  var isPointUncessary = function isPointUncessary(prevPt, pt, nextPt) {\n    return (0, _flp.cmpPoints)(prevPt, pt) === 0 || (0, _flp.cmpPoints)(pt, nextPt) === 0 || (0, _vector.compareVectorAngles)(pt, prevPt, nextPt) === 0;\n  };\n\n  var i = 1;\n  while (i < ring.length - 1) {\n    if (isPointUncessary(ring[i - 1], ring[i], ring[i + 1])) ring.splice(i, 1);else i++;\n  }\n\n  // check the first/last point as well\n  while (ring.length > 2) {\n    if (!isPointUncessary(ring[ring.length - 2], ring[0], ring[1])) break;\n    ring.splice(0, 1);\n    ring.splice(ring.length - 1, 1);\n    ring.push(ring[0]);\n  }\n\n  // if our ring has less than 3 distinct points now (so is degenerate)\n  // shrink it down to the empty array to communicate to our caller to\n  // drop it\n  while (ring.length < 4 && ring.length > 0) {\n    ring.pop();\n  }\n};\n\n/* Scan the already-linked events of the segments for any\n * self-intersecting input rings (which are not supported) */\nvar errorOnSelfIntersectingRings = exports.errorOnSelfIntersectingRings = function errorOnSelfIntersectingRings(segments) {\n  var _loop = function _loop(i, iMax) {\n    var seg = segments[i];\n\n    var evt = seg.flowIntoSE;\n\n    if (evt.linkedEvents.length > 2) {\n      var evtsThisRing = evt.linkedEvents.filter(function (other) {\n        return other.segment.ringIn === seg.ringIn;\n      });\n      if (evtsThisRing.length > 2) {\n        evtsThisRing.sort(evt.getLeftmostComparator(evt.otherSE));\n        var leftMostEvt = evtsThisRing[1]; // skip ourself\n        var rightMostEvt = evtsThisRing[evtsThisRing.length - 1];\n\n        // both the segment on our immediate left and right will flow\n        // 'out' in intersection point was a touch and not a crossing\n        if (leftMostEvt.segment.flowIntoSE === leftMostEvt || rightMostEvt.segment.flowIntoSE === rightMostEvt) {\n          throw new Error('Self-intersecting, crossing input ring found at ' + ('[' + evt.point.x + ', ' + evt.point.y + ']'));\n        }\n      }\n    }\n  };\n\n  for (var i = 0, iMax = segments.length; i < iMax; i++) {\n    _loop(i, iMax);\n  }\n};\n\n//# sourceURL=webpack://polygon-clipping/./src/clean-input.js?")
                },
            "./src/flp.js":
                /*!********************!*\
                  !*** ./src/flp.js ***!
                  \********************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/* Javascript doesn't do integer math. Everything is\n * floating point with percision Number.EPSILON.\n *\n * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON\n */\n\n// IE Polyfill\nif (Number.EPSILON === undefined) Number.EPSILON = Math.pow(2, -52);\n\nvar EPSILON_SQ = Number.EPSILON * Number.EPSILON;\n\n/* FLP comparator */\nvar cmp = exports.cmp = function cmp(a, b) {\n  // check if they're both 0\n  if (-Number.EPSILON < a && a < Number.EPSILON) {\n    if (-Number.EPSILON < b && b < Number.EPSILON) {\n      return 0;\n    }\n  }\n\n  // check if they're flp equal\n  if ((a - b) * (a - b) < EPSILON_SQ * a * b) {\n    return 0;\n  }\n\n  // normal comparison\n  return a < b ? -1 : 1;\n};\n\n/* FLP point comparator, favors point encountered first by sweep line */\nvar cmpPoints = exports.cmpPoints = function cmpPoints(aPt, bPt) {\n  // fist compare X, then compare Y\n\n  var a = aPt.x;\n  var b = bPt.x;\n\n  // inlined version of cmp() for performance boost\n  if (a <= -Number.EPSILON || Number.EPSILON <= a || b <= -Number.EPSILON || Number.EPSILON <= b) {\n    var diff = a - b;\n    if (diff * diff >= EPSILON_SQ * a * b) {\n      return a < b ? -1 : 1;\n    }\n  }\n\n  a = aPt.y;\n  b = bPt.y;\n\n  // inlined version of cmp() for performance boost\n  if (a <= -Number.EPSILON || Number.EPSILON <= a || b <= -Number.EPSILON || Number.EPSILON <= b) {\n    var _diff = a - b;\n    if (_diff * _diff >= EPSILON_SQ * a * b) {\n      return a < b ? -1 : 1;\n    }\n  }\n\n  // they're the same\n  return 0;\n};\n\n//# sourceURL=webpack://polygon-clipping/./src/flp.js?")
                },
            "./src/geom-in.js":
                /*!************************!*\
                  !*** ./src/geom-in.js ***!
                  \************************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.MultiPoly = exports.Poly = exports.Ring = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _segment = __webpack_require__(/*! ./segment */ \"./src/segment.js\");\n\nvar _segment2 = _interopRequireDefault(_segment);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Give rings unique ID's to get consistent sorting of segments\n// and sweep events when all else is identical\nvar ringId = 0;\n\nvar Ring = exports.Ring = function () {\n  function Ring(geomRing, poly) {\n    _classCallCheck(this, Ring);\n\n    this.id = ringId++;\n    this.poly = poly;\n    this.segments = [];\n\n    for (var i = 1, iMax = geomRing.length; i < iMax; i++) {\n      this.segments.push(new _segment2.default(geomRing[i - 1], geomRing[i], this));\n    }\n  }\n\n  _createClass(Ring, [{\n    key: 'getSweepEvents',\n    value: function getSweepEvents() {\n      var sweepEvents = [];\n      for (var i = 0, iMax = this.segments.length; i < iMax; i++) {\n        var segment = this.segments[i];\n        sweepEvents.push(segment.leftSE);\n        sweepEvents.push(segment.rightSE);\n      }\n      return sweepEvents;\n    }\n  }, {\n    key: 'isValid',\n\n\n    /* Given a segment on this rings with these relationships to other rings,\n     * is it a valid segment of the ring's poly? */\n    value: function isValid(ringsSameSLER, ringsDiffSLER, ringsInsideOf) {\n      var exterior = this.poly.exteriorRing;\n      var interiors = this.poly.interiorRings;\n\n      if (this === exterior) {\n        // exterior segments inside or interior, nope\n        for (var i = 0, iMax = ringsInsideOf.length; i < iMax; i++) {\n          if (interiors.includes(ringsInsideOf[i])) return false;\n        }\n\n        // overlap with an interior of same SWL orientatio, nope\n        for (var _i = 0, _iMax = ringsSameSLER.length; _i < _iMax; _i++) {\n          if (interiors.includes(ringsSameSLER[_i])) return false;\n        }\n\n        return true;\n      }\n\n      // interior rings that aren't inside the exterior nor\n      // overlapping with different SWE\n      if (!ringsInsideOf.includes(exterior)) {\n        if (!ringsDiffSLER.includes(exterior)) return false;\n      }\n\n      // interior rings inside another interior, nope\n      for (var _i2 = 0, _iMax2 = ringsInsideOf.length; _i2 < _iMax2; _i2++) {\n        if (interiors.includes(ringsInsideOf[_i2])) return false;\n      }\n\n      // overlapping interiors with different sweep line orientation, nope\n      for (var _i3 = 0, _iMax3 = ringsDiffSLER.length; _i3 < _iMax3; _i3++) {\n        if (interiors.includes(ringsDiffSLER[_i3])) return false;\n      }\n\n      return true;\n    }\n  }, {\n    key: 'isExterior',\n    get: function get() {\n      return this.poly.exteriorRing === this;\n    }\n  }, {\n    key: 'isInterior',\n    get: function get() {\n      return this.poly.exteriorRing !== this;\n    }\n  }]);\n\n  return Ring;\n}();\n\nvar Poly = exports.Poly = function () {\n  function Poly(geomPoly, multiPoly) {\n    _classCallCheck(this, Poly);\n\n    this.exteriorRing = new Ring(geomPoly[0], this);\n    this.interiorRings = [];\n    for (var i = 1, iMax = geomPoly.length; i < iMax; i++) {\n      this.interiorRings.push(new Ring(geomPoly[i], this));\n    }\n    this.multiPoly = multiPoly;\n  }\n\n  _createClass(Poly, [{\n    key: 'getSweepEvents',\n    value: function getSweepEvents() {\n      var sweepEvents = this.exteriorRing.getSweepEvents();\n      for (var i = 0, iMax = this.interiorRings.length; i < iMax; i++) {\n        var ringSweepEvents = this.interiorRings[i].getSweepEvents();\n        for (var j = 0, jMax = ringSweepEvents.length; j < jMax; j++) {\n          sweepEvents.push(ringSweepEvents[j]);\n        }\n      }\n      return sweepEvents;\n    }\n\n    /* Given a segment with these rings, is that segment inside this polygon? */\n\n  }, {\n    key: 'isInside',\n    value: function isInside(ringsOnEdgeOf, ringsInsideOf) {\n      // if we're on an edge, we can't be inside\n      for (var i = 0, iMax = ringsOnEdgeOf.length; i < iMax; i++) {\n        if (ringsOnEdgeOf[i].poly === this) return false;\n      }\n\n      // we need to be inside the exterior, and nothing else\n      var isInsideExterior = false;\n      for (var _i4 = 0, _iMax4 = ringsInsideOf.length; _i4 < _iMax4; _i4++) {\n        var ring = ringsInsideOf[_i4];\n        if (ring.poly !== this) continue;\n        if (ring.isInterior) return false;\n        isInsideExterior = true;\n      }\n      return isInsideExterior;\n    }\n  }]);\n\n  return Poly;\n}();\n\nvar MultiPoly = exports.MultiPoly = function () {\n  function MultiPoly(geomMultiPoly) {\n    _classCallCheck(this, MultiPoly);\n\n    this.polys = [];\n    for (var i = 0, iMax = geomMultiPoly.length; i < iMax; i++) {\n      this.polys.push(new Poly(geomMultiPoly[i], this));\n    }\n    this.isSubject = false;\n  }\n\n  _createClass(MultiPoly, [{\n    key: 'markAsSubject',\n    value: function markAsSubject() {\n      this.isSubject = true;\n    }\n  }, {\n    key: 'getSweepEvents',\n    value: function getSweepEvents() {\n      var sweepEvents = [];\n      for (var i = 0, iMax = this.polys.length; i < iMax; i++) {\n        var polySweepEvents = this.polys[i].getSweepEvents();\n        for (var j = 0, jMax = polySweepEvents.length; j < jMax; j++) {\n          sweepEvents.push(polySweepEvents[j]);\n        }\n      }\n      return sweepEvents;\n    }\n  }]);\n\n  return MultiPoly;\n}();\n\n//# sourceURL=webpack://polygon-clipping/./src/geom-in.js?")
                },
            "./src/geom-out.js":
                /*!*************************!*\
                  !*** ./src/geom-out.js ***!
                  \*************************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.MultiPoly = exports.Poly = exports.Ring = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Ring = exports.Ring = function () {\n  _createClass(Ring, null, [{\n    key: 'factory',\n\n    /* Given the segments from the sweep line pass, compute & return a series\n     * of closed rings from all the segments marked to be part of the result */\n    value: function factory(allSegments) {\n      var ringsOut = [];\n\n      for (var i = 0, iMax = allSegments.length; i < iMax; i++) {\n        var segment = allSegments[i];\n        if (!segment.isInResult || segment.ringOut) continue;\n\n        var prevEvent = null;\n        var event = segment.leftSE;\n        var nextEvent = segment.rightSE;\n        var events = [event];\n\n        var startingLE = event.linkedEvents;\n        var intersectionLEs = [];\n\n        /* Walk the chain of linked events to form a closed ring */\n        while (true) {\n          prevEvent = event;\n          event = nextEvent;\n          events.push(event);\n\n          /* Is the ring complete? */\n          if (event.linkedEvents === startingLE) break;\n\n          while (true) {\n            var availableLEs = event.getAvailableLinkedEvents();\n\n            /* Did we hit a dead end? This shouldn't happen. Indicates some earlier\n             * part of the algorithm malfunctioned... please file a bug report. */\n            if (availableLEs.length === 0) {\n              var firstPt = events[0].point;\n              var lastPt = events[events.length - 1].point;\n              throw new Error('Unable to complete output ring starting at [' + firstPt.x + ',' + (' ' + firstPt.y + ']. Last matching segment found ends at ') + (' [' + lastPt.x + ', ' + lastPt.y + '].'));\n            }\n\n            /* Only one way to go, so cotinue on the path */\n            if (availableLEs.length === 1) {\n              nextEvent = availableLEs[0].otherSE;\n              break;\n            }\n\n            /* We must have an intersection. Check for a completed loop */\n            var indexLE = null;\n            for (var j = 0, jMax = intersectionLEs.length; j < jMax; j++) {\n              if (intersectionLEs[j].linkedEvents === event.linkedEvents) {\n                indexLE = j;\n                break;\n              }\n            }\n            /* Found a completed loop. Cut that off and make a ring */\n            if (indexLE !== null) {\n              var intersectionLE = intersectionLEs.splice(indexLE)[0];\n              var ringEvents = events.splice(intersectionLE.index);\n              ringEvents.unshift(ringEvents[0].otherSE);\n              ringsOut.push(new Ring(ringEvents.reverse()));\n              continue;\n            }\n            /* register the intersection */\n            intersectionLEs.push({\n              index: events.length,\n              linkedEvents: event.linkedEvents\n            });\n            /* Choose the left-most option to continue the walk */\n            var comparator = event.getLeftmostComparator(prevEvent);\n            nextEvent = availableLEs.sort(comparator)[0].otherSE;\n            break;\n          }\n        }\n\n        ringsOut.push(new Ring(events));\n      }\n      return ringsOut;\n    }\n  }]);\n\n  function Ring(events) {\n    _classCallCheck(this, Ring);\n\n    this.events = events;\n    for (var i = 0, iMax = events.length; i < iMax; i++) {\n      events[i].segment.registerRingOut(this);\n    }\n    this.poly = null;\n    this._clearCache();\n  }\n\n  _createClass(Ring, [{\n    key: 'registerPoly',\n    value: function registerPoly(poly) {\n      this.poly = poly;\n    }\n  }, {\n    key: 'getGeom',\n    value: function getGeom() {\n      // Remove superfluous points (ie extra points along a straight line),\n      var points = [[this.events[0].point.x, this.events[0].point.y]];\n      for (var i = 1, iMax = this.events.length - 1; i < iMax; i++) {\n        var _prevPt = this.events[i - 1].point;\n        var _pt = this.events[i].point;\n        var _nextPt = this.events[i + 1].point;\n        if ((0, _vector.compareVectorAngles)(_pt, _prevPt, _nextPt) === 0) continue;\n        points.push([_pt.x, _pt.y]);\n      }\n\n      // check if the starting point is necessary\n      var prevPt = this.events[this.events.length - 2].point;\n      var pt = this.events[0].point;\n      var nextPt = this.events[1].point;\n      if ((0, _vector.compareVectorAngles)(pt, prevPt, nextPt) === 0) points.shift();\n\n      // ring was all (within rounding error of angle calc) colinear points\n      if (points.length === 0) return null;\n\n      points.push(points[0]);\n      return this.isExteriorRing ? points : points.reverse();\n    }\n  }, {\n    key: '_clearCache',\n    value: function _clearCache() {\n      this._cache = {};\n    }\n  }, {\n    key: '_getCached',\n    value: function _getCached(propName, calcMethod) {\n      // if this._cache[something] isn't set, fill it with this._something()\n      if (this._cache[propName] === undefined) {\n        this._cache[propName] = this['_' + propName].bind(this)();\n      }\n      return this._cache[propName];\n    }\n  }, {\n    key: '_isExteriorRing',\n    value: function _isExteriorRing() {\n      if (!this.enclosingRing) return true;\n      if (!this.enclosingRing.enclosingRing) return false;\n      // an island in hole is a whole new polygon\n      return this.enclosingRing.enclosingRing.isExteriorRing;\n    }\n\n    /* Returns the ring that encloses this one, if any */\n\n  }, {\n    key: '_enclosingRing',\n    value: function _enclosingRing() {\n      var prevSeg = this.events[0].segment.prevInResult;\n      while (prevSeg && prevSeg.ringOut === this) {\n        prevSeg = prevSeg.prevInResult;\n      }var prevPrevSeg = prevSeg ? prevSeg.prevInResult : null;\n\n      while (true) {\n        // no segment found, thus no ring can enclose us\n        if (!prevSeg) return null;\n\n        // no segments below prev segment found, thus the ring of the prev\n        // segment must loop back around and enclose us\n        if (!prevPrevSeg) return prevSeg.ringOut;\n\n        // if the two segments are of different rings, the ring of the prev\n        // segment must either loop around us or the ring of the prev prev\n        // seg, which would make us and the ring of the prev peers\n        if (prevPrevSeg.ringOut !== prevSeg.ringOut) {\n          if (prevPrevSeg.ringOut.enclosingRing !== prevSeg.ringOut) {\n            return prevSeg.ringOut;\n          } else return prevSeg.ringOut.enclosingRing;\n        }\n\n        // two segments are from the same ring, so this was a penisula\n        // of that ring. iterate downward, keep searching\n        prevSeg = prevPrevSeg.prevInResult;\n        prevPrevSeg = prevSeg ? prevSeg.prevInResult : null;\n      }\n    }\n  }, {\n    key: 'enclosingRing',\n    get: function get() {\n      return this._getCached('enclosingRing');\n    }\n  }, {\n    key: 'isExteriorRing',\n    get: function get() {\n      return this._getCached('isExteriorRing');\n    }\n  }]);\n\n  return Ring;\n}();\n\nvar Poly = exports.Poly = function () {\n  function Poly(exteriorRing) {\n    _classCallCheck(this, Poly);\n\n    this.exteriorRing = exteriorRing;\n    exteriorRing.registerPoly(this);\n    this.interiorRings = [];\n  }\n\n  _createClass(Poly, [{\n    key: 'addInterior',\n    value: function addInterior(ring) {\n      this.interiorRings.push(ring);\n      ring.registerPoly(this);\n    }\n  }, {\n    key: 'getGeom',\n    value: function getGeom() {\n      var geom = [this.exteriorRing.getGeom()];\n      // exterior ring was all (within rounding error of angle calc) colinear points\n      if (geom[0] === null) return null;\n      for (var i = 0, iMax = this.interiorRings.length; i < iMax; i++) {\n        var ringGeom = this.interiorRings[i].getGeom();\n        // interior ring was all (within rounding error of angle calc) colinear points\n        if (ringGeom === null) continue;\n        geom.push(ringGeom);\n      }\n      return geom;\n    }\n  }]);\n\n  return Poly;\n}();\n\nvar MultiPoly = exports.MultiPoly = function () {\n  function MultiPoly(rings) {\n    _classCallCheck(this, MultiPoly);\n\n    this.rings = rings;\n    this.polys = this._composePolys(rings);\n  }\n\n  _createClass(MultiPoly, [{\n    key: 'getGeom',\n    value: function getGeom() {\n      var geom = [];\n      for (var i = 0, iMax = this.polys.length; i < iMax; i++) {\n        var polyGeom = this.polys[i].getGeom();\n        // exterior ring was all (within rounding error of angle calc) colinear points\n        if (polyGeom === null) continue;\n        geom.push(polyGeom);\n      }\n      return geom;\n    }\n  }, {\n    key: '_composePolys',\n    value: function _composePolys(rings) {\n      var polys = [];\n      for (var i = 0, iMax = rings.length; i < iMax; i++) {\n        var ring = rings[i];\n        if (ring.poly) continue;\n        if (ring.isExteriorRing) polys.push(new Poly(ring));else {\n          if (!ring.enclosingRing.poly) polys.push(new Poly(ring.enclosingRing));\n          ring.enclosingRing.poly.addInterior(ring);\n        }\n      }\n      return polys;\n    }\n  }]);\n\n  return MultiPoly;\n}();\n\n//# sourceURL=webpack://polygon-clipping/./src/geom-out.js?")
                },
            "./src/index.js":
                /*!**********************!*\
                  !*** ./src/index.js ***!
                  \**********************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.default = doIt;\n\nvar _qheap = __webpack_require__(/*! qheap */ "./node_modules/qheap/index.js");\n\nvar _qheap2 = _interopRequireDefault(_qheap);\n\nvar _cleanInput = __webpack_require__(/*! ./clean-input.js */ "./src/clean-input.js");\n\nvar cleanInput = _interopRequireWildcard(_cleanInput);\n\nvar _geomIn = __webpack_require__(/*! ./geom-in */ "./src/geom-in.js");\n\nvar geomIn = _interopRequireWildcard(_geomIn);\n\nvar _geomOut = __webpack_require__(/*! ./geom-out */ "./src/geom-out.js");\n\nvar geomOut = _interopRequireWildcard(_geomOut);\n\nvar _operation = __webpack_require__(/*! ./operation */ "./src/operation.js");\n\nvar _operation2 = _interopRequireDefault(_operation);\n\nvar _sweepEvent = __webpack_require__(/*! ./sweep-event */ "./src/sweep-event.js");\n\nvar _sweepEvent2 = _interopRequireDefault(_sweepEvent);\n\nvar _sweepLine = __webpack_require__(/*! ./sweep-line */ "./src/sweep-line.js");\n\nvar _sweepLine2 = _interopRequireDefault(_sweepLine);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction doIt(operationType, geom, moreGeoms) {\n  /* Make a copy of the input geometry with points as objects, for perf */\n  var geoms = [cleanInput.pointsAsObjects(geom)];\n  for (var i = 0, iMax = moreGeoms.length; i < iMax; i++) {\n    geoms.push(cleanInput.pointsAsObjects(moreGeoms[i]));\n  }\n\n  /* Clean inputs */\n  for (var _i = 0, _iMax = geoms.length; _i < _iMax; _i++) {\n    cleanInput.forceMultiPoly(geoms[_i]);\n    cleanInput.cleanMultiPoly(geoms[_i]);\n  }\n\n  /* Convert inputs to MultiPoly objects, mark subject & register operation */\n  var multipolys = [];\n  for (var _i2 = 0, _iMax2 = geoms.length; _i2 < _iMax2; _i2++) {\n    multipolys.push(new geomIn.MultiPoly(geoms[_i2]));\n  }\n  multipolys[0].markAsSubject();\n  _operation2.default.register(operationType, multipolys.length);\n\n  /* Put segment endpoints in a priority queue */\n  var queue = new _qheap2.default({ comparBefore: _sweepEvent2.default.compareBefore });\n  for (var _i3 = 0, _iMax3 = multipolys.length; _i3 < _iMax3; _i3++) {\n    var sweepEvents = multipolys[_i3].getSweepEvents();\n    for (var j = 0, jMax = sweepEvents.length; j < jMax; j++) {\n      queue.insert(sweepEvents[j]);\n    }\n  }\n\n  /* Pass the sweep line over those endpoints */\n  var sweepLine = new _sweepLine2.default();\n  while (queue.length) {\n    var newEvents = sweepLine.process(queue.remove());\n    for (var _i4 = 0, _iMax4 = newEvents.length; _i4 < _iMax4; _i4++) {\n      queue.insert(newEvents[_i4]);\n    }\n  }\n\n  /* Error on self-crossing input rings */\n  cleanInput.errorOnSelfIntersectingRings(sweepLine.segments);\n\n  /* Collect and compile segments we\'re keeping into a multipolygon */\n  var ringsOut = geomOut.Ring.factory(sweepLine.segments);\n  var result = new geomOut.MultiPoly(ringsOut);\n  return result.getGeom();\n}\n\n//# sourceURL=webpack://polygon-clipping/./src/index.js?')
                },
            "./src/operation.js":
                /*!**************************!*\
                  !*** ./src/operation.js ***!
                  \**************************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Operation = function () {\n  function Operation() {\n    _classCallCheck(this, Operation);\n\n    this.types = {\n      INTERSECTION: 0,\n      UNION: 1,\n      XOR: 2,\n      DIFFERENCE: 3\n    };\n  }\n\n  _createClass(Operation, [{\n    key: "register",\n    value: function register(type, numMultiPolys) {\n      this.type = type;\n      this.numMultiPolys = numMultiPolys;\n    }\n  }]);\n\n  return Operation;\n}();\n\n// global to register details about the operation on\n\n\nvar operation = new Operation();\n\nexports.default = operation;\n\n//# sourceURL=webpack://polygon-clipping/./src/operation.js?')
                },
            "./src/segment.js":
                /*!************************!*\
                  !*** ./src/segment.js ***!
                  \************************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _operation = __webpack_require__(/*! ./operation */ \"./src/operation.js\");\n\nvar _operation2 = _interopRequireDefault(_operation);\n\nvar _sweepEvent = __webpack_require__(/*! ./sweep-event */ \"./src/sweep-event.js\");\n\nvar _sweepEvent2 = _interopRequireDefault(_sweepEvent);\n\nvar _bbox = __webpack_require__(/*! ./bbox */ \"./src/bbox.js\");\n\nvar _flp = __webpack_require__(/*! ./flp */ \"./src/flp.js\");\n\nvar _vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Segment = function () {\n  _createClass(Segment, null, [{\n    key: 'compare',\n    value: function compare(a, b) {\n      if (a === b) return 0;\n\n      var alx = a.leftSE.point.x;\n      var aly = a.leftSE.point.y;\n      var blx = b.leftSE.point.x;\n      var bly = b.leftSE.point.y;\n      var arx = a.rightSE.point.x;\n      var brx = b.rightSE.point.x;\n\n      // check if they're even in the same vertical plane\n      if ((0, _flp.cmp)(brx, alx) < 0) return 1;\n      if ((0, _flp.cmp)(arx, blx) < 0) return -1;\n\n      var cmpLeft = a.comparePoint(b.leftSE.point);\n      var cmpLX = (0, _flp.cmp)(alx, blx);\n\n      // are a and b colinear?\n      if (cmpLeft === 0 && a.comparePoint(b.rightSE.point) === 0 && b.comparePoint(a.leftSE.point) === 0 && b.comparePoint(a.rightSE.point) === 0) {\n        // colinear segments with non-matching left-endpoints, consider\n        // the more-left endpoint to be earlier\n        if (cmpLX !== 0) return cmpLX;\n\n        // colinear segments with matching left-endpoints, fall back\n        // on creation order of segments as a tie-breaker\n        // NOTE: we do not use segment length to break a tie here, because\n        //       when segments are split their length changes\n        if (a.ringIn.id !== b.ringIn.id) {\n          return a.ringIn.id < b.ringIn.id ? -1 : 1;\n        }\n      } else {\n        // not colinear\n\n        // if the our left endpoints are not in the same vertical line,\n        // consider a vertical line at the rightmore of the two left endpoints,\n        // consider the segment that intersects lower with that line to be earlier\n        if (cmpLX < 0) return cmpLeft === 1 ? -1 : 1;\n        if (cmpLX > 0) return b.comparePoint(a.leftSE.point) === 1 ? 1 : -1;\n\n        // if our left endpoints match, consider the segment\n        // that angles more downward to be earlier\n        if (cmpLX === 0 && (0, _flp.cmp)(a.leftSE.point.y, b.leftSE.point.y) === 0) {\n          return a.comparePoint(b.rightSE.point) > 0 ? -1 : 1;\n        }\n\n        // left endpoints are in the same vertical line but don't overlap exactly,\n        // lower means ealier\n        return (0, _flp.cmp)(aly, bly);\n      }\n\n      throw new Error('Segment comparison (from [' + a.leftSE.point.x + ', ' + a.leftSR.point.y + '])' + (' -> to [' + a.rightSE.point.x + ', ' + a.rightSE.point.y + ']) failed... ') + ' segments equal but not identical?');\n    }\n  }]);\n\n  function Segment(point1, point2, ring) {\n    _classCallCheck(this, Segment);\n\n    this.ringIn = ring;\n    this.ringOut = null;\n\n    var ptCmp = (0, _flp.cmpPoints)(point1, point2);\n    var lp = void 0;\n    var rp = void 0;\n    if (ptCmp < 0) {\n      lp = point1;\n      rp = point2;\n      this.flowL2R = true;\n    } else if (ptCmp > 0) {\n      lp = point2;\n      rp = point1;\n      this.flowL2R = false;\n    } else {\n      throw new Error('Tried to create degenerate segment at [' + point1.x + ', ' + point1.y + ']');\n    }\n\n    this.leftSE = new _sweepEvent2.default(lp, this);\n    this.rightSE = new _sweepEvent2.default(rp, this);\n\n    // cache of dynamically computed properies\n    this._clearCache();\n  }\n\n  _createClass(Segment, [{\n    key: 'clone',\n    value: function clone() {\n      var seg = new Segment(this.leftSE.point, this.rightSE.point, this.ringIn);\n      seg.flowL2R = this.flowL2R;\n      return seg;\n    }\n  }, {\n    key: 'getOtherSE',\n    value: function getOtherSE(se) {\n      if (se === this.leftSE) return this.rightSE;\n      if (se === this.rightSE) return this.leftSE;\n      throw new Error('may only be called by own sweep events');\n    }\n  }, {\n    key: 'isAnEndpoint',\n    value: function isAnEndpoint(point) {\n      return (0, _flp.cmpPoints)(point, this.leftSE.point) === 0 || (0, _flp.cmpPoints)(point, this.rightSE.point) === 0;\n    }\n  }, {\n    key: 'isPointOn',\n    value: function isPointOn(point) {\n      return (0, _bbox.isInBbox)(this.bbox, point) && this.comparePoint(point) === 0;\n    }\n\n    /* Compare this segment with a point. Return value indicates\n     *    1: point is below segment\n     *    0: point is colinear to segment\n     *   -1: point is above segment */\n\n  }, {\n    key: 'comparePoint',\n    value: function comparePoint(point) {\n      if (this.isAnEndpoint(point)) return 0;\n      return (0, _vector.compareVectorAngles)(point, this.leftSE.point, this.rightSE.point);\n    }\n\n    /**\n     * Given another segment, returns an array of intersection points\n     * between the two segments. The returned array can contain:\n     *  * zero points:  no intersection b/t segments\n     *  * one point:    segments intersect once\n     *  * two points:   segments overlap. Endpoints of overlap returned.\n     *                  Will be ordered as sweep line would encounter them.\n     */\n\n  }, {\n    key: 'getIntersections',\n    value: function getIntersections(other) {\n      // If bboxes don't overlap, there can't be any intersections\n      var bboxOverlap = (0, _bbox.getBboxOverlap)(this.bbox, other.bbox);\n      if (bboxOverlap === null) return [];\n\n      // The general algorithim doesn't handle overlapping colinear segments.\n      // Overlapping colinear segments, if present, will have intersections\n      // of one pair of opposing corners of the bbox overlap. Thus we just\n      // manually check those coordinates.\n      //\n      // Note this also handles the cases of a collapsed bbox (just one point)\n      // and semi-collapsed bbox (a vertical or horizontal line) as well.\n      //\n      // In addition, in the case of a T-intersection, this ensures that the\n      // interseciton returned matches exactly an endpoint - no rounding error.\n      var intersections = [];\n      var bboxCorners = (0, _bbox.getUniqueCorners)(bboxOverlap);\n      for (var i = 0, iMax = bboxCorners.length; i < iMax; i++) {\n        var point = bboxCorners[i];\n        // test if this point is an intersection\n        if (this.isAnEndpoint(point) && other.isPointOn(point) || other.isAnEndpoint(point) && this.isPointOn(point)) {\n          intersections.push(point);\n        }\n      }\n      if (intersections.length > 0) return intersections;\n\n      // General case for non-overlapping segments.\n      // This algorithm is based on Schneider and Eberly.\n      // http://www.cimec.org.ar/~ncalvo/Schneider_Eberly.pdf - pg 244\n      var al = this.leftSE.point;\n      var bl = other.leftSE.point;\n      var va = this.vector;\n      var vb = other.vector;\n      var ve = { x: bl.x - al.x, y: bl.y - al.y };\n      var kross = (0, _vector.crossProduct)(va, vb);\n\n      // not on line segment a\n      var s = (0, _vector.crossProduct)(ve, vb) / kross;\n      if ((0, _flp.cmp)(s, 0) < 0 || (0, _flp.cmp)(1, s) < 0) return [];\n\n      var t = (0, _vector.crossProduct)(ve, va) / kross;\n      if ((0, _flp.cmp)(t, 0) < 0 || (0, _flp.cmp)(1, t) < 0) return [];\n\n      // intersection is in a midpoint of both lines, let's average them and\n      // bound the result by org bbox (otherwise leftSE and rightSE could swap)\n      var x = (al.x + s * va.x + bl.x + t * vb.x) / 2;\n      var y = (al.y + s * va.y + bl.y + t * vb.y) / 2;\n      if (x < bboxOverlap.ll.x) x = bboxOverlap.ll.x;\n      if (x > bboxOverlap.ur.x) x = bboxOverlap.ur.x;\n      if (y < bboxOverlap.ll.y) y = bboxOverlap.ll.y;\n      if (y > bboxOverlap.ur.y) y = bboxOverlap.ur.y;\n      return [{ x: x, y: y }];\n    }\n\n    /**\n     * Split the given segment into multiple segments on the given points.\n     *  * The existing segment will retain it's leftSE and a new rightSE will be\n     *    generated for it.\n     *  * A new segment will be generated which will adopt the original segment's\n     *    rightSE, and a new leftSE will be generated for it.\n     *  * If there are more than two points given to split on, new segments\n     *    in the middle will be generated with new leftSE and rightSE's.\n     *  * An array of the newly generated SweepEvents will be returned.\n     */\n\n  }, {\n    key: 'split',\n    value: function split(points) {\n      // sort them and unique-ify them\n      points.sort(_flp.cmpPoints);\n      points = points.filter(function (pt, i, pts) {\n        return i === 0 || (0, _flp.cmpPoints)(pts[i - 1], pt) !== 0;\n      });\n\n      for (var i = 0, iMax = points.length; i < iMax; i++) {\n        var pt = points[i];\n        if (this.isAnEndpoint(pt)) {\n          throw new Error('Cannot split segment upon endpoint at [' + pt.x + ', ' + pt.y + ']');\n        }\n      }\n\n      var point = points.shift();\n      var newSeg = this.clone();\n      newSeg.leftSE = new _sweepEvent2.default(point, newSeg);\n      newSeg.rightSE = this.rightSE;\n      this.rightSE.segment = newSeg;\n      this.rightSE = new _sweepEvent2.default(point, this);\n      var newEvents = [this.rightSE, newSeg.leftSE];\n\n      if (points.length > 0) {\n        var moreNewEvents = newSeg.split(points);\n        for (var _i = 0, _iMax = moreNewEvents.length; _i < _iMax; _i++) {\n          newEvents.push(moreNewEvents[_i]);\n        }\n      }\n      return newEvents;\n    }\n  }, {\n    key: 'registerPrev',\n    value: function registerPrev(other) {\n      this.prev = other;\n      this._clearCache();\n    }\n  }, {\n    key: 'registerRingOut',\n    value: function registerRingOut(ring) {\n      this.ringOut = ring;\n    }\n\n    /* The first segment previous segment chain that is in the result */\n\n  }, {\n    key: '_prevInResult',\n    value: function _prevInResult() {\n      var prev = this.prev;\n      while (prev && !prev.isInResult) {\n        prev = prev.prev;\n      }return prev;\n    }\n\n    /* The segments, including ourselves, for which we overlap perfectly */\n\n  }, {\n    key: '_coincidents',\n    value: function _coincidents() {\n      // a coincident will have both left and right sweepEvents linked with us\n      var coincidents = [];\n      var leftLinkedEvents = this.leftSE.linkedEvents;\n      var rightLinkedEvents = this.rightSE.linkedEvents;\n      for (var i = 0, iMax = leftLinkedEvents.length; i < iMax; i++) {\n        var leftSE = leftLinkedEvents[i];\n        if (!leftSE.isLeft) continue;\n        if (leftSE.segment.rightSE.linkedEvents !== rightLinkedEvents) continue;\n        coincidents.push(leftSE.segment);\n      }\n\n      if (coincidents.length > 0) {\n        // put the 'winner' at the front\n        // arbitary - winner is the one with lowest ringId\n        coincidents.sort(function (a, b) {\n          return a.ringIn.id - b.ringIn.id;\n        });\n\n        // set this in all our coincident's caches so they don't have to calc it\n        for (var _i2 = 0, _iMax2 = coincidents.length; _i2 < _iMax2; _i2++) {\n          coincidents[_i2]._cache['coincidents'] = coincidents;\n        }\n      }\n      return coincidents;\n    }\n  }, {\n    key: '_prevNotCoincident',\n    value: function _prevNotCoincident() {\n      // iterating backwards from next to prev\n      var next = this;\n      var prev = this.prev;\n      while (prev && next.coincidents === prev.coincidents) {\n        next = prev;\n        prev = prev.prev;\n      }\n      return prev;\n    }\n\n    /* Does the sweep line, when it intersects this segment, enter the ring? */\n\n  }, {\n    key: '_sweepLineEntersRing',\n    value: function _sweepLineEntersRing() {\n      // opposite of previous segment on the same ring\n      var prev = this.prevNotCoincident;\n      while (prev) {\n        for (var i = 0, iMax = prev.coincidents.length; i < iMax; i++) {\n          var seg = prev.coincidents[i];\n          if (seg.ringIn === this.ringIn) return !seg.sweepLineEntersRing;\n        }\n        prev = prev.prevNotCoincident;\n      }\n      return true;\n    }\n\n    /* Does the sweep line, when it intersects this segment, enter the polygon? */\n\n  }, {\n    key: '_ringsInsideOf',\n    value: function _ringsInsideOf() {\n      if (!this.prev) return [];\n\n      // coincidents always share the same rings. Return same array to save mem\n      if (this.coincidents === this.prev.coincidents) {\n        return this.prev.ringsInsideOf;\n      }\n\n      var rings = [];\n      var prevRingsInsideOf = this.prev.ringsInsideOf;\n      var prevRingsEntering = this.prev.getRingsEntering();\n      var ringsExiting = this.getRingsExiting();\n\n      // rings our prev was inside of all count, except those we're exiting\n      for (var i = 0, iMax = prevRingsInsideOf.length; i < iMax; i++) {\n        var ring = prevRingsInsideOf[i];\n        if (!ringsExiting.includes(ring)) rings.push(ring);\n      }\n\n      // rings our prev was entering of all count, except those we're exiting\n      for (var _i3 = 0, _iMax3 = prevRingsEntering.length; _i3 < _iMax3; _i3++) {\n        var _ring = prevRingsEntering[_i3];\n        if (!ringsExiting.includes(_ring)) rings.push(_ring);\n      }\n\n      return rings;\n    }\n\n    /* Array of input rings this segment is on boundary of */\n\n  }, {\n    key: 'getRingsOnEdgeOf',\n    value: function getRingsOnEdgeOf() {\n      var rings = [];\n      for (var i = 0, iMax = this.coincidents.length; i < iMax; i++) {\n        rings.push(this.coincidents[i].ringIn);\n      }\n      return rings;\n    }\n\n    /* Array of input rings this segment is on boundary of,\n     * and for which the sweep line enters when intersecting there */\n\n  }, {\n    key: 'getRingsEntering',\n    value: function getRingsEntering() {\n      var rings = [];\n      for (var i = 0, iMax = this.coincidents.length; i < iMax; i++) {\n        var segment = this.coincidents[i];\n        if (!segment.sweepLineEntersRing) continue;\n        rings.push(segment.ringIn);\n      }\n      return rings;\n    }\n\n    /* Array of input rings this segment is on boundary of,\n     * and for which the sweep line exits when intersecting there */\n\n  }, {\n    key: 'getRingsExiting',\n    value: function getRingsExiting() {\n      var rings = [];\n      for (var i = 0, iMax = this.coincidents.length; i < iMax; i++) {\n        var segment = this.coincidents[i];\n        if (segment.sweepLineEntersRing) continue;\n        rings.push(segment.ringIn);\n      }\n      return rings;\n    }\n\n    /* Is this segment valid on our own polygon? (ie not outside exterior ring) */\n\n  }, {\n    key: '_isValidEdgeForPoly',\n    value: function _isValidEdgeForPoly() {\n      // SLER: sweep line entering orientation\n      var sameSLER = void 0;\n      var diffSLER = void 0;\n      if (this.sweepLineEntersRing) {\n        sameSLER = this.getRingsEntering();\n        diffSLER = this.getRingsExiting();\n      } else {\n        diffSLER = this.getRingsEntering();\n        sameSLER = this.getRingsExiting();\n      }\n      return this.ringIn.isValid(sameSLER, diffSLER, this.ringsInsideOf);\n    }\n\n    /* Array of multipolys this segment is inside of */\n\n  }, {\n    key: 'getMultiPolysInsideOf',\n    value: function getMultiPolysInsideOf() {\n      var mps = [];\n      for (var i = 0, iMax = this.ringsInsideOf.length; i < iMax; i++) {\n        var poly = this.ringsInsideOf[i].poly;\n        if (mps.includes(poly.multiPoly)) continue;\n        if (!poly.isInside(this.getRingsOnEdgeOf(), this.ringsInsideOf)) continue;\n        mps.push(poly.multiPoly);\n      }\n      return mps;\n    }\n\n    /* The multipolys on one side of us */\n\n  }, {\n    key: 'getMultiPolysSLPEnters',\n    value: function getMultiPolysSLPEnters(multiPolysInsideOf) {\n      // start with the multipolys we're fully inside\n      var mps = multiPolysInsideOf.slice();\n      // add the multipolys we have the sweep line entering\n      for (var i = 0, iMax = this.coincidents.length; i < iMax; i++) {\n        var seg = this.coincidents[i];\n        if (!seg.sweepLineEntersPoly) continue;\n        var mp = seg.ringIn.poly.multiPoly;\n        if (!mps.includes(mp)) mps.push(mp);\n      }\n      return mps;\n    }\n\n    /* The multipolys on the other side of us */\n\n  }, {\n    key: 'getMultiPolysSLPExits',\n    value: function getMultiPolysSLPExits(multiPolysInsideOf) {\n      // start with the multipolys we're fully inside\n      var mps = multiPolysInsideOf.slice();\n      // add the multipolys we have the sweep line entering\n      for (var i = 0, iMax = this.coincidents.length; i < iMax; i++) {\n        var seg = this.coincidents[i];\n        if (!seg.sweepLineExitsPoly) continue;\n        var mp = seg.ringIn.poly.multiPoly;\n        if (!mps.includes(mp)) mps.push(mp);\n      }\n      return mps;\n    }\n\n    /* Is this segment part of the final result? */\n\n  }, {\n    key: '_isInResult',\n    value: function _isInResult() {\n      // if it's not the coincidence winner, it's not in the resul\n      if (this !== this.coincidents[0]) return false;\n\n      var multiPolysInsideOf = this.getMultiPolysInsideOf();\n      var multiPolysSLPEnters = this.getMultiPolysSLPEnters(multiPolysInsideOf);\n      var multiPolysSLPExits = this.getMultiPolysSLPExits(multiPolysInsideOf);\n\n      switch (_operation2.default.type) {\n        case _operation2.default.types.UNION:\n          // UNION - included iff:\n          //  * On one side of us there is 0 poly interiors AND\n          //  * On the other side there is 1 or more.\n          var noEnters = multiPolysSLPEnters.length === 0;\n          var noExits = multiPolysSLPExits.length === 0;\n          return noEnters !== noExits;\n\n        case _operation2.default.types.INTERSECTION:\n          // INTERSECTION - included iff:\n          //  * on one side of us all multipolys are rep. with poly interiors AND\n          //  * on the other side of us, not all multipolys are repsented\n          //    with poly interiors\n          var least = void 0;\n          var most = void 0;\n          if (multiPolysSLPEnters.length < multiPolysSLPExits.length) {\n            least = multiPolysSLPEnters.length;\n            most = multiPolysSLPExits.length;\n          } else {\n            least = multiPolysSLPExits.length;\n            most = multiPolysSLPEnters.length;\n          }\n          return most === _operation2.default.numMultiPolys && least < most;\n\n        case _operation2.default.types.XOR:\n          // XOR - included iff:\n          //  * the difference between the number of multipolys represented\n          //    with poly interiors on our two sides is an odd number\n          var diff = Math.abs(multiPolysSLPEnters.length - multiPolysSLPExits.length);\n          return diff % 2 === 1;\n\n        case _operation2.default.types.DIFFERENCE:\n          // DIFFERENCE included iff:\n          //  * on exactly one side, we have just the subject\n          var isJustSubject = function isJustSubject(mps) {\n            return mps.length === 1 && mps[0].isSubject;\n          };\n          return isJustSubject(multiPolysSLPEnters) !== isJustSubject(multiPolysSLPExits);\n\n        default:\n          throw new Error('Unrecognized operation type found ' + _operation2.default.type);\n      }\n    }\n  }, {\n    key: '_clearCache',\n    value: function _clearCache() {\n      this._cache = {};\n    }\n  }, {\n    key: 'bbox',\n    get: function get() {\n      var y1 = this.leftSE.point.y;\n      var y2 = this.rightSE.point.y;\n      return {\n        ll: { x: this.leftSE.point.x, y: y1 < y2 ? y1 : y2 },\n        ur: { x: this.rightSE.point.x, y: y1 > y2 ? y1 : y2 }\n      };\n    }\n\n    /* A vector from the left point to the right */\n\n  }, {\n    key: 'vector',\n    get: function get() {\n      return {\n        x: this.rightSE.point.x - this.leftSE.point.x,\n        y: this.rightSE.point.y - this.leftSE.point.y\n      };\n    }\n  }, {\n    key: 'isVertical',\n    get: function get() {\n      return (0, _flp.cmp)(this.leftSE.point.x, this.rightSE.point.x) === 0;\n    }\n\n    /* In the original ringIn, which event came second */\n\n  }, {\n    key: 'flowIntoSE',\n    get: function get() {\n      return this.flowL2R ? this.rightSE : this.leftSE;\n    }\n  }, {\n    key: 'prevInResult',\n    get: function get() {\n      var key = 'prevInResult';\n      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();\n      return this._cache[key];\n    }\n  }, {\n    key: 'coincidents',\n    get: function get() {\n      var key = 'coincidents';\n      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();\n      return this._cache[key];\n    }\n  }, {\n    key: 'prevNotCoincident',\n    get: function get() {\n      var key = 'prevNotCoincident';\n      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();\n      return this._cache[key];\n    }\n  }, {\n    key: 'sweepLineEntersRing',\n    get: function get() {\n      var key = 'sweepLineEntersRing';\n      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();\n      return this._cache[key];\n    }\n  }, {\n    key: 'sweepLineEntersPoly',\n    get: function get() {\n      if (!this.isValidEdgeForPoly) return false;\n      return this.ringIn.isExterior === this.sweepLineEntersRing;\n    }\n\n    /* Does the sweep line, when it intersects this segment, exit the polygon? */\n\n  }, {\n    key: 'sweepLineExitsPoly',\n    get: function get() {\n      if (!this.isValidEdgeForPoly) return false;\n      return this.ringIn.isExterior !== this.sweepLineEntersRing;\n    }\n\n    /* Array of input rings this segment is inside of (not on boundary) */\n\n  }, {\n    key: 'ringsInsideOf',\n    get: function get() {\n      var key = 'ringsInsideOf';\n      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();\n      return this._cache[key];\n    }\n  }, {\n    key: 'isValidEdgeForPoly',\n    get: function get() {\n      var key = 'isValidEdgeForPoly';\n      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();\n      return this._cache[key];\n    }\n  }, {\n    key: 'isInResult',\n    get: function get() {\n      var key = 'isInResult';\n      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();\n      return this._cache[key];\n    }\n  }]);\n\n  return Segment;\n}();\n\nexports.default = Segment;\n\n//# sourceURL=webpack://polygon-clipping/./src/segment.js?")
                },
            "./src/sweep-event.js":
                /*!****************************!*\
                  !*** ./src/sweep-event.js ***!
                  \****************************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _flp = __webpack_require__(/*! ./flp */ \"./src/flp.js\");\n\nvar _vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar SweepEvent = function () {\n  _createClass(SweepEvent, null, [{\n    key: 'compareBefore',\n    value: function compareBefore(a, b) {\n      // favor event with a point that the sweep line hits first\n      var cmpX = (0, _flp.cmp)(a.point.x, b.point.x);\n      if (cmpX !== 0) return cmpX < 0;\n\n      var cmpY = (0, _flp.cmp)(a.point.y, b.point.y);\n      if (cmpY !== 0) return cmpY < 0;\n\n      // favor right events over left\n      if (a.isLeft !== b.isLeft) return !a.isLeft;\n\n      // favor events where the line segment is lower\n      var pointSegCmp = a.segment.comparePoint(b.otherSE.point);\n      if (pointSegCmp !== 0) return pointSegCmp > 0;\n\n      // as a tie-breaker, favor lower segment creation id\n      var aId = a.segment.ringIn.id;\n      var bId = b.segment.ringIn.id;\n      if (aId !== bId) return aId < bId;\n\n      // NOTE:  We don't sort on segment length because that changes\n      //        as segments are divided.\n\n      // they appear to be the same point... are they?\n      if (a === b) return false;\n\n      throw new Error('SweepEvent comparison failed at [' + a.point.x + ', ' + a.point.y + ']... ' + 'equal but not identical?');\n    }\n  }]);\n\n  function SweepEvent(point, segment) {\n    _classCallCheck(this, SweepEvent);\n\n    this.point = point;\n    this.segment = segment;\n    this.linkedEvents = [this];\n  }\n\n  _createClass(SweepEvent, [{\n    key: 'link',\n    value: function link(other) {\n      var otherLE = other.linkedEvents;\n      for (var i = 0, iMax = otherLE.length; i < iMax; i++) {\n        var evt = otherLE[i];\n        this.linkedEvents.push(evt);\n        evt.linkedEvents = this.linkedEvents;\n      }\n    }\n  }, {\n    key: 'getAvailableLinkedEvents',\n    value: function getAvailableLinkedEvents() {\n      var events = [];\n      for (var i = 0, iMax = this.linkedEvents.length; i < iMax; i++) {\n        var evt = this.linkedEvents[i];\n        if (evt !== this && !evt.segment.ringOut && evt.segment.isInResult) {\n          events.push(evt);\n        }\n      }\n      return events;\n    }\n\n    /**\n     * Returns a comparator function for sorting linked events that will\n     * favor the event that will give us the smallest left-side angle.\n     * All ring construction starts as low as possible heading to the right,\n     * so by always turning left as sharp as possible we'll get polygons\n     * without uncessary loops & holes.\n     *\n     * The comparator function has a compute cache such that it avoids\n     * re-computing already-computed values.\n     */\n\n  }, {\n    key: 'getLeftmostComparator',\n    value: function getLeftmostComparator(baseEvent) {\n      var _this = this;\n\n      var cache = new Map();\n\n      var fillCache = function fillCache(linkedEvent) {\n        var nextEvent = linkedEvent.otherSE;\n        cache.set(linkedEvent, {\n          sine: (0, _vector.sineOfAngle)(_this.point, baseEvent.point, nextEvent.point),\n          cosine: (0, _vector.cosineOfAngle)(_this.point, baseEvent.point, nextEvent.point)\n        });\n      };\n\n      return function (a, b) {\n        if (!cache.has(a)) fillCache(a);\n        if (!cache.has(b)) fillCache(b);\n\n        var _cache$get = cache.get(a),\n            asine = _cache$get.sine,\n            acosine = _cache$get.cosine;\n\n        var _cache$get2 = cache.get(b),\n            bsine = _cache$get2.sine,\n            bcosine = _cache$get2.cosine;\n\n        var cmpZeroASine = (0, _flp.cmp)(asine, 0);\n        var cmpZeroBSine = (0, _flp.cmp)(bsine, 0);\n\n        if (cmpZeroASine >= 0 && cmpZeroBSine >= 0) return (0, _flp.cmp)(bcosine, acosine);\n        if (cmpZeroASine < 0 && cmpZeroBSine < 0) return (0, _flp.cmp)(acosine, bcosine);\n        return (0, _flp.cmp)(bsine, asine);\n      };\n    }\n  }, {\n    key: 'isLeft',\n    get: function get() {\n      return this === this.segment.leftSE;\n    }\n  }, {\n    key: 'isRight',\n    get: function get() {\n      return this === this.segment.rightSE;\n    }\n  }, {\n    key: 'otherSE',\n    get: function get() {\n      return this.segment.getOtherSE(this);\n    }\n  }]);\n\n  return SweepEvent;\n}();\n\nexports.default = SweepEvent;\n\n//# sourceURL=webpack://polygon-clipping/./src/sweep-event.js?")
                },
            "./src/sweep-line.js":
                /*!***************************!*\
                  !*** ./src/sweep-line.js ***!
                  \***************************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _splaytree = __webpack_require__(/*! splaytree */ "./node_modules/splaytree/index.js");\n\nvar _splaytree2 = _interopRequireDefault(_splaytree);\n\nvar _flp = __webpack_require__(/*! ./flp */ "./src/flp.js");\n\nvar _segment = __webpack_require__(/*! ./segment */ "./src/segment.js");\n\nvar _segment2 = _interopRequireDefault(_segment);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\n/**\n * NOTE:  We must be careful not to change any segments while\n *        they are in the SplayTree. AFAIK, there\'s no way to tell\n *        the tree to rebalance itself - thus before splitting\n *        a segment that\'s in the tree, we remove it from the tree,\n *        do the split, then re-insert it. (Even though splitting a\n *        segment *shouldn\'t* change its correct position in the\n *        sweep line tree, the reality is because of rounding errors,\n *        it sometimes does.)\n */\n\nvar SweepLine = function () {\n  function SweepLine() {\n    var comparator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _segment2.default.compare;\n\n    _classCallCheck(this, SweepLine);\n\n    this.tree = new _splaytree2.default(comparator);\n    this.segments = [];\n    this.prevEvent = null;\n  }\n\n  _createClass(SweepLine, [{\n    key: \'process\',\n    value: function process(event) {\n      var segment = event.segment;\n      var newEvents = [];\n      var node = event.isLeft ? this.tree.insert(segment) : this.tree.find(segment);\n\n      var prevNode = this.tree.prev(node);\n      var prevSeg = prevNode ? prevNode.key : null;\n\n      var nextNode = this.tree.next(node);\n      var nextSeg = nextNode ? nextNode.key : null;\n\n      if (event.isLeft) {\n        var mySplitters = [];\n\n        // Check for intersections against the previous segment in the sweep line\n        if (prevSeg) {\n          var prevInters = prevSeg.getIntersections(segment);\n          if (prevInters.length > 0) {\n            var newEventsFromSplit = this._possibleSplit(prevSeg, prevInters);\n            for (var i = 0, iMax = newEventsFromSplit.length; i < iMax; i++) {\n              newEvents.push(newEventsFromSplit[i]);\n            }\n            for (var _i = 0, _iMax = prevInters.length; _i < _iMax; _i++) {\n              var pt = prevInters[_i];\n              if (!segment.isAnEndpoint(pt)) mySplitters.push(pt);\n            }\n          }\n        }\n\n        // Check for intersections against the next segment in the sweep line\n        if (nextSeg) {\n          var nextInters = nextSeg.getIntersections(segment);\n          if (nextInters.length > 0) {\n            var _newEventsFromSplit = this._possibleSplit(nextSeg, nextInters);\n            for (var _i2 = 0, _iMax2 = _newEventsFromSplit.length; _i2 < _iMax2; _i2++) {\n              newEvents.push(_newEventsFromSplit[_i2]);\n            }\n            for (var _i3 = 0, _iMax3 = nextInters.length; _i3 < _iMax3; _i3++) {\n              var _pt = nextInters[_i3];\n              if (!segment.isAnEndpoint(_pt)) mySplitters.push(_pt);\n            }\n          }\n        }\n\n        // did we get some intersections?\n        if (newEvents.length > 0 || mySplitters.length > 0) {\n          this.tree.remove(segment);\n\n          if (mySplitters.length > 0) {\n            var _newEventsFromSplit2 = segment.split(mySplitters);\n            for (var _i4 = 0, _iMax4 = _newEventsFromSplit2.length; _i4 < _iMax4; _i4++) {\n              newEvents.push(_newEventsFromSplit2[_i4]);\n            }\n          }\n\n          // Make sure sweep line ordering is totally consistent for later\n          // use with the segment \'prev\' pointers - re-do the current event.\n          newEvents.push(event);\n          return newEvents;\n        }\n\n        this.segments.push(segment);\n        segment.registerPrev(prevSeg);\n      } else {\n        // event.isRight\n\n        // since we\'re about to be removed from the sweep line, check for\n        // intersections between our previous and next segments\n        if (prevSeg && nextSeg) {\n          var inters = prevSeg.getIntersections(nextSeg);\n          if (inters.length > 0) {\n            var _newEventsFromSplit3 = this._possibleSplit(prevSeg, inters);\n            for (var _i5 = 0, _iMax5 = _newEventsFromSplit3.length; _i5 < _iMax5; _i5++) {\n              newEvents.push(_newEventsFromSplit3[_i5]);\n            }\n            _newEventsFromSplit3 = this._possibleSplit(nextSeg, inters);\n            for (var _i6 = 0, _iMax6 = _newEventsFromSplit3.length; _i6 < _iMax6; _i6++) {\n              newEvents.push(_newEventsFromSplit3[_i6]);\n            }\n          }\n        }\n\n        this.tree.remove(segment);\n      }\n\n      if (this.prevEvent && (0, _flp.cmpPoints)(this.prevEvent.point, event.point) === 0) {\n        this.prevEvent.link(event);\n      }\n      this.prevEvent = event;\n\n      return newEvents;\n    }\n  }, {\n    key: \'_possibleSplit\',\n    value: function _possibleSplit(segment, intersections) {\n      var splitters = [];\n      for (var i = 0, iMax = intersections.length; i < iMax; i++) {\n        var pt = intersections[i];\n        if (!segment.isAnEndpoint(pt)) splitters.push(pt);\n      }\n\n      var newEvents = void 0;\n      if (splitters.length > 0) {\n        this.tree.remove(segment);\n        newEvents = segment.split(splitters);\n        this.tree.insert(segment);\n      } else newEvents = [];\n      return newEvents;\n    }\n  }]);\n\n  return SweepLine;\n}();\n\nexports.default = SweepLine;\n\n//# sourceURL=webpack://polygon-clipping/./src/sweep-line.js?')
                },
            "./src/vector.js":
                /*!***********************!*\
                  !*** ./src/vector.js ***!
                  \***********************/
                /*! no static exports found */
                function(module, exports, __webpack_require__) {
                    "use strict";
                    eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.cosineOfAngle = exports.sineOfAngle = exports.compareVectorAngles = exports.dotProduct = exports.crossProduct = undefined;\n\nvar _flp = __webpack_require__(/*! ./flp */ "./src/flp.js");\n\n/* Cross Product of two vectors with first point at origin */\nvar crossProduct = exports.crossProduct = function crossProduct(a, b) {\n  return a.x * b.y - a.y * b.x;\n};\n\n/* Dot Product of two vectors with first point at origin */\nvar dotProduct = exports.dotProduct = function dotProduct(a, b) {\n  return a.x * b.x + a.y * b.y;\n};\n\n/* Comparator for two vectors with same starting point */\nvar compareVectorAngles = exports.compareVectorAngles = function compareVectorAngles(basePt, endPt1, endPt2) {\n  var v1 = { x: endPt1.x - basePt.x, y: endPt1.y - basePt.y };\n  var v2 = { x: endPt2.x - basePt.x, y: endPt2.y - basePt.y };\n  var kross = crossProduct(v1, v2);\n  return (0, _flp.cmp)(kross, 0);\n};\n\nvar length = function length(v) {\n  return Math.sqrt(dotProduct(v, v));\n};\n\n/* Get the sine of the angle from pShared -> pAngle to pShaed -> pBase */\nvar sineOfAngle = exports.sineOfAngle = function sineOfAngle(pShared, pBase, pAngle) {\n  var vBase = { x: pBase.x - pShared.x, y: pBase.y - pShared.y };\n  var vAngle = { x: pAngle.x - pShared.x, y: pAngle.y - pShared.y };\n  return crossProduct(vAngle, vBase) / length(vAngle) / length(vBase);\n};\n\n/* Get the cosine of the angle from pShared -> pAngle to pShaed -> pBase */\nvar cosineOfAngle = exports.cosineOfAngle = function cosineOfAngle(pShared, pBase, pAngle) {\n  var vBase = { x: pBase.x - pShared.x, y: pBase.y - pShared.y };\n  var vAngle = { x: pAngle.x - pShared.x, y: pAngle.y - pShared.y };\n  return dotProduct(vAngle, vBase) / length(vAngle) / length(vBase);\n};\n\n//# sourceURL=webpack://polygon-clipping/./src/vector.js?')
                }
        })
    }, module.exports = factory()
}, function(n, e, t) {
    var i = t(2);
    "string" == typeof i && (i = [
        [n.i, i, ""]
    ]);
    var r = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    t(6)(i, r);
    i.locals && (n.exports = i.locals)
}, function(n, e, t) {
    var i = t(3);
    (n.exports = t(4)(!1)).push([n.i, "\n/*   Icons  */\n\n.leaflet-control-paintpolygon-icon {\n    background-image: url(" + i(t(5)) + ");\n    background-repeat: no-repeat;\n    height: 30px;\n    width: 30px;\n}\n\n.leaflet-control-paintpolygon-icon-active {\n    -webkit-filter: invert(75%); /* Safari 6.0 - 9.0 */\n    filter: invert(75%);\n}\n\n.leaflet-control-paintpolygon-icon.leaflet-control-paintpolygon-icon-trash {\n    background-position: 0px 0px;\n}\n\n.leaflet-control-paintpolygon-icon.leaflet-control-paintpolygon-icon-brush {\n    background-position: 0px -30px;\n}\n\n.leaflet-control-paintpolygon-icon.leaflet-control-paintpolygon-icon-eraser {\n    background-position: 0px -60px;\n}\n\n.leaflet-control-paintpolygon-icon.leaflet-control-paintpolygon-icon-size {\n    background-position: 0px -90px;\n}\n\n\n/* Menu */\n\n.leaflet-control-paintpolygon-menu  {\n    background-color: #fff;\n    position: absolute;\n    border: 0!important;\n    max-width: 0;\n    max-height: 30px;\n    -webkit-transition: all 0.5s;\n    -moz-transition: all 0.5s;\n    -ms-transition: all 0.5s;\n    -o-transition: all 0.5s;\n    transition: all 0.5s;\n    display: inline-block;\n    overflow: hidden;\n    white-space: nowrap;\n}\n.leaflet-control-paintpolygon-menu-content  {\n    padding: 5px;\n    display: inline-block;\n    max-width: 250px;\n}\n\n.leaflet-control-paintpolygon-menu-open  {\n    border: inherit!important;\n    max-width: 250px;\n    max-height: 200px;\n}\n\n.leaflet-control-container .leaflet-top.leaflet-right .leaflet-control-paintpolygon-menu {\n    top: 60px;\n    right: 30px;\n}\n.leaflet-control-container .leaflet-top.leaflet-left .leaflet-control-paintpolygon-menu {\n    top: 60px;\n    left: 30px;\n}\n.leaflet-control-container .leaflet-bottom.leaflet-right .leaflet-control-paintpolygon-menu {\n    bottom: 0px;\n    right: 30px;\n}\n.leaflet-control-container .leaflet-bottom.leaflet-left .leaflet-control-paintpolygon-menu {\n    bottom: 0px;\n    left: 30px;\n}\n\n", ""])
}, function(n, e) {
    n.exports = function(n) {
        return "string" != typeof n ? n : (/^['"].*['"]$/.test(n) && (n = n.slice(1, -1)), /["'() \t\n]/.test(n) ? '"' + n.replace(/"/g, '\\"').replace(/\n/g, "\\n") + '"' : n)
    }
}, function(n, e) {
    n.exports = function(n) {
        var e = [];
        return e.toString = function() {
            return this.map(function(e) {
                var t = function(n, e) {
                    var t = n[1] || "",
                        i = n[3];
                    if (!i) return t;
                    if (e && "function" == typeof btoa) {
                        var r = (s = i, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(s)))) + " */"),
                            o = i.sources.map(function(n) {
                                return "/*# sourceURL=" + i.sourceRoot + n + " */"
                            });
                        return [t].concat(o).concat([r]).join("\n")
                    }
                    var s;
                    return [t].join("\n")
                }(e, n);
                return e[2] ? "@media " + e[2] + "{" + t + "}" : t
            }).join("")
        }, e.i = function(n, t) {
            "string" == typeof n && (n = [
                [null, n, ""]
            ]);
            for (var i = {}, r = 0; r < this.length; r++) {
                var o = this[r][0];
                "number" == typeof o && (i[o] = !0)
            }
            for (r = 0; r < n.length; r++) {
                var s = n[r];
                "number" == typeof s[0] && i[s[0]] || (t && !s[2] ? s[2] = t : t && (s[2] = "(" + s[2] + ") and (" + t + ")"), e.push(s))
            }
        }, e
    }
}, function(n, e) {
    n.exports = "leaflet/PaintPolygon.svg?12344"
}, function(n, e, t) {
    var i, r, o = {},
        s = (i = function() {
            return window && document && document.all && !window.atob
        }, function() {
            return void 0 === r && (r = i.apply(this, arguments)), r
        }),
        a = function(n) {
            var e = {};
            return function(n) {
                if ("function" == typeof n) return n();
                if (void 0 === e[n]) {
                    var t = function(n) {
                        return document.querySelector(n)
                    }.call(this, n);
                    if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement) try {
                        t = t.contentDocument.head
                    } catch (n) {
                        t = null
                    }
                    e[n] = t
                }
                return e[n]
            }
        }(),
        l = null,
        g = 0,
        p = [],
        c = t(7);

    function u(n, e) {
        for (var t = 0; t < n.length; t++) {
            var i = n[t],
                r = o[i.id];
            if (r) {
                r.refs++;
                for (var s = 0; s < r.parts.length; s++) r.parts[s](i.parts[s]);
                for (; s < i.parts.length; s++) r.parts.push(v(i.parts[s], e))
            } else {
                var a = [];
                for (s = 0; s < i.parts.length; s++) a.push(v(i.parts[s], e));
                o[i.id] = {
                    id: i.id,
                    refs: 1,
                    parts: a
                }
            }
        }
    }

    function h(n, e) {
        for (var t = [], i = {}, r = 0; r < n.length; r++) {
            var o = n[r],
                s = e.base ? o[0] + e.base : o[0],
                a = {
                    css: o[1],
                    media: o[2],
                    sourceMap: o[3]
                };
            i[s] ? i[s].parts.push(a) : t.push(i[s] = {
                id: s,
                parts: [a]
            })
        }
        return t
    }

    function I(n, e) {
        var t = a(n.insertInto);
        if (!t) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var i = p[p.length - 1];
        if ("top" === n.insertAt) i ? i.nextSibling ? t.insertBefore(e, i.nextSibling) : t.appendChild(e) : t.insertBefore(e, t.firstChild), p.push(e);
        else if ("bottom" === n.insertAt) t.appendChild(e);
        else {
            if ("object" != typeof n.insertAt || !n.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
            var r = a(n.insertInto + " " + n.insertAt.before);
            t.insertBefore(e, r)
        }
    }

    function m(n) {
        if (null === n.parentNode) return !1;
        n.parentNode.removeChild(n);
        var e = p.indexOf(n);
        e >= 0 && p.splice(e, 1)
    }

    function d(n) {
        var e = document.createElement("style");
        return void 0 === n.attrs.type && (n.attrs.type = "text/css"), f(e, n.attrs), I(n, e), e
    }

    function f(n, e) {
        Object.keys(e).forEach(function(t) {
            n.setAttribute(t, e[t])
        })
    }

    function v(n, e) {
        var t, i, r, o;
        if (e.transform && n.css) {
            if (!(o = e.transform(n.css))) return function() {};
            n.css = o
        }
        if (e.singleton) {
            var s = g++;
            t = l || (l = d(e)), i = A.bind(null, t, s, !1), r = A.bind(null, t, s, !0)
        } else n.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (t = function(n) {
            var e = document.createElement("link");
            return void 0 === n.attrs.type && (n.attrs.type = "text/css"), n.attrs.rel = "stylesheet", f(e, n.attrs), I(n, e), e
        }(e), i = function(n, e, t) {
            var i = t.css,
                r = t.sourceMap,
                o = void 0 === e.convertToAbsoluteUrls && r;
            (e.convertToAbsoluteUrls || o) && (i = c(i));
            r && (i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
            var s = new Blob([i], {
                    type: "text/css"
                }),
                a = n.href;
            n.href = URL.createObjectURL(s), a && URL.revokeObjectURL(a)
        }.bind(null, t, e), r = function() {
            m(t), t.href && URL.revokeObjectURL(t.href)
        }) : (t = d(e), i = function(n, e) {
            var t = e.css,
                i = e.media;
            i && n.setAttribute("media", i);
            if (n.styleSheet) n.styleSheet.cssText = t;
            else {
                for (; n.firstChild;) n.removeChild(n.firstChild);
                n.appendChild(document.createTextNode(t))
            }
        }.bind(null, t), r = function() {
            m(t)
        });
        return i(n),
            function(e) {
                if (e) {
                    if (e.css === n.css && e.media === n.media && e.sourceMap === n.sourceMap) return;
                    i(n = e)
                } else r()
            }
    }
    n.exports = function(n, e) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
        (e = e || {}).attrs = "object" == typeof e.attrs ? e.attrs : {}, e.singleton || "boolean" == typeof e.singleton || (e.singleton = s()), e.insertInto || (e.insertInto = "head"), e.insertAt || (e.insertAt = "bottom");
        var t = h(n, e);
        return u(t, e),
            function(n) {
                for (var i = [], r = 0; r < t.length; r++) {
                    var s = t[r];
                    (a = o[s.id]).refs--, i.push(a)
                }
                n && u(h(n, e), e);
                for (r = 0; r < i.length; r++) {
                    var a;
                    if (0 === (a = i[r]).refs) {
                        for (var l = 0; l < a.parts.length; l++) a.parts[l]();
                        delete o[a.id]
                    }
                }
            }
    };
    var y, C = (y = [], function(n, e) {
        return y[n] = e, y.filter(Boolean).join("\n")
    });

    function A(n, e, t, i) {
        var r = t ? "" : i.css;
        if (n.styleSheet) n.styleSheet.cssText = C(e, r);
        else {
            var o = document.createTextNode(r),
                s = n.childNodes;
            s[e] && n.removeChild(s[e]), s.length ? n.insertBefore(o, s[e]) : n.appendChild(o)
        }
    }
}, function(n, e) {
    n.exports = function(n) {
        var e = "undefined" != typeof window && window.location;
        if (!e) throw new Error("fixUrls requires window.location");
        if (!n || "string" != typeof n) return n;
        var t = e.protocol + "//" + e.host,
            i = t + e.pathname.replace(/\/[^\/]*$/, "/");
        return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(n, e) {
            var r, o = e.trim().replace(/^"(.*)"$/, function(n, e) {
                return e
            }).replace(/^'(.*)'$/, function(n, e) {
                return e
            });
            return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o) ? n : (r = 0 === o.indexOf("//") ? o : 0 === o.indexOf("/") ? t + o : i + o.replace(/^\.\//, ""), "url(" + JSON.stringify(r) + ")")
        })
    }
}, function(n, e, t) {
    "use strict";
    t.r(e);
    let i = {
        centimeters: 637100880,
        centimetres: 637100880,
        degrees: 180 / Math.PI,
        feet: 20902260.511392,
        inches: 6371008.8 * 39.37,
        kilometers: 6371.0088,
        kilometres: 6371.0088,
        meters: 6371008.8,
        metres: 6371008.8,
        miles: 3958.761333810546,
        millimeters: 6371008800,
        millimetres: 6371008800,
        nauticalmiles: 6371008.8 / 1852,
        radians: 1,
        yards: 6371008.8 / 1.0936
    };

    function r(n, e, t) {
        const i = {
            type: "Feature"
        };
        return (0 === (t = u(t)).id || t.id) && (i.id = t.id), t.bbox && (i.bbox = t.bbox), i.properties = e || {}, i.geometry = n, i
    }

    function o(n, e, t) {
        return r({
            type: "Point",
            coordinates: n
        }, e, t = u(t))
    }

    function s(n, e, t) {
        t = u(t);
        for (const e of n) {
            if (e.length < 4) throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
            for (let n = 0; n < e[e.length - 1].length; n++)
                if (e[e.length - 1][n] !== e[0][n]) throw new Error("First and last Position are not equivalent.")
        }
        return r({
            type: "Polygon",
            coordinates: n
        }, e, t)
    }

    function a(n, e, t) {
        return r({
            type: "MultiPolygon",
            coordinates: n
        }, e, t = u(t))
    }

    function l(n, e) {
        if (null == n) throw new Error("distance is required");
        if (e && "string" != typeof e) throw new Error("units must be a string");
        var t = i[e || "kilometers"];
        if (!t) throw new Error(e + " units is invalid");
        return n / t
    }

    function g(n) {
        if (null == n) throw new Error("radians is required");
        return 180 * (n % (2 * Math.PI)) / Math.PI
    }

    function p(n) {
        if (null == n) throw new Error("degrees is required");
        return n % 360 * Math.PI / 180
    }

    function c(n) {
        return !!n && n.constructor === Object
    }

    function u(n) {
        if (!c(n = n || {})) throw new Error("options is invalid");
        return n
    }

    function h(n) {
        return "Feature" === n.type ? n.geometry : n
    }

    function I(n, e, t, i) {
        i = u(i);
        const r = function(n) {
                if (!n) throw new Error("coord is required");
                if (!Array.isArray(n)) {
                    if ("Feature" === n.type && null !== n.geometry && "Point" === n.geometry.type) return n.geometry.coordinates;
                    if ("Point" === n.type) return n.coordinates
                }
                if (Array.isArray(n) && n.length >= 2 && !Array.isArray(n[0]) && !Array.isArray(n[1])) return n;
                throw new Error("coord must be GeoJSON Point or an Array of numbers")
            }(n),
            s = p(r[0]),
            a = p(r[1]),
            c = p(t),
            h = l(e, i.units),
            I = Math.asin(Math.sin(a) * Math.cos(h) + Math.cos(a) * Math.sin(h) * Math.cos(c));
        return o([g(s + Math.atan2(Math.sin(c) * Math.sin(h) * Math.cos(a), Math.cos(h) - Math.sin(a) * Math.sin(I))), g(I)], i.properties)
    }
    var m = function(n, e, t) {
            const i = (t = u(t)).steps || 64,
                r = t.properties ? t.properties : !Array.isArray(n) && "Feature" === n.type && n.properties ? n.properties : {},
                o = [];
            for (let r = 0; r < i; r++) o.push(I(n, e, -360 * r / i, t).geometry.coordinates);
            return o.push(o[0]), s([o], r)
        },
        d = t(0);

    function f(n, e) {
        var t, i, r, o, s, a, l, g, p, c, u = 0,
            h = "FeatureCollection" === n.type,
            I = "Feature" === n.type,
            m = h ? n.features.length : 1;
        for (t = 0; t < m; t++) {
            for (a = h ? n.features[t].geometry : I ? n.geometry : n, g = h ? n.features[t].properties : I ? n.properties : {}, p = h ? n.features[t].bbox : I ? n.bbox : void 0, c = h ? n.features[t].id : I ? n.id : void 0, s = (l = !!a && "GeometryCollection" === a.type) ? a.geometries.length : 1, r = 0; r < s; r++)
                if (null !== (o = l ? a.geometries[r] : a)) switch (o.type) {
                    case "Point":
                    case "LineString":
                    case "MultiPoint":
                    case "Polygon":
                    case "MultiLineString":
                    case "MultiPolygon":
                        if (!1 === e(o, u, g, p, c)) return !1;
                        break;
                    case "GeometryCollection":
                        for (i = 0; i < o.geometries.length; i++)
                            if (!1 === e(o.geometries[i], u, g, p, c)) return !1;
                        break;
                    default:
                        throw new Error("Unknown Geometry Type")
                } else if (!1 === e(null, u, g, p, c)) return !1;
            u++
        }
    }
    var v = {
        circle: m,
        union: function(n) {
            const e = [];
            f(n, function(n) {
                "Polygon" === n.type ? e.push(n.coordinates) : n.coordinates.forEach(function(n) {
                    e.push(n)
                })
            });
            var t = d.union(e);
            return 0 === t.length ? null : a(t)
        },
        difference: function(n, e) {
            var t = h(n),
                i = h(e),
                r = n.properties || {},
                o = d.difference(t.coordinates, i.coordinates);
            return 0 === o.length ? null : a(o, r)
        }
    };
    t(1);
    const y = L.Control.extend({
        options: {
            position: "topright",
            radius: 30,
            minRadius: 10,
            maxRadius: 50,
            layerOptions: {},
            drawOptions: {
                weight: 1
            },
            eraseOptions: {
                color: "#ff324a",
                weight: 1
            },
            menu: {
                drawErase: !0,
                size: !0,
                eraseAll: !0
            }
        },
        _latlng: [0, 0],
        _metersPerPixel: {},
        onAdd: function(n) {
            return this._map = n, this.setRadius(this.options.radius), !1 === this.options.menu ? L.DomUtil.create("div") : (this._container = L.DomUtil.create("div", "leaflet-control-paintpolygon leaflet-bar leaflet-control"), this._createMenu(), this._container)
        },
        onRemove: function() {
            this._map.off("mousemove", this._onMouseMove, this)
        },
        setRadius: function(n) {
            void 0 !== n && (n < this.options.minRadius ? this._radius = this.options.minRadius : n > this.options.maxRadius ? this._radius = this.options.maxRadius : this._radius = n), this._circle && this._circle.setRadius(this._radius)
        },
        startDraw: function() {
            this.stop(), this._action = "draw", this._addMouseListener(), this._circle = L.circleMarker(this._latlng, this.options.drawOptions).setRadius(this._radius).addTo(this._map)
        },
        startErase: function() {
            this.stop(), this._action = "erase", this._addMouseListener(), this._circle = L.circleMarker(this._latlng, this.options.eraseOptions).setRadius(this._radius).addTo(this._map)
        },
        stop: function() {
            this._action = null, this._circle && this._circle.remove(), this._removeMouseListener()
        },
        getLayer: function() {
            return this._layer
        },
        setData: function(n) {
            this._data = n, void 0 !== this._layer && this._layer.remove(), this._layer = L.geoJSON(this._data, this.options.layerOptions).addTo(this._map)
        },
        getData: function() {
            return this._data
        },
        eraseAll: function() {
            this.setData()
        },
        _createMenu: function() {
            if (!1 !== this.options.menu.drawErase && (this._iconDraw = L.DomUtil.create("a", "leaflet-control-paintpolygon-icon leaflet-control-paintpolygon-icon-brush", this._container), L.DomEvent.on(this._iconDraw, "click mousedown", this._clickDraw, this)), !1 !== this.options.menu.size) {
                this._iconSize = L.DomUtil.create("a", "leaflet-control-paintpolygon-icon leaflet-control-paintpolygon-icon-size", this._container), this._menu = L.DomUtil.create("div", "leaflet-bar leaflet-control-paintpolygon-menu", this._container), L.DomEvent.disableClickPropagation(this._menu);
                var n = L.DomUtil.create("div", "leaflet-control-paintpolygon-menu-content", this._menu),
                    e = L.DomUtil.create("input", "", n);
                e.type = "range", e.value = this._radius, e.min = this.options.minRadius, e.max = this.options.maxRadius, L.DomEvent.on(e, "input change", this._cursorMove, this), L.DomEvent.on(this._iconSize, "click mousedown", this._clickSize, this)
            }!1 !== this.options.menu.eraseAll && (this._iconEraseAll = L.DomUtil.create("a", "leaflet-control-paintpolygon-icon leaflet-control-paintpolygon-icon-trash", this._container), L.DomEvent.on(this._iconEraseAll, "click mousedown", this._clickEraseAll, this))
        },
        _clickDraw: function(n) {
            "mousedown" != n.type ? (this._resetMenu(), "draw" == this._action ? this.stop() : (this.startDraw(), this._activeIconStyle(this._iconDraw))) : L.DomEvent.stop(n)
        },
        _clickSize: function(n) {
            "mousedown" != n.type ? L.DomUtil.hasClass(this._menu, "leaflet-control-paintpolygon-menu-open") ? this._closeMenu() : this._openMenu() : L.DomEvent.stop(n)
        },
        _clickEraseAll: function(n) {
            //minotaur interface start            
            map_editor.eachLayer(function (layer) {
                //erase only paths and markers layers
                if (layer instanceof L.Path) {
                    map_editor.removeLayer(layer);
                } else {
                  if (layer instanceof L.Marker) {
                    map_editor.removeLayer(layer);
                  }
                }
                
              });
              if (overlay != undefined) {
                map_editor.removeLayer(overlay);
                ovl_image_status = 0;
            }
            //minotaur interface end
            this.eraseAll()
        },
        _resetMenu: function() {
            L.DomUtil.removeClass(this._iconDraw, "leaflet-control-paintpolygon-icon-active")
        },
        _activeIconStyle: function(n) {
            L.DomUtil.addClass(n, "leaflet-control-paintpolygon-icon-active")
        },
        _openMenu: function() {
            L.DomUtil.addClass(this._menu, "leaflet-control-paintpolygon-menu-open")
        },
        _closeMenu: function() {
            L.DomUtil.removeClass(this._menu, "leaflet-control-paintpolygon-menu-open")
        },
        _cursorMove: function(n) {
            this.setRadius(n.target.valueAsNumber)
        },
        _addMouseListener: function() {
            this._map.on("mousemove", this._onMouseMove, this), this._map.on("mousedown", this._onMouseDown, this), this._map.on("mouseup", this._onMouseUp, this)
        },
        _removeMouseListener: function() {
            this._map.off("mousemove", this._onMouseMove, this), this._map.off("mousedown", this._onMouseDown, this), this._map.off("mouseup", this._onMouseUp, this)
        },
        _onMouseDown: function(n) {
            this._map.dragging.disable(), this._mousedown = !0, this._onMouseMove(n)
        },
        _onMouseUp: function(n) {
            this._map.dragging.enable(), this._mousedown = !1
        },
        _onMouseMove: function(n) {
            this._setLatLng(n.latlng), !0 === this._mousedown && this._stackEvt(n.latlng, this._map.getZoom(), this._radius, this._action)
        },
        _setLatLng: function(n) {
            void 0 !== n && (this._latlng = n), this._circle && this._circle.setLatLng(this._latlng)
        },
        _latLngAsGeoJSON: function(n) {
            return {
                type: "Point",
                coordinates: [n.lng, n.lat]
            }
        },
        _getCircleAsPolygon: function(n, e, t) {
            var i = n.lat;
            return void 0 === this._metersPerPixel[e] && (this._metersPerPixel[e] = 40075016.686 * Math.abs(Math.cos(i * Math.PI / 180)) / Math.pow(2, e + 8)), v.circle(this._latLngAsGeoJSON(n), this._metersPerPixel[e] * t / 1e3, {})
        },
        _draw: function(n, e, t) {
            if (void 0 === this._data || null === this._data) this.setData(this._getCircleAsPolygon(n, e, t));
            else {
                let i = {
                    type: "FeatureCollection",
                    features: [this._data, this._getCircleAsPolygon(n, e, t)]
                };
                //minotaur interface
                this.setData(turf.union(i))
                //this.setData(v.union(i))
            }
        },
        _erase: function(n, e, t) {
            void 0 !== this._data && null !== this._data && this.setData(v.difference(this._data, this._getCircleAsPolygon(n, e, t)))
        },
        _stackEvt: function(n, e, t, i) {
            void 0 === this._stack && (this._stack = new Array), this._stack.push({
                latlng: n,
                zoom: e,
                radius: t,
                action: i
            }), this._processStack()
        },
        _processStack: function() {
            if (!0 !== this._processingStack && 0 != this._stack.length) {
                this._processingStack = !0;
                var n = this._stack.shift();
                "draw" == n.action ? this._draw(n.latlng, n.zoom, n.radius) : "erase" == n.action && this._erase(n.latlng, n.zoom, n.radius), this._processingStack = !1, this._processStack()
            }
        }
    });
    L.Control.PaintPolygon = y, L.control.paintPolygon = (n => new L.Control.PaintPolygon(n));
    e.default = y
}]);
//# sourceMappingURL=Leaflet.PaintPolygon.js.map