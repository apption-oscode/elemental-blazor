function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _decorate(decorators, factory, superClass, mixins) {
  var api = _getDecoratorsApi();

  if (mixins) {
    for (var i = 0; i < mixins.length; i++) {
      api = mixins[i](api);
    }
  }

  var r = factory(function initialize(O) {
    api.initializeInstanceElements(O, decorated.elements);
  }, superClass);
  var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
  api.initializeClassElements(r.F, decorated.elements);
  return api.runClassFinishers(r.F, decorated.finishers);
}

function _getDecoratorsApi() {
  _getDecoratorsApi = function _getDecoratorsApi() {
    return api;
  };

  var api = {
    elementsDefinitionOrder: [["method"], ["field"]],
    initializeInstanceElements: function initializeInstanceElements(O, elements) {
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          if (element.kind === kind && element.placement === "own") {
            this.defineClassElement(O, element);
          }
        }, this);
      }, this);
    },
    initializeClassElements: function initializeClassElements(F, elements) {
      var proto = F.prototype;
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          var placement = element.placement;

          if (element.kind === kind && (placement === "static" || placement === "prototype")) {
            var receiver = placement === "static" ? F : proto;
            this.defineClassElement(receiver, element);
          }
        }, this);
      }, this);
    },
    defineClassElement: function defineClassElement(receiver, element) {
      var descriptor = element.descriptor;

      if (element.kind === "field") {
        var initializer = element.initializer;
        descriptor = {
          enumerable: descriptor.enumerable,
          writable: descriptor.writable,
          configurable: descriptor.configurable,
          value: initializer === void 0 ? void 0 : initializer.call(receiver)
        };
      }

      Object.defineProperty(receiver, element.key, descriptor);
    },
    decorateClass: function decorateClass(elements, decorators) {
      var newElements = [];
      var finishers = [];
      var placements = {
        "static": [],
        prototype: [],
        own: []
      };
      elements.forEach(function (element) {
        this.addElementPlacement(element, placements);
      }, this);
      elements.forEach(function (element) {
        if (!_hasDecorators(element)) return newElements.push(element);
        var elementFinishersExtras = this.decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
      }, this);

      if (!decorators) {
        return {
          elements: newElements,
          finishers: finishers
        };
      }

      var result = this.decorateConstructor(newElements, decorators);
      finishers.push.apply(finishers, result.finishers);
      result.finishers = finishers;
      return result;
    },
    addElementPlacement: function addElementPlacement(element, placements, silent) {
      var keys = placements[element.placement];

      if (!silent && keys.indexOf(element.key) !== -1) {
        throw new TypeError("Duplicated element (" + element.key + ")");
      }

      keys.push(element.key);
    },
    decorateElement: function decorateElement(element, placements) {
      var extras = [];
      var finishers = [];

      for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = this.fromElementDescriptor(element);
        var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
        element = elementFinisherExtras.element;
        this.addElementPlacement(element, placements);

        if (elementFinisherExtras.finisher) {
          finishers.push(elementFinisherExtras.finisher);
        }

        var newExtras = elementFinisherExtras.extras;

        if (newExtras) {
          for (var j = 0; j < newExtras.length; j++) {
            this.addElementPlacement(newExtras[j], placements);
          }

          extras.push.apply(extras, newExtras);
        }
      }

      return {
        element: element,
        finishers: finishers,
        extras: extras
      };
    },
    decorateConstructor: function decorateConstructor(elements, decorators) {
      var finishers = [];

      for (var i = decorators.length - 1; i >= 0; i--) {
        var obj = this.fromClassDescriptor(elements);
        var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);

        if (elementsAndFinisher.finisher !== undefined) {
          finishers.push(elementsAndFinisher.finisher);
        }

        if (elementsAndFinisher.elements !== undefined) {
          elements = elementsAndFinisher.elements;

          for (var j = 0; j < elements.length - 1; j++) {
            for (var k = j + 1; k < elements.length; k++) {
              if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                throw new TypeError("Duplicated element (" + elements[j].key + ")");
              }
            }
          }
        }
      }

      return {
        elements: elements,
        finishers: finishers
      };
    },
    fromElementDescriptor: function fromElementDescriptor(element) {
      var obj = {
        kind: element.kind,
        key: element.key,
        placement: element.placement,
        descriptor: element.descriptor
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      if (element.kind === "field") obj.initializer = element.initializer;
      return obj;
    },
    toElementDescriptors: function toElementDescriptors(elementObjects) {
      if (elementObjects === undefined) return;
      return _toArray(elementObjects).map(function (elementObject) {
        var element = this.toElementDescriptor(elementObject);
        this.disallowProperty(elementObject, "finisher", "An element descriptor");
        this.disallowProperty(elementObject, "extras", "An element descriptor");
        return element;
      }, this);
    },
    toElementDescriptor: function toElementDescriptor(elementObject) {
      var kind = String(elementObject.kind);

      if (kind !== "method" && kind !== "field") {
        throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
      }

      var key = _toPropertyKey(elementObject.key);
      var placement = String(elementObject.placement);

      if (placement !== "static" && placement !== "prototype" && placement !== "own") {
        throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
      }

      var descriptor = elementObject.descriptor;
      this.disallowProperty(elementObject, "elements", "An element descriptor");
      var element = {
        kind: kind,
        key: key,
        placement: placement,
        descriptor: Object.assign({}, descriptor)
      };

      if (kind !== "field") {
        this.disallowProperty(elementObject, "initializer", "A method descriptor");
      } else {
        this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
        element.initializer = elementObject.initializer;
      }

      return element;
    },
    toElementFinisherExtras: function toElementFinisherExtras(elementObject) {
      var element = this.toElementDescriptor(elementObject);

      var finisher = _optionalCallableProperty(elementObject, "finisher");

      var extras = this.toElementDescriptors(elementObject.extras);
      return {
        element: element,
        finisher: finisher,
        extras: extras
      };
    },
    fromClassDescriptor: function fromClassDescriptor(elements) {
      var obj = {
        kind: "class",
        elements: elements.map(this.fromElementDescriptor, this)
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      return obj;
    },
    toClassDescriptor: function toClassDescriptor(obj) {
      var kind = String(obj.kind);

      if (kind !== "class") {
        throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
      }

      this.disallowProperty(obj, "key", "A class descriptor");
      this.disallowProperty(obj, "placement", "A class descriptor");
      this.disallowProperty(obj, "descriptor", "A class descriptor");
      this.disallowProperty(obj, "initializer", "A class descriptor");
      this.disallowProperty(obj, "extras", "A class descriptor");

      var finisher = _optionalCallableProperty(obj, "finisher");

      var elements = this.toElementDescriptors(obj.elements);
      return {
        elements: elements,
        finisher: finisher
      };
    },
    runClassFinishers: function runClassFinishers(constructor, finishers) {
      for (var i = 0; i < finishers.length; i++) {
        var newConstructor = (0, finishers[i])(constructor);

        if (newConstructor !== undefined) {
          if (typeof newConstructor !== "function") {
            throw new TypeError("Finishers must return a constructor.");
          }

          constructor = newConstructor;
        }
      }

      return constructor;
    },
    disallowProperty: function disallowProperty(obj, name, objectType) {
      if (obj[name] !== undefined) {
        throw new TypeError(objectType + " can't have a ." + name + " property.");
      }
    }
  };
  return api;
}

function _createElementDescriptor(def) {
  var key = _toPropertyKey(def.key);
  var descriptor;

  if (def.kind === "method") {
    descriptor = {
      value: def.value,
      writable: true,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "get") {
    descriptor = {
      get: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "set") {
    descriptor = {
      set: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "field") {
    descriptor = {
      configurable: true,
      writable: true,
      enumerable: true
    };
  }

  var element = {
    kind: def.kind === "field" ? "field" : "method",
    key: key,
    placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype",
    descriptor: descriptor
  };
  if (def.decorators) element.decorators = def.decorators;
  if (def.kind === "field") element.initializer = def.value;
  return element;
}

function _coalesceGetterSetter(element, other) {
  if (element.descriptor.get !== undefined) {
    other.descriptor.get = element.descriptor.get;
  } else {
    other.descriptor.set = element.descriptor.set;
  }
}

function _coalesceClassElements(elements) {
  var newElements = [];

  var isSameElement = function isSameElement(other) {
    return other.kind === "method" && other.key === element.key && other.placement === element.placement;
  };

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var other;

    if (element.kind === "method" && (other = newElements.find(isSameElement))) {
      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
        if (_hasDecorators(element) || _hasDecorators(other)) {
          throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
        }

        other.descriptor = element.descriptor;
      } else {
        if (_hasDecorators(element)) {
          if (_hasDecorators(other)) {
            throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
          }

          other.decorators = element.decorators;
        }

        _coalesceGetterSetter(element, other);
      }
    } else {
      newElements.push(element);
    }
  }

  return newElements;
}

function _hasDecorators(element) {
  return element.decorators && element.decorators.length;
}

function _isDataDescriptor(desc) {
  return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
}

function _optionalCallableProperty(obj, name) {
  var value = obj[name];

  if (value !== undefined && typeof value !== "function") {
    throw new TypeError("Expected '" + name + "' to be a function");
  }

  return value;
}

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Settings.
 * @exports CarbonComponents.settings
 * @type Object
 * @property {boolean} [disableAutoInit]
 *   Disables automatic instantiation of components.
 *   By default (`CarbonComponents.disableAutoInit` is `false`),
 *   carbon-components attempts to instantiate components automatically
 *   by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
 *   or upon DOM events (e.g. clicking) on such elements.
 *   See each components' static `.init()` methods for details.
 * @property {string} [prefix=bx]
 *   Brand prefix. Should be in sync with `$prefix` Sass variable in carbon-components/src/globals/scss/_vars.scss.
 * // @todo given that the default value is so long, is it appropriate to put in the JSDoc?
 * @property {string} [selectorTabbable]
 *   A selector selecting tabbable/focusable nodes.
 *   By default selectorTabbable references links, areas, inputs, buttons, selects, textareas,
 *   iframes, objects, embeds, or elements explicitly using tabindex or contenteditable attributes
 *   as long as the element is not `disabled` or the `tabindex="-1"`.
 * @property {string} [selectorFocusable]
 *   CSS selector that selects major nodes that are click focusable
 *   This property is identical to selectorTabbable with the exception of
 *   the `:not([tabindex='-1'])` pseudo class
 */
var settings = {
  prefix: 'bx',
  selectorTabbable: "\n    a[href], area[href], input:not([disabled]):not([tabindex='-1']),\n    button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),\n    textarea:not([disabled]):not([tabindex='-1']),\n    iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]\n  ",
  selectorFocusable: "\n    a[href], area[href], input:not([disabled]),\n    button:not([disabled]),select:not([disabled]),\n    textarea:not([disabled]),\n    iframe, object, embed, *[tabindex], *[contenteditable=true]\n  "
};
var settings_1 = settings;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' &&
    window.customElements != null &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.insertBefore(start, before);
        start = n;
    }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = 
// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari does not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes &&
    trustedTypes.createPolicy('lit-html', { createHTML: (s) => s });
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment position.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                    marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        let value = this.getHTML();
        if (policy !== undefined) {
            // this is secure because `this.strings` is a TemplateStringsArray.
            // TODO: validate this when
            // https://github.com/tc39/proposal-array-is-template-object is
            // implemented.
            value = policy.createHTML(value);
        }
        template.innerHTML = value;
        return template;
    }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class SVGTemplateResult extends TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        reparentNodes(content, svgElement.firstChild);
        return template;
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        const parts = this.parts;
        // If we're assigning an attribute via syntax like:
        //    attr="${foo}"  or  attr=${foo}
        // but not
        //    attr="${foo} ${bar}" or attr="${foo} baz"
        // then we don't want to coerce the attribute value into one long
        // string. Instead we want to just return the value itself directly,
        // so that sanitizeDOMValue can get the actual value rather than
        // String(value)
        // The exception is if v is an array, in which case we do want to smash
        // it together into a string without calling String() on the array.
        //
        // This also allows trusted values (when using TrustedTypes) being
        // assigned to DOM sinks without being stringified in the process.
        if (l === 1 && strings[0] === '' && strings[1] === '') {
            const v = parts[0].value;
            if (typeof v === 'symbol') {
                return String(v);
            }
            if (typeof v === 'string' || !isIterable(v)) {
                return v;
            }
        }
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === nothing) {
            this.value = nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
    try {
        const options = {
            get capture() {
                eventOptionsSupported = true;
                return false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('test', options, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.removeEventListener('test', options, options);
    }
    catch (_e) {
        // event options not supported
    }
})();
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render$1 = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.4.1');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new SVGTemplateResult(strings, values, 'svg', defaultTemplateProcessor);

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IE11 doesn't support classList on SVG elements, so we emulate it with a Set
class ClassList {
    constructor(element) {
        this.classes = new Set();
        this.changed = false;
        this.element = element;
        const classList = (element.getAttribute('class') || '').split(/\s+/);
        for (const cls of classList) {
            this.classes.add(cls);
        }
    }
    add(cls) {
        this.classes.add(cls);
        this.changed = true;
    }
    remove(cls) {
        this.classes.delete(cls);
        this.changed = true;
    }
    commit() {
        if (this.changed) {
            let classString = '';
            this.classes.forEach((cls) => classString += cls + ' ');
            this.element.setAttribute('class', classString);
        }
    }
}
/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */
const previousClassesCache = new WeakMap();
/**
 * A directive that applies CSS classes. This must be used in the `class`
 * attribute and must be the only part used in the attribute. It takes each
 * property in the `classInfo` argument and adds the property name to the
 * element's `class` if the property value is truthy; if the property value is
 * falsey, the property name is removed from the element's `class`. For example
 * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
 * @param classInfo {ClassInfo}
 */
const classMap = directive((classInfo) => (part) => {
    if (!(part instanceof AttributePart) || (part instanceof PropertyPart) ||
        part.committer.name !== 'class' || part.committer.parts.length > 1) {
        throw new Error('The `classMap` directive must be used in the `class` attribute ' +
            'and must be the only part in the attribute.');
    }
    const { committer } = part;
    const { element } = committer;
    let previousClasses = previousClassesCache.get(part);
    if (previousClasses === undefined) {
        // Write static classes once
        // Use setAttribute() because className isn't a string on SVG elements
        element.setAttribute('class', committer.strings.join(' '));
        previousClassesCache.set(part, previousClasses = new Set());
    }
    const classList = (element.classList || new ClassList(element));
    // Remove old classes that no longer apply
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousClasses.forEach((name) => {
        if (!(name in classInfo)) {
            classList.remove(name);
            previousClasses.delete(name);
        }
    });
    // Add or remove classes based on their classMap value
    for (const name in classInfo) {
        const value = classInfo[name];
        if (value != previousClasses.has(name)) {
            // We explicitly want a loose truthy check of `value` because it seems
            // more convenient that '' and 0 are skipped.
            if (value) {
                classList.add(name);
                previousClasses.add(name);
            }
            else {
                classList.remove(name);
                previousClasses.delete(name);
            }
        }
    }
    if (typeof classList.commit === 'function') {
        classList.commit();
    }
});

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */
function removeNodesFromTemplate(template, nodesToRemove) {
    const { element: { content }, parts } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        const node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            // go to the next active part.
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
const countNodes = (node) => {
    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (isTemplatePartActive(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content }, parts } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        const walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
}
else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected. ` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
        `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = templateCaches.get(cacheKey);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result.strings.join(marker);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
            window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }
        template = new Template(result, element);
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
        const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template) => {
                const { element: { content } } = template;
                // IE 11 doesn't support the iterable param Set constructor
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s) => {
                    styles.add(s);
                });
                removeNodesFromTemplate(template, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
    shadyRenderSet.add(scopeName);
    // If `renderedDOM` is stamped from a Template, then we need to edit that
    // Template's underlying template element. Otherwise, we create one here
    // to give to ShadyCSS, which still requires one while scoping.
    const templateElement = !!template ? template.element : document.createElement('template');
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll('style');
    const { length } = styles;
    // If there are no styles, skip unnecessary work
    if (length === 0) {
        // Ensure prepareTemplateStyles is called to support adding
        // styles via `prepareAdoptedCssText` since that requires that
        // `prepareTemplateStyles` is called.
        //
        // ShadyCSS will only update styles containing @apply in the template
        // given to `prepareTemplateStyles`. If no lit Template was given,
        // ShadyCSS will not be able to update uses of @apply in any relevant
        // template. However, this is not a problem because we only create the
        // template for the purpose of supporting `prepareAdoptedCssText`,
        // which doesn't support @apply at all.
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < length; i++) {
        const style = styles[i];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    const content = templateElement.content;
    if (!!template) {
        insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
    }
    else {
        content.insertBefore(condensedStyle, content.firstChild);
    }
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector('style');
    if (window.ShadyCSS.nativeShadow && style !== null) {
        // When in native Shadow DOM, ensure the style created by ShadyCSS is
        // included in initially rendered output (`renderedDOM`).
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    }
    else if (!!template) {
        // When no style is left in the template, parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // There can be no style in the template in 2 cases (1) when Shady DOM
        // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
        // is in use ShadyCSS removes the style if it contains no content.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        content.insertBefore(condensedStyle, content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        removeNodesFromTemplate(template, removes);
    }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */
const render = (result, container, options) => {
    if (!options || typeof options !== 'object' || !options.scopeName) {
        throw new Error('The `scopeName` option is required.');
    }
    const scopeName = options.scopeName;
    const hasRendered = parts.has(container);
    const needsScoping = compatibleShadyCSSVersion &&
        container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
        !!container.host;
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render$1(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
        const part = parts.get(renderContainer);
        parts.delete(renderContainer);
        // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
        // that should apply to `renderContainer` even if the rendered value is
        // not a TemplateInstance. However, it will only insert scoped styles
        // into the document if `prepareTemplateStyles` has already been called
        // for the given scope name.
        const template = part.value instanceof TemplateInstance ?
            part.value.template :
            undefined;
        prepareTemplateStyles(scopeName, renderContainer, template);
        removeNodes(container, container.firstChild);
        container.appendChild(renderContainer);
        parts.set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
/**
 * Use this module if you want to create your own base class extending
 * [[UpdatingElement]].
 * @packageDocumentation
 */
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty =
    (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                // Type assert to adhere to Bazel's "must type assert JSON parse" rule.
                return JSON.parse(value);
        }
        return value;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */
class UpdatingElement extends HTMLElement {
    constructor() {
        super();
        this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this._classProperties.forEach((v, p) => {
            const attr = this._attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            // NOTE: Workaround IE11 not supporting Map constructor argument.
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v, k) => this._classProperties.set(k, v));
            }
        }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a PropertyDeclaration for the property with the given options.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     *
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        const descriptor = this.getPropertyDescriptor(name, key, options);
        if (descriptor !== undefined) {
            Object.defineProperty(this.prototype, name, descriptor);
        }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     *   class MyElement extends LitElement {
     *     static getPropertyDescriptor(name, key, options) {
     *       const defaultDescriptor =
     *           super.getPropertyDescriptor(name, key, options);
     *       const setter = defaultDescriptor.set;
     *       return {
     *         get: defaultDescriptor.get,
     *         set(value) {
     *           setter.call(this, value);
     *           // custom action.
     *         },
     *         configurable: true,
     *         enumerable: true
     *       }
     *     }
     *   }
     *
     * @nocollapse
     */
    static getPropertyDescriptor(name, key, options) {
        return {
            // tslint:disable-next-line:no-any no symbol in index
            get() {
                return this[key];
            },
            set(value) {
                const oldValue = this[name];
                this[key] = value;
                this
                    .requestUpdateInternal(name, oldValue, options);
            },
            configurable: true,
            enumerable: true
        };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a PropertyDeclaration via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override `createProperty`.
     *
     * @nocollapse
     * @final
     */
    static getPropertyOptions(name) {
        return this._classProperties && this._classProperties.get(name) ||
            defaultPropertyDeclaration;
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        if (!superCtor.hasOwnProperty(finalized)) {
            superCtor.finalize();
        }
        this[finalized] = true;
        this._ensureClassProperties();
        // initialize Map populated in observedAttributes
        this._attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...(typeof Object.getOwnPropertySymbols === 'function') ?
                    Object.getOwnPropertySymbols(props) :
                    []
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
            }
        }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ?
            undefined :
            (typeof attribute === 'string' ?
                attribute :
                (typeof name === 'string' ? name.toLowerCase() : undefined));
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute ||
            defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
        this._updateState = 0;
        this._updatePromise =
            new Promise((res) => this._enableUpdatingResolver = res);
        this._changedProperties = new Map();
        this._saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this.requestUpdateInternal();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    _saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor
            ._classProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                const value = this[p];
                delete this[p];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p, value);
            }
        });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach((v, p) => this[p] = v);
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        // Ensure first connection completes an update. Updates cannot complete
        // before connection.
        this.enableUpdating();
    }
    enableUpdating() {
        if (this._enableUpdatingResolver !== undefined) {
            this._enableUpdatingResolver();
            this._enableUpdatingResolver = undefined;
        }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {
    }
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            // an undefined value does not change the attribute.
            if (attrValue === undefined) {
                return;
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        // Note, hint this as an `AttributeMap` so closure clearly understands
        // the type; it has issues with tracking types through statics
        // tslint:disable-next-line:no-unnecessary-type-assertion
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options = ctor.getPropertyOptions(propName);
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] =
                // tslint:disable-next-line:no-any
                ctor._propertyValueFromAttribute(value, options);
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    /**
     * This protected version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */
    requestUpdateInternal(name, oldValue, options) {
        let shouldRequestUpdate = true;
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            const ctor = this.constructor;
            options = options || ctor.getPropertyOptions(name);
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                    this._changedProperties.set(name, oldValue);
                }
                // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.
                if (options.reflect === true &&
                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
            }
            else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._updatePromise = this._enqueueUpdate();
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */
    requestUpdate(name, oldValue) {
        this.requestUpdateInternal(name, oldValue);
        return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await this._updatePromise;
        }
        catch (e) {
            // Ignore any previous errors. We only care that the previous cycle is
            // done. Any error should have been handled in the previous update.
        }
        const result = this.performUpdate();
        // If `performUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.
        if (result != null) {
            await result;
        }
        return !this._hasRequestedUpdate;
    }
    get _hasRequestedUpdate() {
        return (this._updateState & STATE_UPDATE_REQUESTED);
    }
    get hasUpdated() {
        return (this._updateState & STATE_HAS_UPDATED);
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */
    performUpdate() {
        // Abort any update if one is not pending when this is called.
        // This can happen if `performUpdate` is called early to "flush"
        // the update.
        if (!this._hasRequestedUpdate) {
            return;
        }
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        let shouldUpdate = false;
        const changedProperties = this._changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.update(changedProperties);
            }
            else {
                this._markUpdated();
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            // Ensure element can accept additional updates after an exception.
            this._markUpdated();
            throw e;
        }
        if (shouldUpdate) {
            if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
        return this._getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     * @deprecated Override `getUpdateComplete()` instead for forward
     *     compatibility with `lit-element` 3.0 / `@lit/reactive-element`.
     */
    _getUpdateComplete() {
        return this.getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async getUpdateComplete() {
     *       await super.getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */
    getUpdateComplete() {
        return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined &&
            this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
            this._reflectingProperties = undefined;
        }
        this._markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {
    }
}
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */
UpdatingElement[_a] = true;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const legacyCustomElement = (tagName, clazz) => {
    window.customElements.define(tagName, clazz);
    // Cast as any because TS doesn't recognize the return type as being a
    // subtype of the decorated class when clazz is typed as
    // `Constructor<HTMLElement>` for some reason.
    // `Constructor<HTMLElement>` is helpful to make sure the decorator is
    // applied to elements however.
    // tslint:disable-next-line:no-any
    return clazz;
};
const standardCustomElement = (tagName, descriptor) => {
    const { kind, elements } = descriptor;
    return {
        kind,
        elements,
        // This callback is called once the class is otherwise fully defined
        finisher(clazz) {
            window.customElements.define(tagName, clazz);
        }
    };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```
 * @customElement('my-element')
 * class MyElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The name of the custom element to define.
 */
const customElement = (tagName) => (classOrDescriptor) => (typeof classOrDescriptor === 'function') ?
    legacyCustomElement(tagName, classOrDescriptor) :
    standardCustomElement(tagName, classOrDescriptor);
const standardProperty = (options, element) => {
    // When decorating an accessor, pass it through and add property metadata.
    // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
    // stomp over the user's accessor.
    if (element.kind === 'method' && element.descriptor &&
        !('value' in element.descriptor)) {
        return Object.assign(Object.assign({}, element), { finisher(clazz) {
                clazz.createProperty(element.key, options);
            } });
    }
    else {
        // createProperty() takes care of defining the property, but we still
        // must return some kind of descriptor, so return a descriptor for an
        // unused prototype field. The finisher calls createProperty().
        return {
            kind: 'field',
            key: Symbol(),
            placement: 'own',
            descriptor: {},
            // When @babel/plugin-proposal-decorators implements initializers,
            // do this instead of the initializer below. See:
            // https://github.com/babel/babel/issues/9260 extras: [
            //   {
            //     kind: 'initializer',
            //     placement: 'own',
            //     initializer: descriptor.initializer,
            //   }
            // ],
            initializer() {
                if (typeof element.initializer === 'function') {
                    this[element.key] = element.initializer.call(this);
                }
            },
            finisher(clazz) {
                clazz.createProperty(element.key, options);
            }
        };
    }
};
const legacyProperty = (options, proto, name) => {
    proto.constructor
        .createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A [[`PropertyDeclaration`]] may optionally be
 * supplied to configure property features.
 *
 * This decorator should only be used for public fields. Private or protected
 * fields should use the [[`internalProperty`]] decorator.
 *
 * @example
 * ```ts
 * class MyElement {
 *   @property({ type: Boolean })
 *   clicked = false;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */
function property(options) {
    // tslint:disable-next-line:no-any decorator
    return (protoOrDescriptor, name) => (name !== undefined) ?
        legacyProperty(options, protoOrDescriptor, name) :
        standardProperty(options, protoOrDescriptor);
}
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 * @param cache An optional boolean which when true performs the DOM query only
 * once and caches the result.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 *
 * ```ts
 * class MyElement {
 *   @query('#first')
 *   first;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */
function query(selector, cache) {
    return (protoOrDescriptor, 
    // tslint:disable-next-line:no-any decorator
    name) => {
        const descriptor = {
            get() {
                return this.renderRoot.querySelector(selector);
            },
            enumerable: true,
            configurable: true,
        };
        if (cache) {
            const prop = name !== undefined ? name : protoOrDescriptor.key;
            const key = typeof prop === 'symbol' ? Symbol() : `__${prop}`;
            descriptor.get = function () {
                if (this[key] === undefined) {
                    (this[key] =
                        this.renderRoot.querySelector(selector));
                }
                return this[key];
            };
        }
        return (name !== undefined) ?
            legacyQuery(descriptor, protoOrDescriptor, name) :
            standardQuery(descriptor, protoOrDescriptor);
    };
}
const legacyQuery = (descriptor, proto, name) => {
    Object.defineProperty(proto, name, descriptor);
};
const standardQuery = (descriptor, element) => ({
    kind: 'method',
    placement: 'prototype',
    key: element.key,
    descriptor,
});

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = (window.ShadowRoot) &&
    (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) &&
    ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);
const constructionToken = Symbol();
class CSSResult {
    constructor(cssText, safeToken) {
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
        if (this._styleSheet === undefined) {
            // Note, if `supportsAdoptingStyleSheets` is true then we assume
            // CSSStyleSheet is constructable.
            if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                this._styleSheet.replaceSync(this.cssText);
            }
            else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
/**
 * Wrap a value for interpolation in a [[`css`]] tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */
const unsafeCSS = (value) => {
    return new CSSResult(String(value), constructionToken);
};
const textFromCSSResult = (value) => {
    if (value instanceof CSSResult) {
        return value.cssText;
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
};
/**
 * Template tag which which can be used with LitElement's [[LitElement.styles |
 * `styles`]] property to set element styles. For security reasons, only literal
 * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
 * may be used inside a template string part.
 */
const css = (strings, ...values) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = []))
    .push('2.5.1');
/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */
const renderNotImplemented = {};
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the [[`properties`]] property or the [[`property`]] decorator.
 */
class LitElement extends UpdatingElement {
    /**
     * Return the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * @nocollapse
     */
    static getStyles() {
        return this.styles;
    }
    /** @nocollapse */
    static _getUniqueStyles() {
        // Only gather styles once per class
        if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
            return;
        }
        // Take care not to call `this.getStyles()` multiple times since this
        // generates new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        const userStyles = this.getStyles();
        if (Array.isArray(userStyles)) {
            // De-duplicate styles preserving the _last_ instance in the set.
            // This is a performance optimization to avoid duplicated styles that can
            // occur especially when composing via subclassing.
            // The last item is kept to try to preserve the cascade order with the
            // assumption that it's most important that last added styles override
            // previous styles.
            const addStyles = (styles, set) => styles.reduceRight((set, s) => 
            // Note: On IE set.add() does not return the set
            Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set);
            // Array.from does not work on Set in IE, otherwise return
            // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
            const set = addStyles(userStyles, new Set());
            const styles = [];
            set.forEach((v) => styles.unshift(v));
            this._styles = styles;
        }
        else {
            this._styles = userStyles === undefined ? [] : [userStyles];
        }
        // Ensure that there are no invalid CSSStyleSheet instances here. They are
        // invalid in two conditions.
        // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
        //     this is impossible to check except via .replaceSync or use
        // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
        //     false)
        this._styles = this._styles.map((s) => {
            if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
                // Flatten the cssText from the passed constructible stylesheet (or
                // undetectable non-constructible stylesheet). The user might have
                // expected to update their stylesheets over time, but the alternative
                // is a crash.
                const cssText = Array.prototype.slice.call(s.cssRules)
                    .reduce((css, rule) => css + rule.cssText, '');
                return unsafeCSS(cssText);
            }
            return s;
        });
    }
    /**
     * Performs element initialization. By default this calls
     * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
     * captures any pre-set values for registered properties.
     */
    initialize() {
        super.initialize();
        this.constructor._getUniqueStyles();
        this.renderRoot = this.createRenderRoot();
        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
        return this.attachShadow(this.constructor.shadowRootOptions);
    }
    /**
     * Applies styling to the element shadowRoot using the [[`styles`]]
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
        }
        else if (supportsAdoptingStyleSheets) {
            this.renderRoot.adoptedStyleSheets =
                styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
        }
        else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
        // Setting properties in `render` should not trigger an update. Since
        // updates are allowed after super.update, it's important to call `render`
        // before that.
        const templateResult = this.render();
        super.update(changedProperties);
        // If render is not implemented by the component, don't call lit-html render
        if (templateResult !== renderNotImplemented) {
            this.constructor
                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
        }
        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `NodePart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     */
    render() {
        return renderNotImplemented;
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */
LitElement['finalized'] = true;
/**
 * Reference to the underlying library method used to render the element's
 * DOM. By default, points to the `render` method from lit-html's shady-render
 * module.
 *
 * **Most users will never need to touch this property.**
 *
 * This  property should not be confused with the `render` instance method,
 * which should be overridden to define a template for the element.
 *
 * Advanced users creating a new base class based on LitElement can override
 * this property to point to a custom render method with a signature that
 * matches [shady-render's `render`
 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
 *
 * @nocollapse
 */
LitElement.render = render;
/** @nocollapse */
LitElement.shadowRootOptions = { mode: 'open' };

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const previousValues = new WeakMap();
/**
 * For AttributeParts, sets the attribute if the value is defined and removes
 * the attribute if the value is undefined.
 *
 * For other part types, this directive is a no-op.
 */
const ifDefined = directive((value) => (part) => {
    const previousValue = previousValues.get(part);
    if (value === undefined && part instanceof AttributePart) {
        // If the value is undefined, remove the attribute, but only if the value
        // was previously defined.
        if (previousValue !== undefined || !previousValues.has(part)) {
            const name = part.committer.name;
            part.committer.element.removeAttribute(name);
        }
    }
    else if (value !== previousValue) {
        part.setValue(value);
    }
    previousValues.set(part, value);
});

/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * A variant of `lit-html/directives/if-defined` which stops rendering if the given value is `null` in addition to `undefined`.
 * @param The value.
 */

var ifNonNull = (value => ifDefined(value !== null && value !== void 0 ? value : undefined));

/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {
  prefix: prefix$i
} = settings_1;
/**
 * A selector selecting tabbable nodes.
 * Borrowed from `carbon-angular`. tabbable === focusable.
 */

const selectorTabbable = `
  a[href], area[href], input:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true],
  ${prefix$i}-accordion-item,
  ${prefix$i}-btn,
  ${prefix$i}-breadcrumb-link,
  ${prefix$i}-checkbox,
  ${prefix$i}-code-snippet,
  ${prefix$i}-combo-box,
  ${prefix$i}-content-switcher-item,
  ${prefix$i}-copy-button,
  ${prefix$i}-table-header-row,
  ${prefix$i}-table-row,
  ${prefix$i}-table-toolbar-search,
  ${prefix$i}-date-picker-input,
  ${prefix$i}-dropdown,
  ${prefix$i}-input,
  ${prefix$i}-link,
  ${prefix$i}-number-input,
  ${prefix$i}-modal,
  ${prefix$i}-modal-close-button,
  ${prefix$i}-multi-select,
  ${prefix$i}-inline-notification,
  ${prefix$i}-toast-notification,
  ${prefix$i}-overflow-menu,
  ${prefix$i}-overflow-menu-item,
  ${prefix$i}-page-sizes-select,
  ${prefix$i}-pages-select,
  ${prefix$i}-progress-step,
  ${prefix$i}-radio-button,
  ${prefix$i}-search,
  ${prefix$i}-slider,
  ${prefix$i}-slider-input,
  ${prefix$i}-structured-list,
  ${prefix$i}-tab,
  ${prefix$i}-filter-tag,
  ${prefix$i}-textarea,
  ${prefix$i}-clickable-tile,
  ${prefix$i}-expandable-tile,
  ${prefix$i}-radio-tile,
  ${prefix$i}-selectable-tile,
  ${prefix$i}-toggle,
  ${prefix$i}-tooltip,
  ${prefix$i}-tooltip-definition,
  ${prefix$i}-tooltip-icon,
  ${prefix$i}-header-menu,
  ${prefix$i}-header-menu-button,
  ${prefix$i}-header-menu-item,
  ${prefix$i}-header-name,
  ${prefix$i}-header-nav-item,
  ${prefix$i}-side-nav-link,
  ${prefix$i}-side-nav-menu,
  ${prefix$i}-side-nav-menu-item
`; // Because we're going to have a bunch of exports

/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @param Base The base class.
 * @returns A mix-in implementing `.focus()` method that focuses on the first focusable element in the shadow DOM.
 */

const FocusMixin = Base => class extends Base {
  /**
   * Focuses on the first focusable element in the shadow DOM.
   */
  focus() {
    // @ts-ignore: Until `delegatesFocus` is added to `ShadowRoot` definition
    if (this.shadowRoot.delegatesFocus) {
      super.focus();
    } else {
      const delegateTarget = this.shadowRoot.querySelector(selectorTabbable) || this.querySelector(selectorTabbable);

      if (delegateTarget) {
        delegateTarget.focus();
      } else {
        super.focus();
      }
    }
  }

};

/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Button kinds.
 */
let BUTTON_KIND;
/**
 * Button size.
 */

(function (BUTTON_KIND) {
  BUTTON_KIND["PRIMARY"] = "primary";
  BUTTON_KIND["SECONDARY"] = "secondary";
  BUTTON_KIND["TERTIARY"] = "tertiary";
  BUTTON_KIND["GHOST"] = "ghost";
  BUTTON_KIND["DANGER"] = "danger";
  BUTTON_KIND["DANGER_TERTIARY"] = "danger-tertiary";
  BUTTON_KIND["DANGER_GHOST"] = "danger-ghost";
})(BUTTON_KIND || (BUTTON_KIND = {}));

let BUTTON_SIZE;
/**
 * Button icon layout.
 */

(function (BUTTON_SIZE) {
  BUTTON_SIZE["REGULAR"] = "";
  BUTTON_SIZE["SMALL"] = "sm";
  BUTTON_SIZE["EXTRA_LARGE"] = "xl";
  BUTTON_SIZE["FIELD"] = "field";
})(BUTTON_SIZE || (BUTTON_SIZE = {}));

let BUTTON_ICON_LAYOUT;

(function (BUTTON_ICON_LAYOUT) {
  BUTTON_ICON_LAYOUT["REGULAR"] = "";
  BUTTON_ICON_LAYOUT["CONDENSED"] = "condensed";
})(BUTTON_ICON_LAYOUT || (BUTTON_ICON_LAYOUT = {}));

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$4 = css([
  'a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:\'IBM Plex Sans\',\'Helvetica Neue\',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:\'IBM Plex Mono\',Menlo,\'DejaVu Sans Mono\',\'Bitstream Vera Sans Mono\',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--assistive-text,.bx--visually-hidden{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap}.bx--body{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);background-color:var(--cds-ui-background,#fff);color:var(--cds-text-01,#161616);line-height:1}.bx--body *,.bx--body ::after,.bx--body ::before{box-sizing:inherit}.bx--text-truncate--end{display:inline-block;overflow:hidden;width:100%;text-overflow:ellipsis;white-space:nowrap}.bx--text-truncate--front{display:inline-block;overflow:hidden;width:100%;direction:rtl;text-overflow:ellipsis;white-space:nowrap}.bx--btn{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);position:relative;display:inline-flex;max-width:20rem;min-height:3rem;flex-shrink:0;align-items:center;justify-content:space-between;padding:calc(.875rem - 3px) 63px calc(.875rem - 3px) 15px;margin:0;border-radius:0;cursor:pointer;outline:0;text-align:left;text-decoration:none;transition:background 70ms cubic-bezier(0,0,.38,.9),box-shadow 70ms cubic-bezier(0,0,.38,.9),border-color 70ms cubic-bezier(0,0,.38,.9),outline 70ms cubic-bezier(0,0,.38,.9);vertical-align:top}.bx--btn *,.bx--btn ::after,.bx--btn ::before{box-sizing:inherit}.bx--btn.bx--btn--disabled,.bx--btn.bx--btn--disabled:focus,.bx--btn.bx--btn--disabled:hover,.bx--btn:disabled,.bx--btn:focus:disabled,.bx--btn:hover:disabled{border-color:var(--cds-disabled-02,#c6c6c6);background:var(--cds-disabled-02,#c6c6c6);box-shadow:none;color:var(--cds-disabled-03,#8d8d8d);cursor:not-allowed}.bx--btn .bx--btn__icon{position:absolute;right:1rem;width:1rem;height:1rem;flex-shrink:0}.bx--btn::-moz-focus-inner{padding:0;border:0}.bx--btn--primary{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-interactive-01,#0f62fe);color:var(--cds-text-04,#fff)}.bx--btn--primary:hover{background-color:var(--cds-hover-primary,#0353e9)}.bx--btn--primary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--primary:active{background-color:var(--cds-active-primary,#002d9c)}.bx--btn--primary .bx--btn__icon,.bx--btn--primary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--primary:hover{color:var(--cds-text-04,#fff)}.bx--btn--secondary{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-interactive-02,#393939);color:var(--cds-text-04,#fff)}.bx--btn--secondary:hover{background-color:var(--cds-hover-secondary,#4c4c4c)}.bx--btn--secondary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--secondary:active{background-color:var(--cds-active-secondary,#6f6f6f)}.bx--btn--secondary .bx--btn__icon,.bx--btn--secondary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--secondary:focus,.bx--btn--secondary:hover{color:var(--cds-text-04,#fff)}.bx--btn--tertiary{border-width:1px;border-style:solid;border-color:var(--cds-interactive-03,#0f62fe);background-color:transparent;color:var(--cds-interactive-03,#0f62fe)}.bx--btn--tertiary:hover{background-color:var(--cds-hover-tertiary,#0353e9)}.bx--btn--tertiary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--tertiary:active{background-color:var(--cds-active-tertiary,#002d9c)}.bx--btn--tertiary .bx--btn__icon,.bx--btn--tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--tertiary:hover{color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary:focus{background-color:var(--cds-interactive-03,#0f62fe);color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary:active{border-color:transparent;background-color:var(--cds-active-tertiary,#002d9c);color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary.bx--btn--disabled,.bx--btn--tertiary.bx--btn--disabled:focus,.bx--btn--tertiary.bx--btn--disabled:hover,.bx--btn--tertiary:disabled,.bx--btn--tertiary:focus:disabled,.bx--btn--tertiary:hover:disabled{background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--ghost{border-width:1px;border-style:solid;border-color:transparent;background-color:transparent;color:var(--cds-link-01,#0f62fe);padding:calc(.875rem - 3px) 16px}.bx--btn--ghost:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--btn--ghost:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--ghost:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--ghost .bx--btn__icon,.bx--btn--ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--ghost .bx--btn__icon{position:static;margin-left:.5rem}.bx--btn--ghost:active,.bx--btn--ghost:hover{color:var(--cds-hover-primary-text,#0043ce)}.bx--btn--ghost:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--ghost.bx--btn--disabled,.bx--btn--ghost.bx--btn--disabled:focus,.bx--btn--ghost.bx--btn--disabled:hover,.bx--btn--ghost:disabled,.bx--btn--ghost:focus:disabled,.bx--btn--ghost:hover:disabled{border-color:transparent;background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--ghost.bx--btn--sm{padding:calc(.375rem - 3px) 16px}.bx--btn--ghost.bx--btn--field,.bx--btn--ghost.bx--btn--md{padding:calc(.675rem - 3px) 16px}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline-style:dotted}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline:1px solid transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline-style:dotted}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{display:inline-block}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::before{transition:none}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{width:0;height:0;border-style:solid;content:""}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@supports (-ms-accelerator:true){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@supports (-ms-ime-align:auto){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{border:1px solid transparent}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{content:attr(aria-label)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::after{content:none}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover::before{opacity:1}@-webkit-keyframes tooltip-fade{from{opacity:0}to{opacity:1}}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus.bx--tooltip--a11y::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger svg,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover svg{fill:currentColor}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled.bx--tooltip--a11y::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled.bx--tooltip--a11y::before{overflow:hidden;margin:-1px;clip:rect(0,0,0,0);opacity:0}.bx--btn.bx--btn--icon-only:not(.bx--tooltip--hidden) .bx--assistive-text{pointer-events:all}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{border-color:var(--cds-focus,#0f62fe)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:active:not([disabled]){border-color:transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline-color:transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:active,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:focus,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:hover{cursor:not-allowed;fill:var(--cds-disabled-03,#8d8d8d)}.bx--tooltip__trigger.bx--btn--icon-only--top{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--top:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--top::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--top::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--top:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--top:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--top:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--top:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--top:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--top:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{top:-.8125rem;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::after{top:-.8125rem;left:0;-webkit-transform:translate(0,-100%);transform:translate(0,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::after{top:-.8125rem;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::after{top:-.8125rem;right:0;left:auto;-webkit-transform:translate(0,-100%);transform:translate(0,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--right{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--right:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--right::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--right::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--right:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--right:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--right:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--right:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--right:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--right:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::after{bottom:-.8125rem;left:0;-webkit-transform:translate(0,100%);transform:translate(0,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::after{bottom:-.8125rem;right:0;left:auto;-webkit-transform:translate(0,100%);transform:translate(0,100%)}.bx--tooltip__trigger.bx--btn--icon-only--left{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--left:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--left::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--left::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--left:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--left:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--left:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--left:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--left:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--left:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--btn--icon-only{padding-right:.9375rem;padding-left:.9375rem}.bx--btn--icon-only .bx--btn__icon{position:static}.bx--btn--icon-only.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--icon-only.bx--btn--ghost .bx--btn__icon{margin:0}.bx--btn--icon-only.bx--btn--selected{background:var(--cds-selected-ui,#e0e0e0)}.bx--btn path[data-icon-path=inner-path]{fill:none}.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:var(--cds-icon-01,#161616)}.bx--btn--ghost.bx--btn--icon-only[disabled] .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only[disabled] .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn.bx--btn--icon-only.bx--btn--ghost[disabled]:hover .bx--btn__icon{fill:var(--cds-disabled-03,#8d8d8d)}.bx--btn--ghost.bx--btn--icon-only[disabled]{cursor:not-allowed}.bx--btn--field.bx--btn--icon-only,.bx--btn--md.bx--btn--icon-only{padding-right:.6875rem;padding-left:.6875rem}.bx--btn--sm.bx--btn--icon-only{padding-right:.4375rem;padding-left:.4375rem}.bx--btn--danger{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-danger-01,#da1e28);color:var(--cds-text-04,#fff)}.bx--btn--danger:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger .bx--btn__icon,.bx--btn--danger .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger:hover{color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary,.bx--btn--danger-tertiary{border-width:1px;border-style:solid;border-color:var(--cds-danger-02,#da1e28);background-color:transparent;color:var(--cds-danger-02,#da1e28)}.bx--btn--danger--tertiary:hover,.bx--btn--danger-tertiary:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger--tertiary:focus,.bx--btn--danger-tertiary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger--tertiary:active,.bx--btn--danger-tertiary:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger--tertiary .bx--btn__icon,.bx--btn--danger--tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn--danger-tertiary .bx--btn__icon,.bx--btn--danger-tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger--tertiary:hover,.bx--btn--danger-tertiary:hover{border-color:var(--cds-hover-danger,#b81921);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary:focus,.bx--btn--danger-tertiary:focus{background-color:var(--cds-danger-01,#da1e28);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary:active,.bx--btn--danger-tertiary:active{border-color:var(--cds-active-danger,#750e13);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary.bx--btn--disabled,.bx--btn--danger--tertiary.bx--btn--disabled:focus,.bx--btn--danger--tertiary.bx--btn--disabled:hover,.bx--btn--danger--tertiary:disabled,.bx--btn--danger--tertiary:focus:disabled,.bx--btn--danger--tertiary:hover:disabled,.bx--btn--danger-tertiary.bx--btn--disabled,.bx--btn--danger-tertiary.bx--btn--disabled:focus,.bx--btn--danger-tertiary.bx--btn--disabled:hover,.bx--btn--danger-tertiary:disabled,.bx--btn--danger-tertiary:focus:disabled,.bx--btn--danger-tertiary:hover:disabled{background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--danger--ghost,.bx--btn--danger-ghost{border-width:1px;border-style:solid;border-color:transparent;background-color:transparent;color:var(--cds-danger-02,#da1e28);padding:calc(.875rem - 3px) 16px}.bx--btn--danger--ghost:hover,.bx--btn--danger-ghost:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger--ghost:focus,.bx--btn--danger-ghost:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger--ghost:active,.bx--btn--danger-ghost:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--danger--ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn--danger-ghost .bx--btn__icon,.bx--btn--danger-ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--danger-ghost .bx--btn__icon{position:static;margin-left:.5rem}.bx--btn--danger--ghost:active,.bx--btn--danger--ghost:hover,.bx--btn--danger-ghost:active,.bx--btn--danger-ghost:hover{color:var(--cds-text-04,#fff)}.bx--btn--danger--ghost.bx--btn--disabled,.bx--btn--danger--ghost.bx--btn--disabled:focus,.bx--btn--danger--ghost.bx--btn--disabled:hover,.bx--btn--danger--ghost:disabled,.bx--btn--danger--ghost:focus:disabled,.bx--btn--danger--ghost:hover:disabled,.bx--btn--danger-ghost.bx--btn--disabled,.bx--btn--danger-ghost.bx--btn--disabled:focus,.bx--btn--danger-ghost.bx--btn--disabled:hover,.bx--btn--danger-ghost:disabled,.bx--btn--danger-ghost:focus:disabled,.bx--btn--danger-ghost:hover:disabled{border-color:transparent;background:0 0;color:var(--cds-disabled-02,#c6c6c6);outline:0}.bx--btn--danger--ghost.bx--btn--sm,.bx--btn--danger-ghost.bx--btn--sm{padding:calc(.375rem - 3px) 16px}.bx--btn--danger--ghost.bx--btn--field,.bx--btn--danger--ghost.bx--btn--md,.bx--btn--danger-ghost.bx--btn--field,.bx--btn--danger-ghost.bx--btn--md{padding:calc(.675rem - 3px) 16px}.bx--btn--sm{min-height:2rem;padding:calc(.375rem - 3px) 60px calc(.375rem - 3px) 12px}.bx--btn--xl:not(.bx--btn--icon-only){align-items:baseline;padding-top:var(--cds-spacing-05,1rem);padding-right:var(--cds-spacing-10,4rem);padding-left:var(--cds-spacing-05,1rem);min-height:5rem}.bx--btn--lg:not(.bx--btn--icon-only){align-items:baseline;padding-top:var(--cds-spacing-05,1rem);padding-right:var(--cds-spacing-10,4rem);padding-left:var(--cds-spacing-05,1rem);min-height:4rem}.bx--btn--field,.bx--btn--md{min-height:2.5rem;padding:calc(.675rem - 3px) 60px calc(.675rem - 3px) 12px}.bx--btn--expressive{font-size:var(--cds-body-short-02-font-size,1rem);font-weight:var(--cds-body-short-02-font-weight,400);line-height:var(--cds-body-short-02-line-height,1.375);letter-spacing:var(--cds-body-short-02-letter-spacing,0);min-height:3rem}.bx--btn--icon-only.bx--btn--expressive{padding:12px 13px}.bx--btn.bx--btn--expressive .bx--btn__icon{width:1.25rem;height:1.25rem}.bx--btn-set .bx--btn.bx--btn--expressive{max-width:20rem}.bx--btn.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:9.375rem}.bx--btn.bx--skeleton:active,.bx--btn.bx--skeleton:focus,.bx--btn.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--btn.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--btn.bx--skeleton::before{-webkit-animation:none;animation:none}}.bx--btn-set{display:flex}.bx--btn-set--stacked{flex-direction:column}.bx--btn-set .bx--btn{width:100%;max-width:12.25rem}.bx--btn-set .bx--btn:not(:focus){box-shadow:-.0625rem 0 0 0 var(--cds-button-separator,#e0e0e0)}.bx--btn-set .bx--btn:first-of-type:not(:focus){box-shadow:inherit}.bx--btn-set .bx--btn:focus+.bx--btn{box-shadow:inherit}.bx--btn-set--stacked .bx--btn:not(:focus){box-shadow:0 -.0625rem 0 0 var(--cds-button-separator,#e0e0e0)}.bx--btn-set--stacked .bx--btn:first-of-type:not(:focus){box-shadow:inherit}.bx--btn-set .bx--btn.bx--btn--disabled{box-shadow:-.0625rem 0 0 0 var(--cds-disabled-03,#8d8d8d)}.bx--btn-set .bx--btn.bx--btn--disabled:first-of-type{box-shadow:none}.bx--btn-set--stacked .bx--btn.bx--btn--disabled{box-shadow:0 -.0625rem 0 0 var(--cds-disabled-03,#8d8d8d)}.bx--btn-set--stacked .bx--btn.bx--btn--disabled:first-of-type{box-shadow:none}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn:focus{color:Highlight;outline:1px solid Highlight}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:ButtonText}}:host(bx-btn),:host(bx-modal-footer-button){display:inline-flex;max-width:20rem;outline:0}:host(bx-btn) .bx--btn,:host(bx-modal-footer-button) .bx--btn{flex-grow:1;max-width:100%}:host(bx-btn) ::slotted([slot=icon]),:host(bx-modal-footer-button) ::slotted([slot=icon]){fill:currentColor;position:absolute;right:1rem;flex-shrink:0}:host(bx-btn)[isExpressive] ::slotted([slot=icon]),:host(bx-modal-footer-button)[isExpressive] ::slotted([slot=icon]){width:1.25rem;height:1.25rem}:host(bx-btn)[icon-layout=condensed] .bx--btn,:host(bx-modal-footer-button)[icon-layout=condensed] .bx--btn{padding-right:2.4375rem}:host(bx-btn) .bx--btn--icon-only ::slotted([slot=icon]),:host(bx-modal-footer-button) .bx--btn--icon-only ::slotted([slot=icon]){position:static}:host(bx-btn)[kind=danger-ghost] ::slotted([slot=icon]),:host(bx-btn)[kind=ghost] ::slotted([slot=icon]),:host(bx-modal-footer-button)[kind=danger-ghost] ::slotted([slot=icon]),:host(bx-modal-footer-button)[kind=ghost] ::slotted([slot=icon]){position:static;margin-left:.5rem}:host(bx-btn)[kind=danger-ghost][icon-layout=condensed] .bx--btn,:host(bx-btn)[kind=ghost][icon-layout=condensed] .bx--btn,:host(bx-modal-footer-button)[kind=danger-ghost][icon-layout=condensed] .bx--btn,:host(bx-modal-footer-button)[kind=ghost][icon-layout=condensed] .bx--btn{padding-right:1rem}:host(bx-btn[kind=ghost]) .bx--btn--ghost:active,:host(bx-btn[kind=ghost]:hover) .bx--btn--ghost{outline:0}',
]);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Puts an event listener to an internal table for `@HostListener()`.
 * @param type
 *   The event type. Can be prefixed with `document:` or `window:`.
 *   The event listener is attached to host element's owner document or its default view in such case.
 * @param options The event listener options.
 * @param Clazz The target class.
 * @param name The method name in the given target class that works as the event listener.
 */
const setHostListener = (type, options, Clazz, name) => {
  const hostListeners = Clazz._hostListeners;

  if (!hostListeners) {
    throw new Error('The method `@HostListener()` is defined on has to be of a class that has `HostListerMixin`.');
  }

  if (!hostListeners[name]) {
    hostListeners[name] = {};
  }

  hostListeners[name][type] = {
    options
  };
};
/**
 * @param type
 *   The event type. Can be prefixed with `document:` or `window:`.
 *   The event listener is attached to host element's owner document or its default view in such case.
 * @param options The event listener options.
 * @param descriptor The original class element descriptor of the event listener method.
 * @returns The updated class element descriptor with `@HostListener()` decorator.
 */


const HostListenerStandard = (type, options, descriptor) => {
  const {
    kind,
    key,
    placement
  } = descriptor;

  if (!(kind === 'method' && placement === 'prototype' || kind === 'field' && placement === 'own')) {
    throw new Error('`@HostListener()` must be defined on instance methods, but you may have defined it on static, field, etc.');
  }

  return _objectSpread2(_objectSpread2({}, descriptor), {}, {
    finisher(Clazz) {
      setHostListener(type, options, Clazz, key);
    }

  });
};
/**
 * A decorator to add event listener to the host element, or its `document`/`window`, of a custom element.
 * The `target` must extend `HostListenerMixin`.
 * @param type
 *   The event type. Can be prefixed with `document:` or `window:`.
 *   The event listener is attached to host element's owner document or its default view in such case.
 * @param options The event listener options.
 */


const HostListener = (type, options) => (targetOrDescriptor, name) => typeof name !== 'undefined' ? setHostListener(type, options, targetOrDescriptor.constructor, name) : HostListenerStandard(type, options, targetOrDescriptor);

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
function on(element) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  element.addEventListener.apply(element, args);
  return {
    release: function release() {
      element.removeEventListener.apply(element, args);
      return null;
    }
  };
}

/**
 * The format for the event name used by `@HostListener` decorator.
 */
const EVENT_NAME_FORMAT = /^((document|window|parentRoot|shadowRoot):)?([\w-]+)$/;
/**
 * @param Base The base class.
 * @returns A mix-in that sets up and cleans up event listeners defined by `@HostListener` decorator.
 */

const HostListenerMixin = Base => {
  /**
   * A mix-in class that sets up and cleans up event listeners defined by `@HostListener` decorator.
   */
  class HostListenerMixinImpl extends Base {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "_handles", new Set());
    }

    // Not using TypeScript `private` due to: microsoft/TypeScript#17744
    connectedCallback() {
      // @ts-ignore: Until `connectedCallback` is added to `HTMLElement` definition
      super.connectedCallback();
      const hostListeners = this.constructor._hostListeners;
      Object.keys(hostListeners).forEach(listenerName => {
        Object.keys(hostListeners[listenerName]).forEach(type => {
          var _unprefixedType;

          // Parses `document:click`/`window:click` format
          const tokens = EVENT_NAME_FORMAT.exec(type);

          if (!tokens) {
            throw new Error(`Could not parse the event name: ${listenerName}`);
          }

          const [,, targetName, unprefixedType] = tokens;
          const target = {
            document: this.ownerDocument,
            window: this.ownerDocument.defaultView,
            parentRoot: this.getRootNode(),
            shadowRoot: this.shadowRoot
          }[targetName] || this;
          const {
            options
          } = hostListeners[listenerName][type];

          this._handles.add(on(target, (_unprefixedType = this.constructor[unprefixedType]) !== null && _unprefixedType !== void 0 ? _unprefixedType : unprefixedType, this[listenerName], options));
        });
      });
    }

    disconnectedCallback() {
      this._handles.forEach(handle => {
        handle.release();

        this._handles.delete(handle);
      }); // @ts-ignore: Until `disconnectedCallback` is added to `HTMLElement` definition


      super.disconnectedCallback();
    }
    /**
     * The map, keyed by method name, of event listeners that should be attached to host element or host document.
     * @private
     */
    // Not using TypeScript `private` due to: microsoft/TypeScript#17744


  }

  _defineProperty(HostListenerMixinImpl, "_hostListeners", {});

  return HostListenerMixinImpl;
};

let _$g = t => t,
    _t$f,
    _t2$5,
    _t3$2;
const {
  prefix: prefix$h
} = settings_1;
/**
 * Button.
 * @element bx-btn
 * @csspart button The button.
 */

let BXButton = _decorate([customElement(`${prefix$h}-btn`)], function (_initialize, _HostListenerMixin) {
  class BXButton extends _HostListenerMixin {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXButton,
    d: [{
      kind: "field",
      key: "_hasIcon",

      value() {
        return false;
      }

    }, {
      kind: "field",
      key: "_hasMainContent",

      value() {
        return false;
      }

    }, {
      kind: "method",
      key: "_handleSlotChange",
      value:
      /**
       * `true` if there is an icon.
       */

      /**
       * `true` if there is a non-icon content.
       */

      /**
       * Handles `slotchange` event.
       */
      function _handleSlotChange({
        target
      }) {
        const {
          name
        } = target;
        const hasContent = target.assignedNodes().some(node => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());
        this[name === 'icon' ? '_hasIcon' : '_hasMainContent'] = hasContent;
        this.requestUpdate();
      }
    }, {
      kind: "method",
      decorators: [HostListener('click', {
        capture: true
      })],
      key: "_handleDisabledClick",
      value: function _handleDisabledClick(event) {
        const {
          disabled
        } = this;

        if (disabled) {
          event.stopPropagation();
        }
      }
      /**
       * `true` if the button should have input focus when the page loads.
       */

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "autofocus",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "disabled",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "download",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "href",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "hreflang",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true,
        attribute: 'icon-layout'
      })],
      key: "iconLayout",

      value() {
        return BUTTON_ICON_LAYOUT.REGULAR;
      }

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "isExpressive",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "kind",

      value() {
        return BUTTON_KIND.PRIMARY;
      }

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'link-role'
      })],
      key: "linkRole",

      value() {
        return 'button';
      }

    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "ping",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "rel",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "size",

      value() {
        return BUTTON_SIZE.REGULAR;
      }

    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "target",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "type",
      value: void 0
    }, {
      kind: "method",
      key: "createRenderRoot",
      value:
      /**
       * `true` if the button should be disabled.
       */

      /**
       * The default file name, used if this button is rendered as `<a>`.
       */

      /**
       * Link `href`. If present, this button is rendered as `<a>`.
       */

      /**
       * The language of what `href` points to, if this button is rendered as `<a>`.
       */

      /**
       * Button icon layout.
       */

      /**
       * `true` if expressive theme enabled.
       */

      /**
       * Button kind.
       */

      /**
       * The a11y role for `<a>`.
       */

      /**
       * URLs to ping, if this button is rendered as `<a>`.
       */

      /**
       * The link type, if this button is rendered as `<a>`.
       */

      /**
       * Button size.
       */

      /**
       * The link target, if this button is rendered as `<a>`.
       */

      /**
       * The default behavior if the button is rendered as `<button>`. MIME type of the `target`if this button is rendered as `<a>`.
       */
      function createRenderRoot() {
        var _$exec;

        return this.attachShadow({
          mode: 'open',
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ['', 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          autofocus,
          disabled,
          download,
          href,
          hreflang,
          isExpressive,
          linkRole,
          kind,
          ping,
          rel,
          size,
          target,
          type,
          _hasIcon: hasIcon,
          _hasMainContent: hasMainContent,
          _handleSlotChange: handleSlotChange
        } = this;
        const classes = classMap({
          [`${prefix$h}--btn`]: true,
          [`${prefix$h}--btn--${kind}`]: kind,
          [`${prefix$h}--btn--disabled`]: disabled,
          [`${prefix$h}--btn--icon-only`]: hasIcon && !hasMainContent,
          [`${prefix$h}--btn--sm`]: size === 'sm' && !isExpressive,
          [`${prefix$h}--btn--xl`]: size === 'xl',
          [`${prefix$h}--btn--field`]: size === 'field' && !isExpressive,
          [`${prefix$h}-ce--btn--has-icon`]: hasIcon,
          [`${prefix$h}--btn--expressive`]: isExpressive
        });

        if (href) {
          return disabled ? html(_t$f || (_t$f = _$g` <p id="button" part="button" class="${0}"> <slot @slotchange="${0}"></slot> <slot name="icon" @slotchange="${0}"></slot> </p> `), classes, handleSlotChange, handleSlotChange) : html(_t2$5 || (_t2$5 = _$g` <a id="button" part="button" role="${0}" class="${0}" download="${0}" href="${0}" hreflang="${0}" ping="${0}" rel="${0}" target="${0}" type="${0}"> <slot @slotchange="${0}"></slot> <slot name="icon" @slotchange="${0}"></slot> </a> `), ifNonNull(linkRole), classes, ifNonNull(download), ifNonNull(href), ifNonNull(hreflang), ifNonNull(ping), ifNonNull(rel), ifNonNull(target), ifNonNull(type), handleSlotChange, handleSlotChange);
        }

        return html(_t3$2 || (_t3$2 = _$g` <button id="button" part="button" class="${0}" ?autofocus="${0}" ?disabled="${0}" type="${0}"> <slot @slotchange="${0}"></slot> <slot name="icon" @slotchange="${0}"></slot> </button> `), classes, autofocus, disabled, ifNonNull(type), handleSlotChange, handleSlotChange);
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$4;
      }

    }]
  };
}, HostListenerMixin(FocusMixin(LitElement)));

