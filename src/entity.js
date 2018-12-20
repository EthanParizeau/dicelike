class Entity {
    constructor(props = {}) {
        this.name = props['name'] || '';
        this.xy = props['xy'] || 0;
        this.symbol = props['symbol'];
        this.foreground = props['foreground'];
        this.levelID = null;
        this.world = null;

        // Create an object which will keep track what mixins we have
        // attached to this entity based on the name property
        this.attachedMixins = {};

        // Create a similar object for groups
        this.attachedMixinGroups = {};

        // Setup the objects mixins
        const mixins = props['mixins'] || [];
        for ( let i = 0; i < mixins.length; i++) {
            // Copy over all properties from each mixin as long
            // as it's not the name or the init property. We
            // also make sure not to override a property that
            // already exists on the entity.
            for(const key in mixins[i]) {
                if(key !== 'init' && key !== 'name' && !this.hasOwnProperty(key)) {
                    this[key] = mixins[i][key];
                }
            }
            // Add the name of the mixin to our attached mixins
            this.attachedMixins[mixins[i].name] = true;
            // If a group name is present add it
            if(mixins[i].groupName) {
                this.attachedMixinGroups[mixins[i].groupName] = true;
            }
            // Finially call the init function if there is one
            if(mixins[i].init) {
                mixins[i].init.call(this, props);
            }
        }
    }

    hasMixin(obj) {
        // Allow passing the mixin itself or the name / group as a string
        if(typeof obj === 'object') {
            return this.attachedMixins[obj.name];
        } else {
            return this.attachedMixins[obj] || this.attachedMixinGroups[obj];
        }
    }
}

export default Entity;