import { Advice } from "./Advice";
import { MethodExecutionJoinPoint } from "../JoinPoints/MethodExecutionJoinPoint";

export class BeforeMethodExecutionAdvice extends Advice
{
    public constructor(action: Function)
    {
        super(action);
    }

    public CreateAdvisedMember(target: Object, methodName: string): Function
    {
        let thisAdvice: BeforeMethodExecutionAdvice = this;
        let originalMethod: Function = target[methodName];
        let advisedMethod: Function = function(...args: Array<any>)
        {
            let joinPoint = new MethodExecutionJoinPoint(this, methodName, args);
            thisAdvice.Action(joinPoint);
            joinPoint.MethodResult = originalMethod.apply(this, joinPoint.MethodArguments);
            return joinPoint.MethodResult;
        };
        return advisedMethod;
    }
}