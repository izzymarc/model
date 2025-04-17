declare module 'react-scroll' {
  import * as React from 'react';

  export interface Link extends React.FC<{
    activeClass?: string;
    to: string;
    spy?: boolean;
    smooth?: boolean;
    offset?: number;
    duration?: number;
    delay?: number;
    isDynamic?: boolean;
    onSetActive?: (to: string) => void;
    onSetInactive?: () => void;
    ignoreCancelEvents?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onClick?: () => void;
  }> {}

  export interface Element extends React.FC<{
    name: string;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }> {}

  export interface ScrollProps {
    to: string;
    containerId?: string;
    offset?: number;
    duration?: number;
    delay?: number;
    smooth?: boolean;
    spy?: boolean;
    isDynamic?: boolean;
    onSetActive?: (to: string) => void;
    onSetInactive?: () => void;
    absolute?: boolean;
    ignoreCancelEvents?: boolean;
  }

  export const Link: Link;
  export const Element: Element;
  export const Events: {
    scrollEvent: {
      register: (name: string, callback: (e: any) => void) => void;
      remove: (name: string) => void;
    };
  };
  export const scroll: {
    scrollToTop: (options?: ScrollProps) => void;
    scrollToBottom: (options?: ScrollProps) => void;
    scrollTo: (to: string | number, options?: ScrollProps) => void;
    scrollMore: (pixels: number, options?: ScrollProps) => void;
  };
  export const scroller: {
    scrollTo: (to: string, options?: ScrollProps) => void;
  };
} 