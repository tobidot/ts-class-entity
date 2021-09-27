/**
 * Definition of the Component class,
 * wich should be constructable with only its parent
 */
export interface ClassComponentClassInterface<PARENT, COMPONENT> {
    new(parent: COMPONENT): PARENT;
}

/**
 * A Component needs to have a reference to it parent
 */
export interface ClassComponentInterface<PARENT> {
    parent: PARENT;
}

/**
 * A 'Not'-Component
 * Used to as a quick way to fill a component that is not used
 */
export class EmptyClassComponent<PARENT = any> implements ClassComponentInterface<PARENT> {
    public constructor(
        public parent: PARENT
    ) {

    }
}
