interface Member {
  group: Group | null;
  isFlagOff(flag: number): boolean;
}

interface Group {
  include(member: Member): void;
  exclude(member: Member): void;
}

interface CommandManager {
  cancel(command: Command): void;
  complete(command: Command): void;
}

abstract class Command {
  protected mgr!: CommandManager;
  
  abstract onExecute(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
  abstract getCategory(): number;
}

class IncludeMemberCommand extends Command {
  private member: Member;

  constructor(member: Member) {
    super();
    this.member = member;
  }

  onExecute(): void {
    const { member } = this;
    const group = member.group;
    
    if (!group || member.isFlagOff(HSCore.Model.EntityFlagEnum.removed)) {
      assert(false, "not a valid include target");
      this.mgr.cancel(this);
      return;
    }
    
    group.include(member);
    this.mgr.complete(this);
  }

  onUndo(): void {
    const { member } = this;
    member.group?.exclude(member);
  }

  onRedo(): void {
    const { member } = this;
    member.group?.include(member);
  }

  getCategory(): number {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default IncludeMemberCommand;