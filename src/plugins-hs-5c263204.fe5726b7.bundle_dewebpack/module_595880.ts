import { Component } from 'react';
import { connect } from 'react-redux';
import { updateGroup, deleteGroup } from './actions';

interface GroupItem {
  fid: string;
  name: string;
  whetherDefault: number;
}

interface ProductGroupInfo {
  seekId: string;
}

interface FavoriteGroupItemProps {
  groupItem: GroupItem;
  isFavoriteProductPage: boolean;
  checked: boolean;
  productGroupInfo: ProductGroupInfo;
  selectedId: string;
  groupItems: GroupItem[];
  onSelectedItem: (fid: string, seekId: string, element: JQuery) => void;
  setCurrentFavgroup: (name: string, fid: string) => void;
  dispatch: (action: any) => void;
}

interface FavoriteGroupItemState {}

interface ReduxState {
  groupItems: GroupItem[];
}

class FavoriteGroupItemUtil {
  static isDuplicateInName(groupItems: GroupItem[], name: string, originName: string): boolean {
    return groupItems.some(item => item.name === name && item.name !== originName);
  }

  static parseURL(fileName: string): string {
    return `assets/images/${fileName}`;
  }
}

const injectSVGImage = (element: HTMLElement | null): void => {
  if (element) {
    ResourceManager.injectSVGImage(element);
  }
};

class FavoriteGroupItem extends Component<FavoriteGroupItemProps, FavoriteGroupItemState> {
  private _listItem: HTMLLIElement | null = null;
  private originTextValue: string = '';
  public signalHook: any;

  constructor(props: FavoriteGroupItemProps) {
    super(props);
    this.signalHook = new HSCore.Util.SignalHook(this);
  }

  componentDidMount(): void {
    const listItem = $(this._listItem);
    listItem.addClass('editok');
    listItem.removeClass('redBorder');
    listItem.removeClass('editing');

    let displayName = this.props.groupItem.name;
    if (this.props.groupItem.fid === 'default') {
      displayName = ResourceManager.getString('favorite_default_group');
    }
    listItem.find('.text').text(displayName);
  }

  private _setListItem = (element: HTMLLIElement | null): void => {
    this._listItem = element;
  };

  private _onSelectedItem(fid: string, seekId: string): void {
    const element = $(this._listItem);
    this.props.onSelectedItem(fid, seekId, element);
  }

  private _onSrearchClick(): void {
    if ($(this._listItem).hasClass('editing')) {
      return;
    }

    let groupName: string;
    if (this.props.groupItem.fid === 'default') {
      groupName = ResourceManager.getString('favorite_default_group');
      this.props.setCurrentFavgroup(groupName, this.props.groupItem.fid);
    } else {
      groupName = this.props.groupItem.name;
      this.props.setCurrentFavgroup(groupName, this.props.groupItem.fid);
    }

    const catalogPlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    const targetFid = this.props.groupItem.fid !== 'all' ? this.props.groupItem.fid : '';
    catalogPlugin.signalFavoritegroupJump.dispatch({
      fid: targetFid,
      name: groupName
    });
  }

  private _onEditClick(event: React.MouseEvent): void {
    event.stopPropagation();

    const editingElement = $(this._listItem).parent('.allGroup').find('.editing');
    if (editingElement.length > 0) {
      editingElement.addClass('editok');
      editingElement.removeClass('editing');
      editingElement.removeClass('redBorder');
    }

    const currentText = $(this._listItem).find('.text').text();
    this.originTextValue = currentText;

    $(this._listItem).addClass('editing');
    $(this._listItem).removeClass('editok');
    $(this._listItem).find('.textInput .input').val('').focus().val(currentText);
  }

