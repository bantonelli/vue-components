import Emitter from '../../utils/mixins/emitter';

let modalTemplate = `
<div class="modal">
    <component
        v-bind:is="childComponent"
        :item="item"
    >
    </component>
</div>
`;


let modal = {
    componentName: 'Modal',

    template: modalTemplate, 

    mixins: [Emitter],

    data: function () {
        return {
        }
    },
    props: {
        item: null,
        childComponent: null
    },
    methods: {
        loadIframe() {
            // this.iFrame = !this.iFrame;
            // this.$on('collectionUpdate', this.resetToImage);
        },
        resetToImage() {
            // this.iFrame = false;
        }
    },
    computed: {
        isYTEmbed() {
            // var ytRegExp = new RegExp(`youtube`, 'gi');
            // if (this.item.source.search(ytRegExp) == -1) {
            //     return false;
            // } 
            // return true;            
        },
        imgSource() {
            // if (this.isYTEmbed) {
            //     return `https://img.youtube.com/vi/${this.item.yt_id}/hqdefault.jpg`;                
            // }
            // return null;
        }
    }
}

export default modal;

/*
- Set up styles for Video component in Patternlab

- Consider adding lifecycle logic similar to FormItem 
  beforeDestroy() {
    this.dispatch('Form', 'form.removeField', [this]);
  }
*/