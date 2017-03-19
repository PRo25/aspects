declare module "PointCuts/MemberMatchPredicate" {
    export type MemberMatchPredicate = (target: Object, memberName: string) => boolean;
}
declare module "Advices/Advice" {
    export abstract class Advice {
        protected readonly Action: Function;
        constructor(action: Function);
        abstract CreateAdvisedMember(target: Object, memberName: string): Function;
    }
}
declare module "JoinPoints/JoinPointTypes" {
    export enum JoinPointTypes {
        MethodExecution = 0,
    }
}
declare module "PointCuts/PointCut" {
    import { Advice } from "Advices/Advice";
    import { JoinPointTypes } from "JoinPoints/JoinPointTypes";
    import { MemberMatchPredicate } from "PointCuts/MemberMatchPredicate";
    export class PointCut {
        protected readonly MatchPredicate: MemberMatchPredicate;
        readonly Advice: Advice;
        readonly JoinPointType: JoinPointTypes;
        constructor(matchPredicate: MemberMatchPredicate, advice: Advice, joinPointType: JoinPointTypes);
        IsMatch(target: Object, memberName: string): boolean;
    }
}
declare module "JoinPoints/MethodExecutionJoinPoint" {
    import { JoinPointTypes } from "JoinPoints/JoinPointTypes";
    export class MethodExecutionJoinPoint {
        readonly Type: JoinPointTypes;
        readonly Target: Object;
        readonly MethodName: string;
        readonly MethodArguments: Array<any>;
        MethodResult: any;
        constructor(target: Object, methodName: string, methodArguments?: Array<any>);
    }
}
declare module "Advices/AfterMethodExecutionAdvice" {
    import { Advice } from "Advices/Advice";
    export class AfterMethodExecutionAdvice extends Advice {
        constructor(action: Function);
        CreateAdvisedMember(target: Object, methodName: string): Function;
    }
}
declare module "Advices/BeforeMethodExecutionAdvice" {
    import { Advice } from "Advices/Advice";
    export class BeforeMethodExecutionAdvice extends Advice {
        constructor(action: Function);
        CreateAdvisedMember(target: Object, methodName: string): Function;
    }
}
declare module "Advices/OnErrorThrownInMethodExecutionAdvice" {
    import { Advice } from "Advices/Advice";
    export class OnErrorThrownInMethodExecutionAdvice extends Advice {
        constructor(action: Function);
        CreateAdvisedMember(target: Object, methodName: string): Function;
    }
}
declare module "Aspect" {
    import { MemberMatchPredicate } from "PointCuts/MemberMatchPredicate";
    export abstract class Aspect {
        private pointCuts;
        constructor();
        protected abstract Setup(): void;
        protected InterceptBeforeMethodExecution(onInterceptionAction: Function, memberMatchPredicate?: MemberMatchPredicate): void;
        private AddNewPointCutForMethodExecution(advice, memberMatchPredicate);
        private GetMemberMatchPredicateOrDefault(memberMatchPredicate);
        protected InterceptAfterMethodExecution(onInterceptionAction: Function, memberMatchPredicate?: MemberMatchPredicate): void;
        protected InterceptOnErrorThrownInMethodExecution(onInterceptionAction: Function, memberMatchPredicate?: MemberMatchPredicate): void;
        Weave(target: Object): void;
        protected abstract CanWeave(target: Object): boolean;
        private WeaveMembers(target);
        private WeaveMemberIfAnyMatch(target, memberName);
        private WeaveMember(target, memberName, matchingAdvices);
    }
}