let _$f = t => t,
    _t$e,
    _t2$4;
const {
  prefix: prefix$g
} = settings_1;
/**
 * Button skeleton.
 */

_decorate([customElement(`${prefix$g}-btn-skeleton`)], function (_initialize, _BXButton) {
  class BXButtonSkeleton extends _BXButton {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXButtonSkeleton,
    d: [{
      kind: "method",
      key: "_handleClickLinkSkeleton",
      value:
      /**
       * Handles `click` event on the `<a>.
       * @param event The event.
       */
      function _handleClickLinkSkeleton(event) {
        if (this.disabled) {
          event.preventDefault(); // Stop following the link

          event.stopPropagation(); // Stop firing `onClick`
        }
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          autofocus,
          disabled,
          download,
          href,
          hreflang,
          ping,
          rel,
          size,
          target,
          type
        } = this;
        const classes = classMap({
          [`${prefix$g}--btn`]: true,
          [`${prefix$g}--skeleton`]: true,
          [`${prefix$g}--btn--${size}`]: size
        });
        return href ? html(_t$e || (_t$e = _$f` <a id="button" role="button" class="${0}" download="${0}" href="${0}" hreflang="${0}" ping="${0}" rel="${0}" target="${0}" type="${0}" @click="${0}"></a> `), classes, ifNonNull(download), ifNonNull(href), ifNonNull(hreflang), ifNonNull(ping), ifNonNull(rel), ifNonNull(target), ifNonNull(type), this._handleClickLinkSkeleton) : html(_t2$4 || (_t2$4 = _$f` <button id="button" class="${0}" ?autofocus="${0}" ?disabled="${0}" type="${0}"></button> `), classes, autofocus, disabled, ifNonNull(type));
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$4;
      }

    }]
  };
}, BXButton);

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$3 = css([
  'a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:\'IBM Plex Sans\',\'Helvetica Neue\',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:\'IBM Plex Mono\',Menlo,\'DejaVu Sans Mono\',\'Bitstream Vera Sans Mono\',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}.bx--assistive-text,.bx--visually-hidden{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap}.bx--body{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);background-color:var(--cds-ui-background,#fff);color:var(--cds-text-01,#161616);line-height:1}.bx--body *,.bx--body ::after,.bx--body ::before{box-sizing:inherit}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--text-truncate--end{display:inline-block;overflow:hidden;width:100%;text-overflow:ellipsis;white-space:nowrap}.bx--text-truncate--front{display:inline-block;overflow:hidden;width:100%;direction:rtl;text-overflow:ellipsis;white-space:nowrap}.bx--side-nav,:host(bx-side-nav){position:fixed;z-index:8000;top:0;bottom:0;left:0;overflow:hidden;width:3rem;max-width:16rem;background-color:#fff;color:#525252;transition:width .11s cubic-bezier(.2,0,1,.9);will-change:width}.bx--side-nav--ux,:host(bx-side-nav){top:var(--cds-spacing-09,3rem);width:16rem}@media (max-width:65.98rem){.bx--side-nav--ux,:host(bx-side-nav){width:0}}.bx--side-nav--rail{width:3rem}.bx--side-nav--hidden{width:0}.bx--side-nav--expanded,.bx--side-nav--rail:not(.bx--side-nav--fixed):hover:host(bx-side-nav),.bx--side-nav.bx--side-nav--rail:not(.bx--side-nav--fixed):hover,:host(bx-side-nav[collapse-mode][expanded]),:host(bx-side-nav[expanded]){width:16rem}.bx--side-nav__overlay{position:fixed;top:3rem;left:0;width:0;height:0;background-color:transparent;opacity:0;transition:opacity 240ms cubic-bezier(.2,0,.38,.9),background-color 240ms cubic-bezier(.2,0,.38,.9)}@media (max-width:65.98rem){.bx--side-nav__overlay-active{width:100vw;height:100vh;background-color:var(--cds-overlay-01,rgba(22,22,22,.5));opacity:1;transition:opacity 240ms cubic-bezier(.2,0,.38,.9),background-color 240ms cubic-bezier(.2,0,.38,.9)}}.bx--header~.bx--side-nav,.bx--header~:host(bx-side-nav){top:3rem;height:calc(100% - 48px)}.bx--side-nav--fixed{width:16rem}.bx--side-nav--collapsed{width:16rem;-webkit-transform:translateX(-16rem);transform:translateX(-16rem)}.bx--side-nav__navigation,:host(bx-side-nav){display:flex;height:100%;flex-direction:column}.bx--side-nav__header{display:flex;width:100%;max-width:100%;height:3rem;border-bottom:1px solid #393939}.bx--side-nav--expanded .bx--side-nav__header,.bx--side-nav--fixed .bx--side-nav__header,.bx--side-nav:hover .bx--side-nav__header,:host(bx-side-nav[expanded]) .bx--side-nav__header,:hover:host(bx-side-nav) .bx--side-nav__header{height:auto}.bx--side-nav--ux .bx--side-nav__header,:host(bx-side-nav) .bx--side-nav__header{height:auto}.bx--side-nav__details{display:flex;min-width:0;flex:1;flex-direction:column;padding-right:1rem;opacity:0;visibility:hidden}.bx--side-nav--expanded .bx--side-nav__details,.bx--side-nav--fixed .bx--side-nav__details,.bx--side-nav:hover .bx--side-nav__details,:host(bx-side-nav[expanded]) .bx--side-nav__details,:hover:host(bx-side-nav) .bx--side-nav__details{visibility:inherit;opacity:1}.bx--side-nav--ux .bx--side-nav__details,:host(bx-side-nav) .bx--side-nav__details{opacity:1;visibility:inherit}.bx--side-nav__title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:1rem;font-size:.875rem;font-weight:600;letter-spacing:.1px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.bx--side-nav__select,.bx--side-nav__title{padding-left:.5rem}.bx--side-nav__switcher{position:relative;display:flex;align-items:center;justify-content:space-between}.bx--side-nav__switcher-chevron{position:absolute;top:0;right:.5rem;bottom:0;display:flex;align-items:center;fill:#525252}.bx--side-nav__select{outline:2px solid transparent;outline-offset:-2px;min-width:0;height:2rem;flex:1 1 0%;padding-right:2rem;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#161616;border-radius:0;color:#f4f4f4;cursor:pointer;font-size:.75rem;transition:outline 110ms}.bx--side-nav__select:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--side-nav__select:focus{outline-style:dotted}}.bx--side-nav__footer{width:100%;flex:0 0 3rem;background-color:#fff}.bx--side-nav__toggle{outline:2px solid transparent;outline-offset:-2px;box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;display:inline-block;padding:0;border:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;cursor:pointer;width:100%;height:100%;padding-left:1rem;text-align:left;transition:outline 110ms}.bx--side-nav__toggle *,.bx--side-nav__toggle ::after,.bx--side-nav__toggle ::before{box-sizing:inherit}.bx--side-nav__toggle::-moz-focus-inner{border:0}.bx--side-nav__toggle:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--side-nav__toggle:focus{outline-style:dotted}}.bx--side-nav__items,:host(bx-side-nav-items){overflow:hidden;flex:1 1 0%;padding:1rem 0 0}.bx--side-nav--expanded .bx--side-nav__items,.bx--side-nav--expanded :host(bx-side-nav-items),.bx--side-nav--fixed .bx--side-nav__items,.bx--side-nav--fixed :host(bx-side-nav-items),.bx--side-nav:hover .bx--side-nav__items,.bx--side-nav:hover :host(bx-side-nav-items),:host(bx-side-nav[expanded]) .bx--side-nav__items,:host(bx-side-nav[expanded]) :host(bx-side-nav-items),:hover:host(bx-side-nav) .bx--side-nav__items,:hover:host(bx-side-nav) :host(bx-side-nav-items){overflow-y:auto}.bx--side-nav--ux .bx--side-nav__items,.bx--side-nav--ux :host(bx-side-nav-items),:host(bx-side-nav) .bx--side-nav__items,:host(bx-side-nav) :host(bx-side-nav-items){overflow-y:auto}.bx--side-nav__item,:host(bx-side-nav-link),:host(bx-side-nav-menu){overflow:hidden;width:auto;height:auto}.bx--side-nav--ux .bx--side-nav__item,.bx--side-nav--ux :host(bx-side-nav-link),.bx--side-nav--ux :host(bx-side-nav-menu),:host(bx-side-nav) .bx--side-nav__item,:host(bx-side-nav) :host(bx-side-nav-link),:host(bx-side-nav) :host(bx-side-nav-menu){width:auto;height:auto}.bx--side-nav .bx--header__menu-title[aria-expanded=true]:hover,.bx--side-nav a.bx--header__menu-item:hover,.bx--side-nav__item:not(.bx--side-nav__item--active):hover .bx--side-nav__item:not(.bx--side-nav__item--active)>.bx--side-nav__submenu:hover,.bx--side-nav__item:not(.bx--side-nav__item--active):hover :not(.bx--side-nav__item--active):host(bx-side-nav-link)>.bx--side-nav__submenu:hover,.bx--side-nav__item:not(.bx--side-nav__item--active):hover :not(.bx--side-nav__item--active):host(bx-side-nav-menu)>.bx--side-nav__submenu:hover,.bx--side-nav__item:not(.bx--side-nav__item--active)>.bx--side-nav__link:hover,.bx--side-nav__menu a.bx--side-nav__link:not(.bx--side-nav__link--current):not([aria-current=page]):hover,:host(bx-side-nav) .bx--header__menu-title[aria-expanded=true]:hover,:host(bx-side-nav) a.bx--header__menu-item:hover,:not(.bx--side-nav__item--active):host(bx-side-nav-link)>.bx--side-nav__link:hover,:not(.bx--side-nav__item--active):host(bx-side-nav-menu)>.bx--side-nav__link:hover,:not(.bx--side-nav__item--active):hover:host(bx-side-nav-link) .bx--side-nav__item:not(.bx--side-nav__item--active)>.bx--side-nav__submenu:hover,:not(.bx--side-nav__item--active):hover:host(bx-side-nav-link) :not(.bx--side-nav__item--active):host(bx-side-nav-link)>.bx--side-nav__submenu:hover,:not(.bx--side-nav__item--active):hover:host(bx-side-nav-link) :not(.bx--side-nav__item--active):host(bx-side-nav-menu)>.bx--side-nav__submenu:hover,:not(.bx--side-nav__item--active):hover:host(bx-side-nav-menu) .bx--side-nav__item:not(.bx--side-nav__item--active)>.bx--side-nav__submenu:hover,:not(.bx--side-nav__item--active):hover:host(bx-side-nav-menu) :not(.bx--side-nav__item--active):host(bx-side-nav-link)>.bx--side-nav__submenu:hover,:not(.bx--side-nav__item--active):hover:host(bx-side-nav-menu) :not(.bx--side-nav__item--active):host(bx-side-nav-menu)>.bx--side-nav__submenu:hover{background-color:#e5e5e5;color:#161616}.bx--side-nav__item:not(.bx--side-nav__item--active) .bx--side-nav__menu-item>.bx--side-nav__link:hover>span,.bx--side-nav__item:not(.bx--side-nav__item--active) :host(bx-side-nav-menu-item)>.bx--side-nav__link:hover>span,.bx--side-nav__item:not(.bx--side-nav__item--active)>.bx--side-nav__link:hover>span,:not(.bx--side-nav__item--active):host(bx-side-nav-link) .bx--side-nav__menu-item>.bx--side-nav__link:hover>span,:not(.bx--side-nav__item--active):host(bx-side-nav-link) :host(bx-side-nav-menu-item)>.bx--side-nav__link:hover>span,:not(.bx--side-nav__item--active):host(bx-side-nav-link)>.bx--side-nav__link:hover>span,:not(.bx--side-nav__item--active):host(bx-side-nav-menu) .bx--side-nav__menu-item>.bx--side-nav__link:hover>span,:not(.bx--side-nav__item--active):host(bx-side-nav-menu) :host(bx-side-nav-menu-item)>.bx--side-nav__link:hover>span,:not(.bx--side-nav__item--active):host(bx-side-nav-menu)>.bx--side-nav__link:hover>span{color:#161616}.bx--side-nav__item--large{height:3rem}.bx--side-nav__divider,:host(bx-side-nav-divider){height:1px;margin:var(--cds-spacing-03,.5rem) var(--cds-spacing-05,1rem);background-color:#e0e0e0}.bx--side-nav__submenu{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;display:inline-block;padding:0;border:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;cursor:pointer;width:100%;font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px);outline:2px solid transparent;outline-offset:-2px;display:flex;height:2rem;align-items:center;padding:0 1rem;color:#525252;transition:color 110ms,background-color 110ms,outline 110ms;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.bx--side-nav__submenu *,.bx--side-nav__submenu ::after,.bx--side-nav__submenu ::before{box-sizing:inherit}.bx--side-nav__submenu::-moz-focus-inner{border:0}.bx--side-nav__submenu:hover{background-color:#e5e5e5;color:#161616}.bx--side-nav__submenu:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--side-nav__submenu:focus{outline-style:dotted}}.bx--side-nav__submenu-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:left}.bx--side-nav__icon.bx--side-nav__submenu-chevron{display:flex;flex:1;justify-content:flex-end}.bx--side-nav__submenu-chevron>svg{width:1rem;height:1rem;transition:-webkit-transform 110ms;transition:transform 110ms;transition:transform 110ms,-webkit-transform 110ms}.bx--side-nav__submenu[aria-expanded=true] .bx--side-nav__submenu-chevron>svg{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.bx--side-nav__item--large .bx--side-nav__submenu{height:3rem}.bx--side-nav__item--active .bx--side-nav__submenu:hover,:host(bx-side-nav-menu[active]) .bx--side-nav__submenu:hover{background-color:#e5e5e5;color:#161616}.bx--side-nav__item--active .bx--side-nav__submenu[aria-expanded=false],:host(bx-side-nav-menu[active]) .bx--side-nav__submenu[aria-expanded=false]{position:relative;background-color:#e5e5e5;color:#161616}.bx--side-nav__item--active .bx--side-nav__submenu[aria-expanded=false]::before,:host(bx-side-nav-menu[active]) .bx--side-nav__submenu[aria-expanded=false]::before{position:absolute;top:0;bottom:0;left:0;width:4px;background-color:#0f62fe;content:""}.bx--side-nav__item--active .bx--side-nav__submenu-title,:host(bx-side-nav-menu[active]) .bx--side-nav__submenu-title{color:#161616;font-weight:600}.bx--side-nav__menu{display:block;max-height:0;visibility:hidden}.bx--side-nav__submenu[aria-expanded=true]+.bx--side-nav__menu{max-height:93.75rem;visibility:inherit}.bx--side-nav__menu a.bx--side-nav__link{height:2rem;min-height:2rem;padding-left:2rem;font-weight:400}.bx--side-nav__item--icon:host(bx-side-nav-link) a.bx--side-nav__link,.bx--side-nav__item--icon:host(bx-side-nav-menu) a.bx--side-nav__link,.bx--side-nav__item.bx--side-nav__item--icon a.bx--side-nav__link,:host(bx-side-nav-menu):host(bx-side-nav-menu[has-icon]) a.bx--side-nav__link{padding-left:4.5rem}.bx--side-nav__menu a.bx--side-nav__link--current,.bx--side-nav__menu a.bx--side-nav__link[aria-current=page],a.bx--side-nav__link--current{background-color:#e0e0e0}.bx--side-nav__menu a.bx--side-nav__link--current>span,.bx--side-nav__menu a.bx--side-nav__link[aria-current=page]>span,a.bx--side-nav__link--current>span{color:#161616;font-weight:600}.bx--side-nav .bx--header__menu-title[aria-expanded=true]+.bx--header__menu,.bx--side-nav a.bx--header__menu-item,:host(bx-side-nav) .bx--header__menu-title[aria-expanded=true]+.bx--header__menu,:host(bx-side-nav) a.bx--header__menu-item,a.bx--side-nav__link{outline:2px solid transparent;outline-offset:-2px;font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px);position:relative;display:flex;min-height:2rem;align-items:center;padding:0 1rem;text-decoration:none;transition:color 110ms,background-color 110ms,outline 110ms}.bx--side-nav__item--large a.bx--side-nav__link{height:3rem}.bx--side-nav a.bx--header__menu-item .bx--text-truncate-end,:host(bx-side-nav) a.bx--header__menu-item .bx--text-truncate-end,a.bx--side-nav__link>.bx--side-nav__link-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#525252;font-size:.875rem;letter-spacing:.1px;line-height:1.25rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.bx--side-nav a.bx--header__menu-item:focus,:host(bx-side-nav) a.bx--header__menu-item:focus,a.bx--side-nav__link:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--side-nav a.bx--header__menu-item:focus,:host(bx-side-nav) a.bx--header__menu-item:focus,a.bx--side-nav__link:focus{outline-style:dotted}}a.bx--side-nav__link--current,a.bx--side-nav__link[aria-current=page]{background-color:#e5e5e5;font-weight:600}a.bx--side-nav__link--current .bx--side-nav__link-text,a.bx--side-nav__link[aria-current=page] .bx--side-nav__link-text{color:#161616}a.bx--side-nav__link--current::before,a.bx--side-nav__link[aria-current=page]::before{position:absolute;top:0;bottom:0;left:0;width:4px;background-color:#0f62fe;content:""}.bx--side-nav__icon{display:flex;flex:0 0 1rem;align-items:center;justify-content:center}.bx--side-nav__icon:not(.bx--side-nav__submenu-chevron){margin-right:1.5rem}.bx--side-nav__icon>svg{width:1rem;height:1rem;fill:#525252}.bx--side-nav__icon>svg.bx--side-nav-collapse-icon{display:none}.bx--side-nav--expanded .bx--side-nav__icon>svg.bx--side-nav-expand-icon,:host(bx-side-nav[expanded]) .bx--side-nav__icon>svg.bx--side-nav-expand-icon{display:none}.bx--side-nav--expanded .bx--side-nav__icon>svg.bx--side-nav-collapse-icon,:host(bx-side-nav[expanded]) .bx--side-nav__icon>svg.bx--side-nav-collapse-icon{display:block}.bx--side-nav--fixed .bx--side-nav__submenu,.bx--side-nav--fixed a.bx--side-nav__link{padding-left:1rem}.bx--side-nav--fixed .bx--side-nav__item:not(.bx--side-nav__item--icon) .bx--side-nav__menu a.bx--side-nav__link,.bx--side-nav--fixed :not(.bx--side-nav__item--icon):host(bx-side-nav-link) .bx--side-nav__menu a.bx--side-nav__link,.bx--side-nav--fixed :not(.bx--side-nav__item--icon):host(bx-side-nav-menu) .bx--side-nav__menu a.bx--side-nav__link{padding-left:2rem}@media (max-width:65.98rem){.bx--side-nav .bx--header__nav,:host(bx-side-nav) .bx--header__nav{display:block}}.bx--side-nav__header-navigation{display:none}@media (max-width:65.98rem){.bx--side-nav__header-navigation{position:relative;display:block;margin-bottom:2rem}}.bx--side-nav__header-divider::after{position:absolute;bottom:-1rem;left:1rem;width:calc(100% - 32px);height:.0625rem;background:#e0e0e0;content:""}.bx--side-nav a.bx--header__menu-item,:host(bx-side-nav) a.bx--header__menu-item{justify-content:space-between;color:#525252;white-space:nowrap}.bx--side-nav a.bx--header__menu-item[aria-expanded=true],:host(bx-side-nav) a.bx--header__menu-item[aria-expanded=true]{background-color:transparent}.bx--side-nav .bx--header__menu-title[aria-expanded=true]+.bx--header__menu,:host(bx-side-nav) .bx--header__menu-title[aria-expanded=true]+.bx--header__menu{bottom:inherit;width:100%;padding:0;background-color:transparent;box-shadow:none;-webkit-transform:none;transform:none}.bx--side-nav .bx--header__menu-title[aria-expanded=true]+.bx--header__menu li,:host(bx-side-nav) .bx--header__menu-title[aria-expanded=true]+.bx--header__menu li{width:100%}.bx--side-nav .bx--header__menu-title[aria-expanded=true]+.bx--header__menu a.bx--header__menu-item,:host(bx-side-nav) .bx--header__menu-title[aria-expanded=true]+.bx--header__menu a.bx--header__menu-item{padding-left:4.25rem;font-weight:400}.bx--side-nav .bx--header__menu-title[aria-expanded=true]+.bx--header__menu a.bx--header__menu-item:hover,:host(bx-side-nav) .bx--header__menu-title[aria-expanded=true]+.bx--header__menu a.bx--header__menu-item:hover{background-color:#e5e5e5;color:#161616}.bx--side-nav .bx--header__menu a.bx--header__menu-item,:host(bx-side-nav) .bx--header__menu a.bx--header__menu-item{height:inherit}.bx--side-nav .bx--header__menu-arrow,.bx--side-nav a.bx--header__menu-item:focus .bx--header__menu-arrow,.bx--side-nav a.bx--header__menu-item:hover .bx--header__menu-arrow,:host(bx-side-nav) .bx--header__menu-arrow{fill:#525252}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--side-nav .bx--header__menu-arrow,.bx--side-nav a.bx--header__menu-item:focus .bx--header__menu-arrow,.bx--side-nav a.bx--header__menu-item:hover .bx--header__menu-arrow,.bx--side-nav__icon>svg,:host(bx-side-nav) .bx--header__menu-arrow{fill:ButtonText}}:host(bx-side-nav){top:0}:host(bx-side-nav[collapse-mode=fixed]){width:16rem}:host(bx-side-nav[collapse-mode=rail]){width:3rem}:host(bx-side-nav[collapse-mode=rail]):hover{width:16rem}:host(bx-side-nav[collapse-mode][usage-mode=header-nav]),:host(bx-side-nav[usage-mode=header-nav]){width:0}@media (max-width:65.98rem){:host(bx-side-nav[collapse-mode][expanded][usage-mode=header-nav]),:host(bx-side-nav[expanded][usage-mode=header-nav]){width:16rem}}:host(bx-side-nav-link){display:block;outline:0;width:auto;height:auto}:host(bx-side-nav-link) .bx--side-nav__icon{color:#525252}:host(bx-side-nav-link) .bx--side-nav__icon[hidden]{display:none}:host(bx-side-nav-divider){display:block}:host(bx-side-nav-menu){display:block;outline:0;width:auto;height:auto}:host(bx-side-nav-menu) .bx--side-nav__icon[hidden]{display:none}:host(bx-side-nav-menu[active]){background-color:#e5e5e5;color:#161616;position:relative}:host(bx-side-nav-menu[active])::before{content:"";position:absolute;top:0;bottom:0;left:0;width:4px;background-color:#0f62fe}:host(bx-side-nav-menu[active][expanded]){background-color:inherit;color:inherit;position:inherit}:host(bx-side-nav-menu[active][expanded])::before{content:none}:host(bx-side-nav-menu-item){display:block;outline:0;width:auto;height:auto}:host(bx-side-nav-menu-item) a.bx--side-nav__link{height:2rem;min-height:2rem;padding-left:2rem;font-weight:400}:host(bx-side-nav-menu-item[parent-has-icon]) a.bx--side-nav__link{padding-left:4.5rem}:host(bx-side-nav-item) .bx--side-nav__link:hover,:host(bx-side-nav-menu) .bx--side-nav__submenu:hover,:host(bx-side-nav-menu-item) .bx--side-nav__link:hover{background-color:#e5e5e5;color:#161616}',
]);

