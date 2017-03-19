export abstract class Advice
{
    protected readonly Action: Function;

    public constructor(action: Function)
    {
        this.Action = action;
    }

    public abstract CreateAdvisedMember(target: Object, memberName: string): Function;
}