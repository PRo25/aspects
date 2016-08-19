namespace PRoAspects.Core
{
    export class Interceptor
    {
        public constructor() 
        {
            
        }

        public ApplyAspect(obj: Object, aspect: any)
        {
            console.log("Hello!");
            console.log("Hello again!");
        }
    }
}