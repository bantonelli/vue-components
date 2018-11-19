import Dropdown from '../../atoms/Dropdown/Dropdown'; 
import DropdownMenuItem from '../../atoms/Dropdown/DropdownMenuItem'; 

let usernameDropdownTemplate = `
<dropdown
  :label="userName"
  :visible-arrow="false"  
  :variation-class="'dropdown--navbar'"
  :show-header="true"
  :show-footer="true"
  :popper-options="{placement: 'bottom'}"
> 
    <template v-if="!hasRouter">
        <template slot="header">
            <a :href="headerLink.url">{{headerLink.text}}</a>
        </template>       
        <dropdown-menu-item v-for="link in links" :key="link.text">
            <a :href="link.url">{{link.text}}</a>
        </dropdown-menu-item>
        <template slot="footer">
            <a :href="footerLink.url" @click="logOut">{{footerLink.text}}</a>
        </template>       
    </template>
    <template v-else>
        <template slot="header">
            <router-link :to="headerLink">{{headerLink.name}}</router-link>
        </template>       
        <dropdown-menu-item v-for="link in links" :key="link.name">
            <router-link :to="link">{{link.name}}</router-link>
        </dropdown-menu-item>
        <template slot="footer">
            <router-link :to="footerLink" @click="logOut">{{footerLink.name}}</router-link>
        </template>  
    </template>
</dropdown>
`;

export default {
    name: 'UsernameDropdown',

    template: usernameDropdownTemplate,

    componentName: 'UsernameDropdown',
    
    props: {
        userName: {
            type: String,
            default: 'Username'
        },
        headerLink: {            
            type: Object,
            default: function () {
                return {text: 'Home', url: '#'}
            }
        },
        footerLink: {
            type: Object,
            default: function () {
                return {text: 'Log Out', url: '#'}
            }
        },
        links: {
            type: Array,
            default: function () {
                return [
                    {text: 'Settings', url: '#'},
                    {text: 'Profile', url: '#'},
                ]
            }
        }
    },

    data: function () {
        return {
            state1: ''
        }
    },
    computed: {
        hasRouter() {
            if (this.$router) {
                return true;
            } 
            return false;
        }
    },
    components: {
        'dropdown': Dropdown,
        'dropdown-menu-item': DropdownMenuItem
    },    
    methods: {
        logOut() {
            console.log("Logged out");
        }
    },
    mounted: function () {        
    }
}