import cn from 'classnames';
import React from 'react';
import './Icon.css';
import icons, { IconNamesT } from '../global/icons';

interface Props {
  icon: IconNamesT;
  className?: string;
  rotate?: 90 | 180 | 270 | false;
  spinning?: boolean;
}

const Icon = ({
  icon,
  className = '',
  spinning = false,
  rotate = false,
}: Props) => {
  const Icon = icon && icon in icons ? icons[icon] : null;

  return (
    <div
      className={cn(
        className,
        'icon',
        rotate !== false ? `icon--rotate-${rotate}` : '',
        {
          'icon--animation-spin': spinning,
        }
      )}
    >
      <Icon />
    </div>
  );
};

export default Icon;
