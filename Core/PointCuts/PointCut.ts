import { Advice } from "../Advices/Advice";
import { JoinPointTypes } from "../JoinPoints/JoinPointTypes";
import { MemberMatchPredicate } from "./MemberMatchPredicate";

export class PointCut
{
    protected readonly MatchPredicate: MemberMatchPredicate;

    public readonly Advice: Advice;
    public readonly JoinPointType: JoinPointTypes;

    public constructor(matchPredicate: MemberMatchPredicate, advice: Advice, joinPointType: JoinPointTypes)
    {
        this.MatchPredicate = matchPredicate;
        this.Advice = advice;
        this.JoinPointType = joinPointType;
    }

    public IsMatch(target: Object, memberName: string): boolean
    {
        let isMatch: boolean = false;
        if (this.JoinPointType == JoinPointTypes.MethodExecution)
        {
            isMatch = target[memberName] instanceof Function
                && this.MatchPredicate(target, memberName);
        }
        return isMatch;
    }
}
