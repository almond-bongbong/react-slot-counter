import React from 'react';
interface RefAttributes {
    reload: () => void;
}
interface Props {
    value: string | number;
    fontWidth?: string | number;
}
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<RefAttributes>>;
export default _default;
