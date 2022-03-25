import { MXContainer } from 'pages/mx/container/mxcontainer';
import { XYCoord, useDragLayer } from 'react-dnd';

import './dndlayer.scss';

export const ItemTypes = {
  CONTAINER: 'container',
};

export function getDragLayerStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export function CustomDragLayer() {
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const renderItem = () => {
    debugger;
    console.log(itemType);
    switch (itemType) {
      case ItemTypes.CONTAINER:
        return (
          <div className="dragitem">
            <MXContainer showInfo={false} proposalName={'MX415'} containerType={item.containerType} containerId={item.containerId}></MXContainer>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isDragging) {
    return null;
  }

  return (
    <div className="draglayer">
      <div style={getDragLayerStyles(initialOffset, currentOffset)}>{renderItem()}</div>
    </div>
  );
}
