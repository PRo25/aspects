import { MemberMatchPredicate } from "./PointCuts/MemberMatchPredicate";
import { PointCut } from "./PointCuts/PointCut";
import { Advice } from "./Advices/Advice";
import { AfterMethodExecutionAdvice } from "./Advices/AfterMethodExecutionAdvice";
import { BeforeMethodExecutionAdvice } from "./Advices/BeforeMethodExecutionAdvice";
import { OnErrorThrownInMethodExecutionAdvice } from "./Advices/OnErrorThrownInMethodExecutionAdvice";
import { JoinPointTypes } from "./JoinPoints/JoinPointTypes";

export abstract class Aspect
{
    private pointCuts: Array<PointCut> = [];

    public constructor()
    {
        this.Setup();
    }

    protected abstract Setup(): void;

    protected InterceptBeforeMethodExecution(onInterceptionAction: Function,
        memberMatchPredicate: MemberMatchPredicate = null): void
    {
        let advice: Advice = new BeforeMethodExecutionAdvice(onInterceptionAction);
        this.AddNewPointCutForMethodExecution(advice, memberMatchPredicate);
    }

    private AddNewPointCutForMethodExecution(advice: Advice, memberMatchPredicate: MemberMatchPredicate): void
    {
        memberMatchPredicate = this.GetMemberMatchPredicateOrDefault(memberMatchPredicate);
        let pointCut: PointCut = new PointCut(memberMatchPredicate, advice, JoinPointTypes.MethodExecution);
        this.pointCuts.push(pointCut);
    }

    private GetMemberMatchPredicateOrDefault(memberMatchPredicate: MemberMatchPredicate): MemberMatchPredicate
    {
        if (memberMatchPredicate == null)
        {
            memberMatchPredicate = (target, memberName) => { return true; };
        }
        return memberMatchPredicate;
    }

    protected InterceptAfterMethodExecution(onInterceptionAction: Function,
        memberMatchPredicate: MemberMatchPredicate = null): void
    {
        let advice: Advice = new AfterMethodExecutionAdvice(onInterceptionAction);
        this.AddNewPointCutForMethodExecution(advice, memberMatchPredicate);
    }

    protected InterceptOnErrorThrownInMethodExecution(onInterceptionAction: Function,
        memberMatchPredicate: MemberMatchPredicate = null): void
    {
        let advice: Advice = new OnErrorThrownInMethodExecutionAdvice(onInterceptionAction);
        this.AddNewPointCutForMethodExecution(advice, memberMatchPredicate);
    }

    public Weave(target: Object): void
    {
        if (this.CanWeave(target))
        {
            this.WeaveMembers(target);
        }
    }

    protected abstract CanWeave(target: Object): boolean;

    private WeaveMembers(target: Object): void
    {
        for (let memberName in target)
        {
            if (memberName != "constructor")
            {
                this.WeaveMemberIfAnyMatch(target, memberName);
            }
        }
    }

    private WeaveMemberIfAnyMatch(target: Object, memberName: string): void
    {
        let matchingAdvices: Array<Advice> =
            this.pointCuts.filter(p => p.IsMatch(target, memberName)).map(p => p.Advice);
        if (matchingAdvices.length > 0)
        {
            this.WeaveMember(target, memberName, matchingAdvices);
        }
    }

    private WeaveMember(target: Object, memberName: string, matchingAdvices: Array<Advice>): void
    {
        for (let advice of matchingAdvices)
        {
            target[memberName] = advice.CreateAdvisedMember(target, memberName);
        }
    }
}