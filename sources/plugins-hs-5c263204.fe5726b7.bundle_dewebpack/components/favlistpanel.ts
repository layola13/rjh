import { useState, useEffect, useRef, createElement, Fragment } from 'react';
import { Modal, RadioGroup, Radio } from 'some-ui-library';
import { IconfontView, IconfontRadiusView } from 'some-icon-library';
import { FavInput } from './FavInput';

interface FavoriteGroup {
  fid: string;
  name: string;
  collected?: boolean;
}

interface FavListPanelProps {
  favoriteGroups: FavoriteGroup[];
  changeViewPosition?: () => void;
  showCloseBtn?: boolean;
  entityName?: string;
  showEditName?: boolean;
  isBatchMove?: boolean;
  isTopicBatchMove?: boolean;
  hasFaved?: boolean;
  className?: string;
  removeDom?: () => void;
  addGroup?: (folderName: string) => Promise<{ fid: string } | undefined>;
  updateFavorite?: (sourceFolderId: string | undefined, targetFolderId: string) => Promise<void>;
  handleAddFavorite?: (folderId: string) => Promise<void>;
  handleUpdateEntityName?: (entityName: string) => Promise<void>;
  onCancelCallback?: () => void;
  onSubmitCallback?: () => void;
  handleMouseEnter?: () => void;
}

interface OperationParams {
  entityName?: string;
  sourceFolderId?: string;
  folderId?: string;
  folderName?: string;
}

interface FavStatusParams {
  favStatus: 0 | 1;
  succeededTitle?: string;
  failedTitle?: string;
  name?: string;
}

enum LiveHintStatus {
  completed = 'completed',
  warning = 'warning'
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const LiveHint: {
  show(message: string, duration: number, _?: undefined, options?: { status: LiveHintStatus; canclose?: boolean }): void;
  statusEnum: typeof LiveHintStatus;
};

export const FavListPanel: React.FC<FavListPanelProps> = (props) => {
  const {
    favoriteGroups,
    changeViewPosition,
    showCloseBtn,
    entityName,
    showEditName,
    isBatchMove,
    isTopicBatchMove,
    hasFaved,
    className,
    removeDom,
    addGroup,
    updateFavorite,
    handleAddFavorite,
    handleUpdateEntityName,
    onCancelCallback,
    onSubmitCallback,
  } = props;

  const defaultGroup = favoriteGroups.find((group) => group.collected === true) || favoriteGroups[0];
  const [selectedGroup, setSelectedGroup] = useState<FavoriteGroup>(defaultGroup);
  const [isFavorited, setIsFavorited] = useState<boolean>(hasFaved ?? false);
  const [isEditingName, setIsEditingName] = useState<boolean>(true);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const entityNameRef = useRef<string | undefined>(entityName);
  const leaveTimeoutRef = useRef<number | undefined>(undefined);

  const titleText = ResourceManager.getString(
    isFavorited ? 'plugin_fav_group_move_to' : 'plugin_fav_group_collect_to'
  );

  useEffect(() => {
    if (changeViewPosition) {
      changeViewPosition();
    }
  }, []);

  const performFavoriteOperation = (
    sourceFolderId: string | undefined,
    targetFolderId: string
  ): Promise<void> => {
    if (!targetFolderId) {
      return Promise.reject();
    }

    if (isTopicBatchMove || isBatchMove || (isFavorited && sourceFolderId)) {
      return updateFavorite?.(sourceFolderId, targetFolderId) ?? Promise.resolve();
    }

    if (isFavorited) {
      return Promise.resolve();
    }

    return handleAddFavorite?.(targetFolderId) ?? Promise.resolve();
  };

  const executeOperation = async (params: OperationParams): Promise<void> => {
    const { entityName: newEntityName, sourceFolderId, folderId, folderName } = params;
    let targetFolderId = folderId || selectedGroup.fid;

    return new Promise(async (resolve, reject) => {
      // Update entity name if provided
      if (newEntityName) {
        try {
          await handleUpdateEntityName?.(newEntityName);
        } catch (error) {
          reject(ResourceManager.getString('catalog_update_model_name_failed'));
          return;
        }
      }

      // Create new folder if folder name provided
      if (folderName) {
        try {
          const result = await addGroup?.(folderName);
          targetFolderId = result?.fid ?? targetFolderId;
        } catch (error: any) {
          const errorCode = error?.ret;
          if (errorCode?.includes('FAIL_BIZ_NAME_SPECIAL_CHARACTERS')) {
            LiveHint.show(
              ResourceManager.getString('favorite_special_characters_error_message'),
              2000,
              undefined,
              { status: LiveHintStatus.warning, canclose: true }
            );
          } else {
            reject(ResourceManager.getString('catalog_add_group_failed'));
          }
          return;
        }
      }

      if (!targetFolderId) {
        return;
      }

      const targetGroup = favoriteGroups.find((group) => group.fid === targetFolderId);

      try {
        await performFavoriteOperation(sourceFolderId, targetFolderId);
        const displayName = folderName || targetGroup?.name;
        resolve(displayName);
      } catch (error) {
        reject(ResourceManager.getString('catalog_fav_failed'));
      }
    });
  };

  const submitOperation = (params: OperationParams): void => {
    const currentEntityName = params.entityName || entityNameRef.current;

    if (showEditName && !currentEntityName) {
      return;
    }

    const operationPromise = executeOperation({
      ...params,
      sourceFolderId: defaultGroup.fid,
      entityName: currentEntityName,
    });

    operationPromise
      .then((folderName) => {
        const successMessage = ResourceManager.getString(
          isFavorited ? 'plugin_fav_group_moved' : 'plugin_fav_group_collected'
        );
        showFavStatus({
          favStatus: 1,
          succeededTitle: successMessage,
          name: folderName,
        });
        setIsFavorited(true);
        onSubmitCallback?.();
      })
      .catch((errorMessage) => {
        showFavStatus({
          favStatus: 0,
          failedTitle: errorMessage,
        });
        setIsFavorited(false);
        onCancelCallback?.();
      });

    setIsPanelVisible(false);
    removeDom?.();
  };

  const showBatchMoveConfirmation = (targetFolderId: string): void => {
    setIsModalOpen(true);

    const targetGroup = favoriteGroups.find((group) => group.fid === targetFolderId);
    const modalTitle = isTopicBatchMove
      ? ResourceManager.getString('plugin_fav_group_topic_batch_move')
      : ResourceManager.getString('plugin_fav_group_batch_move');

    const modalContent = isTopicBatchMove
      ? ResourceManager.getString('plugin_fav_group_topic_batch_move_content')
      : ResourceManager.getString('plugin_fav_group_batch_move_from_tip')
          .replace('%from', defaultGroup.name)
          .replace('%to', targetGroup?.name ?? '');

    Modal.basic({
      title: modalTitle,
      content: modalContent,
      okButtonContent: ResourceManager.getString('messageDialog_OK'),
      cancelButtonContent: ResourceManager.getString('cancel'),
      enableCheckbox: false,
      onOk: () => {
        if (targetGroup) {
          submitOperation({ folderId: targetFolderId });
        } else if (isTopicBatchMove) {
          submitOperation({ folderName: targetFolderId });
        } else {
          submitOperation({ folderId: targetFolderId });
        }
        setIsModalOpen(false);
      },
      onCancel: () => {
        setIsModalOpen(false);
        closePanel();
      },
      onClose: () => {
        setIsModalOpen(false);
        closePanel();
      },
    });
  };

  const handleGroupChange = (targetFolderId: string): void => {
    const targetGroup = favoriteGroups.find((group) => group.fid === targetFolderId);
    if (targetGroup) {
      setSelectedGroup(targetGroup);
    }

    const isBatch = isBatchMove || isTopicBatchMove;
    const shouldConfirm = isBatch || (!isBatch && isFavorited);

    if (shouldConfirm) {
      showBatchMoveConfirmation(targetFolderId);
    } else {
      submitOperation({ folderId: targetFolderId });
    }
  };

  const closePanel = (): void => {
    setIsPanelVisible(false);
    removeDom?.();
  };

  const showFavStatus = (params: FavStatusParams): void => {
    const { favStatus, succeededTitle, failedTitle, name } = params;

    if (favStatus === 1 && succeededTitle && name) {
      LiveHint.show(
        `${succeededTitle} 【${name}】${ResourceManager.getString('merchant_fav_folder')}`,
        3000,
        undefined,
        { status: LiveHintStatus.completed }
      );
    } else if (favStatus === 0 && failedTitle) {
      LiveHint.show(failedTitle, 3000, undefined, { status: LiveHintStatus.warning });
    }
  };

  const handleMouseLeave = (): void => {
    if (isModalOpen) {
      return;
    }

    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }

    leaveTimeoutRef.current = window.setTimeout(() => {
      if (isFavorited) {
        closePanel();
      } else {
        submitOperation({ folderId: defaultGroup.fid });
      }
    }, 1000);
  };

