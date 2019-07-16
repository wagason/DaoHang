import 'src/style/common.less';
import 'unslider';
import 'lazysizes';
import Tab from 'src/scripts/plugins/tab.js';
// window.lazySizesConfig = window.lazySizesConfig || {};

$('.unslider-container').unslider({
    nav: false,
    animation: 'fade',
    autoplay: true
});

$(".js-tabwraper").tab({
    t_selector: "ol li",
    c_selector: ".tab-item",
    events: "mouseover",
    timeout: 200
});