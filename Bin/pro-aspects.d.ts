declare namespace PRoAspects.Core {
    class Interceptor {
        constructor();
        ApplyAspect(obj: Object, aspect: any): void;
    }
}
declare namespace PRoAspects.Core {
    class LoggerAspect {
        constructor();
        ExecuteBefore(method: Function): void;
        ExecuteAfter(method: Function): void;
        IsMatch(method: Function): boolean;
    }
}
