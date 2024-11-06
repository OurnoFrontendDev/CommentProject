import React, { FC } from 'react';
import classNames from 'classnames';

type SvgProps = React.SVGProps<SVGSVGElement>;

interface IconBaseProps extends SvgProps {
  className?: string;
  src?: string;
  Svg?: React.VFC<SvgProps>;
  width?: number | string;
  height?: number | string;
  alt?: string;
  borderRadius: number | string;
}

export const iconLoader: FC<IconBaseProps> = (props) => {
  const { className, Svg, src, width, height, alt, borderRadius } = props;

  if (src) {
    return (
      <img
        className={classNames(className)}
        src={src}
        width={width}
        height={height}
        alt={alt}
        style={{ borderRadius }}
      />
    );
  }

  if (Svg) {
    return (
      <Svg
        className={classNames(className)}
        width={width}
        height={height}
        style={{ borderRadius }}
      />
    );
  }

  return null;
};
