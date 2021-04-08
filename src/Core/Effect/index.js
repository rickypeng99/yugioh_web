class Effect {
    constructor() {

        this.category = undefined

        this.type = undefined

        this.chain = undefined

        // A function returns true if the effect is able to be runned
        this.condition = undefined

        // A function that returns the targets (with unique number)
        this.target = undefined

        // A function that specifies the operations
        this.operation = undefined
    }
}


const createEffect = () => {
    return new Effect()
}

const can_activate = (card, environment) => {
    for (const effect of card.effects) {
        if (effect.condition(environment)) {
            return true
        }
    }
    return false
} 

export default{
    createEffect,
    can_activate
}