let _$e = t => t,
    _t$d;
const {
  prefix: prefix$f
} = settings_1;
/**
 * Side nav menu item.
 * @element bx-side-nav-menu-item
 * @csspart link The link.
 * @csspart title The title.
 */

_decorate([customElement(`${prefix$f}-side-nav-menu-item`)], function (_initialize, _FocusMixin) {
  class BXSideNavMenuItem extends _FocusMixin {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXSideNavMenuItem,
    d: [{
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "active",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property()],
      key: "href",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [property()],
      key: "title",
      value: void 0
    }, {
      kind: "method",
      key: "createRenderRoot",
      value:
      /**
       * `true` if the menu item should be active.
       */

      /**
       * Link `href`.
       */

      /**
       * The title.
       */
      function createRenderRoot() {
        var _$exec;

        return this.attachShadow({
          mode: 'open',
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ['', 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "shouldUpdate",
      value: function shouldUpdate(changedProperties) {
        if (changedProperties.has('active') && this.active) {
          const {
            selectorMenu
          } = this.constructor;
          const parent = this.closest(selectorMenu);

          if (parent) {
            parent.active = true;
          }
        }

        return true;
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          active,
          href,
          title
        } = this;
        const classes = classMap({
          [`${prefix$f}--side-nav__link`]: true,
          [`${prefix$f}--side-nav__link--current`]: active
        });
        return html(_t$d || (_t$d = _$e` <a part="link" class="${0}" href="${0}"> <span part="title" class="${0}--side-nav__link-text"> <slot>${0}</slot> </span> </a> `), classes, href, prefix$f, title);
      }
      /**
       * A selector that will return the parent menu.
       */

    }, {
      kind: "get",
      static: true,
      key: "selectorMenu",
      value: function selectorMenu() {
        return `${prefix$f}-side-nav-menu`;
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$3;
      }

    }]
  };
}, FocusMixin(LitElement));

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc.value;
    };
  }

  return _get.apply(this, arguments);
}

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$2 = css([
  ".bx--text-truncate--end{display:inline-block;overflow:hidden;width:100%;text-overflow:ellipsis;white-space:nowrap}.bx--text-truncate--front{display:inline-block;overflow:hidden;width:100%;direction:rtl;text-overflow:ellipsis;white-space:nowrap}a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:\"\"}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--header,:host(bx-header){position:fixed;z-index:8000;top:0;right:0;left:0;display:flex;height:3rem;align-items:center;border-bottom:1px solid #393939;background-color:#161616}.bx--header__action{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;display:inline-block;padding:0;border:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;cursor:pointer;width:100%;width:3rem;height:3rem;border:.0625rem solid transparent;transition:background-color 110ms,border-color 110ms}.bx--header__action *,.bx--header__action ::after,.bx--header__action ::before{box-sizing:inherit}.bx--header__action::-moz-focus-inner{border:0}.bx--header__action--active>svg.bx--navigation-menu-panel-expand-icon,.bx--header__action>svg.bx--navigation-menu-panel-collapse-icon{display:none}.bx--header__action--active>svg.bx--navigation-menu-panel-collapse-icon{display:inline}.bx--header__action:hover{background-color:#353535}.bx--header__action--active{border-right:1px solid #393939;border-bottom:1px solid #161616;border-left:1px solid #393939}.bx--header__action:focus{border-color:#fff;outline:0}.bx--header__action:active{background-color:#393939}.bx--header__action.bx--btn--icon-only.bx--tooltip__trigger{justify-content:center}.bx--header__action>svg{fill:#fff}.bx--header__menu-trigger>svg{fill:#f4f4f4}.bx--header__menu-trigger:hover{fill:#2c2c2c}.bx--header__menu-toggle{display:flex;align-items:center;justify-content:center}@media (min-width:66rem){.bx--header__menu-toggle__hidden{display:none}}a.bx--header__name{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:flex;height:100%;align-items:center;padding:0 2rem 0 1rem;border:.125rem solid transparent;font-weight:600;letter-spacing:.1px;line-height:1.25rem;outline:0;text-decoration:none;transition:border-color 110ms;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a.bx--header__name:focus{border-color:#fff}.bx--header__name--prefix{font-weight:400}a.bx--header__name,a.bx--header__name:hover{color:#f4f4f4}.bx--header__menu-toggle:not(.bx--header__menu-toggle__hidden)~.bx--header__name{padding-left:.5rem}.bx--header__nav,:host(bx-header-nav){position:relative;display:none;height:100%;padding-left:1rem}@media (min-width:66rem){.bx--header__nav,:host(bx-header-nav){display:block}}.bx--header__nav::before,:host(bx-header-nav)::before{position:absolute;top:50%;left:0;display:block;width:.0625rem;height:1.5rem;background-color:#393939;content:\"\";-webkit-transform:translateY(-50%);transform:translateY(-50%)}.bx--header__menu-bar{display:flex;height:100%;padding:0;margin:0;list-style:none}a.bx--header__menu-item{position:relative;display:flex;height:100%;align-items:center;padding:0 1rem;border:2px solid transparent;color:#c6c6c6;font-size:.875rem;font-weight:400;letter-spacing:0;line-height:1.125rem;text-decoration:none;transition:background-color 110ms,border-color 110ms,color 110ms;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a.bx--header__menu-item:hover{background-color:#2c2c2c;color:#f4f4f4}.bx--header__action:active,a.bx--header__menu-item:active{background-color:#393939;color:#f4f4f4}a.bx--header__menu-item:focus{border-color:#fff;color:#f4f4f4;outline:0}a.bx--header__menu-item:active>svg,a.bx--header__menu-item:focus>svg,a.bx--header__menu-item:hover>svg{fill:#f4f4f4}.bx--header__menu-item--current::after,a.bx--header__menu-item[aria-current=page]::after{position:absolute;top:0;right:0;bottom:-2px;left:0;width:100%;border-bottom:3px solid var(--cds-inverse-support-04,#4589ff);content:\"\"}.bx--header__menu-item--current:focus::after,a.bx--header__menu-item[aria-current=page]:focus::after{border:0}a.bx--header__menu-item.bx--header__menu-item--current:focus,a.bx--header__menu-item[aria-current=page]:focus{border:2px solid #fff}.bx--header__submenu,:host(bx-header-menu){position:relative}.bx--header__submenu--current::after{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;border-bottom:3px solid var(--cds-border-interactive,#0f62fe);content:\"\"}.bx--header__submenu--current:focus{border:2px solid var(--cds-focus,#0f62fe)}.bx--header__submenu--current:focus::after{border:0}.bx--header__menu-title[aria-haspopup=true]{position:relative}.bx--header__menu-title[aria-expanded=true]{z-index:8001;background-color:#262626;color:#fff}.bx--header__menu-title[aria-expanded=true]>.bx--header__menu-arrow{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.bx--header__menu{display:none;padding:0;margin:0;list-style:none}.bx--header__menu-title[aria-expanded=true]+.bx--header__menu{position:absolute;z-index:8000;bottom:0;left:0;display:flex;width:12.5rem;flex-direction:column;background-color:#262626;box-shadow:0 4px 8px 0 rgba(0,0,0,.5);-webkit-transform:translateY(100%);transform:translateY(100%)}.bx--header__menu-title[aria-expanded=true]+.bx--header__menu .bx--header__menu-item:hover{background-color:#353535}.bx--header__menu-title[aria-expanded=true]+.bx--header__menu .bx--header__menu-item:active{background-color:#393939}.bx--header__menu .bx--header__menu-item{height:3rem}.bx--header__menu .bx--header__menu-item:hover{background-color:#262626;color:#f4f4f4}.bx--header__menu-arrow{margin-left:.5rem;fill:#c6c6c6;transition:fill 110ms,-webkit-transform 110ms;transition:transform 110ms,fill 110ms;transition:transform 110ms,fill 110ms,-webkit-transform 110ms}.bx--header__global{display:flex;height:100%;flex:1 1 0%;justify-content:flex-end}.bx--skip-to-content{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap}.bx--skip-to-content:focus{z-index:9999;top:0;left:0;display:flex;width:auto;height:3rem;align-items:center;padding:0 1rem;border:4px solid #0f62fe;background-color:#161616;clip:auto;color:#f4f4f4;outline:0}:host(bx-header-nav) .bx-ce--header__divider{position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);height:1.5rem;width:.0625rem;background-color:#393939}:host(bx-header-nav-item){outline:0}:host(bx-header-menu){outline:0}:host(bx-header-menu-item){outline:0}:host(bx-header-menu-item) a.bx--header__menu-item{height:3rem}:host(bx-header-menu-item) a.bx--header__menu-item:hover{background-color:#353535;color:#f4f4f4}:host(bx-header-menu-item) a.bx--header__menu-item:active{background-color:#393939}:host(bx-header-menu-button){display:inline-block;display:content;outline:0}@media (min-width:66rem){:host(bx-header-menu-button){display:none}}:host(bx-header-menu-button[collapse-mode=fixed]){display:none}@media (min-width:66rem){:host(bx-header-menu-button[collapse-mode=rail]){display:block}}:host(bx-header-name){display:inline;display:content;height:100%}",
]);

let _$d = t => t,
    _t$c;
const {
  prefix: prefix$e
} = settings_1;
/**
 * Header.
 * @element bx-header
 */

_decorate([customElement(`${prefix$e}-header`)], function (_initialize, _LitElement) {
  class BXHeader extends _LitElement {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXHeader,
    d: [{
      kind: "method",
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'banner');
        }

        _get(_getPrototypeOf(BXHeader.prototype), "connectedCallback", this).call(this);
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return html(_t$c || (_t$c = _$d`<slot></slot>`));
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$2;
      }

    }]
  };
}, LitElement);

/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Walks through the given DOM collection and runs the given callback.
 * @param a A DOM collection.
 * @param predicate The callback function.
 * @param [thisObject] The context object for the given callback function.
 */

const forEach = (a, predicate, thisObject) => Array.prototype.forEach.call(a, predicate, thisObject);

/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Collapse modes of side nav.
 */
let SIDE_NAV_COLLAPSE_MODE;
/**
 * The usage purpose of side nav.
 */

(function (SIDE_NAV_COLLAPSE_MODE) {
  SIDE_NAV_COLLAPSE_MODE["FIXED"] = "fixed";
  SIDE_NAV_COLLAPSE_MODE["RAIL"] = "rail";
  SIDE_NAV_COLLAPSE_MODE["RESPONSIVE"] = "responsive";
})(SIDE_NAV_COLLAPSE_MODE || (SIDE_NAV_COLLAPSE_MODE = {}));

let SIDE_NAV_USAGE_MODE;

(function (SIDE_NAV_USAGE_MODE) {
  SIDE_NAV_USAGE_MODE["REGULAR"] = "";
  SIDE_NAV_USAGE_MODE["HEADER_NAV"] = "header-nav";
})(SIDE_NAV_USAGE_MODE || (SIDE_NAV_USAGE_MODE = {}));

let _$c = t => t,
    _t$b;
const {
  prefix: prefix$d
} = settings_1;
/**
 * Side nav.
 * @element bx-side-nav
 */

_decorate([customElement(`${prefix$d}-side-nav`)], function (_initialize, _HostListenerMixin) {
  class BXSideNav extends _HostListenerMixin {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXSideNav,
    d: [{
      kind: "field",
      key: "_hovered",

      value() {
        return false;
      }

    }, {
      kind: "field",
      key: "_hTransition",

      value() {
        return null;
      }

    }, {
      kind: "field",
      key: "_transitionPromise",

      value() {
        return Promise.resolve();
      }

    }, {
      kind: "get",
      key: "_updateAndTransitionPromise",
      value:
      /**
       * `true` if this side nav is hovered.
       */

      /**
       * The handle for `transitionend` event listener.
       */

      /**
       * A promise that is resolved when the transition is complete.
       */

      /**
       * A promise that is resolved when the transition upon proprety update is complete.
       */
      function _updateAndTransitionPromise() {
        return this.updateComplete.then(() => this._transitionPromise);
      }
      /**
       * Cleans the handle for `transitionend` event listener.
       */

    }, {
      kind: "method",
      key: "_cleanHTransition",
      value: function _cleanHTransition() {
        if (this._hTransition) {
          this._hTransition = this._hTransition.release();
        }
      }
      /**
       * Handles `${prefix}-header-menu-button-toggle` event on the document.
       */

    }, {
      kind: "field",
      decorators: [HostListener('parentRoot:eventButtonToggle')],
      key: "_handleButtonToggle",

      value() {
        return async event => {
          this.expanded = event.detail.active;

          if (this.expanded) {
            await this._updateAndTransitionPromise; // Checks if the side nav is not collapsed during the animation

            if (this.expanded) {
              var _this$querySelector;

              (_this$querySelector = this.querySelector(this.constructor.selectorNavItems)) === null || _this$querySelector === void 0 ? void 0 : _this$querySelector.focus();
            }
          }
        };
      }

    }, {
      kind: "method",
      key: "_updatedSideNavMenuForceCollapsedState",
      value:
      /**
       * Force child side nav menus collapsed upon the hover/expanded state of this side nav.
       */
      function _updatedSideNavMenuForceCollapsedState() {
        const {
          expanded,
          _hovered: hovered
        } = this;
        forEach(this.querySelectorAll(this.constructor.selectorMenu), item => {
          item.forceCollapsed = !expanded && !hovered;
        });
      }
      /**
       * Handles `mouseover` event handler.
       */

    }, {
      kind: "method",
      decorators: [HostListener('mouseover')],
      key: "_handleMouseover",
      value: function _handleMouseover() {
        this._hovered = true;

        this._updatedSideNavMenuForceCollapsedState();
      }
      /**
       * Handles `mouseout` event handler.
       */

    }, {
      kind: "method",
      decorators: [HostListener('mouseout')],
      key: "_handleMouseout",
      value: function _handleMouseout() {
        this._hovered = false;

        this._updatedSideNavMenuForceCollapsedState();
      }
      /**
       * Collapse mode of the side nav.
       */

    }, {
      kind: "field",
      decorators: [property({
        reflect: true,
        attribute: 'collapse-mode'
      })],
      key: "collapseMode",

      value() {
        return SIDE_NAV_COLLAPSE_MODE.RESPONSIVE;
      }

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "expanded",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property({
        reflect: true,
        attribute: 'usage-mode'
      })],
      key: "usageMode",

      value() {
        return SIDE_NAV_USAGE_MODE.REGULAR;
      }

    }, {
      kind: "method",
      key: "connectedCallback",
      value:
      /**
       * `true` to expand the side nav.
       */

      /**
       * Usage mode of the side nav.
       */
      function connectedCallback() {
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'navigation');
        }

        _get(_getPrototypeOf(BXSideNav.prototype), "connectedCallback", this).call(this);
      }
    }, {
      kind: "method",
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._cleanHTransition();

        _get(_getPrototypeOf(BXSideNav.prototype), "disconnectedCallback", this).call(this);
      }
    }, {
      kind: "method",
      key: "shouldUpdate",
      value: function shouldUpdate(changedProperties) {
        if (changedProperties.has('expanded')) {
          this._transitionPromise = new Promise(resolve => {
            this._cleanHTransition();

            this._hTransition = on(this, 'transitionend', () => {
              this._cleanHTransition();

              resolve();
            });
          });
        }

        return true;
      }
    }, {
      kind: "method",
      key: "updated",
      value: function updated(changedProperties) {
        if (changedProperties.has('collapseMode') || changedProperties.has('usageMode')) {
          const {
            collapseMode,
            usageMode
          } = this;

          if ((collapseMode === SIDE_NAV_COLLAPSE_MODE.FIXED || collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL) && usageMode === SIDE_NAV_USAGE_MODE.HEADER_NAV) {
            console.warn('Fixed/rail modes of side nav cannot be used with header nav mode.'); // eslint-disable-line no-console
          }
        }

        const doc = this.getRootNode();

        if (changedProperties.has('collapseMode')) {
          forEach(doc.querySelectorAll(this.constructor.selectorButtonToggle), item => {
            item.collapseMode = this.collapseMode;
          });
        }

        if (changedProperties.has('expanded')) {
          this._updatedSideNavMenuForceCollapsedState();

          forEach(doc.querySelectorAll(this.constructor.selectorButtonToggle), item => {
            item.active = this.expanded;
          });
        }

        if (changedProperties.has('usageMode')) {
          forEach(doc.querySelectorAll(this.constructor.selectorButtonToggle), item => {
            item.usageMode = this.usageMode;
          });
        }
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return html(_t$b || (_t$b = _$c`<slot></slot>`));
      }
      /**
       * A selector that will return the toggle buttons.
       */

    }, {
      kind: "get",
      static: true,
      key: "selectorButtonToggle",
      value: function selectorButtonToggle() {
        return `${prefix$d}-header-menu-button`;
      }
      /**
       * A selector that will return side nav focusable items.
       */

    }, {
      kind: "get",
      static: true,
      key: "selectorNavItems",
      value: function selectorNavItems() {
        return `${prefix$d}-side-nav-menu, ${prefix$d}-side-nav-menu-item, ${prefix$d}-side-nav-link`;
      }
      /**
       * A selector that will return side nav menus.
       */

    }, {
      kind: "get",
      static: true,
      key: "selectorMenu",
      value: function selectorMenu() {
        return `${prefix$d}-side-nav-menu`;
      }
      /**
       * The name of the custom event fired after the header menu button in the document is toggled upon a user gesture.
       */

    }, {
      kind: "get",
      static: true,
      key: "eventButtonToggle",
      value: function eventButtonToggle() {
        return `${prefix$d}-header-menu-button-toggled`;
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$3;
      }

    }]
  };
}, HostListenerMixin(LitElement));

const {
  prefix: prefix$c
} = settings_1;
/**
 * A divider in side nav.
 * @element bx-side-nav-divider
 */

_decorate([customElement(`${prefix$c}-side-nav-divider`)], function (_initialize, _LitElement) {
  class BXSideNavDivider extends _LitElement {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXSideNavDivider,
    d: [{
      kind: "method",
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'separator');
        }

        _get(_getPrototypeOf(BXSideNavDivider.prototype), "connectedCallback", this).call(this);
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$3;
      }

    }]
  };
}, LitElement);

let _$b = t => t,
    _t$a,
    _t2$3;
const {
  prefix: prefix$b
} = settings_1;
/**
 * The product name UI in header nav.
 * @element bx-header-name
 * @csspart link The link.
 * @csspart prefix The prefix content.
 */

_decorate([customElement(`${prefix$b}-header-name`)], function (_initialize, _FocusMixin) {
  class BXHeaderName extends _FocusMixin {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXHeaderName,
    d: [{
      kind: "field",
      decorators: [property()],
      key: "href",
      value: void 0
    }, {
      kind: "field",
      decorators: [property()],
      key: "prefix",
      value: void 0
    }, {
      kind: "method",
      key: "createRenderRoot",
      value:
      /**
       * Link `href`.
       */

      /**
       * The product name prefix.
       */
      function createRenderRoot() {
        var _$exec;

        return this.attachShadow({
          mode: 'open',
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ['', 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          href,
          prefix: namePrefix
        } = this;
        const namePrefixPart = !namePrefix ? undefined : html(_t$a || (_t$a = _$b` <span part="prefix" class="${0}--header__name--prefix">${0}</span> `), prefix$b, namePrefix);
        return html(_t2$3 || (_t2$3 = _$b` <a part="link" class="${0}--header__name" href="${0}">${0}&nbsp;<slot></slot></a> `), prefix$b, ifDefined(href), namePrefixPart);
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$2;
      }

    }]
  };
}, FocusMixin(LitElement));

let _$a = t => t,
    _t$9;
const {
  prefix: prefix$a
} = settings_1;
/**
 * Header.
 * @element bx-header-nav
 * @csspart menu-body The menu body.
 * @csspart divider The divider.
 */

_decorate([customElement(`${prefix$a}-header-nav`)], function (_initialize, _LitElement) {
  class BXHeaderNav extends _LitElement {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXHeaderNav,
    d: [{
      kind: "field",
      decorators: [property({
        attribute: 'menu-bar-label'
      })],
      key: "menuBarLabel",
      value: void 0
    }, {
      kind: "method",
      key: "connectedCallback",
      value:
      /**
       * The `aria-label` attribute for the menu bar UI.
       */
      function connectedCallback() {
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'navigation');
        }

        _get(_getPrototypeOf(BXHeaderNav.prototype), "connectedCallback", this).call(this);
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          menuBarLabel
        } = this;
        return html(_t$9 || (_t$9 = _$a` <div part="divider" class="${0}-ce--header__divider"></div> <ul part="menu-body" class="${0}--header__menu-bar" aria-label="${0}"> <slot></slot> </ul> `), prefix$a, prefix$a, menuBarLabel);
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$2;
      }

    }]
  };
}, LitElement);

let _$9 = t => t,
    _t$8;
const {
  prefix: prefix$9
} = settings_1;
/**
 * Side nav menu item.
 * @element bx-side-nav-link
 * @slot link - The link.
 * @slot title - The title.
 * @slot title-icon-container - The title icon container.
 */

_decorate([customElement(`${prefix$9}-side-nav-link`)], function (_initialize, _FocusMixin) {
  class BXSideNavLink extends _FocusMixin {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXSideNavLink,
    d: [{
      kind: "field",
      decorators: [query('#title-icon-container')],
      key: "_titleIconContainerNode",
      value: void 0
    }, {
      kind: "method",
      key: "_handleSlotChangeTitleIcon",
      value:
      /**
       * The container for the title icon.
       */

      /**
       * Handles `slotchange` event on the `<slot>` for the title icon.
       */
      function _handleSlotChangeTitleIcon({
        target
      }) {
        var _this$_titleIconConta;

        (_this$_titleIconConta = this._titleIconContainerNode) === null || _this$_titleIconConta === void 0 ? void 0 : _this$_titleIconConta.toggleAttribute('hidden', target.assignedNodes().length === 0);
      }
      /**
       * `true` if the menu item should be active.
       */

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "active",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property()],
      key: "href",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [property()],
      key: "title",
      value: void 0
    }, {
      kind: "method",
      key: "createRenderRoot",
      value:
      /**
       * Link `href`.
       */

      /**
       * The title.
       */
      function createRenderRoot() {
        var _$exec;

        return this.attachShadow({
          mode: 'open',
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ['', 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'listitem');
        }

        _get(_getPrototypeOf(BXSideNavLink.prototype), "connectedCallback", this).call(this);
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          active,
          href,
          title,
          _handleSlotChangeTitleIcon: handleSlotChangeTitleIcon
        } = this;
        const classes = classMap({
          [`${prefix$9}--side-nav__link`]: true,
          [`${prefix$9}--side-nav__link--current`]: active
        });
        return html(_t$8 || (_t$8 = _$9` <a part="link" class="${0}" href="${0}"> <div id="title-icon-container" part="title-icon-container" hidden class="${0}--side-nav__icon"> <slot name="title-icon" @slotchange="${0}"></slot> </div> <span part="title" class="${0}--side-nav__link-text"> <slot>${0}</slot> </span> </a> `), classes, href, prefix$9, handleSlotChangeTitleIcon, prefix$9, title);
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$3;
      }

    }]
  };
}, FocusMixin(LitElement));

/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */
const attributesMapCache = new WeakMap();
/**
 * A directive that applies attributes from a key-value pairs.
 * This must be used in the `...` name and must be the only part used in the attribute.
 * It applies the key-value pairs in the `attributesInfo` argument
 * and sets them as attribute name/value pairs.
 * @param classInfo The key-value pair to be set as the attribute name/value pairs.
 */

