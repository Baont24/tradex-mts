/*
 Highstock JS v7.0.3 (2019-02-06)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (Q, H) {
  'object' === typeof module && module.exports
    ? ((H['default'] = H), (module.exports = Q.document ? H(Q) : H))
    : 'function' === typeof define && define.amd
    ? define(function () {
        return H(Q);
      })
    : (Q.Highcharts = H(Q));
})('undefined' !== typeof window ? window : this, function (Q) {
  var H = (function () {
    var a = 'undefined' === typeof Q ? ('undefined' !== typeof window ? window : {}) : Q,
      B = a.document,
      A = (a.navigator && a.navigator.userAgent) || '',
      G = B && B.createElementNS && !!B.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect,
      m = /(edge|msie|trident)/i.test(A) && !a.opera,
      g = -1 !== A.indexOf('Firefox'),
      t = -1 !== A.indexOf('Chrome'),
      u = g && 4 > parseInt(A.split('Firefox/')[1], 10);
    return a.Highcharts
      ? a.Highcharts.error(16, !0)
      : {
          product: 'Highstock',
          version: '7.0.3',
          deg2rad: (2 * Math.PI) / 360,
          doc: B,
          hasBidiBug: u,
          hasTouch: B && void 0 !== B.documentElement.ontouchstart,
          isMS: m,
          isWebKit: -1 !== A.indexOf('AppleWebKit'),
          isFirefox: g,
          isChrome: t,
          isSafari: !t && -1 !== A.indexOf('Safari'),
          isTouchDevice: /(Mobile|Android|Windows Phone)/.test(A),
          SVG_NS: 'http://www.w3.org/2000/svg',
          chartCount: 0,
          seriesTypes: {},
          symbolSizes: {},
          svg: G,
          win: a,
          marginNames: ['plotTop', 'marginRight', 'marginBottom', 'plotLeft'],
          noop: function () {},
          charts: [],
        };
  })();
  (function (a) {
    a.timers = [];
    var B = a.charts,
      A = a.doc,
      G = a.win;
    a.error = function (m, g, t) {
      var u = a.isNumber(m) ? 'Highcharts error #' + m + ': www.highcharts.com/errors/' + m : m;
      t && a.fireEvent(t, 'displayError', { code: m });
      if (g) throw Error(u);
      G.console && console.log(u);
    };
    a.Fx = function (a, g, t) {
      this.options = g;
      this.elem = a;
      this.prop = t;
    };
    a.Fx.prototype = {
      dSetter: function () {
        var a = this.paths[0],
          g = this.paths[1],
          t = [],
          u = this.now,
          v = a.length,
          y;
        if (1 === u) t = this.toD;
        else if (v === g.length && 1 > u)
          for (; v--; ) (y = parseFloat(a[v])), (t[v] = isNaN(y) ? g[v] : u * parseFloat(g[v] - y) + y);
        else t = g;
        this.elem.attr('d', t, null, !0);
      },
      update: function () {
        var a = this.elem,
          g = this.prop,
          t = this.now,
          u = this.options.step;
        if (this[g + 'Setter']) this[g + 'Setter']();
        else a.attr ? a.element && a.attr(g, t, null, !0) : (a.style[g] = t + this.unit);
        u && u.call(a, t, this);
      },
      run: function (m, g, t) {
        var u = this,
          v = u.options,
          y = function (a) {
            return y.stopped ? !1 : u.step(a);
          },
          q =
            G.requestAnimationFrame ||
            function (a) {
              setTimeout(a, 13);
            },
          f = function () {
            for (var e = 0; e < a.timers.length; e++) a.timers[e]() || a.timers.splice(e--, 1);
            a.timers.length && q(f);
          };
        m !== g || this.elem['forceAnimate:' + this.prop]
          ? ((this.startTime = +new Date()),
            (this.start = m),
            (this.end = g),
            (this.unit = t),
            (this.now = this.start),
            (this.pos = 0),
            (y.elem = this.elem),
            (y.prop = this.prop),
            y() && 1 === a.timers.push(y) && q(f))
          : (delete v.curAnim[this.prop],
            v.complete && 0 === Object.keys(v.curAnim).length && v.complete.call(this.elem));
      },
      step: function (m) {
        var g = +new Date(),
          t,
          u = this.options,
          v = this.elem,
          y = u.complete,
          q = u.duration,
          f = u.curAnim;
        v.attr && !v.element
          ? (m = !1)
          : m || g >= q + this.startTime
          ? ((this.now = this.end),
            (this.pos = 1),
            this.update(),
            (t = f[this.prop] = !0),
            a.objectEach(f, function (a) {
              !0 !== a && (t = !1);
            }),
            t && y && y.call(v),
            (m = !1))
          : ((this.pos = u.easing((g - this.startTime) / q)),
            (this.now = this.start + (this.end - this.start) * this.pos),
            this.update(),
            (m = !0));
        return m;
      },
      initPath: function (m, g, t) {
        function u(b) {
          var a, c;
          for (n = b.length; n--; )
            (a = 'M' === b[n] || 'L' === b[n]),
              (c = /[a-zA-Z]/.test(b[n + 3])),
              a && c && b.splice(n + 1, 0, b[n + 1], b[n + 2], b[n + 1], b[n + 2]);
        }
        function v(a, l) {
          for (; a.length < b; ) {
            a[0] = l[b - a.length];
            var c = a.slice(0, r);
            [].splice.apply(a, [0, 0].concat(c));
            d && ((c = a.slice(a.length - r)), [].splice.apply(a, [a.length, 0].concat(c)), n--);
          }
          a[0] = 'M';
        }
        function y(a, n) {
          for (var c = (b - a.length) / r; 0 < c && c--; )
            (l = a.slice().splice(a.length / w - r, r * w)),
              (l[0] = n[b - r - c * r]),
              p && ((l[r - 6] = l[r - 2]), (l[r - 5] = l[r - 1])),
              [].splice.apply(a, [a.length / w, 0].concat(l)),
              d && c--;
        }
        g = g || '';
        var q,
          f = m.startX,
          e = m.endX,
          p = -1 < g.indexOf('C'),
          r = p ? 7 : 3,
          b,
          l,
          n;
        g = g.split(' ');
        t = t.slice();
        var d = m.isArea,
          w = d ? 2 : 1,
          E;
        p && (u(g), u(t));
        if (f && e) {
          for (n = 0; n < f.length; n++)
            if (f[n] === e[0]) {
              q = n;
              break;
            } else if (f[0] === e[e.length - f.length + n]) {
              q = n;
              E = !0;
              break;
            }
          void 0 === q && (g = []);
        }
        g.length && a.isNumber(q) && ((b = t.length + q * w * r), E ? (v(g, t), y(t, g)) : (v(t, g), y(g, t)));
        return [g, t];
      },
      fillSetter: function () {
        a.Fx.prototype.strokeSetter.apply(this, arguments);
      },
      strokeSetter: function () {
        this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0);
      },
    };
    a.merge = function () {
      var m,
        g = arguments,
        t,
        u = {},
        v = function (g, q) {
          'object' !== typeof g && (g = {});
          a.objectEach(q, function (f, e) {
            !a.isObject(f, !0) || a.isClass(f) || a.isDOMElement(f) ? (g[e] = q[e]) : (g[e] = v(g[e] || {}, f));
          });
          return g;
        };
      !0 === g[0] && ((u = g[1]), (g = Array.prototype.slice.call(g, 2)));
      t = g.length;
      for (m = 0; m < t; m++) u = v(u, g[m]);
      return u;
    };
    a.pInt = function (a, g) {
      return parseInt(a, g || 10);
    };
    a.isString = function (a) {
      return 'string' === typeof a;
    };
    a.isArray = function (a) {
      a = Object.prototype.toString.call(a);
      return '[object Array]' === a || '[object Array Iterator]' === a;
    };
    a.isObject = function (m, g) {
      return !!m && 'object' === typeof m && (!g || !a.isArray(m));
    };
    a.isDOMElement = function (m) {
      return a.isObject(m) && 'number' === typeof m.nodeType;
    };
    a.isClass = function (m) {
      var g = m && m.constructor;
      return !(!a.isObject(m, !0) || a.isDOMElement(m) || !g || !g.name || 'Object' === g.name);
    };
    a.isNumber = function (a) {
      return 'number' === typeof a && !isNaN(a) && Infinity > a && -Infinity < a;
    };
    a.erase = function (a, g) {
      for (var m = a.length; m--; )
        if (a[m] === g) {
          a.splice(m, 1);
          break;
        }
    };
    a.defined = function (a) {
      return void 0 !== a && null !== a;
    };
    a.attr = function (m, g, t) {
      var u;
      a.isString(g)
        ? a.defined(t)
          ? m.setAttribute(g, t)
          : m && m.getAttribute && ((u = m.getAttribute(g)) || 'class' !== g || (u = m.getAttribute(g + 'Name')))
        : a.defined(g) &&
          a.isObject(g) &&
          a.objectEach(g, function (a, g) {
            m.setAttribute(g, a);
          });
      return u;
    };
    a.splat = function (m) {
      return a.isArray(m) ? m : [m];
    };
    a.syncTimeout = function (a, g, t) {
      if (g) return setTimeout(a, g, t);
      a.call(0, t);
    };
    a.clearTimeout = function (m) {
      a.defined(m) && clearTimeout(m);
    };
    a.extend = function (a, g) {
      var m;
      a || (a = {});
      for (m in g) a[m] = g[m];
      return a;
    };
    a.pick = function () {
      var a = arguments,
        g,
        t,
        u = a.length;
      for (g = 0; g < u; g++) if (((t = a[g]), void 0 !== t && null !== t)) return t;
    };
    a.css = function (m, g) {
      a.isMS && !a.svg && g && void 0 !== g.opacity && (g.filter = 'alpha(opacity\x3d' + 100 * g.opacity + ')');
      a.extend(m.style, g);
    };
    a.createElement = function (m, g, t, u, v) {
      m = A.createElement(m);
      var y = a.css;
      g && a.extend(m, g);
      v && y(m, { padding: 0, border: 'none', margin: 0 });
      t && y(m, t);
      u && u.appendChild(m);
      return m;
    };
    a.extendClass = function (m, g) {
      var t = function () {};
      t.prototype = new m();
      a.extend(t.prototype, g);
      return t;
    };
    a.pad = function (a, g, t) {
      return Array((g || 2) + 1 - String(a).replace('-', '').length).join(t || 0) + a;
    };
    a.relativeLength = function (a, g, t) {
      return /%$/.test(a) ? (g * parseFloat(a)) / 100 + (t || 0) : parseFloat(a);
    };
    a.wrap = function (a, g, t) {
      var m = a[g];
      a[g] = function () {
        var a = Array.prototype.slice.call(arguments),
          g = arguments,
          q = this;
        q.proceed = function () {
          m.apply(q, arguments.length ? arguments : g);
        };
        a.unshift(m);
        a = t.apply(this, a);
        q.proceed = null;
        return a;
      };
    };
    a.datePropsToTimestamps = function (m) {
      a.objectEach(m, function (g, t) {
        a.isObject(g) && 'function' === typeof g.getTime
          ? (m[t] = g.getTime())
          : (a.isObject(g) || a.isArray(g)) && a.datePropsToTimestamps(g);
      });
    };
    a.formatSingle = function (m, g, t) {
      var u = /\.([0-9])/,
        v = a.defaultOptions.lang;
      /f$/.test(m)
        ? ((t = (t = m.match(u)) ? t[1] : -1),
          null !== g && (g = a.numberFormat(g, t, v.decimalPoint, -1 < m.indexOf(',') ? v.thousandsSep : '')))
        : (g = (t || a.time).dateFormat(m, g));
      return g;
    };
    a.format = function (m, g, t) {
      for (var u = '{', v = !1, y, q, f, e, p = [], r; m; ) {
        u = m.indexOf(u);
        if (-1 === u) break;
        y = m.slice(0, u);
        if (v) {
          y = y.split(':');
          q = y.shift().split('.');
          e = q.length;
          r = g;
          for (f = 0; f < e; f++) r && (r = r[q[f]]);
          y.length && (r = a.formatSingle(y.join(':'), r, t));
          p.push(r);
        } else p.push(y);
        m = m.slice(u + 1);
        u = (v = !v) ? '}' : '{';
      }
      p.push(m);
      return p.join('');
    };
    a.getMagnitude = function (a) {
      return Math.pow(10, Math.floor(Math.log(a) / Math.LN10));
    };
    a.normalizeTickInterval = function (m, g, t, u, v) {
      var y,
        q = m;
      t = a.pick(t, 1);
      y = m / t;
      g ||
        ((g = v ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10]),
        !1 === u &&
          (1 === t
            ? (g = g.filter(function (a) {
                return 0 === a % 1;
              }))
            : 0.1 >= t && (g = [1 / t])));
      for (
        u = 0;
        u < g.length && !((q = g[u]), (v && q * t >= m) || (!v && y <= (g[u] + (g[u + 1] || g[u])) / 2));
        u++
      );
      return (q = a.correctFloat(q * t, -Math.round(Math.log(0.001) / Math.LN10)));
    };
    a.stableSort = function (a, g) {
      var m = a.length,
        u,
        v;
      for (v = 0; v < m; v++) a[v].safeI = v;
      a.sort(function (a, q) {
        u = g(a, q);
        return 0 === u ? a.safeI - q.safeI : u;
      });
      for (v = 0; v < m; v++) delete a[v].safeI;
    };
    a.arrayMin = function (a) {
      for (var g = a.length, m = a[0]; g--; ) a[g] < m && (m = a[g]);
      return m;
    };
    a.arrayMax = function (a) {
      for (var g = a.length, m = a[0]; g--; ) a[g] > m && (m = a[g]);
      return m;
    };
    a.destroyObjectProperties = function (m, g) {
      a.objectEach(m, function (a, u) {
        a && a !== g && a.destroy && a.destroy();
        delete m[u];
      });
    };
    a.discardElement = function (m) {
      var g = a.garbageBin;
      g || (g = a.createElement('div'));
      m && g.appendChild(m);
      g.innerHTML = '';
    };
    a.correctFloat = function (a, g) {
      return parseFloat(a.toPrecision(g || 14));
    };
    a.setAnimation = function (m, g) {
      g.renderer.globalAnimation = a.pick(m, g.options.chart.animation, !0);
    };
    a.animObject = function (m) {
      return a.isObject(m) ? a.merge(m) : { duration: m ? 500 : 0 };
    };
    a.timeUnits = {
      millisecond: 1,
      second: 1e3,
      minute: 6e4,
      hour: 36e5,
      day: 864e5,
      week: 6048e5,
      month: 24192e5,
      year: 314496e5,
    };
    a.numberFormat = function (m, g, t, u) {
      m = +m || 0;
      g = +g;
      var v = a.defaultOptions.lang,
        y = (m.toString().split('.')[1] || '').split('e')[0].length,
        q,
        f,
        e = m.toString().split('e');
      -1 === g
        ? (g = Math.min(y, 20))
        : a.isNumber(g)
        ? g &&
          e[1] &&
          0 > e[1] &&
          ((q = g + +e[1]),
          0 <= q
            ? ((e[0] = (+e[0]).toExponential(q).split('e')[0]), (g = q))
            : ((e[0] = e[0].split('.')[0] || 0), (m = 20 > g ? (e[0] * Math.pow(10, e[1])).toFixed(g) : 0), (e[1] = 0)))
        : (g = 2);
      f = (Math.abs(e[1] ? e[0] : m) + Math.pow(10, -Math.max(g, y) - 1)).toFixed(g);
      y = String(a.pInt(f));
      q = 3 < y.length ? y.length % 3 : 0;
      t = a.pick(t, v.decimalPoint);
      u = a.pick(u, v.thousandsSep);
      m = (0 > m ? '-' : '') + (q ? y.substr(0, q) + u : '');
      m += y.substr(q).replace(/(\d{3})(?=\d)/g, '$1' + u);
      g && (m += t + f.slice(-g));
      e[1] && 0 !== +m && (m += 'e' + e[1]);
      return m;
    };
    Math.easeInOutSine = function (a) {
      return -0.5 * (Math.cos(Math.PI * a) - 1);
    };
    a.getStyle = function (m, g, t) {
      if ('width' === g)
        return Math.max(
          0,
          Math.min(
            m.offsetWidth,
            m.scrollWidth,
            m.getBoundingClientRect && 'none' === a.getStyle(m, 'transform', !1)
              ? Math.floor(m.getBoundingClientRect().width)
              : Infinity
          ) -
            a.getStyle(m, 'padding-left') -
            a.getStyle(m, 'padding-right')
        );
      if ('height' === g)
        return Math.max(
          0,
          Math.min(m.offsetHeight, m.scrollHeight) - a.getStyle(m, 'padding-top') - a.getStyle(m, 'padding-bottom')
        );
      G.getComputedStyle || a.error(27, !0);
      if ((m = G.getComputedStyle(m, void 0)))
        (m = m.getPropertyValue(g)), a.pick(t, 'opacity' !== g) && (m = a.pInt(m));
      return m;
    };
    a.inArray = function (a, g, t) {
      return g.indexOf(a, t);
    };
    a.find = Array.prototype.find
      ? function (a, g) {
          return a.find(g);
        }
      : function (a, g) {
          var m,
            u = a.length;
          for (m = 0; m < u; m++) if (g(a[m], m)) return a[m];
        };
    a.keys = Object.keys;
    a.offset = function (a) {
      var g = A.documentElement;
      a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : { top: 0, left: 0 };
      return {
        top: a.top + (G.pageYOffset || g.scrollTop) - (g.clientTop || 0),
        left: a.left + (G.pageXOffset || g.scrollLeft) - (g.clientLeft || 0),
      };
    };
    a.stop = function (m, g) {
      for (var t = a.timers.length; t--; )
        a.timers[t].elem !== m || (g && g !== a.timers[t].prop) || (a.timers[t].stopped = !0);
    };
    a.objectEach = function (a, g, t) {
      for (var m in a) a.hasOwnProperty(m) && g.call(t || a[m], a[m], m, a);
    };
    a.objectEach({ map: 'map', each: 'forEach', grep: 'filter', reduce: 'reduce', some: 'some' }, function (m, g) {
      a[g] = function (a) {
        return Array.prototype[m].apply(a, [].slice.call(arguments, 1));
      };
    });
    a.addEvent = function (m, g, t, u) {
      var v,
        y = m.addEventListener || a.addEventListenerPolyfill;
      v =
        'function' === typeof m && m.prototype
          ? (m.prototype.protoEvents = m.prototype.protoEvents || {})
          : (m.hcEvents = m.hcEvents || {});
      a.Point && m instanceof a.Point && m.series && m.series.chart && (m.series.chart.runTrackerClick = !0);
      y && y.call(m, g, t, !1);
      v[g] || (v[g] = []);
      v[g].push(t);
      u &&
        a.isNumber(u.order) &&
        ((t.order = u.order),
        v[g].sort(function (a, f) {
          return a.order - f.order;
        }));
      return function () {
        a.removeEvent(m, g, t);
      };
    };
    a.removeEvent = function (m, g, t) {
      function u(f, e) {
        var p = m.removeEventListener || a.removeEventListenerPolyfill;
        p && p.call(m, f, e, !1);
      }
      function v(f) {
        var e, p;
        m.nodeName &&
          (g ? ((e = {}), (e[g] = !0)) : (e = f),
          a.objectEach(e, function (a, b) {
            if (f[b]) for (p = f[b].length; p--; ) u(b, f[b][p]);
          }));
      }
      var y, q;
      ['protoEvents', 'hcEvents'].forEach(function (a) {
        var e = m[a];
        e &&
          (g
            ? ((y = e[g] || []),
              t ? ((q = y.indexOf(t)), -1 < q && (y.splice(q, 1), (e[g] = y)), u(g, t)) : (v(e), (e[g] = [])))
            : (v(e), (m[a] = {})));
      });
    };
    a.fireEvent = function (m, g, t, u) {
      var v, y, q, f, e;
      t = t || {};
      A.createEvent && (m.dispatchEvent || m.fireEvent)
        ? ((v = A.createEvent('Events')),
          v.initEvent(g, !0, !0),
          a.extend(v, t),
          m.dispatchEvent ? m.dispatchEvent(v) : m.fireEvent(g, v))
        : ['protoEvents', 'hcEvents'].forEach(function (p) {
            if (m[p])
              for (
                y = m[p][g] || [],
                  q = y.length,
                  t.target ||
                    a.extend(t, {
                      preventDefault: function () {
                        t.defaultPrevented = !0;
                      },
                      target: m,
                      type: g,
                    }),
                  f = 0;
                f < q;
                f++
              )
                (e = y[f]) && !1 === e.call(m, t) && t.preventDefault();
          });
      u && !t.defaultPrevented && u.call(m, t);
    };
    a.animate = function (m, g, t) {
      var u,
        v = '',
        y,
        q,
        f;
      a.isObject(t) || ((f = arguments), (t = { duration: f[2], easing: f[3], complete: f[4] }));
      a.isNumber(t.duration) || (t.duration = 400);
      t.easing = 'function' === typeof t.easing ? t.easing : Math[t.easing] || Math.easeInOutSine;
      t.curAnim = a.merge(g);
      a.objectEach(g, function (e, f) {
        a.stop(m, f);
        q = new a.Fx(m, t, f);
        y = null;
        'd' === f
          ? ((q.paths = q.initPath(m, m.d, g.d)), (q.toD = g.d), (u = 0), (y = 1))
          : m.attr
          ? (u = m.attr(f))
          : ((u = parseFloat(a.getStyle(m, f)) || 0), 'opacity' !== f && (v = 'px'));
        y || (y = e);
        y && y.match && y.match('px') && (y = y.replace(/px/g, ''));
        q.run(u, y, v);
      });
    };
    a.seriesType = function (m, g, t, u, v) {
      var y = a.getOptions(),
        q = a.seriesTypes;
      y.plotOptions[m] = a.merge(y.plotOptions[g], t);
      q[m] = a.extendClass(q[g] || function () {}, u);
      q[m].prototype.type = m;
      v && (q[m].prototype.pointClass = a.extendClass(a.Point, v));
      return q[m];
    };
    a.uniqueKey = (function () {
      var a = Math.random().toString(36).substring(2, 9),
        g = 0;
      return function () {
        return 'highcharts-' + a + '-' + g++;
      };
    })();
    a.isFunction = function (a) {
      return 'function' === typeof a;
    };
    G.jQuery &&
      (G.jQuery.fn.highcharts = function () {
        var m = [].slice.call(arguments);
        if (this[0])
          return m[0]
            ? (new a[a.isString(m[0]) ? m.shift() : 'Chart'](this[0], m[0], m[1]), this)
            : B[a.attr(this[0], 'data-highcharts-chart')];
      });
  })(H);
  (function (a) {
    var B = a.isNumber,
      A = a.merge,
      G = a.pInt;
    a.Color = function (m) {
      if (!(this instanceof a.Color)) return new a.Color(m);
      this.init(m);
    };
    a.Color.prototype = {
      parsers: [
        {
          regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
          parse: function (a) {
            return [G(a[1]), G(a[2]), G(a[3]), parseFloat(a[4], 10)];
          },
        },
        {
          regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
          parse: function (a) {
            return [G(a[1]), G(a[2]), G(a[3]), 1];
          },
        },
      ],
      names: { white: '#ffffff', black: '#000000' },
      init: function (m) {
        var g, t, u, v;
        if ((this.input = m = this.names[m && m.toLowerCase ? m.toLowerCase() : ''] || m) && m.stops)
          this.stops = m.stops.map(function (g) {
            return new a.Color(g[1]);
          });
        else if (
          (m &&
            m.charAt &&
            '#' === m.charAt() &&
            ((g = m.length),
            (m = parseInt(m.substr(1), 16)),
            7 === g
              ? (t = [(m & 16711680) >> 16, (m & 65280) >> 8, m & 255, 1])
              : 4 === g &&
                (t = [
                  ((m & 3840) >> 4) | ((m & 3840) >> 8),
                  ((m & 240) >> 4) | (m & 240),
                  ((m & 15) << 4) | (m & 15),
                  1,
                ])),
          !t)
        )
          for (u = this.parsers.length; u-- && !t; ) (v = this.parsers[u]), (g = v.regex.exec(m)) && (t = v.parse(g));
        this.rgba = t || [];
      },
      get: function (a) {
        var g = this.input,
          m = this.rgba,
          u;
        this.stops
          ? ((u = A(g)),
            (u.stops = [].concat(u.stops)),
            this.stops.forEach(function (g, m) {
              u.stops[m] = [u.stops[m][0], g.get(a)];
            }))
          : (u =
              m && B(m[0])
                ? 'rgb' === a || (!a && 1 === m[3])
                  ? 'rgb(' + m[0] + ',' + m[1] + ',' + m[2] + ')'
                  : 'a' === a
                  ? m[3]
                  : 'rgba(' + m.join(',') + ')'
                : g);
        return u;
      },
      brighten: function (a) {
        var g,
          m = this.rgba;
        if (this.stops)
          this.stops.forEach(function (g) {
            g.brighten(a);
          });
        else if (B(a) && 0 !== a)
          for (g = 0; 3 > g; g++) (m[g] += G(255 * a)), 0 > m[g] && (m[g] = 0), 255 < m[g] && (m[g] = 255);
        return this;
      },
      setOpacity: function (a) {
        this.rgba[3] = a;
        return this;
      },
      tweenTo: function (a, g) {
        var m = this.rgba,
          u = a.rgba;
        u.length && m && m.length
          ? ((a = 1 !== u[3] || 1 !== m[3]),
            (g =
              (a ? 'rgba(' : 'rgb(') +
              Math.round(u[0] + (m[0] - u[0]) * (1 - g)) +
              ',' +
              Math.round(u[1] + (m[1] - u[1]) * (1 - g)) +
              ',' +
              Math.round(u[2] + (m[2] - u[2]) * (1 - g)) +
              (a ? ',' + (u[3] + (m[3] - u[3]) * (1 - g)) : '') +
              ')'))
          : (g = a.input || 'none');
        return g;
      },
    };
    a.color = function (m) {
      return new a.Color(m);
    };
  })(H);
  (function (a) {
    var B,
      A,
      G = a.addEvent,
      m = a.animate,
      g = a.attr,
      t = a.charts,
      u = a.color,
      v = a.css,
      y = a.createElement,
      q = a.defined,
      f = a.deg2rad,
      e = a.destroyObjectProperties,
      p = a.doc,
      r = a.extend,
      b = a.erase,
      l = a.hasTouch,
      n = a.isArray,
      d = a.isFirefox,
      w = a.isMS,
      E = a.isObject,
      C = a.isString,
      F = a.isWebKit,
      c = a.merge,
      k = a.noop,
      x = a.objectEach,
      D = a.pick,
      h = a.pInt,
      z = a.removeEvent,
      L = a.splat,
      J = a.stop,
      W = a.svg,
      I = a.SVG_NS,
      O = a.symbolSizes,
      R = a.win;
    B = a.SVGElement = function () {
      return this;
    };
    r(B.prototype, {
      opacity: 1,
      SVG_NS: I,
      textProps: 'direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor'.split(
        ' '
      ),
      init: function (h, c) {
        this.element = 'span' === c ? y(c) : p.createElementNS(this.SVG_NS, c);
        this.renderer = h;
        a.fireEvent(this, 'afterInit');
      },
      animate: function (h, c, b) {
        var k = a.animObject(D(c, this.renderer.globalAnimation, !0));
        D(p.hidden, p.msHidden, p.webkitHidden, !1) && (k.duration = 0);
        0 !== k.duration
          ? (b && (k.complete = b), m(this, h, k))
          : (this.attr(h, null, b),
            a.objectEach(
              h,
              function (a, h) {
                k.step && k.step.call(this, a, { prop: h, pos: 1 });
              },
              this
            ));
        return this;
      },
      complexColor: function (h, b, k) {
        var z = this.renderer,
          K,
          l,
          d,
          e,
          r,
          f,
          w,
          p,
          I,
          D,
          J,
          L = [],
          E;
        a.fireEvent(this.renderer, 'complexColor', { args: arguments }, function () {
          h.radialGradient ? (l = 'radialGradient') : h.linearGradient && (l = 'linearGradient');
          l &&
            ((d = h[l]),
            (r = z.gradients),
            (w = h.stops),
            (D = k.radialReference),
            n(d) && (h[l] = d = { x1: d[0], y1: d[1], x2: d[2], y2: d[3], gradientUnits: 'userSpaceOnUse' }),
            'radialGradient' === l &&
              D &&
              !q(d.gradientUnits) &&
              ((e = d), (d = c(d, z.getRadialAttr(D, e), { gradientUnits: 'userSpaceOnUse' }))),
            x(d, function (a, h) {
              'id' !== h && L.push(h, a);
            }),
            x(w, function (a) {
              L.push(a);
            }),
            (L = L.join(',')),
            r[L]
              ? (J = r[L].attr('id'))
              : ((d.id = J = a.uniqueKey()),
                (r[L] = f = z.createElement(l).attr(d).add(z.defs)),
                (f.radAttr = e),
                (f.stops = []),
                w.forEach(function (h) {
                  0 === h[1].indexOf('rgba')
                    ? ((K = a.color(h[1])), (p = K.get('rgb')), (I = K.get('a')))
                    : ((p = h[1]), (I = 1));
                  h = z.createElement('stop').attr({ offset: h[0], 'stop-color': p, 'stop-opacity': I }).add(f);
                  f.stops.push(h);
                })),
            (E = 'url(' + z.url + '#' + J + ')'),
            k.setAttribute(b, E),
            (k.gradient = L),
            (h.toString = function () {
              return E;
            }));
        });
      },
      applyTextOutline: function (h) {
        var c = this.element,
          k,
          z,
          K,
          l,
          d;
        -1 !== h.indexOf('contrast') && (h = h.replace(/contrast/g, this.renderer.getContrast(c.style.fill)));
        h = h.split(' ');
        z = h[h.length - 1];
        if ((K = h[0]) && 'none' !== K && a.svg) {
          this.fakeTS = !0;
          h = [].slice.call(c.getElementsByTagName('tspan'));
          this.ySetter = this.xSetter;
          K = K.replace(/(^[\d\.]+)(.*?)$/g, function (a, h, c) {
            return 2 * h + c;
          });
          for (d = h.length; d--; )
            (k = h[d]), 'highcharts-text-outline' === k.getAttribute('class') && b(h, c.removeChild(k));
          l = c.firstChild;
          h.forEach(function (a, h) {
            0 === h &&
              (a.setAttribute('x', c.getAttribute('x')),
              (h = c.getAttribute('y')),
              a.setAttribute('y', h || 0),
              null === h && c.setAttribute('y', 0));
            a = a.cloneNode(1);
            g(a, {
              class: 'highcharts-text-outline',
              fill: z,
              stroke: z,
              'stroke-width': K,
              'stroke-linejoin': 'round',
            });
            c.insertBefore(a, l);
          });
        }
      },
      symbolCustomAttribs: 'x y width height r start end innerR anchorX anchorY rounded'.split(' '),
      attr: function (h, c, b, k) {
        var z,
          K = this.element,
          d,
          l = this,
          n,
          e,
          r = this.symbolCustomAttribs;
        'string' === typeof h && void 0 !== c && ((z = h), (h = {}), (h[z] = c));
        'string' === typeof h
          ? (l = (this[h + 'Getter'] || this._defaultGetter).call(this, h, K))
          : (x(
              h,
              function (c, b) {
                n = !1;
                k || J(this, b);
                this.symbolName && -1 !== a.inArray(b, r) && (d || (this.symbolAttr(h), (d = !0)), (n = !0));
                !this.rotation || ('x' !== b && 'y' !== b) || (this.doTransform = !0);
                n ||
                  ((e = this[b + 'Setter'] || this._defaultSetter),
                  e.call(this, c, b, K),
                  !this.styledMode &&
                    this.shadows &&
                    /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(b) &&
                    this.updateShadows(b, c, e));
              },
              this
            ),
            this.afterSetters());
        b && b.call(this);
        return l;
      },
      afterSetters: function () {
        this.doTransform && (this.updateTransform(), (this.doTransform = !1));
      },
      updateShadows: function (a, h, c) {
        for (var b = this.shadows, k = b.length; k--; )
          c.call(b[k], 'height' === a ? Math.max(h - (b[k].cutHeight || 0), 0) : 'd' === a ? this.d : h, a, b[k]);
      },
      addClass: function (a, h) {
        var c = this.attr('class') || '';
        -1 === c.indexOf(a) && (h || (a = (c + (c ? ' ' : '') + a).replace('  ', ' ')), this.attr('class', a));
        return this;
      },
      hasClass: function (a) {
        return -1 !== (this.attr('class') || '').split(' ').indexOf(a);
      },
      removeClass: function (a) {
        return this.attr('class', (this.attr('class') || '').replace(a, ''));
      },
      symbolAttr: function (a) {
        var h = this;
        'x y r start end width height innerR anchorX anchorY'.split(' ').forEach(function (c) {
          h[c] = D(a[c], h[c]);
        });
        h.attr({ d: h.renderer.symbols[h.symbolName](h.x, h.y, h.width, h.height, h) });
      },
      clip: function (a) {
        return this.attr('clip-path', a ? 'url(' + this.renderer.url + '#' + a.id + ')' : 'none');
      },
      crisp: function (a, h) {
        var c;
        h = h || a.strokeWidth || 0;
        c = (Math.round(h) % 2) / 2;
        a.x = Math.floor(a.x || this.x || 0) + c;
        a.y = Math.floor(a.y || this.y || 0) + c;
        a.width = Math.floor((a.width || this.width || 0) - 2 * c);
        a.height = Math.floor((a.height || this.height || 0) - 2 * c);
        q(a.strokeWidth) && (a.strokeWidth = h);
        return a;
      },
      css: function (a) {
        var c = this.styles,
          b = {},
          k = this.element,
          z,
          d = '',
          l,
          n = !c,
          K = ['textOutline', 'textOverflow', 'width'];
        a && a.color && (a.fill = a.color);
        c &&
          x(a, function (a, h) {
            a !== c[h] && ((b[h] = a), (n = !0));
          });
        n &&
          (c && (a = r(c, b)),
          a &&
            (null === a.width || 'auto' === a.width
              ? delete this.textWidth
              : 'text' === k.nodeName.toLowerCase() && a.width && (z = this.textWidth = h(a.width))),
          (this.styles = a),
          z && !W && this.renderer.forExport && delete a.width,
          k.namespaceURI === this.SVG_NS
            ? ((l = function (a, h) {
                return '-' + h.toLowerCase();
              }),
              x(a, function (a, h) {
                -1 === K.indexOf(h) && (d += h.replace(/([A-Z])/g, l) + ':' + a + ';');
              }),
              d && g(k, 'style', d))
            : v(k, a),
          this.added &&
            ('text' === this.element.nodeName && this.renderer.buildText(this),
            a && a.textOutline && this.applyTextOutline(a.textOutline)));
        return this;
      },
      getStyle: function (a) {
        return R.getComputedStyle(this.element || this, '').getPropertyValue(a);
      },
      strokeWidth: function () {
        if (!this.renderer.styledMode) return this['stroke-width'] || 0;
        var a = this.getStyle('stroke-width'),
          c;
        a.indexOf('px') === a.length - 2
          ? (a = h(a))
          : ((c = p.createElementNS(I, 'rect')),
            g(c, { width: a, 'stroke-width': 0 }),
            this.element.parentNode.appendChild(c),
            (a = c.getBBox().width),
            c.parentNode.removeChild(c));
        return a;
      },
      on: function (a, h) {
        var c = this,
          b = c.element;
        l && 'click' === a
          ? ((b.ontouchstart = function (a) {
              c.touchEventFired = Date.now();
              a.preventDefault();
              h.call(b, a);
            }),
            (b.onclick = function (a) {
              (-1 === R.navigator.userAgent.indexOf('Android') || 1100 < Date.now() - (c.touchEventFired || 0)) &&
                h.call(b, a);
            }))
          : (b['on' + a] = h);
        return this;
      },
      setRadialReference: function (a) {
        var h = this.renderer.gradients[this.element.gradient];
        this.element.radialReference = a;
        h && h.radAttr && h.animate(this.renderer.getRadialAttr(a, h.radAttr));
        return this;
      },
      translate: function (a, h) {
        return this.attr({ translateX: a, translateY: h });
      },
      invert: function (a) {
        this.inverted = a;
        this.updateTransform();
        return this;
      },
      updateTransform: function () {
        var a = this.translateX || 0,
          h = this.translateY || 0,
          c = this.scaleX,
          b = this.scaleY,
          k = this.inverted,
          z = this.rotation,
          d = this.matrix,
          l = this.element;
        k && ((a += this.width), (h += this.height));
        a = ['translate(' + a + ',' + h + ')'];
        q(d) && a.push('matrix(' + d.join(',') + ')');
        k
          ? a.push('rotate(90) scale(-1,1)')
          : z &&
            a.push(
              'rotate(' +
                z +
                ' ' +
                D(this.rotationOriginX, l.getAttribute('x'), 0) +
                ' ' +
                D(this.rotationOriginY, l.getAttribute('y') || 0) +
                ')'
            );
        (q(c) || q(b)) && a.push('scale(' + D(c, 1) + ' ' + D(b, 1) + ')');
        a.length && l.setAttribute('transform', a.join(' '));
      },
      toFront: function () {
        var a = this.element;
        a.parentNode.appendChild(a);
        return this;
      },
      align: function (a, h, c) {
        var k,
          z,
          d,
          l,
          x = {};
        z = this.renderer;
        d = z.alignedObjects;
        var n, e;
        if (a) {
          if (((this.alignOptions = a), (this.alignByTranslate = h), !c || C(c)))
            (this.alignTo = k = c || 'renderer'), b(d, this), d.push(this), (c = null);
        } else (a = this.alignOptions), (h = this.alignByTranslate), (k = this.alignTo);
        c = D(c, z[k], z);
        k = a.align;
        z = a.verticalAlign;
        d = (c.x || 0) + (a.x || 0);
        l = (c.y || 0) + (a.y || 0);
        'right' === k ? (n = 1) : 'center' === k && (n = 2);
        n && (d += (c.width - (a.width || 0)) / n);
        x[h ? 'translateX' : 'x'] = Math.round(d);
        'bottom' === z ? (e = 1) : 'middle' === z && (e = 2);
        e && (l += (c.height - (a.height || 0)) / e);
        x[h ? 'translateY' : 'y'] = Math.round(l);
        this[this.placed ? 'animate' : 'attr'](x);
        this.placed = !0;
        this.alignAttr = x;
        return this;
      },
      getBBox: function (a, h) {
        var c,
          b = this.renderer,
          k,
          z = this.element,
          d = this.styles,
          l,
          x = this.textStr,
          n,
          e = b.cache,
          K = b.cacheKeys,
          w = z.namespaceURI === this.SVG_NS,
          p;
        h = D(h, this.rotation);
        k = h * f;
        l = b.styledMode ? z && B.prototype.getStyle.call(z, 'font-size') : d && d.fontSize;
        q(x) &&
          ((p = x.toString()),
          -1 === p.indexOf('\x3c') && (p = p.replace(/[0-9]/g, '0')),
          (p += ['', h || 0, l, this.textWidth, d && d.textOverflow].join()));
        p && !a && (c = e[p]);
        if (!c) {
          if (w || b.forExport) {
            try {
              (n =
                this.fakeTS &&
                function (a) {
                  [].forEach.call(z.querySelectorAll('.highcharts-text-outline'), function (h) {
                    h.style.display = a;
                  });
                }) && n('none'),
                (c = z.getBBox ? r({}, z.getBBox()) : { width: z.offsetWidth, height: z.offsetHeight }),
                n && n('');
            } catch (Y) {}
            if (!c || 0 > c.width) c = { width: 0, height: 0 };
          } else c = this.htmlGetBBox();
          b.isSVG &&
            ((a = c.width),
            (b = c.height),
            w && (c.height = b = { '11px,17': 14, '13px,20': 16 }[d && d.fontSize + ',' + Math.round(b)] || b),
            h &&
              ((c.width = Math.abs(b * Math.sin(k)) + Math.abs(a * Math.cos(k))),
              (c.height = Math.abs(b * Math.cos(k)) + Math.abs(a * Math.sin(k)))));
          if (p && 0 < c.height) {
            for (; 250 < K.length; ) delete e[K.shift()];
            e[p] || K.push(p);
            e[p] = c;
          }
        }
        return c;
      },
      show: function (a) {
        return this.attr({ visibility: a ? 'inherit' : 'visible' });
      },
      hide: function () {
        return this.attr({ visibility: 'hidden' });
      },
      fadeOut: function (a) {
        var h = this;
        h.animate(
          { opacity: 0 },
          {
            duration: a || 150,
            complete: function () {
              h.attr({ y: -9999 });
            },
          }
        );
      },
      add: function (a) {
        var h = this.renderer,
          c = this.element,
          b;
        a && (this.parentGroup = a);
        this.parentInverted = a && a.inverted;
        void 0 !== this.textStr && h.buildText(this);
        this.added = !0;
        if (!a || a.handleZ || this.zIndex) b = this.zIndexSetter();
        b || (a ? a.element : h.box).appendChild(c);
        if (this.onAdd) this.onAdd();
        return this;
      },
      safeRemoveChild: function (a) {
        var h = a.parentNode;
        h && h.removeChild(a);
      },
      destroy: function () {
        var a = this,
          h = a.element || {},
          c = a.renderer,
          k = c.isSVG && 'SPAN' === h.nodeName && a.parentGroup,
          z = h.ownerSVGElement,
          d = a.clipPath;
        h.onclick = h.onmouseout = h.onmouseover = h.onmousemove = h.point = null;
        J(a);
        d &&
          z &&
          ([].forEach.call(z.querySelectorAll('[clip-path],[CLIP-PATH]'), function (a) {
            var h = a.getAttribute('clip-path'),
              c = d.element.id;
            (-1 < h.indexOf('(#' + c + ')') || -1 < h.indexOf('("#' + c + '")')) && a.removeAttribute('clip-path');
          }),
          (a.clipPath = d.destroy()));
        if (a.stops) {
          for (z = 0; z < a.stops.length; z++) a.stops[z] = a.stops[z].destroy();
          a.stops = null;
        }
        a.safeRemoveChild(h);
        for (c.styledMode || a.destroyShadows(); k && k.div && 0 === k.div.childNodes.length; )
          (h = k.parentGroup), a.safeRemoveChild(k.div), delete k.div, (k = h);
        a.alignTo && b(c.alignedObjects, a);
        x(a, function (h, c) {
          delete a[c];
        });
        return null;
      },
      shadow: function (a, h, c) {
        var b = [],
          k,
          z,
          d = this.element,
          l,
          x,
          n,
          e;
        if (!a) this.destroyShadows();
        else if (!this.shadows) {
          x = D(a.width, 3);
          n = (a.opacity || 0.15) / x;
          e = this.parentInverted ? '(-1,-1)' : '(' + D(a.offsetX, 1) + ', ' + D(a.offsetY, 1) + ')';
          for (k = 1; k <= x; k++)
            (z = d.cloneNode(0)),
              (l = 2 * x + 1 - 2 * k),
              g(z, {
                stroke: a.color || '#000000',
                'stroke-opacity': n * k,
                'stroke-width': l,
                transform: 'translate' + e,
                fill: 'none',
              }),
              z.setAttribute('class', (z.getAttribute('class') || '') + ' highcharts-shadow'),
              c && (g(z, 'height', Math.max(g(z, 'height') - l, 0)), (z.cutHeight = l)),
              h ? h.element.appendChild(z) : d.parentNode && d.parentNode.insertBefore(z, d),
              b.push(z);
          this.shadows = b;
        }
        return this;
      },
      destroyShadows: function () {
        (this.shadows || []).forEach(function (a) {
          this.safeRemoveChild(a);
        }, this);
        this.shadows = void 0;
      },
      xGetter: function (a) {
        'circle' === this.element.nodeName && ('x' === a ? (a = 'cx') : 'y' === a && (a = 'cy'));
        return this._defaultGetter(a);
      },
      _defaultGetter: function (a) {
        a = D(this[a + 'Value'], this[a], this.element ? this.element.getAttribute(a) : null, 0);
        /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
        return a;
      },
      dSetter: function (a, h, c) {
        a && a.join && (a = a.join(' '));
        /(NaN| {2}|^$)/.test(a) && (a = 'M 0 0');
        this[h] !== a && (c.setAttribute(h, a), (this[h] = a));
      },
      dashstyleSetter: function (a) {
        var c,
          b = this['stroke-width'];
        'inherit' === b && (b = 1);
        if ((a = a && a.toLowerCase())) {
          a = a
            .replace('shortdashdotdot', '3,1,1,1,1,1,')
            .replace('shortdashdot', '3,1,1,1')
            .replace('shortdot', '1,1,')
            .replace('shortdash', '3,1,')
            .replace('longdash', '8,3,')
            .replace(/dot/g, '1,3,')
            .replace('dash', '4,3,')
            .replace(/,$/, '')
            .split(',');
          for (c = a.length; c--; ) a[c] = h(a[c]) * b;
          a = a.join(',').replace(/NaN/g, 'none');
          this.element.setAttribute('stroke-dasharray', a);
        }
      },
      alignSetter: function (a) {
        var h = { left: 'start', center: 'middle', right: 'end' };
        h[a] && ((this.alignValue = a), this.element.setAttribute('text-anchor', h[a]));
      },
      opacitySetter: function (a, h, c) {
        this[h] = a;
        c.setAttribute(h, a);
      },
      titleSetter: function (a) {
        var h = this.element.getElementsByTagName('title')[0];
        h || ((h = p.createElementNS(this.SVG_NS, 'title')), this.element.appendChild(h));
        h.firstChild && h.removeChild(h.firstChild);
        h.appendChild(
          p.createTextNode(
            String(D(a), '')
              .replace(/<[^>]*>/g, '')
              .replace(/&lt;/g, '\x3c')
              .replace(/&gt;/g, '\x3e')
          )
        );
      },
      textSetter: function (a) {
        a !== this.textStr && (delete this.bBox, (this.textStr = a), this.added && this.renderer.buildText(this));
      },
      fillSetter: function (a, h, c) {
        'string' === typeof a ? c.setAttribute(h, a) : a && this.complexColor(a, h, c);
      },
      visibilitySetter: function (a, h, c) {
        'inherit' === a ? c.removeAttribute(h) : this[h] !== a && c.setAttribute(h, a);
        this[h] = a;
      },
      zIndexSetter: function (a, c) {
        var b = this.renderer,
          k = this.parentGroup,
          z = (k || b).element || b.box,
          d,
          l = this.element,
          x,
          n,
          b = z === b.box;
        d = this.added;
        var e;
        q(a)
          ? (l.setAttribute('data-z-index', a), (a = +a), this[c] === a && (d = !1))
          : q(this[c]) && l.removeAttribute('data-z-index');
        this[c] = a;
        if (d) {
          (a = this.zIndex) && k && (k.handleZ = !0);
          c = z.childNodes;
          for (e = c.length - 1; 0 <= e && !x; e--)
            if (((k = c[e]), (d = k.getAttribute('data-z-index')), (n = !q(d)), k !== l))
              if (0 > a && n && !b && !e) z.insertBefore(l, c[e]), (x = !0);
              else if (h(d) <= a || (n && (!q(a) || 0 <= a))) z.insertBefore(l, c[e + 1] || null), (x = !0);
          x || (z.insertBefore(l, c[b ? 3 : 0] || null), (x = !0));
        }
        return x;
      },
      _defaultSetter: function (a, h, c) {
        c.setAttribute(h, a);
      },
    });
    B.prototype.yGetter = B.prototype.xGetter;
    B.prototype.translateXSetter = B.prototype.translateYSetter = B.prototype.rotationSetter = B.prototype.verticalAlignSetter = B.prototype.rotationOriginXSetter = B.prototype.rotationOriginYSetter = B.prototype.scaleXSetter = B.prototype.scaleYSetter = B.prototype.matrixSetter = function (
      a,
      h
    ) {
      this[h] = a;
      this.doTransform = !0;
    };
    B.prototype['stroke-widthSetter'] = B.prototype.strokeSetter = function (a, h, c) {
      this[h] = a;
      this.stroke && this['stroke-width']
        ? (B.prototype.fillSetter.call(this, this.stroke, 'stroke', c),
          c.setAttribute('stroke-width', this['stroke-width']),
          (this.hasStroke = !0))
        : 'stroke-width' === h && 0 === a && this.hasStroke && (c.removeAttribute('stroke'), (this.hasStroke = !1));
    };
    A = a.SVGRenderer = function () {
      this.init.apply(this, arguments);
    };
    r(A.prototype, {
      Element: B,
      SVG_NS: I,
      init: function (a, h, c, b, k, z, l) {
        var x;
        x = this.createElement('svg').attr({ version: '1.1', class: 'highcharts-root' });
        l || x.css(this.getStyle(b));
        b = x.element;
        a.appendChild(b);
        g(a, 'dir', 'ltr');
        -1 === a.innerHTML.indexOf('xmlns') && g(b, 'xmlns', this.SVG_NS);
        this.isSVG = !0;
        this.box = b;
        this.boxWrapper = x;
        this.alignedObjects = [];
        this.url =
          (d || F) && p.getElementsByTagName('base').length
            ? R.location.href
                .split('#')[0]
                .replace(/<[^>]*>/g, '')
                .replace(/([\('\)])/g, '\\$1')
                .replace(/ /g, '%20')
            : '';
        this.createElement('desc').add().element.appendChild(p.createTextNode('Created with Highstock 7.0.3'));
        this.defs = this.createElement('defs').add();
        this.allowHTML = z;
        this.forExport = k;
        this.styledMode = l;
        this.gradients = {};
        this.cache = {};
        this.cacheKeys = [];
        this.imgCount = 0;
        this.setSize(h, c, !1);
        var n;
        d &&
          a.getBoundingClientRect &&
          ((h = function () {
            v(a, { left: 0, top: 0 });
            n = a.getBoundingClientRect();
            v(a, { left: Math.ceil(n.left) - n.left + 'px', top: Math.ceil(n.top) - n.top + 'px' });
          }),
          h(),
          (this.unSubPixelFix = G(R, 'resize', h)));
      },
      definition: function (a) {
        function h(a, b) {
          var k;
          L(a).forEach(function (a) {
            var z = c.createElement(a.tagName),
              d = {};
            x(a, function (a, h) {
              'tagName' !== h && 'children' !== h && 'textContent' !== h && (d[h] = a);
            });
            z.attr(d);
            z.add(b || c.defs);
            a.textContent && z.element.appendChild(p.createTextNode(a.textContent));
            h(a.children || [], z);
            k = z;
          });
          return k;
        }
        var c = this;
        return h(a);
      },
      getStyle: function (a) {
        return (this.style = r(
          { fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: '12px' },
          a
        ));
      },
      setStyle: function (a) {
        this.boxWrapper.css(this.getStyle(a));
      },
      isHidden: function () {
        return !this.boxWrapper.getBBox().width;
      },
      destroy: function () {
        var a = this.defs;
        this.box = null;
        this.boxWrapper = this.boxWrapper.destroy();
        e(this.gradients || {});
        this.gradients = null;
        a && (this.defs = a.destroy());
        this.unSubPixelFix && this.unSubPixelFix();
        return (this.alignedObjects = null);
      },
      createElement: function (a) {
        var h = new this.Element();
        h.init(this, a);
        return h;
      },
      draw: k,
      getRadialAttr: function (a, h) {
        return { cx: a[0] - a[2] / 2 + h.cx * a[2], cy: a[1] - a[2] / 2 + h.cy * a[2], r: h.r * a[2] };
      },
      truncate: function (a, h, c, b, k, z, d) {
        var l = this,
          x = a.rotation,
          n,
          e = b ? 1 : 0,
          r = (c || b).length,
          f = r,
          w = [],
          I = function (a) {
            h.firstChild && h.removeChild(h.firstChild);
            a && h.appendChild(p.createTextNode(a));
          },
          q = function (z, x) {
            x = x || z;
            if (void 0 === w[x])
              if (h.getSubStringLength)
                try {
                  w[x] = k + h.getSubStringLength(0, b ? x + 1 : x);
                } catch (ea) {}
              else l.getSpanWidth && (I(d(c || b, z)), (w[x] = k + l.getSpanWidth(a, h)));
            return w[x];
          },
          D,
          J;
        a.rotation = 0;
        D = q(h.textContent.length);
        if ((J = k + D > z)) {
          for (; e <= r; )
            (f = Math.ceil((e + r) / 2)),
              b && (n = d(b, f)),
              (D = q(f, n && n.length - 1)),
              e === r ? (e = r + 1) : D > z ? (r = f - 1) : (e = f);
          0 === r ? I('') : (c && r === c.length - 1) || I(n || d(c || b, f));
        }
        b && b.splice(0, f);
        a.actualWidth = D;
        a.rotation = x;
        return J;
      },
      escapes: { '\x26': '\x26amp;', '\x3c': '\x26lt;', '\x3e': '\x26gt;', "'": '\x26#39;', '"': '\x26quot;' },
      buildText: function (a) {
        var c = a.element,
          b = this,
          k = b.forExport,
          z = D(a.textStr, '').toString(),
          d = -1 !== z.indexOf('\x3c'),
          l = c.childNodes,
          n,
          e = g(c, 'x'),
          r = a.styles,
          f = a.textWidth,
          w = r && r.lineHeight,
          q = r && r.textOutline,
          J = r && 'ellipsis' === r.textOverflow,
          L = r && 'nowrap' === r.whiteSpace,
          E = r && r.fontSize,
          K,
          C,
          F = l.length,
          r = f && !a.added && this.box,
          O = function (a) {
            var k;
            b.styledMode ||
              (k = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : E || b.style.fontSize || 12);
            return w ? h(w) : b.fontMetrics(k, a.getAttribute('style') ? a : c).h;
          },
          m = function (a, h) {
            x(b.escapes, function (c, b) {
              (h && -1 !== h.indexOf(c)) || (a = a.toString().replace(new RegExp(c, 'g'), b));
            });
            return a;
          },
          y = function (a, h) {
            var c;
            c = a.indexOf('\x3c');
            a = a.substring(c, a.indexOf('\x3e') - c);
            c = a.indexOf(h + '\x3d');
            if (-1 !== c && ((c = c + h.length + 1), (h = a.charAt(c)), '"' === h || "'" === h))
              return (a = a.substring(c + 1)), a.substring(0, a.indexOf(h));
          };
        K = [z, J, L, w, q, E, f].join();
        if (K !== a.textCache) {
          for (a.textCache = K; F--; ) c.removeChild(l[F]);
          d || q || J || f || -1 !== z.indexOf(' ')
            ? (r && r.appendChild(c),
              d
                ? ((z = b.styledMode
                    ? z
                        .replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e')
                        .replace(/<(i|em)>/g, '\x3cspan class\x3d"highcharts-emphasized"\x3e')
                    : z
                        .replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e')
                        .replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e')),
                  (z = z
                    .replace(/<a/g, '\x3cspan')
                    .replace(/<\/(b|strong|i|em|a)>/g, '\x3c/span\x3e')
                    .split(/<br.*?>/g)))
                : (z = [z]),
              (z = z.filter(function (a) {
                return '' !== a;
              })),
              z.forEach(function (h, z) {
                var d,
                  l = 0,
                  x = 0;
                h = h
                  .replace(/^\s+|\s+$/g, '')
                  .replace(/<span/g, '|||\x3cspan')
                  .replace(/<\/span>/g, '\x3c/span\x3e|||');
                d = h.split('|||');
                d.forEach(function (h) {
                  if ('' !== h || 1 === d.length) {
                    var r = {},
                      w = p.createElementNS(b.SVG_NS, 'tspan'),
                      q,
                      D;
                    (q = y(h, 'class')) && g(w, 'class', q);
                    if ((q = y(h, 'style'))) (q = q.replace(/(;| |^)color([ :])/, '$1fill$2')), g(w, 'style', q);
                    (D = y(h, 'href')) &&
                      !k &&
                      (g(w, 'onclick', 'location.href\x3d"' + D + '"'),
                      g(w, 'class', 'highcharts-anchor'),
                      b.styledMode || v(w, { cursor: 'pointer' }));
                    h = m(h.replace(/<[a-zA-Z\/](.|\n)*?>/g, '') || ' ');
                    if (' ' !== h) {
                      w.appendChild(p.createTextNode(h));
                      l ? (r.dx = 0) : z && null !== e && (r.x = e);
                      g(w, r);
                      c.appendChild(w);
                      !l && C && (!W && k && v(w, { display: 'block' }), g(w, 'dy', O(w)));
                      if (f) {
                        var K = h.replace(/([^\^])-/g, '$1- ').split(' '),
                          r = !L && (1 < d.length || z || 1 < K.length);
                        D = 0;
                        var F = O(w);
                        if (J)
                          n = b.truncate(a, w, h, void 0, 0, Math.max(0, f - parseInt(E || 12, 10)), function (a, h) {
                            return a.substring(0, h) + '\u2026';
                          });
                        else if (r)
                          for (; K.length; )
                            K.length &&
                              !L &&
                              0 < D &&
                              ((w = p.createElementNS(I, 'tspan')),
                              g(w, { dy: F, x: e }),
                              q && g(w, 'style', q),
                              w.appendChild(p.createTextNode(K.join(' ').replace(/- /g, '-'))),
                              c.appendChild(w)),
                              b.truncate(a, w, null, K, 0 === D ? x : 0, f, function (a, h) {
                                return K.slice(0, h).join(' ').replace(/- /g, '-');
                              }),
                              (x = a.actualWidth),
                              D++;
                      }
                      l++;
                    }
                  }
                });
                C = C || c.childNodes.length;
              }),
              J && n && a.attr('title', m(a.textStr, ['\x26lt;', '\x26gt;'])),
              r && r.removeChild(c),
              q && a.applyTextOutline && a.applyTextOutline(q))
            : c.appendChild(p.createTextNode(m(z)));
        }
      },
      getContrast: function (a) {
        a = u(a).rgba;
        a[0] *= 1;
        a[1] *= 1.2;
        a[2] *= 0.5;
        return 459 < a[0] + a[1] + a[2] ? '#000000' : '#FFFFFF';
      },
      button: function (a, h, b, k, z, d, l, x, n) {
        var e = this.label(a, h, b, n, null, null, null, null, 'button'),
          f = 0,
          p = this.styledMode;
        e.attr(c({ padding: 8, r: 2 }, z));
        if (!p) {
          var q, I, D, J;
          z = c(
            {
              fill: '#f7f7f7',
              stroke: '#cccccc',
              'stroke-width': 1,
              style: { color: '#333333', cursor: 'pointer', fontWeight: 'normal' },
            },
            z
          );
          q = z.style;
          delete z.style;
          d = c(z, { fill: '#e6e6e6' }, d);
          I = d.style;
          delete d.style;
          l = c(z, { fill: '#e6ebf5', style: { color: '#000000', fontWeight: 'bold' } }, l);
          D = l.style;
          delete l.style;
          x = c(z, { style: { color: '#cccccc' } }, x);
          J = x.style;
          delete x.style;
        }
        G(e.element, w ? 'mouseover' : 'mouseenter', function () {
          3 !== f && e.setState(1);
        });
        G(e.element, w ? 'mouseout' : 'mouseleave', function () {
          3 !== f && e.setState(f);
        });
        e.setState = function (a) {
          1 !== a && (e.state = f = a);
          e.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass(
            'highcharts-button-' + ['normal', 'hover', 'pressed', 'disabled'][a || 0]
          );
          p || e.attr([z, d, l, x][a || 0]).css([q, I, D, J][a || 0]);
        };
        p || e.attr(z).css(r({ cursor: 'default' }, q));
        return e.on('click', function (a) {
          3 !== f && k.call(e, a);
        });
      },
      crispLine: function (a, h) {
        a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - (h % 2) / 2);
        a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + (h % 2) / 2);
        return a;
      },
      path: function (a) {
        var h = this.styledMode ? {} : { fill: 'none' };
        n(a) ? (h.d = a) : E(a) && r(h, a);
        return this.createElement('path').attr(h);
      },
      circle: function (a, h, c) {
        a = E(a) ? a : void 0 === a ? {} : { x: a, y: h, r: c };
        h = this.createElement('circle');
        h.xSetter = h.ySetter = function (a, h, c) {
          c.setAttribute('c' + h, a);
        };
        return h.attr(a);
      },
      arc: function (a, h, c, b, k, z) {
        E(a) ? ((b = a), (h = b.y), (c = b.r), (a = b.x)) : (b = { innerR: b, start: k, end: z });
        a = this.symbol('arc', a, h, c, c, b);
        a.r = c;
        return a;
      },
      rect: function (a, h, c, b, k, z) {
        k = E(a) ? a.r : k;
        var d = this.createElement('rect');
        a = E(a) ? a : void 0 === a ? {} : { x: a, y: h, width: Math.max(c, 0), height: Math.max(b, 0) };
        this.styledMode || (void 0 !== z && ((a.strokeWidth = z), (a = d.crisp(a))), (a.fill = 'none'));
        k && (a.r = k);
        d.rSetter = function (a, h, c) {
          g(c, { rx: a, ry: a });
        };
        return d.attr(a);
      },
      setSize: function (a, h, c) {
        var b = this.alignedObjects,
          k = b.length;
        this.width = a;
        this.height = h;
        for (
          this.boxWrapper.animate(
            { width: a, height: h },
            {
              step: function () {
                this.attr({ viewBox: '0 0 ' + this.attr('width') + ' ' + this.attr('height') });
              },
              duration: D(c, !0) ? void 0 : 0,
            }
          );
          k--;

        )
          b[k].align();
      },
      g: function (a) {
        var h = this.createElement('g');
        return a ? h.attr({ class: 'highcharts-' + a }) : h;
      },
      image: function (a, h, c, b, k, z) {
        var d = { preserveAspectRatio: 'none' },
          l,
          x = function (a, h) {
            a.setAttributeNS
              ? a.setAttributeNS('http://www.w3.org/1999/xlink', 'href', h)
              : a.setAttribute('hc-svg-href', h);
          },
          n = function (h) {
            x(l.element, a);
            z.call(l, h);
          };
        1 < arguments.length && r(d, { x: h, y: c, width: b, height: k });
        l = this.createElement('image').attr(d);
        z
          ? (x(l.element, 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d'),
            (d = new R.Image()),
            G(d, 'load', n),
            (d.src = a),
            d.complete && n({}))
          : x(l.element, a);
        return l;
      },
      symbol: function (a, h, c, b, k, z) {
        var d = this,
          l,
          x = /^url\((.*?)\)$/,
          n = x.test(a),
          e = !n && (this.symbols[a] ? a : 'circle'),
          f = e && this.symbols[e],
          w = q(h) && f && f.call(this.symbols, Math.round(h), Math.round(c), b, k, z),
          I,
          J;
        f
          ? ((l = this.path(w)),
            d.styledMode || l.attr('fill', 'none'),
            r(l, { symbolName: e, x: h, y: c, width: b, height: k }),
            z && r(l, z))
          : n &&
            ((I = a.match(x)[1]),
            (l = this.image(I)),
            (l.imgwidth = D(O[I] && O[I].width, z && z.width)),
            (l.imgheight = D(O[I] && O[I].height, z && z.height)),
            (J = function () {
              l.attr({ width: l.width, height: l.height });
            }),
            ['width', 'height'].forEach(function (a) {
              l[a + 'Setter'] = function (a, h) {
                var c = {},
                  b = this['img' + h],
                  k = 'width' === h ? 'translateX' : 'translateY';
                this[h] = a;
                q(b) &&
                  (this.element && this.element.setAttribute(h, b),
                  this.alignByTranslate || ((c[k] = ((this[h] || 0) - b) / 2), this.attr(c)));
              };
            }),
            q(h) && l.attr({ x: h, y: c }),
            (l.isImg = !0),
            q(l.imgwidth) && q(l.imgheight)
              ? J()
              : (l.attr({ width: 0, height: 0 }),
                y('img', {
                  onload: function () {
                    var a = t[d.chartIndex];
                    0 === this.width && (v(this, { position: 'absolute', top: '-999em' }), p.body.appendChild(this));
                    O[I] = { width: this.width, height: this.height };
                    l.imgwidth = this.width;
                    l.imgheight = this.height;
                    l.element && J();
                    this.parentNode && this.parentNode.removeChild(this);
                    d.imgCount--;
                    if (!d.imgCount && a && a.onload) a.onload();
                  },
                  src: I,
                }),
                this.imgCount++));
        return l;
      },
      symbols: {
        circle: function (a, h, c, b) {
          return this.arc(a + c / 2, h + b / 2, c / 2, b / 2, { start: 0, end: 2 * Math.PI, open: !1 });
        },
        square: function (a, h, c, b) {
          return ['M', a, h, 'L', a + c, h, a + c, h + b, a, h + b, 'Z'];
        },
        triangle: function (a, h, c, b) {
          return ['M', a + c / 2, h, 'L', a + c, h + b, a, h + b, 'Z'];
        },
        'triangle-down': function (a, h, c, b) {
          return ['M', a, h, 'L', a + c, h, a + c / 2, h + b, 'Z'];
        },
        diamond: function (a, h, c, b) {
          return ['M', a + c / 2, h, 'L', a + c, h + b / 2, a + c / 2, h + b, a, h + b / 2, 'Z'];
        },
        arc: function (a, h, c, b, k) {
          var z = k.start,
            d = k.r || c,
            l = k.r || b || c,
            x = k.end - 0.001;
          c = k.innerR;
          b = D(k.open, 0.001 > Math.abs(k.end - k.start - 2 * Math.PI));
          var n = Math.cos(z),
            e = Math.sin(z),
            r = Math.cos(x),
            x = Math.sin(x);
          k = 0.001 > k.end - z - Math.PI ? 0 : 1;
          d = ['M', a + d * n, h + l * e, 'A', d, l, 0, k, 1, a + d * r, h + l * x];
          q(c) && d.push(b ? 'M' : 'L', a + c * r, h + c * x, 'A', c, c, 0, k, 0, a + c * n, h + c * e);
          d.push(b ? '' : 'Z');
          return d;
        },
        callout: function (a, h, c, b, k) {
          var z = Math.min((k && k.r) || 0, c, b),
            d = z + 6,
            l = k && k.anchorX;
          k = k && k.anchorY;
          var x;
          x = [
            'M',
            a + z,
            h,
            'L',
            a + c - z,
            h,
            'C',
            a + c,
            h,
            a + c,
            h,
            a + c,
            h + z,
            'L',
            a + c,
            h + b - z,
            'C',
            a + c,
            h + b,
            a + c,
            h + b,
            a + c - z,
            h + b,
            'L',
            a + z,
            h + b,
            'C',
            a,
            h + b,
            a,
            h + b,
            a,
            h + b - z,
            'L',
            a,
            h + z,
            'C',
            a,
            h,
            a,
            h,
            a + z,
            h,
          ];
          l && l > c
            ? k > h + d && k < h + b - d
              ? x.splice(13, 3, 'L', a + c, k - 6, a + c + 6, k, a + c, k + 6, a + c, h + b - z)
              : x.splice(13, 3, 'L', a + c, b / 2, l, k, a + c, b / 2, a + c, h + b - z)
            : l && 0 > l
            ? k > h + d && k < h + b - d
              ? x.splice(33, 3, 'L', a, k + 6, a - 6, k, a, k - 6, a, h + z)
              : x.splice(33, 3, 'L', a, b / 2, l, k, a, b / 2, a, h + z)
            : k && k > b && l > a + d && l < a + c - d
            ? x.splice(23, 3, 'L', l + 6, h + b, l, h + b + 6, l - 6, h + b, a + z, h + b)
            : k && 0 > k && l > a + d && l < a + c - d && x.splice(3, 3, 'L', l - 6, h, l, h - 6, l + 6, h, c - z, h);
          return x;
        },
      },
      clipRect: function (h, c, b, k) {
        var z = a.uniqueKey(),
          l = this.createElement('clipPath').attr({ id: z }).add(this.defs);
        h = this.rect(h, c, b, k, 0).add(l);
        h.id = z;
        h.clipPath = l;
        h.count = 0;
        return h;
      },
      text: function (a, h, c, b) {
        var k = {};
        if (b && (this.allowHTML || !this.forExport)) return this.html(a, h, c);
        k.x = Math.round(h || 0);
        c && (k.y = Math.round(c));
        q(a) && (k.text = a);
        a = this.createElement('text').attr(k);
        b ||
          (a.xSetter = function (a, h, c) {
            var b = c.getElementsByTagName('tspan'),
              k,
              z = c.getAttribute(h),
              l;
            for (l = 0; l < b.length; l++) (k = b[l]), k.getAttribute(h) === z && k.setAttribute(h, a);
            c.setAttribute(h, a);
          });
        return a;
      },
      fontMetrics: function (a, c) {
        a =
          (!this.styledMode && /px/.test(a)) || !R.getComputedStyle
            ? a || (c && c.style && c.style.fontSize) || (this.style && this.style.fontSize)
            : c && B.prototype.getStyle.call(c, 'font-size');
        a = /px/.test(a) ? h(a) : 12;
        c = 24 > a ? a + 3 : Math.round(1.2 * a);
        return { h: c, b: Math.round(0.8 * c), f: a };
      },
      rotCorr: function (a, h, c) {
        var b = a;
        h && c && (b = Math.max(b * Math.cos(h * f), 4));
        return { x: (-a / 3) * Math.sin(h * f), y: b };
      },
      label: function (h, b, k, l, d, x, n, e, f) {
        var w = this,
          p = w.styledMode,
          I = w.g('button' !== f && 'label'),
          D = (I.text = w.text('', 0, 0, n).attr({ zIndex: 1 })),
          J,
          L,
          E = 0,
          g = 3,
          C = 0,
          F,
          W,
          O,
          m,
          y,
          R = {},
          v,
          t,
          K = /^url\((.*?)\)$/.test(l),
          u = p || K,
          S = function () {
            return p ? (J.strokeWidth() % 2) / 2 : ((v ? parseInt(v, 10) : 0) % 2) / 2;
          },
          aa,
          A,
          T;
        f && I.addClass('highcharts-' + f);
        aa = function () {
          var a = D.element.style,
            h = {};
          L = (void 0 === F || void 0 === W || y) && q(D.textStr) && D.getBBox();
          I.width = (F || L.width || 0) + 2 * g + C;
          I.height = (W || L.height || 0) + 2 * g;
          t = g + Math.min(w.fontMetrics(a && a.fontSize, D).b, L ? L.height : Infinity);
          u &&
            (J ||
              ((I.box = J = w.symbols[l] || K ? w.symbol(l) : w.rect()),
              J.addClass(('button' === f ? '' : 'highcharts-label-box') + (f ? ' highcharts-' + f + '-box' : '')),
              J.add(I),
              (a = S()),
              (h.x = a),
              (h.y = (e ? -t : 0) + a)),
            (h.width = Math.round(I.width)),
            (h.height = Math.round(I.height)),
            J.attr(r(h, R)),
            (R = {}));
        };
        A = function () {
          var a = C + g,
            h;
          h = e ? 0 : t;
          q(F) && L && ('center' === y || 'right' === y) && (a += { center: 0.5, right: 1 }[y] * (F - L.width));
          if (a !== D.x || h !== D.y)
            D.attr('x', a), D.hasBoxWidthChanged && ((L = D.getBBox(!0)), aa()), void 0 !== h && D.attr('y', h);
          D.x = a;
          D.y = h;
        };
        T = function (a, h) {
          J ? J.attr(a, h) : (R[a] = h);
        };
        I.onAdd = function () {
          D.add(I);
          I.attr({ text: h || 0 === h ? h : '', x: b, y: k });
          J && q(d) && I.attr({ anchorX: d, anchorY: x });
        };
        I.widthSetter = function (h) {
          F = a.isNumber(h) ? h : null;
        };
        I.heightSetter = function (a) {
          W = a;
        };
        I['text-alignSetter'] = function (a) {
          y = a;
        };
        I.paddingSetter = function (a) {
          q(a) && a !== g && ((g = I.padding = a), A());
        };
        I.paddingLeftSetter = function (a) {
          q(a) && a !== C && ((C = a), A());
        };
        I.alignSetter = function (a) {
          a = { left: 0, center: 0.5, right: 1 }[a];
          a !== E && ((E = a), L && I.attr({ x: O }));
        };
        I.textSetter = function (a) {
          void 0 !== a && D.textSetter(a);
          aa();
          A();
        };
        I['stroke-widthSetter'] = function (a, h) {
          a && (u = !0);
          v = this['stroke-width'] = a;
          T(h, a);
        };
        p
          ? (I.rSetter = function (a, h) {
              T(h, a);
            })
          : (I.strokeSetter = I.fillSetter = I.rSetter = function (a, h) {
              'r' !== h && ('fill' === h && a && (u = !0), (I[h] = a));
              T(h, a);
            });
        I.anchorXSetter = function (a, h) {
          d = I.anchorX = a;
          T(h, Math.round(a) - S() - O);
        };
        I.anchorYSetter = function (a, h) {
          x = I.anchorY = a;
          T(h, a - m);
        };
        I.xSetter = function (a) {
          I.x = a;
          E && ((a -= E * ((F || L.width) + 2 * g)), (I['forceAnimate:x'] = !0));
          O = Math.round(a);
          I.attr('translateX', O);
        };
        I.ySetter = function (a) {
          m = I.y = Math.round(a);
          I.attr('translateY', m);
        };
        var P = I.css;
        n = {
          css: function (a) {
            if (a) {
              var h = {};
              a = c(a);
              I.textProps.forEach(function (c) {
                void 0 !== a[c] && ((h[c] = a[c]), delete a[c]);
              });
              D.css(h);
              'width' in h && aa();
              'fontSize' in h && (aa(), A());
            }
            return P.call(I, a);
          },
          getBBox: function () {
            return { width: L.width + 2 * g, height: L.height + 2 * g, x: L.x - g, y: L.y - g };
          },
          destroy: function () {
            z(I.element, 'mouseenter');
            z(I.element, 'mouseleave');
            D && (D = D.destroy());
            J && (J = J.destroy());
            B.prototype.destroy.call(I);
            I = w = aa = A = T = null;
          },
        };
        p ||
          (n.shadow = function (a) {
            a && (aa(), J && J.shadow(a));
            return I;
          });
        return r(I, n);
      },
    });
    a.Renderer = A;
  })(H);
  (function (a) {
    var B = a.attr,
      A = a.createElement,
      G = a.css,
      m = a.defined,
      g = a.extend,
      t = a.isFirefox,
      u = a.isMS,
      v = a.isWebKit,
      y = a.pick,
      q = a.pInt,
      f = a.SVGElement,
      e = a.SVGRenderer,
      p = a.win;
    g(f.prototype, {
      htmlCss: function (a) {
        var b = 'SPAN' === this.element.tagName && a && 'width' in a,
          l = y(b && a.width, void 0),
          n;
        b && (delete a.width, (this.textWidth = l), (n = !0));
        a && 'ellipsis' === a.textOverflow && ((a.whiteSpace = 'nowrap'), (a.overflow = 'hidden'));
        this.styles = g(this.styles, a);
        G(this.element, a);
        n && this.htmlUpdateTransform();
        return this;
      },
      htmlGetBBox: function () {
        var a = this.element;
        return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight };
      },
      htmlUpdateTransform: function () {
        if (this.added) {
          var a = this.renderer,
            b = this.element,
            l = this.translateX || 0,
            n = this.translateY || 0,
            d = this.x || 0,
            e = this.y || 0,
            f = this.textAlign || 'left',
            p = { left: 0, center: 0.5, right: 1 }[f],
            g = this.styles,
            c = g && g.whiteSpace;
          G(b, { marginLeft: l, marginTop: n });
          !a.styledMode &&
            this.shadows &&
            this.shadows.forEach(function (a) {
              G(a, { marginLeft: l + 1, marginTop: n + 1 });
            });
          this.inverted &&
            [].forEach.call(b.childNodes, function (h) {
              a.invertChild(h, b);
            });
          if ('SPAN' === b.tagName) {
            var g = this.rotation,
              k = this.textWidth && q(this.textWidth),
              x = [g, f, b.innerHTML, this.textWidth, this.textAlign].join(),
              D;
            (D = k !== this.oldTextWidth) &&
              !(D = k > this.oldTextWidth) &&
              ((D = this.textPxLength) || (G(b, { width: '', whiteSpace: c || 'nowrap' }), (D = b.offsetWidth)),
              (D = D > k));
            D && (/[ \-]/.test(b.textContent || b.innerText) || 'ellipsis' === b.style.textOverflow)
              ? (G(b, { width: k + 'px', display: 'block', whiteSpace: c || 'normal' }),
                (this.oldTextWidth = k),
                (this.hasBoxWidthChanged = !0))
              : (this.hasBoxWidthChanged = !1);
            x !== this.cTT &&
              ((c = a.fontMetrics(b.style.fontSize, b).b),
              !m(g) || (g === (this.oldRotation || 0) && f === this.oldAlign) || this.setSpanRotation(g, p, c),
              this.getSpanCorrection((!m(g) && this.textPxLength) || b.offsetWidth, c, p, g, f));
            G(b, { left: d + (this.xCorr || 0) + 'px', top: e + (this.yCorr || 0) + 'px' });
            this.cTT = x;
            this.oldRotation = g;
            this.oldAlign = f;
          }
        } else this.alignOnAdd = !0;
      },
      setSpanRotation: function (a, b, l) {
        var n = {},
          d = this.renderer.getTransformKey();
        n[d] = n.transform = 'rotate(' + a + 'deg)';
        n[d + (t ? 'Origin' : '-origin')] = n.transformOrigin = 100 * b + '% ' + l + 'px';
        G(this.element, n);
      },
      getSpanCorrection: function (a, b, l) {
        this.xCorr = -a * l;
        this.yCorr = -b;
      },
    });
    g(e.prototype, {
      getTransformKey: function () {
        return u && !/Edge/.test(p.navigator.userAgent)
          ? '-ms-transform'
          : v
          ? '-webkit-transform'
          : t
          ? 'MozTransform'
          : p.opera
          ? '-o-transform'
          : '';
      },
      html: function (e, b, l) {
        var n = this.createElement('span'),
          d = n.element,
          w = n.renderer,
          r = w.isSVG,
          p = function (a, b) {
            ['opacity', 'visibility'].forEach(function (c) {
              a[c + 'Setter'] = function (a, h, k) {
                f.prototype[c + 'Setter'].call(this, a, h, k);
                b[h] = a;
              };
            });
            a.addedSetters = !0;
          },
          q = a.charts[w.chartIndex],
          q = q && q.styledMode;
        n.textSetter = function (a) {
          a !== d.innerHTML && delete this.bBox;
          this.textStr = a;
          d.innerHTML = y(a, '');
          n.doTransform = !0;
        };
        r && p(n, n.element.style);
        n.xSetter = n.ySetter = n.alignSetter = n.rotationSetter = function (a, b) {
          'align' === b && (b = 'textAlign');
          n[b] = a;
          n.doTransform = !0;
        };
        n.afterSetters = function () {
          this.doTransform && (this.htmlUpdateTransform(), (this.doTransform = !1));
        };
        n.attr({ text: e, x: Math.round(b), y: Math.round(l) }).css({ position: 'absolute' });
        q || n.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize });
        d.style.whiteSpace = 'nowrap';
        n.css = n.htmlCss;
        r &&
          (n.add = function (a) {
            var c,
              b = w.box.parentNode,
              l = [];
            if ((this.parentGroup = a)) {
              if (((c = a.div), !c)) {
                for (; a; ) l.push(a), (a = a.parentGroup);
                l.reverse().forEach(function (a) {
                  function h(h, c) {
                    a[c] = h;
                    'translateX' === c ? (k.left = h + 'px') : (k.top = h + 'px');
                    a.doTransform = !0;
                  }
                  var k,
                    d = B(a.element, 'class');
                  d && (d = { className: d });
                  c = a.div =
                    a.div ||
                    A(
                      'div',
                      d,
                      {
                        position: 'absolute',
                        left: (a.translateX || 0) + 'px',
                        top: (a.translateY || 0) + 'px',
                        display: a.display,
                        opacity: a.opacity,
                        pointerEvents: a.styles && a.styles.pointerEvents,
                      },
                      c || b
                    );
                  k = c.style;
                  g(a, {
                    classSetter: (function (a) {
                      return function (h) {
                        this.element.setAttribute('class', h);
                        a.className = h;
                      };
                    })(c),
                    on: function () {
                      l[0].div && n.on.apply({ element: l[0].div }, arguments);
                      return a;
                    },
                    translateXSetter: h,
                    translateYSetter: h,
                  });
                  a.addedSetters || p(a, k);
                });
              }
            } else c = b;
            c.appendChild(d);
            n.added = !0;
            n.alignOnAdd && n.htmlUpdateTransform();
            return n;
          });
        return n;
      },
    });
  })(H);
  (function (a) {
    var B = a.defined,
      A = a.extend,
      G = a.merge,
      m = a.pick,
      g = a.timeUnits,
      t = a.win;
    a.Time = function (a) {
      this.update(a, !1);
    };
    a.Time.prototype = {
      defaultOptions: {},
      update: function (a) {
        var g = m(a && a.useUTC, !0),
          y = this;
        this.options = a = G(!0, this.options || {}, a);
        this.Date = a.Date || t.Date || Date;
        this.timezoneOffset = (this.useUTC = g) && a.timezoneOffset;
        this.getTimezoneOffset = this.timezoneOffsetFunction();
        (this.variableTimezone = !(g && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset
          ? ((this.get = function (a, f) {
              var e = f.getTime(),
                p = e - y.getTimezoneOffset(f);
              f.setTime(p);
              a = f['getUTC' + a]();
              f.setTime(e);
              return a;
            }),
            (this.set = function (a, f, e) {
              var p;
              if ('Milliseconds' === a || 'Seconds' === a || ('Minutes' === a && 0 === f.getTimezoneOffset() % 60))
                f['set' + a](e);
              else
                (p = y.getTimezoneOffset(f)),
                  (p = f.getTime() - p),
                  f.setTime(p),
                  f['setUTC' + a](e),
                  (a = y.getTimezoneOffset(f)),
                  (p = f.getTime() + a),
                  f.setTime(p);
            }))
          : g
          ? ((this.get = function (a, f) {
              return f['getUTC' + a]();
            }),
            (this.set = function (a, f, e) {
              return f['setUTC' + a](e);
            }))
          : ((this.get = function (a, f) {
              return f['get' + a]();
            }),
            (this.set = function (a, f, e) {
              return f['set' + a](e);
            }));
      },
      makeTime: function (g, t, y, q, f, e) {
        var p, r, b;
        this.useUTC
          ? ((p = this.Date.UTC.apply(0, arguments)),
            (r = this.getTimezoneOffset(p)),
            (p += r),
            (b = this.getTimezoneOffset(p)),
            r !== b ? (p += b - r) : r - 36e5 !== this.getTimezoneOffset(p - 36e5) || a.isSafari || (p -= 36e5))
          : (p = new this.Date(g, t, m(y, 1), m(q, 0), m(f, 0), m(e, 0)).getTime());
        return p;
      },
      timezoneOffsetFunction: function () {
        var g = this,
          m = this.options,
          y = t.moment;
        if (!this.useUTC)
          return function (a) {
            return 6e4 * new Date(a).getTimezoneOffset();
          };
        if (m.timezone) {
          if (y)
            return function (a) {
              return 6e4 * -y.tz(a, m.timezone).utcOffset();
            };
          a.error(25);
        }
        return this.useUTC && m.getTimezoneOffset
          ? function (a) {
              return 6e4 * m.getTimezoneOffset(a);
            }
          : function () {
              return 6e4 * (g.timezoneOffset || 0);
            };
      },
      dateFormat: function (g, m, y) {
        if (!a.defined(m) || isNaN(m)) return a.defaultOptions.lang.invalidDate || '';
        g = a.pick(g, '%Y-%m-%d %H:%M:%S');
        var q = this,
          f = new this.Date(m),
          e = this.get('Hours', f),
          p = this.get('Day', f),
          r = this.get('Date', f),
          b = this.get('Month', f),
          l = this.get('FullYear', f),
          n = a.defaultOptions.lang,
          d = n.weekdays,
          w = n.shortWeekdays,
          E = a.pad,
          f = a.extend(
            {
              a: w ? w[p] : d[p].substr(0, 3),
              A: d[p],
              d: E(r),
              e: E(r, 2, ' '),
              w: p,
              b: n.shortMonths[b],
              B: n.months[b],
              m: E(b + 1),
              o: b + 1,
              y: l.toString().substr(2, 2),
              Y: l,
              H: E(e),
              k: e,
              I: E(e % 12 || 12),
              l: e % 12 || 12,
              M: E(q.get('Minutes', f)),
              p: 12 > e ? 'AM' : 'PM',
              P: 12 > e ? 'am' : 'pm',
              S: E(f.getSeconds()),
              L: E(Math.floor(m % 1e3), 3),
            },
            a.dateFormats
          );
        a.objectEach(f, function (a, b) {
          for (; -1 !== g.indexOf('%' + b); ) g = g.replace('%' + b, 'function' === typeof a ? a.call(q, m) : a);
        });
        return y ? g.substr(0, 1).toUpperCase() + g.substr(1) : g;
      },
      resolveDTLFormat: function (g) {
        return a.isObject(g, !0) ? g : ((g = a.splat(g)), { main: g[0], from: g[1], to: g[2] });
      },
      getTimeTicks: function (a, t, y, q) {
        var f = this,
          e = [],
          p,
          r = {},
          b;
        p = new f.Date(t);
        var l = a.unitRange,
          n = a.count || 1,
          d;
        q = m(q, 1);
        if (B(t)) {
          f.set('Milliseconds', p, l >= g.second ? 0 : n * Math.floor(f.get('Milliseconds', p) / n));
          l >= g.second && f.set('Seconds', p, l >= g.minute ? 0 : n * Math.floor(f.get('Seconds', p) / n));
          l >= g.minute && f.set('Minutes', p, l >= g.hour ? 0 : n * Math.floor(f.get('Minutes', p) / n));
          l >= g.hour && f.set('Hours', p, l >= g.day ? 0 : n * Math.floor(f.get('Hours', p) / n));
          l >= g.day && f.set('Date', p, l >= g.month ? 1 : Math.max(1, n * Math.floor(f.get('Date', p) / n)));
          l >= g.month &&
            (f.set('Month', p, l >= g.year ? 0 : n * Math.floor(f.get('Month', p) / n)), (b = f.get('FullYear', p)));
          l >= g.year && f.set('FullYear', p, b - (b % n));
          l === g.week && ((b = f.get('Day', p)), f.set('Date', p, f.get('Date', p) - b + q + (b < q ? -7 : 0)));
          b = f.get('FullYear', p);
          q = f.get('Month', p);
          var w = f.get('Date', p),
            E = f.get('Hours', p);
          t = p.getTime();
          f.variableTimezone && (d = y - t > 4 * g.month || f.getTimezoneOffset(t) !== f.getTimezoneOffset(y));
          t = p.getTime();
          for (p = 1; t < y; )
            e.push(t),
              (t =
                l === g.year
                  ? f.makeTime(b + p * n, 0)
                  : l === g.month
                  ? f.makeTime(b, q + p * n)
                  : !d || (l !== g.day && l !== g.week)
                  ? d && l === g.hour && 1 < n
                    ? f.makeTime(b, q, w, E + p * n)
                    : t + l * n
                  : f.makeTime(b, q, w + p * n * (l === g.day ? 1 : 7))),
              p++;
          e.push(t);
          l <= g.hour &&
            1e4 > e.length &&
            e.forEach(function (a) {
              0 === a % 18e5 && '000000000' === f.dateFormat('%H%M%S%L', a) && (r[a] = 'day');
            });
        }
        e.info = A(a, { higherRanks: r, totalRange: l * n });
        return e;
      },
    };
  })(H);
  (function (a) {
    var B = a.color,
      A = a.merge;
    a.defaultOptions = {
      colors: '#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1'.split(' '),
      symbols: ['circle', 'diamond', 'square', 'triangle', 'triangle-down'],
      lang: {
        loading: 'Loading...',
        months: 'January February March April May June July August September October November December'.split(' '),
        shortMonths: 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' '),
        weekdays: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
        decimalPoint: '.',
        numericSymbols: 'kMGTPE'.split(''),
        resetZoom: 'Reset zoom',
        resetZoomTitle: 'Reset zoom level 1:1',
        thousandsSep: ' ',
      },
      global: {},
      time: a.Time.prototype.defaultOptions,
      chart: {
        styledMode: !1,
        borderRadius: 0,
        colorCount: 10,
        defaultSeriesType: 'line',
        ignoreHiddenSeries: !0,
        spacing: [10, 10, 15, 10],
        resetZoomButton: { theme: { zIndex: 6 }, position: { align: 'right', x: -10, y: 10 } },
        width: null,
        height: null,
        borderColor: '#335cad',
        backgroundColor: '#ffffff',
        plotBorderColor: '#cccccc',
      },
      title: { text: 'Chart title', align: 'center', margin: 15, widthAdjust: -44 },
      subtitle: { text: '', align: 'center', widthAdjust: -44 },
      plotOptions: {},
      labels: { style: { position: 'absolute', color: '#333333' } },
      legend: {
        enabled: !0,
        align: 'center',
        alignColumns: !0,
        layout: 'horizontal',
        labelFormatter: function () {
          return this.name;
        },
        borderColor: '#999999',
        borderRadius: 0,
        navigation: { activeColor: '#003399', inactiveColor: '#cccccc' },
        itemStyle: {
          color: '#333333',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          textOverflow: 'ellipsis',
        },
        itemHoverStyle: { color: '#000000' },
        itemHiddenStyle: { color: '#cccccc' },
        shadow: !1,
        itemCheckboxStyle: { position: 'absolute', width: '13px', height: '13px' },
        squareSymbol: !0,
        symbolPadding: 5,
        verticalAlign: 'bottom',
        x: 0,
        y: 0,
        title: { style: { fontWeight: 'bold' } },
      },
      loading: {
        labelStyle: { fontWeight: 'bold', position: 'relative', top: '45%' },
        style: { position: 'absolute', backgroundColor: '#ffffff', opacity: 0.5, textAlign: 'center' },
      },
      tooltip: {
        enabled: !0,
        animation: a.svg,
        borderRadius: 3,
        dateTimeLabelFormats: {
          millisecond: '%A, %b %e, %H:%M:%S.%L',
          second: '%A, %b %e, %H:%M:%S',
          minute: '%A, %b %e, %H:%M',
          hour: '%A, %b %e, %H:%M',
          day: '%A, %b %e, %Y',
          week: 'Week from %A, %b %e, %Y',
          month: '%B %Y',
          year: '%Y',
        },
        footerFormat: '',
        padding: 8,
        snap: a.isTouchDevice ? 25 : 10,
        headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
        pointFormat:
          '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
        backgroundColor: B('#f7f7f7').setOpacity(0.85).get(),
        borderWidth: 1,
        shadow: !0,
        style: { color: '#333333', cursor: 'default', fontSize: '12px', pointerEvents: 'none', whiteSpace: 'nowrap' },
      },
      credits: {
        enabled: !0,
        href: 'https://www.highcharts.com?credits',
        position: { align: 'right', x: -10, verticalAlign: 'bottom', y: -5 },
        style: { cursor: 'pointer', color: '#999999', fontSize: '9px' },
        text: 'Highcharts.com',
      },
    };
    a.setOptions = function (B) {
      a.defaultOptions = A(!0, a.defaultOptions, B);
      a.time.update(A(a.defaultOptions.global, a.defaultOptions.time), !1);
      return a.defaultOptions;
    };
    a.getOptions = function () {
      return a.defaultOptions;
    };
    a.defaultPlotOptions = a.defaultOptions.plotOptions;
    a.time = new a.Time(A(a.defaultOptions.global, a.defaultOptions.time));
    a.dateFormat = function (A, m, g) {
      return a.time.dateFormat(A, m, g);
    };
  })(H);
  (function (a) {
    var B = a.correctFloat,
      A = a.defined,
      G = a.destroyObjectProperties,
      m = a.fireEvent,
      g = a.isNumber,
      t = a.merge,
      u = a.pick,
      v = a.deg2rad;
    a.Tick = function (a, q, f, e, p) {
      this.axis = a;
      this.pos = q;
      this.type = f || '';
      this.isNewLabel = this.isNew = !0;
      this.parameters = p || {};
      this.tickmarkOffset = this.parameters.tickmarkOffset;
      this.options = this.parameters.options;
      f || e || this.addLabel();
    };
    a.Tick.prototype = {
      addLabel: function () {
        var g = this,
          q = g.axis,
          f = q.options,
          e = q.chart,
          p = q.categories,
          r = q.names,
          b = g.pos,
          l = u(g.options && g.options.labels, f.labels),
          n = q.tickPositions,
          d = b === n[0],
          w = b === n[n.length - 1],
          p = this.parameters.category || (p ? u(p[b], r[b], b) : b),
          E = g.label,
          n = n.info,
          C,
          F,
          c,
          k;
        q.isDatetimeAxis &&
          n &&
          ((F = e.time.resolveDTLFormat(f.dateTimeLabelFormats[(!f.grid && n.higherRanks[b]) || n.unitName])),
          (C = F.main));
        g.isFirst = d;
        g.isLast = w;
        g.formatCtx = {
          axis: q,
          chart: e,
          isFirst: d,
          isLast: w,
          dateTimeLabelFormat: C,
          tickPositionInfo: n,
          value: q.isLog ? B(q.lin2log(p)) : p,
          pos: b,
        };
        f = q.labelFormatter.call(g.formatCtx, this.formatCtx);
        if ((k = F && F.list))
          g.shortenLabel = function () {
            for (c = 0; c < k.length; c++)
              if (
                (E.attr({ text: q.labelFormatter.call(a.extend(g.formatCtx, { dateTimeLabelFormat: k[c] })) }),
                E.getBBox().width < q.getSlotWidth(g) - 2 * u(l.padding, 5))
              )
                return;
            E.attr({ text: '' });
          };
        if (A(E))
          E &&
            E.textStr !== f &&
            (!E.textWidth || (l.style && l.style.width) || E.styles.width || E.css({ width: null }),
            E.attr({ text: f }));
        else {
          if ((g.label = E = A(f) && l.enabled ? e.renderer.text(f, 0, 0, l.useHTML).add(q.labelGroup) : null))
            e.styledMode || E.css(t(l.style)), (E.textPxLength = E.getBBox().width);
          g.rotation = 0;
        }
      },
      getLabelSize: function () {
        return this.label ? this.label.getBBox()[this.axis.horiz ? 'height' : 'width'] : 0;
      },
      handleOverflow: function (a) {
        var q = this.axis,
          f = q.options.labels,
          e = a.x,
          p = q.chart.chartWidth,
          r = q.chart.spacing,
          b = u(q.labelLeft, Math.min(q.pos, r[3])),
          r = u(q.labelRight, Math.max(q.isRadial ? 0 : q.pos + q.len, p - r[1])),
          l = this.label,
          n = this.rotation,
          d = { left: 0, center: 0.5, right: 1 }[q.labelAlign || l.attr('align')],
          w = l.getBBox().width,
          g = q.getSlotWidth(this),
          C = g,
          F = 1,
          c,
          k = {};
        if (n || 'justify' !== u(f.overflow, 'justify'))
          0 > n && e - d * w < b
            ? (c = Math.round(e / Math.cos(n * v) - b))
            : 0 < n && e + d * w > r && (c = Math.round((p - e) / Math.cos(n * v)));
        else if (
          ((p = e + (1 - d) * w),
          e - d * w < b ? (C = a.x + C * (1 - d) - b) : p > r && ((C = r - a.x + C * d), (F = -1)),
          (C = Math.min(g, C)),
          C < g && 'center' === q.labelAlign && (a.x += F * (g - C - d * (g - Math.min(w, C)))),
          w > C || (q.autoRotation && (l.styles || {}).width))
        )
          c = C;
        c &&
          (this.shortenLabel
            ? this.shortenLabel()
            : ((k.width = Math.floor(c)), (f.style || {}).textOverflow || (k.textOverflow = 'ellipsis'), l.css(k)));
      },
      getPosition: function (g, q, f, e) {
        var p = this.axis,
          r = p.chart,
          b = (e && r.oldChartHeight) || r.chartHeight;
        g = {
          x: g
            ? a.correctFloat(p.translate(q + f, null, null, e) + p.transB)
            : p.left + p.offset + (p.opposite ? ((e && r.oldChartWidth) || r.chartWidth) - p.right - p.left : 0),
          y: g
            ? b - p.bottom + p.offset - (p.opposite ? p.height : 0)
            : a.correctFloat(b - p.translate(q + f, null, null, e) - p.transB),
        };
        m(this, 'afterGetPosition', { pos: g });
        return g;
      },
      getLabelPosition: function (a, q, f, e, p, r, b, l) {
        var n = this.axis,
          d = n.transA,
          w = n.reversed,
          g = n.staggerLines,
          C = n.tickRotCorr || { x: 0, y: 0 },
          F = p.y,
          c = e || n.reserveSpaceDefault ? 0 : -n.labelOffset * ('center' === n.labelAlign ? 0.5 : 1),
          k = {};
        A(F) ||
          (F =
            0 === n.side
              ? f.rotation
                ? -8
                : -f.getBBox().height
              : 2 === n.side
              ? C.y + 8
              : Math.cos(f.rotation * v) * (C.y - f.getBBox(!1, 0).height / 2));
        a = a + p.x + c + C.x - (r && e ? r * d * (w ? -1 : 1) : 0);
        q = q + F - (r && !e ? r * d * (w ? 1 : -1) : 0);
        g && ((f = (b / (l || 1)) % g), n.opposite && (f = g - f - 1), (q += (n.labelOffset / g) * f));
        k.x = a;
        k.y = Math.round(q);
        m(this, 'afterGetLabelPosition', { pos: k, tickmarkOffset: r, index: b });
        return k;
      },
      getMarkPath: function (a, q, f, e, p, r) {
        return r.crispLine(['M', a, q, 'L', a + (p ? 0 : -f), q + (p ? f : 0)], e);
      },
      renderGridLine: function (a, q, f) {
        var e = this.axis,
          p = e.options,
          r = this.gridLine,
          b = {},
          l = this.pos,
          n = this.type,
          d = u(this.tickmarkOffset, e.tickmarkOffset),
          w = e.chart.renderer,
          g = n ? n + 'Grid' : 'grid',
          C = p[g + 'LineWidth'],
          F = p[g + 'LineColor'],
          p = p[g + 'LineDashStyle'];
        r ||
          (e.chart.styledMode || ((b.stroke = F), (b['stroke-width'] = C), p && (b.dashstyle = p)),
          n || (b.zIndex = 1),
          a && (q = 0),
          (this.gridLine = r = w
            .path()
            .attr(b)
            .addClass('highcharts-' + (n ? n + '-' : '') + 'grid-line')
            .add(e.gridGroup)));
        if (r && (f = e.getPlotLinePath(l + d, r.strokeWidth() * f, a, 'pass')))
          r[a || this.isNew ? 'attr' : 'animate']({ d: f, opacity: q });
      },
      renderMark: function (a, q, f) {
        var e = this.axis,
          p = e.options,
          r = e.chart.renderer,
          b = this.type,
          l = b ? b + 'Tick' : 'tick',
          n = e.tickSize(l),
          d = this.mark,
          w = !d,
          g = a.x;
        a = a.y;
        var C = u(p[l + 'Width'], !b && e.isXAxis ? 1 : 0),
          p = p[l + 'Color'];
        n &&
          (e.opposite && (n[0] = -n[0]),
          w &&
            ((this.mark = d = r
              .path()
              .addClass('highcharts-' + (b ? b + '-' : '') + 'tick')
              .add(e.axisGroup)),
            e.chart.styledMode || d.attr({ stroke: p, 'stroke-width': C })),
          d[w ? 'attr' : 'animate']({ d: this.getMarkPath(g, a, n[0], d.strokeWidth() * f, e.horiz, r), opacity: q }));
      },
      renderLabel: function (a, q, f, e) {
        var p = this.axis,
          r = p.horiz,
          b = p.options,
          l = this.label,
          n = b.labels,
          d = n.step,
          p = u(this.tickmarkOffset, p.tickmarkOffset),
          w = !0,
          E = a.x;
        a = a.y;
        l &&
          g(E) &&
          ((l.xy = a = this.getLabelPosition(E, a, l, r, n, p, e, d)),
          (this.isFirst && !this.isLast && !u(b.showFirstLabel, 1)) ||
          (this.isLast && !this.isFirst && !u(b.showLastLabel, 1))
            ? (w = !1)
            : !r || n.step || n.rotation || q || 0 === f || this.handleOverflow(a),
          d && e % d && (w = !1),
          w && g(a.y)
            ? ((a.opacity = f), l[this.isNewLabel ? 'attr' : 'animate'](a), (this.isNewLabel = !1))
            : (l.attr('y', -9999), (this.isNewLabel = !0)));
      },
      render: function (g, q, f) {
        var e = this.axis,
          p = e.horiz,
          r = this.pos,
          b = u(this.tickmarkOffset, e.tickmarkOffset),
          r = this.getPosition(p, r, b, q),
          b = r.x,
          l = r.y,
          e = (p && b === e.pos + e.len) || (!p && l === e.pos) ? -1 : 1;
        f = u(f, 1);
        this.isActive = !0;
        this.renderGridLine(q, f, e);
        this.renderMark(r, f, e);
        this.renderLabel(r, q, f, g);
        this.isNew = !1;
        a.fireEvent(this, 'afterRender');
      },
      destroy: function () {
        G(this, this.axis);
      },
    };
  })(H);
  var da = (function (a) {
    var B = a.addEvent,
      A = a.animObject,
      G = a.arrayMax,
      m = a.arrayMin,
      g = a.color,
      t = a.correctFloat,
      u = a.defaultOptions,
      v = a.defined,
      y = a.deg2rad,
      q = a.destroyObjectProperties,
      f = a.extend,
      e = a.fireEvent,
      p = a.format,
      r = a.getMagnitude,
      b = a.isArray,
      l = a.isNumber,
      n = a.isString,
      d = a.merge,
      w = a.normalizeTickInterval,
      E = a.objectEach,
      C = a.pick,
      F = a.removeEvent,
      c = a.splat,
      k = a.syncTimeout,
      x = a.Tick,
      D = function () {
        this.init.apply(this, arguments);
      };
    a.extend(D.prototype, {
      defaultOptions: {
        dateTimeLabelFormats: {
          millisecond: { main: '%H:%M:%S.%L', range: !1 },
          second: { main: '%H:%M:%S', range: !1 },
          minute: { main: '%H:%M', range: !1 },
          hour: { main: '%H:%M', range: !1 },
          day: { main: '%e. %b' },
          week: { main: '%e. %b' },
          month: { main: "%b '%y" },
          year: { main: '%Y' },
        },
        endOnTick: !1,
        labels: {
          enabled: !0,
          indentation: 10,
          x: 0,
          style: { color: '#666666', cursor: 'default', fontSize: '11px' },
        },
        maxPadding: 0.01,
        minorTickLength: 2,
        minorTickPosition: 'outside',
        minPadding: 0.01,
        startOfWeek: 1,
        startOnTick: !1,
        tickLength: 10,
        tickPixelInterval: 100,
        tickmarkPlacement: 'between',
        tickPosition: 'outside',
        title: { align: 'middle', style: { color: '#666666' } },
        type: 'linear',
        minorGridLineColor: '#f2f2f2',
        minorGridLineWidth: 1,
        minorTickColor: '#999999',
        lineColor: '#ccd6eb',
        lineWidth: 1,
        gridLineColor: '#e6e6e6',
        tickColor: '#ccd6eb',
      },
      defaultYAxisOptions: {
        endOnTick: !0,
        maxPadding: 0.05,
        minPadding: 0.05,
        tickPixelInterval: 72,
        showLastLabel: !0,
        labels: { x: -8 },
        startOnTick: !0,
        title: { rotation: 270, text: 'Values' },
        stackLabels: {
          allowOverlap: !1,
          enabled: !1,
          formatter: function () {
            return a.numberFormat(this.total, -1);
          },
          style: { color: '#000000', fontSize: '11px', fontWeight: 'bold', textOutline: '1px contrast' },
        },
        gridLineWidth: 1,
        lineWidth: 0,
      },
      defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270 } },
      defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90 } },
      defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } },
      defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } },
      init: function (a, b) {
        var h = b.isX,
          k = this;
        k.chart = a;
        k.horiz = a.inverted && !k.isZAxis ? !h : h;
        k.isXAxis = h;
        k.coll = k.coll || (h ? 'xAxis' : 'yAxis');
        e(this, 'init', { userOptions: b });
        k.opposite = b.opposite;
        k.side = b.side || (k.horiz ? (k.opposite ? 0 : 2) : k.opposite ? 1 : 3);
        k.setOptions(b);
        var z = this.options,
          l = z.type;
        k.labelFormatter = z.labels.formatter || k.defaultLabelFormatter;
        k.userOptions = b;
        k.minPixelPadding = 0;
        k.reversed = z.reversed;
        k.visible = !1 !== z.visible;
        k.zoomEnabled = !1 !== z.zoomEnabled;
        k.hasNames = 'category' === l || !0 === z.categories;
        k.categories = z.categories || k.hasNames;
        k.names || ((k.names = []), (k.names.keys = {}));
        k.plotLinesAndBandsGroups = {};
        k.isLog = 'logarithmic' === l;
        k.isDatetimeAxis = 'datetime' === l;
        k.positiveValuesOnly = k.isLog && !k.allowNegativeLog;
        k.isLinked = v(z.linkedTo);
        k.ticks = {};
        k.labelEdge = [];
        k.minorTicks = {};
        k.plotLinesAndBands = [];
        k.alternateBands = {};
        k.len = 0;
        k.minRange = k.userMinRange = z.minRange || z.maxZoom;
        k.range = z.range;
        k.offset = z.offset || 0;
        k.stacks = {};
        k.oldStacks = {};
        k.stacksTouched = 0;
        k.max = null;
        k.min = null;
        k.crosshair = C(z.crosshair, c(a.options.tooltip.crosshairs)[h ? 0 : 1], !1);
        b = k.options.events;
        -1 === a.axes.indexOf(k) && (h ? a.axes.splice(a.xAxis.length, 0, k) : a.axes.push(k), a[k.coll].push(k));
        k.series = k.series || [];
        a.inverted && !k.isZAxis && h && void 0 === k.reversed && (k.reversed = !0);
        E(b, function (a, h) {
          B(k, h, a);
        });
        k.lin2log = z.linearToLogConverter || k.lin2log;
        k.isLog && ((k.val2lin = k.log2lin), (k.lin2val = k.lin2log));
        e(this, 'afterInit');
      },
      setOptions: function (a) {
        this.options = d(
          this.defaultOptions,
          'yAxis' === this.coll && this.defaultYAxisOptions,
          [
            this.defaultTopAxisOptions,
            this.defaultRightAxisOptions,
            this.defaultBottomAxisOptions,
            this.defaultLeftAxisOptions,
          ][this.side],
          d(u[this.coll], a)
        );
        e(this, 'afterSetOptions', { userOptions: a });
      },
      defaultLabelFormatter: function () {
        var h = this.axis,
          c = this.value,
          b = h.chart.time,
          k = h.categories,
          l = this.dateTimeLabelFormat,
          d = u.lang,
          x = d.numericSymbols,
          d = d.numericSymbolMagnitude || 1e3,
          n = x && x.length,
          e,
          f = h.options.labels.format,
          h = h.isLog ? Math.abs(c) : h.tickInterval;
        if (f) e = p(f, this, b);
        else if (k) e = c;
        else if (l) e = b.dateFormat(l, c);
        else if (n && 1e3 <= h)
          for (; n-- && void 0 === e; )
            (b = Math.pow(d, n + 1)),
              h >= b && 0 === (10 * c) % b && null !== x[n] && 0 !== c && (e = a.numberFormat(c / b, -1) + x[n]);
        void 0 === e && (e = 1e4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ''));
        return e;
      },
      getSeriesExtremes: function () {
        var a = this,
          c = a.chart;
        e(this, 'getSeriesExtremes', null, function () {
          a.hasVisibleSeries = !1;
          a.dataMin = a.dataMax = a.threshold = null;
          a.softThreshold = !a.isXAxis;
          a.buildStacks && a.buildStacks();
          a.series.forEach(function (h) {
            if (h.visible || !c.options.chart.ignoreHiddenSeries) {
              var b = h.options,
                k = b.threshold,
                z;
              a.hasVisibleSeries = !0;
              a.positiveValuesOnly && 0 >= k && (k = null);
              if (a.isXAxis)
                (b = h.xData),
                  b.length &&
                    ((h = m(b)),
                    (z = G(b)),
                    l(h) || h instanceof Date || ((b = b.filter(l)), (h = m(b)), (z = G(b))),
                    b.length &&
                      ((a.dataMin = Math.min(C(a.dataMin, b[0], h), h)),
                      (a.dataMax = Math.max(C(a.dataMax, b[0], z), z))));
              else if (
                (h.getExtremes(),
                (z = h.dataMax),
                (h = h.dataMin),
                v(h) &&
                  v(z) &&
                  ((a.dataMin = Math.min(C(a.dataMin, h), h)), (a.dataMax = Math.max(C(a.dataMax, z), z))),
                v(k) && (a.threshold = k),
                !b.softThreshold || a.positiveValuesOnly)
              )
                a.softThreshold = !1;
            }
          });
        });
        e(this, 'afterGetSeriesExtremes');
      },
      translate: function (a, c, b, k, d, x) {
        var h = this.linkedParent || this,
          z = 1,
          n = 0,
          e = k ? h.oldTransA : h.transA;
        k = k ? h.oldMin : h.min;
        var f = h.minPixelPadding;
        d = (h.isOrdinal || h.isBroken || (h.isLog && d)) && h.lin2val;
        e || (e = h.transA);
        b && ((z *= -1), (n = h.len));
        h.reversed && ((z *= -1), (n -= z * (h.sector || h.len)));
        c
          ? ((a = (a * z + n - f) / e + k), d && (a = h.lin2val(a)))
          : (d && (a = h.val2lin(a)), (a = l(k) ? z * (a - k) * e + n + z * f + (l(x) ? e * x : 0) : void 0));
        return a;
      },
      toPixels: function (a, c) {
        return this.translate(a, !1, !this.horiz, null, !0) + (c ? 0 : this.pos);
      },
      toValue: function (a, c) {
        return this.translate(a - (c ? 0 : this.pos), !0, !this.horiz, null, !0);
      },
      getPlotLinePath: function (a, c, b, k, d) {
        var h = this,
          z = h.chart,
          x = h.left,
          n = h.top,
          f,
          w,
          r,
          p,
          D = (b && z.oldChartHeight) || z.chartHeight,
          q = (b && z.oldChartWidth) || z.chartWidth,
          g,
          L = h.transB,
          E,
          J = function (a, h, c) {
            if (('pass' !== k && a < h) || a > c) k ? (a = Math.min(Math.max(h, a), c)) : (g = !0);
            return a;
          };
        E = { value: a, lineWidth: c, old: b, force: k, translatedValue: d };
        e(this, 'getPlotLinePath', E, function (e) {
          d = C(d, h.translate(a, null, null, b));
          d = Math.min(Math.max(-1e5, d), 1e5);
          f = r = Math.round(d + L);
          w = p = Math.round(D - d - L);
          l(d)
            ? h.horiz
              ? ((w = n), (p = D - h.bottom), (f = r = J(f, x, x + h.width)))
              : ((f = x), (r = q - h.right), (w = p = J(w, n, n + h.height)))
            : ((g = !0), (k = !1));
          e.path = g && !k ? null : z.renderer.crispLine(['M', f, w, 'L', r, p], c || 1);
        });
        return E.path;
      },
      getLinearTickPositions: function (a, c, b) {
        var h,
          k = t(Math.floor(c / a) * a);
        b = t(Math.ceil(b / a) * a);
        var z = [],
          d;
        t(k + a) === k && (d = 20);
        if (this.single) return [c];
        for (c = k; c <= b; ) {
          z.push(c);
          c = t(c + a, d);
          if (c === h) break;
          h = c;
        }
        return z;
      },
      getMinorTickInterval: function () {
        var a = this.options;
        return !0 === a.minorTicks ? C(a.minorTickInterval, 'auto') : !1 === a.minorTicks ? null : a.minorTickInterval;
      },
      getMinorTickPositions: function () {
        var a = this,
          c = a.options,
          b = a.tickPositions,
          k = a.minorTickInterval,
          d = [],
          l = a.pointRangePadding || 0,
          x = a.min - l,
          l = a.max + l,
          n = l - x;
        if (n && n / k < a.len / 3)
          if (a.isLog)
            this.paddedTicks.forEach(function (h, c, b) {
              c && d.push.apply(d, a.getLogTickPositions(k, b[c - 1], b[c], !0));
            });
          else if (a.isDatetimeAxis && 'auto' === this.getMinorTickInterval())
            d = d.concat(a.getTimeTicks(a.normalizeTimeTickInterval(k), x, l, c.startOfWeek));
          else for (c = x + ((b[0] - x) % k); c <= l && c !== d[0]; c += k) d.push(c);
        0 !== d.length && a.trimTicks(d);
        return d;
      },
      adjustForMinRange: function () {
        var a = this.options,
          c = this.min,
          b = this.max,
          k,
          d,
          l,
          x,
          n,
          e,
          f,
          w;
        this.isXAxis &&
          void 0 === this.minRange &&
          !this.isLog &&
          (v(a.min) || v(a.max)
            ? (this.minRange = null)
            : (this.series.forEach(function (a) {
                e = a.xData;
                for (x = f = a.xIncrement ? 1 : e.length - 1; 0 < x; x--)
                  if (((n = e[x] - e[x - 1]), void 0 === l || n < l)) l = n;
              }),
              (this.minRange = Math.min(5 * l, this.dataMax - this.dataMin))));
        b - c < this.minRange &&
          ((d = this.dataMax - this.dataMin >= this.minRange),
          (w = this.minRange),
          (k = (w - b + c) / 2),
          (k = [c - k, C(a.min, c - k)]),
          d && (k[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin),
          (c = G(k)),
          (b = [c + w, C(a.max, c + w)]),
          d && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax),
          (b = m(b)),
          b - c < w && ((k[0] = b - w), (k[1] = C(a.min, b - w)), (c = G(k))));
        this.min = c;
        this.max = b;
      },
      getClosest: function () {
        var a;
        this.categories
          ? (a = 1)
          : this.series.forEach(function (h) {
              var c = h.closestPointRange,
                b = h.visible || !h.chart.options.chart.ignoreHiddenSeries;
              !h.noSharedTooltip && v(c) && b && (a = v(a) ? Math.min(a, c) : c);
            });
        return a;
      },
      nameToX: function (a) {
        var h = b(this.categories),
          c = h ? this.categories : this.names,
          k = a.options.x,
          d;
        a.series.requireSorting = !1;
        v(k) ||
          (k =
            !1 === this.options.uniqueNames ? a.series.autoIncrement() : h ? c.indexOf(a.name) : C(c.keys[a.name], -1));
        -1 === k ? h || (d = c.length) : (d = k);
        void 0 !== d && ((this.names[d] = a.name), (this.names.keys[a.name] = d));
        return d;
      },
      updateNames: function () {
        var a = this,
          c = this.names;
        0 < c.length &&
          (Object.keys(c.keys).forEach(function (a) {
            delete c.keys[a];
          }),
          (c.length = 0),
          (this.minRange = this.userMinRange),
          (this.series || []).forEach(function (h) {
            h.xIncrement = null;
            if (!h.points || h.isDirtyData)
              (a.max = Math.max(a.max, h.xData.length - 1)), h.processData(), h.generatePoints();
            h.data.forEach(function (c, b) {
              var k;
              c &&
                c.options &&
                void 0 !== c.name &&
                ((k = a.nameToX(c)), void 0 !== k && k !== c.x && ((c.x = k), (h.xData[b] = k)));
            });
          }));
      },
      setAxisTranslation: function (a) {
        var h = this,
          c = h.max - h.min,
          b = h.axisPointRange || 0,
          k,
          d = 0,
          l = 0,
          x = h.linkedParent,
          f = !!h.categories,
          w = h.transA,
          r = h.isXAxis;
        if (r || f || b)
          (k = h.getClosest()),
            x
              ? ((d = x.minPointOffset), (l = x.pointRangePadding))
              : h.series.forEach(function (a) {
                  var c = f ? 1 : r ? C(a.options.pointRange, k, 0) : h.axisPointRange || 0;
                  a = a.options.pointPlacement;
                  b = Math.max(b, c);
                  h.single || ((d = Math.max(d, r && n(a) ? 0 : c / 2)), (l = Math.max(l, r && 'on' === a ? 0 : c)));
                }),
            (x = h.ordinalSlope && k ? h.ordinalSlope / k : 1),
            (h.minPointOffset = d *= x),
            (h.pointRangePadding = l *= x),
            (h.pointRange = Math.min(b, c)),
            r && (h.closestPointRange = k);
        a && (h.oldTransA = w);
        h.translationSlope = h.transA = w = h.staticScale || h.len / (c + l || 1);
        h.transB = h.horiz ? h.left : h.bottom;
        h.minPixelPadding = w * d;
        e(this, 'afterSetAxisTranslation');
      },
      minFromRange: function () {
        return this.max - this.range;
      },
      setTickInterval: function (h) {
        var c = this,
          b = c.chart,
          k = c.options,
          d = c.isLog,
          x = c.isDatetimeAxis,
          n = c.isXAxis,
          f = c.isLinked,
          p = k.maxPadding,
          D = k.minPadding,
          g,
          q = k.tickInterval,
          E = k.tickPixelInterval,
          F = c.categories,
          m = l(c.threshold) ? c.threshold : null,
          y = c.softThreshold,
          u,
          A,
          B;
        x || F || f || this.getTickAmount();
        A = C(c.userMin, k.min);
        B = C(c.userMax, k.max);
        f
          ? ((c.linkedParent = b[c.coll][k.linkedTo]),
            (g = c.linkedParent.getExtremes()),
            (c.min = C(g.min, g.dataMin)),
            (c.max = C(g.max, g.dataMax)),
            k.type !== c.linkedParent.options.type && a.error(11, 1, b))
          : (!y && v(m) && (c.dataMin >= m ? ((g = m), (D = 0)) : c.dataMax <= m && ((u = m), (p = 0))),
            (c.min = C(A, g, c.dataMin)),
            (c.max = C(B, u, c.dataMax)));
        d &&
          (c.positiveValuesOnly && !h && 0 >= Math.min(c.min, C(c.dataMin, c.min)) && a.error(10, 1, b),
          (c.min = t(c.log2lin(c.min), 15)),
          (c.max = t(c.log2lin(c.max), 15)));
        c.range &&
          v(c.max) &&
          ((c.userMin = c.min = A = Math.max(c.dataMin, c.minFromRange())), (c.userMax = B = c.max), (c.range = null));
        e(c, 'foundExtremes');
        c.beforePadding && c.beforePadding();
        c.adjustForMinRange();
        !(F || c.axisPointRange || c.usePercentage || f) &&
          v(c.min) &&
          v(c.max) &&
          (b = c.max - c.min) &&
          (!v(A) && D && (c.min -= b * D), !v(B) && p && (c.max += b * p));
        l(k.softMin) && !l(c.userMin) && (c.min = Math.min(c.min, k.softMin));
        l(k.softMax) && !l(c.userMax) && (c.max = Math.max(c.max, k.softMax));
        l(k.floor) && (c.min = Math.min(Math.max(c.min, k.floor), Number.MAX_VALUE));
        l(k.ceiling) && (c.max = Math.max(Math.min(c.max, k.ceiling), C(c.userMax, -Number.MAX_VALUE)));
        y &&
          v(c.dataMin) &&
          ((m = m || 0),
          !v(A) && c.min < m && c.dataMin >= m ? (c.min = m) : !v(B) && c.max > m && c.dataMax <= m && (c.max = m));
        c.tickInterval =
          c.min === c.max || void 0 === c.min || void 0 === c.max
            ? 1
            : f && !q && E === c.linkedParent.options.tickPixelInterval
            ? (q = c.linkedParent.tickInterval)
            : C(
                q,
                this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0,
                F ? 1 : ((c.max - c.min) * E) / Math.max(c.len, E)
              );
        n &&
          !h &&
          c.series.forEach(function (a) {
            a.processData(c.min !== c.oldMin || c.max !== c.oldMax);
          });
        c.setAxisTranslation(!0);
        c.beforeSetTickPositions && c.beforeSetTickPositions();
        c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
        c.pointRange && !q && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
        h = C(k.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
        !q && c.tickInterval < h && (c.tickInterval = h);
        x ||
          d ||
          q ||
          (c.tickInterval = w(
            c.tickInterval,
            null,
            r(c.tickInterval),
            C(k.allowDecimals, !(0.5 < c.tickInterval && 5 > c.tickInterval && 1e3 < c.max && 9999 > c.max)),
            !!this.tickAmount
          ));
        this.tickAmount || (c.tickInterval = c.unsquish());
        this.setTickPositions();
      },
      setTickPositions: function () {
        var c = this.options,
          k,
          b = c.tickPositions;
        k = this.getMinorTickInterval();
        var d = c.tickPositioner,
          l = c.startOnTick,
          x = c.endOnTick;
        this.tickmarkOffset = this.categories && 'between' === c.tickmarkPlacement && 1 === this.tickInterval ? 0.5 : 0;
        this.minorTickInterval = 'auto' === k && this.tickInterval ? this.tickInterval / 5 : k;
        this.single =
          this.min === this.max &&
          v(this.min) &&
          !this.tickAmount &&
          (parseInt(this.min, 10) === this.min || !1 !== c.allowDecimals);
        this.tickPositions = k = b && b.slice();
        !k &&
          (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)
            ? ((k = [this.min, this.max]), a.error(19, !1, this.chart))
            : (k = this.isDatetimeAxis
                ? this.getTimeTicks(
                    this.normalizeTimeTickInterval(this.tickInterval, c.units),
                    this.min,
                    this.max,
                    c.startOfWeek,
                    this.ordinalPositions,
                    this.closestPointRange,
                    !0
                  )
                : this.isLog
                ? this.getLogTickPositions(this.tickInterval, this.min, this.max)
                : this.getLinearTickPositions(this.tickInterval, this.min, this.max)),
          k.length > this.len && ((k = [k[0], k.pop()]), k[0] === k[1] && (k.length = 1)),
          (this.tickPositions = k),
          d && (d = d.apply(this, [this.min, this.max]))) &&
          (this.tickPositions = k = d);
        this.paddedTicks = k.slice(0);
        this.trimTicks(k, l, x);
        this.isLinked ||
          (this.single && 2 > k.length && ((this.min -= 0.5), (this.max += 0.5)), b || d || this.adjustTickAmount());
        e(this, 'afterSetTickPositions');
      },
      trimTicks: function (a, c, k) {
        var h = a[0],
          b = a[a.length - 1],
          d = this.minPointOffset || 0;
        e(this, 'trimTicks');
        if (!this.isLinked) {
          if (c && -Infinity !== h) this.min = h;
          else for (; this.min - d > a[0]; ) a.shift();
          if (k) this.max = b;
          else for (; this.max + d < a[a.length - 1]; ) a.pop();
          0 === a.length && v(h) && !this.options.tickPositions && a.push((b + h) / 2);
        }
      },
      alignToOthers: function () {
        var a = {},
          c,
          k = this.options;
        !1 === this.chart.options.chart.alignTicks ||
          !1 === k.alignTicks ||
          !1 === k.startOnTick ||
          !1 === k.endOnTick ||
          this.isLog ||
          this.chart[this.coll].forEach(function (h) {
            var k = h.options,
              k = [h.horiz ? k.left : k.top, k.width, k.height, k.pane].join();
            h.series.length && (a[k] ? (c = !0) : (a[k] = 1));
          });
        return c;
      },
      getTickAmount: function () {
        var a = this.options,
          c = a.tickAmount,
          k = a.tickPixelInterval;
        !v(a.tickInterval) && this.len < k && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (c = 2);
        !c && this.alignToOthers() && (c = Math.ceil(this.len / k) + 1);
        4 > c && ((this.finalTickAmt = c), (c = 5));
        this.tickAmount = c;
      },
      adjustTickAmount: function () {
        var a = this.options,
          c = this.tickInterval,
          k = this.tickPositions,
          b = this.tickAmount,
          d = this.finalTickAmt,
          l = k && k.length,
          x = C(this.threshold, this.softThreshold ? 0 : null),
          n;
        if (this.hasData()) {
          if (l < b) {
            for (n = this.min; k.length < b; )
              k.length % 2 || n === x ? k.push(t(k[k.length - 1] + c)) : k.unshift(t(k[0] - c));
            this.transA *= (l - 1) / (b - 1);
            this.min = a.startOnTick ? k[0] : Math.min(this.min, k[0]);
            this.max = a.endOnTick ? k[k.length - 1] : Math.max(this.max, k[k.length - 1]);
          } else l > b && ((this.tickInterval *= 2), this.setTickPositions());
          if (v(d)) {
            for (c = a = k.length; c--; )
              ((3 === d && 1 === c % 2) || (2 >= d && 0 < c && c < a - 1)) && k.splice(c, 1);
            this.finalTickAmt = void 0;
          }
        }
      },
      setScale: function () {
        var a = this.series.some(function (a) {
            return a.isDirtyData || a.isDirty || a.xAxis.isDirty;
          }),
          c;
        this.oldMin = this.min;
        this.oldMax = this.max;
        this.oldAxisLength = this.len;
        this.setAxisSize();
        (c = this.len !== this.oldAxisLength) ||
        a ||
        this.isLinked ||
        this.forceRedraw ||
        this.userMin !== this.oldUserMin ||
        this.userMax !== this.oldUserMax ||
        this.alignToOthers()
          ? (this.resetStacks && this.resetStacks(),
            (this.forceRedraw = !1),
            this.getSeriesExtremes(),
            this.setTickInterval(),
            (this.oldUserMin = this.userMin),
            (this.oldUserMax = this.userMax),
            this.isDirty || (this.isDirty = c || this.min !== this.oldMin || this.max !== this.oldMax))
          : this.cleanStacks && this.cleanStacks();
        e(this, 'afterSetScale');
      },
      setExtremes: function (a, c, k, b, d) {
        var h = this,
          l = h.chart;
        k = C(k, !0);
        h.series.forEach(function (a) {
          delete a.kdTree;
        });
        d = f(d, { min: a, max: c });
        e(h, 'setExtremes', d, function () {
          h.userMin = a;
          h.userMax = c;
          h.eventArgs = d;
          k && l.redraw(b);
        });
      },
      zoom: function (a, c) {
        var h = this.dataMin,
          k = this.dataMax,
          b = this.options,
          d = Math.min(h, C(b.min, h)),
          l = Math.max(k, C(b.max, k));
        a = { newMin: a, newMax: c };
        e(this, 'zoom', a, function (a) {
          var c = a.newMin,
            b = a.newMax;
          if (c !== this.min || b !== this.max)
            this.allowZoomOutside ||
              (v(h) && (c < d && (c = d), c > l && (c = l)), v(k) && (b < d && (b = d), b > l && (b = l))),
              (this.displayBtn = void 0 !== c || void 0 !== b),
              this.setExtremes(c, b, !1, void 0, { trigger: 'zoom' });
          a.zoomed = !0;
        });
        return a.zoomed;
      },
      setAxisSize: function () {
        var c = this.chart,
          k = this.options,
          b = k.offsets || [0, 0, 0, 0],
          d = this.horiz,
          l = (this.width = Math.round(a.relativeLength(C(k.width, c.plotWidth - b[3] + b[1]), c.plotWidth))),
          x = (this.height = Math.round(a.relativeLength(C(k.height, c.plotHeight - b[0] + b[2]), c.plotHeight))),
          n = (this.top = Math.round(a.relativeLength(C(k.top, c.plotTop + b[0]), c.plotHeight, c.plotTop))),
          k = (this.left = Math.round(a.relativeLength(C(k.left, c.plotLeft + b[3]), c.plotWidth, c.plotLeft)));
        this.bottom = c.chartHeight - x - n;
        this.right = c.chartWidth - l - k;
        this.len = Math.max(d ? l : x, 0);
        this.pos = d ? k : n;
      },
      getExtremes: function () {
        var a = this.isLog;
        return {
          min: a ? t(this.lin2log(this.min)) : this.min,
          max: a ? t(this.lin2log(this.max)) : this.max,
          dataMin: this.dataMin,
          dataMax: this.dataMax,
          userMin: this.userMin,
          userMax: this.userMax,
        };
      },
      getThreshold: function (a) {
        var c = this.isLog,
          h = c ? this.lin2log(this.min) : this.min,
          c = c ? this.lin2log(this.max) : this.max;
        null === a || -Infinity === a ? (a = h) : Infinity === a ? (a = c) : h > a ? (a = h) : c < a && (a = c);
        return this.translate(a, 0, 1, 0, 1);
      },
      autoLabelAlign: function (a) {
        var c = (C(a, 0) - 90 * this.side + 720) % 360;
        a = { align: 'center' };
        e(this, 'autoLabelAlign', a, function (a) {
          15 < c && 165 > c ? (a.align = 'right') : 195 < c && 345 > c && (a.align = 'left');
        });
        return a.align;
      },
      tickSize: function (a) {
        var c = this.options,
          h = c[a + 'Length'],
          k = C(c[a + 'Width'], 'tick' === a && this.isXAxis ? 1 : 0),
          b;
        k && h && ('inside' === c[a + 'Position'] && (h = -h), (b = [h, k]));
        a = { tickSize: b };
        e(this, 'afterTickSize', a);
        return a.tickSize;
      },
      labelMetrics: function () {
        var a = (this.tickPositions && this.tickPositions[0]) || 0;
        return this.chart.renderer.fontMetrics(
          this.options.labels.style && this.options.labels.style.fontSize,
          this.ticks[a] && this.ticks[a].label
        );
      },
      unsquish: function () {
        var a = this.options.labels,
          c = this.horiz,
          k = this.tickInterval,
          b = k,
          d = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / k),
          l,
          x = a.rotation,
          n = this.labelMetrics(),
          e,
          f = Number.MAX_VALUE,
          w,
          r = this.max - this.min,
          p = function (a) {
            var c = a / (d || 1),
              c = 1 < c ? Math.ceil(c) : 1;
            c * k > r && Infinity !== a && Infinity !== d && (c = Math.ceil(r / k));
            return t(c * k);
          };
        c
          ? (w = !a.staggerLines && !a.step && (v(x) ? [x] : d < C(a.autoRotationLimit, 80) && a.autoRotation)) &&
            w.forEach(function (a) {
              var c;
              if (a === x || (a && -90 <= a && 90 >= a))
                (e = p(Math.abs(n.h / Math.sin(y * a)))),
                  (c = e + Math.abs(a / 360)),
                  c < f && ((f = c), (l = a), (b = e));
            })
          : a.step || (b = p(n.h));
        this.autoRotation = w;
        this.labelRotation = C(l, x);
        return b;
      },
      getSlotWidth: function (a) {
        var c = this.chart,
          h = this.horiz,
          k = this.options.labels,
          b = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
          d = c.margin[3];
        return (
          (a && a.slotWidth) ||
          (h && 2 > (k.step || 0) && !k.rotation && ((this.staggerLines || 1) * this.len) / b) ||
          (!h && ((k.style && parseInt(k.style.width, 10)) || (d && d - c.spacing[3]) || 0.33 * c.chartWidth))
        );
      },
      renderUnsquish: function () {
        var a = this.chart,
          c = a.renderer,
          k = this.tickPositions,
          b = this.ticks,
          d = this.options.labels,
          l = (d && d.style) || {},
          x = this.horiz,
          e = this.getSlotWidth(),
          f = Math.max(1, Math.round(e - 2 * (d.padding || 5))),
          w = {},
          r = this.labelMetrics(),
          p = d.style && d.style.textOverflow,
          D,
          g,
          q = 0,
          E;
        n(d.rotation) || (w.rotation = d.rotation || 0);
        k.forEach(function (a) {
          (a = b[a]) && a.label && a.label.textPxLength > q && (q = a.label.textPxLength);
        });
        this.maxLabelLength = q;
        if (this.autoRotation) q > f && q > r.h ? (w.rotation = this.labelRotation) : (this.labelRotation = 0);
        else if (e && ((D = f), !p))
          for (g = 'clip', f = k.length; !x && f--; )
            if (((E = k[f]), (E = b[E].label)))
              E.styles && 'ellipsis' === E.styles.textOverflow
                ? E.css({ textOverflow: 'clip' })
                : E.textPxLength > e && E.css({ width: e + 'px' }),
                E.getBBox().height > this.len / k.length - (r.h - r.f) && (E.specificTextOverflow = 'ellipsis');
        w.rotation && ((D = q > 0.5 * a.chartHeight ? 0.33 * a.chartHeight : q), p || (g = 'ellipsis'));
        if ((this.labelAlign = d.align || this.autoLabelAlign(this.labelRotation))) w.align = this.labelAlign;
        k.forEach(function (a) {
          var c = (a = b[a]) && a.label,
            h = l.width,
            k = {};
          c &&
            (c.attr(w),
            a.shortenLabel
              ? a.shortenLabel()
              : D && !h && 'nowrap' !== l.whiteSpace && (D < c.textPxLength || 'SPAN' === c.element.tagName)
              ? ((k.width = D), p || (k.textOverflow = c.specificTextOverflow || g), c.css(k))
              : c.styles && c.styles.width && !k.width && !h && c.css({ width: null }),
            delete c.specificTextOverflow,
            (a.rotation = w.rotation));
        }, this);
        this.tickRotCorr = c.rotCorr(r.b, this.labelRotation || 0, 0 !== this.side);
      },
      hasData: function () {
        return (
          this.hasVisibleSeries || (v(this.min) && v(this.max) && this.tickPositions && 0 < this.tickPositions.length)
        );
      },
      addTitle: function (a) {
        var c = this.chart.renderer,
          h = this.horiz,
          k = this.opposite,
          b = this.options.title,
          l,
          x = this.chart.styledMode;
        this.axisTitle ||
          ((l = b.textAlign) ||
            (l = (h
              ? { low: 'left', middle: 'center', high: 'right' }
              : { low: k ? 'right' : 'left', middle: 'center', high: k ? 'left' : 'right' })[b.align]),
          (this.axisTitle = c
            .text(b.text, 0, 0, b.useHTML)
            .attr({ zIndex: 7, rotation: b.rotation || 0, align: l })
            .addClass('highcharts-axis-title')),
          x || this.axisTitle.css(d(b.style)),
          this.axisTitle.add(this.axisGroup),
          (this.axisTitle.isNew = !0));
        x || b.style.width || this.isRadial || this.axisTitle.css({ width: this.len });
        this.axisTitle[a ? 'show' : 'hide'](!0);
      },
      generateTick: function (a) {
        var c = this.ticks;
        c[a] ? c[a].addLabel() : (c[a] = new x(this, a));
      },
      getOffset: function () {
        var a = this,
          c = a.chart,
          k = c.renderer,
          b = a.options,
          d = a.tickPositions,
          l = a.ticks,
          x = a.horiz,
          n = a.side,
          f = c.inverted && !a.isZAxis ? [1, 0, 3, 2][n] : n,
          w,
          r,
          p = 0,
          D,
          q = 0,
          g = b.title,
          F = b.labels,
          m = 0,
          t = c.axisOffset,
          c = c.clipOffset,
          y = [-1, 1, 1, -1][n],
          u = b.className,
          A = a.axisParent;
        w = a.hasData();
        a.showAxis = r = w || C(b.showEmpty, !0);
        a.staggerLines = a.horiz && F.staggerLines;
        a.axisGroup ||
          ((a.gridGroup = k
            .g('grid')
            .attr({ zIndex: b.gridZIndex || 1 })
            .addClass('highcharts-' + this.coll.toLowerCase() + '-grid ' + (u || ''))
            .add(A)),
          (a.axisGroup = k
            .g('axis')
            .attr({ zIndex: b.zIndex || 2 })
            .addClass('highcharts-' + this.coll.toLowerCase() + ' ' + (u || ''))
            .add(A)),
          (a.labelGroup = k
            .g('axis-labels')
            .attr({ zIndex: F.zIndex || 7 })
            .addClass('highcharts-' + a.coll.toLowerCase() + '-labels ' + (u || ''))
            .add(A)));
        w || a.isLinked
          ? (d.forEach(function (c, k) {
              a.generateTick(c, k);
            }),
            a.renderUnsquish(),
            (a.reserveSpaceDefault = 0 === n || 2 === n || { 1: 'left', 3: 'right' }[n] === a.labelAlign),
            C(F.reserveSpace, 'center' === a.labelAlign ? !0 : null, a.reserveSpaceDefault) &&
              d.forEach(function (a) {
                m = Math.max(l[a].getLabelSize(), m);
              }),
            a.staggerLines && (m *= a.staggerLines),
            (a.labelOffset = m * (a.opposite ? -1 : 1)))
          : E(l, function (a, c) {
              a.destroy();
              delete l[c];
            });
        g &&
          g.text &&
          !1 !== g.enabled &&
          (a.addTitle(r),
          r &&
            !1 !== g.reserveSpace &&
            ((a.titleOffset = p = a.axisTitle.getBBox()[x ? 'height' : 'width']),
            (D = g.offset),
            (q = v(D) ? 0 : C(g.margin, x ? 5 : 10))));
        a.renderLine();
        a.offset = y * C(b.offset, t[n] ? t[n] + (b.margin || 0) : 0);
        a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };
        k = 0 === n ? -a.labelMetrics().h : 2 === n ? a.tickRotCorr.y : 0;
        q = Math.abs(m) + q;
        m && (q = q - k + y * (x ? C(F.y, a.tickRotCorr.y + 8 * y) : F.x));
        a.axisTitleMargin = C(D, q);
        a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(l, d));
        x = this.tickSize('tick');
        t[n] = Math.max(t[n], a.axisTitleMargin + p + y * a.offset, q, w && d.length && x ? x[0] + y * a.offset : 0);
        b = b.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
        c[f] = Math.max(c[f], b);
        e(this, 'afterGetOffset');
      },
      getLinePath: function (a) {
        var c = this.chart,
          k = this.opposite,
          h = this.offset,
          b = this.horiz,
          d = this.left + (k ? this.width : 0) + h,
          h = c.chartHeight - this.bottom - (k ? this.height : 0) + h;
        k && (a *= -1);
        return c.renderer.crispLine(
          [
            'M',
            b ? this.left : d,
            b ? h : this.top,
            'L',
            b ? c.chartWidth - this.right : d,
            b ? h : c.chartHeight - this.bottom,
          ],
          a
        );
      },
      renderLine: function () {
        this.axisLine ||
          ((this.axisLine = this.chart.renderer.path().addClass('highcharts-axis-line').add(this.axisGroup)),
          this.chart.styledMode ||
            this.axisLine.attr({ stroke: this.options.lineColor, 'stroke-width': this.options.lineWidth, zIndex: 7 }));
      },
      getTitlePosition: function () {
        var a = this.horiz,
          c = this.left,
          k = this.top,
          b = this.len,
          d = this.options.title,
          l = a ? c : k,
          x = this.opposite,
          n = this.offset,
          f = d.x || 0,
          w = d.y || 0,
          r = this.axisTitle,
          p = this.chart.renderer.fontMetrics(d.style && d.style.fontSize, r),
          r = Math.max(r.getBBox(null, 0).height - p.h - 1, 0),
          b = { low: l + (a ? 0 : b), middle: l + b / 2, high: l + (a ? b : 0) }[d.align],
          c =
            (a ? k + this.height : c) +
            (a ? 1 : -1) * (x ? -1 : 1) * this.axisTitleMargin +
            [-r, r, p.f, -r][this.side],
          a = { x: a ? b + f : c + (x ? this.width : 0) + n + f, y: a ? c + w - (x ? this.height : 0) + n : b + w };
        e(this, 'afterGetTitlePosition', { titlePosition: a });
        return a;
      },
      renderMinorTick: function (a) {
        var c = this.chart.hasRendered && l(this.oldMin),
          k = this.minorTicks;
        k[a] || (k[a] = new x(this, a, 'minor'));
        c && k[a].isNew && k[a].render(null, !0);
        k[a].render(null, !1, 1);
      },
      renderTick: function (a, c) {
        var k = this.isLinked,
          b = this.ticks,
          h = this.chart.hasRendered && l(this.oldMin);
        if (!k || (a >= this.min && a <= this.max))
          b[a] || (b[a] = new x(this, a)), h && b[a].isNew && b[a].render(c, !0, -1), b[a].render(c);
      },
      render: function () {
        var c = this,
          b = c.chart,
          d = c.options,
          n = c.isLog,
          f = c.isLinked,
          w = c.tickPositions,
          r = c.axisTitle,
          p = c.ticks,
          D = c.minorTicks,
          q = c.alternateBands,
          g = d.stackLabels,
          C = d.alternateGridColor,
          F = c.tickmarkOffset,
          m = c.axisLine,
          t = c.showAxis,
          y = A(b.renderer.globalAnimation),
          v,
          u;
        c.labelEdge.length = 0;
        c.overlap = !1;
        [p, D, q].forEach(function (a) {
          E(a, function (a) {
            a.isActive = !1;
          });
        });
        if (c.hasData() || f)
          c.minorTickInterval &&
            !c.categories &&
            c.getMinorTickPositions().forEach(function (a) {
              c.renderMinorTick(a);
            }),
            w.length &&
              (w.forEach(function (a, k) {
                c.renderTick(a, k);
              }),
              F && (0 === c.min || c.single) && (p[-1] || (p[-1] = new x(c, -1, null, !0)), p[-1].render(-1))),
            C &&
              w.forEach(function (k, h) {
                u = void 0 !== w[h + 1] ? w[h + 1] + F : c.max - F;
                0 === h % 2 &&
                  k < c.max &&
                  u <= c.max + (b.polar ? -F : F) &&
                  (q[k] || (q[k] = new a.PlotLineOrBand(c)),
                  (v = k + F),
                  (q[k].options = { from: n ? c.lin2log(v) : v, to: n ? c.lin2log(u) : u, color: C }),
                  q[k].render(),
                  (q[k].isActive = !0));
              }),
            c._addedPlotLB ||
              ((d.plotLines || []).concat(d.plotBands || []).forEach(function (a) {
                c.addPlotBandOrLine(a);
              }),
              (c._addedPlotLB = !0));
        [p, D, q].forEach(function (a) {
          var c,
            h = [],
            d = y.duration;
          E(a, function (a, c) {
            a.isActive || (a.render(c, !1, 0), (a.isActive = !1), h.push(c));
          });
          k(
            function () {
              for (c = h.length; c--; ) a[h[c]] && !a[h[c]].isActive && (a[h[c]].destroy(), delete a[h[c]]);
            },
            a !== q && b.hasRendered && d ? d : 0
          );
        });
        m &&
          (m[m.isPlaced ? 'animate' : 'attr']({ d: this.getLinePath(m.strokeWidth()) }),
          (m.isPlaced = !0),
          m[t ? 'show' : 'hide'](!0));
        r &&
          t &&
          ((d = c.getTitlePosition()),
          l(d.y) ? (r[r.isNew ? 'attr' : 'animate'](d), (r.isNew = !1)) : (r.attr('y', -9999), (r.isNew = !0)));
        g && g.enabled && c.renderStackTotals();
        c.isDirty = !1;
        e(this, 'afterRender');
      },
      redraw: function () {
        this.visible &&
          (this.render(),
          this.plotLinesAndBands.forEach(function (a) {
            a.render();
          }));
        this.series.forEach(function (a) {
          a.isDirty = !0;
        });
      },
      keepProps: 'extKey hcEvents names series userMax userMin'.split(' '),
      destroy: function (a) {
        var c = this,
          k = c.stacks,
          b = c.plotLinesAndBands,
          h;
        e(this, 'destroy', { keepEvents: a });
        a || F(c);
        E(k, function (a, c) {
          q(a);
          k[c] = null;
        });
        [c.ticks, c.minorTicks, c.alternateBands].forEach(function (a) {
          q(a);
        });
        if (b) for (a = b.length; a--; ) b[a].destroy();
        'stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar'
          .split(' ')
          .forEach(function (a) {
            c[a] && (c[a] = c[a].destroy());
          });
        for (h in c.plotLinesAndBandsGroups) c.plotLinesAndBandsGroups[h] = c.plotLinesAndBandsGroups[h].destroy();
        E(c, function (a, k) {
          -1 === c.keepProps.indexOf(k) && delete c[k];
        });
      },
      drawCrosshair: function (a, c) {
        var k,
          b = this.crosshair,
          h = C(b.snap, !0),
          d,
          l = this.cross;
        e(this, 'drawCrosshair', { e: a, point: c });
        a || (a = this.cross && this.cross.e);
        if (this.crosshair && !1 !== (v(c) || !h)) {
          h
            ? v(c) && (d = C(c.crosshairPos, this.isXAxis ? c.plotX : this.len - c.plotY))
            : (d = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos));
          v(d) && (k = this.getPlotLinePath(c && (this.isXAxis ? c.x : C(c.stackY, c.y)), null, null, null, d) || null);
          if (!v(k)) {
            this.hideCrosshair();
            return;
          }
          h = this.categories && !this.isRadial;
          l ||
            ((this.cross = l = this.chart.renderer
              .path()
              .addClass('highcharts-crosshair highcharts-crosshair-' + (h ? 'category ' : 'thin ') + b.className)
              .attr({ zIndex: C(b.zIndex, 2) })
              .add()),
            this.chart.styledMode ||
              (l
                .attr({
                  stroke: b.color || (h ? g('#ccd6eb').setOpacity(0.25).get() : '#cccccc'),
                  'stroke-width': C(b.width, 1),
                })
                .css({ 'pointer-events': 'none' }),
              b.dashStyle && l.attr({ dashstyle: b.dashStyle })));
          l.show().attr({ d: k });
          h && !b.width && l.attr({ 'stroke-width': this.transA });
          this.cross.e = a;
        } else this.hideCrosshair();
        e(this, 'afterDrawCrosshair', { e: a, point: c });
      },
      hideCrosshair: function () {
        this.cross && this.cross.hide();
        e(this, 'afterHideCrosshair');
      },
    });
    return (a.Axis = D);
  })(H);
  (function (a) {
    var B = a.Axis,
      A = a.getMagnitude,
      G = a.normalizeTickInterval,
      m = a.timeUnits;
    B.prototype.getTimeTicks = function () {
      return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
    };
    B.prototype.normalizeTimeTickInterval = function (a, t) {
      var g = t || [
        ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
        ['second', [1, 2, 5, 10, 15, 30]],
        ['minute', [1, 2, 5, 10, 15, 30]],
        ['hour', [1, 2, 3, 4, 6, 8, 12]],
        ['day', [1, 2]],
        ['week', [1, 2]],
        ['month', [1, 2, 3, 4, 6]],
        ['year', null],
      ];
      t = g[g.length - 1];
      var v = m[t[0]],
        y = t[1],
        q;
      for (
        q = 0;
        q < g.length &&
        !((t = g[q]), (v = m[t[0]]), (y = t[1]), g[q + 1] && a <= (v * y[y.length - 1] + m[g[q + 1][0]]) / 2);
        q++
      );
      v === m.year && a < 5 * v && (y = [1, 2, 5]);
      a = G(a / v, y, 'year' === t[0] ? Math.max(A(a / v), 1) : 1);
      return { unitRange: v, count: a, unitName: t[0] };
    };
  })(H);
  (function (a) {
    var B = a.Axis,
      A = a.getMagnitude,
      G = a.normalizeTickInterval,
      m = a.pick;
    B.prototype.getLogTickPositions = function (a, t, u, v) {
      var g = this.options,
        q = this.len,
        f = [];
      v || (this._minorAutoInterval = null);
      if (0.5 <= a) (a = Math.round(a)), (f = this.getLinearTickPositions(a, t, u));
      else if (0.08 <= a)
        for (
          var q = Math.floor(t),
            e,
            p,
            r,
            b,
            l,
            g = 0.3 < a ? [1, 2, 4] : 0.15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
          q < u + 1 && !l;
          q++
        )
          for (p = g.length, e = 0; e < p && !l; e++)
            (r = this.log2lin(this.lin2log(q) * g[e])),
              r > t && (!v || b <= u) && void 0 !== b && f.push(b),
              b > u && (l = !0),
              (b = r);
      else
        (t = this.lin2log(t)),
          (u = this.lin2log(u)),
          (a = v ? this.getMinorTickInterval() : g.tickInterval),
          (a = m(
            'auto' === a ? null : a,
            this._minorAutoInterval,
            ((g.tickPixelInterval / (v ? 5 : 1)) * (u - t)) / ((v ? q / this.tickPositions.length : q) || 1)
          )),
          (a = G(a, null, A(a))),
          (f = this.getLinearTickPositions(a, t, u).map(this.log2lin)),
          v || (this._minorAutoInterval = a / 5);
      v || (this.tickInterval = a);
      return f;
    };
    B.prototype.log2lin = function (a) {
      return Math.log(a) / Math.LN10;
    };
    B.prototype.lin2log = function (a) {
      return Math.pow(10, a);
    };
  })(H);
  (function (a, B) {
    var A = a.arrayMax,
      G = a.arrayMin,
      m = a.defined,
      g = a.destroyObjectProperties,
      t = a.erase,
      u = a.merge,
      v = a.pick;
    a.PlotLineOrBand = function (a, q) {
      this.axis = a;
      q && ((this.options = q), (this.id = q.id));
    };
    a.PlotLineOrBand.prototype = {
      render: function () {
        a.fireEvent(this, 'render');
        var g = this,
          q = g.axis,
          f = q.horiz,
          e = g.options,
          p = e.label,
          r = g.label,
          b = e.to,
          l = e.from,
          n = e.value,
          d = m(l) && m(b),
          w = m(n),
          E = g.svgElem,
          C = !E,
          F = [],
          c = e.color,
          k = v(e.zIndex, 0),
          x = e.events,
          F = { class: 'highcharts-plot-' + (d ? 'band ' : 'line ') + (e.className || '') },
          D = {},
          h = q.chart.renderer,
          z = d ? 'bands' : 'lines';
        q.isLog && ((l = q.log2lin(l)), (b = q.log2lin(b)), (n = q.log2lin(n)));
        q.chart.styledMode ||
          (w
            ? ((F.stroke = c), (F['stroke-width'] = e.width), e.dashStyle && (F.dashstyle = e.dashStyle))
            : d &&
              (c && (F.fill = c), e.borderWidth && ((F.stroke = e.borderColor), (F['stroke-width'] = e.borderWidth))));
        D.zIndex = k;
        z += '-' + k;
        (c = q.plotLinesAndBandsGroups[z]) ||
          (q.plotLinesAndBandsGroups[z] = c = h
            .g('plot-' + z)
            .attr(D)
            .add());
        C && (g.svgElem = E = h.path().attr(F).add(c));
        if (w) F = q.getPlotLinePath(n, E.strokeWidth());
        else if (d) F = q.getPlotBandPath(l, b, e);
        else return;
        C && F && F.length
          ? (E.attr({ d: F }),
            x &&
              a.objectEach(x, function (a, c) {
                E.on(c, function (a) {
                  x[c].apply(g, [a]);
                });
              }))
          : E && (F ? (E.show(), E.animate({ d: F })) : (E.hide(), r && (g.label = r = r.destroy())));
        p && m(p.text) && F && F.length && 0 < q.width && 0 < q.height && !F.isFlat
          ? ((p = u(
              {
                align: f && d && 'center',
                x: f ? !d && 4 : 10,
                verticalAlign: !f && d && 'middle',
                y: f ? (d ? 16 : 10) : d ? 6 : -4,
                rotation: f && !d && 90,
              },
              p
            )),
            this.renderLabel(p, F, d, k))
          : r && r.hide();
        return g;
      },
      renderLabel: function (a, q, f, e) {
        var p = this.label,
          r = this.axis.chart.renderer;
        p ||
          ((p = {
            align: a.textAlign || a.align,
            rotation: a.rotation,
            class: 'highcharts-plot-' + (f ? 'band' : 'line') + '-label ' + (a.className || ''),
          }),
          (p.zIndex = e),
          (this.label = p = r.text(a.text, 0, 0, a.useHTML).attr(p).add()),
          this.axis.chart.styledMode || p.css(a.style));
        e = q.xBounds || [q[1], q[4], f ? q[6] : q[1]];
        q = q.yBounds || [q[2], q[5], f ? q[7] : q[2]];
        f = G(e);
        r = G(q);
        p.align(a, !1, { x: f, y: r, width: A(e) - f, height: A(q) - r });
        p.show();
      },
      destroy: function () {
        t(this.axis.plotLinesAndBands, this);
        delete this.axis;
        g(this);
      },
    };
    a.extend(B.prototype, {
      getPlotBandPath: function (a, q) {
        var f = this.getPlotLinePath(q, null, null, !0),
          e = this.getPlotLinePath(a, null, null, !0),
          p = [],
          r = this.horiz,
          b = 1,
          l;
        a = (a < this.min && q < this.min) || (a > this.max && q > this.max);
        if (e && f)
          for (a && ((l = e.toString() === f.toString()), (b = 0)), a = 0; a < e.length; a += 6)
            r && f[a + 1] === e[a + 1]
              ? ((f[a + 1] += b), (f[a + 4] += b))
              : r || f[a + 2] !== e[a + 2] || ((f[a + 2] += b), (f[a + 5] += b)),
              p.push('M', e[a + 1], e[a + 2], 'L', e[a + 4], e[a + 5], f[a + 4], f[a + 5], f[a + 1], f[a + 2], 'z'),
              (p.isFlat = l);
        return p;
      },
      addPlotBand: function (a) {
        return this.addPlotBandOrLine(a, 'plotBands');
      },
      addPlotLine: function (a) {
        return this.addPlotBandOrLine(a, 'plotLines');
      },
      addPlotBandOrLine: function (g, q) {
        var f = new a.PlotLineOrBand(this, g).render(),
          e = this.userOptions;
        f && (q && ((e[q] = e[q] || []), e[q].push(g)), this.plotLinesAndBands.push(f));
        return f;
      },
      removePlotBandOrLine: function (a) {
        for (var q = this.plotLinesAndBands, f = this.options, e = this.userOptions, p = q.length; p--; )
          q[p].id === a && q[p].destroy();
        [f.plotLines || [], e.plotLines || [], f.plotBands || [], e.plotBands || []].forEach(function (e) {
          for (p = e.length; p--; ) e[p].id === a && t(e, e[p]);
        });
      },
      removePlotBand: function (a) {
        this.removePlotBandOrLine(a);
      },
      removePlotLine: function (a) {
        this.removePlotBandOrLine(a);
      },
    });
  })(H, da);
  (function (a) {
    var B = a.doc,
      A = a.extend,
      G = a.format,
      m = a.isNumber,
      g = a.merge,
      t = a.pick,
      u = a.splat,
      v = a.syncTimeout,
      y = a.timeUnits;
    a.Tooltip = function () {
      this.init.apply(this, arguments);
    };
    a.Tooltip.prototype = {
      init: function (a, f) {
        this.chart = a;
        this.options = f;
        this.crosshairs = [];
        this.now = { x: 0, y: 0 };
        this.isHidden = !0;
        this.split = f.split && !a.inverted;
        this.shared = f.shared || this.split;
        this.outside = f.outside && !this.split;
      },
      cleanSplit: function (a) {
        this.chart.series.forEach(function (f) {
          var e = f && f.tt;
          e && (!e.isActive || a ? (f.tt = e.destroy()) : (e.isActive = !1));
        });
      },
      applyFilter: function () {
        var a = this.chart;
        a.renderer.definition({
          tagName: 'filter',
          id: 'drop-shadow-' + a.index,
          opacity: 0.5,
          children: [
            { tagName: 'feGaussianBlur', in: 'SourceAlpha', stdDeviation: 1 },
            { tagName: 'feOffset', dx: 1, dy: 1 },
            { tagName: 'feComponentTransfer', children: [{ tagName: 'feFuncA', type: 'linear', slope: 0.3 }] },
            {
              tagName: 'feMerge',
              children: [{ tagName: 'feMergeNode' }, { tagName: 'feMergeNode', in: 'SourceGraphic' }],
            },
          ],
        });
        a.renderer.definition({
          tagName: 'style',
          textContent: '.highcharts-tooltip-' + a.index + '{filter:url(#drop-shadow-' + a.index + ')}',
        });
      },
      getLabel: function () {
        var q = this,
          f = this.chart.renderer,
          e = this.chart.styledMode,
          p = this.options,
          r,
          b;
        this.label ||
          (this.outside &&
            ((this.container = r = a.doc.createElement('div')),
            (r.className = 'highcharts-tooltip-container'),
            a.css(r, { position: 'absolute', top: '1px', pointerEvents: p.style && p.style.pointerEvents }),
            a.doc.body.appendChild(r),
            (this.renderer = f = new a.Renderer(r, 0, 0))),
          this.split
            ? (this.label = f.g('tooltip'))
            : ((this.label = f
                .label('', 0, 0, p.shape || 'callout', null, null, p.useHTML, null, 'tooltip')
                .attr({ padding: p.padding, r: p.borderRadius })),
              e ||
                this.label
                  .attr({ fill: p.backgroundColor, 'stroke-width': p.borderWidth })
                  .css(p.style)
                  .shadow(p.shadow)),
          e && (this.applyFilter(), this.label.addClass('highcharts-tooltip-' + this.chart.index)),
          this.outside &&
            ((b = { x: this.label.xSetter, y: this.label.ySetter }),
            (this.label.xSetter = function (a, n) {
              b[n].call(this.label, q.distance);
              r.style.left = a + 'px';
            }),
            (this.label.ySetter = function (a, n) {
              b[n].call(this.label, q.distance);
              r.style.top = a + 'px';
            })),
          this.label.attr({ zIndex: 8 }).add());
        return this.label;
      },
      update: function (a) {
        this.destroy();
        g(!0, this.chart.options.tooltip.userOptions, a);
        this.init(this.chart, g(!0, this.options, a));
      },
      destroy: function () {
        this.label && (this.label = this.label.destroy());
        this.split && this.tt && (this.cleanSplit(this.chart, !0), (this.tt = this.tt.destroy()));
        this.renderer && ((this.renderer = this.renderer.destroy()), a.discardElement(this.container));
        a.clearTimeout(this.hideTimer);
        a.clearTimeout(this.tooltipTimeout);
      },
      move: function (g, f, e, p) {
        var r = this,
          b = r.now,
          l = !1 !== r.options.animation && !r.isHidden && (1 < Math.abs(g - b.x) || 1 < Math.abs(f - b.y)),
          n = r.followPointer || 1 < r.len;
        A(b, {
          x: l ? (2 * b.x + g) / 3 : g,
          y: l ? (b.y + f) / 2 : f,
          anchorX: n ? void 0 : l ? (2 * b.anchorX + e) / 3 : e,
          anchorY: n ? void 0 : l ? (b.anchorY + p) / 2 : p,
        });
        r.getLabel().attr(b);
        l &&
          (a.clearTimeout(this.tooltipTimeout),
          (this.tooltipTimeout = setTimeout(function () {
            r && r.move(g, f, e, p);
          }, 32)));
      },
      hide: function (g) {
        var f = this;
        a.clearTimeout(this.hideTimer);
        g = t(g, this.options.hideDelay, 500);
        this.isHidden ||
          (this.hideTimer = v(function () {
            f.getLabel()[g ? 'fadeOut' : 'hide']();
            f.isHidden = !0;
          }, g));
      },
      getAnchor: function (a, f) {
        var e = this.chart,
          p = e.pointer,
          r = e.inverted,
          b = e.plotTop,
          l = e.plotLeft,
          n = 0,
          d = 0,
          w,
          g;
        a = u(a);
        this.followPointer && f
          ? (void 0 === f.chartX && (f = p.normalize(f)), (a = [f.chartX - e.plotLeft, f.chartY - b]))
          : a[0].tooltipPos
          ? (a = a[0].tooltipPos)
          : (a.forEach(function (a) {
              w = a.series.yAxis;
              g = a.series.xAxis;
              n += a.plotX + (!r && g ? g.left - l : 0);
              d += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!r && w ? w.top - b : 0);
            }),
            (n /= a.length),
            (d /= a.length),
            (a = [
              r ? e.plotWidth - d : n,
              this.shared && !r && 1 < a.length && f ? f.chartY - b : r ? e.plotHeight - n : d,
            ]));
        return a.map(Math.round);
      },
      getPosition: function (a, f, e) {
        var p = this.chart,
          r = this.distance,
          b = {},
          l = (p.inverted && e.h) || 0,
          n,
          d = this.outside,
          w = d ? B.documentElement.clientWidth - 2 * r : p.chartWidth,
          g = d
            ? Math.max(
                B.body.scrollHeight,
                B.documentElement.scrollHeight,
                B.body.offsetHeight,
                B.documentElement.offsetHeight,
                B.documentElement.clientHeight
              )
            : p.chartHeight,
          q = p.pointer.chartPosition,
          F = [
            'y',
            g,
            f,
            (d ? q.top - r : 0) + e.plotY + p.plotTop,
            d ? 0 : p.plotTop,
            d ? g : p.plotTop + p.plotHeight,
          ],
          c = [
            'x',
            w,
            a,
            (d ? q.left - r : 0) + e.plotX + p.plotLeft,
            d ? 0 : p.plotLeft,
            d ? w : p.plotLeft + p.plotWidth,
          ],
          k = !this.followPointer && t(e.ttBelow, !p.inverted === !!e.negative),
          x = function (a, c, h, d, x, n) {
            var e = h < d - r,
              f = d + r + h < c,
              w = d - r - h;
            d += r;
            if (k && f) b[a] = d;
            else if (!k && e) b[a] = w;
            else if (e) b[a] = Math.min(n - h, 0 > w - l ? w : w - l);
            else if (f) b[a] = Math.max(x, d + l + h > c ? d : d + l);
            else return !1;
          },
          D = function (a, c, k, h) {
            var d;
            h < r || h > c - r ? (d = !1) : (b[a] = h < k / 2 ? 1 : h > c - k / 2 ? c - k - 2 : h - k / 2);
            return d;
          },
          h = function (a) {
            var k = F;
            F = c;
            c = k;
            n = a;
          },
          z = function () {
            !1 !== x.apply(0, F) ? !1 !== D.apply(0, c) || n || (h(!0), z()) : n ? (b.x = b.y = 0) : (h(!0), z());
          };
        (p.inverted || 1 < this.len) && h();
        z();
        return b;
      },
      defaultFormatter: function (a) {
        var f = this.points || u(this),
          e;
        e = [a.tooltipFooterHeaderFormatter(f[0])];
        e = e.concat(a.bodyFormatter(f));
        e.push(a.tooltipFooterHeaderFormatter(f[0], !0));
        return e;
      },
      refresh: function (g, f) {
        var e,
          p = this.options,
          r,
          b = g,
          l,
          n = {},
          d = [];
        e = p.formatter || this.defaultFormatter;
        var n = this.shared,
          w,
          q = this.chart.styledMode;
        p.enabled &&
          (a.clearTimeout(this.hideTimer),
          (this.followPointer = u(b)[0].series.tooltipOptions.followPointer),
          (l = this.getAnchor(b, f)),
          (f = l[0]),
          (r = l[1]),
          !n || (b.series && b.series.noSharedTooltip)
            ? (n = b.getLabelConfig())
            : (b.forEach(function (a) {
                a.setState('hover');
                d.push(a.getLabelConfig());
              }),
              (n = { x: b[0].category, y: b[0].y }),
              (n.points = d),
              (b = b[0])),
          (this.len = d.length),
          (n = e.call(n, this)),
          (w = b.series),
          (this.distance = t(w.tooltipOptions.distance, 16)),
          !1 === n
            ? this.hide()
            : ((e = this.getLabel()),
              this.isHidden && e.attr({ opacity: 1 }).show(),
              this.split
                ? this.renderSplit(n, u(g))
                : ((p.style.width && !q) || e.css({ width: this.chart.spacingBox.width }),
                  e.attr({ text: n && n.join ? n.join('') : n }),
                  e
                    .removeClass(/highcharts-color-[\d]+/g)
                    .addClass('highcharts-color-' + t(b.colorIndex, w.colorIndex)),
                  q || e.attr({ stroke: p.borderColor || b.color || w.color || '#666666' }),
                  this.updatePosition({ plotX: f, plotY: r, negative: b.negative, ttBelow: b.ttBelow, h: l[2] || 0 })),
              (this.isHidden = !1)));
      },
      renderSplit: function (g, f) {
        var e = this,
          p = [],
          r = this.chart,
          b = r.renderer,
          l = !0,
          n = this.options,
          d = 0,
          w,
          q = this.getLabel(),
          C = r.plotTop;
        a.isString(g) && (g = [!1, g]);
        g.slice(0, f.length + 1).forEach(function (a, c) {
          if (!1 !== a && '' !== a) {
            c = f[c - 1] || { isHeader: !0, plotX: f[0].plotX, plotY: r.plotHeight };
            var k = c.series || e,
              x = k.tt,
              g = c.series || {},
              h = 'highcharts-color-' + t(c.colorIndex, g.colorIndex, 'none');
            x ||
              ((x = { padding: n.padding, r: n.borderRadius }),
              r.styledMode ||
                ((x.fill = n.backgroundColor),
                (x.stroke = n.borderColor || c.color || g.color || '#333333'),
                (x['stroke-width'] = n.borderWidth)),
              (k.tt = x = b
                .label(null, null, null, (c.isHeader ? n.headerShape : n.shape) || 'callout', null, null, n.useHTML)
                .addClass('highcharts-tooltip-box ' + h)
                .attr(x)
                .add(q)));
            x.isActive = !0;
            x.attr({ text: a });
            r.styledMode || x.css(n.style).shadow(n.shadow);
            a = x.getBBox();
            g = a.width + x.strokeWidth();
            c.isHeader
              ? ((d = a.height),
                r.xAxis[0].opposite && ((w = !0), (C -= d)),
                (g = Math.max(
                  0,
                  Math.min(
                    c.plotX + r.plotLeft - g / 2,
                    r.chartWidth + (r.scrollablePixels ? r.scrollablePixels - r.marginRight : 0) - g
                  )
                )))
              : (g = c.plotX + r.plotLeft - t(n.distance, 16) - g);
            0 > g && (l = !1);
            a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
            a -= C;
            c.isHeader && (a = w ? -d : r.plotHeight + d);
            p.push({ target: a, rank: c.isHeader ? 1 : 0, size: k.tt.getBBox().height + 1, point: c, x: g, tt: x });
          }
        });
        this.cleanSplit();
        n.positioner &&
          p.forEach(function (a) {
            var c = n.positioner.call(e, a.tt.getBBox().width, a.size, a.point);
            a.x = c.x;
            a.align = 0;
            a.target = c.y;
            a.rank = t(c.rank, a.rank);
          });
        a.distribute(p, r.plotHeight + d);
        p.forEach(function (a) {
          var c = a.point,
            k = c.series;
          a.tt.attr({
            visibility: void 0 === a.pos ? 'hidden' : 'inherit',
            x: l || c.isHeader || n.positioner ? a.x : c.plotX + r.plotLeft + e.distance,
            y: a.pos + C,
            anchorX: c.isHeader ? c.plotX + r.plotLeft : c.plotX + k.xAxis.pos,
            anchorY: c.isHeader ? r.plotTop + r.plotHeight / 2 : c.plotY + k.yAxis.pos,
          });
        });
      },
      updatePosition: function (a) {
        var f = this.chart,
          e = this.getLabel(),
          p = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a),
          r = a.plotX + f.plotLeft;
        a = a.plotY + f.plotTop;
        var b;
        this.outside &&
          ((b = (this.options.borderWidth || 0) + 2 * this.distance),
          this.renderer.setSize(e.width + b, e.height + b, !1),
          (r += f.pointer.chartPosition.left - p.x),
          (a += f.pointer.chartPosition.top - p.y));
        this.move(Math.round(p.x), Math.round(p.y || 0), r, a);
      },
      getDateFormat: function (a, f, e, p) {
        var r = this.chart.time,
          b = r.dateFormat('%m-%d %H:%M:%S.%L', f),
          l,
          n,
          d = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
          w = 'millisecond';
        for (n in y) {
          if (a === y.week && +r.dateFormat('%w', f) === e && '00:00:00.000' === b.substr(6)) {
            n = 'week';
            break;
          }
          if (y[n] > a) {
            n = w;
            break;
          }
          if (d[n] && b.substr(d[n]) !== '01-01 00:00:00.000'.substr(d[n])) break;
          'week' !== n && (w = n);
        }
        n && (l = r.resolveDTLFormat(p[n]).main);
        return l;
      },
      getXDateFormat: function (a, f, e) {
        f = f.dateTimeLabelFormats;
        var p = e && e.closestPointRange;
        return (p ? this.getDateFormat(p, a.x, e.options.startOfWeek, f) : f.day) || f.year;
      },
      tooltipFooterHeaderFormatter: function (g, f) {
        var e = f ? 'footer' : 'header',
          p = g.series,
          r = p.tooltipOptions,
          b = r.xDateFormat,
          l = p.xAxis,
          n = l && 'datetime' === l.options.type && m(g.key),
          d = r[e + 'Format'];
        f = { isFooter: f, labelConfig: g };
        a.fireEvent(this, 'headerFormatter', f, function (a) {
          n && !b && (b = this.getXDateFormat(g, r, l));
          n &&
            b &&
            ((g.point && g.point.tooltipDateKeys) || ['key']).forEach(function (a) {
              d = d.replace('{point.' + a + '}', '{point.' + a + ':' + b + '}');
            });
          p.chart.styledMode && (d = this.styledModeFormat(d));
          a.text = G(d, { point: g, series: p }, this.chart.time);
        });
        return f.text;
      },
      bodyFormatter: function (a) {
        return a.map(function (a) {
          var e = a.series.tooltipOptions;
          return (e[(a.point.formatPrefix || 'point') + 'Formatter'] || a.point.tooltipFormatter).call(
            a.point,
            e[(a.point.formatPrefix || 'point') + 'Format'] || ''
          );
        });
      },
      styledModeFormat: function (a) {
        return a
          .replace('style\x3d"font-size: 10px"', 'class\x3d"highcharts-header"')
          .replace(/style="color:{(point|series)\.color}"/g, 'class\x3d"highcharts-color-{$1.colorIndex}"');
      },
    };
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.attr,
      G = a.charts,
      m = a.color,
      g = a.css,
      t = a.defined,
      u = a.extend,
      v = a.find,
      y = a.fireEvent,
      q = a.isNumber,
      f = a.isObject,
      e = a.offset,
      p = a.pick,
      r = a.splat,
      b = a.Tooltip;
    a.Pointer = function (a, b) {
      this.init(a, b);
    };
    a.Pointer.prototype = {
      init: function (a, n) {
        this.options = n;
        this.chart = a;
        this.runChartClick = n.chart.events && !!n.chart.events.click;
        this.pinchDown = [];
        this.lastValidTouch = {};
        b && ((a.tooltip = new b(a, n.tooltip)), (this.followTouchMove = p(n.tooltip.followTouchMove, !0)));
        this.setDOMEvents();
      },
      zoomOption: function (a) {
        var b = this.chart,
          d = b.options.chart,
          l = d.zoomType || '',
          b = b.inverted;
        /touch/.test(a.type) && (l = p(d.pinchType, l));
        this.zoomX = a = /x/.test(l);
        this.zoomY = l = /y/.test(l);
        this.zoomHor = (a && !b) || (l && b);
        this.zoomVert = (l && !b) || (a && b);
        this.hasZoom = a || l;
      },
      normalize: function (a, b) {
        var d;
        d = a.touches ? (a.touches.length ? a.touches.item(0) : a.changedTouches[0]) : a;
        b || (this.chartPosition = b = e(this.chart.container));
        return u(a, { chartX: Math.round(d.pageX - b.left), chartY: Math.round(d.pageY - b.top) });
      },
      getCoordinates: function (a) {
        var b = { xAxis: [], yAxis: [] };
        this.chart.axes.forEach(function (d) {
          b[d.isXAxis ? 'xAxis' : 'yAxis'].push({ axis: d, value: d.toValue(a[d.horiz ? 'chartX' : 'chartY']) });
        });
        return b;
      },
      findNearestKDPoint: function (a, b, d) {
        var l;
        a.forEach(function (a) {
          var n = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf('y');
          a = a.searchPoint(d, n);
          if ((n = f(a, !0)) && !(n = !f(l, !0)))
            var n = l.distX - a.distX,
              e = l.dist - a.dist,
              c = (a.series.group && a.series.group.zIndex) - (l.series.group && l.series.group.zIndex),
              n = 0 < (0 !== n && b ? n : 0 !== e ? e : 0 !== c ? c : l.series.index > a.series.index ? -1 : 1);
          n && (l = a);
        });
        return l;
      },
      getPointFromEvent: function (a) {
        a = a.target;
        for (var b; a && !b; ) (b = a.point), (a = a.parentNode);
        return b;
      },
      getChartCoordinatesFromPoint: function (a, b) {
        var d = a.series,
          l = d.xAxis,
          d = d.yAxis,
          n = p(a.clientX, a.plotX),
          e = a.shapeArgs;
        if (l && d)
          return b
            ? { chartX: l.len + l.pos - n, chartY: d.len + d.pos - a.plotY }
            : { chartX: n + l.pos, chartY: a.plotY + d.pos };
        if (e && e.x && e.y) return { chartX: e.x, chartY: e.y };
      },
      getHoverData: function (a, b, d, e, r, g) {
        var l,
          c = [];
        e = !(!e || !a);
        var k =
          b && !b.stickyTracking
            ? [b]
            : d.filter(function (a) {
                return a.visible && !(!r && a.directTouch) && p(a.options.enableMouseTracking, !0) && a.stickyTracking;
              });
        b = (l = e ? a : this.findNearestKDPoint(k, r, g)) && l.series;
        l &&
          (r && !b.noSharedTooltip
            ? ((k = d.filter(function (a) {
                return (
                  a.visible && !(!r && a.directTouch) && p(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                );
              })),
              k.forEach(function (a) {
                var k = v(a.points, function (a) {
                  return a.x === l.x && !a.isNull;
                });
                f(k) && (a.chart.isBoosting && (k = a.getPoint(k)), c.push(k));
              }))
            : c.push(l));
        return { hoverPoint: l, hoverSeries: b, hoverPoints: c };
      },
      runPointActions: function (b, e) {
        var d = this.chart,
          l = d.tooltip && d.tooltip.options.enabled ? d.tooltip : void 0,
          n = l ? l.shared : !1,
          f = e || d.hoverPoint,
          r = (f && f.series) || d.hoverSeries,
          r = this.getHoverData(
            f,
            r,
            d.series,
            'touchmove' !== b.type && (!!e || (r && r.directTouch && this.isDirectTouch)),
            n,
            b
          ),
          c,
          f = r.hoverPoint;
        c = r.hoverPoints;
        e = (r = r.hoverSeries) && r.tooltipOptions.followPointer;
        n = n && r && !r.noSharedTooltip;
        if (f && (f !== d.hoverPoint || (l && l.isHidden))) {
          (d.hoverPoints || []).forEach(function (a) {
            -1 === c.indexOf(a) && a.setState();
          });
          (c || []).forEach(function (a) {
            a.setState('hover');
          });
          if (d.hoverSeries !== r) r.onMouseOver();
          d.hoverPoint && d.hoverPoint.firePointEvent('mouseOut');
          if (!f.series) return;
          f.firePointEvent('mouseOver');
          d.hoverPoints = c;
          d.hoverPoint = f;
          l && l.refresh(n ? c : f, b);
        } else e && l && !l.isHidden && ((f = l.getAnchor([{}], b)), l.updatePosition({ plotX: f[0], plotY: f[1] }));
        this.unDocMouseMove ||
          (this.unDocMouseMove = B(d.container.ownerDocument, 'mousemove', function (c) {
            var k = G[a.hoverChartIndex];
            if (k) k.pointer.onDocumentMouseMove(c);
          }));
        d.axes.forEach(function (k) {
          var d = p(k.crosshair.snap, !0),
            l = d
              ? a.find(c, function (a) {
                  return a.series[k.coll] === k;
                })
              : void 0;
          l || !d ? k.drawCrosshair(b, l) : k.hideCrosshair();
        });
      },
      reset: function (a, b) {
        var d = this.chart,
          l = d.hoverSeries,
          e = d.hoverPoint,
          n = d.hoverPoints,
          f = d.tooltip,
          c = f && f.shared ? n : e;
        a &&
          c &&
          r(c).forEach(function (c) {
            c.series.isCartesian && void 0 === c.plotX && (a = !1);
          });
        if (a)
          f &&
            c &&
            r(c).length &&
            (f.refresh(c),
            f.shared && n
              ? n.forEach(function (a) {
                  a.setState(a.state, !0);
                  a.series.isCartesian &&
                    (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a),
                    a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a));
                })
              : e &&
                (e.setState(e.state, !0),
                d.axes.forEach(function (a) {
                  a.crosshair && a.drawCrosshair(null, e);
                })));
        else {
          if (e) e.onMouseOut();
          n &&
            n.forEach(function (a) {
              a.setState();
            });
          if (l) l.onMouseOut();
          f && f.hide(b);
          this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
          d.axes.forEach(function (a) {
            a.hideCrosshair();
          });
          this.hoverX = d.hoverPoints = d.hoverPoint = null;
        }
      },
      scaleGroups: function (a, b) {
        var d = this.chart,
          l;
        d.series.forEach(function (e) {
          l = a || e.getPlotBox();
          e.xAxis &&
            e.xAxis.zoomEnabled &&
            e.group &&
            (e.group.attr(l),
            e.markerGroup && (e.markerGroup.attr(l), e.markerGroup.clip(b ? d.clipRect : null)),
            e.dataLabelsGroup && e.dataLabelsGroup.attr(l));
        });
        d.clipRect.attr(b || d.clipBox);
      },
      dragStart: function (a) {
        var b = this.chart;
        b.mouseIsDown = a.type;
        b.cancelClick = !1;
        b.mouseDownX = this.mouseDownX = a.chartX;
        b.mouseDownY = this.mouseDownY = a.chartY;
      },
      drag: function (a) {
        var b = this.chart,
          d = b.options.chart,
          l = a.chartX,
          e = a.chartY,
          f = this.zoomHor,
          r = this.zoomVert,
          c = b.plotLeft,
          k = b.plotTop,
          x = b.plotWidth,
          g = b.plotHeight,
          h,
          p = this.selectionMarker,
          q = this.mouseDownX,
          t = this.mouseDownY,
          v = d.panKey && a[d.panKey + 'Key'];
        (p && p.touch) ||
          (l < c ? (l = c) : l > c + x && (l = c + x),
          e < k ? (e = k) : e > k + g && (e = k + g),
          (this.hasDragged = Math.sqrt(Math.pow(q - l, 2) + Math.pow(t - e, 2))),
          10 < this.hasDragged &&
            ((h = b.isInsidePlot(q - c, t - k)),
            b.hasCartesianSeries &&
              (this.zoomX || this.zoomY) &&
              h &&
              !v &&
              !p &&
              ((this.selectionMarker = p = b.renderer
                .rect(c, k, f ? 1 : x, r ? 1 : g, 0)
                .attr({ class: 'highcharts-selection-marker', zIndex: 7 })
                .add()),
              b.styledMode ||
                p.attr({
                  fill: d.selectionMarkerFill || m('#335cad').setOpacity(0.25).get(),
                })),
            p && f && ((l -= q), p.attr({ width: Math.abs(l), x: (0 < l ? 0 : l) + q })),
            p && r && ((l = e - t), p.attr({ height: Math.abs(l), y: (0 < l ? 0 : l) + t })),
            h && !p && d.panning && b.pan(a, d.panning)));
      },
      drop: function (a) {
        var b = this,
          d = this.chart,
          l = this.hasPinched;
        if (this.selectionMarker) {
          var e = { originalEvent: a, xAxis: [], yAxis: [] },
            f = this.selectionMarker,
            r = f.attr ? f.attr('x') : f.x,
            c = f.attr ? f.attr('y') : f.y,
            k = f.attr ? f.attr('width') : f.width,
            x = f.attr ? f.attr('height') : f.height,
            p;
          if (this.hasDragged || l)
            d.axes.forEach(function (h) {
              if (h.zoomEnabled && t(h.min) && (l || b[{ xAxis: 'zoomX', yAxis: 'zoomY' }[h.coll]])) {
                var d = h.horiz,
                  n = 'touchend' === a.type ? h.minPixelPadding : 0,
                  f = h.toValue((d ? r : c) + n),
                  d = h.toValue((d ? r + k : c + x) - n);
                e[h.coll].push({ axis: h, min: Math.min(f, d), max: Math.max(f, d) });
                p = !0;
              }
            }),
              p &&
                y(d, 'selection', e, function (a) {
                  d.zoom(u(a, l ? { animation: !1 } : null));
                });
          q(d.index) && (this.selectionMarker = this.selectionMarker.destroy());
          l && this.scaleGroups();
        }
        d &&
          q(d.index) &&
          (g(d.container, { cursor: d._cursor }),
          (d.cancelClick = 10 < this.hasDragged),
          (d.mouseIsDown = this.hasDragged = this.hasPinched = !1),
          (this.pinchDown = []));
      },
      onContainerMouseDown: function (a) {
        a = this.normalize(a);
        2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a));
      },
      onDocumentMouseUp: function (b) {
        G[a.hoverChartIndex] && G[a.hoverChartIndex].pointer.drop(b);
      },
      onDocumentMouseMove: function (a) {
        var b = this.chart,
          d = this.chartPosition;
        a = this.normalize(a, d);
        !d ||
          this.inClass(a.target, 'highcharts-tracker') ||
          b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) ||
          this.reset();
      },
      onContainerMouseLeave: function (b) {
        var l = G[a.hoverChartIndex];
        l && (b.relatedTarget || b.toElement) && (l.pointer.reset(), (l.pointer.chartPosition = null));
      },
      onContainerMouseMove: function (b) {
        var l = this.chart;
        (t(a.hoverChartIndex) && G[a.hoverChartIndex] && G[a.hoverChartIndex].mouseIsDown) ||
          (a.hoverChartIndex = l.index);
        b = this.normalize(b);
        b.preventDefault || (b.returnValue = !1);
        'mousedown' === l.mouseIsDown && this.drag(b);
        (!this.inClass(b.target, 'highcharts-tracker') &&
          !l.isInsidePlot(b.chartX - l.plotLeft, b.chartY - l.plotTop)) ||
          l.openMenu ||
          this.runPointActions(b);
      },
      inClass: function (a, b) {
        for (var d; a; ) {
          if ((d = A(a, 'class'))) {
            if (-1 !== d.indexOf(b)) return !0;
            if (-1 !== d.indexOf('highcharts-container')) return !1;
          }
          a = a.parentNode;
        }
      },
      onTrackerMouseOut: function (a) {
        var b = this.chart.hoverSeries;
        a = a.relatedTarget || a.toElement;
        this.isDirectTouch = !1;
        if (
          !(
            !b ||
            !a ||
            b.stickyTracking ||
            this.inClass(a, 'highcharts-tooltip') ||
            (this.inClass(a, 'highcharts-series-' + b.index) && this.inClass(a, 'highcharts-tracker'))
          )
        )
          b.onMouseOut();
      },
      onContainerClick: function (a) {
        var b = this.chart,
          d = b.hoverPoint,
          l = b.plotLeft,
          e = b.plotTop;
        a = this.normalize(a);
        b.cancelClick ||
          (d && this.inClass(a.target, 'highcharts-tracker')
            ? (y(d.series, 'click', u(a, { point: d })), b.hoverPoint && d.firePointEvent('click', a))
            : (u(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - l, a.chartY - e) && y(b, 'click', a)));
      },
      setDOMEvents: function () {
        var b = this,
          e = b.chart.container,
          d = e.ownerDocument;
        e.onmousedown = function (a) {
          b.onContainerMouseDown(a);
        };
        e.onmousemove = function (a) {
          b.onContainerMouseMove(a);
        };
        e.onclick = function (a) {
          b.onContainerClick(a);
        };
        this.unbindContainerMouseLeave = B(e, 'mouseleave', b.onContainerMouseLeave);
        a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = B(d, 'mouseup', b.onDocumentMouseUp));
        a.hasTouch &&
          ((e.ontouchstart = function (a) {
            b.onContainerTouchStart(a);
          }),
          (e.ontouchmove = function (a) {
            b.onContainerTouchMove(a);
          }),
          a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = B(d, 'touchend', b.onDocumentTouchEnd)));
      },
      destroy: function () {
        var b = this;
        b.unDocMouseMove && b.unDocMouseMove();
        this.unbindContainerMouseLeave();
        a.chartCount ||
          (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()),
          a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
        clearInterval(b.tooltipTimeout);
        a.objectEach(b, function (a, d) {
          b[d] = null;
        });
      },
    };
  })(H);
  (function (a) {
    var B = a.charts,
      A = a.extend,
      G = a.noop,
      m = a.pick;
    A(a.Pointer.prototype, {
      pinchTranslate: function (a, m, u, v, y, q) {
        this.zoomHor && this.pinchTranslateDirection(!0, a, m, u, v, y, q);
        this.zoomVert && this.pinchTranslateDirection(!1, a, m, u, v, y, q);
      },
      pinchTranslateDirection: function (a, m, u, v, y, q, f, e) {
        var p = this.chart,
          r = a ? 'x' : 'y',
          b = a ? 'X' : 'Y',
          l = 'chart' + b,
          n = a ? 'width' : 'height',
          d = p['plot' + (a ? 'Left' : 'Top')],
          w,
          g,
          C = e || 1,
          F = p.inverted,
          c = p.bounds[a ? 'h' : 'v'],
          k = 1 === m.length,
          x = m[0][l],
          D = u[0][l],
          h = !k && m[1][l],
          z = !k && u[1][l],
          t;
        u = function () {
          !k && 20 < Math.abs(x - h) && (C = e || Math.abs(D - z) / Math.abs(x - h));
          g = (d - D) / C + x;
          w = p['plot' + (a ? 'Width' : 'Height')] / C;
        };
        u();
        m = g;
        m < c.min ? ((m = c.min), (t = !0)) : m + w > c.max && ((m = c.max - w), (t = !0));
        t ? ((D -= 0.8 * (D - f[r][0])), k || (z -= 0.8 * (z - f[r][1])), u()) : (f[r] = [D, z]);
        F || ((q[r] = g - d), (q[n] = w));
        q = F ? 1 / C : C;
        y[n] = w;
        y[r] = m;
        v[F ? (a ? 'scaleY' : 'scaleX') : 'scale' + b] = C;
        v['translate' + b] = q * d + (D - q * x);
      },
      pinch: function (a) {
        var g = this,
          u = g.chart,
          v = g.pinchDown,
          y = a.touches,
          q = y.length,
          f = g.lastValidTouch,
          e = g.hasZoom,
          p = g.selectionMarker,
          r = {},
          b = 1 === q && ((g.inClass(a.target, 'highcharts-tracker') && u.runTrackerClick) || g.runChartClick),
          l = {};
        1 < q && (g.initiated = !0);
        e && g.initiated && !b && a.preventDefault();
        [].map.call(y, function (a) {
          return g.normalize(a);
        });
        'touchstart' === a.type
          ? ([].forEach.call(y, function (a, b) {
              v[b] = { chartX: a.chartX, chartY: a.chartY };
            }),
            (f.x = [v[0].chartX, v[1] && v[1].chartX]),
            (f.y = [v[0].chartY, v[1] && v[1].chartY]),
            u.axes.forEach(function (a) {
              if (a.zoomEnabled) {
                var b = u.bounds[a.horiz ? 'h' : 'v'],
                  l = a.minPixelPadding,
                  e = a.toPixels(m(a.options.min, a.dataMin)),
                  f = a.toPixels(m(a.options.max, a.dataMax)),
                  n = Math.max(e, f);
                b.min = Math.min(a.pos, Math.min(e, f) - l);
                b.max = Math.max(a.pos + a.len, n + l);
              }
            }),
            (g.res = !0))
          : g.followTouchMove && 1 === q
          ? this.runPointActions(g.normalize(a))
          : v.length &&
            (p || (g.selectionMarker = p = A({ destroy: G, touch: !0 }, u.plotBox)),
            g.pinchTranslate(v, y, r, p, l, f),
            (g.hasPinched = e),
            g.scaleGroups(r, l),
            g.res && ((g.res = !1), this.reset(!1, 0)));
      },
      touch: function (g, t) {
        var u = this.chart,
          v,
          y;
        if (u.index !== a.hoverChartIndex) this.onContainerMouseLeave({ relatedTarget: !0 });
        a.hoverChartIndex = u.index;
        1 === g.touches.length
          ? ((g = this.normalize(g)),
            (y = u.isInsidePlot(g.chartX - u.plotLeft, g.chartY - u.plotTop)) && !u.openMenu
              ? (t && this.runPointActions(g),
                'touchmove' === g.type &&
                  ((t = this.pinchDown),
                  (v = t[0]
                    ? 4 <= Math.sqrt(Math.pow(t[0].chartX - g.chartX, 2) + Math.pow(t[0].chartY - g.chartY, 2))
                    : !1)),
                m(v, !0) && this.pinch(g))
              : t && this.reset())
          : 2 === g.touches.length && this.pinch(g);
      },
      onContainerTouchStart: function (a) {
        this.zoomOption(a);
        this.touch(a, !0);
      },
      onContainerTouchMove: function (a) {
        this.touch(a);
      },
      onDocumentTouchEnd: function (g) {
        B[a.hoverChartIndex] && B[a.hoverChartIndex].pointer.drop(g);
      },
    });
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.charts,
      G = a.css,
      m = a.doc,
      g = a.extend,
      t = a.noop,
      u = a.Pointer,
      v = a.removeEvent,
      y = a.win,
      q = a.wrap;
    if (!a.hasTouch && (y.PointerEvent || y.MSPointerEvent)) {
      var f = {},
        e = !!y.PointerEvent,
        p = function () {
          var b = [];
          b.item = function (a) {
            return this[a];
          };
          a.objectEach(f, function (a) {
            b.push({ pageX: a.pageX, pageY: a.pageY, target: a.target });
          });
          return b;
        },
        r = function (b, l, e, d) {
          ('touch' !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH) ||
            !A[a.hoverChartIndex] ||
            (d(b),
            (d = A[a.hoverChartIndex].pointer),
            d[l]({ type: e, target: b.currentTarget, preventDefault: t, touches: p() }));
        };
      g(u.prototype, {
        onContainerPointerDown: function (a) {
          r(a, 'onContainerTouchStart', 'touchstart', function (a) {
            f[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget };
          });
        },
        onContainerPointerMove: function (a) {
          r(a, 'onContainerTouchMove', 'touchmove', function (a) {
            f[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };
            f[a.pointerId].target || (f[a.pointerId].target = a.currentTarget);
          });
        },
        onDocumentPointerUp: function (a) {
          r(a, 'onDocumentTouchEnd', 'touchend', function (a) {
            delete f[a.pointerId];
          });
        },
        batchMSEvents: function (a) {
          a(this.chart.container, e ? 'pointerdown' : 'MSPointerDown', this.onContainerPointerDown);
          a(this.chart.container, e ? 'pointermove' : 'MSPointerMove', this.onContainerPointerMove);
          a(m, e ? 'pointerup' : 'MSPointerUp', this.onDocumentPointerUp);
        },
      });
      q(u.prototype, 'init', function (a, l, e) {
        a.call(this, l, e);
        this.hasZoom && G(l.container, { '-ms-touch-action': 'none', 'touch-action': 'none' });
      });
      q(u.prototype, 'setDOMEvents', function (a) {
        a.apply(this);
        (this.hasZoom || this.followTouchMove) && this.batchMSEvents(B);
      });
      q(u.prototype, 'destroy', function (a) {
        this.batchMSEvents(v);
        a.call(this);
      });
    }
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.css,
      G = a.discardElement,
      m = a.defined,
      g = a.fireEvent,
      t = a.isFirefox,
      u = a.marginNames,
      v = a.merge,
      y = a.pick,
      q = a.setAnimation,
      f = a.stableSort,
      e = a.win,
      p = a.wrap;
    a.Legend = function (a, b) {
      this.init(a, b);
    };
    a.Legend.prototype = {
      init: function (a, b) {
        this.chart = a;
        this.setOptions(b);
        b.enabled &&
          (this.render(),
          B(this.chart, 'endResize', function () {
            this.legend.positionCheckboxes();
          }),
          this.proximate
            ? (this.unchartrender = B(this.chart, 'render', function () {
                this.legend.proximatePositions();
                this.legend.positionItems();
              }))
            : this.unchartrender && this.unchartrender());
      },
      setOptions: function (a) {
        var b = y(a.padding, 8);
        this.options = a;
        this.chart.styledMode ||
          ((this.itemStyle = a.itemStyle), (this.itemHiddenStyle = v(this.itemStyle, a.itemHiddenStyle)));
        this.itemMarginTop = a.itemMarginTop || 0;
        this.padding = b;
        this.initialItemY = b - 5;
        this.symbolWidth = y(a.symbolWidth, 16);
        this.pages = [];
        this.proximate = 'proximate' === a.layout && !this.chart.inverted;
      },
      update: function (a, b) {
        var e = this.chart;
        this.setOptions(v(!0, this.options, a));
        this.destroy();
        e.isDirtyLegend = e.isDirtyBox = !0;
        y(b, !0) && e.redraw();
        g(this, 'afterUpdate');
      },
      colorizeItem: function (a, b) {
        a.legendGroup[b ? 'removeClass' : 'addClass']('highcharts-legend-item-hidden');
        if (!this.chart.styledMode) {
          var e = this.options,
            f = a.legendItem,
            d = a.legendLine,
            r = a.legendSymbol,
            p = this.itemHiddenStyle.color,
            e = b ? e.itemStyle.color : p,
            q = b ? a.color || p : p,
            m = a.options && a.options.marker,
            c = { fill: q };
          f && f.css({ fill: e, color: e });
          d && d.attr({ stroke: q });
          r && (m && r.isMarker && ((c = a.pointAttribs()), b || (c.stroke = c.fill = p)), r.attr(c));
        }
        g(this, 'afterColorizeItem', { item: a, visible: b });
      },
      positionItems: function () {
        this.allItems.forEach(this.positionItem, this);
        this.chart.isResizing || this.positionCheckboxes();
      },
      positionItem: function (a) {
        var b = this.options,
          e = b.symbolPadding,
          b = !b.rtl,
          f = a._legendItemPos,
          d = f[0],
          f = f[1],
          r = a.checkbox;
        if ((a = a.legendGroup) && a.element)
          a[m(a.translateY) ? 'animate' : 'attr']({
            translateX: b ? d : this.legendWidth - d - 2 * e - 4,
            translateY: f,
          });
        r && ((r.x = d), (r.y = f));
      },
      destroyItem: function (a) {
        var b = a.checkbox;
        ['legendItem', 'legendLine', 'legendSymbol', 'legendGroup'].forEach(function (b) {
          a[b] && (a[b] = a[b].destroy());
        });
        b && G(a.checkbox);
      },
      destroy: function () {
        function a(a) {
          this[a] && (this[a] = this[a].destroy());
        }
        this.getAllItems().forEach(function (b) {
          ['legendItem', 'legendGroup'].forEach(a, b);
        });
        'clipRect up down pager nav box title group'.split(' ').forEach(a, this);
        this.display = null;
      },
      positionCheckboxes: function () {
        var a = this.group && this.group.alignAttr,
          b,
          e = this.clipHeight || this.legendHeight,
          f = this.titleHeight;
        a &&
          ((b = a.translateY),
          this.allItems.forEach(function (d) {
            var l = d.checkbox,
              n;
            l &&
              ((n = b + f + l.y + (this.scrollOffset || 0) + 3),
              A(l, {
                left: a.translateX + d.checkboxOffset + l.x - 20 + 'px',
                top: n + 'px',
                display: this.proximate || (n > b - 6 && n < b + e - 6) ? '' : 'none',
              }));
          }, this));
      },
      renderTitle: function () {
        var a = this.options,
          b = this.padding,
          e = a.title,
          f = 0;
        e.text &&
          (this.title ||
            ((this.title = this.chart.renderer
              .label(e.text, b - 3, b - 4, null, null, null, a.useHTML, null, 'legend-title')
              .attr({ zIndex: 1 })),
            this.chart.styledMode || this.title.css(e.style),
            this.title.add(this.group)),
          e.width || this.title.css({ width: this.maxLegendWidth + 'px' }),
          (a = this.title.getBBox()),
          (f = a.height),
          (this.offsetWidth = a.width),
          this.contentGroup.attr({ translateY: f }));
        this.titleHeight = f;
      },
      setText: function (e) {
        var b = this.options;
        e.legendItem.attr({
          text: b.labelFormat ? a.format(b.labelFormat, e, this.chart.time) : b.labelFormatter.call(e),
        });
      },
      renderItem: function (a) {
        var b = this.chart,
          e = b.renderer,
          f = this.options,
          d = this.symbolWidth,
          p = f.symbolPadding,
          g = this.itemStyle,
          r = this.itemHiddenStyle,
          q = 'horizontal' === f.layout ? y(f.itemDistance, 20) : 0,
          c = !f.rtl,
          k = a.legendItem,
          x = !a.series,
          D = !x && a.series.drawLegendSymbol ? a.series : a,
          h = D.options,
          h = this.createCheckboxForItem && h && h.showCheckbox,
          q = d + p + q + (h ? 20 : 0),
          z = f.useHTML,
          m = a.options.className;
        k ||
          ((a.legendGroup = e
            .g('legend-item')
            .addClass(
              'highcharts-' +
                D.type +
                '-series highcharts-color-' +
                a.colorIndex +
                (m ? ' ' + m : '') +
                (x ? ' highcharts-series-' + a.index : '')
            )
            .attr({ zIndex: 1 })
            .add(this.scrollGroup)),
          (a.legendItem = k = e.text('', c ? d + p : -p, this.baseline || 0, z)),
          b.styledMode || k.css(v(a.visible ? g : r)),
          k.attr({ align: c ? 'left' : 'right', zIndex: 2 }).add(a.legendGroup),
          this.baseline ||
            ((this.fontMetrics = e.fontMetrics(b.styledMode ? 12 : g.fontSize, k)),
            (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
            k.attr('y', this.baseline)),
          (this.symbolHeight = f.symbolHeight || this.fontMetrics.f),
          D.drawLegendSymbol(this, a),
          this.setItemEvents && this.setItemEvents(a, k, z),
          h && this.createCheckboxForItem(a));
        this.colorizeItem(a, a.visible);
        (!b.styledMode && g.width) || k.css({ width: (f.itemWidth || this.widthOption || b.spacingBox.width) - q });
        this.setText(a);
        b = k.getBBox();
        a.itemWidth = a.checkboxOffset = f.itemWidth || a.legendItemWidth || b.width + q;
        this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
        this.totalItemWidth += a.itemWidth;
        this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight);
      },
      layoutItem: function (a) {
        var b = this.options,
          e = this.padding,
          f = 'horizontal' === b.layout,
          d = a.itemHeight,
          p = b.itemMarginBottom || 0,
          g = this.itemMarginTop,
          r = f ? y(b.itemDistance, 20) : 0,
          q = this.maxLegendWidth,
          b = b.alignColumns && this.totalItemWidth > q ? this.maxItemWidth : a.itemWidth;
        f &&
          this.itemX - e + b > q &&
          ((this.itemX = e), (this.itemY += g + this.lastLineHeight + p), (this.lastLineHeight = 0));
        this.lastItemY = g + this.itemY + p;
        this.lastLineHeight = Math.max(d, this.lastLineHeight);
        a._legendItemPos = [this.itemX, this.itemY];
        f ? (this.itemX += b) : ((this.itemY += g + d + p), (this.lastLineHeight = d));
        this.offsetWidth =
          this.widthOption || Math.max((f ? this.itemX - e - (a.checkbox ? 0 : r) : b) + e, this.offsetWidth);
      },
      getAllItems: function () {
        var a = [];
        this.chart.series.forEach(function (b) {
          var e = b && b.options;
          b &&
            y(e.showInLegend, m(e.linkedTo) ? !1 : void 0, !0) &&
            (a = a.concat(b.legendItems || ('point' === e.legendType ? b.data : b)));
        });
        g(this, 'afterGetAllItems', { allItems: a });
        return a;
      },
      getAlignment: function () {
        var a = this.options;
        return this.proximate
          ? a.align.charAt(0) + 'tv'
          : a.floating
          ? ''
          : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0);
      },
      adjustMargins: function (a, b) {
        var e = this.chart,
          f = this.options,
          d = this.getAlignment(),
          p = void 0 !== e.options.title.margin ? e.titleOffset + e.options.title.margin : 0;
        d &&
          [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (l, n) {
            l.test(d) &&
              !m(a[n]) &&
              (e[u[n]] = Math.max(
                e[u[n]],
                e.legend[(n + 1) % 2 ? 'legendHeight' : 'legendWidth'] +
                  [1, -1, -1, 1][n] * f[n % 2 ? 'x' : 'y'] +
                  y(f.margin, 12) +
                  b[n] +
                  (0 === n && (0 === e.titleOffset ? 0 : p))
              ));
          });
      },
      proximatePositions: function () {
        var e = this.chart,
          b = [],
          l = 'left' === this.options.align;
        this.allItems.forEach(function (f) {
          var d, n;
          d = l;
          f.xAxis &&
            f.points &&
            (f.xAxis.options.reversed && (d = !d),
            (d = a.find(d ? f.points : f.points.slice(0).reverse(), function (b) {
              return a.isNumber(b.plotY);
            })),
            (n = f.legendGroup.getBBox().height),
            b.push({ target: f.visible ? (d ? d.plotY : f.xAxis.height) - 0.3 * n : e.plotHeight, size: n, item: f }));
        }, this);
        a.distribute(b, e.plotHeight);
        b.forEach(function (a) {
          a.item._legendItemPos[1] = e.plotTop - e.spacing[0] + a.pos;
        });
      },
      render: function () {
        var e = this.chart,
          b = e.renderer,
          l = this.group,
          n,
          d,
          p,
          q = this.box,
          m = this.options,
          F = this.padding;
        this.itemX = F;
        this.itemY = this.initialItemY;
        this.lastItemY = this.offsetWidth = 0;
        this.widthOption = a.relativeLength(m.width, e.spacingBox.width - F);
        n = e.spacingBox.width - 2 * F - m.x;
        -1 < ['rm', 'lm'].indexOf(this.getAlignment().substring(0, 2)) && (n /= 2);
        this.maxLegendWidth = this.widthOption || n;
        l ||
          ((this.group = l = b.g('legend').attr({ zIndex: 7 }).add()),
          (this.contentGroup = b.g().attr({ zIndex: 1 }).add(l)),
          (this.scrollGroup = b.g().add(this.contentGroup)));
        this.renderTitle();
        n = this.getAllItems();
        f(n, function (a, b) {
          return ((a.options && a.options.legendIndex) || 0) - ((b.options && b.options.legendIndex) || 0);
        });
        m.reversed && n.reverse();
        this.allItems = n;
        this.display = d = !!n.length;
        this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
        n.forEach(this.renderItem, this);
        n.forEach(this.layoutItem, this);
        n = (this.widthOption || this.offsetWidth) + F;
        p = this.lastItemY + this.lastLineHeight + this.titleHeight;
        p = this.handleOverflow(p);
        p += F;
        q ||
          ((this.box = q = b.rect().addClass('highcharts-legend-box').attr({ r: m.borderRadius }).add(l)),
          (q.isNew = !0));
        e.styledMode ||
          q
            .attr({ stroke: m.borderColor, 'stroke-width': m.borderWidth || 0, fill: m.backgroundColor || 'none' })
            .shadow(m.shadow);
        0 < n &&
          0 < p &&
          (q[q.isNew ? 'attr' : 'animate'](q.crisp.call({}, { x: 0, y: 0, width: n, height: p }, q.strokeWidth())),
          (q.isNew = !1));
        q[d ? 'show' : 'hide']();
        e.styledMode && 'none' === l.getStyle('display') && (n = p = 0);
        this.legendWidth = n;
        this.legendHeight = p;
        d &&
          ((b = e.spacingBox),
          /(lth|ct|rth)/.test(this.getAlignment()) &&
            ((q = b.y + e.titleOffset), (b = v(b, { y: 0 < e.titleOffset ? (q += e.options.title.margin) : q }))),
          l.align(v(m, { width: n, height: p, verticalAlign: this.proximate ? 'top' : m.verticalAlign }), !0, b));
        this.proximate || this.positionItems();
        g(this, 'afterRender');
      },
      handleOverflow: function (a) {
        var b = this,
          e = this.chart,
          f = e.renderer,
          d = this.options,
          p = d.y,
          g = this.padding,
          p = e.spacingBox.height + ('top' === d.verticalAlign ? -p : p) - g,
          r = d.maxHeight,
          q,
          c = this.clipRect,
          k = d.navigation,
          x = y(k.animation, !0),
          D = k.arrowSize || 12,
          h = this.nav,
          z = this.pages,
          m,
          t = this.allItems,
          v = function (a) {
            'number' === typeof a ? c.attr({ height: a }) : c && ((b.clipRect = c.destroy()), b.contentGroup.clip());
            b.contentGroup.div &&
              (b.contentGroup.div.style.clip = a ? 'rect(' + g + 'px,9999px,' + (g + a) + 'px,0)' : 'auto');
          };
        'horizontal' !== d.layout || 'middle' === d.verticalAlign || d.floating || (p /= 2);
        r && (p = Math.min(p, r));
        z.length = 0;
        a > p && !1 !== k.enabled
          ? ((this.clipHeight = q = Math.max(p - 20 - this.titleHeight - g, 0)),
            (this.currentPage = y(this.currentPage, 1)),
            (this.fullHeight = a),
            t.forEach(function (a, c) {
              var b = a._legendItemPos[1],
                k = Math.round(a.legendItem.getBBox().height),
                h = z.length;
              if (!h || (b - z[h - 1] > q && (m || b) !== z[h - 1])) z.push(m || b), h++;
              a.pageIx = h - 1;
              m && (t[c - 1].pageIx = h - 1);
              c === t.length - 1 && b + k - z[h - 1] > q && b !== m && (z.push(b), (a.pageIx = h));
              b !== m && (m = b);
            }),
            c || ((c = b.clipRect = f.clipRect(0, g, 9999, 0)), b.contentGroup.clip(c)),
            v(q),
            h ||
              ((this.nav = h = f.g().attr({ zIndex: 1 }).add(this.group)),
              (this.up = f
                .symbol('triangle', 0, 0, D, D)
                .on('click', function () {
                  b.scroll(-1, x);
                })
                .add(h)),
              (this.pager = f.text('', 15, 10).addClass('highcharts-legend-navigation')),
              e.styledMode || this.pager.css(k.style),
              this.pager.add(h),
              (this.down = f
                .symbol('triangle-down', 0, 0, D, D)
                .on('click', function () {
                  b.scroll(1, x);
                })
                .add(h))),
            b.scroll(0),
            (a = p))
          : h && (v(), (this.nav = h.destroy()), this.scrollGroup.attr({ translateY: 1 }), (this.clipHeight = 0));
        return a;
      },
      scroll: function (a, b) {
        var e = this.pages,
          f = e.length;
        a = this.currentPage + a;
        var d = this.clipHeight,
          p = this.options.navigation,
          g = this.pager,
          r = this.padding;
        a > f && (a = f);
        0 < a &&
          (void 0 !== b && q(b, this.chart),
          this.nav.attr({ translateX: r, translateY: d + this.padding + 7 + this.titleHeight, visibility: 'visible' }),
          this.up.attr({ class: 1 === a ? 'highcharts-legend-nav-inactive' : 'highcharts-legend-nav-active' }),
          g.attr({ text: a + '/' + f }),
          this.down.attr({
            x: 18 + this.pager.getBBox().width,
            class: a === f ? 'highcharts-legend-nav-inactive' : 'highcharts-legend-nav-active',
          }),
          this.chart.styledMode ||
            (this.up
              .attr({ fill: 1 === a ? p.inactiveColor : p.activeColor })
              .css({ cursor: 1 === a ? 'default' : 'pointer' }),
            this.down
              .attr({ fill: a === f ? p.inactiveColor : p.activeColor })
              .css({ cursor: a === f ? 'default' : 'pointer' })),
          (this.scrollOffset = -e[a - 1] + this.initialItemY),
          this.scrollGroup.animate({ translateY: this.scrollOffset }),
          (this.currentPage = a),
          this.positionCheckboxes());
      },
    };
    a.LegendSymbolMixin = {
      drawRectangle: function (a, b) {
        var e = a.symbolHeight,
          f = a.options.squareSymbol;
        b.legendSymbol = this.chart.renderer
          .rect(
            f ? (a.symbolWidth - e) / 2 : 0,
            a.baseline - e + 1,
            f ? e : a.symbolWidth,
            e,
            y(a.options.symbolRadius, e / 2)
          )
          .addClass('highcharts-point')
          .attr({ zIndex: 3 })
          .add(b.legendGroup);
      },
      drawLineMarker: function (a) {
        var b = this.options,
          e = b.marker,
          f = a.symbolWidth,
          d = a.symbolHeight,
          p = d / 2,
          g = this.chart.renderer,
          r = this.legendGroup;
        a = a.baseline - Math.round(0.3 * a.fontMetrics.b);
        var q = {};
        this.chart.styledMode ||
          ((q = { 'stroke-width': b.lineWidth || 0 }), b.dashStyle && (q.dashstyle = b.dashStyle));
        this.legendLine = g.path(['M', 0, a, 'L', f, a]).addClass('highcharts-graph').attr(q).add(r);
        e &&
          !1 !== e.enabled &&
          f &&
          ((b = Math.min(y(e.radius, p), p)),
          0 === this.symbol.indexOf('url') && ((e = v(e, { width: d, height: d })), (b = 0)),
          (this.legendSymbol = e = g
            .symbol(this.symbol, f / 2 - b, a - b, 2 * b, 2 * b, e)
            .addClass('highcharts-point')
            .add(r)),
          (e.isMarker = !0));
      },
    };
    (/Trident\/7\.0/.test(e.navigator && e.navigator.userAgent) || t) &&
      p(a.Legend.prototype, 'positionItem', function (a, b) {
        var e = this,
          f = function () {
            b._legendItemPos && a.call(e, b);
          };
        f();
        e.bubbleLegend || setTimeout(f);
      });
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.animate,
      G = a.animObject,
      m = a.attr,
      g = a.doc,
      t = a.Axis,
      u = a.createElement,
      v = a.defaultOptions,
      y = a.discardElement,
      q = a.charts,
      f = a.css,
      e = a.defined,
      p = a.extend,
      r = a.find,
      b = a.fireEvent,
      l = a.isNumber,
      n = a.isObject,
      d = a.isString,
      w = a.Legend,
      E = a.marginNames,
      C = a.merge,
      F = a.objectEach,
      c = a.Pointer,
      k = a.pick,
      x = a.pInt,
      D = a.removeEvent,
      h = a.seriesTypes,
      z = a.splat,
      L = a.syncTimeout,
      J = a.win,
      W = (a.Chart = function () {
        this.getArgs.apply(this, arguments);
      });
    a.chart = function (a, c, b) {
      return new W(a, c, b);
    };
    p(W.prototype, {
      callbacks: [],
      getArgs: function () {
        var a = [].slice.call(arguments);
        if (d(a[0]) || a[0].nodeName) this.renderTo = a.shift();
        this.init(a[0], a[1]);
      },
      init: function (c, k) {
        var h,
          d,
          e = c.series,
          x = c.plotOptions || {};
        b(this, 'init', { args: arguments }, function () {
          c.series = null;
          h = C(v, c);
          for (d in h.plotOptions) h.plotOptions[d].tooltip = (x[d] && C(x[d].tooltip)) || void 0;
          h.tooltip.userOptions = (c.chart && c.chart.forExport && c.tooltip.userOptions) || c.tooltip;
          h.series = c.series = e;
          this.userOptions = c;
          var f = h.chart,
            l = f.events;
          this.margin = [];
          this.spacing = [];
          this.bounds = { h: {}, v: {} };
          this.labelCollectors = [];
          this.callback = k;
          this.isResizing = 0;
          this.options = h;
          this.axes = [];
          this.series = [];
          this.time = c.time && Object.keys(c.time).length ? new a.Time(c.time) : a.time;
          this.styledMode = f.styledMode;
          this.hasCartesianSeries = f.showAxes;
          var p = this;
          p.index = q.length;
          q.push(p);
          a.chartCount++;
          l &&
            F(l, function (a, c) {
              B(p, c, a);
            });
          p.xAxis = [];
          p.yAxis = [];
          p.pointCount = p.colorCounter = p.symbolCounter = 0;
          b(p, 'afterInit');
          p.firstRender();
        });
      },
      initSeries: function (c) {
        var b = this.options.chart;
        (b = h[c.type || b.type || b.defaultSeriesType]) || a.error(17, !0, this);
        b = new b();
        b.init(this, c);
        return b;
      },
      orderSeries: function (a) {
        var c = this.series;
        for (a = a || 0; a < c.length; a++) c[a] && ((c[a].index = a), (c[a].name = c[a].getName()));
      },
      isInsidePlot: function (a, c, b) {
        var k = b ? c : a;
        a = b ? a : c;
        return 0 <= k && k <= this.plotWidth && 0 <= a && a <= this.plotHeight;
      },
      redraw: function (c) {
        b(this, 'beforeRedraw');
        var k = this.axes,
          h = this.series,
          d = this.pointer,
          e = this.legend,
          x = this.userOptions.legend,
          f = this.isDirtyLegend,
          l,
          n,
          g = this.hasCartesianSeries,
          z = this.isDirtyBox,
          r,
          D = this.renderer,
          q = D.isHidden(),
          w = [];
        this.setResponsive && this.setResponsive(!1);
        a.setAnimation(c, this);
        q && this.temporaryDisplay();
        this.layOutTitles();
        for (c = h.length; c--; )
          if (((r = h[c]), r.options.stacking && ((l = !0), r.isDirty))) {
            n = !0;
            break;
          }
        if (n) for (c = h.length; c--; ) (r = h[c]), r.options.stacking && (r.isDirty = !0);
        h.forEach(function (a) {
          a.isDirty &&
            ('point' === a.options.legendType
              ? (a.updateTotals && a.updateTotals(), (f = !0))
              : x && (x.labelFormatter || x.labelFormat) && (f = !0));
          a.isDirtyData && b(a, 'updatedData');
        });
        f && e && e.options.enabled && (e.render(), (this.isDirtyLegend = !1));
        l && this.getStacks();
        g &&
          k.forEach(function (a) {
            a.updateNames();
            a.setScale();
          });
        this.getMargins();
        g &&
          (k.forEach(function (a) {
            a.isDirty && (z = !0);
          }),
          k.forEach(function (a) {
            var c = a.min + ',' + a.max;
            a.extKey !== c &&
              ((a.extKey = c),
              w.push(function () {
                b(a, 'afterSetExtremes', p(a.eventArgs, a.getExtremes()));
                delete a.eventArgs;
              }));
            (z || l) && a.redraw();
          }));
        z && this.drawChartBox();
        b(this, 'predraw');
        h.forEach(function (a) {
          (z || a.isDirty) && a.visible && a.redraw();
          a.isDirtyData = !1;
        });
        d && d.reset(!0);
        D.draw();
        b(this, 'redraw');
        b(this, 'render');
        q && this.temporaryDisplay(!0);
        w.forEach(function (a) {
          a.call();
        });
      },
      get: function (a) {
        function c(c) {
          return c.id === a || (c.options && c.options.id === a);
        }
        var b,
          k = this.series,
          h;
        b = r(this.axes, c) || r(this.series, c);
        for (h = 0; !b && h < k.length; h++) b = r(k[h].points || [], c);
        return b;
      },
      getAxes: function () {
        var a = this,
          c = this.options,
          k = (c.xAxis = z(c.xAxis || {})),
          c = (c.yAxis = z(c.yAxis || {}));
        b(this, 'getAxes');
        k.forEach(function (a, c) {
          a.index = c;
          a.isX = !0;
        });
        c.forEach(function (a, c) {
          a.index = c;
        });
        k.concat(c).forEach(function (c) {
          new t(a, c);
        });
        b(this, 'afterGetAxes');
      },
      getSelectedPoints: function () {
        var a = [];
        this.series.forEach(function (c) {
          a = a.concat(
            (c[c.hasGroupedData ? 'points' : 'data'] || []).filter(function (a) {
              return a.selected;
            })
          );
        });
        return a;
      },
      getSelectedSeries: function () {
        return this.series.filter(function (a) {
          return a.selected;
        });
      },
      setTitle: function (a, c, b) {
        var k = this,
          h = k.options,
          d = k.styledMode,
          e;
        e = h.title = C(!d && { style: { color: '#333333', fontSize: h.isStock ? '16px' : '18px' } }, h.title, a);
        h = h.subtitle = C(!d && { style: { color: '#666666' } }, h.subtitle, c);
        [
          ['title', a, e],
          ['subtitle', c, h],
        ].forEach(function (a, c) {
          var b = a[0],
            h = k[b],
            e = a[1];
          a = a[2];
          h && e && (k[b] = h = h.destroy());
          a &&
            !h &&
            ((k[b] = k.renderer
              .text(a.text, 0, 0, a.useHTML)
              .attr({ align: a.align, class: 'highcharts-' + b, zIndex: a.zIndex || 4 })
              .add()),
            (k[b].update = function (a) {
              k.setTitle(!c && a, c && a);
            }),
            d || k[b].css(a.style));
        });
        k.layOutTitles(b);
      },
      layOutTitles: function (a) {
        var c = 0,
          b,
          h = this.renderer,
          d = this.spacingBox;
        ['title', 'subtitle'].forEach(function (a) {
          var b = this[a],
            k = this.options[a];
          a = 'title' === a ? -3 : k.verticalAlign ? 0 : c + 2;
          var e;
          b &&
            (this.styledMode || (e = k.style.fontSize),
            (e = h.fontMetrics(e, b).b),
            b.css({ width: (k.width || d.width + k.widthAdjust) + 'px' }).align(p({ y: a + e }, k), !1, 'spacingBox'),
            k.floating || k.verticalAlign || (c = Math.ceil(c + b.getBBox(k.useHTML).height)));
        }, this);
        b = this.titleOffset !== c;
        this.titleOffset = c;
        !this.isDirtyBox &&
          b &&
          ((this.isDirtyBox = this.isDirtyLegend = b),
          this.hasRendered && k(a, !0) && this.isDirtyBox && this.redraw());
      },
      getChartSize: function () {
        var c = this.options.chart,
          b = c.width,
          c = c.height,
          k = this.renderTo;
        e(b) || (this.containerWidth = a.getStyle(k, 'width'));
        e(c) || (this.containerHeight = a.getStyle(k, 'height'));
        this.chartWidth = Math.max(0, b || this.containerWidth || 600);
        this.chartHeight = Math.max(
          0,
          a.relativeLength(c, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400)
        );
      },
      temporaryDisplay: function (c) {
        var b = this.renderTo;
        if (c)
          for (; b && b.style; )
            b.hcOrigStyle && (a.css(b, b.hcOrigStyle), delete b.hcOrigStyle),
              b.hcOrigDetached && (g.body.removeChild(b), (b.hcOrigDetached = !1)),
              (b = b.parentNode);
        else
          for (; b && b.style; ) {
            g.body.contains(b) || b.parentNode || ((b.hcOrigDetached = !0), g.body.appendChild(b));
            if ('none' === a.getStyle(b, 'display', !1) || b.hcOricDetached)
              (b.hcOrigStyle = { display: b.style.display, height: b.style.height, overflow: b.style.overflow }),
                (c = { display: 'block', overflow: 'hidden' }),
                b !== this.renderTo && (c.height = 0),
                a.css(b, c),
                b.offsetWidth || b.style.setProperty('display', 'block', 'important');
            b = b.parentNode;
            if (b === g.body) break;
          }
      },
      setClassName: function (a) {
        this.container.className = 'highcharts-container ' + (a || '');
      },
      getContainer: function () {
        var c,
          k = this.options,
          h = k.chart,
          e,
          n;
        c = this.renderTo;
        var r = a.uniqueKey(),
          z,
          D;
        c || (this.renderTo = c = h.renderTo);
        d(c) && (this.renderTo = c = g.getElementById(c));
        c || a.error(13, !0, this);
        e = x(m(c, 'data-highcharts-chart'));
        l(e) && q[e] && q[e].hasRendered && q[e].destroy();
        m(c, 'data-highcharts-chart', this.index);
        c.innerHTML = '';
        h.skipClone || c.offsetWidth || this.temporaryDisplay();
        this.getChartSize();
        e = this.chartWidth;
        n = this.chartHeight;
        f(c, { overflow: 'hidden' });
        this.styledMode ||
          (z = p(
            {
              position: 'relative',
              overflow: 'hidden',
              width: e + 'px',
              height: n + 'px',
              textAlign: 'left',
              lineHeight: 'normal',
              zIndex: 0,
              '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
            },
            h.style
          ));
        this.container = c = u('div', { id: r }, z, c);
        this._cursor = c.style.cursor;
        this.renderer = new (a[h.renderer] || a.Renderer)(
          c,
          e,
          n,
          null,
          h.forExport,
          k.exporting && k.exporting.allowHTML,
          this.styledMode
        );
        this.setClassName(h.className);
        if (this.styledMode) for (D in k.defs) this.renderer.definition(k.defs[D]);
        else this.renderer.setStyle(h.style);
        this.renderer.chartIndex = this.index;
        b(this, 'afterGetContainer');
      },
      getMargins: function (a) {
        var c = this.spacing,
          k = this.margin,
          h = this.titleOffset;
        this.resetMargins();
        h && !e(k[0]) && (this.plotTop = Math.max(this.plotTop, h + this.options.title.margin + c[0]));
        this.legend && this.legend.display && this.legend.adjustMargins(k, c);
        b(this, 'getMargins');
        a || this.getAxisMargins();
      },
      getAxisMargins: function () {
        var a = this,
          c = (a.axisOffset = [0, 0, 0, 0]),
          b = a.margin;
        a.hasCartesianSeries &&
          a.axes.forEach(function (a) {
            a.visible && a.getOffset();
          });
        E.forEach(function (k, h) {
          e(b[h]) || (a[k] += c[h]);
        });
        a.setChartSize();
      },
      reflow: function (c) {
        var b = this,
          k = b.options.chart,
          h = b.renderTo,
          d = e(k.width) && e(k.height),
          x = k.width || a.getStyle(h, 'width'),
          k = k.height || a.getStyle(h, 'height'),
          h = c ? c.target : J;
        if (!d && !b.isPrinting && x && k && (h === J || h === g)) {
          if (x !== b.containerWidth || k !== b.containerHeight)
            a.clearTimeout(b.reflowTimeout),
              (b.reflowTimeout = L(
                function () {
                  b.container && b.setSize(void 0, void 0, !1);
                },
                c ? 100 : 0
              ));
          b.containerWidth = x;
          b.containerHeight = k;
        }
      },
      setReflow: function (a) {
        var c = this;
        !1 === a || this.unbindReflow
          ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow())
          : ((this.unbindReflow = B(J, 'resize', function (a) {
              c.reflow(a);
            })),
            B(this, 'destroy', this.unbindReflow));
      },
      setSize: function (c, k, h) {
        var d = this,
          e = d.renderer,
          x;
        d.isResizing += 1;
        a.setAnimation(h, d);
        d.oldChartHeight = d.chartHeight;
        d.oldChartWidth = d.chartWidth;
        void 0 !== c && (d.options.chart.width = c);
        void 0 !== k && (d.options.chart.height = k);
        d.getChartSize();
        d.styledMode ||
          ((x = e.globalAnimation),
          (x ? A : f)(d.container, { width: d.chartWidth + 'px', height: d.chartHeight + 'px' }, x));
        d.setChartSize(!0);
        e.setSize(d.chartWidth, d.chartHeight, h);
        d.axes.forEach(function (a) {
          a.isDirty = !0;
          a.setScale();
        });
        d.isDirtyLegend = !0;
        d.isDirtyBox = !0;
        d.layOutTitles();
        d.getMargins();
        d.redraw(h);
        d.oldChartHeight = null;
        b(d, 'resize');
        L(function () {
          d &&
            b(d, 'endResize', null, function () {
              --d.isResizing;
            });
        }, G(x).duration);
      },
      setChartSize: function (a) {
        var c = this.inverted,
          k = this.renderer,
          h = this.chartWidth,
          d = this.chartHeight,
          e = this.options.chart,
          x = this.spacing,
          f = this.clipOffset,
          l,
          p,
          n,
          g;
        this.plotLeft = l = Math.round(this.plotLeft);
        this.plotTop = p = Math.round(this.plotTop);
        this.plotWidth = n = Math.max(0, Math.round(h - l - this.marginRight));
        this.plotHeight = g = Math.max(0, Math.round(d - p - this.marginBottom));
        this.plotSizeX = c ? g : n;
        this.plotSizeY = c ? n : g;
        this.plotBorderWidth = e.plotBorderWidth || 0;
        this.spacingBox = k.spacingBox = { x: x[3], y: x[0], width: h - x[3] - x[1], height: d - x[0] - x[2] };
        this.plotBox = k.plotBox = { x: l, y: p, width: n, height: g };
        h = 2 * Math.floor(this.plotBorderWidth / 2);
        c = Math.ceil(Math.max(h, f[3]) / 2);
        k = Math.ceil(Math.max(h, f[0]) / 2);
        this.clipBox = {
          x: c,
          y: k,
          width: Math.floor(this.plotSizeX - Math.max(h, f[1]) / 2 - c),
          height: Math.max(0, Math.floor(this.plotSizeY - Math.max(h, f[2]) / 2 - k)),
        };
        a ||
          this.axes.forEach(function (a) {
            a.setAxisSize();
            a.setAxisTranslation();
          });
        b(this, 'afterSetChartSize', { skipAxes: a });
      },
      resetMargins: function () {
        b(this, 'resetMargins');
        var a = this,
          c = a.options.chart;
        ['margin', 'spacing'].forEach(function (b) {
          var h = c[b],
            d = n(h) ? h : [h, h, h, h];
          ['Top', 'Right', 'Bottom', 'Left'].forEach(function (h, e) {
            a[b][e] = k(c[b + h], d[e]);
          });
        });
        E.forEach(function (c, b) {
          a[c] = k(a.margin[b], a.spacing[b]);
        });
        a.axisOffset = [0, 0, 0, 0];
        a.clipOffset = [0, 0, 0, 0];
      },
      drawChartBox: function () {
        var a = this.options.chart,
          c = this.renderer,
          k = this.chartWidth,
          h = this.chartHeight,
          d = this.chartBackground,
          e = this.plotBackground,
          x = this.plotBorder,
          f,
          l = this.styledMode,
          p = this.plotBGImage,
          n = a.backgroundColor,
          g = a.plotBackgroundColor,
          z = a.plotBackgroundImage,
          r,
          D = this.plotLeft,
          q = this.plotTop,
          w = this.plotWidth,
          m = this.plotHeight,
          E = this.plotBox,
          F = this.clipRect,
          C = this.clipBox,
          t = 'animate';
        d || ((this.chartBackground = d = c.rect().addClass('highcharts-background').add()), (t = 'attr'));
        if (l) f = r = d.strokeWidth();
        else {
          f = a.borderWidth || 0;
          r = f + (a.shadow ? 8 : 0);
          n = { fill: n || 'none' };
          if (f || d['stroke-width']) (n.stroke = a.borderColor), (n['stroke-width'] = f);
          d.attr(n).shadow(a.shadow);
        }
        d[t]({ x: r / 2, y: r / 2, width: k - r - (f % 2), height: h - r - (f % 2), r: a.borderRadius });
        t = 'animate';
        e || ((t = 'attr'), (this.plotBackground = e = c.rect().addClass('highcharts-plot-background').add()));
        e[t](E);
        l ||
          (e.attr({ fill: g || 'none' }).shadow(a.plotShadow),
          z && (p ? p.animate(E) : (this.plotBGImage = c.image(z, D, q, w, m).add())));
        F ? F.animate({ width: C.width, height: C.height }) : (this.clipRect = c.clipRect(C));
        t = 'animate';
        x ||
          ((t = 'attr'), (this.plotBorder = x = c.rect().addClass('highcharts-plot-border').attr({ zIndex: 1 }).add()));
        l || x.attr({ stroke: a.plotBorderColor, 'stroke-width': a.plotBorderWidth || 0, fill: 'none' });
        x[t](x.crisp({ x: D, y: q, width: w, height: m }, -x.strokeWidth()));
        this.isDirtyBox = !1;
        b(this, 'afterDrawChartBox');
      },
      propFromSeries: function () {
        var a = this,
          c = a.options.chart,
          b,
          k = a.options.series,
          d,
          e;
        ['inverted', 'angular', 'polar'].forEach(function (x) {
          b = h[c.type || c.defaultSeriesType];
          e = c[x] || (b && b.prototype[x]);
          for (d = k && k.length; !e && d--; ) (b = h[k[d].type]) && b.prototype[x] && (e = !0);
          a[x] = e;
        });
      },
      linkSeries: function () {
        var a = this,
          c = a.series;
        c.forEach(function (a) {
          a.linkedSeries.length = 0;
        });
        c.forEach(function (c) {
          var b = c.options.linkedTo;
          d(b) &&
            (b = ':previous' === b ? a.series[c.index - 1] : a.get(b)) &&
            b.linkedParent !== c &&
            (b.linkedSeries.push(c),
            (c.linkedParent = b),
            (c.visible = k(c.options.visible, b.options.visible, c.visible)));
        });
        b(this, 'afterLinkSeries');
      },
      renderSeries: function () {
        this.series.forEach(function (a) {
          a.translate();
          a.render();
        });
      },
      renderLabels: function () {
        var a = this,
          c = a.options.labels;
        c.items &&
          c.items.forEach(function (b) {
            var k = p(c.style, b.style),
              h = x(k.left) + a.plotLeft,
              d = x(k.top) + a.plotTop + 12;
            delete k.left;
            delete k.top;
            a.renderer.text(b.html, h, d).attr({ zIndex: 2 }).css(k).add();
          });
      },
      render: function () {
        var a = this.axes,
          c = this.renderer,
          b = this.options,
          k = 0,
          h,
          d,
          e;
        this.setTitle();
        this.legend = new w(this, b.legend);
        this.getStacks && this.getStacks();
        this.getMargins(!0);
        this.setChartSize();
        b = this.plotWidth;
        a.some(function (a) {
          if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return (k = 21), !0;
        });
        h = this.plotHeight = Math.max(this.plotHeight - k, 0);
        a.forEach(function (a) {
          a.setScale();
        });
        this.getAxisMargins();
        d = 1.1 < b / this.plotWidth;
        e = 1.05 < h / this.plotHeight;
        if (d || e)
          a.forEach(function (a) {
            ((a.horiz && d) || (!a.horiz && e)) && a.setTickInterval(!0);
          }),
            this.getMargins();
        this.drawChartBox();
        this.hasCartesianSeries &&
          a.forEach(function (a) {
            a.visible && a.render();
          });
        this.seriesGroup || (this.seriesGroup = c.g('series-group').attr({ zIndex: 3 }).add());
        this.renderSeries();
        this.renderLabels();
        this.addCredits();
        this.setResponsive && this.setResponsive();
        this.hasRendered = !0;
      },
      addCredits: function (a) {
        var c = this;
        a = C(!0, this.options.credits, a);
        a.enabled &&
          !this.credits &&
          ((this.credits = this.renderer
            .text(a.text + (this.mapCredits || ''), 0, 0)
            .addClass('highcharts-credits')
            .on('click', function () {
              a.href && (J.location.href = a.href);
            })
            .attr({ align: a.position.align, zIndex: 8 })),
          c.styledMode || this.credits.css(a.style),
          this.credits.add().align(a.position),
          (this.credits.update = function (a) {
            c.credits = c.credits.destroy();
            c.addCredits(a);
          }));
      },
      destroy: function () {
        var c = this,
          k = c.axes,
          h = c.series,
          d = c.container,
          e,
          x = d && d.parentNode;
        b(c, 'destroy');
        c.renderer.forExport ? a.erase(q, c) : (q[c.index] = void 0);
        a.chartCount--;
        c.renderTo.removeAttribute('data-highcharts-chart');
        D(c);
        for (e = k.length; e--; ) k[e] = k[e].destroy();
        this.scroller && this.scroller.destroy && this.scroller.destroy();
        for (e = h.length; e--; ) h[e] = h[e].destroy();
        'title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer'
          .split(' ')
          .forEach(function (a) {
            var b = c[a];
            b && b.destroy && (c[a] = b.destroy());
          });
        d && ((d.innerHTML = ''), D(d), x && y(d));
        F(c, function (a, b) {
          delete c[b];
        });
      },
      firstRender: function () {
        var k = this,
          h = k.options;
        if (!k.isReadyToRender || k.isReadyToRender()) {
          k.getContainer();
          k.resetMargins();
          k.setChartSize();
          k.propFromSeries();
          k.getAxes();
          (a.isArray(h.series) ? h.series : []).forEach(function (a) {
            k.initSeries(a);
          });
          k.linkSeries();
          b(k, 'beforeRender');
          c && (k.pointer = new c(k, h));
          k.render();
          if (!k.renderer.imgCount && k.onload) k.onload();
          k.temporaryDisplay(!0);
        }
      },
      onload: function () {
        [this.callback].concat(this.callbacks).forEach(function (a) {
          a && void 0 !== this.index && a.apply(this, [this]);
        }, this);
        b(this, 'load');
        b(this, 'render');
        e(this.index) && this.setReflow(this.options.chart.reflow);
        this.onload = null;
      },
    });
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.Chart;
    B(A, 'afterSetChartSize', function (A) {
      var m = this.options.chart.scrollablePlotArea;
      (m = m && m.minWidth) &&
        !this.renderer.forExport &&
        (this.scrollablePixels = m = Math.max(0, m - this.chartWidth)) &&
        ((this.plotWidth += m),
        (this.clipBox.width += m),
        A.skipAxes ||
          this.axes.forEach(function (g) {
            1 === g.side
              ? (g.getPlotLinePath = function () {
                  var m = this.right,
                    u;
                  this.right = m - g.chart.scrollablePixels;
                  u = a.Axis.prototype.getPlotLinePath.apply(this, arguments);
                  this.right = m;
                  return u;
                })
              : (g.setAxisSize(), g.setAxisTranslation());
          }));
    });
    B(A, 'render', function () {
      this.scrollablePixels
        ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed())
        : this.fixedDiv && this.applyFixed();
    });
    A.prototype.setUpScrolling = function () {
      this.scrollingContainer = a.createElement(
        'div',
        { className: 'highcharts-scrolling' },
        { overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
        this.renderTo
      );
      this.innerContainer = a.createElement(
        'div',
        { className: 'highcharts-inner-container' },
        null,
        this.scrollingContainer
      );
      this.innerContainer.appendChild(this.container);
      this.setUpScrolling = null;
    };
    A.prototype.applyFixed = function () {
      var A = this.container,
        m,
        g,
        t = !this.fixedDiv;
      t &&
        ((this.fixedDiv = a.createElement(
          'div',
          { className: 'highcharts-fixed' },
          { position: 'absolute', overflow: 'hidden', pointerEvents: 'none', zIndex: 2 },
          null,
          !0
        )),
        this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild),
        (this.renderTo.style.overflow = 'visible'),
        (this.fixedRenderer = m = new a.Renderer(this.fixedDiv, 0, 0)),
        (this.scrollableMask = m
          .path()
          .attr({
            fill: a
              .color(this.options.chart.backgroundColor || '#fff')
              .setOpacity(0.85)
              .get(),
            zIndex: -1,
          })
          .addClass('highcharts-scrollable-mask')
          .add()),
        [
          this.inverted ? '.highcharts-xaxis' : '.highcharts-yaxis',
          this.inverted ? '.highcharts-xaxis-labels' : '.highcharts-yaxis-labels',
          '.highcharts-contextbutton',
          '.highcharts-credits',
          '.highcharts-legend',
          '.highcharts-subtitle',
          '.highcharts-title',
          '.highcharts-legend-checkbox',
        ].forEach(function (a) {
          [].forEach.call(A.querySelectorAll(a), function (a) {
            (a.namespaceURI === m.SVG_NS ? m.box : m.box.parentNode).appendChild(a);
            a.style.pointerEvents = 'auto';
          });
        }));
      this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
      g = this.chartWidth + this.scrollablePixels;
      a.stop(this.container);
      this.container.style.width = g + 'px';
      this.renderer.boxWrapper.attr({
        width: g,
        height: this.chartHeight,
        viewBox: [0, 0, g, this.chartHeight].join(' '),
      });
      this.chartBackground.attr({ width: g });
      t &&
        ((g = this.options.chart.scrollablePlotArea),
        g.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixels * g.scrollPositionX));
      t = this.axisOffset;
      g = this.plotTop - t[0] - 1;
      var t = this.plotTop + this.plotHeight + t[2],
        u = this.plotLeft + this.plotWidth - this.scrollablePixels;
      this.scrollableMask.attr({
        d: this.scrollablePixels
          ? [
              'M',
              0,
              g,
              'L',
              this.plotLeft - 1,
              g,
              'L',
              this.plotLeft - 1,
              t,
              'L',
              0,
              t,
              'Z',
              'M',
              u,
              g,
              'L',
              this.chartWidth,
              g,
              'L',
              this.chartWidth,
              t,
              'L',
              u,
              t,
              'Z',
            ]
          : ['M', 0, 0],
      });
    };
  })(H);
  (function (a) {
    var B,
      A = a.extend,
      G = a.erase,
      m = a.fireEvent,
      g = a.format,
      t = a.isArray,
      u = a.isNumber,
      v = a.pick,
      y = a.uniqueKey,
      q = a.defined,
      f = a.removeEvent;
    a.Point = B = function () {};
    a.Point.prototype = {
      init: function (a, f, g) {
        var b;
        b = a.chart.options.chart.colorCount;
        var e = a.chart.styledMode;
        this.series = a;
        e || (this.color = a.color);
        this.applyOptions(f, g);
        this.id = q(this.id) ? this.id : y();
        a.options.colorByPoint
          ? (e ||
              ((b = a.options.colors || a.chart.options.colors),
              (this.color = this.color || b[a.colorCounter]),
              (b = b.length)),
            (f = a.colorCounter),
            a.colorCounter++,
            a.colorCounter === b && (a.colorCounter = 0))
          : (f = a.colorIndex);
        this.colorIndex = v(this.colorIndex, f);
        a.chart.pointCount++;
        m(this, 'afterInit');
        return this;
      },
      applyOptions: function (a, f) {
        var e = this.series,
          b = e.options.pointValKey || e.pointValKey;
        a = B.prototype.optionsToObject.call(this, a);
        A(this, a);
        this.options = this.options ? A(this.options, a) : a;
        a.group && delete this.group;
        a.dataLabels && delete this.dataLabels;
        b && (this.y = this[b]);
        this.isNull = v(this.isValid && !this.isValid(), null === this.x || !u(this.y, !0));
        this.selected && (this.state = 'select');
        'name' in this && void 0 === f && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this));
        void 0 === this.x && e && (this.x = void 0 === f ? e.autoIncrement(this) : f);
        return this;
      },
      setNestedProperty: function (e, f, g) {
        g.split('.').reduce(function (b, e, p, d) {
          b[e] = d.length - 1 === p ? f : a.isObject(b[e], !0) ? b[e] : {};
          return b[e];
        }, e);
        return e;
      },
      optionsToObject: function (e) {
        var f = {},
          g = this.series,
          b = g.options.keys,
          l = b || g.pointArrayMap || ['y'],
          n = l.length,
          d = 0,
          q = 0;
        if (u(e) || null === e) f[l[0]] = e;
        else if (t(e))
          for (
            !b &&
            e.length > n &&
            ((g = typeof e[0]), 'string' === g ? (f.name = e[0]) : 'number' === g && (f.x = e[0]), d++);
            q < n;

          )
            (b && void 0 === e[d]) ||
              (0 < l[q].indexOf('.') ? a.Point.prototype.setNestedProperty(f, e[d], l[q]) : (f[l[q]] = e[d])),
              d++,
              q++;
        else
          'object' === typeof e &&
            ((f = e), e.dataLabels && (g._hasPointLabels = !0), e.marker && (g._hasPointMarkers = !0));
        return f;
      },
      getClassName: function () {
        return (
          'highcharts-point' +
          (this.selected ? ' highcharts-point-select' : '') +
          (this.negative ? ' highcharts-negative' : '') +
          (this.isNull ? ' highcharts-null-point' : '') +
          (void 0 !== this.colorIndex ? ' highcharts-color-' + this.colorIndex : '') +
          (this.options.className ? ' ' + this.options.className : '') +
          (this.zone && this.zone.className ? ' ' + this.zone.className.replace('highcharts-negative', '') : '')
        );
      },
      getZone: function () {
        var a = this.series,
          f = a.zones,
          a = a.zoneAxis || 'y',
          g = 0,
          b;
        for (b = f[g]; this[a] >= b.value; ) b = f[++g];
        this.nonZonedColor || (this.nonZonedColor = this.color);
        this.color = b && b.color && !this.options.color ? b.color : this.nonZonedColor;
        return b;
      },
      destroy: function () {
        var a = this.series.chart,
          p = a.hoverPoints,
          g;
        a.pointCount--;
        p && (this.setState(), G(p, this), p.length || (a.hoverPoints = null));
        if (this === a.hoverPoint) this.onMouseOut();
        if (this.graphic || this.dataLabel || this.dataLabels) f(this), this.destroyElements();
        this.legendItem && a.legend.destroyItem(this);
        for (g in this) this[g] = null;
      },
      destroyElements: function () {
        for (var a = ['graphic', 'dataLabel', 'dataLabelUpper', 'connector', 'shadowGroup'], f, g = 6; g--; )
          (f = a[g]), this[f] && (this[f] = this[f].destroy());
        this.dataLabels &&
          (this.dataLabels.forEach(function (a) {
            a.element && a.destroy();
          }),
          delete this.dataLabels);
        this.connectors &&
          (this.connectors.forEach(function (a) {
            a.element && a.destroy();
          }),
          delete this.connectors);
      },
      getLabelConfig: function () {
        return {
          x: this.category,
          y: this.y,
          color: this.color,
          colorIndex: this.colorIndex,
          key: this.name || this.category,
          series: this.series,
          point: this,
          percentage: this.percentage,
          total: this.total || this.stackTotal,
        };
      },
      tooltipFormatter: function (a) {
        var e = this.series,
          f = e.tooltipOptions,
          b = v(f.valueDecimals, ''),
          l = f.valuePrefix || '',
          n = f.valueSuffix || '';
        e.chart.styledMode && (a = e.chart.tooltip.styledModeFormat(a));
        (e.pointArrayMap || ['y']).forEach(function (d) {
          d = '{point.' + d;
          if (l || n) a = a.replace(RegExp(d + '}', 'g'), l + d + '}' + n);
          a = a.replace(RegExp(d + '}', 'g'), d + ':,.' + b + 'f}');
        });
        return g(a, { point: this, series: this.series }, e.chart.time);
      },
      firePointEvent: function (a, f, g) {
        var b = this,
          e = this.series.options;
        (e.point.events[a] || (b.options && b.options.events && b.options.events[a])) && this.importEvents();
        'click' === a &&
          e.allowPointSelect &&
          (g = function (a) {
            b.select && b.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
          });
        m(this, a, f, g);
      },
      visible: !0,
    };
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.animObject,
      G = a.arrayMax,
      m = a.arrayMin,
      g = a.correctFloat,
      t = a.defaultOptions,
      u = a.defaultPlotOptions,
      v = a.defined,
      y = a.erase,
      q = a.extend,
      f = a.fireEvent,
      e = a.isArray,
      p = a.isNumber,
      r = a.isString,
      b = a.merge,
      l = a.objectEach,
      n = a.pick,
      d = a.removeEvent,
      w = a.splat,
      E = a.SVGElement,
      C = a.syncTimeout,
      F = a.win;
    a.Series = a.seriesType(
      'line',
      null,
      {
        lineWidth: 2,
        allowPointSelect: !1,
        showCheckbox: !1,
        animation: { duration: 1e3 },
        events: {},
        marker: {
          lineWidth: 0,
          lineColor: '#ffffff',
          enabledThreshold: 2,
          radius: 4,
          states: {
            normal: { animation: !0 },
            hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 },
            select: { fillColor: '#cccccc', lineColor: '#000000', lineWidth: 2 },
          },
        },
        point: { events: {} },
        dataLabels: {
          align: 'center',
          formatter: function () {
            return null === this.y ? '' : a.numberFormat(this.y, -1);
          },
          style: { fontSize: '11px', fontWeight: 'bold', color: 'contrast', textOutline: '1px contrast' },
          verticalAlign: 'bottom',
          x: 0,
          y: 0,
          padding: 5,
        },
        cropThreshold: 300,
        pointRange: 0,
        softThreshold: !0,
        states: {
          normal: { animation: !0 },
          hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: 0.25 } },
          select: { animation: { duration: 0 } },
        },
        stickyTracking: !0,
        turboThreshold: 1e3,
        findNearestPointBy: 'x',
      },
      {
        isCartesian: !0,
        pointClass: a.Point,
        sorted: !0,
        requireSorting: !0,
        directTouch: !1,
        axisTypes: ['xAxis', 'yAxis'],
        colorCounter: 0,
        parallelArrays: ['x', 'y'],
        coll: 'series',
        cropShoulder: 1,
        init: function (a, b) {
          f(this, 'init', { options: b });
          var c = this,
            k,
            h = a.series,
            d;
          c.chart = a;
          c.options = b = c.setOptions(b);
          c.linkedSeries = [];
          c.bindAxes();
          q(c, { name: b.name, state: '', visible: !1 !== b.visible, selected: !0 === b.selected });
          k = b.events;
          l(k, function (a, b) {
            (c.hcEvents && c.hcEvents[b] && -1 !== c.hcEvents[b].indexOf(a)) || B(c, b, a);
          });
          if ((k && k.click) || (b.point && b.point.events && b.point.events.click) || b.allowPointSelect)
            a.runTrackerClick = !0;
          c.getColor();
          c.getSymbol();
          c.parallelArrays.forEach(function (a) {
            c[a + 'Data'] = [];
          });
          c.setData(b.data, !1);
          c.isCartesian && (a.hasCartesianSeries = !0);
          h.length && (d = h[h.length - 1]);
          c._i = n(d && d._i, -1) + 1;
          a.orderSeries(this.insert(h));
          f(this, 'afterInit');
        },
        insert: function (a) {
          var c = this.options.index,
            b;
          if (p(c)) {
            for (b = a.length; b--; )
              if (c >= n(a[b].options.index, a[b]._i)) {
                a.splice(b + 1, 0, this);
                break;
              }
            -1 === b && a.unshift(this);
            b += 1;
          } else a.push(this);
          return n(b, a.length - 1);
        },
        bindAxes: function () {
          var c = this,
            b = c.options,
            d = c.chart,
            e;
          f(this, 'bindAxes', null, function () {
            (c.axisTypes || []).forEach(function (k) {
              d[k].forEach(function (a) {
                e = a.options;
                if (b[k] === e.index || (void 0 !== b[k] && b[k] === e.id) || (void 0 === b[k] && 0 === e.index))
                  c.insert(a.series), (c[k] = a), (a.isDirty = !0);
              });
              c[k] || c.optionalAxis === k || a.error(18, !0, d);
            });
          });
        },
        updateParallelArrays: function (a, b) {
          var c = a.series,
            k = arguments,
            h = p(b)
              ? function (k) {
                  var h = 'y' === k && c.toYData ? c.toYData(a) : a[k];
                  c[k + 'Data'][b] = h;
                }
              : function (a) {
                  Array.prototype[b].apply(c[a + 'Data'], Array.prototype.slice.call(k, 2));
                };
          c.parallelArrays.forEach(h);
        },
        autoIncrement: function () {
          var a = this.options,
            b = this.xIncrement,
            d,
            e = a.pointIntervalUnit,
            h = this.chart.time,
            b = n(b, a.pointStart, 0);
          this.pointInterval = d = n(this.pointInterval, a.pointInterval, 1);
          e &&
            ((a = new h.Date(b)),
            'day' === e
              ? h.set('Date', a, h.get('Date', a) + d)
              : 'month' === e
              ? h.set('Month', a, h.get('Month', a) + d)
              : 'year' === e && h.set('FullYear', a, h.get('FullYear', a) + d),
            (d = a.getTime() - b));
          this.xIncrement = b + d;
          return b;
        },
        setOptions: function (a) {
          var c = this.chart,
            d = c.options,
            e = d.plotOptions,
            h = (c.userOptions || {}).plotOptions || {},
            l = e[this.type],
            g = b(a);
          a = c.styledMode;
          f(this, 'setOptions', { userOptions: g });
          this.userOptions = g;
          c = b(l, e.series, g);
          this.tooltipOptions = b(
            t.tooltip,
            t.plotOptions.series && t.plotOptions.series.tooltip,
            t.plotOptions[this.type].tooltip,
            d.tooltip.userOptions,
            e.series && e.series.tooltip,
            e[this.type].tooltip,
            g.tooltip
          );
          this.stickyTracking = n(
            g.stickyTracking,
            h[this.type] && h[this.type].stickyTracking,
            h.series && h.series.stickyTracking,
            this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : c.stickyTracking
          );
          null === l.marker && delete c.marker;
          this.zoneAxis = c.zoneAxis;
          d = this.zones = (c.zones || []).slice();
          (!c.negativeColor && !c.negativeFillColor) ||
            c.zones ||
            ((e = { value: c[this.zoneAxis + 'Threshold'] || c.threshold || 0, className: 'highcharts-negative' }),
            a || ((e.color = c.negativeColor), (e.fillColor = c.negativeFillColor)),
            d.push(e));
          d.length && v(d[d.length - 1].value) && d.push(a ? {} : { color: this.color, fillColor: this.fillColor });
          f(this, 'afterSetOptions', { options: c });
          return c;
        },
        getName: function () {
          return n(this.options.name, 'Series ' + (this.index + 1));
        },
        getCyclic: function (a, b, d) {
          var c,
            k = this.chart,
            e = this.userOptions,
            f = a + 'Index',
            x = a + 'Counter',
            l = d ? d.length : n(k.options.chart[a + 'Count'], k[a + 'Count']);
          b ||
            ((c = n(e[f], e['_' + f])),
            v(c) || (k.series.length || (k[x] = 0), (e['_' + f] = c = k[x] % l), (k[x] += 1)),
            d && (b = d[c]));
          void 0 !== c && (this[f] = c);
          this[a] = b;
        },
        getColor: function () {
          this.chart.styledMode
            ? this.getCyclic('color')
            : this.options.colorByPoint
            ? (this.options.color = null)
            : this.getCyclic('color', this.options.color || u[this.type].color, this.chart.options.colors);
        },
        getSymbol: function () {
          this.getCyclic('symbol', this.options.marker.symbol, this.chart.options.symbols);
        },
        drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
        updateData: function (c) {
          var b = this.options,
            d = this.points,
            e = [],
            h,
            f,
            l,
            g = this.requireSorting;
          this.xIncrement = null;
          c.forEach(function (c) {
            var k, f, x;
            k = (a.defined(c) && this.pointClass.prototype.optionsToObject.call({ series: this }, c)) || {};
            x = k.x;
            if ((k = k.id) || p(x))
              k && (f = (f = this.chart.get(k)) && f.index),
                void 0 === f && p(x) && (f = this.xData.indexOf(x, l)),
                -1 !== f && void 0 !== f && this.cropped && (f = f >= this.cropStart ? f - this.cropStart : f),
                -1 === f || void 0 === f || (d[f] && d[f].touched)
                  ? e.push(c)
                  : c !== b.data[f]
                  ? (d[f].update(c, !1, null, !1), (d[f].touched = !0), g && (l = f + 1))
                  : d[f] && (d[f].touched = !0),
                (h = !0);
          }, this);
          if (h) for (c = d.length; c--; ) (f = d[c]), f.touched || f.remove(!1), (f.touched = !1);
          else if (c.length === d.length)
            c.forEach(function (a, c) {
              d[c].update && a !== b.data[c] && d[c].update(a, !1, null, !1);
            });
          else return !1;
          e.forEach(function (a) {
            this.addPoint(a, !1);
          }, this);
          return !0;
        },
        setData: function (c, b, d, f) {
          var k = this,
            l = k.points,
            x = (l && l.length) || 0,
            g,
            q = k.options,
            w = k.chart,
            D = null,
            m = k.xAxis,
            E = q.turboThreshold,
            F = this.xData,
            C = this.yData,
            t = (g = k.pointArrayMap) && g.length,
            v = q.keys,
            u = 0,
            y = 1,
            A;
          c = c || [];
          g = c.length;
          b = n(b, !0);
          !1 !== f &&
            g &&
            x &&
            !k.cropped &&
            !k.hasGroupedData &&
            k.visible &&
            !k.isSeriesBoosting &&
            (A = this.updateData(c));
          if (!A) {
            k.xIncrement = null;
            k.colorCounter = 0;
            this.parallelArrays.forEach(function (a) {
              k[a + 'Data'].length = 0;
            });
            if (E && g > E) {
              for (d = 0; null === D && d < g; ) (D = c[d]), d++;
              if (p(D)) for (d = 0; d < g; d++) (F[d] = this.autoIncrement()), (C[d] = c[d]);
              else if (e(D))
                if (t) for (d = 0; d < g; d++) (D = c[d]), (F[d] = D[0]), (C[d] = D.slice(1, t + 1));
                else
                  for (
                    v && ((u = v.indexOf('x')), (y = v.indexOf('y')), (u = 0 <= u ? u : 0), (y = 0 <= y ? y : 1)),
                      d = 0;
                    d < g;
                    d++
                  )
                    (D = c[d]), (F[d] = D[u]), (C[d] = D[y]);
              else a.error(12, !1, w);
            } else
              for (d = 0; d < g; d++)
                void 0 !== c[d] &&
                  ((D = { series: k }),
                  k.pointClass.prototype.applyOptions.apply(D, [c[d]]),
                  k.updateParallelArrays(D, d));
            C && r(C[0]) && a.error(14, !0, w);
            k.data = [];
            k.options.data = k.userOptions.data = c;
            for (d = x; d--; ) l[d] && l[d].destroy && l[d].destroy();
            m && (m.minRange = m.userMinRange);
            k.isDirty = w.isDirtyBox = !0;
            k.isDirtyData = !!l;
            d = !1;
          }
          'point' === q.legendType && (this.processData(), this.generatePoints());
          b && w.redraw(d);
        },
        processData: function (c) {
          var b = this.xData,
            d = this.yData,
            e = b.length,
            h;
          h = 0;
          var f,
            l,
            g = this.xAxis,
            n,
            p = this.options;
          n = p.cropThreshold;
          var q = this.getExtremesFromAll || p.getExtremesFromAll,
            w = this.isCartesian,
            p = g && g.val2lin,
            r = g && g.isLog,
            m = this.requireSorting,
            E,
            F;
          if (w && !this.isDirty && !g.isDirty && !this.yAxis.isDirty && !c) return !1;
          g && ((c = g.getExtremes()), (E = c.min), (F = c.max));
          w &&
            this.sorted &&
            !q &&
            (!n || e > n || this.forceCrop) &&
            (b[e - 1] < E || b[0] > F
              ? ((b = []), (d = []))
              : this.yData &&
                (b[0] < E || b[e - 1] > F) &&
                ((h = this.cropData(this.xData, this.yData, E, F)),
                (b = h.xData),
                (d = h.yData),
                (h = h.start),
                (f = !0)));
          for (n = b.length || 1; --n; )
            (e = r ? p(b[n]) - p(b[n - 1]) : b[n] - b[n - 1]),
              0 < e && (void 0 === l || e < l) ? (l = e) : 0 > e && m && (a.error(15, !1, this.chart), (m = !1));
          this.cropped = f;
          this.cropStart = h;
          this.processedXData = b;
          this.processedYData = d;
          this.closestPointRange = l;
        },
        cropData: function (a, b, d, e, h) {
          var c = a.length,
            k = 0,
            f = c,
            l;
          h = n(h, this.cropShoulder);
          for (l = 0; l < c; l++)
            if (a[l] >= d) {
              k = Math.max(0, l - h);
              break;
            }
          for (d = l; d < c; d++)
            if (a[d] > e) {
              f = d + h;
              break;
            }
          return { xData: a.slice(k, f), yData: b.slice(k, f), start: k, end: f };
        },
        generatePoints: function () {
          var a = this.options,
            b = a.data,
            d = this.data,
            e,
            h = this.processedXData,
            l = this.processedYData,
            g = this.pointClass,
            n = h.length,
            p = this.cropStart || 0,
            r,
            m = this.hasGroupedData,
            a = a.keys,
            E,
            F = [],
            C;
          d || m || ((d = []), (d.length = b.length), (d = this.data = d));
          a && m && (this.options.keys = !1);
          for (C = 0; C < n; C++)
            (r = p + C),
              m
                ? ((E = new g().init(this, [h[C]].concat(w(l[C])))),
                  (E.dataGroup = this.groupMap[C]),
                  E.dataGroup.options &&
                    ((E.options = E.dataGroup.options), q(E, E.dataGroup.options), delete E.dataLabels))
                : (E = d[r]) || void 0 === b[r] || (d[r] = E = new g().init(this, b[r], h[C])),
              E && ((E.index = r), (F[C] = E));
          this.options.keys = a;
          if (d && (n !== (e = d.length) || m))
            for (C = 0; C < e; C++) C !== p || m || (C += n), d[C] && (d[C].destroyElements(), (d[C].plotX = void 0));
          this.data = d;
          this.points = F;
          f(this, 'afterGeneratePoints');
        },
        getExtremes: function (a) {
          var c = this.yAxis,
            b = this.processedXData,
            d,
            h = [],
            l = 0;
          d = this.xAxis.getExtremes();
          var g = d.min,
            n = d.max,
            q,
            w,
            r = this.requireSorting ? this.cropShoulder : 0,
            E,
            F;
          a = a || this.stackedYData || this.processedYData || [];
          d = a.length;
          for (F = 0; F < d; F++)
            if (
              ((w = b[F]),
              (E = a[F]),
              (q = (p(E, !0) || e(E)) && (!c.positiveValuesOnly || E.length || 0 < E)),
              (w =
                this.getExtremesFromAll ||
                this.options.getExtremesFromAll ||
                this.cropped ||
                ((b[F + r] || w) >= g && (b[F - r] || w) <= n)),
              q && w)
            )
              if ((q = E.length)) for (; q--; ) 'number' === typeof E[q] && (h[l++] = E[q]);
              else h[l++] = E;
          this.dataMin = m(h);
          this.dataMax = G(h);
          f(this, 'afterGetExtremes');
        },
        translate: function () {
          this.processedXData || this.processData();
          this.generatePoints();
          var a = this.options,
            b = a.stacking,
            d = this.xAxis,
            e = d.categories,
            h = this.yAxis,
            l = this.points,
            q = l.length,
            w = !!this.modifyValue,
            r,
            m = this.pointPlacementToXValue(),
            E = p(m),
            F = a.threshold,
            C = a.startFromThreshold ? F : 0,
            t,
            u,
            y,
            A,
            B = this.zoneAxis || 'y',
            G = Number.MAX_VALUE;
          for (r = 0; r < q; r++) {
            var M = l[r],
              V = M.x,
              N = M.y;
            u = M.low;
            var H = b && h.stacks[(this.negStacks && N < (C ? 0 : F) ? '-' : '') + this.stackKey],
              X;
            h.positiveValuesOnly && null !== N && 0 >= N && (M.isNull = !0);
            M.plotX = t = g(Math.min(Math.max(-1e5, d.translate(V, 0, 0, 0, 1, m, 'flags' === this.type)), 1e5));
            b &&
              this.visible &&
              !M.isNull &&
              H &&
              H[V] &&
              ((A = this.getStackIndicator(A, V, this.index)),
              (X = H[V]),
              (N = X.points[A.key]),
              (u = N[0]),
              (N = N[1]),
              u === C && A.key === H[V].base && (u = n(p(F) && F, h.min)),
              h.positiveValuesOnly && 0 >= u && (u = null),
              (M.total = M.stackTotal = X.total),
              (M.percentage = X.total && (M.y / X.total) * 100),
              (M.stackY = N),
              X.setOffset(this.pointXOffset || 0, this.barW || 0));
            M.yBottom = v(u) ? Math.min(Math.max(-1e5, h.translate(u, 0, 1, 0, 1)), 1e5) : null;
            w && (N = this.modifyValue(N, M));
            M.plotY = u =
              'number' === typeof N && Infinity !== N
                ? Math.min(Math.max(-1e5, h.translate(N, 0, 1, 0, 1)), 1e5)
                : void 0;
            M.isInside = void 0 !== u && 0 <= u && u <= h.len && 0 <= t && t <= d.len;
            M.clientX = E ? g(d.translate(V, 0, 0, 0, 1, m)) : t;
            M.negative = M[B] < (a[B + 'Threshold'] || F || 0);
            M.category = e && void 0 !== e[M.x] ? e[M.x] : M.x;
            M.isNull || (void 0 !== y && (G = Math.min(G, Math.abs(t - y))), (y = t));
            M.zone = this.zones.length && M.getZone();
          }
          this.closestPointRangePx = G;
          f(this, 'afterTranslate');
        },
        getValidPoints: function (a, b, d) {
          var c = this.chart;
          return (a || this.points || []).filter(function (a) {
            return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : d || !a.isNull;
          });
        },
        setClip: function (a) {
          var c = this.chart,
            b = this.options,
            d = c.renderer,
            h = c.inverted,
            e = this.clipBox,
            f = e || c.clipBox,
            l =
              this.sharedClipKey || ['_sharedClip', a && a.duration, a && a.easing, f.height, b.xAxis, b.yAxis].join(),
            g = c[l],
            n = c[l + 'm'];
          g ||
            (a &&
              ((f.width = 0),
              h && (f.x = c.plotSizeX),
              (c[l + 'm'] = n = d.clipRect(
                h ? c.plotSizeX + 99 : -99,
                h ? -c.plotLeft : -c.plotTop,
                99,
                h ? c.chartWidth : c.chartHeight
              ))),
            (c[l] = g = d.clipRect(f)),
            (g.count = { length: 0 }));
          a && !g.count[this.index] && ((g.count[this.index] = !0), (g.count.length += 1));
          !1 !== b.clip &&
            (this.group.clip(a || e ? g : c.clipRect), this.markerGroup.clip(n), (this.sharedClipKey = l));
          a ||
            (g.count[this.index] && (delete g.count[this.index], --g.count.length),
            0 === g.count.length &&
              l &&
              c[l] &&
              (e || (c[l] = c[l].destroy()), c[l + 'm'] && (c[l + 'm'] = c[l + 'm'].destroy())));
        },
        animate: function (a) {
          var c = this.chart,
            b = A(this.options.animation),
            d;
          a
            ? this.setClip(b)
            : ((d = this.sharedClipKey),
              (a = c[d]) && a.animate({ width: c.plotSizeX, x: 0 }, b),
              c[d + 'm'] && c[d + 'm'].animate({ width: c.plotSizeX + 99, x: 0 }, b),
              (this.animate = null));
        },
        afterAnimate: function () {
          this.setClip();
          f(this, 'afterAnimate');
          this.finishedAnimating = !0;
        },
        drawPoints: function () {
          var a = this.points,
            b = this.chart,
            d,
            e,
            h,
            f,
            l = this.options.marker,
            g,
            p,
            q,
            w = this[this.specialGroup] || this.markerGroup;
          d = this.xAxis;
          var r,
            m = n(l.enabled, !d || d.isRadial ? !0 : null, this.closestPointRangePx >= l.enabledThreshold * l.radius);
          if (!1 !== l.enabled || this._hasPointMarkers)
            for (d = 0; d < a.length; d++)
              (e = a[d]),
                (f = e.graphic),
                (g = e.marker || {}),
                (p = !!e.marker),
                (h = (m && void 0 === g.enabled) || g.enabled),
                (q = !1 !== e.isInside),
                h && !e.isNull
                  ? ((h = n(g.symbol, this.symbol)),
                    (r = this.markerAttribs(e, e.selected && 'select')),
                    f
                      ? f[q ? 'show' : 'hide'](!0).animate(r)
                      : q &&
                        (0 < r.width || e.hasImage) &&
                        (e.graphic = f = b.renderer.symbol(h, r.x, r.y, r.width, r.height, p ? g : l).add(w)),
                    f && !b.styledMode && f.attr(this.pointAttribs(e, e.selected && 'select')),
                    f && f.addClass(e.getClassName(), !0))
                  : f && (e.graphic = f.destroy());
        },
        markerAttribs: function (a, b) {
          var c = this.options.marker,
            k = a.marker || {},
            h = k.symbol || c.symbol,
            d = n(k.radius, c.radius);
          b &&
            ((c = c.states[b]),
            (b = k.states && k.states[b]),
            (d = n(b && b.radius, c && c.radius, d + ((c && c.radiusPlus) || 0))));
          a.hasImage = h && 0 === h.indexOf('url');
          a.hasImage && (d = 0);
          a = { x: Math.floor(a.plotX) - d, y: a.plotY - d };
          d && (a.width = a.height = 2 * d);
          return a;
        },
        pointAttribs: function (a, b) {
          var c = this.options.marker,
            k = a && a.options,
            h = (k && k.marker) || {},
            d = this.color,
            e = k && k.color,
            f = a && a.color,
            k = n(h.lineWidth, c.lineWidth);
          a = a && a.zone && a.zone.color;
          d = e || a || f || d;
          a = h.fillColor || c.fillColor || d;
          d = h.lineColor || c.lineColor || d;
          b &&
            ((c = c.states[b]),
            (b = (h.states && h.states[b]) || {}),
            (k = n(b.lineWidth, c.lineWidth, k + n(b.lineWidthPlus, c.lineWidthPlus, 0))),
            (a = b.fillColor || c.fillColor || a),
            (d = b.lineColor || c.lineColor || d));
          return { stroke: d, 'stroke-width': k, fill: a };
        },
        destroy: function (c) {
          var b = this,
            e = b.chart,
            g = /AppleWebKit\/533/.test(F.navigator.userAgent),
            h,
            n,
            p = b.data || [],
            q,
            w;
          f(b, 'destroy');
          c || d(b);
          (b.axisTypes || []).forEach(function (a) {
            (w = b[a]) && w.series && (y(w.series, b), (w.isDirty = w.forceRedraw = !0));
          });
          b.legendItem && b.chart.legend.destroyItem(b);
          for (n = p.length; n--; ) (q = p[n]) && q.destroy && q.destroy();
          b.points = null;
          a.clearTimeout(b.animationTimeout);
          l(b, function (a, c) {
            a instanceof E && !a.survive && ((h = g && 'group' === c ? 'hide' : 'destroy'), a[h]());
          });
          e.hoverSeries === b && (e.hoverSeries = null);
          y(e.series, b);
          e.orderSeries();
          l(b, function (a, k) {
            (c && 'hcEvents' === k) || delete b[k];
          });
        },
        getGraphPath: function (a, b, d) {
          var c = this,
            k = c.options,
            e = k.step,
            f,
            l = [],
            g = [],
            n;
          a = a || c.points;
          (f = a.reversed) && a.reverse();
          (e = { right: 1, center: 2 }[e] || (e && 3)) && f && (e = 4 - e);
          !k.connectNulls || b || d || (a = this.getValidPoints(a));
          a.forEach(function (h, f) {
            var x = h.plotX,
              p = h.plotY,
              q = a[f - 1];
            (h.leftCliff || (q && q.rightCliff)) && !d && (n = !0);
            h.isNull && !v(b) && 0 < f
              ? (n = !k.connectNulls)
              : h.isNull && !b
              ? (n = !0)
              : (0 === f || n
                  ? (f = ['M', h.plotX, h.plotY])
                  : c.getPointSpline
                  ? (f = c.getPointSpline(a, h, f))
                  : e
                  ? ((f =
                      1 === e
                        ? ['L', q.plotX, p]
                        : 2 === e
                        ? ['L', (q.plotX + x) / 2, q.plotY, 'L', (q.plotX + x) / 2, p]
                        : ['L', x, q.plotY]),
                    f.push('L', x, p))
                  : (f = ['L', x, p]),
                g.push(h.x),
                e && (g.push(h.x), 2 === e && g.push(h.x)),
                l.push.apply(l, f),
                (n = !1));
          });
          l.xMap = g;
          return (c.graphPath = l);
        },
        drawGraph: function () {
          var a = this,
            b = this.options,
            d = (this.gappedPath || this.getGraphPath).call(this),
            e = this.chart.styledMode,
            h = [['graph', 'highcharts-graph']];
          e || h[0].push(b.lineColor || this.color, b.dashStyle);
          h = a.getZonesGraphs(h);
          h.forEach(function (c, k) {
            var h = c[0],
              f = a[h];
            f
              ? ((f.endX = a.preventGraphAnimation ? null : d.xMap), f.animate({ d: d }))
              : d.length &&
                ((a[h] = a.chart.renderer.path(d).addClass(c[1]).attr({ zIndex: 1 }).add(a.group)),
                e ||
                  ((f = { stroke: c[2], 'stroke-width': b.lineWidth, fill: (a.fillGraph && a.color) || 'none' }),
                  c[3]
                    ? (f.dashstyle = c[3])
                    : 'square' !== b.linecap && (f['stroke-linecap'] = f['stroke-linejoin'] = 'round'),
                  (f = a[h].attr(f).shadow(2 > k && b.shadow))));
            f && ((f.startX = d.xMap), (f.isArea = d.isArea));
          });
        },
        getZonesGraphs: function (a) {
          this.zones.forEach(function (c, b) {
            b = ['zone-graph-' + b, 'highcharts-graph highcharts-zone-graph-' + b + ' ' + (c.className || '')];
            this.chart.styledMode || b.push(c.color || this.color, c.dashStyle || this.options.dashStyle);
            a.push(b);
          }, this);
          return a;
        },
        applyZones: function () {
          var a = this,
            b = this.chart,
            d = b.renderer,
            e = this.zones,
            h,
            f,
            l = this.clips || [],
            g,
            p = this.graph,
            q = this.area,
            w = Math.max(b.chartWidth, b.chartHeight),
            r = this[(this.zoneAxis || 'y') + 'Axis'],
            m,
            E,
            F = b.inverted,
            C,
            t,
            v,
            u,
            y = !1;
          e.length &&
            (p || q) &&
            r &&
            void 0 !== r.min &&
            ((E = r.reversed),
            (C = r.horiz),
            p && !this.showLine && p.hide(),
            q && q.hide(),
            (m = r.getExtremes()),
            e.forEach(function (c, k) {
              h = E ? (C ? b.plotWidth : 0) : C ? 0 : r.toPixels(m.min) || 0;
              h = Math.min(Math.max(n(f, h), 0), w);
              f = Math.min(Math.max(Math.round(r.toPixels(n(c.value, m.max), !0) || 0), 0), w);
              y && (h = f = r.toPixels(m.max));
              t = Math.abs(h - f);
              v = Math.min(h, f);
              u = Math.max(h, f);
              r.isXAxis
                ? ((g = { x: F ? u : v, y: 0, width: t, height: w }), C || (g.x = b.plotHeight - g.x))
                : ((g = { x: 0, y: F ? u : v, width: w, height: t }), C && (g.y = b.plotWidth - g.y));
              F &&
                d.isVML &&
                (g = r.isXAxis
                  ? { x: 0, y: E ? v : u, height: g.width, width: b.chartWidth }
                  : { x: g.y - b.plotLeft - b.spacingBox.x, y: 0, width: g.height, height: b.chartHeight });
              l[k]
                ? l[k].animate(g)
                : ((l[k] = d.clipRect(g)), p && a['zone-graph-' + k].clip(l[k]), q && a['zone-area-' + k].clip(l[k]));
              y = c.value > m.max;
              a.resetZones && 0 === f && (f = void 0);
            }),
            (this.clips = l));
        },
        invertGroups: function (a) {
          function c() {
            ['group', 'markerGroup'].forEach(function (c) {
              b[c] &&
                (d.renderer.isVML && b[c].attr({ width: b.yAxis.len, height: b.xAxis.len }),
                (b[c].width = b.yAxis.len),
                (b[c].height = b.xAxis.len),
                b[c].invert(a));
            });
          }
          var b = this,
            d = b.chart,
            h;
          b.xAxis && ((h = B(d, 'resize', c)), B(b, 'destroy', h), c(a), (b.invertGroups = c));
        },
        plotGroup: function (a, b, d, e, h) {
          var c = this[a],
            k = !c;
          k &&
            (this[a] = c = this.chart.renderer
              .g()
              .attr({ zIndex: e || 0.1 })
              .add(h));
          c.addClass(
            'highcharts-' +
              b +
              ' highcharts-series-' +
              this.index +
              ' highcharts-' +
              this.type +
              '-series ' +
              (v(this.colorIndex) ? 'highcharts-color-' + this.colorIndex + ' ' : '') +
              (this.options.className || '') +
              (c.hasClass('highcharts-tracker') ? ' highcharts-tracker' : ''),
            !0
          );
          c.attr({ visibility: d })[k ? 'attr' : 'animate'](this.getPlotBox());
          return c;
        },
        getPlotBox: function () {
          var a = this.chart,
            b = this.xAxis,
            d = this.yAxis;
          a.inverted && ((b = d), (d = this.xAxis));
          return { translateX: b ? b.left : a.plotLeft, translateY: d ? d.top : a.plotTop, scaleX: 1, scaleY: 1 };
        },
        render: function () {
          var a = this,
            b = a.chart,
            d,
            e = a.options,
            h = !!a.animate && b.renderer.isSVG && A(e.animation).duration,
            l = a.visible ? 'inherit' : 'hidden',
            g = e.zIndex,
            n = a.hasRendered,
            p = b.seriesGroup,
            q = b.inverted;
          f(this, 'render');
          d = a.plotGroup('group', 'series', l, g, p);
          a.markerGroup = a.plotGroup('markerGroup', 'markers', l, g, p);
          h && a.animate(!0);
          d.inverted = a.isCartesian ? q : !1;
          a.drawGraph && (a.drawGraph(), a.applyZones());
          a.drawDataLabels && a.drawDataLabels();
          a.visible && a.drawPoints();
          a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
          a.invertGroups(q);
          !1 === e.clip || a.sharedClipKey || n || d.clip(b.clipRect);
          h && a.animate();
          n ||
            (a.animationTimeout = C(function () {
              a.afterAnimate();
            }, h));
          a.isDirty = !1;
          a.hasRendered = !0;
          f(a, 'afterRender');
        },
        redraw: function () {
          var a = this.chart,
            b = this.isDirty || this.isDirtyData,
            d = this.group,
            e = this.xAxis,
            h = this.yAxis;
          d &&
            (a.inverted && d.attr({ width: a.plotWidth, height: a.plotHeight }),
            d.animate({ translateX: n(e && e.left, a.plotLeft), translateY: n(h && h.top, a.plotTop) }));
          this.translate();
          this.render();
          b && delete this.kdTree;
        },
        kdAxisArray: ['clientX', 'plotY'],
        searchPoint: function (a, b) {
          var c = this.xAxis,
            k = this.yAxis,
            h = this.chart.inverted;
          return this.searchKDTree(
            {
              clientX: h ? c.len - a.chartY + c.pos : a.chartX - c.pos,
              plotY: h ? k.len - a.chartX + k.pos : a.chartY - k.pos,
            },
            b,
            a
          );
        },
        buildKDTree: function (a) {
          function c(a, k, d) {
            var h, e;
            if ((e = a && a.length))
              return (
                (h = b.kdAxisArray[k % d]),
                a.sort(function (a, c) {
                  return a[h] - c[h];
                }),
                (e = Math.floor(e / 2)),
                { point: a[e], left: c(a.slice(0, e), k + 1, d), right: c(a.slice(e + 1), k + 1, d) }
              );
          }
          this.buildingKdTree = !0;
          var b = this,
            d = -1 < b.options.findNearestPointBy.indexOf('y') ? 2 : 1;
          delete b.kdTree;
          C(
            function () {
              b.kdTree = c(b.getValidPoints(null, !b.directTouch), d, d);
              b.buildingKdTree = !1;
            },
            b.options.kdNow || (a && 'touchstart' === a.type) ? 0 : 1
          );
        },
        searchKDTree: function (a, b, d) {
          function c(a, b, d, h) {
            var g = b.point,
              n = k.kdAxisArray[d % h],
              p,
              x,
              q = g;
            x = v(a[e]) && v(g[e]) ? Math.pow(a[e] - g[e], 2) : null;
            p = v(a[f]) && v(g[f]) ? Math.pow(a[f] - g[f], 2) : null;
            p = (x || 0) + (p || 0);
            g.dist = v(p) ? Math.sqrt(p) : Number.MAX_VALUE;
            g.distX = v(x) ? Math.sqrt(x) : Number.MAX_VALUE;
            n = a[n] - g[n];
            p = 0 > n ? 'left' : 'right';
            x = 0 > n ? 'right' : 'left';
            b[p] && ((p = c(a, b[p], d + 1, h)), (q = p[l] < q[l] ? p : g));
            b[x] && Math.sqrt(n * n) < q[l] && ((a = c(a, b[x], d + 1, h)), (q = a[l] < q[l] ? a : q));
            return q;
          }
          var k = this,
            e = this.kdAxisArray[0],
            f = this.kdAxisArray[1],
            l = b ? 'distX' : 'dist';
          b = -1 < k.options.findNearestPointBy.indexOf('y') ? 2 : 1;
          this.kdTree || this.buildingKdTree || this.buildKDTree(d);
          if (this.kdTree) return c(a, this.kdTree, b, b);
        },
        pointPlacementToXValue: function () {
          var a = this.options.pointPlacement;
          'between' === a && (a = 0.5);
          p(a) && (a *= n(this.options.pointRange || this.xAxis.pointRange));
          return a;
        },
      }
    );
  })(H);
  (function (a) {
    var B = a.Axis,
      A = a.Chart,
      G = a.correctFloat,
      m = a.defined,
      g = a.destroyObjectProperties,
      t = a.format,
      u = a.objectEach,
      v = a.pick,
      y = a.Series;
    a.StackItem = function (a, f, e, g, r) {
      var b = a.chart.inverted;
      this.axis = a;
      this.isNegative = e;
      this.options = f;
      this.x = g;
      this.total = null;
      this.points = {};
      this.stack = r;
      this.rightCliff = this.leftCliff = 0;
      this.alignOptions = {
        align: f.align || (b ? (e ? 'left' : 'right') : 'center'),
        verticalAlign: f.verticalAlign || (b ? 'middle' : e ? 'bottom' : 'top'),
        y: v(f.y, b ? 4 : e ? 14 : -6),
        x: v(f.x, b ? (e ? -6 : 6) : 0),
      };
      this.textAlign = f.textAlign || (b ? (e ? 'right' : 'left') : 'center');
    };
    a.StackItem.prototype = {
      destroy: function () {
        g(this, this.axis);
      },
      render: function (a) {
        var f = this.axis.chart,
          e = this.options,
          g = e.format,
          g = g ? t(g, this, f.time) : e.formatter.call(this);
        this.label
          ? this.label.attr({ text: g, visibility: 'hidden' })
          : (this.label = f.renderer
              .text(g, null, null, e.useHTML)
              .css(e.style)
              .attr({ align: this.textAlign, rotation: e.rotation, visibility: 'hidden' })
              .add(a));
        this.label.labelrank = f.plotHeight;
      },
      setOffset: function (a, f) {
        var e = this.axis,
          g = e.chart,
          q = e.translate(e.usePercentage ? 100 : this.total, 0, 0, 0, 1),
          b = e.translate(0),
          b = m(q) && Math.abs(q - b);
        a = g.xAxis[0].translate(this.x) + a;
        e = m(q) && this.getStackBox(g, this, a, q, f, b, e);
        (f = this.label) &&
          e &&
          (f.align(this.alignOptions, null, e),
          (e = f.alignAttr),
          f[!1 === this.options.crop || g.isInsidePlot(e.x, e.y) ? 'show' : 'hide'](!0));
      },
      getStackBox: function (a, f, e, g, r, b, l) {
        var n = f.axis.reversed,
          d = a.inverted;
        a = l.height + l.pos - (d ? a.plotLeft : a.plotTop);
        f = (f.isNegative && !n) || (!f.isNegative && n);
        return {
          x: d ? (f ? g : g - b) : e,
          y: d ? a - e - r : f ? a - g - b : a - g,
          width: d ? b : r,
          height: d ? r : b,
        };
      },
    };
    A.prototype.getStacks = function () {
      var a = this;
      a.yAxis.forEach(function (a) {
        a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks);
      });
      a.series.forEach(function (f) {
        !f.options.stacking ||
          (!0 !== f.visible && !1 !== a.options.chart.ignoreHiddenSeries) ||
          (f.stackKey = f.type + v(f.options.stack, ''));
      });
    };
    B.prototype.buildStacks = function () {
      var a = this.series,
        f = v(this.options.reversedStacks, !0),
        e = a.length,
        g;
      if (!this.isXAxis) {
        this.usePercentage = !1;
        for (g = e; g--; ) a[f ? g : e - g - 1].setStackedPoints();
        for (g = 0; g < e; g++) a[g].modifyStacks();
      }
    };
    B.prototype.renderStackTotals = function () {
      var a = this.chart,
        f = a.renderer,
        e = this.stacks,
        g = this.stackTotalGroup;
      g || (this.stackTotalGroup = g = f.g('stack-labels').attr({ visibility: 'visible', zIndex: 6 }).add());
      g.translate(a.plotLeft, a.plotTop);
      u(e, function (a) {
        u(a, function (a) {
          a.render(g);
        });
      });
    };
    B.prototype.resetStacks = function () {
      var a = this,
        f = a.stacks;
      a.isXAxis ||
        u(f, function (e) {
          u(e, function (f, g) {
            f.touched < a.stacksTouched ? (f.destroy(), delete e[g]) : ((f.total = null), (f.cumulative = null));
          });
        });
    };
    B.prototype.cleanStacks = function () {
      var a;
      this.isXAxis ||
        (this.oldStacks && (a = this.stacks = this.oldStacks),
        u(a, function (a) {
          u(a, function (a) {
            a.cumulative = a.total;
          });
        }));
    };
    y.prototype.setStackedPoints = function () {
      if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
        var g = this.processedXData,
          f = this.processedYData,
          e = [],
          p = f.length,
          r = this.options,
          b = r.threshold,
          l = v(r.startFromThreshold && b, 0),
          n = r.stack,
          r = r.stacking,
          d = this.stackKey,
          w = '-' + d,
          E = this.negStacks,
          C = this.yAxis,
          F = C.stacks,
          c = C.oldStacks,
          k,
          x,
          D,
          h,
          z,
          t,
          u;
        C.stacksTouched += 1;
        for (z = 0; z < p; z++)
          (t = g[z]),
            (u = f[z]),
            (k = this.getStackIndicator(k, t, this.index)),
            (h = k.key),
            (D = (x = E && u < (l ? 0 : b)) ? w : d),
            F[D] || (F[D] = {}),
            F[D][t] ||
              (c[D] && c[D][t]
                ? ((F[D][t] = c[D][t]), (F[D][t].total = null))
                : (F[D][t] = new a.StackItem(C, C.options.stackLabels, x, t, n))),
            (D = F[D][t]),
            null !== u
              ? ((D.points[h] = D.points[this.index] = [v(D.cumulative, l)]),
                m(D.cumulative) || (D.base = h),
                (D.touched = C.stacksTouched),
                0 < k.index && !1 === this.singleStacks && (D.points[h][0] = D.points[this.index + ',' + t + ',0'][0]))
              : (D.points[h] = D.points[this.index] = null),
            'percent' === r
              ? ((x = x ? d : w),
                E && F[x] && F[x][t]
                  ? ((x = F[x][t]), (D.total = x.total = Math.max(x.total, D.total) + Math.abs(u) || 0))
                  : (D.total = G(D.total + (Math.abs(u) || 0))))
              : (D.total = G(D.total + (u || 0))),
            (D.cumulative = v(D.cumulative, l) + (u || 0)),
            null !== u && (D.points[h].push(D.cumulative), (e[z] = D.cumulative));
        'percent' === r && (C.usePercentage = !0);
        this.stackedYData = e;
        C.oldStacks = {};
      }
    };
    y.prototype.modifyStacks = function () {
      var a = this,
        f = a.stackKey,
        e = a.yAxis.stacks,
        g = a.processedXData,
        r,
        b = a.options.stacking;
      a[b + 'Stacker'] &&
        [f, '-' + f].forEach(function (f) {
          for (var l = g.length, d, p; l--; )
            if (
              ((d = g[l]), (r = a.getStackIndicator(r, d, a.index, f)), (p = (d = e[f] && e[f][d]) && d.points[r.key]))
            )
              a[b + 'Stacker'](p, d, l);
        });
    };
    y.prototype.percentStacker = function (a, f, e) {
      f = f.total ? 100 / f.total : 0;
      a[0] = G(a[0] * f);
      a[1] = G(a[1] * f);
      this.stackedYData[e] = a[1];
    };
    y.prototype.getStackIndicator = function (a, f, e, g) {
      !m(a) || a.x !== f || (g && a.key !== g) ? (a = { x: f, index: 0, key: g }) : a.index++;
      a.key = [e, f, a.index].join();
      return a;
    };
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.animate,
      G = a.Axis,
      m = a.Chart,
      g = a.createElement,
      t = a.css,
      u = a.defined,
      v = a.erase,
      y = a.extend,
      q = a.fireEvent,
      f = a.isNumber,
      e = a.isObject,
      p = a.isArray,
      r = a.merge,
      b = a.objectEach,
      l = a.pick,
      n = a.Point,
      d = a.Series,
      w = a.seriesTypes,
      E = a.setAnimation,
      C = a.splat;
    a.cleanRecursively = function (d, c) {
      var k = {};
      b(d, function (b, f) {
        if (e(d[f], !0) && c[f]) (b = a.cleanRecursively(d[f], c[f])), Object.keys(b).length && (k[f] = b);
        else if (e(d[f]) || d[f] !== c[f]) k[f] = d[f];
      });
      return k;
    };
    y(m.prototype, {
      addSeries: function (a, c, b) {
        var k,
          d = this;
        a &&
          ((c = l(c, !0)),
          q(d, 'addSeries', { options: a }, function () {
            k = d.initSeries(a);
            d.isDirtyLegend = !0;
            d.linkSeries();
            q(d, 'afterAddSeries');
            c && d.redraw(b);
          }));
        return k;
      },
      addAxis: function (a, c, b, d) {
        var k = c ? 'xAxis' : 'yAxis',
          h = this.options;
        a = r(a, { index: this[k].length, isX: c });
        c = new G(this, a);
        h[k] = C(h[k] || {});
        h[k].push(a);
        l(b, !0) && this.redraw(d);
        return c;
      },
      showLoading: function (a) {
        var c = this,
          b = c.options,
          d = c.loadingDiv,
          e = b.loading,
          h = function () {
            d &&
              t(d, {
                left: c.plotLeft + 'px',
                top: c.plotTop + 'px',
                width: c.plotWidth + 'px',
                height: c.plotHeight + 'px',
              });
          };
        d ||
          ((c.loadingDiv = d = g(
            'div',
            { className: 'highcharts-loading highcharts-loading-hidden' },
            null,
            c.container
          )),
          (c.loadingSpan = g('span', { className: 'highcharts-loading-inner' }, null, d)),
          B(c, 'redraw', h));
        d.className = 'highcharts-loading';
        c.loadingSpan.innerHTML = a || b.lang.loading;
        c.styledMode ||
          (t(d, y(e.style, { zIndex: 10 })),
          t(c.loadingSpan, e.labelStyle),
          c.loadingShown ||
            (t(d, { opacity: 0, display: '' }),
            A(d, { opacity: e.style.opacity || 0.5 }, { duration: e.showDuration || 0 })));
        c.loadingShown = !0;
        h();
      },
      hideLoading: function () {
        var a = this.options,
          c = this.loadingDiv;
        c &&
          ((c.className = 'highcharts-loading highcharts-loading-hidden'),
          this.styledMode ||
            A(
              c,
              { opacity: 0 },
              {
                duration: a.loading.hideDuration || 100,
                complete: function () {
                  t(c, { display: 'none' });
                },
              }
            ));
        this.loadingShown = !1;
      },
      propsRequireDirtyBox: 'backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow'.split(
        ' '
      ),
      propsRequireUpdateSeries: 'chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip'.split(
        ' '
      ),
      collectionsWithUpdate: 'xAxis yAxis zAxis series colorAxis pane'.split(' '),
      update: function (d, c, k, e) {
        var g = this,
          h = { credits: 'addCredits', title: 'setTitle', subtitle: 'setSubtitle' },
          n,
          p,
          x,
          w = [];
        q(g, 'update', { options: d });
        d.isResponsiveOptions || g.setResponsive(!1, !0);
        d = a.cleanRecursively(d, g.options);
        if ((n = d.chart)) {
          r(!0, g.options.chart, n);
          'className' in n && g.setClassName(n.className);
          'reflow' in n && g.setReflow(n.reflow);
          if ('inverted' in n || 'polar' in n || 'type' in n) g.propFromSeries(), (p = !0);
          'alignTicks' in n && (p = !0);
          b(n, function (a, c) {
            -1 !== g.propsRequireUpdateSeries.indexOf('chart.' + c) && (x = !0);
            -1 !== g.propsRequireDirtyBox.indexOf(c) && (g.isDirtyBox = !0);
          });
          !g.styledMode && 'style' in n && g.renderer.setStyle(n.style);
        }
        !g.styledMode && d.colors && (this.options.colors = d.colors);
        d.plotOptions && r(!0, this.options.plotOptions, d.plotOptions);
        b(d, function (a, c) {
          if (g[c] && 'function' === typeof g[c].update) g[c].update(a, !1);
          else if ('function' === typeof g[h[c]]) g[h[c]](a);
          'chart' !== c && -1 !== g.propsRequireUpdateSeries.indexOf(c) && (x = !0);
        });
        this.collectionsWithUpdate.forEach(function (a) {
          var c;
          d[a] &&
            ('series' === a &&
              ((c = []),
              g[a].forEach(function (a, b) {
                a.options.isInternal || c.push(l(a.options.index, b));
              })),
            C(d[a]).forEach(function (b, d) {
              (d = (u(b.id) && g.get(b.id)) || g[a][c ? c[d] : d]) &&
                d.coll === a &&
                (d.update(b, !1), k && (d.touched = !0));
              if (!d && k)
                if ('series' === a) g.addSeries(b, !1).touched = !0;
                else if ('xAxis' === a || 'yAxis' === a) g.addAxis(b, 'xAxis' === a, !1).touched = !0;
            }),
            k &&
              g[a].forEach(function (a) {
                a.touched || a.options.isInternal ? delete a.touched : w.push(a);
              }));
        });
        w.forEach(function (a) {
          a.remove && a.remove(!1);
        });
        p &&
          g.axes.forEach(function (a) {
            a.update({}, !1);
          });
        x &&
          g.series.forEach(function (a) {
            a.update({}, !1);
          });
        d.loading && r(!0, g.options.loading, d.loading);
        p = n && n.width;
        n = n && n.height;
        (f(p) && p !== g.chartWidth) || (f(n) && n !== g.chartHeight) ? g.setSize(p, n, e) : l(c, !0) && g.redraw(e);
        q(g, 'afterUpdate', { options: d });
      },
      setSubtitle: function (a) {
        this.setTitle(void 0, a);
      },
    });
    y(n.prototype, {
      update: function (a, c, b, d) {
        function k() {
          h.applyOptions(a);
          null === h.y && g && (h.graphic = g.destroy());
          e(a, !0) &&
            (g && g.element && a && a.marker && void 0 !== a.marker.symbol && (h.graphic = g.destroy()),
            a && a.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()),
            h.connector && (h.connector = h.connector.destroy()));
          n = h.index;
          f.updateParallelArrays(h, n);
          x.data[n] = e(x.data[n], !0) || e(a, !0) ? h.options : l(a, x.data[n]);
          f.isDirty = f.isDirtyData = !0;
          !f.fixedBox && f.hasCartesianSeries && (p.isDirtyBox = !0);
          'point' === x.legendType && (p.isDirtyLegend = !0);
          c && p.redraw(b);
        }
        var h = this,
          f = h.series,
          g = h.graphic,
          n,
          p = f.chart,
          x = f.options;
        c = l(c, !0);
        !1 === d ? k() : h.firePointEvent('update', { options: a }, k);
      },
      remove: function (a, c) {
        this.series.removePoint(this.series.data.indexOf(this), a, c);
      },
    });
    y(d.prototype, {
      addPoint: function (a, c, b, d) {
        var k = this.options,
          h = this.data,
          e = this.chart,
          f = this.xAxis,
          f = f && f.hasNames && f.names,
          g = k.data,
          n,
          p,
          x = this.xData,
          w,
          r;
        c = l(c, !0);
        n = { series: this };
        this.pointClass.prototype.applyOptions.apply(n, [a]);
        r = n.x;
        w = x.length;
        if (this.requireSorting && r < x[w - 1]) for (p = !0; w && x[w - 1] > r; ) w--;
        this.updateParallelArrays(n, 'splice', w, 0, 0);
        this.updateParallelArrays(n, w);
        f && n.name && (f[r] = n.name);
        g.splice(w, 0, a);
        p && (this.data.splice(w, 0, null), this.processData());
        'point' === k.legendType && this.generatePoints();
        b && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), this.updateParallelArrays(n, 'shift'), g.shift()));
        this.isDirtyData = this.isDirty = !0;
        c && e.redraw(d);
      },
      removePoint: function (a, c, b) {
        var d = this,
          k = d.data,
          h = k[a],
          e = d.points,
          f = d.chart,
          g = function () {
            e && e.length === k.length && e.splice(a, 1);
            k.splice(a, 1);
            d.options.data.splice(a, 1);
            d.updateParallelArrays(h || { series: d }, 'splice', a, 1);
            h && h.destroy();
            d.isDirty = !0;
            d.isDirtyData = !0;
            c && f.redraw();
          };
        E(b, f);
        c = l(c, !0);
        h ? h.firePointEvent('remove', null, g) : g();
      },
      remove: function (a, c, b, d) {
        function k() {
          h.destroy(d);
          h.remove = null;
          e.isDirtyLegend = e.isDirtyBox = !0;
          e.linkSeries();
          l(a, !0) && e.redraw(c);
        }
        var h = this,
          e = h.chart;
        !1 !== b ? q(h, 'remove', null, k) : k();
      },
      update: function (b, c) {
        b = a.cleanRecursively(b, this.userOptions);
        var d = this,
          e = d.chart,
          f = d.userOptions,
          h = d.initialType || d.type,
          g = b.type || f.type || e.options.chart.type,
          n = w[h].prototype,
          p,
          m = ['group', 'markerGroup', 'dataLabelsGroup'],
          E = ['navigatorSeries', 'baseSeries'],
          C = d.finishedAnimating && { animation: !1 },
          t = ['data', 'name', 'turboThreshold'],
          v = Object.keys(b),
          F = 0 < v.length;
        v.forEach(function (a) {
          -1 === t.indexOf(a) && (F = !1);
        });
        if (F) b.data && this.setData(b.data, !1), b.name && this.setName(b.name, !1);
        else {
          E = m.concat(E);
          E.forEach(function (a) {
            E[a] = d[a];
            delete d[a];
          });
          b = r(f, C, { index: d.index, pointStart: l(f.pointStart, d.xData[0]) }, { data: d.options.data }, b);
          d.remove(!1, null, !1, !0);
          for (p in n) d[p] = void 0;
          w[g || h] ? y(d, w[g || h].prototype) : a.error(17, !0, e);
          E.forEach(function (a) {
            d[a] = E[a];
          });
          d.init(e, b);
          b.zIndex !== f.zIndex &&
            m.forEach(function (a) {
              d[a] && d[a].attr({ zIndex: b.zIndex });
            });
          d.initialType = h;
          e.linkSeries();
        }
        q(this, 'afterUpdate');
        l(c, !0) && e.redraw(F ? void 0 : !1);
      },
      setName: function (a) {
        this.name = this.options.name = this.userOptions.name = a;
        this.chart.isDirtyLegend = !0;
      },
    });
    y(G.prototype, {
      update: function (a, c) {
        var d = this.chart,
          e = (a && a.events) || {};
        a = r(this.userOptions, a);
        d.options[this.coll].indexOf && (d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)] = a);
        b(d.options[this.coll].events, function (a, c) {
          'undefined' === typeof e[c] && (e[c] = void 0);
        });
        this.destroy(!0);
        this.init(d, y(a, { events: e }));
        d.isDirtyBox = !0;
        l(c, !0) && d.redraw();
      },
      remove: function (a) {
        for (var c = this.chart, b = this.coll, d = this.series, e = d.length; e--; ) d[e] && d[e].remove(!1);
        v(c.axes, this);
        v(c[b], this);
        p(c.options[b]) ? c.options[b].splice(this.options.index, 1) : delete c.options[b];
        c[b].forEach(function (a, c) {
          a.options.index = a.userOptions.index = c;
        });
        this.destroy();
        c.isDirtyBox = !0;
        l(a, !0) && c.redraw();
      },
      setTitle: function (a, c) {
        this.update({ title: a }, c);
      },
      setCategories: function (a, c) {
        this.update({ categories: a }, c);
      },
    });
  })(H);
  (function (a) {
    var B = a.color,
      A = a.pick,
      G = a.Series,
      m = a.seriesType;
    m(
      'area',
      'line',
      { softThreshold: !1, threshold: 0 },
      {
        singleStacks: !1,
        getStackPoints: function (g) {
          var m = [],
            u = [],
            v = this.xAxis,
            y = this.yAxis,
            q = y.stacks[this.stackKey],
            f = {},
            e = this.index,
            p = y.series,
            r = p.length,
            b,
            l = A(y.options.reversedStacks, !0) ? 1 : -1,
            n;
          g = g || this.points;
          if (this.options.stacking) {
            for (n = 0; n < g.length; n++) (g[n].leftNull = g[n].rightNull = null), (f[g[n].x] = g[n]);
            a.objectEach(q, function (a, b) {
              null !== a.total && u.push(b);
            });
            u.sort(function (a, b) {
              return a - b;
            });
            b = p.map(function (a) {
              return a.visible;
            });
            u.forEach(function (a, g) {
              var d = 0,
                p,
                w;
              if (f[a] && !f[a].isNull)
                m.push(f[a]),
                  [-1, 1].forEach(function (c) {
                    var d = 1 === c ? 'rightNull' : 'leftNull',
                      x = 0,
                      m = q[u[g + c]];
                    if (m)
                      for (n = e; 0 <= n && n < r; )
                        (p = m.points[n]),
                          p || (n === e ? (f[a][d] = !0) : b[n] && (w = q[a].points[n]) && (x -= w[1] - w[0])),
                          (n += l);
                    f[a][1 === c ? 'rightCliff' : 'leftCliff'] = x;
                  });
              else {
                for (n = e; 0 <= n && n < r; ) {
                  if ((p = q[a].points[n])) {
                    d = p[1];
                    break;
                  }
                  n += l;
                }
                d = y.translate(d, 0, 1, 0, 1);
                m.push({ isNull: !0, plotX: v.translate(a, 0, 0, 0, 1), x: a, plotY: d, yBottom: d });
              }
            });
          }
          return m;
        },
        getGraphPath: function (a) {
          var g = G.prototype.getGraphPath,
            m = this.options,
            v = m.stacking,
            y = this.yAxis,
            q,
            f,
            e = [],
            p = [],
            r = this.index,
            b,
            l = y.stacks[this.stackKey],
            n = m.threshold,
            d = y.getThreshold(m.threshold),
            w,
            m = m.connectNulls || 'percent' === v,
            E = function (f, g, c) {
              var k = a[f];
              f = v && l[k.x].points[r];
              var x = k[c + 'Null'] || 0;
              c = k[c + 'Cliff'] || 0;
              var w,
                h,
                k = !0;
              c || x
                ? ((w = (x ? f[0] : f[1]) + c), (h = f[0] + c), (k = !!x))
                : !v && a[g] && a[g].isNull && (w = h = n);
              void 0 !== w &&
                (p.push({ plotX: b, plotY: null === w ? d : y.getThreshold(w), isNull: k, isCliff: !0 }),
                e.push({ plotX: b, plotY: null === h ? d : y.getThreshold(h), doCurve: !1 }));
            };
          a = a || this.points;
          v && (a = this.getStackPoints(a));
          for (q = 0; q < a.length; q++)
            if (((f = a[q].isNull), (b = A(a[q].rectPlotX, a[q].plotX)), (w = A(a[q].yBottom, d)), !f || m))
              m || E(q, q - 1, 'left'),
                (f && !v && m) || (p.push(a[q]), e.push({ x: q, plotX: b, plotY: w })),
                m || E(q, q + 1, 'right');
          q = g.call(this, p, !0, !0);
          e.reversed = !0;
          f = g.call(this, e, !0, !0);
          f.length && (f[0] = 'L');
          f = q.concat(f);
          g = g.call(this, p, !1, m);
          f.xMap = q.xMap;
          this.areaPath = f;
          return g;
        },
        drawGraph: function () {
          this.areaPath = [];
          G.prototype.drawGraph.apply(this);
          var a = this,
            m = this.areaPath,
            u = this.options,
            v = [['area', 'highcharts-area', this.color, u.fillColor]];
          this.zones.forEach(function (g, q) {
            v.push([
              'zone-area-' + q,
              'highcharts-area highcharts-zone-area-' + q + ' ' + g.className,
              g.color || a.color,
              g.fillColor || u.fillColor,
            ]);
          });
          v.forEach(function (g) {
            var q = g[0],
              f = a[q];
            f
              ? ((f.endX = a.preventGraphAnimation ? null : m.xMap), f.animate({ d: m }))
              : ((f = { zIndex: 0 }),
                a.chart.styledMode || (f.fill = A(g[3], B(g[2]).setOpacity(A(u.fillOpacity, 0.75)).get())),
                (f = a[q] = a.chart.renderer.path(m).addClass(g[1]).attr(f).add(a.group)),
                (f.isArea = !0));
            f.startX = m.xMap;
            f.shiftUnit = u.step ? 2 : 1;
          });
        },
        drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
      }
    );
  })(H);
  (function (a) {
    var B = a.pick;
    a = a.seriesType;
    a(
      'spline',
      'line',
      {},
      {
        getPointSpline: function (a, G, m) {
          var g = G.plotX,
            t = G.plotY,
            u = a[m - 1];
          m = a[m + 1];
          var v, y, q, f;
          if (u && !u.isNull && !1 !== u.doCurve && !G.isCliff && m && !m.isNull && !1 !== m.doCurve && !G.isCliff) {
            a = u.plotY;
            q = m.plotX;
            m = m.plotY;
            var e = 0;
            v = (1.5 * g + u.plotX) / 2.5;
            y = (1.5 * t + a) / 2.5;
            q = (1.5 * g + q) / 2.5;
            f = (1.5 * t + m) / 2.5;
            q !== v && (e = ((f - y) * (q - g)) / (q - v) + t - f);
            y += e;
            f += e;
            y > a && y > t
              ? ((y = Math.max(a, t)), (f = 2 * t - y))
              : y < a && y < t && ((y = Math.min(a, t)), (f = 2 * t - y));
            f > m && f > t
              ? ((f = Math.max(m, t)), (y = 2 * t - f))
              : f < m && f < t && ((f = Math.min(m, t)), (y = 2 * t - f));
            G.rightContX = q;
            G.rightContY = f;
          }
          G = ['C', B(u.rightContX, u.plotX), B(u.rightContY, u.plotY), B(v, g), B(y, t), g, t];
          u.rightContX = u.rightContY = null;
          return G;
        },
      }
    );
  })(H);
  (function (a) {
    var B = a.seriesTypes.area.prototype,
      A = a.seriesType;
    A('areaspline', 'spline', a.defaultPlotOptions.area, {
      getStackPoints: B.getStackPoints,
      getGraphPath: B.getGraphPath,
      drawGraph: B.drawGraph,
      drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
    });
  })(H);
  (function (a) {
    var B = a.animObject,
      A = a.color,
      G = a.extend,
      m = a.defined,
      g = a.isNumber,
      t = a.merge,
      u = a.pick,
      v = a.Series,
      y = a.seriesType,
      q = a.svg;
    y(
      'column',
      'line',
      {
        borderRadius: 0,
        crisp: !0,
        groupPadding: 0.2,
        marker: null,
        pointPadding: 0.1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: { hover: { halo: !1, brightness: 0.1 }, select: { color: '#cccccc', borderColor: '#000000' } },
        dataLabels: { align: null, verticalAlign: null, y: null },
        softThreshold: !1,
        startFromThreshold: !0,
        stickyTracking: !1,
        tooltip: { distance: 6 },
        threshold: 0,
        borderColor: '#ffffff',
      },
      {
        cropShoulder: 0,
        directTouch: !0,
        trackerGroups: ['group', 'dataLabelsGroup'],
        negStacks: !0,
        init: function () {
          v.prototype.init.apply(this, arguments);
          var a = this,
            e = a.chart;
          e.hasRendered &&
            e.series.forEach(function (e) {
              e.type === a.type && (e.isDirty = !0);
            });
        },
        getColumnMetrics: function () {
          var a = this,
            e = a.options,
            g = a.xAxis,
            r = a.yAxis,
            b = g.options.reversedStacks,
            b = (g.reversed && !b) || (!g.reversed && b),
            l,
            n = {},
            d = 0;
          !1 === e.grouping
            ? (d = 1)
            : a.chart.series.forEach(function (b) {
                var c = b.options,
                  k = b.yAxis,
                  e;
                b.type !== a.type ||
                  (!b.visible && a.chart.options.chart.ignoreHiddenSeries) ||
                  r.len !== k.len ||
                  r.pos !== k.pos ||
                  (c.stacking
                    ? ((l = b.stackKey), void 0 === n[l] && (n[l] = d++), (e = n[l]))
                    : !1 !== c.grouping && (e = d++),
                  (b.columnIndex = e));
              });
          var w = Math.min(
              Math.abs(g.transA) * (g.ordinalSlope || e.pointRange || g.closestPointRange || g.tickInterval || 1),
              g.len
            ),
            q = w * e.groupPadding,
            m = (w - 2 * q) / (d || 1),
            e = Math.min(e.maxPointWidth || g.len, u(e.pointWidth, m * (1 - 2 * e.pointPadding)));
          a.columnMetrics = {
            width: e,
            offset: (m - e) / 2 + (q + ((a.columnIndex || 0) + (b ? 1 : 0)) * m - w / 2) * (b ? -1 : 1),
          };
          return a.columnMetrics;
        },
        crispCol: function (a, e, g, r) {
          var b = this.chart,
            f = this.borderWidth,
            n = -(f % 2 ? 0.5 : 0),
            f = f % 2 ? 0.5 : 1;
          b.inverted && b.renderer.isVML && (f += 1);
          this.options.crisp && ((g = Math.round(a + g) + n), (a = Math.round(a) + n), (g -= a));
          r = Math.round(e + r) + f;
          n = 0.5 >= Math.abs(e) && 0.5 < r;
          e = Math.round(e) + f;
          r -= e;
          n && r && (--e, (r += 1));
          return { x: a, y: e, width: g, height: r };
        },
        translate: function () {
          var a = this,
            e = a.chart,
            g = a.options,
            r = (a.dense = 2 > a.closestPointRange * a.xAxis.transA),
            r = (a.borderWidth = u(g.borderWidth, r ? 0 : 1)),
            b = a.yAxis,
            l = g.threshold,
            n = (a.translatedThreshold = b.getThreshold(l)),
            d = u(g.minPointLength, 5),
            w = a.getColumnMetrics(),
            q = w.width,
            C = (a.barW = Math.max(q, 1 + 2 * r)),
            t = (a.pointXOffset = w.offset);
          e.inverted && (n -= 0.5);
          g.pointPadding && (C = Math.ceil(C));
          v.prototype.translate.apply(a);
          a.points.forEach(function (c) {
            var k = u(c.yBottom, n),
              f = 999 + Math.abs(k),
              g = q,
              f = Math.min(Math.max(-f, c.plotY), b.len + f),
              h = c.plotX + t,
              p = C,
              w = Math.min(f, k),
              r,
              E = Math.max(f, k) - w;
            d &&
              Math.abs(E) < d &&
              ((E = d),
              (r = (!b.reversed && !c.negative) || (b.reversed && c.negative)),
              c.y === l && a.dataMax <= l && b.min < l && (r = !r),
              (w = Math.abs(w - n) > d ? k - d : n - (r ? d : 0)));
            m(c.options.pointWidth) && ((g = p = Math.ceil(c.options.pointWidth)), (h -= Math.round((g - q) / 2)));
            c.barX = h;
            c.pointWidth = g;
            c.tooltipPos = e.inverted
              ? [b.len + b.pos - e.plotLeft - f, a.xAxis.len - h - p / 2, E]
              : [h + p / 2, f + b.pos - e.plotTop, E];
            c.shapeType = c.shapeType || 'rect';
            c.shapeArgs = a.crispCol.apply(a, c.isNull ? [h, n, p, 0] : [h, w, p, E]);
          });
        },
        getSymbol: a.noop,
        drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
        drawGraph: function () {
          this.group[this.dense ? 'addClass' : 'removeClass']('highcharts-dense-data');
        },
        pointAttribs: function (a, e) {
          var f = this.options,
            g,
            b = this.pointAttrToOptions || {};
          g = b.stroke || 'borderColor';
          var l = b['stroke-width'] || 'borderWidth',
            n = (a && a.color) || this.color,
            d = (a && a[g]) || f[g] || this.color || n,
            w = (a && a[l]) || f[l] || this[l] || 0,
            b = f.dashStyle;
          a && this.zones.length && ((n = a.getZone()), (n = a.options.color || (n && n.color) || this.color));
          e &&
            ((a = t(f.states[e], (a.options.states && a.options.states[e]) || {})),
            (e = a.brightness),
            (n = a.color || (void 0 !== e && A(n).brighten(a.brightness).get()) || n),
            (d = a[g] || d),
            (w = a[l] || w),
            (b = a.dashStyle || b));
          g = { fill: n, stroke: d, 'stroke-width': w };
          b && (g.dashstyle = b);
          return g;
        },
        drawPoints: function () {
          var a = this,
            e = this.chart,
            p = a.options,
            r = e.renderer,
            b = p.animationLimit || 250,
            l;
          a.points.forEach(function (f) {
            var d = f.graphic,
              n = d && e.pointCount < b ? 'animate' : 'attr';
            if (g(f.plotY) && null !== f.y) {
              l = f.shapeArgs;
              if (d) d[n](t(l));
              else f.graphic = d = r[f.shapeType](l).add(f.group || a.group);
              p.borderRadius && d.attr({ r: p.borderRadius });
              e.styledMode ||
                d[n](a.pointAttribs(f, f.selected && 'select')).shadow(p.shadow, null, p.stacking && !p.borderRadius);
              d.addClass(f.getClassName(), !0);
            } else d && (f.graphic = d.destroy());
          });
        },
        animate: function (a) {
          var e = this,
            f = this.yAxis,
            g = e.options,
            b = this.chart.inverted,
            l = {},
            n = b ? 'translateX' : 'translateY',
            d;
          q &&
            (a
              ? ((l.scaleY = 0.001),
                (a = Math.min(f.pos + f.len, Math.max(f.pos, f.toPixels(g.threshold)))),
                b ? (l.translateX = a - f.len) : (l.translateY = a),
                e.clipBox && e.setClip(),
                e.group.attr(l))
              : ((d = e.group.attr(n)),
                e.group.animate(
                  { scaleY: 1 },
                  G(B(e.options.animation), {
                    step: function (a, b) {
                      l[n] = d + b.pos * (f.pos - d);
                      e.group.attr(l);
                    },
                  })
                ),
                (e.animate = null)));
        },
        remove: function () {
          var a = this,
            e = a.chart;
          e.hasRendered &&
            e.series.forEach(function (e) {
              e.type === a.type && (e.isDirty = !0);
            });
          v.prototype.remove.apply(a, arguments);
        },
      }
    );
  })(H);
  (function (a) {
    a = a.seriesType;
    a('bar', 'column', null, { inverted: !0 });
  })(H);
  (function (a) {
    var B = a.Series,
      A = a.seriesType;
    A(
      'scatter',
      'line',
      {
        lineWidth: 0,
        findNearestPointBy: 'xy',
        jitter: { x: 0, y: 0 },
        marker: { enabled: !0 },
        tooltip: {
          headerFormat:
            '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
          pointFormat: 'x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
        },
      },
      {
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
        takeOrdinalPosition: !1,
        drawGraph: function () {
          this.options.lineWidth && B.prototype.drawGraph.call(this);
        },
        applyJitter: function () {
          var a = this,
            m = this.options.jitter,
            g = this.points.length;
          m &&
            this.points.forEach(function (t, u) {
              ['x', 'y'].forEach(function (v, y) {
                var q,
                  f = 'plot' + v.toUpperCase(),
                  e,
                  p;
                m[v] &&
                  !t.isNull &&
                  ((q = a[v + 'Axis']),
                  (p = m[v] * q.transA),
                  q &&
                    !q.isLog &&
                    ((e = Math.max(0, t[f] - p)),
                    (q = Math.min(q.len, t[f] + p)),
                    (y = 1e4 * Math.sin(u + y * g)),
                    (t[f] = e + (q - e) * (y - Math.floor(y))),
                    'x' === v && (t.clientX = t.plotX)));
              });
            });
        },
      }
    );
    a.addEvent(B, 'afterTranslate', function () {
      this.applyJitter && this.applyJitter();
    });
  })(H);
  (function (a) {
    var B = a.deg2rad,
      A = a.isNumber,
      G = a.pick,
      m = a.relativeLength;
    a.CenteredSeriesMixin = {
      getCenter: function () {
        var a = this.options,
          t = this.chart,
          u = 2 * (a.slicedOffset || 0),
          v = t.plotWidth - 2 * u,
          t = t.plotHeight - 2 * u,
          y = a.center,
          y = [G(y[0], '50%'), G(y[1], '50%'), a.size || '100%', a.innerSize || 0],
          q = Math.min(v, t),
          f,
          e;
        for (f = 0; 4 > f; ++f)
          (e = y[f]), (a = 2 > f || (2 === f && /%$/.test(e))), (y[f] = m(e, [v, t, q, y[2]][f]) + (a ? u : 0));
        y[3] > y[2] && (y[3] = y[2]);
        return y;
      },
      getStartAndEndRadians: function (a, m) {
        a = A(a) ? a : 0;
        m = A(m) && m > a && 360 > m - a ? m : a + 360;
        return { start: B * (a + -90), end: B * (m + -90) };
      },
    };
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.CenteredSeriesMixin,
      G = a.defined,
      m = a.extend,
      g = A.getStartAndEndRadians,
      t = a.noop,
      u = a.pick,
      v = a.Point,
      y = a.Series,
      q = a.seriesType,
      f = a.setAnimation;
    q(
      'pie',
      'line',
      {
        center: [null, null],
        clip: !1,
        colorByPoint: !0,
        dataLabels: {
          allowOverlap: !0,
          connectorPadding: 5,
          distance: 30,
          enabled: !0,
          formatter: function () {
            return this.point.isNull ? void 0 : this.point.name;
          },
          softConnector: !0,
          x: 0,
          connectorShape: 'fixedOffset',
          crookDistance: '70%',
        },
        ignoreHiddenPoint: !0,
        legendType: 'point',
        marker: null,
        size: null,
        showInLegend: !1,
        slicedOffset: 10,
        stickyTracking: !1,
        tooltip: { followPointer: !0 },
        borderColor: '#ffffff',
        borderWidth: 1,
        states: { hover: { brightness: 0.1 } },
      },
      {
        isCartesian: !1,
        requireSorting: !1,
        directTouch: !0,
        noSharedTooltip: !0,
        trackerGroups: ['group', 'dataLabelsGroup'],
        axisTypes: [],
        pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
        animate: function (a) {
          var e = this,
            f = e.points,
            b = e.startAngleRad;
          a ||
            (f.forEach(function (a) {
              var f = a.graphic,
                d = a.shapeArgs;
              f &&
                (f.attr({ r: a.startR || e.center[3] / 2, start: b, end: b }),
                f.animate({ r: d.r, start: d.start, end: d.end }, e.options.animation));
            }),
            (e.animate = null));
        },
        updateTotals: function () {
          var a,
            f = 0,
            g = this.points,
            b = g.length,
            l,
            n = this.options.ignoreHiddenPoint;
          for (a = 0; a < b; a++) (l = g[a]), (f += n && !l.visible ? 0 : l.isNull ? 0 : l.y);
          this.total = f;
          for (a = 0; a < b; a++)
            (l = g[a]), (l.percentage = 0 < f && (l.visible || !n) ? (l.y / f) * 100 : 0), (l.total = f);
        },
        generatePoints: function () {
          y.prototype.generatePoints.call(this);
          this.updateTotals();
        },
        getX: function (a, f, g) {
          var b = this.center,
            e = this.radii ? this.radii[g.index] : b[2] / 2;
          return (
            b[0] +
            (f ? -1 : 1) *
              Math.cos(Math.asin(Math.max(Math.min((a - b[1]) / (e + g.labelDistance), 1), -1))) *
              (e + g.labelDistance) +
            (0 < g.labelDistance ? (f ? -1 : 1) * this.options.dataLabels.padding : 0)
          );
        },
        translate: function (a) {
          this.generatePoints();
          var e = 0,
            f = this.options,
            b = f.slicedOffset,
            l = b + (f.borderWidth || 0),
            n,
            d,
            w = g(f.startAngle, f.endAngle),
            q = (this.startAngleRad = w.start),
            w = (this.endAngleRad = w.end) - q,
            m = this.points,
            t,
            c,
            k = f.dataLabels.distance,
            f = f.ignoreHiddenPoint,
            x,
            D = m.length,
            h;
          a || (this.center = a = this.getCenter());
          for (x = 0; x < D; x++) {
            h = m[x];
            h.labelDistance = u(h.options.dataLabels && h.options.dataLabels.distance, k);
            this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, h.labelDistance);
            n = q + e * w;
            if (!f || h.visible) e += h.percentage / 100;
            d = q + e * w;
            h.shapeType = 'arc';
            h.shapeArgs = {
              x: a[0],
              y: a[1],
              r: a[2] / 2,
              innerR: a[3] / 2,
              start: Math.round(1e3 * n) / 1e3,
              end: Math.round(1e3 * d) / 1e3,
            };
            d = (d + n) / 2;
            d > 1.5 * Math.PI ? (d -= 2 * Math.PI) : d < -Math.PI / 2 && (d += 2 * Math.PI);
            h.slicedTranslation = { translateX: Math.round(Math.cos(d) * b), translateY: Math.round(Math.sin(d) * b) };
            t = (Math.cos(d) * a[2]) / 2;
            c = (Math.sin(d) * a[2]) / 2;
            h.tooltipPos = [a[0] + 0.7 * t, a[1] + 0.7 * c];
            h.half = d < -Math.PI / 2 || d > Math.PI / 2 ? 1 : 0;
            h.angle = d;
            n = Math.min(l, h.labelDistance / 5);
            h.labelPosition = {
              natural: { x: a[0] + t + Math.cos(d) * h.labelDistance, y: a[1] + c + Math.sin(d) * h.labelDistance },
              final: {},
              alignment: 0 > h.labelDistance ? 'center' : h.half ? 'right' : 'left',
              connectorPosition: {
                breakAt: { x: a[0] + t + Math.cos(d) * n, y: a[1] + c + Math.sin(d) * n },
                touchingSliceAt: { x: a[0] + t, y: a[1] + c },
              },
            };
          }
        },
        drawGraph: null,
        drawPoints: function () {
          var a = this,
            f = a.chart,
            g = f.renderer,
            b,
            l,
            n,
            d,
            w = a.options.shadow;
          !w || a.shadowGroup || f.styledMode || (a.shadowGroup = g.g('shadow').add(a.group));
          a.points.forEach(function (e) {
            l = e.graphic;
            if (e.isNull) l && (e.graphic = l.destroy());
            else {
              d = e.shapeArgs;
              b = e.getTranslate();
              if (!f.styledMode) {
                var p = e.shadowGroup;
                w && !p && (p = e.shadowGroup = g.g('shadow').add(a.shadowGroup));
                p && p.attr(b);
                n = a.pointAttribs(e, e.selected && 'select');
              }
              l
                ? (l.setRadialReference(a.center), f.styledMode || l.attr(n), l.animate(m(d, b)))
                : ((e.graphic = l = g[e.shapeType](d).setRadialReference(a.center).attr(b).add(a.group)),
                  f.styledMode || l.attr(n).attr({ 'stroke-linejoin': 'round' }).shadow(w, p));
              l.attr({ visibility: e.visible ? 'inherit' : 'hidden' });
              l.addClass(e.getClassName());
            }
          });
        },
        searchPoint: t,
        sortByAngle: function (a, f) {
          a.sort(function (a, b) {
            return void 0 !== a.angle && (b.angle - a.angle) * f;
          });
        },
        drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
        getCenter: A.getCenter,
        getSymbol: t,
      },
      {
        init: function () {
          v.prototype.init.apply(this, arguments);
          var a = this,
            f;
          a.name = u(a.name, 'Slice');
          f = function (e) {
            a.slice('select' === e.type);
          };
          B(a, 'select', f);
          B(a, 'unselect', f);
          return a;
        },
        isValid: function () {
          return a.isNumber(this.y, !0) && 0 <= this.y;
        },
        setVisible: function (a, f) {
          var e = this,
            b = e.series,
            g = b.chart,
            n = b.options.ignoreHiddenPoint;
          f = u(f, n);
          a !== e.visible &&
            ((e.visible = e.options.visible = a = void 0 === a ? !e.visible : a),
            (b.options.data[b.data.indexOf(e)] = e.options),
            ['graphic', 'dataLabel', 'connector', 'shadowGroup'].forEach(function (b) {
              if (e[b]) e[b][a ? 'show' : 'hide'](!0);
            }),
            e.legendItem && g.legend.colorizeItem(e, a),
            a || 'hover' !== e.state || e.setState(''),
            n && (b.isDirty = !0),
            f && g.redraw());
        },
        slice: function (a, g, q) {
          var b = this.series;
          f(q, b.chart);
          u(g, !0);
          this.sliced = this.options.sliced = G(a) ? a : !this.sliced;
          b.options.data[b.data.indexOf(this)] = this.options;
          this.graphic.animate(this.getTranslate());
          this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
        },
        getTranslate: function () {
          return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 };
        },
        haloPath: function (a) {
          var e = this.shapeArgs;
          return this.sliced || !this.visible
            ? []
            : this.series.chart.renderer.symbols.arc(e.x, e.y, e.r + a, e.r + a, {
                innerR: this.shapeArgs.r - 1,
                start: e.start,
                end: e.end,
              });
        },
        connectorShapes: {
          fixedOffset: function (a, f, g) {
            var b = f.breakAt;
            f = f.touchingSliceAt;
            return ['M', a.x, a.y]
              .concat(
                g.softConnector
                  ? ['C', a.x + ('left' === a.alignment ? -5 : 5), a.y, 2 * b.x - f.x, 2 * b.y - f.y, b.x, b.y]
                  : ['L', b.x, b.y]
              )
              .concat(['L', f.x, f.y]);
          },
          straight: function (a, f) {
            f = f.touchingSliceAt;
            return ['M', a.x, a.y, 'L', f.x, f.y];
          },
          crookedLine: function (e, f, g) {
            f = f.touchingSliceAt;
            var b = this.series,
              l = b.center[0],
              n = b.chart.plotWidth,
              d = b.chart.plotLeft,
              b = e.alignment,
              w = this.shapeArgs.r;
            g = a.relativeLength(g.crookDistance, 1);
            g = 'left' === b ? l + w + (n + d - l - w) * (1 - g) : d + (l - w) * g;
            l = ['L', g, e.y];
            if ('left' === b ? g > e.x || g < f.x : g < e.x || g > f.x) l = [];
            return ['M', e.x, e.y].concat(l).concat(['L', f.x, f.y]);
          },
        },
        getConnectorPath: function () {
          var a = this.labelPosition,
            f = this.series.options.dataLabels,
            g = f.connectorShape,
            b = this.connectorShapes;
          b[g] && (g = b[g]);
          return g.call(this, { x: a.final.x, y: a.final.y, alignment: a.alignment }, a.connectorPosition, f);
        },
      }
    );
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.arrayMax,
      G = a.defined,
      m = a.extend,
      g = a.format,
      t = a.merge,
      u = a.noop,
      v = a.pick,
      y = a.relativeLength,
      q = a.Series,
      f = a.seriesTypes,
      e = a.stableSort,
      p = a.isArray,
      r = a.splat;
    a.distribute = function (b, f, g) {
      function d(a, c) {
        return a.target - c.target;
      }
      var l,
        n = !0,
        p = b,
        q = [],
        c;
      c = 0;
      var k = p.reducedLen || f;
      for (l = b.length; l--; ) c += b[l].size;
      if (c > k) {
        e(b, function (a, c) {
          return (c.rank || 0) - (a.rank || 0);
        });
        for (c = l = 0; c <= k; ) (c += b[l].size), l++;
        q = b.splice(l - 1, b.length);
      }
      e(b, d);
      for (
        b = b.map(function (a) {
          return { size: a.size, targets: [a.target], align: v(a.align, 0.5) };
        });
        n;

      ) {
        for (l = b.length; l--; )
          (n = b[l]),
            (c = (Math.min.apply(0, n.targets) + Math.max.apply(0, n.targets)) / 2),
            (n.pos = Math.min(Math.max(0, c - n.size * n.align), f - n.size));
        l = b.length;
        for (n = !1; l--; )
          0 < l &&
            b[l - 1].pos + b[l - 1].size > b[l].pos &&
            ((b[l - 1].size += b[l].size),
            (b[l - 1].targets = b[l - 1].targets.concat(b[l].targets)),
            (b[l - 1].align = 0.5),
            b[l - 1].pos + b[l - 1].size > f && (b[l - 1].pos = f - b[l - 1].size),
            b.splice(l, 1),
            (n = !0));
      }
      p.push.apply(p, q);
      l = 0;
      b.some(function (c) {
        var b = 0;
        if (
          c.targets.some(function () {
            p[l].pos = c.pos + b;
            if (Math.abs(p[l].pos - p[l].target) > g)
              return (
                p.slice(0, l + 1).forEach(function (a) {
                  delete a.pos;
                }),
                (p.reducedLen = (p.reducedLen || f) - 0.1 * f),
                p.reducedLen > 0.1 * f && a.distribute(p, f, g),
                !0
              );
            b += p[l].size;
            l++;
          })
        )
          return !0;
      });
      e(p, d);
    };
    q.prototype.drawDataLabels = function () {
      function b(a, c) {
        var b = c.filter;
        return b
          ? ((c = b.operator),
            (a = a[b.property]),
            (b = b.value),
            ('\x3e' === c && a > b) ||
            ('\x3c' === c && a < b) ||
            ('\x3e\x3d' === c && a >= b) ||
            ('\x3c\x3d' === c && a <= b) ||
            ('\x3d\x3d' === c && a == b) ||
            ('\x3d\x3d\x3d' === c && a === b)
              ? !0
              : !1)
          : !0;
      }
      function e(a, c) {
        var b = [],
          d;
        if (p(a) && !p(c))
          b = a.map(function (a) {
            return t(a, c);
          });
        else if (p(c) && !p(a))
          b = c.map(function (c) {
            return t(a, c);
          });
        else if (p(a) || p(c)) for (d = Math.max(a.length, c.length); d--; ) b[d] = t(a[d], c[d]);
        else b = t(a, c);
        return b;
      }
      var f = this,
        d = f.chart,
        q = f.options,
        m = q.dataLabels,
        C = f.points,
        u,
        c = f.hasRendered || 0,
        k,
        x = v(m.defer, !!q.animation),
        D = d.renderer,
        m = e(
          e(
            d.options.plotOptions && d.options.plotOptions.series && d.options.plotOptions.series.dataLabels,
            d.options.plotOptions && d.options.plotOptions[f.type] && d.options.plotOptions[f.type].dataLabels
          ),
          m
        );
      a.fireEvent(this, 'drawDataLabels');
      if (p(m) || m.enabled || f._hasPointLabels)
        (k = f.plotGroup('dataLabelsGroup', 'data-labels', x && !c ? 'hidden' : 'visible', m.zIndex || 6)),
          x &&
            (k.attr({ opacity: +c }),
            c ||
              B(f, 'afterAnimate', function () {
                f.visible && k.show(!0);
                k[q.animation ? 'animate' : 'attr']({ opacity: 1 }, { duration: 200 });
              })),
          C.forEach(function (c) {
            u = r(e(m, c.dlOptions || (c.options && c.options.dataLabels)));
            u.forEach(function (h, e) {
              var l = h.enabled && !c.isNull && b(c, h),
                n,
                p,
                x,
                w,
                m = c.dataLabels ? c.dataLabels[e] : c.dataLabel,
                r = c.connectors ? c.connectors[e] : c.connector,
                E = !m;
              l &&
                ((n = c.getLabelConfig()),
                (p = h[c.formatPrefix + 'Format'] || h.format),
                (n = G(p) ? g(p, n, d.time) : (h[c.formatPrefix + 'Formatter'] || h.formatter).call(n, h)),
                (p = h.style),
                (x = h.rotation),
                d.styledMode ||
                  ((p.color = v(h.color, p.color, f.color, '#000000')),
                  'contrast' === p.color &&
                    ((c.contrastColor = D.getContrast(c.color || f.color)),
                    (p.color =
                      h.inside || 0 > v(h.distance, c.labelDistance) || q.stacking ? c.contrastColor : '#000000')),
                  q.cursor && (p.cursor = q.cursor)),
                (w = { r: h.borderRadius || 0, rotation: x, padding: h.padding, zIndex: 1 }),
                d.styledMode ||
                  ((w.fill = h.backgroundColor), (w.stroke = h.borderColor), (w['stroke-width'] = h.borderWidth)),
                a.objectEach(w, function (a, c) {
                  void 0 === a && delete w[c];
                }));
              !m || (l && G(n))
                ? l &&
                  G(n) &&
                  (m
                    ? (w.text = n)
                    : ((c.dataLabels = c.dataLabels || []),
                      (m = c.dataLabels[e] = x
                        ? D.text(n, 0, -9999).addClass('highcharts-data-label')
                        : D.label(n, 0, -9999, h.shape, null, null, h.useHTML, null, 'data-label')),
                      e || (c.dataLabel = m),
                      m.addClass(
                        ' highcharts-data-label-color-' +
                          c.colorIndex +
                          ' ' +
                          (h.className || '') +
                          (h.useHTML ? ' highcharts-tracker' : '')
                      )),
                  (m.options = h),
                  m.attr(w),
                  d.styledMode || m.css(p).shadow(h.shadow),
                  m.added || m.add(k),
                  f.alignDataLabel(c, m, h, null, E))
                : ((c.dataLabel = c.dataLabel && c.dataLabel.destroy()),
                  c.dataLabels && (1 === c.dataLabels.length ? delete c.dataLabels : delete c.dataLabels[e]),
                  e || delete c.dataLabel,
                  r &&
                    ((c.connector = c.connector.destroy()),
                    c.connectors && (1 === c.connectors.length ? delete c.connectors : delete c.connectors[e])));
            });
          });
      a.fireEvent(this, 'afterDrawDataLabels');
    };
    q.prototype.alignDataLabel = function (a, e, f, d, g) {
      var b = this.chart,
        l = this.isCartesian && b.inverted,
        n = v(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
        c = v(a.plotY, -9999),
        k = e.getBBox(),
        p,
        q = f.rotation,
        h = f.align,
        w =
          this.visible &&
          (a.series.forceDL ||
            b.isInsidePlot(n, Math.round(c), l) ||
            (d && b.isInsidePlot(n, l ? d.x + 1 : d.y + d.height - 1, l))),
        r = 'justify' === v(f.overflow, 'justify');
      if (
        w &&
        ((p = b.renderer.fontMetrics(b.styledMode ? void 0 : f.style.fontSize, e).b),
        (d = m({ x: l ? this.yAxis.len - c : n, y: Math.round(l ? this.xAxis.len - n : c), width: 0, height: 0 }, d)),
        m(f, { width: k.width, height: k.height }),
        q
          ? ((r = !1),
            (n = b.renderer.rotCorr(p, q)),
            (n = {
              x: d.x + f.x + d.width / 2 + n.x,
              y: d.y + f.y + { top: 0, middle: 0.5, bottom: 1 }[f.verticalAlign] * d.height,
            }),
            e[g ? 'attr' : 'animate'](n).attr({ align: h }),
            (c = (q + 720) % 360),
            (c = 180 < c && 360 > c),
            'left' === h
              ? (n.y -= c ? k.height : 0)
              : 'center' === h
              ? ((n.x -= k.width / 2), (n.y -= k.height / 2))
              : 'right' === h && ((n.x -= k.width), (n.y -= c ? 0 : k.height)),
            (e.placed = !0),
            (e.alignAttr = n))
          : (e.align(f, null, d), (n = e.alignAttr)),
        r && 0 <= d.height
          ? (a.isLabelJustified = this.justifyDataLabel(e, f, n, k, d, g))
          : v(f.crop, !0) && (w = b.isInsidePlot(n.x, n.y) && b.isInsidePlot(n.x + k.width, n.y + k.height)),
        f.shape && !q)
      )
        e[g ? 'attr' : 'animate']({
          anchorX: l ? b.plotWidth - a.plotY : a.plotX,
          anchorY: l ? b.plotHeight - a.plotX : a.plotY,
        });
      w || (e.attr({ y: -9999 }), (e.placed = !1));
    };
    q.prototype.justifyDataLabel = function (a, e, f, d, g, p) {
      var b = this.chart,
        l = e.align,
        c = e.verticalAlign,
        k,
        n,
        q = a.box ? 0 : a.padding || 0;
      k = f.x + q;
      0 > k && ('right' === l ? (e.align = 'left') : (e.x = -k), (n = !0));
      k = f.x + d.width - q;
      k > b.plotWidth && ('left' === l ? (e.align = 'right') : (e.x = b.plotWidth - k), (n = !0));
      k = f.y + q;
      0 > k && ('bottom' === c ? (e.verticalAlign = 'top') : (e.y = -k), (n = !0));
      k = f.y + d.height - q;
      k > b.plotHeight && ('top' === c ? (e.verticalAlign = 'bottom') : (e.y = b.plotHeight - k), (n = !0));
      n && ((a.placed = !p), a.align(e, null, g));
      return n;
    };
    f.pie &&
      ((f.pie.prototype.dataLabelPositioners = {
        radialDistributionY: function (a) {
          return a.top + a.distributeBox.pos;
        },
        radialDistributionX: function (a, e, f, d) {
          return a.getX(f < e.top + 2 || f > e.bottom - 2 ? d : f, e.half, e);
        },
        justify: function (a, e, f) {
          return f[0] + (a.half ? -1 : 1) * (e + a.labelDistance);
        },
        alignToPlotEdges: function (a, e, f, d) {
          a = a.getBBox().width;
          return e ? a + d : f - a - d;
        },
        alignToConnectors: function (a, e, f, d) {
          var b = 0,
            g;
          a.forEach(function (a) {
            g = a.dataLabel.getBBox().width;
            g > b && (b = g);
          });
          return e ? b + d : f - b - d;
        },
      }),
      (f.pie.prototype.drawDataLabels = function () {
        var b = this,
          e = b.data,
          f,
          d = b.chart,
          g = b.options.dataLabels,
          p = g.connectorPadding,
          m = v(g.connectorWidth, 1),
          r = d.plotWidth,
          c = d.plotHeight,
          k = d.plotLeft,
          x = Math.round(d.chartWidth / 3),
          t,
          h = b.center,
          z = h[2] / 2,
          u = h[1],
          y,
          B,
          I,
          O,
          R = [[], []],
          K,
          S,
          H,
          T,
          P = [0, 0, 0, 0],
          U = b.dataLabelPositioners;
        b.visible &&
          (g.enabled || b._hasPointLabels) &&
          (e.forEach(function (a) {
            a.dataLabel &&
              a.visible &&
              a.dataLabel.shortened &&
              (a.dataLabel.attr({ width: 'auto' }).css({ width: 'auto', textOverflow: 'clip' }),
              (a.dataLabel.shortened = !1));
          }),
          q.prototype.drawDataLabels.apply(b),
          e.forEach(function (a) {
            a.dataLabel &&
              (a.visible
                ? (R[a.half].push(a),
                  (a.dataLabel._pos = null),
                  !G(g.style.width) &&
                    !G(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) &&
                    a.dataLabel.getBBox().width > x &&
                    (a.dataLabel.css({ width: 0.7 * x }), (a.dataLabel.shortened = !0)))
                : ((a.dataLabel = a.dataLabel.destroy()),
                  a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels));
          }),
          R.forEach(function (e, l) {
            var n,
              q,
              x = e.length,
              m = [],
              w;
            if (x)
              for (
                b.sortByAngle(e, l - 0.5),
                  0 < b.maxLabelDistance &&
                    ((n = Math.max(0, u - z - b.maxLabelDistance)),
                    (q = Math.min(u + z + b.maxLabelDistance, d.plotHeight)),
                    e.forEach(function (a) {
                      0 < a.labelDistance &&
                        a.dataLabel &&
                        ((a.top = Math.max(0, u - z - a.labelDistance)),
                        (a.bottom = Math.min(u + z + a.labelDistance, d.plotHeight)),
                        (w = a.dataLabel.getBBox().height || 21),
                        (a.distributeBox = { target: a.labelPosition.natural.y - a.top + w / 2, size: w, rank: a.y }),
                        m.push(a.distributeBox));
                    }),
                    (n = q + w - n),
                    a.distribute(m, n, n / 5)),
                  T = 0;
                T < x;
                T++
              ) {
                f = e[T];
                I = f.labelPosition;
                y = f.dataLabel;
                H = !1 === f.visible ? 'hidden' : 'inherit';
                S = n = I.natural.y;
                m &&
                  G(f.distributeBox) &&
                  (void 0 === f.distributeBox.pos
                    ? (H = 'hidden')
                    : ((O = f.distributeBox.size), (S = U.radialDistributionY(f))));
                delete f.positionIndex;
                if (g.justify) K = U.justify(f, z, h);
                else
                  switch (g.alignTo) {
                    case 'connectors':
                      K = U.alignToConnectors(e, l, r, k);
                      break;
                    case 'plotEdges':
                      K = U.alignToPlotEdges(y, l, r, k);
                      break;
                    default:
                      K = U.radialDistributionX(b, f, S, n);
                  }
                y._attr = { visibility: H, align: I.alignment };
                y._pos = { x: K + g.x + ({ left: p, right: -p }[I.alignment] || 0), y: S + g.y - 10 };
                I.final.x = K;
                I.final.y = S;
                v(g.crop, !0) &&
                  ((B = y.getBBox().width),
                  (n = null),
                  K - B < p && 1 === l
                    ? ((n = Math.round(B - K + p)), (P[3] = Math.max(n, P[3])))
                    : K + B > r - p && 0 === l && ((n = Math.round(K + B - r + p)), (P[1] = Math.max(n, P[1]))),
                  0 > S - O / 2
                    ? (P[0] = Math.max(Math.round(-S + O / 2), P[0]))
                    : S + O / 2 > c && (P[2] = Math.max(Math.round(S + O / 2 - c), P[2])),
                  (y.sideOverflow = n));
              }
          }),
          0 === A(P) || this.verifyDataLabelOverflow(P)) &&
          (this.placeDataLabels(),
          m &&
            this.points.forEach(function (a) {
              var c;
              t = a.connector;
              if ((y = a.dataLabel) && y._pos && a.visible && 0 < a.labelDistance) {
                H = y._attr.visibility;
                if ((c = !t))
                  (a.connector = t = d.renderer
                    .path()
                    .addClass(
                      'highcharts-data-label-connector  highcharts-color-' +
                        a.colorIndex +
                        (a.className ? ' ' + a.className : '')
                    )
                    .add(b.dataLabelsGroup)),
                    d.styledMode || t.attr({ 'stroke-width': m, stroke: g.connectorColor || a.color || '#666666' });
                t[c ? 'attr' : 'animate']({ d: a.getConnectorPath() });
                t.attr('visibility', H);
              } else t && (a.connector = t.destroy());
            }));
      }),
      (f.pie.prototype.placeDataLabels = function () {
        this.points.forEach(function (a) {
          var b = a.dataLabel;
          b &&
            a.visible &&
            ((a = b._pos)
              ? (b.sideOverflow &&
                  ((b._attr.width = b.getBBox().width - b.sideOverflow),
                  b.css({
                    width: b._attr.width + 'px',
                    textOverflow: (this.options.dataLabels.style || {}).textOverflow || 'ellipsis',
                  }),
                  (b.shortened = !0)),
                b.attr(b._attr),
                b[b.moved ? 'animate' : 'attr'](a),
                (b.moved = !0))
              : b && b.attr({ y: -9999 }));
        }, this);
      }),
      (f.pie.prototype.alignDataLabel = u),
      (f.pie.prototype.verifyDataLabelOverflow = function (a) {
        var b = this.center,
          e = this.options,
          d = e.center,
          f = e.minSize || 80,
          g,
          p = null !== e.size;
        p ||
          (null !== d[0]
            ? (g = Math.max(b[2] - Math.max(a[1], a[3]), f))
            : ((g = Math.max(b[2] - a[1] - a[3], f)), (b[0] += (a[3] - a[1]) / 2)),
          null !== d[1]
            ? (g = Math.max(Math.min(g, b[2] - Math.max(a[0], a[2])), f))
            : ((g = Math.max(Math.min(g, b[2] - a[0] - a[2]), f)), (b[1] += (a[0] - a[2]) / 2)),
          g < b[2]
            ? ((b[2] = g),
              (b[3] = Math.min(y(e.innerSize || 0, g), g)),
              this.translate(b),
              this.drawDataLabels && this.drawDataLabels())
            : (p = !0));
        return p;
      }));
    f.column &&
      (f.column.prototype.alignDataLabel = function (a, e, f, d, g) {
        var b = this.chart.inverted,
          l = a.series,
          n = a.dlBox || a.shapeArgs,
          c = v(a.below, a.plotY > v(this.translatedThreshold, l.yAxis.len)),
          k = v(f.inside, !!this.options.stacking);
        n &&
          ((d = t(n)),
          0 > d.y && ((d.height += d.y), (d.y = 0)),
          (n = d.y + d.height - l.yAxis.len),
          0 < n && (d.height -= n),
          b &&
            (d = { x: l.yAxis.len - d.y - d.height, y: l.xAxis.len - d.x - d.width, width: d.height, height: d.width }),
          k || (b ? ((d.x += c ? 0 : d.width), (d.width = 0)) : ((d.y += c ? d.height : 0), (d.height = 0))));
        f.align = v(f.align, !b || k ? 'center' : c ? 'right' : 'left');
        f.verticalAlign = v(f.verticalAlign, b || k ? 'middle' : c ? 'top' : 'bottom');
        q.prototype.alignDataLabel.call(this, a, e, f, d, g);
        a.isLabelJustified && a.contrastColor && e.css({ color: a.contrastColor });
      });
  })(H);
  (function (a) {
    var B = a.Chart,
      A = a.isArray,
      G = a.objectEach,
      m = a.pick,
      g = a.addEvent,
      t = a.fireEvent;
    g(B, 'render', function () {
      var a = [];
      (this.labelCollectors || []).forEach(function (g) {
        a = a.concat(g());
      });
      (this.yAxis || []).forEach(function (g) {
        g.options.stackLabels &&
          !g.options.stackLabels.allowOverlap &&
          G(g.stacks, function (g) {
            G(g, function (g) {
              a.push(g.label);
            });
          });
      });
      (this.series || []).forEach(function (g) {
        var t = g.options.dataLabels;
        g.visible &&
          (!1 !== t.enabled || g._hasPointLabels) &&
          g.points.forEach(function (g) {
            g.visible &&
              (A(g.dataLabels) ? g.dataLabels : g.dataLabel ? [g.dataLabel] : []).forEach(function (f) {
                var e = f.options;
                f.labelrank = m(e.labelrank, g.labelrank, g.shapeArgs && g.shapeArgs.height);
                e.allowOverlap || a.push(f);
              });
          });
      });
      this.hideOverlappingLabels(a);
    });
    B.prototype.hideOverlappingLabels = function (a) {
      var g = this,
        m = a.length,
        q = g.renderer,
        f,
        e,
        p,
        r,
        b,
        l,
        n = function (a, b, e, f, g, c, k, l) {
          return !(g > a + e || g + k < a || c > b + f || c + l < b);
        };
      p = function (a) {
        var b,
          d,
          e,
          f = a.box ? 0 : a.padding || 0;
        e = 0;
        if (a && (!a.alignAttr || a.placed))
          return (
            (b = a.alignAttr || { x: a.attr('x'), y: a.attr('y') }),
            (d = a.parentGroup),
            a.width ||
              ((e = a.getBBox()), (a.width = e.width), (a.height = e.height), (e = q.fontMetrics(null, a.element).h)),
            {
              x: b.x + (d.translateX || 0) + f,
              y: b.y + (d.translateY || 0) + f - e,
              width: a.width - 2 * f,
              height: a.height - 2 * f,
            }
          );
      };
      for (e = 0; e < m; e++) if ((f = a[e])) (f.oldOpacity = f.opacity), (f.newOpacity = 1), (f.absoluteBox = p(f));
      a.sort(function (a, b) {
        return (b.labelrank || 0) - (a.labelrank || 0);
      });
      for (e = 0; e < m; e++)
        for (l = (p = a[e]) && p.absoluteBox, f = e + 1; f < m; ++f)
          if (
            ((b = (r = a[f]) && r.absoluteBox),
            l &&
              b &&
              p !== r &&
              0 !== p.newOpacity &&
              0 !== r.newOpacity &&
              (b = n(l.x, l.y, l.width, l.height, b.x, b.y, b.width, b.height)))
          )
            (p.labelrank < r.labelrank ? p : r).newOpacity = 0;
      a.forEach(function (a) {
        var b, d;
        a &&
          ((d = a.newOpacity),
          a.oldOpacity !== d &&
            (a.alignAttr && a.placed
              ? (d
                  ? a.show(!0)
                  : (b = function () {
                      a.hide();
                    }),
                (a.alignAttr.opacity = d),
                a[a.isOld ? 'animate' : 'attr'](a.alignAttr, null, b),
                t(g, 'afterHideOverlappingLabels'))
              : a.attr({ opacity: d })),
          (a.isOld = !0));
      });
    };
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.Chart,
      G = a.createElement,
      m = a.css,
      g = a.defaultOptions,
      t = a.defaultPlotOptions,
      u = a.extend,
      v = a.fireEvent,
      y = a.hasTouch,
      q = a.isObject,
      f = a.Legend,
      e = a.merge,
      p = a.pick,
      r = a.Point,
      b = a.Series,
      l = a.seriesTypes,
      n = a.svg,
      d;
    d = a.TrackerMixin = {
      drawTrackerPoint: function () {
        var a = this,
          b = a.chart,
          d = b.pointer,
          e = function (a) {
            var c = d.getPointFromEvent(a);
            void 0 !== c && ((d.isDirectTouch = !0), c.onMouseOver(a));
          };
        a.points.forEach(function (a) {
          a.graphic && (a.graphic.element.point = a);
          a.dataLabel && (a.dataLabel.div ? (a.dataLabel.div.point = a) : (a.dataLabel.element.point = a));
        });
        a._hasTracking ||
          (a.trackerGroups.forEach(function (c) {
            if (a[c]) {
              a[c]
                .addClass('highcharts-tracker')
                .on('mouseover', e)
                .on('mouseout', function (a) {
                  d.onTrackerMouseOut(a);
                });
              if (y) a[c].on('touchstart', e);
              !b.styledMode && a.options.cursor && a[c].css(m).css({ cursor: a.options.cursor });
            }
          }),
          (a._hasTracking = !0));
        v(this, 'afterDrawTracker');
      },
      drawTrackerGraph: function () {
        var a = this,
          b = a.options,
          d = b.trackByArea,
          e = [].concat(d ? a.areaPath : a.graphPath),
          c = e.length,
          k = a.chart,
          f = k.pointer,
          g = k.renderer,
          h = k.options.tooltip.snap,
          l = a.tracker,
          p,
          q = function () {
            if (k.hoverSeries !== a) a.onMouseOver();
          },
          m = 'rgba(192,192,192,' + (n ? 0.0001 : 0.002) + ')';
        if (c && !d)
          for (p = c + 1; p--; )
            'M' === e[p] && e.splice(p + 1, 0, e[p + 1] - h, e[p + 2], 'L'),
              ((p && 'M' === e[p]) || p === c) && e.splice(p, 0, 'L', e[p - 2] + h, e[p - 1]);
        l
          ? l.attr({ d: e })
          : a.graph &&
            ((a.tracker = g
              .path(e)
              .attr({ visibility: a.visible ? 'visible' : 'hidden', zIndex: 2 })
              .addClass(d ? 'highcharts-tracker-area' : 'highcharts-tracker-line')
              .add(a.group)),
            k.styledMode ||
              a.tracker.attr({
                'stroke-linejoin': 'round',
                stroke: m,
                fill: d ? m : 'none',
                'stroke-width': a.graph.strokeWidth() + (d ? 0 : 2 * h),
              }),
            [a.tracker, a.markerGroup].forEach(function (a) {
              a.addClass('highcharts-tracker')
                .on('mouseover', q)
                .on('mouseout', function (a) {
                  f.onTrackerMouseOut(a);
                });
              b.cursor && !k.styledMode && a.css({ cursor: b.cursor });
              if (y) a.on('touchstart', q);
            }));
        v(this, 'afterDrawTracker');
      },
    };
    l.column && (l.column.prototype.drawTracker = d.drawTrackerPoint);
    l.pie && (l.pie.prototype.drawTracker = d.drawTrackerPoint);
    l.scatter && (l.scatter.prototype.drawTracker = d.drawTrackerPoint);
    u(f.prototype, {
      setItemEvents: function (a, b, d) {
        var f = this,
          c = f.chart.renderer.boxWrapper,
          k = 'highcharts-legend-' + (a instanceof r ? 'point' : 'series') + '-active',
          g = f.chart.styledMode;
        (d ? b : a.legendGroup)
          .on('mouseover', function () {
            a.setState('hover');
            c.addClass(k);
            g || b.css(f.options.itemHoverStyle);
          })
          .on('mouseout', function () {
            f.styledMode || b.css(e(a.visible ? f.itemStyle : f.itemHiddenStyle));
            c.removeClass(k);
            a.setState();
          })
          .on('click', function (b) {
            var d = function () {
              a.setVisible && a.setVisible();
            };
            c.removeClass(k);
            b = { browserEvent: b };
            a.firePointEvent ? a.firePointEvent('legendItemClick', b, d) : v(a, 'legendItemClick', b, d);
          });
      },
      createCheckboxForItem: function (a) {
        a.checkbox = G(
          'input',
          {
            type: 'checkbox',
            className: 'highcharts-legend-checkbox',
            checked: a.selected,
            defaultChecked: a.selected,
          },
          this.options.itemCheckboxStyle,
          this.chart.container
        );
        B(a.checkbox, 'click', function (b) {
          v(a.series || a, 'checkboxClick', { checked: b.target.checked, item: a }, function () {
            a.select();
          });
        });
      },
    });
    u(A.prototype, {
      showResetZoom: function () {
        function a() {
          b.zoomOut();
        }
        var b = this,
          d = g.lang,
          e = b.options.chart.resetZoomButton,
          c = e.theme,
          k = c.states,
          f = 'chart' === e.relativeTo ? null : 'plotBox';
        v(this, 'beforeShowResetZoom', null, function () {
          b.resetZoomButton = b.renderer
            .button(d.resetZoom, null, null, a, c, k && k.hover)
            .attr({ align: e.position.align, title: d.resetZoomTitle })
            .addClass('highcharts-reset-zoom')
            .add()
            .align(e.position, !1, f);
        });
      },
      zoomOut: function () {
        v(this, 'selection', { resetSelection: !0 }, this.zoom);
      },
      zoom: function (a) {
        var b,
          d = this.pointer,
          e = !1,
          c;
        !a || a.resetSelection
          ? (this.axes.forEach(function (a) {
              b = a.zoom();
            }),
            (d.initiated = !1))
          : a.xAxis.concat(a.yAxis).forEach(function (a) {
              var c = a.axis;
              d[c.isXAxis ? 'zoomX' : 'zoomY'] && ((b = c.zoom(a.min, a.max)), c.displayBtn && (e = !0));
            });
        c = this.resetZoomButton;
        e && !c ? this.showResetZoom() : !e && q(c) && (this.resetZoomButton = c.destroy());
        b && this.redraw(p(this.options.chart.animation, a && a.animation, 100 > this.pointCount));
      },
      pan: function (a, b) {
        var d = this,
          e = d.hoverPoints,
          c;
        v(this, 'pan', { originalEvent: a }, function () {
          e &&
            e.forEach(function (a) {
              a.setState();
            });
          ('xy' === b ? [1, 0] : [1]).forEach(function (b) {
            b = d[b ? 'xAxis' : 'yAxis'][0];
            var k = b.horiz,
              e = a[k ? 'chartX' : 'chartY'],
              k = k ? 'mouseDownX' : 'mouseDownY',
              h = d[k],
              f = (b.pointRange || 0) / 2,
              g = (b.reversed && !d.inverted) || (!b.reversed && d.inverted) ? -1 : 1,
              l = b.getExtremes(),
              n = b.toValue(h - e, !0) + f * g,
              g = b.toValue(h + b.len - e, !0) - f * g,
              p = g < n,
              h = p ? g : n,
              n = p ? n : g,
              g = Math.min(l.dataMin, f ? l.min : b.toValue(b.toPixels(l.min) - b.minPixelPadding)),
              f = Math.max(l.dataMax, f ? l.max : b.toValue(b.toPixels(l.max) + b.minPixelPadding)),
              p = g - h;
            0 < p && ((n += p), (h = g));
            p = n - f;
            0 < p && ((n = f), (h -= p));
            b.series.length &&
              h !== l.min &&
              n !== l.max &&
              (b.setExtremes(h, n, !1, !1, { trigger: 'pan' }), (c = !0));
            d[k] = e;
          });
          c && d.redraw(!1);
          m(d.container, { cursor: 'move' });
        });
      },
    });
    u(r.prototype, {
      select: function (a, b) {
        var d = this,
          e = d.series,
          c = e.chart;
        a = p(a, !d.selected);
        d.firePointEvent(a ? 'select' : 'unselect', { accumulate: b }, function () {
          d.selected = d.options.selected = a;
          e.options.data[e.data.indexOf(d)] = d.options;
          d.setState(a && 'select');
          b ||
            c.getSelectedPoints().forEach(function (a) {
              a.selected &&
                a !== d &&
                ((a.selected = a.options.selected = !1),
                (e.options.data[e.data.indexOf(a)] = a.options),
                a.setState(''),
                a.firePointEvent('unselect'));
            });
        });
      },
      onMouseOver: function (a) {
        var b = this.series.chart,
          d = b.pointer;
        a = a ? d.normalize(a) : d.getChartCoordinatesFromPoint(this, b.inverted);
        d.runPointActions(a, this);
      },
      onMouseOut: function () {
        var a = this.series.chart;
        this.firePointEvent('mouseOut');
        (a.hoverPoints || []).forEach(function (a) {
          a.setState();
        });
        a.hoverPoints = a.hoverPoint = null;
      },
      importEvents: function () {
        if (!this.hasImportedEvents) {
          var b = this,
            d = e(b.series.options.point, b.options).events;
          b.events = d;
          a.objectEach(d, function (a, d) {
            B(b, d, a);
          });
          this.hasImportedEvents = !0;
        }
      },
      setState: function (a, b) {
        var d = Math.floor(this.plotX),
          e = this.plotY,
          c = this.series,
          k = c.options.states[a || 'normal'] || {},
          f = t[c.type].marker && c.options.marker,
          g = f && !1 === f.enabled,
          h = (f && f.states && f.states[a || 'normal']) || {},
          l = !1 === h.enabled,
          n = c.stateMarkerGraphic,
          q = this.marker || {},
          m = c.chart,
          r = c.halo,
          w,
          E = f && c.markerAttribs;
        a = a || '';
        if (
          !(
            (a === this.state && !b) ||
            (this.selected && 'select' !== a) ||
            !1 === k.enabled ||
            (a && (l || (g && !1 === h.enabled))) ||
            (a && q.states && q.states[a] && !1 === q.states[a].enabled)
          )
        ) {
          E && (w = c.markerAttribs(this, a));
          if (this.graphic)
            this.state && this.graphic.removeClass('highcharts-point-' + this.state),
              a && this.graphic.addClass('highcharts-point-' + a),
              m.styledMode || this.graphic.animate(c.pointAttribs(this, a), p(m.options.chart.animation, k.animation)),
              w && this.graphic.animate(w, p(m.options.chart.animation, h.animation, f.animation)),
              n && n.hide();
          else {
            if (a && h) {
              f = q.symbol || c.symbol;
              n && n.currentSymbol !== f && (n = n.destroy());
              if (n) n[b ? 'animate' : 'attr']({ x: w.x, y: w.y });
              else
                f &&
                  ((c.stateMarkerGraphic = n = m.renderer.symbol(f, w.x, w.y, w.width, w.height).add(c.markerGroup)),
                  (n.currentSymbol = f));
              !m.styledMode && n && n.attr(c.pointAttribs(this, a));
            }
            n && (n[a && m.isInsidePlot(d, e, m.inverted) ? 'show' : 'hide'](), (n.element.point = this));
          }
          (d = k.halo) && d.size
            ? (r || (c.halo = r = m.renderer.path().add((this.graphic || n).parentGroup)),
              r.show()[b ? 'animate' : 'attr']({ d: this.haloPath(d.size) }),
              r.attr({
                class:
                  'highcharts-halo highcharts-color-' +
                  p(this.colorIndex, c.colorIndex) +
                  (this.className ? ' ' + this.className : ''),
                zIndex: -1,
              }),
              (r.point = this),
              m.styledMode || r.attr(u({ fill: this.color || c.color, 'fill-opacity': d.opacity }, d.attributes)))
            : r && r.point && r.point.haloPath && r.animate({ d: r.point.haloPath(0) }, null, r.hide);
          this.state = a;
          v(this, 'afterSetState');
        }
      },
      haloPath: function (a) {
        return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a);
      },
    });
    u(b.prototype, {
      onMouseOver: function () {
        var a = this.chart,
          b = a.hoverSeries;
        if (b && b !== this) b.onMouseOut();
        this.options.events.mouseOver && v(this, 'mouseOver');
        this.setState('hover');
        a.hoverSeries = this;
      },
      onMouseOut: function () {
        var a = this.options,
          b = this.chart,
          d = b.tooltip,
          e = b.hoverPoint;
        b.hoverSeries = null;
        if (e) e.onMouseOut();
        this && a.events.mouseOut && v(this, 'mouseOut');
        !d || this.stickyTracking || (d.shared && !this.noSharedTooltip) || d.hide();
        this.setState();
      },
      setState: function (a) {
        var b = this,
          d = b.options,
          e = b.graph,
          c = d.states,
          k = d.lineWidth,
          d = 0;
        a = a || '';
        if (
          b.state !== a &&
          ([b.group, b.markerGroup, b.dataLabelsGroup].forEach(function (c) {
            c && (b.state && c.removeClass('highcharts-series-' + b.state), a && c.addClass('highcharts-series-' + a));
          }),
          (b.state = a),
          !(b.chart.styledMode || (c[a] && !1 === c[a].enabled)) &&
            (a && (k = c[a].lineWidth || k + (c[a].lineWidthPlus || 0)), e && !e.dashstyle))
        )
          for (
            k = { 'stroke-width': k },
              e.animate(k, p(c[a || 'normal'] && c[a || 'normal'].animation, b.chart.options.chart.animation));
            b['zone-graph-' + d];

          )
            b['zone-graph-' + d].attr(k), (d += 1);
      },
      setVisible: function (a, b) {
        var d = this,
          e = d.chart,
          c = d.legendItem,
          k,
          f = e.options.chart.ignoreHiddenSeries,
          g = d.visible;
        k = (d.visible = a = d.options.visible = d.userOptions.visible = void 0 === a ? !g : a) ? 'show' : 'hide';
        ['group', 'dataLabelsGroup', 'markerGroup', 'tracker', 'tt'].forEach(function (a) {
          if (d[a]) d[a][k]();
        });
        if (e.hoverSeries === d || (e.hoverPoint && e.hoverPoint.series) === d) d.onMouseOut();
        c && e.legend.colorizeItem(d, a);
        d.isDirty = !0;
        d.options.stacking &&
          e.series.forEach(function (a) {
            a.options.stacking && a.visible && (a.isDirty = !0);
          });
        d.linkedSeries.forEach(function (c) {
          c.setVisible(a, !1);
        });
        f && (e.isDirtyBox = !0);
        v(d, k);
        !1 !== b && e.redraw();
      },
      show: function () {
        this.setVisible(!0);
      },
      hide: function () {
        this.setVisible(!1);
      },
      select: function (a) {
        this.selected = a = this.options.selected = void 0 === a ? !this.selected : a;
        this.checkbox && (this.checkbox.checked = a);
        v(this, a ? 'select' : 'unselect');
      },
      drawTracker: d.drawTrackerGraph,
    });
  })(H);
  (function (a) {
    var B = a.Chart,
      A = a.isArray,
      G = a.isObject,
      m = a.pick,
      g = a.splat;
    B.prototype.setResponsive = function (g, m) {
      var t = this.options.responsive,
        u = [],
        q = this.currentResponsive;
      !m &&
        t &&
        t.rules &&
        t.rules.forEach(function (f) {
          void 0 === f._id && (f._id = a.uniqueKey());
          this.matchResponsiveRule(f, u, g);
        }, this);
      m = a.merge.apply(
        0,
        u.map(function (f) {
          return a.find(t.rules, function (a) {
            return a._id === f;
          }).chartOptions;
        })
      );
      m.isResponsiveOptions = !0;
      u = u.toString() || void 0;
      u !== (q && q.ruleIds) &&
        (q && this.update(q.undoOptions, g),
        u
          ? ((q = this.currentOptions(m)),
            (q.isResponsiveOptions = !0),
            (this.currentResponsive = { ruleIds: u, mergedOptions: m, undoOptions: q }),
            this.update(m, g))
          : (this.currentResponsive = void 0));
    };
    B.prototype.matchResponsiveRule = function (a, g) {
      var t = a.condition;
      (
        t.callback ||
        function () {
          return (
            this.chartWidth <= m(t.maxWidth, Number.MAX_VALUE) &&
            this.chartHeight <= m(t.maxHeight, Number.MAX_VALUE) &&
            this.chartWidth >= m(t.minWidth, 0) &&
            this.chartHeight >= m(t.minHeight, 0)
          );
        }
      ).call(this) && g.push(a._id);
    };
    B.prototype.currentOptions = function (m) {
      function t(m, q, f, e) {
        var p;
        a.objectEach(m, function (a, b) {
          if (!e && -1 < ['series', 'xAxis', 'yAxis'].indexOf(b))
            for (a = g(a), f[b] = [], p = 0; p < a.length; p++)
              q[b][p] && ((f[b][p] = {}), t(a[p], q[b][p], f[b][p], e + 1));
          else G(a) ? ((f[b] = A(a) ? [] : {}), t(a, q[b] || {}, f[b], e + 1)) : (f[b] = q[b] || null);
        });
      }
      var v = {};
      t(m, this.options, v, 0);
      return v;
    };
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.Axis,
      G = a.Chart,
      m = a.css,
      g = a.defined,
      t = a.extend,
      u = a.noop,
      v = a.pick,
      y = a.timeUnits;
    B(a.Series, 'updatedData', function () {
      var a = this.xAxis;
      a && a.options.ordinal && delete a.ordinalIndex;
    });
    A.prototype.getTimeTicks = function (a, f, e, p, m, b, l) {
      var n = 0,
        d,
        q,
        r = {},
        t,
        v,
        c,
        k = [],
        x = -Number.MAX_VALUE,
        D = this.options.tickPixelInterval,
        h = this.chart.time,
        z = [];
      if ((!this.options.ordinal && !this.options.breaks) || !m || 3 > m.length || void 0 === f)
        return h.getTimeTicks.apply(h, arguments);
      v = m.length;
      for (d = 0; d < v; d++) {
        c = d && m[d - 1] > e;
        m[d] < f && (n = d);
        if (d === v - 1 || m[d + 1] - m[d] > 5 * b || c) {
          if (m[d] > x) {
            for (q = h.getTimeTicks(a, m[n], m[d], p); q.length && q[0] <= x; ) q.shift();
            q.length && (x = q[q.length - 1]);
            z.push(k.length);
            k = k.concat(q);
          }
          n = d + 1;
        }
        if (c) break;
      }
      q = q.info;
      if (l && q.unitRange <= y.hour) {
        d = k.length - 1;
        for (n = 1; n < d; n++)
          h.dateFormat('%d', k[n]) !== h.dateFormat('%d', k[n - 1]) && ((r[k[n]] = 'day'), (t = !0));
        t && (r[k[0]] = 'day');
        q.higherRanks = r;
      }
      q.segmentStarts = z;
      k.info = q;
      if (l && g(D)) {
        n = z = k.length;
        t = [];
        for (var u, h = []; n--; ) (d = this.translate(k[n])), u && (h[n] = u - d), (t[n] = u = d);
        h.sort();
        h = h[Math.floor(h.length / 2)];
        h < 0.6 * D && (h = null);
        n = k[z - 1] > e ? z - 1 : z;
        for (u = void 0; n--; )
          (d = t[n]),
            (z = Math.abs(u - d)),
            u && z < 0.8 * D && (null === h || z < 0.8 * h)
              ? (r[k[n]] && !r[k[n + 1]] ? ((z = n + 1), (u = d)) : (z = n), k.splice(z, 1))
              : (u = d);
      }
      return k;
    };
    t(A.prototype, {
      beforeSetTickPositions: function () {
        var a,
          f = [],
          e,
          g = !1,
          m,
          b = this.getExtremes(),
          l = b.min,
          n = b.max,
          d,
          w = this.isXAxis && !!this.options.breaks,
          b = this.options.ordinal,
          t = Number.MAX_VALUE,
          u = this.chart.options.chart.ignoreHiddenSeries,
          y;
        if (b || w) {
          this.series.forEach(function (c, b) {
            e = [];
            if (
              !((u && !1 === c.visible) || (!1 === c.takeOrdinalPosition && !w)) &&
              ((f = f.concat(c.processedXData)),
              (a = f.length),
              f.sort(function (a, b) {
                return a - b;
              }),
              (t = Math.min(t, v(c.closestPointRange, t))),
              a)
            ) {
              for (b = 0; b < a - 1; ) f[b] !== f[b + 1] && e.push(f[b + 1]), b++;
              e[0] !== f[0] && e.unshift(f[0]);
              f = e;
            }
            c.isSeriesBoosting && (y = !0);
          });
          y && (f.length = 0);
          a = f.length;
          if (2 < a) {
            m = f[1] - f[0];
            for (d = a - 1; d-- && !g; ) f[d + 1] - f[d] !== m && (g = !0);
            !this.options.keepOrdinalPadding && (f[0] - l > m || n - f[f.length - 1] > m) && (g = !0);
          } else
            this.options.overscroll &&
              (2 === a
                ? (t = f[1] - f[0])
                : 1 === a
                ? ((t = this.options.overscroll), (f = [f[0], f[0] + t]))
                : (t = this.overscrollPointsRange));
          g
            ? (this.options.overscroll &&
                ((this.overscrollPointsRange = t), (f = f.concat(this.getOverscrollPositions()))),
              (this.ordinalPositions = f),
              (m = this.ordinal2lin(Math.max(l, f[0]), !0)),
              (d = Math.max(this.ordinal2lin(Math.min(n, f[f.length - 1]), !0), 1)),
              (this.ordinalSlope = n = (n - l) / (d - m)),
              (this.ordinalOffset = l - m * n))
            : ((this.overscrollPointsRange = v(this.closestPointRange, this.overscrollPointsRange)),
              (this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0));
        }
        this.isOrdinal = b && g;
        this.groupIntervalFactor = null;
      },
      val2lin: function (a, f) {
        var e = this.ordinalPositions;
        if (e) {
          var g = e.length,
            m,
            b;
          for (m = g; m--; )
            if (e[m] === a) {
              b = m;
              break;
            }
          for (m = g - 1; m--; )
            if (a > e[m] || 0 === m) {
              a = (a - e[m]) / (e[m + 1] - e[m]);
              b = m + a;
              break;
            }
          f = f ? b : this.ordinalSlope * (b || 0) + this.ordinalOffset;
        } else f = a;
        return f;
      },
      lin2val: function (a, f) {
        var e = this.ordinalPositions;
        if (e) {
          var g = this.ordinalSlope,
            m = this.ordinalOffset,
            b = e.length - 1,
            l;
          if (f) 0 > a ? (a = e[0]) : a > b ? (a = e[b]) : ((b = Math.floor(a)), (l = a - b));
          else
            for (; b--; )
              if (((f = g * b + m), a >= f)) {
                g = g * (b + 1) + m;
                l = (a - f) / (g - f);
                break;
              }
          return void 0 !== l && void 0 !== e[b] ? e[b] + (l ? l * (e[b + 1] - e[b]) : 0) : a;
        }
        return a;
      },
      getExtendedPositions: function () {
        var a = this,
          f = a.chart,
          e = a.series[0].currentDataGrouping,
          g = a.ordinalIndex,
          m = e ? e.count + e.unitName : 'raw',
          b = a.options.overscroll,
          l = a.getExtremes(),
          n,
          d;
        g || (g = a.ordinalIndex = {});
        g[m] ||
          ((n = {
            series: [],
            chart: f,
            getExtremes: function () {
              return { min: l.dataMin, max: l.dataMax + b };
            },
            options: { ordinal: !0 },
            val2lin: A.prototype.val2lin,
            ordinal2lin: A.prototype.ordinal2lin,
          }),
          a.series.forEach(function (b) {
            d = { xAxis: n, xData: b.xData.slice(), chart: f, destroyGroupedData: u };
            d.xData = d.xData.concat(a.getOverscrollPositions());
            d.options = {
              dataGrouping: e
                ? { enabled: !0, forced: !0, approximation: 'open', units: [[e.unitName, [e.count]]] }
                : { enabled: !1 },
            };
            b.processData.apply(d);
            n.series.push(d);
          }),
          a.beforeSetTickPositions.apply(n),
          (g[m] = n.ordinalPositions));
        return g[m];
      },
      getOverscrollPositions: function () {
        var g = this.options.overscroll,
          f = this.overscrollPointsRange,
          e = [],
          p = this.dataMax;
        if (a.defined(f)) for (e.push(p); p <= this.dataMax + g; ) (p += f), e.push(p);
        return e;
      },
      getGroupIntervalFactor: function (a, f, e) {
        var g;
        e = e.processedXData;
        var m = e.length,
          b = [];
        g = this.groupIntervalFactor;
        if (!g) {
          for (g = 0; g < m - 1; g++) b[g] = e[g + 1] - e[g];
          b.sort(function (a, b) {
            return a - b;
          });
          b = b[Math.floor(m / 2)];
          a = Math.max(a, e[0]);
          f = Math.min(f, e[m - 1]);
          this.groupIntervalFactor = g = (m * b) / (f - a);
        }
        return g;
      },
      postProcessTickInterval: function (a) {
        var f = this.ordinalSlope;
        return f ? (this.options.breaks ? this.closestPointRange || a : a / (f / this.closestPointRange)) : a;
      },
    });
    A.prototype.ordinal2lin = A.prototype.val2lin;
    B(G, 'pan', function (a) {
      var f = this.xAxis[0],
        e = f.options.overscroll,
        g = a.originalEvent.chartX,
        q = !1;
      if (f.options.ordinal && f.series.length) {
        var b = this.mouseDownX,
          l = f.getExtremes(),
          n = l.dataMax,
          d = l.min,
          w = l.max,
          t = this.hoverPoints,
          v = f.closestPointRange || f.overscrollPointsRange,
          b = (b - g) / (f.translationSlope * (f.ordinalSlope || v)),
          u = { ordinalPositions: f.getExtendedPositions() },
          v = f.lin2val,
          c = f.val2lin,
          k;
        u.ordinalPositions
          ? 1 < Math.abs(b) &&
            (t &&
              t.forEach(function (a) {
                a.setState();
              }),
            0 > b ? ((t = u), (k = f.ordinalPositions ? f : u)) : ((t = f.ordinalPositions ? f : u), (k = u)),
            (u = k.ordinalPositions),
            n > u[u.length - 1] && u.push(n),
            (this.fixedRange = w - d),
            (b = f.toFixedRange(
              null,
              null,
              v.apply(t, [c.apply(t, [d, !0]) + b, !0]),
              v.apply(k, [c.apply(k, [w, !0]) + b, !0])
            )),
            b.min >= Math.min(l.dataMin, d) &&
              b.max <= Math.max(n, w) + e &&
              f.setExtremes(b.min, b.max, !0, !1, { trigger: 'pan' }),
            (this.mouseDownX = g),
            m(this.container, { cursor: 'move' }))
          : (q = !0);
      } else q = !0;
      q ? e && (f.max = f.dataMax + e) : a.preventDefault();
    });
    B(A, 'foundExtremes', function () {
      this.isXAxis &&
        g(this.options.overscroll) &&
        this.max === this.dataMax &&
        (!this.chart.mouseIsDown || this.isInternal) &&
        (!this.eventArgs || (this.eventArgs && 'navigator' !== this.eventArgs.trigger)) &&
        ((this.max += this.options.overscroll),
        !this.isInternal && g(this.userMin) && (this.min += this.options.overscroll));
    });
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.pick,
      G = a.extend,
      m = a.isArray,
      g = a.fireEvent,
      t = a.Axis,
      u = a.Series;
    G(t.prototype, {
      isInBreak: function (a, g) {
        var m = a.repeat || Infinity,
          f = a.from,
          e = a.to - a.from;
        g = g >= f ? (g - f) % m : m - ((f - g) % m);
        return a.inclusive ? g <= e : g < e && 0 !== g;
      },
      isInAnyBreak: function (a, g) {
        var m = this.options.breaks,
          f = m && m.length,
          e,
          p,
          r;
        if (f) {
          for (; f--; ) this.isInBreak(m[f], a) && ((e = !0), p || (p = A(m[f].showPoints, !this.isXAxis)));
          r = e && g ? e && !p : e;
        }
        return r;
      },
    });
    B(t, 'afterInit', function () {
      'function' === typeof this.setBreaks && this.setBreaks(this.options.breaks, !1);
    });
    B(t, 'afterSetTickPositions', function () {
      if (this.isBroken) {
        var a = this.tickPositions,
          g = this.tickPositions.info,
          m = [],
          f;
        for (f = 0; f < a.length; f++) this.isInAnyBreak(a[f]) || m.push(a[f]);
        this.tickPositions = m;
        this.tickPositions.info = g;
      }
    });
    B(t, 'afterSetOptions', function () {
      this.isBroken && (this.options.ordinal = !1);
    });
    t.prototype.setBreaks = function (a, u) {
      function q(a) {
        var b = a,
          f,
          g;
        for (g = 0; g < e.breakArray.length; g++)
          if (((f = e.breakArray[g]), f.to <= a)) b -= f.len;
          else if (f.from >= a) break;
          else if (e.isInBreak(f, a)) {
            b -= a - f.from;
            break;
          }
        return b;
      }
      function f(a) {
        var b, f;
        for (f = 0; f < e.breakArray.length && !((b = e.breakArray[f]), b.from >= a); f++)
          b.to < a ? (a += b.len) : e.isInBreak(b, a) && (a += b.len);
        return a;
      }
      var e = this,
        p = m(a) && !!a.length;
      e.isDirty = e.isBroken !== p;
      e.isBroken = p;
      e.options.breaks = e.userOptions.breaks = a;
      e.forceRedraw = !0;
      p || e.val2lin !== q || (delete e.val2lin, delete e.lin2val);
      p &&
        ((e.userOptions.ordinal = !1),
        (e.val2lin = q),
        (e.lin2val = f),
        (e.setExtremes = function (a, b, e, f, d) {
          if (this.isBroken) {
            for (; this.isInAnyBreak(a); ) a -= this.closestPointRange;
            for (; this.isInAnyBreak(b); ) b -= this.closestPointRange;
          }
          t.prototype.setExtremes.call(this, a, b, e, f, d);
        }),
        (e.setAxisTranslation = function (a) {
          t.prototype.setAxisTranslation.call(this, a);
          this.unitLength = null;
          if (this.isBroken) {
            a = e.options.breaks;
            var b = [],
              f = [],
              n = 0,
              d,
              m,
              p = e.userMin || e.min,
              q = e.userMax || e.max,
              r = A(e.pointRangePadding, 0),
              c,
              k;
            a.forEach(function (a) {
              m = a.repeat || Infinity;
              e.isInBreak(a, p) && (p += (a.to % m) - (p % m));
              e.isInBreak(a, q) && (q -= (q % m) - (a.from % m));
            });
            a.forEach(function (a) {
              c = a.from;
              for (m = a.repeat || Infinity; c - m > p; ) c -= m;
              for (; c < p; ) c += m;
              for (k = c; k < q; k += m)
                b.push({ value: k, move: 'in' }),
                  b.push({ value: k + (a.to - a.from), move: 'out', size: a.breakSize });
            });
            b.sort(function (a, b) {
              return a.value === b.value ? ('in' === a.move ? 0 : 1) - ('in' === b.move ? 0 : 1) : a.value - b.value;
            });
            d = 0;
            c = p;
            b.forEach(function (a) {
              d += 'in' === a.move ? 1 : -1;
              1 === d && 'in' === a.move && (c = a.value);
              0 === d &&
                (f.push({ from: c, to: a.value, len: a.value - c - (a.size || 0) }),
                (n += a.value - c - (a.size || 0)));
            });
            e.breakArray = f;
            e.unitLength = q - p - n + r;
            g(e, 'afterBreaks');
            e.staticScale ? (e.transA = e.staticScale) : e.unitLength && (e.transA *= (q - e.min + r) / e.unitLength);
            r && (e.minPixelPadding = e.transA * e.minPointOffset);
            e.min = p;
            e.max = q;
          }
        }));
      A(u, !0) && this.chart.redraw();
    };
    B(u, 'afterGeneratePoints', function () {
      var a = this.xAxis,
        g = this.yAxis,
        m = this.points,
        f,
        e = m.length,
        p = this.options.connectNulls,
        r;
      if (a && g && (a.options.breaks || g.options.breaks))
        for (; e--; )
          (f = m[e]),
            (r = null === f.y && !1 === p),
            r ||
              (!a.isInAnyBreak(f.x, !0) && !g.isInAnyBreak(f.y, !0)) ||
              (m.splice(e, 1), this.data[e] && this.data[e].destroyElements());
    });
    B(u, 'afterRender', function () {
      this.drawBreaks(this.xAxis, ['x']);
      this.drawBreaks(this.yAxis, A(this.pointArrayMap, ['y']));
    });
    a.Series.prototype.drawBreaks = function (a, m) {
      var q = this,
        f = q.points,
        e,
        p,
        r,
        b;
      a &&
        m.forEach(function (l) {
          e = a.breakArray || [];
          p = a.isXAxis ? a.min : A(q.options.threshold, a.min);
          f.forEach(function (f) {
            b = A(f['stack' + l.toUpperCase()], f[l]);
            e.forEach(function (d) {
              r = !1;
              if ((p < d.from && b > d.to) || (p > d.from && b < d.from)) r = 'pointBreak';
              else if ((p < d.from && b > d.from && b < d.to) || (p > d.from && b > d.to && b < d.from))
                r = 'pointInBreak';
              r && g(a, r, { point: f, brk: d });
            });
          });
        });
    };
    a.Series.prototype.gappedPath = function () {
      var g = this.currentDataGrouping,
        m = g && g.gapSize,
        g = this.options.gapSize,
        q = this.points.slice(),
        f = q.length - 1,
        e = this.yAxis;
      if (g && 0 < f)
        for ('value' !== this.options.gapUnit && (g *= this.closestPointRange), m && m > g && (g = m); f--; )
          q[f + 1].x - q[f].x > g &&
            ((m = (q[f].x + q[f + 1].x) / 2),
            q.splice(f + 1, 0, { isNull: !0, x: m }),
            this.options.stacking &&
              ((m = e.stacks[this.stackKey][m] = new a.StackItem(e, e.options.stackLabels, !1, m, this.stack)),
              (m.total = 0)));
      return this.getGraphPath(q);
    };
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.arrayMax,
      G = a.arrayMin,
      m = a.Axis,
      g = a.defaultPlotOptions,
      t = a.defined,
      u = a.extend,
      v = a.format,
      y = a.isNumber,
      q = a.merge,
      f = a.pick,
      e = a.Point,
      p = a.Series,
      r = a.Tooltip,
      b = (a.approximations = {
        sum: function (a) {
          var b = a.length,
            c;
          if (!b && a.hasNulls) c = null;
          else if (b) for (c = 0; b--; ) c += a[b];
          return c;
        },
        average: function (a) {
          var c = a.length;
          a = b.sum(a);
          y(a) && c && (a /= c);
          return a;
        },
        averages: function () {
          var a = [];
          [].forEach.call(arguments, function (c) {
            a.push(b.average(c));
          });
          return void 0 === a[0] ? void 0 : a;
        },
        open: function (a) {
          return a.length ? a[0] : a.hasNulls ? null : void 0;
        },
        high: function (a) {
          return a.length ? A(a) : a.hasNulls ? null : void 0;
        },
        low: function (a) {
          return a.length ? G(a) : a.hasNulls ? null : void 0;
        },
        close: function (a) {
          return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0;
        },
        ohlc: function (a, c, d, e) {
          a = b.open(a);
          c = b.high(c);
          d = b.low(d);
          e = b.close(e);
          if (y(a) || y(c) || y(d) || y(e)) return [a, c, d, e];
        },
        range: function (a, c) {
          a = b.low(a);
          c = b.high(c);
          if (y(a) || y(c)) return [a, c];
          if (null === a && null === c) return null;
        },
      }),
      l = function (a, c, d, e) {
        var f = this,
          h = f.data,
          k = f.options && f.options.data,
          g = [],
          l = [],
          n = [],
          m = a.length,
          p,
          x,
          r = !!c,
          w = [],
          u = f.pointArrayMap,
          D = u && u.length,
          v = ['x'].concat(u || ['y']),
          E = 0,
          C = 0,
          F,
          A;
        e =
          'function' === typeof e ? e : b[e] ? b[e] : b[(f.getDGApproximation && f.getDGApproximation()) || 'average'];
        D
          ? u.forEach(function () {
              w.push([]);
            })
          : w.push([]);
        F = D || 1;
        for (A = 0; A <= m && !(a[A] >= d[0]); A++);
        for (A; A <= m; A++) {
          for (; (void 0 !== d[E + 1] && a[A] >= d[E + 1]) || A === m; ) {
            p = d[E];
            f.dataGroupInfo = { start: f.cropStart + C, length: w[0].length };
            x = e.apply(f, w);
            f.pointClass &&
              !t(f.dataGroupInfo.options) &&
              ((f.dataGroupInfo.options = q(
                f.pointClass.prototype.optionsToObject.call({ series: f }, f.options.data[f.cropStart + C])
              )),
              v.forEach(function (a) {
                delete f.dataGroupInfo.options[a];
              }));
            void 0 !== x && (g.push(p), l.push(x), n.push(f.dataGroupInfo));
            C = A;
            for (p = 0; p < F; p++) (w[p].length = 0), (w[p].hasNulls = !1);
            E += 1;
            if (A === m) break;
          }
          if (A === m) break;
          if (u) {
            p = f.cropStart + A;
            x = (h && h[p]) || f.pointClass.prototype.applyOptions.apply({ series: f }, [k[p]]);
            var B;
            for (p = 0; p < D; p++) (B = x[u[p]]), y(B) ? w[p].push(B) : null === B && (w[p].hasNulls = !0);
          } else (p = r ? c[A] : null), y(p) ? w[0].push(p) : null === p && (w[0].hasNulls = !0);
        }
        return { groupedXData: g, groupedYData: l, groupMap: n };
      },
      n = { approximations: b, groupData: l },
      d = p.prototype,
      w = d.processData,
      E = d.generatePoints,
      C = {
        groupPixelWidth: 2,
        dateTimeLabelFormats: {
          millisecond: ['%A, %b %e, %H:%M:%S.%L', '%A, %b %e, %H:%M:%S.%L', '-%H:%M:%S.%L'],
          second: ['%A, %b %e, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-%H:%M:%S'],
          minute: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
          hour: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
          day: ['%A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
          week: ['Week from %A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
          month: ['%B %Y', '%B', '-%B %Y'],
          year: ['%Y', '%Y', '-%Y'],
        },
      },
      F = {
        line: {},
        spline: {},
        area: {},
        areaspline: {},
        column: { groupPixelWidth: 10 },
        columnrange: { groupPixelWidth: 10 },
        candlestick: { groupPixelWidth: 10 },
        ohlc: { groupPixelWidth: 5 },
      },
      c = (a.defaultDataGroupingUnits = [
        ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
        ['second', [1, 2, 5, 10, 15, 30]],
        ['minute', [1, 2, 5, 10, 15, 30]],
        ['hour', [1, 2, 3, 4, 6, 8, 12]],
        ['day', [1]],
        ['week', [1]],
        ['month', [1, 3, 6]],
        ['year', null],
      ]);
    d.getDGApproximation = function () {
      return a.seriesTypes.arearange && this instanceof a.seriesTypes.arearange
        ? 'range'
        : a.seriesTypes.ohlc && this instanceof a.seriesTypes.ohlc
        ? 'ohlc'
        : a.seriesTypes.column && this instanceof a.seriesTypes.column
        ? 'sum'
        : 'average';
    };
    d.groupData = l;
    d.processData = function () {
      var a = this.chart,
        b = this.options.dataGrouping,
        e = !1 !== this.allowDG && b && f(b.enabled, a.options.isStock),
        h = this.visible || !a.options.chart.ignoreHiddenSeries,
        g,
        l = this.currentDataGrouping,
        n,
        m = !1;
      this.forceCrop = e;
      this.groupPixelWidth = null;
      this.hasProcessed = !0;
      e && !this.requireSorting && (this.requireSorting = m = !0);
      e = !1 === w.apply(this, arguments) || !e;
      m && (this.requireSorting = !1);
      if (!e) {
        this.destroyGroupedData();
        var p,
          e = b.groupAll ? this.xData : this.processedXData,
          q = b.groupAll ? this.yData : this.processedYData,
          r = a.plotSizeX,
          a = this.xAxis,
          u = a.options.ordinal,
          v = (this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth());
        if (v) {
          this.isDirty = g = !0;
          this.points = null;
          m = a.getExtremes();
          n = m.min;
          var m = m.max,
            u = (u && a.getGroupIntervalFactor(n, m, this)) || 1,
            v = ((v * (m - n)) / r) * u,
            r = a.getTimeTicks(
              a.normalizeTimeTickInterval(v, b.units || c),
              Math.min(n, e[0]),
              Math.max(m, e[e.length - 1]),
              a.options.startOfWeek,
              e,
              this.closestPointRange
            ),
            q = d.groupData.apply(this, [e, q, r, b.approximation]),
            e = q.groupedXData,
            u = q.groupedYData,
            E = 0;
          if (b.smoothed && e.length) {
            p = e.length - 1;
            for (e[p] = Math.min(e[p], m); p-- && 0 < p; ) e[p] += v / 2;
            e[0] = Math.max(e[0], n);
          }
          for (p = 1; p < r.length; p++)
            (r.info.segmentStarts && -1 !== r.info.segmentStarts.indexOf(p)) || (E = Math.max(r[p] - r[p - 1], E));
          n = r.info;
          n.gapSize = E;
          this.closestPointRange = r.info.totalRange;
          this.groupMap = q.groupMap;
          if (t(e[0]) && e[0] < a.dataMin && h) {
            if ((!t(a.options.min) && a.min <= a.dataMin) || a.min === a.dataMin) a.min = e[0];
            a.dataMin = e[0];
          }
          b.groupAll && ((b = this.cropData(e, u, a.min, a.max, 1)), (e = b.xData), (u = b.yData));
          this.processedXData = e;
          this.processedYData = u;
        } else this.groupMap = null;
        this.hasGroupedData = g;
        this.currentDataGrouping = n;
        this.preventGraphAnimation = (l && l.totalRange) !== (n && n.totalRange);
      }
    };
    d.destroyGroupedData = function () {
      var a = this.groupedData;
      (a || []).forEach(function (b, c) {
        b && (a[c] = b.destroy ? b.destroy() : null);
      });
      this.groupedData = null;
    };
    d.generatePoints = function () {
      E.apply(this);
      this.destroyGroupedData();
      this.groupedData = this.hasGroupedData ? this.points : null;
    };
    B(e, 'update', function () {
      if (this.dataGroup) return a.error(24, !1, this.series.chart), !1;
    });
    B(r, 'headerFormatter', function (a) {
      var b = this.chart.time,
        c = a.labelConfig,
        d = c.series,
        e = d.tooltipOptions,
        f = d.options.dataGrouping,
        k = e.xDateFormat,
        g,
        l = d.xAxis,
        n,
        m = e[(a.isFooter ? 'footer' : 'header') + 'Format'];
      l &&
        'datetime' === l.options.type &&
        f &&
        y(c.key) &&
        ((n = d.currentDataGrouping),
        (f = f.dateTimeLabelFormats || C.dateTimeLabelFormats),
        n
          ? ((e = f[n.unitName]), 1 === n.count ? (k = e[0]) : ((k = e[1]), (g = e[2])))
          : !k && f && (k = this.getXDateFormat(c, e, l)),
        (k = b.dateFormat(k, c.key)),
        g && (k += b.dateFormat(g, c.key + n.totalRange - 1)),
        d.chart.styledMode && (m = this.styledModeFormat(m)),
        (a.text = v(m, { point: u(c.point, { key: k }), series: d }, b)),
        a.preventDefault());
    });
    B(p, 'destroy', d.destroyGroupedData);
    B(p, 'afterSetOptions', function (a) {
      a = a.options;
      var b = this.type,
        c = this.chart.options.plotOptions,
        d = g[b].dataGrouping,
        e = this.useCommonDataGrouping && C;
      if (F[b] || e)
        d || (d = q(C, F[b])),
          (a.dataGrouping = q(
            e,
            d,
            c.series && c.series.dataGrouping,
            c[b].dataGrouping,
            this.userOptions.dataGrouping
          ));
    });
    B(m, 'afterSetScale', function () {
      this.series.forEach(function (a) {
        a.hasProcessed = !1;
      });
    });
    m.prototype.getGroupPixelWidth = function () {
      var a = this.series,
        b = a.length,
        c,
        d = 0,
        e = !1,
        g;
      for (c = b; c--; ) (g = a[c].options.dataGrouping) && (d = Math.max(d, f(g.groupPixelWidth, C.groupPixelWidth)));
      for (c = b; c--; )
        (g = a[c].options.dataGrouping) &&
          a[c].hasProcessed &&
          ((b = (a[c].processedXData || a[c].data).length),
          a[c].groupPixelWidth || b > this.chart.plotSizeX / d || (b && g.forced)) &&
          (e = !0);
      return e ? d : 0;
    };
    m.prototype.setDataGrouping = function (a, b) {
      var c;
      b = f(b, !0);
      a || (a = { forced: !1, units: null });
      if (this instanceof m) for (c = this.series.length; c--; ) this.series[c].update({ dataGrouping: a }, !1);
      else
        this.chart.options.series.forEach(function (b) {
          b.dataGrouping = a;
        }, !1);
      this.ordinalSlope = null;
      b && this.chart.redraw();
    };
    return (a.dataGrouping = n);
  })(H);
  (function (a) {
    var B = a.Point,
      A = a.seriesType,
      G = a.seriesTypes;
    A(
      'ohlc',
      'column',
      {
        lineWidth: 1,
        tooltip: {
          pointFormat:
            '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e',
        },
        threshold: null,
        states: { hover: { lineWidth: 3 } },
        stickyTracking: !0,
      },
      {
        directTouch: !1,
        pointArrayMap: ['open', 'high', 'low', 'close'],
        toYData: function (a) {
          return [a.open, a.high, a.low, a.close];
        },
        pointValKey: 'close',
        pointAttrToOptions: { stroke: 'color', 'stroke-width': 'lineWidth' },
        init: function () {
          G.column.prototype.init.apply(this, arguments);
          this.options.stacking = !1;
        },
        pointAttribs: function (a, g) {
          g = G.column.prototype.pointAttribs.call(this, a, g);
          var m = this.options;
          delete g.fill;
          !a.options.color && m.upColor && a.open < a.close && (g.stroke = m.upColor);
          return g;
        },
        translate: function () {
          var a = this,
            g = a.yAxis,
            t = !!a.modifyValue,
            u = ['plotOpen', 'plotHigh', 'plotLow', 'plotClose', 'yBottom'];
          G.column.prototype.translate.apply(a);
          a.points.forEach(function (m) {
            [m.open, m.high, m.low, m.close, m.low].forEach(function (v, q) {
              null !== v && (t && (v = a.modifyValue(v)), (m[u[q]] = g.toPixels(v, !0)));
            });
            m.tooltipPos[1] = m.plotHigh + g.pos - a.chart.plotTop;
          });
        },
        drawPoints: function () {
          var a = this,
            g = a.chart;
          a.points.forEach(function (m) {
            var t,
              v,
              y,
              q,
              f = m.graphic,
              e,
              p = !f;
            void 0 !== m.plotY &&
              (f || (m.graphic = f = g.renderer.path().add(a.group)),
              g.styledMode || f.attr(a.pointAttribs(m, m.selected && 'select')),
              (v = (f.strokeWidth() % 2) / 2),
              (e = Math.round(m.plotX) - v),
              (y = Math.round(m.shapeArgs.width / 2)),
              (q = ['M', e, Math.round(m.yBottom), 'L', e, Math.round(m.plotHigh)]),
              null !== m.open && ((t = Math.round(m.plotOpen) + v), q.push('M', e, t, 'L', e - y, t)),
              null !== m.close && ((t = Math.round(m.plotClose) + v), q.push('M', e, t, 'L', e + y, t)),
              f[p ? 'attr' : 'animate']({ d: q }).addClass(m.getClassName(), !0));
          });
        },
        animate: null,
      },
      {
        getClassName: function () {
          return (
            B.prototype.getClassName.call(this) +
            (this.open < this.close ? ' highcharts-point-up' : ' highcharts-point-down')
          );
        },
      }
    );
  })(H);
  (function (a) {
    var B = a.defaultPlotOptions,
      A = a.merge,
      G = a.seriesType,
      m = a.seriesTypes;
    G(
      'candlestick',
      'ohlc',
      A(B.column, {
        states: { hover: { lineWidth: 2 } },
        tooltip: B.ohlc.tooltip,
        threshold: null,
        lineColor: '#000000',
        lineWidth: 1,
        upColor: '#ffffff',
        stickyTracking: !0,
      }),
      {
        pointAttribs: function (a, t) {
          var g = m.column.prototype.pointAttribs.call(this, a, t),
            v = this.options,
            y = a.open < a.close,
            q = v.lineColor || this.color;
          g['stroke-width'] = v.lineWidth;
          g.fill = a.options.color || (y ? v.upColor || this.color : this.color);
          g.stroke = a.lineColor || (y ? v.upLineColor || q : q);
          t &&
            ((a = v.states[t]),
            (g.fill = a.color || g.fill),
            (g.stroke = a.lineColor || g.stroke),
            (g['stroke-width'] = a.lineWidth || g['stroke-width']));
          return g;
        },
        drawPoints: function () {
          var a = this,
            m = a.chart,
            u = a.yAxis.reversed;
          a.points.forEach(function (g) {
            var t = g.graphic,
              q,
              f,
              e,
              p,
              r,
              b,
              l,
              n = !t;
            void 0 !== g.plotY &&
              (t || (g.graphic = t = m.renderer.path().add(a.group)),
              a.chart.styledMode || t.attr(a.pointAttribs(g, g.selected && 'select')).shadow(a.options.shadow),
              (r = (t.strokeWidth() % 2) / 2),
              (b = Math.round(g.plotX) - r),
              (q = g.plotOpen),
              (f = g.plotClose),
              (e = Math.min(q, f)),
              (q = Math.max(q, f)),
              (l = Math.round(g.shapeArgs.width / 2)),
              (f = u ? q !== g.yBottom : Math.round(e) !== Math.round(g.plotHigh)),
              (p = u ? Math.round(e) !== Math.round(g.plotHigh) : q !== g.yBottom),
              (e = Math.round(e) + r),
              (q = Math.round(q) + r),
              (r = []),
              r.push(
                'M',
                b - l,
                q,
                'L',
                b - l,
                e,
                'L',
                b + l,
                e,
                'L',
                b + l,
                q,
                'Z',
                'M',
                b,
                e,
                'L',
                b,
                f ? Math.round(u ? g.yBottom : g.plotHigh) : e,
                'M',
                b,
                q,
                'L',
                b,
                p ? Math.round(u ? g.plotHigh : g.yBottom) : q
              ),
              t[n ? 'attr' : 'animate']({ d: r }).addClass(g.getClassName(), !0));
          });
        },
      }
    );
  })(H);
  da = (function (a) {
    var B = a.defined,
      A = a.seriesTypes,
      G = a.stableSort;
    return {
      getPlotBox: function () {
        return a.Series.prototype.getPlotBox.call(
          (this.options.onSeries && this.chart.get(this.options.onSeries)) || this
        );
      },
      translate: function () {
        A.column.prototype.translate.apply(this);
        var a = this,
          g = a.options,
          t = a.chart,
          u = a.points,
          v = u.length - 1,
          y,
          q = g.onSeries,
          q = q && t.get(q),
          g = g.onKey || 'y',
          f = q && q.options.step,
          e = q && q.points,
          p = e && e.length,
          r = t.inverted,
          b = a.xAxis,
          l = a.yAxis,
          n = 0,
          d,
          w,
          E,
          C;
        if (q && q.visible && p)
          for (
            n = (q.pointXOffset || 0) + (q.barW || 0) / 2,
              t = q.currentDataGrouping,
              w = e[p - 1].x + (t ? t.totalRange : 0),
              G(u, function (a, b) {
                return a.x - b.x;
              }),
              g = 'plot' + g[0].toUpperCase() + g.substr(1);
            p-- &&
            u[v] &&
            !((d = e[p]),
            (t = u[v]),
            (t.y = d.y),
            d.x <= t.x &&
              void 0 !== d[g] &&
              (t.x <= w &&
                ((t.plotY = d[g]),
                d.x < t.x &&
                  !f &&
                  (E = e[p + 1]) &&
                  void 0 !== E[g] &&
                  ((C = (t.x - d.x) / (E.x - d.x)), (t.plotY += C * (E[g] - d[g])), (t.y += C * (E.y - d.y)))),
              v--,
              p++,
              0 > v));

          );
        u.forEach(function (d, c) {
          var e;
          d.plotX += n;
          if (void 0 === d.plotY || r)
            0 <= d.plotX && d.plotX <= b.len
              ? r
                ? ((d.plotY = b.translate(d.x, 0, 1, 0, 1)), (d.plotX = B(d.y) ? l.translate(d.y, 0, 0, 0, 1) : 0))
                : (d.plotY = (b.opposite ? 0 : a.yAxis.len) + b.offset)
              : (d.shapeArgs = {});
          (y = u[c - 1]) &&
            y.plotX === d.plotX &&
            (void 0 === y.stackIndex && (y.stackIndex = 0), (e = y.stackIndex + 1));
          d.stackIndex = e;
        });
        this.onSeries = q;
      },
    };
  })(H);
  (function (a, B) {
    function A(a) {
      e[a + 'pin'] = function (f, b, g, n, d) {
        var l = d && d.anchorX;
        d = d && d.anchorY;
        'circle' === a && n > g && ((f -= Math.round((n - g) / 2)), (g = n));
        f = e[a](f, b, g, n);
        l &&
          d &&
          (f.push('M', 'circle' === a ? f[1] - f[4] : f[1] + f[4] / 2, b > d ? b : b + n, 'L', l, d),
          (f = f.concat(e.circle(l - 1, d - 1, 2, 2))));
        return f;
      };
    }
    var G = a.addEvent,
      m = a.merge,
      g = a.noop,
      t = a.defined,
      u = a.Renderer,
      v = a.Series,
      y = a.seriesType,
      q = a.TrackerMixin,
      f = a.VMLRenderer,
      e = a.SVGRenderer.prototype.symbols;
    y(
      'flags',
      'column',
      {
        pointRange: 0,
        allowOverlapX: !1,
        shape: 'flag',
        stackDistance: 12,
        textAlign: 'center',
        tooltip: { pointFormat: '{point.text}\x3cbr/\x3e' },
        threshold: null,
        y: -30,
        fillColor: '#ffffff',
        lineWidth: 1,
        states: { hover: { lineColor: '#000000', fillColor: '#ccd6eb' } },
        style: { fontSize: '11px', fontWeight: 'bold' },
      },
      {
        sorted: !1,
        noSharedTooltip: !0,
        allowDG: !1,
        takeOrdinalPosition: !1,
        trackerGroups: ['markerGroup'],
        forceCrop: !0,
        init: v.prototype.init,
        pointAttribs: function (a, e) {
          var b = this.options,
            f = (a && a.color) || this.color,
            g = b.lineColor,
            d = a && a.lineWidth;
          a = (a && a.fillColor) || b.fillColor;
          e && ((a = b.states[e].fillColor), (g = b.states[e].lineColor), (d = b.states[e].lineWidth));
          return { fill: a || f, stroke: g || f, 'stroke-width': d || b.lineWidth || 0 };
        },
        translate: B.translate,
        getPlotBox: B.getPlotBox,
        drawPoints: function () {
          var e = this.points,
            f = this.chart,
            b = f.renderer,
            g,
            n,
            d = f.inverted,
            q = this.options,
            u = q.y,
            v,
            y,
            c,
            k,
            x,
            D,
            h = this.yAxis,
            z = {},
            A = [];
          for (y = e.length; y--; )
            (c = e[y]),
              (D = (d ? c.plotY : c.plotX) > this.xAxis.len),
              (g = c.plotX),
              (k = c.stackIndex),
              (v = c.options.shape || q.shape),
              (n = c.plotY),
              void 0 !== n && (n = c.plotY + u - (void 0 !== k && k * q.stackDistance)),
              (c.anchorX = k ? void 0 : c.plotX),
              (x = k ? void 0 : c.plotY),
              (k = c.graphic),
              void 0 !== n && 0 <= g && !D
                ? (k ||
                    ((k = c.graphic = b.label('', null, null, v, null, null, q.useHTML)),
                    f.styledMode || k.attr(this.pointAttribs(c)).css(m(q.style, c.style)),
                    k
                      .attr({
                        align: 'flag' === v ? 'left' : 'center',
                        width: q.width,
                        height: q.height,
                        'text-align': q.textAlign,
                      })
                      .addClass('highcharts-point')
                      .add(this.markerGroup),
                    c.graphic.div && (c.graphic.div.point = c),
                    f.styledMode || k.shadow(q.shadow),
                    (k.isNew = !0)),
                  0 < g && (g -= k.strokeWidth() % 2),
                  (v = { y: n, anchorY: x }),
                  q.allowOverlapX && ((v.x = g), (v.anchorX = c.anchorX)),
                  k.attr({ text: c.options.title || q.title || 'A' })[k.isNew ? 'attr' : 'animate'](v),
                  q.allowOverlapX ||
                    (z[c.plotX]
                      ? (z[c.plotX].size = Math.max(z[c.plotX].size, k.width))
                      : (z[c.plotX] = { align: 0, size: k.width, target: g, anchorX: g })),
                  (c.tooltipPos = [g, n + h.pos - f.plotTop]))
                : k && (c.graphic = k.destroy());
          q.allowOverlapX ||
            (a.objectEach(z, function (a) {
              a.plotX = a.anchorX;
              A.push(a);
            }),
            a.distribute(A, d ? h.len : this.xAxis.len, 100),
            e.forEach(function (a) {
              var b = a.graphic && z[a.plotX];
              b &&
                (a.graphic[a.graphic.isNew ? 'attr' : 'animate']({ x: b.pos, anchorX: a.anchorX }),
                t(b.pos)
                  ? (a.graphic.isNew = !1)
                  : (a.graphic.attr({ x: -9999, anchorX: -9999 }), (a.graphic.isNew = !0)));
            }));
          q.useHTML &&
            a.wrap(this.markerGroup, 'on', function (b) {
              return a.SVGElement.prototype.on.apply(
                b.apply(this, [].slice.call(arguments, 1)),
                [].slice.call(arguments, 1)
              );
            });
        },
        drawTracker: function () {
          var a = this.points;
          q.drawTrackerPoint.apply(this);
          a.forEach(function (e) {
            var b = e.graphic;
            b &&
              G(b.element, 'mouseover', function () {
                0 < e.stackIndex && !e.raised && ((e._y = b.y), b.attr({ y: e._y - 8 }), (e.raised = !0));
                a.forEach(function (a) {
                  a !== e && a.raised && a.graphic && (a.graphic.attr({ y: a._y }), (a.raised = !1));
                });
              });
          });
        },
        animate: function (a) {
          a ? this.setClip() : (this.animate = null);
        },
        setClip: function () {
          v.prototype.setClip.apply(this, arguments);
          !1 !== this.options.clip && this.sharedClipKey && this.markerGroup.clip(this.chart[this.sharedClipKey]);
        },
        buildKDTree: g,
        invertGroups: g,
      }
    );
    e.flag = function (a, f, b, g, n) {
      var d = (n && n.anchorX) || a;
      n = (n && n.anchorY) || f;
      return e
        .circle(d - 1, n - 1, 2, 2)
        .concat(['M', d, n, 'L', a, f + g, a, f, a + b, f, a + b, f + g, a, f + g, 'Z']);
    };
    A('circle');
    A('square');
    u === f &&
      ['flag', 'circlepin', 'squarepin'].forEach(function (a) {
        f.prototype.symbols[a] = e[a];
      });
  })(H, da);
  (function (a) {
    function B(a, e, f) {
      this.init(a, e, f);
    }
    var A = a.addEvent,
      G = a.Axis,
      m = a.correctFloat,
      g = a.defaultOptions,
      t = a.defined,
      u = a.destroyObjectProperties,
      v = a.fireEvent,
      y = a.hasTouch,
      q = a.merge,
      f = a.pick,
      e = a.removeEvent,
      p,
      r = {
        height: a.isTouchDevice ? 20 : 14,
        barBorderRadius: 0,
        buttonBorderRadius: 0,
        liveRedraw: void 0,
        margin: 10,
        minWidth: 6,
        step: 0.2,
        zIndex: 3,
        barBackgroundColor: '#cccccc',
        barBorderWidth: 1,
        barBorderColor: '#cccccc',
        buttonArrowColor: '#333333',
        buttonBackgroundColor: '#e6e6e6',
        buttonBorderColor: '#cccccc',
        buttonBorderWidth: 1,
        rifleColor: '#333333',
        trackBackgroundColor: '#f2f2f2',
        trackBorderColor: '#f2f2f2',
        trackBorderWidth: 1,
      };
    g.scrollbar = q(!0, r, g.scrollbar);
    a.swapXY = p = function (a, e) {
      var b = a.length,
        d;
      if (e) for (e = 0; e < b; e += 3) (d = a[e + 1]), (a[e + 1] = a[e + 2]), (a[e + 2] = d);
      return a;
    };
    B.prototype = {
      init: function (a, e, g) {
        this.scrollbarButtons = [];
        this.renderer = a;
        this.userOptions = e;
        this.options = q(r, e);
        this.chart = g;
        this.size = f(this.options.size, this.options.height);
        e.enabled && (this.render(), this.initEvents(), this.addEvents());
      },
      render: function () {
        var a = this.renderer,
          e = this.options,
          f = this.size,
          d = this.chart.styledMode,
          g;
        this.group = g = a.g('scrollbar').attr({ zIndex: e.zIndex, translateY: -99999 }).add();
        this.track = a
          .rect()
          .addClass('highcharts-scrollbar-track')
          .attr({ x: 0, r: e.trackBorderRadius || 0, height: f, width: f })
          .add(g);
        d ||
          this.track.attr({
            fill: e.trackBackgroundColor,
            stroke: e.trackBorderColor,
            'stroke-width': e.trackBorderWidth,
          });
        this.trackBorderWidth = this.track.strokeWidth();
        this.track.attr({ y: (-this.trackBorderWidth % 2) / 2 });
        this.scrollbarGroup = a.g().add(g);
        this.scrollbar = a
          .rect()
          .addClass('highcharts-scrollbar-thumb')
          .attr({ height: f, width: f, r: e.barBorderRadius || 0 })
          .add(this.scrollbarGroup);
        this.scrollbarRifles = a
          .path(
            p(
              [
                'M',
                -3,
                f / 4,
                'L',
                -3,
                (2 * f) / 3,
                'M',
                0,
                f / 4,
                'L',
                0,
                (2 * f) / 3,
                'M',
                3,
                f / 4,
                'L',
                3,
                (2 * f) / 3,
              ],
              e.vertical
            )
          )
          .addClass('highcharts-scrollbar-rifles')
          .add(this.scrollbarGroup);
        d ||
          (this.scrollbar.attr({
            fill: e.barBackgroundColor,
            stroke: e.barBorderColor,
            'stroke-width': e.barBorderWidth,
          }),
          this.scrollbarRifles.attr({ stroke: e.rifleColor, 'stroke-width': 1 }));
        this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
        this.scrollbarGroup.translate((-this.scrollbarStrokeWidth % 2) / 2, (-this.scrollbarStrokeWidth % 2) / 2);
        this.drawScrollbarButton(0);
        this.drawScrollbarButton(1);
      },
      position: function (a, e, f, d) {
        var b = this.options.vertical,
          g = 0,
          l = this.rendered ? 'animate' : 'attr';
        this.x = a;
        this.y = e + this.trackBorderWidth;
        this.width = f;
        this.xOffset = this.height = d;
        this.yOffset = g;
        b
          ? ((this.width = this.yOffset = f = g = this.size),
            (this.xOffset = e = 0),
            (this.barWidth = d - 2 * f),
            (this.x = a += this.options.margin))
          : ((this.height = this.xOffset = d = e = this.size),
            (this.barWidth = f - 2 * d),
            (this.y += this.options.margin));
        this.group[l]({ translateX: a, translateY: this.y });
        this.track[l]({ width: f, height: d });
        this.scrollbarButtons[1][l]({ translateX: b ? 0 : f - e, translateY: b ? d - g : 0 });
      },
      drawScrollbarButton: function (a) {
        var b = this.renderer,
          e = this.scrollbarButtons,
          d = this.options,
          f = this.size,
          g;
        g = b.g().add(this.group);
        e.push(g);
        g = b.rect().addClass('highcharts-scrollbar-button').add(g);
        this.chart.styledMode ||
          g.attr({ stroke: d.buttonBorderColor, 'stroke-width': d.buttonBorderWidth, fill: d.buttonBackgroundColor });
        g.attr(g.crisp({ x: -0.5, y: -0.5, width: f + 1, height: f + 1, r: d.buttonBorderRadius }, g.strokeWidth()));
        g = b
          .path(
            p(
              [
                'M',
                f / 2 + (a ? -1 : 1),
                f / 2 - 3,
                'L',
                f / 2 + (a ? -1 : 1),
                f / 2 + 3,
                'L',
                f / 2 + (a ? 2 : -2),
                f / 2,
              ],
              d.vertical
            )
          )
          .addClass('highcharts-scrollbar-arrow')
          .add(e[a]);
        this.chart.styledMode || g.attr({ fill: d.buttonArrowColor });
      },
      setRange: function (a, e) {
        var b = this.options,
          d = b.vertical,
          f = b.minWidth,
          g = this.barWidth,
          l,
          p,
          c =
            !this.rendered || this.hasDragged || (this.chart.navigator && this.chart.navigator.hasDragged)
              ? 'attr'
              : 'animate';
        t(g) &&
          ((a = Math.max(a, 0)),
          (l = Math.ceil(g * a)),
          (this.calculatedWidth = p = m(g * Math.min(e, 1) - l)),
          p < f && ((l = (g - f + p) * a), (p = f)),
          (f = Math.floor(l + this.xOffset + this.yOffset)),
          (g = p / 2 - 0.5),
          (this.from = a),
          (this.to = e),
          d
            ? (this.scrollbarGroup[c]({ translateY: f }),
              this.scrollbar[c]({ height: p }),
              this.scrollbarRifles[c]({ translateY: g }),
              (this.scrollbarTop = f),
              (this.scrollbarLeft = 0))
            : (this.scrollbarGroup[c]({ translateX: f }),
              this.scrollbar[c]({ width: p }),
              this.scrollbarRifles[c]({ translateX: g }),
              (this.scrollbarLeft = f),
              (this.scrollbarTop = 0)),
          12 >= p ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0),
          !1 === b.showFull && (0 >= a && 1 <= e ? this.group.hide() : this.group.show()),
          (this.rendered = !0));
      },
      initEvents: function () {
        var a = this;
        a.mouseMoveHandler = function (b) {
          var e = a.chart.pointer.normalize(b),
            d = a.options.vertical ? 'chartY' : 'chartX',
            f = a.initPositions;
          !a.grabbedCenter ||
            (b.touches && 0 === b.touches[0][d]) ||
            ((e = a.cursorToScrollbarPosition(e)[d]),
            (d = a[d]),
            (d = e - d),
            (a.hasDragged = !0),
            a.updatePosition(f[0] + d, f[1] + d),
            a.hasDragged &&
              v(a, 'changed', { from: a.from, to: a.to, trigger: 'scrollbar', DOMType: b.type, DOMEvent: b }));
        };
        a.mouseUpHandler = function (b) {
          a.hasDragged &&
            v(a, 'changed', { from: a.from, to: a.to, trigger: 'scrollbar', DOMType: b.type, DOMEvent: b });
          a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null;
        };
        a.mouseDownHandler = function (b) {
          b = a.chart.pointer.normalize(b);
          b = a.cursorToScrollbarPosition(b);
          a.chartX = b.chartX;
          a.chartY = b.chartY;
          a.initPositions = [a.from, a.to];
          a.grabbedCenter = !0;
        };
        a.buttonToMinClick = function (b) {
          var e = m(a.to - a.from) * a.options.step;
          a.updatePosition(m(a.from - e), m(a.to - e));
          v(a, 'changed', { from: a.from, to: a.to, trigger: 'scrollbar', DOMEvent: b });
        };
        a.buttonToMaxClick = function (b) {
          var e = (a.to - a.from) * a.options.step;
          a.updatePosition(a.from + e, a.to + e);
          v(a, 'changed', { from: a.from, to: a.to, trigger: 'scrollbar', DOMEvent: b });
        };
        a.trackClick = function (b) {
          var e = a.chart.pointer.normalize(b),
            d = a.to - a.from,
            f = a.y + a.scrollbarTop,
            g = a.x + a.scrollbarLeft;
          (a.options.vertical && e.chartY > f) || (!a.options.vertical && e.chartX > g)
            ? a.updatePosition(a.from + d, a.to + d)
            : a.updatePosition(a.from - d, a.to - d);
          v(a, 'changed', { from: a.from, to: a.to, trigger: 'scrollbar', DOMEvent: b });
        };
      },
      cursorToScrollbarPosition: function (a) {
        var b = this.options,
          b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
        return {
          chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - b),
          chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - b),
        };
      },
      updatePosition: function (a, e) {
        1 < e && ((a = m(1 - m(e - a))), (e = 1));
        0 > a && ((e = m(e - a)), (a = 0));
        this.from = a;
        this.to = e;
      },
      update: function (a) {
        this.destroy();
        this.init(this.chart.renderer, q(!0, this.options, a), this.chart);
      },
      addEvents: function () {
        var a = this.options.inverted ? [1, 0] : [0, 1],
          e = this.scrollbarButtons,
          f = this.scrollbarGroup.element,
          d = this.mouseDownHandler,
          g = this.mouseMoveHandler,
          m = this.mouseUpHandler,
          a = [
            [e[a[0]].element, 'click', this.buttonToMinClick],
            [e[a[1]].element, 'click', this.buttonToMaxClick],
            [this.track.element, 'click', this.trackClick],
            [f, 'mousedown', d],
            [f.ownerDocument, 'mousemove', g],
            [f.ownerDocument, 'mouseup', m],
          ];
        y && a.push([f, 'touchstart', d], [f.ownerDocument, 'touchmove', g], [f.ownerDocument, 'touchend', m]);
        a.forEach(function (a) {
          A.apply(null, a);
        });
        this._events = a;
      },
      removeEvents: function () {
        this._events.forEach(function (a) {
          e.apply(null, a);
        });
        this._events.length = 0;
      },
      destroy: function () {
        var a = this.chart.scroller;
        this.removeEvents();
        ['track', 'scrollbarRifles', 'scrollbar', 'scrollbarGroup', 'group'].forEach(function (a) {
          this[a] && this[a].destroy && (this[a] = this[a].destroy());
        }, this);
        a && this === a.scrollbar && ((a.scrollbar = null), u(a.scrollbarButtons));
      },
    };
    A(G, 'afterInit', function () {
      var b = this;
      b.options &&
        b.options.scrollbar &&
        b.options.scrollbar.enabled &&
        ((b.options.scrollbar.vertical = !b.horiz),
        (b.options.startOnTick = b.options.endOnTick = !1),
        (b.scrollbar = new B(b.chart.renderer, b.options.scrollbar, b.chart)),
        A(b.scrollbar, 'changed', function (e) {
          var g = Math.min(f(b.options.min, b.min), b.min, b.dataMin),
            d = Math.max(f(b.options.max, b.max), b.max, b.dataMax) - g,
            l;
          (b.horiz && !b.reversed) || (!b.horiz && b.reversed)
            ? ((l = g + d * this.to), (g += d * this.from))
            : ((l = g + d * (1 - this.from)), (g += d * (1 - this.to)));
          f(this.options.liveRedraw, a.svg && !a.isTouchDevice && !this.chart.isBoosting) ||
          'mouseup' === e.DOMType ||
          !t(e.DOMType)
            ? b.setExtremes(g, l, !0, 'mousemove' !== e.DOMType, e)
            : this.setRange(this.from, this.to);
        }));
    });
    A(G, 'afterRender', function () {
      var a = Math.min(f(this.options.min, this.min), this.min, f(this.dataMin, this.min)),
        e = Math.max(f(this.options.max, this.max), this.max, f(this.dataMax, this.max)),
        g = this.scrollbar,
        d = this.titleOffset || 0;
      if (g) {
        this.horiz
          ? (g.position(
              this.left,
              this.top +
                this.height +
                2 +
                this.chart.scrollbarsOffsets[1] +
                (this.opposite ? 0 : d + this.axisTitleMargin + this.offset),
              this.width,
              this.height
            ),
            (d = 1))
          : (g.position(
              this.left +
                this.width +
                2 +
                this.chart.scrollbarsOffsets[0] +
                (this.opposite ? d + this.axisTitleMargin + this.offset : 0),
              this.top,
              this.width,
              this.height
            ),
            (d = 0));
        if ((!this.opposite && !this.horiz) || (this.opposite && this.horiz))
          this.chart.scrollbarsOffsets[d] += this.scrollbar.size + this.scrollbar.options.margin;
        isNaN(a) || isNaN(e) || !t(this.min) || !t(this.max)
          ? g.setRange(0, 0)
          : ((d = (this.min - a) / (e - a)),
            (a = (this.max - a) / (e - a)),
            (this.horiz && !this.reversed) || (!this.horiz && this.reversed)
              ? g.setRange(d, a)
              : g.setRange(1 - a, 1 - d));
      }
    });
    A(G, 'afterGetOffset', function () {
      var a = this.horiz ? 2 : 1,
        e = this.scrollbar;
      e && ((this.chart.scrollbarsOffsets = [0, 0]), (this.chart.axisOffset[a] += e.size + e.options.margin));
    });
    a.Scrollbar = B;
  })(H);
  (function (a) {
    function B(a) {
      this.init(a);
    }
    var A = a.addEvent,
      G = a.Axis,
      m = a.Chart,
      g = a.color,
      t = a.defaultOptions,
      u = a.defined,
      v = a.destroyObjectProperties,
      y = a.erase,
      q = a.extend,
      f = a.hasTouch,
      e = a.isArray,
      p = a.isNumber,
      r = a.isTouchDevice,
      b = a.merge,
      l = a.pick,
      n = a.removeEvent,
      d = a.Scrollbar,
      w = a.Series,
      E = a.seriesTypes,
      C = [].concat(a.defaultDataGroupingUnits),
      F = function (a) {
        var c = [].filter.call(arguments, p);
        if (c.length) return Math[a].apply(0, c);
      };
    C[4] = ['day', [1, 2, 3, 4]];
    C[5] = ['week', [1, 2, 3]];
    E = void 0 === E.areaspline ? 'line' : 'areaspline';
    q(t, {
      navigator: {
        height: 40,
        margin: 25,
        maskInside: !0,
        handles: {
          width: 7,
          height: 15,
          symbols: ['navigator-handle', 'navigator-handle'],
          enabled: !0,
          lineWidth: 1,
          backgroundColor: '#f2f2f2',
          borderColor: '#999999',
        },
        maskFill: g('#6685c2').setOpacity(0.3).get(),
        outlineColor: '#cccccc',
        outlineWidth: 1,
        series: {
          type: E,
          fillOpacity: 0.05,
          lineWidth: 1,
          compare: null,
          dataGrouping: { approximation: 'average', enabled: !0, groupPixelWidth: 2, smoothed: !0, units: C },
          dataLabels: { enabled: !1, zIndex: 2 },
          id: 'highcharts-navigator-series',
          className: 'highcharts-navigator-series',
          lineColor: null,
          marker: { enabled: !1 },
          pointRange: 0,
          threshold: null,
        },
        xAxis: {
          overscroll: 0,
          className: 'highcharts-navigator-xaxis',
          tickLength: 0,
          lineWidth: 0,
          gridLineColor: '#e6e6e6',
          gridLineWidth: 1,
          tickPixelInterval: 200,
          labels: { align: 'left', style: { color: '#999999' }, x: 3, y: -4 },
          crosshair: !1,
        },
        yAxis: {
          className: 'highcharts-navigator-yaxis',
          gridLineWidth: 0,
          startOnTick: !1,
          endOnTick: !1,
          minPadding: 0.1,
          maxPadding: 0.1,
          labels: { enabled: !1 },
          crosshair: !1,
          title: { text: null },
          tickLength: 0,
          tickWidth: 0,
        },
      },
    });
    a.Renderer.prototype.symbols['navigator-handle'] = function (a, b, d, e, f) {
      a = f.width / 2;
      b = Math.round(a / 3) + 0.5;
      f = f.height;
      return [
        'M',
        -a - 1,
        0.5,
        'L',
        a,
        0.5,
        'L',
        a,
        f + 0.5,
        'L',
        -a - 1,
        f + 0.5,
        'L',
        -a - 1,
        0.5,
        'M',
        -b,
        4,
        'L',
        -b,
        f - 3,
        'M',
        b - 1,
        4,
        'L',
        b - 1,
        f - 3,
      ];
    };
    B.prototype = {
      drawHandle: function (a, b, d, e) {
        var c = this.navigatorOptions.handles.height;
        this.handles[b][e](
          d
            ? {
                translateX: Math.round(this.left + this.height / 2),
                translateY: Math.round(this.top + parseInt(a, 10) + 0.5 - c),
              }
            : {
                translateX: Math.round(this.left + parseInt(a, 10)),
                translateY: Math.round(this.top + this.height / 2 - c / 2 - 1),
              }
        );
      },
      drawOutline: function (a, b, d, e) {
        var c = this.navigatorOptions.maskInside,
          f = this.outline.strokeWidth(),
          g = f / 2,
          f = (f % 2) / 2,
          k = this.outlineHeight,
          l = this.scrollbarHeight,
          n = this.size,
          m = this.left - l,
          p = this.top;
        d
          ? ((m -= g),
            (d = p + b + f),
            (b = p + a + f),
            (a = [
              'M',
              m + k,
              p - l - f,
              'L',
              m + k,
              d,
              'L',
              m,
              d,
              'L',
              m,
              b,
              'L',
              m + k,
              b,
              'L',
              m + k,
              p + n + l,
            ].concat(c ? ['M', m + k, d - g, 'L', m + k, b + g] : [])))
          : ((a += m + l - f),
            (b += m + l - f),
            (p += g),
            (a = ['M', m, p, 'L', a, p, 'L', a, p + k, 'L', b, p + k, 'L', b, p, 'L', m + n + 2 * l, p].concat(
              c ? ['M', a - g, p, 'L', b + g, p] : []
            )));
        this.outline[e]({ d: a });
      },
      drawMasks: function (a, b, d, e) {
        var c = this.left,
          f = this.top,
          g = this.height,
          k,
          l,
          n,
          m;
        d
          ? ((n = [c, c, c]), (m = [f, f + a, f + b]), (l = [g, g, g]), (k = [a, b - a, this.size - b]))
          : ((n = [c, c + a, c + b]), (m = [f, f, f]), (l = [a, b - a, this.size - b]), (k = [g, g, g]));
        this.shades.forEach(function (a, c) {
          a[e]({ x: n[c], y: m[c], width: l[c], height: k[c] });
        });
      },
      renderElements: function () {
        var a = this,
          b = a.navigatorOptions,
          d = b.maskInside,
          e = a.chart,
          f = e.renderer,
          g,
          l = { cursor: e.inverted ? 'ns-resize' : 'ew-resize' };
        a.navigatorGroup = g = f.g('navigator').attr({ zIndex: 8, visibility: 'hidden' }).add();
        [!d, d, !d].forEach(function (c, d) {
          a.shades[d] = f
            .rect()
            .addClass('highcharts-navigator-mask' + (1 === d ? '-inside' : '-outside'))
            .add(g);
          e.styledMode || a.shades[d].attr({ fill: c ? b.maskFill : 'rgba(0,0,0,0)' }).css(1 === d && l);
        });
        a.outline = f.path().addClass('highcharts-navigator-outline').add(g);
        e.styledMode || a.outline.attr({ 'stroke-width': b.outlineWidth, stroke: b.outlineColor });
        b.handles.enabled &&
          [0, 1].forEach(function (c) {
            b.handles.inverted = e.inverted;
            a.handles[c] = f.symbol(
              b.handles.symbols[c],
              -b.handles.width / 2 - 1,
              0,
              b.handles.width,
              b.handles.height,
              b.handles
            );
            a.handles[c]
              .attr({ zIndex: 7 - c })
              .addClass('highcharts-navigator-handle highcharts-navigator-handle-' + ['left', 'right'][c])
              .add(g);
            if (!e.styledMode) {
              var d = b.handles;
              a.handles[c].attr({ fill: d.backgroundColor, stroke: d.borderColor, 'stroke-width': d.lineWidth }).css(l);
            }
          });
      },
      update: function (a) {
        (this.series || []).forEach(function (a) {
          a.baseSeries && delete a.baseSeries.navigatorSeries;
        });
        this.destroy();
        b(!0, this.chart.options.navigator, this.options, a);
        this.init(this.chart);
      },
      render: function (c, b, d, e) {
        var f = this.chart,
          g,
          k,
          n = this.scrollbarHeight,
          m,
          q = this.xAxis;
        g = q.fake ? f.xAxis[0] : q;
        var r = this.navigatorEnabled,
          x,
          t = this.rendered;
        k = f.inverted;
        var w,
          v = f.xAxis[0].minRange,
          D = f.xAxis[0].options.maxRange;
        if (!this.hasDragged || u(d)) {
          if (!p(c) || !p(b))
            if (t) (d = 0), (e = l(q.width, g.width));
            else return;
          this.left = l(q.left, f.plotLeft + n + (k ? f.plotWidth : 0));
          this.size = x = m = l(q.len, (k ? f.plotHeight : f.plotWidth) - 2 * n);
          f = k ? n : m + 2 * n;
          d = l(d, q.toPixels(c, !0));
          e = l(e, q.toPixels(b, !0));
          (p(d) && Infinity !== Math.abs(d)) || ((d = 0), (e = f));
          c = q.toValue(d, !0);
          b = q.toValue(e, !0);
          w = Math.abs(a.correctFloat(b - c));
          w < v
            ? this.grabbedLeft
              ? (d = q.toPixels(b - v, !0))
              : this.grabbedRight && (e = q.toPixels(c + v, !0))
            : u(D) &&
              w > D &&
              (this.grabbedLeft ? (d = q.toPixels(b - D, !0)) : this.grabbedRight && (e = q.toPixels(c + D, !0)));
          this.zoomedMax = Math.min(Math.max(d, e, 0), x);
          this.zoomedMin = Math.min(
            Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(d, e), 0),
            x
          );
          this.range = this.zoomedMax - this.zoomedMin;
          x = Math.round(this.zoomedMax);
          d = Math.round(this.zoomedMin);
          r &&
            (this.navigatorGroup.attr({ visibility: 'visible' }),
            (t = t && !this.hasDragged ? 'animate' : 'attr'),
            this.drawMasks(d, x, k, t),
            this.drawOutline(d, x, k, t),
            this.navigatorOptions.handles.enabled && (this.drawHandle(d, 0, k, t), this.drawHandle(x, 1, k, t)));
          this.scrollbar &&
            (k
              ? ((k = this.top - n),
                (g = this.left - n + (r || !g.opposite ? 0 : (g.titleOffset || 0) + g.axisTitleMargin)),
                (n = m + 2 * n))
              : ((k = this.top + (r ? this.height : -n)), (g = this.left - n)),
            this.scrollbar.position(g, k, f, n),
            this.scrollbar.setRange(this.zoomedMin / (m || 1), this.zoomedMax / (m || 1)));
          this.rendered = !0;
        }
      },
      addMouseEvents: function () {
        var a = this,
          b = a.chart,
          d = b.container,
          e = [],
          g,
          l;
        a.mouseMoveHandler = g = function (c) {
          a.onMouseMove(c);
        };
        a.mouseUpHandler = l = function (c) {
          a.onMouseUp(c);
        };
        e = a.getPartsEvents('mousedown');
        e.push(A(d, 'mousemove', g), A(d.ownerDocument, 'mouseup', l));
        f &&
          (e.push(A(d, 'touchmove', g), A(d.ownerDocument, 'touchend', l)), e.concat(a.getPartsEvents('touchstart')));
        a.eventsToUnbind = e;
        a.series &&
          a.series[0] &&
          e.push(
            A(a.series[0].xAxis, 'foundExtremes', function () {
              b.navigator.modifyNavigatorAxisExtremes();
            })
          );
      },
      getPartsEvents: function (a) {
        var c = this,
          b = [];
        ['shades', 'handles'].forEach(function (d) {
          c[d].forEach(function (e, f) {
            b.push(
              A(e.element, a, function (a) {
                c[d + 'Mousedown'](a, f);
              })
            );
          });
        });
        return b;
      },
      shadesMousedown: function (a, b) {
        a = this.chart.pointer.normalize(a);
        var c = this.chart,
          d = this.xAxis,
          e = this.zoomedMin,
          f = this.left,
          g = this.size,
          k = this.range,
          l = a.chartX,
          n,
          m;
        c.inverted && ((l = a.chartY), (f = this.top));
        1 === b
          ? ((this.grabbedCenter = l), (this.fixedWidth = k), (this.dragOffset = l - e))
          : ((a = l - f - k / 2),
            0 === b
              ? (a = Math.max(0, a))
              : 2 === b &&
                a + k >= g &&
                ((a = g - k),
                this.reversedExtremes
                  ? ((a -= k), (m = this.getUnionExtremes().dataMin))
                  : (n = this.getUnionExtremes().dataMax)),
            a !== e &&
              ((this.fixedWidth = k),
              (b = d.toFixedRange(a, a + k, m, n)),
              u(b.min) &&
                c.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, {
                  trigger: 'navigator',
                })));
      },
      handlesMousedown: function (a, b) {
        this.chart.pointer.normalize(a);
        a = this.chart;
        var c = a.xAxis[0],
          d = this.reversedExtremes;
        0 === b
          ? ((this.grabbedLeft = !0), (this.otherHandlePos = this.zoomedMax), (this.fixedExtreme = d ? c.min : c.max))
          : ((this.grabbedRight = !0), (this.otherHandlePos = this.zoomedMin), (this.fixedExtreme = d ? c.max : c.min));
        a.fixedRange = null;
      },
      onMouseMove: function (b) {
        var c = this,
          d = c.chart,
          e = c.left,
          f = c.navigatorSize,
          g = c.range,
          n = c.dragOffset,
          m = d.inverted;
        (b.touches && 0 === b.touches[0].pageX) ||
          ((b = d.pointer.normalize(b)),
          (d = b.chartX),
          m && ((e = c.top), (d = b.chartY)),
          c.grabbedLeft
            ? ((c.hasDragged = !0), c.render(0, 0, d - e, c.otherHandlePos))
            : c.grabbedRight
            ? ((c.hasDragged = !0), c.render(0, 0, c.otherHandlePos, d - e))
            : c.grabbedCenter &&
              ((c.hasDragged = !0),
              d < n ? (d = n) : d > f + n - g && (d = f + n - g),
              c.render(0, 0, d - n, d - n + g)),
          c.hasDragged &&
            c.scrollbar &&
            l(c.scrollbar.options.liveRedraw, a.svg && !r && !this.chart.isBoosting) &&
            ((b.DOMType = b.type),
            setTimeout(function () {
              c.onMouseUp(b);
            }, 0)));
      },
      onMouseUp: function (a) {
        var b = this.chart,
          c = this.xAxis,
          d = this.scrollbar,
          e,
          f,
          g = a.DOMEvent || a;
        ((!this.hasDragged || (d && d.hasDragged)) && 'scrollbar' !== a.trigger) ||
          ((d = this.getUnionExtremes()),
          this.zoomedMin === this.otherHandlePos
            ? (e = this.fixedExtreme)
            : this.zoomedMax === this.otherHandlePos && (f = this.fixedExtreme),
          this.zoomedMax === this.size && (f = this.reversedExtremes ? d.dataMin : d.dataMax),
          0 === this.zoomedMin && (e = this.reversedExtremes ? d.dataMax : d.dataMin),
          (c = c.toFixedRange(this.zoomedMin, this.zoomedMax, e, f)),
          u(c.min) &&
            b.xAxis[0].setExtremes(Math.min(c.min, c.max), Math.max(c.min, c.max), !0, this.hasDragged ? !1 : null, {
              trigger: 'navigator',
              triggerOp: 'navigator-drag',
              DOMEvent: g,
            }));
        'mousemove' !== a.DOMType &&
          (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null);
      },
      removeEvents: function () {
        this.eventsToUnbind &&
          (this.eventsToUnbind.forEach(function (a) {
            a();
          }),
          (this.eventsToUnbind = void 0));
        this.removeBaseSeriesEvents();
      },
      removeBaseSeriesEvents: function () {
        var a = this.baseSeries || [];
        this.navigatorEnabled &&
          a[0] &&
          (!1 !== this.navigatorOptions.adaptToUpdatedData &&
            a.forEach(function (a) {
              n(a, 'updatedData', this.updatedDataHandler);
            }, this),
          a[0].xAxis && n(a[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes));
      },
      init: function (a) {
        var c = a.options,
          e = c.navigator,
          f = e.enabled,
          g = c.scrollbar,
          n = g.enabled,
          c = f ? e.height : 0,
          m = n ? g.height : 0;
        this.handles = [];
        this.shades = [];
        this.chart = a;
        this.setBaseSeries();
        this.height = c;
        this.scrollbarHeight = m;
        this.scrollbarEnabled = n;
        this.navigatorEnabled = f;
        this.navigatorOptions = e;
        this.scrollbarOptions = g;
        this.outlineHeight = c + m;
        this.opposite = l(e.opposite, !f && a.inverted);
        var p = this,
          f = p.baseSeries,
          g = a.xAxis.length,
          n = a.yAxis.length,
          q = (f && f[0] && f[0].xAxis) || a.xAxis[0] || { options: {} };
        a.isDirtyBox = !0;
        p.navigatorEnabled
          ? ((p.xAxis = new G(
              a,
              b(
                { breaks: q.options.breaks, ordinal: q.options.ordinal },
                e.xAxis,
                {
                  id: 'navigator-x-axis',
                  yAxis: 'navigator-y-axis',
                  isX: !0,
                  type: 'datetime',
                  index: g,
                  isInternal: !0,
                  offset: 0,
                  keepOrdinalPadding: !0,
                  startOnTick: !1,
                  endOnTick: !1,
                  minPadding: 0,
                  maxPadding: 0,
                  zoomEnabled: !1,
                },
                a.inverted ? { offsets: [m, 0, -m, 0], width: c } : { offsets: [0, -m, 0, m], height: c }
              )
            )),
            (p.yAxis = new G(
              a,
              b(
                e.yAxis,
                { id: 'navigator-y-axis', alignTicks: !1, offset: 0, index: n, isInternal: !0, zoomEnabled: !1 },
                a.inverted ? { width: c } : { height: c }
              )
            )),
            f || e.series.data
              ? p.updateNavigatorSeries(!1)
              : 0 === a.series.length &&
                (p.unbindRedraw = A(a, 'beforeRedraw', function () {
                  0 < a.series.length && !p.series && (p.setBaseSeries(), p.unbindRedraw());
                })),
            (p.reversedExtremes = (a.inverted && !p.xAxis.reversed) || (!a.inverted && p.xAxis.reversed)),
            p.renderElements(),
            p.addMouseEvents())
          : (p.xAxis = {
              translate: function (b, c) {
                var d = a.xAxis[0],
                  e = d.getExtremes(),
                  f = d.len - 2 * m,
                  g = F('min', d.options.min, e.dataMin),
                  d = F('max', d.options.max, e.dataMax) - g;
                return c ? (b * d) / f + g : (f * (b - g)) / d;
              },
              toPixels: function (a) {
                return this.translate(a);
              },
              toValue: function (a) {
                return this.translate(a, !0);
              },
              toFixedRange: G.prototype.toFixedRange,
              fake: !0,
            });
        a.options.scrollbar.enabled &&
          ((a.scrollbar = p.scrollbar = new d(
            a.renderer,
            b(a.options.scrollbar, { margin: p.navigatorEnabled ? 0 : 10, vertical: a.inverted }),
            a
          )),
          A(p.scrollbar, 'changed', function (b) {
            var c = p.size,
              d = c * this.to,
              c = c * this.from;
            p.hasDragged = p.scrollbar.hasDragged;
            p.render(0, 0, c, d);
            (a.options.scrollbar.liveRedraw || ('mousemove' !== b.DOMType && 'touchmove' !== b.DOMType)) &&
              setTimeout(function () {
                p.onMouseUp(b);
              });
          }));
        p.addBaseSeriesEvents();
        p.addChartEvents();
      },
      getUnionExtremes: function (a) {
        var b = this.chart.xAxis[0],
          c = this.xAxis,
          d = c.options,
          e = b.options,
          f;
        (a && null === b.dataMin) ||
          (f = {
            dataMin: l(d && d.min, F('min', e.min, b.dataMin, c.dataMin, c.min)),
            dataMax: l(d && d.max, F('max', e.max, b.dataMax, c.dataMax, c.max)),
          });
        return f;
      },
      setBaseSeries: function (b, d) {
        var c = this.chart,
          e = (this.baseSeries = []);
        b =
          b ||
          (c.options && c.options.navigator.baseSeries) ||
          (c.series.length
            ? a.find(c.series, function (a) {
                return !a.options.isInternal;
              }).index
            : 0);
        (c.series || []).forEach(function (a, c) {
          a.options.isInternal ||
            (!a.options.showInNavigator && ((c !== b && a.options.id !== b) || !1 === a.options.showInNavigator)) ||
            e.push(a);
        });
        this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries(!0, d);
      },
      updateNavigatorSeries: function (c, d) {
        var f = this,
          g = f.chart,
          h = f.baseSeries,
          k,
          l,
          m = f.navigatorOptions.series,
          p,
          r = {
            enableMouseTracking: !1,
            index: null,
            linkedTo: null,
            group: 'nav',
            padXAxis: !1,
            xAxis: 'navigator-x-axis',
            yAxis: 'navigator-y-axis',
            showInLegend: !1,
            stacking: !1,
            isInternal: !0,
          },
          w = (f.series = (f.series || []).filter(function (a) {
            var b = a.baseSeries;
            return 0 > h.indexOf(b)
              ? (b && (n(b, 'updatedData', f.updatedDataHandler), delete b.navigatorSeries), a.chart && a.destroy(), !1)
              : !0;
          }));
        h &&
          h.length &&
          h.forEach(function (a) {
            var c = a.navigatorSeries,
              n = q({ color: a.color, visible: a.visible }, e(m) ? t.navigator.series : m);
            (c && !1 === f.navigatorOptions.adaptToUpdatedData) ||
              ((r.name = 'Navigator ' + h.length),
              (k = a.options || {}),
              (p = k.navigatorOptions || {}),
              (l = b(k, r, n, p)),
              (n = p.data || n.data),
              (f.hasNavigatorData = f.hasNavigatorData || !!n),
              (l.data = n || (k.data && k.data.slice(0))),
              c && c.options
                ? c.update(l, d)
                : ((a.navigatorSeries = g.initSeries(l)),
                  (a.navigatorSeries.baseSeries = a),
                  w.push(a.navigatorSeries)));
          });
        if ((m.data && (!h || !h.length)) || e(m))
          (f.hasNavigatorData = !1),
            (m = a.splat(m)),
            m.forEach(function (a, c) {
              r.name = 'Navigator ' + (w.length + 1);
              l = b(
                t.navigator.series,
                {
                  color:
                    (g.series[c] && !g.series[c].options.isInternal && g.series[c].color) ||
                    g.options.colors[c] ||
                    g.options.colors[0],
                },
                r,
                a
              );
              l.data = a.data;
              l.data && ((f.hasNavigatorData = !0), w.push(g.initSeries(l)));
            });
        c && this.addBaseSeriesEvents();
      },
      addBaseSeriesEvents: function () {
        var a = this,
          b = a.baseSeries || [];
        b[0] && b[0].xAxis && A(b[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes);
        b.forEach(function (b) {
          A(b, 'show', function () {
            this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1);
          });
          A(b, 'hide', function () {
            this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1);
          });
          !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && A(b, 'updatedData', this.updatedDataHandler);
          A(b, 'remove', function () {
            this.navigatorSeries &&
              (y(a.series, this.navigatorSeries),
              u(this.navigatorSeries.options) && this.navigatorSeries.remove(!1),
              delete this.navigatorSeries);
          });
        }, this);
      },
      getBaseSeriesMin: function (a) {
        return this.baseSeries.reduce(function (a, b) {
          return Math.min(a, b.xData[0]);
        }, a);
      },
      modifyNavigatorAxisExtremes: function () {
        var a = this.xAxis,
          b;
        a.getExtremes &&
          (!(b = this.getUnionExtremes(!0)) ||
            (b.dataMin === a.min && b.dataMax === a.max) ||
            ((a.min = b.dataMin), (a.max = b.dataMax)));
      },
      modifyBaseAxisExtremes: function () {
        var a = this.chart.navigator,
          b = this.getExtremes(),
          d = b.dataMin,
          e = b.dataMax,
          b = b.max - b.min,
          f = a.stickToMin,
          g = a.stickToMax,
          n = l(this.options.overscroll, 0),
          m,
          q,
          r = a.series && a.series[0],
          t = !!this.setExtremes;
        (this.eventArgs && 'rangeSelectorButton' === this.eventArgs.trigger) ||
          (f && ((q = d), (m = q + b)),
          g &&
            ((m = e + n),
            f || (q = Math.max(m - b, a.getBaseSeriesMin(r && r.xData ? r.xData[0] : -Number.MAX_VALUE)))),
          t && (f || g) && p(q) && ((this.min = this.userMin = q), (this.max = this.userMax = m)));
        a.stickToMin = a.stickToMax = null;
      },
      updatedDataHandler: function () {
        var a = this.chart.navigator,
          b = this.navigatorSeries,
          d = a.getBaseSeriesMin(this.xData[0]);
        a.stickToMax = a.reversedExtremes
          ? 0 === Math.round(a.zoomedMin)
          : Math.round(a.zoomedMax) >= Math.round(a.size);
        a.stickToMin = p(this.xAxis.min) && this.xAxis.min <= d && (!this.chart.fixedRange || !a.stickToMax);
        b &&
          !a.hasNavigatorData &&
          ((b.options.pointStart = this.xData[0]), b.setData(this.options.data, !1, null, !1));
      },
      addChartEvents: function () {
        this.eventsToUnbind || (this.eventsToUnbind = []);
        this.eventsToUnbind.push(
          A(this.chart, 'redraw', function () {
            var a = this.navigator,
              b = a && ((a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis) || (a.scrollbar && this.xAxis[0]));
            b && a.render(b.min, b.max);
          }),
          A(this.chart, 'getMargins', function () {
            var a = this.navigator,
              b = a.opposite ? 'plotTop' : 'marginBottom';
            this.inverted && (b = a.opposite ? 'marginRight' : 'plotLeft');
            this[b] =
              (this[b] || 0) + (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) + a.navigatorOptions.margin;
          })
        );
      },
      destroy: function () {
        this.removeEvents();
        this.xAxis && (y(this.chart.xAxis, this.xAxis), y(this.chart.axes, this.xAxis));
        this.yAxis && (y(this.chart.yAxis, this.yAxis), y(this.chart.axes, this.yAxis));
        (this.series || []).forEach(function (a) {
          a.destroy && a.destroy();
        });
        'series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered'
          .split(' ')
          .forEach(function (a) {
            this[a] && this[a].destroy && this[a].destroy();
            this[a] = null;
          }, this);
        [this.handles].forEach(function (a) {
          v(a);
        }, this);
      },
    };
    a.Navigator = B;
    A(G, 'zoom', function (a) {
      var b = this.chart.options,
        c = b.chart.zoomType,
        d = b.chart.pinchType,
        e = b.navigator,
        b = b.rangeSelector;
      this.isXAxis &&
        ((e && e.enabled) || (b && b.enabled)) &&
        ('y' === c
          ? (a.zoomed = !1)
          : ((!r && 'xy' === c) || (r && 'xy' === d)) &&
            this.options.range &&
            ((c = this.previousZoom),
            u(a.newMin)
              ? (this.previousZoom = [this.min, this.max])
              : c && ((a.newMin = c[0]), (a.newMax = c[1]), delete this.previousZoom)));
      void 0 !== a.zoomed && a.preventDefault();
    });
    A(m, 'beforeShowResetZoom', function () {
      var a = this.options,
        b = a.navigator,
        d = a.rangeSelector;
      if (
        ((b && b.enabled) || (d && d.enabled)) &&
        ((!r && 'x' === a.chart.zoomType) || (r && 'x' === a.chart.pinchType))
      )
        return !1;
    });
    A(m, 'beforeRender', function () {
      var a = this.options;
      if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new B(this);
    });
    A(m, 'afterSetChartSize', function () {
      var a = this.legend,
        b = this.navigator,
        d,
        e,
        f,
        g;
      b &&
        ((e = a && a.options),
        (f = b.xAxis),
        (g = b.yAxis),
        (d = b.scrollbarHeight),
        this.inverted
          ? ((b.left = b.opposite ? this.chartWidth - d - b.height : this.spacing[3] + d), (b.top = this.plotTop + d))
          : ((b.left = this.plotLeft + d),
            (b.top =
              b.navigatorOptions.top ||
              this.chartHeight -
                b.height -
                d -
                this.spacing[2] -
                (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) -
                (e && 'bottom' === e.verticalAlign && e.enabled && !e.floating
                  ? a.legendHeight + l(e.margin, 10)
                  : 0))),
        f &&
          g &&
          (this.inverted ? (f.options.left = g.options.left = b.left) : (f.options.top = g.options.top = b.top),
          f.setAxisSize(),
          g.setAxisSize()));
    });
    A(m, 'update', function (a) {
      var c = a.options.navigator || {},
        d = a.options.scrollbar || {};
      this.navigator ||
        this.scroller ||
        (!c.enabled && !d.enabled) ||
        (b(!0, this.options.navigator, c),
        b(!0, this.options.scrollbar, d),
        delete a.options.navigator,
        delete a.options.scrollbar);
    });
    A(m, 'afterUpdate', function () {
      this.navigator ||
        this.scroller ||
        (!this.options.navigator.enabled && !this.options.scrollbar.enabled) ||
        (this.scroller = this.navigator = new B(this));
    });
    A(m, 'afterAddSeries', function () {
      this.navigator && this.navigator.setBaseSeries(null, !1);
    });
    A(w, 'afterUpdate', function () {
      this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1);
    });
    m.prototype.callbacks.push(function (a) {
      var b = a.navigator;
      b && a.xAxis[0] && ((a = a.xAxis[0].getExtremes()), b.render(a.min, a.max));
    });
  })(H);
  (function (a) {
    function B(a) {
      this.init(a);
    }
    var A = a.addEvent,
      G = a.Axis,
      m = a.Chart,
      g = a.css,
      t = a.createElement,
      u = a.defaultOptions,
      v = a.defined,
      y = a.destroyObjectProperties,
      q = a.discardElement,
      f = a.extend,
      e = a.fireEvent,
      p = a.isNumber,
      r = a.merge,
      b = a.pick,
      l = a.pInt,
      n = a.splat;
    f(u, {
      rangeSelector: {
        verticalAlign: 'top',
        buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 },
        floating: !1,
        x: 0,
        y: 0,
        height: void 0,
        inputPosition: { align: 'right', x: 0, y: 0 },
        buttonPosition: { align: 'left', x: 0, y: 0 },
        labelStyle: { color: '#666666' },
      },
    });
    u.lang = r(u.lang, { rangeSelectorZoom: 'Zoom', rangeSelectorFrom: 'From', rangeSelectorTo: 'To' });
    B.prototype = {
      clickButton: function (a, e) {
        var d = this.chart,
          f = this.buttonOptions[a],
          g = d.xAxis[0],
          c = (d.scroller && d.scroller.getUnionExtremes()) || g || {},
          k = c.dataMin,
          l = c.dataMax,
          m,
          h = g && Math.round(Math.min(g.max, b(l, g.max))),
          q = f.type,
          r,
          c = f._range,
          t,
          w,
          u,
          v = f.dataGrouping;
        if (null !== k && null !== l) {
          d.fixedRange = c;
          v &&
            ((this.forcedDataGrouping = !0),
            G.prototype.setDataGrouping.call(g || { chart: this.chart }, v, !1),
            (this.frozenStates = f.preserveDataGrouping));
          if ('month' === q || 'year' === q)
            g
              ? ((q = { range: f, max: h, chart: d, dataMin: k, dataMax: l }),
                (m = g.minFromRange.call(q)),
                p(q.newMax) && (h = q.newMax))
              : (c = f);
          else if (c) (m = Math.max(h - c, k)), (h = Math.min(m + c, l));
          else if ('ytd' === q)
            if (g)
              void 0 === l &&
                ((k = Number.MAX_VALUE),
                (l = Number.MIN_VALUE),
                d.series.forEach(function (a) {
                  a = a.xData;
                  k = Math.min(a[0], k);
                  l = Math.max(a[a.length - 1], l);
                }),
                (e = !1)),
                (h = this.getYTDExtremes(l, k, d.time.useUTC)),
                (m = t = h.min),
                (h = h.max);
            else {
              this.deferredYTDClick = a;
              return;
            }
          else 'all' === q && g && ((m = k), (h = l));
          m += f._offsetMin;
          h += f._offsetMax;
          this.setSelected(a);
          g
            ? g.setExtremes(m, h, b(e, 1), null, { trigger: 'rangeSelectorButton', rangeSelectorButton: f })
            : ((r = n(d.options.xAxis)[0]),
              (u = r.range),
              (r.range = c),
              (w = r.min),
              (r.min = t),
              A(d, 'load', function () {
                r.range = u;
                r.min = w;
              }));
        }
      },
      setSelected: function (a) {
        this.selected = this.options.selected = a;
      },
      defaultButtons: [
        { type: 'month', count: 1, text: '1m' },
        { type: 'month', count: 3, text: '3m' },
        { type: 'month', count: 6, text: '6m' },
        { type: 'ytd', text: 'YTD' },
        { type: 'year', count: 1, text: '1y' },
        { type: 'all', text: 'All' },
      ],
      init: function (a) {
        var b = this,
          d = a.options.rangeSelector,
          f = d.buttons || [].concat(b.defaultButtons),
          g = d.selected,
          c = function () {
            var a = b.minInput,
              c = b.maxInput;
            a && a.blur && e(a, 'blur');
            c && c.blur && e(c, 'blur');
          };
        b.chart = a;
        b.options = d;
        b.buttons = [];
        a.extraTopMargin = d.height;
        b.buttonOptions = f;
        this.unMouseDown = A(a.container, 'mousedown', c);
        this.unResize = A(a, 'resize', c);
        f.forEach(b.computeButtonRange);
        void 0 !== g && f[g] && this.clickButton(g, !1);
        A(a, 'load', function () {
          a.xAxis &&
            a.xAxis[0] &&
            A(a.xAxis[0], 'setExtremes', function (c) {
              this.max - this.min !== a.fixedRange &&
                'rangeSelectorButton' !== c.trigger &&
                'updatedData' !== c.trigger &&
                b.forcedDataGrouping &&
                !b.frozenStates &&
                this.setDataGrouping(!1, !1);
            });
        });
      },
      updateButtonStates: function () {
        var a = this,
          b = this.chart,
          e = b.xAxis[0],
          f = Math.round(e.max - e.min),
          g = !e.hasVisibleSeries,
          c = (b.scroller && b.scroller.getUnionExtremes()) || e,
          k = c.dataMin,
          l = c.dataMax,
          b = a.getYTDExtremes(l, k, b.time.useUTC),
          m = b.min,
          h = b.max,
          n = a.selected,
          q = p(n),
          r = a.options.allButtonsEnabled,
          t = a.buttons;
        a.buttonOptions.forEach(function (b, c) {
          var d = b._range,
            p = b.type,
            w = b.count || 1,
            x = t[c],
            u = 0,
            v = b._offsetMax - b._offsetMin;
          b = c === n;
          var z = d > l - k,
            y = d < e.minRange,
            E = !1,
            C = !1,
            d = d === f;
          ('month' === p || 'year' === p) &&
          f + 36e5 >= 864e5 * { month: 28, year: 365 }[p] * w - v &&
          f - 36e5 <= 864e5 * { month: 31, year: 366 }[p] * w + v
            ? (d = !0)
            : 'ytd' === p
            ? ((d = h - m + v === f), (E = !b))
            : 'all' === p && ((d = e.max - e.min >= l - k), (C = !b && q && d));
          p = !r && (z || y || C || g);
          w = (b && d) || (d && !q && !E) || (b && a.frozenStates);
          p ? (u = 3) : w && ((q = !0), (u = 2));
          x.state !== u && (x.setState(u), 0 === u && n === c && a.setSelected(null));
        });
      },
      computeButtonRange: function (a) {
        var d = a.type,
          e = a.count || 1,
          f = { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5 };
        if (f[d]) a._range = f[d] * e;
        else if ('month' === d || 'year' === d) a._range = 864e5 * { month: 30, year: 365 }[d] * e;
        a._offsetMin = b(a.offsetMin, 0);
        a._offsetMax = b(a.offsetMax, 0);
        a._range += a._offsetMax - a._offsetMin;
      },
      setInputValue: function (a, b) {
        var d = this.chart.options.rangeSelector,
          e = this.chart.time,
          f = this[a + 'Input'];
        v(b) && ((f.previousValue = f.HCTime), (f.HCTime = b));
        f.value = e.dateFormat(d.inputEditDateFormat || '%Y-%m-%d', f.HCTime);
        this[a + 'DateBox'].attr({ text: e.dateFormat(d.inputDateFormat || '%b %e, %Y', f.HCTime) });
      },
      showInput: function (a) {
        var b = this.inputGroup,
          d = this[a + 'DateBox'];
        g(this[a + 'Input'], {
          left: b.translateX + d.x + 'px',
          top: b.translateY + 'px',
          width: d.width - 2 + 'px',
          height: d.height - 2 + 'px',
          border: '2px solid silver',
        });
      },
      hideInput: function (a) {
        g(this[a + 'Input'], { border: 0, width: '1px', height: '1px' });
        this.setInputValue(a);
      },
      drawInput: function (b) {
        function d() {
          var a = h.value,
            b = (k.inputDateParser || Date.parse)(a),
            c = m.xAxis[0],
            d = m.scroller && m.scroller.xAxis ? m.scroller.xAxis : c,
            f = d.dataMin,
            d = d.dataMax;
          b !== h.previousValue &&
            ((h.previousValue = b),
            p(b) || ((b = a.split('-')), (b = Date.UTC(l(b[0]), l(b[1]) - 1, l(b[2])))),
            p(b) &&
              (m.time.useUTC || (b += 6e4 * new Date().getTimezoneOffset()),
              v
                ? b > e.maxInput.HCTime
                  ? (b = void 0)
                  : b < f && (b = f)
                : b < e.minInput.HCTime
                ? (b = void 0)
                : b > d && (b = d),
              void 0 !== b &&
                c.setExtremes(v ? b : c.min, v ? c.max : b, void 0, void 0, { trigger: 'rangeSelectorInput' })));
        }
        var e = this,
          m = e.chart,
          n = m.renderer.style || {},
          c = m.renderer,
          k = m.options.rangeSelector,
          q = e.div,
          v = 'min' === b,
          h,
          z,
          y = this.inputGroup;
        this[b + 'Label'] = z = c
          .label(u.lang[v ? 'rangeSelectorFrom' : 'rangeSelectorTo'], this.inputGroup.offset)
          .addClass('highcharts-range-label')
          .attr({ padding: 2 })
          .add(y);
        y.offset += z.width + 5;
        this[b + 'DateBox'] = c = c
          .label('', y.offset)
          .addClass('highcharts-range-input')
          .attr({ padding: 2, width: k.inputBoxWidth || 90, height: k.inputBoxHeight || 17, 'text-align': 'center' })
          .on('click', function () {
            e.showInput(b);
            e[b + 'Input'].focus();
          });
        m.styledMode || c.attr({ stroke: k.inputBoxBorderColor || '#cccccc', 'stroke-width': 1 });
        c.add(y);
        y.offset += c.width + (v ? 10 : 0);
        this[b + 'Input'] = h = t(
          'input',
          { name: b, className: 'highcharts-range-selector', type: 'text' },
          { top: m.plotTop + 'px' },
          q
        );
        m.styledMode ||
          (z.css(r(n, k.labelStyle)),
          c.css(r({ color: '#333333' }, n, k.inputStyle)),
          g(
            h,
            f(
              {
                position: 'absolute',
                border: 0,
                width: '1px',
                height: '1px',
                padding: 0,
                textAlign: 'center',
                fontSize: n.fontSize,
                fontFamily: n.fontFamily,
                top: '-9999em',
              },
              k.inputStyle
            )
          ));
        h.onfocus = function () {
          e.showInput(b);
        };
        h.onblur = function () {
          h === a.doc.activeElement && (d(), e.hideInput(b));
        };
        h.onchange = d;
        h.onkeypress = function (a) {
          13 === a.keyCode && d();
        };
      },
      getPosition: function () {
        var a = this.chart,
          b = a.options.rangeSelector,
          a = 'top' === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
        return { buttonTop: a + b.buttonPosition.y, inputTop: a + b.inputPosition.y - 10 };
      },
      getYTDExtremes: function (a, b, e) {
        var d = this.chart.time,
          f = new d.Date(a),
          c = d.get('FullYear', f);
        e = e ? d.Date.UTC(c, 0, 1) : +new d.Date(c, 0, 1);
        b = Math.max(b || 0, e);
        f = f.getTime();
        return { max: Math.min(a || f, f), min: b };
      },
      render: function (a, e) {
        var d = this,
          f = d.chart,
          g = f.renderer,
          c = f.container,
          k = f.options,
          l = k.exporting && !1 !== k.exporting.enabled && k.navigation && k.navigation.buttonOptions,
          m = u.lang,
          h = d.div,
          n = k.rangeSelector,
          p = b(k.chart.style && k.chart.style.zIndex, 0) + 1,
          k = n.floating,
          q = d.buttons,
          h = d.inputGroup,
          r = n.buttonTheme,
          w = n.buttonPosition,
          v = n.inputPosition,
          y = n.inputEnabled,
          A = r && r.states,
          B = f.plotLeft,
          G,
          H = d.buttonGroup,
          P;
        P = d.rendered;
        var U = d.options.verticalAlign,
          ca = f.legend,
          M = ca && ca.options,
          V = w.y,
          N = v.y,
          Q = P || !1,
          X = Q ? 'animate' : 'attr',
          ba = 0,
          Z = 0,
          Y;
        if (!1 !== n.enabled) {
          P ||
            ((d.group = P = g.g('range-selector-group').attr({ zIndex: 7 }).add()),
            (d.buttonGroup = H = g.g('range-selector-buttons').add(P)),
            (d.zoomText = g.text(m.rangeSelectorZoom, 0, 15).add(H)),
            f.styledMode || (d.zoomText.css(n.labelStyle), (r['stroke-width'] = b(r['stroke-width'], 0))),
            d.buttonOptions.forEach(function (a, b) {
              q[b] = g
                .button(
                  a.text,
                  0,
                  0,
                  function () {
                    var c = a.events && a.events.click,
                      e;
                    c && (e = c.call(a));
                    !1 !== e && d.clickButton(b);
                    d.isActive = !0;
                  },
                  r,
                  A && A.hover,
                  A && A.select,
                  A && A.disabled
                )
                .attr({ 'text-align': 'center' })
                .add(H);
            }),
            !1 !== y &&
              ((d.div = h = t('div', null, { position: 'relative', height: 0, zIndex: p })),
              c.parentNode.insertBefore(h, c),
              (d.inputGroup = h = g.g('input-group').add(P)),
              (h.offset = 0),
              d.drawInput('min'),
              d.drawInput('max')));
          d.zoomText[X]({ x: b(B + w.x, B) });
          G = b(B + w.x, B) + d.zoomText.getBBox().width + 5;
          d.buttonOptions.forEach(function (a, c) {
            q[c][X]({ x: G });
            G += q[c].width + b(n.buttonSpacing, 5);
          });
          B = f.plotLeft - f.spacing[3];
          d.updateButtonStates();
          l &&
            this.titleCollision(f) &&
            'top' === U &&
            'right' === w.align &&
            w.y + H.getBBox().height - 12 < (l.y || 0) + l.height &&
            (ba = -40);
          'left' === w.align ? (Y = w.x - f.spacing[3]) : 'right' === w.align && (Y = w.x + ba - f.spacing[1]);
          H.align({ y: w.y, width: H.getBBox().width, align: w.align, x: Y }, !0, f.spacingBox);
          d.group.placed = Q;
          d.buttonGroup.placed = Q;
          !1 !== y &&
            ((ba =
              l &&
              this.titleCollision(f) &&
              'top' === U &&
              'right' === v.align &&
              v.y - h.getBBox().height - 12 < (l.y || 0) + l.height + f.spacing[0]
                ? -40
                : 0),
            'left' === v.align ? (Y = B) : 'right' === v.align && (Y = -Math.max(f.axisOffset[1], -ba)),
            h.align({ y: v.y, width: h.getBBox().width, align: v.align, x: v.x + Y - 2 }, !0, f.spacingBox),
            (c = h.alignAttr.translateX + h.alignOptions.x - ba + h.getBBox().x + 2),
            (l = h.alignOptions.width),
            (m = H.alignAttr.translateX + H.getBBox().x),
            (Y = H.getBBox().width + 20),
            (v.align === w.align || (m + Y > c && c + l > m && V < N + h.getBBox().height)) &&
              h.attr({
                translateX: h.alignAttr.translateX + (f.axisOffset[1] >= -ba ? 0 : -ba),
                translateY: h.alignAttr.translateY + H.getBBox().height + 10,
              }),
            d.setInputValue('min', a),
            d.setInputValue('max', e),
            (d.inputGroup.placed = Q));
          d.group.align({ verticalAlign: U }, !0, f.spacingBox);
          a = d.group.getBBox().height + 20;
          e = d.group.alignAttr.translateY;
          'bottom' === U &&
            ((ca =
              M && 'bottom' === M.verticalAlign && M.enabled && !M.floating ? ca.legendHeight + b(M.margin, 10) : 0),
            (a = a + ca - 20),
            (Z = e - a - (k ? 0 : n.y) - 10));
          if ('top' === U)
            k && (Z = 0),
              f.titleOffset && (Z = f.titleOffset + f.options.title.margin),
              (Z += f.margin[0] - f.spacing[0] || 0);
          else if ('middle' === U)
            if (N === V) Z = 0 > N ? e + void 0 : e;
            else if (N || V) Z = 0 > N || 0 > V ? Z - Math.min(N, V) : e - a + NaN;
          d.group.translate(n.x, n.y + Math.floor(Z));
          !1 !== y &&
            ((d.minInput.style.marginTop = d.group.translateY + 'px'),
            (d.maxInput.style.marginTop = d.group.translateY + 'px'));
          d.rendered = !0;
        }
      },
      getHeight: function () {
        var a = this.options,
          b = this.group,
          e = a.y,
          f = a.buttonPosition.y,
          a = a.inputPosition.y,
          b = b ? b.getBBox(!0).height + 13 + e : 0,
          e = Math.min(a, f);
        if ((0 > a && 0 > f) || (0 < a && 0 < f)) b += Math.abs(e);
        return b;
      },
      titleCollision: function (a) {
        return !(a.options.title.text || a.options.subtitle.text);
      },
      update: function (a) {
        var b = this.chart;
        r(!0, b.options.rangeSelector, a);
        this.destroy();
        this.init(b);
        b.rangeSelector.render();
      },
      destroy: function () {
        var b = this,
          e = b.minInput,
          f = b.maxInput;
        b.unMouseDown();
        b.unResize();
        y(b.buttons);
        e && (e.onfocus = e.onblur = e.onchange = null);
        f && (f.onfocus = f.onblur = f.onchange = null);
        a.objectEach(
          b,
          function (a, d) {
            a && 'chart' !== d && (a.destroy ? a.destroy() : a.nodeType && q(this[d]));
            a !== B.prototype[d] && (b[d] = null);
          },
          this
        );
      },
    };
    G.prototype.toFixedRange = function (a, e, f, g) {
      var d = this.chart && this.chart.fixedRange;
      a = b(f, this.translate(a, !0, !this.horiz));
      e = b(g, this.translate(e, !0, !this.horiz));
      f = d && (e - a) / d;
      0.7 < f && 1.3 > f && (g ? (a = e - d) : (e = a + d));
      (p(a) && p(e)) || (a = e = void 0);
      return { min: a, max: e };
    };
    G.prototype.minFromRange = function () {
      var a = this.range,
        e = { month: 'Month', year: 'FullYear' }[a.type],
        f,
        g = this.max,
        l,
        c,
        k = function (a, b) {
          var c = new Date(a),
            d = c['get' + e]();
          c['set' + e](d + b);
          d === c['get' + e]() && c.setDate(0);
          return c.getTime() - a;
        };
      p(a) ? ((f = g - a), (c = a)) : ((f = g + k(g, -a.count)), this.chart && (this.chart.fixedRange = g - f));
      l = b(this.dataMin, Number.MIN_VALUE);
      p(f) || (f = l);
      f <= l && ((f = l), void 0 === c && (c = k(f, a.count)), (this.newMax = Math.min(f + c, this.dataMax)));
      p(g) || (f = void 0);
      return f;
    };
    A(m, 'afterGetContainer', function () {
      this.options.rangeSelector.enabled && (this.rangeSelector = new B(this));
    });
    A(m, 'beforeRender', function () {
      var a = this.axes,
        b = this.rangeSelector;
      b &&
        (p(b.deferredYTDClick) && (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick),
        a.forEach(function (a) {
          a.updateNames();
          a.setScale();
        }),
        this.getAxisMargins(),
        b.render(),
        (a = b.options.verticalAlign),
        b.options.floating ||
          ('bottom' === a ? (this.extraBottomMargin = !0) : 'middle' !== a && (this.extraTopMargin = !0)));
    });
    A(m, 'update', function (a) {
      var b = a.options.rangeSelector;
      a = this.rangeSelector;
      var d = this.extraBottomMargin,
        e = this.extraTopMargin;
      b && b.enabled && !v(a) && ((this.options.rangeSelector.enabled = !0), (this.rangeSelector = new B(this)));
      this.extraTopMargin = this.extraBottomMargin = !1;
      a &&
        (a.render(),
        (b = (b && b.verticalAlign) || (a.options && a.options.verticalAlign)),
        a.options.floating ||
          ('bottom' === b ? (this.extraBottomMargin = !0) : 'middle' !== b && (this.extraTopMargin = !0)),
        this.extraBottomMargin !== d || this.extraTopMargin !== e) &&
        (this.isDirtyBox = !0);
    });
    A(m, 'render', function () {
      var a = this.rangeSelector;
      a &&
        !a.options.floating &&
        (a.render(),
        (a = a.options.verticalAlign),
        'bottom' === a ? (this.extraBottomMargin = !0) : 'middle' !== a && (this.extraTopMargin = !0));
    });
    A(m, 'getMargins', function () {
      var a = this.rangeSelector;
      a &&
        ((a = a.getHeight()),
        this.extraTopMargin && (this.plotTop += a),
        this.extraBottomMargin && (this.marginBottom += a));
    });
    m.prototype.callbacks.push(function (a) {
      function b() {
        d = a.xAxis[0].getExtremes();
        p(d.min) && e.render(d.min, d.max);
      }
      var d,
        e = a.rangeSelector,
        f,
        c;
      e &&
        ((c = A(a.xAxis[0], 'afterSetExtremes', function (a) {
          e.render(a.min, a.max);
        })),
        (f = A(a, 'redraw', b)),
        b());
      A(a, 'destroy', function () {
        e && (f(), c());
      });
    });
    a.RangeSelector = B;
  })(H);
  (function (a) {
    var B = a.addEvent,
      A = a.arrayMax,
      G = a.arrayMin,
      m = a.Axis,
      g = a.Chart,
      t = a.defined,
      u = a.extend,
      v = a.format,
      y = a.isNumber,
      q = a.isString,
      f = a.merge,
      e = a.pick,
      p = a.Point,
      r = a.Renderer,
      b = a.Series,
      l = a.splat,
      n = a.SVGRenderer,
      d = a.VMLRenderer,
      w = b.prototype,
      E = w.init,
      C = w.processData,
      F = p.prototype.tooltipFormatter;
    a.StockChart = a.stockChart = function (b, d, m) {
      var c = q(b) || b.nodeName,
        h = arguments[c ? 1 : 0],
        k = h,
        n = h.series,
        p = a.getOptions(),
        r,
        t = e(h.navigator && h.navigator.enabled, p.navigator.enabled, !0),
        u = t ? { startOnTick: !1, endOnTick: !1 } : null,
        x = { marker: { enabled: !1, radius: 2 } },
        v = { shadow: !1, borderWidth: 0 };
      h.xAxis = l(h.xAxis || {}).map(function (a, b) {
        return f(
          {
            minPadding: 0,
            maxPadding: 0,
            overscroll: 0,
            ordinal: !0,
            title: { text: null },
            labels: { overflow: 'justify' },
            showLastLabel: !0,
          },
          p.xAxis,
          p.xAxis && p.xAxis[b],
          a,
          { type: 'datetime', categories: null },
          u
        );
      });
      h.yAxis = l(h.yAxis || {}).map(function (a, b) {
        r = e(a.opposite, !0);
        return f(
          {
            labels: { y: -2 },
            opposite: r,
            showLastLabel: !(!a.categories && 'category' !== a.type),
            title: { text: null },
          },
          p.yAxis,
          p.yAxis && p.yAxis[b],
          a
        );
      });
      h.series = null;
      h = f(
        {
          chart: { panning: !0, pinchType: 'x' },
          navigator: { enabled: t },
          scrollbar: { enabled: e(p.scrollbar.enabled, !0) },
          rangeSelector: { enabled: e(p.rangeSelector.enabled, !0) },
          title: { text: null },
          tooltip: { split: e(p.tooltip.split, !0), crosshairs: !0 },
          legend: { enabled: !1 },
          plotOptions: {
            line: x,
            spline: x,
            area: x,
            areaspline: x,
            arearange: x,
            areasplinerange: x,
            column: v,
            columnrange: v,
            candlestick: v,
            ohlc: v,
          },
        },
        h,
        { isStock: !0 }
      );
      h.series = k.series = n;
      return c ? new g(b, h, m) : new g(h, d);
    };
    B(m, 'autoLabelAlign', function (a) {
      var b = this.chart,
        c = this.options,
        b = (b._labelPanes = b._labelPanes || {}),
        d = this.options.labels;
      this.chart.options.isStock &&
        'yAxis' === this.coll &&
        ((c = c.top + ',' + c.height),
        !b[c] &&
          d.enabled &&
          (15 === d.x && (d.x = 0),
          void 0 === d.align && (d.align = 'right'),
          (b[c] = this),
          (a.align = 'right'),
          a.preventDefault()));
    });
    B(m, 'destroy', function () {
      var a = this.chart,
        b = this.options && this.options.top + ',' + this.options.height;
      b && a._labelPanes && a._labelPanes[b] === this && delete a._labelPanes[b];
    });
    B(m, 'getPlotLinePath', function (b) {
      function c(a) {
        var b = 'xAxis' === a ? 'yAxis' : 'xAxis';
        a = d.options[b];
        return y(a)
          ? [g[b][a]]
          : q(a)
          ? [g.get(a)]
          : f.map(function (a) {
              return a[b];
            });
      }
      var d = this,
        f = this.isLinked && !this.series ? this.linkedParent.series : this.series,
        g = d.chart,
        l = g.renderer,
        m = d.left,
        n = d.top,
        p,
        r,
        u,
        v,
        w = [],
        A = [],
        B,
        C,
        E = b.translatedValue,
        G = b.value,
        F = b.force,
        H;
      if ('xAxis' === d.coll || 'yAxis' === d.coll)
        b.preventDefault(),
          (A = c(d.coll)),
          (B = d.isXAxis ? g.yAxis : g.xAxis),
          B.forEach(function (a) {
            if (t(a.options.id) ? -1 === a.options.id.indexOf('navigator') : 1) {
              var b = a.isXAxis ? 'yAxis' : 'xAxis',
                b = t(a.options[b]) ? g[b][a.options[b]] : g[b][0];
              d === b && A.push(a);
            }
          }),
          (C = A.length ? [] : [d.isXAxis ? g.yAxis[0] : g.xAxis[0]]),
          A.forEach(function (b) {
            -1 !== C.indexOf(b) ||
              a.find(C, function (a) {
                return a.pos === b.pos && a.len === b.len;
              }) ||
              C.push(b);
          }),
          (H = e(E, d.translate(G, null, null, b.old))),
          y(H) &&
            (d.horiz
              ? C.forEach(function (a) {
                  var b;
                  r = a.pos;
                  v = r + a.len;
                  p = u = Math.round(H + d.transB);
                  'pass' !== F &&
                    (p < m || p > m + d.width) &&
                    (F ? (p = u = Math.min(Math.max(m, p), m + d.width)) : (b = !0));
                  b || w.push('M', p, r, 'L', u, v);
                })
              : C.forEach(function (a) {
                  var b;
                  p = a.pos;
                  u = p + a.len;
                  r = v = Math.round(n + d.height - H);
                  'pass' !== F &&
                    (r < n || r > n + d.height) &&
                    (F ? (r = v = Math.min(Math.max(n, r), d.top + d.height)) : (b = !0));
                  b || w.push('M', p, r, 'L', u, v);
                })),
          (b.path = 0 < w.length ? l.crispPolyLine(w, b.lineWidth || 1) : null);
    });
    n.prototype.crispPolyLine = function (a, b) {
      var c;
      for (c = 0; c < a.length; c += 6)
        a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - (b % 2) / 2),
          a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + (b % 2) / 2);
      return a;
    };
    r === d && (d.prototype.crispPolyLine = n.prototype.crispPolyLine);
    B(m, 'afterHideCrosshair', function () {
      this.crossLabel && (this.crossLabel = this.crossLabel.hide());
    });
    B(m, 'afterDrawCrosshair', function (a) {
      var b, c;
      if (t(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
        var d = this.chart,
          f = this.options.crosshair.label,
          g = this.horiz;
        b = this.opposite;
        c = this.left;
        var l = this.top,
          m = this.crossLabel,
          n = f.format,
          p = '',
          q = 'inside' === this.options.tickPosition,
          r = !1 !== this.crosshair.snap,
          w = 0,
          y = a.e || (this.cross && this.cross.e),
          A = a.point;
        a = this.lin2log;
        var B, C;
        this.isLog ? ((B = a(this.min)), (C = a(this.max))) : ((B = this.min), (C = this.max));
        a = g
          ? 'center'
          : b
          ? 'right' === this.labelAlign
            ? 'right'
            : 'left'
          : 'left' === this.labelAlign
          ? 'left'
          : 'center';
        m ||
          ((m = this.crossLabel = d.renderer
            .label(null, null, null, f.shape || 'callout')
            .addClass(
              'highcharts-crosshair-label' + (this.series[0] && ' highcharts-color-' + this.series[0].colorIndex)
            )
            .attr({ align: f.align || a, padding: e(f.padding, 8), r: e(f.borderRadius, 3), zIndex: 2 })
            .add(this.labelGroup)),
          d.styledMode ||
            m
              .attr({
                fill: f.backgroundColor || (this.series[0] && this.series[0].color) || '#666666',
                stroke: f.borderColor || '',
                'stroke-width': f.borderWidth || 0,
              })
              .css(u({ color: '#ffffff', fontWeight: 'normal', fontSize: '11px', textAlign: 'center' }, f.style)));
        g
          ? ((a = r ? A.plotX + c : y.chartX), (l += b ? 0 : this.height))
          : ((a = b ? this.width + c : 0), (l = r ? A.plotY + l : y.chartY));
        n || f.formatter || (this.isDatetimeAxis && (p = '%b %d, %Y'), (n = '{value' + (p ? ':' + p : '') + '}'));
        p = r ? A[this.isXAxis ? 'x' : 'y'] : this.toValue(g ? y.chartX : y.chartY);
        m.attr({
          text: n ? v(n, { value: p }, d.time) : f.formatter.call(this, p),
          x: a,
          y: l,
          visibility: p < B || p > C ? 'hidden' : 'visible',
        });
        f = m.getBBox();
        if (g) {
          if ((q && !b) || (!q && b)) l = m.y - f.height;
        } else l = m.y - f.height / 2;
        g
          ? ((b = c - f.x), (c = c + this.width - f.x))
          : ((b = 'left' === this.labelAlign ? c : 0),
            (c = 'right' === this.labelAlign ? c + this.width : d.chartWidth));
        m.translateX < b && (w = b - m.translateX);
        m.translateX + f.width >= c && (w = -(m.translateX + f.width - c));
        m.attr({
          x: a + w,
          y: l,
          anchorX: g ? a : this.opposite ? 0 : d.chartWidth,
          anchorY: g ? (this.opposite ? d.chartHeight : 0) : l + f.height / 2,
        });
      }
    });
    w.init = function () {
      E.apply(this, arguments);
      this.setCompare(this.options.compare);
    };
    w.setCompare = function (a) {
      this.modifyValue =
        'value' === a || 'percent' === a
          ? function (b, c) {
              var d = this.compareValue;
              if (void 0 !== b && void 0 !== d)
                return (
                  (b = 'value' === a ? b - d : (b / d) * 100 - (100 === this.options.compareBase ? 0 : 100)),
                  c && (c.change = b),
                  b
                );
            }
          : null;
      this.userOptions.compare = a;
      this.chart.hasRendered && (this.isDirty = !0);
    };
    w.processData = function () {
      var a,
        b = -1,
        d,
        e,
        f = !0 === this.options.compareStart ? 0 : 1,
        g,
        l;
      C.apply(this, arguments);
      if (this.xAxis && this.processedYData)
        for (
          d = this.processedXData,
            e = this.processedYData,
            g = e.length,
            this.pointArrayMap && (b = this.pointArrayMap.indexOf(this.options.pointValKey || this.pointValKey || 'y')),
            a = 0;
          a < g - f;
          a++
        )
          if (((l = e[a] && -1 < b ? e[a][b] : e[a]), y(l) && d[a + f] >= this.xAxis.min && 0 !== l)) {
            this.compareValue = l;
            break;
          }
    };
    B(b, 'afterGetExtremes', function () {
      if (this.modifyValue) {
        var a = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)];
        this.dataMin = G(a);
        this.dataMax = A(a);
      }
    });
    m.prototype.setCompare = function (a, b) {
      this.isXAxis ||
        (this.series.forEach(function (b) {
          b.setCompare(a);
        }),
        e(b, !0) && this.chart.redraw());
    };
    p.prototype.tooltipFormatter = function (b) {
      b = b.replace(
        '{point.change}',
        (0 < this.change ? '+' : '') + a.numberFormat(this.change, e(this.series.tooltipOptions.changeDecimals, 2))
      );
      return F.apply(this, [b]);
    };
    B(b, 'render', function () {
      var a;
      (this.chart.is3d && this.chart.is3d()) ||
        this.chart.polar ||
        !this.xAxis ||
        this.xAxis.isRadial ||
        ((a = this.yAxis.len - (this.xAxis.axisLine ? Math.floor(this.xAxis.axisLine.strokeWidth() / 2) : 0)),
        !this.clipBox && this.animate
          ? ((this.clipBox = f(this.chart.clipBox)), (this.clipBox.width = this.xAxis.len), (this.clipBox.height = a))
          : this.chart[this.sharedClipKey] &&
            (this.chart[this.sharedClipKey].animate({ width: this.xAxis.len, height: a }),
            this.chart[this.sharedClipKey + 'm'] &&
              this.chart[this.sharedClipKey + 'm'].animate({ width: this.xAxis.len })));
    });
    B(g, 'update', function (a) {
      a = a.options;
      'scrollbar' in a &&
        this.navigator &&
        (f(!0, this.options.scrollbar, a.scrollbar), this.navigator.update({}, !1), delete a.scrollbar);
    });
  })(H);
  return H;
});
//# sourceMappingURL=highstock.js.map
