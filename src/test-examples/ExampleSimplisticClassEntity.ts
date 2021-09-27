import { EventBase } from "@game.object/ts-game-toolbox";
import { ClassComponentInterface } from "../base/ClassComponent";
import { SimpleBaseClassEntity } from "../base/ClassEntity";
import { ExampleMain } from "./ExampleMain";

type Events = EventBase;

/**
 * This class is the real classentity name,
 * but it holds only references to its partys.
 */
export class ExampleClassEntity extends SimpleBaseClassEntity<
    ExampleClassEntity, ExampleMain, Logic, Properties, Events
> {
    public constructor(
        public parent: ExampleMain,
    ) {
        super(
            parent, Logic, Properties
        );
    }
}

class Properties implements ClassComponentInterface<ExampleClassEntity> {
    public name: string;
    public strength: number;

    public constructor(
        public parent: ExampleClassEntity
    ) {
        this.name = "Fighter";
        this.strength = 7;
    }
}

class Logic implements ClassComponentInterface<ExampleClassEntity> {
    public constructor(
        public parent: ExampleClassEntity
    ) {

    }
}