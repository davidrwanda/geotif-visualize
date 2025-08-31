


<script src="/customized-aagwa/assets/admin/js/aagwa_system/general_config.js"></script>
<script src="/customized-aagwa/assets/admin/js/aagwa_system/aagwa_config.js"></script>
<script src="/customized-aagwa/assets/admin/js/aagwa_system/system.js"></script>
<script src="/customized-aagwa/assets/admin/js/aagwa_system/aagwa.js"></script>
<script src="/customized-aagwa/assets/admin/js/aagwa_system/aagwa_system.js"></script>
<script src="/customized-aagwa/assets/admin/js/aagwa_system/extra.js"></script>
<script src="/customized-aagwa/assets/admin/js/aagwa_system/admin_utils.js"></script>
<script src="/customized-aagwa/assets/admin/js/aagwa_system/event_food_production.js"></script>


<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<!-- <script src="https://npmcdn.com/leaflet@1.2.0/dist/leaflet.js"></script> -->
<script src="/customized-aagwa/assets/dist/leaflet.1.2.0.js"></script>
<!-- <script src="https://npmcdn.com/geotiff@0.3.6/dist/geotiff.js"></script> -->
<script src="/customized-aagwa/assets/dist/geotiff.js"></script>
<script src="<?= BASE_URL ?>dist/chroma.min.js"></script>
<script src="<?= BASE_URL ?>dist/leaflet.canvaslayer.field.js"></script>
<script src="<?= BASE_URL ?>lib/reveal.js/lib/js/head.min.js"></script>
<script src="<?= BASE_URL ?>lib/plotty/dist/plotty.min.js"></script>
<script src="<?= BASE_URL ?>lib/openlayers/dist/ol.js"></script>
<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js'></script>
<script src='<?= BASE_URL ?>dist/leaflet-sidebar.js'></script>
<script src="<?= BASE_URL ?>dist/leaflet.zoomhome.js"></script>
<script src="<?= BASE_URL ?>js/zozo.tabs.min.js"></script>

<!-- version changed on April 25, 2023 -->
<script src="https://code.highcharts.com/highcharts.js"></script> 


<script src="https://code.highcharts.com/stock/modules/stock.js"></script>

<!-- <script src="https://code.highcharts.com/stock/highstock.js"></script>  -->
<script src="https://code.highcharts.com/stock/highcharts-more.js"></script>
<!-- <script src="https://blacklabel.github.io/grouped_categories/grouped-categories.js"></script> -->
<script src="/customized-aagwa/assets/dist/grouped-categories.js"></script>
<script src="https://code.highcharts.com/maps/modules/map.js"></script>
<script src="https://code.highcharts.com/mapdata/custom/world.js"></script>
<script src="https://code.highcharts.com/modules/boost.js"></script>
<script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/offline-exporting.js"></script>
<!-- <script src="https://code.highcharts.com/modules/export-data.js"></script> -->



<script src="https://code.highcharts.com/stock/modules/export-data.js"></script>
<!-- <script src="https://code.highcharts.com/stock/modules/accessibility.js"></script>
<script src="https://code.highcharts.com/themes/adaptive.js"></script> -->

<!-- cog file -->
<!-- <script src="https://unpkg.com/proj4"></script> -->

<!-- <script src="https://unpkg.com/georaster"></script> -->

<!-- <script src="https://unpkg.com/georaster-layer-for-leaflet"></script> -->
<script src="/customized-aagwa/assets/dist/georaster.browser.bundle.min.js"></script>
<script src="/customized-aagwa/assets/dist/georaster-layer-for-leaflet.min.js"></script>
<script src="/customized-aagwa/assets/dist/geoblaze.web.min.js"></script>


<!-- leaflet-easyPrint -->
<script src="/customized-aagwa/assets/dist/leaflet-easyPrint/bundle.js"></script>

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/sharepointplus/browser/sharepointplus.js"></script>


