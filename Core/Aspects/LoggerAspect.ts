/// <reference path="IExecuteAfterAspect.ts" />
/// <reference path="IExecuteBeforeAspect.ts" />

namespace PRoAspects.Core
{
    export class LoggerAspect implements PRoAspects.Core.IExecuteBeforeAspect, PRoAspects.Core.IExecuteAfterAspect
    {
        public constructor() 
        {

        }

        public ExecuteBefore(method: Function): void
        {
            console.log("Before method " + method.prototype.method);
        }

        public ExecuteAfter(method: Function): void
        {
            console.log("After method " + method.prototype.method);
        }

        public IsMatch(method: Function): boolean
        {
            return true;
        }
    }
}
