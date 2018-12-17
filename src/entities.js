import Mixins from './mixins';

export const PlayerTemplate = {
    symbol: "@",
    foreground: 'white',
    maxHp: 40,
    mixins: [
        Mixins.PlayerActor
    ]
}

export const EnemyTemplate = {
    symbol: '☹',
    foreground: 'red',
    name: 'Enemy',
    maxHp: 20,
}