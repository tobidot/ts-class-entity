import { EventBase, EventSocket, Class } from "@game.object/ts-game-toolbox";
import { ClassComponentInterface, EmptyClassComponent } from "./ClassComponent";

/// Find the parent class for a class entity
export type GetParentOfClassEntity<ENTITY> = ENTITY extends { parent: infer PARENT } ? PARENT : never;
/// Find the settings interface for a class entity
export type GetSettingsOfClassEntity<ENTITY> = ENTITY extends { settings: infer SETTINGS } ? SETTINGS : never;

type GetComponentsParent<COMPONENT> = COMPONENT extends { parent: infer PARENT } ? PARENT : never;

type ComponentClass<COMPONENT> = {
    new(entity: GetComponentsParent<COMPONENT>): COMPONENT
}

/**
 * A small entitiy with only the basic components.
 * Wich separates the logic from the data inside itslef.
 * It also provides an event socket for events to bubble up.
 * 
 * logic => Contains helper functions for this entity
 * props => Contains all the data this component works on
 */
export abstract class SimpleBaseClassEntity<
    // The final Class type
    SELF,
    // The Parent of this entity
    PARENT,
    // Contains helper functions for this entity
    LOGIC extends ClassComponentInterface<SELF> = EmptyClassComponent<SELF>,
    // Contains all the data this component works on
    PROPERTIES extends ClassComponentInterface<SELF> = EmptyClassComponent<SELF>,
    // Union of events this class might emit
    EVENTS extends EventBase = EventBase
    > {
    public parent: PARENT;
    public logic: LOGIC;
    public props: PROPERTIES;
    public events: EventSocket<EVENTS> = new EventSocket();

    public constructor(
        parent: PARENT,
        logic_class: Class<LOGIC>,
        properties_class: Class<PROPERTIES>,
    ) {
        this.parent = parent;
        this.logic = new logic_class(this);
        this.props = new properties_class(this);
    }
}

/**
 * The default class entity extending the @see SimpleBaseClassEntity
 * 
 * 
 *  
 */
export abstract class BaseClassEntity<
    // The final Class type
    SELF,
    // The Parent of this entity
    PARENT,
    // A fixed input the entity promises to never change kind of serving as construction parameters    
    SETTINGS = {},
    // Save references from a static prebuild environment, that will be used from this class (e.g.: HtmlElements in a dom)
    REFERENCES extends ClassComponentInterface<SELF> = EmptyClassComponent,
    // Contains helper functions for this entity
    LOGIC extends ClassComponentInterface<SELF> = EmptyClassComponent,
    // Contains all the data this component works on
    PROPERTIES extends ClassComponentInterface<SELF> = EmptyClassComponent,
    // Sub entites owned by this class
    COMPONENTS extends ClassComponentInterface<SELF> = EmptyClassComponent,
    // Register all listeners for external changes here
    LISTENERS extends ClassComponentInterface<SELF> = EmptyClassComponent,
    // Union of events this class might emit
    EVENTS extends EventBase = EventBase
    > extends SimpleBaseClassEntity<
    SELF,
    PARENT,
    LOGIC,
    PROPERTIES,
    EVENTS
    > {

    public settings: Readonly<SETTINGS>;
    public refs: REFERENCES;
    public components: COMPONENTS;
    public listeners: LISTENERS;
    public events: EventSocket<EVENTS> = new EventSocket();

    public constructor(
        parent: PARENT,
        refs_class: Class<REFERENCES>,
        logic_class: Class<LOGIC>,
        properties_class: Class<PROPERTIES>,
        components_class: Class<COMPONENTS>,
        listeners_class: Class<LISTENERS>,
        default_settings: SETTINGS,
        settings: Partial<SETTINGS>,
    ) {
        super(parent, logic_class, properties_class);
        this.settings = Object.assign({}, default_settings, settings);
        this.refs = new refs_class(this);
        this.components = new components_class(this);
        this.listeners = new listeners_class(this);
    }
}