const spread = directive(attributesInfo => part => {
  // The first character of `...` is interpreted as one for `PropertyPart`
  if (!(part instanceof PropertyPart) || part.committer.name !== '..' || part.committer.parts.length > 1) {
    throw new Error('The `spread` directive must be used in with `...` name and must be the only part in the attribute.');
  }

  const {
    committer
  } = part;
  const {
    element
  } = committer; // Removes old attributes that are no longer there

  const oldAttributesInfo = attributesMapCache.get(part);

  if (oldAttributesInfo) {
    Object.keys(oldAttributesInfo).forEach(name => {
      if (!(name in attributesInfo)) {
        element.removeAttribute(name);
      }
    });
  } // Adds new attributes


  Object.keys(attributesInfo).forEach(name => {
    const value = attributesInfo[name];

    if ((!oldAttributesInfo || !Object.is(value, oldAttributesInfo[name])) && typeof value !== 'undefined') {
      element.setAttribute(name, value);
    }
  }); // Updates the cache

  attributesMapCache.set(part, attributesInfo);
});

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const svgResultCarbonIcon$4 = ({ children, ...attrs } = {}) =>
  svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread(
    attrs
  )}" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">${children}${children}${children}<path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path></svg>`;

let _$8 = t => t,
    _t$7;
const {
  prefix: prefix$8
} = settings_1;
/**
 * Header menu.
 * @element bx-header-menu
 * @csspart trigger The trigger button.
 * @csspart trigger-icon The trigger button icon.
 * @csspart menu-body The menu body.
 */

_decorate([customElement(`${prefix$8}-header-menu`)], function (_initialize, _HostListenerMixin) {
  class BXHeaderMenu extends _HostListenerMixin {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXHeaderMenu,
    d: [{
      kind: "field",
      decorators: [query('a')],
      key: "_trigger",
      value: void 0
    }, {
      kind: "method",
      key: "_handleClick",
      value:
      /**
       * The trigger button.
       */

      /**
       * Handles `click` event handler on this element.
       */
      function _handleClick() {
        this._handleUserInitiatedToggle();
      }
      /**
       * Handler for the `keydown` event on the trigger button.
       */

    }, {
      kind: "method",
      key: "_handleKeydownTrigger",
      value: function _handleKeydownTrigger({
        key
      }) {
        if (key === 'Esc' || key === 'Escape') {
          this._handleUserInitiatedToggle(false);
        }
      }
      /**
       * Handles user-initiated toggling the open state.
       * @param [force] If specified, forces the open state to the given one.
       */

    }, {
      kind: "method",
      key: "_handleUserInitiatedToggle",
      value: function _handleUserInitiatedToggle(force = !this.expanded) {
        this.expanded = force;

        if (!force) {
          this._trigger.focus();
        }
      }
      /**
       * Handles `blur` event handler on this element.
       */

    }, {
      kind: "method",
      decorators: [HostListener('focusout')],
      key: "_handleBlur",
      value: function _handleBlur({
        relatedTarget
      }) {
        if (!this.contains(relatedTarget)) {
          this.expanded = false;
        }
      }
      /**
       * `true` if the menu should be expanded.
       */

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "expanded",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'trigger-content'
      })],
      key: "triggerContent",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'menu-label'
      })],
      key: "menuLabel",
      value: void 0
    }, {
      kind: "method",
      key: "createRenderRoot",
      value:
      /**
       * The content of the trigger button.
       */

      /**
       * The `aria-label` attribute for the menu UI.
       */
      function createRenderRoot() {
        return this.attachShadow({
          mode: 'open',
          delegatesFocus: true
        });
      }
    }, {
      kind: "method",
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'listitem');
        }

        _get(_getPrototypeOf(BXHeaderMenu.prototype), "connectedCallback", this).call(this);
      }
    }, {
      kind: "method",
      key: "updated",
      value: function updated(changedProperties) {
        if (changedProperties.has('expanded')) {
          const {
            selectorItem
          } = this.constructor;
          const {
            expanded
          } = this;
          forEach(this.querySelectorAll(selectorItem), elem => {
            elem.tabIndex = expanded ? 0 : -1;
          });
        }
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          expanded,
          triggerContent,
          menuLabel,
          _handleClick: handleClick,
          _handleKeydownTrigger: handleKeydownTrigger
        } = this;
        return html(_t$7 || (_t$7 = _$8` <a part="trigger" tabindex="0" class="${0}--header__menu-item ${0}--header__menu-title" href="javascript:void 0" aria-haspopup="menu" aria-expanded="${0}" @click="${0}" @keydown="${0}"> ${0}${0} </a> <ul part="menu-body" class="${0}--header__menu" aria-label="${0}"> <slot></slot> </ul> `), prefix$8, prefix$8, String(Boolean(expanded)), handleClick, handleKeydownTrigger, triggerContent, svgResultCarbonIcon$4({
          part: 'trigger-icon',
          class: `${prefix$8}--header__menu-arrow`
        }), prefix$8, ifDefined(menuLabel));
      }
      /**
       * A selector that will return the menu items.
       */

    }, {
      kind: "get",
      static: true,
      key: "selectorItem",
      value: function selectorItem() {
        return `${prefix$8}-header-menu-item`;
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$2;
      }

    }]
  };
}, HostListenerMixin(FocusMixin(LitElement)));

let _$7 = t => t,
    _t$6;
const {
  prefix: prefix$7
} = settings_1;
/**
 * Header nav item.
 * @element bx-header-nav-item
 * @csspart link The link.
 * @csspart title The title.
 */

let BXHeaderNavItem = _decorate([customElement(`${prefix$7}-header-nav-item`)], function (_initialize, _FocusMixin) {
  class BXHeaderNavItem extends _FocusMixin {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXHeaderNavItem,
    d: [{
      kind: "field",
      decorators: [property()],
      key: "href",
      value: void 0
    }, {
      kind: "field",
      decorators: [property()],
      key: "title",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "role",

      value() {
        return 'listitem';
      }

    }, {
      kind: "method",
      key: "createRenderRoot",
      value:
      /**
       * Link `href`.
       */

      /**
       * The title.
       */

      /**
       * As child of <ul>, this element must have role of listitem
       */
      function createRenderRoot() {
        var _$exec;

        return this.attachShadow({
          mode: 'open',
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ['', 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          href,
          title
        } = this;
        return html(_t$6 || (_t$6 = _$7` <a part="link" class="${0}--header__menu-item" tabindex="0" href="${0}"> <span part="title" class="${0}--text-truncate--end"><slot>${0}</slot></span> </a> `), prefix$7, ifDefined(href), prefix$7, title);
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$2;
      }

    }]
  };
}, FocusMixin(LitElement));

const {
  prefix: prefix$6
} = settings_1;
/**
 * Header submenu item.
 * @element bx-header-menu-item
 */

_decorate([customElement(`${prefix$6}-header-menu-item`)], function (_initialize, _BXHeaderNavItem) {
  class BXHeaderMenuItem extends _BXHeaderNavItem {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXHeaderMenuItem,
    d: []
  };
}, BXHeaderNavItem);

let _$6 = t => t,
    _t$5;
const {
  prefix: prefix$5
} = settings_1;
/**
 * Side nav items.
 * @element bx-side-nav-items
 */

_decorate([customElement(`${prefix$5}-side-nav-items`)], function (_initialize, _LitElement) {
  class BXSideNavItems extends _LitElement {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXSideNavItems,
    d: [{
      kind: "method",
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'list');
        }

        _get(_getPrototypeOf(BXSideNavItems.prototype), "connectedCallback", this).call(this);
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return html(_t$5 || (_t$5 = _$6`<slot></slot>`));
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$3;
      }

    }]
  };
}, LitElement);

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const svgResultCarbonIcon$3 = ({ children, ...attrs } = {}) =>
  svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread(
    attrs
  )}" aria-hidden="true" width="20" height="20" viewBox="0 0 32 32">${children}${children}${children}<path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path></svg>`;

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const svgResultCarbonIcon$2 = ({ children, ...attrs } = {}) =>
  svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread(
    attrs
  )}" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20">${children}${children}${children}<path d="M2 14.8H18V16H2zM2 11.2H18V12.399999999999999H2zM2 7.6H18V8.799999999999999H2zM2 4H18V5.2H2z"></path></svg>`;

let _$5 = t => t,
    _t$4;
const {
  prefix: prefix$4
} = settings_1;
/**
 * The trigger button for side nav in header nav.
 * @element bx-header-menu-button
 * @csspart button The button.
 * @csspart toggle-icon The toggle icon.
 * @fires bx-header-menu-button-toggled - The custom event fired after this header menu button is toggled upon a user gesture.
 */

_decorate([customElement(`${prefix$4}-header-menu-button`)], function (_initialize, _FocusMixin) {
  class BXHeaderMenuButton extends _FocusMixin {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXHeaderMenuButton,
    d: [{
      kind: "method",
      key: "_handleClick",
      value: function _handleClick() {
        const active = !this.active;
        this.active = active;
        this.dispatchEvent(new CustomEvent(this.constructor.eventToggle, {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            active
          }
        }));
      }
      /**
       * `true` if the button should represent its active state.
       */

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "active",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'button-label-active'
      })],
      key: "buttonLabelActive",

      value() {
        return 'Close navigation menu';
      }

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'button-label-inactive'
      })],
      key: "buttonLabelInactive",

      value() {
        return 'Open navigation menu';
      }

    }, {
      kind: "field",
      decorators: [property({
        reflect: true,
        attribute: 'collapse-mode'
      })],
      key: "collapseMode",

      value() {
        return SIDE_NAV_COLLAPSE_MODE.RESPONSIVE;
      }

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "disabled",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property({
        reflect: true,
        attribute: 'usage-mode'
      })],
      key: "usageMode",

      value() {
        return SIDE_NAV_USAGE_MODE.REGULAR;
      }

    }, {
      kind: "method",
      key: "createRenderRoot",
      value:
      /**
       * The `aria-label` attribute for the button in its active state.
       */

      /**
       * The `aria-label` attribute for the button in its inactive state.
       */

      /**
       * Collapse mode of the side nav.
       */

      /**
       * `true` if the button should be disabled.
       */

      /**
       * Usage mode of the side nav.
       */
      function createRenderRoot() {
        var _$exec;

        return this.attachShadow({
          mode: 'open',
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ['', 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          active,
          buttonLabelActive,
          buttonLabelInactive,
          disabled,
          _handleClick: handleClick
        } = this;
        const buttonLabel = active ? buttonLabelActive : buttonLabelInactive;
        const classes = classMap({
          [`${prefix$4}--header__action`]: true,
          [`${prefix$4}--header__menu-trigger`]: true,
          [`${prefix$4}--header__menu-toggle`]: true,
          [`${prefix$4}--header__action--active`]: active
        });
        return html(_t$4 || (_t$4 = _$5` <button part="button" class="${0}" ?disabled="${0}" aria-label="${0}" @click="${0}"> ${0} </button> `), classes, disabled, ifNonNull(buttonLabel), handleClick, (active ? svgResultCarbonIcon$3 : svgResultCarbonIcon$2)({
          slot: 'toggle-icon'
        }));
      }
      /**
       * The name of the custom event fired after this header menu button is toggled upon a user gesture.
       */

    }, {
      kind: "get",
      static: true,
      key: "eventToggle",
      value: function eventToggle() {
        return `${prefix$4}-header-menu-button-toggled`;
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$2;
      }

    }]
  };
}, FocusMixin(LitElement));

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const svgResultCarbonIcon$1 = ({ children, ...attrs } = {}) =>
  svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread(
    attrs
  )}" aria-hidden="true" width="20" height="20" viewBox="0 0 32 32">${children}${children}${children}<path d="M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"></path></svg>`;

let _$4 = t => t,
    _t$3;
const {
  prefix: prefix$3
} = settings_1;
/**
 * Side nav menu.
 * @element bx-side-nav-menu
 * @slot title-icon - The icon.
 * @csspart expando The expando.
 * @csspart expando-icon-container The expando icon container.
 * @csspart expando-icon The expando icon.
 * @csspart title The title.
 * @csspart title-icon-container The title icon container.
 * @csspart menu-body The menu body.
 */

