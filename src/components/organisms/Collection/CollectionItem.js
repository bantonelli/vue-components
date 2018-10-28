// let collectionItemTemplate = `
// <div class="collection__item" ref="collectionItem">
//     {{item.name}}
// </div>
// `;

import _ from 'lodash';

let collectionItemTemplate = `
<div class="collection__item" ref="collectionItem" data-ref="item">
    <component
        v-bind:is="componentToUse"
        :item="item"
    >
    </component>
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
        mixer: null,
        componentToUse: null
    },
    // mounted () {
    //     // console.log("CHILD: ", this.$children[0].item);
    //     this.$children[0].$props.item = this.item;
    // },
    destroyed () {
        this.$emit('deleteCollectionItem', this.item);    
        this.mixer.dataset(this.$parent.internalData);
    },
    updated() {
        var self = this;
        var itemIndex = _.findIndex(this.$parent.internalData, function(o) { return o.id == self.item.id; });
        this.$emit('updateCollectionItem', this.item);    
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