import assert from "assert";
import { ExampleClassEntityFactory } from "../test-examples/ExampleClassEntityFactory";
import { ExampleMain } from "../test-examples/ExampleMain";

describe('Class Entity', () => {
    const main = new ExampleMain;
    const factory = new ExampleClassEntityFactory(main);

    it('example update funciton calls inner logic function', () => {
        const entity = factory.create();
        entity.update();
        assert.strictEqual(entity.props.counter, 1);
    });

});