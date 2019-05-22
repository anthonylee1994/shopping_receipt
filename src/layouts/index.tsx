import React from 'react';
import MaterialUI from '@/components/MaterialUI';

interface IBasicLayoutProps {
  children: any;
}

const BasicLayout = (props: IBasicLayoutProps) => {
  return (
    <MaterialUI>
      {props.children}
    </MaterialUI>
  );
};

export default BasicLayout;
