import Mixins from './mixins';

export const PlayerTemplate = {
    name: "Player",
    symbol: "@",
    foreground: '#39FF14',
    maxHp: 40,
    attackValue: 10,
    mixins: [
        Mixins.PlayerActor, 
        Mixins.Moveable, 
        Mixins.Attacker,
        Mixins.Destructible
    ]
}

export const EnemyTemplate = {
    name: 'Enemy',
    symbol: '☹',
    foreground: 'red',
    maxHp: 20,
    attackValue: 5,
    mixins: [
        Mixins.Moveable,
        Mixins.Attacker,
        Mixins.Destructible,
        Mixins.EnemyActor
    ]
}