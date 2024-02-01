import type {AreaComp, BodyComp, GameObj, PosComp, SpriteComp, Vec2} from "kaboom";

export interface PlayerInterface {
    id: string,
    player:  GameObj<SpriteComp | AreaComp | BodyComp | PosComp | {dir: Vec2}>
}