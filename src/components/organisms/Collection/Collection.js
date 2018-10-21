import mixitup from 'mixitup';
import _ from 'lodash';

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
    <template v-for="person in people">
        <collection-item :item="person"></collection-item>
    </template> 
    <button @click="updatePeople">Update People</button>
</div>
`;

// <collection-item :item="people[0]"></collection-item>
// <collection-item :item="people[1]"></collection-item>
// <collection-item :item="people[2]"></collection-item>
// <collection-item :item="people[3]"></collection-item>
// <collection-item :item="people[4]"></collection-item>
// <template v-for="person in people">
// <collection-item :item="person"></collection-item>
// </template> 


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

let people2 = [
    {
        id: 511,
        name: 'Sohyun',
        role: 'Developer',
        age: 23
    },
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
    }
];

let people1 = [
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
            people: people1
        };
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
                dataset: self.people
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
        this.mixer.dataset(this.people);
    },
    methods: {
        renderMixitup(item) {
            this.item = item;
            console.log("COMPONENTS: ", collectionItem);
            // collectionItem.template = `<div data-ref="item">${item.name}</div>`;
            return collectionItem.template;
            // return `<div data-ref="item">${item.name}</div>`;
            // collectionItem.$refs.collectionItem.innerHTML = `<div data-ref="item">${item.name}</div>`;
            // return collectionItem.$refs.collectionItem.innerHTML;
        },
        updatePeople() {
            // if (!this.sortByAge) {
            //     this.people = _.sortBy(this.people, [function(person) { return person.age; }]);
            // } else {
            //     this.people = _.sortBy(this.people, [function(person) { return person.id; }]);
            // }
            // this.sortByAge = !this.sortByAge;
            if (this.hasPeople1) {
                this.people = people2;
            } else {
                this.people = people1;
            }
            this.hasPeople1 = !this.hasPeople1;
        }
    },
    components: {
        'collection-item': collectionItem
    }
};
