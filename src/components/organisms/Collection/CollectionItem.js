// let collectionItemTemplate = `
// <div class="collection__item" ref="collectionItem">
//     {{item.name}}
// </div>
// `;

import _ from 'lodash';

let collectionItemTemplate = `
<div class="collection__item" ref="collectionItem" data-ref="item">
    {{item.name}}    
</div>
`;


let collectionItem = {
    componentName: 'CollectionItem',

    template: collectionItemTemplate, 
    data: function () {
        return {}
    },
    props: {
        item: null,
        index: null,
        mixer: null
    },
    destroyed () {
        this.$emit('deleteCollectionItem', this.item.name);    
        this.mixer.dataset(this.$parent.internalData);
    },
    updated() {
        var self = this;
        var itemIndex = _.findIndex(this.$parent.internalData, function(o) { return o.id == self.item.id; });
        this.$emit('updateCollectionItem', this.item.name);    
        this.mixer.dataset(this.$parent.internalData);
    },
    created() {
        this.mixer.dataset(this.$parent.internalData);
    }
}

export default collectionItem;

/*
let collectionItemTemplate = `
<div class="collection__item" data-ref="item" ref="collectionItem">
    {{item.name}}        
</div>
`;


let collectionItem = {
    componentName: 'CollectionItem',

    template: collectionItemTemplate, 
    data: function () {
        return {}
    },
    props: {
        item: null
    },
    methods: {
        updatePeople() {
            this.item.id = Math.floor(Math.random() * 300);
            this.$emit('changedPeople');
        }
    }
    // render(h) {
    //     return (
    //         <div class="collection__item" ref="collectionItem">
    //             <slot></slot>
    //         </div>
    //     );
    // }
}
*/