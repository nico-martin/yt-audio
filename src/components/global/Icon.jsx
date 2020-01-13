// @flow

import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import cn from 'classnames';

import './Icon.css';

type Props = {
  icon: string,
  className?: string,
  rotate?: 90 | 180 | 270 | false,
  spinning?: boolean,
};

const Icon = ({
  icon,
  className = '',
  spinning = false,
  rotate = false,
}: {
  icon: string,
  className?: string,
  rotate?: 90 | 180 | 270 | false,
  spinning?: boolean,
}) => {
  const [loadedIcon: string, setLoadedIcon] = useState('');

  useEffect(() => {
    async function loadIcon() {
      return await import(
        /* webpackMode: "eager" */ `@app/assets/icons/${icon}.svg`
      );
    }
    loadIcon().then(loaded => setLoadedIcon(loaded.default));
  }, [icon]);

  return (
    <span
      className={cn(
        className,
        'icon',
        rotate !== false ? `icon--rotate-${rotate}` : '',
        {
          'icon--animation-spin': spinning,
        }
      )}
      dangerouslySetInnerHTML={{ __html: loadedIcon }}
    />
  );
};

export default Icon;
