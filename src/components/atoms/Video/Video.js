import Emitter from '../../utils/mixins/emitter';

let videoTemplate = `
<div class="video">
    <template v-if="isYTEmbed">
        <div class="video__image ytImgWrapper" v-if="!iFrame">
            <div class="m_load_here ytImgThumbBox" :style="{ backgroundImage: 'url(' + imgSource + ')' }">
                <img 
                    class="ytImgThumbImg"
                    :src="ytStockImg" 
                    :alt="item.title" 
                />
                <a 
                    class="m_overlay" 
                    href="#" 
                    @click="loadIframe"
                ></a>
                <span class="m_yt_title">
                    {{item.title}}
                </span>
                <span class="m_yt_button">
                    <svg 
                        height="100%" 
                        version="1.1" 
                        viewBox="0 0 68 48" 
                        width="100%"
                    >
                        <path 
                            class="ytp-large-play-button-bg" 
                            d="m .66,37.62 c 0,0 .66,4.70 2.70,6.77 2.58,2.71 5.98,2.63 7.49,2.91 5.43,.52 23.10,.68 23.12,.68 .00,-1.3e-5 14.29,-0.02 23.81,-0.71 1.32,-0.15 4.22,-0.17 6.81,-2.89 2.03,-2.07 2.70,-6.77 2.70,-6.77 0,0 .67,-5.52 .67,-11.04 l 0,-5.17 c 0,-5.52 -0.67,-11.04 -0.67,-11.04 0,0 -0.66,-4.70 -2.70,-6.77 C 62.03,.86 59.13,.84 57.80,.69 48.28,0 34.00,0 34.00,0 33.97,0 19.69,0 10.18,.69 8.85,.84 5.95,.86 3.36,3.58 1.32,5.65 .66,10.35 .66,10.35 c 0,0 -0.55,4.50 -0.66,9.45 l 0,8.36 c .10,4.94 .66,9.45 .66,9.45 z" 
                            fill="#1f1f1e" 
                            fill-opacity="0.81"
                        />
                        <path 
                            d="m 26.96,13.67 18.37,9.62 -18.37,9.55 -0.00,-19.17 z" 
                            fill="#fff"
                        />
                        <path 
                            d="M 45.02,23.46 45.32,23.28 26.96,13.67 43.32,24.34 45.02,23.46 z" 
                            fill="#ccc"
                        />
                    </svg>
                </span>
            </div>
        </div>
        <div class="video__iframe" v-else>
            <iframe 
                :frameborder="item.frameborder"
                :allow="item.allow"
                :src="item.source"
            >
            </iframe>
        </div>
    </template>
</div>
`;


let video = {
    componentName: 'Video',

    template: videoTemplate, 

    mixins: [Emitter],

    data: function () {
        return {
            iFrame: false,
            ytStockImg: `https://img.youtube.com/oAtDAoqdExw/hqdefault.jpg`
        }
    },
    props: {
        item: {
            type: Object, 
            default () {
                return {
                    id: 1,
                    width: 560,
                    height: 315,
                    title: "The Nervous System: Diencephalon - Thalamus & Hypothalamus",
                    source: "https://www.youtube.com/embed/5bCCb7lj6QA",
                    yt_id: "5bCCb7lj6QA",
                    frameborder: 0,
                    allow: "autoplay; encrypted-media"
                }
            }
        }
    },
    methods: {
        loadIframe() {
            this.iFrame = !this.iFrame;
            this.$on('collectionUpdate', this.resetToImage);
        },
        resetToImage() {
            this.iFrame = false;
        }
    },
    computed: {
        isYTEmbed() {
            var ytRegExp = new RegExp(`youtube`, 'gi');
            if (this.item.source.search(ytRegExp) == -1) {
                return false;
            } 
            return true;            
        },
        imgSource() {
            if (this.isYTEmbed) {
                return `https://img.youtube.com/vi/${this.item.yt_id}/hqdefault.jpg`;                
            }
            return null;
        }
    }
}

export default video;

/*
- Integrate emitter mixin - DONE 
        - Use an event to signal that the collection is about to sort
        - This event will trigger the child component (Video) switch back to the thumbnail
                - Will help with the animations.
- Set up callback system for filter and sort methods of Collection
        - Parent should be able to pass a function definition to be the filter/sorting
            algorithm that is used.
- Set up styles for Video component in Patternlab

- Consider adding lifecycle logic similar to FormItem 
  beforeDestroy() {
    this.dispatch('Form', 'form.removeField', [this]);
  }
*/