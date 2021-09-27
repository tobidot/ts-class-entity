import { ClassEntityFactory, GetParentOfClassEntity, GetSettingsOfClassEntity } from "..";
import { ExampleClassEntity, ExampleClassEntitySettings } from "./ExampleClassEntity";
import { ExampleMain } from "./ExampleMain";

/**
 * 
 */
export class ExampleClassEntityFactory extends ClassEntityFactory<ExampleClassEntity> {

    /**
     * @param entity_parent Initial parents to the entity
     */
    public constructor(
        public entity_parent?: ExampleMain
    ) {
        super(ExampleClassEntity, entity_parent);
    }

    /**
     * Example modifier for for this factory
     * @return this
     */
    public headstart(): this {
        const prev = this.create_func;
        this.create_func = (model: ExampleClassEntity) => {
            model = prev(model);
            model.props.counter = 5;
            return model;
        }
        return this;
    }

    /**
     * Example modifier for for this factory
     * @param name Name as a parameter
     * @returns this
     */
    public name(name: string): this {
        const prev = this.create_func;
        this.create_func = (model: ExampleClassEntity) => {
            model = prev(model);
            model.props.name = name;
            return model;
        }
        return this;
    }
}