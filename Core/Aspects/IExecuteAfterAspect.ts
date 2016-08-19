/// <reference path="IAspect.ts" />

namespace PRoAspects.Core
{
    export interface IExecuteAfterAspect extends IAspect
    {
        ExecuteAfter(method: Function): void;
    }
}
