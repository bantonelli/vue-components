import Dropdown from '../../atoms/Dropdown/Dropdown'; 
import DropdownMenuItem from '../../atoms/Dropdown/DropdownMenuItem'; 

let notificationsDropdownTemplate = `
<dropdown
  :visible-arrow="false"
  :icon-class="'pe-icon-notifications'"
  :variation-class="'dropdown--navbar'"
  :show-header="true"
  :show-footer="true"
  :popper-options="{placement: 'bottom'}"
> 
    <template slot="header">
        <a href="#">Notifications</a>
    </template>       
    <dropdown-menu-item>
        <a href="#">notif</a>
    </dropdown-menu-item>
    <dropdown-menu-item>
        <a href="#">notif</a>
    </dropdown-menu-item>
    <dropdown-menu-item>
        <a href="#">notif</a>
    </dropdown-menu-item>
    <dropdown-menu-item>
        <a href="#">notif</a>
    </dropdown-menu-item>
    <dropdown-menu-item>
        <a href="#">notif</a>
    </dropdown-menu-item>
    <template slot="footer">
        <a href="#">See All</a>
    </template>       
</dropdown>
`;

export default {
    name: 'NotificationsDropdown',

    template: notificationsDropdownTemplate,

    componentName: 'NotificationsDropdown',
    
    props: {
    },
    data: function () {
        return {
            state1: ''
        }
    },
    components: {
        'dropdown': Dropdown,
        'dropdown-menu-item': DropdownMenuItem
    },
    methods: {

    },
    mounted: function () {        
    }
}