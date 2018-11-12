let mobileNavTemplate = `
<div id="mobile-nav" class="mobile-nav" :class="{'is-open': isOpen}"> 
    <template v-if="hasRouter">
        <div class="mobile-nav__button" @click="openMenu"> 
            <span :class="[isOpen ? closeIcon: menuIcon]"></span>
        </div>
        <div class="mobile-nav__bar" :class="{'is-open': isOpen}">
            <div class="mobile-nav__menu">
                <template v-if="isAuthenticated">
                    <router-link :to="homeLink" class="mobile-nav__menu-heading">{{ userName }}</router-link>
                    <ul class="mobile-nav__menu-list">                 
                        <li class="mobile-nav__menu-item" v-for="link in links" :key="link.name">
                            <router-link :to="link" class="mobile-nav__menu-link">{{ link.name }}</router-link>
                        </li>                
                    </ul>                
                </template>
                <template v-else>
                    <router-link :to="homeLink" class="mobile-nav__menu-heading">{{ homeLink.name }}</router-link>
                    <ul class="mobile-nav__menu-list">                 
                        <li class="mobile-nav__menu-item" v-for="link in authLinks" :key="link.name">
                            <router-link :to="link" class="mobile-nav__menu-link">{{ link.name }}</router-link>
                        </li>                
                    </ul>   
                </template>                
            </div>
        </div>
        <slot></slot>
    </template>
    <template v-else>
        <div class="mobile-nav__button" @click="openMenu"> 
        <span :class="[isOpen ? closeIcon: menuIcon]"></span>
        </div>
        <div class="mobile-nav__bar" :class="{'is-open': isOpen}">
            <div class="mobile-nav__menu">
                <template v-if="isAuthenticated">
                    <a class="mobile-nav__menu-heading" :href="homeLink.url">{{userName}}</a>
                    <ul class="mobile-nav__menu-list"> 
                        <li class="mobile-nav__menu-item" v-for="link in links" :key="link.text">
                            <a :href="link.url" class="mobile-nav__menu-link">{{ link.text }}</a>
                        </li>                
                    </ul>
                </template>
                <template v-else>
                    <a class="mobile-nav__menu-heading" :href="homeLink.url">{{homeLink.text}}</a>                    
                    <ul class="mobile-nav__menu-list"> 
                        <li class="mobile-nav__menu-item" v-for="link in authLinks" :key="link.text">
                            <a :href="link.url" class="mobile-nav__menu-link">{{ link.text }}</a>
                        </li>                
                    </ul>
                </template>
            </div>
        </div>
        <slot></slot>
    </template>
</div>
`;


export default {
    name: 'MobileNav',
    template: mobileNavTemplate,
    componentName: 'MobileNav',
    props: {
        userName: {
            type: String,
            default: "Brandon"
        },
        isAuthenticated: {
            type: Boolean,
            default: false
        },
        closeIcon: {
            type: String,
            default: 'pe-icon-close'
        },
        menuIcon: {
            type: String,
            default: 'pe-icon-hamburger'
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
        },
        homeLink: {
            type: Object,
            default: function () {
                return {text: "Home", url: "/"}
            }
        },
    },
    data: function () {
        return {
            isOpen: false
        }
    },
    methods: {
        openMenu: function () {
            this.isOpen = !this.isOpen;
        }
    },
    computed: {
        hasRouter() {
            if (this.$router) {
                return true;
            } 
            return false;
        }
    }
}
 
