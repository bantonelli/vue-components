if (process.client) {
    const mixitup = require('mixitup');
}
import _ from 'lodash';

import Emitter from '../../utils/mixins/emitter';
import CollectionItem from './CollectionItem';

/*
Parent: Collection
    - Should house container element for mixitup 
    - Instantiate mixitup         
        - When mounted -> use ref for container div as container for mixitup
    - Define render function for mixitup 
        - Render function should render CollectionItem component 
    - Should have data for mixitup 

Child: CollectionItem
    - Should just be the markup for a mixitup item 
    - Should have a slot to pass in a child component
    - Should take in a prop for the mixitup item
        - This is the item passed in the render function. 


- Strategy 
    - pass a component property to the collection item 
    - this component property will be the component to load in 
*/

let collectionTemplate = `
<div class="collection" ref="container">
    <collection-item 
        v-for="item in internalData"
        :key="item._id" 
        :item="item" 
        :mixer="mixer" 
        :componentToUse="component"
        :childComponent="child"
        >
    </collection-item>
</div>
`;



let data1 = [
    {
        _id: 142,
        name: 'Joe',
        role: 'Developer',
        age: 22
    },
    {
        _id: 242,
        name: 'Zack',
        role: 'Project Manager',
        age: 45
    },
    {
        _id: 243,
        name: 'Kumar',
        role: 'Designer',
        age: 29
    },
    {
        _id: 402,
        name: 'Steph',
        role: 'Developer',
        age: 33
    },
    {
        _id: 511,
        name: 'Sohyun',
        role: 'Developer',
        age: 23
    }
];

export default {
    name: 'Collection',

    template: collectionTemplate,

    componentName: 'Collection',

    mixins: [Emitter],

    data() {
        // You may use any key as your unique ID (e.g. 'id', '_id', 'Id', etc)
        // You will specify using the data.uidKey configuration option
        // In this case we are using '_id'
        return {
            mixer: null,
            ogData: true,
            internalData: null,
            hideData: false
        };
    },
    props: {
        dataset: {
            type: Array,
            default: function () {
                return data1;
            }
        },
        component: null,
        child: null
    },
    created() {
        this.internalData = [].concat(this.dataset);        
    },
    mounted() {
        var self = this;
        var container = this.$refs.container;
        // console.log(this.$refs);
        // console.log(this.$children);
        const mixer = mixitup(container, {
            data: {
                // Specify unique ID key on the dataSet (users)
                uidKey: '_id'
            },
            // must also specify a render.target function
            render: {
                target: self.renderMixitup
            },
            load: {
                dataset: self.dataset
            },
            selectors: {
                target: '[data-ref="item"]'
            }
        });
        // when the child is created
        // use the ref on the parent as the container to instantiate the mixer
        this.mixer = mixer;
        // this.$on('changedPeople', function () {
        //     mixer.dataset(this.people);
        // });
        this.$on('updateData', this.updateData);
        this.$on('toggleData', this.toggleData);
        this.$on('sortData', this.sortData);
        this.$on('filterData', this.filterData);
    },
    updated () {
        // console.log("UPDATED COLLECTION");
        this.mixer.dataset(this.internalData);
    },
    destroyed() {
        // console.log("DESTROYED COLLECTION");
        this.mixer.destroy();
    },
    methods: {
        renderMixitup(item) {
            this.item = item;
            return CollectionItem.template;
        },
        updateData(newData) {
            this.internalData = newData;
            this.mixer.dataset(this.internalData);
        },
        toggleData() {
            this.broadcast(this.componentName, 'collectionUpdate', []);
            if (!this.h_ideData) {
                this.mixer.dataset([]);
            } else {
                this.mixer.dataset(this.internalData);
            }
            this.h_ideData = !this.h_ideData;
        },
        sortData(sortFunction) {            
            this.broadcast(this.componentName, 'collectionUpdate', []);
            var newDataset = sortFunction(this.internalData.slice());       
            this.mixer.dataset(newDataset).then(() => {                
            });
        },
        filterData(filterFunction) {
            this.broadcast(this.componentName, 'collectionUpdate', []);
            var newDataset = filterFunction(this.internalData.slice());            
            this.mixer.dataset(newDataset).then(() => {
            });
        }
    },
    computed: {
        componentName () {
            if (this.component) {
                return this.component.componentName;
            }
        }
    },
    components: {
        'collection-item': CollectionItem
    }
};
