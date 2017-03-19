import { Advice } from "./Advice";
import { MethodExecutionJoinPoint } from "../JoinPoints/MethodExecutionJoinPoint";

export class OnErrorThrownInMethodExecutionAdvice extends Advice
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
            try
            {
                return originalMethod.apply(target, joinPoint.MethodArguments);
            }
            catch (error)
            {
                this.Action(error, joinPoint);
            }
        };
        return advisedMethod;
    }
}