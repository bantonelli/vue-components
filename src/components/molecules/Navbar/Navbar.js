import UsernameDropdown from './UsernameDropdown';
import NotificationsDropdown from './NotificationsDropdown';
import Autocomplete from '../Autocomplete/Autocomplete'; // Done
import _ from 'lodash';

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
            <notifications
                class="navbar__notifications"
            >
            </notifications>
            <nav class="navbar__menu" role="navigation">
                <username
                    class="navbar__username"
                    :user-name="userName"
                    :header-link="headerLink"
                    :links="mainLinks"
                    :footer-link="footerLink"
                >
                </username>
            </nav>
        </template>
        <!-- Not authenticated no username shown --> 
        <template v-else>
            <nav class="navbar__menu-auth" role="navigation">
                <template v-if="hasRouter">
                    <router-link 
                        v-for="link in authLinks"
                        :key="link.name"
                        :to="link" 
                        class="navbar__auth-link"
                    >
                        {{ link.name }}
                    </router-link>
                </template>
                <template v-else>
                    <a v-for="link in authLinks" :key="link.text" class="navbar__auth-link" href="link.url">
                        {{link.text}}
                    </a>
                </template>
            </nav>            
        </template>
    </div>
</div>
`;

/*
PLAN: 
Navbar 
    - Handles User Notifications  
    - Handles Log Out and Log In Functions OR Events  
    - Dynamically renders:
        - List of notification components  
        - Username when logged in 
        - Sign in when logged out 

NotificationsDropdown
    - Dropdown that renders the number of 
      notification items that it has 

Notification 
    - A single notification item 
    - Dynamically renders 'new' status if user 
      has not previously seen the notification.

UsernameDropdown    
    - Dropdown that handles Log Out functionality 
    - Provides links to current user's: 
        - settings page
        - profile page 
        - home page  

*/

export default {
    name: 'Navbar',

    template: navbarTemplate,

    componentName: 'Navbar',
    
    props: {
        userName: {
            type: String,
            default: "Brandon"
        },
        isAuthenticated: {
            type: Boolean,
            default: false
        },
        links: {
            type: Array,
            default: function () {
                return [
                    {text: "Home", url: "#"},
                    {text: "Video Library", url: "#"},
                    {text: "Account Settings", url: "#"},
                    {text: "Profile", url: "#"},
                    {text: "Log Out", url: "#"}
                ];
            }
        },
        authLinks: {
            type: Array,
            default: function () {
                return [
                    {text: "Sign Up", url: "#"},
                    {text: "Log In", url: "#"}
                ];
            } 
        }
    },
    data: function () {
        return {
            state1: ''
        }
    },
    computed: {
        headerLink () {
            return this.links[0];
        },
        mainLinks () {
            var result = _.drop(this.links, 1);
            return _.dropRight(result, 1);
        },
        footerLink () {
            return this.links[this.links.length - 1];
        },
        hasRouter() {
            if (this.$router) {
                return true;
            } 
            return false;
        }
    },
    components: {
        'autocomplete': Autocomplete,
        'notifications': NotificationsDropdown,
        'username': UsernameDropdown
    },
    methods: {
        querySearch(queryString, cb) {
            var links = this.searchResults;
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
        this.searchResults = this.loadAll();
    }
}