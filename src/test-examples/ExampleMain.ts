import { ClassComponentInterface, EmptyClassComponent } from "../base/ClassComponent";
import { SimpleBaseClassEntity } from "../base/ClassEntity";
import { ExampleClassEntity } from "./ExampleClassEntity";

/**
 * This is the Main class Entity all entities should be direct or indirect children to this one.
 * Expect this to be instantiated at the start of the program.
 * 
 * This could be made a singleton, if you so desire.
 */
export class ExampleMain extends SimpleBaseClassEntity<
    ExampleMain, {},
    Logic, Properties
> {
    /**
     * You can always add components here 
     */
    public components: Components;

    public constructor() {
        super({}, Logic, Properties);
        this.components = new Components(this);
    }

    /** 
     * =============================
     *  Define primary functions
     * =============================
     * Define functions here that are regularly used from the outside.
     * Most of them should be only proxy functions and the real logic should be 
     * inside the Logic-Component
     */

    /**
     * Update all entities
     */
    public update() {
        this.logic.update();
    }

    /**
     * Adds another entity
     */
    public add_entity() {
        this.logic.add_entity();
    }
}

/**
 * Inner or secondary functions
 */
class Logic implements ClassComponentInterface<ExampleMain> {

    public constructor(
        public parent: ExampleMain
    ) {

    }

    /**
     * Update all entities
     */
    public update() {
        this.parent.props.entities.forEach(entity => entity.update());
    }

    /**
     * Add a new Entitiy
     */
    public add_entity() {
        this.parent.props.entities.push(new ExampleClassEntity(this.parent));
    }
}

/**
 * Contains all the volatile data of this ClassEntity.
 * This should be mostly expected to be changable by anything.
 * Think of these properties here as a 'has' relation.
 */
class Properties implements ClassComponentInterface<ExampleMain> {
    /**
     * A list of entities.
     * This is inside the 'Properites' and not components as this is a dynamic array,
     * where components should be a fixed set of parts
     **/
    public entities: Array<ExampleClassEntity>;

    public constructor(
        public parent: ExampleMain
    ) {
        this.entities = [];
    }
}

/**
 * Components should hold other entities, that are part of this entity.
 * They should however not changed.
 * Think of it as a 'consists of' relation 
 */
class Components {

    constructor(
        public parent: ExampleMain
    ) {
    }
}