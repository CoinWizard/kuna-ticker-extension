declare module '*.svg' {
    import { ComponentType, ClassAttributes, SVGAttributes } from 'react';

    const svg: ComponentType<ClassAttributes<SVGElement> & SVGAttributes<SVGElement>>;
    export = svg;
}
