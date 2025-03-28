import React from 'react';
import DeleteIcon from '../../assets/delete-icon.svg';
import RestartIcon from '../../assets/restart-icon.svg';
import AddIcon from '../../assets/add-icon.svg';
import DividerIcon from '../../assets/divider.svg';
import RetryIcon from '../../assets/retry-icon.svg';

interface IconProps {
  name: 'restart' | 'add' | 'delete' | 'divider' | 'retry';
  width?: number;
  height?: number;
}

const Icon: React.FC<IconProps> = ({ name, width = 16, height = 16 }) => {
  let src;

  switch (name) {
    case 'restart':
      src = RestartIcon;
      break;
    case 'add':
      src = AddIcon;
      break;
    case 'delete':
      src = DeleteIcon;
      break;
    case 'divider':
      src = DividerIcon;
      break;
    case 'retry':
      src = RetryIcon;
      break;
    default:
      return null;
  }

  return <img src={src} alt={`${name} logo`} width={width} height={height} />;
};

export default Icon;
