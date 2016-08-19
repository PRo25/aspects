/// <reference path="IAspect.ts" />

namespace PRoAspects.Core
{
    export interface IExecuteBeforeAspect extends IAspect
    {
        ExecuteBefore(method: Function): void;
    }
}
