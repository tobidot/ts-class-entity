import { ExampleMain } from "./ExampleMain";
import { Class, EventBase, EventSocket } from "@game.object/ts-game-toolbox";
import { BaseClassEntity } from "../base/ClassEntity";

interface Settings {
    setting_prop?: string
};

export type ExampleClassEntitySettings = Settings;
type Events = ExampleClassEvent;

/**
 * This class is the real classentity name,
 * but it holds only references to its parts.
 */
export class ExampleClassEntity extends BaseClassEntity<
    ExampleClassEntity, ExampleMain, Settings, Elements, Logic, Properties, Components, Listeners, Events
> {
    protected static readonly default_settings: Settings = {};

    public constructor(
        public parent: ExampleMain,
        config: Partial<Settings> = {}
    ) {
        super(
            parent, Elements, Logic, Properties, Components, Listeners,
            ExampleClassEntity.default_settings, config,
        );
    }

    public update() {
        this.logic.update();
    }
}

export class ExampleClassEvent extends EventBase {
    public static event_name = "example-class-event";
    public constructor() {
        super(ExampleClassEvent.event_name);
    }
}

class Elements {
    constructor(
        public parent: ExampleClassEntity
    ) {

    }
}

class Logic {
    constructor(
        public parent: ExampleClassEntity
    ) {

    }

    public update(): void {
        this.parent.props.counter++;
    }
}

class Properties {
    public name: string = "";
    public counter: number = 0;

    constructor(
        public parent: ExampleClassEntity
    ) {

    }

}

class Components {
    constructor(
        public parent: ExampleClassEntity
    ) {

    }
}

class Listeners {
    constructor(
        public parent: ExampleClassEntity
    ) {

    }
}
