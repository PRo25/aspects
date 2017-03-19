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
        let originalMethod: Function = target[methodName];
        let advisedMethod: Function = (...args: Array<any>) =>
        {
            let joinPoint = new MethodExecutionJoinPoint(target, methodName, args);
            this.Action(joinPoint);
            joinPoint.MethodResult = originalMethod.apply(target, joinPoint.MethodArguments);
            return joinPoint.MethodResult;
        };
        return advisedMethod;
    }
}