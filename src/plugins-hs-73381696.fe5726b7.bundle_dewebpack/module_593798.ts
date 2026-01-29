import { useRef, useState, useEffect } from 'react';
import { Scroll } from './Scroll';
import { LayerListItem } from './LayerListItem';

interface Layer {
  id: string;
  [key: string]: unknown;
}

interface LayerItem {
  layer: Layer | null;
  name?: string;
  text?: string;
  status: boolean;
  index: number;
}

interface AdjacentLayers {
  prev?: Layer;
  next?: Layer;
}

interface LayerListProps {
  items: LayerItem[];
  isVisible: boolean;
  activeLayer: Layer;
  isDarkMode?: boolean;
  isReadOnlyMode?: boolean;
  isEditMode?: boolean;
  renameLayer: (layer: Layer, name: string) => void;
  removeLayer: (layer: Layer) => void;
  resetLayerIndex: (layer: Layer, adjacent: AdjacentLayers) => void;
  chooseLayer: (layer: Layer) => void;
}

interface DragConfig {
  scrollSpeed: number;
  nodeSelector: string;
  handleSelector: string;
  enableScroll: boolean;
  onDragEnd?: (fromIndex: number, toIndex: number) => void;
}

const useHideOperations = (props: LayerListProps): [boolean, (value: boolean) => void] => {
  const shouldHide = props.isReadOnlyMode || props.isDarkMode || !props.isEditMode;
  const [isHideOperations, setIsHideOperations] = useState<boolean>(shouldHide);

  useEffect(() => {
    setIsHideOperations(shouldHide);
  }, [shouldHide]);

  return [isHideOperations, setIsHideOperations];
};

const DEFAULT_SCROLL_SPEED = 100;
const SCROLL_DELAY_MS = 200;

const LayerList: React.FC<LayerListProps> = (props) => {
  const activeItemRef = useRef<HTMLDivElement>(null);
  const [isHideOperations, setIsHideOperations] = useHideOperations(props);

  useEffect(() => {
    const currentElement = activeItemRef.current;
    const scrollContainer = currentElement?.parentElement?.parentElement;

    if (currentElement && props.isVisible && scrollContainer) {
      setTimeout(() => {
        scrollContainer.scrollTop = currentElement.offsetTop;
      }, SCROLL_DELAY_MS);
    }
  }, [props.isVisible]);

  const dragConfig: DragConfig = {
    scrollSpeed: DEFAULT_SCROLL_SPEED,
    nodeSelector: '.layer-list-item',
    handleSelector: '.operations>.operation-icon.grab',
    enableScroll: true,
    onDragEnd: (fromIndex: number, toIndex: number) => {
      const reorderedItems = [...props.items];
      const [movedItem] = reorderedItems.splice(fromIndex, 1);
      reorderedItems.splice(toIndex, 0, movedItem);

      const targetLayer = reorderedItems[toIndex].layer;
      const prevLayer = reorderedItems[toIndex + 1]?.layer;
      const nextLayer = reorderedItems[toIndex - 1]?.layer;

      if (targetLayer) {
        props.resetLayerIndex(targetLayer, {
          prev: prevLayer,
          next: nextLayer,
        });
      }
    },
  };

  const containerClassName = `layer-list-container${props.isDarkMode ? ' dark' : ''}`;

  return (
    <div {...dragConfig} className={containerClassName}>
      <Scroll scrollYTip={true} type="simple" showScroll={false}>
        {props.items.map((item, index) => {
          if (!item.layer) {
            return null;
          }

          const isActive = item.layer.id === props.activeLayer.id;
          const displayName = item.name || ResourceManager.getString('plugin_layer_edit_unnamed_layer');

          return (
            <LayerListItem
              key={index}
              index={index}
              name={displayName}
              floorNumber={item.text}
              ref={isActive ? activeItemRef : undefined}
              isActive={item.status}
              isRoot={item.index === 0}
              layer={item.layer}
              isHideOperations={isHideOperations}
              setIsHideOperations={setIsHideOperations}
              renameLayer={props.renameLayer}
              removeLayer={props.removeLayer}
              rearrangeLayer={props.resetLayerIndex}
              chooseLayer={props.chooseLayer}
            />
          );
        })}
      </Scroll>
    </div>
  );
};

export default LayerList;