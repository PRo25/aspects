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
        let originalMethod: Function = target[methodName];
        let advisedMethod: Function = (...args: Array<any>) =>
        {
            let joinPoint = new MethodExecutionJoinPoint(target, methodName, args);
            joinPoint.MethodResult = originalMethod.apply(target, joinPoint.MethodArguments);
            this.Action(joinPoint);
            return joinPoint.MethodResult;
        };
        return advisedMethod;
    }
}