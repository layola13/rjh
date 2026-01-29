import React, { useState, useRef } from 'react';
import { IconfontView } from './IconfontView';
import { FavInput } from './FavInput';
import { Popover, Button, SmartText } from './UIComponents';

interface FavoriteGroup {
  fid: string;
  name: string;
  itemCount: number;
}

interface AllGroupProps {
  addFolder: (name: string) => Promise<void>;
  updateName: (fid: string, name: string) => Promise<void>;
  deleteFolder: (fid: string, name: string) => void;
  handleClick: (group: FavoriteGroup) => void;
  favoriteGroups: FavoriteGroup[];
  favInputMaxLength: number;
}

interface FavItemProps {
  favoriteGroups: FavoriteGroup[];
  data: FavoriteGroup;
  updateName: (fid: string, name: string) => Promise<void>;
  deleteFolder: (fid: string, name: string) => void;
  handleClick: (group: FavoriteGroup) => void;
  showEdit?: boolean;
  maxLength: number;
}

interface LiveHintOptions {
  status: string;
  canclose: boolean;
}

declare const LiveHint: {
  statusEnum: {
    warning: string;
  };
  show: (message: string, duration: number, extra: undefined, options: LiveHintOptions) => void;
};

declare const MessageBox: {
  create: (content: string, buttons: string[], defaultIndex: number, options: { title: string }) => {
    show: (callback: (index: number) => void) => void;
  };
};

declare const ResourceManager: {
  getString: (key: string) => string;
};

const HINT_DURATION = 2000;
const DEFAULT_BUTTON_INDEX = 0;
const DELETE_CONFIRM_BUTTON_INDEX = 0;
const FIRST_TWO_GROUPS_COUNT = 2;

const FavItem: React.FC<FavItemProps> = ({
  favoriteGroups,
  data,
  updateName,
  deleteFolder,
  handleClick,
  showEdit = true,
  maxLength
}) => {
  const { fid, name } = data;
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const textRef = useRef<HTMLDivElement>({});
  const itemRef = useRef<HTMLDivElement>(null);

  const handleEdit = (event: React.MouseEvent): void => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleDelete = (event: React.MouseEvent, folderId: string, folderName: string): void => {
    event.stopPropagation();
    
    const deleteConfirmBox = MessageBox.create(
      ResourceManager.getString('favorite_confirm_delete_group_content'),
      [
        ResourceManager.getString('cancel'),
        ResourceManager.getString('favorite_confirm_delete_group_btn0')
      ],
      DEFAULT_BUTTON_INDEX,
      { title: ResourceManager.getString('favorite_confirm_delete_group_title') }
    );

    deleteConfirmBox.show((buttonIndex: number) => {
      if (buttonIndex === DELETE_CONFIRM_BUTTON_INDEX) {
        deleteFolder(folderId, folderName);
      }
    });
  };

  const handleSubmit = async (newName: string): Promise<void> => {
    setIsEditing(false);
    
    try {
      await updateName(fid, newName);
    } catch (error: unknown) {
      const err = error as { ret?: string };
      if (err.ret?.includes('FAIL_BIZ_NAME_SPECIAL_CHARACTERS')) {
        const hintOptions: LiveHintOptions = {
          status: LiveHint.statusEnum.warning,
          canclose: true
        };
        LiveHint.show(
          ResourceManager.getString('favorite_special_characters_error_message'),
          HINT_DURATION,
          undefined,
          hintOptions
        );
      }
    }
  };

  const handleBlur = (): void => {
    setIsEditing(false);
  };

  return (
    <div
      className={`fav-item${isEditing ? ' show-input' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={itemRef}
      onClick={() => handleClick(data)}
    >
      <IconfontView showType="hs_zhanshi_wenjianjia" />
      
      {!isEditing && (
        <div className="normal-status">
          <div className="text" ref={textRef}>
            <SmartText>{name || ''}</SmartText>
          </div>
          
          {showEdit && isHovering && (
            <div className="icons">
              <IconfontView
                customClass="edit"
                showType="hs_mian_bianji"
                hoverColor="#396efe"
                customStyle={{ fontSize: '18px', color: '#9B9FAB' }}
                iconOnclick={handleEdit}
              />
              <IconfontView
                customClass="delete"
                showType="hs_mian_shanchu"
                hoverColor="#396efe"
                customStyle={{ fontSize: '18px', color: '#9B9FAB' }}
                iconOnclick={(event: React.MouseEvent) => handleDelete(event, fid, name)}
              />
            </div>
          )}
        </div>
      )}
      
      {isEditing && (
        <FavInput
          className="edit-status"
          type="small"
          favoriteGroups={favoriteGroups}
          onSubmit={handleSubmit}
          placeholder={ResourceManager.getString('plugin_catalog_mygroups_edit')}
          onBlur={handleBlur}
          primaryFocus={true}
          maxLength={maxLength}
        />
      )}
    </div>
  );
};

const AllGroup: React.FC<AllGroupProps> = ({
  addFolder,
  updateName,
  deleteFolder,
  handleClick,
  favoriteGroups,
  favInputMaxLength
}) => {
  let popoverTriggerRef: { close: () => void } | null = null;

  const handleAddFolder = async (folderName: string): Promise<void> => {
    popoverTriggerRef?.close();
    
    if (!addFolder) return;

    try {
      await addFolder(folderName);
    } catch (error: unknown) {
      const err = error as { ret?: string };
      if (err.ret?.includes('FAIL_BIZ_NAME_SPECIAL_CHARACTERS')) {
        const hintOptions: LiveHintOptions = {
          status: LiveHint.statusEnum.warning,
          canclose: true
        };
        LiveHint.show(
          ResourceManager.getString('favorite_special_characters_error_message'),
          HINT_DURATION,
          undefined,
          hintOptions
        );
      }
    }
  };

  const createGroupPopover = (
    <Popover.Item overlayClassName="create-group-input">
      <FavInput
        favoriteGroups={favoriteGroups}
        type="small"
        onSubmit={handleAddFolder}
        maxLength={favInputMaxLength}
      />
    </Popover.Item>
  );

  return (
    <div className="all-group">
      <div className="favorites-group-title">
        <div className="favorites-group-title-label">
          {ResourceManager.getString('catalog_my_group')}
        </div>
        <div className="favorites-group-title-create">
          <Popover.Trigger
            popover={createGroupPopover}
            placement="bottom"
            trigger="hover"
            ref={(ref: { close: () => void } | null) => {
              popoverTriggerRef = ref;
            }}
          >
            <Button className="favorites-group-title-create-btn" type="text">
              <IconfontView showType="hs_xian_tianjia" />
              {ResourceManager.getString('favorite_placeholder_string')}
            </Button>
          </Popover.Trigger>
        </div>
      </div>

      <div className="item-group">
        {favoriteGroups && favoriteGroups.length > 0 && favoriteGroups.map((group, index) => (
          <FavItem
            key={group.fid}
            showEdit={index > FIRST_TWO_GROUPS_COUNT - 1}
            data={group}
            favoriteGroups={favoriteGroups}
            updateName={updateName}
            deleteFolder={deleteFolder}
            handleClick={handleClick}
            maxLength={favInputMaxLength}
          />
        ))}
      </div>
    </div>
  );
};

export default AllGroup;