_decorate([customElement(`${prefix$3}-side-nav-menu`)], function (_initialize, _FocusMixin) {
  class BXSideNavMenu extends _FocusMixin {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXSideNavMenu,
    d: [{
      kind: "field",
      key: "_hasIcon",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [query('#title-icon-container')],
      key: "_titleIconContainerNode",
      value: void 0
    }, {
      kind: "method",
      key: "_handleUserInitiatedToggle",
      value:
      /**
       * `true` if this menu has an icon.
       */

      /**
       * The container for the title icon.
       */

      /**
       * Handles user-initiated toggle request of this side nav menu.
       * @param expanded The new expanded state.
       */
      function _handleUserInitiatedToggle(expanded = !this.expanded) {
        const {
          eventBeforeToggle,
          eventToggle
        } = this.constructor;
        const init = {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            expanded
          }
        };

        if (this.dispatchEvent(new CustomEvent(eventBeforeToggle, init))) {
          this.expanded = expanded;
          this.dispatchEvent(new CustomEvent(eventToggle, init));
        }
      }
      /**
       * Handler for the `click` event on the expando button.
       */

    }, {
      kind: "method",
      key: "_handleClickExpando",
      value: function _handleClickExpando() {
        this._handleUserInitiatedToggle();
      }
      /**
       * Handles `slotchange` event on the non-named `<slot>`.
       */

    }, {
      kind: "method",
      key: "_handleSlotChange",
      value: function _handleSlotChange({
        target
      }) {
        const {
          _hasIcon: hasIcon
        } = this;
        forEach(target.assignedNodes(), item => {
          if (item.nodeType === Node.ELEMENT_NODE) {
            item.toggleAttribute(this.constructor.attribItemHasIcon, hasIcon);
          }
        });
      }
      /**
       * Handles `slotchange` event on the `<slot>` for the title icon.
       */

    }, {
      kind: "method",
      key: "_handleSlotChangeTitleIcon",
      value: function _handleSlotChangeTitleIcon({
        target
      }) {
        var _this$_titleIconConta;

        const constructor = this.constructor;
        const hasIcon = target.assignedNodes().length > 0;
        this._hasIcon = hasIcon;
        (_this$_titleIconConta = this._titleIconContainerNode) === null || _this$_titleIconConta === void 0 ? void 0 : _this$_titleIconConta.toggleAttribute('hidden', !hasIcon);
        forEach(this.querySelectorAll(constructor.selectorItem), item => {
          item.toggleAttribute(constructor.attribItemHasIcon, hasIcon);
        });
      }
      /**
       * `true` if the menu has active menu item.
       */

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "active",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "expanded",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true,
        attribute: 'force-collapsed'
      })],
      key: "forceCollapsed",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property()],
      key: "title",

      value() {
        return '';
      }

    }, {
      kind: "method",
      key: "createRenderRoot",
      value:
      /**
       * `true` if the menu should be open.
       */

      /**
       * `true` if the menu should be forced collapsed upon side nav's expanded state.
       */

      /**
       * The title text.
       */
      function createRenderRoot() {
        var _$exec;

        return this.attachShadow({
          mode: 'open',
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ['', 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.hasAttribute('role')) {
          this.setAttribute('role', 'listitem');
        }

        _get(_getPrototypeOf(BXSideNavMenu.prototype), "connectedCallback", this).call(this);
      }
    }, {
      kind: "method",
      key: "updated",
      value: function updated(changedProperties) {
        if (changedProperties.has('expanded')) {
          const {
            selectorItem
          } = this.constructor;
          const {
            expanded
          } = this;
          forEach(this.querySelectorAll(selectorItem), elem => {
            elem.tabIndex = expanded ? 0 : -1;
          });
        }
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          expanded,
          forceCollapsed,
          title,
          _handleClickExpando: handleClickExpando,
          _handleSlotChange: handleSlotChange,
          _handleSlotChangeTitleIcon: handleSlotChangeTitleIcon
        } = this;
        return html(_t$3 || (_t$3 = _$4` <button type="button" part="expando" aria-haspopup="true" aria-expanded="${0}" class="${0}--side-nav__submenu" @click="${0}"> <div id="title-icon-container" part="title-icon-container" hidden class="${0}--side-nav__icon"> <slot name="title-icon" @slotchange="${0}"></slot> </div> <span part="title" class="${0}--side-nav__submenu-title">${0}</span> <div part="expando-icon-container" class="${0}--side-nav__icon ${0}--side-nav__icon--small ${0}--side-nav__submenu-chevron"> ${0} </div> </button> <ul part="menu-body" class="${0}--side-nav__menu"> <slot @slotchange="${0}"></slot> </ul> `), String(Boolean(expanded && !forceCollapsed)), prefix$3, handleClickExpando, prefix$3, handleSlotChangeTitleIcon, prefix$3, title, prefix$3, prefix$3, prefix$3, svgResultCarbonIcon$1({
          part: 'expando-icon'
        }), prefix$3, handleSlotChange);
      }
      /**
       * The attribute name of the menu items, that is set if this menu has an icon.
       */

    }, {
      kind: "field",
      static: true,
      key: "attribItemHasIcon",

      value() {
        return 'parent-has-icon';
      }

    }, {
      kind: "get",
      static: true,
      key: "selectorItem",
      value:
      /**
       * A selector that will return the menu items.
       */
      function selectorItem() {
        return `${prefix$3}-side-nav-menu-item`;
      }
      /**
       * The name of the custom event fired before this side nav menu is being toggled upon a user gesture.
       * Cancellation of this event stops the user-initiated action of toggling this side nav menu.
       */

    }, {
      kind: "get",
      static: true,
      key: "eventBeforeToggle",
      value: function eventBeforeToggle() {
        return `${prefix$3}-side-nav-menu-beingtoggled`;
      }
      /**
       * The name of the custom event fired after this side nav menu is toggled upon a user gesture.
       */

    }, {
      kind: "get",
      static: true,
      key: "eventToggle",
      value: function eventToggle() {
        return `${prefix$3}-side-nav-menu-toggled`;
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$3;
      }

    }]
  };
}, FocusMixin(LitElement));

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const svgResultCarbonIcon = ({ children, ...attrs } = {}) =>
  svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread(
    attrs
  )}" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32">${children}${children}${children}<path d="M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z"></path><path d="M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z"></path></svg>`;

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$1 = css([
  'a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:\'IBM Plex Sans\',\'Helvetica Neue\',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:\'IBM Plex Mono\',Menlo,\'DejaVu Sans Mono\',\'Bitstream Vera Sans Mono\',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--assistive-text,.bx--visually-hidden{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap}.bx--body{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);background-color:var(--cds-ui-background,#fff);color:var(--cds-text-01,#161616);line-height:1}.bx--body *,.bx--body ::after,.bx--body ::before{box-sizing:inherit}.bx--text-truncate--end{display:inline-block;overflow:hidden;width:100%;text-overflow:ellipsis;white-space:nowrap}.bx--text-truncate--front{display:inline-block;overflow:hidden;width:100%;direction:rtl;text-overflow:ellipsis;white-space:nowrap}@-webkit-keyframes hide-feedback{0%{opacity:1;visibility:inherit}100%{opacity:0;visibility:hidden}}@keyframes hide-feedback{0%{opacity:1;visibility:inherit}100%{opacity:0;visibility:hidden}}@-webkit-keyframes show-feedback{0%{opacity:0;visibility:hidden}100%{opacity:1;visibility:inherit}}@keyframes show-feedback{0%{opacity:0;visibility:hidden}100%{opacity:1;visibility:inherit}}.bx--snippet{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline}.bx--snippet *,.bx--snippet ::after,.bx--snippet ::before{box-sizing:inherit}.bx--snippet--disabled,.bx--snippet--disabled .bx--btn.bx--snippet-btn--expand{background-color:var(--cds-disabled-01,#f4f4f4);color:var(--cds-disabled-02,#c6c6c6)}.bx--snippet--disabled .bx--copy-btn:hover,.bx--snippet--disabled .bx--snippet-btn--expand:hover{background-color:var(--cds-disabled-01,#f4f4f4);color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed}.bx--snippet--disabled .bx--snippet-btn--expand .bx--icon-chevron--down,.bx--snippet--disabled .bx--snippet__icon{fill:var(--cds-disabled-02,#c6c6c6)}.bx--snippet code{font-family:var(--cds-code-01-font-family, \'IBM Plex Mono\', \'Menlo\', \'DejaVu Sans Mono\', \'Bitstream Vera Sans Mono\', Courier, monospace);font-size:var(--cds-code-01-font-size,.75rem);font-weight:var(--cds-code-01-font-weight,400);line-height:var(--cds-code-01-line-height,1.33333);letter-spacing:var(--cds-code-01-letter-spacing,.32px)}.bx--snippet--inline{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;position:relative;display:inline;padding:0;border:2px solid transparent;background-color:var(--cds-field-01,#f4f4f4);border-radius:4px;color:var(--cds-text-01,#161616);cursor:pointer}.bx--snippet--inline *,.bx--snippet--inline ::after,.bx--snippet--inline ::before{box-sizing:inherit}.bx--snippet--inline:hover{background-color:var(--cds-ui-03,#e0e0e0)}.bx--snippet--inline:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--snippet--inline:focus{border:2px solid var(--cds-focus,#0f62fe);outline:0}.bx--snippet--inline::before{position:absolute;z-index:6000;width:0;height:0;border-style:solid;content:"";display:none}.bx--snippet--inline .bx--copy-btn__feedback{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:none;overflow:visible;box-sizing:content-box;margin:auto;clip:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--snippet--inline .bx--copy-btn__feedback{width:auto}}@supports (-ms-accelerator:true){.bx--snippet--inline .bx--copy-btn__feedback{width:auto}}@supports (-ms-ime-align:auto){.bx--snippet--inline .bx--copy-btn__feedback{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--snippet--inline .bx--copy-btn__feedback{border:1px solid transparent}}.bx--snippet--inline .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--snippet--inline .bx--assistive-text,.bx--snippet--inline+.bx--assistive-text,.bx--snippet--inline::after,.bx--snippet--inline::before{bottom:0;left:50%}.bx--snippet--inline::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--snippet--inline .bx--assistive-text,.bx--snippet--inline+.bx--assistive-text,.bx--snippet--inline::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--snippet--inline.bx--copy-btn--animating .bx--copy-btn__feedback,.bx--snippet--inline.bx--copy-btn--animating::before{display:block}.bx--snippet--inline.bx--copy-btn--animating.bx--copy-btn--fade-out .bx--copy-btn__feedback,.bx--snippet--inline.bx--copy-btn--animating.bx--copy-btn--fade-out::before{-webkit-animation:110ms cubic-bezier(.2,0,.38,.9) hide-feedback;animation:110ms cubic-bezier(.2,0,.38,.9) hide-feedback}.bx--snippet--inline.bx--copy-btn--animating.bx--copy-btn--fade-in .bx--copy-btn__feedback,.bx--snippet--inline.bx--copy-btn--animating.bx--copy-btn--fade-in::before{-webkit-animation:110ms cubic-bezier(.2,0,.38,.9) show-feedback;animation:110ms cubic-bezier(.2,0,.38,.9) show-feedback}.bx--snippet--inline code{padding:0 var(--cds-spacing-03,.5rem)}.bx--snippet--inline.bx--snippet--no-copy{display:inline-block}.bx--snippet--inline.bx--snippet--no-copy:hover{background-color:var(--cds-field-01,#f4f4f4);cursor:auto}.bx--snippet--light.bx--snippet--inline.bx--snippet--no-copy:hover{background-color:var(--cds-field-02,#fff);cursor:auto}.bx--snippet--single{font-family:var(--cds-code-01-font-family, \'IBM Plex Mono\', \'Menlo\', \'DejaVu Sans Mono\', \'Bitstream Vera Sans Mono\', Courier, monospace);font-size:var(--cds-code-01-font-size,.75rem);font-weight:var(--cds-code-01-font-weight,400);line-height:var(--cds-code-01-line-height,1.33333);letter-spacing:var(--cds-code-01-letter-spacing,.32px);position:relative;width:100%;max-width:48rem;background-color:var(--cds-field-01,#f4f4f4);display:flex;height:2.5rem;align-items:center;padding-right:2.5rem}.bx--snippet--single.bx--snippet--no-copy{padding:0}.bx--snippet--single.bx--snippet--no-copy::after{right:1rem}.bx--snippet--single .bx--snippet-container{position:relative;display:flex;height:100%;align-items:center;padding-left:1rem;overflow-x:auto}.bx--snippet--single .bx--snippet-container:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--snippet--single .bx--snippet-container:focus{outline-style:dotted}}.bx--snippet--single pre{font-family:var(--cds-code-01-font-family, \'IBM Plex Mono\', \'Menlo\', \'DejaVu Sans Mono\', \'Bitstream Vera Sans Mono\', Courier, monospace);font-size:var(--cds-code-01-font-size,.75rem);font-weight:var(--cds-code-01-font-weight,400);line-height:var(--cds-code-01-line-height,1.33333);letter-spacing:var(--cds-code-01-letter-spacing,.32px);padding-right:var(--cds-spacing-03,.5rem)}.bx--snippet--inline code,.bx--snippet--single pre{white-space:pre}.bx--snippet--multi{font-family:var(--cds-code-01-font-family, \'IBM Plex Mono\', \'Menlo\', \'DejaVu Sans Mono\', \'Bitstream Vera Sans Mono\', Courier, monospace);font-size:var(--cds-code-01-font-size,.75rem);font-weight:var(--cds-code-01-font-weight,400);line-height:var(--cds-code-01-line-height,1.33333);letter-spacing:var(--cds-code-01-letter-spacing,.32px);position:relative;width:100%;max-width:48rem;background-color:var(--cds-field-01,#f4f4f4);display:flex;padding:1rem}.bx--snippet--multi .bx--snippet-container{position:relative;min-height:100%;max-height:100%;order:1;overflow-y:auto;transition:max-height 150ms cubic-bezier(.2,0,.38,.9)}.bx--snippet--multi.bx--snippet--expand .bx--snippet-container{padding-bottom:var(--cds-spacing-05,1rem);transition:max-height 150ms cubic-bezier(.2,0,.38,.9)}.bx--snippet--multi.bx--snippet--wraptext pre{white-space:pre-wrap;word-wrap:break-word}.bx--snippet--multi .bx--snippet-container pre{padding-right:2.5rem;padding-bottom:1.5rem;overflow-x:auto}.bx--snippet--multi.bx--snippet--no-copy .bx--snippet-container pre{padding-right:0}.bx--snippet--multi.bx--snippet--expand .bx--snippet-container pre{overflow-x:auto}.bx--snippet--multi .bx--snippet-container pre::after{position:absolute;top:0;right:0;width:1rem;height:100%;background-image:linear-gradient(to right,rgba(var(--cds-field-01,#f4f4f4),0),var(--cds-field-01,#f4f4f4));content:""}.bx--snippet--multi .bx--snippet-container pre code{overflow:hidden}.bx--snippet__icon{width:1rem;height:1rem;fill:var(--cds-icon-01,#161616);transition:all 70ms cubic-bezier(.2,0,.38,.9)}.bx--snippet-button{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;position:absolute;top:0;right:0;display:flex;overflow:visible;width:2.5rem;height:2.5rem;align-items:center;justify-content:center;padding:0;border:none;background-color:var(--cds-field-01,#f4f4f4);cursor:pointer;outline:0}.bx--snippet-button *,.bx--snippet-button ::after,.bx--snippet-button ::before{box-sizing:inherit}.bx--snippet-button:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px;outline-color:var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--snippet-button:focus{outline-style:dotted}}.bx--snippet--multi .bx--snippet-button{top:var(--cds-spacing-03,.5rem);right:var(--cds-spacing-03,.5rem);width:2rem;height:2rem}.bx--snippet-button:hover{background:var(--cds-hover-ui,#e5e5e5)}.bx--snippet-button:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--copy__feedback{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);font-family:\'IBM Plex Sans\',\'Helvetica Neue\',Arial,sans-serif;z-index:6000;top:.75rem;right:1.25rem;left:inherit;font-weight:400}.bx--btn--copy__feedback::after,.bx--btn--copy__feedback::before{background:var(--cds-inverse-02,#393939)}.bx--btn--copy__feedback::after{border:none}.bx--snippet .bx--copy-btn{position:absolute;top:0;right:0;font-family:\'IBM Plex Sans\',\'Helvetica Neue\',Arial,sans-serif}.bx--snippet-btn--expand{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);font-family:\'IBM Plex Sans\',\'Helvetica Neue\',Arial,sans-serif;position:absolute;z-index:10;right:0;bottom:0;display:inline-flex;align-items:center;padding:var(--cds-spacing-03,.5rem) var(--cds-spacing-05,1rem);border:0;background-color:var(--cds-field-01,#f4f4f4);color:var(--cds-text-01,#161616)}.bx--snippet-btn--expand .bx--snippet-btn--text{position:relative;top:-.0625rem}.bx--snippet-btn--expand--hide.bx--snippet-btn--expand{display:none}.bx--snippet-btn--expand .bx--icon-chevron--down{margin-left:var(--cds-spacing-03,.5rem);fill:var(--cds-icon-primary,#161616);-webkit-transform:rotate(0);transform:rotate(0);transition:150ms cubic-bezier(.2,0,.38,.9)}.bx--snippet-btn--expand:hover{background:var(--cds-hover-ui,#e5e5e5);color:var(--cds-text-01,#161616)}.bx--snippet-btn--expand:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--snippet-btn--expand:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px;border-color:transparent}@media screen and (prefers-contrast){.bx--snippet-btn--expand:focus{outline-style:dotted}}.bx--snippet--expand .bx--snippet-btn--expand .bx--icon-chevron--down{-webkit-transform:rotate(180deg);transform:rotate(180deg);transition:-webkit-transform 240ms;transition:transform 240ms;transition:transform 240ms,-webkit-transform 240ms}.bx--snippet--light,.bx--snippet--light .bx--btn.bx--snippet-btn--expand,.bx--snippet--light .bx--copy-btn,.bx--snippet--light .bx--snippet-button{background-color:var(--cds-field-02,#fff)}.bx--snippet--light .bx--btn.bx--snippet-btn--expand:hover,.bx--snippet--light .bx--copy-btn:hover,.bx--snippet--light .bx--snippet-button:hover,.bx--snippet--light.bx--snippet--inline:hover{background-color:var(--cds-hover-light-ui,#e5e5e5)}.bx--snippet--light .bx--btn.bx--snippet-btn--expand:active,.bx--snippet--light .bx--copy-btn:active,.bx--snippet--light .bx--snippet-button:active,.bx--snippet--light.bx--snippet--inline:active{background-color:var(--cds-active-light-ui,#c6c6c6)}.bx--snippet--light.bx--snippet--multi .bx--snippet-container pre::after,.bx--snippet--light.bx--snippet--single::after{background-image:linear-gradient(to right,rgba(var(--cds-field-02,#fff),0),var(--cds-field-02,#fff))}.bx--snippet.bx--skeleton .bx--snippet-container{width:100%;height:100%}.bx--snippet-button .bx--btn--copy__feedback{top:3.175rem;right:auto;left:50%}.bx--snippet-button .bx--btn--copy__feedback::before{top:0}.bx--snippet-button .bx--btn--copy__feedback::after{top:-.25rem}.bx--snippet--multi .bx--copy-btn{z-index:10;top:.5rem;right:.5rem;width:2rem;height:2rem}.bx--snippet--multi .bx--snippet-button .bx--btn--copy__feedback{top:2.675rem}.bx--snippet--inline .bx--btn--copy__feedback{top:calc(100% - .25rem);right:auto;left:50%}.bx--snippet__overflow-indicator--left,.bx--snippet__overflow-indicator--right{z-index:1;width:1rem;flex:1 0 auto}.bx--snippet__overflow-indicator--left{order:0;margin-right:-1rem;background-image:linear-gradient(to left,transparent,var(--cds-field-01,#f4f4f4))}.bx--snippet__overflow-indicator--right{order:2;margin-left:-1rem;background-image:linear-gradient(to right,transparent,var(--cds-field-01,#f4f4f4))}.bx--snippet--single .bx--snippet__overflow-indicator--left,.bx--snippet--single .bx--snippet__overflow-indicator--right{position:absolute;width:2rem;height:calc(100% - .25rem)}.bx--snippet--single .bx--snippet__overflow-indicator--right{right:2.5rem}.bx--snippet--single.bx--snippet--no-copy .bx--snippet__overflow-indicator--right{right:0}.bx--snippet--single .bx--snippet-container:focus~.bx--snippet__overflow-indicator--right{right:calc(2.5rem + .125rem)}.bx--snippet--single .bx--snippet-container:focus+.bx--snippet__overflow-indicator--left{left:.125rem}.bx--snippet--light .bx--snippet__overflow-indicator--left{background-image:linear-gradient(to left,transparent,var(--cds-field-02,#fff))}.bx--snippet--light .bx--snippet__overflow-indicator--right{background-image:linear-gradient(to right,transparent,var(--cds-field-02,#fff))}@media not all and (min-resolution:0.001dpcm){@supports (-webkit-appearance:none) and (stroke-color:transparent){.bx--snippet__overflow-indicator--left{background-image:linear-gradient(to left,rgba(var(--cds-field-01,#f4f4f4),0),var(--cds-field-01,#f4f4f4))}.bx--snippet__overflow-indicator--right{background-image:linear-gradient(to right,rgba(var(--cds-field-01,#f4f4f4),0),var(--cds-field-01,#f4f4f4))}}}.bx--snippet--multi.bx--skeleton{height:6.125rem}.bx--snippet--single.bx--skeleton{height:3.5rem}.bx--snippet.bx--skeleton span{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;display:block;width:100%;height:1rem;margin-top:.5rem}.bx--snippet.bx--skeleton span:active,.bx--snippet.bx--skeleton span:focus,.bx--snippet.bx--skeleton span:hover{border:none;cursor:default;outline:0}.bx--snippet.bx--skeleton span::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--snippet.bx--skeleton span::before{-webkit-animation:none;animation:none}}.bx--snippet.bx--skeleton span:first-child{margin:0}.bx--snippet.bx--skeleton span:nth-child(2){width:85%}.bx--snippet.bx--skeleton span:nth-child(3){width:95%}.bx--snippet--single.bx--skeleton .bx--snippet-container{padding-bottom:0}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--snippet__icon{fill:ButtonText}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--snippet--inline:focus{color:Highlight;outline:1px solid Highlight}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--snippet--multi,.bx--snippet--single{outline:1px solid transparent}}.bx--btn{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);position:relative;display:inline-flex;max-width:20rem;min-height:3rem;flex-shrink:0;align-items:center;justify-content:space-between;padding:calc(.875rem - 3px) 63px calc(.875rem - 3px) 15px;margin:0;border-radius:0;cursor:pointer;outline:0;text-align:left;text-decoration:none;transition:background 70ms cubic-bezier(0,0,.38,.9),box-shadow 70ms cubic-bezier(0,0,.38,.9),border-color 70ms cubic-bezier(0,0,.38,.9),outline 70ms cubic-bezier(0,0,.38,.9);vertical-align:top}.bx--btn *,.bx--btn ::after,.bx--btn ::before{box-sizing:inherit}.bx--btn.bx--btn--disabled,.bx--btn.bx--btn--disabled:focus,.bx--btn.bx--btn--disabled:hover,.bx--btn:disabled,.bx--btn:focus:disabled,.bx--btn:hover:disabled{border-color:var(--cds-disabled-02,#c6c6c6);background:var(--cds-disabled-02,#c6c6c6);box-shadow:none;color:var(--cds-disabled-03,#8d8d8d);cursor:not-allowed}.bx--btn .bx--btn__icon{position:absolute;right:1rem;width:1rem;height:1rem;flex-shrink:0}.bx--btn::-moz-focus-inner{padding:0;border:0}.bx--btn--primary{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-interactive-01,#0f62fe);color:var(--cds-text-04,#fff)}.bx--btn--primary:hover{background-color:var(--cds-hover-primary,#0353e9)}.bx--btn--primary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--primary:active{background-color:var(--cds-active-primary,#002d9c)}.bx--btn--primary .bx--btn__icon,.bx--btn--primary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--primary:hover{color:var(--cds-text-04,#fff)}.bx--btn--secondary{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-interactive-02,#393939);color:var(--cds-text-04,#fff)}.bx--btn--secondary:hover{background-color:var(--cds-hover-secondary,#4c4c4c)}.bx--btn--secondary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--secondary:active{background-color:var(--cds-active-secondary,#6f6f6f)}.bx--btn--secondary .bx--btn__icon,.bx--btn--secondary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--secondary:focus,.bx--btn--secondary:hover{color:var(--cds-text-04,#fff)}.bx--btn--tertiary{border-width:1px;border-style:solid;border-color:var(--cds-interactive-03,#0f62fe);background-color:transparent;color:var(--cds-interactive-03,#0f62fe)}.bx--btn--tertiary:hover{background-color:var(--cds-hover-tertiary,#0353e9)}.bx--btn--tertiary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--tertiary:active{background-color:var(--cds-active-tertiary,#002d9c)}.bx--btn--tertiary .bx--btn__icon,.bx--btn--tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--tertiary:hover{color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary:focus{background-color:var(--cds-interactive-03,#0f62fe);color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary:active{border-color:transparent;background-color:var(--cds-active-tertiary,#002d9c);color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary.bx--btn--disabled,.bx--btn--tertiary.bx--btn--disabled:focus,.bx--btn--tertiary.bx--btn--disabled:hover,.bx--btn--tertiary:disabled,.bx--btn--tertiary:focus:disabled,.bx--btn--tertiary:hover:disabled{background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--ghost{border-width:1px;border-style:solid;border-color:transparent;background-color:transparent;color:var(--cds-link-01,#0f62fe);padding:calc(.875rem - 3px) 16px}.bx--btn--ghost:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--btn--ghost:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--ghost:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--ghost .bx--btn__icon,.bx--btn--ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--ghost .bx--btn__icon{position:static;margin-left:.5rem}.bx--btn--ghost:active,.bx--btn--ghost:hover{color:var(--cds-hover-primary-text,#0043ce)}.bx--btn--ghost:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--ghost.bx--btn--disabled,.bx--btn--ghost.bx--btn--disabled:focus,.bx--btn--ghost.bx--btn--disabled:hover,.bx--btn--ghost:disabled,.bx--btn--ghost:focus:disabled,.bx--btn--ghost:hover:disabled{border-color:transparent;background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--ghost.bx--btn--sm{padding:calc(.375rem - 3px) 16px}.bx--btn--ghost.bx--btn--field,.bx--btn--ghost.bx--btn--md{padding:calc(.675rem - 3px) 16px}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline-style:dotted}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline:1px solid transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline-style:dotted}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{display:inline-block}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::before{transition:none}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{width:0;height:0;border-style:solid;content:""}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@supports (-ms-accelerator:true){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@supports (-ms-ime-align:auto){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{border:1px solid transparent}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{content:attr(aria-label)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::after{content:none}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover::before{opacity:1}@-webkit-keyframes tooltip-fade{from{opacity:0}to{opacity:1}}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus.bx--tooltip--a11y::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger svg,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover svg{fill:currentColor}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled.bx--tooltip--a11y::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled.bx--tooltip--a11y::before{overflow:hidden;margin:-1px;clip:rect(0,0,0,0);opacity:0}.bx--btn.bx--btn--icon-only:not(.bx--tooltip--hidden) .bx--assistive-text{pointer-events:all}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{border-color:var(--cds-focus,#0f62fe)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:active:not([disabled]){border-color:transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline-color:transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:active,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:focus,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:hover{cursor:not-allowed;fill:var(--cds-disabled-03,#8d8d8d)}.bx--tooltip__trigger.bx--btn--icon-only--top{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--top:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--top::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--top::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--top:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--top:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--top:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--top:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--top:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--top:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{top:-.8125rem;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::after{top:-.8125rem;left:0;-webkit-transform:translate(0,-100%);transform:translate(0,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::after{top:-.8125rem;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::after{top:-.8125rem;right:0;left:auto;-webkit-transform:translate(0,-100%);transform:translate(0,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--right{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--right:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--right::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--right::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--right:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--right:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--right:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--right:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--right:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--right:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::after{bottom:-.8125rem;left:0;-webkit-transform:translate(0,100%);transform:translate(0,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::after{bottom:-.8125rem;right:0;left:auto;-webkit-transform:translate(0,100%);transform:translate(0,100%)}.bx--tooltip__trigger.bx--btn--icon-only--left{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--left:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--left::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--left::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--left:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--left:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--left:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--left:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--left:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--left:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--btn--icon-only{padding-right:.9375rem;padding-left:.9375rem}.bx--btn--icon-only .bx--btn__icon{position:static}.bx--btn--icon-only.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--icon-only.bx--btn--ghost .bx--btn__icon{margin:0}.bx--btn--icon-only.bx--btn--selected{background:var(--cds-selected-ui,#e0e0e0)}.bx--btn path[data-icon-path=inner-path]{fill:none}.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:var(--cds-icon-01,#161616)}.bx--btn--ghost.bx--btn--icon-only[disabled] .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only[disabled] .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn.bx--btn--icon-only.bx--btn--ghost[disabled]:hover .bx--btn__icon{fill:var(--cds-disabled-03,#8d8d8d)}.bx--btn--ghost.bx--btn--icon-only[disabled]{cursor:not-allowed}.bx--btn--field.bx--btn--icon-only,.bx--btn--md.bx--btn--icon-only{padding-right:.6875rem;padding-left:.6875rem}.bx--btn--sm.bx--btn--icon-only{padding-right:.4375rem;padding-left:.4375rem}.bx--btn--danger{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-danger-01,#da1e28);color:var(--cds-text-04,#fff)}.bx--btn--danger:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger .bx--btn__icon,.bx--btn--danger .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger:hover{color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary,.bx--btn--danger-tertiary{border-width:1px;border-style:solid;border-color:var(--cds-danger-02,#da1e28);background-color:transparent;color:var(--cds-danger-02,#da1e28)}.bx--btn--danger--tertiary:hover,.bx--btn--danger-tertiary:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger--tertiary:focus,.bx--btn--danger-tertiary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger--tertiary:active,.bx--btn--danger-tertiary:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger--tertiary .bx--btn__icon,.bx--btn--danger--tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn--danger-tertiary .bx--btn__icon,.bx--btn--danger-tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger--tertiary:hover,.bx--btn--danger-tertiary:hover{border-color:var(--cds-hover-danger,#b81921);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary:focus,.bx--btn--danger-tertiary:focus{background-color:var(--cds-danger-01,#da1e28);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary:active,.bx--btn--danger-tertiary:active{border-color:var(--cds-active-danger,#750e13);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary.bx--btn--disabled,.bx--btn--danger--tertiary.bx--btn--disabled:focus,.bx--btn--danger--tertiary.bx--btn--disabled:hover,.bx--btn--danger--tertiary:disabled,.bx--btn--danger--tertiary:focus:disabled,.bx--btn--danger--tertiary:hover:disabled,.bx--btn--danger-tertiary.bx--btn--disabled,.bx--btn--danger-tertiary.bx--btn--disabled:focus,.bx--btn--danger-tertiary.bx--btn--disabled:hover,.bx--btn--danger-tertiary:disabled,.bx--btn--danger-tertiary:focus:disabled,.bx--btn--danger-tertiary:hover:disabled{background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--danger--ghost,.bx--btn--danger-ghost{border-width:1px;border-style:solid;border-color:transparent;background-color:transparent;color:var(--cds-danger-02,#da1e28);padding:calc(.875rem - 3px) 16px}.bx--btn--danger--ghost:hover,.bx--btn--danger-ghost:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger--ghost:focus,.bx--btn--danger-ghost:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger--ghost:active,.bx--btn--danger-ghost:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--danger--ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn--danger-ghost .bx--btn__icon,.bx--btn--danger-ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--danger-ghost .bx--btn__icon{position:static;margin-left:.5rem}.bx--btn--danger--ghost:active,.bx--btn--danger--ghost:hover,.bx--btn--danger-ghost:active,.bx--btn--danger-ghost:hover{color:var(--cds-text-04,#fff)}.bx--btn--danger--ghost.bx--btn--disabled,.bx--btn--danger--ghost.bx--btn--disabled:focus,.bx--btn--danger--ghost.bx--btn--disabled:hover,.bx--btn--danger--ghost:disabled,.bx--btn--danger--ghost:focus:disabled,.bx--btn--danger--ghost:hover:disabled,.bx--btn--danger-ghost.bx--btn--disabled,.bx--btn--danger-ghost.bx--btn--disabled:focus,.bx--btn--danger-ghost.bx--btn--disabled:hover,.bx--btn--danger-ghost:disabled,.bx--btn--danger-ghost:focus:disabled,.bx--btn--danger-ghost:hover:disabled{border-color:transparent;background:0 0;color:var(--cds-disabled-02,#c6c6c6);outline:0}.bx--btn--danger--ghost.bx--btn--sm,.bx--btn--danger-ghost.bx--btn--sm{padding:calc(.375rem - 3px) 16px}.bx--btn--danger--ghost.bx--btn--field,.bx--btn--danger--ghost.bx--btn--md,.bx--btn--danger-ghost.bx--btn--field,.bx--btn--danger-ghost.bx--btn--md{padding:calc(.675rem - 3px) 16px}.bx--btn--sm{min-height:2rem;padding:calc(.375rem - 3px) 60px calc(.375rem - 3px) 12px}.bx--btn--xl:not(.bx--btn--icon-only){align-items:baseline;padding-top:var(--cds-spacing-05,1rem);padding-right:var(--cds-spacing-10,4rem);padding-left:var(--cds-spacing-05,1rem);min-height:5rem}.bx--btn--lg:not(.bx--btn--icon-only){align-items:baseline;padding-top:var(--cds-spacing-05,1rem);padding-right:var(--cds-spacing-10,4rem);padding-left:var(--cds-spacing-05,1rem);min-height:4rem}.bx--btn--field,.bx--btn--md{min-height:2.5rem;padding:calc(.675rem - 3px) 60px calc(.675rem - 3px) 12px}.bx--btn--expressive{font-size:var(--cds-body-short-02-font-size,1rem);font-weight:var(--cds-body-short-02-font-weight,400);line-height:var(--cds-body-short-02-line-height,1.375);letter-spacing:var(--cds-body-short-02-letter-spacing,0);min-height:3rem}.bx--btn--icon-only.bx--btn--expressive{padding:12px 13px}.bx--btn.bx--btn--expressive .bx--btn__icon{width:1.25rem;height:1.25rem}.bx--btn-set .bx--btn.bx--btn--expressive{max-width:20rem}.bx--btn.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:9.375rem}.bx--btn.bx--skeleton:active,.bx--btn.bx--skeleton:focus,.bx--btn.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--btn.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--btn.bx--skeleton::before{-webkit-animation:none;animation:none}}.bx--btn-set{display:flex}.bx--btn-set--stacked{flex-direction:column}.bx--btn-set .bx--btn{width:100%;max-width:12.25rem}.bx--btn-set .bx--btn:not(:focus){box-shadow:-.0625rem 0 0 0 var(--cds-button-separator,#e0e0e0)}.bx--btn-set .bx--btn:first-of-type:not(:focus){box-shadow:inherit}.bx--btn-set .bx--btn:focus+.bx--btn{box-shadow:inherit}.bx--btn-set--stacked .bx--btn:not(:focus){box-shadow:0 -.0625rem 0 0 var(--cds-button-separator,#e0e0e0)}.bx--btn-set--stacked .bx--btn:first-of-type:not(:focus){box-shadow:inherit}.bx--btn-set .bx--btn.bx--btn--disabled{box-shadow:-.0625rem 0 0 0 var(--cds-disabled-03,#8d8d8d)}.bx--btn-set .bx--btn.bx--btn--disabled:first-of-type{box-shadow:none}.bx--btn-set--stacked .bx--btn.bx--btn--disabled{box-shadow:0 -.0625rem 0 0 var(--cds-disabled-03,#8d8d8d)}.bx--btn-set--stacked .bx--btn.bx--btn--disabled:first-of-type{box-shadow:none}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn:focus{color:Highlight;outline:1px solid Highlight}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:ButtonText}}@keyframes hide-feedback{0%{opacity:1;visibility:inherit}100%{opacity:0;visibility:hidden}}@keyframes show-feedback{0%{opacity:0;visibility:hidden}100%{opacity:1;visibility:inherit}}.bx--btn--copy{position:relative;overflow:visible}.bx--btn--copy .bx--btn__icon{margin-left:.3125rem}.bx--btn--copy__feedback{position:absolute;top:1.2rem;left:50%;display:none}.bx--btn--copy__feedback::before{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);z-index:2;top:1.1rem;padding:var(--cds-spacing-02,.25rem);border-radius:4px;color:var(--cds-text-inverse,#fff);content:attr(data-feedback);font-weight:400;pointer-events:none;-webkit-transform:translateX(-50%);transform:translateX(-50%);white-space:nowrap}.bx--btn--copy__feedback::after{z-index:1;top:.85rem;left:-.3rem;width:.6rem;height:.6rem;border-right:1px solid var(--cds-background-inverse,#393939);border-bottom:1px solid var(--cds-background-inverse,#393939);content:"";-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.bx--btn--copy__feedback::after,.bx--btn--copy__feedback::before{position:absolute;display:block;background:var(--cds-background-inverse,#393939)}.bx--btn--copy__feedback--displayed{display:inline-flex}.bx--copy-btn{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;position:relative;display:flex;width:2.5rem;height:2.5rem;align-items:center;justify-content:center;padding:0;border:none;background-color:var(--cds-layer,#f4f4f4);cursor:pointer}.bx--copy-btn *,.bx--copy-btn ::after,.bx--copy-btn ::before{box-sizing:inherit}.bx--copy-btn:hover{background-color:var(--cds-layer-hover,#e5e5e5)}.bx--copy-btn:active{background-color:var(--cds-layer-active,#c6c6c6)}.bx--copy-btn::before{position:absolute;z-index:6000;width:0;height:0;border-style:solid;content:"";display:none}.bx--copy-btn .bx--copy-btn__feedback{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:none;overflow:visible;box-sizing:content-box;margin:auto;clip:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--copy-btn .bx--copy-btn__feedback{width:auto}}@supports (-ms-accelerator:true){.bx--copy-btn .bx--copy-btn__feedback{width:auto}}@supports (-ms-ime-align:auto){.bx--copy-btn .bx--copy-btn__feedback{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--copy-btn .bx--copy-btn__feedback{border:1px solid transparent}}.bx--copy-btn .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--copy-btn .bx--assistive-text,.bx--copy-btn+.bx--assistive-text,.bx--copy-btn::after,.bx--copy-btn::before{bottom:0;left:50%}.bx--copy-btn::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--copy-btn .bx--assistive-text,.bx--copy-btn+.bx--assistive-text,.bx--copy-btn::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--copy-btn:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px;outline-color:var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--copy-btn:focus{outline-style:dotted}}.bx--copy-btn.bx--copy-btn--animating .bx--copy-btn__feedback,.bx--copy-btn.bx--copy-btn--animating::before{display:block}.bx--copy-btn.bx--copy-btn--animating.bx--copy-btn--fade-out .bx--copy-btn__feedback,.bx--copy-btn.bx--copy-btn--animating.bx--copy-btn--fade-out::before{-webkit-animation:110ms cubic-bezier(.2,0,.38,.9) hide-feedback;animation:110ms cubic-bezier(.2,0,.38,.9) hide-feedback}.bx--copy-btn.bx--copy-btn--animating.bx--copy-btn--fade-in .bx--copy-btn__feedback,.bx--copy-btn.bx--copy-btn--animating.bx--copy-btn--fade-in::before{-webkit-animation:110ms cubic-bezier(.2,0,.38,.9) show-feedback;animation:110ms cubic-bezier(.2,0,.38,.9) show-feedback}.bx--copy{font-size:0}:host(bx-copy-button){display:inline-flex;outline:0}:host(bx-copy-button) .bx--snippet-button .bx--btn--copy__feedback{left:50%;right:auto}',
]);

let _$3 = t => t,
    _t$2,
    _t2$2;
const {
  prefix: prefix$2
} = settings_1;
/**
 * Note: For `<bx-code-snippet>` only. The API is subject to change/removal.
 * @param update The callback function that dictates how to update the DOM with new feedback tooltip state.
 * @returns A function that shows the feedback tooltip for the given duration.
 * @private
 */

const _createHandleFeedbackTooltip = update => {
  let timeoutId;
  return timeout => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }

    update({
      showFeedback: true
    });
    timeoutId = setTimeout(() => {
      update({
        showFeedback: false
      });
    }, timeout);
  };
};
/**
 * Note: For `<bx-code-snippet>` only. The API is subject to change/removal.
 * @param properties The properties to render.
 * @returns The template result for copy button from the given properties.
 * @private
 */

const _renderButton = ({
  assistiveText,
  feedbackText,
  showFeedback: _showFeedback = false,
  className: _className = `${prefix$2}--snippet-button`,
  children: _children = html(_t$2 || (_t$2 = _$3` <slot>${0}</slot> `), svgResultCarbonIcon({
    class: `${prefix$2}--snippet__icon`
  })),
  handleClickButton
}) => {
  const feedbackClasses = classMap({
    [`${prefix$2}--btn--copy__feedback`]: true,
    [`${prefix$2}--btn--copy__feedback--displayed`]: _showFeedback
  });
  return html(_t2$2 || (_t2$2 = _$3` <button type="button" class="${0}" title="${0}" @click="${0}"> ${0} <div class="${0}" data-feedback="${0}"></div> </button> `), _className, ifDefined(assistiveText), handleClickButton, _children, feedbackClasses, ifDefined(feedbackText));
};
/**
 * Copy button.
 * @element bx-copy-button
 */

_decorate([customElement(`${prefix$2}-copy-button`)], function (_initialize, _FocusMixin) {
  class BXCopyButton extends _FocusMixin {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXCopyButton,
    d: [{
      kind: "field",
      key: "_handleFeedbackTooltip",

      value() {
        return _createHandleFeedbackTooltip(({
          showFeedback: _showFeedback2 = false
        }) => {
          this._showFeedback = _showFeedback2;
          this.requestUpdate();
        });
      }

    }, {
      kind: "field",
      key: "_showFeedback",

      value() {
        return false;
      }

    }, {
      kind: "method",
      key: "_handleClickButton",
      value:
      /**
       * Handles showing/hiding the feedback tooltip.
       */

      /**
       * `true` to show the feedback tooltip.
       */

      /**
       * Handles `click` event on the copy button.
       */
      function _handleClickButton() {
        this._handleFeedbackTooltip(this.feedbackTimeout);
      }
      /**
       * An assistive text for screen reader to announce, telling that the button copies the content to the clipboard.
       */

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'button-assistive-text'
      })],
      key: "buttonAssistiveText",

      value() {
        return 'Copy to clipboard';
      }

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'feedback-text'
      })],
      key: "feedbackText",

      value() {
        return 'Copied!';
      }

    }, {
      kind: "field",
      decorators: [property({
        type: Number,
        attribute: 'feedback-timeout'
      })],
      key: "feedbackTimeout",

      value() {
        return 2000;
      }

    }, {
      kind: "method",
      key: "createRenderRoot",
      value:
      /**
       * The feedback text.
       */

      /**
       * The number in milliseconds to determine how long the tooltip should remain.
       */
      function createRenderRoot() {
        var _$exec;

        return this.attachShadow({
          mode: 'open',
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ['', 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          buttonAssistiveText,
          feedbackText,
          _handleClickButton: handleClickButton,
          _showFeedback: showFeedback
        } = this;
        return _renderButton({
          assistiveText: buttonAssistiveText,
          feedbackText,
          showFeedback,
          handleClickButton
        });
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles$1;
      }

    }]
  };
}, FocusMixin(LitElement));

/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable import/prefer-default-export */

/**
 * Color scheme for form elements.
 */
let FORM_ELEMENT_COLOR_SCHEME;

(function (FORM_ELEMENT_COLOR_SCHEME) {
  FORM_ELEMENT_COLOR_SCHEME["REGULAR"] = "";
  FORM_ELEMENT_COLOR_SCHEME["LIGHT"] = "light";
})(FORM_ELEMENT_COLOR_SCHEME || (FORM_ELEMENT_COLOR_SCHEME = {}));

/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Code snippet types.
 */

let CODE_SNIPPET_TYPE;

(function (CODE_SNIPPET_TYPE) {
  CODE_SNIPPET_TYPE["SINGLE"] = "single";
  CODE_SNIPPET_TYPE["INLINE"] = "inline";
  CODE_SNIPPET_TYPE["MULTI"] = "multi";
})(CODE_SNIPPET_TYPE || (CODE_SNIPPET_TYPE = {}));

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles = css([
  'a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:\'IBM Plex Sans\',\'Helvetica Neue\',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:\'IBM Plex Mono\',Menlo,\'DejaVu Sans Mono\',\'Bitstream Vera Sans Mono\',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--assistive-text,.bx--visually-hidden{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap}.bx--body{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);background-color:var(--cds-ui-background,#fff);color:var(--cds-text-01,#161616);line-height:1}.bx--body *,.bx--body ::after,.bx--body ::before{box-sizing:inherit}.bx--text-truncate--end{display:inline-block;overflow:hidden;width:100%;text-overflow:ellipsis;white-space:nowrap}.bx--text-truncate--front{display:inline-block;overflow:hidden;width:100%;direction:rtl;text-overflow:ellipsis;white-space:nowrap}@-webkit-keyframes hide-feedback{0%{opacity:1;visibility:inherit}100%{opacity:0;visibility:hidden}}@keyframes hide-feedback{0%{opacity:1;visibility:inherit}100%{opacity:0;visibility:hidden}}@-webkit-keyframes show-feedback{0%{opacity:0;visibility:hidden}100%{opacity:1;visibility:inherit}}@keyframes show-feedback{0%{opacity:0;visibility:hidden}100%{opacity:1;visibility:inherit}}.bx--snippet{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline}.bx--snippet *,.bx--snippet ::after,.bx--snippet ::before{box-sizing:inherit}.bx--snippet--disabled,.bx--snippet--disabled .bx--btn.bx--snippet-btn--expand{background-color:var(--cds-disabled-01,#f4f4f4);color:var(--cds-disabled-02,#c6c6c6)}.bx--snippet--disabled .bx--copy-btn:hover,.bx--snippet--disabled .bx--snippet-btn--expand:hover{background-color:var(--cds-disabled-01,#f4f4f4);color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed}.bx--snippet--disabled .bx--snippet-btn--expand .bx--icon-chevron--down,.bx--snippet--disabled .bx--snippet__icon{fill:var(--cds-disabled-02,#c6c6c6)}.bx--snippet code{font-family:var(--cds-code-01-font-family, \'IBM Plex Mono\', \'Menlo\', \'DejaVu Sans Mono\', \'Bitstream Vera Sans Mono\', Courier, monospace);font-size:var(--cds-code-01-font-size,.75rem);font-weight:var(--cds-code-01-font-weight,400);line-height:var(--cds-code-01-line-height,1.33333);letter-spacing:var(--cds-code-01-letter-spacing,.32px)}.bx--snippet--inline{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;position:relative;display:inline;padding:0;border:2px solid transparent;background-color:var(--cds-field-01,#f4f4f4);border-radius:4px;color:var(--cds-text-01,#161616);cursor:pointer}.bx--snippet--inline *,.bx--snippet--inline ::after,.bx--snippet--inline ::before{box-sizing:inherit}.bx--snippet--inline:hover{background-color:var(--cds-ui-03,#e0e0e0)}.bx--snippet--inline:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--snippet--inline:focus{border:2px solid var(--cds-focus,#0f62fe);outline:0}.bx--snippet--inline::before{position:absolute;z-index:6000;width:0;height:0;border-style:solid;content:"";display:none}.bx--snippet--inline .bx--copy-btn__feedback{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:none;overflow:visible;box-sizing:content-box;margin:auto;clip:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--snippet--inline .bx--copy-btn__feedback{width:auto}}@supports (-ms-accelerator:true){.bx--snippet--inline .bx--copy-btn__feedback{width:auto}}@supports (-ms-ime-align:auto){.bx--snippet--inline .bx--copy-btn__feedback{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--snippet--inline .bx--copy-btn__feedback{border:1px solid transparent}}.bx--snippet--inline .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--snippet--inline .bx--assistive-text,.bx--snippet--inline+.bx--assistive-text,.bx--snippet--inline::after,.bx--snippet--inline::before{bottom:0;left:50%}.bx--snippet--inline::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--snippet--inline .bx--assistive-text,.bx--snippet--inline+.bx--assistive-text,.bx--snippet--inline::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--snippet--inline.bx--copy-btn--animating .bx--copy-btn__feedback,.bx--snippet--inline.bx--copy-btn--animating::before{display:block}.bx--snippet--inline.bx--copy-btn--animating.bx--copy-btn--fade-out .bx--copy-btn__feedback,.bx--snippet--inline.bx--copy-btn--animating.bx--copy-btn--fade-out::before{-webkit-animation:110ms cubic-bezier(.2,0,.38,.9) hide-feedback;animation:110ms cubic-bezier(.2,0,.38,.9) hide-feedback}.bx--snippet--inline.bx--copy-btn--animating.bx--copy-btn--fade-in .bx--copy-btn__feedback,.bx--snippet--inline.bx--copy-btn--animating.bx--copy-btn--fade-in::before{-webkit-animation:110ms cubic-bezier(.2,0,.38,.9) show-feedback;animation:110ms cubic-bezier(.2,0,.38,.9) show-feedback}.bx--snippet--inline code{padding:0 var(--cds-spacing-03,.5rem)}.bx--snippet--inline.bx--snippet--no-copy{display:inline-block}.bx--snippet--inline.bx--snippet--no-copy:hover{background-color:var(--cds-field-01,#f4f4f4);cursor:auto}.bx--snippet--light.bx--snippet--inline.bx--snippet--no-copy:hover{background-color:var(--cds-field-02,#fff);cursor:auto}.bx--snippet--single,:host(bx-code-snippet),:host(bx-code-snippet-skeleton){font-family:var(--cds-code-01-font-family, \'IBM Plex Mono\', \'Menlo\', \'DejaVu Sans Mono\', \'Bitstream Vera Sans Mono\', Courier, monospace);font-size:var(--cds-code-01-font-size,.75rem);font-weight:var(--cds-code-01-font-weight,400);line-height:var(--cds-code-01-line-height,1.33333);letter-spacing:var(--cds-code-01-letter-spacing,.32px);position:relative;width:100%;max-width:48rem;background-color:var(--cds-field-01,#f4f4f4);display:flex;height:2.5rem;align-items:center;padding-right:2.5rem}.bx--snippet--no-copy:host(bx-code-snippet),.bx--snippet--no-copy:host(bx-code-snippet-skeleton),.bx--snippet--single.bx--snippet--no-copy{padding:0}.bx--snippet--no-copy:host(bx-code-snippet)::after,.bx--snippet--no-copy:host(bx-code-snippet-skeleton)::after,.bx--snippet--single.bx--snippet--no-copy::after{right:1rem}.bx--snippet--single .bx--snippet-container,:host(bx-code-snippet) .bx--snippet-container,:host(bx-code-snippet-skeleton) .bx--snippet-container{position:relative;display:flex;height:100%;align-items:center;padding-left:1rem;overflow-x:auto}.bx--snippet--single .bx--snippet-container:focus,:host(bx-code-snippet) .bx--snippet-container:focus,:host(bx-code-snippet-skeleton) .bx--snippet-container:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--snippet--single .bx--snippet-container:focus,:host(bx-code-snippet) .bx--snippet-container:focus,:host(bx-code-snippet-skeleton) .bx--snippet-container:focus{outline-style:dotted}}.bx--snippet--single pre,:host(bx-code-snippet) pre,:host(bx-code-snippet-skeleton) pre{font-family:var(--cds-code-01-font-family, \'IBM Plex Mono\', \'Menlo\', \'DejaVu Sans Mono\', \'Bitstream Vera Sans Mono\', Courier, monospace);font-size:var(--cds-code-01-font-size,.75rem);font-weight:var(--cds-code-01-font-weight,400);line-height:var(--cds-code-01-line-height,1.33333);letter-spacing:var(--cds-code-01-letter-spacing,.32px);padding-right:var(--cds-spacing-03,.5rem)}.bx--snippet--inline code,.bx--snippet--single pre,:host(bx-code-snippet) pre,:host(bx-code-snippet-skeleton) pre{white-space:pre}.bx--snippet--multi,:host(bx-code-snippet-skeleton[type=multi]),:host(bx-code-snippet[type=multi]){font-family:var(--cds-code-01-font-family, \'IBM Plex Mono\', \'Menlo\', \'DejaVu Sans Mono\', \'Bitstream Vera Sans Mono\', Courier, monospace);font-size:var(--cds-code-01-font-size,.75rem);font-weight:var(--cds-code-01-font-weight,400);line-height:var(--cds-code-01-line-height,1.33333);letter-spacing:var(--cds-code-01-letter-spacing,.32px);position:relative;width:100%;max-width:48rem;background-color:var(--cds-field-01,#f4f4f4);display:flex;padding:1rem}.bx--snippet--multi .bx--snippet-container,:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container,:host(bx-code-snippet[type=multi]) .bx--snippet-container{position:relative;min-height:100%;max-height:100%;order:1;overflow-y:auto;transition:max-height 150ms cubic-bezier(.2,0,.38,.9)}.bx--snippet--expand:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container,.bx--snippet--expand:host(bx-code-snippet[type=multi]) .bx--snippet-container,.bx--snippet--multi.bx--snippet--expand .bx--snippet-container{padding-bottom:var(--cds-spacing-05,1rem);transition:max-height 150ms cubic-bezier(.2,0,.38,.9)}.bx--snippet--multi.bx--snippet--wraptext pre,.bx--snippet--wraptext:host(bx-code-snippet-skeleton[type=multi]) pre,.bx--snippet--wraptext:host(bx-code-snippet[type=multi]) pre{white-space:pre-wrap;word-wrap:break-word}.bx--snippet--multi .bx--snippet-container pre,:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container pre,:host(bx-code-snippet[type=multi]) .bx--snippet-container pre{padding-right:2.5rem;padding-bottom:1.5rem;overflow-x:auto}.bx--snippet--multi.bx--snippet--no-copy .bx--snippet-container pre,.bx--snippet--no-copy:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container pre,.bx--snippet--no-copy:host(bx-code-snippet[type=multi]) .bx--snippet-container pre{padding-right:0}.bx--snippet--expand:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container pre,.bx--snippet--expand:host(bx-code-snippet[type=multi]) .bx--snippet-container pre,.bx--snippet--multi.bx--snippet--expand .bx--snippet-container pre{overflow-x:auto}.bx--snippet--multi .bx--snippet-container pre::after,:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container pre::after,:host(bx-code-snippet[type=multi]) .bx--snippet-container pre::after{position:absolute;top:0;right:0;width:1rem;height:100%;background-image:linear-gradient(to right,rgba(var(--cds-field-01,#f4f4f4),0),var(--cds-field-01,#f4f4f4));content:""}.bx--snippet--multi .bx--snippet-container pre code,:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container pre code,:host(bx-code-snippet[type=multi]) .bx--snippet-container pre code{overflow:hidden}.bx--snippet__icon{width:1rem;height:1rem;fill:var(--cds-icon-01,#161616);transition:all 70ms cubic-bezier(.2,0,.38,.9)}.bx--snippet-button{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;position:absolute;top:0;right:0;display:flex;overflow:visible;width:2.5rem;height:2.5rem;align-items:center;justify-content:center;padding:0;border:none;background-color:var(--cds-field-01,#f4f4f4);cursor:pointer;outline:0}.bx--snippet-button *,.bx--snippet-button ::after,.bx--snippet-button ::before{box-sizing:inherit}.bx--snippet-button:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px;outline-color:var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--snippet-button:focus{outline-style:dotted}}.bx--snippet--multi .bx--snippet-button,:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-button,:host(bx-code-snippet[type=multi]) .bx--snippet-button{top:var(--cds-spacing-03,.5rem);right:var(--cds-spacing-03,.5rem);width:2rem;height:2rem}.bx--snippet-button:hover{background:var(--cds-hover-ui,#e5e5e5)}.bx--snippet-button:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--copy__feedback{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);font-family:\'IBM Plex Sans\',\'Helvetica Neue\',Arial,sans-serif;z-index:6000;top:.75rem;right:1.25rem;left:inherit;font-weight:400}.bx--btn--copy__feedback::after,.bx--btn--copy__feedback::before{background:var(--cds-inverse-02,#393939)}.bx--btn--copy__feedback::after{border:none}.bx--snippet .bx--copy-btn{position:absolute;top:0;right:0;font-family:\'IBM Plex Sans\',\'Helvetica Neue\',Arial,sans-serif}.bx--snippet-btn--expand{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);font-family:\'IBM Plex Sans\',\'Helvetica Neue\',Arial,sans-serif;position:absolute;z-index:10;right:0;bottom:0;display:inline-flex;align-items:center;padding:var(--cds-spacing-03,.5rem) var(--cds-spacing-05,1rem);border:0;background-color:var(--cds-field-01,#f4f4f4);color:var(--cds-text-01,#161616)}.bx--snippet-btn--expand .bx--snippet-btn--text{position:relative;top:-.0625rem}.bx--snippet-btn--expand--hide.bx--snippet-btn--expand{display:none}.bx--snippet-btn--expand .bx--icon-chevron--down{margin-left:var(--cds-spacing-03,.5rem);fill:var(--cds-icon-primary,#161616);-webkit-transform:rotate(0);transform:rotate(0);transition:150ms cubic-bezier(.2,0,.38,.9)}.bx--snippet-btn--expand:hover{background:var(--cds-hover-ui,#e5e5e5);color:var(--cds-text-01,#161616)}.bx--snippet-btn--expand:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--snippet-btn--expand:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px;border-color:transparent}@media screen and (prefers-contrast){.bx--snippet-btn--expand:focus{outline-style:dotted}}.bx--snippet--expand .bx--snippet-btn--expand .bx--icon-chevron--down{-webkit-transform:rotate(180deg);transform:rotate(180deg);transition:-webkit-transform 240ms;transition:transform 240ms;transition:transform 240ms,-webkit-transform 240ms}.bx--snippet--light,.bx--snippet--light .bx--btn.bx--snippet-btn--expand,.bx--snippet--light .bx--copy-btn,.bx--snippet--light .bx--snippet-button{background-color:var(--cds-field-02,#fff)}.bx--snippet--light .bx--btn.bx--snippet-btn--expand:hover,.bx--snippet--light .bx--copy-btn:hover,.bx--snippet--light .bx--snippet-button:hover,.bx--snippet--light.bx--snippet--inline:hover{background-color:var(--cds-hover-light-ui,#e5e5e5)}.bx--snippet--light .bx--btn.bx--snippet-btn--expand:active,.bx--snippet--light .bx--copy-btn:active,.bx--snippet--light .bx--snippet-button:active,.bx--snippet--light.bx--snippet--inline:active{background-color:var(--cds-active-light-ui,#c6c6c6)}.bx--snippet--light.bx--snippet--multi .bx--snippet-container pre::after,.bx--snippet--light.bx--snippet--single::after,.bx--snippet--light:host(bx-code-snippet)::after,.bx--snippet--light:host(bx-code-snippet-skeleton)::after,.bx--snippet--light:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container pre::after,.bx--snippet--light:host(bx-code-snippet[type=multi]) .bx--snippet-container pre::after{background-image:linear-gradient(to right,rgba(var(--cds-field-02,#fff),0),var(--cds-field-02,#fff))}.bx--snippet.bx--skeleton .bx--snippet-container,.bx--snippet:host(bx-code-snippet-skeleton) .bx--snippet-container{width:100%;height:100%}.bx--snippet-button .bx--btn--copy__feedback{top:3.175rem;right:auto;left:50%}.bx--snippet-button .bx--btn--copy__feedback::before{top:0}.bx--snippet-button .bx--btn--copy__feedback::after{top:-.25rem}.bx--snippet--multi .bx--copy-btn,:host(bx-code-snippet-skeleton[type=multi]) .bx--copy-btn,:host(bx-code-snippet[type=multi]) .bx--copy-btn{z-index:10;top:.5rem;right:.5rem;width:2rem;height:2rem}.bx--snippet--multi .bx--snippet-button .bx--btn--copy__feedback,:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-button .bx--btn--copy__feedback,:host(bx-code-snippet[type=multi]) .bx--snippet-button .bx--btn--copy__feedback{top:2.675rem}.bx--snippet--inline .bx--btn--copy__feedback{top:calc(100% - .25rem);right:auto;left:50%}.bx--snippet__overflow-indicator--left,.bx--snippet__overflow-indicator--right{z-index:1;width:1rem;flex:1 0 auto}.bx--snippet__overflow-indicator--left{order:0;margin-right:-1rem;background-image:linear-gradient(to left,transparent,var(--cds-field-01,#f4f4f4))}.bx--snippet__overflow-indicator--right{order:2;margin-left:-1rem;background-image:linear-gradient(to right,transparent,var(--cds-field-01,#f4f4f4))}.bx--snippet--single .bx--snippet__overflow-indicator--left,.bx--snippet--single .bx--snippet__overflow-indicator--right,:host(bx-code-snippet) .bx--snippet__overflow-indicator--left,:host(bx-code-snippet) .bx--snippet__overflow-indicator--right,:host(bx-code-snippet-skeleton) .bx--snippet__overflow-indicator--left,:host(bx-code-snippet-skeleton) .bx--snippet__overflow-indicator--right{position:absolute;width:2rem;height:calc(100% - .25rem)}.bx--snippet--single .bx--snippet__overflow-indicator--right,:host(bx-code-snippet) .bx--snippet__overflow-indicator--right,:host(bx-code-snippet-skeleton) .bx--snippet__overflow-indicator--right{right:2.5rem}.bx--snippet--no-copy:host(bx-code-snippet) .bx--snippet__overflow-indicator--right,.bx--snippet--no-copy:host(bx-code-snippet-skeleton) .bx--snippet__overflow-indicator--right,.bx--snippet--single.bx--snippet--no-copy .bx--snippet__overflow-indicator--right{right:0}.bx--snippet--single .bx--snippet-container:focus~.bx--snippet__overflow-indicator--right,:host(bx-code-snippet) .bx--snippet-container:focus~.bx--snippet__overflow-indicator--right,:host(bx-code-snippet-skeleton) .bx--snippet-container:focus~.bx--snippet__overflow-indicator--right{right:calc(2.5rem + .125rem)}.bx--snippet--single .bx--snippet-container:focus+.bx--snippet__overflow-indicator--left,:host(bx-code-snippet) .bx--snippet-container:focus+.bx--snippet__overflow-indicator--left,:host(bx-code-snippet-skeleton) .bx--snippet-container:focus+.bx--snippet__overflow-indicator--left{left:.125rem}.bx--snippet--light .bx--snippet__overflow-indicator--left{background-image:linear-gradient(to left,transparent,var(--cds-field-02,#fff))}.bx--snippet--light .bx--snippet__overflow-indicator--right{background-image:linear-gradient(to right,transparent,var(--cds-field-02,#fff))}@media not all and (min-resolution:0.001dpcm){@supports (-webkit-appearance:none) and (stroke-color:transparent){.bx--snippet__overflow-indicator--left{background-image:linear-gradient(to left,rgba(var(--cds-field-01,#f4f4f4),0),var(--cds-field-01,#f4f4f4))}.bx--snippet__overflow-indicator--right{background-image:linear-gradient(to right,rgba(var(--cds-field-01,#f4f4f4),0),var(--cds-field-01,#f4f4f4))}}}.bx--skeleton:host(bx-code-snippet[type=multi]),.bx--snippet--multi.bx--skeleton,.bx--snippet--multi:host(bx-code-snippet-skeleton),:host(bx-code-snippet-skeleton[type=multi]):host(bx-code-snippet-skeleton),:host(bx-code-snippet[type=multi]):host(bx-code-snippet-skeleton){height:6.125rem}.bx--skeleton:host(bx-code-snippet),.bx--snippet--single.bx--skeleton,:host(bx-code-snippet-skeleton){height:3.5rem}.bx--snippet.bx--skeleton span,.bx--snippet:host(bx-code-snippet-skeleton) span{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;display:block;width:100%;height:1rem;margin-top:.5rem}.bx--snippet.bx--skeleton span:active,.bx--snippet.bx--skeleton span:focus,.bx--snippet.bx--skeleton span:hover,.bx--snippet:host(bx-code-snippet-skeleton) span:active,.bx--snippet:host(bx-code-snippet-skeleton) span:focus,.bx--snippet:host(bx-code-snippet-skeleton) span:hover{border:none;cursor:default;outline:0}.bx--snippet.bx--skeleton span::before,.bx--snippet:host(bx-code-snippet-skeleton) span::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--snippet.bx--skeleton span::before,.bx--snippet:host(bx-code-snippet-skeleton) span::before{-webkit-animation:none;animation:none}}.bx--snippet.bx--skeleton span:first-child,.bx--snippet:host(bx-code-snippet-skeleton) span:first-child{margin:0}.bx--snippet.bx--skeleton span:nth-child(2),.bx--snippet:host(bx-code-snippet-skeleton) span:nth-child(2){width:85%}.bx--snippet.bx--skeleton span:nth-child(3),.bx--snippet:host(bx-code-snippet-skeleton) span:nth-child(3){width:95%}.bx--skeleton:host(bx-code-snippet) .bx--snippet-container,.bx--snippet--single.bx--skeleton .bx--snippet-container,:host(bx-code-snippet-skeleton) .bx--snippet-container{padding-bottom:0}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--snippet__icon{fill:ButtonText}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--snippet--inline:focus{color:Highlight;outline:1px solid Highlight}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--snippet--multi,.bx--snippet--single,:host(bx-code-snippet),:host(bx-code-snippet-skeleton),:host(bx-code-snippet-skeleton[type=multi]),:host(bx-code-snippet[type=multi]){outline:1px solid transparent}}.bx--btn{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);position:relative;display:inline-flex;max-width:20rem;min-height:3rem;flex-shrink:0;align-items:center;justify-content:space-between;padding:calc(.875rem - 3px) 63px calc(.875rem - 3px) 15px;margin:0;border-radius:0;cursor:pointer;outline:0;text-align:left;text-decoration:none;transition:background 70ms cubic-bezier(0,0,.38,.9),box-shadow 70ms cubic-bezier(0,0,.38,.9),border-color 70ms cubic-bezier(0,0,.38,.9),outline 70ms cubic-bezier(0,0,.38,.9);vertical-align:top}.bx--btn *,.bx--btn ::after,.bx--btn ::before{box-sizing:inherit}.bx--btn.bx--btn--disabled,.bx--btn.bx--btn--disabled:focus,.bx--btn.bx--btn--disabled:hover,.bx--btn:disabled,.bx--btn:focus:disabled,.bx--btn:hover:disabled{border-color:var(--cds-disabled-02,#c6c6c6);background:var(--cds-disabled-02,#c6c6c6);box-shadow:none;color:var(--cds-disabled-03,#8d8d8d);cursor:not-allowed}.bx--btn .bx--btn__icon{position:absolute;right:1rem;width:1rem;height:1rem;flex-shrink:0}.bx--btn::-moz-focus-inner{padding:0;border:0}.bx--btn--primary{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-interactive-01,#0f62fe);color:var(--cds-text-04,#fff)}.bx--btn--primary:hover{background-color:var(--cds-hover-primary,#0353e9)}.bx--btn--primary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--primary:active{background-color:var(--cds-active-primary,#002d9c)}.bx--btn--primary .bx--btn__icon,.bx--btn--primary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--primary:hover{color:var(--cds-text-04,#fff)}.bx--btn--secondary{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-interactive-02,#393939);color:var(--cds-text-04,#fff)}.bx--btn--secondary:hover{background-color:var(--cds-hover-secondary,#4c4c4c)}.bx--btn--secondary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--secondary:active{background-color:var(--cds-active-secondary,#6f6f6f)}.bx--btn--secondary .bx--btn__icon,.bx--btn--secondary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--secondary:focus,.bx--btn--secondary:hover{color:var(--cds-text-04,#fff)}.bx--btn--tertiary{border-width:1px;border-style:solid;border-color:var(--cds-interactive-03,#0f62fe);background-color:transparent;color:var(--cds-interactive-03,#0f62fe)}.bx--btn--tertiary:hover{background-color:var(--cds-hover-tertiary,#0353e9)}.bx--btn--tertiary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--tertiary:active{background-color:var(--cds-active-tertiary,#002d9c)}.bx--btn--tertiary .bx--btn__icon,.bx--btn--tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--tertiary:hover{color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary:focus{background-color:var(--cds-interactive-03,#0f62fe);color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary:active{border-color:transparent;background-color:var(--cds-active-tertiary,#002d9c);color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary.bx--btn--disabled,.bx--btn--tertiary.bx--btn--disabled:focus,.bx--btn--tertiary.bx--btn--disabled:hover,.bx--btn--tertiary:disabled,.bx--btn--tertiary:focus:disabled,.bx--btn--tertiary:hover:disabled{background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--ghost{border-width:1px;border-style:solid;border-color:transparent;background-color:transparent;color:var(--cds-link-01,#0f62fe);padding:calc(.875rem - 3px) 16px}.bx--btn--ghost:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--btn--ghost:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--ghost:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--ghost .bx--btn__icon,.bx--btn--ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--ghost .bx--btn__icon{position:static;margin-left:.5rem}.bx--btn--ghost:active,.bx--btn--ghost:hover{color:var(--cds-hover-primary-text,#0043ce)}.bx--btn--ghost:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--ghost.bx--btn--disabled,.bx--btn--ghost.bx--btn--disabled:focus,.bx--btn--ghost.bx--btn--disabled:hover,.bx--btn--ghost:disabled,.bx--btn--ghost:focus:disabled,.bx--btn--ghost:hover:disabled{border-color:transparent;background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--ghost.bx--btn--sm{padding:calc(.375rem - 3px) 16px}.bx--btn--ghost.bx--btn--field,.bx--btn--ghost.bx--btn--md{padding:calc(.675rem - 3px) 16px}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline-style:dotted}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline:1px solid transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline-style:dotted}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{display:inline-block}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::before{transition:none}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{width:0;height:0;border-style:solid;content:""}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@supports (-ms-accelerator:true){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@supports (-ms-ime-align:auto){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{border:1px solid transparent}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{content:attr(aria-label)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::after{content:none}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover::before{opacity:1}@-webkit-keyframes tooltip-fade{from{opacity:0}to{opacity:1}}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus.bx--tooltip--a11y::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger svg,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover svg{fill:currentColor}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled.bx--tooltip--a11y::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled.bx--tooltip--a11y::before{overflow:hidden;margin:-1px;clip:rect(0,0,0,0);opacity:0}.bx--btn.bx--btn--icon-only:not(.bx--tooltip--hidden) .bx--assistive-text{pointer-events:all}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{border-color:var(--cds-focus,#0f62fe)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:active:not([disabled]){border-color:transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline-color:transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:active,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:focus,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:hover{cursor:not-allowed;fill:var(--cds-disabled-03,#8d8d8d)}.bx--tooltip__trigger.bx--btn--icon-only--top{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--top:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--top::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--top::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--top:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--top:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--top:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--top:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--top:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--top:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{top:-.8125rem;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::after{top:-.8125rem;left:0;-webkit-transform:translate(0,-100%);transform:translate(0,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::after{top:-.8125rem;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::after{top:-.8125rem;right:0;left:auto;-webkit-transform:translate(0,-100%);transform:translate(0,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--right{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--right:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--right::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--right::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--right:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--right:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--right:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--right:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--right:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--right:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::after{bottom:-.8125rem;left:0;-webkit-transform:translate(0,100%);transform:translate(0,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::after{bottom:-.8125rem;right:0;left:auto;-webkit-transform:translate(0,100%);transform:translate(0,100%)}.bx--tooltip__trigger.bx--btn--icon-only--left{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--left:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--left::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--left::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--left:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--left:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--left:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--left:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--left:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--left:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--btn--icon-only{padding-right:.9375rem;padding-left:.9375rem}.bx--btn--icon-only .bx--btn__icon{position:static}.bx--btn--icon-only.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--icon-only.bx--btn--ghost .bx--btn__icon{margin:0}.bx--btn--icon-only.bx--btn--selected{background:var(--cds-selected-ui,#e0e0e0)}.bx--btn path[data-icon-path=inner-path]{fill:none}.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:var(--cds-icon-01,#161616)}.bx--btn--ghost.bx--btn--icon-only[disabled] .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only[disabled] .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn.bx--btn--icon-only.bx--btn--ghost[disabled]:hover .bx--btn__icon{fill:var(--cds-disabled-03,#8d8d8d)}.bx--btn--ghost.bx--btn--icon-only[disabled]{cursor:not-allowed}.bx--btn--field.bx--btn--icon-only,.bx--btn--md.bx--btn--icon-only{padding-right:.6875rem;padding-left:.6875rem}.bx--btn--sm.bx--btn--icon-only{padding-right:.4375rem;padding-left:.4375rem}.bx--btn--danger{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-danger-01,#da1e28);color:var(--cds-text-04,#fff)}.bx--btn--danger:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger .bx--btn__icon,.bx--btn--danger .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger:hover{color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary,.bx--btn--danger-tertiary{border-width:1px;border-style:solid;border-color:var(--cds-danger-02,#da1e28);background-color:transparent;color:var(--cds-danger-02,#da1e28)}.bx--btn--danger--tertiary:hover,.bx--btn--danger-tertiary:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger--tertiary:focus,.bx--btn--danger-tertiary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger--tertiary:active,.bx--btn--danger-tertiary:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger--tertiary .bx--btn__icon,.bx--btn--danger--tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn--danger-tertiary .bx--btn__icon,.bx--btn--danger-tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger--tertiary:hover,.bx--btn--danger-tertiary:hover{border-color:var(--cds-hover-danger,#b81921);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary:focus,.bx--btn--danger-tertiary:focus{background-color:var(--cds-danger-01,#da1e28);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary:active,.bx--btn--danger-tertiary:active{border-color:var(--cds-active-danger,#750e13);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary.bx--btn--disabled,.bx--btn--danger--tertiary.bx--btn--disabled:focus,.bx--btn--danger--tertiary.bx--btn--disabled:hover,.bx--btn--danger--tertiary:disabled,.bx--btn--danger--tertiary:focus:disabled,.bx--btn--danger--tertiary:hover:disabled,.bx--btn--danger-tertiary.bx--btn--disabled,.bx--btn--danger-tertiary.bx--btn--disabled:focus,.bx--btn--danger-tertiary.bx--btn--disabled:hover,.bx--btn--danger-tertiary:disabled,.bx--btn--danger-tertiary:focus:disabled,.bx--btn--danger-tertiary:hover:disabled{background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--danger--ghost,.bx--btn--danger-ghost{border-width:1px;border-style:solid;border-color:transparent;background-color:transparent;color:var(--cds-danger-02,#da1e28);padding:calc(.875rem - 3px) 16px}.bx--btn--danger--ghost:hover,.bx--btn--danger-ghost:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger--ghost:focus,.bx--btn--danger-ghost:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger--ghost:active,.bx--btn--danger-ghost:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--danger--ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn--danger-ghost .bx--btn__icon,.bx--btn--danger-ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--danger-ghost .bx--btn__icon{position:static;margin-left:.5rem}.bx--btn--danger--ghost:active,.bx--btn--danger--ghost:hover,.bx--btn--danger-ghost:active,.bx--btn--danger-ghost:hover{color:var(--cds-text-04,#fff)}.bx--btn--danger--ghost.bx--btn--disabled,.bx--btn--danger--ghost.bx--btn--disabled:focus,.bx--btn--danger--ghost.bx--btn--disabled:hover,.bx--btn--danger--ghost:disabled,.bx--btn--danger--ghost:focus:disabled,.bx--btn--danger--ghost:hover:disabled,.bx--btn--danger-ghost.bx--btn--disabled,.bx--btn--danger-ghost.bx--btn--disabled:focus,.bx--btn--danger-ghost.bx--btn--disabled:hover,.bx--btn--danger-ghost:disabled,.bx--btn--danger-ghost:focus:disabled,.bx--btn--danger-ghost:hover:disabled{border-color:transparent;background:0 0;color:var(--cds-disabled-02,#c6c6c6);outline:0}.bx--btn--danger--ghost.bx--btn--sm,.bx--btn--danger-ghost.bx--btn--sm{padding:calc(.375rem - 3px) 16px}.bx--btn--danger--ghost.bx--btn--field,.bx--btn--danger--ghost.bx--btn--md,.bx--btn--danger-ghost.bx--btn--field,.bx--btn--danger-ghost.bx--btn--md{padding:calc(.675rem - 3px) 16px}.bx--btn--sm{min-height:2rem;padding:calc(.375rem - 3px) 60px calc(.375rem - 3px) 12px}.bx--btn--xl:not(.bx--btn--icon-only){align-items:baseline;padding-top:var(--cds-spacing-05,1rem);padding-right:var(--cds-spacing-10,4rem);padding-left:var(--cds-spacing-05,1rem);min-height:5rem}.bx--btn--lg:not(.bx--btn--icon-only){align-items:baseline;padding-top:var(--cds-spacing-05,1rem);padding-right:var(--cds-spacing-10,4rem);padding-left:var(--cds-spacing-05,1rem);min-height:4rem}.bx--btn--field,.bx--btn--md{min-height:2.5rem;padding:calc(.675rem - 3px) 60px calc(.675rem - 3px) 12px}.bx--btn--expressive{font-size:var(--cds-body-short-02-font-size,1rem);font-weight:var(--cds-body-short-02-font-weight,400);line-height:var(--cds-body-short-02-line-height,1.375);letter-spacing:var(--cds-body-short-02-letter-spacing,0);min-height:3rem}.bx--btn--icon-only.bx--btn--expressive{padding:12px 13px}.bx--btn.bx--btn--expressive .bx--btn__icon{width:1.25rem;height:1.25rem}.bx--btn-set .bx--btn.bx--btn--expressive{max-width:20rem}.bx--btn.bx--skeleton,.bx--btn:host(bx-code-snippet-skeleton){position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:9.375rem}.bx--btn.bx--skeleton:active,.bx--btn.bx--skeleton:focus,.bx--btn.bx--skeleton:hover,.bx--btn:active:host(bx-code-snippet-skeleton),.bx--btn:focus:host(bx-code-snippet-skeleton),.bx--btn:hover:host(bx-code-snippet-skeleton){border:none;cursor:default;outline:0}.bx--btn.bx--skeleton::before,.bx--btn:host(bx-code-snippet-skeleton)::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--btn.bx--skeleton::before,.bx--btn:host(bx-code-snippet-skeleton)::before{-webkit-animation:none;animation:none}}.bx--btn-set{display:flex}.bx--btn-set--stacked{flex-direction:column}.bx--btn-set .bx--btn{width:100%;max-width:12.25rem}.bx--btn-set .bx--btn:not(:focus){box-shadow:-.0625rem 0 0 0 var(--cds-button-separator,#e0e0e0)}.bx--btn-set .bx--btn:first-of-type:not(:focus){box-shadow:inherit}.bx--btn-set .bx--btn:focus+.bx--btn{box-shadow:inherit}.bx--btn-set--stacked .bx--btn:not(:focus){box-shadow:0 -.0625rem 0 0 var(--cds-button-separator,#e0e0e0)}.bx--btn-set--stacked .bx--btn:first-of-type:not(:focus){box-shadow:inherit}.bx--btn-set .bx--btn.bx--btn--disabled{box-shadow:-.0625rem 0 0 0 var(--cds-disabled-03,#8d8d8d)}.bx--btn-set .bx--btn.bx--btn--disabled:first-of-type{box-shadow:none}.bx--btn-set--stacked .bx--btn.bx--btn--disabled{box-shadow:0 -.0625rem 0 0 var(--cds-disabled-03,#8d8d8d)}.bx--btn-set--stacked .bx--btn.bx--btn--disabled:first-of-type{box-shadow:none}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn:focus{color:Highlight;outline:1px solid Highlight}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:ButtonText}}@keyframes hide-feedback{0%{opacity:1;visibility:inherit}100%{opacity:0;visibility:hidden}}@keyframes show-feedback{0%{opacity:0;visibility:hidden}100%{opacity:1;visibility:inherit}}.bx--btn--copy{position:relative;overflow:visible}.bx--btn--copy .bx--btn__icon{margin-left:.3125rem}.bx--btn--copy__feedback{position:absolute;top:1.2rem;left:50%;display:none}.bx--btn--copy__feedback::before{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);z-index:2;top:1.1rem;padding:var(--cds-spacing-02,.25rem);border-radius:4px;color:var(--cds-text-inverse,#fff);content:attr(data-feedback);font-weight:400;pointer-events:none;-webkit-transform:translateX(-50%);transform:translateX(-50%);white-space:nowrap}.bx--btn--copy__feedback::after{z-index:1;top:.85rem;left:-.3rem;width:.6rem;height:.6rem;border-right:1px solid var(--cds-background-inverse,#393939);border-bottom:1px solid var(--cds-background-inverse,#393939);content:"";-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.bx--btn--copy__feedback::after,.bx--btn--copy__feedback::before{position:absolute;display:block;background:var(--cds-background-inverse,#393939)}.bx--btn--copy__feedback--displayed{display:inline-flex}.bx--copy-btn{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;position:relative;display:flex;width:2.5rem;height:2.5rem;align-items:center;justify-content:center;padding:0;border:none;background-color:var(--cds-layer,#f4f4f4);cursor:pointer}.bx--copy-btn *,.bx--copy-btn ::after,.bx--copy-btn ::before{box-sizing:inherit}.bx--copy-btn:hover{background-color:var(--cds-layer-hover,#e5e5e5)}.bx--copy-btn:active{background-color:var(--cds-layer-active,#c6c6c6)}.bx--copy-btn::before{position:absolute;z-index:6000;width:0;height:0;border-style:solid;content:"";display:none}.bx--copy-btn .bx--copy-btn__feedback{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:none;overflow:visible;box-sizing:content-box;margin:auto;clip:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--copy-btn .bx--copy-btn__feedback{width:auto}}@supports (-ms-accelerator:true){.bx--copy-btn .bx--copy-btn__feedback{width:auto}}@supports (-ms-ime-align:auto){.bx--copy-btn .bx--copy-btn__feedback{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--copy-btn .bx--copy-btn__feedback{border:1px solid transparent}}.bx--copy-btn .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--copy-btn .bx--assistive-text,.bx--copy-btn+.bx--assistive-text,.bx--copy-btn::after,.bx--copy-btn::before{bottom:0;left:50%}.bx--copy-btn::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--copy-btn .bx--assistive-text,.bx--copy-btn+.bx--assistive-text,.bx--copy-btn::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--copy-btn:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px;outline-color:var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--copy-btn:focus{outline-style:dotted}}.bx--copy-btn.bx--copy-btn--animating .bx--copy-btn__feedback,.bx--copy-btn.bx--copy-btn--animating::before{display:block}.bx--copy-btn.bx--copy-btn--animating.bx--copy-btn--fade-out .bx--copy-btn__feedback,.bx--copy-btn.bx--copy-btn--animating.bx--copy-btn--fade-out::before{-webkit-animation:110ms cubic-bezier(.2,0,.38,.9) hide-feedback;animation:110ms cubic-bezier(.2,0,.38,.9) hide-feedback}.bx--copy-btn.bx--copy-btn--animating.bx--copy-btn--fade-in .bx--copy-btn__feedback,.bx--copy-btn.bx--copy-btn--animating.bx--copy-btn--fade-in::before{-webkit-animation:110ms cubic-bezier(.2,0,.38,.9) show-feedback;animation:110ms cubic-bezier(.2,0,.38,.9) show-feedback}.bx--copy{font-size:0}:host(bx-code-snippet),:host(bx-code-snippet-skeleton){outline:0}:host(bx-code-snippet)::after,:host(bx-code-snippet-skeleton)::after{background-color:var(--cds-ui-01,#f4f4f4);background-image:none;-webkit-mask-image:linear-gradient(to right,transparent 0,var(--cds-ui-01,#f4f4f4) 100%);mask-image:linear-gradient(to right,transparent 0,var(--cds-ui-01,#f4f4f4) 100%)}@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){:host(bx-code-snippet)::after,:host(bx-code-snippet-skeleton)::after{background-color:transparent;background-image:linear-gradient(to right,transparent,var(--cds-ui-01,#f4f4f4))}}:host(bx-code-snippet) .bx--snippet-button .bx--btn--copy__feedback,:host(bx-code-snippet-skeleton) .bx--snippet-button .bx--btn--copy__feedback{left:50%;right:auto}:host(bx-code-snippet) .bx--snippet-container,:host(bx-code-snippet-skeleton) .bx--snippet-container{display:flex;align-items:center;overflow-x:auto;position:relative;height:100%}:host(bx-code-snippet) .bx--snippet-btn--expand,:host(bx-code-snippet-skeleton) .bx--snippet-btn--expand{z-index:1;min-height:2.5rem}:host(bx-code-snippet) pre,:host(bx-code-snippet-skeleton) pre{white-space:nowrap;font-family:var(--cds-code-01-font-family, \'IBM Plex Mono\', \'Menlo\', \'DejaVu Sans Mono\', \'Bitstream Vera Sans Mono\', Courier, monospace);font-size:var(--cds-code-01-font-size,.75rem);font-weight:var(--cds-code-01-font-weight,400);line-height:var(--cds-code-01-line-height,1.33333);letter-spacing:var(--cds-code-01-letter-spacing,.32px);padding-right:.5rem}:host(bx-code-snippet[color-scheme=light]){background-color:var(--cds-ui-02,#fff)}:host(bx-code-snippet[color-scheme=light]) button.bx--btn.bx--snippet-btn--expand{background-color:var(--cds-ui-02,#fff)}:host(bx-code-snippet[color-scheme=light]):hover{background-color:var(--cds-ui-01-light,#e0e0e0)}:host(bx-code-snippet[color-scheme=light]) .bx--snippet-button:hover,:host(bx-code-snippet[color-scheme=light]) button.bx--btn.bx--snippet-btn--expand:hover{background-color:var(--cds-ui-01-light,#e0e0e0)}:host(bx-code-snippet-skeleton[type=multi]),:host(bx-code-snippet[type=multi]){height:auto}:host(bx-code-snippet-skeleton[type=multi])::after,:host(bx-code-snippet[type=multi])::after{position:absolute;content:"";left:0;top:auto;bottom:1rem;width:100%;height:1rem;background-color:var(--cds-ui-01,#f4f4f4);background-image:none;-webkit-mask-image:linear-gradient(to bottom,transparent 0,var(--cds-ui-01,#f4f4f4) 100%);mask-image:linear-gradient(to bottom,transparent 0,var(--cds-ui-01,#f4f4f4) 100%)}@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){:host(bx-code-snippet-skeleton[type=multi])::after,:host(bx-code-snippet[type=multi])::after{background-color:transparent;background-image:linear-gradient(to bottom,transparent,var(--cds-ui-01,#f4f4f4))}}:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container,:host(bx-code-snippet[type=multi]) .bx--snippet-container{display:block;overflow:hidden;position:relative;height:auto;padding-bottom:0;max-height:14.875rem;min-height:3.5rem;transition:max-height 150ms cubic-bezier(.2,0,.38,.9)}:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container pre,:host(bx-code-snippet[type=multi]) .bx--snippet-container pre{overflow:hidden;padding-bottom:1.5rem;white-space:pre;padding-right:0}:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container pre::after,:host(bx-code-snippet[type=multi]) .bx--snippet-container pre::after{content:none}:host(bx-code-snippet-skeleton[type=multi]) .bx--snippet-container pre code,:host(bx-code-snippet[type=multi]) .bx--snippet-container pre code{overflow:hidden}:host(bx-code-snippet-skeleton[type=multi]) .bx-ce--snippet-container--expanded,:host(bx-code-snippet[type=multi]) .bx-ce--snippet-container--expanded{max-height:93.75rem;transition:max-height 150ms cubic-bezier(.2,0,.38,.9)}:host(bx-code-snippet-skeleton[type=multi]) .bx-ce--snippet-container--expanded pre,:host(bx-code-snippet[type=multi]) .bx-ce--snippet-container--expanded pre{overflow-x:auto}:host(bx-code-snippet[type=inline]){display:inline-flex;width:auto;height:auto;min-width:auto;max-width:auto;padding:0}:host(bx-code-snippet[type=inline])::after{content:none}:host(bx-code-snippet[type=inline]) .bx--btn--copy__feedback{top:.4242625rem}:host(bx-code-snippet-skeleton) span{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:100%;height:1rem;display:block;margin-top:.5rem}:host(bx-code-snippet-skeleton) span:active,:host(bx-code-snippet-skeleton) span:focus,:host(bx-code-snippet-skeleton) span:hover{border:none;cursor:default;outline:0}:host(bx-code-snippet-skeleton) span::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){:host(bx-code-snippet-skeleton) span::before{-webkit-animation:none;animation:none}}:host(bx-code-snippet-skeleton) span:first-child{margin:0}:host(bx-code-snippet-skeleton) span:nth-child(2){width:85%}:host(bx-code-snippet-skeleton) span:nth-child(3){width:95%}',
]);

let _$2 = t => t,
    _t$1,
    _t2$1,
    _t3$1,
    _t4,
    _t5,
    _t6,
    _t7,
    _t8,
    _t9,
    _t10;
const {
  prefix: prefix$1
} = settings_1;
/**
 * @param values The values to render.
 * @param values.children The child nodes.
 * @param values.handleClick The handler for the `click` event on the button.
 * @returns The template result for the expando.
 */

const renderExpando = ({
  children,
  handleClick
}) => html(_t$1 || (_t$1 = _$2` <button type="button" class="${0}--snippet-btn--expand" @click="${0}"> <span id="button-text" class="${0}--snippet-btn--text"> ${0} </span> ${0} </button> `), prefix$1, handleClick, prefix$1, children, svgResultCarbonIcon$4({
  'aria-labeledby': 'button-text',
  class: `${prefix$1}--icon-chevron--down ${prefix$1}--snippet__icon`,
  role: 'img'
}));
/**
 * @param values The values to render.
 * @param values.assistiveText The assistive text to announce that the node is for code snippet.
 * @param [values.expanded] `true` to show the expanded state (for multi-line variant).
 * @param values.children The child nodes.
 * @returns The template result for the code snippet.
 */


const renderCode = ({
  assistiveText,
  expanded,
  children
}) => {
  const classes = classMap({
    [`${prefix$1}--snippet-container`]: true,
    [`${prefix$1}-ce--snippet-container--expanded`]: Boolean(expanded)
  }); // Ensures no extra whitespace text node
  // prettier-ignore

  return html(_t2$1 || (_t2$1 = _$2` <div role="textbox" tabindex="0" class="${0}" aria-label="${0}"><code><pre>${0}</pre></code></div> `), classes, assistiveText, children);
};
/**
 * Basic code snippet.
 * @element bx-code-snippet
 */


_decorate([customElement(`${prefix$1}-code-snippet`)], function (_initialize, _FocusMixin) {
  class BXCodeSnippet extends _FocusMixin {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXCodeSnippet,
    d: [{
      kind: "field",
      key: "_expanded",

      value() {
        return false;
      }

    }, {
      kind: "field",
      key: "_showCopyButtonFeedback",

      value() {
        return false;
      }

    }, {
      kind: "field",
      key: "_showExpando",

      value() {
        return false;
      }

    }, {
      kind: "method",
      key: "_handleClickCopyButton",
      value:
      /**
       * `true` to expand multi-line variant of code snippet.
       */

      /**
       * `true` to show the feedback tooltip.
       */

      /**
       * `true` to show the expando.
       */

      /**
       * Handles `click` event on the copy button.
       */
      function _handleClickCopyButton() {
        const {
          ownerDocument: doc
        } = this;
        const selection = doc.defaultView.getSelection();
        selection.removeAllRanges();
        const code = doc.createElement('code');
        code.className = `${prefix$1}--visually-hidden`;
        const pre = doc.createElement('pre');
        pre.textContent = this.textContent;
        code.appendChild(pre); // Using `<code>` in shadow DOM seems to lose the LFs in some browsers

        doc.body.appendChild(code);
        const range = doc.createRange();
        range.selectNodeContents(code);
        selection.addRange(range);
        doc.execCommand('copy');

        this._handleCopyButtonFeedbackTooltip(this.copyButtonFeedbackTimeout);

        doc.body.removeChild(code);
        selection.removeAllRanges();
      }
      /**
       * Handles showing/hiding the feedback tooltip.
       */

    }, {
      kind: "field",
      key: "_handleCopyButtonFeedbackTooltip",

      value() {
        return _createHandleFeedbackTooltip(({
          showFeedback: _showFeedback = false
        }) => {
          this._showCopyButtonFeedback = _showFeedback;
          this.requestUpdate();
        });
      }

    }, {
      kind: "method",
      key: "_handleClickExpando",
      value:
      /**
       * Handles `click` event on the expando.
       */
      function _handleClickExpando() {
        this._expanded = !this._expanded;
        this.requestUpdate();
      }
      /**
       * Handles change in slot content to determine if the content
       */

    }, {
      kind: "method",
      key: "_handleSlotChange",
      value: function _handleSlotChange() {
        const {
          type,
          _preNode: preNode
        } = this;

        if (type === CODE_SNIPPET_TYPE.MULTI) {
          if (preNode.getBoundingClientRect().height > 255) {
            this._showExpando = true;
            this.requestUpdate();
          }
        }
      }
      /**
       * The `<pre>` element in the shadow DOM.
       */

    }, {
      kind: "field",
      decorators: [query('pre')],
      key: "_preNode",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        attribute: 'code-assistive-text'
      })],
      key: "codeAssistiveText",

      value() {
        return 'code-snippet';
      }

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'collapse-button-text'
      })],
      key: "collapseButtonText",

      value() {
        return 'Show less';
      }

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'color-scheme',
        reflect: true
      })],
      key: "colorScheme",

      value() {
        return FORM_ELEMENT_COLOR_SCHEME.REGULAR;
      }

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'copy-button-assistive-text'
      })],
      key: "copyButtonAssistiveText",

      value() {
        return 'Copy to clipboard';
      }

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'copy-button-feedback-text'
      })],
      key: "copyButtonFeedbackText",

      value() {
        return 'Copied!';
      }

    }, {
      kind: "field",
      decorators: [property({
        type: Number,
        attribute: 'copy-button-feedback-timeout'
      })],
      key: "copyButtonFeedbackTimeout",

      value() {
        return 2000;
      }

    }, {
      kind: "field",
      decorators: [property({
        attribute: 'expand-button-text'
      })],
      key: "expandButtonText",

      value() {
        return 'Show more';
      }

    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "type",

      value() {
        return CODE_SNIPPET_TYPE.SINGLE;
      }

    }, {
      kind: "method",
      key: "createRenderRoot",
      value:
      /**
       * An assistive text for screen reader to advice a DOM node is for code snippet.
       */

      /**
       * The context content for the collapse button.
       */

      /**
       * The color scheme.
       */

      /**
       * An assistive text for screen reader to announce, telling that the button copies the content to the clipboard.
       */

      /**
       * The feedback text for the copy button.
       */

      /**
       * The number in milliseconds to determine how long the tooltip for the copy button should remain.
       */

      /**
       * The context content for the expand button.
       */

      /**
       * The type of code snippet.
       */
      function createRenderRoot() {
        var _$exec;

        return this.attachShadow({
          mode: 'open',
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ['', 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          codeAssistiveText,
          collapseButtonText,
          copyButtonAssistiveText,
          copyButtonFeedbackText,
          expandButtonText,
          type,
          _expanded: expanded,
          _showCopyButtonFeedback: showCopyButtonFeedback,
          _showExpando: showExpando,
          _handleClickCopyButton: handleClickCopyButton,
          _handleClickExpando: handleClickExpando,
          _handleSlotChange: handleSlotChange
        } = this;

        if (type === CODE_SNIPPET_TYPE.SINGLE) {
          // Ensures no extra whitespace text node
          // prettier-ignore
          return html(_t3$1 || (_t3$1 = _$2` ${0} ${0} `), renderCode({
            assistiveText: codeAssistiveText,
            expanded,
            children: html(_t4 || (_t4 = _$2`<slot @slotchange="${0}"></slot>`), handleSlotChange)
          }), _renderButton({
            assistiveText: copyButtonAssistiveText,
            feedbackText: copyButtonFeedbackText,
            showFeedback: showCopyButtonFeedback,
            handleClickButton: handleClickCopyButton,
            className: `${prefix$1}--snippet-button`
          }));
        }

        if (type === CODE_SNIPPET_TYPE.MULTI) {
          // Ensures no extra whitespace text node
          // prettier-ignore
          return html(_t5 || (_t5 = _$2` ${0} ${0} ${0} `), renderCode({
            assistiveText: codeAssistiveText,
            expanded,
            children: html(_t6 || (_t6 = _$2`<slot @slotchange="${0}"></slot>`), handleSlotChange)
          }), _renderButton({
            assistiveText: copyButtonAssistiveText,
            feedbackText: copyButtonFeedbackText,
            showFeedback: showCopyButtonFeedback,
            handleClickButton: handleClickCopyButton,
            className: `${prefix$1}--snippet-button`
          }), !showExpando ? undefined : renderExpando({
            children: expanded ? html(_t7 || (_t7 = _$2`<slot name="collapse-button-text">${0}</slot>`), collapseButtonText) : html(_t8 || (_t8 = _$2`<slot name="expand-button-text">${0}</slot>`), expandButtonText),
            handleClick: handleClickExpando
          }));
        } // Ensures no extra whitespace text node
        // prettier-ignore


        return html(_t9 || (_t9 = _$2` ${0} `), _renderButton({
          assistiveText: copyButtonAssistiveText,
          feedbackText: copyButtonFeedbackText,
          showFeedback: showCopyButtonFeedback,
          handleClickButton: handleClickCopyButton,
          className: `${prefix$1}--snippet ${prefix$1}--snippet--inline`,
          children: html(_t10 || (_t10 = _$2`<code aria-label="${0}"><slot></slot></code>`), codeAssistiveText)
        }));
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles;
      }

    }]
  };
}, FocusMixin(LitElement));

let _$1 = t => t,
    _t,
    _t2,
    _t3;
const {
  prefix
} = settings_1;
/**
 * Skeleton of code snippet.
 */

_decorate([customElement(`${prefix}-code-snippet-skeleton`)], function (_initialize, _LitElement) {
  class BXCodeSnippetSkeleton extends _LitElement {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: BXCodeSnippetSkeleton,
    d: [{
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "type",

      value() {
        return CODE_SNIPPET_TYPE.SINGLE;
      }

    }, {
      kind: "method",
      key: "render",
      value:
      /**
       * The type of code snippet. Corresponds to the attribute with the same name.
       */
      function render() {
        return html(_t || (_t = _$1` <div class="${0}--snippet-container"> ${0} </div> `), prefix, this.type !== CODE_SNIPPET_TYPE.MULTI ? html(_t2 || (_t2 = _$1` <span></span> `)) : html(_t3 || (_t3 = _$1` <span></span><span></span><span></span> `)));
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return styles;
      }

    }]
  };
}, LitElement);

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$2=Symbol(),n$5=new Map;class s$3{constructor(t,n){if(this._$cssResult$=!0,n!==e$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){let e=n$5.get(this.cssText);return t$1&&void 0===e&&(n$5.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o$3=t=>new s$3("string"==typeof t?t:t+"",e$2),r$2=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s$3(o,e$2)},i$1=(e,n)=>{t$1?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S$1=t$1?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$1=window.trustedTypes,r$1=e$1?e$1.emptyScript:"",h$1=window.reactiveElementPolyfillSupport,o$2={toAttribute(t,i){switch(i){case Boolean:t=t?r$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$4=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:o$2,reflect:!1,hasChanged:n$4};class a$1 extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o();}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S$1(i));}else void 0!==i&&s.push(S$1(i));return s}static _$Eh(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1);}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$ES(t,i,s=l$2){var e,r;const h=this.constructor._$Eh(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:o$2.toAttribute)(i,s.type);this._$Ei=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$Ei=null;}}_$AK(t,i){var s,e,r;const h=this.constructor,n=h._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=h.getPropertyOptions(n),l=t.converter,a=null!==(r=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==r?r:o$2.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$4)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ep=this._$E_());}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU();}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$EC=void 0),this._$EU();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.elementProperties=new Map,a$1.elementStyles=[],a$1.shadowRootOptions={mode:"open"},null==h$1||h$1({ReactiveElement:a$1}),(null!==(s$2=globalThis.reactiveElementVersions)&&void 0!==s$2?s$2:globalThis.reactiveElementVersions=[]).push("1.3.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const i=globalThis.trustedTypes,s$1=i?i.createPolicy("lit-html",{createHTML:t=>t}):void 0,e=`lit$${(Math.random()+"").slice(9)}$`,o$1="?"+e,n$3=`<${o$1}>`,l$1=document,h=(t="")=>l$1.createComment(t),r=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>{var i;return d(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,a=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m=/"/g,g=/^(?:script|style|textarea|title)$/i,b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,x=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l$1.createTreeWalker(l$1,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=a:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m:_):d===m||d===_?d=f:d===v||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n$3:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+e+y):s+e+(-2===p?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==s$1?s$1.createHTML(u):u,l]};class E{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=E.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?H:"@"===i[1]?I:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e),s=t.length-1;if(s>0){l.textContent=i?i.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o$1)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e,t+1));)c.push({type:7,index:r}),t+=e.length-1;}r++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$1).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),r(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):u(t)?this.S(t):this.$(t);}M(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t));}$(t){this._$AH!==w&&r(this._$AH)?this._$AA.nextSibling.data=t:this.k(l$1.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=E.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new V(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new E(t)),i}S(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.M(h()),this.M(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!r(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.C(t);}C(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}C(t){this.element[this.name]=t===w?void 0:t;}}const k=i?i.emptyScript:"";class H extends S{constructor(){super(...arguments),this.type=4;}C(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name);}}class I extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=window.litHtmlPolyfillSupport;null==z||z(E,N),(null!==(t=globalThis.litHtmlVersions)&&void 0!==t?t:globalThis.litHtmlVersions=[]).push("2.2.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=x(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1);}render(){return b}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$2=globalThis.litElementPolyfillSupport;null==n$2||n$2({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.2.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1=n=>e=>"function"==typeof e?((n,e)=>(window.customElements.define(n,e),e))(n,e):((n,e)=>{const{kind:t,elements:i}=e;return {kind:t,elements:i,finisher(e){window.customElements.define(n,e);}}})(n,e);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");

let AeButton = class AeButton extends BXButton {
    static get styles() {
        return [
            super.styles,
            r$2 `
                .bx--btn {
                    border-radius: var(--ae-corner-radius, 0);
                }
                .bx--btn--primary {
                    background-color: var(--ae-primary, #0f62fe);
                    color: var(--ae-text-button, #fff);
                }
                .bx--btn--primary:hover {
                    background-color: var(--ae-hover-primary, #0353e9);
                    color: var(--ae-text-button,#fff);
                }
                
                .bx--btn--secondary {
                    background-color: var(--ae-secondary, #39393);
                    color: var(--ae-text-button, #fff);
                }
                .bx--btn--secondary:hover {
                    background-color: var(--ae-hover-secondary, #4c4c4c);
                    color: var(--ae-text-button,#fff);
                }
                
                .bx--btn--tertiary {
                    border-color: var(--ae-tertiary, #0f62fe);
                    color: var(--ae-tertiary, #0f62fe);
                }
                .bx--btn--tertiary:hover {
                    background-color: var(--ae-hover-tertiary, #4c4c4c);
                    color: var(--ae-text-button,#fff);
                }
            `
        ];
    }
};
AeButton = __decorate([
    n$1('ae-btn')
], AeButton);
