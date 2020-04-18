//Code for Main Pg (index.html) Scatterplot Dropdown Menu

d3.selectAll("#selDataset").on("change", newSelection);


function newSelection() {
    
    var dropdownMenu = d3.select("#selDataset");
    var newSelection= dropdownMenu.property("value");

    var scatterplot_area = d3.select("#scatter");
    scatterplot_area.html("");

    console.log(`User selected ${newSelection}`);


        if(newSelection === 'opt2') {
            scatterplot_area.html('<object type="text/html" data="https://boar1ang.github.io/scatter2/" width="930px" height="465"></object>')
            }

        else if(newSelection === 'opt3') {
                scatterplot_area.html('<object type="text/html" data="https://boar1ang.github.io/scatter3/" width="930px" height="465px"></object>')
            }

        else if(newSelection === 'opt4') {
                scatterplot_area.html('<object type="text/html" data="https://boar1ang.github.io/scatter4/" width="930px" height="465px"></object>')
    }

        else {
            scatterplot_area.html('<object type="text/html" data="https://boar1ang.github.io/scatter1/" width="930px" height="465px"></object>')
        }
    
};

AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

d3.selectAll("#selDataset").on("change", aos-init());

