import type {AreaComp, BodyComp, GameObj, PosComp, SpriteComp, Vec2} from "kaboom";

export interface PlayerInterface {
    id: string,
    text?: any,
    player:  GameObj<SpriteComp | AreaComp | BodyComp | PosComp | {dir: Vec2}>
}



export interface StatePlayersBomberInterface {

}