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
