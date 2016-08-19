/// <reference path="Aspects\IAspect.ts" />

namespace PRoAspects.Core
{
    export class Interceptor
    {
        public constructor() 
        {
            
        }

        public ApplyAspect(obj: Object, aspect: IAspect)
        {
            console.log("Hello!");
            console.log("Hello again!");
        }
    }
}