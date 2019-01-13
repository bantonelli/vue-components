// let collectionItemTemplate = `
// <div class="collection__item" ref="collectionItem">
//     {{item.name}}
// </div>
// `;

import _ from 'lodash';

let collectionItemTemplate = `
<div class="collection__item" ref="collectionItem" data-ref="item">
    <template v-if="childComponent">
        <component
            v-bind:is="componentToUse"
            :item="item"
            :childComponent="childComponent"
        >
        </component>
    </template>
    <template v-else>
        <component
            v-bind:is="componentToUse"
            :item="item"
        >
        </component>
    </template>        
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
        componentToUse: null,
        childComponent: null
    },
    // mounted () {
    //     // console.log("CHILD: ", this.$children[0].item);
    //     this.$children[0].$props.item = this.item;
    // },
    destroyed () {
        // console.log("DESTROYED COLLECTION ITEM");
        this.$emit('deleteCollectionItem', this.item);    
        this.mixer.dataset(this.$parent.internalData);
    },
    updated() {
        // console.log("UPDATED COLLECTION ITEM");
        var self = this;
        var itemIndex = _.findIndex(this.$parent.internalData, function(o) { return o.id == self.item.id; });
        this.$emit('updateCollectionItem', this.item);    
        this.mixer.dataset(this.$parent.internalData);
    }
}

export default collectionItem;