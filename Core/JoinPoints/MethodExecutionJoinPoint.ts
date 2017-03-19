import { JoinPointTypes } from "./JoinPointTypes";

export class MethodExecutionJoinPoint
{
    public readonly Type: JoinPointTypes = JoinPointTypes.MethodExecution;
    public readonly Target: Object;
    public readonly MethodName: string;
    public readonly MethodArguments: Array<any>;
    public MethodResult: any;

    public constructor(target: Object, methodName: string, methodArguments?: Array<any>)
    {
        this.Target = target;
        this.MethodName = methodName;
        this.MethodArguments = methodArguments || [];
    }
}