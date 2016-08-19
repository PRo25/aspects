namespace PRoAspects.Core
{
    export interface IAspect
    {
        IsMatch(method: Function): boolean;
    }
}
