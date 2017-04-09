import { Advice } from "./Advice";
import { MethodExecutionJoinPoint } from "../JoinPoints/MethodExecutionJoinPoint";

export class AfterMethodExecutionAdvice extends Advice
{
    public constructor(action: Function)
    {
        super(action);
    }

    public CreateAdvisedMember(target: Object, methodName: string): Function
    {
        let thisAdvice: AfterMethodExecutionAdvice = this;
        let originalMethod: Function = target[methodName];
        let advisedMethod: Function = function(...args: Array<any>)
        {
            let joinPoint = new MethodExecutionJoinPoint(this, methodName, args);
            joinPoint.MethodResult = originalMethod.apply(this, joinPoint.MethodArguments);
            thisAdvice.Action(joinPoint);
            return joinPoint.MethodResult;
        };
        return advisedMethod;
    }
}