let navbarTemplate = `
<div id="navbar" class="navbar">
    <div class="navbar__container">
        <a class="navbar__brand" href="#">
            <img 
                class="navbar__brand-image" 
                sizes="(max-width: 479px) 30vw, 100px" 
                src="../../../../static/images/ProEdify-Logo_FINAL_WHITE.png" 
                srcset="../../../../static/images/ProEdify-Logo_FINAL_WHITE.png 500w, ../../..images/ProEdify-Logo_FINAL_WHITE.png 800w, ../../../../static/images/ProEdify-Logo_FINAL_WHITE.png 1080w, ../../../assets/images/ProEdify-Logo_FINAL_WHITE.png 1600w, ../../../assets/images/ProEdify-Logo_FINAL_WHITE.png 2000w, ../../../../static/images/ProEdify-Logo_FINAL_WHITE.png 2438w" 
                width="1219"
            >
        </a>
        <div class="navbar__search">
            <autocomplete
                v-model="state1"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                :modifier-styles="['input_color-white']"
                icon="icon-magnifying-glass"
                placeholder="Please Input"
                @select="handleSelect"
            >
            </autocomplete>          
        </div>    
        <template v-if="isAuthenticated">
            <div class="navbar__notifications pe-icon-notifications">
                <label class="" for="notifications-toggle"></label>
                <input type="checkbox" class="notifications-toggle" id="notifications-toggle"/>
                <div class="navbar__notifications-dropdown">
                    <a href="#">Notifications</a>
                    <ul class="navbar__notifications-list">                    
                        <li><a href="#">Notif</a></li>
                        <li><a href="#">Notif</a></li>
                        <li><a href="#">Notif</a></li>
                        <li><a href="#">Notif</a></li>
                        <li><a href="#">Notif</a></li>
                        <li><a href="#">Notif</a></li>                                  
                    </ul>
                    <a href="#">See All</a>
                </div>            
            </div>
            <nav class="navbar__menu" role="navigation">
                <div class="navbar__username pe-icon-dropdown-arrow">
                    <label class="" for="usermenu-toggle">
                        Really Long Username
                    </label>
                    <input type="checkbox" class="usermenu-toggle" id="usermenu-toggle"/>
                    <div class="navbar__user-dropdown">
                        <a href="#">Home</a>
                        <ul class="navbar__user-dropdown-list">
                            <li><a href="#">Settings</a></li>
                            <li><a href="#">Profile</a></li>                    
                        </ul>
                        <a href="#">Log Out</a>
                    </div>                
                </div>
            </nav>
        </template>
        <template v-else>
            <a class="navbar__auth-link" href="#">Sign Up</a>
            <a class="navbar__auth-link" href="#">Log In</a>
        </template>
    </div>
</div>
`;

import Autocomplete from '../Autocomplete/Autocomplete'; // Done

export default {
    template: navbarTemplate,
    props: {
       isAuthenticated: {
           type: Boolean,
           default: true
       }
    },
    data: function () {
        return {
            state1: ''
        }
    },
    components: {
        'autocomplete': Autocomplete
    },
    methods: {
        querySearch(queryString, cb) {
            var links = this.links;
            // Call createFilter for every link   
            var results = queryString ? links.filter(this.createFilter(queryString)) : links;
            // call callback function to return suggestions
            cb(results);
        },
        createFilter(queryString) {
            return (link) => {
                return (link.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "vue", "link": "https://github.com/vuejs/vue" },
                { "value": "element", "link": "https://github.com/ElemeFE/element" },
                { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
                { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
                { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
                { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
                { "value": "babel", "link": "https://github.com/babel/babel" }
            ];
        },
        handleSelect(item) {
            console.log(item);
        }
    },
    mounted: function () {
        this.links = this.loadAll();
    }
}