  private _onEditOkClick(event: React.MouseEvent | React.KeyboardEvent): void {
    event.stopPropagation();

    const newName = ($(this._listItem).find('.textInput .input').val() as string).trim();
    
    if (FavoriteGroupItemUtil.isDuplicateInName(this.props.groupItems, newName, this.originTextValue) || !newName) {
      $(this._listItem).addClass('redBorder');
      LiveHint.show(ResourceManager.getString('favorite_favorite_add_to_group_fail'), 4500, undefined, {
        status: LiveHint.statusEnum.warning,
        canclose: true
      });
      return;
    }

    $(this._listItem).addClass('editok');
    $(this._listItem).removeClass('editing');
    $(this._listItem).removeClass('redBorder');
    $(this._listItem).find('.text').text(newName);

    this.props.dispatch(updateGroup(this.props.groupItem.fid, newName));

    if (this.props.selectedId === this.props.groupItem.fid) {
      this.props.setCurrentFavgroup(newName, this.props.groupItem.fid);
    }
  }

  private _onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.stopPropagation();

    const newName = ($(this._listItem).find('.textInput .input').val() as string).trim();
    
    if (FavoriteGroupItemUtil.isDuplicateInName(this.props.groupItems, newName, this.originTextValue)) {
      $(this._listItem).addClass('redBorder');
    } else {
      $(this._listItem).removeClass('redBorder');
    }
  }

  private _onhandlekeyup(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.keyCode === 13) {
      this._onEditOkClick(event);
    }
  }

  private _deleteClick(event: React.MouseEvent): void {
    event.stopPropagation();

    const title = ResourceManager.getString('favorite_confirm_delete_group_title');
    const content = ResourceManager.getString('favorite_confirm_delete_group_content');
    const confirmButton = ResourceManager.getString('favorite_confirm_delete_group_btn0');
    const cancelButton = ResourceManager.getString('cancel');

    MessageBox.create(content, [cancelButton, confirmButton], 1, { title }, false, false).show((buttonIndex: number) => {
      if (buttonIndex === 0) {
        if (this.props.selectedId === this.props.groupItem.fid) {
          this.props.setCurrentFavgroup(ResourceManager.getString('favorite_all_group'), 'all');
          
          const catalogPlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
          const currentConfig = catalogPlugin.getCurrentConfig();
          currentConfig.fid = '';
          catalogPlugin.setCurrentConfig(currentConfig);
        }

        this.props.dispatch(deleteGroup(this.props.groupItem.fid, this.props.groupItem.name));
      }
    });
  }

  render(): JSX.Element {
    const { isFavoriteProductPage, checked, productGroupInfo, groupItem } = this.props;

    let radioElement: JSX.Element | null = null;
    let textInputElement: JSX.Element | null = null;
    let iconBoxElement: JSX.Element | null = null;

    if (isFavoriteProductPage) {
      if (groupItem.fid !== 'all' && groupItem.whetherDefault !== 0) {
        iconBoxElement = (
          <div className="iconbox">
            <div className="iconboxItem" onClick={this._onEditClick.bind(this)}>
              <span ref={injectSVGImage} data-src={FavoriteGroupItemUtil.parseURL('edit.svg')} />
            </div>
            <div className="iconboxItem" onClick={this._deleteClick.bind(this)}>
              <span ref={injectSVGImage} data-src={FavoriteGroupItemUtil.parseURL('delete.svg')} />
            </div>
          </div>
        );
      }

      textInputElement = (
        <div className="textInput">
          <input
            className="input"
            type="text"
            onKeyUp={this._onhandlekeyup.bind(this)}
            onChange={this._onChange.bind(this)}
          />
          <img
            src="/assets/images/add_group.png"
            className="input_add_group_img"
            onClick={this._onEditOkClick.bind(this)}
          />
        </div>
      );
    } else {
      const radioClassName = checked ? 'radio_input radio_input_checked' : 'radio_input';
      radioElement = (
        <span className={radioClassName}>
          <span className="radio_input_inner" />
        </span>
      );
    }

    const handleClick = isFavoriteProductPage
      ? this._onSrearchClick.bind(this)
      : this._onSelectedItem.bind(this, groupItem.fid, productGroupInfo.seekId);

    return (
      <li onClick={handleClick} ref={this._setListItem}>
        {radioElement}
        <span className="text" />
        {textInputElement}
        {iconBoxElement}
      </li>
    );
  }
}

const mapStateToProps = (state: ReduxState): { groupItems: GroupItem[] } => ({
  groupItems: state.groupItems
});

export default connect(mapStateToProps)(FavoriteGroupItem);