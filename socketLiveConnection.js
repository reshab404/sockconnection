!(function (t) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).SockJS = t();
  }
})(function () {
  return (function i(s, a, l) {
    function u(e, t) {
      if (!a[e]) {
        if (!s[e]) {
          var n = "function" == typeof require && require;
          if (!t && n) return n(e, !0);
          if (c) return c(e, !0);
          var r = new Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        var o = (a[e] = { exports: {} });
        s[e][0].call(
          o.exports,
          function (t) {
            return u(s[e][1][t] || t);
          },
          o,
          o.exports,
          i,
          s,
          a,
          l
        );
      }
      return a[e].exports;
    }
    for (
      var c = "function" == typeof require && require, t = 0;
      t < l.length;
      t++
    )
      u(l[t]);
    return u;
  })(
    {
      1: [
        function (n, r, t) {
          (function (t) {
            "use strict";
            var e = n("./transport-list");
            (r.exports = n("./main")(e)),
              "_sockjs_onload" in t && setTimeout(t._sockjs_onload, 1);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        { "./main": 14, "./transport-list": 16 },
      ],
      2: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("./event");
          function i() {
            o.call(this),
              this.initEvent("close", !1, !1),
              (this.wasClean = !1),
              (this.code = 0),
              (this.reason = "");
          }
          r(i, o), (e.exports = i);
        },
        { "./event": 4, inherits: 54 },
      ],
      3: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("./eventtarget");
          function i() {
            o.call(this);
          }
          r(i, o),
            (i.prototype.removeAllListeners = function (t) {
              t ? delete this._listeners[t] : (this._listeners = {});
            }),
            (i.prototype.once = function (e, n) {
              var r = this,
                o = !1;
              this.on(e, function t() {
                r.removeListener(e, t),
                  o || ((o = !0), n.apply(this, arguments));
              });
            }),
            (i.prototype.emit = function () {
              var t = arguments[0],
                e = this._listeners[t];
              if (e) {
                for (
                  var n = arguments.length, r = new Array(n - 1), o = 1;
                  o < n;
                  o++
                )
                  r[o - 1] = arguments[o];
                for (var i = 0; i < e.length; i++) e[i].apply(this, r);
              }
            }),
            (i.prototype.on = i.prototype.addListener =
              o.prototype.addEventListener),
            (i.prototype.removeListener = o.prototype.removeEventListener),
            (e.exports.EventEmitter = i);
        },
        { "./eventtarget": 5, inherits: 54 },
      ],
      4: [
        function (t, e, n) {
          "use strict";
          function r(t) {
            this.type = t;
          }
          (r.prototype.initEvent = function (t, e, n) {
            return (
              (this.type = t),
              (this.bubbles = e),
              (this.cancelable = n),
              (this.timeStamp = +new Date()),
              this
            );
          }),
            (r.prototype.stopPropagation = function () {}),
            (r.prototype.preventDefault = function () {}),
            (r.CAPTURING_PHASE = 1),
            (r.AT_TARGET = 2),
            (r.BUBBLING_PHASE = 3),
            (e.exports = r);
        },
        {},
      ],
      5: [
        function (t, e, n) {
          "use strict";
          function r() {
            this._listeners = {};
          }
          (r.prototype.addEventListener = function (t, e) {
            t in this._listeners || (this._listeners[t] = []);
            var n = this._listeners[t];
            -1 === n.indexOf(e) && (n = n.concat([e])),
              (this._listeners[t] = n);
          }),
            (r.prototype.removeEventListener = function (t, e) {
              var n = this._listeners[t];
              if (n) {
                var r = n.indexOf(e);
                -1 === r ||
                  (1 < n.length
                    ? (this._listeners[t] = n
                        .slice(0, r)
                        .concat(n.slice(r + 1)))
                    : delete this._listeners[t]);
              }
            }),
            (r.prototype.dispatchEvent = function () {
              var t = arguments[0],
                e = t.type,
                n = 1 === arguments.length ? [t] : Array.apply(null, arguments);
              if (
                (this["on" + e] && this["on" + e].apply(this, n),
                e in this._listeners)
              )
                for (var r = this._listeners[e], o = 0; o < r.length; o++)
                  r[o].apply(this, n);
            }),
            (e.exports = r);
        },
        {},
      ],
      6: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("./event");
          function i(t) {
            o.call(this), this.initEvent("message", !1, !1), (this.data = t);
          }
          r(i, o), (e.exports = i);
        },
        { "./event": 4, inherits: 54 },
      ],
      7: [
        function (t, e, n) {
          "use strict";
          var r = t("json3"),
            o = t("./utils/iframe");
          function i(t) {
            (this._transport = t).on(
              "message",
              this._transportMessage.bind(this)
            ),
              t.on("close", this._transportClose.bind(this));
          }
          (i.prototype._transportClose = function (t, e) {
            o.postMessage("c", r.stringify([t, e]));
          }),
            (i.prototype._transportMessage = function (t) {
              o.postMessage("t", t);
            }),
            (i.prototype._send = function (t) {
              this._transport.send(t);
            }),
            (i.prototype._close = function () {
              this._transport.close(), this._transport.removeAllListeners();
            }),
            (e.exports = i);
        },
        { "./utils/iframe": 47, json3: 55 },
      ],
      8: [
        function (t, e, n) {
          "use strict";
          var f = t("./utils/url"),
            r = t("./utils/event"),
            h = t("json3"),
            d = t("./facade"),
            o = t("./info-iframe-receiver"),
            p = t("./utils/iframe"),
            m = t("./location"),
            v = function () {};
          e.exports = function (l, t) {
            var u,
              c = {};
            t.forEach(function (t) {
              t.facadeTransport &&
                (c[t.facadeTransport.transportName] = t.facadeTransport);
            }),
              (c[o.transportName] = o),
              (l.bootstrap_iframe = function () {
                var a;
                p.currentWindowId = m.hash.slice(1);
                r.attachEvent("message", function (e) {
                  if (
                    e.source === parent &&
                    (void 0 === u && (u = e.origin), e.origin === u)
                  ) {
                    var n;
                    try {
                      n = h.parse(e.data);
                    } catch (t) {
                      return void v("bad json", e.data);
                    }
                    if (n.windowId === p.currentWindowId)
                      switch (n.type) {
                        case "s":
                          var t;
                          try {
                            t = h.parse(n.data);
                          } catch (t) {
                            v("bad json", n.data);
                            break;
                          }
                          var r = t[0],
                            o = t[1],
                            i = t[2],
                            s = t[3];
                          if ((v(r, o, i, s), r !== l.version))
                            throw new Error(
                              'Incompatible SockJS! Main site uses: "' +
                                r +
                                '", the iframe: "' +
                                l.version +
                                '".'
                            );
                          if (
                            !f.isOriginEqual(i, m.href) ||
                            !f.isOriginEqual(s, m.href)
                          )
                            throw new Error(
                              "Can't connect to different domain from within an iframe. (" +
                                m.href +
                                ", " +
                                i +
                                ", " +
                                s +
                                ")"
                            );
                          a = new d(new c[o](i, s));
                          break;
                        case "m":
                          a._send(n.data);
                          break;
                        case "c":
                          a && a._close(), (a = null);
                      }
                  }
                }),
                  p.postMessage("s");
              });
          };
        },
        {
          "./facade": 7,
          "./info-iframe-receiver": 10,
          "./location": 13,
          "./utils/event": 46,
          "./utils/iframe": 47,
          "./utils/url": 52,
          debug: void 0,
          json3: 55,
        },
      ],
      9: [
        function (t, e, n) {
          "use strict";
          var r = t("events").EventEmitter,
            o = t("inherits"),
            s = t("json3"),
            a = t("./utils/object"),
            l = function () {};
          function i(t, e) {
            r.call(this);
            var o = this,
              i = +new Date();
            (this.xo = new e("GET", t)),
              this.xo.once("finish", function (t, e) {
                var n, r;
                if (200 === t) {
                  if (((r = +new Date() - i), e))
                    try {
                      n = s.parse(e);
                    } catch (t) {
                      l("bad json", e);
                    }
                  a.isObject(n) || (n = {});
                }
                o.emit("finish", n, r), o.removeAllListeners();
              });
          }
          o(i, r),
            (i.prototype.close = function () {
              this.removeAllListeners(), this.xo.close();
            }),
            (e.exports = i);
        },
        {
          "./utils/object": 49,
          debug: void 0,
          events: 3,
          inherits: 54,
          json3: 55,
        },
      ],
      10: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("events").EventEmitter,
            i = t("json3"),
            s = t("./transport/sender/xhr-local"),
            a = t("./info-ajax");
          function l(t) {
            var n = this;
            o.call(this),
              (this.ir = new a(t, s)),
              this.ir.once("finish", function (t, e) {
                (n.ir = null), n.emit("message", i.stringify([t, e]));
              });
          }
          r(l, o),
            (l.transportName = "iframe-info-receiver"),
            (l.prototype.close = function () {
              this.ir && (this.ir.close(), (this.ir = null)),
                this.removeAllListeners();
            }),
            (e.exports = l);
        },
        {
          "./info-ajax": 9,
          "./transport/sender/xhr-local": 37,
          events: 3,
          inherits: 54,
          json3: 55,
        },
      ],
      11: [
        function (n, o, t) {
          (function (r) {
            "use strict";
            var i = n("events").EventEmitter,
              t = n("inherits"),
              s = n("json3"),
              a = n("./utils/event"),
              l = n("./transport/iframe"),
              u = n("./info-iframe-receiver"),
              c = function () {};
            function e(e, n) {
              var o = this;
              i.call(this);
              function t() {
                var t = (o.ifr = new l(u.transportName, n, e));
                t.once("message", function (e) {
                  if (e) {
                    var t;
                    try {
                      t = s.parse(e);
                    } catch (t) {
                      return c("bad json", e), o.emit("finish"), void o.close();
                    }
                    var n = t[0],
                      r = t[1];
                    o.emit("finish", n, r);
                  }
                  o.close();
                }),
                  t.once("close", function () {
                    o.emit("finish"), o.close();
                  });
              }
              r.document.body ? t() : a.attachEvent("load", t);
            }
            t(e, i),
              (e.enabled = function () {
                return l.enabled();
              }),
              (e.prototype.close = function () {
                this.ifr && this.ifr.close(),
                  this.removeAllListeners(),
                  (this.ifr = null);
              }),
              (o.exports = e);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "./info-iframe-receiver": 10,
          "./transport/iframe": 22,
          "./utils/event": 46,
          debug: void 0,
          events: 3,
          inherits: 54,
          json3: 55,
        },
      ],
      12: [
        function (t, e, n) {
          "use strict";
          var r = t("events").EventEmitter,
            o = t("inherits"),
            i = t("./utils/url"),
            s = t("./transport/sender/xdr"),
            a = t("./transport/sender/xhr-cors"),
            l = t("./transport/sender/xhr-local"),
            u = t("./transport/sender/xhr-fake"),
            c = t("./info-iframe"),
            f = t("./info-ajax"),
            h = function () {};
          function d(t, e) {
            h(t);
            var n = this;
            r.call(this),
              setTimeout(function () {
                n.doXhr(t, e);
              }, 0);
          }
          o(d, r),
            (d._getReceiver = function (t, e, n) {
              return n.sameOrigin
                ? new f(e, l)
                : a.enabled
                ? new f(e, a)
                : s.enabled && n.sameScheme
                ? new f(e, s)
                : c.enabled()
                ? new c(t, e)
                : new f(e, u);
            }),
            (d.prototype.doXhr = function (t, e) {
              var n = this,
                r = i.addPath(t, "/info");
              h("doXhr", r),
                (this.xo = d._getReceiver(t, r, e)),
                (this.timeoutRef = setTimeout(function () {
                  h("timeout"), n._cleanup(!1), n.emit("finish");
                }, d.timeout)),
                this.xo.once("finish", function (t, e) {
                  h("finish", t, e), n._cleanup(!0), n.emit("finish", t, e);
                });
            }),
            (d.prototype._cleanup = function (t) {
              h("_cleanup"),
                clearTimeout(this.timeoutRef),
                (this.timeoutRef = null),
                !t && this.xo && this.xo.close(),
                (this.xo = null);
            }),
            (d.prototype.close = function () {
              h("close"), this.removeAllListeners(), this._cleanup(!1);
            }),
            (d.timeout = 8e3),
            (e.exports = d);
        },
        {
          "./info-ajax": 9,
          "./info-iframe": 11,
          "./transport/sender/xdr": 34,
          "./transport/sender/xhr-cors": 35,
          "./transport/sender/xhr-fake": 36,
          "./transport/sender/xhr-local": 37,
          "./utils/url": 52,
          debug: void 0,
          events: 3,
          inherits: 54,
        },
      ],
      13: [
        function (t, e, n) {
          (function (t) {
            "use strict";
            e.exports = t.location || {
              origin: "http://localhost:80",
              protocol: "http:",
              host: "localhost",
              port: 80,
              href: "http://localhost/",
              hash: "",
            };
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      14: [
        function (_, E, t) {
          (function (i) {
            "use strict";
            _("./shims");
            var r,
              l = _("url-parse"),
              t = _("inherits"),
              s = _("json3"),
              u = _("./utils/random"),
              e = _("./utils/escape"),
              c = _("./utils/url"),
              a = _("./utils/event"),
              n = _("./utils/transport"),
              o = _("./utils/object"),
              f = _("./utils/browser"),
              h = _("./utils/log"),
              d = _("./event/event"),
              p = _("./event/eventtarget"),
              m = _("./location"),
              v = _("./event/close"),
              b = _("./event/trans-message"),
              y = _("./info-receiver"),
              g = function () {};
            function w(t, e, n) {
              if (!(this instanceof w)) return new w(t, e, n);
              if (arguments.length < 1)
                throw new TypeError(
                  "Failed to construct 'SockJS: 1 argument required, but only 0 present"
                );
              p.call(this),
                (this.readyState = w.CONNECTING),
                (this.extensions = ""),
                (this.protocol = ""),
                (n = n || {}).protocols_whitelist &&
                  h.warn(
                    "'protocols_whitelist' is DEPRECATED. Use 'transports' instead."
                  ),
                (this._transportsWhitelist = n.transports),
                (this._transportOptions = n.transportOptions || {}),
                (this._timeout = n.timeout || 0);
              var r = n.sessionId || 8;
              if ("function" == typeof r) this._generateSessionId = r;
              else {
                if ("number" != typeof r)
                  throw new TypeError(
                    "If sessionId is used in the options, it needs to be a number or a function."
                  );
                this._generateSessionId = function () {
                  return u.string(r);
                };
              }
              this._server = n.server || u.numberString(1e3);
              var o = new l(t);
              if (!o.host || !o.protocol)
                throw new SyntaxError("The URL '" + t + "' is invalid");
              if (o.hash)
                throw new SyntaxError("The URL must not contain a fragment");
              if ("http:" !== o.protocol && "https:" !== o.protocol)
                throw new SyntaxError(
                  "The URL's scheme must be either 'http:' or 'https:'. '" +
                    o.protocol +
                    "' is not allowed."
                );
              var i = "https:" === o.protocol;
              if (
                "https:" === m.protocol &&
                !i &&
                !c.isLoopbackAddr(o.hostname)
              )
                throw new Error(
                  "SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS"
                );
              e ? Array.isArray(e) || (e = [e]) : (e = []);
              var s = e.sort();
              s.forEach(function (t, e) {
                if (!t)
                  throw new SyntaxError(
                    "The protocols entry '" + t + "' is invalid."
                  );
                if (e < s.length - 1 && t === s[e + 1])
                  throw new SyntaxError(
                    "The protocols entry '" + t + "' is duplicated."
                  );
              });
              var a = c.getOrigin(m.href);
              (this._origin = a ? a.toLowerCase() : null),
                o.set("pathname", o.pathname.replace(/\/+$/, "")),
                (this.url = o.href),
                g("using url", this.url),
                (this._urlInfo = {
                  nullOrigin: !f.hasDomain(),
                  sameOrigin: c.isOriginEqual(this.url, m.href),
                  sameScheme: c.isSchemeEqual(this.url, m.href),
                }),
                (this._ir = new y(this.url, this._urlInfo)),
                this._ir.once("finish", this._receiveInfo.bind(this));
            }
            function x(t) {
              return 1e3 === t || (3e3 <= t && t <= 4999);
            }
            t(w, p),
              (w.prototype.close = function (t, e) {
                if (t && !x(t))
                  throw new Error("InvalidAccessError: Invalid code");
                if (e && 123 < e.length)
                  throw new SyntaxError(
                    "reason argument has an invalid length"
                  );
                if (
                  this.readyState !== w.CLOSING &&
                  this.readyState !== w.CLOSED
                ) {
                  this._close(t || 1e3, e || "Normal closure", !0);
                }
              }),
              (w.prototype.send = function (t) {
                if (
                  ("string" != typeof t && (t = "" + t),
                  this.readyState === w.CONNECTING)
                )
                  throw new Error(
                    "InvalidStateError: The connection has not been established yet"
                  );
                this.readyState === w.OPEN && this._transport.send(e.quote(t));
              }),
              (w.version = _("./version")),
              (w.CONNECTING = 0),
              (w.OPEN = 1),
              (w.CLOSING = 2),
              (w.CLOSED = 3),
              (w.prototype._receiveInfo = function (t, e) {
                if ((g("_receiveInfo", e), (this._ir = null), t)) {
                  (this._rto = this.countRTO(e)),
                    (this._transUrl = t.base_url ? t.base_url : this.url),
                    (t = o.extend(t, this._urlInfo)),
                    g("info", t);
                  var n = r.filterToEnabled(this._transportsWhitelist, t);
                  (this._transports = n.main),
                    g(this._transports.length + " enabled transports"),
                    this._connect();
                } else this._close(1002, "Cannot connect to server");
              }),
              (w.prototype._connect = function () {
                for (
                  var t = this._transports.shift();
                  t;
                  t = this._transports.shift()
                ) {
                  if (
                    (g("attempt", t.transportName),
                    t.needBody &&
                      (!i.document.body ||
                        (void 0 !== i.document.readyState &&
                          "complete" !== i.document.readyState &&
                          "interactive" !== i.document.readyState)))
                  )
                    return (
                      g("waiting for body"),
                      this._transports.unshift(t),
                      void a.attachEvent("load", this._connect.bind(this))
                    );
                  var e = Math.max(
                    this._timeout,
                    this._rto * t.roundTrips || 5e3
                  );
                  (this._transportTimeoutId = setTimeout(
                    this._transportTimeout.bind(this),
                    e
                  )),
                    g("using timeout", e);
                  var n = c.addPath(
                      this._transUrl,
                      "/" + this._server + "/" + this._generateSessionId()
                    ),
                    r = this._transportOptions[t.transportName];
                  g("transport url", n);
                  var o = new t(n, this._transUrl, r);
                  return (
                    o.on("message", this._transportMessage.bind(this)),
                    o.once("close", this._transportClose.bind(this)),
                    (o.transportName = t.transportName),
                    void (this._transport = o)
                  );
                }
                this._close(2e3, "All transports failed", !1);
              }),
              (w.prototype._transportTimeout = function () {
                g("_transportTimeout"),
                  this.readyState === w.CONNECTING &&
                    (this._transport && this._transport.close(),
                    this._transportClose(2007, "Transport timed out"));
              }),
              (w.prototype._transportMessage = function (t) {
                g("_transportMessage", t);
                var e,
                  n = this,
                  r = t.slice(0, 1),
                  o = t.slice(1);
                switch (r) {
                  case "o":
                    return void this._open();
                  case "h":
                    return (
                      this.dispatchEvent(new d("heartbeat")),
                      void g("heartbeat", this.transport)
                    );
                }
                if (o)
                  try {
                    e = s.parse(o);
                  } catch (t) {
                    g("bad json", o);
                  }
                if (void 0 !== e)
                  switch (r) {
                    case "a":
                      Array.isArray(e) &&
                        e.forEach(function (t) {
                          g("message", n.transport, t),
                            n.dispatchEvent(new b(t));
                        });
                      break;
                    case "m":
                      g("message", this.transport, e),
                        this.dispatchEvent(new b(e));
                      break;
                    case "c":
                      Array.isArray(e) &&
                        2 === e.length &&
                        this._close(e[0], e[1], !0);
                  }
                else g("empty payload", o);
              }),
              (w.prototype._transportClose = function (t, e) {
                g("_transportClose", this.transport, t, e),
                  this._transport &&
                    (this._transport.removeAllListeners(),
                    (this._transport = null),
                    (this.transport = null)),
                  x(t) || 2e3 === t || this.readyState !== w.CONNECTING
                    ? this._close(t, e)
                    : this._connect();
              }),
              (w.prototype._open = function () {
                g(
                  "_open",
                  this._transport && this._transport.transportName,
                  this.readyState
                ),
                  this.readyState === w.CONNECTING
                    ? (this._transportTimeoutId &&
                        (clearTimeout(this._transportTimeoutId),
                        (this._transportTimeoutId = null)),
                      (this.readyState = w.OPEN),
                      (this.transport = this._transport.transportName),
                      this.dispatchEvent(new d("open")),
                      g("connected", this.transport))
                    : this._close(1006, "Server lost session");
              }),
              (w.prototype._close = function (e, n, r) {
                g("_close", this.transport, e, n, r, this.readyState);
                var o = !1;
                if (
                  (this._ir && ((o = !0), this._ir.close(), (this._ir = null)),
                  this._transport &&
                    (this._transport.close(),
                    (this._transport = null),
                    (this.transport = null)),
                  this.readyState === w.CLOSED)
                )
                  throw new Error(
                    "InvalidStateError: SockJS has already been closed"
                  );
                (this.readyState = w.CLOSING),
                  setTimeout(
                    function () {
                      (this.readyState = w.CLOSED),
                        o && this.dispatchEvent(new d("error"));
                      var t = new v("close");
                      (t.wasClean = r || !1),
                        (t.code = e || 1e3),
                        (t.reason = n),
                        this.dispatchEvent(t),
                        (this.onmessage = this.onclose = this.onerror = null),
                        g("disconnected");
                    }.bind(this),
                    0
                  );
              }),
              (w.prototype.countRTO = function (t) {
                return 100 < t ? 4 * t : 300 + t;
              }),
              (E.exports = function (t) {
                return (r = n(t)), _("./iframe-bootstrap")(w, t), w;
              });
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "./event/close": 2,
          "./event/event": 4,
          "./event/eventtarget": 5,
          "./event/trans-message": 6,
          "./iframe-bootstrap": 8,
          "./info-receiver": 12,
          "./location": 13,
          "./shims": 15,
          "./utils/browser": 44,
          "./utils/escape": 45,
          "./utils/event": 46,
          "./utils/log": 48,
          "./utils/object": 49,
          "./utils/random": 50,
          "./utils/transport": 51,
          "./utils/url": 52,
          "./version": 53,
          debug: void 0,
          inherits: 54,
          json3: 55,
          "url-parse": 58,
        },
      ],
      15: [
        function (t, e, n) {
          "use strict";
          function a(t) {
            return "[object Function]" === i.toString.call(t);
          }
          function l(t) {
            return "[object String]" === f.call(t);
          }
          var o,
            c = Array.prototype,
            i = Object.prototype,
            r = Function.prototype,
            s = String.prototype,
            u = c.slice,
            f = i.toString,
            h =
              Object.defineProperty &&
              (function () {
                try {
                  return Object.defineProperty({}, "x", {}), !0;
                } catch (t) {
                  return !1;
                }
              })();
          o = h
            ? function (t, e, n, r) {
                (!r && e in t) ||
                  Object.defineProperty(t, e, {
                    configurable: !0,
                    enumerable: !1,
                    writable: !0,
                    value: n,
                  });
              }
            : function (t, e, n, r) {
                (!r && e in t) || (t[e] = n);
              };
          function d(t, e, n) {
            for (var r in e) i.hasOwnProperty.call(e, r) && o(t, r, e[r], n);
          }
          function p(t) {
            if (null == t)
              throw new TypeError("can't convert " + t + " to object");
            return Object(t);
          }
          function m() {}
          d(r, {
            bind: function (e) {
              var n = this;
              if (!a(n))
                throw new TypeError(
                  "Function.prototype.bind called on incompatible " + n
                );
              for (
                var r = u.call(arguments, 1),
                  t = Math.max(0, n.length - r.length),
                  o = [],
                  i = 0;
                i < t;
                i++
              )
                o.push("$" + i);
              var s = Function(
                "binder",
                "return function (" +
                  o.join(",") +
                  "){ return binder.apply(this, arguments); }"
              )(function () {
                if (this instanceof s) {
                  var t = n.apply(this, r.concat(u.call(arguments)));
                  return Object(t) === t ? t : this;
                }
                return n.apply(e, r.concat(u.call(arguments)));
              });
              return (
                n.prototype &&
                  ((m.prototype = n.prototype),
                  (s.prototype = new m()),
                  (m.prototype = null)),
                s
              );
            },
          }),
            d(Array, {
              isArray: function (t) {
                return "[object Array]" === f.call(t);
              },
            });
          var v,
            b,
            y,
            g = Object("a"),
            w = "a" !== g[0] || !(0 in g);
          d(
            c,
            {
              forEach: function (t, e) {
                var n = p(this),
                  r = w && l(this) ? this.split("") : n,
                  o = e,
                  i = -1,
                  s = r.length >>> 0;
                if (!a(t)) throw new TypeError();
                for (; ++i < s; ) i in r && t.call(o, r[i], i, n);
              },
            },
            ((v = c.forEach),
            (y = b = !0),
            v &&
              (v.call("foo", function (t, e, n) {
                "object" != typeof n && (b = !1);
              }),
              v.call(
                [1],
                function () {
                  y = "string" == typeof this;
                },
                "x"
              )),
            !(v && b && y))
          );
          var x = Array.prototype.indexOf && -1 !== [0, 1].indexOf(1, 2);
          d(
            c,
            {
              indexOf: function (t, e) {
                var n = w && l(this) ? this.split("") : p(this),
                  r = n.length >>> 0;
                if (!r) return -1;
                var o = 0;
                for (
                  1 < arguments.length &&
                    (o = (function (t) {
                      var e = +t;
                      return (
                        e != e
                          ? (e = 0)
                          : 0 !== e &&
                            e !== 1 / 0 &&
                            e !== -1 / 0 &&
                            (e = (0 < e || -1) * Math.floor(Math.abs(e))),
                        e
                      );
                    })(e)),
                    o = 0 <= o ? o : Math.max(0, r + o);
                  o < r;
                  o++
                )
                  if (o in n && n[o] === t) return o;
                return -1;
              },
            },
            x
          );
          var _,
            E = s.split;
          2 !== "ab".split(/(?:ab)*/).length ||
          4 !== ".".split(/(.?)(.?)/).length ||
          "t" === "tesst".split(/(s)*/)[1] ||
          4 !== "test".split(/(?:)/, -1).length ||
          "".split(/.?/).length ||
          1 < ".".split(/()()/).length
            ? ((_ = void 0 === /()??/.exec("")[1]),
              (s.split = function (t, e) {
                var n = this;
                if (void 0 === t && 0 === e) return [];
                if ("[object RegExp]" !== f.call(t)) return E.call(this, t, e);
                var r,
                  o,
                  i,
                  s,
                  a = [],
                  l =
                    (t.ignoreCase ? "i" : "") +
                    (t.multiline ? "m" : "") +
                    (t.extended ? "x" : "") +
                    (t.sticky ? "y" : ""),
                  u = 0;
                for (
                  t = new RegExp(t.source, l + "g"),
                    n += "",
                    _ || (r = new RegExp("^" + t.source + "$(?!\\s)", l)),
                    e =
                      void 0 === e
                        ? -1 >>> 0
                        : (function (t) {
                            return t >>> 0;
                          })(e);
                  (o = t.exec(n)) &&
                  !(
                    u < (i = o.index + o[0].length) &&
                    (a.push(n.slice(u, o.index)),
                    !_ &&
                      1 < o.length &&
                      o[0].replace(r, function () {
                        for (var t = 1; t < arguments.length - 2; t++)
                          void 0 === arguments[t] && (o[t] = void 0);
                      }),
                    1 < o.length &&
                      o.index < n.length &&
                      c.push.apply(a, o.slice(1)),
                    (s = o[0].length),
                    (u = i),
                    a.length >= e)
                  );

                )
                  t.lastIndex === o.index && t.lastIndex++;
                return (
                  u === n.length
                    ? (!s && t.test("")) || a.push("")
                    : a.push(n.slice(u)),
                  a.length > e ? a.slice(0, e) : a
                );
              }))
            : "0".split(void 0, 0).length &&
              (s.split = function (t, e) {
                return void 0 === t && 0 === e ? [] : E.call(this, t, e);
              });
          var j = s.substr,
            S = "".substr && "b" !== "0b".substr(-1);
          d(
            s,
            {
              substr: function (t, e) {
                return j.call(
                  this,
                  t < 0 && (t = this.length + t) < 0 ? 0 : t,
                  e
                );
              },
            },
            S
          );
        },
        {},
      ],
      16: [
        function (t, e, n) {
          "use strict";
          e.exports = [
            t("./transport/websocket"),
            t("./transport/xhr-streaming"),
            t("./transport/xdr-streaming"),
            t("./transport/eventsource"),
            t("./transport/lib/iframe-wrap")(t("./transport/eventsource")),
            t("./transport/htmlfile"),
            t("./transport/lib/iframe-wrap")(t("./transport/htmlfile")),
            t("./transport/xhr-polling"),
            t("./transport/xdr-polling"),
            t("./transport/lib/iframe-wrap")(t("./transport/xhr-polling")),
            t("./transport/jsonp-polling"),
          ];
        },
        {
          "./transport/eventsource": 20,
          "./transport/htmlfile": 21,
          "./transport/jsonp-polling": 23,
          "./transport/lib/iframe-wrap": 26,
          "./transport/websocket": 38,
          "./transport/xdr-polling": 39,
          "./transport/xdr-streaming": 40,
          "./transport/xhr-polling": 41,
          "./transport/xhr-streaming": 42,
        },
      ],
      17: [
        function (o, f, t) {
          (function (t) {
            "use strict";
            var i = o("events").EventEmitter,
              e = o("inherits"),
              s = o("../../utils/event"),
              a = o("../../utils/url"),
              l = t.XMLHttpRequest,
              u = function () {};
            function c(t, e, n, r) {
              u(t, e);
              var o = this;
              i.call(this),
                setTimeout(function () {
                  o._start(t, e, n, r);
                }, 0);
            }
            e(c, i),
              (c.prototype._start = function (t, e, n, r) {
                var o = this;
                try {
                  this.xhr = new l();
                } catch (t) {}
                if (!this.xhr)
                  return (
                    u("no xhr"),
                    this.emit("finish", 0, "no xhr support"),
                    void this._cleanup()
                  );
                (e = a.addQuery(e, "t=" + +new Date())),
                  (this.unloadRef = s.unloadAdd(function () {
                    u("unload cleanup"), o._cleanup(!0);
                  }));
                try {
                  this.xhr.open(t, e, !0),
                    this.timeout &&
                      "timeout" in this.xhr &&
                      ((this.xhr.timeout = this.timeout),
                      (this.xhr.ontimeout = function () {
                        u("xhr timeout"),
                          o.emit("finish", 0, ""),
                          o._cleanup(!1);
                      }));
                } catch (t) {
                  return (
                    u("exception", t),
                    this.emit("finish", 0, ""),
                    void this._cleanup(!1)
                  );
                }
                if (
                  ((r && r.noCredentials) ||
                    !c.supportsCORS ||
                    (u("withCredentials"), (this.xhr.withCredentials = !0)),
                  r && r.headers)
                )
                  for (var i in r.headers)
                    this.xhr.setRequestHeader(i, r.headers[i]);
                this.xhr.onreadystatechange = function () {
                  if (o.xhr) {
                    var t,
                      e,
                      n = o.xhr;
                    switch ((u("readyState", n.readyState), n.readyState)) {
                      case 3:
                        try {
                          (e = n.status), (t = n.responseText);
                        } catch (t) {}
                        u("status", e),
                          1223 === e && (e = 204),
                          200 === e &&
                            t &&
                            0 < t.length &&
                            (u("chunk"), o.emit("chunk", e, t));
                        break;
                      case 4:
                        (e = n.status),
                          u("status", e),
                          1223 === e && (e = 204),
                          (12005 !== e && 12029 !== e) || (e = 0),
                          u("finish", e, n.responseText),
                          o.emit("finish", e, n.responseText),
                          o._cleanup(!1);
                    }
                  }
                };
                try {
                  o.xhr.send(n);
                } catch (t) {
                  o.emit("finish", 0, ""), o._cleanup(!1);
                }
              }),
              (c.prototype._cleanup = function (t) {
                if ((u("cleanup"), this.xhr)) {
                  if (
                    (this.removeAllListeners(),
                    s.unloadDel(this.unloadRef),
                    (this.xhr.onreadystatechange = function () {}),
                    this.xhr.ontimeout && (this.xhr.ontimeout = null),
                    t)
                  )
                    try {
                      this.xhr.abort();
                    } catch (t) {}
                  this.unloadRef = this.xhr = null;
                }
              }),
              (c.prototype.close = function () {
                u("close"), this._cleanup(!0);
              }),
              (c.enabled = !!l);
            var n = ["Active"].concat("Object").join("X");
            !c.enabled &&
              n in t &&
              (u("overriding xmlhttprequest"),
              (c.enabled = !!new (l = function () {
                try {
                  return new t[n]("Microsoft.XMLHTTP");
                } catch (t) {
                  return null;
                }
              })()));
            var r = !1;
            try {
              r = "withCredentials" in new l();
            } catch (t) {}
            (c.supportsCORS = r), (f.exports = c);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "../../utils/event": 46,
          "../../utils/url": 52,
          debug: void 0,
          events: 3,
          inherits: 54,
        },
      ],
      18: [
        function (t, e, n) {
          (function (t) {
            e.exports = t.EventSource;
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      19: [
        function (t, n, e) {
          (function (t) {
            "use strict";
            var e = t.WebSocket || t.MozWebSocket;
            n.exports = e
              ? function (t) {
                  return new e(t);
                }
              : void 0;
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      20: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("./lib/ajax-based"),
            i = t("./receiver/eventsource"),
            s = t("./sender/xhr-cors"),
            a = t("eventsource");
          function l(t) {
            if (!l.enabled())
              throw new Error("Transport created when disabled");
            o.call(this, t, "/eventsource", i, s);
          }
          r(l, o),
            (l.enabled = function () {
              return !!a;
            }),
            (l.transportName = "eventsource"),
            (l.roundTrips = 2),
            (e.exports = l);
        },
        {
          "./lib/ajax-based": 24,
          "./receiver/eventsource": 29,
          "./sender/xhr-cors": 35,
          eventsource: 18,
          inherits: 54,
        },
      ],
      21: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("./receiver/htmlfile"),
            i = t("./sender/xhr-local"),
            s = t("./lib/ajax-based");
          function a(t) {
            if (!o.enabled) throw new Error("Transport created when disabled");
            s.call(this, t, "/htmlfile", o, i);
          }
          r(a, s),
            (a.enabled = function (t) {
              return o.enabled && t.sameOrigin;
            }),
            (a.transportName = "htmlfile"),
            (a.roundTrips = 2),
            (e.exports = a);
        },
        {
          "./lib/ajax-based": 24,
          "./receiver/htmlfile": 30,
          "./sender/xhr-local": 37,
          inherits: 54,
        },
      ],
      22: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("json3"),
            i = t("events").EventEmitter,
            s = t("../version"),
            a = t("../utils/url"),
            l = t("../utils/iframe"),
            u = t("../utils/event"),
            c = t("../utils/random"),
            f = function () {};
          function h(t, e, n) {
            if (!h.enabled())
              throw new Error("Transport created when disabled");
            i.call(this);
            var r = this;
            (this.origin = a.getOrigin(n)),
              (this.baseUrl = n),
              (this.transUrl = e),
              (this.transport = t),
              (this.windowId = c.string(8));
            var o = a.addPath(n, "/iframe.html") + "#" + this.windowId;
            f(t, e, o),
              (this.iframeObj = l.createIframe(o, function (t) {
                f("err callback"),
                  r.emit("close", 1006, "Unable to load an iframe (" + t + ")"),
                  r.close();
              })),
              (this.onmessageCallback = this._message.bind(this)),
              u.attachEvent("message", this.onmessageCallback);
          }
          r(h, i),
            (h.prototype.close = function () {
              if ((f("close"), this.removeAllListeners(), this.iframeObj)) {
                u.detachEvent("message", this.onmessageCallback);
                try {
                  this.postMessage("c");
                } catch (t) {}
                this.iframeObj.cleanup(),
                  (this.iframeObj = null),
                  (this.onmessageCallback = this.iframeObj = null);
              }
            }),
            (h.prototype._message = function (e) {
              if (
                (f("message", e.data), a.isOriginEqual(e.origin, this.origin))
              ) {
                var n;
                try {
                  n = o.parse(e.data);
                } catch (t) {
                  return void f("bad json", e.data);
                }
                if (n.windowId === this.windowId)
                  switch (n.type) {
                    case "s":
                      this.iframeObj.loaded(),
                        this.postMessage(
                          "s",
                          o.stringify([
                            s,
                            this.transport,
                            this.transUrl,
                            this.baseUrl,
                          ])
                        );
                      break;
                    case "t":
                      this.emit("message", n.data);
                      break;
                    case "c":
                      var t;
                      try {
                        t = o.parse(n.data);
                      } catch (t) {
                        return void f("bad json", n.data);
                      }
                      this.emit("close", t[0], t[1]), this.close();
                  }
                else f("mismatched window id", n.windowId, this.windowId);
              } else f("not same origin", e.origin, this.origin);
            }),
            (h.prototype.postMessage = function (t, e) {
              f("postMessage", t, e),
                this.iframeObj.post(
                  o.stringify({
                    windowId: this.windowId,
                    type: t,
                    data: e || "",
                  }),
                  this.origin
                );
            }),
            (h.prototype.send = function (t) {
              f("send", t), this.postMessage("m", t);
            }),
            (h.enabled = function () {
              return l.iframeEnabled;
            }),
            (h.transportName = "iframe"),
            (h.roundTrips = 2),
            (e.exports = h);
        },
        {
          "../utils/event": 46,
          "../utils/iframe": 47,
          "../utils/random": 50,
          "../utils/url": 52,
          "../version": 53,
          debug: void 0,
          events: 3,
          inherits: 54,
          json3: 55,
        },
      ],
      23: [
        function (s, a, t) {
          (function (t) {
            "use strict";
            var e = s("inherits"),
              n = s("./lib/sender-receiver"),
              r = s("./receiver/jsonp"),
              o = s("./sender/jsonp");
            function i(t) {
              if (!i.enabled())
                throw new Error("Transport created when disabled");
              n.call(this, t, "/jsonp", o, r);
            }
            e(i, n),
              (i.enabled = function () {
                return !!t.document;
              }),
              (i.transportName = "jsonp-polling"),
              (i.roundTrips = 1),
              (i.needBody = !0),
              (a.exports = i);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "./lib/sender-receiver": 28,
          "./receiver/jsonp": 31,
          "./sender/jsonp": 33,
          inherits: 54,
        },
      ],
      24: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            a = t("../../utils/url"),
            o = t("./sender-receiver"),
            l = function () {};
          function i(t, e, n, r) {
            o.call(
              this,
              t,
              e,
              (function (s) {
                return function (t, e, n) {
                  l("create ajax sender", t, e);
                  var r = {};
                  "string" == typeof e &&
                    (r.headers = { "Content-type": "text/plain" });
                  var o = a.addPath(t, "/xhr_send"),
                    i = new s("POST", o, e, r);
                  return (
                    i.once("finish", function (t) {
                      if ((l("finish", t), (i = null), 200 !== t && 204 !== t))
                        return n(new Error("http status " + t));
                      n();
                    }),
                    function () {
                      l("abort"), i.close(), (i = null);
                      var t = new Error("Aborted");
                      (t.code = 1e3), n(t);
                    }
                  );
                };
              })(r),
              n,
              r
            );
          }
          r(i, o), (e.exports = i);
        },
        {
          "../../utils/url": 52,
          "./sender-receiver": 28,
          debug: void 0,
          inherits: 54,
        },
      ],
      25: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("events").EventEmitter,
            i = function () {};
          function s(t, e) {
            i(t),
              o.call(this),
              (this.sendBuffer = []),
              (this.sender = e),
              (this.url = t);
          }
          r(s, o),
            (s.prototype.send = function (t) {
              i("send", t),
                this.sendBuffer.push(t),
                this.sendStop || this.sendSchedule();
            }),
            (s.prototype.sendScheduleWait = function () {
              i("sendScheduleWait");
              var t,
                e = this;
              (this.sendStop = function () {
                i("sendStop"), (e.sendStop = null), clearTimeout(t);
              }),
                (t = setTimeout(function () {
                  i("timeout"), (e.sendStop = null), e.sendSchedule();
                }, 25));
            }),
            (s.prototype.sendSchedule = function () {
              i("sendSchedule", this.sendBuffer.length);
              var e = this;
              if (0 < this.sendBuffer.length) {
                var t = "[" + this.sendBuffer.join(",") + "]";
                (this.sendStop = this.sender(this.url, t, function (t) {
                  (e.sendStop = null),
                    t
                      ? (i("error", t),
                        e.emit("close", t.code || 1006, "Sending error: " + t),
                        e.close())
                      : e.sendScheduleWait();
                })),
                  (this.sendBuffer = []);
              }
            }),
            (s.prototype._cleanup = function () {
              i("_cleanup"), this.removeAllListeners();
            }),
            (s.prototype.close = function () {
              i("close"),
                this._cleanup(),
                this.sendStop && (this.sendStop(), (this.sendStop = null));
            }),
            (e.exports = s);
        },
        { debug: void 0, events: 3, inherits: 54 },
      ],
      26: [
        function (t, n, e) {
          (function (o) {
            "use strict";
            var e = t("inherits"),
              i = t("../iframe"),
              s = t("../../utils/object");
            n.exports = function (r) {
              function t(t, e) {
                i.call(this, r.transportName, t, e);
              }
              return (
                e(t, i),
                (t.enabled = function (t, e) {
                  if (!o.document) return !1;
                  var n = s.extend({}, e);
                  return (n.sameOrigin = !0), r.enabled(n) && i.enabled();
                }),
                (t.transportName = "iframe-" + r.transportName),
                (t.needBody = !0),
                (t.roundTrips = i.roundTrips + r.roundTrips - 1),
                (t.facadeTransport = r),
                t
              );
            };
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        { "../../utils/object": 49, "../iframe": 22, inherits: 54 },
      ],
      27: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("events").EventEmitter,
            i = function () {};
          function s(t, e, n) {
            i(e),
              o.call(this),
              (this.Receiver = t),
              (this.receiveUrl = e),
              (this.AjaxObject = n),
              this._scheduleReceiver();
          }
          r(s, o),
            (s.prototype._scheduleReceiver = function () {
              i("_scheduleReceiver");
              var n = this,
                r = (this.poll = new this.Receiver(
                  this.receiveUrl,
                  this.AjaxObject
                ));
              r.on("message", function (t) {
                i("message", t), n.emit("message", t);
              }),
                r.once("close", function (t, e) {
                  i("close", t, e, n.pollIsClosing),
                    (n.poll = r = null),
                    n.pollIsClosing ||
                      ("network" === e
                        ? n._scheduleReceiver()
                        : (n.emit("close", t || 1006, e),
                          n.removeAllListeners()));
                });
            }),
            (s.prototype.abort = function () {
              i("abort"),
                this.removeAllListeners(),
                (this.pollIsClosing = !0),
                this.poll && this.poll.abort();
            }),
            (e.exports = s);
        },
        { debug: void 0, events: 3, inherits: 54 },
      ],
      28: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            a = t("../../utils/url"),
            l = t("./buffered-sender"),
            u = t("./polling"),
            c = function () {};
          function o(t, e, n, r, o) {
            var i = a.addPath(t, e);
            c(i);
            var s = this;
            l.call(this, t, n),
              (this.poll = new u(r, i, o)),
              this.poll.on("message", function (t) {
                c("poll message", t), s.emit("message", t);
              }),
              this.poll.once("close", function (t, e) {
                c("poll close", t, e),
                  (s.poll = null),
                  s.emit("close", t, e),
                  s.close();
              });
          }
          r(o, l),
            (o.prototype.close = function () {
              l.prototype.close.call(this),
                c("close"),
                this.removeAllListeners(),
                this.poll && (this.poll.abort(), (this.poll = null));
            }),
            (e.exports = o);
        },
        {
          "../../utils/url": 52,
          "./buffered-sender": 25,
          "./polling": 27,
          debug: void 0,
          inherits: 54,
        },
      ],
      29: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("events").EventEmitter,
            i = t("eventsource"),
            s = function () {};
          function a(t) {
            s(t), o.call(this);
            var n = this,
              r = (this.es = new i(t));
            (r.onmessage = function (t) {
              s("message", t.data), n.emit("message", decodeURI(t.data));
            }),
              (r.onerror = function (t) {
                s("error", r.readyState, t);
                var e = 2 !== r.readyState ? "network" : "permanent";
                n._cleanup(), n._close(e);
              });
          }
          r(a, o),
            (a.prototype.abort = function () {
              s("abort"), this._cleanup(), this._close("user");
            }),
            (a.prototype._cleanup = function () {
              s("cleanup");
              var t = this.es;
              t &&
                ((t.onmessage = t.onerror = null), t.close(), (this.es = null));
            }),
            (a.prototype._close = function (t) {
              s("close", t);
              var e = this;
              setTimeout(function () {
                e.emit("close", null, t), e.removeAllListeners();
              }, 200);
            }),
            (e.exports = a);
        },
        { debug: void 0, events: 3, eventsource: 18, inherits: 54 },
      ],
      30: [
        function (n, c, t) {
          (function (r) {
            "use strict";
            var t = n("inherits"),
              o = n("../../utils/iframe"),
              i = n("../../utils/url"),
              s = n("events").EventEmitter,
              a = n("../../utils/random"),
              l = function () {};
            function u(t) {
              l(t), s.call(this);
              var e = this;
              o.polluteGlobalNamespace(),
                (this.id = "a" + a.string(6)),
                (t = i.addQuery(
                  t,
                  "c=" + decodeURIComponent(o.WPrefix + "." + this.id)
                )),
                l("using htmlfile", u.htmlfileEnabled);
              var n = u.htmlfileEnabled ? o.createHtmlfile : o.createIframe;
              (r[o.WPrefix][this.id] = {
                start: function () {
                  l("start"), e.iframeObj.loaded();
                },
                message: function (t) {
                  l("message", t), e.emit("message", t);
                },
                stop: function () {
                  l("stop"), e._cleanup(), e._close("network");
                },
              }),
                (this.iframeObj = n(t, function () {
                  l("callback"), e._cleanup(), e._close("permanent");
                }));
            }
            t(u, s),
              (u.prototype.abort = function () {
                l("abort"), this._cleanup(), this._close("user");
              }),
              (u.prototype._cleanup = function () {
                l("_cleanup"),
                  this.iframeObj &&
                    (this.iframeObj.cleanup(), (this.iframeObj = null)),
                  delete r[o.WPrefix][this.id];
              }),
              (u.prototype._close = function (t) {
                l("_close", t),
                  this.emit("close", null, t),
                  this.removeAllListeners();
              }),
              (u.htmlfileEnabled = !1);
            var e = ["Active"].concat("Object").join("X");
            if (e in r)
              try {
                u.htmlfileEnabled = !!new r[e]("htmlfile");
              } catch (t) {}
            (u.enabled = u.htmlfileEnabled || o.iframeEnabled), (c.exports = u);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "../../utils/iframe": 47,
          "../../utils/random": 50,
          "../../utils/url": 52,
          debug: void 0,
          events: 3,
          inherits: 54,
        },
      ],
      31: [
        function (e, n, t) {
          (function (i) {
            "use strict";
            var r = e("../../utils/iframe"),
              s = e("../../utils/random"),
              a = e("../../utils/browser"),
              o = e("../../utils/url"),
              t = e("inherits"),
              l = e("events").EventEmitter,
              u = function () {};
            function c(t) {
              u(t);
              var e = this;
              l.call(this),
                r.polluteGlobalNamespace(),
                (this.id = "a" + s.string(6));
              var n = o.addQuery(
                t,
                "c=" + encodeURIComponent(r.WPrefix + "." + this.id)
              );
              (i[r.WPrefix][this.id] = this._callback.bind(this)),
                this._createScript(n),
                (this.timeoutId = setTimeout(function () {
                  u("timeout"),
                    e._abort(
                      new Error("JSONP script loaded abnormally (timeout)")
                    );
                }, c.timeout));
            }
            t(c, l),
              (c.prototype.abort = function () {
                if ((u("abort"), i[r.WPrefix][this.id])) {
                  var t = new Error("JSONP user aborted read");
                  (t.code = 1e3), this._abort(t);
                }
              }),
              (c.timeout = 35e3),
              (c.scriptErrorTimeout = 1e3),
              (c.prototype._callback = function (t) {
                u("_callback", t),
                  this._cleanup(),
                  this.aborting ||
                    (t && (u("message", t), this.emit("message", t)),
                    this.emit("close", null, "network"),
                    this.removeAllListeners());
              }),
              (c.prototype._abort = function (t) {
                u("_abort", t),
                  this._cleanup(),
                  (this.aborting = !0),
                  this.emit("close", t.code, t.message),
                  this.removeAllListeners();
              }),
              (c.prototype._cleanup = function () {
                if (
                  (u("_cleanup"),
                  clearTimeout(this.timeoutId),
                  this.script2 &&
                    (this.script2.parentNode.removeChild(this.script2),
                    (this.script2 = null)),
                  this.script)
                ) {
                  var t = this.script;
                  t.parentNode.removeChild(t),
                    (t.onreadystatechange =
                      t.onerror =
                      t.onload =
                      t.onclick =
                        null),
                    (this.script = null);
                }
                delete i[r.WPrefix][this.id];
              }),
              (c.prototype._scriptError = function () {
                u("_scriptError");
                var t = this;
                this.errorTimer ||
                  (this.errorTimer = setTimeout(function () {
                    t.loadedOkay ||
                      t._abort(
                        new Error("JSONP script loaded abnormally (onerror)")
                      );
                  }, c.scriptErrorTimeout));
              }),
              (c.prototype._createScript = function (t) {
                u("_createScript", t);
                var e,
                  n = this,
                  r = (this.script = i.document.createElement("script"));
                if (
                  ((r.id = "a" + s.string(8)),
                  (r.src = t),
                  (r.type = "text/javascript"),
                  (r.charset = "UTF-8"),
                  (r.onerror = this._scriptError.bind(this)),
                  (r.onload = function () {
                    u("onload"),
                      n._abort(
                        new Error("JSONP script loaded abnormally (onload)")
                      );
                  }),
                  (r.onreadystatechange = function () {
                    if (
                      (u("onreadystatechange", r.readyState),
                      /loaded|closed/.test(r.readyState))
                    ) {
                      if (r && r.htmlFor && r.onclick) {
                        n.loadedOkay = !0;
                        try {
                          r.onclick();
                        } catch (t) {}
                      }
                      r &&
                        n._abort(
                          new Error(
                            "JSONP script loaded abnormally (onreadystatechange)"
                          )
                        );
                    }
                  }),
                  void 0 === r.async && i.document.attachEvent)
                )
                  if (a.isOpera())
                    ((e = this.script2 =
                      i.document.createElement("script")).text =
                      "try{var a = document.getElementById('" +
                      r.id +
                      "'); if(a)a.onerror();}catch(x){};"),
                      (r.async = e.async = !1);
                  else {
                    try {
                      (r.htmlFor = r.id), (r.event = "onclick");
                    } catch (t) {}
                    r.async = !0;
                  }
                void 0 !== r.async && (r.async = !0);
                var o = i.document.getElementsByTagName("head")[0];
                o.insertBefore(r, o.firstChild),
                  e && o.insertBefore(e, o.firstChild);
              }),
              (n.exports = c);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "../../utils/browser": 44,
          "../../utils/iframe": 47,
          "../../utils/random": 50,
          "../../utils/url": 52,
          debug: void 0,
          events: 3,
          inherits: 54,
        },
      ],
      32: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("events").EventEmitter,
            i = function () {};
          function s(t, e) {
            i(t), o.call(this);
            var r = this;
            (this.bufferPosition = 0),
              (this.xo = new e("POST", t, null)),
              this.xo.on("chunk", this._chunkHandler.bind(this)),
              this.xo.once("finish", function (t, e) {
                i("finish", t, e), r._chunkHandler(t, e), (r.xo = null);
                var n = 200 === t ? "network" : "permanent";
                i("close", n), r.emit("close", null, n), r._cleanup();
              });
          }
          r(s, o),
            (s.prototype._chunkHandler = function (t, e) {
              if ((i("_chunkHandler", t), 200 === t && e))
                for (var n = -1; ; this.bufferPosition += n + 1) {
                  var r = e.slice(this.bufferPosition);
                  if (-1 === (n = r.indexOf("\n"))) break;
                  var o = r.slice(0, n);
                  o && (i("message", o), this.emit("message", o));
                }
            }),
            (s.prototype._cleanup = function () {
              i("_cleanup"), this.removeAllListeners();
            }),
            (s.prototype.abort = function () {
              i("abort"),
                this.xo &&
                  (this.xo.close(),
                  i("close"),
                  this.emit("close", null, "user"),
                  (this.xo = null)),
                this._cleanup();
            }),
            (e.exports = s);
        },
        { debug: void 0, events: 3, inherits: 54 },
      ],
      33: [
        function (t, e, n) {
          (function (s) {
            "use strict";
            var a,
              l,
              u = t("../../utils/random"),
              c = t("../../utils/url"),
              f = function () {};
            e.exports = function (t, e, n) {
              f(t, e),
                a ||
                  (f("createForm"),
                  ((a = s.document.createElement("form")).style.display =
                    "none"),
                  (a.style.position = "absolute"),
                  (a.method = "POST"),
                  (a.enctype = "application/x-www-form-urlencoded"),
                  (a.acceptCharset = "UTF-8"),
                  ((l = s.document.createElement("textarea")).name = "d"),
                  a.appendChild(l),
                  s.document.body.appendChild(a));
              var r = "a" + u.string(8);
              (a.target = r),
                (a.action = c.addQuery(c.addPath(t, "/jsonp_send"), "i=" + r));
              var o = (function (e) {
                f("createIframe", e);
                try {
                  return s.document.createElement('<iframe name="' + e + '">');
                } catch (t) {
                  var n = s.document.createElement("iframe");
                  return (n.name = e), n;
                }
              })(r);
              (o.id = r), (o.style.display = "none"), a.appendChild(o);
              try {
                l.value = e;
              } catch (t) {}
              a.submit();
              function i(t) {
                f("completed", r, t),
                  o.onerror &&
                    ((o.onreadystatechange = o.onerror = o.onload = null),
                    setTimeout(function () {
                      f("cleaning up", r),
                        o.parentNode.removeChild(o),
                        (o = null);
                    }, 500),
                    (l.value = ""),
                    n(t));
              }
              return (
                (o.onerror = function () {
                  f("onerror", r), i();
                }),
                (o.onload = function () {
                  f("onload", r), i();
                }),
                (o.onreadystatechange = function (t) {
                  f("onreadystatechange", r, o.readyState, t),
                    "complete" === o.readyState && i();
                }),
                function () {
                  f("aborted", r), i(new Error("Aborted"));
                }
              );
            };
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        { "../../utils/random": 50, "../../utils/url": 52, debug: void 0 },
      ],
      34: [
        function (r, u, t) {
          (function (i) {
            "use strict";
            var o = r("events").EventEmitter,
              t = r("inherits"),
              s = r("../../utils/event"),
              e = r("../../utils/browser"),
              a = r("../../utils/url"),
              l = function () {};
            function n(t, e, n) {
              l(t, e);
              var r = this;
              o.call(this),
                setTimeout(function () {
                  r._start(t, e, n);
                }, 0);
            }
            t(n, o),
              (n.prototype._start = function (t, e, n) {
                l("_start");
                var r = this,
                  o = new i.XDomainRequest();
                (e = a.addQuery(e, "t=" + +new Date())),
                  (o.onerror = function () {
                    l("onerror"), r._error();
                  }),
                  (o.ontimeout = function () {
                    l("ontimeout"), r._error();
                  }),
                  (o.onprogress = function () {
                    l("progress", o.responseText),
                      r.emit("chunk", 200, o.responseText);
                  }),
                  (o.onload = function () {
                    l("load"),
                      r.emit("finish", 200, o.responseText),
                      r._cleanup(!1);
                  }),
                  (this.xdr = o),
                  (this.unloadRef = s.unloadAdd(function () {
                    r._cleanup(!0);
                  }));
                try {
                  this.xdr.open(t, e),
                    this.timeout && (this.xdr.timeout = this.timeout),
                    this.xdr.send(n);
                } catch (t) {
                  this._error();
                }
              }),
              (n.prototype._error = function () {
                this.emit("finish", 0, ""), this._cleanup(!1);
              }),
              (n.prototype._cleanup = function (t) {
                if ((l("cleanup", t), this.xdr)) {
                  if (
                    (this.removeAllListeners(),
                    s.unloadDel(this.unloadRef),
                    (this.xdr.ontimeout =
                      this.xdr.onerror =
                      this.xdr.onprogress =
                      this.xdr.onload =
                        null),
                    t)
                  )
                    try {
                      this.xdr.abort();
                    } catch (t) {}
                  this.unloadRef = this.xdr = null;
                }
              }),
              (n.prototype.close = function () {
                l("close"), this._cleanup(!0);
              }),
              (n.enabled = !(!i.XDomainRequest || !e.hasDomain())),
              (u.exports = n);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "../../utils/browser": 44,
          "../../utils/event": 46,
          "../../utils/url": 52,
          debug: void 0,
          events: 3,
          inherits: 54,
        },
      ],
      35: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("../driver/xhr");
          function i(t, e, n, r) {
            o.call(this, t, e, n, r);
          }
          r(i, o), (i.enabled = o.enabled && o.supportsCORS), (e.exports = i);
        },
        { "../driver/xhr": 17, inherits: 54 },
      ],
      36: [
        function (t, e, n) {
          "use strict";
          var r = t("events").EventEmitter;
          function o() {
            var t = this;
            r.call(this),
              (this.to = setTimeout(function () {
                t.emit("finish", 200, "{}");
              }, o.timeout));
          }
          t("inherits")(o, r),
            (o.prototype.close = function () {
              clearTimeout(this.to);
            }),
            (o.timeout = 2e3),
            (e.exports = o);
        },
        { events: 3, inherits: 54 },
      ],
      37: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("../driver/xhr");
          function i(t, e, n) {
            o.call(this, t, e, n, { noCredentials: !0 });
          }
          r(i, o), (i.enabled = o.enabled), (e.exports = i);
        },
        { "../driver/xhr": 17, inherits: 54 },
      ],
      38: [
        function (t, e, n) {
          "use strict";
          var i = t("../utils/event"),
            s = t("../utils/url"),
            r = t("inherits"),
            a = t("events").EventEmitter,
            l = t("./driver/websocket"),
            u = function () {};
          function c(t, e, n) {
            if (!c.enabled())
              throw new Error("Transport created when disabled");
            a.call(this), u("constructor", t);
            var r = this,
              o = s.addPath(t, "/websocket");
            (o =
              "https" === o.slice(0, 5)
                ? "wss" + o.slice(5)
                : "ws" + o.slice(4)),
              (this.url = o),
              (this.ws = new l(this.url, [], n)),
              (this.ws.onmessage = function (t) {
                u("message event", t.data), r.emit("message", t.data);
              }),
              (this.unloadRef = i.unloadAdd(function () {
                u("unload"), r.ws.close();
              })),
              (this.ws.onclose = function (t) {
                u("close event", t.code, t.reason),
                  r.emit("close", t.code, t.reason),
                  r._cleanup();
              }),
              (this.ws.onerror = function (t) {
                u("error event", t),
                  r.emit("close", 1006, "WebSocket connection broken"),
                  r._cleanup();
              });
          }
          r(c, a),
            (c.prototype.send = function (t) {
              var e = "[" + t + "]";
              u("send", e), this.ws.send(e);
            }),
            (c.prototype.close = function () {
              u("close");
              var t = this.ws;
              this._cleanup(), t && t.close();
            }),
            (c.prototype._cleanup = function () {
              u("_cleanup");
              var t = this.ws;
              t && (t.onmessage = t.onclose = t.onerror = null),
                i.unloadDel(this.unloadRef),
                (this.unloadRef = this.ws = null),
                this.removeAllListeners();
            }),
            (c.enabled = function () {
              return u("enabled"), !!l;
            }),
            (c.transportName = "websocket"),
            (c.roundTrips = 2),
            (e.exports = c);
        },
        {
          "../utils/event": 46,
          "../utils/url": 52,
          "./driver/websocket": 19,
          debug: void 0,
          events: 3,
          inherits: 54,
        },
      ],
      39: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("./lib/ajax-based"),
            i = t("./xdr-streaming"),
            s = t("./receiver/xhr"),
            a = t("./sender/xdr");
          function l(t) {
            if (!a.enabled) throw new Error("Transport created when disabled");
            o.call(this, t, "/xhr", s, a);
          }
          r(l, o),
            (l.enabled = i.enabled),
            (l.transportName = "xdr-polling"),
            (l.roundTrips = 2),
            (e.exports = l);
        },
        {
          "./lib/ajax-based": 24,
          "./receiver/xhr": 32,
          "./sender/xdr": 34,
          "./xdr-streaming": 40,
          inherits: 54,
        },
      ],
      40: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("./lib/ajax-based"),
            i = t("./receiver/xhr"),
            s = t("./sender/xdr");
          function a(t) {
            if (!s.enabled) throw new Error("Transport created when disabled");
            o.call(this, t, "/xhr_streaming", i, s);
          }
          r(a, o),
            (a.enabled = function (t) {
              return (
                !t.cookie_needed && !t.nullOrigin && s.enabled && t.sameScheme
              );
            }),
            (a.transportName = "xdr-streaming"),
            (a.roundTrips = 2),
            (e.exports = a);
        },
        {
          "./lib/ajax-based": 24,
          "./receiver/xhr": 32,
          "./sender/xdr": 34,
          inherits: 54,
        },
      ],
      41: [
        function (t, e, n) {
          "use strict";
          var r = t("inherits"),
            o = t("./lib/ajax-based"),
            i = t("./receiver/xhr"),
            s = t("./sender/xhr-cors"),
            a = t("./sender/xhr-local");
          function l(t) {
            if (!a.enabled && !s.enabled)
              throw new Error("Transport created when disabled");
            o.call(this, t, "/xhr", i, s);
          }
          r(l, o),
            (l.enabled = function (t) {
              return (
                !t.nullOrigin && (!(!a.enabled || !t.sameOrigin) || s.enabled)
              );
            }),
            (l.transportName = "xhr-polling"),
            (l.roundTrips = 2),
            (e.exports = l);
        },
        {
          "./lib/ajax-based": 24,
          "./receiver/xhr": 32,
          "./sender/xhr-cors": 35,
          "./sender/xhr-local": 37,
          inherits: 54,
        },
      ],
      42: [
        function (l, u, t) {
          (function (t) {
            "use strict";
            var e = l("inherits"),
              n = l("./lib/ajax-based"),
              r = l("./receiver/xhr"),
              o = l("./sender/xhr-cors"),
              i = l("./sender/xhr-local"),
              s = l("../utils/browser");
            function a(t) {
              if (!i.enabled && !o.enabled)
                throw new Error("Transport created when disabled");
              n.call(this, t, "/xhr_streaming", r, o);
            }
            e(a, n),
              (a.enabled = function (t) {
                return !t.nullOrigin && !s.isOpera() && o.enabled;
              }),
              (a.transportName = "xhr-streaming"),
              (a.roundTrips = 2),
              (a.needBody = !!t.document),
              (u.exports = a);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "../utils/browser": 44,
          "./lib/ajax-based": 24,
          "./receiver/xhr": 32,
          "./sender/xhr-cors": 35,
          "./sender/xhr-local": 37,
          inherits: 54,
        },
      ],
      43: [
        function (t, e, n) {
          (function (n) {
            "use strict";
            n.crypto && n.crypto.getRandomValues
              ? (e.exports.randomBytes = function (t) {
                  var e = new Uint8Array(t);
                  return n.crypto.getRandomValues(e), e;
                })
              : (e.exports.randomBytes = function (t) {
                  for (var e = new Array(t), n = 0; n < t; n++)
                    e[n] = Math.floor(256 * Math.random());
                  return e;
                });
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      44: [
        function (t, e, n) {
          (function (t) {
            "use strict";
            e.exports = {
              isOpera: function () {
                return t.navigator && /opera/i.test(t.navigator.userAgent);
              },
              isKonqueror: function () {
                return t.navigator && /konqueror/i.test(t.navigator.userAgent);
              },
              hasDomain: function () {
                if (!t.document) return !0;
                try {
                  return !!t.document.domain;
                } catch (t) {
                  return !1;
                }
              },
            };
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      45: [
        function (t, e, n) {
          "use strict";
          var r,
            o = t("json3"),
            i =
              /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g;
          e.exports = {
            quote: function (t) {
              var e = o.stringify(t);
              return (
                (i.lastIndex = 0),
                i.test(e)
                  ? ((r =
                      r ||
                      (function (t) {
                        var e,
                          n = {},
                          r = [];
                        for (e = 0; e < 65536; e++)
                          r.push(String.fromCharCode(e));
                        return (
                          (t.lastIndex = 0),
                          r.join("").replace(t, function (t) {
                            return (
                              (n[t] =
                                "\\u" +
                                ("0000" + t.charCodeAt(0).toString(16)).slice(
                                  -4
                                )),
                              ""
                            );
                          }),
                          (t.lastIndex = 0),
                          n
                        );
                      })(i)),
                    e.replace(i, function (t) {
                      return r[t];
                    }))
                  : e
              );
            },
          };
        },
        { json3: 55 },
      ],
      46: [
        function (t, e, n) {
          (function (n) {
            "use strict";
            var r = t("./random"),
              o = {},
              i = !1,
              s = n.chrome && n.chrome.app && n.chrome.app.runtime;
            e.exports = {
              attachEvent: function (t, e) {
                void 0 !== n.addEventListener
                  ? n.addEventListener(t, e, !1)
                  : n.document &&
                    n.attachEvent &&
                    (n.document.attachEvent("on" + t, e),
                    n.attachEvent("on" + t, e));
              },
              detachEvent: function (t, e) {
                void 0 !== n.addEventListener
                  ? n.removeEventListener(t, e, !1)
                  : n.document &&
                    n.detachEvent &&
                    (n.document.detachEvent("on" + t, e),
                    n.detachEvent("on" + t, e));
              },
              unloadAdd: function (t) {
                if (s) return null;
                var e = r.string(8);
                return (
                  (o[e] = t), i && setTimeout(this.triggerUnloadCallbacks, 0), e
                );
              },
              unloadDel: function (t) {
                t in o && delete o[t];
              },
              triggerUnloadCallbacks: function () {
                for (var t in o) o[t](), delete o[t];
              },
            };
            s ||
              e.exports.attachEvent("unload", function () {
                i || ((i = !0), e.exports.triggerUnloadCallbacks());
              });
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        { "./random": 50 },
      ],
      47: [
        function (e, p, t) {
          (function (f) {
            "use strict";
            var h = e("./event"),
              n = e("json3"),
              t = e("./browser"),
              d = function () {};
            (p.exports = {
              WPrefix: "_jp",
              currentWindowId: null,
              polluteGlobalNamespace: function () {
                p.exports.WPrefix in f || (f[p.exports.WPrefix] = {});
              },
              postMessage: function (t, e) {
                f.parent !== f
                  ? f.parent.postMessage(
                      n.stringify({
                        windowId: p.exports.currentWindowId,
                        type: t,
                        data: e || "",
                      }),
                      "*"
                    )
                  : d("Cannot postMessage, no parent window.", t, e);
              },
              createIframe: function (t, e) {
                function n() {
                  d("unattach"), clearTimeout(i);
                  try {
                    a.onload = null;
                  } catch (t) {}
                  a.onerror = null;
                }
                function r() {
                  d("cleanup"),
                    a &&
                      (n(),
                      setTimeout(function () {
                        a && a.parentNode.removeChild(a), (a = null);
                      }, 0),
                      h.unloadDel(s));
                }
                function o(t) {
                  d("onerror", t), a && (r(), e(t));
                }
                var i,
                  s,
                  a = f.document.createElement("iframe");
                return (
                  (a.src = t),
                  (a.style.display = "none"),
                  (a.style.position = "absolute"),
                  (a.onerror = function () {
                    o("onerror");
                  }),
                  (a.onload = function () {
                    d("onload"),
                      clearTimeout(i),
                      (i = setTimeout(function () {
                        o("onload timeout");
                      }, 2e3));
                  }),
                  f.document.body.appendChild(a),
                  (i = setTimeout(function () {
                    o("timeout");
                  }, 15e3)),
                  (s = h.unloadAdd(r)),
                  {
                    post: function (t, e) {
                      d("post", t, e),
                        setTimeout(function () {
                          try {
                            a &&
                              a.contentWindow &&
                              a.contentWindow.postMessage(t, e);
                          } catch (t) {}
                        }, 0);
                    },
                    cleanup: r,
                    loaded: n,
                  }
                );
              },
              createHtmlfile: function (t, e) {
                function n() {
                  clearTimeout(i), (a.onerror = null);
                }
                function r() {
                  u &&
                    (n(),
                    h.unloadDel(s),
                    a.parentNode.removeChild(a),
                    (a = u = null),
                    CollectGarbage());
                }
                function o(t) {
                  d("onerror", t), u && (r(), e(t));
                }
                var i,
                  s,
                  a,
                  l = ["Active"].concat("Object").join("X"),
                  u = new f[l]("htmlfile");
                u.open(),
                  u.write(
                    '<html><script>document.domain="' +
                      f.document.domain +
                      '";</script></html>'
                  ),
                  u.close(),
                  (u.parentWindow[p.exports.WPrefix] = f[p.exports.WPrefix]);
                var c = u.createElement("div");
                return (
                  u.body.appendChild(c),
                  (a = u.createElement("iframe")),
                  c.appendChild(a),
                  (a.src = t),
                  (a.onerror = function () {
                    o("onerror");
                  }),
                  (i = setTimeout(function () {
                    o("timeout");
                  }, 15e3)),
                  (s = h.unloadAdd(r)),
                  {
                    post: function (t, e) {
                      try {
                        setTimeout(function () {
                          a &&
                            a.contentWindow &&
                            a.contentWindow.postMessage(t, e);
                        }, 0);
                      } catch (t) {}
                    },
                    cleanup: r,
                    loaded: n,
                  }
                );
              },
            }),
              (p.exports.iframeEnabled = !1),
              f.document &&
                (p.exports.iframeEnabled =
                  ("function" == typeof f.postMessage ||
                    "object" == typeof f.postMessage) &&
                  !t.isKonqueror());
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        { "./browser": 44, "./event": 46, debug: void 0, json3: 55 },
      ],
      48: [
        function (t, e, n) {
          (function (n) {
            "use strict";
            var r = {};
            ["log", "debug", "warn"].forEach(function (t) {
              var e;
              try {
                e = n.console && n.console[t] && n.console[t].apply;
              } catch (t) {}
              r[t] = e
                ? function () {
                    return n.console[t].apply(n.console, arguments);
                  }
                : "log" === t
                ? function () {}
                : r.log;
            }),
              (e.exports = r);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      49: [
        function (t, e, n) {
          "use strict";
          e.exports = {
            isObject: function (t) {
              var e = typeof t;
              return "function" == e || ("object" == e && !!t);
            },
            extend: function (t) {
              if (!this.isObject(t)) return t;
              for (var e, n, r = 1, o = arguments.length; r < o; r++)
                for (n in (e = arguments[r]))
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              return t;
            },
          };
        },
        {},
      ],
      50: [
        function (t, e, n) {
          "use strict";
          var i = t("crypto"),
            s = "abcdefghijklmnopqrstuvwxyz012345";
          e.exports = {
            string: function (t) {
              for (
                var e = s.length, n = i.randomBytes(t), r = [], o = 0;
                o < t;
                o++
              )
                r.push(s.substr(n[o] % e, 1));
              return r.join("");
            },
            number: function (t) {
              return Math.floor(Math.random() * t);
            },
            numberString: function (t) {
              var e = ("" + (t - 1)).length;
              return (new Array(e + 1).join("0") + this.number(t)).slice(-e);
            },
          };
        },
        { crypto: 43 },
      ],
      51: [
        function (t, e, n) {
          "use strict";
          var o = function () {};
          e.exports = function (t) {
            return {
              filterToEnabled: function (e, n) {
                var r = { main: [], facade: [] };
                return (
                  e ? "string" == typeof e && (e = [e]) : (e = []),
                  t.forEach(function (t) {
                    t &&
                      ("websocket" !== t.transportName || !1 !== n.websocket
                        ? e.length && -1 === e.indexOf(t.transportName)
                          ? o("not in whitelist", t.transportName)
                          : t.enabled(n)
                          ? (o("enabled", t.transportName),
                            r.main.push(t),
                            t.facadeTransport &&
                              r.facade.push(t.facadeTransport))
                          : o("disabled", t.transportName)
                        : o("disabled from server", "websocket"));
                  }),
                  r
                );
              },
            };
          };
        },
        { debug: void 0 },
      ],
      52: [
        function (t, e, n) {
          "use strict";
          var r = t("url-parse"),
            o = function () {};
          e.exports = {
            getOrigin: function (t) {
              if (!t) return null;
              var e = new r(t);
              if ("file:" === e.protocol) return null;
              var n = e.port;
              return (
                (n = n || ("https:" === e.protocol ? "443" : "80")),
                e.protocol + "//" + e.hostname + ":" + n
              );
            },
            isOriginEqual: function (t, e) {
              var n = this.getOrigin(t) === this.getOrigin(e);
              return o("same", t, e, n), n;
            },
            isSchemeEqual: function (t, e) {
              return t.split(":")[0] === e.split(":")[0];
            },
            addPath: function (t, e) {
              var n = t.split("?");
              return n[0] + e + (n[1] ? "?" + n[1] : "");
            },
            addQuery: function (t, e) {
              return t + (-1 === t.indexOf("?") ? "?" + e : "&" + e);
            },
            isLoopbackAddr: function (t) {
              return (
                /^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(t) ||
                /^\[::1\]$/.test(t)
              );
            },
          };
        },
        { debug: void 0, "url-parse": 58 },
      ],
      53: [
        function (t, e, n) {
          e.exports = "1.5.2";
        },
        {},
      ],
      54: [
        function (t, e, n) {
          "function" == typeof Object.create
            ? (e.exports = function (t, e) {
                e &&
                  ((t.super_ = e),
                  (t.prototype = Object.create(e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })));
              })
            : (e.exports = function (t, e) {
                if (e) {
                  t.super_ = e;
                  function n() {}
                  (n.prototype = e.prototype),
                    (t.prototype = new n()),
                    (t.prototype.constructor = t);
                }
              });
        },
        {},
      ],
      55: [
        function (t, a, l) {
          (function (s) {
            (function () {
              var J = { function: !0, object: !0 },
                t = J[typeof l] && l && !l.nodeType && l,
                B = (J[typeof window] && window) || this,
                e =
                  t &&
                  J[typeof a] &&
                  a &&
                  !a.nodeType &&
                  "object" == typeof s &&
                  s;
              function F(t, l) {
                (t = t || B.Object()), (l = l || B.Object());
                var u = t.Number || B.Number,
                  c = t.String || B.String,
                  e = t.Object || B.Object,
                  v = t.Date || B.Date,
                  n = t.SyntaxError || B.SyntaxError,
                  b = t.TypeError || B.TypeError,
                  d = t.Math || B.Math,
                  r = t.JSON || B.JSON;
                "object" == typeof r &&
                  r &&
                  ((l.stringify = r.stringify), (l.parse = r.parse));
                var y,
                  o = e.prototype,
                  g = o.toString,
                  a = o.hasOwnProperty;
                function w(t, e) {
                  try {
                    t();
                  } catch (t) {
                    e && e();
                  }
                }
                var p = new v(-0xc782b5b800cec);
                function f(t) {
                  if (null != f[t]) return f[t];
                  var e;
                  if ("bug-string-char-index" == t) e = "a" != "a"[0];
                  else if ("json" == t)
                    e =
                      f("json-stringify") &&
                      f("date-serialization") &&
                      f("json-parse");
                  else if ("date-serialization" == t) {
                    if ((e = f("json-stringify") && p)) {
                      var n = l.stringify;
                      w(function () {
                        e =
                          '"-271821-04-20T00:00:00.000Z"' ==
                            n(new v(-864e13)) &&
                          '"+275760-09-13T00:00:00.000Z"' == n(new v(864e13)) &&
                          '"-000001-01-01T00:00:00.000Z"' ==
                            n(new v(-621987552e5)) &&
                          '"1969-12-31T23:59:59.999Z"' == n(new v(-1));
                      });
                    }
                  } else {
                    var r,
                      o = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                    if ("json-stringify" == t) {
                      var i = "function" == typeof (n = l.stringify);
                      i &&
                        (((r = function () {
                          return 1;
                        }).toJSON = r),
                        w(
                          function () {
                            i =
                              "0" === n(0) &&
                              "0" === n(new u()) &&
                              '""' == n(new c()) &&
                              n(g) === y &&
                              n(y) === y &&
                              n() === y &&
                              "1" === n(r) &&
                              "[1]" == n([r]) &&
                              "[null]" == n([y]) &&
                              "null" == n(null) &&
                              "[null,null,null]" == n([y, g, null]) &&
                              n({ a: [r, !0, !1, null, "\0\b\n\f\r\t"] }) ==
                                o &&
                              "1" === n(null, r) &&
                              "[\n 1,\n 2\n]" == n([1, 2], null, 1);
                          },
                          function () {
                            i = !1;
                          }
                        )),
                        (e = i);
                    }
                    if ("json-parse" == t) {
                      var s,
                        a = l.parse;
                      "function" == typeof a &&
                        w(
                          function () {
                            0 !== a("0") ||
                              a(!1) ||
                              ((r = a(o)),
                              (s = 5 == r.a.length && 1 === r.a[0]) &&
                                (w(function () {
                                  s = !a('"\t"');
                                }),
                                s &&
                                  w(function () {
                                    s = 1 !== a("01");
                                  }),
                                s &&
                                  w(function () {
                                    s = 1 !== a("1.");
                                  })));
                          },
                          function () {
                            s = !1;
                          }
                        ),
                        (e = s);
                    }
                  }
                  return (f[t] = !!e);
                }
                if (
                  (w(function () {
                    p =
                      -109252 == p.getUTCFullYear() &&
                      0 === p.getUTCMonth() &&
                      1 === p.getUTCDate() &&
                      10 == p.getUTCHours() &&
                      37 == p.getUTCMinutes() &&
                      6 == p.getUTCSeconds() &&
                      708 == p.getUTCMilliseconds();
                  }),
                  (f["bug-string-char-index"] =
                    f["date-serialization"] =
                    f.json =
                    f["json-stringify"] =
                    f["json-parse"] =
                      null),
                  !f("json"))
                ) {
                  var h = "[object Function]",
                    x = "[object Number]",
                    _ = "[object String]",
                    E = "[object Array]",
                    m = f("bug-string-char-index"),
                    j = function (t, e) {
                      var n,
                        s,
                        r,
                        o = 0;
                      for (r in (((n = function () {
                        this.valueOf = 0;
                      }).prototype.valueOf = 0),
                      (s = new n())))
                        a.call(s, r) && o++;
                      return (
                        (n = s = null),
                        (j = o
                          ? function (t, e) {
                              var n,
                                r,
                                o = g.call(t) == h;
                              for (n in t)
                                (o && "prototype" == n) ||
                                  !a.call(t, n) ||
                                  (r = "constructor" === n) ||
                                  e(n);
                              (r || a.call(t, (n = "constructor"))) && e(n);
                            }
                          : ((s = [
                              "valueOf",
                              "toString",
                              "toLocaleString",
                              "propertyIsEnumerable",
                              "isPrototypeOf",
                              "hasOwnProperty",
                              "constructor",
                            ]),
                            function (t, e) {
                              var n,
                                r,
                                o = g.call(t) == h,
                                i =
                                  (!o &&
                                    "function" != typeof t.constructor &&
                                    J[typeof t.hasOwnProperty] &&
                                    t.hasOwnProperty) ||
                                  a;
                              for (n in t)
                                (o && "prototype" == n) ||
                                  !i.call(t, n) ||
                                  e(n);
                              for (r = s.length; (n = s[--r]); )
                                i.call(t, n) && e(n);
                            }))(t, e)
                      );
                    };
                  if (!f("json-stringify") && !f("date-serialization")) {
                    function S(t, e) {
                      return ("000000" + (e || 0)).slice(-t);
                    }
                    var i = {
                        92: "\\\\",
                        34: '\\"',
                        8: "\\b",
                        12: "\\f",
                        10: "\\n",
                        13: "\\r",
                        9: "\\t",
                      },
                      T = function (t) {
                        var e, n, r, o, i, s, a, l, u;
                        if (p)
                          e = function (t) {
                            (n = t.getUTCFullYear()),
                              (r = t.getUTCMonth()),
                              (o = t.getUTCDate()),
                              (s = t.getUTCHours()),
                              (a = t.getUTCMinutes()),
                              (l = t.getUTCSeconds()),
                              (u = t.getUTCMilliseconds());
                          };
                        else {
                          function c(t, e) {
                            return (
                              h[e] +
                              365 * (t - 1970) +
                              f((t - 1969 + (e = +(1 < e))) / 4) -
                              f((t - 1901 + e) / 100) +
                              f((t - 1601 + e) / 400)
                            );
                          }
                          var f = d.floor,
                            h = [
                              0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304,
                              334,
                            ];
                          e = function (t) {
                            for (
                              o = f(t / 864e5), n = f(o / 365.2425) + 1970 - 1;
                              c(n + 1, 0) <= o;
                              n++
                            );
                            for (
                              r = f((o - c(n, 0)) / 30.42);
                              c(n, r + 1) <= o;
                              r++
                            );
                            (o = 1 + o - c(n, r)),
                              (s =
                                f((i = ((t % 864e5) + 864e5) % 864e5) / 36e5) %
                                24),
                              (a = f(i / 6e4) % 60),
                              (l = f(i / 1e3) % 60),
                              (u = i % 1e3);
                          };
                        }
                        return (T = function (t) {
                          return (
                            -1 / 0 < t && t < 1 / 0
                              ? (e(t),
                                (t =
                                  (n <= 0 || 1e4 <= n
                                    ? (n < 0 ? "-" : "+") + S(6, n < 0 ? -n : n)
                                    : S(4, n)) +
                                  "-" +
                                  S(2, r + 1) +
                                  "-" +
                                  S(2, o) +
                                  "T" +
                                  S(2, s) +
                                  ":" +
                                  S(2, a) +
                                  ":" +
                                  S(2, l) +
                                  "." +
                                  S(3, u) +
                                  "Z"),
                                (n = r = o = s = a = l = u = null))
                              : (t = null),
                            t
                          );
                        })(t);
                      };
                    if (f("json-stringify") && !f("date-serialization")) {
                      function s(t) {
                        return T(this);
                      }
                      var O = l.stringify;
                      l.stringify = function (t, e, n) {
                        var r = v.prototype.toJSON;
                        v.prototype.toJSON = s;
                        var o = O(t, e, n);
                        return (v.prototype.toJSON = r), o;
                      };
                    } else {
                      function C(t) {
                        var e = t.charCodeAt(0),
                          n = i[e];
                        return n || "\\u00" + S(2, e.toString(16));
                      }
                      function A(t) {
                        return (
                          (N.lastIndex = 0),
                          '"' + (N.test(t) ? t.replace(N, C) : t) + '"'
                        );
                      }
                      var N = /[\x00-\x1f\x22\x5c]/g,
                        k = function (t, e, n, r, o, i, s) {
                          var a, l, u, c, f, h, d, p, m;
                          if (
                            (w(function () {
                              a = e[t];
                            }),
                            "object" == typeof a &&
                              a &&
                              (a.getUTCFullYear &&
                              "[object Date]" == g.call(a) &&
                              a.toJSON === v.prototype.toJSON
                                ? (a = T(a))
                                : "function" == typeof a.toJSON &&
                                  (a = a.toJSON(t))),
                            n && (a = n.call(e, t, a)),
                            a == y)
                          )
                            return a === y ? a : "null";
                          switch (
                            ("object" == (l = typeof a) && (u = g.call(a)),
                            u || l)
                          ) {
                            case "boolean":
                            case "[object Boolean]":
                              return "" + a;
                            case "number":
                            case x:
                              return -1 / 0 < a && a < 1 / 0 ? "" + a : "null";
                            case "string":
                            case _:
                              return A("" + a);
                          }
                          if ("object" == typeof a) {
                            for (d = s.length; d--; ) if (s[d] === a) throw b();
                            if (
                              (s.push(a), (c = []), (p = i), (i += o), u == E)
                            ) {
                              for (h = 0, d = a.length; h < d; h++)
                                (f = k(h, a, n, r, o, i, s)),
                                  c.push(f === y ? "null" : f);
                              m = c.length
                                ? o
                                  ? "[\n" +
                                    i +
                                    c.join(",\n" + i) +
                                    "\n" +
                                    p +
                                    "]"
                                  : "[" + c.join(",") + "]"
                                : "[]";
                            } else
                              j(r || a, function (t) {
                                var e = k(t, a, n, r, o, i, s);
                                e !== y &&
                                  c.push(A(t) + ":" + (o ? " " : "") + e);
                              }),
                                (m = c.length
                                  ? o
                                    ? "{\n" +
                                      i +
                                      c.join(",\n" + i) +
                                      "\n" +
                                      p +
                                      "}"
                                    : "{" + c.join(",") + "}"
                                  : "{}");
                            return s.pop(), m;
                          }
                        };
                      l.stringify = function (t, e, n) {
                        var r, o, i, s;
                        if (J[typeof e] && e)
                          if ((s = g.call(e)) == h) o = e;
                          else if (s == E) {
                            i = {};
                            for (var a, l = 0, u = e.length; l < u; )
                              (a = e[l++]),
                                ("[object String]" != (s = g.call(a)) &&
                                  "[object Number]" != s) ||
                                  (i[a] = 1);
                          }
                        if (n)
                          if ((s = g.call(n)) == x) {
                            if (0 < (n -= n % 1))
                              for (10 < n && (n = 10), r = ""; r.length < n; )
                                r += " ";
                          } else
                            s == _ && (r = n.length <= 10 ? n : n.slice(0, 10));
                        return k("", (((a = {})[""] = t), a), o, i, r, "", []);
                      };
                    }
                  }
                  if (!f("json-parse")) {
                    function I() {
                      throw ((R = U = null), n());
                    }
                    function L() {
                      for (var t, e, n, r, o, i = U, s = i.length; R < s; )
                        switch ((o = i.charCodeAt(R))) {
                          case 9:
                          case 10:
                          case 13:
                          case 32:
                            R++;
                            break;
                          case 123:
                          case 125:
                          case 91:
                          case 93:
                          case 58:
                          case 44:
                            return (t = m ? i.charAt(R) : i[R]), R++, t;
                          case 34:
                            for (t = "@", R++; R < s; )
                              if ((o = i.charCodeAt(R)) < 32) I();
                              else if (92 == o)
                                switch ((o = i.charCodeAt(++R))) {
                                  case 92:
                                  case 34:
                                  case 47:
                                  case 98:
                                  case 116:
                                  case 110:
                                  case 102:
                                  case 114:
                                    (t += q[o]), R++;
                                    break;
                                  case 117:
                                    for (e = ++R, n = R + 4; R < n; R++)
                                      (48 <= (o = i.charCodeAt(R)) &&
                                        o <= 57) ||
                                        (97 <= o && o <= 102) ||
                                        (65 <= o && o <= 70) ||
                                        I();
                                    t += M("0x" + i.slice(e, R));
                                    break;
                                  default:
                                    I();
                                }
                              else {
                                if (34 == o) break;
                                for (
                                  o = i.charCodeAt(R), e = R;
                                  32 <= o && 92 != o && 34 != o;

                                )
                                  o = i.charCodeAt(++R);
                                t += i.slice(e, R);
                              }
                            if (34 == i.charCodeAt(R)) return R++, t;
                            I();
                          default:
                            if (
                              ((e = R),
                              45 == o && ((r = !0), (o = i.charCodeAt(++R))),
                              48 <= o && o <= 57)
                            ) {
                              for (
                                48 == o &&
                                  48 <= (o = i.charCodeAt(R + 1)) &&
                                  o <= 57 &&
                                  I(),
                                  r = !1;
                                R < s && 48 <= (o = i.charCodeAt(R)) && o <= 57;
                                R++
                              );
                              if (46 == i.charCodeAt(R)) {
                                for (
                                  n = ++R;
                                  n < s &&
                                  !((o = i.charCodeAt(n)) < 48 || 57 < o);
                                  n++
                                );
                                n == R && I(), (R = n);
                              }
                              if (101 == (o = i.charCodeAt(R)) || 69 == o) {
                                for (
                                  (43 != (o = i.charCodeAt(++R)) && 45 != o) ||
                                    R++,
                                    n = R;
                                  n < s &&
                                  !((o = i.charCodeAt(n)) < 48 || 57 < o);
                                  n++
                                );
                                n == R && I(), (R = n);
                              }
                              return +i.slice(e, R);
                            }
                            r && I();
                            var a = i.slice(R, R + 4);
                            if ("true" == a) return (R += 4), !0;
                            if ("fals" == a && 101 == i.charCodeAt(R + 4))
                              return (R += 5), !1;
                            if ("null" == a) return (R += 4), null;
                            I();
                        }
                      return "$";
                    }
                    function P(t, e, n) {
                      var r = W(t, e, n);
                      r === y ? delete t[e] : (t[e] = r);
                    }
                    var R,
                      U,
                      M = c.fromCharCode,
                      q = {
                        92: "\\",
                        34: '"',
                        47: "/",
                        98: "\b",
                        116: "\t",
                        110: "\n",
                        102: "\f",
                        114: "\r",
                      },
                      D = function (t) {
                        var e, n;
                        if (("$" == t && I(), "string" == typeof t)) {
                          if ("@" == (m ? t.charAt(0) : t[0]))
                            return t.slice(1);
                          if ("[" == t) {
                            for (e = []; "]" != (t = L()); )
                              n
                                ? "," == t
                                  ? "]" == (t = L()) && I()
                                  : I()
                                : (n = !0),
                                "," == t && I(),
                                e.push(D(t));
                            return e;
                          }
                          if ("{" == t) {
                            for (e = {}; "}" != (t = L()); )
                              n
                                ? "," == t
                                  ? "}" == (t = L()) && I()
                                  : I()
                                : (n = !0),
                                ("," != t &&
                                  "string" == typeof t &&
                                  "@" == (m ? t.charAt(0) : t[0]) &&
                                  ":" == L()) ||
                                  I(),
                                (e[t.slice(1)] = D(L()));
                            return e;
                          }
                          I();
                        }
                        return t;
                      },
                      W = function (t, e, n) {
                        var r,
                          o = t[e];
                        if ("object" == typeof o && o)
                          if (g.call(o) == E)
                            for (r = o.length; r--; ) P(g, j, o);
                          else
                            j(o, function (t) {
                              P(o, t, n);
                            });
                        return n.call(t, e, o);
                      };
                    l.parse = function (t, e) {
                      var n, r;
                      return (
                        (R = 0),
                        (U = "" + t),
                        (n = D(L())),
                        "$" != L() && I(),
                        (R = U = null),
                        e && g.call(e) == h
                          ? W((((r = {})[""] = n), r), "", e)
                          : n
                      );
                    };
                  }
                }
                return (l.runInContext = F), l;
              }
              if (
                (!e ||
                  (e.global !== e && e.window !== e && e.self !== e) ||
                  (B = e),
                t)
              )
                F(B, t);
              else {
                var n = B.JSON,
                  r = B.JSON3,
                  o = !1,
                  i = F(
                    B,
                    (B.JSON3 = {
                      noConflict: function () {
                        return (
                          o ||
                            ((o = !0),
                            (B.JSON = n),
                            (B.JSON3 = r),
                            (n = r = null)),
                          i
                        );
                      },
                    })
                  );
                B.JSON = { parse: i.parse, stringify: i.stringify };
              }
            }.call(this));
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      56: [
        function (t, e, n) {
          "use strict";
          var i = Object.prototype.hasOwnProperty;
          function s(t) {
            try {
              return decodeURIComponent(t.replace(/\+/g, " "));
            } catch (t) {
              return null;
            }
          }
          (n.stringify = function (t, e) {
            e = e || "";
            var n,
              r,
              o = [];
            for (r in ("string" != typeof e && (e = "?"), t))
              if (i.call(t, r)) {
                if (
                  ((n = t[r]) || (null != n && !isNaN(n)) || (n = ""),
                  (r = encodeURIComponent(r)),
                  (n = encodeURIComponent(n)),
                  null === r || null === n)
                )
                  continue;
                o.push(r + "=" + n);
              }
            return o.length ? e + o.join("&") : "";
          }),
            (n.parse = function (t) {
              for (
                var e, n = /([^=?&]+)=?([^&]*)/g, r = {};
                (e = n.exec(t));

              ) {
                var o = s(e[1]),
                  i = s(e[2]);
                null === o || null === i || o in r || (r[o] = i);
              }
              return r;
            });
        },
        {},
      ],
      57: [
        function (t, e, n) {
          "use strict";
          e.exports = function (t, e) {
            if (((e = e.split(":")[0]), !(t = +t))) return !1;
            switch (e) {
              case "http":
              case "ws":
                return 80 !== t;
              case "https":
              case "wss":
                return 443 !== t;
              case "ftp":
                return 21 !== t;
              case "gopher":
                return 70 !== t;
              case "file":
                return !1;
            }
            return 0 !== t;
          };
        },
        {},
      ],
      58: [
        function (t, n, e) {
          (function (i) {
            "use strict";
            var d = t("requires-port"),
              p = t("querystringify"),
              s = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
              l = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,
              m = /^[a-zA-Z]:/,
              e = new RegExp(
                "^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+"
              );
            function v(t) {
              return (t || "").toString().replace(e, "");
            }
            var b = [
                ["#", "hash"],
                ["?", "query"],
                function (t, e) {
                  return g(e.protocol) ? t.replace(/\\/g, "/") : t;
                },
                ["/", "pathname"],
                ["@", "auth", 1],
                [NaN, "host", void 0, 1, 1],
                [/:(\d+)$/, "port", void 0, 1],
                [NaN, "hostname", void 0, 1, 1],
              ],
              a = { hash: 1, query: 1 };
            function y(t) {
              var e,
                n =
                  ("undefined" != typeof window
                    ? window
                    : void 0 !== i
                    ? i
                    : "undefined" != typeof self
                    ? self
                    : {}
                  ).location || {},
                r = {},
                o = typeof (t = t || n);
              if ("blob:" === t.protocol) r = new x(unescape(t.pathname), {});
              else if ("string" == o)
                for (e in ((r = new x(t, {})), a)) delete r[e];
              else if ("object" == o) {
                for (e in t) e in a || (r[e] = t[e]);
                void 0 === r.slashes && (r.slashes = s.test(t.href));
              }
              return r;
            }
            function g(t) {
              return (
                "file:" === t ||
                "ftp:" === t ||
                "http:" === t ||
                "https:" === t ||
                "ws:" === t ||
                "wss:" === t
              );
            }
            function w(t, e) {
              (t = v(t)), (e = e || {});
              var n,
                r = l.exec(t),
                o = r[1] ? r[1].toLowerCase() : "",
                i = !!r[2],
                s = !!r[3],
                a = 0;
              return (
                i
                  ? (a = s
                      ? ((n = r[2] + r[3] + r[4]), r[2].length + r[3].length)
                      : ((n = r[2] + r[4]), r[2].length))
                  : s
                  ? ((n = r[3] + r[4]), (a = r[3].length))
                  : (n = r[4]),
                "file:" === o
                  ? 2 <= a && (n = n.slice(2))
                  : g(o)
                  ? (n = r[4])
                  : o
                  ? i && (n = n.slice(2))
                  : 2 <= a && g(e.protocol) && (n = r[4]),
                { protocol: o, slashes: i || g(o), slashesCount: a, rest: n }
              );
            }
            function x(t, e, n) {
              if (((t = v(t)), !(this instanceof x))) return new x(t, e, n);
              var r,
                o,
                i,
                s,
                a,
                l,
                u = b.slice(),
                c = typeof e,
                f = this,
                h = 0;
              for (
                "object" != c && "string" != c && ((n = e), (e = null)),
                  n && "function" != typeof n && (n = p.parse),
                  r = !(o = w(t || "", (e = y(e)))).protocol && !o.slashes,
                  f.slashes = o.slashes || (r && e.slashes),
                  f.protocol = o.protocol || e.protocol || "",
                  t = o.rest,
                  (("file:" === o.protocol &&
                    (2 !== o.slashesCount || m.test(t))) ||
                    (!o.slashes &&
                      (o.protocol || o.slashesCount < 2 || !g(f.protocol)))) &&
                    (u[3] = [/(.*)/, "pathname"]);
                h < u.length;
                h++
              )
                "function" != typeof (s = u[h])
                  ? ((i = s[0]),
                    (l = s[1]),
                    i != i
                      ? (f[l] = t)
                      : "string" == typeof i
                      ? ~(a = t.indexOf(i)) &&
                        (t =
                          "number" == typeof s[2]
                            ? ((f[l] = t.slice(0, a)), t.slice(a + s[2]))
                            : ((f[l] = t.slice(a)), t.slice(0, a)))
                      : (a = i.exec(t)) &&
                        ((f[l] = a[1]), (t = t.slice(0, a.index))),
                    (f[l] = f[l] || (r && s[3] && e[l]) || ""),
                    s[4] && (f[l] = f[l].toLowerCase()))
                  : (t = s(t, f));
              n && (f.query = n(f.query)),
                r &&
                  e.slashes &&
                  "/" !== f.pathname.charAt(0) &&
                  ("" !== f.pathname || "" !== e.pathname) &&
                  (f.pathname = (function (t, e) {
                    if ("" === t) return e;
                    for (
                      var n = (e || "/")
                          .split("/")
                          .slice(0, -1)
                          .concat(t.split("/")),
                        r = n.length,
                        o = n[r - 1],
                        i = !1,
                        s = 0;
                      r--;

                    )
                      "." === n[r]
                        ? n.splice(r, 1)
                        : ".." === n[r]
                        ? (n.splice(r, 1), s++)
                        : s && (0 === r && (i = !0), n.splice(r, 1), s--);
                    return (
                      i && n.unshift(""),
                      ("." !== o && ".." !== o) || n.push(""),
                      n.join("/")
                    );
                  })(f.pathname, e.pathname)),
                "/" !== f.pathname.charAt(0) &&
                  g(f.protocol) &&
                  (f.pathname = "/" + f.pathname),
                d(f.port, f.protocol) || ((f.host = f.hostname), (f.port = "")),
                (f.username = f.password = ""),
                f.auth &&
                  ((s = f.auth.split(":")),
                  (f.username = s[0] || ""),
                  (f.password = s[1] || "")),
                (f.origin =
                  "file:" !== f.protocol && g(f.protocol) && f.host
                    ? f.protocol + "//" + f.host
                    : "null"),
                (f.href = f.toString());
            }
            (x.prototype = {
              set: function (t, e, n) {
                var r = this;
                switch (t) {
                  case "query":
                    "string" == typeof e && e.length && (e = (n || p.parse)(e)),
                      (r[t] = e);
                    break;
                  case "port":
                    (r[t] = e),
                      d(e, r.protocol)
                        ? e && (r.host = r.hostname + ":" + e)
                        : ((r.host = r.hostname), (r[t] = ""));
                    break;
                  case "hostname":
                    (r[t] = e), r.port && (e += ":" + r.port), (r.host = e);
                    break;
                  case "host":
                    (r[t] = e),
                      /:\d+$/.test(e)
                        ? ((e = e.split(":")),
                          (r.port = e.pop()),
                          (r.hostname = e.join(":")))
                        : ((r.hostname = e), (r.port = ""));
                    break;
                  case "protocol":
                    (r.protocol = e.toLowerCase()), (r.slashes = !n);
                    break;
                  case "pathname":
                  case "hash":
                    if (e) {
                      var o = "pathname" === t ? "/" : "#";
                      r[t] = e.charAt(0) !== o ? o + e : e;
                    } else r[t] = e;
                    break;
                  default:
                    r[t] = e;
                }
                for (var i = 0; i < b.length; i++) {
                  var s = b[i];
                  s[4] && (r[s[1]] = r[s[1]].toLowerCase());
                }
                return (
                  (r.origin =
                    "file:" !== r.protocol && g(r.protocol) && r.host
                      ? r.protocol + "//" + r.host
                      : "null"),
                  (r.href = r.toString()),
                  r
                );
              },
              toString: function (t) {
                (t && "function" == typeof t) || (t = p.stringify);
                var e,
                  n = this,
                  r = n.protocol;
                r && ":" !== r.charAt(r.length - 1) && (r += ":");
                var o = r + (n.slashes || g(n.protocol) ? "//" : "");
                return (
                  n.username &&
                    ((o += n.username),
                    n.password && (o += ":" + n.password),
                    (o += "@")),
                  (o += n.host + n.pathname),
                  (e = "object" == typeof n.query ? t(n.query) : n.query) &&
                    (o += "?" !== e.charAt(0) ? "?" + e : e),
                  n.hash && (o += n.hash),
                  o
                );
              },
            }),
              (x.extractProtocol = w),
              (x.location = y),
              (x.trimLeft = v),
              (x.qs = p),
              (n.exports = x);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        { querystringify: 56, "requires-port": 57 },
      ],
    },
    {},
    [1]
  )(1);
});
(function () {
  var t,
    e,
    n,
    i,
    r = {}.hasOwnProperty,
    o = [].slice;
  t = { LF: "\n", NULL: "\x00" };
  n = (function () {
    var e;
    function n(t, e, n) {
      this.command = t;
      this.headers = e != null ? e : {};
      this.body = n != null ? n : "";
    }
    n.prototype.toString = function () {
      var e, i, o, s, u;
      e = [this.command];
      o = this.headers["content-length"] === false ? true : false;
      if (o) {
        delete this.headers["content-length"];
      }
      u = this.headers;
      for (i in u) {
        if (!r.call(u, i)) continue;
        s = u[i];
        e.push("" + i + ":" + s);
      }
      if (this.body && !o) {
        e.push("content-length:" + n.sizeOfUTF8(this.body));
      }
      e.push(t.LF + this.body);
      return e.join(t.LF);
    };
    n.sizeOfUTF8 = function (t) {
      if (t) {
        return encodeURI(t).match(/%..|./g).length;
      } else {
        return 0;
      }
    };
    e = function (e) {
      var i, r, o, s, u, a, c, f, h, l, p, d, g, b, m, v, y;
      s = e.search(RegExp("" + t.LF + t.LF));
      u = e.substring(0, s).split(t.LF);
      o = u.shift();
      a = {};
      d = function (t) {
        return t.replace(/^\s+|\s+$/g, "");
      };
      v = u.reverse();
      for (g = 0, m = v.length; g < m; g++) {
        l = v[g];
        f = l.indexOf(":");
        a[d(l.substring(0, f))] = d(l.substring(f + 1));
      }
      i = "";
      p = s + 2;
      if (a["content-length"]) {
        h = parseInt(a["content-length"]);
        i = ("" + e).substring(p, p + h);
      } else {
        r = null;
        for (
          c = b = p, y = e.length;
          p <= y ? b < y : b > y;
          c = p <= y ? ++b : --b
        ) {
          r = e.charAt(c);
          if (r === t.NULL) {
            break;
          }
          i += r;
        }
      }
      return new n(o, a, i);
    };
    n.unmarshall = function (n) {
      var i;
      return (function () {
        var r, o, s, u;
        s = n.split(RegExp("" + t.NULL + t.LF + "*"));
        u = [];
        for (r = 0, o = s.length; r < o; r++) {
          i = s[r];
          if ((i != null ? i.length : void 0) > 0) {
            u.push(e(i));
          }
        }
        return u;
      })();
    };
    n.marshall = function (e, i, r) {
      var o;
      o = new n(e, i, r);
      return o.toString() + t.NULL;
    };
    return n;
  })();
  e = (function () {
    var e;
    function r(t) {
      this.ws = t;
      this.ws.binaryType = "arraybuffer";
      this.counter = 0;
      this.connected = false;
      this.heartbeat = { outgoing: 1e4, incoming: 1e4 };
      this.maxWebSocketFrameSize = 16 * 1024;
      this.subscriptions = {};
    }
    r.prototype.debug = function (t) {
      var e;
      return typeof window !== "undefined" && window !== null
        ? (e = window.console) != null
          ? e.log(t)
          : void 0
        : void 0;
    };
    e = function () {
      if (Date.now) {
        return Date.now();
      } else {
        return new Date().valueOf;
      }
    };
    r.prototype._transmit = function (t, e, i) {
      var r;
      r = n.marshall(t, e, i);
      if (typeof this.debug === "function") {
        this.debug(">>> " + r);
      }
      while (true) {
        if (r.length > this.maxWebSocketFrameSize) {
          this.ws.send(r.substring(0, this.maxWebSocketFrameSize));
          r = r.substring(this.maxWebSocketFrameSize);
          if (typeof this.debug === "function") {
            this.debug("remaining = " + r.length);
          }
        } else {
          return this.ws.send(r);
        }
      }
    };
    r.prototype._setupHeartbeat = function (n) {
      var r, o, s, u, a, c;
      if ((a = n.version) !== i.VERSIONS.V1_1 && a !== i.VERSIONS.V1_2) {
        return;
      }
      (c = (function () {
        var t, e, i, r;
        i = n["heart-beat"].split(",");
        r = [];
        for (t = 0, e = i.length; t < e; t++) {
          u = i[t];
          r.push(parseInt(u));
        }
        return r;
      })()),
        (o = c[0]),
        (r = c[1]);
      if (!(this.heartbeat.outgoing === 0 || r === 0)) {
        s = Math.max(this.heartbeat.outgoing, r);
        if (typeof this.debug === "function") {
          this.debug("send PING every " + s + "ms");
        }
        this.pinger = i.setInterval(
          s,
          (function (e) {
            return function () {
              e.ws.send(t.LF);
              return typeof e.debug === "function"
                ? e.debug(">>> PING")
                : void 0;
            };
          })(this)
        );
      }
      if (!(this.heartbeat.incoming === 0 || o === 0)) {
        s = Math.max(this.heartbeat.incoming, o);
        if (typeof this.debug === "function") {
          this.debug("check PONG every " + s + "ms");
        }
        return (this.ponger = i.setInterval(
          s,
          (function (t) {
            return function () {
              var n;
              n = e() - t.serverActivity;
              if (n > s * 2) {
                if (typeof t.debug === "function") {
                  t.debug(
                    "did not receive server activity for the last " + n + "ms"
                  );
                }
                return t.ws.close();
              }
            };
          })(this)
        ));
      }
    };
    r.prototype._parseConnect = function () {
      var t, e, n, i;
      t = 1 <= arguments.length ? o.call(arguments, 0) : [];
      i = {};
      switch (t.length) {
        case 2:
          (i = t[0]), (e = t[1]);
          break;
        case 3:
          if (t[1] instanceof Function) {
            (i = t[0]), (e = t[1]), (n = t[2]);
          } else {
            (i.login = t[0]), (i.passcode = t[1]), (e = t[2]);
          }
          break;
        case 4:
          (i.login = t[0]), (i.passcode = t[1]), (e = t[2]), (n = t[3]);
          break;
        default:
          (i.login = t[0]),
            (i.passcode = t[1]),
            (e = t[2]),
            (n = t[3]),
            (i.host = t[4]);
      }
      return [i, e, n];
    };
    r.prototype.connect = function () {
      var r, s, u, a;
      r = 1 <= arguments.length ? o.call(arguments, 0) : [];
      a = this._parseConnect.apply(this, r);
      (u = a[0]), (this.connectCallback = a[1]), (s = a[2]);
      if (typeof this.debug === "function") {
        this.debug("Opening Web Socket...");
      }
      this.ws.onmessage = (function (i) {
        return function (r) {
          var o, u, a, c, f, h, l, p, d, g, b, m;
          c =
            typeof ArrayBuffer !== "undefined" && r.data instanceof ArrayBuffer
              ? ((o = new Uint8Array(r.data)),
                typeof i.debug === "function"
                  ? i.debug("--- got data length: " + o.length)
                  : void 0,
                (function () {
                  var t, e, n;
                  n = [];
                  for (t = 0, e = o.length; t < e; t++) {
                    u = o[t];
                    n.push(String.fromCharCode(u));
                  }
                  return n;
                })().join(""))
              : r.data;
          i.serverActivity = e();
          if (c === t.LF) {
            if (typeof i.debug === "function") {
              i.debug("<<< PONG");
            }
            return;
          }
          if (typeof i.debug === "function") {
            i.debug("<<< " + c);
          }
          b = n.unmarshall(c);
          m = [];
          for (d = 0, g = b.length; d < g; d++) {
            f = b[d];
            switch (f.command) {
              case "CONNECTED":
                if (typeof i.debug === "function") {
                  i.debug("connected to server " + f.headers.server);
                }
                i.connected = true;
                i._setupHeartbeat(f.headers);
                m.push(
                  typeof i.connectCallback === "function"
                    ? i.connectCallback(f)
                    : void 0
                );
                break;
              case "MESSAGE":
                p = f.headers.subscription;
                l = i.subscriptions[p] || i.onreceive;
                if (l) {
                  a = i;
                  h = f.headers["message-id"];
                  f.ack = function (t) {
                    if (t == null) {
                      t = {};
                    }
                    return a.ack(h, p, t);
                  };
                  f.nack = function (t) {
                    if (t == null) {
                      t = {};
                    }
                    return a.nack(h, p, t);
                  };
                  m.push(l(f));
                } else {
                  m.push(
                    typeof i.debug === "function"
                      ? i.debug("Unhandled received MESSAGE: " + f)
                      : void 0
                  );
                }
                break;
              case "RECEIPT":
                m.push(
                  typeof i.onreceipt === "function" ? i.onreceipt(f) : void 0
                );
                break;
              case "ERROR":
                m.push(typeof s === "function" ? s(f) : void 0);
                break;
              default:
                m.push(
                  typeof i.debug === "function"
                    ? i.debug("Unhandled frame: " + f)
                    : void 0
                );
            }
          }
          return m;
        };
      })(this);
      this.ws.onclose = (function (t) {
        return function () {
          var e;
          e = "Whoops! Lost connection to " + t.ws.url;
          if (typeof t.debug === "function") {
            t.debug(e);
          }
          t._cleanUp();
          return typeof s === "function" ? s(e) : void 0;
        };
      })(this);
      return (this.ws.onopen = (function (t) {
        return function () {
          if (typeof t.debug === "function") {
            t.debug("Web Socket Opened...");
          }
          u["accept-version"] = i.VERSIONS.supportedVersions();
          u["heart-beat"] = [t.heartbeat.outgoing, t.heartbeat.incoming].join(
            ","
          );
          return t._transmit("CONNECT", u);
        };
      })(this));
    };
    r.prototype.disconnect = function (t, e) {
      if (e == null) {
        e = {};
      }
      this._transmit("DISCONNECT", e);
      this.ws.onclose = null;
      this.ws.close();
      this._cleanUp();
      return typeof t === "function" ? t() : void 0;
    };
    r.prototype._cleanUp = function () {
      this.connected = false;
      if (this.pinger) {
        i.clearInterval(this.pinger);
      }
      if (this.ponger) {
        return i.clearInterval(this.ponger);
      }
    };
    r.prototype.send = function (t, e, n) {
      if (e == null) {
        e = {};
      }
      if (n == null) {
        n = "";
      }
      e.destination = t;
      return this._transmit("SEND", e, n);
    };
    r.prototype.subscribe = function (t, e, n) {
      var i;
      if (n == null) {
        n = {};
      }
      if (!n.id) {
        n.id = "sub-" + this.counter++;
      }
      n.destination = t;
      this.subscriptions[n.id] = e;
      this._transmit("SUBSCRIBE", n);
      i = this;
      return {
        id: n.id,
        unsubscribe: function () {
          return i.unsubscribe(n.id);
        },
      };
    };
    r.prototype.unsubscribe = function (t) {
      delete this.subscriptions[t];
      return this._transmit("UNSUBSCRIBE", { id: t });
    };
    r.prototype.begin = function (t) {
      var e, n;
      n = t || "tx-" + this.counter++;
      this._transmit("BEGIN", { transaction: n });
      e = this;
      return {
        id: n,
        commit: function () {
          return e.commit(n);
        },
        abort: function () {
          return e.abort(n);
        },
      };
    };
    r.prototype.commit = function (t) {
      return this._transmit("COMMIT", { transaction: t });
    };
    r.prototype.abort = function (t) {
      return this._transmit("ABORT", { transaction: t });
    };
    r.prototype.ack = function (t, e, n) {
      if (n == null) {
        n = {};
      }
      n["message-id"] = t;
      n.subscription = e;
      return this._transmit("ACK", n);
    };
    r.prototype.nack = function (t, e, n) {
      if (n == null) {
        n = {};
      }
      n["message-id"] = t;
      n.subscription = e;
      return this._transmit("NACK", n);
    };
    return r;
  })();
  i = {
    VERSIONS: {
      V1_0: "1.0",
      V1_1: "1.1",
      V1_2: "1.2",
      supportedVersions: function () {
        return "1.1,1.0";
      },
    },
    client: function (t, n) {
      var r, o;
      if (n == null) {
        n = ["v10.stomp", "v11.stomp"];
      }
      r = i.WebSocketClass || WebSocket;
      o = new r(t, n);
      return new e(o);
    },
    over: function (t) {
      return new e(t);
    },
    Frame: n,
  };
  if (typeof exports !== "undefined" && exports !== null) {
    exports.Stomp = i;
  }
  if (typeof window !== "undefined" && window !== null) {
    i.setInterval = function (t, e) {
      return window.setInterval(e, t);
    };
    i.clearInterval = function (t) {
      return window.clearInterval(t);
    };
    window.Stomp = i;
  } else if (!exports) {
    self.Stomp = i;
  }
}.call(this));

!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.axios = e())
    : (t.axios = e());
})(this, function () {
  return (function (t) {
    var e = {};
    function r(n) {
      if (e[n]) return e[n].exports;
      var o = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    return (
      (r.m = t),
      (r.c = e),
      (r.d = function (t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (r.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (r.t = function (t, e) {
        if ((1 & e && (t = r(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (r.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var o in t)
            r.d(
              n,
              o,
              function (e) {
                return t[e];
              }.bind(null, o)
            );
        return n;
      }),
      (r.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return r.d(e, "a", e), e;
      }),
      (r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (r.p = ""),
      r((r.s = 12))
    );
  })([
    function (t, e, r) {
      "use strict";
      var n = r(4),
        o = Object.prototype.toString;
      function s(t) {
        return Array.isArray(t);
      }
      function i(t) {
        return void 0 === t;
      }
      function a(t) {
        return "[object ArrayBuffer]" === o.call(t);
      }
      function u(t) {
        return null !== t && "object" == typeof t;
      }
      function c(t) {
        if ("[object Object]" !== o.call(t)) return !1;
        var e = Object.getPrototypeOf(t);
        return null === e || e === Object.prototype;
      }
      function h(t) {
        return "[object Function]" === o.call(t);
      }
      function f(t, e) {
        if (null != t)
          if (("object" != typeof t && (t = [t]), s(t)))
            for (var r = 0, n = t.length; r < n; r++) e.call(null, t[r], r, t);
          else
            for (var o in t)
              Object.prototype.hasOwnProperty.call(t, o) &&
                e.call(null, t[o], o, t);
      }
      t.exports = {
        supportedProtocols: ["http:", "https:", "file:"],
        getProtocol: function (t) {
          return t || "http:";
        },
        isArray: s,
        isArrayBuffer: a,
        isBuffer: function (t) {
          return (
            null !== t &&
            !i(t) &&
            null !== t.constructor &&
            !i(t.constructor) &&
            "function" == typeof t.constructor.isBuffer &&
            t.constructor.isBuffer(t)
          );
        },
        isFormData: function (t) {
          return "[object FormData]" === o.call(t);
        },
        isArrayBufferView: function (t) {
          return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
            ? ArrayBuffer.isView(t)
            : t && t.buffer && a(t.buffer);
        },
        isString: function (t) {
          return "string" == typeof t;
        },
        isNumber: function (t) {
          return "number" == typeof t;
        },
        isObject: u,
        isPlainObject: c,
        isUndefined: i,
        isDate: function (t) {
          return "[object Date]" === o.call(t);
        },
        isFile: function (t) {
          return "[object File]" === o.call(t);
        },
        isBlob: function (t) {
          return "[object Blob]" === o.call(t);
        },
        isFunction: h,
        isStream: function (t) {
          return u(t) && h(t.pipe);
        },
        isURLSearchParams: function (t) {
          return "[object URLSearchParams]" === o.call(t);
        },
        isStandardBrowserEnv: function () {
          return (
            ("undefined" == typeof navigator ||
              ("ReactNative" !== navigator.product &&
                "NativeScript" !== navigator.product &&
                "NS" !== navigator.product)) &&
            "undefined" != typeof window &&
            "undefined" != typeof document
          );
        },
        forEach: f,
        merge: function t() {
          var e = {};
          function r(r, n) {
            c(e[n]) && c(r)
              ? (e[n] = t(e[n], r))
              : c(r)
              ? (e[n] = t({}, r))
              : s(r)
              ? (e[n] = r.slice())
              : (e[n] = r);
          }
          for (var n = 0, o = arguments.length; n < o; n++) f(arguments[n], r);
          return e;
        },
        extend: function (t, e, r) {
          return (
            f(e, function (e, o) {
              t[o] = r && "function" == typeof e ? n(e, r) : e;
            }),
            t
          );
        },
        trim: function (t) {
          return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
        },
        stripBOM: function (t) {
          return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t;
        },
        inherits: function (t, e, r, n) {
          (t.prototype = Object.create(e.prototype, n)),
            (t.prototype.constructor = t),
            r && Object.assign(t.prototype, r);
        },
        toFlatObject: function (t, e, r) {
          var n,
            o,
            s,
            i = {};
          e = e || {};
          do {
            for (o = (n = Object.getOwnPropertyNames(t)).length; o-- > 0; )
              i[(s = n[o])] || ((e[s] = t[s]), (i[s] = !0));
            t = Object.getPrototypeOf(t);
          } while (t && (!r || r(t, e)) && t !== Object.prototype);
          return e;
        },
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(0);
      function o(t, e, r, n, o) {
        Error.call(this),
          (this.message = t),
          (this.name = "AxiosError"),
          e && (this.code = e),
          r && (this.config = r),
          n && (this.request = n),
          o && (this.response = o);
      }
      n.inherits(o, Error, {
        toJSON: function () {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code,
            status:
              this.response && this.response.status
                ? this.response.status
                : null,
          };
        },
      });
      var s = o.prototype,
        i = {};
      [
        "ERR_BAD_OPTION_VALUE",
        "ERR_BAD_OPTION",
        "ECONNABORTED",
        "ETIMEDOUT",
        "ERR_NETWORK",
        "ERR_FR_TOO_MANY_REDIRECTS",
        "ERR_DEPRECATED",
        "ERR_BAD_RESPONSE",
        "ERR_BAD_REQUEST",
        "ERR_CANCELED",
      ].forEach(function (t) {
        i[t] = { value: t };
      }),
        Object.defineProperties(o, i),
        Object.defineProperty(s, "isAxiosError", { value: !0 }),
        (o.from = function (t, e, r, i, a, u) {
          var c = Object.create(s);
          return (
            n.toFlatObject(t, c, function (t) {
              return t !== Error.prototype;
            }),
            o.call(c, t.message, e, r, i, a),
            (c.name = t.name),
            u && Object.assign(c, u),
            c
          );
        }),
        (t.exports = o);
    },
    function (t, e, r) {
      "use strict";
      var n = r(1);
      function o(t) {
        n.call(this, null == t ? "canceled" : t, n.ERR_CANCELED),
          (this.name = "CanceledError");
      }
      r(0).inherits(o, n, { __CANCEL__: !0 }), (t.exports = o);
    },
    function (t, e, r) {
      "use strict";
      var n = r(0),
        o = r(18),
        s = r(1),
        i = r(6),
        a = { "Content-Type": "application/x-www-form-urlencoded" };
      function u(t, e) {
        !n.isUndefined(t) &&
          n.isUndefined(t["Content-Type"]) &&
          (t["Content-Type"] = e);
      }
      var c,
        h = {
          transitional: i,
          adapter:
            (("undefined" != typeof XMLHttpRequest ||
              ("undefined" != typeof process &&
                "[object process]" ===
                  Object.prototype.toString.call(process))) &&
              (c = r(7)),
            c),
          transformRequest: [
            function (t, e) {
              return (
                o(e, "Accept"),
                o(e, "Content-Type"),
                n.isFormData(t) ||
                n.isArrayBuffer(t) ||
                n.isBuffer(t) ||
                n.isStream(t) ||
                n.isFile(t) ||
                n.isBlob(t)
                  ? t
                  : n.isArrayBufferView(t)
                  ? t.buffer
                  : n.isURLSearchParams(t)
                  ? (u(e, "application/x-www-form-urlencoded;charset=utf-8"),
                    t.toString())
                  : n.isObject(t) ||
                    (e && "application/json" === e["Content-Type"])
                  ? (u(e, "application/json"),
                    (function (t, e, r) {
                      if (n.isString(t))
                        try {
                          return (e || JSON.parse)(t), n.trim(t);
                        } catch (t) {
                          if ("SyntaxError" !== t.name) throw t;
                        }
                      return (r || JSON.stringify)(t);
                    })(t))
                  : t
              );
            },
          ],
          transformResponse: [
            function (t) {
              var e = this.transitional || h.transitional,
                r = e && e.silentJSONParsing,
                o = e && e.forcedJSONParsing,
                i = !r && "json" === this.responseType;
              if (i || (o && n.isString(t) && t.length))
                try {
                  return JSON.parse(t);
                } catch (t) {
                  if (i) {
                    if ("SyntaxError" === t.name)
                      throw s.from(
                        t,
                        s.ERR_BAD_RESPONSE,
                        this,
                        null,
                        this.response
                      );
                    throw t;
                  }
                }
              return t;
            },
          ],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          maxBodyLength: -1,
          validateStatus: function (t) {
            return t >= 200 && t < 300;
          },
          headers: { common: { Accept: "application/json, text/plain, */*" } },
        };
      n.forEach(["delete", "get", "head"], function (t) {
        h.headers[t] = {};
      }),
        n.forEach(["post", "put", "patch"], function (t) {
          h.headers[t] = n.merge(a);
        }),
        (t.exports = h);
    },
    function (t, e, r) {
      "use strict";
      t.exports = function (t, e) {
        return function () {
          for (var r = new Array(arguments.length), n = 0; n < r.length; n++)
            r[n] = arguments[n];
          return t.apply(e, r);
        };
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(0);
      function o(t) {
        return encodeURIComponent(t)
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",")
          .replace(/%20/g, "+")
          .replace(/%5B/gi, "[")
          .replace(/%5D/gi, "]");
      }
      t.exports = function (t, e, r) {
        if (!e) return t;
        var s;
        if (r) s = r(e);
        else if (n.isURLSearchParams(e)) s = e.toString();
        else {
          var i = [];
          n.forEach(e, function (t, e) {
            null != t &&
              (n.isArray(t) ? (e += "[]") : (t = [t]),
              n.forEach(t, function (t) {
                n.isDate(t)
                  ? (t = t.toISOString())
                  : n.isObject(t) && (t = JSON.stringify(t)),
                  i.push(o(e) + "=" + o(t));
              }));
          }),
            (s = i.join("&"));
        }
        if (s) {
          var a = t.indexOf("#");
          -1 !== a && (t = t.slice(0, a)),
            (t += (-1 === t.indexOf("?") ? "?" : "&") + s);
        }
        return t;
      };
    },
    function (t, e, r) {
      "use strict";
      t.exports = {
        silentJSONParsing: !0,
        forcedJSONParsing: !0,
        clarifyTimeoutError: !1,
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(0),
        o = r(19),
        s = r(20),
        i = r(5),
        a = r(8),
        u = r(23),
        c = r(24),
        h = r(25),
        f = r(6),
        l = r(1),
        p = r(2);
      t.exports = function (t) {
        return new Promise(function (e, r) {
          var d,
            m = t.data,
            v = t.headers,
            y = t.responseType;
          function g() {
            t.cancelToken && t.cancelToken.unsubscribe(d),
              t.signal && t.signal.removeEventListener("abort", d);
          }
          n.isFormData(m) && delete v["Content-Type"];
          var b = new XMLHttpRequest();
          if (t.auth) {
            var O = t.auth.username || "",
              E = t.auth.password
                ? unescape(encodeURIComponent(t.auth.password))
                : "";
            v.Authorization = "Basic " + btoa(O + ":" + E);
          }
          var x = a(t.baseURL, t.url),
            w = h.parse(x),
            j = n.getProtocol(w.protocol);
          function R() {
            if (b) {
              var n =
                  "getAllResponseHeaders" in b
                    ? u(b.getAllResponseHeaders())
                    : null,
                s = {
                  data:
                    y && "text" !== y && "json" !== y
                      ? b.response
                      : b.responseText,
                  status: b.status,
                  statusText: b.statusText,
                  headers: n,
                  config: t,
                  request: b,
                };
              o(
                function (t) {
                  e(t), g();
                },
                function (t) {
                  r(t), g();
                },
                s
              ),
                (b = null);
            }
          }
          if (
            (b.open(
              t.method.toUpperCase(),
              i(x, t.params, t.paramsSerializer),
              !0
            ),
            (b.timeout = t.timeout),
            "onloadend" in b
              ? (b.onloadend = R)
              : (b.onreadystatechange = function () {
                  b &&
                    4 === b.readyState &&
                    (0 !== b.status ||
                      (b.responseURL &&
                        0 === b.responseURL.indexOf("file:"))) &&
                    setTimeout(R);
                }),
            (b.onabort = function () {
              b &&
                (r(new l("Request aborted", l.ECONNABORTED, t, b)), (b = null));
            }),
            (b.onerror = function () {
              r(new l("Network Error", l.ERR_NETWORK, t, b, b)), (b = null);
            }),
            (b.ontimeout = function () {
              var e = t.timeout
                  ? "timeout of " + t.timeout + "ms exceeded"
                  : "timeout exceeded",
                n = t.transitional || f;
              t.timeoutErrorMessage && (e = t.timeoutErrorMessage),
                r(
                  new l(
                    e,
                    n.clarifyTimeoutError ? l.ETIMEDOUT : l.ECONNABORTED,
                    t,
                    b
                  )
                ),
                (b = null);
            }),
            n.isStandardBrowserEnv())
          ) {
            var A =
              (t.withCredentials || c(x)) && t.xsrfCookieName
                ? s.read(t.xsrfCookieName)
                : void 0;
            A && (v[t.xsrfHeaderName] = A);
          }
          "setRequestHeader" in b &&
            n.forEach(v, function (t, e) {
              void 0 === m && "content-type" === e.toLowerCase()
                ? delete v[e]
                : b.setRequestHeader(e, t);
            }),
            n.isUndefined(t.withCredentials) ||
              (b.withCredentials = !!t.withCredentials),
            y && "json" !== y && (b.responseType = t.responseType),
            "function" == typeof t.onDownloadProgress &&
              b.addEventListener("progress", t.onDownloadProgress),
            "function" == typeof t.onUploadProgress &&
              b.upload &&
              b.upload.addEventListener("progress", t.onUploadProgress),
            (t.cancelToken || t.signal) &&
              ((d = function (t) {
                b &&
                  (r(!t || (t && t.type) ? new p() : t), b.abort(), (b = null));
              }),
              t.cancelToken && t.cancelToken.subscribe(d),
              t.signal &&
                (t.signal.aborted
                  ? d()
                  : t.signal.addEventListener("abort", d))),
            m || (m = null),
            null !== w.path
              ? n.supportedProtocols.includes(j)
                ? b.send(m)
                : r(new l("Unsupported protocol " + j, l.ERR_BAD_REQUEST, t))
              : r(new l("Malformed URL " + x, l.ERR_BAD_REQUEST, t));
        });
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(21),
        o = r(22);
      t.exports = function (t, e) {
        return t && !n(e) ? o(t, e) : e;
      };
    },
    function (t, e, r) {
      "use strict";
      t.exports = function (t) {
        return !(!t || !t.__CANCEL__);
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(0);
      t.exports = function (t, e) {
        e = e || {};
        var r = {};
        function o(t, e) {
          return n.isPlainObject(t) && n.isPlainObject(e)
            ? n.merge(t, e)
            : n.isPlainObject(e)
            ? n.merge({}, e)
            : n.isArray(e)
            ? e.slice()
            : e;
        }
        function s(r) {
          return n.isUndefined(e[r])
            ? n.isUndefined(t[r])
              ? void 0
              : o(void 0, t[r])
            : o(t[r], e[r]);
        }
        function i(t) {
          if (!n.isUndefined(e[t])) return o(void 0, e[t]);
        }
        function a(r) {
          return n.isUndefined(e[r])
            ? n.isUndefined(t[r])
              ? void 0
              : o(void 0, t[r])
            : o(void 0, e[r]);
        }
        function u(r) {
          return r in e ? o(t[r], e[r]) : r in t ? o(void 0, t[r]) : void 0;
        }
        var c = {
          url: i,
          method: i,
          data: i,
          baseURL: a,
          transformRequest: a,
          transformResponse: a,
          paramsSerializer: a,
          timeout: a,
          timeoutMessage: a,
          withCredentials: a,
          adapter: a,
          responseType: a,
          xsrfCookieName: a,
          xsrfHeaderName: a,
          onUploadProgress: a,
          onDownloadProgress: a,
          decompress: a,
          maxContentLength: a,
          maxBodyLength: a,
          beforeRedirect: a,
          transport: a,
          httpAgent: a,
          httpsAgent: a,
          cancelToken: a,
          socketPath: a,
          responseEncoding: a,
          validateStatus: u,
        };
        return (
          n.forEach(Object.keys(t).concat(Object.keys(e)), function (t) {
            var e = c[t] || s,
              o = e(t);
            (n.isUndefined(o) && e !== u) || (r[t] = o);
          }),
          r
        );
      };
    },
    function (t, e) {
      t.exports = { version: "0.26.1" };
    },
    function (t, e, r) {
      t.exports = r(13);
    },
    function (t, e, r) {
      "use strict";
      var n = r(0),
        o = r(4),
        s = r(14),
        i = r(10);
      var a = (function t(e) {
        var r = new s(e),
          a = o(s.prototype.request, r);
        return (
          n.extend(a, s.prototype, r),
          n.extend(a, r),
          (a.create = function (r) {
            return t(i(e, r));
          }),
          a
        );
      })(r(3));
      (a.Axios = s),
        (a.CanceledError = r(2)),
        (a.CancelToken = r(34)),
        (a.isCancel = r(9)),
        (a.VERSION = r(11).version),
        (a.AxiosError = r(1)),
        (a.Cancel = a.CanceledError),
        (a.all = function (t) {
          return Promise.all(t);
        }),
        (a.spread = r(35)),
        (a.isAxiosError = r(36)),
        (t.exports = a),
        (t.exports.default = a);
    },
    function (t, e, r) {
      "use strict";
      var n = r(0),
        o = r(5),
        s = r(15),
        i = r(16),
        a = r(10),
        u = r(8),
        c = r(33),
        h = c.validators;
      function f(t) {
        (this.defaults = t),
          (this.interceptors = { request: new s(), response: new s() });
      }
      (f.prototype.request = function (t, e) {
        "string" == typeof t ? ((e = e || {}).url = t) : (e = t || {}),
          (e = a(this.defaults, e)).method
            ? (e.method = e.method.toLowerCase())
            : this.defaults.method
            ? (e.method = this.defaults.method.toLowerCase())
            : (e.method = "get");
        var r = e.transitional;
        void 0 !== r &&
          c.assertOptions(
            r,
            {
              silentJSONParsing: h.transitional(h.boolean),
              forcedJSONParsing: h.transitional(h.boolean),
              clarifyTimeoutError: h.transitional(h.boolean),
            },
            !1
          );
        var n = [],
          o = !0;
        this.interceptors.request.forEach(function (t) {
          ("function" == typeof t.runWhen && !1 === t.runWhen(e)) ||
            ((o = o && t.synchronous), n.unshift(t.fulfilled, t.rejected));
        });
        var s,
          u = [];
        if (
          (this.interceptors.response.forEach(function (t) {
            u.push(t.fulfilled, t.rejected);
          }),
          !o)
        ) {
          var f = [i, void 0];
          for (
            Array.prototype.unshift.apply(f, n),
              f = f.concat(u),
              s = Promise.resolve(e);
            f.length;

          )
            s = s.then(f.shift(), f.shift());
          return s;
        }
        for (var l = e; n.length; ) {
          var p = n.shift(),
            d = n.shift();
          try {
            l = p(l);
          } catch (t) {
            d(t);
            break;
          }
        }
        try {
          s = i(l);
        } catch (t) {
          return Promise.reject(t);
        }
        for (; u.length; ) s = s.then(u.shift(), u.shift());
        return s;
      }),
        (f.prototype.getUri = function (t) {
          t = a(this.defaults, t);
          var e = u(t.baseURL, t.url);
          return o(e, t.params, t.paramsSerializer);
        }),
        n.forEach(["delete", "get", "head", "options"], function (t) {
          f.prototype[t] = function (e, r) {
            return this.request(
              a(r || {}, { method: t, url: e, data: (r || {}).data })
            );
          };
        }),
        n.forEach(["post", "put", "patch"], function (t) {
          f.prototype[t] = function (e, r, n) {
            return this.request(a(n || {}, { method: t, url: e, data: r }));
          };
        }),
        (t.exports = f);
    },
    function (t, e, r) {
      "use strict";
      var n = r(0);
      function o() {
        this.handlers = [];
      }
      (o.prototype.use = function (t, e, r) {
        return (
          this.handlers.push({
            fulfilled: t,
            rejected: e,
            synchronous: !!r && r.synchronous,
            runWhen: r ? r.runWhen : null,
          }),
          this.handlers.length - 1
        );
      }),
        (o.prototype.eject = function (t) {
          this.handlers[t] && (this.handlers[t] = null);
        }),
        (o.prototype.forEach = function (t) {
          n.forEach(this.handlers, function (e) {
            null !== e && t(e);
          });
        }),
        (t.exports = o);
    },
    function (t, e, r) {
      "use strict";
      var n = r(0),
        o = r(17),
        s = r(9),
        i = r(3),
        a = r(2);
      function u(t) {
        if (
          (t.cancelToken && t.cancelToken.throwIfRequested(),
          t.signal && t.signal.aborted)
        )
          throw new a();
      }
      t.exports = function (t) {
        return (
          u(t),
          (t.headers = t.headers || {}),
          (t.data = o.call(t, t.data, t.headers, t.transformRequest)),
          (t.headers = n.merge(
            t.headers.common || {},
            t.headers[t.method] || {},
            t.headers
          )),
          n.forEach(
            ["delete", "get", "head", "post", "put", "patch", "common"],
            function (e) {
              delete t.headers[e];
            }
          ),
          (t.adapter || i.adapter)(t).then(
            function (e) {
              return (
                u(t),
                (e.data = o.call(t, e.data, e.headers, t.transformResponse)),
                e
              );
            },
            function (e) {
              return (
                s(e) ||
                  (u(t),
                  e &&
                    e.response &&
                    (e.response.data = o.call(
                      t,
                      e.response.data,
                      e.response.headers,
                      t.transformResponse
                    ))),
                Promise.reject(e)
              );
            }
          )
        );
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(0),
        o = r(3);
      t.exports = function (t, e, r) {
        var s = this || o;
        return (
          n.forEach(r, function (r) {
            t = r.call(s, t, e);
          }),
          t
        );
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(0);
      t.exports = function (t, e) {
        n.forEach(t, function (r, n) {
          n !== e &&
            n.toUpperCase() === e.toUpperCase() &&
            ((t[e] = r), delete t[n]);
        });
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(1);
      t.exports = function (t, e, r) {
        var o = r.config.validateStatus;
        r.status && o && !o(r.status)
          ? e(
              new n(
                "Request failed with status code " + r.status,
                [n.ERR_BAD_REQUEST, n.ERR_BAD_RESPONSE][
                  Math.floor(r.status / 100) - 4
                ],
                r.config,
                r.request,
                r
              )
            )
          : t(r);
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(0);
      t.exports = n.isStandardBrowserEnv()
        ? {
            write: function (t, e, r, o, s, i) {
              var a = [];
              a.push(t + "=" + encodeURIComponent(e)),
                n.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()),
                n.isString(o) && a.push("path=" + o),
                n.isString(s) && a.push("domain=" + s),
                !0 === i && a.push("secure"),
                (document.cookie = a.join("; "));
            },
            read: function (t) {
              var e = document.cookie.match(
                new RegExp("(^|;\\s*)(" + t + ")=([^;]*)")
              );
              return e ? decodeURIComponent(e[3]) : null;
            },
            remove: function (t) {
              this.write(t, "", Date.now() - 864e5);
            },
          }
        : {
            write: function () {},
            read: function () {
              return null;
            },
            remove: function () {},
          };
    },
    function (t, e, r) {
      "use strict";
      t.exports = function (t) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
      };
    },
    function (t, e, r) {
      "use strict";
      t.exports = function (t, e) {
        return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(0),
        o = [
          "age",
          "authorization",
          "content-length",
          "content-type",
          "etag",
          "expires",
          "from",
          "host",
          "if-modified-since",
          "if-unmodified-since",
          "last-modified",
          "location",
          "max-forwards",
          "proxy-authorization",
          "referer",
          "retry-after",
          "user-agent",
        ];
      t.exports = function (t) {
        var e,
          r,
          s,
          i = {};
        return t
          ? (n.forEach(t.split("\n"), function (t) {
              if (
                ((s = t.indexOf(":")),
                (e = n.trim(t.substr(0, s)).toLowerCase()),
                (r = n.trim(t.substr(s + 1))),
                e)
              ) {
                if (i[e] && o.indexOf(e) >= 0) return;
                i[e] =
                  "set-cookie" === e
                    ? (i[e] ? i[e] : []).concat([r])
                    : i[e]
                    ? i[e] + ", " + r
                    : r;
              }
            }),
            i)
          : i;
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(0);
      t.exports = n.isStandardBrowserEnv()
        ? (function () {
            var t,
              e = /(msie|trident)/i.test(navigator.userAgent),
              r = document.createElement("a");
            function o(t) {
              var n = t;
              return (
                e && (r.setAttribute("href", n), (n = r.href)),
                r.setAttribute("href", n),
                {
                  href: r.href,
                  protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                  host: r.host,
                  search: r.search ? r.search.replace(/^\?/, "") : "",
                  hash: r.hash ? r.hash.replace(/^#/, "") : "",
                  hostname: r.hostname,
                  port: r.port,
                  pathname:
                    "/" === r.pathname.charAt(0)
                      ? r.pathname
                      : "/" + r.pathname,
                }
              );
            }
            return (
              (t = o(window.location.href)),
              function (e) {
                var r = n.isString(e) ? o(e) : e;
                return r.protocol === t.protocol && r.host === t.host;
              }
            );
          })()
        : function () {
            return !0;
          };
    },
    function (t, e, r) {
      "use strict";
      var n = r(26),
        o = r(29);
      function s() {
        (this.protocol = null),
          (this.slashes = null),
          (this.auth = null),
          (this.host = null),
          (this.port = null),
          (this.hostname = null),
          (this.hash = null),
          (this.search = null),
          (this.query = null),
          (this.pathname = null),
          (this.path = null),
          (this.href = null);
      }
      (e.parse = b),
        (e.resolve = function (t, e) {
          return b(t, !1, !0).resolve(e);
        }),
        (e.resolveObject = function (t, e) {
          return t ? b(t, !1, !0).resolveObject(e) : e;
        }),
        (e.format = function (t) {
          o.isString(t) && (t = b(t));
          return t instanceof s ? t.format() : s.prototype.format.call(t);
        }),
        (e.Url = s);
      var i = /^([a-z0-9.+-]+:)/i,
        a = /:[0-9]*$/,
        u = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        c = ["{", "}", "|", "\\", "^", "`"].concat([
          "<",
          ">",
          '"',
          "`",
          " ",
          "\r",
          "\n",
          "\t",
        ]),
        h = ["'"].concat(c),
        f = ["%", "/", "?", ";", "#"].concat(h),
        l = ["/", "?", "#"],
        p = /^[+a-z0-9A-Z_-]{0,63}$/,
        d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        m = { javascript: !0, "javascript:": !0 },
        v = { javascript: !0, "javascript:": !0 },
        y = {
          http: !0,
          https: !0,
          ftp: !0,
          gopher: !0,
          file: !0,
          "http:": !0,
          "https:": !0,
          "ftp:": !0,
          "gopher:": !0,
          "file:": !0,
        },
        g = r(30);
      function b(t, e, r) {
        if (t && o.isObject(t) && t instanceof s) return t;
        var n = new s();
        return n.parse(t, e, r), n;
      }
      (s.prototype.parse = function (t, e, r) {
        if (!o.isString(t))
          throw new TypeError(
            "Parameter 'url' must be a string, not " + typeof t
          );
        var s = t.indexOf("?"),
          a = -1 !== s && s < t.indexOf("#") ? "?" : "#",
          c = t.split(a);
        c[0] = c[0].replace(/\\/g, "/");
        var b = (t = c.join(a));
        if (((b = b.trim()), !r && 1 === t.split("#").length)) {
          var O = u.exec(b);
          if (O)
            return (
              (this.path = b),
              (this.href = b),
              (this.pathname = O[1]),
              O[2]
                ? ((this.search = O[2]),
                  (this.query = e
                    ? g.parse(this.search.substr(1))
                    : this.search.substr(1)))
                : e && ((this.search = ""), (this.query = {})),
              this
            );
        }
        var E = i.exec(b);
        if (E) {
          var x = (E = E[0]).toLowerCase();
          (this.protocol = x), (b = b.substr(E.length));
        }
        if (r || E || b.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var w = "//" === b.substr(0, 2);
          !w || (E && v[E]) || ((b = b.substr(2)), (this.slashes = !0));
        }
        if (!v[E] && (w || (E && !y[E]))) {
          for (var j, R, A = -1, C = 0; C < l.length; C++) {
            -1 !== (S = b.indexOf(l[C])) && (-1 === A || S < A) && (A = S);
          }
          -1 !== (R = -1 === A ? b.lastIndexOf("@") : b.lastIndexOf("@", A)) &&
            ((j = b.slice(0, R)),
            (b = b.slice(R + 1)),
            (this.auth = decodeURIComponent(j))),
            (A = -1);
          for (C = 0; C < f.length; C++) {
            var S;
            -1 !== (S = b.indexOf(f[C])) && (-1 === A || S < A) && (A = S);
          }
          -1 === A && (A = b.length),
            (this.host = b.slice(0, A)),
            (b = b.slice(A)),
            this.parseHost(),
            (this.hostname = this.hostname || "");
          var _ =
            "[" === this.hostname[0] &&
            "]" === this.hostname[this.hostname.length - 1];
          if (!_)
            for (
              var N = this.hostname.split(/\./), P = ((C = 0), N.length);
              C < P;
              C++
            ) {
              var T = N[C];
              if (T && !T.match(p)) {
                for (var U = "", q = 0, B = T.length; q < B; q++)
                  T.charCodeAt(q) > 127 ? (U += "x") : (U += T[q]);
                if (!U.match(p)) {
                  var D = N.slice(0, C),
                    I = N.slice(C + 1),
                    k = T.match(d);
                  k && (D.push(k[1]), I.unshift(k[2])),
                    I.length && (b = "/" + I.join(".") + b),
                    (this.hostname = D.join("."));
                  break;
                }
              }
            }
          this.hostname.length > 255
            ? (this.hostname = "")
            : (this.hostname = this.hostname.toLowerCase()),
            _ || (this.hostname = n.toASCII(this.hostname));
          var L = this.port ? ":" + this.port : "",
            F = this.hostname || "";
          (this.host = F + L),
            (this.href += this.host),
            _ &&
              ((this.hostname = this.hostname.substr(
                1,
                this.hostname.length - 2
              )),
              "/" !== b[0] && (b = "/" + b));
        }
        if (!m[x])
          for (C = 0, P = h.length; C < P; C++) {
            var M = h[C];
            if (-1 !== b.indexOf(M)) {
              var z = encodeURIComponent(M);
              z === M && (z = escape(M)), (b = b.split(M).join(z));
            }
          }
        var H = b.indexOf("#");
        -1 !== H && ((this.hash = b.substr(H)), (b = b.slice(0, H)));
        var J = b.indexOf("?");
        if (
          (-1 !== J
            ? ((this.search = b.substr(J)),
              (this.query = b.substr(J + 1)),
              e && (this.query = g.parse(this.query)),
              (b = b.slice(0, J)))
            : e && ((this.search = ""), (this.query = {})),
          b && (this.pathname = b),
          y[x] && this.hostname && !this.pathname && (this.pathname = "/"),
          this.pathname || this.search)
        ) {
          L = this.pathname || "";
          var V = this.search || "";
          this.path = L + V;
        }
        return (this.href = this.format()), this;
      }),
        (s.prototype.format = function () {
          var t = this.auth || "";
          t &&
            ((t = (t = encodeURIComponent(t)).replace(/%3A/i, ":")),
            (t += "@"));
          var e = this.protocol || "",
            r = this.pathname || "",
            n = this.hash || "",
            s = !1,
            i = "";
          this.host
            ? (s = t + this.host)
            : this.hostname &&
              ((s =
                t +
                (-1 === this.hostname.indexOf(":")
                  ? this.hostname
                  : "[" + this.hostname + "]")),
              this.port && (s += ":" + this.port)),
            this.query &&
              o.isObject(this.query) &&
              Object.keys(this.query).length &&
              (i = g.stringify(this.query));
          var a = this.search || (i && "?" + i) || "";
          return (
            e && ":" !== e.substr(-1) && (e += ":"),
            this.slashes || ((!e || y[e]) && !1 !== s)
              ? ((s = "//" + (s || "")),
                r && "/" !== r.charAt(0) && (r = "/" + r))
              : s || (s = ""),
            n && "#" !== n.charAt(0) && (n = "#" + n),
            a && "?" !== a.charAt(0) && (a = "?" + a),
            e +
              s +
              (r = r.replace(/[?#]/g, function (t) {
                return encodeURIComponent(t);
              })) +
              (a = a.replace("#", "%23")) +
              n
          );
        }),
        (s.prototype.resolve = function (t) {
          return this.resolveObject(b(t, !1, !0)).format();
        }),
        (s.prototype.resolveObject = function (t) {
          if (o.isString(t)) {
            var e = new s();
            e.parse(t, !1, !0), (t = e);
          }
          for (
            var r = new s(), n = Object.keys(this), i = 0;
            i < n.length;
            i++
          ) {
            var a = n[i];
            r[a] = this[a];
          }
          if (((r.hash = t.hash), "" === t.href))
            return (r.href = r.format()), r;
          if (t.slashes && !t.protocol) {
            for (var u = Object.keys(t), c = 0; c < u.length; c++) {
              var h = u[c];
              "protocol" !== h && (r[h] = t[h]);
            }
            return (
              y[r.protocol] &&
                r.hostname &&
                !r.pathname &&
                (r.path = r.pathname = "/"),
              (r.href = r.format()),
              r
            );
          }
          if (t.protocol && t.protocol !== r.protocol) {
            if (!y[t.protocol]) {
              for (var f = Object.keys(t), l = 0; l < f.length; l++) {
                var p = f[l];
                r[p] = t[p];
              }
              return (r.href = r.format()), r;
            }
            if (((r.protocol = t.protocol), t.host || v[t.protocol]))
              r.pathname = t.pathname;
            else {
              for (
                var d = (t.pathname || "").split("/");
                d.length && !(t.host = d.shift());

              );
              t.host || (t.host = ""),
                t.hostname || (t.hostname = ""),
                "" !== d[0] && d.unshift(""),
                d.length < 2 && d.unshift(""),
                (r.pathname = d.join("/"));
            }
            if (
              ((r.search = t.search),
              (r.query = t.query),
              (r.host = t.host || ""),
              (r.auth = t.auth),
              (r.hostname = t.hostname || t.host),
              (r.port = t.port),
              r.pathname || r.search)
            ) {
              var m = r.pathname || "",
                g = r.search || "";
              r.path = m + g;
            }
            return (
              (r.slashes = r.slashes || t.slashes), (r.href = r.format()), r
            );
          }
          var b = r.pathname && "/" === r.pathname.charAt(0),
            O = t.host || (t.pathname && "/" === t.pathname.charAt(0)),
            E = O || b || (r.host && t.pathname),
            x = E,
            w = (r.pathname && r.pathname.split("/")) || [],
            j =
              ((d = (t.pathname && t.pathname.split("/")) || []),
              r.protocol && !y[r.protocol]);
          if (
            (j &&
              ((r.hostname = ""),
              (r.port = null),
              r.host && ("" === w[0] ? (w[0] = r.host) : w.unshift(r.host)),
              (r.host = ""),
              t.protocol &&
                ((t.hostname = null),
                (t.port = null),
                t.host && ("" === d[0] ? (d[0] = t.host) : d.unshift(t.host)),
                (t.host = null)),
              (E = E && ("" === d[0] || "" === w[0]))),
            O)
          )
            (r.host = t.host || "" === t.host ? t.host : r.host),
              (r.hostname =
                t.hostname || "" === t.hostname ? t.hostname : r.hostname),
              (r.search = t.search),
              (r.query = t.query),
              (w = d);
          else if (d.length)
            w || (w = []),
              w.pop(),
              (w = w.concat(d)),
              (r.search = t.search),
              (r.query = t.query);
          else if (!o.isNullOrUndefined(t.search)) {
            if (j)
              (r.hostname = r.host = w.shift()),
                (_ =
                  !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) &&
                  ((r.auth = _.shift()), (r.host = r.hostname = _.shift()));
            return (
              (r.search = t.search),
              (r.query = t.query),
              (o.isNull(r.pathname) && o.isNull(r.search)) ||
                (r.path =
                  (r.pathname ? r.pathname : "") + (r.search ? r.search : "")),
              (r.href = r.format()),
              r
            );
          }
          if (!w.length)
            return (
              (r.pathname = null),
              r.search ? (r.path = "/" + r.search) : (r.path = null),
              (r.href = r.format()),
              r
            );
          for (
            var R = w.slice(-1)[0],
              A =
                ((r.host || t.host || w.length > 1) &&
                  ("." === R || ".." === R)) ||
                "" === R,
              C = 0,
              S = w.length;
            S >= 0;
            S--
          )
            "." === (R = w[S])
              ? w.splice(S, 1)
              : ".." === R
              ? (w.splice(S, 1), C++)
              : C && (w.splice(S, 1), C--);
          if (!E && !x) for (; C--; C) w.unshift("..");
          !E ||
            "" === w[0] ||
            (w[0] && "/" === w[0].charAt(0)) ||
            w.unshift(""),
            A && "/" !== w.join("/").substr(-1) && w.push("");
          var _,
            N = "" === w[0] || (w[0] && "/" === w[0].charAt(0));
          j &&
            ((r.hostname = r.host = N ? "" : w.length ? w.shift() : ""),
            (_ = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) &&
              ((r.auth = _.shift()), (r.host = r.hostname = _.shift())));
          return (
            (E = E || (r.host && w.length)) && !N && w.unshift(""),
            w.length
              ? (r.pathname = w.join("/"))
              : ((r.pathname = null), (r.path = null)),
            (o.isNull(r.pathname) && o.isNull(r.search)) ||
              (r.path =
                (r.pathname ? r.pathname : "") + (r.search ? r.search : "")),
            (r.auth = t.auth || r.auth),
            (r.slashes = r.slashes || t.slashes),
            (r.href = r.format()),
            r
          );
        }),
        (s.prototype.parseHost = function () {
          var t = this.host,
            e = a.exec(t);
          e &&
            (":" !== (e = e[0]) && (this.port = e.substr(1)),
            (t = t.substr(0, t.length - e.length))),
            t && (this.hostname = t);
        });
    },
    function (t, e, r) {
      (function (t, n) {
        var o;
        /*! https://mths.be/punycode v1.4.1 by @mathias */ !(function (s) {
          e && e.nodeType, t && t.nodeType;
          var i = "object" == typeof n && n;
          i.global !== i && i.window !== i && i.self;
          var a,
            u = 2147483647,
            c = /^xn--/,
            h = /[^\x20-\x7E]/,
            f = /[\x2E\u3002\uFF0E\uFF61]/g,
            l = {
              overflow: "Overflow: input needs wider integers to process",
              "not-basic": "Illegal input >= 0x80 (not a basic code point)",
              "invalid-input": "Invalid input",
            },
            p = Math.floor,
            d = String.fromCharCode;
          function m(t) {
            throw new RangeError(l[t]);
          }
          function v(t, e) {
            for (var r = t.length, n = []; r--; ) n[r] = e(t[r]);
            return n;
          }
          function y(t, e) {
            var r = t.split("@"),
              n = "";
            return (
              r.length > 1 && ((n = r[0] + "@"), (t = r[1])),
              n + v((t = t.replace(f, ".")).split("."), e).join(".")
            );
          }
          function g(t) {
            for (var e, r, n = [], o = 0, s = t.length; o < s; )
              (e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < s
                ? 56320 == (64512 & (r = t.charCodeAt(o++)))
                  ? n.push(((1023 & e) << 10) + (1023 & r) + 65536)
                  : (n.push(e), o--)
                : n.push(e);
            return n;
          }
          function b(t) {
            return v(t, function (t) {
              var e = "";
              return (
                t > 65535 &&
                  ((e += d((((t -= 65536) >>> 10) & 1023) | 55296)),
                  (t = 56320 | (1023 & t))),
                (e += d(t))
              );
            }).join("");
          }
          function O(t, e) {
            return t + 22 + 75 * (t < 26) - ((0 != e) << 5);
          }
          function E(t, e, r) {
            var n = 0;
            for (t = r ? p(t / 700) : t >> 1, t += p(t / e); t > 455; n += 36)
              t = p(t / 35);
            return p(n + (36 * t) / (t + 38));
          }
          function x(t) {
            var e,
              r,
              n,
              o,
              s,
              i,
              a,
              c,
              h,
              f,
              l,
              d = [],
              v = t.length,
              y = 0,
              g = 128,
              O = 72;
            for ((r = t.lastIndexOf("-")) < 0 && (r = 0), n = 0; n < r; ++n)
              t.charCodeAt(n) >= 128 && m("not-basic"), d.push(t.charCodeAt(n));
            for (o = r > 0 ? r + 1 : 0; o < v; ) {
              for (
                s = y, i = 1, a = 36;
                o >= v && m("invalid-input"),
                  ((c =
                    (l = t.charCodeAt(o++)) - 48 < 10
                      ? l - 22
                      : l - 65 < 26
                      ? l - 65
                      : l - 97 < 26
                      ? l - 97
                      : 36) >= 36 ||
                    c > p((u - y) / i)) &&
                    m("overflow"),
                  (y += c * i),
                  !(c < (h = a <= O ? 1 : a >= O + 26 ? 26 : a - O));
                a += 36
              )
                i > p(u / (f = 36 - h)) && m("overflow"), (i *= f);
              (O = E(y - s, (e = d.length + 1), 0 == s)),
                p(y / e) > u - g && m("overflow"),
                (g += p(y / e)),
                (y %= e),
                d.splice(y++, 0, g);
            }
            return b(d);
          }
          function w(t) {
            var e,
              r,
              n,
              o,
              s,
              i,
              a,
              c,
              h,
              f,
              l,
              v,
              y,
              b,
              x,
              w = [];
            for (
              v = (t = g(t)).length, e = 128, r = 0, s = 72, i = 0;
              i < v;
              ++i
            )
              (l = t[i]) < 128 && w.push(d(l));
            for (n = o = w.length, o && w.push("-"); n < v; ) {
              for (a = u, i = 0; i < v; ++i)
                (l = t[i]) >= e && l < a && (a = l);
              for (
                a - e > p((u - r) / (y = n + 1)) && m("overflow"),
                  r += (a - e) * y,
                  e = a,
                  i = 0;
                i < v;
                ++i
              )
                if (((l = t[i]) < e && ++r > u && m("overflow"), l == e)) {
                  for (
                    c = r, h = 36;
                    !(c < (f = h <= s ? 1 : h >= s + 26 ? 26 : h - s));
                    h += 36
                  )
                    (x = c - f),
                      (b = 36 - f),
                      w.push(d(O(f + (x % b), 0))),
                      (c = p(x / b));
                  w.push(d(O(c, 0))), (s = E(r, y, n == o)), (r = 0), ++n;
                }
              ++r, ++e;
            }
            return w.join("");
          }
          (a = {
            version: "1.4.1",
            ucs2: { decode: g, encode: b },
            decode: x,
            encode: w,
            toASCII: function (t) {
              return y(t, function (t) {
                return h.test(t) ? "xn--" + w(t) : t;
              });
            },
            toUnicode: function (t) {
              return y(t, function (t) {
                return c.test(t) ? x(t.slice(4).toLowerCase()) : t;
              });
            },
          }),
            void 0 ===
              (o = function () {
                return a;
              }.call(e, r, e, t)) || (t.exports = o);
        })();
      }.call(this, r(27)(t), r(28)));
    },
    function (t, e) {
      t.exports = function (t) {
        return (
          t.webpackPolyfill ||
            ((t.deprecate = function () {}),
            (t.paths = []),
            t.children || (t.children = []),
            Object.defineProperty(t, "loaded", {
              enumerable: !0,
              get: function () {
                return t.l;
              },
            }),
            Object.defineProperty(t, "id", {
              enumerable: !0,
              get: function () {
                return t.i;
              },
            }),
            (t.webpackPolyfill = 1)),
          t
        );
      };
    },
    function (t, e) {
      var r;
      r = (function () {
        return this;
      })();
      try {
        r = r || new Function("return this")();
      } catch (t) {
        "object" == typeof window && (r = window);
      }
      t.exports = r;
    },
    function (t, e, r) {
      "use strict";
      t.exports = {
        isString: function (t) {
          return "string" == typeof t;
        },
        isObject: function (t) {
          return "object" == typeof t && null !== t;
        },
        isNull: function (t) {
          return null === t;
        },
        isNullOrUndefined: function (t) {
          return null == t;
        },
      };
    },
    function (t, e, r) {
      "use strict";
      (e.decode = e.parse = r(31)), (e.encode = e.stringify = r(32));
    },
    function (t, e, r) {
      "use strict";
      function n(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }
      t.exports = function (t, e, r, s) {
        (e = e || "&"), (r = r || "=");
        var i = {};
        if ("string" != typeof t || 0 === t.length) return i;
        var a = /\+/g;
        t = t.split(e);
        var u = 1e3;
        s && "number" == typeof s.maxKeys && (u = s.maxKeys);
        var c = t.length;
        u > 0 && c > u && (c = u);
        for (var h = 0; h < c; ++h) {
          var f,
            l,
            p,
            d,
            m = t[h].replace(a, "%20"),
            v = m.indexOf(r);
          v >= 0
            ? ((f = m.substr(0, v)), (l = m.substr(v + 1)))
            : ((f = m), (l = "")),
            (p = decodeURIComponent(f)),
            (d = decodeURIComponent(l)),
            n(i, p)
              ? o(i[p])
                ? i[p].push(d)
                : (i[p] = [i[p], d])
              : (i[p] = d);
        }
        return i;
      };
      var o =
        Array.isArray ||
        function (t) {
          return "[object Array]" === Object.prototype.toString.call(t);
        };
    },
    function (t, e, r) {
      "use strict";
      var n = function (t) {
        switch (typeof t) {
          case "string":
            return t;
          case "boolean":
            return t ? "true" : "false";
          case "number":
            return isFinite(t) ? t : "";
          default:
            return "";
        }
      };
      t.exports = function (t, e, r, a) {
        return (
          (e = e || "&"),
          (r = r || "="),
          null === t && (t = void 0),
          "object" == typeof t
            ? s(i(t), function (i) {
                var a = encodeURIComponent(n(i)) + r;
                return o(t[i])
                  ? s(t[i], function (t) {
                      return a + encodeURIComponent(n(t));
                    }).join(e)
                  : a + encodeURIComponent(n(t[i]));
              }).join(e)
            : a
            ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(t))
            : ""
        );
      };
      var o =
        Array.isArray ||
        function (t) {
          return "[object Array]" === Object.prototype.toString.call(t);
        };
      function s(t, e) {
        if (t.map) return t.map(e);
        for (var r = [], n = 0; n < t.length; n++) r.push(e(t[n], n));
        return r;
      }
      var i =
        Object.keys ||
        function (t) {
          var e = [];
          for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
          return e;
        };
    },
    function (t, e, r) {
      "use strict";
      var n = r(11).version,
        o = r(1),
        s = {};
      ["object", "boolean", "number", "function", "string", "symbol"].forEach(
        function (t, e) {
          s[t] = function (r) {
            return typeof r === t || "a" + (e < 1 ? "n " : " ") + t;
          };
        }
      );
      var i = {};
      (s.transitional = function (t, e, r) {
        function s(t, e) {
          return (
            "[Axios v" +
            n +
            "] Transitional option '" +
            t +
            "'" +
            e +
            (r ? ". " + r : "")
          );
        }
        return function (r, n, a) {
          if (!1 === t)
            throw new o(
              s(n, " has been removed" + (e ? " in " + e : "")),
              o.ERR_DEPRECATED
            );
          return (
            e &&
              !i[n] &&
              ((i[n] = !0),
              console.warn(
                s(
                  n,
                  " has been deprecated since v" +
                    e +
                    " and will be removed in the near future"
                )
              )),
            !t || t(r, n, a)
          );
        };
      }),
        (t.exports = {
          assertOptions: function (t, e, r) {
            if ("object" != typeof t)
              throw new o("options must be an object", o.ERR_BAD_OPTION_VALUE);
            for (var n = Object.keys(t), s = n.length; s-- > 0; ) {
              var i = n[s],
                a = e[i];
              if (a) {
                var u = t[i],
                  c = void 0 === u || a(u, i, t);
                if (!0 !== c)
                  throw new o(
                    "option " + i + " must be " + c,
                    o.ERR_BAD_OPTION_VALUE
                  );
              } else if (!0 !== r)
                throw new o("Unknown option " + i, o.ERR_BAD_OPTION);
            }
          },
          validators: s,
        });
    },
    function (t, e, r) {
      "use strict";
      var n = r(2);
      function o(t) {
        if ("function" != typeof t)
          throw new TypeError("executor must be a function.");
        var e;
        this.promise = new Promise(function (t) {
          e = t;
        });
        var r = this;
        this.promise.then(function (t) {
          if (r._listeners) {
            var e,
              n = r._listeners.length;
            for (e = 0; e < n; e++) r._listeners[e](t);
            r._listeners = null;
          }
        }),
          (this.promise.then = function (t) {
            var e,
              n = new Promise(function (t) {
                r.subscribe(t), (e = t);
              }).then(t);
            return (
              (n.cancel = function () {
                r.unsubscribe(e);
              }),
              n
            );
          }),
          t(function (t) {
            r.reason || ((r.reason = new n(t)), e(r.reason));
          });
      }
      (o.prototype.throwIfRequested = function () {
        if (this.reason) throw this.reason;
      }),
        (o.prototype.subscribe = function (t) {
          this.reason
            ? t(this.reason)
            : this._listeners
            ? this._listeners.push(t)
            : (this._listeners = [t]);
        }),
        (o.prototype.unsubscribe = function (t) {
          if (this._listeners) {
            var e = this._listeners.indexOf(t);
            -1 !== e && this._listeners.splice(e, 1);
          }
        }),
        (o.source = function () {
          var t;
          return {
            token: new o(function (e) {
              t = e;
            }),
            cancel: t,
          };
        }),
        (t.exports = o);
    },
    function (t, e, r) {
      "use strict";
      t.exports = function (t) {
        return function (e) {
          return t.apply(null, e);
        };
      };
    },
    function (t, e, r) {
      "use strict";
      var n = r(0);
      t.exports = function (t) {
        return n.isObject(t) && !0 === t.isAxiosError;
      };
    },
  ]);
});
////////////

let globalObj = [];

let SUBSCRIBED_ALL_PENDING_TOPIC_URL =
  "/user/queue/dashboard/ticketLiveDashboard/allPending";

let SUBSCRIBED_ALL_PENDING_ASSIGNED_TOPIC_URL =
  "/user/queue/dashboard/ticketLiveDashboard/allPendingAssigned";

function getAllPendingTickets(filterObj, updateCallBack, errorCallBack) {
  getStompClient(function (client) {
    if (client === "ERROR") {
      errorCallBack();
      disconnectSocket();
    } else {
      let subscribeHeader = createSubscribeHeader(filterObj);
      client.subscribe(
        SUBSCRIBED_ALL_PENDING_TOPIC_URL,
        function (response) {
          let data = JSON.parse(response.body);
          console.log(data);
          //updated callBack
          updateCallBack(data);
        },
        subscribeHeader
      );
    }
  });
}

function getAllPendingAssignedTickets(
  filterObj,
  updatedCallBAck,
  errorCallBack
) {
  getStompClient(function (client) {
    if (client === "ERROR") {
      errorCallBack();
      disconnectSocket();
    } else {
      let subscribeHeader = createSubscribeHeader(filterObj);
      client.subscribe(
        SUBSCRIBED_ALL_PENDING_ASSIGNED_TOPIC_URL,
        function (response) {
          let data = JSON.parse(response.body);
          console.log(data);
          //updated callBack
          updatedCallBAck(data);
        },
        subscribeHeader
      );
    }
  });
}

function getStompClient(callBack) {
  if (typeof globalObj[0] === "undefined") {
    axios
      .get(`/ms/auth/authenticate-user`)
      .then((response) => {
        connectToSocket(response.session, callBack);
      })
      .catch((error) => {
        console.log("error in authenticating");
        callBack("ERROR");
      });
  } else {
    callBack(globalObj[0]);
  }
  //connectToSocket("uffbzoy8yzhjuien4dp8", callBack);
}

function connectToSocket(key, callBack) {
  //let socket = new SockJS("https://localhost:8089/socket");
  let socket = new SockJS("https://ws.kapturecrm.com:443/socket");
  let stompClient = Stomp.over(socket);

  let header = {
    domain: window.location.hostname,
    session_key: key,
    dashboardViewId: generateDashboardViewId(10),
    clientDashType: "MULTISUBS",
  };
  stompClient.connect(
    header,
    function (frame) {
      globalObj[0] = stompClient;
      stompClient.subscribe("/user/queue/active", function (response) {
        stompClient.send("/app/pong", {}, JSON.stringify({ name: "Active" }));
      });
      stompClient.subscribe(
        "/user/queue/dashboard/ticketLiveDashboard",
        function (response) {
          // Default subscription to handle user in backend !!!
        }
      );
      callBack(stompClient);
    },
    function (error) {
      return callBack("ERROR");
    }
  );
}

function createSubscribeHeader(filterObj) {
  const {
    queueKeyList = null,
    employeeList = null,
    sourceType = "ALL",
  } = filterObj;
  let subscribeHeader = {
    queueKeyList: JSON.stringify(queueKeyList),
    employeeList: JSON.stringify(employeeList),
    sourceType: sourceType,
  };
  return subscribeHeader;
}

function generateDashboardViewId(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function disconnectSocket() {
  if (typeof globalObj[0] !== "undefined") {
    globalObj[0].disconnect(function (frames) {
      delete globalObj[0];
    }, {});
  }
}

window.kaptureSocketConnections = {
  getAllPendingTickets: getAllPendingTickets,
  getAllPendingAssignedTickets: getAllPendingAssignedTickets,
  disconnectSocket: disconnectSocket,
};
