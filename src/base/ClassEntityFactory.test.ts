import { AssetManager } from "@game.object/ts-game-toolbox";
import assert from "assert";
import { ExampleClassEntity } from "../test-examples/ExampleClassEntity";
import { ExampleClassEntityFactory } from "../test-examples/ExampleClassEntityFactory";
import { ExampleMain } from "../test-examples/ExampleMain";

describe('class example factory', () => {
    const main = new ExampleMain();

    it('factory can create simple entity', () => {
        const factory = new ExampleClassEntityFactory(main);
        const entity = factory.create();
        assert.ok(entity, "Entity could not be created");
        assert.ok(entity instanceof ExampleClassEntity, "Entity is of wrong type");
    });

    it('factory modifiers are applied', () => {
        const factory = new ExampleClassEntityFactory(main);
        const entity = factory.name("Schlund").headstart().create();
        assert.strictEqual(entity.props.counter, 5, "Modifier property 'counter' was not applied");
        assert.strictEqual(entity.props.name, "Schlund", "Modifier property 'name' was not applied");
    });

    it('factory fails without parent', () => {
        const factory = new ExampleClassEntityFactory();
        assert.throws(() => {
            factory.create();
        });
    });

    it('factory create with settings', () => {
        const factory = new ExampleClassEntityFactory(main);
        factory.entity_parent
        factory.with_settings({

        });
    });
})