<script>
    jQuery(document).ready(function ($) {

        Aagwa_config.initializeGeoJsonTab({
             "feature" : Aagwa_config.crop_phenology_metrics_table,
             "function_to_load" : "launchCropPhenologyMetrics",
             "node_id" : "crop-phenology-metrics",
             "tab_title" : "Crop Phenology Metrics",
             "li_container" : "ul-tabbed-nav",
             "div_container" : "features-container",
             "chart_container" : Aagwa_config.crop_phenology_metrics_chart_container,
             "belong_chart_feature" :["crop_phenology_metrics_charts"]
        })

        if (window.location.hash == "#biogeophysical-parameters") {
            defTab = 'tab2';
        } else {
            defTab = 'tab1';
        }

        /* jQuery activation and setting options for the tabs*/
        var tabbedNav = $("#tabbed-nav").zozoTabs({
            position: "top-center",
            animation: {
                duration: 100,
                effects: "slideV"
            },
            theme: "silver",
            rounded: true,
            shadows: true,
            size: "large",
            defaultTab: defTab
        });

    });

    //Input range - Min and Max
    /*const min_el = document.getElementById("ex1_min");
    const max_el = document.getElementById("ex1_max");
    rangeV_min = document.getElementById("rangeV_min");
    rangeV_max = document.getElementById("rangeV_max");
    setValue_min = () => {
        console.log("moro")
        const newValue = Number(
                ((min_el.value - min_el.min) * 100) / (min_el.max - min_el.min)
            ),
            newPosition = 10 - newValue * 0.5;
        rangeV_min.innerHTML = `<span>${min_el.value}</span>`;
        rangeV_min.style.left = `calc(${newValue}% + (${newPosition}px))`;
    };
    setValue_max = () => {
        const newValue = Number(
                ((max_el.value - max_el.min) * 100) / (max_el.max - max_el.min)
            ),
            newPosition = 10 - newValue * 0.5;
        rangeV_max.innerHTML = `<span>${max_el.value}</span>`;
        rangeV_max.style.left = `calc(${newValue}% + (${newPosition}px))`;
    };
    document.addEventListener("DOMContentLoaded", setValue_min);
    document.addEventListener("DOMContentLoaded", setValue_max);
    min_el.addEventListener("input", setValue_min);
    max_el.addEventListener("input", setValue_max);*/


    //document.addEventListener("DOMContentLoaded", update_dataset_links);

   /* //Map initialization
    let map = L.map('map', {
        preferCanvas: true,
        zoomControl: false,
        attributionControl: false,
        //center: Aagwa_config.homeCoordinates,
    });


    var noBasemap = L.tileLayer('');

    //Define basemaps
    var baseMaps = {
        "BaseLayer": L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}),
        "DarkMatter": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}),
        "NatGeoWorldMap": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {}),
        "WorldStreetMap": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {}),
        "WorldImagery": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {}),
        "No Basemap": noBasemap,
    };

    //Add default basemap
    var default_tile = baseMaps.BaseLayer.addTo(map);*/

    //console.log(adminUtils)

    

    Aagwa_config.initializeMapCustom({
        "features" : Aagwa_config.prediction_table,
        "container" : Aagwa_config.prediction_map_container,
        "sidebar_container" : "sidebar",
        "sidebar_tab" : "ag_production",

        "addTiffLinkForDownloadAndCitation" : true,
        //new
        "add_event_max_min" : true,
        "add_ex1_colorscaleselect":true,
        "rangeV_min" : "rangeV_min",
        "ex1_min" : "ex1_min",
        "rangeV_max" : "rangeV_max",
        "ex1_max" : "ex1_max",
        "ex1_colorscaleselect" : "ex1_colorscaleselect",
        //end new

        "setTiffLinkForDownloadAndCitation" : (settings) =>{

            // const feature = settings["feature"];
            const geottif_src = settings["geottif_src"];
            const data = settings["data"];

            const geottif_src_nodeId = `geottif_src`;
            const print_map_title_nodeId = `print_map_title`;
            const download_geottif_title_nodeId = `download_geottif_title`;
            const citation_print_map_nodeId = `citation_print_map`;
            const citation_geottif_nodeId = `citation_geottif`;

            console.log("settings setTiffLinkForDownloadAndCitation");
            console.log(settings);
            document.getElementById(geottif_src_nodeId).href = geottif_src;

            document.getElementById(print_map_title_nodeId).textContent = `Predicted ${data["crop"]} ${data["feature"]} ${data["year"]} - ${Aagwa_config.country}`;

            document.getElementById(download_geottif_title_nodeId).textContent = `Predicted ${data["crop"]} ${data["feature"]} ${data["year"]} - ${Aagwa_config.country}`;

            document.getElementById(citation_print_map_nodeId).value = `AKADEMIYA2063, Spatially Disaggregated ${data["crop"]} ${data["feature"]} Forecast of ${Aagwa_config.country} for ${data["year"]} - https://aagwa.org`;

            document.getElementById(citation_geottif_nodeId).value = `AKADEMIYA2063, Spatially Disaggregated ${data["crop"]} ${data["feature"]} Forecast of ${Aagwa_config.country} for ${data["year"]} - https://aagwa.org`;
        },
        downFileAsPngTitle(){
            const form_node = document.getElementById(Aagwa_config.predictionSidebarId);
            const crop = AdmindUtils.getSelectedText(form_node.querySelector("#crop"));
            const feature = AdmindUtils.getSelectedText(form_node.querySelector("#feature"));
            const year = AdmindUtils.getSelectedText(form_node.querySelector("#year"));

            var title_map = (feature == "Production") ? Aagwa_config.country + ' - Predicted ' + crop + ' production (MT) - ' + year : Aagwa_config.country + ' - Predicted ' + crop + ' yield (MT per ha) - ' + year;

            console.log("crop");
            console.log(crop);
            return title_map; 

            /*const feature = AdmindUtils.getSelectedText("feature");
            const yer = AdmindUtils.getSelectedText("year");
            return {
                "data":{
                    "crop" : document.getElementById("crop").value
                }
            }*/
        },
        "config": {
            // "object_id" : "Prediction1731499738226",
            "object_id" : Aagwa_config.predictionObjectID,
            "type" : "modules",
            "parent_id" : Aagwa_config.predictionSidebarId,
            "excludeVar" : ["file"],
            get_data_config : {
                "custom_url" : General_config.aagwa_request_url,
                "object_id" : Aagwa_config.predictionObjectID,
                "type" : "modules",
                "where_column" : "country",
                "where_value" : Aagwa_config.country,
                "inner_join" : true,
                "join_table" : Aagwa_config.country_table,
                "join_left" : `${Aagwa_config.prediction_table}.parent_id`,
                "join_right" : `${Aagwa_config.country_table}.id`,
                "return" : true,
                "load_map_by_default" : true,
                "visualize_by_default" : true,
                "last_data_param" : [{"type":"field","value":"id"},{"type":"field","value":"id"}]
            },

            "events" : {
                "map" : {
                    "click" : async function(map_config,evt){
                        console.log(evt);
                        console.log(map_config);
                        if( map_config && typeof(map_config) === "object" && map_config.hasOwnProperty('layer') && typeof(map_config["layer"]) === "object" && map_config["layer"].hasOwnProperty('options') &&  typeof(map_config["layer"]["options"]) === "object"&& map_config["layer"]["options"].hasOwnProperty('georaster') &&  typeof(map_config["layer"]["options"]["georaster"]) === "object"){
                            const latlng = map_config.map.mouseEventToLatLng(evt.originalEvent);
                            let dat = await geoblaze.identify(map_config["layer"]["options"]["georaster"], [latlng.lng, latlng.lat])
                            if(Array.isArray(dat)){
                                dat = dat[0]*1000;
                            }
                            console.log(dat);
                            // Predicted Maize production: 603.91 Metric tons
                            if( typeof(dat) === "number" && dat > 0 ){
                                console.log("dat")
                                console.log(dat)
                                    //let v = (dat * 100).toFixed(2);
                                    let html;
                                    if(map_config.hasOwnProperty("data_current_selection") && typeof(map_config["data_current_selection"]) === "object" &&  map_config["data_current_selection"].hasOwnProperty("crop") && map_config["data_current_selection"].hasOwnProperty("feature") && map_config["data_current_selection"].hasOwnProperty("year")){
                                        const crop = map_config["data_current_selection"]["crop"];
                                        const year = map_config["data_current_selection"]["year"];
                                        const param = map_config["data_current_selection"]["feature"];
                                        const param_txt = document.getElementById("feature").querySelector(`option[value="${param}"]`).innerText;
                                        let unity = "";
                                        switch (param){
                                            case "production" : unity = "g";break;
                                            case "yield" : unity = "tonnes/hectare"; break;
                                        }
                                        //html = `<span class="popupText"> ${crop}, ${year}, ${param_txt} : ${dat.toFixed(2)} ${unity}</span>`;
                                        html = `<span class="popupText"> Predicted ${crop}, ${year}, ${param_txt} : ${dat.toFixed(2)} ${unity}</span>`;
                                    }
                                    else{
                                        html = `<span class="popupText">prediction value : ${dat.toFixed(2)} </span>`;
                                    }
                                    
                                    
                                    let popup = L.popup()
                                        .setLatLng(latlng)
                                        .setContent(html)
                                        .openOn(map_config.map);
                                
                            }
                        }
                       
                    }
                }
            }
        },
        "bar_config" : false,
        /*"bar_config" : (data,extra) => {
            
            if ( data && typeof(data) === "object" && data.hasOwnProperty("is_cog") && data["is_cog"] == true){
                return false;
            }
            else{
                return L.control.colorBar(extra["chroma"].scale('spectral'), [0,1],{
                            title: extra["title"],
                            units:  extra["unit"],
                            steps: 100,
                            decimals: 1,
                            width: 350,
                            height: 20,
                            position: 'bottomright',
                            background: '#000',
                            // textColor: 'white',
                            labels: [0, 0.5, 1.0, 1.5, 2.0],
                            labelFontSize: 9
                        });
            }
        },*/
        "legend" : (feature,data) => {
            if(!data.is_cog || data.is_cog == null){

               
              // Aagwa_config[feature].map.removeControl(Aagwa_config[feature].mapLegend); 
              Aagwa_config[feature].mapLegend = false;
                try{
                    Aagwa_config[feature].map.removeControl(Aagwa_config[feature].mapLegend);   
                }
                catch(error){

                }
                return ;
            }
            // mapLegend
            console.log("feature--------------")
            console.log(feature)
            try{
                Aagwa_config[feature].map.removeControl(Aagwa_config[feature].mapLegend);
                //map.removeControl(legend);
            }
            catch(error){

            }

            console.log("data Legend");
            console.log(data);

            /*let legend_prefix = "Suitable area "
            if( data && typeof(data) === "object" && data.hasOwnProperty("parameter") && data["parameter"] != "composite" ){

                legend_prefix =  document.getElementById("parameter").querySelector(`option[value="${data["parameter"]}"]`).innerText +" Similar profile";
            }*/

            // Parameter + Similar profile 

            Aagwa_config[feature].mapLegend = L.control({position: 'bottomright'});
            Aagwa_config[feature].mapLegend.onAdd = function (map) {
                let div = L.DomUtil.create('div', 'info legend');
                // Example legend content - replace with your actual legend items
                div.innerHTML += `<h6>${data["year"]} predicted ${data["crop"]} production in ${Aagwa_config.country} (in g/100m2)</h6>`;
                div.innerHTML += `<div><i style="background:#f70f0c"></i><span>0-500</span></div>`;
                div.innerHTML += `<div><i style="background:#e9f610"></i><span>500-1000</span></div>`;
                div.innerHTML += `<div><i style="background:#cff610"></i><span>1000-2000</span></div>`;
                div.innerHTML += `<div><i style="background:#afef53"></i><span>2000-4000</span></div>`;
                div.innerHTML += `<div><i style="background:#14ba10"></i><span>4000-6000</span></div>`;
                div.innerHTML += `<div><i style="background:#01856a"></i><span>6000-9000</span></div>`;
                div.innerHTML += `<div><i style="background:#792635"></i><span> > 9000</span></div>`;

                
                /*div.innerHTML = '<h4>My Legend</h4>' +
                        '<i style="background: red"></i> Red Category<br>' +
                        '<i style="background: blue"></i> Blue Category';*/

                // div.innerHTML += '<i style="background:#00ff00"></i><span>Suitable area and cultivated as predicted</span><br>';
                // div.innerHTML += '</tr>';
                return div;
            };
            // return leg;
        },
        "geoRasterLayer" : (georaster,settings,callback) =>{
                       
            // console.log("Aagwa_config.mapData geoRasterLayer-----------------------");
            // console.log(Aagwa_config.mapData);
            // console.log("settings geoRasterLayer");
            // console.log(Aagwa_config[settings]);
            // console.log("Aagwa_config.getCountryParam().bound");
            // console.log(Aagwa_config.getCountryParam().bound);

            return {
                debugLevel: 0,
                // attribution: "Unknown",
                attribution: "Planet",
                georaster: georaster,
                resolution: 128,
                "mask" : Aagwa_config.mapDataLevel1,
                resampleMethod : "bilinear",
                //bound : Aagwa_config.getCountryParam().bound.bound,
               /* pixelValuesToColorFn: function(pixelValues) {
                    // Example: Scale a single band value (assuming a single-band TIFF)
                    const rawValue = pixelValues[0];
                    const scaledValue = (rawValue - minVal) / (maxVal - minVal); // Normalize to 0-1
                    const colorComponent = Math.floor(scaledValue * 255); // Scale to 0-255 for RGB
                    return `rgba(${colorComponent}, ${colorComponent}, ${colorComponent}, 1)`; // Grayscale
                },*/
                
                pixelValuesToColorFn : (values) => {
                    
                    
                    // values[0] > 42 ? '#000000' : '#ffffff';

                    // let scale = chroma.scale(['brown', 'orange', 'red']).domain([0,100,1000]);
                    // const scale = chroma.scale(['white', 'black']).domain([0,100]);
                    const scale = chroma.scale("spectral");
                   // console.log("values")
                   // console.log(values)

                    let val_ex;
                    /*if(values[0] === 0){
                        val_ex = '#000000';
                    }
                    else */if( values[0] > 0 ){
                        /*if(values[0] > 0 && values[0]<= 0.009999999999999999){
                            val_ex = '#f70f0c';
                        }
                        else if(values[0] > 0.009999999999999999 && values[0]<= 0.10000000000000001){
                            val_ex = "#e9f610";
                        }
                       else if(values[0] > 0.10000000000000001 && values[0]<= 0.20000000000000001){
                            val_ex = "#cff610";
                        }
                        else if(values[0] > 0.20000000000000001 && values[0]<= 0.40000000000000002){
                            val_ex = "#afef53";
                        }
                        else if(values[0] > 0.40000000000000002 && values[0]<= 0.59999999999999998){
                            val_ex = "#14ba10";
                        }
                        else if(values[0] > 0.59999999999999998 && values[0]<= 0.80000000000000004){
                            val_ex = "#01856a";
                        }
                        else if(values[0] > 0.80000000000000004 ){
                             val_ex = "#792635";
                        }
                        else{
                            console.log(values[0])
                        }*/
                        /*if(values[0] > 0 && values[0]< 0.006){
                            val_ex = '#f70f0c';
                        }
                        else if(values[0] >= 0.006 && values[0] < 0.2){
                            val_ex = "#e9f610";
                        }
                        else if(values[0] >= 0.2 && values[0] < 0.3){
                            val_ex = "#cff610";
                        }
                        else if(values[0] >= 0.3 && values[0]< 0.5){
                            val_ex = "#afef53";
                        }
                        else if(values[0] >= 0.5 && values[0]< 0.6){
                            val_ex = "#14ba10";
                        }
                        else if(values[0] >= 0.6 && values[0]< 0.9){
                            val_ex = "#01856a";
                        }
                        else if(values[0] >= 0.9 ){
                             val_ex = "#792635";
                        }
                        else{
                            console.log(values[0])
                        }*/

                        if(values[0] > 0 && values[0]< 0.6){
                            val_ex = '#f70f0c';
                        }
                        else if(values[0] >= 0.6 && values[0] < 2){
                            val_ex = "#e9f610";
                        }
                        else if(values[0] >= 2 && values[0] < 3){
                            val_ex = "#cff610";
                        }
                        else if(values[0] >= 3 && values[0]< 5){
                            val_ex = "#afef53";
                        }
                        else if(values[0] >= 5 && values[0]< 6){
                            val_ex = "#14ba10";
                        }
                        else if(values[0] >= 6 && values[0]< 9){
                            val_ex = "#01856a";
                        }
                        else if(values[0] >= 9 ){
                             val_ex = "#792635";
                        }
                        else{
                            console.log(values[0])
                        }

                        if( callback && typeof(callback) === "function" ){
                            callback(settings,values[0]);
                        }

                        // console.log(values)
                        // console.log(values[0]);
                        // return '#000000';
                        // return '#FBBD2E';
                        //return scale(values[0]).hex();
                        // return chroma.scale(['white', 'black'])(values[0]).hex();
                        // return scale(values[0]).hex();
                    }
                    return val_ex;
                },
                keepBuffer :100
            }
        },
        setMaxMin(aagwa_features,value){
            // console.log("value")
            // console.log(value)
            if( !Aagwa_config[aagwa_features].settings.hasOwnProperty("max_value") || ( Aagwa_config[aagwa_features].settings.hasOwnProperty("max_value") && (value > Aagwa_config[aagwa_features].settings["max_value"]))){
                Aagwa_config[aagwa_features].settings["max_value"] = value;
                // console.log('Aagwa_config[aagwa_features].settings["max_value"]');
                // console.log(Aagwa_config[aagwa_features].settings["max_value"]);
            }
            if( !Aagwa_config[aagwa_features].settings.hasOwnProperty("min_value") || ( Aagwa_config[aagwa_features].settings.hasOwnProperty("min_value") && (value < Aagwa_config[aagwa_features].settings["min_value"]))){
                Aagwa_config[aagwa_features].settings["min_value"] = value;
                // console.log('Aagwa_config[aagwa_features].settings["min_value"]')
                // console.log(Aagwa_config[aagwa_features].settings["min_value"])
            }
            if(!Aagwa_config[aagwa_features].settings.hasOwnProperty("tabValues")){
                Aagwa_config[aagwa_features].settings["tabValues"] = [];
            }
             Aagwa_config[aagwa_features].settings["tabValues"].push(value);

        }
    });

    //crop mapping
    Aagwa_config.initializeCogMap({
    //Aagwa_config.initializeMapCustom({
        "renderVisualizationToolsPane" : true,
        "renderAccessToDataPane" : true,

        "renderDownloadTools" : true,
        "addTiffLinkForDownloadAndCitation" : true,

        "tablistId":"tablist-crop_mapping",

        "add_event_max_min" : true,
        "add_ex1_colorscaleselect":true,
        "default_color_scale":"spectral",
        "features" : Aagwa_config.crop_mapping_table,
        "container" : Aagwa_config.crop_mapping_map_container,
        "sidebar_container" : "sidebar-crop-mapping",
        "sidebar_tab" : "ag_crop_mapping",
        "georaster" : true,
        /*"tiffLinkForDownloadAndCitationOptions" : {
            //"geottif_src" : url_to_geotiff_file,
            "geottif_src_nodeId" : `${Aagwa_config.crop_mapping_table}-geottif_src`,
            "print_map_title_nodeId" : `${Aagwa_config.crop_mapping_table}-print_map_title`
            "download_geottif_title_nodeId" : `${Aagwa_config.crop_mapping_table}-download_geottif_title`
            "citation_print_map_nodeId" : `${Aagwa_config.crop_mapping_table}-citation_print_map`
            "citation_geottif_nodeId" : `${Aagwa_config.crop_mapping_table}-citation_geottif`
        }*/
        "setTiffLinkForDownloadAndCitation" : (settings) =>{

            const feature = settings["feature"];
            const geottif_src = settings["geottif_src"];
            const data = settings["data"];

            const geottif_src_nodeId = `${feature}-geottif_src`;
            const print_map_title_nodeId = `${feature}-print_map_title`;
            const download_geottif_title_nodeId = `${feature}-download_geottif_title`;
            const citation_print_map_nodeId = `${feature}-citation_print_map`;
            const citation_geottif_nodeId = `${feature}-citation_geottif`;

            console.log("settings setTiffLinkForDownloadAndCitation");
            console.log(settings);
            document.getElementById(geottif_src_nodeId).href = geottif_src;

            document.getElementById(print_map_title_nodeId).textContent = `Crop mapping ${data["crop"]} ${data["year"]} - ${Aagwa_config.country}`;

            document.getElementById(download_geottif_title_nodeId).textContent = `Crop mapping ${data["crop"]} ${data["year"]} - ${Aagwa_config.country}`;

            document.getElementById(citation_print_map_nodeId).value = `AKADEMIYA2063, Spatially Disaggregated ${data["crop"]} Crop mapping ${Aagwa_config.country} for ${data["year"]} - https://aagwa.org`;

            document.getElementById(citation_geottif_nodeId).value = `AKADEMIYA2063, Spatially Disaggregated ${data["crop"]} Crop mapping ${Aagwa_config.country} for ${data["year"]} - https://aagwa.org`;
        },
        downFileAsPngTitle(){
            const form_node = document.getElementById(Aagwa_config.cropMappingSidebarId);
            const crop = AdmindUtils.getSelectedText(form_node.querySelector("#crop"));
            //const feature = AdmindUtils.getSelectedText(form_node.querySelector("#feature"));
            const year = AdmindUtils.getSelectedText(form_node.querySelector("#year"));

            var title_map = Aagwa_config.country + ' - Crop Mapping ' + crop + ' - ' + year; 

            //console.log("crop");
            //console.log(crop);
            return title_map; 
            
            /*const feature = AdmindUtils.getSelectedText("feature");
            const yer = AdmindUtils.getSelectedText("year");
            return {
                "data":{
                    "crop" : document.getElementById("crop").value
                }
            }*/
        },
        "config" : {
            "object_id" : Aagwa_config.cropMappingObjectID,
            "type" : "modules",
            "parent_id" : Aagwa_config.cropMappingSidebarId,
            "excludeVar" : ["file"],
            get_data_config : {
                "custom_url" : General_config.aagwa_request_url,
                "object_id" : Aagwa_config.cropMappingObjectID,
                "type" : "modules",
                "where_column" : "country",
                "where_value" : Aagwa_config.country,
                "inner_join" : true,
                "join_table" : Aagwa_config.country_table,
                "join_left" : `${Aagwa_config.crop_mapping_table}.parent_id`,
                "join_right" : `${Aagwa_config.country_table}.id`,
                "return" : true,
                "load_map_by_default" : true,
                "visualize_by_default" : false,
                "last_data_param" : [{"type":"field","value":"id"},{"type":"field","value":"id"}]
            },
            "events" : {
                "map" : {
                    "click" : async function(map_config,evt){
                        console.log(evt);
                        console.log(map_config);
                        if( map_config && typeof(map_config) === "object" && map_config.hasOwnProperty('layer') && typeof(map_config["layer"]) === "object" && map_config["layer"].hasOwnProperty('options') &&  typeof(map_config["layer"]["options"]) === "object"&& map_config["layer"]["options"].hasOwnProperty('georaster') &&  typeof(map_config["layer"]["options"]["georaster"]) === "object"){
                            //const latlng = map_config.map.mouseEventToLatLng(evt.originalEvent);
                            const latlng = evt.latlng;
                            console.log("latlng")
                            console.log(latlng)
                            console.log(map_config["layer"]["options"]["georaster"])
                            let dat = await geoblaze.identify(map_config["layer"]["options"]["georaster"], [latlng.lng, latlng.lat])
                            console.log(dat)
                            if(Array.isArray(dat)){
                                dat = dat[0];
                            }
                            console.log(dat)
                            if( typeof(dat) === "number" && dat > 0 ){
                                console.log("dat")
                                console.log(dat)
                                    let v = (dat * 100).toFixed(2);
                                    const html = `<span class="popupText">Probability : ${v} %</span>`;
                                    /*if (data["feature"] == "production") {
                                        var html = (`<span class="popupText">Predicted ` + data["crop"] + ` production: ${v} Metric tons` + `</span>`);
                                    } else if (data["feature"] == "yield") {
                                        var html = (`<span class="popupText">Predicted ` + data["crop"] + ` yield: ${v} MT/ha` + `</span>`);
                                    }*/
                                    let popup = L.popup()
                                        .setLatLng(latlng)
                                        .setContent(html)
                                        .openOn(map_config.map);
                                
                            }
                        }
                        /*if (e.value !== null) {
                            let v = e.value.toFixed(2);
                            if (data["feature"] == "production") {
                                var html = (`<span class="popupText">Predicted ` + data["crop"] + ` production: ${v} Metric tons` + `</span>`);
                            } else if (data["feature"] == "yield") {
                                var html = (`<span class="popupText">Predicted ` + data["crop"] + ` yield: ${v} MT/ha` + `</span>`);
                            }
                            let popup = L.popup()
                                .setLatLng(e.latlng)
                                .setContent(html)
                                .openOn(Aagwa_config[aagwa_features].map);
                        }*/
                    }
                }
            }
        },
        setMaxMin(aagwa_features,value){
            if( !Aagwa_config[aagwa_features].settings.hasOwnProperty("max_value") || ( Aagwa_config[aagwa_features].settings.hasOwnProperty("max_value") && (value > Aagwa_config[aagwa_features].settings["max_value"]))){
                Aagwa_config[aagwa_features].settings["max_value"] = value;
                //console.log(settings["max_value"]);
            }
            if( !Aagwa_config[aagwa_features].settings.hasOwnProperty("min_value") || ( Aagwa_config[aagwa_features].settings.hasOwnProperty("min_value") && (value < Aagwa_config[aagwa_features].settings["min_value"]))){
                Aagwa_config[aagwa_features].settings["min_value"] = value;
                //console.log(settings["min_value"])
            }
            if(!Aagwa_config[aagwa_features].settings.hasOwnProperty("tabValues")){
                Aagwa_config[aagwa_features].settings["tabValues"] = [];
            }
             Aagwa_config[aagwa_features].settings["tabValues"].push(value);

        },
        "geoRasterLayer" : (georaster,settings,callback) =>{
            return {

                attribution: "Planet",
                georaster: georaster,
                resolution: 128,
                pixelValuesToColorFn: (values) => {
                    
                    
                    // values[0] > 42 ? '#000000' : '#ffffff';

                    // let scale = chroma.scale(['brown', 'orange', 'red']).domain([0,100,1000]);
                    // const scale = chroma.scale(['white', 'black']).domain([0,100]);
                    //console.log(values);
                    const scale = chroma.scale("spectral");
                   
                    if( values[0] > 0 ){
                        if( callback && typeof(callback) === "function" ){
                            callback(settings,values[0]);
                        }
                        // console.log(values)
                        // console.log(values[0]);
                        // return '#000000';
                        // return '#FBBD2E';
                        //return scale(values[0]).hex();
                        // return chroma.scale(['white', 'black'])(values[0]).hex();
                        return scale(values[0]).hex();
                    }
                },
                    
            }
        }
    });

    //crop_suitability
    Aagwa_config.initializeCogMap({
        "renderVisualizationToolsPane" : true,
        "renderAccessToDataPane" : true,
        "renderDownloadTools" : true,
        "addTiffLinkForDownloadAndCitation" : true,
        "tablistId":"tablist-crop_suitability",

        "add_event_max_min" : true,
        "add_ex1_colorscaleselect":true,
        "default_color_scale":"spectral",
        "features" : Aagwa_config.crop_suitability_table,
        "container" : Aagwa_config.crop_suitability_map_container,
        "sidebar_container" : "sidebar-crop_suitability",
        "sidebar_tab" : "ag_crop_suitability",
        "georaster" : true,
        "range_domain" : [1,2],
        "legend" : (feature,data) => {
            // mapLegend
            try{
                Aagwa_config[feature].map.removeControl(Aagwa_config[feature].mapLegend);
            }
            catch(erro){

            }
            
            console.log("data Legend");
            console.log(data);

            let legend_prefix = "Suitable area "
            if( data && typeof(data) === "object" && data.hasOwnProperty("parameter") && data["parameter"] != "composite" ){

                legend_prefix =  document.getElementById("parameter").querySelector(`option[value="${data["parameter"]}"]`).innerText +" Similar profile";
            }

            // Parameter + Similar profile 

            Aagwa_config[feature].mapLegend = L.control({position: 'bottomright'});
            Aagwa_config[feature].mapLegend.onAdd = function (map) {
                let div = L.DomUtil.create('div', 'info legend');
                // Example legend content - replace with your actual legend items
                div.innerHTML += '<h4>Crop Suitability</h4>';
                /*div.innerHTML += '<i style="background:#ff0000"></i><span>Suitable area but not cultivated</span><br>';
                div.innerHTML += '<i style="background:#00ff00"></i><span>Suitable area and cultivated as predicted</span><br>';*/

                /*div.innerHTML += '<div><i style="background:#ff0000"></i><span>Suitable area but not cultivated</span></div>';
                div.innerHTML += '<div><i style="background:yellow"></i><span>Suitable area and cultivated as predicted</span></div>';*/

                div.innerHTML += `<div><i style="background:#ff0000"></i><span>${legend_prefix} but not cultivated</span></div>`;
                div.innerHTML += `<div><i style="background:yellow"></i><span>${legend_prefix} and cultivated as predicted</span></div>`;

                
                /*div.innerHTML = '<h4>My Legend</h4>' +
                        '<i style="background: red"></i> Red Category<br>' +
                        '<i style="background: blue"></i> Blue Category';*/

                // div.innerHTML += '<i style="background:#00ff00"></i><span>Suitable area and cultivated as predicted</span><br>';
                // div.innerHTML += '</tr>';
                return div;
            };
            // return leg;
        },
        "setTiffLinkForDownloadAndCitation" : (settings) =>{
            const feature = settings["feature"];
            const geottif_src = settings["geottif_src"];
            const data = settings["data"];

            const geottif_src_nodeId = `${feature}-geottif_src`;
            const print_map_title_nodeId = `${feature}-print_map_title`;
            const download_geottif_title_nodeId = `${feature}-download_geottif_title`;
            const citation_print_map_nodeId = `${feature}-citation_print_map`;
            const citation_geottif_nodeId = `${feature}-citation_geottif`;

            console.log("settings setTiffLinkForDownloadAndCitation");
            console.log(settings);
            document.getElementById(geottif_src_nodeId).href = geottif_src;

            document.getElementById(print_map_title_nodeId).textContent = `${data["parameter"]} Crop suitability ${data["crop"]}  ${data["year"]} - ${Aagwa_config.country}`;

            document.getElementById(download_geottif_title_nodeId).textContent = `${data["parameter"]} Crop suitability ${data["crop"]}  ${data["year"]} - ${Aagwa_config.country}`;

            document.getElementById(citation_print_map_nodeId).value = `AKADEMIYA2063, Spatially Disaggregated ${data["crop"]} ${data["parameter"]} Crop suitability ${Aagwa_config.country} for ${data["year"]} - https://aagwa.org`;

            document.getElementById(citation_geottif_nodeId).value = `AKADEMIYA2063, Spatially Disaggregated ${data["crop"]} ${data["parameter"]} Crop suitability ${Aagwa_config.country} for ${data["year"]} - https://aagwa.org`;
        },
        downFileAsPngTitle(){
            const form_node = document.getElementById(Aagwa_config.cropSuitabilitySidebarId);
            const crop = AdmindUtils.getSelectedText(form_node.querySelector("#crop"));
            const parameter = AdmindUtils.getSelectedText(form_node.querySelector("#parameter"));
            const year = AdmindUtils.getSelectedText(form_node.querySelector("#year"));

            var title_map = `${Aagwa_config.country} - ${parameter} Crop Suitability ${crop} - ${year}`; 

            //console.log("crop");
            //console.log(crop);
            return title_map; 
            
            /*const feature = AdmindUtils.getSelectedText("feature");
            const yer = AdmindUtils.getSelectedText("year");
            return {
                "data":{
                    "crop" : document.getElementById("crop").value
                }
            }*/
        },
        "bar_config" : false,
        /*bar_config(settings){
           // return ;
            console.log("bar_config")

            let scale;
            let range;

            if( settings && typeof(settings) === "object" && settings.hasOwnProperty("scale") && settings.hasOwnProperty("range")){
                range = settings.range;
                scale = settings.scale;
            }
            else{
                range = [1,2];
                scale = chroma.scale(["yellow","red"]).domain(range);
            }

            return L.control.colorBar(scale,range, {
                    title: "crop suitability map",
                    // margin : 10,
                    units: "",
                    steps: 1,
                    decimals: 1,
                    width: 300,
                    height: 20,
                    position: 'bottomright',
                    background: '#000',
                    // textColor: 'black',
                    textLabels: ['1','2'],
                    // textLabels: ["souhatable and non cultivated area","souhatable and cultivated area"],
                    //labels: [0, 0.5, 1.0, 1.5, 2.0],
                    labels: [1.0, 2.0],
                    labelFontSize: 15,
                    // labelTextPosition : "start"
                })
        },*/
        "config" : {
            "object_id" : Aagwa_config.cropSuitabilityObjectID,
            "type" : "modules",
            "parent_id" : Aagwa_config.cropSuitabilitySidebarId,
            "excludeVar" : ["file"],
            get_data_config : {
                "custom_url" : General_config.aagwa_request_url,
                "object_id" : Aagwa_config.cropSuitabilityObjectID,
                "type" : "modules",
                "where_column" : "country",
                "where_value" : Aagwa_config.country,
                "inner_join" : true,
                "join_table" : Aagwa_config.country_table,
                "join_left" : `${Aagwa_config.crop_suitability_table}.parent_id`,
                "join_right" : `${Aagwa_config.country_table}.id`,
                "return" : true,
                "load_map_by_default" : true,
                "visualize_by_default" : false,
                "last_data_param" : [{"type":"field","value":"id"},{"type":"field","value":"id"}]
            },
            /*"events" : {
                "map" : {
                    "click" : async function(map_config,evt){
                        console.log(evt);
                        console.log(map_config);
                        if( map_config && typeof(map_config) === "object" && map_config.hasOwnProperty('layer') && typeof(map_config["layer"]) === "object" && map_config["layer"].hasOwnProperty('options') &&  typeof(map_config["layer"]["options"]) === "object"&& map_config["layer"]["options"].hasOwnProperty('georaster') &&  typeof(map_config["layer"]["options"]["georaster"]) === "object"){
                            const latlng = map_config.map.mouseEventToLatLng(evt.originalEvent);
                            let dat = await geoblaze.identify(map_config["layer"]["options"]["georaster"], [latlng.lng, latlng.lat])
                            if(Array.isArray(dat)){
                                dat = dat[0];
                            }
                            console.log(dat)
                            if( typeof(dat) === "number" && dat > 0 ){
                                console.log("dat")
                                console.log(dat)
                                    //let v = (dat * 100).toFixed(2);
                                    let html;
                                    if(map_config.hasOwnProperty("data_current_selection") && typeof(map_config["data_current_selection"]) === "object" &&  map_config["data_current_selection"].hasOwnProperty("crop") && map_config["data_current_selection"].hasOwnProperty("parameter") && map_config["data_current_selection"].hasOwnProperty("year")){
                                        const crop = map_config["data_current_selection"]["crop"];
                                        const year = map_config["data_current_selection"]["year"];
                                        const param = map_config["data_current_selection"]["parameter"];
                                        const param_txt = document.getElementById("parameter").querySelector(`option[value="${param}"]`).innerText;
                                        let unity = "";
                                        switch (param){
                                            case "soil_moisture" : unity = "m³/m³";break;
                                            case "elevation" : unity = "m";break;
                                            case "rainfall" : unity = "mm";break;
                                            case "lst" : unity = "°C"; break;
                                            case "evapotranspiration" : unity = "mm"; break;
                                        }
                                        html = `<span class="popupText"> ${crop}, ${year}, ${param_txt} : ${dat.toFixed(2)} ${unity}</span>`;
                                    }
                                    else{
                                        html = `<span class="popupText">crop suitability value : ${dat.toFixed(2)} </span>`;
                                    }
                                    
                                    
                                    let popup = L.popup()
                                        .setLatLng(latlng)
                                        .setContent(html)
                                        .openOn(map_config.map);
                                
                            }
                        }
                       
                    }
                }
            }*/
        },
        setMaxMin(aagwa_features,value){
            if( !Aagwa_config[aagwa_features].settings.hasOwnProperty("max_value") || ( Aagwa_config[aagwa_features].settings.hasOwnProperty("max_value") && (value > Aagwa_config[aagwa_features].settings["max_value"]))){
                Aagwa_config[aagwa_features].settings["max_value"] = value;
                //console.log(settings["max_value"]);
            }
            if( !Aagwa_config[aagwa_features].settings.hasOwnProperty("min_value") || ( Aagwa_config[aagwa_features].settings.hasOwnProperty("min_value") && (value < Aagwa_config[aagwa_features].settings["min_value"]))){
                Aagwa_config[aagwa_features].settings["min_value"] = value;
                //console.log(settings["min_value"])
            }
            if(!Aagwa_config[aagwa_features].settings.hasOwnProperty("tabValues")){
                Aagwa_config[aagwa_features].settings["tabValues"] = [];
            }
             Aagwa_config[aagwa_features].settings["tabValues"].push(value);

        },
        "geoRasterLayer" : (georaster,settings,callback) =>{
            return {

                attribution: "Planet",
                georaster: georaster,
                resolution: 128,
                pixelValuesToColorFn: (values) => {
                    
                    
                    // values[0] > 42 ? '#000000' : '#ffffff';

                    
                    //const scale = chroma.scale("spectral");
                    // const scale = chroma.scale(["yellow","red"]).colors(2);
                    
                   
                    if( values[0] > 0 ){
                        //const scale = chroma.scale("hot").domain([1,2]);
                        const scale = chroma.scale(["yellow","red"]).domain([1,2]);
                        //const scale = chroma.scale(["yellow","red"]).domain([1,2]);
                        // const scale = chroma.scale(["yellow","red"]).domain([1,2]);

                        if( callback && typeof(callback) === "function" ){
                            callback(settings,values[0]);
                        }
                        //console.log("values")
                        //console.log(values)
                        // console.log(values[0]);
                        // return '#000000';
                        // return '#FBBD2E';
                        //return scale(values[0]).hex();
                        // return chroma.scale(['white', 'black'])(values[0]).hex();
                        return scale(values[0]).hex();
                        //return values[0] === 1 ? scale[0] : scale[1];
                    }
                },
                    
            }
        }
    });
    
   /* Aagwa_config.initializeMapCustom({
        "features" : Aagwa_config.crop_land_delineation_table,
        "container" : Aagwa_config.crop_land_delineation_map_container,
        "sidebar_container" : "sidebar-crop_land_delineation",
        "sidebar_tab" : "ag_crop_land_delineation",
        "config": {
            // "object_id" : "Prediction1731499738226",
            "object_id" : Aagwa_config.crop_land_delineationObjectID,
            "type" : "modules",
            "parent_id" : Aagwa_config.crop_land_delineationSidebarId,
            "excludeVar" : ["file"],
            get_data_config : {
                "custom_url" : General_config.aagwa_request_url,
                "object_id" : Aagwa_config.crop_land_delineationObjectID,
                "type" : "modules",
                "where_column" : "country",
                "where_value" : Aagwa_config.country,
                "inner_join" : true,
                "join_table" : Aagwa_config.country_table,
                "join_left" : `${Aagwa_config.crop_land_delineation_table}.parent_id`,
                "join_right" : `${Aagwa_config.country_table}.id`,
                "load_map_by_default" : false,
                "last_data_param" : [{"type":"field","value":"id"}],
                "return" : true
            }
        }
    });*/

    url_country = "../data/Congo Republic/gadm36_COG_0.json";
    url_region = "../data/Congo Republic/gadm36_COG_1.json";
    url_commune = "../data/Congo Republic/gadm36_COG_2.json";

    var overlays;

    /*$.getJSON(url_commune, function (dataComm) {
        $.getJSON(url_region, function (dataReg) {
            $.getJSON(url_country, function (dataCountry) {
                console.log("dataCountry")
                console.log(dataCountry)
                region = L.geoJson(dataReg, {onEachFeature: forEachFeatureRegion});
                commune = L.geoJson(dataComm, {onEachFeature: forEachFeatureCommune});
                country = L.geoJson(dataCountry, {onEachFeature: forEachFeatureCountry});

                function forEachFeatureCountry(feature, layer) {
                }

                function forEachFeatureRegion(feature, layer) {
                    var popupContent = "<p>Admin Level 1: <b>" + feature.properties.NAME_1 + "</b></p>";
                    layer.bindPopup(popupContent);
                }

                function forEachFeatureCommune(feature, layer) {
                    var popupContent = "<p>Admin Level 1: <b>" + feature.properties.NAME_1 + "</b>" +
                        "</br>Admin Level 2: <b>" + feature.properties.NAME_2 + "</b></p>";
                    layer.bindPopup(popupContent);
                }


                overlays = {
                    "Admin level 0": country,
                    "Admin level 1": region,
                    "Admin level 2": commune
                };


                // Add method to layer control class
                L.Control.Layers.include({
                    getOverlays: function () {
                        // hash to hold all layers
                        var control, layers;
                        layers = {};
                        control = this;
                        // loop thru all layers in control
                        control._layers.forEach(function (obj) {
                            var layerName;
                            // get name of layer
                            layerName = obj.name;
                            // store whether it's present on the map or not
                            return layers[layerName] = control._map.hasLayer(obj.layer);
                        });
                        return layers;
                    }
                });

                control = L.control.layers(baseMaps, overlays).addTo(map);
                map.addLayer(country);


            });
        });
    });*/


    //Change colorBar color when basemap changes - And add Level0 layer when no basemap selected
    /*Aagwa_config.map.on('baselayerchange', onbaselayerchange);
    Aagwa_config.cropp_mapping_map.on('baselayerchange', onbaselayerchange);

    function onbaselayerchange(e) {
        if (e.name == "DarkMatter" || e.name == "WorldImagery") {
            document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
                el.style.color = 'white';
            });
            document.getElementById("ex1_min").style.background = '#f4f4f4';
            document.getElementById("ex1_max").style.background = '#f4f4f4';
        } else if (e.name == "No Basemap") {
            document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
                el.style.color = 'black';
                map.addLayer(country);
            });
            document.getElementById("ex1_min").style.background = 'rgb(253 253 253)';
            document.getElementById("ex1_max").style.background = 'rgb(253 253 253)';
        } else {
            document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
                el.style.color = 'black';
            });
            document.getElementById("ex1_min").style.background = 'rgb(253 253 253)';
            document.getElementById("ex1_max").style.background = 'rgb(253 253 253)';
        }
    }

    //Fullscreen
    Aagwa_config.map.addControl(new L.Control.Fullscreen());
    Aagwa_config.cropp_mapping_map.addControl(new L.Control.Fullscreen());*/

    var control;
    var layer;
    var zoomHome;
    var bar1;
    var bar;
    var active;
    
    


   /*d3.request("../data/Congo Republic/Cassava/Production/2023_predict/Congo Republic_Predicted_Cassava_Production_2023.tif").responseType('arraybuffer').get(
        function (error, tiffData) {
            return ;
            // console.log(tiffData);
            //Add product layer to map
            let prod = L.ScalarField.fromGeoTIFF(tiffData.response);
            layer = L.canvasLayer.scalarField(prod,
                {
                    color: chroma.scale('spectral').domain(prod.range),
                    inFilter: (v) => v !== 0
                }).addTo(Aagwa_config.map);

            // Map Home button
            zoomHome = L.Control.zoomHome();
            console.log("layer.getBounds().getCenter()")
            console.log("Aagwa_config.homeCoordinates")
            console.log(Aagwa_config.homeCoordinates)
            zoomHome.setHomeCoordinates(layer.getBounds().getCenter());
            // zoomHome.setHomeCoordinates({ lat: -0.6719004159999278, lng: 14.909176499999983 });

            // zoomHome.setHomeCoordinates(Aagwa_config.homeCoordinates);
            //zoomHome.setHomeCoordinates({"latitude" : 9.145486056167277,"longitude" : 2.1093750000000004});
            //zoomHome.setHomeZoom(Aagwa_config.homeZoom);
            zoomHome.setHomeZoom(7);
            zoomHome.addTo(Aagwa_config.map);


            // create the sidebar instance and add it to the map
            var sidebar = L.control.sidebar({container: 'sidebar'})
                .addTo(Aagwa_config.map)
                .open('ag_production');

            //Legend
            var range = prod.range;
            var scale = chroma.scale('spectral').domain(range);

            bar1 = L.control.colorBar(scale, range, {
                title: 'Predicted cassava production (MT)',
                units: 'MT',
                steps: 100,
                decimals: 1,
                width: 350,
                height: 20,
                position: 'bottomright',
                background: '#000',
                // textColor: 'white',
                labels: [0, 0.5, 1.0, 1.5, 2.0],
                labelFontSize: 9
            }).addTo(Aagwa_config.map);


            layer.on('click', function (e) {
                if (e.value !== null) {
                    let v = e.value.toFixed(2);
                    let html = (`<span class="popupText">Predicted cassava production: ${v} MT</span>`);
                    let popup = L.popup()
                        .setLatLng(e.latlng)
                        .setContent(html)
                        .openOn(Aagwa_config.map);
                }
            });

            //Triggered default click
            // L.popup().setLatLng({lat: 14.360191158370366, lng: -15.373134613037111}).setContent(
            //   '<span class="popupText">Predicted millet production: 419.21 Tons</span>').openOn(map);


            bar = '';

            var colorscaleSelect = document.getElementById("ex1_colorscaleselect");
            colorscaleSelect.addEventListener('change', function () {
                var scale = chroma.scale(this.value).domain(prod.range);
                layer.setColor(scale);


                //Legend
                bar1.remove(Aagwa_config.map);
                if (bar != '') {
                    bar.remove(Aagwa_config.map);
                }
                var range = prod.range;
                var scale = chroma.scale(this.value).domain(prod.range);

                bar = L.control.colorBar(scale, range, {
                    title: 'Predicted millet production (MT)',
                    units: 'Metric tons',
                    steps: 100,
                    decimals: 1,
                    width: 350,
                    height: 20,
                    position: 'bottomright',
                    background: '#000',
                    // textColor: 'white',
                    labels: [0, 0.5, 1.0, 1.5, 2.0],
                    labelFontSize: 9
                }).addTo(Aagwa_config.map);

                active = control.getOverlays();
                if (active.DarkMatter || active.WorldImagery) {
                    document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
                        el.style.color = 'white';
                    });

                }
            });

            var inputMin = document.getElementById("ex1_min");
            var inputMax = document.getElementById("ex1_max");


            // dynamic filtering 
            var min = document.getElementById('ex1_min');
            var max = document.getElementById('ex1_max');
            max.oninput = min.oninput = function () {
                // document.getElementById("ex1_min_label").innerHTML = inputMin.value;
                // document.getElementById("ex1_max_label").innerHTML = inputMax.value;
                let f = function (v) {
                    return v >= min.value && v <= max.value;
                };
                layer.setFilter(f);
            };


            Aagwa_config.map.fitBounds(layer.getBounds());

        });*/

    
    function overlays_func(arg_country) {
        console.log("arg_country overlays_func")
        console.log(arg_country)
        switch (arg_country) {
            case "Algeria":
                url_country = "data/Algeria/gadm36_DZA_0.json";
                url_region = "data/Algeria/gadm36_DZA_1.json";
                url_commune = "data/Algeria/gadm36_DZA_2.json";
                break;

            case "Angola":
                url_country = "data/Angola/gadm36_AGO_0.json";
                url_region = "data/Angola/gadm36_AGO_1.json";
                url_commune = "data/Angola/gadm36_AGO_2.json";
                break;

            case "Benin":
                url_country = "data/Benin/gadm36_BEN_0.json";
                url_region = "data/Benin/gadm36_BEN_1.json";
                url_commune = "data/Benin/gadm36_BEN_2.json";
                break;

            case "Botswana":
                url_country = "data/Botswana/gadm36_BWA_0.json";
                url_region = "data/Botswana/gadm36_BWA_1.json";
                url_commune = "data/Botswana/gadm36_BWA_2.json";
                break;

            case "Burkina Faso":
                url_country = "data/Burkina Faso/gadm36_BFA_0.json";
                url_region = "data/Burkina Faso/gadm36_BFA_1.json";
                url_commune = "data/Burkina Faso/gadm36_BFA_2.json";
                break;

            case "Burundi":
                url_country = "data/Burundi/gadm36_BDI_0.json";
                url_region = "data/Burundi/gadm36_BDI_1.json";
                url_commune = "data/Burundi/gadm36_BDI_2.json";
                break;

            case "Cameroon":
                url_country = "data/Cameroon/gadm36_CMR_0.json";
                url_region = "data/Cameroon/gadm36_CMR_1.json";
                url_commune = "data/Cameroon/gadm36_CMR_2.json";
                break;

            case "Central African Republic":
                url_country = "data/Central African Republic/gadm36_CAF_0.json";
                url_region = "data/Central African Republic/gadm36_CAF_1.json";
                url_commune = "data/Central African Republic/gadm36_CAF_2.json";
                break;

            case "Chad":
                url_country = "data/Chad/gadm36_TCD_0.json";
                url_region = "data/Chad/gadm36_TCD_1.json";
                url_commune = "data/Chad/gadm36_TCD_2.json";
                break;

            case "Congo Republic":
                url_country = "data/Congo Republic/gadm36_COG_0.json";
                url_region = "data/Congo Republic/gadm36_COG_1.json";
                url_commune = "data/Congo Republic/gadm36_COG_2.json";
                break;

            case "Côte d’Ivoire":
                url_country = "data/Côte d’Ivoire/gadm36_CIV_0.json";
                url_region = "data/Côte d’Ivoire/gadm36_CIV_1.json";
                url_commune = "data/Côte d’Ivoire/gadm36_CIV_2.json";
                break;

            case "DR Congo":
                url_country = "../data/DR Congo/gadm36_COD_0.json";
                url_region = "../data/DR Congo/gadm36_COD_1.json";
                url_commune = "../data/DR Congo/gadm36_COD_2.json";
                break;

            case "Egypt":
                url_country = "data/Egypt/gadm36_EGY_0.json";
                url_region = "data/Egypt/gadm36_EGY_1.json";
                url_commune = "data/Egypt/gadm36_EGY_2.json";
                break;

            case "Eritrea":
                url_country = "data/Eritrea/gadm36_ERI_0.json";
                url_region = "data/Eritrea/gadm36_ERI_1.json";
                url_commune = "data/Eritrea/gadm36_ERI_2.json";
                break;

            case "Eswatini":
                url_country = "data/Eswatini/gadm36_SWZ_0.json";
                url_region = "data/Eswatini/gadm36_SWZ_1.json";
                url_commune = "data/Eswatini/gadm36_SWZ_2.json";
                break;

            case "Ethiopia":
                url_country = "data/Ethiopia/gadm36_ETH_0.json";
                url_region = "data/Ethiopia/gadm36_ETH_1.json";
                url_commune = "data/Ethiopia/gadm36_ETH_2.json";
                break;

            case "Gabon":
                url_country = "data/Gabon/gadm36_GAB_0.json";
                url_region = "data/Gabon/gadm36_GAB_1.json";
                url_commune = "data/Gabon/gadm36_GAB_2.json";
                break;

            case "Gambia":
                url_country = "data/Gambia/gadm36_GMB_0.json";
                url_region = "data/Gambia/gadm36_GMB_1.json";
                url_commune = "data/Gambia/gadm36_GMB_2.json";
                break;

            case "Ghana":
                url_country = "data/Ghana/gadm36_GHA_0.json";
                url_region = "data/Ghana/gadm36_GHA_1.json";
                url_commune = "data/Ghana/gadm36_GHA_2.json";
                break;

            case "Guinea":
                url_country = "data/Guinea/gadm36_GIN_0.json";
                url_region = "data/Guinea/gadm36_GIN_1.json";
                url_commune = "data/Guinea/gadm36_GIN_2.json";
                break;

            case "Guinea-Bissau":
                url_country = "data/Guinea-Bissau/gadm36_GNB_0.json";
                url_region = "data/Guinea-Bissau/gadm36_GNB_1.json";
                url_commune = "data/Guinea-Bissau/gadm36_GNB_2.json";
                break;

            case "Kenya":
                url_country = "data/Kenya/gadm36_KEN_0.json";
                url_region = "data/Kenya/gadm36_KEN_1.json";
                url_commune = "data/Kenya/gadm36_KEN_2.json";
                break;

            case "Lesotho":
                url_country = "data/Lesotho/gadm36_LSO_0.json";
                url_region = "data/Lesotho/gadm36_LSO_1.json";
                // url_commune="data/Lesotho/gadm36_LSO_2.json";
                break;

            case "Liberia":
                url_country = "data/Liberia/gadm36_LBR_0.json";
                url_region = "data/Liberia/gadm36_LBR_1.json";
                url_commune = "data/Liberia/gadm36_LBR_2.json";
                break;

            case "Libya":
                url_country = "data/Libya/lby_admbnda_adm0.json";
                url_region = "data/Libya/lby_admbnda_adm1.json";
                url_commune = "data/Libya/lby_admbnda_adm2.json";
                break;

            case "Madagascar":
                url_country = "data/Madagascar/gadm36_MDG_0.json";
                url_region = "data/Madagascar/gadm36_MDG_1.json";
                url_commune = "data/Madagascar/gadm36_MDG_2.json";
                break;

            case "Malawi":
                url_country = "data/Malawi/gadm36_MWI_0.json";
                url_region = "data/Malawi/gadm36_MWI_1.json";
                url_commune = "data/Malawi/gadm36_MWI_2.json";
                break;

            case "Mali":
                url_country = "data/Mali/gadm36_MLI_0.json";
                url_region = "data/Mali/gadm36_MLI_1.json";
                url_commune = "data/Mali/gadm36_MLI_2.json";
                break;

            case "Mauritania":
                url_country = "data/Mauritania/gadm36_MRT_0.json";
                url_region = "data/Mauritania/gadm36_MRT_1.json";
                url_commune = "data/Mauritania/gadm36_MRT_2.json";
                break;

            case "Morocco":
                url_country = "data/Morocco/gadm36_MAR_0.json";
                url_region = "data/Morocco/gadm36_MAR_1.json";
                // url_commune="data/Morocco/gadm36_MAR_2.json";
                break;

            case "Mozambique":
                url_country = "data/Mozambique/gadm36_MOZ_0.json";
                url_region = "data/Mozambique/gadm36_MOZ_1.json";
                url_commune = "data/Mozambique/gadm36_MOZ_2.json";
                break;

            case "Namibia":
                url_country = "data/Namibia/gadm36_NAM_0.json";
                url_region = "data/Namibia/gadm36_NAM_1.json";
                url_commune = "data/Namibia/gadm36_NAM_2.json";
                break;

            case "Niger":
                url_country = "data/Niger/gadm36_NER_0.json";
                url_region = "data/Niger/gadm36_NER_1.json";
                url_commune = "data/Niger/gadm36_NER_2.json";
                break;

            case "Nigeria":
                url_country = "data/Nigeria/gadm36_NGA_0.json";
                url_region = "data/Nigeria/gadm36_NGA_1.json";
                url_commune = "data/Nigeria/gadm36_NGA_2.json";
                break;

            case "Rwanda":
                url_country = "data/Rwanda/gadm36_RWA_0.json";
                url_region = "data/Rwanda/gadm36_RWA_1.json";
                url_commune = "data/Rwanda/gadm36_RWA_2.json";
                break;

            case "Senegal":
                url_country = "data/Senegal/gadm36_SEN_0.json";
                url_region = "data/Senegal/gadm36_SEN_1.json";
                url_commune = "data/Senegal/gadm36_SEN_2.json";
                break;

            case "Sierra Leone":
                url_country = "data/Sierra Leone/gadm36_SLE_0.json";
                url_region = "data/Sierra Leone/gadm36_SLE_1.json";
                url_commune = "data/Sierra Leone/gadm36_SLE_2.json";
                break;

            case "Somalia":
                url_country = "data/Somalia/gadm36_SOM_0.json";
                url_region = "data/Somalia/gadm36_SOM_1.json";
                url_commune = "data/Somalia/gadm36_SOM_2.json";
                break;

            case "South Africa":
                url_country = "data/South Africa/gadm36_ZAF_0.json";
                url_region = "data/South Africa/gadm36_ZAF_1.json";
                url_commune = "data/South Africa/gadm36_ZAF_2.json";
                break;

            case "South Sudan":
                url_country = "data/South Sudan/gadm36_SSD_0.json";
                url_region = "data/South Sudan/gadm36_SSD_1.json";
                url_commune = "data/South Sudan/gadm36_SSD_2.json";
                break;

            case "Sudan":
                url_country = "data/Sudan/gadm36_SDN_0.json";
                url_region = "data/Sudan/gadm36_SDN_1.json";
                url_commune = "data/Sudan/gadm36_SDN_2.json";
                break;

            case "Tanzania":
                url_country = "data/Tanzania/gadm36_TZA_0.json";
                url_region = "data/Tanzania/gadm36_TZA_1.json";
                url_commune = "data/Tanzania/gadm36_TZA_2.json";
                break;

            case "Togo":
                url_country = "data/Togo/gadm36_TGO_0.json";
                url_region = "data/Togo/gadm36_TGO_1.json";
                url_commune = "data/Togo/gadm36_TGO_2.json";
                break;

            case "Tunisia":
                url_country = "data/Tunisia/gadm36_TUN_0.json";
                url_region = "data/Tunisia/gadm36_TUN_1.json";
                url_commune = "data/Tunisia/gadm36_TUN_2.json";
                break;

            case "Uganda":
                url_country = "data/Uganda/gadm36_UGA_0.json";
                url_region = "data/Uganda/gadm36_UGA_1.json";
                url_commune = "data/Uganda/gadm36_UGA_2.json";
                break;

            case "Zambia":
                url_country = "data/Zambia/gadm36_ZMB_0.json";
                url_region = "data/Zambia/gadm36_ZMB_1.json";
                url_commune = "data/Zambia/gadm36_ZMB_2.json";
                break;

            case "Zimbabwe":
                url_country = "data/Zimbabwe/gadm36_ZWE_0.json";
                url_region = "data/Zimbabwe/gadm36_ZWE_1.json";
                url_commune = "data/Zimbabwe/gadm36_ZWE_2.json";
                break;

        }

        var overlays;
        url_country = `${General_config.data_url_aagwa}/${url_country}`;
        url_region = `${General_config.data_url_aagwa}/${url_region}`;
        url_commune = `${General_config.data_url_aagwa}/${url_commune}`;

        
        console.log("url_commune")
        console.log(url_commune)
        $.getJSON(url_commune, function (dataComm) {
            console.log("dataComm")
            console.log(dataComm)
            $.getJSON(url_region, function (dataReg) {
                $.getJSON(url_country, function (dataCountry) {

                    region = L.geoJson(dataReg, {onEachFeature: forEachFeatureRegion});
                    commune = L.geoJson(dataComm, {onEachFeature: forEachFeatureCommune});
                    country = L.geoJson(dataCountry, {onEachFeature: forEachFeatureCountry});

                    function forEachFeatureCountry(feature, layer) {
                        // var popupContent = "<p><b>Region: </b>"+ feature.properties.ADM1_FR + "</p>";
                        // layer.bindPopup(popupContent);
                    }

                    function forEachFeatureRegion(feature, layer) {
                        var popupContent = "<p>Admin Level 1: <b>" + feature.properties.NAME_1 + "</b></p>";
                        layer.bindPopup(popupContent);
                    }

                    function forEachFeatureCommune(feature, layer) {
                        var popupContent = "<p>Admin Level 1: <b>" + feature.properties.NAME_1 + "</b>" +
                            "</br>Admin Level 2: <b>" + feature.properties.NAME_2 + "</b></p>";
                        layer.bindPopup(popupContent);
                    }


                    overlays = {
                        "Admin level 0": country,
                        "Admin level 1": region,
                        "Admin level 2": commune
                    };


// Add method to layer control class
                    L.Control.Layers.include({
                        getOverlays: function () {
                            // hash to hold all layers
                            var control, layers;
                            layers = {};
                            control = this;
                            // loop thru all layers in control
                            control._layers.forEach(function (obj) {
                                var layerName;
                                // get name of layer
                                layerName = obj.name;
                                // store whether it's present on the map or not
                                return layers[layerName] = control._map.hasLayer(obj.layer);
                            });
                            return layers;
                        }
                    });

                    if (arg_country == "Central" || arg_country == "East" || arg_country == "North" || arg_country == "Southern" || arg_country == "West") {
                        control = L.control.layers(baseMaps).addTo(map);
                        map.removeLayer(country);

                    } else {
                        control = L.control.layers(baseMaps, overlays).addTo(map);
                        map.addLayer(country);
                    }

                });
            });
        });

    }

    function update_dataset_links() {
        var arg_country = document.getElementById("form_country").value.trim();
        var arg_product = document.getElementById("form_product").value.trim();
        var arg_crop = document.getElementById("form_crop").value.trim();
        if (document.getElementById("form_year").value.trim() == "2021 predictions") {
            arg_year = "2021_curr_predict";
            year_title = "2021";
        } else if (document.getElementById("form_year").value.trim() == "2020 predictions") {
            arg_year = "2020_past_predict";
            year_title = "2020";
        } else if (document.getElementById("form_year").value.trim() == "2022 predictions") {
            arg_year = "2022_predict";
            year_title = "2022";
        } else if (document.getElementById("form_year").value.trim() == "2023 predictions") {
            arg_year = "2023_predict";
            year_title = "2023";
        }
        // csv_format_link="data/"+arg_country+"/"+arg_crop+"/"+arg_product+"/2020"+"/"+arg_crop+"_pred_2020_xyz_level_2.csv";
        // document.getElementById("csv_src").href="data/"+arg_country+"/"+arg_crop+"/"+arg_product+"/"+arg_year+"/"+arg_country+"_"+arg_crop+"_pred_2020_xyz_level_2.csv";
        document.getElementById("geottif_src").href = "data/" + arg_country + "/" + arg_crop + "/" + arg_product + "/" + arg_year + "/" + arg_country + "_Predicted_" + arg_crop + "_" + arg_product + "_" + year_title + ".tif";
        document.getElementById("pal_src").href = "data/" + arg_country + "/arable_land.tiff";
        var pays = ["Algeria", "Angola", "Benin", "Botswana", "Gabon", "Congo Republic", "DR Congo", "Chad", "Cameroon", "Central African Republic", "Egypt", "Ethiopia", "Ghana", "Guinea", "Kenya", "Liberia", "Libya", "Malawi", "Morocco",
            "Namibia", "Rwanda", "Zambia", "South Africa"];
        if (!pays.includes(arg_country)) {
            document.getElementById("pal_tif").style.display = "none";
            document.getElementById("pal").style.display = "none";
        } else {
            document.getElementById("pal_tif").style.display = "flex";
            document.getElementById("pal").style.display = "block";
        }

        document.getElementById("print_map_title").textContent = "Predicted " + arg_crop + " " + arg_product + " " + year_title + " - " + arg_country;
        // document.getElementById("download_csv_title").textContent="Predicted "+arg_crop+" "+arg_product+" 2020 - "+arg_country ;
        document.getElementById("download_geottif_title").textContent = "Predicted " + arg_crop + " " + arg_product + " " + year_title + " - " + arg_country;
        document.getElementById("download_pal_title").textContent = "Potential Agricultural Land: " + arg_country;

        document.getElementById("citation_print_map").value = "AKADEMIYA2063, " + "Spatially Disaggregated " + arg_crop + " " + arg_product + " Forecast of " + arg_country + " for "
            + year_title + " - https://aagwa.org";
        // document.getElementById("citation_csv").textContent="Predicted "+arg_crop+" "+arg_product+" 2020 - "+arg_country ;
        document.getElementById("citation_geottif").value = "AKADEMIYA2063, " + "Spatially Disaggregated " + arg_crop + " " + arg_product + " Forecast of " + arg_country + " for "
            + year_title + " - https://aagwa.org";
        document.getElementById("citation_pal").value = "AKADEMIYA2063, " + "Potential Agricultural Land: " + arg_country + " - https://aagwa.org";

    }

    function trigger_launchMap() {
        arg_country = document.getElementById("form_country").value.trim();
        arg_product = document.getElementById("form_product").value.trim();
        arg_crop = document.getElementById("form_crop").value.trim();
        if (arg_country != "Central" && arg_country != "East" && arg_country != "North" && arg_country != "Southern" && arg_country != "West") {
            $("#select_country_opt").val(arg_country);
            document.querySelector('#select_country_opt').dispatchEvent(new Event('change'));
        }

        if (document.getElementById("form_year").value.trim() == "2021 predictions") {
            arg_year = "2021_curr_predict";
        } else if (document.getElementById("form_year").value.trim() == "2020 predictions") {
            arg_year = "2020_past_predict";
        } else if (document.getElementById("form_year").value.trim() == "2022 predictions") {
            arg_year = "2022_predict";
        } else if (document.getElementById("form_year").value.trim() == "2023 predictions") {
            arg_year = "2023_predict";
        }
        // alert('Country:'+arg_country+'Product:'+arg_product+'Crop:'+arg_crop);
        launchMap(arg_country, arg_product, arg_crop, arg_year);
    }


    // window.onload=launchMap();
    function launchMap(arg_country, arg_product, arg_crop, arg_year) {
        update_dataset_links();
        map.removeLayer(layer);
        map.removeLayer(baseMaps.DarkMatter);
        map.removeLayer(baseMaps.NatGeoWorldMap);
        map.removeLayer(baseMaps.WorldStreetMap);
        map.removeLayer(baseMaps.WorldImagery);
        map.removeLayer(noBasemap);
        baseMaps.BaseLayer.addTo(map);
        map.removeLayer(country);
        map.removeLayer(region);
        map.removeLayer(commune);
        map.removeControl(control);
        map.removeControl(zoomHome);
        bar1.remove();
        if (bar != '') {
            bar.remove(map);
        }


        var y = arg_year.substring(0, 4);
        d3.request("data/" + arg_country + "/" + arg_crop + "/" + arg_product + "/" + arg_year + "/" + arg_country + "_Predicted_" + arg_crop + "_" + arg_product + "_" + y + ".tif?v=<?php echo microtime(); ?>").responseType('arraybuffer').get(
            function (error, tiffData) {
                // console.log(tiffData);
                //Add product layer to map
                let prod = L.ScalarField.fromGeoTIFF(tiffData.response);

                // console.log(prod.range[1]);
                var minim = Math.floor(prod.range[0]);
                var maxim = Math.ceil(prod.range[1]);
                document.getElementById("ex1_min").min = minim;
                document.getElementById("ex1_min").max = maxim;
                document.getElementById("ex1_max").min = minim;
                document.getElementById("ex1_max").max = maxim;
                document.getElementById("ex1_min").setAttribute('value', minim);
                document.getElementById("ex1_max").setAttribute('value', maxim);

                const min_el = document.getElementById("ex1_min");
                const max_el = document.getElementById("ex1_max");
                rangeV_min = document.getElementById("rangeV_min");
                rangeV_max = document.getElementById("rangeV_max");
                setValue_min = () => {
                    const newValue = Number(
                            ((min_el.value - min_el.min) * 100) / (min_el.max - min_el.min)
                        ),
                        newPosition = 10 - newValue * 0.5;
                    rangeV_min.innerHTML = `<span>${min_el.value}</span>`;
                    rangeV_min.style.left = `calc(${newValue}% + (${newPosition}px))`;
                };
                setValue_max = () => {
                    const newValue = Number(
                            ((max_el.value - max_el.min) * 100) / (max_el.max - max_el.min)
                        ),
                        newPosition = 10 - newValue * 0.5;
                    rangeV_max.innerHTML = `<span>${max_el.value}</span>`;
                    rangeV_max.style.left = `calc(${newValue}% + (${newPosition}px))`;
                };
                setValue_min();
                setValue_max();
                min_el.addEventListener("input", setValue_min);
                max_el.addEventListener("input", setValue_max);


                layer = L.canvasLayer.scalarField(prod,
                    {
                        color: chroma.scale('spectral').domain(prod.range),
                        inFilter: (v) => v !== 0
                    }).addTo(map);

                // Map Home button
                zoomHome = L.Control.zoomHome();
                zoomHome.setHomeCoordinates(layer.getBounds().getCenter());
                zoomHome.setHomeZoom(6);
                zoomHome.addTo(map);


                //Change colorBar color when basemap changes - And add Level0 layer when no basemap selected
                map.on('baselayerchange', onbaselayerchange);

                function onbaselayerchange(e) {
                    if (e.name == "DarkMatter" || e.name == "WorldImagery") {
                        document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
                            el.style.color = 'white';
                        });
                        document.getElementById("ex1_min").style.background = '#f4f4f4';
                        document.getElementById("ex1_max").style.background = '#f4f4f4';
                    } else if (e.name == "No Basemap") {
                        document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
                            el.style.color = 'black';
                            map.addLayer(country);
                        });
                        document.getElementById("ex1_min").style.background = 'rgb(253 253 253)';
                        document.getElementById("ex1_max").style.background = 'rgb(253 253 253)';
                    } else {
                        document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
                            el.style.color = 'black';
                        });
                        document.getElementById("ex1_min").style.background = 'rgb(253 253 253)';
                        document.getElementById("ex1_max").style.background = 'rgb(253 253 253)';
                    }
                }

                // create the sidebar instance and add it to the map
                var sidebar = L.control.sidebar({container: 'sidebar'})
                    .addTo(map)
                    .open('ag_production');

                //Legend
                var range = prod.range;
                var scale = chroma.scale('spectral').domain(range);
                var title_bar = (arg_product == "Production") ? 'Predicted ' + arg_crop + ' production (Metric tons)' : 'Predicted ' + arg_crop + ' yield (MT/ha)';
                var unit_bar = (arg_product == "Production") ? 'MT' : 'MT/ha';

                bar1 = L.control.colorBar(scale, range, {
                    title: title_bar,
                    units: unit_bar,
                    steps: 100,
                    decimals: 1,
                    width: 350,
                    height: 20,
                    position: 'bottomright',
                    background: '#000',
                    // textColor: 'white',
                    labels: [0, 0.5, 1.0, 1.5, 2.0],
                    labelFontSize: 9
                }).addTo(map);


                layer.on('click', function (e) {
                    if (e.value !== null) {
                        let v = e.value.toFixed(2);
                        if (arg_product == "Production") {
                            var html = (`<span class="popupText">Predicted ` + arg_crop + ` production: ${v} Metric tons` + `</span>`);
                        } else if (arg_product == "Yield") {
                            var html = (`<span class="popupText">Predicted ` + arg_crop + ` yield: ${v} MT/ha` + `</span>`);
                        }
                        let popup = L.popup()
                            .setLatLng(e.latlng)
                            .setContent(html)
                            .openOn(map);
                    }
                });

                //Triggered default click
                // L.popup().setLatLng({lat: 14.360191158370366, lng: -15.373134613037111}).setContent(
                //   '<span class="popupText">Predicted millet production: 419.21 Tons</span>').openOn(map);


                bar = '';

                var colorscaleSelect = document.getElementById("ex1_colorscaleselect");
                colorscaleSelect.addEventListener('change', function () {
                    console.log("toto")
                    var scale = chroma.scale(this.value).domain(prod.range);
                    layer.setColor(scale);


                    //Legend
                    bar1.remove(map);
                    if (bar != '') {
                        bar.remove(map);
                    }
                    var range = prod.range;
                    var scale = chroma.scale(this.value).domain(prod.range);

                    bar = L.control.colorBar(scale, range, {
                        title: title_bar,
                        units: unit_bar,
                        steps: 100,
                        decimals: 1,
                        width: 350,
                        height: 20,
                        position: 'bottomright',
                        background: '#000',
                        // textColor: 'white',
                        labels: [0, 0.5, 1.0, 1.5, 2.0],
                        labelFontSize: 9
                    }).addTo(map);

                    active = control.getOverlays();
                    if (active.DarkMatter || active.WorldImagery) {
                        document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
                            el.style.color = 'white';
                        });

                    }
                });

                var inputMin = document.getElementById("ex1_min");
                var inputMax = document.getElementById("ex1_max");


                /* dynamic filtering */
                var min = document.getElementById('ex1_min');
                var max = document.getElementById('ex1_max');
                max.oninput = min.oninput = function () {
                    // document.getElementById("ex1_min_label").innerHTML = inputMin.value;
                    // document.getElementById("ex1_max_label").innerHTML = inputMax.value;
                    let f = function (v) {
                        return v >= min.value && v <= max.value;
                    };
                    layer.setFilter(f);
                };


                map.fitBounds(layer.getBounds());


            });
        overlays_func(arg_country);

    }


    const country_code = document.getElementById("country-name").value;
    const param_country = get_para_country(country_code);
    //commented 18 March 2025
    /*if( param_country && typeof(param_country) === "object" ){
        await Aagwa_config.get_country_geojson();
        Aagwa_config.launchInput();
        Aagwa_config.launchInput_with_rainfall();
        
        // launchInput(country_code, param_country.level,General_config.data_url+"/"+param_country.geojsonfile);
        // launchInput_with_rainfall(country_code, param_country.level,General_config.data_url+"/"+param_country.geojsonfile);
    }*/

    /*var loc_min_ndvi = {};
    var loc_max_ndvi = {};
    var loc_mean_ndvi = {};
    var loc_current_ndvi = {};
    var loc_ndvi_2020= {};
    var loc_ndvi_2022= {};
    var loc_ndvi_2023= {};
    var loc_ndvi_2024= {};
    var loc_min_lst = {};
    var loc_max_lst = {};
    var loc_mean_lst = {};
    var loc_current_lst = {};
    var loc_lst_2020 = {};
    var loc_lst_2022 = {}
    var loc_lst_2023 = {}
    var loc_lst_2024 = {}
    var loc_min_rainfall = {};
    var loc_max_rainfall = {};
    var loc_mean_rainfall = {};
    var loc_current_rainfall = {};
    var loc_rainfall_2020 = {};
    var loc_rainfall_2022 = {};
    var loc_rainfall_2023 = {};
    var loc_rainfall_2024 = {};
    var ndviMap;
    var ndviChart;
    var lstMap;
    var lstChart;
    var rainfallMap;
    var rainfallChart;*/


    function get_para_country(country_code){
        let param = false;
        switch(country_code)
        {
            case "Senegal":param = {
                            "geojsonfile" :"data/Senegal/gadm36_SEN_2_raw.json",
                            "level" : 2
                        };break;
            case "Benin":param = {
                            "geojsonfile" :"data/Benin/gadm36_BEN_2_raw.json",
                            "level" : 2
                        };break;
            case "Ghana":param = {
                            "geojsonfile" :"data/Ghana/gadm36_GHA_2_raw.json",
                            "level" : 2
                        };break;
            case "Malawi":param = {
                            "geojsonfile" :"data/Malawi/gadm36_MWI_2_raw.json",
                            "level" : 2
                        };break;
            case "Uganda":param = {
                            "geojsonfile" :"data/Uganda/gadm36_UGA_2_raw.json",
                            "level" : 2
                        };break;
        }
        return param;
    }


    function launchInput (pays, level, geojsonfile){
        document.getElementById("container_rainfall").style.display="none";
        document.getElementById("container_rainfall_chart").style.display="none";
        const pre_url = General_config.data_url
        $.ajax({
            url: pre_url+"/"+'data/'+pays+'/Growing conditions/Min_ndvi.csv?v=<?php echo microtime(); ?>',
            success: function (min_ndvi_csv) {

                $.ajax({
                    url:  pre_url+"/"+'data/'+pays+'/Growing conditions/Max_ndvi.csv?v=<?php echo microtime(); ?>',
                    success: function (max_ndvi_csv) {

                        $.ajax({
                            url:  pre_url+"/"+'data/'+pays+'/Growing conditions/Mean_ndvi.csv?v=<?php echo microtime(); ?>',
                            success: function (mean_ndvi_csv) {

                                $.ajax({
                                    url:  pre_url+"/"+'data/'+pays+'/Growing conditions/2021_ndvi.csv?v=<?php echo microtime(); ?>',
                                    success: function (current_ndvi_csv) {

                                        $.ajax({
                                            url:  pre_url+"/"+'data/'+pays+'/Growing conditions/Min_lst.csv?v=<?php echo microtime(); ?>',
                                            success: function (min_lst_csv) {

                                                $.ajax({
                                                    url:  pre_url+"/"+'data/'+pays+'/Growing conditions/Max_lst.csv?v=<?php echo microtime(); ?>',
                                                    success: function (max_lst_csv) {

                                                        $.ajax({
                                                            url:  pre_url+"/"+'data/'+pays+'/Growing conditions/Mean_lst.csv?v=<?php echo microtime(); ?>',
                                                            success: function (mean_lst_csv) {

                                                                $.ajax({
                                                                    url:  pre_url+"/"+'data/'+pays+'/Growing conditions/2021_lst.csv?v=<?php echo microtime(); ?>',
                                                                    success: function (current_lst_csv) {

                                                                        $.ajax({
                                                                            url:  pre_url+"/"+'data/'+pays+'/Growing conditions/2020_ndvi.csv?v=<?php echo microtime(); ?>',
                                                                            success: function (ndvi_2020_csv) {

                                                                                $.ajax({
                                                                                    url:  pre_url+"/"+'data/'+pays+'/Growing conditions/2020_lst.csv?v=<?php echo microtime(); ?>',
                                                                                    success: function (lst_2020_csv) {

                                                                                        $.ajax({
                                                                                            url:  pre_url+"/"+'data/'+pays+'/Growing conditions/2022_ndvi.csv?v=<?php echo microtime(); ?>',
                                                                                            success: function (ndvi_2022_csv) {

                                                                                                $.ajax({
                                                                                                    url:  pre_url+"/"+'data/'+pays+'/Growing conditions/2022_lst.csv?v=<?php echo microtime(); ?>',
                                                                                                    success: function (lst_2022_csv) {

                                                                                                        $.ajax({
                                                                                                            url:  pre_url+"/"+'data/'+pays+'/Growing conditions/2023_ndvi.csv?v=<?php echo microtime(); ?>',
                                                                                                            success: function (ndvi_2023_csv) {

                                                                                                                $.ajax({
                                                                                                                    url:  pre_url+"/"+'data/'+pays+'/Growing conditions/2023_lst.csv?v=<?php echo microtime(); ?>',
                                                                                                                    success: function (lst_2023_csv) {

                                                                                                                        $.ajax({
                                                                                                                        url: pre_url+'/data/'+pays+'/Growing conditions/2024_ndvi.csv?v=<?php echo microtime(); ?>',
                                                                                                                      success: function (ndvi_2024_csv) {

                                                                                                                        $.ajax({
                                                                                                                        url: pre_url+'/data/'+pays+'/Growing conditions/2024_lst.csv?v=<?php echo microtime(); ?>',
                                                                                                                        success: function (lst_2024_csv) {



                                                                                                                        function CSVtoArray(text) {
                                                                                                                            return text.replace(/^"/, '')
                                                                                                                                .replace(/",$/, '')
                                                                                                                                .split('","');
                                                                                                                        }

                                                                                                                        min_ndvi_csv = min_ndvi_csv.split(/\n/);
                                                                                                                        max_ndvi_csv = max_ndvi_csv.split(/\n/);
                                                                                                                        mean_ndvi_csv = mean_ndvi_csv.split(/\n/);
                                                                                                                        current_ndvi_csv = current_ndvi_csv.split(/\n/);
                                                                                                                        ndvi_2020_csv = ndvi_2020_csv.split(/\n/);
                                                                                                                        ndvi_2022_csv = ndvi_2022_csv.split(/\n/);
                                                                                                                        ndvi_2023_csv = ndvi_2023_csv.split(/\n/);
                                                                                                                        ndvi_2024_csv = ndvi_2024_csv.split(/\n/);

                                                                                                                        min_lst_csv = min_lst_csv.split(/\n/);
                                                                                                                        max_lst_csv = max_lst_csv.split(/\n/);
                                                                                                                        mean_lst_csv = mean_lst_csv.split(/\n/);
                                                                                                                        current_lst_csv = current_lst_csv.split(/\n/);
                                                                                                                        lst_2020_csv = lst_2020_csv.split(/\n/);
                                                                                                                        lst_2022_csv = lst_2022_csv.split(/\n/);
                                                                                                                        lst_2023_csv = lst_2023_csv.split(/\n/);
                                                                                                                        lst_2024_csv = lst_2024_csv.split(/\n/);



                                                                                                                        numRegex = /^[0-9\.]+$/,
                                                                                                                            lastCommaRegex = /,\s$/,
                                                                                                                            quoteRegex = /\"/g,
                                                                                                                            categories = CSVtoArray(min_ndvi_csv[0]).slice(level+1);



                                                                                                                        //Min_ndvi
                                                                                                                        $.each(min_ndvi_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;
                                                                                                                            });

                                                                                                                            loc_min_ndvi[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });

                                                                                                                        //Max_ndvi
                                                                                                                        $.each(max_ndvi_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_max_ndvi[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });

                                                                                                                        //Mean_ndvi
                                                                                                                        $.each(mean_ndvi_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_mean_ndvi[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });


                                                                                                                        //Current NDVI - 2021
                                                                                                                        $.each(current_ndvi_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_current_ndvi[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });

                                                                                                                        //Previous year NDVI - 2020
                                                                                                                        $.each(ndvi_2020_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_ndvi_2020[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });


                                                                                                                        // NDVI - 2022
                                                                                                                        $.each(ndvi_2022_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_ndvi_2022[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });


                                                                                                                        // NDVI - 2023
                                                                                                                        $.each(ndvi_2023_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_ndvi_2023[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });

                                                                                                                        // NDVI - 2024
                                                                                                                         $.each(ndvi_2024_csv.slice(1), function (j, line) {
                                                                                                                             var row = CSVtoArray(line),
                                                                                                                                 data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                 val = val.replace(quoteRegex, '');
                                                                                                                                 val = parseFloat(val, 10);

                                                                                                                                 data[i] = val;

                                                                                                                             });
                                                                                                                             loc_ndvi_2024[row[level]] = {
                                                                                                                                 location_name: row[level],
                                                                                                                                 join_el:row[level+1],
                                                                                                                                 data: data,
                                                                                                                             };
                                                                                                                         });


                                                                                                                        //Min_lst
                                                                                                                        $.each(min_lst_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;
                                                                                                                            });

                                                                                                                            loc_min_lst[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });

                                                                                                                        //Max_lst
                                                                                                                        $.each(max_lst_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_max_lst[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });

                                                                                                                        //Mean_lst
                                                                                                                        $.each(mean_lst_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_mean_lst[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });


                                                                                                                        //Current LST - 2021
                                                                                                                        $.each(current_lst_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_current_lst[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });

                                                                                                                        //Previous year LST - 2020
                                                                                                                        $.each(lst_2020_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_lst_2020[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });

                                                                                                                        //LST - 2022
                                                                                                                        $.each(lst_2022_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_lst_2022[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });

                                                                                                                        //LST - 2023
                                                                                                                        $.each(lst_2023_csv.slice(1), function (j, line) {
                                                                                                                            var row = CSVtoArray(line),
                                                                                                                                data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                val = val.replace(quoteRegex, '');
                                                                                                                                val = parseFloat(val, 10);

                                                                                                                                data[i] = val;

                                                                                                                            });
                                                                                                                            loc_lst_2023[row[level]] = {
                                                                                                                                location_name: row[level],
                                                                                                                                join_el:row[level+1],
                                                                                                                                data: data,
                                                                                                                            };
                                                                                                                        });

                                                                                                                        //LST - 2024

                                                                                                                         $.each(lst_2024_csv.slice(1), function (j, line) {
                                                                                                                             var row = CSVtoArray(line),
                                                                                                                                 data = row.slice(level+2);

                                                                                                                            $.each(data, function (i, val) {
                                                                                                                                 val = val.replace(quoteRegex, '');
                                                                                                                                 val = parseFloat(val, 10);

                                                                                                                                 data[i] = val;

                                                                                                                             });
                                                                                                                             loc_lst_2024[row[level]] = {
                                                                                                                                 location_name: row[level],
                                                                                                                                 join_el:row[level+1],
                                                                                                                                 data: data,
                                                                                                                             };
                                                                                                                         });


                                                                                                                        // For each location, use the latest value for current map - NDVI
                                                                                                                        var latest_data_ndvi = [];
                                                                                                                        for (var e in loc_ndvi_2024) {
                                                                                                                            if (loc_ndvi_2024.hasOwnProperty(e)) {
                                                                                                                                var value = null,
                                                                                                                                    itemData = loc_ndvi_2024[e].data,
                                                                                                                                    i = itemData.length;

                                                                                                                                while (i--) {

                                                                                                                                    if (typeof itemData[i] === 'number') {
                                                                                                                                        value = itemData[i];
                                                                                                                                        break;
                                                                                                                                    }
                                                                                                                                }
                                                                                                                                latest_data_ndvi.push({
                                                                                                                                    location_name: loc_ndvi_2024[e].location_name,
                                                                                                                                    join_el: loc_ndvi_2024[e].join_el,
                                                                                                                                    value: value,
                                                                                                                                });
                                                                                                                            }
                                                                                                                        }
                                                                                                                        // For each location, use the latest value for current map - LST
                                                                                                                        var latest_data_lst = [];
                                                                                                                        for (var e in loc_lst_2024) {
                                                                                                                            if (loc_lst_2024.hasOwnProperty(e)) {
                                                                                                                                var value = null,
                                                                                                                                    itemData = loc_lst_2024[e].data,
                                                                                                                                    i = itemData.length;

                                                                                                                                while (i--) {

                                                                                                                                    if (typeof itemData[i] === 'number') {
                                                                                                                                        value = itemData[i];
                                                                                                                                        break;
                                                                                                                                    }
                                                                                                                                }
                                                                                                                                latest_data_lst.push({
                                                                                                                                    location_name: loc_lst_2024[e].location_name,
                                                                                                                                    join_el: loc_lst_2022[e].join_el,
                                                                                                                                    value: value,
                                                                                                                                });
                                                                                                                            }
                                                                                                                        }

                                                                                                                        // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
                                                                                                                        var mapData = (function() {
                                                                                                                            var mapData = null;
                                                                                                                            $.ajax({
                                                                                                                                'async': false,
                                                                                                                                'global': false,
                                                                                                                                'url': geojsonfile,
                                                                                                                                'dataType': "json",
                                                                                                                                'success': function (data) {
                                                                                                                                    mapData = data;
                                                                                                                                }
                                                                                                                            });
                                                                                                                            return mapData;
                                                                                                                        })();

                                                                                                                        //Check
                                                                                                                        var country_ndvi_lst_exist_up_to_dec_21 = ["Ethiopia", "Kenya", "Madagascar", "Malawi", "Mozambique", "Rwanda", "Somalia", "South Sudan", "Tanzania", "Uganda", "Zambia", "Zimbabwe"];
                                                                                                                        /*if(country_ndvi_lst_exist_up_to_dec_21.includes(pays))
    {
      subtitle_ndvi_map="Map of August 2021";
      subtitle_lst_map="Map of August 2021";
      pointFormat_ndvi="<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>August NDVI:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>";
      pointFormat_lst="<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>August LST:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>";
    }
    else{
      subtitle_ndvi_map="Map of May 2022";
      subtitle_lst_map="Map of May 2022";
      pointFormat_ndvi="<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>December NDVI:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>";
      pointFormat_lst="<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>December LST:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>";
    }*/
                                                                                                                        if(pays=="Morocco")
                                                                                                                        {
                                                                                                                            subtitle_ndvi_map="Map of February 2023";
                                                                                                                            subtitle_lst_map="Map of February 2023";
                                                                                                                            pointFormat_ndvi="<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>February 2023 NDVI:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>";
                                                                                                                            pointFormat_lst="<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>February 2023 LST:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>";

                                                                                                                        }
                                                                                                                        else {
                                                                                                                            subtitle_ndvi_map="Map of February 2024";
                                                                                                                            subtitle_lst_map="Map of February 2024";
                                                                                                                            pointFormat_ndvi="<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>April 2024 NDVI:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>";
                                                                                                                            pointFormat_lst="<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>April 2024 LST:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>";

                                                                                                                        }


                                                                                                                        // Initiate the NDVI map
                                                                                                                        ndviMap = Highcharts.mapChart('container_ndvi', {
                                                                                                                            chart: {
                                                                                                                                // height: 300,
                                                                                                                                // margin: 10,
                                                                                                                                // height: 700,
                                                                                                                                map: mapData
                                                                                                                            },
                                                                                                                            boost: {
                                                                                                                                useGPUTranslations: true,
                                                                                                                                seriesThreshold: 5
                                                                                                                            },
                                                                                                                            title: {
                                                                                                                                text: 'Normalized Difference Vegetation Index (NDVI)'
                                                                                                                            },
                                                                                                                            subtitle: {
                                                                                                                                text: subtitle_ndvi_map
                                                                                                                            },
                                                                                                                            mapNavigation: {
                                                                                                                                enabled: true,
                                                                                                                                buttonOptions: {
                                                                                                                                    verticalAlign: 'bottom'
                                                                                                                                }
                                                                                                                            },
                                                                                                                            credits: {
                                                                                                                                enabled: false
                                                                                                                            },
                                                                                                                            colorAxis: {
                                                                                                                                endOnTick: false,
                                                                                                                                startOnTick: false,
                                                                                                                                minColor: '#422112',
                                                                                                                                maxColor: '#005200',
                                                                                                                                stops: [
                                                                                                                                    [0.04, '#422112'],
                                                                                                                                    [0.15, '#9f512a'],
                                                                                                                                    [0.24, '#cda915'],
                                                                                                                                    [0.29, '#fefe00'],
                                                                                                                                    [0.34, '#e4ee02'],
                                                                                                                                    [0.39, '#d0df00'],
                                                                                                                                    [0.44, '#b9cf00'],
                                                                                                                                    [0.49, '#a2c000'],
                                                                                                                                    [0.54, '#8bb000'],
                                                                                                                                    [0.59, '#739f00'],
                                                                                                                                    [0.64, '#5a8e05'],
                                                                                                                                    [0.69, '#458000'],
                                                                                                                                    [0.74, '#2d7000'],
                                                                                                                                    [0.79, '#176100'],
                                                                                                                                    [1, '#005200']
                                                                                                                                ]
                                                                                                                            },
                                                                                                                            tooltip: {
                                                                                                                                useHTML :true,
                                                                                                                                headerFormat: ' ',
                                                                                                                                pointFormat: pointFormat_ndvi,
                                                                                                                            },
                                                                                                                            series: [{
                                                                                                                                data: latest_data_ndvi,
                                                                                                                                joinBy: ['GID_'+level, 'join_el'],
                                                                                                                                keys: ['location_name','join_el'],
                                                                                                                                allowPointSelect: true,
                                                                                                                                cursor: 'pointer',
                                                                                                                                states: {
                                                                                                                                    hover: {
                                                                                                                                        enabled: false
                                                                                                                                    },
                                                                                                                                    select: {
                                                                                                                                        color: '#7cb5ec',
                                                                                                                                        borderColor: 'black',
                                                                                                                                        dashStyle: 'shortdot'
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }]
                                                                                                                        });

                                                                                                                        // Initiate the LST map
                                                                                                                        lstMap = Highcharts.mapChart('container_lst', {
                                                                                                                            chart: {
                                                                                                                                // height: 300,
                                                                                                                                map: mapData
                                                                                                                            },
                                                                                                                            boost: {
                                                                                                                                useGPUTranslations: true,
                                                                                                                                seriesThreshold: 5
                                                                                                                            },
                                                                                                                            title: {
                                                                                                                                text: 'Land Surface Temperature (LST)'
                                                                                                                            },
                                                                                                                            subtitle: {
                                                                                                                                text: subtitle_lst_map
                                                                                                                            },
                                                                                                                            mapNavigation: {
                                                                                                                                enabled: true,
                                                                                                                                buttonOptions: {
                                                                                                                                    verticalAlign: 'bottom'
                                                                                                                                }
                                                                                                                            },
                                                                                                                            credits: {
                                                                                                                                enabled: false
                                                                                                                            },
                                                                                                                            colorAxis: {
                                                                                                                                endOnTick: false,
                                                                                                                                startOnTick: false,
                                                                                                                                minColor: '#ffffb2',
                                                                                                                                maxColor: '#bd0026',
                                                                                                                            },
                                                                                                                            tooltip: {
                                                                                                                                useHTML :true,
                                                                                                                                headerFormat: ' ',
                                                                                                                                pointFormat: pointFormat_lst,
                                                                                                                            },
                                                                                                                            series: [{
                                                                                                                                data: latest_data_lst,
                                                                                                                                joinBy: ['GID_'+level, 'join_el'],
                                                                                                                                keys: ['location_name','join_el'],
                                                                                                                                allowPointSelect: true,
                                                                                                                                cursor: 'pointer',
                                                                                                                                states: {
                                                                                                                                    hover: {
                                                                                                                                        enabled: false
                                                                                                                                    },
                                                                                                                                    select: {
                                                                                                                                        color: '#7cb5ec',
                                                                                                                                        borderColor: 'black',
                                                                                                                                        dashStyle: 'shortdot'
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }]
                                                                                                                        });






                                                                                                                        Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

                                                                                                                            proceed.apply(this, Array.prototype.slice.call(arguments, 1));

                                                                                                                            //NDVI select point
                                                                                                                            var pointsNDVI = ndviMap.getSelectedPoints();

                                                                                                                            if (pointsNDVI.length) {
                                                                                                                                $('#info_ndvi h2').html('<h4 class="charts_info">NDVI stands for Normalized Difference Vegetation Index; For more information, please refer to the <a href="methodology" class="method_link" target="_blank">methodology section</a>. Max, Mean, and Min values are computed for the period 2003-2024</h4>');
                                                                                                                                $('#info_ndvi .subheader').html('<h4 class="map_selected_area_title">Selected area: '+pointsNDVI[0].location_name+'</h4>');

                                                                                                                                if (!ndviChart) {
                                                                                                                                    ndviChart = Highcharts.chart('container_ndvi_chart', {
                                                                                                                                        chart: {
                                                                                                                                            height: 300,
                                                                                                                                            spacingLeft: 0,
                                                                                                                                        },
                                                                                                                                        boost: {
                                                                                                                                            useGPUTranslations: true,
                                                                                                                                            seriesThreshold: 5
                                                                                                                                        },
                                                                                                                                        credits: {
                                                                                                                                            enabled: false
                                                                                                                                        },
                                                                                                                                        title: {
                                                                                                                                            text: null
                                                                                                                                        },
                                                                                                                                        subtitle: {
                                                                                                                                            text: null
                                                                                                                                        },
                                                                                                                                        xAxis: {
                                                                                                                                            categories: [{
                                                                                                                                                name: 'Jan',
                                                                                                                                                categories: ['1', '2']
                                                                                                                                            },
                                                                                                                                                {
                                                                                                                                                    name: 'Feb',
                                                                                                                                                    categories: ['3', '4']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Mar',
                                                                                                                                                    categories: ['5', '6']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Apr',
                                                                                                                                                    categories: ['7','8']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'May',
                                                                                                                                                    categories: ['9','10']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Jun',
                                                                                                                                                    categories: ['11','12']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Jul',
                                                                                                                                                    categories: ['13','14']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Aug',
                                                                                                                                                    categories: ['15', '16']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Sept',
                                                                                                                                                    categories: ['17', '18']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Oct',
                                                                                                                                                    categories: ['19']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Nov',
                                                                                                                                                    categories: ['20', '21']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Dec',
                                                                                                                                                    categories: ['22', '23']
                                                                                                                                                },
                                                                                                                                            ],
                                                                                                                                            title : {
                                                                                                                                                text : 'No. of Observations',
                                                                                                                                                style: {
                                                                                                                                                    color: 'grey',
                                                                                                                                                    fontSize: '14px',
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            labels: {
                                                                                                                                                step: 1,
                                                                                                                                                style: {
                                                                                                                                                    color: 'red',
                                                                                                                                                    fontSize: '9px',
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        },
                                                                                                                                        navigator: {
                                                                                                                                            enabled: true,
                                                                                                                                            height:30,
                                                                                                                                            maskFill: '#76ad3c4d',
                                                                                                                                            xAxis: {
                                                                                                                                                type: 'category',
                                                                                                                                                labels : {
                                                                                                                                                    formatter: function() {
                                                                                                                                                        return this.value;
                                                                                                                                                    },
                                                                                                                                                },
                                                                                                                                            },
                                                                                                                                            series: {
                                                                                                                                                type: 'area',
                                                                                                                                                step: 'left',
                                                                                                                                                lineWidth: 0,
                                                                                                                                            }
                                                                                                                                        },
                                                                                                                                        yAxis: {
                                                                                                                                            title : {
                                                                                                                                                text : 'NDVI',
                                                                                                                                                style: {
                                                                                                                                                    color: 'grey',
                                                                                                                                                    fontSize: '14px',
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            labels: {
                                                                                                                                                style: {
                                                                                                                                                    color: 'red',
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            opposite: false
                                                                                                                                        },
                                                                                                                                        tooltip: {
                                                                                                                                            split: true
                                                                                                                                        },
                                                                                                                                        plotOptions: {
                                                                                                                                            series: {
                                                                                                                                                animation: {
                                                                                                                                                    duration: 300
                                                                                                                                                },
                                                                                                                                                marker: {
                                                                                                                                                    enabled: false
                                                                                                                                                },
                                                                                                                                                // threshold: 0,
                                                                                                                                                // pointStart: 1
                                                                                                                                            }
                                                                                                                                        },
                                                                                                                                    });
                                                                                                                                }


                                                                                                                                while(ndviChart.series.length>0){
                                                                                                                                    ndviChart.series[0].remove(false)
                                                                                                                                }

                                                                                                                                let dataInt = [];


                                                                                                                                pointsNDVI.forEach(function (p) {
                                                                                                                                    ndviChart.addSeries( {
                                                                                                                                        name: 'Max',
                                                                                                                                        data: loc_max_ndvi[p.location_name].data,
                                                                                                                                    }, false);

                                                                                                                                    ndviChart.addSeries( {
                                                                                                                                        name: 'Mean',
                                                                                                                                        data: loc_mean_ndvi[p.location_name].data,
                                                                                                                                    }, false);

                                                                                                                                    ndviChart.addSeries( {
                                                                                                                                        name: 'Min',
                                                                                                                                        data: loc_min_ndvi[p.location_name].data,
                                                                                                                                    }, false);
                                                                                                                                    ndviChart.addSeries( {
                                                                                                                                        name: '2024',
                                                                                                                                        data: loc_ndvi_2024[p.location_name].data,
                                                                                                                                      }, false);

                                                                                                                                    ndviChart.addSeries( {
                                                                                                                                        name: '2023',
                                                                                                                                        data: loc_ndvi_2023[p.location_name].data,
                                                                                                                                    }, false);
                                                                                                                                    ndviChart.addSeries( {
                                                                                                                                        name: '2022',
                                                                                                                                        data: loc_ndvi_2022[p.location_name].data,
                                                                                                                                    }, false);

                                                                                                                                    ndviChart.addSeries( {
                                                                                                                                        name: '2021',
                                                                                                                                        data: loc_current_ndvi[p.location_name].data,
                                                                                                                                    }, false);

                                                                                                                                    ndviChart.addSeries( {
                                                                                                                                        name: '2020',
                                                                                                                                        data: loc_ndvi_2020[p.location_name].data,
                                                                                                                                    }, false);


                                                                                                                                    for(var i=0;i<loc_min_ndvi[p.location_name].data.length;i++)
                                                                                                                                    {
                                                                                                                                        dataInt.push([loc_min_ndvi[p.location_name].data[i],loc_max_ndvi[p.location_name].data[i]]);
                                                                                                                                    }

                                                                                                                                    ndviChart.addSeries( {
                                                                                                                                        name: 'Fill [Min-Max]',
                                                                                                                                        type: "arearange",
                                                                                                                                        fillColor:"#d8d2d263",
                                                                                                                                        enableMouseTracking :false,
                                                                                                                                        data: dataInt,
                                                                                                                                    }, false);

                                                                                                                                    ndviChart.redraw();
                                                                                                                                });

                                                                                                                            }
                                                                                                                            else
                                                                                                                            {
                                                                                                                                $('#info_ndvi h2').html('');
                                                                                                                                $('#info_ndvi .subheader').html('');
                                                                                                                                if (ndviChart) {
                                                                                                                                    ndviChart = ndviChart.destroy();
                                                                                                                                }
                                                                                                                            }

                                                                                                                            //LST select point
                                                                                                                            var pointsLST = lstMap.getSelectedPoints();

                                                                                                                            if (pointsLST.length) {
                                                                                                                                $('#info_lst h2').html('<h4 class="charts_info">LST stands for Land Surface Temperature; For more information, please refer to the <a href="methodology" class="method_link" target="_blank">methodology section</a>. Max, Mean, and Min values are computed for the period 2003-2024</h4>');
                                                                                                                                $('#info_lst .subheader').html('<h4 class="map_selected_area_title">Selected area: '+pointsLST[0].location_name+'</h4>');

                                                                                                                                if (!lstChart) {
                                                                                                                                    lstChart = Highcharts.chart('container_lst_chart', {
                                                                                                                                        chart: {
                                                                                                                                            height: 300,
                                                                                                                                            spacingLeft: 0,
                                                                                                                                        },
                                                                                                                                        boost: {
                                                                                                                                            useGPUTranslations: true,
                                                                                                                                            seriesThreshold: 5
                                                                                                                                        },
                                                                                                                                        credits: {
                                                                                                                                            enabled: false
                                                                                                                                        },
                                                                                                                                        title: {
                                                                                                                                            text: null
                                                                                                                                        },
                                                                                                                                        subtitle: {
                                                                                                                                            text: null
                                                                                                                                        },
                                                                                                                                        xAxis: {
                                                                                                                                            categories: [
                                                                                                                                                {
                                                                                                                                                    name: 'Jan',
                                                                                                                                                    categories: ['1', '2', '3','4']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Feb',
                                                                                                                                                    categories: ['5', '6','7','8']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Mar',
                                                                                                                                                    categories: ['9', '10','11','12']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Apr',
                                                                                                                                                    categories: ['13','14','15']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'May',
                                                                                                                                                    categories: ['16','17','18','19']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Jun',
                                                                                                                                                    categories: ['20','21','22','23']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Jul',
                                                                                                                                                    categories: ['24','25','26','27']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Aug',
                                                                                                                                                    categories: ['28', '29', '30','31']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Sept',
                                                                                                                                                    categories: ['32', '33', '34','35']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Oct',
                                                                                                                                                    categories: ['36','37','38']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Nov',
                                                                                                                                                    categories: ['39', '40', '41','42']
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    name: 'Dec',
                                                                                                                                                    categories: ['43', '44', '45','46']
                                                                                                                                                },
                                                                                                                                            ],
                                                                                                                                            title : {
                                                                                                                                                text : 'No. of Observations',
                                                                                                                                                style: {
                                                                                                                                                    color: 'grey',
                                                                                                                                                    fontSize: '14px',
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            labels: {
                                                                                                                                                step: 1,
                                                                                                                                                style: {
                                                                                                                                                    color: 'red',
                                                                                                                                                    fontSize: '9px',
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        },
                                                                                                                                        navigator: {
                                                                                                                                            enabled: true,
                                                                                                                                            height:30,
                                                                                                                                            maskFill: '#76ad3c4d',
                                                                                                                                            xAxis: {
                                                                                                                                                type: 'category',
                                                                                                                                                labels : {
                                                                                                                                                    formatter: function() {
                                                                                                                                                        return this.value;
                                                                                                                                                    },
                                                                                                                                                },
                                                                                                                                            },
                                                                                                                                            series: {
                                                                                                                                                type: 'area',
                                                                                                                                                step: 'left',
                                                                                                                                                lineWidth: 0,
                                                                                                                                            }
                                                                                                                                        },
                                                                                                                                        yAxis: {
                                                                                                                                            title : {
                                                                                                                                                text : 'LST (°C)',
                                                                                                                                                style: {
                                                                                                                                                    color: 'grey',
                                                                                                                                                    fontSize: '14px',
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            labels: {
                                                                                                                                                style: {
                                                                                                                                                    color: 'red',
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            opposite: false
                                                                                                                                        },
                                                                                                                                        tooltip: {
                                                                                                                                            split: true
                                                                                                                                        },
                                                                                                                                        plotOptions: {
                                                                                                                                            series: {
                                                                                                                                                animation: {
                                                                                                                                                    duration: 300
                                                                                                                                                },
                                                                                                                                                marker: {
                                                                                                                                                    enabled: false
                                                                                                                                                },
                                                                                                                                                // threshold: 0,
                                                                                                                                                // pointStart: 1
                                                                                                                                            }
                                                                                                                                        },
                                                                                                                                    });
                                                                                                                                }


                                                                                                                                while(lstChart.series.length>0){
                                                                                                                                    lstChart.series[0].remove(false)
                                                                                                                                }

                                                                                                                                let dataInt = [];

                                                                                                                                pointsLST.forEach(function (p) {
                                                                                                                                    lstChart.addSeries( {
                                                                                                                                        name: 'Max',
                                                                                                                                        data: loc_max_lst[p.location_name].data,
                                                                                                                                    }, false);

                                                                                                                                    lstChart.addSeries( {
                                                                                                                                        name: 'Mean',
                                                                                                                                        data: loc_mean_lst[p.location_name].data,
                                                                                                                                    }, false);

                                                                                                                                    lstChart.addSeries( {
                                                                                                                                        name: 'Min',
                                                                                                                                        data: loc_min_lst[p.location_name].data,
                                                                                                                                    }, false);
                                                                                                                                    lstChart.addSeries( {
                                                                                                                                      name: '2024',
                                                                                                                                      data: loc_lst_2024[p.location_name].data,
                                                                                                                                    }, false);

                                                                                                                                    lstChart.addSeries( {
                                                                                                                                        name: '2023',
                                                                                                                                        data: loc_lst_2023[p.location_name].data,
                                                                                                                                    }, false);
                                                                                                                                    lstChart.addSeries( {
                                                                                                                                        name: '2022',
                                                                                                                                        data: loc_lst_2022[p.location_name].data,
                                                                                                                                    }, false);

                                                                                                                                    lstChart.addSeries( {
                                                                                                                                        name: '2021',
                                                                                                                                        data: loc_current_lst[p.location_name].data,
                                                                                                                                    }, false);

                                                                                                                                    lstChart.addSeries( {
                                                                                                                                        name: '2020',
                                                                                                                                        data: loc_lst_2020[p.location_name].data,
                                                                                                                                    }, false);




                                                                                                                                    for(var i=0;i<loc_min_lst[p.location_name].data.length;i++)
                                                                                                                                    {
                                                                                                                                        dataInt.push([loc_min_lst[p.location_name].data[i],loc_max_lst[p.location_name].data[i]]);
                                                                                                                                    }

                                                                                                                                    lstChart.addSeries( {
                                                                                                                                        name: 'Fill [Min-Max]',
                                                                                                                                        type: "arearange",
                                                                                                                                        fillColor:"#d8d2d263",
                                                                                                                                        enableMouseTracking :false,
                                                                                                                                        data: dataInt,
                                                                                                                                    }, false);

                                                                                                                                    lstChart.redraw();
                                                                                                                                });

                                                                                                                            }
                                                                                                                            else
                                                                                                                            {
                                                                                                                                $('#info_lst h2').html('');
                                                                                                                                $('#info_lst .subheader').html('');
                                                                                                                                if (lstChart) {
                                                                                                                                    lstChart = lstChart.destroy();
                                                                                                                                }
                                                                                                                            }



                                                                                                                        });

                                                                                                                            }});
                                                                                                                        }});
                                                                                                                    }});
                                                                                                            }});
                                                                                                    }});
                                                                                            }});
                                                                                    }});

                                                                            }});

                                                                    }});
                                                            }});
                                                    }});
                                            }});
                                    }});
                            }});
                    }});
            }});

    }

    function launchInput_with_rainfall (pays, level, geojsonfile){
        document.getElementById("container_rainfall").style.display="block";
        document.getElementById("container_rainfall_chart").style.display="block";

        const pre_url = General_config.data_url
        $.ajax({
            url: pre_url+"/"+'data/'+pays+'/Growing conditions/Min_rainfall.csv?v=<?php echo microtime(); ?>',
            success: function (min_rainfall_csv) {

                $.ajax({
                    url: pre_url+"/"+'data/'+pays+'/Growing conditions/Max_rainfall.csv?v=<?php echo microtime(); ?>',
                    success: function (max_rainfall_csv) {

                        $.ajax({
                            url: pre_url+"/"+'data/'+pays+'/Growing conditions/Mean_rainfall.csv?v=<?php echo microtime(); ?>',
                            success: function (mean_rainfall_csv) {

                                $.ajax({
                                    url: pre_url+"/"+'data/'+pays+'/Growing conditions/2021_rainfall.csv?v=<?php echo microtime(); ?>',
                                    success: function (current_rainfall_csv) {

                                        $.ajax({
                                            url: pre_url+"/"+'data/'+pays+'/Growing conditions/2020_rainfall.csv?v=<?php echo microtime(); ?>',
                                            success: function (rainfall_2020_csv) {

                                                $.ajax({
                                                    url: pre_url+"/"+'data/'+pays+'/Growing conditions/2022_rainfall.csv?v=<?php echo microtime(); ?>',
                                                    success: function (rainfall_2022_csv) {
                                                        $.ajax({
                                                            url: pre_url+"/"+'data/'+pays+'/Growing conditions/2023_rainfall.csv?v=<?php echo microtime(); ?>',
                                                            success: function (rainfall_2023_csv) {
                                                                 $.ajax({
                                                                    url: pre_url+"/"+'data/'+pays+'/Growing conditions/2024_rainfall.csv?v=<?php echo microtime(); ?>',
                                                                    success: function (rainfall_2024_csv) {



                                                                function CSVtoArray(text) {
                                                                    return text.replace(/^"/, '')
                                                                        .replace(/",$/, '')
                                                                        .split('","');
                                                                }


                                                                min_rainfall_csv = min_rainfall_csv.split(/\n/);
                                                                max_rainfall_csv = max_rainfall_csv.split(/\n/);
                                                                mean_rainfall_csv = mean_rainfall_csv.split(/\n/);
                                                                current_rainfall_csv = current_rainfall_csv.split(/\n/);
                                                                rainfall_2020_csv = rainfall_2020_csv.split(/\n/);
                                                                rainfall_2022_csv = rainfall_2022_csv.split(/\n/);
                                                                rainfall_2023_csv = rainfall_2023_csv.split(/\n/);
                                                                rainfall_2024_csv = rainfall_2024_csv.split(/\n/);


                                                                numRegex = /^[0-9\.]+$/,
                                                                    lastCommaRegex = /,\s$/,
                                                                    quoteRegex = /\"/g,
                                                                    categories = CSVtoArray(min_rainfall_csv[0]).slice(level+1);

                                                                //Min_rainfall
                                                                $.each(min_rainfall_csv.slice(1), function (j, line) {
                                                                    var row = CSVtoArray(line),
                                                                        data = row.slice(level+2);

                                                                    $.each(data, function (i, val) {
                                                                        val = val.replace(quoteRegex, '');
                                                                        val = parseFloat(val, 10);

                                                                        data[i] = val;
                                                                    });

                                                                    loc_min_rainfall[row[level]] = {
                                                                        location_name: row[level],
                                                                        join_el:row[level+1],
                                                                        data: data,
                                                                    };
                                                                });

                                                                //Max_rainfall
                                                                $.each(max_rainfall_csv.slice(1), function (j, line) {
                                                                    var row = CSVtoArray(line),
                                                                        data = row.slice(level+2);

                                                                    $.each(data, function (i, val) {
                                                                        val = val.replace(quoteRegex, '');
                                                                        val = parseFloat(val, 10);

                                                                        data[i] = val;

                                                                    });
                                                                    loc_max_rainfall[row[level]] = {
                                                                        location_name: row[level],
                                                                        join_el:row[level+1],
                                                                        data: data,
                                                                    };
                                                                });

                                                                //Mean_rainfall
                                                                $.each(mean_rainfall_csv.slice(1), function (j, line) {
                                                                    var row = CSVtoArray(line),
                                                                        data = row.slice(level+2);

                                                                    $.each(data, function (i, val) {
                                                                        val = val.replace(quoteRegex, '');
                                                                        val = parseFloat(val, 10);

                                                                        data[i] = val;

                                                                    });
                                                                    loc_mean_rainfall[row[level]] = {
                                                                        location_name: row[level],
                                                                        join_el:row[level+1],
                                                                        data: data,
                                                                    };
                                                                });


                                                                //Current Rainfall - 2021
                                                                $.each(current_rainfall_csv.slice(1), function (j, line) {
                                                                    var row = CSVtoArray(line),
                                                                        data = row.slice(level+2);

                                                                    $.each(data, function (i, val) {
                                                                        val = val.replace(quoteRegex, '');
                                                                        val = parseFloat(val, 10);

                                                                        data[i] = val;

                                                                    });
                                                                    loc_current_rainfall[row[level]] = {
                                                                        location_name: row[level],
                                                                        join_el:row[level+1],
                                                                        data: data,
                                                                    };
                                                                });

                                                                //Previous year Rainfall - 2020
                                                                $.each(rainfall_2020_csv.slice(1), function (j, line) {
                                                                    var row = CSVtoArray(line),
                                                                        data = row.slice(level+2);

                                                                    $.each(data, function (i, val) {
                                                                        val = val.replace(quoteRegex, '');
                                                                        val = parseFloat(val, 10);

                                                                        data[i] = val;

                                                                    });
                                                                    loc_rainfall_2020[row[level]] = {
                                                                        location_name: row[level],
                                                                        join_el:row[level+1],
                                                                        data: data,
                                                                    };
                                                                });

                                                                //Rainfall - 2022
                                                                $.each(rainfall_2022_csv.slice(1), function (j, line) {
                                                                    var row = CSVtoArray(line),
                                                                        data = row.slice(level+2);

                                                                    $.each(data, function (i, val) {
                                                                        val = val.replace(quoteRegex, '');
                                                                        val = parseFloat(val, 10);

                                                                        data[i] = val;

                                                                    });
                                                                    loc_rainfall_2022[row[level]] = {
                                                                        location_name: row[level],
                                                                        join_el:row[level+1],
                                                                        data: data,
                                                                    };
                                                                });

                                                                //Rainfall - 2023
                                                                $.each(rainfall_2023_csv.slice(1), function (j, line) {
                                                                    var row = CSVtoArray(line),
                                                                        data = row.slice(level+2);

                                                                    $.each(data, function (i, val) {
                                                                        val = val.replace(quoteRegex, '');
                                                                        val = parseFloat(val, 10);

                                                                        data[i] = val;

                                                                    });
                                                                    loc_rainfall_2023[row[level]] = {
                                                                        location_name: row[level],
                                                                        join_el:row[level+1],
                                                                        data: data,
                                                                    };
                                                                });

                                                                //Rainfall - 2024
                                                                 $.each(rainfall_2024_csv.slice(1), function (j, line) {
                                                                     var row = CSVtoArray(line),
                                                                         data = row.slice(level+2);

                                                                    $.each(data, function (i, val) {
                                                                         val = val.replace(quoteRegex, '');
                                                                         val = parseFloat(val, 10);

                                                                         data[i] = val;

                                                                     });
                                                                     loc_rainfall_2024[row[level]] = {
                                                                         location_name: row[level],
                                                                         join_el:row[level+1],
                                                                         data: data,
                                                                     };
                                                                 });




                                                                // For each location, use the latest value for current map - Rainfall
                                                                var latest_data_rainfall = [];
                                                                for (var e in loc_rainfall_2024) {
                                                                    if (loc_rainfall_2024.hasOwnProperty(e)) {
                                                                        var value = null,
                                                                            itemData = loc_rainfall_2024[e].data,
                                                                            i = itemData.length;

                                                                        while (i--) {

                                                                            if (typeof itemData[i] === 'number') {
                                                                                value = itemData[i];
                                                                                break;
                                                                            }
                                                                        }
                                                                        latest_data_rainfall.push({
                                                                            location_name: loc_rainfall_2024[e].location_name,
                                                                            join_el: loc_rainfall_2024[e].join_el,
                                                                            value: value,
                                                                        });
                                                                    }
                                                                }



                                                                // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
                                                                var topo  = (function() {
                                                                    var mapData = null;
                                                                    $.ajax({
                                                                        'async': false,
                                                                        'global': false,
                                                                        'url': geojsonfile,
                                                                        'dataType': "json",
                                                                        'success': function (data) {
                                                                            mapData = data;
                                                                        }
                                                                    });
                                                                    return mapData;
                                                                })();

                                                                console.log(latest_data_rainfall);
                                                                if(pays=="Morocco")
                                                                {
                                                                    subtitle_rainfall_map="Map of January 2023";
                                                                    pointFormat_rainfall="<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>January 2023 rainfall:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>";

                                                                }
                                                                else {
                                                                    subtitle_rainfall_map='Map of July 2024';
                                                                    pointFormat_rainfall="<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>July 2024 rainfall:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>";

                                                                }

                                                                // Initiate the Rainfall map
                                                                rainfallMap = Highcharts.mapChart('container_rainfall', {
                                                                    chart: {
                                                                        // height: 300,
                                                                        // width: 300,
                                                                        map: mapData
                                                                    },
                                                                    boost: {
                                                                        useGPUTranslations: true,
                                                                        seriesThreshold: 5
                                                                    },
                                                                    title: {
                                                                        text: 'Rainfall'
                                                                    },
                                                                    subtitle: {
                                                                        text: subtitle_rainfall_map
                                                                    },
                                                                    mapNavigation: {
                                                                        enabled: true,
                                                                        buttonOptions: {
                                                                            verticalAlign: 'bottom'
                                                                        }
                                                                    },
                                                                    credits: {
                                                                        enabled: false
                                                                    },
                                                                    colorAxis: {
                                                                        endOnTick: false,
                                                                        startOnTick: false,
                                                                        minColor: '#eff3ff',
                                                                        maxColor: '#08519c',
                                                                    },
                                                                    tooltip: {
                                                                        useHTML :true,
                                                                        headerFormat: ' ',
                                                                        pointFormat: pointFormat_rainfall,
                                                                    },
                                                                    series: [{
                                                                        data: latest_data_rainfall,
                                                                        joinBy: ['GID_'+level, 'join_el'],
                                                                        keys: ['location_name','join_el'],
                                                                        allowPointSelect: true,
                                                                        cursor: 'pointer',
                                                                        states: {
                                                                            hover: {
                                                                                enabled: false
                                                                            },
                                                                            select: {
                                                                                color: '#7cb5ec',
                                                                                borderColor: 'black',
                                                                                dashStyle: 'shortdot'
                                                                            }
                                                                        }
                                                                    }]
                                                                });

                                                                Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

                                                                    proceed.apply(this, Array.prototype.slice.call(arguments, 1));


                                                                    //Rainfall select point
                                                                    var pointsRainfall = rainfallMap.getSelectedPoints();

                                                                    if (pointsRainfall.length) {
                                                                        // $('#info_rainfall h2').html('<h4 class="charts_info">NDVI stands for Normalized Difference Vegetation Index; For more information, please refer to the <a href="methodology" class="method_link" target="_blank">methodology section</a>. Max, Mean, and Min values are computed for the period 2002-2021</h4>');
                                                                        $('#info_rainfall h2').html('<h4 class="charts_info">The Rainfall data were derived from the daily climate hazards group infrared precipitation with station (CHIRPS) dataset. Max, Mean, and Min values are computed for the period 2003-2024</h4>');
                                                                        $('#info_rainfall .subheader').html('<h4 class="map_selected_area_title">Selected area: '+pointsRainfall[0].location_name+'</h4>');

                                                                        if (!rainfallChart) {
                                                                            rainfallChart = Highcharts.chart('container_rainfall_chart', {
                                                                                chart: {
                                                                                    height: 300,
                                                                                    spacingLeft: 0,
                                                                                },
                                                                                boost: {
                                                                                    useGPUTranslations: true,
                                                                                    seriesThreshold: 5
                                                                                },
                                                                                credits: {
                                                                                    enabled: false
                                                                                },
                                                                                title: {
                                                                                    text: null
                                                                                },
                                                                                subtitle: {
                                                                                    text: null
                                                                                },
                                                                                xAxis: {
                                                                                    categories: [{
                                                                                        name: 'Jan',
                                                                                        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
                                                                                    },
                                                                                        {
                                                                                            name: 'Feb',
                                                                                            categories: ['32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
                                                                                        },
                                                                                        {
                                                                                            name: 'Mar',
                                                                                            categories: ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']
                                                                                        },
                                                                                        {
                                                                                            name: 'Apr',
                                                                                            categories: ['91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120']
                                                                                        },
                                                                                        {
                                                                                            name: 'May',
                                                                                            categories: ['121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '150', '151']
                                                                                        },
                                                                                        {
                                                                                            name: 'Jun',
                                                                                            categories: ['152', '153', '154', '155', '156', '157', '158', '159', '160', '161', '162', '163', '164', '165', '166', '167', '168', '169', '170', '171', '172', '173', '174', '175', '176', '177', '178', '179', '180', '181']
                                                                                        },
                                                                                        {
                                                                                            name: 'Jul',
                                                                                            categories: ['182', '183', '184', '185', '186', '187', '188', '189', '190', '191', '192', '193', '194', '195', '196', '197', '198', '199', '200', '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212']
                                                                                        },
                                                                                        {
                                                                                            name: 'Aug',
                                                                                            categories: ['213', '214', '215', '216', '217', '218', '219', '220', '221', '222', '223', '224', '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239', '240', '241', '242', '243']
                                                                                        },
                                                                                        {
                                                                                            name: 'Sept',
                                                                                            categories: ['244', '245', '246', '247', '248', '249', '250', '251', '252', '253', '254', '255', '256', '257', '258', '259', '260', '261', '262', '263', '264', '265', '266', '267', '268', '269', '270', '271', '272', '273']
                                                                                        },
                                                                                        {
                                                                                            name: 'Oct',
                                                                                            categories: ['274', '275', '276', '277', '278', '279', '280', '281', '282', '283', '284', '285', '286', '287', '288', '289', '290', '291', '292', '293', '294', '295', '296', '297', '298', '299', '300', '301', '302', '303', '304']
                                                                                        },
                                                                                        {
                                                                                            name: 'Nov',
                                                                                            categories: ['305', '306', '307', '308', '309', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321', '322', '323', '324', '325', '326', '327', '328', '329', '330', '331', '332', '333', '334' ]
                                                                                        },
                                                                                        {
                                                                                            name: 'Dec',
                                                                                            categories: ['335', '336', '337', '338', '339', '340', '341', '342', '343', '344', '345', '346', '347', '348', '349', '350', '351', '352', '353', '354', '355', '356', '357', '358', '359', '360', '361', '362', '363', '364', '365']
                                                                                        },
                                                                                    ],
                                                                                    title : {
                                                                                        text : 'No. of Observations',
                                                                                        style: {
                                                                                            color: 'grey',
                                                                                            fontSize: '14px',
                                                                                        }
                                                                                    },
                                                                                    labels: {
                                                                                        // enabled:false,
                                                                                        step: 1,
                                                                                        style: {
                                                                                            color: 'red',
                                                                                            fontSize: '9px',
                                                                                        }
                                                                                    }
                                                                                },
                                                                                navigator: {
                                                                                    enabled: true,
                                                                                    height:30,
                                                                                    maskFill: '#76ad3c4d',
                                                                                    xAxis: {
                                                                                        type: 'category',
                                                                                        labels : {
                                                                                            formatter: function() {
                                                                                                return this.value;
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    series: {
                                                                                        type: 'area',
                                                                                        step: 'left',
                                                                                        lineWidth: 0,
                                                                                    }
                                                                                },
                                                                                yAxis: {
                                                                                    title : {
                                                                                        text : 'Rainfall (mm)',
                                                                                        style: {
                                                                                            color: 'grey',
                                                                                            fontSize: '14px',
                                                                                        }
                                                                                    },
                                                                                    labels: {
                                                                                        style: {
                                                                                            color: 'red',
                                                                                        }
                                                                                    },
                                                                                    opposite: false
                                                                                },
                                                                                tooltip: {
                                                                                    split: true
                                                                                },
                                                                                plotOptions: {
                                                                                    series: {
                                                                                        animation: {
                                                                                            duration: 300
                                                                                        },
                                                                                        marker: {
                                                                                            enabled: false
                                                                                        },
                                                                                        // threshold: 0,
                                                                                        // pointStart: 1
                                                                                    }
                                                                                },
                                                                            });

                                                                        }


                                                                        while(rainfallChart.series.length>0){
                                                                            rainfallChart.series[0].remove(false)
                                                                        }

                                                                        let dataInt = [];


                                                                        pointsRainfall.forEach(function (p) {
                                                                            rainfallChart.addSeries( {
                                                                                name: 'Max',
                                                                                data: loc_max_rainfall[p.location_name].data,
                                                                            }, false);

                                                                            rainfallChart.addSeries( {
                                                                                name: 'Mean',
                                                                                data: loc_mean_rainfall[p.location_name].data,
                                                                            }, false);

                                                                            rainfallChart.addSeries( {
                                                                                name: 'Min',
                                                                                data: loc_min_rainfall[p.location_name].data,
                                                                            }, false);

                                                                             rainfallChart.addSeries( {
                                                                                 name: '2024',
                                                                                 data: loc_rainfall_2024[p.location_name].data,
                                                                               }, false);

                                                                            rainfallChart.addSeries( {
                                                                                name: '2023',
                                                                                data: loc_rainfall_2023[p.location_name].data,
                                                                            }, false);
                                                                            rainfallChart.addSeries( {
                                                                                name: '2022',
                                                                                data: loc_rainfall_2022[p.location_name].data,
                                                                            }, false);

                                                                            rainfallChart.addSeries( {
                                                                                name: '2021',
                                                                                data: loc_current_rainfall[p.location_name].data,
                                                                            }, false);

                                                                            rainfallChart.addSeries( {
                                                                                name: '2020',
                                                                                data: loc_rainfall_2020[p.location_name].data,
                                                                            }, false);


                                                                            for(var i=0;i<loc_min_rainfall[p.location_name].data.length;i++)
                                                                            {
                                                                                dataInt.push([loc_min_rainfall[p.location_name].data[i],loc_max_rainfall[p.location_name].data[i]]);
                                                                            }

                                                                            rainfallChart.addSeries( {
                                                                                name: 'Fill [Min-Max]',
                                                                                type: "arearange",
                                                                                fillColor:"#d8d2d263",
                                                                                enableMouseTracking :false,
                                                                                data: dataInt,
                                                                            }, false);

                                                                            rainfallChart.redraw();
                                                                        });

                                                                    }
                                                                    else
                                                                    {
                                                                        $('#info_rainfall h2').html('');
                                                                        $('#info_rainfall .subheader').html('');
                                                                        if (rainfallChart) {
                                                                            rainfallChart = rainfallChart.destroy();
                                                                        }
                                                                    }


                                                                });

                                                            }});
                                                            }});
                                                    }});
                                            }});
                                    }});
                            }});
                    }});
            }});

    }
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.4/clipboard.min.js"></script>

<!-- Downloads -->
<!-- <script src="<?= BASE_URL ?>/js/jspdf/jspdf.js"></script>
<script src="<?= BASE_URL ?>/js/jspdf/addimage.js"></script>
<script src="<?= BASE_URL ?>/js/jspdf/from_html.js"></script>
<script src="<?= BASE_URL ?>/js/jspdf/split_text_to_size.js"></script>
<script src="<?= BASE_URL ?>/js/jspdf/standard_fonts_metrics.js"></script>
<script src="<?= BASE_URL ?>/js/jspdf/png_support.js"></script>
<script src="<?= BASE_URL ?>/js/jspdf/png.js"></script>
<script src="<?= BASE_URL ?>/js/jspdf/zlib.js"></script>
<script src="<?= BASE_URL ?>/js/jspdf/FileSaver.js"></script>
<script src="<?= BASE_URL ?>/js/html2canvas_latest.js"></script> -->



<script src="<?= htmlspecialchars(url_for('assets/js/jspdf/jspdf.js')); ?>"></script>
<script src="<?= htmlspecialchars(url_for('assets/js/jspdf/addimage.js')); ?>"></script>
<script src="<?= htmlspecialchars(url_for('assets/js/jspdf/from_html.js')); ?>"></script>
<script src="<?= htmlspecialchars(url_for('assets/js/jspdf/split_text_to_size.js')); ?>"></script>
<script src="<?= htmlspecialchars(url_for('assets/js/jspdf/standard_fonts_metrics.js')); ?>"></script>
<script src="<?= htmlspecialchars(url_for('assets/js/jspdf/png_support.js')); ?>"></script>
<script src="<?= htmlspecialchars(url_for('assets/js/jspdf/png.js')); ?>"></script>
<script src="<?= htmlspecialchars(url_for('assets/js/jspdf/zlib.js')); ?>"></script>
<script src="<?= htmlspecialchars(url_for('assets/js/jspdf/FileSaver.js')); ?>"></script>
<script src="<?= htmlspecialchars(url_for('assets/js/html2canvas_latest.js')); ?>"></script>
<script>
    $("#covid_banner .close").click(function () {
        $("#covid_banner .close").alert("close");
    });
</script>
<script>
    jQuery(document).ready(function () {
        $.fn.dataTable.moment('D MMMM YYYY');
        $('#calendar_predictions').DataTable({
            searching: false,
            paging: true,
            info: false,
            "order": [[0, "asc"], [2, 'desc']]
        });

        //Select picker spat. aggr. tab
        $('select[name*="country_spat_aggr[]"]').each(function () {

            var crop = {
                'Algeria': ['Wheat'],
                'Angola': ['Cassava'],
                'Benin': ['Cassava', 'Maize', 'Yam'],
                'Burkina Faso': ['Millet', 'Sorghum'],
                'Burundi': ['Maize', 'Sorghum'],
                'Cameroon': ['Cassava', 'Maize', 'Millet', 'Rice', 'Sorghum'],
                'Central African Republic': ['Cassava', 'Maize', 'Millet', 'Rice', 'Sorghum'],
                'Chad': ['Maize', 'Millet', 'Rice', 'Sorghum'],
                'Congo Republic': ['Cassava', 'Maize', 'Millet', 'Yam'],
                'Côte d’Ivoire': ['Cassava', 'Maize', 'Millet', 'Rice', 'Sorghum'],
                'DR Congo': ['Cassava', 'Maize', 'Millet', 'Rice', 'Sorghum', 'Yam'],
                'Egypt': ['Wheat'],
                //'Eritrea': ['Maize', 'Millet', 'Sorghum'],
                'Eswatini': ['Wheat'],
                'Ethiopia': ['Maize', 'Sorghum', 'Wheat'],
                'Gabon': ['Cassava', 'Yam'],
                'Gambia': ['Maize', 'Millet', 'Rice', 'Sorghum'],
                'Ghana': ['Cassava', 'Maize', 'Millet', 'Sorghum', 'Yam'],
                'Guinea': ['Maize', 'Millet', 'Rice', 'Sorghum'],
                'Guinea-Bissau': ['Maize', 'Millet', 'Rice', 'Sorghum'],
                'Kenya': ['Maize', 'Wheat'],
                'Lesotho': ['Wheat'],
                'Liberia': ['Cassava', 'Rice', 'Yam'],
                'Libya': ['Wheat'],
                'Malawi': ['Maize', 'Rice', 'Sorghum', 'Wheat'],
                'Mali': ['Maize', 'Millet', 'Sorghum'],
                'Mauritania': ['Maize', 'Millet', 'Sorghum'],
                'Morocco': ['Wheat'],
                'Mozambique': ['Wheat'],
                'Namibia': ['Wheat'],
                'Niger': ['Maize', 'Millet', 'Sorghum'],
                'Nigeria': ['Cassava', 'Maize', 'Millet'],
                'Rwanda': ['Maize', 'Sorghum'],
                'Senegal': ['Groundnut', 'Maize', 'Millet', 'Rice', 'Sorghum'],
                'Sierra Leone': ['Cassava', 'Maize', 'Millet', 'Rice'],
                'Somalia': ['Maize', 'Sorghum'],
                'South Africa': ['Wheat'],
                'South Sudan': ['Maize', 'Millet', 'Sorghum'],
                'Sudan': ['Sorghum', 'Wheat'],
                'Togo': ['Cassava', 'Maize', 'Yam'],
                'Tunisia': ['Wheat'],
                'Uganda': ['Maize'],
                'Zambia': ['Wheat'],
                'Zimbabwe': ['Wheat'],
            }


            $('select[name*="country_spat_aggr[]"]').change(function () {
                var $crop = $('.crop_aggr');
                // console.log($crop);
                var country_spat_aggr = $(this).val(),
                    lcns = crop[country_spat_aggr] || [];

                var html = $.map(lcns, function (lcn) {
                    return '<option value="' + lcn + '">' + lcn + '</option>'
                }).join('');
                $crop.html(html)
            });
        });

        let fullscreen = document.querySelector("#fullscreen");
        let button = document.querySelector("#btn_full_scr");

        button.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                fullscreen?.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });

        let fullscreen2 = document.querySelector("#fullscreen2");
        let button2 = document.querySelector("#btn_full_scr2");

        button2.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                fullscreen2?.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });

        $('#copy').tooltip({
            trigger: 'click',
            placement: 'bottom'
        });
        $('#copy2').tooltip({
            trigger: 'click',
            placement: 'bottom'
        });
        $('#copy3').tooltip({
            trigger: 'click',
            placement: 'bottom'
        });

        function setTooltip(message) {
            $('#copy').tooltip('hide')
                .attr('data-original-title', message)
                .tooltip('show');
        }

        function setTooltip2(message) {
            $('#copy2').tooltip('hide')
                .attr('data-original-title', message)
                .tooltip('show');
        }

        function setTooltip3(message) {
            $('#copy3').tooltip('hide')
                .attr('data-original-title', message)
                .tooltip('show');
        }

        function hideTooltip() {
            setTimeout(function () {
                $('#copy').tooltip('hide');
            }, 1000);
        }

        function hideTooltip2() {
            setTimeout(function () {
                $('#copy2').tooltip('hide');
            }, 1000);
        }

        function hideTooltip3() {
            setTimeout(function () {
                $('#copy3').tooltip('hide');
            }, 1000);
        }

        // Clipboard
        var clipboard = new ClipboardJS('#copy');
        var clipboard2 = new ClipboardJS('#copy2');
        var clipboard3 = new ClipboardJS('#copy3');

        clipboard.on('success', function (e) {
            setTooltip('Copied!');
            hideTooltip();

        });
        clipboard2.on('success', function (e) {
            setTooltip2('Copied!');
            hideTooltip2();

        });
        clipboard3.on('success', function (e) {
            setTooltip3('Copied!');
            hideTooltip3();

        });


        function hello() {
            var target = $('#form_country'),
                optGroup,
                optGroup2;

            $('#form_country').find('option').each(function () {
                var elm = $(this).clone();
                document.getElementById("form_country").options.remove(0);

                $("#form_country").children().remove("optgroup");
                var e = elm.text();
                if (!optGroup) optGroup = $('<optgroup>').attr('label', 'Countries');
                if (!optGroup2) optGroup2 = $('<optgroup>').attr('label', 'Regions');
                if (elm.text() != "West" && elm.text() != "North" && elm.text() != "East" && elm.text() != "Central" && elm.text() != "Southern") {
                    optGroup.append(elm);
                    target.append(optGroup);
                } else {
                    optGroup2.append(elm);
                    target.append(optGroup2);
                }

                target.append(optGroup);
                target.append(optGroup2);

            });
        }


        /*var cars = {
            Production: ['2023 predictions', '2022 predictions', '2021 predictions', '2020 predictions'],
            Yield: ['2022 predictions ', '2021 predictions ', '2020 predictions ',]

        }


        const year = {
            '2021 predictions': ['Algeria  ', 'Angola  ', 'Benin  ', 'Burkina Faso  ', 'Burundi  ', 'Cameroon  ', 'Central African Republic  ', 'Chad  ', 'Congo Republic  ', 'Côte d’Ivoire  ', 'DR Congo  ', 'Egypt  ', 'Eritrea  ', 'Eswatini  ', 'Ethiopia  ', 'Gabon  ', 'Gambia  ', 'Ghana  ', 'Guinea  ',
                'Guinea-Bissau  ', 'Kenya  ', 'Lesotho  ', 'Liberia  ', 'Malawi  ', 'Mali  ', 'Mauritania  ', 'Morocco  ', 'Mozambique  ', 'Namibia  ', 'Niger  ', 'Nigeria  ', 'Rwanda  ', 'Senegal  ', 'Sierra Leone  ', 'Somalia  ', 'South Africa  ', 'South Sudan  ', 'Sudan  ', 'Togo  ',
                'Tunisia  ', 'Zambia  ', 'Zimbabwe  '],
            '2020 predictions': ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Cameroon', 'Central African Republic', 'Chad', 'Congo Republic',
                "Côte d’Ivoire", 'DR Congo', 'Egypt', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi',
                'Mali', 'Mauritania', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Senegal', 'Sierra Leone', 'South Africa', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda'
                , 'Zambia', 'Zimbabwe', 'Central', 'East', 'North', 'Southern', 'West'],
            '2021 predictions ': ['Benin   ', 'Burkina Faso   ', 'Congo Republic   ', 'Côte d’Ivoire   ', 'DR Congo   ', 'Eswatini   ', 'Gabon   ', 'Gambia   ', 'Ghana   ', 'Guinea   ', 'Kenya   ', 'Lesotho   ', 'Liberia   ', 'Mali   ', 'Namibia   ', 'Niger   ', 'Nigeria   ', 'Rwanda   ', 'Senegal   ',
                'Sierra Leone   ', 'Somalia   ', 'South Africa   ', 'South Sudan   ', 'Togo   ', 'Zambia   ', 'Zimbabwe   '],
            '2020 predictions ': ['Algeria ', 'Angola ', 'Benin ', 'Botswana ', 'Burkina Faso ', 'Cameroon ', 'Central African Republic ', 'Chad ', 'Congo Republic ', 'Côte d’Ivoire ', 'DR Congo ', 'Egypt ', 'Eswatini ', 'Ethiopia ', 'Gabon ', 'Gambia ', 'Ghana ', 'Guinea ', 'Guinea-Bissau ',
                'Kenya ', 'Lesotho ', 'Liberia ', 'Libya ', 'Madagascar ', 'Malawi ', 'Mali ', 'Morocco ', 'Mozambique ', 'Namibia ', 'Niger ', 'Nigeria ', 'Rwanda ', 'Senegal ', 'Sierra Leone ', 'South Africa ', 'Sudan ', 'Tanzania ', 'Togo ', 'Tunisia ',
                'Uganda ', 'Zambia ', 'Zimbabwe '],
            '2022 predictions': ['Algeria    ', 'Burundi    ', 'Burkina Faso    ', 'Cameroon    ', 'Central African Republic    ', 'Chad    ', 'Congo Republic    ', 'Côte d’Ivoire    ', 'DR Congo    ', 'Egypt    ', 'Eritrea    ', 'Ethiopia    ', 'Gabon    ', 'Gambia    ', 'Ghana    ', 'Guinea    ', 'Guinea-Bissau    ', 'Kenya    ', 'Libya    ', 'Mali    ', 'Mauritania    ', 'Morocco    ', 'Mozambique    ', 'Namibia    ', 'Niger    ', 'Nigeria    ', 'Rwanda    ', 'Senegal    ', 'Sierra Leone    ', 'Somalia    ', 'South Africa    ', 'South Sudan    ', 'Tunisia    ', 'Uganda    ', 'Zambia    ', 'Zimbabwe    '],
            '2022 predictions ': ['Burundi     ', 'Cameroon     ', 'Central African Republic     ', 'Chad     ', 'Congo Republic     ', 'DR Congo     ', 'Eritrea     ', 'Ethiopia     ', 'Gabon     ', 'Kenya     ', 'Rwanda     ', 'Somalia     ', 'South Sudan     ', 'Uganda     '],
            '2023 predictions': ['Burundi      ', 'Cameroon      ', 'Central African Republic      ', 'Congo Republic      ', 'DR Congo      ', 'Somalia      '],
        }

        var disc = {
            //2020 (based on past prediction) - Production
            'Algeria': ['Wheat'],
            'Angola': ['Cassava', 'Maize'],
            'Benin': ['Cassava', 'Maize', 'Rice'],
            'Botswana': ['Maize'],
            'Burkina Faso': ['Maize', 'Millet', 'Rice'],
            'Cameroon': ['Cassava', 'Maize'],
            'Central African Republic': ['Cassava', 'Maize'],
            'Chad': ['Maize'],
            'Congo Republic': ['Cassava', 'Maize', 'Yam'],
            'Côte d’Ivoire': ['Cassava', 'Maize', 'Millet', 'Rice'],
            'DR Congo': ['Maize', 'Yam'],
            'Egypt': ['Wheat'],
            'Ethiopia': ['Maize'],
            'Gabon': ['Cassava', 'Maize'],
            'Gambia': ['Millet'],
            'Ghana': ['Cassava', 'Maize', 'Rice'],
            'Guinea': ['Cassava', 'Maize', 'Rice'],
            'Guinea-Bissau': ['Maize', 'Rice'],
            'Kenya': ['Maize'],
            'Lesotho': ['Maize'],
            'Liberia': ['Cassava', 'Rice'],
            'Libya': ['Wheat'],
            'Madagascar': ['Maize'],
            'Malawi': ['Maize'],
            'Mali': ['Maize', 'Millet', 'Rice'],
            'Mauritania': ['Maize', 'Rice'],
            'Morocco': ['Wheat'],
            'Mozambique': ['Maize'],
            'Namibia': ['Maize'],
            'Niger': ['Maize', 'Rice'],
            'Nigeria': ['Cassava', 'Maize', 'Rice'],
            'Rwanda': ['Maize'],
            'Senegal': ['Maize', 'Millet', 'Rice'],
            'Sierra Leone': ['Cassava', 'Maize', 'Millet', 'Rice'],
            'South Africa': ['Maize', 'Wheat'],
            'Sudan': ['Wheat'],
            'Tanzania': ['Maize'],
            'Togo': ['Cassava', 'Maize', 'Rice'],
            'Tunisia': ['Wheat'],
            'Uganda': ['Maize'],
            'Zambia': ['Maize', 'Wheat'],
            'Zimbabwe': ['Maize', 'Wheat'],

            'Central': ['Maize'],
            'East': ['Maize'],
            'North': ['Wheat'],
            'Southern': ['Maize'],
            'West': ['Cassava', 'Maize', 'Rice'],

            // 2020 (based on past prediction) - yield
            'Algeria ': ['Wheat'],
            'Angola ': ['Cassava', 'Maize'],
            'Benin ': ['Cassava', 'Maize', 'Rice'],
            'Botswana ': ['Maize'],
            'Burkina Faso ': ['Maize', 'Millet', 'Rice'],
            'Cameroon ': ['Cassava', 'Maize'],
            'Central African Republic ': ['Cassava', 'Maize'],
            'Chad ': ['Maize'],
            'Congo Republic ': ['Cassava', 'Maize'],
            'Côte d’Ivoire ': ['Cassava', 'Maize', 'Millet', 'Rice'],
            'DR Congo ': ['Cassava', 'Maize'],
            'Egypt ': ['Wheat'],
            'Eswatini ': ['Maize'],
            'Ethiopia ': ['Maize'],
            'Gabon ': ['Cassava', 'Maize'],
            'Gambia ': ['Maize', 'Millet'],
            'Ghana ': ['Cassava', 'Maize', 'Rice'],
            'Guinea ': ['Cassava', 'Maize', 'Rice'],
            'Guinea-Bissau ': ['Maize', 'Rice'],
            'Kenya ': ['Maize'],
            'Lesotho ': ['Maize'],
            'Liberia ': ['Cassava', 'Rice'],
            'Libya ': ['Wheat'],
            'Madagascar ': ['Maize'],
            'Malawi ': ['Maize'],
            'Mali ': ['Maize', 'Millet', 'Rice'],
            'Morocco ': ['Wheat'],
            'Mozambique ': ['Maize'],
            'Namibia ': ['Maize'],
            'Niger ': ['Maize', 'Rice'],
            'Nigeria ': ['Cassava', 'Maize', 'Rice'],
            'Rwanda ': ['Maize'],
            'Sierra Leone ': ['Cassava', 'Maize', 'Millet', 'Rice'],
            'Senegal ': ['Maize', 'Millet', 'Rice'],
            'South Africa ': ['Maize'],
            'Sudan ': ['Wheat'],
            'Tanzania ': ['Maize'],
            'Togo ': ['Cassava', 'Maize', 'Rice'],
            'Tunisia ': ['Wheat'],
            'Uganda ': ['Maize'],
            'Zambia ': ['Maize'],
            'Zimbabwe ': ['Maize'],

            // 2021 (based on current prediction) - production
            'Algeria  ': ['Wheat'],
            'Angola  ': ['Cassava'],
            'Benin  ': ['Cassava', 'Maize', 'Yam'],
            'Burkina Faso  ': ['Millet', 'Sorghum'],
            'Burundi  ': ['Beans', 'Sorghum'],
            'Cameroon  ': ['Cassava', 'Millet', 'Sorghum'],
            'Central African Republic  ': ['Cassava'],
            'Chad  ': ['Maize', 'Millet', 'Rice', 'Sorghum'],
            'Congo Republic  ': ['Cassava', 'Millet', 'Yam'],
            'Côte d’Ivoire  ': ['Cassava', 'Maize', 'Millet', 'Rice'],
            'DR Congo  ': ['Cassava', 'Millet', 'Sorghum', 'Yam'],
            'Egypt  ': ['Wheat'],
            'Eritrea  ': ['Millet', 'Sorghum'],
            'Eswatini  ': ['Wheat'],
            'Ethiopia  ': ['Maize', 'Sorghum', 'Wheat'],
            'Gabon  ': ['Cassava', 'Yam'],
            'Gambia  ': ['Groundnut', 'Maize', 'Millet', 'Rice', 'Sorghum'],
            'Ghana  ': ['Cassava', 'Maize', 'Millet', 'Sorghum', 'Yam'],
            'Guinea  ': ['Maize', 'Rice'],
            'Guinea-Bissau  ': ['Rice'],
            'Kenya  ': ['Maize', 'Wheat'],
            'Lesotho  ': ['Wheat'],
            'Liberia  ': ['Cassava', 'Rice', 'Yam'],
            'Malawi  ': ['Maize', 'Rice', 'Sorghum', 'Wheat'],
            'Mali  ': ['Maize', 'Millet', 'Sorghum'],
            'Mauritania  ': ['Maize', 'Sorghum'],
            'Morocco  ': ['Wheat'],
            'Mozambique  ': ['Wheat'],
            'Namibia  ': ['Wheat'],
            'Niger  ': ['Millet', 'Sorghum'],
            'Nigeria  ': ['Cassava', 'Maize', 'Millet'],
            'Rwanda  ': ['Maize'],
            'Senegal  ': ['Groundnut', 'Millet', 'Rice', 'Sorghum'],
            'Sierra Leone  ': ['Cassava', 'Maize', 'Millet', 'Rice'],
            'Somalia  ': ['Maize', 'Sorghum'],
            'South Africa  ': ['Wheat'],
            'South Sudan  ': ['Maize'],
            'Sudan  ': ['Sorghum', 'Wheat'],
            'Togo  ': ['Cassava', 'Maize', 'Yam'],
            'Tunisia  ': ['Wheat'],
            'Zambia  ': ['Wheat'],
            'Zimbabwe  ': ['Wheat'],

            // 2021 - yield
            'Benin   ': ['Cassava', 'Maize', 'Yam'],
            'Burkina Faso   ': ['Millet'],
            'Congo Republic   ': ['Yam'],
            'Côte d’Ivoire   ': ['Cassava', 'Maize', 'Millet'],
            'DR Congo   ': ['Yam'],
            'Eswatini   ': ['Wheat'],
            'Gabon   ': ['Yam'],
            'Gambia   ': ['Millet'],
            'Ghana   ': ['Cassava', 'Maize', 'Yam'],
            'Guinea   ': ['Maize'],
            'Kenya   ': ['Maize'],
            'Lesotho   ': ['Wheat'],
            'Liberia   ': ['Cassava', 'Yam'],
            'Mali   ': ['Millet'],
            'Namibia   ': ['Wheat'],
            'Niger   ': ['Millet'],
            'Nigeria   ': ['Cassava', 'Maize', 'Millet'],
            'Rwanda   ': ['Maize'],
            'Senegal   ': ['Millet'],
            'Sierra Leone   ': ['Cassava', 'Millet'],
            'Somalia   ': ['Maize'],
            'South Africa   ': ['Wheat'],
            'South Sudan   ': ['Maize'],
            'Togo   ': ['Cassava', 'Maize'],
            'Zambia   ': ['Wheat'],
            'Zimbabwe   ': ['Wheat'],

            // 2022 - production
            // 'Eswatini    ': ['Wheat'],
            'Algeria    ': ['Wheat'],
            'Burkina Faso    ': ['Millet', 'Sorghum'],
            'Burundi    ': ['Maize', 'Sorghum'],
            'Cameroon    ': ['Cassava', 'Maize', 'Millet', 'Rice', 'Sorghum'],
            'Central African Republic    ': ['Cassava', 'Maize', 'Millet', 'Rice', 'Sorghum'],
            'Chad    ': ['Maize', 'Millet', 'Rice', 'Sorghum'],
            'Congo Republic    ': ['Cassava', 'Maize', 'Yam'],
            'Côte d’Ivoire    ': ['Millet', 'Sorghum'],
            'DR Congo    ': ['Cassava', 'Maize', 'Rice', 'Yam'],
            'Egypt    ': ['Wheat'],
            'Eritrea    ': ['Maize', 'Millet', 'Sorghum'],
            'Ethiopia    ': ['Maize', 'Sorghum'],
            'Gabon    ': ['Yam'],
            'Gambia    ': ['Maize', 'Millet', 'Sorghum'],
            'Ghana    ': ['Millet', 'Sorghum'],
            'Guinea    ': ['Maize', 'Millet', 'Sorghum'],
            'Guinea-Bissau    ': ['Maize', 'Millet', 'Sorghum'],
            'Kenya    ': ['Maize', 'Wheat'],
            'Libya    ': ['Wheat'],
            'Mali    ': ['Maize', 'Millet', 'Sorghum'],
            'Mauritania    ': ['Maize', 'Millet', 'Sorghum'],
            'Morocco    ': ['Wheat'],
            // 'Lesotho    ': ['Wheat'],
            'Mozambique    ': ['Wheat'],
            'Namibia    ': ['Wheat'],
            'Niger    ': ['Maize', 'Millet', 'Sorghum'],
            'Nigeria    ': ['Millet'],
            'Rwanda    ': ['Maize', 'Sorghum'],
            'Senegal    ': ['Maize', 'Millet', 'Sorghum'],
            'Sierra Leone    ': ['Maize', 'Millet'],
            'Somalia    ': ['Maize', 'Sorghum'],
            'South Africa    ': ['Wheat'],
            'South Sudan    ': ['Maize', 'Millet', 'Sorghum'],
            'Tunisia    ': ['Wheat'],
            'Uganda    ': ['Maize'],
            'Zambia    ': ['Wheat'],
            'Zimbabwe    ': ['Wheat'],


            // 2022 - yield
            // 'Eswatini    ': ['Wheat'],
            'Burundi     ': ['Maize', 'Sorghum'],
            'Cameroon     ': ['Cassava', 'Maize', 'Millet', 'Rice', 'Sorghum'],
            'Central African Republic     ': ['Cassava', 'Maize', 'Millet', 'Rice', 'Sorghum'],
            'Chad     ': ['Maize', 'Millet', 'Rice', 'Sorghum'],
            'Congo Republic     ': ['Cassava', 'Maize', 'Yam'],
            'DR Congo     ': ['Cassava', 'Maize', 'Rice', 'Yam'],
            'Eritrea     ': ['Maize', 'Millet', 'Sorghum'],
            'Ethiopia     ': ['Maize', 'Sorghum'],
            'Gabon     ': ['Yam'],
            'Kenya     ': ['Maize'],
            'Rwanda     ': ['Maize', 'Sorghum'],
            'Somalia     ': ['Maize', 'Sorghum'],
            'South Sudan     ': ['Maize', 'Millet', 'Sorghum'],
            'Uganda     ': ['Maize'],


            // 2023 - production
            'Burundi      ': ['Maize', 'Sorghum'],
            'Cameroon      ': ['Maize', 'Sorghum'],
            'Central African Republic      ': ['Cassava'],
            'Congo Republic      ': ['Cassava'],
            'DR Congo      ': ['Cassava'],
            // 'Gabon      ': ['Cassava'],
            'Somalia      ': ['Maize', 'Sorghum'],
        }*/

        // getting the main and sub menus


        /*var main = document.getElementById('form_product');
        var sub = document.getElementById('form_year');
        var sub2 = document.getElementById('form_country');
        var sub3 = document.getElementById('form_crop');


        // Trigger the Event when main menu change occurs

        main.addEventListener('change', function () {
            selectOptionDynamic(this, 'form_year', cars);
            document.querySelector('#form_year').dispatchEvent(new Event('change'));
            document.querySelector('#form_country').dispatchEvent(new Event('change'));
            // hello();
        });


        sub.addEventListener('change', function () {
            selectOptionDynamic(this, 'form_country', year)
            document.querySelector('#form_country').dispatchEvent(new Event('change'));
            hello();

        });

        sub2.addEventListener('change', function () {
            selectOptionDynamic(this, 'form_crop', disc)

        });*/


        function selectOptionDynamic(selectedoption, submenu, submenuValueObject) {

            var sub = document.getElementById(submenu);
            // getting a selected option

            var selected_option = submenuValueObject[selectedoption.value];
            // console.log("select yield:"+selected_option);

            // removing the sub menu options using while loop


            while (sub.options.length > 0) {

                sub.options.remove(0);

            }


            //conver the selected object into array and create a options for each array elements
            //using Option constructor  it will create html element with the given value and innerText

            if (typeof selected_option != 'undefined') {
                Array.from(selected_option).forEach(function (el) {


                    let option = new Option(el, el);

                    //append the child option in sub menu

                    sub.appendChild(option);

                });
            }
        };

    });


    // Print Map
    $(function () {
        console.log("moody")
        new ClipboardJS('.clipboard_cp');


        /*$('#save_image_map_output').click(function () {
            console.log("popo")
            var country = document.getElementById("form_country").value;
            var product = document.getElementById("form_product").value;
            var crop = document.getElementById("form_crop").value;
            var year = document.getElementById("form_year").value;
            var year = (year == "2021 predictions") ? "2021" : "2020";

            var title_map = (product == "Production") ? country + ' - Predicted ' + crop + ' production (MT) - ' + year : country + ' - Predicted ' + crop + ' yield (MT per ha) - ' + year;

            $('.leaflet-top').attr('data-html2canvas-ignore', 'true');
            var svgElements = document.body.querySelectorAll('svg');
            svgElements.forEach(function (item) {
                item.setAttribute("width", item.getBoundingClientRect().width);
                item.setAttribute("height", item.getBoundingClientRect().height);
                item.style.width = null;
                item.style.height = null;
            });
            html2canvas(jQuery('#map')[0], {
                allowTaint: false,
                useCORS: true,
                scrollY: -window.scrollY,
                // width: 1000,
                height: 800,

            }).then(canvas => {
                canvas.toBlob((blob) => {
                    saveAs(blob, title_map);
                });
            });
        });*/

    });
</script>
