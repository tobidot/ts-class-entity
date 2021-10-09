import { Class } from "@game.object/ts-game-toolbox";
import { GetParentOfClassEntity, GetSettingsOfClassEntity } from "./ClassEntity";



type CreateFunction<ENTITY> =
    (entity: ENTITY) => ENTITY;
type PrepareFunction<PARENT, SETTINGS> =
    (parent?: PARENT, config?: SETTINGS) => [PARENT | undefined, SETTINGS | undefined];

/**
 * Factory for some class entity.
 * Simplifies creation of new entities with similar setups.
 * @template ENTITY the class entity
 */
export class ClassEntityFactory<ENTITY> {
    // function chain that builds a model form an initial model setup.
    protected create_func: CreateFunction<ENTITY> = (model: ENTITY) => model;
    // function chain to generate the inputs for a given model
    protected prepare_func: PrepareFunction<GetParentOfClassEntity<ENTITY>, GetSettingsOfClassEntity<ENTITY>> = () => {
        return [this.entity_parent, undefined];
    };

    /**
     * @param entity_class The class of the entity to create
     * @param entity_parent Initial parents to the entity
     */
    public constructor(
        public entity_class: Class<ENTITY>,
        public entity_parent?: GetParentOfClassEntity<ENTITY>
    ) {
    }

    /**
     * Prepares the entity input parameters to create an initial empty class.
     * @returns 
     */
    protected prepare(): ENTITY {
        const result = this.prepare_func();
        const parent = result[0];
        const config = result[1];
        if (!parent) throw new Error('Unable to run Factory: Prepare method did not return a parent.');
        return new this.entity_class(parent, config);
    }

    /**
     * Append a new function to modify the created entities
     * @param callback Function to modify the entitiy
     *  (entity) => entity
     * @returns this
     */
    protected after_create(callback: CreateFunction<ENTITY>): this {
        const prev = this.create_func;
        this.create_func = (entity: ENTITY): ENTITY => {
            return callback(prev(entity));
        };
        return this;
    }

    /**
     * Append a new function to modify the prepared data before creating an entities
     * @param callback Function to modify the preparation data
     *  (parent, settings) => [parent, settings] 
     * @returns this
     */
    protected after_prepare(callback: PrepareFunction<GetParentOfClassEntity<ENTITY>, GetSettingsOfClassEntity<ENTITY>>) {
        type PARENT = GetParentOfClassEntity<ENTITY>;
        type SETTINGS = GetSettingsOfClassEntity<ENTITY>;
        const prev = this.prepare_func;
        this.prepare_func = (parent?: PARENT, settings?: SETTINGS): [PARENT | undefined, SETTINGS | undefined] => {
            const result = prev(parent, settings);
            return callback(result[0], result[1]);
        };
        return this;
    }

    /**
     * Create models based on the previous factory settings.
     * @param count How many entities should be created
     */
    public create(count?: 1): ENTITY;
    public create(count: number): Array<ENTITY>;
    public create(count: number = 1): ENTITY | Array<ENTITY> {
        if (count === 1) return this.create_func(this.prepare());
        return [...new Array(count)].map(() => this.create_func(this.prepare()));
    }

    /**
     * Changing the parent to attach the entities to
     * @param new_parent The new parent entity
     */
    public for(new_parent: GetParentOfClassEntity<ENTITY>): this {
        const prev = this.prepare_func;
        this.prepare_func = (parent?: GetParentOfClassEntity<ENTITY>, settings?: GetSettingsOfClassEntity<ENTITY>) => {
            const [old_parent, old_settings] = prev(parent, settings);
            return [new_parent, old_settings];
        }
        return this;
    }

    /**
     * Change the settings to create entities with
     * @param new_settings The new settings
     */
    public with_settings(new_settings?: GetSettingsOfClassEntity<ENTITY>): this {
        const prev = this.prepare_func;
        this.prepare_func = (parent?: GetParentOfClassEntity<ENTITY>, settings?: GetSettingsOfClassEntity<ENTITY>) => {
            const [old_parent, old_settings] = prev(parent, settings);
            return [old_parent, new_settings];
        }
        return this;
    }


}