  const handleMouseEnter = (): void => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    props.handleMouseEnter?.();
  };

  return createElement(Fragment, null,
    isPanelVisible && createElement('div', {
      className: `hsc-fav-group-panel ${className ?? ''}`,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
      createElement('div', { className: 'header' },
        showEditName
          ? createElement('div', { className: 'edit-name' },
              isEditingName
                ? createElement('div', {
                    className: 'normal-status',
                    onClick: () => setIsEditingName(false),
                  },
                    createElement(IconfontView, {
                      customClass: 'edit',
                      showType: 'hs_mian_bianji',
                      customStyle: { fontSize: '14px', color: '#1c1c1c' },
                    }),
                    createElement('div', { className: 'name' }, entityName)
                  )
                : createElement(FavInput, {
                    type: 'small',
                    onSubmit: (name: string) => submitOperation({ entityName: name }),
                    value: entityName,
                    getValue: (value: string) => { entityNameRef.current = value; },
                    checkValid: (value: string) => !!value.trim(),
                    errorTips: '输入模型名称',
                    initialValid: true,
                    primaryFocus: true,
                  })
            )
          : createElement('p', { className: 'title' }, titleText),
        showCloseBtn && createElement('div', {
          className: 'close-area',
          onClick: closePanel,
        },
          createElement(IconfontRadiusView, {
            customClass: 'close-icon',
            showType: 'hs_xian_guanbi',
            customStyle: { fontSize: '14px', color: '#9B9FAB' },
            background: {
              width: '20px',
              height: '20px',
              borderRadius: '10px',
              background: '#f5f5f5',
            },
          })
        )
      ),
      createElement('div', { className: 'item-group' },
        showEditName && createElement('p', { className: 'title' }, titleText),
        createElement(RadioGroup, {
          value: selectedGroup.fid,
          onChange: handleGroupChange,
        },
          favoriteGroups.map((group) =>
            createElement('div', { className: 'item-content', key: group.fid },
              createElement(Radio, { value: group.fid }, group.name)
            )
          )
        )
      ),
      createElement('div', { className: 'footer' },
        createElement(FavInput, {
          type: 'small',
          favoriteGroups: favoriteGroups,
          onSubmit: (folderName: string) => {
            if (isTopicBatchMove) {
              showBatchMoveConfirmation(folderName);
            } else {
              submitOperation({ folderName });
            }
          },
          placeholder: ResourceManager.getString('plugin_catalog_new_group'),
        })
      )
    )
  );
};