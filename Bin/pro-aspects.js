/// <reference path="Aspects\IAspect.ts" />
var PRoAspects;
(function (PRoAspects) {
    var Core;
    (function (Core) {
        var Interceptor = (function () {
            function Interceptor() {
            }
            Interceptor.prototype.ApplyAspect = function (obj, aspect) {
                console.log("Hello!");
                console.log("Hello again!");
            };
            return Interceptor;
        }());
        Core.Interceptor = Interceptor;
    })(Core = PRoAspects.Core || (PRoAspects.Core = {}));
})(PRoAspects || (PRoAspects = {}));
/// <reference path="IAspect.ts" />
/// <reference path="IAspect.ts" />
/// <reference path="IExecuteAfterAspect.ts" />
/// <reference path="IExecuteBeforeAspect.ts" />
var PRoAspects;
(function (PRoAspects) {
    var Core;
    (function (Core) {
        var LoggerAspect = (function () {
            function LoggerAspect() {
            }
            LoggerAspect.prototype.ExecuteBefore = function (method) {
                console.log("Before method " + method.prototype.method);
            };
            LoggerAspect.prototype.ExecuteAfter = function (method) {
                console.log("After method " + method.prototype.method);
            };
            LoggerAspect.prototype.IsMatch = function (method) {
                return true;
            };
            return LoggerAspect;
        }());
        Core.LoggerAspect = LoggerAspect;
    })(Core = PRoAspects.Core || (PRoAspects.Core = {}));
})(PRoAspects || (PRoAspects = {}));
//# sourceMappingURL=pro-aspects.js.map