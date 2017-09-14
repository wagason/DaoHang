import 'src/style/common.less';
import 'unslider';
import 'lazysizes';
import Tab from'src/scripts/plugins/tab.js';
window.lazySizesConfig = window.lazySizesConfig || {};
// use .lazy instead of .lazyload
// window.lazySizesConfig.lazyClass = 'lazy';
console.log(window.lazySizesConfig.lazyClass);
$('.unslider-container').unslider({
  nav: false
});

$(".m-3 .row").tab({ 
  t_selector: "ol li", 
  c_selector: ".tab-item", 
  events: "mouseover", 
  timeout: 200, 
  onafter: function() {
    // myLazyLoad.update();
  } 
});

