interface Member {
  group: Group | null;
  isFlagOn(flag: number): boolean;
}

interface Group {
  exclude(member: Member): void;
  include(member: Member): void;
  toFlatMemberList(includeNested: boolean): Member[];
}

interface CommandManager {
  cancel(command: Command): void;
  complete(command: Command): void;
}

declare namespace HSCore.Model {
  enum EntityFlagEnum {
    removed
  }
}

declare namespace HSApp.Selection {
  class Manager {
    static unselectAll(): void;
  }
}

declare namespace HSApp.Cmd {
  abstract class Command {
    protected mgr: CommandManager;
    abstract onExecute(): void;
    abstract onUndo(): void;
    abstract onRedo(): void;
    abstract getCategory(): string;
  }
}

declare namespace HSFPConstants {
  enum LogGroupTypes {
    ContentOperation = "ContentOperation"
  }
}

declare function assert(condition: boolean, message: string): void;

export default class ExcludeMemberCommand extends HSApp.Cmd.Command {
  private member: Member;

  constructor(member: Member) {
    super();
    this.member = member;
  }

  onExecute(): void {
    const { member } = this;
    const group = member.group;

    if (!group || member.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
      assert(false, "not a valid include target");
      this.mgr.cancel(this);
      return;
    }

    group.exclude(member);

    if (group.toFlatMemberList(true).length === 0) {
      HSApp.Selection.Manager.unselectAll();
    }

    this.mgr.complete(this);
  }

  onUndo(): void {
    const { member } = this;
    member.group?.include(member);
  }

  onRedo(): void {
    const { member } = this;
    member.group?.exclude(member);
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}