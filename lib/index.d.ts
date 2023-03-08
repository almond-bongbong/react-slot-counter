import React from 'react';
interface RefAttributes {
    reload: () => void;
}
interface Props {
    value: string | number;
    duration?: number;
    charClassName?: string;
}
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<RefAttributes>>;
export default _default;
