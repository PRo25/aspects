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
        let thisAdvice: OnErrorThrownInMethodExecutionAdvice = this;
        let originalMethod: Function = target[methodName];
        let advisedMethod: Function = function(...args: Array<any>)
        {
            let joinPoint = new MethodExecutionJoinPoint(this, methodName, args);
            try
            {
                return originalMethod.apply(this, joinPoint.MethodArguments);
            }
            catch (error)
            {
                thisAdvice.Action(error, joinPoint);
            }
        };
        return advisedMethod;
    }
}