import mixitup from 'mixitup';
import _ from 'lodash';

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
*/

let collectionTemplate = `
<div class="collection" ref="container">
    <collection-item v-for="item in internalData" :item="item" :mixer="mixer"></collection-item>
    <button @click="updateData">Update Data</button>
    <button @click="toggleData">Toggle Data</button>
    <button @click="reverse">Reverse</button>
    <button @click="regularOrder">Regular Order</button>
</div>
`;

let data2 = [
    {
        id: 300,
        name: 'Joe',
        role: 'Developer',
        age: 22
    },
    {
        id: 242,
        name: 'Zack',
        role: 'Project Manager',
        age: 45
    },
    {
        id: 243,
        name: 'Kumar',
        role: 'Designer',
        age: 29
    },
    {
        id: 200,
        name: 'Steph',
        role: 'Developer',
        age: 33
    },
    {
        id: 511,
        name: 'Sohyun',
        role: 'Developer',
        age: 23
    }
];

let data1 = [
    {
        id: 142,
        name: 'Joe',
        role: 'Developer',
        age: 22
    },
    {
        id: 242,
        name: 'Zack',
        role: 'Project Manager',
        age: 45
    },
    {
        id: 243,
        name: 'Kumar',
        role: 'Designer',
        age: 29
    },
    {
        id: 402,
        name: 'Steph',
        role: 'Developer',
        age: 33
    },
    {
        id: 511,
        name: 'Sohyun',
        role: 'Developer',
        age: 23
    }
];

export default {
    name: 'Collection',

    template: collectionTemplate,

    componentName: 'Collection',

    data() {
        // You may use any key as your unique ID (e.g. 'id', '_id', 'Id', etc)
        // You will specify using the data.uidKey configuration option
        // In this case we are using 'id'
        return {
            mixer: null,
            hasPeople1: true,
            ogData: true,
            internalData: null
        };
    },
    props: {
        dataset: {
            type: Array,
            default: function () {
                return data1;
            }
        }
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
                uidKey: 'id'
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
    },
    updated () {
        this.mixer.dataset(this.internalData);
    },
    destroyed() {
        this.mixer.destroy();
    },
    methods: {
        renderMixitup(item) {
            this.item = item;
            console.log("COMPONENTS: ", CollectionItem);
            // collectionItem.template = `<div data-ref="item">${item.name}</div>`;
            return CollectionItem.template;
            // return `<div data-ref="item">${item.name}</div>`;
            // collectionItem.$refs.collectionItem.innerHTML = `<div data-ref="item">${item.name}</div>`;
            // return collectionItem.$refs.collectionItem.innerHTML;
        },
        updateData() {
            if (this.ogData) {
                this.internalData = data2;
                this.mixer.dataset(this.internalData);
            } else {
                this.internalData = this.dataset.slice();
                this.mixer.dataset(this.internalData);
            }
            this.ogData = !this.ogData;
        },
        toggleData () {
            if (this.hasPeople1) {
                this.mixer.dataset(this.internalData);
            } else {
                var newData = this.internalData.filter(item => {
                    item.age < 100; 
                });
                this.mixer.dataset(newData);
            }
            this.hasPeople1 = !this.hasPeople1;            
        },
        reverse() {
            var self = this;
            // this.mixer.sort('random', function() {
            //     console.log(self.mixer.isMixing()) // false
            // });
            var newDataset = this.internalData.slice().reverse();
            this.mixer.dataset(newDataset).then(() => {
            });
        },
        regularOrder() {
            this.mixer.dataset(this.internalData).then(() => {
            });
        }
    },
    components: {
        'collection-item': CollectionItem
    }
};
