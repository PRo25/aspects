var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("PointCuts/MemberMatchPredicate", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Advices/Advice", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Advice;
    return {
        setters: [],
        execute: function () {
            Advice = (function () {
                function Advice(action) {
                    this.Action = action;
                }
                return Advice;
            }());
            exports_2("Advice", Advice);
        }
    };
});
System.register("JoinPoints/JoinPointTypes", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var JoinPointTypes;
    return {
        setters: [],
        execute: function () {
            (function (JoinPointTypes) {
                JoinPointTypes[JoinPointTypes["MethodExecution"] = 0] = "MethodExecution";
            })(JoinPointTypes || (JoinPointTypes = {}));
            exports_3("JoinPointTypes", JoinPointTypes);
        }
    };
});
System.register("PointCuts/PointCut", ["JoinPoints/JoinPointTypes"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var JoinPointTypes_1, PointCut;
    return {
        setters: [
            function (JoinPointTypes_1_1) {
                JoinPointTypes_1 = JoinPointTypes_1_1;
            }
        ],
        execute: function () {
            PointCut = (function () {
                function PointCut(matchPredicate, advice, joinPointType) {
                    this.MatchPredicate = matchPredicate;
                    this.Advice = advice;
                    this.JoinPointType = joinPointType;
                }
                PointCut.prototype.IsMatch = function (target, memberName) {
                    var isMatch = false;
                    if (this.JoinPointType == JoinPointTypes_1.JoinPointTypes.MethodExecution) {
                        isMatch = target[memberName] instanceof Function
                            && this.MatchPredicate(target, memberName);
                    }
                    return isMatch;
                };
                return PointCut;
            }());
            exports_4("PointCut", PointCut);
        }
    };
});
System.register("JoinPoints/MethodExecutionJoinPoint", ["JoinPoints/JoinPointTypes"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var JoinPointTypes_2, MethodExecutionJoinPoint;
    return {
        setters: [
            function (JoinPointTypes_2_1) {
                JoinPointTypes_2 = JoinPointTypes_2_1;
            }
        ],
        execute: function () {
            MethodExecutionJoinPoint = (function () {
                function MethodExecutionJoinPoint(target, methodName, methodArguments) {
                    this.Type = JoinPointTypes_2.JoinPointTypes.MethodExecution;
                    this.Target = target;
                    this.MethodName = methodName;
                    this.MethodArguments = methodArguments || [];
                }
                return MethodExecutionJoinPoint;
            }());
            exports_5("MethodExecutionJoinPoint", MethodExecutionJoinPoint);
        }
    };
});
System.register("Advices/AfterMethodExecutionAdvice", ["Advices/Advice", "JoinPoints/MethodExecutionJoinPoint"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Advice_1, MethodExecutionJoinPoint_1, AfterMethodExecutionAdvice;
    return {
        setters: [
            function (Advice_1_1) {
                Advice_1 = Advice_1_1;
            },
            function (MethodExecutionJoinPoint_1_1) {
                MethodExecutionJoinPoint_1 = MethodExecutionJoinPoint_1_1;
            }
        ],
        execute: function () {
            AfterMethodExecutionAdvice = (function (_super) {
                __extends(AfterMethodExecutionAdvice, _super);
                function AfterMethodExecutionAdvice(action) {
                    return _super.call(this, action) || this;
                }
                AfterMethodExecutionAdvice.prototype.CreateAdvisedMember = function (target, methodName) {
                    var thisAdvice = this;
                    var originalMethod = target[methodName];
                    var advisedMethod = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var joinPoint = new MethodExecutionJoinPoint_1.MethodExecutionJoinPoint(this, methodName, args);
                        joinPoint.MethodResult = originalMethod.apply(this, joinPoint.MethodArguments);
                        thisAdvice.Action(joinPoint);
                        return joinPoint.MethodResult;
                    };
                    return advisedMethod;
                };
                return AfterMethodExecutionAdvice;
            }(Advice_1.Advice));
            exports_6("AfterMethodExecutionAdvice", AfterMethodExecutionAdvice);
        }
    };
});
System.register("Advices/BeforeMethodExecutionAdvice", ["Advices/Advice", "JoinPoints/MethodExecutionJoinPoint"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var Advice_2, MethodExecutionJoinPoint_2, BeforeMethodExecutionAdvice;
    return {
        setters: [
            function (Advice_2_1) {
                Advice_2 = Advice_2_1;
            },
            function (MethodExecutionJoinPoint_2_1) {
                MethodExecutionJoinPoint_2 = MethodExecutionJoinPoint_2_1;
            }
        ],
        execute: function () {
            BeforeMethodExecutionAdvice = (function (_super) {
                __extends(BeforeMethodExecutionAdvice, _super);
                function BeforeMethodExecutionAdvice(action) {
                    return _super.call(this, action) || this;
                }
                BeforeMethodExecutionAdvice.prototype.CreateAdvisedMember = function (target, methodName) {
                    var thisAdvice = this;
                    var originalMethod = target[methodName];
                    var advisedMethod = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var joinPoint = new MethodExecutionJoinPoint_2.MethodExecutionJoinPoint(this, methodName, args);
                        thisAdvice.Action(joinPoint);
                        joinPoint.MethodResult = originalMethod.apply(this, joinPoint.MethodArguments);
                        return joinPoint.MethodResult;
                    };
                    return advisedMethod;
                };
                return BeforeMethodExecutionAdvice;
            }(Advice_2.Advice));
            exports_7("BeforeMethodExecutionAdvice", BeforeMethodExecutionAdvice);
        }
    };
});
System.register("Advices/OnErrorThrownInMethodExecutionAdvice", ["Advices/Advice", "JoinPoints/MethodExecutionJoinPoint"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var Advice_3, MethodExecutionJoinPoint_3, OnErrorThrownInMethodExecutionAdvice;
    return {
        setters: [
            function (Advice_3_1) {
                Advice_3 = Advice_3_1;
            },
            function (MethodExecutionJoinPoint_3_1) {
                MethodExecutionJoinPoint_3 = MethodExecutionJoinPoint_3_1;
            }
        ],
        execute: function () {
            OnErrorThrownInMethodExecutionAdvice = (function (_super) {
                __extends(OnErrorThrownInMethodExecutionAdvice, _super);
                function OnErrorThrownInMethodExecutionAdvice(action) {
                    return _super.call(this, action) || this;
                }
                OnErrorThrownInMethodExecutionAdvice.prototype.CreateAdvisedMember = function (target, methodName) {
                    var thisAdvice = this;
                    var originalMethod = target[methodName];
                    var advisedMethod = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var joinPoint = new MethodExecutionJoinPoint_3.MethodExecutionJoinPoint(this, methodName, args);
                        try {
                            return originalMethod.apply(this, joinPoint.MethodArguments);
                        }
                        catch (error) {
                            thisAdvice.Action(error, joinPoint);
                        }
                    };
                    return advisedMethod;
                };
                return OnErrorThrownInMethodExecutionAdvice;
            }(Advice_3.Advice));
            exports_8("OnErrorThrownInMethodExecutionAdvice", OnErrorThrownInMethodExecutionAdvice);
        }
    };
});
System.register("Aspect", ["PointCuts/PointCut", "Advices/AfterMethodExecutionAdvice", "Advices/BeforeMethodExecutionAdvice", "Advices/OnErrorThrownInMethodExecutionAdvice", "JoinPoints/JoinPointTypes"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var PointCut_1, AfterMethodExecutionAdvice_1, BeforeMethodExecutionAdvice_1, OnErrorThrownInMethodExecutionAdvice_1, JoinPointTypes_3, Aspect;
    return {
        setters: [
            function (PointCut_1_1) {
                PointCut_1 = PointCut_1_1;
            },
            function (AfterMethodExecutionAdvice_1_1) {
                AfterMethodExecutionAdvice_1 = AfterMethodExecutionAdvice_1_1;
            },
            function (BeforeMethodExecutionAdvice_1_1) {
                BeforeMethodExecutionAdvice_1 = BeforeMethodExecutionAdvice_1_1;
            },
            function (OnErrorThrownInMethodExecutionAdvice_1_1) {
                OnErrorThrownInMethodExecutionAdvice_1 = OnErrorThrownInMethodExecutionAdvice_1_1;
            },
            function (JoinPointTypes_3_1) {
                JoinPointTypes_3 = JoinPointTypes_3_1;
            }
        ],
        execute: function () {
            Aspect = (function () {
                function Aspect() {
                    this.pointCuts = [];
                    this.Setup();
                }
                Aspect.prototype.InterceptBeforeMethodExecution = function (onInterceptionAction, memberMatchPredicate) {
                    if (memberMatchPredicate === void 0) { memberMatchPredicate = null; }
                    var advice = new BeforeMethodExecutionAdvice_1.BeforeMethodExecutionAdvice(onInterceptionAction);
                    this.AddNewPointCutForMethodExecution(advice, memberMatchPredicate);
                };
                Aspect.prototype.AddNewPointCutForMethodExecution = function (advice, memberMatchPredicate) {
                    memberMatchPredicate = this.GetMemberMatchPredicateOrDefault(memberMatchPredicate);
                    var pointCut = new PointCut_1.PointCut(memberMatchPredicate, advice, JoinPointTypes_3.JoinPointTypes.MethodExecution);
                    this.pointCuts.push(pointCut);
                };
                Aspect.prototype.GetMemberMatchPredicateOrDefault = function (memberMatchPredicate) {
                    if (memberMatchPredicate == null) {
                        memberMatchPredicate = function (target, memberName) { return true; };
                    }
                    return memberMatchPredicate;
                };
                Aspect.prototype.InterceptAfterMethodExecution = function (onInterceptionAction, memberMatchPredicate) {
                    if (memberMatchPredicate === void 0) { memberMatchPredicate = null; }
                    var advice = new AfterMethodExecutionAdvice_1.AfterMethodExecutionAdvice(onInterceptionAction);
                    this.AddNewPointCutForMethodExecution(advice, memberMatchPredicate);
                };
                Aspect.prototype.InterceptOnErrorThrownInMethodExecution = function (onInterceptionAction, memberMatchPredicate) {
                    if (memberMatchPredicate === void 0) { memberMatchPredicate = null; }
                    var advice = new OnErrorThrownInMethodExecutionAdvice_1.OnErrorThrownInMethodExecutionAdvice(onInterceptionAction);
                    this.AddNewPointCutForMethodExecution(advice, memberMatchPredicate);
                };
                Aspect.prototype.Weave = function (target) {
                    if (this.CanWeave(target)) {
                        this.WeaveMembers(target);
                    }
                };
                Aspect.prototype.WeaveMembers = function (target) {
                    for (var memberName in target) {
                        if (memberName != "constructor") {
                            this.WeaveMemberIfAnyMatch(target, memberName);
                        }
                    }
                };
                Aspect.prototype.WeaveMemberIfAnyMatch = function (target, memberName) {
                    var matchingAdvices = this.pointCuts.filter(function (p) { return p.IsMatch(target, memberName); }).map(function (p) { return p.Advice; });
                    if (matchingAdvices.length > 0) {
                        this.WeaveMember(target, memberName, matchingAdvices);
                    }
                };
                Aspect.prototype.WeaveMember = function (target, memberName, matchingAdvices) {
                    for (var _i = 0, matchingAdvices_1 = matchingAdvices; _i < matchingAdvices_1.length; _i++) {
                        var advice = matchingAdvices_1[_i];
                        target[memberName] = advice.CreateAdvisedMember(target, memberName);
                    }
                };
                return Aspect;
            }());
            exports_9("Aspect", Aspect);
        }
    };
});
//# sourceMappingURL=pro-aspects.js.map