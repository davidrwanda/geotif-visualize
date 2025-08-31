const Aagwa_config = function(){
	return {

		"base_url" : "http://localhost:8888/customized-aagwa/admin_A2063/request/aagwa_request.php",
		"country_table" : "country",

		"crop_phenology_metrics_table" : "crop_phenology_metrics",
		"cropPhenologyMetricsObjectID" : "CropPhenologyMetrics1753096329858",
		"crop_phenology_metrics_geojson" : "crop_phenology_metrics_geojson",
		//"crop_phenology_metrics_charts" : "crop_phenology_metrics_charts",
		"crop_phenology_metrics_chart_container" : "info-chart-crop_phenology_metrics",


		"temperature_trend_analysis_table" : "temperature_trend_analysis",

		"daily_stats_temperature_table" : "daily_stats_temperature",
		"dailyStatsTemperatureObjectID" : "DailyStatsTemperature1753227297645",
		"daily_stats_temperature_chart_container" : "info-chart-daily_stats_temperature",

		"anomaly_heatmaps_table" : "anomaly_heatmaps",
		"anomalyHeatmapsObjectID" : "AnomalyHeatMaps1751902937399",
		"anomaly_heatmaps_chart_container" : "info-chart-anomaly_heatmaps",
		
		"dataManagerObjectID" : "DataManager1732720503416",
		"data_manager_table" : "data_manager",

		"predictionSidebarId" : "agwaa-features-prediction",
		"predictionObjectID" : "Prediction1731499738226",
		"prediction_table" : "prediction",
		"prediction_map_container" : "map",

		"cropMappingSidebarId" : "agwaa-crop-mapping",
		"cropMappingObjectID" : "Cropmapping1731502170112",
		"crop_mapping_table" : "crop_mapping",
		"crop_mapping_map_container" : "map-crop-mapping",

		//crop suitability map
		"cropSuitabilitySidebarId" : "agwaa-crop_suitability",
		"cropSuitabilityObjectID" : "Cropsuitability1747650261172",
		"crop_suitability_table" : "crop_suitability",
		"crop_suitability_map_container" : "map-crop_suitability",

		/*"crop_land_delineationSidebarId" : "agwaa-crop_land_delineation",
		"crop_land_delineationObjectID" : "CropLandDelineation1732720573765",
		"crop_land_delineation_table" : "crop_land_delineation",
		"crop_land_delineation_map_container" : "map-crop_land_delineation",*/

		"climateSidebarId" : "agwaa-climate",
		"climateObjectID" : "GHGEmission1741605064173",
		"climate_table" : "ghg_emission",
		"climate_map_container" : "map-climate",

		"config_temperature_trend" : {
			"table-body-id" : "table-temp-trend-body",
			"breadcrumb-container" : "breadcrumb-temp-trend-body"
		},

		get base_url(){
			return "/customized-aagwa/admin_A2063";
		},
		getCountryParam (){
			const country = this.country;
			const countryParam = {
				"Benin" : {
					"bound" : [[9.145486056167277,2.1093750000000004],10],
					"latitude" : 9.145486056167277,
					"longitude" : 2.1093750000000004,
					"zoom" : 10,
					"code":"BEN"
				},
				"Senegal" : {
					"bound" : [[14.392118083661728,-14.787597656250002],7],
					"latitude" :  14.392118083661728,
					"longitude" : -14.787597656250002,
					"zoom" : 10,
					"code":"SEN"
				},
				"Ghana" : {
					"bound" : [[7.710991655433217,-1.1206054687500002],10],
					"latitude" : 7.710991655433217,
					"longitude" : -1.1206054687500002,
					"zoom" : 10,
					"code":"GHA"
				},
				"Malawi" : {
					"bound" : [[-13.368243250897287,33.90380859375001],10],
					"latitude" : -13.368243250897287,
					"longitude" : 33.90380859375001,
					"zoom" : 10,
					"code":"MWI"
				},
				"Uganda" : {
					"bound" : [[1.142502403706165,32.95898437500001],10],
					"latitude" : 1.142502403706165,
					"longitude" : 32.95898437500001,
					"zoom" : 10,
					"code":"UGA"
				}
			}
			return country in countryParam ? countryParam[country] : null ;
		},
		async initializeMap(){
			Aagwa_config.map = L.map('map', {
				preferCanvas: true,
				zoomControl: false,
				attributionControl: false,
				//center: Aagwa_config.homeCoordinates,
			});
			Aagwa_config.cropp_mapping_map = L.map('map-crop-mapping', {
				preferCanvas: true,
				zoomControl: false,
				attributionControl: false,
				//center: Aagwa_config.homeCoordinates,
			});

			Aagwa_config.noBasemap = L.tileLayer('');

			//Define basemaps
			Aagwa_config.baseMaps = {
				"BaseLayer": L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}),
				"DarkMatter": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}),
				"NatGeoWorldMap": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {}),
				"WorldStreetMap": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {}),
				"WorldImagery": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {}),
				"No Basemap": Aagwa_config.noBasemap,
			};
			Aagwa_config.baseMapsCropMapping = {
				"BaseLayer": L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}),
				"DarkMatter": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}),
				"NatGeoWorldMap": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {}),
				"WorldStreetMap": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {}),
				"WorldImagery": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {}),
				"No Basemap": L.tileLayer(''),
			};

			//Add default basemap
			let default_tile = Aagwa_config.baseMaps.BaseLayer.addTo(Aagwa_config.map);
			let default_tile_cropp_mapping = Aagwa_config.baseMapsCropMapping.BaseLayer.addTo(Aagwa_config.cropp_mapping_map);


			// create the sidebar instance and add it to the map
			let sidebar = L.control.sidebar({container: 'sidebar'})
				.addTo(Aagwa_config.map)
				.open('ag_production');
			let sidebar_cropp_mapping = L.control.sidebar({container: 'sidebar-crop-mapping'})
				.addTo(Aagwa_config.cropp_mapping_map)
				.open('ag_crop_mapping');



			/*const conf_prediction = {
				"custom_url" : General_config.aagwa_request_url,
				"object_id" : "Prediction1731499738226",
				"type" : "modules",
				"where_column" : "country",
				"where_value" : "Senegal",
				"inner_join" : true,
				"join_table" : Aagwa_config.country_table,
				"join_left" : `${Aagwa_config.prediction_table}.parent_id`,
				"join_right" : `${Aagwa_config.country_table}.id`,
			};

			// //console.log(conf_get_data);
			const dataPrediction = await AdmindUtils.getAllData(conf_prediction);

			//console.log("dataPrediction");
			//console.log(dataPrediction);*/

			// return;
			const configPrediction = {
				// "object_id" : "Prediction1731499738226",
				"object_id" : Aagwa_config.predictionObjectID,
				"type" : "modules",
				"parent_id" : Aagwa_config.predictionSidebarId,
				"excludeVar" : ["file"],
				//"data" : dataPrediction && typeof(dataPrediction) === "object" && dataPrediction.hasOwnProperty("msg") && Array.isArray(dataPrediction["msg"]) && dataPrediction["msg"].length > 0 ? dataPrediction["msg"] : [],
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
					"return" : true
				}
			};
			const configCropMapping = {
				"object_id" : Aagwa_config.cropMappingObjectID,
				"type" : "modules",
				"parent_id" : Aagwa_config.cropMappingSidebarId,
				"excludeVar" : ["file"],
				//"data" : dataPrediction && typeof(dataPrediction) === "object" && dataPrediction.hasOwnProperty("msg") && Array.isArray(dataPrediction["msg"]) && dataPrediction["msg"].length > 0 ? dataPrediction["msg"] : [],
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
					"return" : true
				}
			};

			aagwa.LoadModuleForm(configPrediction);
			aagwa.LoadModuleForm(configCropMapping);

		},
		async initializeCogMap(settings){

			

			const aagwa_features = settings["features"];
			const map_container = settings["container"];
			const sidebar_container = settings["sidebar_container"];
			const sidebar_tab = settings["sidebar_tab"];


			const renderVisualizationToolsPane = settings.hasOwnProperty("renderVisualizationToolsPane") && settings["renderVisualizationToolsPane"] === true ? true : false;
			const renderAccessToDataPane = settings.hasOwnProperty("renderAccessToDataPane") && settings["renderAccessToDataPane"] === true ? true : false;
			const renderDownloadTools = settings.hasOwnProperty("renderDownloadTools") && settings["renderDownloadTools"] === true ? true : false;
			
			console.log("renderAccessToDataPane");
			console.log(renderAccessToDataPane);
			if(renderVisualizationToolsPane){

				const tablistId = settings["tablistId"];
				const settingsVisualization = {
					"feature" : aagwa_features,
					"sibling" : sidebar_tab,
					"from_georaster" : true
				};
				
				const renderVizElt = AdmindUtils.renderVisualizationTools(settingsVisualization);
				document.getElementById(tablistId).insertAdjacentHTML("beforeend",renderVizElt["tabListElt"]);
				document.getElementById(sidebar_tab).insertAdjacentHTML("afterend",renderVizElt["pane"]);
				if(settings.hasOwnProperty("default_color_scale")){
					const colorscaleSelect = settings.hasOwnProperty("ex1_colorscaleselect") ? settings["ex1_colorscaleselect"] : `${aagwa_features}-ex1_colorscaleselect` ;
					const node_colorscaleSelect = document.getElementById(colorscaleSelect);
					if( node_colorscaleSelect ){
						//console.log(node_colorscaleSelect.options);
						//console.log(settings["default_color_scale"]);

						/*const option_selected = Array.from(node_colorscaleSelect.options)
  										.find((item) => {
  											//console.log(item.value);
  											//console.log(item.value === settings["default_color_scale"]);
  											return item.value === settings["default_color_scale"];
  									})*/


						const option_selected = node_colorscaleSelect.querySelector(`option[value='${settings["default_color_scale"]}']`);
						if(option_selected){
							//console.log("option_selected");
							//console.log(option_selected.setAttribute("selected","selected"));
						}
					}
				}
			}

			if(renderDownloadTools){

				//const tablistId = settings["tablistId"];
				const settingsDownload = {
					"feature" : aagwa_features,
					"sibling" : sidebar_tab
				};
				
				const renderDownloadElt = AdmindUtils.renderDownloadTools(settingsDownload);
				document.getElementById(settings["tablistId"]).insertAdjacentHTML("beforeend",renderDownloadElt["tabListElt"]);
				document.getElementById(sidebar_tab).insertAdjacentHTML("afterend",renderDownloadElt["pane"]);
			}

			/*let mapConfig = {
				// preferCanvas: true,
				zoomControl: true,
				// attributionControl: false,
				//center: Aagwa_config.homeCoordinates,
			};*/

			Aagwa_config[aagwa_features] = {
				"settings" : settings,
				"dataBinding" : {}
			};


			// Aagwa_config[aagwa_features].map = L.map(map_container,{zoomControl: false}).setView([0, 0], 5);
			Aagwa_config[aagwa_features].map = L.map(map_container,{zoomControl: false,scrollWheelZoom: false}).setView(...Aagwa_config.getCountryParam().bound);


			Aagwa_config[aagwa_features].zoomHome = L.Control.zoomHome();
			//Aagwa_config[aagwa_features].zoomHome.setHomeCoordinates(Aagwa_config[aagwa_features].layer.getBounds().getCenter());
			Aagwa_config[aagwa_features].zoomHome.setHomeZoom(Aagwa_config.getCountryParam().bound[1]);
			Aagwa_config[aagwa_features].zoomHome.addTo( Aagwa_config[aagwa_features].map);


			// add OpenStreetMap basemap
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(Aagwa_config[aagwa_features].map);

			// create the sidebar instance and add it to the map
			let sidebar = L.control.sidebar({container: sidebar_container})
				.addTo(Aagwa_config[aagwa_features].map)
				.open(sidebar_tab);

			Aagwa_config[aagwa_features].map.addControl(new L.Control.Fullscreen());

			/*let printer = L.easyPrint({
	      		// tileLayer: Aagwa_config[aagwa_features].baseMaps,
	      		sizeModes: ['Current'],
	      		// sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
	      		filename: 'myMap',
	      		exportOnly: true,
	      		hideClasses: ['leaflet-control-easyPrint'],
	      		hideControlContainer: false
			}).addTo(Aagwa_config[aagwa_features].map);*/

			AdmindUtils.addDownloadIcon({
				"tileLayer" : Aagwa_config[aagwa_features].baseMaps
			}).addTo(Aagwa_config[aagwa_features].map)

			settings["config"]["features"] = aagwa_features;
			
			aagwa.LoadModuleForm(settings["config"]);
			
			
			if(settings.hasOwnProperty("config") && typeof(settings["config"]) === "object"){
				const initial_settings = settings;
				if( initial_settings && typeof(initial_settings) === "object" && initial_settings.hasOwnProperty("config") && typeof(initial_settings["config"]) === "object" && initial_settings["config"].hasOwnProperty("events") && typeof(initial_settings["config"]["events"]) === "object" ){
					//console.log('initial_settings["config"]["events"]');
					//console.log(initial_settings["config"]["events"]);
					const events_list = initial_settings["config"]["events"];
					if( events_list.hasOwnProperty("map") && typeof(events_list["map"]) === "object"){
						//console.log('events_list["map"]')
						//console.log(events_list["map"])
						for( event_item in events_list["map"]){
							Aagwa_config[aagwa_features].map.on(event_item, (event)=>{
								//console.log("clickedddddddd")
								events_list["map"][event_item](Aagwa_config[aagwa_features],event);
							})
						}
					}
				}
			}

			/*if(settings.hasOwnProperty("legend") && typeof(settings["legend"]) === "function"){
				let legend = settings["legend"]();
				console.log("legend");
				console.log(legend);
				legend.addTo(Aagwa_config[aagwa_features].map)
			}*/
			
			
			// var url_to_geotiff_file = "https://storage.googleapis.com/pdd-stac/disasters/hurricane-harvey/0831/20170831_172754_101c_3b_Visual.tif";

			/*var url_to_geotiff_file = "http://localhost:8888/cog-leaflet/Benin_Rize_cog.tif";

			parseGeoraster(url_to_geotiff_file).then(georaster => {
				//console.log("georaster:", georaster);

				
					// GeoRasterLayer is an extension of GridLayer,
					// which means can use GridLayer options like opacity.

					// Just make sure to include the georaster option!

					// http://leafletjs.com/reference-1.2.0.html#gridlayer
				
				var layer = new GeoRasterLayer({
					attribution: "Planet",
					georaster: georaster,
					resolution: 128
				});
				layer.addTo(map);

				map.fitBounds(layer.getBounds());

			});*/
		},
		async initializeMapCustom(settings){
			const aagwa_features = settings["features"];
			const map_container = settings["container"];
			const sidebar_container = settings["sidebar_container"];
			const sidebar_tab = settings["sidebar_tab"];
			
			const renderVisualizationToolsPane = settings.hasOwnProperty("renderVisualizationToolsPane") && settings["renderVisualizationToolsPane"] === true ? true : false;
			const renderAccessToDataPane = settings.hasOwnProperty("renderAccessToDataPane") && settings["renderAccessToDataPane"] === true ? true : false;
			const renderDownloadTools = settings.hasOwnProperty("renderDownloadTools") && settings["renderDownloadTools"] === true ? true : false;
			
			console.log("renderDownloadTools");
			console.log(renderDownloadTools);
			if(renderVisualizationToolsPane){

				const tablistId = settings["tablistId"];
				const settingsVisualization = {
					"feature" : aagwa_features,
					"sibling" : sidebar_tab
				};
				
				const renderVizElt = AdmindUtils.renderVisualizationTools(settingsVisualization);
				document.getElementById(tablistId).insertAdjacentHTML("beforeend",renderVizElt["tabListElt"]);
				document.getElementById(sidebar_tab).insertAdjacentHTML("afterend",renderVizElt["pane"]);
			}
			if(renderDownloadTools){

				//const tablistId = settings["tablistId"];
				const settingsDownload = {
					"feature" : aagwa_features,
					"sibling" : sidebar_tab
				};
				
				const renderDownloadElt = AdmindUtils.renderDownloadTools(settingsDownload);
				document.getElementById(settings["tablistId"]).insertAdjacentHTML("beforeend",renderDownloadElt["tabListElt"]);
				document.getElementById(sidebar_tab).insertAdjacentHTML("afterend",renderDownloadElt["pane"]);
			}

			Aagwa_config[aagwa_features] = {
				"settings" : settings,
				"dataBinding" : {}
			};

			let mapConfig = {
				preferCanvas: true,
				zoomControl: false,
				attributionControl: false,
				scrollWheelZoom: false,
				//zoomSnap : 0.25
				//zoomDelta : 0.4
				//center: Aagwa_config.homeCoordinates,
			};

			if(settings.hasOwnProperty("timeDimensionConfig")){
				const dataInterval = await AdmindUtils.getLastData(settings["timeDimensionConfig"]["get_timeInterval_config"]);
				
				if( Array.isArray(dataInterval) && dataInterval.length > 0 ){
					console.log("dataInterval------------------------")
					console.log(dataInterval)
					settings["timeDimensionConfig"]["config"]["timeDimensionOptions"]["times"] = dataInterval.map((item,indice)=>{
						if(indice === 0 ){
							return item["start_week"]
						}
						else if(indice === (dataInterval.lengh-1)){
							return item["end_week"]
						}
						else{
							return item["start_week"]
						}
					}).join(",")
					//settings["timeDimensionConfig"]["config"]["timeDimensionOptions"]["timeInterval"] = `${dataInterval[0]["start_week"]}/${dataInterval[0]["end_week"]}`;
					console.log('settings["timeDimensionConfig"]["config"]');
					console.log(settings["timeDimensionConfig"]["config"]);
					settings["timeDimensionConfig"]["config"]["okForTimeDimension"] = true;
				}
				Object.assign(mapConfig,settings["timeDimensionConfig"]["config"]);
				
			}

			// Aagwa_config[aagwa_features].map = L.map(map_container, mapConfig);

			console.log("Aagwa_config.getCountryParam()");
			console.log(Aagwa_config.getCountryParam());
			Aagwa_config[aagwa_features].map = L.map(map_container,mapConfig).setView(...Aagwa_config.getCountryParam().bound);

			Aagwa_config[aagwa_features].zoomHome = L.Control.zoomHome();
			//Aagwa_config[aagwa_features].zoomHome.setHomeCoordinates(Aagwa_config[aagwa_features].layer.getBounds().getCenter());
			Aagwa_config[aagwa_features].zoomHome.setHomeZoom(Aagwa_config.getCountryParam().bound[1]);
			Aagwa_config[aagwa_features].zoomHome.addTo( Aagwa_config[aagwa_features].map);
			

			Aagwa_config[aagwa_features].noBasemap = L.tileLayer('');

		 	const layer_admin_level = await Aagwa_config.overlays_func(Aagwa_config.country);
		 	// //console.log(layer_admin_level);

			//Define basemaps
			Aagwa_config[aagwa_features].baseMaps = {
				"BaseLayer": L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}),
				"DarkMatter": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}),
				"NatGeoWorldMap": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {}),
				"WorldStreetMap": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {}),
				"WorldImagery": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {}),

				// "No Basemap": Aagwa_config.noBasemap,
				//"No Basemap": L.tileLayer(''),
			};

			/*var printer = L.easyPrint({
	      		tileLayer: Aagwa_config[aagwa_features].baseMaps,
	      		//sizeModes: 'Current',
	      		// sizeModes: ['Current', 'A4Landscape', 'A4Portrait']
	      		exportOnly : true,
	      		filename: 'myMap',
	      		exportOnly: true,
	      		hideClasses: ['leaflet-control-easyPrint'],
	      		hideControlContainer: false
			}).addTo(Aagwa_config[aagwa_features].map);*/
			AdmindUtils.addDownloadIcon({
				"tileLayer" : Aagwa_config[aagwa_features].baseMaps
			}).addTo(Aagwa_config[aagwa_features].map)

			//Object.assign(Aagwa_config[aagwa_features].baseMaps,layer_admin_level);
		   /* Aagwa_config.baseMapsCropMapping = {
				"BaseLayer": L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}),
				"DarkMatter": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}),
				"NatGeoWorldMap": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {}),
				"WorldStreetMap": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {}),
				"WorldImagery": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {}),
				"No Basemap": L.tileLayer(''),
			};*/

			//Add default basemap
			let default_tile = Aagwa_config[aagwa_features].baseMaps.BaseLayer.addTo(Aagwa_config[aagwa_features].map);


                        //jFeature.map.addLayer(country);
	                    // }

			//let default_tile_cropp_mapping = Aagwa_config.baseMapsCropMapping.BaseLayer.addTo(Aagwa_config.cropp_mapping_map);


			// create the sidebar instance and add it to the map
			let sidebar = L.control.sidebar({container: sidebar_container})
				.addTo(Aagwa_config[aagwa_features].map)
				.open(sidebar_tab);



			if( settings.hasOwnProperty("add_event_max_min") && settings["add_event_max_min"] === true ){
				const ex1_min = settings.hasOwnProperty("ex1_min") ? settings["ex1_min"] : `${aagwa_features}-ex1_min` ;
				const ex1_max = settings.hasOwnProperty("ex1_max") ? settings["ex1_max"] : `${aagwa_features}-ex1_max` ;
				
				// Aagwa_config.cropp_mapping_map.on('baselayerchange', onbaselayerchange);

				const node_ex1_min= document.getElementById(ex1_min);
				const node_ex1_max= document.getElementById(ex1_max);
				if(node_ex1_min && node_ex1_max){

					Aagwa_config[aagwa_features].map.on('baselayerchange', onbaselayerchange);
					
					function onbaselayerchange(e) {
							Aagwa_config[aagwa_features]["settings"]["active_layer"] = e.name;
						
							if (e.name == "DarkMatter" || e.name == "WorldImagery") {
								document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
									el.style.color = 'white';
								});
								node_ex1_min.style.background = '#f4f4f4';
								node_ex1_max.style.background = '#f4f4f4';
							} else if (e.name == "No Basemap") {
								document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
									el.style.color = 'black';
									Aagwa_config[aagwa_features].map.addLayer(Aagwa_config.country);
								});
								node_ex1_min.style.background = 'rgb(253 253 253)';
								node_ex1_max.style.background = 'rgb(253 253 253)';
							} else {
								document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
									el.style.color = 'black';
								});
								node_ex1_min.style.background = 'rgb(253 253 253)';
								node_ex1_max.style.background = 'rgb(253 253 253)';
							}
						}
					

					// const min = document.getElementById('ex1_min');
					// const max = document.getElementById('ex1_max');
					
						node_ex1_max.oninput = node_ex1_min.oninput = function () {
							// document.getElementById("ex1_min_label").innerHTML = inputMin.value;
							// document.getElementById("ex1_max_label").innerHTML = inputMax.value;
							if( Aagwa_config[aagwa_features].layer.hasOwnProperty("setFilter") ){
								let f = function (v) {
									return v >= node_ex1_min.value && v <= node_ex1_max.value;
								};
								Aagwa_config[aagwa_features].layer.setFilter(f);
							}
						};
					

					
				}
			}
			else{
				Aagwa_config[aagwa_features].map.on('baselayerchange', onbaselayerchange);
					
				function onbaselayerchange(e) {
						Aagwa_config[aagwa_features]["settings"]["active_layer"] = e.name;
					
						if (e.name == "DarkMatter" || e.name == "WorldImagery") {
							document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
								el.style.color = 'white';
							});
							// node_ex1_min.style.background = '#f4f4f4';
							// node_ex1_max.style.background = '#f4f4f4';
						} else if (e.name == "No Basemap") {
							document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
								el.style.color = 'black';
								Aagwa_config[aagwa_features].map.addLayer(Aagwa_config.country);
							});
							// node_ex1_min.style.background = 'rgb(253 253 253)';
							// node_ex1_max.style.background = 'rgb(253 253 253)';
						} else {
							document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
								el.style.color = 'black';
							});
							// node_ex1_min.style.background = 'rgb(253 253 253)';
							// node_ex1_max.style.background = 'rgb(253 253 253)';
						}
					}
			}

			//Fullscreen
			Aagwa_config[aagwa_features].map.addControl(new L.Control.Fullscreen());
			L.control.layers(Aagwa_config[aagwa_features].baseMaps, layer_admin_level).addTo(Aagwa_config[aagwa_features].map);


			if(settings.hasOwnProperty("timeDimensionConfig") && settings["timeDimensionConfig"]["config"].hasOwnProperty("okForTimeDimension")){
				console.log("poli===========")
				L.TimeDimension.Layer.ImageOverlay = L.TimeDimension.Layer.extend({

				    initialize: function(layer, options) {
				        L.TimeDimension.Layer.prototype.initialize.call(this, layer, options);
				        this._layers = {};
				        this._defaultTime = 0;
				        this._timeCacheBackward = this.options.cacheBackward || this.options.cache || 0;
				        this._timeCacheForward = this.options.cacheForward || this.options.cache || 0;
				        this._getUrlFunction = this.options.getUrlFunction;

				        this._baseLayer.on('load', (function() {
				            this._baseLayer.setLoaded(true);
				            this.fire('timeload', {
				                time: this._defaultTime
				            });
				        }).bind(this));
				    },

				    eachLayer: function(method, context) {
				        for (var prop in this._layers) {
				            if (this._layers.hasOwnProperty(prop)) {
				                method.call(context, this._layers[prop]);
				            }
				        }
				        return L.TimeDimension.Layer.prototype.eachLayer.call(this, method, context);
				    },

				    _onNewTimeLoading: function(ev) {

				    	//console.log("_onNewTimeLoading")
				    	//console.log(ev)
				        var layer = this._getLayerForTime(ev.time);
				        if (!this._map.hasLayer(layer)) {
				            this._map.addLayer(layer);
				        }
				    },

				    isReady: function(time) {
				    	//console.log("isReady")
				        var layer = this._getLayerForTime(time);
				        return layer.isLoaded();
				    },

				    _update: function() {
				    	//console.log("_update")
				        if (!this._map)
				            return;
				        var time = Aagwa_config[aagwa_features].map.timeDimension.getCurrentTime();
				        var layer = this._getLayerForTime(time);
				        if (this._currentLayer == null) {
				            this._currentLayer = layer;
				        }
				        if (!this._map.hasLayer(layer)) {
				            this._map.addLayer(layer);
				        } else {
				            this._showLayer(layer, time);
				        }
				    },

				    _showLayer: function(layer, time) {
				        if (this._currentLayer && this._currentLayer !== layer) {
				            this._currentLayer.hide();
				            this._map.removeLayer(this._currentLayer);
				        }
				        layer.show();
				        if (this._currentLayer && this._currentLayer === layer) {
				            return;
				        }
				        this._currentLayer = layer;
				        // Cache management
				        var times = this._getLoadedTimes();
				        var strTime = String(time);
				        var index = times.indexOf(strTime);
				        var remove = [];
				        // remove times before current time
				        if (this._timeCacheBackward > -1) {
				            var objectsToRemove = index - this._timeCacheBackward;
				            if (objectsToRemove > 0) {
				                remove = times.splice(0, objectsToRemove);
				                this._removeLayers(remove);
				            }
				        }
				        if (this._timeCacheForward > -1) {
				            index = times.indexOf(strTime);
				            var objectsToRemove = times.length - index - this._timeCacheForward - 1;
				            if (objectsToRemove > 0) {
				                remove = times.splice(index + this._timeCacheForward + 1, objectsToRemove);
				                this._removeLayers(remove);
				            }
				        }
				    },

				    _getLayerForTime: function(time) {
				    	//console.log("time")
				    	//console.log(time)
				        if (time == 0 || time == this._defaultTime) {
				            return this._baseLayer;
				        }
				        if (this._layers.hasOwnProperty(time)) {
				            return this._layers[time];
				        }
				        var url = this._getUrlFunction(this._baseLayer.getURL(), time);
				        imageBounds = this._baseLayer._bounds;

				        var newLayer = L.imageOverlay(url, imageBounds, this._baseLayer.options);
				        this._layers[time] = newLayer;
				        newLayer.on('load', (function(layer, time) {
				            layer.setLoaded(true);
				            if (Aagwa_config[aagwa_features].map.timeDimension && time == Aagwa_config[aagwa_features].map.timeDimension.getCurrentTime() && !Aagwa_config[aagwa_features].map.timeDimension.isLoading()) {
				                this._showLayer(layer, time);
				            }
				            this.fire('timeload', {
				                time: time
				            });
				        }).bind(this, newLayer, time));

				        // Hack to hide the layer when added to the map.
				        // It will be shown when timeload event is fired from the map (after all layers are loaded)
				        newLayer.onAdd = (function(map) {
				            Object.getPrototypeOf(this).onAdd.call(this, map);
				            this.hide();
				        }).bind(newLayer);
				        return newLayer;
				    },

				    _getLoadedTimes: function() {
				        var result = [];
				        for (var prop in this._layers) {
				            if (this._layers.hasOwnProperty(prop)) {
				                result.push(prop);
				            }
				        }
				        return result.sort();
				    },

				    _removeLayers: function(times) {
				        for (var i = 0, l = times.length; i < l; i++) {
				            this._map.removeLayer(this._layers[times[i]]);
				            delete this._layers[times[i]];
				        }
				    },

				});

				L.timeDimension.layer.imageOverlay = function(layer, options) {
					//console.log("layer-----")
					//console.log(layer)
				    //console.log("options-----")
					//console.log(options)
				    return new L.TimeDimension.Layer.ImageOverlay(layer, options);
				};

				L.ImageOverlay.include({
				    _visible: true,
				    _loaded: false,

				    _originalUpdate: L.imageOverlay.prototype._update,

				    _update: function() {
				        if (!this._visible && this._loaded) {
				            return;
				        }
				        this._originalUpdate();
				    },

				    setLoaded: function(loaded) {
				        this._loaded = loaded;
				    },

				    isLoaded: function() {
				        return this._loaded;
				    },

				    hide: function() {
				        this._visible = false;
				        if (this._image && this._image.style)
				            this._image.style.display = 'none';
				    },

				    show: function() {
				        this._visible = true;
				        if (this._image && this._image.style)
				            this._image.style.display = 'block';
				    },

				    getURL: function() {
				        return this._url;
				    },

				});
				/*L.control.timeDimension({
					backwardButton : false
				}).addTo(Aagwa_config[aagwa_features].map)*/
				var imageUrl = 'https://www.socib.es/users/mobims/imageArchive/clm/sirena/clm/c04/2014/01/11/clm_s_04_2014-01-01-12-00.png',
				    imageBounds = [
				        [38.69, 1.1675],
				        [38.71, 1.1325]
				    ];

				var imageLayer = L.imageOverlay(imageUrl, imageBounds, {
				    opacity: 0.5
				});

				/*Date.prototype.format = function (mask, utc) {
				    return Highcharts.dateFormat(this, mask, utc);
				};*/

				var getSirenaImageUrl = function(baseUrl, time) {
				    var beginUrl = baseUrl.substring(0, baseUrl.lastIndexOf("/") - 10);
				    //console.log("beginUrl")
				    //console.log(beginUrl)
				    beginUrl = beginUrl + new Date(time).format('yyyy/mm/dd');
				    var strTime = new Date(time).format('yyyy-mm-dd-HH-MM');
				    var initFileUrl = baseUrl.substring(baseUrl.lastIndexOf("/"), baseUrl.length - 20);
				    url = beginUrl + initFileUrl + strTime + '.png';
				    return url;
				};

				/*var testImageTimeLayer = L.timeDimension.layer.imageOverlay(imageLayer, {
				    getUrlFunction: getSirenaImageUrl
				});
				//let testImageTimeLayer = L.timeDimension.layer(Aagwa_config[aagwa_features].baseMaps.BaseLayer, {});
				testImageTimeLayer.addTo(Aagwa_config[aagwa_features].map);*/


				//Aagwa_config[aagwa_features].map.setCurrentTime(0)
				
				/*Aagwa_config[aagwa_features].map.on("timeloading",(data)=>{
					//console.log("loading timedimension-----------------------")
					//console.log("data")
					//console.log(data)
				})
				Aagwa_config[aagwa_features].map.on("timeload",(data)=>{
					//console.log("loading timedimension------------------------")
					//console.log("data")
					//console.log(data)
				})*/
				/*Aagwa_config[aagwa_features].map.timeDimension.on("play",(data)=>{
					//console.log("data Player")
					//console.log(data)
				})*/
			}

			console.log("Aagwa_config[aagwa_features]");
			console.log(Aagwa_config[aagwa_features].map);
			//Aagwa_config[aagwa_features].map.on("load",(data)=>{
				console.log("loading timedimension-----------------------")
				if( settings.hasOwnProperty("timeDimensionConfig") && settings["timeDimensionConfig"]["config"].hasOwnProperty("okForTimeDimension") && settings["timeDimensionConfig"]["config"]["okForTimeDimension"] === true ){
					const start_date = settings["timeDimensionConfig"]["config"]["timeDimensionOptions"]["timeInterval"].split("/")[0]
					console.log("momo=================")
					let testImageTimeLayer = L.timeDimension.layer(Aagwa_config[aagwa_features].baseMaps.BaseLayer, {});
					testImageTimeLayer.addTo(Aagwa_config[aagwa_features].map);
					Aagwa_config[aagwa_features].map.timeDimension.setCurrentTime(0);
					//console.log("Aagwa_config[aagwa_features].map.control.timeDimension--------")
					//console.log(Aagwa_config[aagwa_features].map.timeDimension.getAvailableTimes().length)
					/*Aagwa_config[aagwa_features].map.timeDimension.getAvailableTimes().forEach((time)=>{
						let strTime = new Date(time);
						let date = strTime.getDate();
						if (date < 10)
							date = `0${date}`;
						let month = strTime.getMonth()+1
						if(month<10)
							month = `0${month}`;
						// //console.log("strTime")
						//console.log(`${strTime.getFullYear()}-${month}-${date}`)
					})*/
					////console.log(Aagwa_config[aagwa_features].map.timeDimensionControl._player.on)

					/*Aagwa_config[aagwa_features].map.timeDimension.on("timeloading",(data2)=>{
						// //console.log("timeloading timedimension-----------------------")
						// //console.log("data2")
						// //console.log(data2)
						let strTime = new Date(data2["time"]);
						let date = strTime.getDate();
						if (date < 10)
							date = `0${date}`;
						let month = strTime.getMonth()+1
						if(month<10)
							month = `0${month}`;
						// //console.log("strTime")
						//console.log(`${strTime.getFullYear()}-${month}-${date}`)
					})*/
					Aagwa_config[aagwa_features].map.on('layeradd', (event)=>{
						//console.log("load layer")
						// if(config.hasOwnProperty("player")){
						Aagwa_config[aagwa_features].map.timeDimensionControl._player.release();
						// }
					})
					/*Aagwa_config[aagwa_features].layer.on('load', (event)=>{
						//console.log("load layer")
						if(config.hasOwnProperty("player")){
							config["player"].release();
						}
					})*/
					Aagwa_config[aagwa_features].map.timeDimension.on("timeload",async (data2)=> {
						//console.log("timeload timedimension------------------------")

						let strTime = new Date(data2["time"]);
						let date = strTime.getDate();
						if (date < 10)
							date = `0${date}`;
						let month = strTime.getMonth()+1
						if(month<10)
							month = `0${month}`;
						// //console.log("strTime")
						const end_week = `${strTime.getFullYear()}-${month}-${date}`;
						// //console.log(`${strTime.getFullYear()}-${month}-${date}`);
						Aagwa_config[aagwa_features].map.timeDimensionControl._player.pause();
						const availableTimes = Aagwa_config[aagwa_features].map.timeDimension.getAvailableTimes();
						let previousTime = availableTimes[availableTimes.indexOf(data2["time"])-1];

						previousTime = new Date(previousTime)
						let date_prev = previousTime.getDate();
						if (date_prev < 10)
							date_prev = `0${date_prev}`;
						let month_prev = previousTime.getMonth()+1
						// //console.log("month_prev")
						// //console.log("month_prev :",month_prev)
						if(month_prev < 10)
							month_prev = `0${month_prev}`;
						const start_week = `${previousTime.getFullYear()}-${month_prev}-${date_prev}`;
						// //console.log(data2);

						//console.log("month_prev : ",start_week,end_week);

						const week_data= await AdmindUtils.getLastData(settings["timeDimensionConfig"]["get_data_between_week"](start_week,end_week));
						Aagwa_config.launchMapCustom(week_data[0],{"feature":aagwa_features,"player":Aagwa_config[aagwa_features].map.timeDimensionControl._player});
						////console.log("week_data");
						////console.log(week_data[0]["file"]);
						// Aagwa_config[aagwa_features].map.timeDimensionControl._player.release();

					})
					Aagwa_config[aagwa_features].map.timeDimensionControl._player.on("play",(data)=>{
						// data.preventDefault()
						// console.log("data Player")
						// console.log(data)
					})
					// settings["timeDimensionConfig"]["config"]["timeDimensionOptions"]["timeInterval"] = `${dataInterval[0]["start_week"]}/${dataInterval[0]["end_week"]}`;
					// //console.log('settings["timeDimensionConfig"]["config"]');
					// //console.log(settings["timeDimensionConfig"]["config"]);
					// settings["timeDimensionConfig"]["config"]["okForTimeDimension"] = true;
				}	
				
			//})

			if(settings.hasOwnProperty("config") && typeof(settings["config"]) === "object"){
				const initial_settings = settings;
				if( initial_settings && typeof(initial_settings) === "object" && initial_settings.hasOwnProperty("config") && typeof(initial_settings["config"]) === "object" && initial_settings["config"].hasOwnProperty("events") && typeof(initial_settings["config"]["events"]) === "object" ){
					//console.log('initial_settings["config"]["events"]');
					//console.log(initial_settings["config"]["events"]);
					const events_list = initial_settings["config"]["events"];
					if( events_list.hasOwnProperty("map") && typeof(events_list["map"]) === "object"){
						//console.log('events_list["map"]')
						//console.log(events_list["map"])
						for( event_item in events_list["map"]){
							Aagwa_config[aagwa_features].map.on(event_item, (event)=>{
								//console.log("clickedddddddd")
								events_list["map"][event_item](Aagwa_config[aagwa_features],event);
							})
						}
					}
				}
			}
			
			// aagwa.LoadModuleForm(configPrediction);
			settings["config"]["features"] = aagwa_features;
			aagwa.LoadModuleForm(settings["config"]);

		},
	    async initializeGeoJsonTab(settings){
	    	const feature = settings.feature;
	    	const rows_container = `fullscreen2-${feature}`;
	    	const li = `<li><a class="defer-visualization" data-feature="${feature}" data-is_tab_loaded="false" data-function_to_load = "${settings.function_to_load}" id="${settings.node_id}">${settings.tab_title}</a></li>`;
	    	const div = `<div>
						    <div class="row">
						        <div class="col-lg-12 col-sm-12 iq-sm-mt-30 ok" id="fullscreen2-${feature}" class="fullscreen2">
						        </div>
						    </div>
						</div>`;
			document.getElementById(settings.li_container).insertAdjacentHTML("beforeend", li);
			document.getElementById(settings.div_container).insertAdjacentHTML("beforeend", div);
			Aagwa_config[feature] = {
				"settings" : settings
			};
			Aagwa_config[feature]["settings"]["rows_container"] = rows_container;

	    },
		launchMap(settings) {
			//update_dataset_links();
			/*Aagwa_config.map.removeLayer(Aagwa_config.layer);
			Aagwa_config.map.removeLayer(Aagwa_config.baseMaps.DarkMatter);
			Aagwa_config.map.removeLayer(Aagwa_config.baseMaps.NatGeoWorldMap);
			Aagwa_config.map.removeLayer(Aagwa_config.baseMaps.WorldStreetMap);
			Aagwa_config.map.removeLayer(Aagwa_config.baseMaps.WorldImagery);
			Aagwa_config.map.removeLayer(Aagwa_config.noBasemap);*/
			Aagwa_config.baseMaps.BaseLayer.addTo(Aagwa_config.map);
			/*Aagwa_config.map.removeLayer(country);
			Aagwa_config.map.removeLayer(region);
			Aagwa_config.map.removeLayer(commune);
			Aagwa_config.map.removeControl(control);*/
			
			// Aagwa_config.map.removeControl(Aagwa_config.zoomHome);
			if(Aagwa_config.bar1){
				Aagwa_config.bar1.remove();
			}
		   if(Aagwa_config.bar){
				Aagwa_config.bar.remove(Aagwa_config.map);
			}

			const file = settings["file"];
			//var y = arg_year.substring(0, 4);
			//d3.request("data/" + arg_country + "/" + arg_crop + "/" + arg_product + "/" + arg_year + "/" + arg_country + "_Predicted_" + arg_crop + "_" + arg_product + "_" + y + ".tif?v=<?php echo microtime(); ?>").responseType('arraybuffer').get(
			//console.log("settings");
			//console.log(settings);
			//console.log(`${General_config.data_url}/${file}`)
			d3.request(`${General_config.data_url}/${file}?v=<?php echo microtime(); ?>`).responseType('arraybuffer').get(
				function (error, tiffData) {
					//console.log(tiffData);
					//Add product layer to map
					let prod = L.ScalarField.fromGeoTIFF(tiffData.response);

					// //console.log(prod.range[1]);
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


					 Aagwa_config.layer = L.canvasLayer.scalarField(prod,
						{
							color: chroma.scale('spectral').domain(prod.range),
							inFilter: (v) => v !== 0
						}).addTo(Aagwa_config.map);

					// Map Home button
					Aagwa_config.zoomHome = L.Control.zoomHome();
					Aagwa_config.zoomHome.setHomeCoordinates(Aagwa_config.layer.getBounds().getCenter());
					Aagwa_config.zoomHome.setHomeZoom(6);
					Aagwa_config.zoomHome.addTo( Aagwa_config.map);


					//Change colorBar color when basemap changes - And add Level0 layer when no basemap selected
					Aagwa_config.map.on('baselayerchange', onbaselayerchange);

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
								 Aagwa_config.map.addLayer(country);
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
						.addTo( Aagwa_config.map)
						.open('ag_production');

					//Legend
					var range = prod.range;
					var scale = chroma.scale('spectral').domain(range);
					//var title_bar = (arg_product == "Production") ? 'Predicted ' + arg_crop + ' production (Metric tons)' : 'Predicted ' + arg_crop + ' yield (MT/ha)';
					var title_bar = ' yield (MT/ha)';
					var unit_bar = 'MT/ha';
					//var unit_bar = (arg_product == "Production") ? 'MT' : 'MT/ha';

					 Aagwa_config.bar1 = L.control.colorBar(scale, range, {
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
					}).addTo( Aagwa_config.map);


					Aagwa_config.layer.on('click', function (e) {
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
								.openOn(Aagwa_config.map);
						}
					});

					//Triggered default click
					// L.popup().setLatLng({lat: 14.360191158370366, lng: -15.373134613037111}).setContent(
					//   '<span class="popupText">Predicted millet production: 419.21 Tons</span>').openOn(map);


					 Aagwa_config.bar = '';

					var colorscaleSelect = document.getElementById("ex1_colorscaleselect");
					colorscaleSelect.addEventListener('change', function () {
						var scale = chroma.scale(this.value).domain(prod.range);
						 Aagwa_config.layer.setColor(scale);


						//Legend
						 Aagwa_config.bar1.remove(map);
						if ( Aagwa_config.bar != '') {
							 Aagwa_config.bar.remove(map);
						}
						var range = prod.range;
						var scale = chroma.scale(this.value).domain(prod.range);

						 Aagwa_config.bar = L.control.colorBar(scale, range, {
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
						}).addTo( Aagwa_config.map);

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
						Aagwa_config.layer.setFilter(f);
					};


					 Aagwa_config.map.fitBounds(Aagwa_config.layer.getBounds());


				});
			// overlays_func(arg_country);

		},
		
		
		async launchCogMapCustom(data,config) {
			if(!Aagwa_config.hasOwnProperty("mapDataLevel1")){
                await Aagwa_config.get_country_geojson_level0();
            }
			console.log("data");
			console.log(data);
			//console.log("config");
			//console.log(config);
			//return ;

			const aagwa_features = config["feature"];
			//console.log("Aagwa_config");
			//console.log(Aagwa_config);

			/*if( !Aagwa_config.hasOwnProperty(aagwa_features) ){
				return ;
			}*/
			//console.log(Aagwa_config[aagwa_features]);
			Aagwa_config[aagwa_features].data_current_selection = data;

			const initial_settings = Aagwa_config[aagwa_features]["settings"] ;
			Aagwa_config[aagwa_features].map.eachLayer(function (layer) {
			     Aagwa_config[aagwa_features].map.removeLayer(layer);
			});
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(Aagwa_config[aagwa_features].map);

			/*if(Aagwa_config[aagwa_features].layer){
				//console.log("Aagwa_config[aagwa_features].layer")
				//console.log(Aagwa_config[aagwa_features].layer)
				Aagwa_config[aagwa_features].map.removeLayer(Aagwa_config[aagwa_features].layer);
			}*/

			if(Aagwa_config[aagwa_features].bar1){
				Aagwa_config[aagwa_features].bar1.remove();
			}
		   	if(Aagwa_config[aagwa_features].bar){
				Aagwa_config[aagwa_features].bar.remove(Aagwa_config[aagwa_features].map);
			}

			if(Aagwa_config[aagwa_features].mapLegend){
                Aagwa_config[aagwa_features].map.removeControl(Aagwa_config[aagwa_features].mapLegend);
            }

			const file = data["file"];

			//const url_to_geotiff_file = "http://localhost:8888/cog-leaflet/Benin_Rize_cog.tif";
			const url_to_geotiff_file = `${General_config.data_url}/${file}`;

			if( initial_settings.hasOwnProperty("addTiffLinkForDownloadAndCitation") && initial_settings.hasOwnProperty("addTiffLinkForDownloadAndCitation") === true && initial_settings.hasOwnProperty("setTiffLinkForDownloadAndCitation") && typeof(initial_settings["setTiffLinkForDownloadAndCitation"]) === "function" ){
				initial_settings["setTiffLinkForDownloadAndCitation"]({
					"feature" : aagwa_features,
					"geottif_src" : url_to_geotiff_file,
					"data" : data
					/*"geottif_src_nodeId" : `${aagwa_features}-geottif_src`,
					"print_map_title_nodeId" : `${aagwa_features}-print_map_title`
					"download_geottif_title_nodeId" : `${aagwa_features}-download_geottif_title`
					"citation_print_map_nodeId" : `${aagwa_features}-citation_print_map`
					"citation_geottif_nodeId" : `${aagwa_features}-citation_geottif`*/
				})
			}

			//console.log("url_to_geotiff_file");
			//console.log(url_to_geotiff_file);


		 	/*fetch(url_to_geotiff_file)
	        .then(response => response.arrayBuffer())
	        .then(arrayBuffer => {
	          parseGeoraster(arrayBuffer).then(georaster => {
	          	//console.log(georaster)
	            const min = georaster.mins[0];
	            const max = georaster.maxs[0];
	            const range = georaster.ranges[0];

	            // available color scales can be found by running //console.log(chroma.brewer);
	            //console.log(chroma.brewer);
	            var scale = chroma.scale("Viridis");

	            var layer = new GeoRasterLayer({
	                georaster: georaster,
	                opacity: 0.7,
	                pixelValuesToColorFn: function(pixelValues) {
	                  var pixelValue = pixelValues[0]; // there's just one band in this raster

	                  // if there's zero wind, don't return a color
	                  if (pixelValue === 0) return null;

	                  // scale to 0 - 1 used by chroma
	                  var scaledPixelValue = (pixelValue - min) / range;

	                  var color = scale(scaledPixelValue).hex();

	                  return color;
	                },
	                resolution: 256
	            });
	            //console.log("layer:", layer);
	            Aagwa_config[aagwa_features].layer.addTo(map);

	            Aagwa_config[aagwa_features].map.fitBounds(layer.getBounds());
	          });
	        });*/
	        console.log("url_to_geotiff_file")
	        console.log(url_to_geotiff_file)
			const fetch_tif = initial_settings.hasOwnProperty("fetch_tif") && initial_settings["fetch_tif"] === true ? true : false;
	        if(fetch_tif){

	        	fetch(url_to_geotiff_file)
		        .then(response => response.arrayBuffer())
		        .then(arrayBuffer => {

		        	parseGeoraster(arrayBuffer).then(georaster => {
						//console.log( georaster);
						let max=1000,min=0,range=0;
						if( georaster.hasOwnProperty("maxs") && georaster.hasOwnProperty("mins")){
							if( !Aagwa_config[aagwa_features].hasOwnProperty("generated_settings") ){
								Aagwa_config[aagwa_features]["generated_settings"] = {} ;
							}
							Aagwa_config[aagwa_features]["generated_settings"]["min"] = georaster["maxs"][0];
							Aagwa_config[aagwa_features]["generated_settings"]["max"] = georaster["mins"][0];
							Aagwa_config[aagwa_features]["generated_settings"]["range"] = georaster["ranges"][0];
							max = Aagwa_config[aagwa_features]["generated_settings"]["max"];
							min = Aagwa_config[aagwa_features]["generated_settings"]["min"];
							range = Aagwa_config[aagwa_features]["generated_settings"]["range"];
						}
						
			            // const min = georaster.mins[0];
			            // const max = georaster.maxs[0];
			            // const range = georaster.ranges[0];

							// GeoRasterLayer is an extension of GridLayer,
							// which means can use GridLayer options like opacity.

							// Just make sure to include the georaster option!

							// http://leafletjs.com/reference-1.2.0.html#gridlayer
						
						////console.log(Aagwa_config[aagwa_features]["settings"])
						if(Aagwa_config[aagwa_features].hasOwnProperty("settings") && Aagwa_config[aagwa_features]["settings"].hasOwnProperty("geoRasterLayer")){
							Aagwa_config[aagwa_features].layer = new GeoRasterLayer(Aagwa_config[aagwa_features]["settings"]["geoRasterLayer"](georaster,max,min,range));
						}
						else{
							Aagwa_config[aagwa_features].layer = new GeoRasterLayer({
								attribution: "Planet",
								georaster: georaster,
								resolution: 128
							});

						}
						//console.log(Aagwa_config[aagwa_features].layer.getBounds());

						Aagwa_config[aagwa_features].layer.addTo(Aagwa_config[aagwa_features].map);

						Aagwa_config[aagwa_features].map.fitBounds(Aagwa_config[aagwa_features].layer.getBounds());

					});
		        });
	        }
	        else{
	        	console.log("mo---------------------")
	        	console.log(url_to_geotiff_file)
				parseGeoraster(url_to_geotiff_file).then(georaster => {
					console.log( "georaster");
					console.log( georaster);
					//return ;
					//console.log(georaster.getMapCRS())
						// GeoRasterLayer is an extension of GridLayer,
						// which means can use GridLayer options like opacity.

						// Just make sure to include the georaster option!

						// http://leafletjs.com/reference-1.2.0.html#gridlayer
					
					console.log(Aagwa_config[aagwa_features]["settings"])
					if(Aagwa_config[aagwa_features].hasOwnProperty("settings") && Aagwa_config[aagwa_features]["settings"].hasOwnProperty("geoRasterLayer")){
						console.log("nomo++++++++++++++")
						Aagwa_config[aagwa_features].layer = new GeoRasterLayer(Aagwa_config[aagwa_features]["settings"]["geoRasterLayer"](georaster,aagwa_features,Aagwa_config[aagwa_features]["settings"]["setMaxMin"]));
						
					}
					else{
						Aagwa_config[aagwa_features].layer = new GeoRasterLayer({
							attribution: "Planet",
							georaster: georaster,
							resolution: 128,
							//proj4 :proj4("EPSG:3857",'EPSG:4326')
							mask_srs : "EPSG:3857"
						});

					}
					/*Aagwa_config[aagwa_features].layer.on('click',(evt)=>{
						//console.log("evt layer");
						//console.log(evt);
					})*/
					////console.log(Aagwa_config[aagwa_features].layer.getBounds());
					Aagwa_config[aagwa_features].layer.addTo(Aagwa_config[aagwa_features].map);


					// Map Home button
					// Aagwa_config[aagwa_features].zoomHome = L.Control.zoomHome();
					//Aagwa_config[aagwa_features].zoomHome.setHomeCoordinates(Aagwa_config[aagwa_features].layer.getBounds().getCenter());
					// Aagwa_config[aagwa_features].zoomHome.setHomeZoom(6);
					// Aagwa_config[aagwa_features].zoomHome.addTo( Aagwa_config[aagwa_features].map);

					const title_bar = "";
					const unit_bar = "";

					// const scale = chroma.scale('spectral');
					//console.log("Aagwa_config[aagwa_features].layer")
					//console.log(Aagwa_config[aagwa_features].layer)
					//console.log(Aagwa_config[aagwa_features].layer.getMapCRS())
					/*georaster.getValues("palette").then(palette=>{
						//console.log("palette");
						//console.log(palette);
					})*/
					//const range = [0,1];
					//const scale = chroma.scale(['white', 'black'])


					/*let range = [0,1];
					let scale;
					if( Aagwa_config[aagwa_features].settings.hasOwnProperty("range_domain") && Array.isArray(Aagwa_config[aagwa_features].settings["range_domain"]) && Aagwa_config[aagwa_features].settings["range_domain"].length > 0 ){
						console.log('Aagwa_config[aagwa_features].settings["range_domain"]')
						console.log(Aagwa_config[aagwa_features].settings["range_domain"])
						scale = chroma.scale(this.value).domain(Aagwa_config[aagwa_features].settings["range_domain"]);
						range = Aagwa_config[aagwa_features].settings["range_domain"];
					}
					else{
						scale = chroma.scale(this.value);
					}*/

					if( Aagwa_config[aagwa_features].settings.hasOwnProperty("legend") && typeof(Aagwa_config[aagwa_features].settings["legend"]) === "function"){
						// L.control.scale().addTo(Aagwa_config[aagwa_features].map);
						/*if(Aagwa_config[aagwa_features].legend){
							//Aagwa_config[aagwa_features].legend.remove();
							
						}*/



						let legend = Aagwa_config[aagwa_features].settings["legend"](aagwa_features,data);

						//console.log("Aagwa_config[aagwa_features].map");
						//console.log(Aagwa_config[aagwa_features].map);

						Aagwa_config[aagwa_features].mapLegend.addTo(Aagwa_config[aagwa_features].map)
					}


					if( Aagwa_config[aagwa_features].settings.hasOwnProperty("bar_config")){
						if( typeof(Aagwa_config[aagwa_features].settings["bar_config"]) === "function" ){

							const conf_extra = {
								"title" : title_bar,
								"units" :unit_bar,
								"chroma" : chroma,
								"feature" : aagwa_features
							}
							const result_bar_config = Aagwa_config[aagwa_features].settings["bar_config"](data,{"title":title_bar});
							if( result_bar_config ){
								Aagwa_config[aagwa_features].bar = result_bar_config.addTo(Aagwa_config[aagwa_features].map);
								// Aagwa_config[aagwa_features].bar = Aagwa_config[aagwa_features].settings["bar_config"](data,{"title":title_bar}).addTo(Aagwa_config[aagwa_features].map);
							}
						}
						
						/*Aagwa_config[aagwa_features].bar = L.control.colorBar(scale, range, {
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
						}).addTo( Aagwa_config[aagwa_features].map);*/

					}
					else{
					Aagwa_config[aagwa_features].bar = L.control.colorBar(chroma.scale('spectral'), [0,1],{
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
						}).addTo( Aagwa_config[aagwa_features].map);
					}

					if( Aagwa_config[aagwa_features].settings.hasOwnProperty("add_ex1_colorscaleselect") && Aagwa_config[aagwa_features].settings["add_ex1_colorscaleselect"] === true ){

						const colorscaleSelect = Aagwa_config[aagwa_features].settings.hasOwnProperty("ex1_colorscaleselect") ? Aagwa_config[aagwa_features].settings["ex1_colorscaleselect"] : `${aagwa_features}-ex1_colorscaleselect` ;
						const node_colorscaleSelect = document.getElementById(colorscaleSelect);

						if(node_colorscaleSelect){
							node_colorscaleSelect.addEventListener('change', function () {
								
								console.log("Aagwa_config[aagwa_features]['ex1_min']");
								console.log(Aagwa_config[aagwa_features]["ex1_min"]);

								const ex1_min = Aagwa_config[aagwa_features].settings.hasOwnProperty("ex1_min") ? Aagwa_config[aagwa_features].settings["ex1_min"] : `${aagwa_features}-ex1_min` ;
								const ex1_max = Aagwa_config[aagwa_features].settings.hasOwnProperty("ex1_max") ? Aagwa_config[aagwa_features].settings["ex1_max"] : `${aagwa_features}-ex1_max` ;

								console.log("ex1_min");
								console.log(ex1_min);

								console.log("ex1_max");
								console.log(ex1_max);

								const min_el= document.getElementById(ex1_min);
								const max_el= document.getElementById(ex1_max);


								let range = [0,1];
								let scale;
								if( Aagwa_config[aagwa_features].settings.hasOwnProperty("range_domain") && Array.isArray(Aagwa_config[aagwa_features].settings["range_domain"]) && Aagwa_config[aagwa_features].settings["range_domain"].length > 0 ){
									console.log('Aagwa_config[aagwa_features].settings["range_domain"]')
									console.log(Aagwa_config[aagwa_features].settings["range_domain"])
									scale = chroma.scale(this.value).domain(Aagwa_config[aagwa_features].settings["range_domain"]);
									range = Aagwa_config[aagwa_features].settings["range_domain"];
								}
								else{
									scale = chroma.scale(this.value);
								}
								
								//Aagwa_config[aagwa_features].layer.setColor(scale);
								if( Aagwa_config[aagwa_features].layer.hasOwnProperty("updateColors") ){
									Aagwa_config[aagwa_features].layer.updateColors((values)=>{
										//const scale = chroma.scale("spectral");
	               						
					                    if(values[0] != 0 && values[0] > min_el.value && values[0] <= max_el.value ){
					                    	// console.log("values");
		               						// console.log(values);
		               						// console.log("min_el.value");
		               						// console.log(min_el.value);
		               						// console.log("max_el.value");
		               						// console.log(max_el.value);
					                        // //console.log(values[0]);
					                        // return '#000000';
					                        // return '#FBBD2E';
					                        //return scale(values[0]).hex();
					                        // return chroma.scale(['white', 'black'])(values[0]).hex();
					                        return scale(values[0]).hex();
					                    }
									})
								}
								//Legend
								// Aagwa_config[aagwa_features].bar1.remove(map);
								// console.log("Aagwa_config[aagwa_features].bar")
								// console.log(Aagwa_config[aagwa_features].bar)
								if ( typeof(Aagwa_config[aagwa_features].bar) != "undefined" && Aagwa_config[aagwa_features].bar != '') {
									Aagwa_config[aagwa_features].bar.remove(Aagwa_config[aagwa_features].map);
								}

								// var range = prod.range;
								// var scale = chroma.scale(this.value).domain(prod.range);
								console.log("Aagwa_config[aagwa_features].settings");
								console.log(Aagwa_config[aagwa_features].settings);
								if( Aagwa_config[aagwa_features].settings.hasOwnProperty("bar_config")){


									/*const conf_extra = {
										"title" : title_bar,
										"units" :unit_bar,
										"chroma" : chroma,
										"feature" : aagwa_features
									}
									const result_bar_config = Aagwa_config[aagwa_features].settings["bar_config"](data,{"title":title_bar});
									if( result_bar_config ){
										Aagwa_config[aagwa_features].bar = result_bar_config.addTo(Aagwa_config[aagwa_features].map);
										// Aagwa_config[aagwa_features].bar = Aagwa_config[aagwa_features].settings["bar_config"](data,{"title":title_bar}).addTo(Aagwa_config[aagwa_features].map);
									}*/

									if( typeof(Aagwa_config[aagwa_features].settings["bar_config"]) === "function" ){
										Aagwa_config[aagwa_features].bar = Aagwa_config[aagwa_features].settings["bar_config"]({"scale":scale,"range":range}).addTo(Aagwa_config[aagwa_features].map);
									}
									/*Aagwa_config[aagwa_features].bar = L.control.colorBar(scale, range, {
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
									}).addTo( Aagwa_config[aagwa_features].map);*/

								}
								else{
									Aagwa_config[aagwa_features].bar = L.control.colorBar(scale, range, {
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
									}).addTo( Aagwa_config[aagwa_features].map);
								}
								// //console.log(Aagwa_config[aagwa_features].layer)
								/*const active = control.getOverlays();

								//console.log("active");
								//console.log(active);
								if (active.DarkMatter || active.WorldImagery) {
									document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
										el.style.color = 'white';
									});

								}*/

								const active = Aagwa_config[aagwa_features]["settings"]["active_layer"];
								if (active === "DarkMatter" || active === "WorldImagery" ) {
									document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
										el.style.color = 'white';
									});

								}
							});
						}
					}

					/*Aagwa_config[aagwa_features].layer.on('tileload', (event)=>{
						//console.log("tileload event--------------------------------");
						//console.log(event);
					});*/

					Aagwa_config[aagwa_features].layer.on('load', (event)=>{
						//console.log("Aagwa_config[aagwa_features]--------------------------------");
						//console.log(Aagwa_config[aagwa_features]);
						/*if( Aagwa_config[aagwa_features]["settings"].hasOwnProperty("max_value") && Aagwa_config[aagwa_features]["settings"].hasOwnProperty("min_value") ){

						}*/
						console.log('Aagwa_config[aagwa_features].settings["tabValues"]')
						console.log(Aagwa_config[aagwa_features].settings["tabValues"])
						if( Aagwa_config[aagwa_features].settings.hasOwnProperty("add_event_max_min") && Aagwa_config[aagwa_features].settings["add_event_max_min"] === true && Aagwa_config[aagwa_features]["settings"].hasOwnProperty("max_value") && Aagwa_config[aagwa_features]["settings"].hasOwnProperty("min_value") ){

							console.log('Aagwa_config[aagwa_features].settings');
							console.log(Aagwa_config[aagwa_features].settings);
							const feature_settings = Aagwa_config[aagwa_features].settings;
							//console.log("feature_settings")
							//console.log(feature_settings)
							const ex1_min = feature_settings.hasOwnProperty("ex1_min") ? feature_settings["ex1_min"] : `${aagwa_features}-ex1_min` ;
							const ex1_max = feature_settings.hasOwnProperty("ex1_max") ? feature_settings["ex1_max"] : `${aagwa_features}-ex1_max` ;
							
							// Aagwa_config.cropp_mapping_map.on('baselayerchange', onbaselayerchange);

							const min_el= document.getElementById(ex1_min);
							const max_el= document.getElementById(ex1_max);


							// //console.log(prod.range[1]);
							const minim = Math.floor(Aagwa_config[aagwa_features]["settings"]["min_value"]);
							const maxim = Math.ceil(Aagwa_config[aagwa_features]["settings"]["max_value"]);

							//console.log(minim)
							//console.log(maxim)

							/*document.getElementById("ex1_min").min = minim;
							document.getElementById("ex1_min").max = maxim;
							document.getElementById("ex1_max").min = minim;
							document.getElementById("ex1_max").max = maxim;

							document.getElementById("ex1_min").setAttribute('value', minim);
							document.getElementById("ex1_max").setAttribute('value', maxim);*/


							min_el.min = minim;
							min_el.max = maxim;
							max_el.min = minim;
							max_el.max = maxim;

							min_el.setAttribute('value', minim);
							max_el.setAttribute('value', maxim);

							min_el.setAttribute('step', 'any');
							max_el.setAttribute('step', 'any');



							// const min_el = document.getElementById("ex1_min");
							// const max_el = document.getElementById("ex1_max");


							// const rangeV_min = document.getElementById("rangeV_min");
							// const rangeV_max = document.getElementById("rangeV_max");


							const rangeV_min_id = feature_settings.hasOwnProperty("rangeV_min") ? feature_settings["rangeV_min"] : `${aagwa_features}-rangeV_min`;
							const rangeV_max_id = feature_settings.hasOwnProperty("rangeV_max") ? feature_settings["rangeV_max"] : `${aagwa_features}-rangeV_max`;

							const rangeV_min = document.getElementById(rangeV_min_id);
							const rangeV_max = document.getElementById(rangeV_max_id);

							rangeV_min.style.display = "none";
							rangeV_max.style.display = "none";


							setValue_min = (event) => {
								const newValue = Number(
										((min_el.value - min_el.min) ) / (min_el.max - min_el.min)
									),

									newPosition = 10 - newValue * 0.5;
								//rangeV_min.innerHTML = `<span>${min_el.value}</span>`;
								//rangeV_min.style.left = `calc(${newValue}% + (${newPosition}px))`;

								const colorscaleSelect = Aagwa_config[aagwa_features].settings.hasOwnProperty("ex1_colorscaleselect") ? Aagwa_config[aagwa_features].settings["ex1_colorscaleselect"] : `${aagwa_features}-ex1_colorscaleselect` ;
									const node_colorscaleSelect = document.getElementById(colorscaleSelect);
									const scale = chroma.scale(node_colorscaleSelect.value);


								if(event){
									if(Aagwa_config[aagwa_features].layer.hasOwnProperty("updateColors")){
										Aagwa_config[aagwa_features].layer.updateColors((values)=>{
											//const scale = chroma.scale("spectral");
		               						////console.log(values);
						                    if( values[0] > min_el.value && values[0] <= max_el.value ){
						                        // //console.log(values[0]);
						                        // return '#000000';
						                        // return '#FBBD2E';
						                        //return scale(values[0]).hex();
						                        // return chroma.scale(['white', 'black'])(values[0]).hex();
						                        return scale(values[0]).hex();
						                    }
										})
									}
								}
								else{
									//console.log("not redrawed");
								}
							};
							setValue_max = (event) => {
								//console.log("event")
								//console.log(event)
								////console.log("mo")
								/*const newValue = Number(
										((max_el.value - max_el.min)) / (max_el.max - max_el.min)
									);*/
								//console.log(max_el.style)
								const newValue = max_el.value;
								const newPosition = 125 - newValue;
								
								//console.log(newValue)
								//rangeV_max.innerHTML = `<span>${max_el.value}</span>`;
								//rangeV_max.style.left = `calc(${newValue}% + (${newPosition}px))`;

								const colorscaleSelect = Aagwa_config[aagwa_features].settings.hasOwnProperty("ex1_colorscaleselect") ? Aagwa_config[aagwa_features].settings["ex1_colorscaleselect"] : `${aagwa_features}-ex1_colorscaleselect` ;
									const node_colorscaleSelect = document.getElementById(colorscaleSelect);
									const scale = chroma.scale(node_colorscaleSelect.value);


								if(event){
									if(Aagwa_config[aagwa_features].layer.hasOwnProperty("updateColors")){
										Aagwa_config[aagwa_features].layer.updateColors((values)=>{
											//const scale = chroma.scale("spectral");
		               						////console.log(values);
						                    if( values[0] > min_el.value && values[0] <= max_el.value ){
						                        // //console.log(values[0]);
						                        // return '#000000';
						                        // return '#FBBD2E';
						                        //return scale(values[0]).hex();
						                        // return chroma.scale(['white', 'black'])(values[0]).hex();
						                        return scale(values[0]).hex();
						                    }
										})
									}
								}
								else{
									//console.log("not redrawed");
								}
							};
							setValue_min();
							setValue_max();
							min_el.addEventListener("input", setValue_min);
							max_el.addEventListener("input", setValue_max);
						}

						

					});


					Aagwa_config[aagwa_features].map.fitBounds(Aagwa_config[aagwa_features].layer.getBounds());
					//Aagwa_config[aagwa_features].map.fitBounds(Aagwa_config.getCountryParam().bound[0]);

					// //console.log('Aagwa_config[aagwa_features]["settings"]["max_value"]');
					// //console.log(Aagwa_config[aagwa_features]["settings"]["max_value"]);
					// //console.log('Aagwa_config[aagwa_features]["settings"]["min_value"]');
					// //console.log(Aagwa_config[aagwa_features]["settings"]["min_value"]);


				});
			}



		},
		launchMapCustom(data,config) {
			console.log("data");
			console.log(data);
			//console.log("config");
			//console.log(config);
			//return ;
			const aagwa_features = config["feature"];
			//console.log("Aagwa_config")
			//console.log(Aagwa_config)
			if( !Aagwa_config.hasOwnProperty(aagwa_features) ){
				return ;
			}

			Aagwa_config[aagwa_features].data_current_selection = data;
			//update_dataset_links();
			if(Aagwa_config[aagwa_features].layer){
				Aagwa_config[aagwa_features].map.removeLayer(Aagwa_config[aagwa_features].layer);
			}
			if(Aagwa_config[aagwa_features].baseMaps.DarkMatter){
				Aagwa_config[aagwa_features].map.removeLayer(Aagwa_config[aagwa_features].baseMaps.DarkMatter);
			}

			if(Aagwa_config[aagwa_features].baseMaps.NatGeoWorldMap){
				Aagwa_config[aagwa_features].map.removeLayer(Aagwa_config[aagwa_features].baseMaps.NatGeoWorldMap);
			}

			if(Aagwa_config[aagwa_features].baseMaps.WorldStreetMap){
				Aagwa_config[aagwa_features].map.removeLayer(Aagwa_config[aagwa_features].baseMaps.WorldStreetMap);
			}

			if(Aagwa_config[aagwa_features].baseMaps.WorldImagery){
				Aagwa_config[aagwa_features].map.removeLayer(Aagwa_config[aagwa_features].baseMaps.WorldImagery);
			}

			if(Aagwa_config[aagwa_features].noBasemap){
				Aagwa_config[aagwa_features].map.removeLayer(Aagwa_config[aagwa_features].noBasemap);
			}



			/*if ( Aagwa_config[aagwa_features].bar) {
				 Aagwa_config[aagwa_features].bar.remove(Aagwa_config[aagwa_features].map);
			}*/
			/*if(Aagwa_config[aagwa_features].zoomHome){
				//Aagwa_config[aagwa_features].map.removeLayer(Aagwa_config[aagwa_features].noBasemap);
				Aagwa_config[aagwa_features].zoomHome.remove();
			}
			*/
			if(Aagwa_config[aagwa_features].country){
				Aagwa_config[aagwa_features].map.removeLayer(Aagwa_config[aagwa_features].country);
			}

			if(Aagwa_config[aagwa_features].region){
				Aagwa_config.map.removeLayer(Aagwa_config[aagwa_features].region);
			}

			if(Aagwa_config[aagwa_features].commune){
				Aagwa_config.map.removeLayer(Aagwa_config[aagwa_features].commune);
			}

			/*if(Aagwa_config.bar1){
				Aagwa_config.map.removeControl(control);
			}*/

			Aagwa_config[aagwa_features].baseMaps.BaseLayer.addTo(Aagwa_config[aagwa_features].map);


			// control = L.control.layers(jFeature.baseMaps, overlays).addTo(jFeature.map);
            // jFeature.map.addLayer(country);
			
			// Aagwa_config.overlays_func(Aagwa_config[aagwa_features],Aagwa_config.country);
			
			// Aagwa_config.map.removeControl(Aagwa_config.zoomHome);
			if(Aagwa_config[aagwa_features].bar1){
				Aagwa_config[aagwa_features].bar1.remove();
			}
			/*if(Aagwa_config[aagwa_features].mapLegend){
				delete Aagwa_config[aagwa_features].mapLegend;
			}*/
		   if(Aagwa_config[aagwa_features].bar){
				Aagwa_config[aagwa_features].bar.remove(Aagwa_config[aagwa_features].map);
			}
		   /*if(Aagwa_config[aagwa_features].zoomHome){
				Aagwa_config[aagwa_features].bar.remove(Aagwa_config[aagwa_features].zoomHome);
			}*/

			const file = data["file"];
			//console.log("month_prev : ",file)
			//var y = arg_year.substring(0, 4);
			//d3.request("data/" + arg_country + "/" + arg_crop + "/" + arg_product + "/" + arg_year + "/" + arg_country + "_Predicted_" + arg_crop + "_" + arg_product + "_" + y + ".tif?v=<?php echo microtime(); ?>").responseType('arraybuffer').get(
			//console.log("data");
			//console.log(data);
			//console.log(`${General_config.data_url}/${file}`);
			if( Aagwa_config[aagwa_features].settings.hasOwnProperty("addTiffLinkForDownloadAndCitation") && Aagwa_config[aagwa_features].settings.hasOwnProperty("addTiffLinkForDownloadAndCitation") === true && Aagwa_config[aagwa_features].settings.hasOwnProperty("setTiffLinkForDownloadAndCitation") && typeof(Aagwa_config[aagwa_features].settings["setTiffLinkForDownloadAndCitation"]) === "function" ){
				Aagwa_config[aagwa_features].settings["setTiffLinkForDownloadAndCitation"]({
					"feature" : aagwa_features,
					"geottif_src" : `${General_config.data_url}/${file}`,
					"data" : data
				})
			}
			d3.request(`${General_config.data_url}/${file}?v=<?php echo microtime(); ?>`).responseType('arraybuffer').get(
				function (error, tiffData) {
					console.log(tiffData);
					//Add product layer to map
					let prod = L.ScalarField.fromGeoTIFF(tiffData.response);
					//console.log("prod");
					//console.log(prod);

					// Aagwa_config[aagwa_features]
					// if( config.hasOwnProperty("add_event_max_min") && config["add_event_max_min"] === "true" ){
					if(Aagwa_config[aagwa_features].mapLegend){
						console.log("romo+++++++++++++")
		                Aagwa_config[aagwa_features].map.removeControl(Aagwa_config[aagwa_features].mapLegend);
		            }
					if( Aagwa_config[aagwa_features].settings.hasOwnProperty("add_event_max_min") && Aagwa_config[aagwa_features].settings["add_event_max_min"] === true ){
						const feature_settings = Aagwa_config[aagwa_features].settings;
						//console.log("feature_settings")
						//console.log(feature_settings)
						const ex1_min = feature_settings.hasOwnProperty("ex1_min") ? feature_settings["ex1_min"] : `${aagwa_features}-ex1_min` ;
						const ex1_max = feature_settings.hasOwnProperty("ex1_max") ? feature_settings["ex1_max"] : `${aagwa_features}-ex1_max` ;
						
						// Aagwa_config.cropp_mapping_map.on('baselayerchange', onbaselayerchange);

						const min_el= document.getElementById(ex1_min);
						const max_el= document.getElementById(ex1_max);


						// //console.log(prod.range[1]);
						const minim = Math.floor(prod.range[0]);
						const maxim = Math.ceil(prod.range[1]);

						/*document.getElementById("ex1_min").min = minim;
						document.getElementById("ex1_min").max = maxim;
						document.getElementById("ex1_max").min = minim;
						document.getElementById("ex1_max").max = maxim;

						document.getElementById("ex1_min").setAttribute('value', minim);
						document.getElementById("ex1_max").setAttribute('value', maxim);*/


						min_el.min = minim;
						min_el.max = maxim;
						max_el.min = minim;
						max_el.max = maxim;

						min_el.setAttribute('value', minim);
						max_el.setAttribute('value', maxim);


						// const min_el = document.getElementById("ex1_min");
						// const max_el = document.getElementById("ex1_max");


						// const rangeV_min = document.getElementById("rangeV_min");
						// const rangeV_max = document.getElementById("rangeV_max");


						const rangeV_min_id = feature_settings.hasOwnProperty("rangeV_min") ? feature_settings["rangeV_min"] : `${aagwa_features}-rangeV_min`;
						const rangeV_max_id = feature_settings.hasOwnProperty("rangeV_max") ? feature_settings["rangeV_max"] : `${aagwa_features}-rangeV_max`;

						const rangeV_min = document.getElementById(rangeV_min_id);
						const rangeV_max = document.getElementById(rangeV_max_id);


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
					}

					 Aagwa_config[aagwa_features].layer = L.canvasLayer.scalarField(prod,
						{
							color: chroma.scale('spectral').domain(prod.range),
							inFilter: (v) => v !== 0 && !isNaN(v)
						}).addTo(Aagwa_config[aagwa_features].map);

					// Map Home button
					/*if(!Aagwa_config[aagwa_features].zoomHome){
						Aagwa_config[aagwa_features].zoomHome = L.Control.zoomHome();
					}*/
					Aagwa_config[aagwa_features].zoomHome.setHomeCoordinates(Aagwa_config[aagwa_features].layer.getBounds().getCenter());
					// Aagwa_config[aagwa_features].zoomHome.setHomeZoom(6);
					// Aagwa_config[aagwa_features].zoomHome.addTo( Aagwa_config[aagwa_features].map);

					if( Aagwa_config[aagwa_features].settings.hasOwnProperty("legend") && typeof(Aagwa_config[aagwa_features].settings["legend"]) === "function"){
						// L.control.scale().addTo(Aagwa_config[aagwa_features].map);
						/*if(Aagwa_config[aagwa_features].legend){
							//Aagwa_config[aagwa_features].legend.remove();
							
						}*/



						let legend = Aagwa_config[aagwa_features].settings["legend"](aagwa_features,data);

						//console.log("Aagwa_config[aagwa_features].map");
						//console.log(Aagwa_config[aagwa_features].map);
						if (Aagwa_config[aagwa_features].mapLegend == false){

						}
						else{
							Aagwa_config[aagwa_features].mapLegend.addTo(Aagwa_config[aagwa_features].map)
						}
					}

					//Legend
					
						const range = prod.range;
						const scale = chroma.scale('spectral').domain(range);
						
						let title_bar="";
						let unit_bar = "";
						if(Aagwa_config[aagwa_features].settings["features"] === Aagwa_config.prediction_table){
							title_bar = (data["feature"] == "production") ? 'Predicted ' + data["crop"] + ' production (Metric tons)' : 'Predicted ' + data["crop"] + ' yield (MT/ha)';
							unit_bar = (data["feature"] == "production") ? 'MT' : 'MT/ha';

							Aagwa_config[aagwa_features].layer.on('click', function (e) {
								if (e.value !== null) {
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
								}
							});
						}

						
						
						
						if(data.hasOwnProperty("is_cog") && data.is_cog == true){

						}
						else{
							Aagwa_config[aagwa_features].bar = L.control.colorBar(scale, range, {
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
							}).addTo( Aagwa_config[aagwa_features].map);
						}
					   

						

						
						//Aagwa_config[aagwa_features].bar = '';
						////console.log()
						if( Aagwa_config[aagwa_features].settings.hasOwnProperty("add_ex1_colorscaleselect") && Aagwa_config[aagwa_features].settings["add_ex1_colorscaleselect"] === true ){

							const colorscaleSelect = Aagwa_config[aagwa_features].settings.hasOwnProperty("ex1_colorscaleselect") ? Aagwa_config[aagwa_features].settings["ex1_colorscaleselect"] : `${aagwa_features}-ex1_colorscaleselect` ;
							const node_colorscaleSelect = document.getElementById(colorscaleSelect);

							if(node_colorscaleSelect){
								node_colorscaleSelect.addEventListener('change', function () {

									var scale = chroma.scale(this.value).domain(prod.range);
									 Aagwa_config[aagwa_features].layer.setColor(scale);


									//Legend
									//Aagwa_config[aagwa_features].bar1.remove(map);
									if ( Aagwa_config[aagwa_features].bar != '') {
										Aagwa_config[aagwa_features].bar.remove(Aagwa_config[aagwa_features].map);
									}

									var range = prod.range;
									//var scale = chroma.scale(this.value).domain(prod.range);
									console.log("data ++++++++++++++")
									console.log(data)
									if(data.hasOwnProperty("is_cog") && data.is_cog == true){

									}
									else{
									 Aagwa_config[aagwa_features].bar = L.control.colorBar(scale, range, {
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
									}).addTo(Aagwa_config[aagwa_features].map);
									}

									// //console.log(Aagwa_config[aagwa_features].layer)
									/*const active = control.getOverlays();

									//console.log("active");
									//console.log(active);
									if (active.DarkMatter || active.WorldImagery) {
										document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
											el.style.color = 'white';
										});

									}*/

									const active = Aagwa_config[aagwa_features]["settings"]["active_layer"];
									if (active === "DarkMatter" || active === "WorldImagery" ) {
										document.querySelectorAll('.leaflet-control-colorBar-title').forEach(function (el) {
											el.style.color = 'white';
										});

									}
								});
							}
						}
					
					//console.log(Aagwa_config[aagwa_features].layer.getBounds())
					//console.log(Aagwa_config[aagwa_features])

					if(Aagwa_config[aagwa_features].hasOwnProperty("settings") && typeof(Aagwa_config[aagwa_features]["settings"]) === "object"){
						const initial_settings = Aagwa_config[aagwa_features]["settings"];
						if( initial_settings && typeof(initial_settings) === "object" && initial_settings.hasOwnProperty("config") && typeof(initial_settings["config"]) === "object" && initial_settings["config"].hasOwnProperty("events") && typeof(initial_settings["config"]["events"]) === "object" ){
							//console.log('initial_settings["config"]["events"]');
							//console.log(initial_settings["config"]["events"]);
							const events_list = initial_settings["config"]["events"];
							console.log('events_list--------')
							console.log(events_list)
							// if( events_list.hasOwnProperty("map") && typeof(events_list["map"]) === "object"){
							for( feat in events_list){
								// //console.log('events_list["map"]')
								// //console.log(events_list["map"])
								for( event_item in events_list[feat]){
									Aagwa_config[aagwa_features][feat].on(event_item, (event)=>{
										////console.log("clickedddddddd")
										events_list[feat][event_item](Aagwa_config[aagwa_features],event);
									})
								}
							}
						}
					}
					Aagwa_config[aagwa_features].map.fitBounds(Aagwa_config[aagwa_features].layer.getBounds());



				});
			// Aagwa_config.overlays_func(Aagwa_config[aagwa_features],Aagwa_config.country);

		},
		async overlays_func(arg_country) {
	        // //console.log("arg_country overlays_func");
	        // //console.log(arg_country);

	        let url_country,url_region,url_commune;
	        switch (arg_country) {
	            case "Benin":
	                url_country = "data/Benin/gadm36_BEN_0_json.json";
	                url_region = "data/Benin/gadm36_BEN_1_json.json";
	                url_commune = "data/Benin/gadm36_BEN_2_json.json";
	                break;
	            case "Ghana":
	                url_country = "data/Ghana/gadm36_GHA_0_json.json";
	                url_region = "data/Ghana/gadm36_GHA_1_json.json";
	                url_commune = "data/Ghana/gadm36_GHA_2_json.json";
	                break;
	            case "Malawi":
	                url_country = "data/Malawi/gadm36_MWI_0_json.json";
	                url_region = "data/Malawi/gadm36_MWI_1_json.json";
	                url_commune = "data/Malawi/gadm36_MWI_2_json.json";
	                break;
	            case "Senegal":
	                url_country = "data/Senegal/gadm36_SEN_0_json.json";
	                url_region = "data/Senegal/gadm36_SEN_1_json.json";
	                url_commune = "data/Senegal/gadm36_SEN_2_json.json";
	                break;
	            case "Uganda":
	                url_country = "data/Uganda/gadm36_UGA_0_json.json";
	                url_region = "data/Uganda/gadm36_UGA_1_json.json";
	                url_commune = "data/Uganda/gadm36_UGA_2_json.json";
	                break;
	        };

	        //let overlays;
	        url_country = `${General_config.data_url}/${url_country}`;
	        url_region = `${General_config.data_url}/${url_region}`;
	        url_commune = `${General_config.data_url}/${url_commune}`;

	        
	        // //console.log("url_commune");
	        // //console.log(url_commune);

	        /*const url = "request/aagwa_request.php";

		  	////console.log("body");
		  	////console.log(body);
		  	//return ;
			const json = {
				"headers": {
					"Content-Type": "application/json"
				},
			  	"method": "POST",
			  	"body":JSON.stringify(body)
			}
			const jSonResponse = await AdmindUtils.makeRequest(url,json);*/

			const dataComm1 = await fetch(url_commune);
			const dataReg1 = await fetch(url_region);
			const dataCountry1 = await fetch(url_country);


			const dataComm = await dataComm1.json();
			const dataReg = await dataReg1.json();
			const dataCountry = await dataCountry1.json();
			////console.log(dataComm.json())
			////console.log(dataReg.json())
			////console.log(dataCountry.json())

			const region = L.geoJson(dataReg, {onEachFeature: forEachFeatureRegion});
            const commune = L.geoJson(dataComm, {onEachFeature: forEachFeatureCommune});
            const country = L.geoJson(dataCountry, {onEachFeature: forEachFeatureCountry});

			// //console.log(region)
			// //console.log(commune)
			// //console.log(country)
            function forEachFeatureCountry(feature, layer) {
                // var popupContent = "<p><b>Region: </b>"+ feature.properties.ADM1_FR + "</p>";
                // layer.bindPopup(popupContent);
            }

            function forEachFeatureRegion(feature, layer) {
                const popupContent = "<p>Admin Level 1: <b>" + feature.properties.NAME_1 + "</b></p>";
                layer.bindPopup(popupContent);
            }

            function forEachFeatureCommune(feature, layer) {
                const popupContent = "<p>Admin Level 1: <b>" + feature.properties.NAME_1 + "</b>" +
                    "</br>Admin Level 2: <b>" + feature.properties.NAME_2 + "</b></p>";
                layer.bindPopup(popupContent);
            }


            const overlays = {
                "Admin level 0": country,
                "Admin level 1": region,
                "Admin level 2": commune
            };


	// Add method to layer control class
            L.Control.Layers.include({
                getOverlays: function () {
                    // hash to hold all layers
                    let control, layers;
                    layers = {};
                    control = this;
                    // loop thru all layers in control
                    control._layers.forEach(function (obj) {
                        let layerName;
                        // get name of layer
                        layerName = obj.name;
                        // store whether it's present on the map or not
                        return layers[layerName] = control._map.hasLayer(obj.layer);
                    });
                    return layers;
                }
            });


			return overlays;

	         $.getJSON(url_commune, function (dataComm) {
	            // //console.log("dataComm")
	            // //console.log(dataComm)
	             $.getJSON(url_region, function (dataReg) {
	            	// //console.log("dataReg")
	            	// //console.log(dataReg)
	                 $.getJSON(url_country, function (dataCountry) {

	                    const region = L.geoJson(dataReg, {onEachFeature: forEachFeatureRegion});
	                    const commune = L.geoJson(dataComm, {onEachFeature: forEachFeatureCommune});
	                    const country = L.geoJson(dataCountry, {onEachFeature: forEachFeatureCountry});

	                    function forEachFeatureCountry(feature, layer) {
	                        // var popupContent = "<p><b>Region: </b>"+ feature.properties.ADM1_FR + "</p>";
	                        // layer.bindPopup(popupContent);
	                    }

	                    function forEachFeatureRegion(feature, layer) {
	                        const popupContent = "<p>Admin Level 1: <b>" + feature.properties.NAME_1 + "</b></p>";
	                        layer.bindPopup(popupContent);
	                    }

	                    function forEachFeatureCommune(feature, layer) {
	                        const popupContent = "<p>Admin Level 1: <b>" + feature.properties.NAME_1 + "</b>" +
	                            "</br>Admin Level 2: <b>" + feature.properties.NAME_2 + "</b></p>";
	                        layer.bindPopup(popupContent);
	                    }


	                    const overlays = {
	                        "Admin level 0": country,
	                        "Admin level 1": region,
	                        "Admin level 2": commune
	                    };


	// Add method to layer control class
	                    L.Control.Layers.include({
	                        getOverlays: function () {
	                            // hash to hold all layers
	                            let control, layers;
	                            layers = {};
	                            control = this;
	                            // loop thru all layers in control
	                            control._layers.forEach(function (obj) {
	                                let layerName;
	                                // get name of layer
	                                layerName = obj.name;
	                                // store whether it's present on the map or not
	                                return layers[layerName] = control._map.hasLayer(obj.layer);
	                            });
	                            return layers;
	                        }
	                    });

	                   /* if (arg_country == "Central" || arg_country == "East" || arg_country == "North" || arg_country == "Southern" || arg_country == "West") {
	                        let control = L.control.layers(baseMaps).addTo(map);
	                        map.removeLayer(country);

	                    } else {*/
	                   //jFeature.baseMaps[""]
	                    return overlays;
                        //control = L.control.layers(/*jFeature.baseMaps,*/ overlays).addTo(jFeature.map);
                        //jFeature.map.addLayer(country);
	                    // }

	                });
	            });
	        });

	    },
		update_dataset_links() {
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

		},
		get homeCoordinates(){
			const country = Aagwa_config.country;
			// //console.log("country")
			// //console.log(country)
			switch(country){
				case "Benin" 	: 	return {"latitude" : 9.145486056167277,"longitude" : 2.1093750000000004};
									break;
				case "Senegal"  : 	return {"latitude" :  14.392118083661728,"longitude" : -14.787597656250002};
									break;
				case "Ghana"    : 	return {"latitude" : 7.710991655433217,"longitude" : -1.1206054687500002};
									break;
				case "Malawi"   : 	return {"latitude" : -13.368243250897287,"longitude" : 33.90380859375001};
									break;
				case "Uganda"   : 	return {"latitude" : 1.142502403706165,"longitude" : 32.95898437500001};
									break;
				default : return null;
			}
		},
		get homeZoom(){
			const country = this.country;
			switch(country){
				case "Benin"   : 	return 1 ; break;
				case "Senegal" : 	return 7 ; break;
				case "Ghana"   : 	return 7 ; break;
				case "Malawi"  : 	return 7 ; break;
				case "Uganda"  : 	return 7 ; break;
				default : return null;
			}
		},
		set currentCountry(country){
			// //console.log("currentCountry")
			// //console.log(country)
			this.country = country;
		},
		async launchInput(){
			// //console.log("this.country");
			// //console.log(this.country);

			const param_country = this.get_para_country;
			//console.log("param_country");
			//console.log(param_country);

			

			if( param_country && typeof(param_country) === "object" ){

				//const url = `${General_config.data_url}/${item['file']}`;
				/*const response_geo = await fetch(`${General_config.data_url}/${param_country.geojsonfile}`);
				const mapData = await response_geo.json();*/
				const level = param_country.level;
				//console.log("geojsonfile launchInput");
				//console.log(geojsonfile);

				//return ;
				const configDataManager = {
					"custom_url" : General_config.aagwa_request_url,
					"object_id" : Aagwa_config.dataManagerObjectID,
					"type" : "modules",
					"parent_id" : Aagwa_config.data_manager_table,
					"where_column" : "country",
					"where_value" : Aagwa_config.country,
					"last_data_param" : [{"type":"field","value":"id"}],
					"excludeVar" : [],
					"subtype" : "launch_input",
					"return" : true
					/*get_data_config : {
						"custom_url" : General_config.aagwa_request_url,
						"object_id" : Aagwa_config.dataManagerObjectID,
						"type" : "modules",
						"where_column" : "country",
						"where_value" : Aagwa_config.country,
						"inner_join" : true,
						"join_table" : Aagwa_config.country_table,
						"join_left" : `${Aagwa_config.data_manager_table}.parent_id`,
						"join_right" : `${Aagwa_config.country_table}.id`,
						"return" : true
					}*/
				};

				const lastData = await AdmindUtils.getLastData(configDataManager);
				console.log("lastData launchInput");
				console.log(lastData);
				if( Array.isArray(lastData) && lastData.length > 0 ){

					let extra = {
						"pre_url" : General_config.data_url,
						"param_country" : param_country,
						"mapData" : Aagwa_config.mapData,
						"data" : {}
					};
					console.log("extra");
					console.log(extra);
					await Aagwa_config.browse_biogeophysical_param(lastData,0,extra);
					
					for( let elt in extra.data ){
						if( Array.isArray(extra.data[elt].tab_year) && extra.data[elt].tab_year.length > 0 ){
							extra.data[elt].tab_year.sort().reverse();
							const latest_year = extra.data[elt].tab_year[0];
							extra.data[elt]["latest_data"] =  [];
							for( division in extra.data[elt].data[latest_year] ){
								let value_latest = null;
								const itemData =  extra.data[elt].data[latest_year][division].data;
								let iter_division = itemData.length;
								while( iter_division >= 0 && typeof(itemData[iter_division]) !== "number" ){
									iter_division -= 1 ;
								}

								if( iter_division >= 0 ){
									extra.data[elt]["latest_data"].push({
										"location_name" : extra.data[elt].data[latest_year][division].location_name,
										"join_el" : extra.data[elt].data[latest_year][division].join_el,
										"value" : itemData[iter_division]
									})
								}
							}
						}
					}
					
					let ndviChart,lstChart;
					const data_ndvi = extra.data["ndvi"];
					const data_lst = extra.data["lst"];
					const latest_data_ndvi = data_ndvi.latest_data;

					const latest_data_lst = data_lst.latest_data;
					console.log("latest_data_lst")
					console.log(latest_data_lst)
					const latest_year_ndvi = extra.data["ndvi"].tab_year[0];
					const latest_year_lst = extra.data["lst"].tab_year[0];

					const subtitle_ndvi_map=`Map of April ${latest_year_ndvi}`;
					const subtitle_lst_map=`Map of April ${latest_year_lst}`;
					const pointFormat_ndvi=`<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>April ${latest_year_ndvi} NDVI:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>`;
					const pointFormat_lst=`<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>April ${latest_year_lst} LST:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>`;

					console.log("extra launchInput")
					console.log(extra)


					// Initiate the NDVI map
                    let ndviMap = Highcharts.mapChart('container_ndvi', {
                        chart: {
                            // height: 300,
                            // margin: 10,
                            // height: 700,
                            map: Aagwa_config.mapData
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
                    let lstMap = Highcharts.mapChart('container_lst', {
                        chart: {
                            // height: 300,
                            map: Aagwa_config.mapData
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
						let pointsNDVI = ndviMap.getSelectedPoints();

						if (pointsNDVI.length) {
						    $('#info_ndvi h2').html(`<h4 class="charts_info">NDVI stands for Normalized Difference Vegetation Index; For more information, please refer to the <a href="methodology" class="method_link" target="_blank">methodology section</a>. Max, Mean, and Min values are computed for the period 2003-${latest_year_ndvi}</h4>`);
						    $('#info_ndvi .subheader').html('<h4 class="map_selected_area_title">Selected area: '+pointsNDVI[0].location_name+'</h4>');
						    console.log("ndviChart")
						    console.log(ndviChart)
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
						                enabled: false,
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
						            /*plotOptions: {
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
						            },*/
						            plotOptions: {
								        line: {
								            dataLabels: {
								                enabled: false
								            },
								            enableMouseTracking: false,
								            marker : false
								        }
								    },
						        });
						    }


						    while(ndviChart.series.length>0){
						        ndviChart.series[0].remove(false)
						    }

						    


						    pointsNDVI.forEach(function (p) {
						        ndviChart.addSeries( {
						            name: 'Max',
						            data: data_ndvi.data["max"][p.location_name].data,
						        }, false);

						        ndviChart.addSeries( {
						            name: 'Mean',
						            data: data_ndvi.data["mean"][p.location_name].data,
						        }, false);

						        ndviChart.addSeries( {
						            name: 'Min',
						            data: data_ndvi.data["min"][p.location_name].data,
						        }, false);
						        data_ndvi.tab_year.forEach((year) => {
						        	ndviChart.addSeries({
							           name: year,
							           data: data_ndvi.data[year][p.location_name].data,
							        }, false);
						        })
						        /*ndviChart.addSeries( {
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
						        }, false);*/
						        let ndvi_dataInt = [];

						        for(var i=0;i<data_ndvi.data["min"][p.location_name].data.length;i++)
						        {
						            ndvi_dataInt.push([data_ndvi.data["min"][p.location_name].data[i],data_ndvi.data["max"][p.location_name].data[i]]);
						        }

						        ndviChart.addSeries( {
						            name: 'Fill [Min-Max]',
						            type: "arearange",
						            fillColor:"#d8d2d263",
						            enableMouseTracking :false,
						            data: ndvi_dataInt,
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
						    $('#info_lst h2').html(`<h4 class="charts_info">LST stands for Land Surface Temperature; For more information, please refer to the <a href="methodology" class="method_link" target="_blank">methodology section</a>. Max, Mean, and Min values are computed for the period 2003-${latest_year_lst}</h4>`);
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
						                enabled: false,
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
						            }
						        });
						    }


						    while(lstChart.series.length>0){
						        lstChart.series[0].remove(false)
						    }

						    let dataInt = [];

						    pointsLST.forEach(function (p) {
						        lstChart.addSeries( {
						            name: 'Max',
						            data: data_lst.data["max"][p.location_name].data,
						        }, false);

						        lstChart.addSeries( {
						            name: 'Mean',
						            data: data_lst.data["mean"][p.location_name].data,
						        }, false);

						        lstChart.addSeries( {
						            name: 'Min',
						            data: data_lst.data["min"][p.location_name].data,
						        }, false);
						       	data_lst.tab_year.forEach((year) => {
						       		
						        	lstChart.addSeries({
							           name: year,
							           data: data_lst.data[year][p.location_name].data,
							        }, false);
						        	
						        })
						       
						        /*lstChart.addSeries( {
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
						        */


						        let lst_dataInt = []
						        for(let i=0;i<data_lst.data["min"][p.location_name].data.length;i++)
						        {
						            lst_dataInt.push([data_lst.data["min"][p.location_name].data[i],data_lst.data["max"][p.location_name].data[i]]);
						        }
						        console.log("lst_dataInt")
						        console.log(lst_dataInt)
						        lstChart.addSeries( {
						            name: 'Fill [Min-Max]',
						            type: "arearange",
						            // fillColor:"black",
						            fillColor:"#d8d2d263",
						            enableMouseTracking :false,
						            data: lst_dataInt,
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
                    })
				}
			}
		},
		async launchBiogeophysicalParameters(){
			if(!Aagwa_config.hasOwnProperty("mapData")){
				await Aagwa_config.get_country_geojson();
			}
			
	        Aagwa_config.launchInput();
	        Aagwa_config.launchInput_with_rainfall();
		},
		async get_country_geojson(){
			const param_country = this.get_para_country;
			console.log("param_country launchInput_with_rainfall");
			console.log(param_country);
			if( param_country && typeof(param_country) === "object" ){
				const response_geo = await fetch(`${General_config.data_url}/${param_country.geojsonfile}`);
				Aagwa_config.mapData = await response_geo.json();

			}
		},
		
		async get_country_geojson_level0(){
			const param_country = this.get_para_country_level0;
			console.log("param_country launchInput_with_rainfall");
			console.log(param_country);
			if( param_country && typeof(param_country) === "object" ){
				const response_geo = await fetch(`${General_config.data_url}/${param_country.geojsonfile}`);
				Aagwa_config.mapDataLevel1 = await response_geo.json();

			}
		},
		async launchInput_with_rainfall(){
			// //console.log("this.country");
			// //console.log(this.country);

			const param_country = this.get_para_country;
			console.log("param_country launchInput_with_rainfall");
			console.log(param_country);

			// return;

			if( param_country && typeof(param_country) === "object" ){

				//const url = `${General_config.data_url}/${item['file']}`;

				/*const response_geo = await fetch(`${General_config.data_url}/${param_country.geojsonfile}`);
				const mapData = await response_geo.json();*/
				const level = param_country.level;
				/*console.log("geojsonfile launchInput");
				console.log(mapData);*/

				//return ;
				const configDataManager = {
					"custom_url" : General_config.aagwa_request_url,
					"object_id" : Aagwa_config.dataManagerObjectID,
					"type" : "modules",
					"parent_id" : Aagwa_config.data_manager_table,
					"where_column" : "country",
					"where_value" : Aagwa_config.country,
					"last_data_param" : [{"type":"field","value":"id"}],
					"excludeVar" : [],
					"subtype" : "launch_input_rainfall",
					"return" : true
				};

				const lastData = await AdmindUtils.getLastData(configDataManager);
				
				console.log("lastData launchInput_with_rainfall");
				console.log(lastData);

				if( Array.isArray(lastData) && lastData.length > 0 ){
					let extra = {
						"pre_url" : General_config.data_url,
						"param_country" : param_country,
						"mapData" : Aagwa_config.mapData,
						"data" : {}
					};

					await Aagwa_config.browse_biogeophysical_param(lastData,0,extra);

					

					for( let elt in extra.data ){
						if( Array.isArray(extra.data[elt].tab_year) && extra.data[elt].tab_year.length > 0 ){
							extra.data[elt].tab_year.sort().reverse();
							const latest_year = extra.data[elt].tab_year[0];
							extra.data[elt]["latest_data"] =  [];
							for( division in extra.data[elt].data[latest_year] ){
								let value_latest = null;
								const itemData =  extra.data[elt].data[latest_year][division].data;
								let iter_division = itemData.length;
								while( iter_division >= 0 && typeof(itemData[iter_division]) !== "number" ){
									iter_division -= 1 ;
								}

								if( iter_division >= 0 ){
									extra.data[elt]["latest_data"].push({
										"location_name" : extra.data[elt].data[latest_year][division].location_name,
										"join_el" : extra.data[elt].data[latest_year][division].join_el,
										"value" : itemData[iter_division]
									})
								}
							}
						}
					}


					// Add lower case codes to the data set for inclusion in the tooltip.pointFormat
                   /* var   = (function() {
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
                    })();*/
					const map_month = "April";
					console.log("extra launchInput_with_rainfall");
					console.log(extra);
					let rainfallChart;
					const data_rainfall = extra.data["rainfall"];
					const latest_data_rainfall = data_rainfall.latest_data;
					const latest_year_rainfall = extra.data["rainfall"].tab_year[0];
					const subtitle_rainfall_map=`Map of ${map_month} ${latest_year_rainfall}`;

                    pointFormat_rainfall=`<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>${map_month} ${latest_year_rainfall} rainfall:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>`;


                    // Initiate the Rainfall map
                    let rainfallMap = Highcharts.mapChart('container_rainfall', {
                        chart: {
                            // height: 300,
                            // width: 300,
                            map: Aagwa_config.mapData
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
                            $('#info_rainfall h2').html(`<h4 class="charts_info">The Rainfall data were derived from the daily climate hazards group infrared precipitation with station (CHIRPS) dataset. Max, Mean, and Min values are computed for the period 2003-${latest_year_rainfall}</h4>`);
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
                                        enabled: false,
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

                            


                            pointsRainfall.forEach(function (p) {
                                rainfallChart.addSeries( {
                                    name: 'Max',
                                    data: data_rainfall.data["max"][p.location_name].data,
                                }, false);

                                rainfallChart.addSeries( {
                                    name: 'Mean',
                                    data: data_rainfall.data["mean"][p.location_name].data,
                                }, false);

                                rainfallChart.addSeries( {
                                    name: 'Min',
                                    data: data_rainfall.data["min"][p.location_name].data,
                                }, false);

                                data_rainfall.tab_year.forEach((year) => {
						        	rainfallChart.addSeries({
							           name: year,
							           data: data_rainfall.data[year][p.location_name].data,
							        }, false);
						        })

                                 /*rainfallChart.addSeries( {
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
                                }, false);*/

                                let dataInt = [];
                                for(var i=0;i<data_rainfall.data["min"][p.location_name].data.length;i++)
                                {
                                    dataInt.push([data_rainfall.data["min"][p.location_name].data[i],data_rainfall.data["max"][p.location_name].data[i]]);
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
				}
			}
		},
		async browse_biogeophysical_param(tab,indice,extra){
			if(indice < tab.length){
				const item = tab[indice];

				//console.log("item browse_ndvi_and_lst");
				//console.log(item);
				if( item && typeof(item) === "object" && item.hasOwnProperty("file") ){
					if( !extra.data.hasOwnProperty(item["parameter"])){
						extra.data[item["parameter"]] = {
							"data" : {},
							//"tab_param" : [],
							"tab_year" : [],
							"tab_stat" : [],
							
						}
					}
					const url = `${extra["pre_url"]}/${item['file']}?v=${Date.now()}`;
					const response = await fetch(url);
					const data_csv = await response.text();

					
					if(data_csv){
						//console.log("data_csv browse_biogeophysical_param");
						//console.log(data_csv);
						let key ;
						if( item["category"] === "year"){
							key = `${item["year"]}`;
							if(extra.data[item["parameter"]].tab_year.indexOf(key) == - 1 ){
								extra.data[item["parameter"]].tab_year.push(key);
							}
						}
						else{
							key = item["category"];
							if(extra.data[item["parameter"]].tab_stat.indexOf(key) == - 1 ){
								extra.data[item["parameter"]].tab_stat.push(key);
							}
						}

						if(!extra.data[item["parameter"]].data.hasOwnProperty(key)){
							extra.data[item["parameter"]].data[key] = {};

						}

						const data_array = data_csv.split(/\n/);
						const quoteRegex = /\"/g;

						// console.log("data_array browse_biogeophysical_param");
						// console.log(data_array);
						// console.log("data_array.slice(1)");
						// console.log(data_array.slice(1));
						const level = extra.param_country.level;
						$.each(data_array.slice(1), function (j, line) {
							
							const row = Aagwa_config.CSVtoArray(line);
							// console.log("row")
							// console.log(row)
							if(Array.isArray(row) && row[level]){
								const data = row.slice(level+2);
								// console.log("data row");
								// console.log(data);
								$.each(data, function (i, val) {
									val = val.replace(quoteRegex, '');
									val = parseFloat(val, 10);

									data[i] = val;
								});

								//loc_min_ndvi[row[level]]
								// console.log("row[level]");
								// console.log(row[level]);
								// console.log("row[level+1]");
								// console.log(row[level+1]);
								extra.data[item["parameter"]].data[key][row[level]] = {
									location_name: row[level],
									join_el:row[level+1],
									data: data,
								};
								
								/*const final_data = 
								console.log("final_data browse_biogeophysical_param");
								console.log(final_data);*/
							}
						});

					}
					
				}
				await Aagwa_config.browse_biogeophysical_param(tab,indice+1,extra);
			}
		},
		CSVtoArray(text) {
			return text.replace(/^"/, '')
			.replace(/",$/, '')
			.split('","');
		},
		get get_para_country(){
	        let param = false;
	        const country_code = this.country;
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
	    },
	   get get_para_country_level0(){
	        let param = false;
	        const country_code = this.country;
	        switch(country_code)
	        {
	            case "Senegal":param = {
	                            "geojsonfile" :"data/Senegal/gadm36_SEN_0_json.json"
	                        };break;
	            case "Benin":param = {
	                            "geojsonfile" :"data/Benin/gadm36_BEN_0_json.json",
	                            "level" : 2
	                        };break;
	            case "Ghana":param = {
	                            "geojsonfile" :"data/Ghana/gadm36_GHA_0_json.json",
	                            "level" : 2
	                        };break;
	            case "Malawi":param = {
	                            "geojsonfile" :"data/Malawi/gadm36_MWI_0_json.json",
	                            "level" : 2
	                        };break;
	            case "Uganda":param = {
	                            "geojsonfile" :"data/Uganda/gadm36_UGA_0_json.json",
	                            "level" : 2
	                        };break;
	        }
	        return param;
	    },
	    async browseFeatureChildren(tab,indice,extra){
			if(indice < tab.length){
				const item = tab[indice];
				console.log("item browseFeatureChildren");
				console.log(item);
				const function_to_load = item.function_to_load;
				if(function_to_load){
					Aagwa_config[function_to_load](item,extra);
					
				}

				Aagwa_config.browseFeatureChildren(tab,indice+1,extra);
			}
		},
	    async launchTemperatureTrendAnalysis(event){
	    	if(!Aagwa_config.hasOwnProperty("mapData")){
				await Aagwa_config.get_country_geojson();
			}

			console.log("Aagwa_config.mapData")
			console.log(Aagwa_config.mapData)
	    	console.log(event.target.dataset);

	    	const dataset = event.target.dataset;
	    	const feature = dataset.feature;
	    	if(Aagwa_config.hasOwnProperty(feature) && typeof(Aagwa_config[feature]) === "object" && Aagwa_config[feature].settings.hasOwnProperty("rows_container")){
	    		const container_id = Aagwa_config[feature].settings["rows_container"];
	    		const children = Aagwa_config[feature].settings["children"];
	    		let str = "";
	    		extra = {
	    			"container_id" :container_id
	    		}
		    	await Aagwa_config.browseFeatureChildren(children,0,extra);
		    	
		    	/*`<div class="row" style="margin-bottom:40px;">
	                <div class="col-lg-3 col-centered">
	                <span class="custom-dropdown big" style="width:83%;">
	                  <select id="select-crop-${feature}" class="select-feature select_country_opt" data-feature=${feature}>
	                   
	                  </select>
	                </span>
	                </div>
	            </div>
				<div class="row">
				    <div class="col-lg-5 col-md-6 col-sm-12 col-xs-12">
				        <div id="container-${feature}" class="geojson-container" data-feature="${feature}"></div>
				    </div>
				    <div class="col-lg-7 col-md-6 col-sm-12 col-xs-12" style="vertical-align:bottom;padding-left:35px;">
				        <div id="info-chart-${feature}" >
				            <div class="subheader">Click on areas to view crop phenology metrics</div>
				            <h2></h2>
				            <div id="container-chart-${feature}" data-feature="${feature}"></div>
				        </div>
				    </div>
				</div>`;
				document.getElementById(container_id).innerHTML = str;*/

				//insert geojson here
			}
	    },
	    async launchCropPhenologyMetrics(event){
	    	if(!Aagwa_config.hasOwnProperty("mapData")){
				await Aagwa_config.get_country_geojson();
			}

			console.log("Aagwa_config.mapData")
			console.log(Aagwa_config.mapData)
	    	console.log(event.target.dataset);
	    	const dataset = event.target.dataset;
	    	const feature = dataset.feature;
	    	if(Aagwa_config.hasOwnProperty(feature) && typeof(Aagwa_config[feature]) === "object" && Aagwa_config[feature].settings.hasOwnProperty("rows_container")){

	    		const configCrop = {
					"custom_url" : General_config.aagwa_request_url,
					"object_id" : Aagwa_config.cropPhenologyMetricsObjectID,
					"type" : "modules",
					"parent_id" : Aagwa_config.crop_phenology_metrics_table,
					"where_column" : "country",
					"where_value" : Aagwa_config.country,
					"last_data_param" : [{"type":"field","value":"code","extra":"multi_chart"}],
					//"additional_data" : ["latest_period","max_year_literal","min_year_literal"],
					//"excludeVar" : [],
					//"subtype" : "crop_list",
					"return" : true
				};

				console.log("configCrop");
				console.log(configCrop);
				const lastData = await AdmindUtils.getLastData(configCrop);
				console.log("lastData");
				console.log(lastData);
				let options = "";
				// const subtype = "CropPhenologyMetricsGeojson"
				const subtype = Aagwa_config.crop_phenology_metrics_geojson;
				if(Array.isArray(lastData) && lastData.length > 0){
					lastData.map( (item)=>{
						options += `<option value="${item["crop"]}">${item["crop"]}</option>`;
					})
					// Aagwa_config[feature].settings["geojson"] = {
					Aagwa_config[subtype] = {
						"map_container": `container-${feature}`,
						"config" : {
							"custom_url" : General_config.aagwa_request_url,
							"object_id" : Aagwa_config.cropPhenologyMetricsObjectID,
							"type" : "modules",
							"parent_id" : Aagwa_config.crop_phenology_metrics_table,
							"where_column" : "country",
							"where_value" : Aagwa_config.country,
							get_last_data_param(crop){
								return [{"type":"field","value":"id"},{"type":"literal","value":crop},{"type":"field","value":"id"},{"type":"field","value":"id"},{"type":"literal","value":crop}]
							},
							"additional_data" : ["latest_period","max_year_literal","subtitle"],
							//"excludeVar" : [],
							"subtype" : subtype,
							"return" : true
						},
						mapConfigRenderer(sub_feature,lastDataConfig){
							Aagwa_config[sub_feature]["chart"] = {
								// height: 300,
								// margin: 10,
								height: 700,
								map: Aagwa_config.mapData
							};
							Aagwa_config[sub_feature]["map_title"] = {
				                "text" : 'Crop Phenology Metrics'
				            }

				            // const text_subtitle = lastDataConfig.extra.hasOwnProperty("max_year_literal") ? `${lastDataConfig.extra["max_year_literal"]}` : "";
				            const text_subtitle = lastDataConfig.extra["subtitle"] ;
				    		Aagwa_config[sub_feature]["map_subtitle"] = {
				                "text" : text_subtitle
				            };
				            const latest_year = lastDataConfig.extra.hasOwnProperty("max_year_literal") ? lastDataConfig.extra["max_year_literal"] : "" ;
				            const latest_period = lastDataConfig.extra.hasOwnProperty("latest_period") ? lastDataConfig.extra.latest_period : "";
				            Aagwa_config[sub_feature]["pointFormat"] = `<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>${latest_period}, Raw NDVI :</span><br/><span style='font-weight:bold;font-size:14px'> {point.value}</span>`;

				            Aagwa_config[sub_feature]["series"] = [{
			                    data: lastDataConfig.result,
			                    joinBy: ['GID_2', 'join_el'],
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
			                    },
			                    point: {
					                events: {
					                    click: function() {
					                        // Access the clicked point's data
					                        console.log(this.options);
					                        const feature_chart = "crop_phenology_metrics_charts";
					                        const data_option = this.options;
					                        const configChart = {
												"custom_url" : General_config.aagwa_request_url,
												"object_id" : Aagwa_config.cropPhenologyMetricsObjectID,
												"type" : "modules",
												"parent_id" : Aagwa_config.crop_phenology_metrics_table,
												"where_column" : "country",
												"where_value" : Aagwa_config.country,
												"last_data_param" : [
													{
													"type":"literal","value":this.options.crop
													},
													{
													"type":"literal","value":this.options.join_el
													},

													/*{
													"type":"literal","value":this.options.crop
													},
													{
													"type":"literal","value":this.options.join_el
													},

													{
													"type":"literal","value":this.options.crop
													},
													{
													"type":"literal","value":this.options.join_el
													},

													{
													"type":"literal","value":this.options.crop
													},
													{
													"type":"literal","value":this.options.join_el
													},*/
												],
												//"additional_data" : ["latest_period","max_year_literal","min_year_literal"],
												//"excludeVar" : [],
												"subtype" :feature_chart,
												"skip_root_parent" : true,
												"return" : false
											};
					                        /*var pointName = this.name;
					                        var pointValue = this.value;
					                        var pointLat = this.lat;
					                        var pointLon = this.lon;

					                        // Perform actions based on the click
					                        console.log('Clicked point:', pointName, 'Value:', pointValue);
					                        // Example: Display information in a custom label or update another element
					                        // ...*/

					                        AdmindUtils.getLastData(configChart,(lastDataC)=>{
					                        	console.log("lastlastDataCData");
												console.log(lastDataC);

												Aagwa_config[feature_chart] = {};

												Aagwa_config[feature_chart]["container"] = Aagwa_config.crop_phenology_metrics_chart_container;
												Aagwa_config[feature_chart]["map_title"] = {
									                "text" : `${data_option.location_name}, ${data_option.crop}-NDVI Time Series`
									            }
									            Aagwa_config[feature_chart]["yAxis"] = {
									            	opposite: false,
											        title: {
											            text: 'NDVI'
											        }
											    }
												const crop_phenology_metrics_series = [
													{
														"name" : "NDVI RAW",
														"data" : []
													},
													{
														"name" : "NDVI SMOOTH",
														"data" : []
													}
												];

												for( let k = 0 ; k < lastDataC.length ; k += 1){
													const item = lastDataC[k];
													const json_parse_raw = JSON.parse(item["NDVI RAW"]);
													const date_time_stamp_raw = new Date(json_parse_raw[0]).getTime();
													const value_raw = json_parse_raw[1];
													crop_phenology_metrics_series[0].data.push([date_time_stamp_raw,value_raw]);

													const json_parse_smooth = JSON.parse(item["NDVI SMOOTH"]);
													const date_time_stamp_smooth = new Date(json_parse_smooth[0]).getTime();
													const value_smooth = json_parse_smooth[1];
													crop_phenology_metrics_series[1].data.push([date_time_stamp_smooth,value_smooth])

												}
												Aagwa_config[feature_chart]["series"] = crop_phenology_metrics_series;
												console.log("crop_phenology_metrics_series")
												console.log(crop_phenology_metrics_series)


											 	const [SoS , Peak , Eos] = lastDataC[0]["START_PEAK_END"].split("__sep__");
											    // const categories = lastDataC[2].data.split(",");
											    // console.log(categories.indexOf(SoS))
											    // console.log(categories.indexOf(Peak))
											    // console.log(categories.indexOf(Eos))
											    Aagwa_config[feature_chart]["xAxis"] = {
											    	// categories : lastDataC[2].data.split(","),
											    	plotLines: [{
											            color: 'green',
											            width: 2,
											            //value: categories.indexOf(SoS),
											            value: new Date(SoS).getTime(),
											            label: {
											                text: 'SoS',
											                verticalAlign: 'top',
											                textAlign: 'center'
											            }
											        },
											        {
											            color: 'blue',
											            width: 2,
											            // value: Peak,
											            // value: categories.indexOf(Peak),
											            value: new Date(Peak).getTime(),
											            label: {
											                text: 'Peak',
											                verticalAlign: 'top',
											                textAlign: 'center'
											            }
											        },
											        {
											            color: 'red',
											            width: 2,
											            // value: Eos,
											            // value: Eos != -1 ? categories.indexOf(Eos) : -1,
											            value: Eos != -1 ? new Date(Eos).getTime() : -1,
											            label: {
											                text: 'Eos',
											                verticalAlign: 'top',
											                textAlign: 'center'
											            }
											        }]
											        /*accessibility: {
											            rangeDescription: 'Range: 2010 to 2022'
											        }*/
											    }


												AdmindUtils.createStockChart(Aagwa_config[feature_chart]);





												//Aagwa_config[feature_chart]["series"] = AdmindUtils.
												return;
												/*// console.log("Aagwa_config.crop_phenology_metrics_charts");
												// console.log(Aagwa_config.crop_phenology_metrics_charts);

												Aagwa_config[feature_chart] = {
													"feature" : feature_chart,
													"tooltip" : {
												        format: '<span style="font-size: 0.8em">{key}</span><br/>' +
												            '{#each points}' +
												            '<span style="color:{color}">\u25CF</span> ' +
												            '{series.name}: <b>{y}</b><br/>' +
												            '{/each}',
												        shared: true
												    }
												};
												// console.log("Aagwa_config.crop_phenology_metrics_charts");
												// console.log(Aagwa_config.crop_phenology_metrics_charts);


												Aagwa_config[feature_chart]["container"] = Aagwa_config.crop_phenology_metrics_chart_container
												
												// console.log("Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]");
												// console.log(Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]);


												Aagwa_config[feature_chart]["map_title"] = {
									                "text" : `${data_option.location_name}, ${data_option.crop}-NDVI Time Series`
									            }
									            Aagwa_config[feature_chart]["yAxis"] = {
											        title: {
											            text: 'NDVI'
											        }
											    }

											    const [SoS , Peak , Eos] = lastDataC[3]["data"].split("__sep__");
											    const categories = lastDataC[2].data.split(",");
											    console.log(categories.indexOf(SoS))
											    console.log(categories.indexOf(Peak))
											    console.log(categories.indexOf(Eos))
											    Aagwa_config[feature_chart]["xAxis"] = {
											    	categories : lastDataC[2].data.split(","),
											    	plotLines: [{
											            color: 'green',
											            width: 2,
											            value: categories.indexOf(SoS),
											            label: {
											                text: 'SoS',
											                verticalAlign: 'top',
											                textAlign: 'center'
											            }
											        },
											        {
											            color: 'blue',
											            width: 2,
											            // value: Peak,
											            value: categories.indexOf(Peak),
											            label: {
											                text: 'Peak',
											                verticalAlign: 'top',
											                textAlign: 'center'
											            }
											        },
											        {
											            color: 'red',
											            width: 2,
											            // value: Eos,
											            value: Eos != -1 ? categories.indexOf(Eos) : -1,
											            label: {
											                text: 'Eos',
											                verticalAlign: 'top',
											                textAlign: 'center'
											            }
											        }]
											        
											    }
											    lastDataC[0].data = lastDataC[0].data.split(",").map(x => parseFloat(x));
											    lastDataC[1].data = lastDataC[1].data.split(",").map(x => parseFloat(x));
											    Aagwa_config[feature_chart]["series"] = [lastDataC[0],lastDataC[1]]
									            //const text_subtitle = lastDataConfig.extra.hasOwnProperty("max_year_literal") ? `${lastDataConfig.extra["max_year_literal"]}` : "";
									    		AdmindUtils.createLineChart(Aagwa_config[feature_chart]);*/
					                        });
											/*console.log("lastData");
											console.log(lastData);
											const feature_chart = "crop_phenology_metrics_charts";
											// console.log("Aagwa_config.crop_phenology_metrics_charts");
											// console.log(Aagwa_config.crop_phenology_metrics_charts);

											Aagwa_config[feature_chart] = {};
											// console.log("Aagwa_config.crop_phenology_metrics_charts");
											// console.log(Aagwa_config.crop_phenology_metrics_charts);


											Aagwa_config[feature_chart]["container"] = Aagwa_config.crop_phenology_metrics_chart_container
											
											// console.log("Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]");
											// console.log(Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]);


											Aagwa_config[feature_chart]["map_title"] = {
								                "text" : `${data_option.location_name}, ${data_option.crop}-NDVI Time Series`
								            }
								            Aagwa_config[feature_chart]["yAxis"] = {
										        title: {
										            text: 'NDVI'
										        }
										    }

										    Aagwa_config[feature_chart]["xAxis"] = {
										    	categories : lastData[2].data.split(",")
										       
										    }
										    lastData[0].data = lastData[0].data.split(",").map(x => parseFloat(x));
										    lastData[1].data = lastData[1].data.split(",").map(x => parseFloat(x));
										    Aagwa_config[feature_chart]["series"] = [lastData[0],lastData[1]]
								            //const text_subtitle = lastDataConfig.extra.hasOwnProperty("max_year_literal") ? `${lastDataConfig.extra["max_year_literal"]}` : "";
								    		AdmindUtils.createLineChart(Aagwa_config[feature_chart]);*/
					                    }
					                }
					            }
			                }];
							AdmindUtils.createMapFromGEOJSON(Aagwa_config[sub_feature])
						}
						

					}
					//Aagwa_config[feature].settings["geojson"]
				}


	    		const container_id = Aagwa_config[feature].settings["rows_container"];
		    	const str = 
		    	`<div class="row" style="margin-top:20px;margin-bottom:15px;">
				    <div class="col-lg-5 col-centered">
				        <label class="title_country_lab">Select a crop</label>
				    </div>
				</div>
				<div class="row" style="margin-bottom:40px;">
	                <div class="col-lg-3 col-centered">
	                <span class="custom-dropdown big" style="width:83%;">
	                  <select id="select-crop-${feature}" class="select-feature select_country_opt" data-feature="${feature}"" data-subtype="${subtype}" onchange="Aagwa_config.loadGEOJSONMAPFromChange(this)">
	                   ${options}
	                  </select>
	                </span>
	                </div>
	            </div>
				<div class="row">
				    <div class="col-lg-5 col-md-6 col-sm-12 col-xs-12">
				        <div id="container-${feature}" class="geojson-container" data-feature="${feature}"></div>
				    </div>
				    <div class="col-lg-7 col-md-6 col-sm-12 col-xs-12" style="vertical-align:bottom;padding-left:35px;">
				        <div id="info-chart-${feature}" >
				            <div class="subheader">Click on areas to view crop phenology metrics</div>
				            <h2></h2>
				            <div id="container-chart-${feature}" data-feature="${feature}"></div>
				        </div>
				    </div>
				</div>`;
				document.getElementById(container_id).innerHTML = str;
				document.getElementById(`select-crop-${feature}`).dispatchEvent(new Event("change"));

				


				//insert geojson here
			}
	    },
	    async loadGEOJSONMAPFromChange(event){
	    	const dataset = event.dataset;
	    	// console.log("dataset loadGEOJSONMAPFromChange")
	    	// console.log(event.dataset);
	    	feature = dataset.feature;
	    	if( feature && Aagwa_config.hasOwnProperty(feature) && typeof(Aagwa_config[feature]) === "object"){
	    		if(Aagwa_config[feature].settings.hasOwnProperty("belong_chart_feature")){
	    			console.log(Aagwa_config[feature])
	    			Aagwa_config[feature].settings["belong_chart_feature"].map((ch) => {
	    				if(Aagwa_config.hasOwnProperty(ch) && Aagwa_config[ch].hasOwnProperty("chart_holder") && Aagwa_config[ch].chart_holder instanceof Highcharts.Chart){
	    					Aagwa_config[ch].chart_holder.destroy();
	    				}
	    			})
	    		}
	    		if(!Aagwa_config.hasOwnProperty("mapData")){
					await Aagwa_config.get_country_geojson();
				}
				if(dataset.hasOwnProperty("subtype")){
					const subtype = dataset["subtype"];
					// if(Aagwa_config[feature].settings.hasOwnProperty(subtype) && typeof(Aagwa_config[feature].settings[subtype]) === "object" ){
					if(Aagwa_config.hasOwnProperty(subtype) && typeof(Aagwa_config[subtype]) === "object" ){
						// const config_subtype = Object.assign({},Aagwa_config[feature].settings[subtype]["config"]);
						Aagwa_config[subtype]["config"]["last_data_param"] = Aagwa_config[subtype]["config"]["get_last_data_param"](event.value);
						// console.log("config_subtype")
						// console.log(config_subtype)
						// return;
						const lastData = await AdmindUtils.getLastData(Aagwa_config[subtype]["config"]);
						console.log("lastData");
						console.log(lastData);
						if( typeof(lastData) === "object" && lastData.hasOwnProperty("extra") && typeof(lastData.extra) === "object" && lastData.hasOwnProperty("result") && Array.isArray(lastData.result) && lastData.result.length > 0 ){
							Aagwa_config[subtype]["mapConfigRenderer"](subtype,lastData);
						}
					}
				}
				/*const configCrop = {
					"custom_url" : General_config.aagwa_request_url,
					"object_id" : Aagwa_config.cropPhenologyMetricsObjectID,
					"type" : "modules",
					"parent_id" : Aagwa_config.crop_phenology_metrics_table,
					"where_column" : "country",
					"where_value" : Aagwa_config.country,
					"last_data_param" : [{"type":"field","value":"code","extra":"multi_chart"}],
					//"additional_data" : ["latest_period","max_year_literal","min_year_literal"],
					//"excludeVar" : [],
					//"subtype" : "crop_list",
					"return" : true
				};
				console.log("configCrop");
				console.log(configCrop);
				lastData = await AdmindUtils.getLastData(configCrop);
				console.log("lastData");
				console.log(lastData);*/



	    	}
	    },
	    async launchDailyStatsTemperature(settings,extra){
	    	if(!Aagwa_config.hasOwnProperty("mapData")){
				await Aagwa_config.get_country_geojson();
			}

			console.log("Aagwa_config.mapData launchDailyStatsTemperature");
			console.log(Aagwa_config.mapData);
	    	console.log("settings");
	    	console.log(settings);
	    	console.log("extra");
	    	console.log(extra);
	    	//const dataset = event.target.dataset;
	    	const feature = settings.feature;
	    	//if(Aagwa_config.hasOwnProperty(feature) && typeof(Aagwa_config[feature]) === "object" && Aagwa_config[feature].settings.hasOwnProperty("rows_container")){
    		const container_id = extra["container_id"];

    		const str = 
	    	`<div class="row">
			    <div class="col-lg-5 col-md-6 col-sm-12 col-xs-12">
			        <div id="container-${feature}" class="geojson-container" data-feature="${feature}"></div>
			    </div>
			    <div class="col-lg-7 col-md-6 col-sm-12 col-xs-12" style="vertical-align:bottom;padding-left:35px;">
			        <div id="info-chart-${feature}" >
			            <div class="subheader">${settings["subheader_title"]}</div>
			            <h2></h2>
			            <div id="container-chart-${feature}" data-feature="${feature}"></div>
			        </div>
			    </div>
			</div>`;
			document.getElementById(container_id).insertAdjacentHTML("beforeend",str);

			const config = {
				"custom_url" : General_config.aagwa_request_url,
				"object_id" : Aagwa_config.dailyStatsTemperatureObjectID,
				"type" : "modules",
				"parent_id" : Aagwa_config.daily_stats_temperature_table,
				"where_column" : "country",
				"where_value" : Aagwa_config.country,
				"last_data_param" : [{"type":"field","value":"id"},{"type":"field","value":"id"},{"type":"field","value":"id"}],
				"additional_data" : ["latest_period","max_year_literal","min_year_literal","subtitle"],
				"excludeVar" : [],
				//"subtype" : "launch_input",
				"return" : true
			};

			const lastData = await AdmindUtils.getLastData(config);
			console.log("lastData");
			console.log(lastData);

			Aagwa_config[feature] = settings;
    		Aagwa_config[feature]["map_title"] = {
                "text" : 'Daily Stats Temperature'
            };
            if( typeof(lastData) === "object" && lastData.hasOwnProperty("extra") && typeof(lastData.extra) === "object" && lastData.hasOwnProperty("result") && Array.isArray(lastData.result) && lastData.result.length > 0){

            	// const text_subtitle = lastData.extra.hasOwnProperty("min_year_literal") && lastData.extra.hasOwnProperty("max_year_literal") ? `From ${lastData.extra["min_year_literal"]} to ${lastData.extra["max_year_literal"]}` : "";
            	const text_subtitle = lastData.extra["subtitle"];
	    		Aagwa_config[feature]["map_subtitle"] = {
	                "text" : text_subtitle
	            };
	            const latest_year = lastData.extra.hasOwnProperty("max_year_literal") ? lastData.extra["max_year_literal"] : "" ;
	            const latest_period = lastData.extra.hasOwnProperty("latest_period") ? lastData.extra.latest_period : "";
	            Aagwa_config[feature]["pointFormat"] = `<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>${latest_period}, Mean Temperature :</span><br/><span style='font-weight:bold;font-size:14px'> {point.value:.2f} °C</span>`;
	            //lastData.result[24]["value"] = 26.9
	            Aagwa_config[feature]["colorAxis"] = {
			        // min: settings.min,
			        // max: settings.max,
			        // reversed: false,
			        stops: [
			            [0.2, 'lightblue'],
			            [0.4, '#CBDFC8'],
			            [0.6, '#F3E99E'],
			            [0.9, '#F9A05C']
			        ],
			        /*labels: {
			            format: '{value}'
			        }*/
			    };
	         	Aagwa_config[feature]["series"] = [{
                    data: lastData.result,
                    joinBy: ['GID_2', 'join_el'],
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
                    },
                    point: {
		                events: {
		                    click: function() {
		                        // Access the clicked point's data
		                        console.log(this.options);
		                        //return;
		                        // const feature_chart = "daily_stats_temperature_charts";
		                        const feature_chart = "daily_stats_temperature_charts";
		                        const data_option = this.options;
		                        const configChart = {
									"custom_url" : General_config.aagwa_request_url,
									"object_id" : Aagwa_config.dailyStatsTemperatureObjectID,
									"type" : "modules",
									"parent_id" : Aagwa_config.daily_stats_temperature_table,
									"where_column" : "country",
									"where_value" : Aagwa_config.country,
									"last_data_param" : [
										{
										"type":"literal","value":this.options.join_el
										},
										/*{
										"type":"literal","value":this.options.join_el
										},
										{
										"type":"literal","value":this.options.join_el
										},
										{
										"type":"literal","value":this.options.join_el
										}*/
									],
									//"additional_data" : ["latest_period","max_year_literal","min_year_literal"],
									//"excludeVar" : [],
									"subtype" :feature_chart,
									"skip_root_parent" : true,
									"return" : false
								};
		                        /*var pointName = this.name;
		                        var pointValue = this.value;
		                        var pointLat = this.lat;
		                        var pointLon = this.lon;

		                        // Perform actions based on the click
		                        console.log('Clicked point:', pointName, 'Value:', pointValue);
		                        // Example: Display information in a custom label or update another element
		                        // ...*/

		                        AdmindUtils.getLastData(configChart,(lastDataC)=>{
		                        	console.log("lastlastDataCData");
									console.log(lastDataC);
									//return ;
									let final_data = {

									};
									const extra_config = {
										"check_leap_year":true,
										"tab_stat" : [
											{
												text : "Mean Temp",
												key : "mean_temp"
											},
											{
												text : "Min Temp",
												key : "min_temp"
											},
											{
												text : "Max Temp",
												key : "max_temp"
											}
										]
									}
									AdmindUtils.buildCharComponent(lastDataC,0,final_data,extra_config);
									
									console.log("final_data")
									console.log(final_data)

									// console.log("final_data");
									// console.log(AdmindUtils.get365DayRange('2024-01-01'));

									// return;
									// console.log("Aagwa_config.crop_phenology_metrics_charts");
									// console.log(Aagwa_config.crop_phenology_metrics_charts);

									Aagwa_config[feature_chart] = {
										feature : feature_chart,
										tooltip : {
											        format: '<span style="font-size: 0.8em">{key}</span><br/>' +
											            '{#each points}' +
											            '<span style="color:{color}">\u25CF</span> ' +
											            '{series.name}: <b>{y:.2f} °C</b><br/>' +
											            '{/each}',
											        shared: true
											    }
									};
									// console.log("Aagwa_config.crop_phenology_metrics_charts");
									// console.log(Aagwa_config.crop_phenology_metrics_charts);


									Aagwa_config[feature_chart]["container"] = Aagwa_config.daily_stats_temperature_chart_container;
									
									// console.log("Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]");
									// console.log(Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]);


									Aagwa_config[feature_chart]["map_title"] = {
						                "text" : `${data_option.location_name}, daily stats temperaure`
						            }
						            Aagwa_config[feature_chart]["yAxis"] = {
								        title: {
								            text: 'Temperature'
								        }
								    }

								    //const [SoS , Peak , Eos] = lastDataC[3]["data"].split("__sep__");
								    // const categories = AdmindUtils.get365DayRange('2024-01-01');
								    //console.log(categories.indexOf(SoS))
								    //console.log(categories.indexOf(Peak))
								    //console.log(categories.indexOf(Eos))
								    Aagwa_config[feature_chart]["xAxis"] = {
								    	
										// type: 'datetime', // Essential for handling dates correctly
										/*min: Date.UTC(2024, 0, 1),
								        max: Date.UTC(2024, 11, 31),
								        tickInterval: 24 * 3600 * 1000 * 30,
								        labels: {
								            format: '{value:%b %d}' // Displays "Jan 01", "Feb 01", etc.
								        }*/
									    /*dateTimeLabelFormats: { // Customize how dates are displayed
								            month: '%b',
								            year: '%Y'
								        },*/
								        /*title: {
								            text: 'Date'
								        },*/
								       /* dateTimeLabelFormats: { // don't show it if too dense
								            day: '%e %b',
								            month: '%b \'%y',
								            year: '%Y'
								        },*/
								        // tickInterval: 365*24 * 3600 * 1000, // one day in milliseconds*/
								        labels: {
								            rotation: -45,
								            align: 'right',
								            /*formatter: function() {
								                // Example: Format as 'Day Month Year' for datetime axis
								                // console.log("this.value")
								                // console.log(this.value)
								                // return Highcharts.dateFormat('%e %b', Date.UTC(this.value));

								                console.log("this.value")
								                console.log(this.value)
								                tab_split = this.value.name.split("-");
								                return `${tab_split[1]}-${tab_split[2]}`
								            }*/
								        },
								    	categories : AdmindUtils.get365DayRange('2024-01-01'),
								    	/*plotLines: [{
								            color: 'green',
								            width: 2,
								            value: categories.indexOf(SoS),
								            label: {
								                text: 'SoS',
								                verticalAlign: 'top',
								                textAlign: 'center'
								            }
								        },
								        {
								            color: 'blue',
								            width: 2,
								            // value: Peak,
								            value: categories.indexOf(Peak),
								            label: {
								                text: 'Peak',
								                verticalAlign: 'top',
								                textAlign: 'center'
								            }
								        },
								        {
								            color: 'red',
								            width: 2,
								            // value: Eos,
								            value: Eos != -1 ? categories.indexOf(Eos) : -1,
								            label: {
								                text: 'Eos',
								                verticalAlign: 'top',
								                textAlign: 'center'
								            }
								        }]*/
								       
								    };
								    /*lastDataC[0].data = lastDataC[0].data.split(",").map(x => parseFloat(x));
								    lastDataC[1].data = lastDataC[1].data.split(",").map(x => parseFloat(x));*/
								    Aagwa_config[feature_chart]["series"] = final_data.series.data;
								   	/* Aagwa_config[feature_chart]["series"] = [
								    	{
								    		name: 'Year 2023',
									        data: [
									            [Date.UTC(2023, 0, 1), 29.9],
									            [Date.UTC(2023, 0, 2), 29.9],
									            
									            [Date.UTC(2023, 0, 3), 106.4],
									            [Date.UTC(2023, 0, 4), 129.2],
									            [Date.UTC(2023, 0, 5), 144.0],
									            [Date.UTC(2023, 0, 6), 176.0],
									            [Date.UTC(2023, 0, 7), 135.6],
									            [Date.UTC(2023, 0, 8), 148.5],
									            [Date.UTC(2023, 0, 9), 216.4],
									            [Date.UTC(2023, 0, 10), 194.1],
									            [Date.UTC(2023, 0, 11), 95.6],
									            [Date.UTC(2023, 0, 12), 54.4],
									            //[new Date("2023-12-31").getTime(), 71.5],
									        ]
									    },
									    {
									    	name: 'Year 2024',
									        data: [
									            [Date.UTC(2024, 0, 1), 29.9],
									            [Date.UTC(2024, 0, 2), 29.9],
									            
									            [Date.UTC(2024, 0, 3), 16.4],
									            [Date.UTC(2024, 0, 4), 29.2],
									            [Date.UTC(2024, 0, 5), 44.0],
									            [Date.UTC(2024, 0, 6), 76.0],
									            [Date.UTC(2024, 0, 7), 35.6],
									            [Date.UTC(2024, 0, 8), 48.5],
									            [Date.UTC(2024, 0, 9), 16.4],
									            [Date.UTC(2024, 0, 10), 94.1],
									            [Date.UTC(2024, 0, 11), 95.6],
									            [Date.UTC(2024, 0, 12), 54.4],
									            //[new Date("2024-12-31").getTime(), 71.5],
									        ]
									    }
									]*/
						           
						    		AdmindUtils.createLineChart(Aagwa_config[feature_chart]);
		                        });
								/*console.log("lastData");
								console.log(lastData);
								const feature_chart = "crop_phenology_metrics_charts";
								// console.log("Aagwa_config.crop_phenology_metrics_charts");
								// console.log(Aagwa_config.crop_phenology_metrics_charts);

								Aagwa_config[feature_chart] = {};
								// console.log("Aagwa_config.crop_phenology_metrics_charts");
								// console.log(Aagwa_config.crop_phenology_metrics_charts);


								Aagwa_config[feature_chart]["container"] = Aagwa_config.crop_phenology_metrics_chart_container
								
								// console.log("Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]");
								// console.log(Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]);


								Aagwa_config[feature_chart]["map_title"] = {
					                "text" : `${data_option.location_name}, ${data_option.crop}-NDVI Time Series`
					            }
					            Aagwa_config[feature_chart]["yAxis"] = {
							        title: {
							            text: 'NDVI'
							        }
							    }

							    Aagwa_config[feature_chart]["xAxis"] = {
							    	categories : lastData[2].data.split(",")
							       
							    }
							    lastData[0].data = lastData[0].data.split(",").map(x => parseFloat(x));
							    lastData[1].data = lastData[1].data.split(",").map(x => parseFloat(x));
							    Aagwa_config[feature_chart]["series"] = [lastData[0],lastData[1]]
					            //const text_subtitle = lastDataConfig.extra.hasOwnProperty("max_year_literal") ? `${lastDataConfig.extra["max_year_literal"]}` : "";
					    		AdmindUtils.createLineChart(Aagwa_config[feature_chart]);*/
		                    }
		                }
		            }
                }];
				AdmindUtils.createMapFromGEOJSON(Aagwa_config[feature])
			}

	    },
	    async launchAnomalyHeatmaps(settings,extra){
	    	if(!Aagwa_config.hasOwnProperty("mapData")){
				await Aagwa_config.get_country_geojson();
			}

			console.log("Aagwa_config.mapData")
			console.log(Aagwa_config.mapData)
	    	console.log("settings");
	    	console.log(settings);
	    	console.log("extra");
	    	console.log(extra);
	    	//const dataset = event.target.dataset;
	    	const feature = settings.feature;
	    	//if(Aagwa_config.hasOwnProperty(feature) && typeof(Aagwa_config[feature]) === "object" && Aagwa_config[feature].settings.hasOwnProperty("rows_container")){
    		const container_id = extra["container_id"];
    		
	    	const str = 
	    	`<div class="row">
			    <div class="col-lg-5 col-md-6 col-sm-12 col-xs-12">
			        <div id="container-${feature}" class="geojson-container" data-feature="${feature}"></div>
			    </div>
			    <div class="col-lg-7 col-md-6 col-sm-12 col-xs-12 aagwa-scroll-into-view" style="vertical-align:bottom;padding-left:35px;">
			        <div id="info-chart-${feature}" >
			            <div class="subheader">${settings["subheader_title"]}</div>
			            <h2></h2>
			            <div id="container-chart-${feature}" data-feature="${feature}"></div>
			        </div>
			    </div>
			</div>`;
			document.getElementById(container_id).insertAdjacentHTML("beforeend",str);


			const config = {
				"custom_url" : General_config.aagwa_request_url,
				"object_id" : Aagwa_config.anomalyHeatmapsObjectID,
				"type" : "modules",
				"parent_id" : Aagwa_config.anomaly_heatmaps_table,
				"where_column" : "country",
				"where_value" : Aagwa_config.country,
				"last_data_param" : [{"type":"field","value":"id"},{"type":"field","value":"id"},{"type":"field","value":"id"}],
				"additional_data" : ["latest_month","max_year_literal","min_year_literal","subtitle"],
				"excludeVar" : [],
				//"subtype" : "launch_input",
				"return" : true
			};

			const lastData = await AdmindUtils.getLastData(config);
			console.log("lastData");
			console.log(lastData);
			Aagwa_config[feature] = settings;
    		Aagwa_config[feature]["map_title"] = {
                "text" : 'Anomaly Detection Heatmap'
            };
            if( typeof(lastData) === "object" && lastData.hasOwnProperty("extra") && typeof(lastData.extra) === "object" && lastData.hasOwnProperty("result") && Array.isArray(lastData.result) && lastData.result.length ){

            	// const text_subtitle = lastData.extra.hasOwnProperty("min_year_literal") && lastData.extra.hasOwnProperty("max_year_literal") ? `From ${lastData.extra["min_year_literal"]} to ${lastData.extra["max_year_literal"]}` : "";
            	const text_subtitle = lastData.extra["subtitle"];
	    		Aagwa_config[feature]["map_subtitle"] = {
	                "text" : text_subtitle
	            };
	            const latest_year = lastData.extra.hasOwnProperty("max_year_literal") ? lastData.extra["max_year_literal"] : "" ;
	            const latest_month = lastData.extra.hasOwnProperty("latest_month") ? lastData.extra.latest_month : "";
	            Aagwa_config[feature]["pointFormat"] = `<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/><span style='font-size:14px'>${latest_month} ${latest_year} NDVI:</span><br/><span style='font-weight:bold;font-size:14px'> {point.value:.2f}</span>`;
	            Aagwa_config[feature]["nullFormat"] = `<span style='color:#952038;font-weight:bold;font-size:18px;text-align:center;'>{point.location_name}</span><br/>`;
	            //lastData.result[24]["value"] = 26.9
	            Aagwa_config[feature]["colorAxis"] = {
			        // min: settings.min,
			        // max: settings.max,
			        // reversed: false,
			        stops: [
			            [0.2, 'lightblue'],
			            [0.4, '#CBDFC8'],
			            [0.6, '#F3E99E'],
			            [0.9, '#F9A05C']
			        ],
			        /*labels: {
			            format: '{value}'
			        }*/
			    };
			   	Aagwa_config[feature]["chart"] = {
			        type: 'heatmap',
			        marginTop: 40,
			        marginBottom: 80,
			        plotBorderWidth: 1,
			        scrollablePlotArea: {
			            minHeight: 2000
			        },
			        events: {
			            click: function(event) {
			            	console.log(event.point)
			                // This function will be executed when any empty area of the map is clicked.
			                // The 'event' object contains details about the click, such as coordinates.
			                console.log('Clicked on empty map area!');
			                console.log('Click coordinates (chart pixels):', event.chartX, event.chartY);

			                // You can also access the map coordinates if needed:
			                // var mapCoords = this.pointer.getCoordinates(event);
			                // console.log('Click coordinates (map units):', mapCoords.x, mapCoords.y);
			            }
			        }
			    }
			    /*lastData.result = lastData.result.map((x)=>{
			    	console.log("x")
			    	console.log(x.value == null)
			    	if (!x.value){
			    		x["color"] = "green";
			    	}
			    	console.log(x);
			    	return x;
			    })*/
	         	Aagwa_config[feature]["series"] = [{
                    data: lastData.result,
                    joinBy: ['GID_2', 'join_el'],
                    keys: ['location_name','join_el'],
                    allowPointSelect: true,
                    // nullInteraction: true,
                    //borderColor: 'red',
                    // nullColor: '#FF0000',
                    //nullInteraction: true,
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
                    },
                    point: {
		                events: {
		                    click: function() {
		                        // Access the clicked point's data
		                        console.log(this.options);
		                        const feature_chart = "anomaly_heatmaps_charts";
		                        const data_option = this.options;
		                        const configChart = {
									"custom_url" : General_config.aagwa_request_url,
									"object_id" : Aagwa_config.anomalyHeatmapsObjectID,
									"type" : "modules",
									"parent_id" : Aagwa_config.anomaly_heatmaps_table,
									"where_column" : "country",
									"where_value" : Aagwa_config.country,
									"last_data_param" : [
										{
										"type":"literal","value":this.options.join_el
										}
										
									],
									//"additional_data" : ["latest_period","max_year_literal","min_year_literal"],
									//"excludeVar" : [],
									"subtype" :feature_chart,
									"skip_root_parent" : true,
									"return" : false
								};
		                        /*var pointName = this.name;
		                        var pointValue = this.value;
		                        var pointLat = this.lat;
		                        var pointLon = this.lon;

		                        // Perform actions based on the click
		                        console.log('Clicked point:', pointName, 'Value:', pointValue);
		                        // Example: Display information in a custom label or update another element
		                        // ...*/

		                        AdmindUtils.getLastData(configChart,(lastDataC)=>{
		                        	console.log("lastlastDataCData");
									console.log(lastDataC);
									
									let final_data = [];

									/*const extra_config = {
										"check_leap_year":true,
									}*/
									const x_Axis = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
									let y_Axis = [];

									let min = lastDataC[0]["Jan"]
									let max = lastDataC[0]["Jan"]
									for( i = 0 ; i < x_Axis.length ; i += 1 ){
										for( j = 0 ; j < lastDataC.length ; j += 1 ){
											const currentValue = lastDataC[j][x_Axis[i]];
											if(currentValue < min ){
												min =currentValue;
											}
											if(currentValue > max){
												max = currentValue;
											}

											final_data.push([i,j,currentValue]);
											
										}
									}
									for( j = 0 ; j < lastDataC.length ; j += 1 ){
										y_Axis.push(lastDataC[j].year)
									}
									// console.log("x_Axis")
									// console.log(x_Axis)
									console.log("y_Axis")
									console.log(y_Axis)
									console.log("final_data")
									console.log(final_data)
									//AdmindUtils.buildCharComponentAnomalyHeatMap(lastDataC,0,final_data,extra_config);
									//return ;
									// console.log("Aagwa_config.crop_phenology_metrics_charts");
									// console.log(Aagwa_config.crop_phenology_metrics_charts);

									Aagwa_config[feature_chart] = {};
									Aagwa_config[feature_chart]["max"] = max;
									Aagwa_config[feature_chart]["min"] = min;
									// console.log("Aagwa_config.crop_phenology_metrics_charts");
									// console.log(Aagwa_config.crop_phenology_metrics_charts);


									Aagwa_config[feature_chart]["container"] = Aagwa_config.anomaly_heatmaps_chart_container;
									
									// console.log("Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]");
									// console.log(Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]);


									Aagwa_config[feature_chart]["map_title"] = {
						                "text" : `Anomaly Detection Heatmap for ${data_option.location_name} (As a deviation from the 40-year monthly average)`
						            }
						            /*Aagwa_config[feature_chart]["subtitle"] = {
						                "text" : 'As a deviation from the 40-year monthly average'
						            }*/
						            Aagwa_config[feature_chart]["yAxis"] = {
						            	categories : y_Axis,
								        /*title: {
								            text: 'Year',
								            align : 'high'
								        },*/
								        // reversed: true
								    };

								   /* const [SoS , Peak , Eos] = lastDataC[3]["data"].split("__sep__");
								    const categories = lastDataC[2].data.split(",");
								    console.log(categories.indexOf(SoS))
								    console.log(categories.indexOf(Peak))
								    console.log(categories.indexOf(Eos))*/
								    Aagwa_config[feature_chart]["xAxis"] = {
								    	categories : x_Axis,
								    	title: {
								            text: 'Month'
								        }
								    };
								    // lastDataC[0].data = lastDataC[0].data.split(",").map(x => parseFloat(x));
								    // lastDataC[1].data = lastDataC[1].data.split(",").map(x => parseFloat(x));
								    Aagwa_config[feature_chart]["series"] = {
								    	name : "Anomaly Heatmap Per Year",
								    	data : final_data,
								    	 borderWidth: 1,
								    	 dataLabels: {
								            enabled: true,
								            color: '#000000'
								        }
								    };
						            //const text_subtitle = lastDataConfig.extra.hasOwnProperty("max_year_literal") ? `${lastDataConfig.extra["max_year_literal"]}` : "";
						    		console.log(Aagwa_config[feature_chart])
						    		AdmindUtils.createDefaultHeatMapChart(Aagwa_config[feature_chart]);
						    		// AdmindUtils.createHeatMapChart(Aagwa_config[feature_chart]);
		                        });
								/*console.log("lastData");
								console.log(lastData);
								const feature_chart = "crop_phenology_metrics_charts";
								// console.log("Aagwa_config.crop_phenology_metrics_charts");
								// console.log(Aagwa_config.crop_phenology_metrics_charts);

								Aagwa_config[feature_chart] = {};
								// console.log("Aagwa_config.crop_phenology_metrics_charts");
								// console.log(Aagwa_config.crop_phenology_metrics_charts);


								Aagwa_config[feature_chart]["container"] = Aagwa_config.crop_phenology_metrics_chart_container
								
								// console.log("Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]");
								// console.log(Aagwa_config[Aagwa_config.crop_phenology_metrics_charts]);


								Aagwa_config[feature_chart]["map_title"] = {
					                "text" : `${data_option.location_name}, ${data_option.crop}-NDVI Time Series`
					            }
					            Aagwa_config[feature_chart]["yAxis"] = {
							        title: {
							            text: 'NDVI'
							        }
							    }

							    Aagwa_config[feature_chart]["xAxis"] = {
							    	categories : lastData[2].data.split(",")
							       
							    }
							    lastData[0].data = lastData[0].data.split(",").map(x => parseFloat(x));
							    lastData[1].data = lastData[1].data.split(",").map(x => parseFloat(x));
							    Aagwa_config[feature_chart]["series"] = [lastData[0],lastData[1]]
					            //const text_subtitle = lastDataConfig.extra.hasOwnProperty("max_year_literal") ? `${lastDataConfig.extra["max_year_literal"]}` : "";
					    		AdmindUtils.createLineChart(Aagwa_config[feature_chart]);*/
		                    }
		                }
		            },
		            /*dataLabels: {
		                enabled: true,
		                color: '#FFFFFF',
		                format: '{point.name}',
		                nullFormat: '',
		                nullColor: '#FF0000',
		            }*/
		            /*events: {
	                    click: function() {
	                        // Access the clicked point's data
	                        console.log(this.options);
	                    }
	                },*/
	                /*dataLabels: {
		                //enabled: true,
		                nullFormatter: function() {
		                    return 'N/A'; // Display 'N/A' for null values
		                    // return undefined; // To hide the data label for null values
		                }
		            }*/
                }];
                Aagwa_config[feature]["chart"] = {
					// height: 300,
					// margin: 10,
					// height: 700,
					map: Aagwa_config.mapData,
					/*"events" : {
						click: function(node_event){
							console.log(this);
						}
					}*/
				}
				AdmindUtils.createMapFromGEOJSON(Aagwa_config[feature])
			}
			//insert geojson here
			//}
	    }
	}
}()
if(document.getElementById("country-name")){
	Aagwa_config.currentCountry = document.getElementById("country-name").value;
}
