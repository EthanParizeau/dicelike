import Mixins from './mixins';

export const PlayerTemplate = {
    name: "Player",
    symbol: "@",
    foreground: '#39FF14',
    maxHp: 40,
    mixins: [
        Mixins.PlayerActor, Mixins.Moveable
    ]
}

export const EnemyTemplate = {
    name: 'Enemy',
    symbol: '☹',
    foreground: 'red',
    maxHp: 20,
}