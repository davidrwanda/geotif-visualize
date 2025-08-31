const AdmindUtils = {
	makeRequest : async function(url,request_json,text = false){
		//const url = "php/ebr/theme_parameters.php";

		try {
			const response = await fetch(url,request_json);
			////console.log("moone")
			if (!response.ok) {
			  throw new Error(`Response status: ${response.status}`);
			}
			if(text === true){
				//console.log(await response.text());
				return;
			}
			const json = await response.json();
			return json;
			//////console.log(response.text());
			//////console.log(json);
			//callback(json);
		} catch (error) {
			//console.error(error);
			return {
				"type":"error",
				"message":error.message
			}
		}

	},
	customizePage(){
		const node = document.getElementById('feature-title');

		//console.log(node);

		if( node ){
			
			const queryType = node.dataset["queryType"];
			const objectInfo = aagwa.systemObjectInfo[queryType];

			const object_id = objectInfo["id"];
			const object_type = objectInfo["type"];
			
			const json_object = aagwa.getObject(object_id,object_type);

			const node_label = aagwa.getObjectFieldLocalized(json_object,objectInfo["name_field"]);
			node.innerHTML = node_label;

			const table = aagwa.variableToTable(object_id,objectInfo["type"]);
			

			
			//console.log(table);
			
			if(table){
				const config = {
					"type":object_type,
					"object_id":object_id
				};

				const breadcrumb = aagwa.generate_breadcrumb(config);	

				//console.log("breadcrumb");
				//console.log(breadcrumb);

				if(breadcrumb){
					document.getElementById('breadcrumb-container').innerHTML = "";
					document.getElementById('breadcrumb-container').appendChild(breadcrumb);
				}

				document.getElementById('table-container').innerHTML = "";
				document.getElementById('table-container').appendChild(table);

				const conf_get_data = {
					"type":objectInfo["type"],
					"object_id":object_id,
					"table_id" : table.getAttribute("id")
				}
				//console.log("objectInfo")
				//console.log(objectInfo)
				if( objectInfo["pathSU"].length === 0 ){
					AdmindUtils.getAllData(conf_get_data)
				}
			}

		}
		
	},
	addObjectSystem : async function (event){

		
		
		// if(dataset.hasOwnProperty("type") && dataset.hasOwnProperty("object_id") && dataset.hasOwnProperty("table_id")){
		if(event && typeof(event) === "object" && event.target && typeof(event.target) === "object" && event.target.dataset ){
			const dataset = event.target.dataset;
			const object_id = dataset["queryType"];
			const objectInfo = aagwa.systemObjectInfo[object_id];
			//console.log("objectInfo");
			//console.log(objectInfo);
			const type = objectInfo["type"];
			
			const table_id = `table-${object_id}`;

			const is_filled = AdmindUtils.checkIfBreadcrumbISFilled();
			if( !is_filled){
				return ;
			}
			const config = {
				"type":type,
				"object_id":object_id,
				"table_id":table_id,
			};

			//console.log("config")
			//console.log(config)

			//return ;
			let node_list = [];
			const json_object = aagwa.getObject(object_id,type);
			
			const node_label = aagwa.getObjectFieldLocalized(json_object,objectInfo["name_field"]);
			document.getElementById('staticBackdropLabel').innerHTML = `Add ${node_label}`;
			let collection;
			if( type === "surveyUnit"){
				
				
				if( json_object.hasOwnProperty("properties") ){
					
					const jVar = json_object["properties"];
					let configSUVar = {};
					if( jVar.hasOwnProperty("autofill") && jVar["autofill"].hasOwnProperty("target") && Array.isArray(jVar["autofill"]["target"]) && jVar["autofill"]["target"].indexOf("mysql") != -1 && jVar["autofill"].hasOwnProperty("expression") && Array.isArray(jVar["autofill"]["expression"]) && jVar["autofill"]["expression"].length > 0 ){
							// configVar["autofill"] = [];
						const data = await DashBoardExtra.browseExpression(jVar["autofill"]["expression"],0);
						////console.log("data autofill");
						////console.log(data);
						if( Array.isArray(data) && data.length > 0 ){
							configSUVar["options"] = data;
						}
					}

					let form_node_elt = aagwa.getVariableHtmlTag(jVar,configSUVar);
					form_node_elt.children[1].setAttribute("data-get_label","true");
					form_node_elt.children[1].setAttribute("name",json_object["properties"]["name"]);
					node_list.push(form_node_elt);
					collection = json_object["properties"]["name"];
				}

			}
			else{
				collection = json_object["name"];
			}
			await aagwa.variableToForm(config,node_list);
			if( node_list.length > 0 ){

				let save_object_form_button = document.getElementById('save-object-form');
				save_object_form_button.setAttribute("data-object_id",object_id);
				save_object_form_button.setAttribute("data-type",type);
				save_object_form_button.setAttribute("data-table_id",table_id);
				save_object_form_button.setAttribute("data-collection",collection);
				save_object_form_button.setAttribute("data-origin","add");
				// const breadcrumb = aagwa.generate_breadcrumb(config);

				////console.log(node_list);

				let parent_node = document.getElementById("object-form");
				parent_node.replaceChildren(...node_list);
				// parent_node.replaceChildren(breadcrumb,...node_list);

				let modalForm = document.querySelector('#modal-form');


				const configObject = { keyboard: false }
				const modal1 = new bootstrap.Modal(modalForm, configObject);

				modal1.show();

				// const first_form_elt = modalForm.querySelector(".object-form-elt");
				/*const first_form_elt = modalForm.getElementsByClassName("object-form-elt")[0];
				////console.log("first_form_elt")
				////console.log(first_form_elt)
				if (first_form_elt){
					first_form_elt.mousedow();
					// first_form_elt.select();
				}*/
			}

		}
	},
	editObjectSystem : async function(event){
		
		const table_body = document.getElementById("table-body");
		//const checked = table_body.querySelector('input.form-check-input[type="checkbox"]:checked');
		
		// const row_id = checked.value;
		const dataset = event.target.dataset;
		//console.log("dataset");
		//console.log(dataset);
		if( dataset && typeof(dataset) === "object" && dataset.hasOwnProperty("id")){	
			const row_id = dataset.id;
			////console.log(row_id);
			const tr = table_body.querySelector(`tr[data-id="${row_id}"]`);
			//console.log(tr);
			if(dataset.hasOwnProperty("object_type") && dataset.hasOwnProperty("object_id") && this.dataset.hasOwnProperty("table_id")){
				////console.log(this.dataset);
				
				const type = dataset["object_type"];
				const object_id = dataset["object_id"];
				const table_id = dataset["table_id"];


				const objectInfo = aagwa.systemObjectInfo[object_id];

				const config = {
					"type":type,
					"object_id":object_id,
					"table_id":table_id,
					"data":{
						"callback":AdmindUtils.getDataFromNode,
						"value":tr
					}
				};

				let node_list = [];
				const json_object = aagwa.getObject(object_id,type);
				let collection;
				if( type === "surveyUnit"){
					
					
					if( json_object.hasOwnProperty("properties") ){
						const jVar = Object.assign({},json_object["properties"]);
						jVar.caracteristique.nomVariable = json_object["properties"]["name"];
						let form_node_elt = aagwa.getVariableHtmlTag(jVar,config);
						form_node_elt.children[1].setAttribute("data-get_label","true");
						form_node_elt.children[1].setAttribute("name",json_object["properties"]["name"]);
						node_list.push(form_node_elt);
						collection = json_object["properties"]["name"];
					}

				}
				else{
					collection = json_object["name"];
				}
				await aagwa.variableToForm(config,node_list);
				if( node_list.length > 0 ){

					let save_object_form_button = document.getElementById('save-object-form');
					save_object_form_button.setAttribute("data-row_id",row_id);
					save_object_form_button.setAttribute("data-object_id",object_id);
					save_object_form_button.setAttribute("data-type",type);
					save_object_form_button.setAttribute("data-table_id",table_id);
					save_object_form_button.setAttribute("data-collection",collection);
					save_object_form_button.setAttribute("data-origin","edit");
					// const breadcrumb = eatlas.generate_breadcrumb(config);

					////console.log(node_list);

					let parent_node = document.getElementById("object-form");
					parent_node.replaceChildren(...node_list);
					// parent_node.replaceChildren(breadcrumb,...node_list);

					const node_label = aagwa.getObjectFieldLocalized(json_object,objectInfo["name_field"]);
					document.getElementById('staticBackdropLabel').innerHTML = `Edit ${node_label}`;
					let modalForm = document.querySelector('#modal-form');


					const configObject = { keyboard: false }
					const modal1 = new bootstrap.Modal(modalForm, configObject);

					modal1.show();
				}

			}
		}
		
	},
	getDataFromNode(node,jVar){
		const nameVar = jVar.caracteristique.nomVariable;
		////console.log(nameVar)
		const td =node.querySelector(`td[data-var = "${nameVar}"]`);
		////console.log("td");
		////console.log(td);
		if(td){
			////console.log("td.firstChild.nodeType")
			////console.log(td.firstChild.nodeType)
			const nodeType = td.firstChild.nodeType;
			if(nodeType === 3){
				////console.log("td.firstChild.text")
				////console.log(td.firstChild.nodeValue)
				return td.firstChild.nodeValue;
			}
		}
	},
	deleteObjectSystem : async function(event){
		if (confirm("Do you really want to delete this items ?")){
			////console.log(this.dataset);
			const dataset = event.target.dataset;
			//console.log("dataset");
			//console.log(dataset);
			if( dataset && typeof(dataset) === "object" && dataset.hasOwnProperty("id") && dataset.hasOwnProperty("object_type") && dataset.hasOwnProperty("object_id") && dataset.hasOwnProperty("table_id")){

				const row_id = dataset["id"];
				const table_body = document.getElementById('table-body');
				//const tr_delete = table_body.querySelector(`tr[data-id="${row_id}"]`);

				//let node_checked = table_body.querySelectorAll('input.form-check-input[type="checkbox"]:checked');
				////console.log(node_checked);
				//if( tr_delete ){
					let tab_id = [row_id];
					/*node_checked.forEach((elt) => {
						tab_id.push(elt.value)
					});*/

					////console.log(tab_id);

					//if(this.dataset.hasOwnProperty("type") && this.dataset.hasOwnProperty("object_id") && this.dataset.hasOwnProperty("table_id")){
						////console.log(this.dataset);
						const object_type = dataset["object_type"];
						const object_id = dataset["object_id"];
						const table_id = dataset["table_id"]

						const json_object = aagwa.getObject(object_id,object_type);
						const collection = json_object["name"];
						body = {
							// "type" : "add_data",
							"type" : "delete_data",
							// "data" : data,
							"collection":collection,
							//"tab_var":tab_var,
							"tab_data":tab_id,
							//"id":data["id"]
						};

						const url = "request/aagwa_request.php";

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
						const jSonResponse = await AdmindUtils.makeRequest(url,json);
						////console.log("jSonResponse");
						////console.log(jSonResponse);

						if(jSonResponse && typeof(jSonResponse) === "object" && jSonResponse.hasOwnProperty("type") && jSonResponse["type"] === "success"){
							tab_id.forEach((id_tr)=>{
								tr = table_body.querySelector(`tr[data-id="${id_tr}"]`)
								if(tr){
									tr.remove();
								}
							})
							
						}

					//}
				//}
			}
			
		}
	},
	getAllData : async function(config){
		////console.log(config);
		if( config["object_id"] && config["type"] ){
			const type = config["type"];
			const object_id = config["object_id"];
			
			// const collection = config["collection"];
			// const origin = config["origin"];

			const json_object = aagwa.getObject(object_id,type);
			////console.log(json_object);
			if( json_object ){
				let body = {
					"type" : "get_all_data",
					"collection":json_object["name"]
				};

				if(config.hasOwnProperty("where_column") ){
					body["where_column"] = config["where_column"];
				}

				if(config.hasOwnProperty("where_value") ){
					body["where_value"] = config["where_value"];
				}

				if(config.hasOwnProperty("select") ){
					body["select"] = config["select"];
				}

				const order_by = aagwa.getFirstColumn(object_id,type);
				if(order_by){
					body["order_by"] = order_by;
				}

				////console.log("order_by");
				////console.log(order_by);

				if( config.hasOwnProperty("inner_join") && config["inner_join"] === true ){
					body["inner_join"] = true;
					body["join_table"] = config["join_table"] ;
					body["join_left"] = config["join_left"];
					body["join_right"] = config["join_right"];
				}

				let url = "request/aagwa_request.php";
				if(config.hasOwnProperty("custom_url") ){
					url = config["custom_url"];
				}
				////console.log("body");
				////console.log(body);

				const json = {
					"headers": {
						"Content-Type": "application/json"
					},
					"method": "POST",
					"body":JSON.stringify(body)
				};

				const jSonResponse = await this.makeRequest(url,json);
				//console.log("jSonResponse");
				//console.log(jSonResponse);

				if( jSonResponse && typeof(jSonResponse) === "object" && jSonResponse.hasOwnProperty("type") && jSonResponse["type"] === "success" && jSonResponse.hasOwnProperty("msg") && Array.isArray(jSonResponse["msg"]) && jSonResponse["msg"].length > 0 ){
					const data = jSonResponse["msg"]
					////console.log("data");
					////console.log(data);
					if( config.hasOwnProperty("return") && config["return"] === true ){
						return data;
					}
					else if(config["table_id"]){
						const table_id = config["table_id"];

						AdmindUtils.deleteEmptyRowTable(table_id);

						for( let i = 0 ; i < data.length ; i += 1 ){
							AdmindUtils.addNewRowToTable(table_id,data[i],config);
						}
					}
				}
			}
		}
	},
	getLastData : async function(config,callback){
		////console.log(config);
		if( config["object_id"] && config["type"] ){
			const type = config["type"];
			const object_id = config["object_id"];
			
			// const collection = config["collection"];
			// const origin = config["origin"];

			const json_object = aagwa.getObject(object_id,type);
			////console.log(json_object);
			if( json_object ){
				let body = {
					"type" : "get_last_data",
					"collection":json_object["name"],
					"where_column" : config["where_column"],
					"where_value" : config["where_value"],
					"last_data_param" : config["last_data_param"]
				};
				if( config.hasOwnProperty("subtype") ){
					body["subtype"] = config["subtype"];
				}
				if( config.hasOwnProperty("additional_data") ){
					body["additional_data"] = config["additional_data"];
				}
				if(config.hasOwnProperty("skip_root_parent") && config["skip_root_parent"] ===  true){
					body["skip_root_parent"] = true;
				}
				else{
					body["skip_root_parent"] = false;
				}
				/*if(config.hasOwnProperty("where_column") ){
					body["where_column"] = config["where_column"];
				}

				if(config.hasOwnProperty("where_value") ){
					body["where_value"] = config["where_value"];
				}

				if(config.hasOwnProperty("select") ){
					body["select"] = config["select"];
				}

				const order_by = aagwa.getFirstColumn(object_id,type);
				if(order_by){
					body["order_by"] = order_by;
				}

				////console.log("order_by");
				////console.log(order_by);

				if( config.hasOwnProperty("inner_join") && config["inner_join"] === true ){
					body["inner_join"] = true;
					body["join_table"] = config["join_table"] ;
					body["join_left"] = config["join_left"];
					body["join_right"] = config["join_right"];
				}*/

				let url = "request/aagwa_request.php";
				if(config.hasOwnProperty("custom_url") ){
					url = config["custom_url"];
				}
				console.log("body");
				console.log(body);

				const json = {
					"headers": {
						"Content-Type": "application/json"
					},
					"method": "POST",
					"body":JSON.stringify(body)
				};

				const jSonResponse = await this.makeRequest(url,json);
				console.log("jSonResponse");
				console.log(jSonResponse);

				if( jSonResponse && typeof(jSonResponse) === "object" && jSonResponse.hasOwnProperty("type") && jSonResponse["type"] === "success" && jSonResponse.hasOwnProperty("msg") && ((Array.isArray(jSonResponse["msg"]) && jSonResponse["msg"].length > 0 ) || (typeof(jSonResponse["msg"]) == "object") ) ){
					const data = jSonResponse["msg"];
					////console.log("data");
					////console.log(data);
					if( config.hasOwnProperty("return") && config["return"] === true ){
						return data;
					}
					else if( typeof(callback) === "function" ){
						callback(data)
					}
					else if(config["table_id"]){
						const table_id = config["table_id"];

						AdmindUtils.deleteEmptyRowTable(table_id);

						for( let i = 0 ; i < data.length ; i += 1 ){
							AdmindUtils.addNewRowToTable(table_id,data[i],config);
						}
					}
				}
			}
		}
	},
	addNewDataAttributeIfNeeded(node,jVar){
		if(jVar.caracteristique.typeVariable === "select"){
			node.setAttribute("data-type_var","select")
		}
		else if(jVar.caracteristique.typeVariable === "checkbox"){
			node.setAttribute("data-type_var","checkbox");
		}
	},
	checkIfBreadcrumbISFilled(){
		is_filled = true;
		const breadcrumb_su_container = document.getElementById("breadcrumb-su-container");
		if(breadcrumb_su_container){
			const tab_breadcrumb_item_select = breadcrumb_su_container.querySelectorAll(".breadcrumb-item-select");
			
			if( tab_breadcrumb_item_select.length > 0 ){
				let i = 0;
				while( i < tab_breadcrumb_item_select.length ){
					const node = tab_breadcrumb_item_select[i];
					if(!node.value){
						node.classList.add("border","border-danger");
						// node.classList.add("border-danger");
						is_filled = false;
					}
					else{
						node.classList.remove("border","border-danger");
						// node.classList.remove();
					}
					////console.log(node.selectedIndex)
					////console.log(node.value)
					i += 1;
				}
			}
		}
		return is_filled;
	},
	sendFormData : async function(data,tab_var,tab_data,config){
		////console.log(config);
		if( config["object_id"] && config["type"] && config["table_id"] && config["collection"]  && config["origin"] ){
			const type = config["type"];
			const object_id = config["object_id"];
			const table_id = config["table_id"];
			const collection = config["collection"];
			const origin = config["origin"];

			const json_object = aagwa.getObject(object_id,type);
			////console.log(json_object);
			////console.log(origin)
			let id;
			let type_request = "add_data";
			if(origin === "add"){
				id = crypto.randomUUID();
				////console.log('Your UUID is: ' + id);
				data["id"] = id;
				tab_var.push('id');
				tab_data.push(id);
			}
			else if(origin === "edit"){
				if(config.hasOwnProperty("row_id")){
					id = config["row_id"];
					type_request = "edit_data";
					data["id"] = id;
					//tab_var.push('id');
					//tab_data.push(id);
				}
				else{
					alert('error row id not set');
					return;
				}
				
			}

			if(json_object){
				let body;

				
				if(origin === "edit"){
					body = {
						// "type" : "add_data",
						"type" : type_request,
						// "data" : data,
						"collection":collection,
						"tab_var":tab_var,
						"tab_data":tab_data,
						//"tab_file":tab_file,
						"id":data["id"]
					};
				}
				else{
					body = {
						// "type" : "add_data",
						"type" : type_request,
						"data" : data,
						"collection":collection,
						"tab_var":tab_var,
						"tab_data" : tab_data,
						//"tab_file" : tab_file
					};
				}
				


				// return ;
				const url = "request/aagwa_request.php";

				//console.log("body");
				//console.log(body);
				//return ;
				const json = {
					"headers": {
						"Content-Type": "application/json",
						//"enctype" : "multipart/form-data"
					},
					"method": "POST",
					"body":JSON.stringify(body)
				}
				const jSonResponse = await this.makeRequest(url,json);
				//console.log("jSonResponse");
				//console.log(jSonResponse);

				if(jSonResponse && typeof(jSonResponse) === "object" && jSonResponse.hasOwnProperty("type") && jSonResponse["type"] === "success"){
					////console.log("data");
					////console.log(data);
					if(origin === "add"){
						AdmindUtils.addNewRowToTable(table_id,data,config);
					}
					else if (origin === "edit"){
						AdmindUtils.editRowToTable(table_id,data,id);
					}
				}
				
			}

			//callback(jSonResponse);
		}
	},
	sendFormDataObject : async function(data,tab_var,tab_data,tab_var_file,tab_data_file,config){
		////console.log(config);
		if( config["object_id"] && config["type"] && config["table_id"] && config["collection"]  && config["origin"] ){
			const type = config["type"];
			const object_id = config["object_id"];
			const table_id = config["table_id"];
			const collection = config["collection"];
			const origin = config["origin"];

			const json_object = aagwa.getObject(object_id,type);
			////console.log(json_object);
			////console.log(origin)
			let id;
			let type_request = "add_data";
			if(origin === "add"){
				id = crypto.randomUUID();
				////console.log('Your UUID is: ' + id);
				data["id"] = id;
				//data.append("id",id);
				tab_var.push('id');
				tab_data.push(id);
			}
			else if(origin === "edit"){
				if(config.hasOwnProperty("row_id")){
					id = config["row_id"];
					type_request = "edit_data";
					data["id"] = id;
					//data.append("id",id);
					//tab_var.push('id');
					//tab_data.push(id);
				}
				else{
					alert('error row id not set');
					return;
				}
				
			}

			if(json_object){
				let body = new FormData();

				
				if(origin === "edit"){
					body.append("id",id);
				}
				
				body.append("type",type_request);
				body.append("collection",collection);
				body.append("tab_var",JSON.stringify(tab_var));
				body.append("tab_data",JSON.stringify(tab_data));
				body.append("parent_id",data["parent_id"]);

				if( tab_var_file.length > 0){
					body.append("tab_var_file",JSON.stringify(tab_var_file));
					for( let i = 0 ; i < tab_var_file.length ; i += 1 ){
						body.append(tab_var_file[i],tab_data_file[i]);
					}
				}

				// return ;
				const url = "request/aagwa_request2.php";

				//console.log("body");
				//console.log(body);
				//return ;
				const json = {
					"headers": {
						//"Content-Type": "application/json",
						//"Content-Type" : "multipart/form-data"
					},
					"method": "POST",
					"body":body
					// "body":JSON.stringify(body)
				}
				//delete json.headers['Content-Type'];
				const jSonResponse = await this.makeRequest(url,json);
				//console.log("jSonResponse");
				//console.log(jSonResponse);

				if(jSonResponse && typeof(jSonResponse) === "object" && jSonResponse.hasOwnProperty("type") && jSonResponse["type"] === "success"){
					////console.log("data");
					////console.log(data);
					if(jSonResponse.hasOwnProperty("msg")){
						data = Object.assign(data,jSonResponse["msg"]);
					}
					if(origin === "add"){
						AdmindUtils.addNewRowToTable(table_id,data,config);
					}
					else if (origin === "edit"){
						AdmindUtils.editRowToTable(table_id,data,id);
					}
				}
				
			}

			//callback(jSonResponse);
		}
	},
	editRowToTable(table_id,data,tr_id){
		// const table_column_container = document.getElementById("table-column-container");
		/*if( table_id && data && typeof(data) === "object" && table_column_container ){
			
		}*/
		////console.log("data");
		////console.log(data);
		////console.log("tr_id");
		////console.log(tr_id);
		if( data && typeof(data) === "object" && tr_id ){
			const table_body = document.getElementById("table-body");
			const tr = table_body.querySelector(`tr[data-id="${tr_id}"]`);

			if(tr){
				let children = tr.querySelectorAll("td");
				for( let i = 0 ; i < children.length ; i += 1 ){
					let td = children[i];
					if(td.dataset.hasOwnProperty("var") && data.hasOwnProperty(td.dataset["var"]) && td.firstChild.nodeType == 3){
						if(td.dataset.hasOwnProperty("type_var") && td.dataset["type_var"] === "select"){
							
							try{
								//const data_select = data[td.dataset["var"]] ;
								const data_select = JSON.parse(data[td.dataset["var"]]);
								////console.log("data_select select");
								////console.log(data_select);
								if(data_select.hasOwnProperty("label")){
									td.firstChild.nodeValue = data_select["label"];
								}
								else{
									td.firstChild.nodeValue = data[td.dataset["var"]];
								}
							}
							catch (error){
								////console.log("cannot parse json data for select edit Row");
								td.firstChild.nodeValue = data[td.dataset["var"]];
							}
						}
						else{
							td.firstChild.nodeValue = data[td.dataset["var"]];
						}
					}
				}
			}

		}
		let closeButton = document.getElementById("close-modal-form");
		////console.log("closeButton")
		////console.log(closeButton)
		closeButton.click();
	},
	deleteEmptyRowTable(table_id){
		const table_column_container = document.getElementById("table-column-container");
		if( table_id ){
			const dataTables_empty_List = document.getElementsByClassName("dataTables_empty");
			//console.log("dataTables_empty_List")
			//console.log(dataTables_empty_List)
			if(dataTables_empty_List && dataTables_empty_List.length > 0){
				dataTables_empty_List[0].parentNode.remove();
			}
		}
	},
	addNewRowToTable(table_id,data,config){
		//console.log("config addNewRowToTable")
		//console.log(config)
		const table_column_container = document.getElementById("table-column-container");
		if( table_id && data && typeof(data) === "object" && table_column_container ){
			table_node = document.getElementById(table_id);
			const children = table_column_container.querySelectorAll(".data-var-columm");
			let tr = aagwa.renderTag({
				"tag":"tr"
			})
			//tr.setAttribute("data-id",data["id"]);
			//console.log("data");
			//console.log(data);
			for( let i = 0 ; i < children.length; i += 1 ){
				const node = children[i];
				//console.log("node")
				//console.log(node)
				let value = "";
				let conf_td = {
					"tag":"td",
					"attributes":[],
					"children" : []
				};
				if(node.dataset.hasOwnProperty("var")){
					const nameVar = node.dataset["var"];
					conf_td["attributes"].push({
						"type":"data-var",
						"value" : nameVar
					});
					
					//console.log("nameVar")
					//console.log(nameVar)

					if(node.dataset.hasOwnProperty("type_var")){
						conf_td["attributes"].push({
							"type":"data-type_var",
							"value" : node.dataset["type_var"]
						});
					}

					if(data.hasOwnProperty(nameVar)){
						const dataVar = data[nameVar];
						//console.log(dataVar)
						//console.log(dataVar)
						if ( nameVar === "id" ) {
							tr.setAttribute("data-id",dataVar);
							/*<td>
								<a href="edit.php?id=<?= htmlspecialchars($a_research->id) ?>"
								   type="button" class="btn btn-primary"
								   title="Edit"><i
											class="fa fa-edit"></i></a>
								<a href="delete.php?id=<?= htmlspecialchars($a_research->id) ?>"
								   class="btn btn-danger delete-research"
								   title="Delete"><i class="fa fa-trash-o"></i></a>
							</td>*/
							value = {
								"tag":"span",
								"children" : [
									{
										"tag":"button",
										"attributes":[
											{
												"type":"title",
												"value" : "Edit"
											},
											{
												"type":"data-id",
												"value" : dataVar
											},
											{
												"type":"data-object_id",
												"value" : config["object_id"]
											},
											{
												"type":"data-table_id",
												"value" : config["table_id"]
											},
											{
												"type":"data-object_type",
												"value" : config["type"]
											},
											{
												"type":"classList",
												"value" : ["edit-row","btn","btn-primary",]
											}
										],
										"events" : [
											{
												"type" : "click",
												"value" : AdmindUtils.editObjectSystem
											}
										],
										"children" : [
											{
												"tag":"i",
												"attributes":[
													{
														"type":"classList",
														"value" : ["fa", "fa-edit"]
													},
													{
														"type":"data-id",
														"value" : dataVar
													},
													{
														"type":"data-object_id",
														"value" : config["object_id"]
													},
													{
														"type":"data-table_id",
														"value" : config["table_id"]
													},
													{
														"type":"data-object_type",
														"value" : config["type"]
													}
												]
											}
										]
									},
									{
										"tag":"button",
										"attributes":[
											{
												"type":"title",
												"value" : "Delete"
											},
											{
												"type":"data-id",
												"value" : dataVar
											},
											{
												"type":"data-object_id",
												"value" : config["object_id"]
											},
											{
												"type":"data-table_id",
												"value" : config["table_id"]
											},
											{
												"type":"data-object_type",
												"value" : config["type"]
											},
											{
												"type":"classList",
												"value" : ["delete-row","btn","btn-danger","ml-2"]
											}
										],
										"events" : [
											{
												"type" : "click",
												"value" : AdmindUtils.deleteObjectSystem
											}
										],
										"children" : [
											{
												"tag":"i",
												"attributes":[
													{
														"type":"classList",
														"value" : ["fa", "fa-trash-o"]
													},
													{
														"type":"data-id",
														"value" : dataVar
													},
													{
														"type":"data-object_id",
														"value" : config["object_id"]
													},
													{
														"type":"data-table_id",
														"value" : config["table_id"]
													},
													{
														"type":"data-object_type",
														"value" : config["type"]
													}
												]
											}
										]
									}
								]
								
							};

						}
						else if( typeof(dataVar) === "object" && dataVar ){
							if( dataVar.hasOwnProperty("label") ){
								value = dataVar["label"];
							}
						}
						else if( typeof(dataVar) === "string" || typeof(dataVar) === "number" ){
							////console.log("node.dataset")
							////console.log(node.dataset)
							if(node.dataset.hasOwnProperty("type_var")){
								const type_var = node.dataset["type_var"];
								if( type_var === "select"){
									
										try{
											const json_data = JSON.parse(dataVar);
											////console.log("json_data select")
											////console.log(json_data)
											if(json_data.hasOwnProperty("label")){
												value = json_data["label"];
											}
											else{
												value = dataVar;
											}
										}
										catch (error){
											////console.log("cannot parse json data for select");
											value = dataVar;
										}
									
								}
							}
							else{
								value = dataVar;
							}
						}
					}
				}
				
				

				if(typeof(value) === "object"){
					conf_td["children"].push(value);
				}
				else{
					conf_td["attributes"].push({
						"type":"text",
						"value":value
					});
				}

				let td = aagwa.renderTag(conf_td);
				
				tr.appendChild(td);
			}
			table_node.querySelectorAll("#table-body")[0].appendChild(tr);
		}

		let closeButton = document.getElementById("close-modal-form");
		////console.log("closeButton")
		////console.log(closeButton)
		closeButton.click();
	},
	sortListOfObject(tab,field){
		tab.sort(function(a,b){
			if (a[field] > b[field])
			  return 1;
			if (a[field] < b[field])
			  return -1;
			// a must be equal to b
			return 0;
		});
	},
	fillSurveyUnitSelectWithData(node,su_var,dataOption,sort_object){
		node.appendChild(aagwa.renderTag({
			"tag" : "option"
		}))
		if(sort_object){
			AdmindUtils.sortListOfObject(dataOption,su_var);
		}
		for( let i = 0 ; i < dataOption.length ; i += 1 ){
			const item = dataOption[i];
			if(item.hasOwnProperty("id") && item.hasOwnProperty(su_var) ){
				node.add(aagwa.renderTag({
					"tag" : "option",
					"attributes" : [
						{
							"type" : "value",
							"value" : item["id"]
						},
						{
							"type" : "text",
							"value" : item[su_var]
						}
					]
				}))
			}
		}
	},
	emptyTableContainer(parent_id){
		const node = document.getElementById(parent_id);
		if(node){
			node.querySelectorAll('*').forEach(child => child.remove());
		}
	},
	treatBreadcrumbItemSelect : async function(event){
		AdmindUtils.emptyTableContainer("table-body");
		//console.log(this.dataset);
		const that = this;

		//if(that.dataset.hasOwnProperty("var") && that.dataset.hasOwnProperty("object_id") && that.dataset.hasOwnProperty("type")){

			const parent_id = that.value;
			const parent_var = that.dataset.var;

			const object_id = that.dataset.object_id;
			const type = that.dataset.type;
			breadcrumb_su_container = document.getElementById("breadcrumb-su-container");
			// breadcrumb_su_container
			// ////console.log(breadcrumb_su_container.children);
			// ////console.log(this);

			// const tab_breadcrumb_item_select = breadcrumb_su_container.querySelectorAll("div.input-group > select.breadcrumb-item-select");
			const tab_breadcrumb_item_select = breadcrumb_su_container.querySelectorAll(".breadcrumb-item-select");
			//console.log(tab_breadcrumb_item_select);
			const indexCurrentSU = Array.from(tab_breadcrumb_item_select).indexOf(that);
			//console.log("indexCurrentSU")
			//console.log(indexCurrentSU)
			if(indexCurrentSU != -1){
				for( i = indexCurrentSU+1 ; i < tab_breadcrumb_item_select.length ; i += 1 ){
					const node = tab_breadcrumb_item_select[i];
					node.querySelectorAll('option').forEach(option => option.remove());
				}
				indiceNextSiblingSelect = indexCurrentSU + 1;
				if( indiceNextSiblingSelect < tab_breadcrumb_item_select.length ){

					
					//console.log(parent_id);
					//console.log(parent_var);
					if( parent_id ){

						nextSiblingSelect = tab_breadcrumb_item_select[indiceNextSiblingSelect];
						////console.log(nextSiblingSelect);
						////console.log(nextSiblingSelect.dataset);
						if(nextSiblingSelect.dataset.hasOwnProperty("object_id") && nextSiblingSelect.dataset.hasOwnProperty("type")){
							const nextSibling_type= nextSiblingSelect.dataset["type"];
							const nextSibling_object_id = nextSiblingSelect.dataset["object_id"];
							const json_object = aagwa.getObject(nextSibling_object_id,type);
							const conf_get_data = {
								"type":nextSibling_type,
								"object_id":nextSibling_object_id,
								"where_column":"parent_id",
								"where_value":parent_id,
								"return":true
							};
							// //console.log("conf_get_data");
							// //console.log(conf_get_data);
							dataOption = await AdmindUtils.getAllData(conf_get_data);
							////console.log(dataOption);
							if( Array.isArray(dataOption) && dataOption.length ){
								AdmindUtils.fillSurveyUnitSelectWithData(nextSiblingSelect,json_object["properties"]["name"],dataOption,true);
							}
						}
					}
				}
				else if( indiceNextSiblingSelect == tab_breadcrumb_item_select.length ){

					
					
					// const table_var_caption = document.getElementById("table-var-caption");
					const table_var_caption = document.getElementById("feature-title");
					if(table_var_caption && table_var_caption.dataset.hasOwnProperty("queryType") ){

						// const queryType = table_var_caption.dataset["queryType"];
						// const objectInfo_queryType = aagwa.systemObjectInfo[queryType];
						// //console.log("objectInfo_queryType");
						// //console.log(objectInfo_queryType);
						
						//return ;
						//const object_id_su_table = table_var_caption.dataset["object_id"];
						const object_id_su_table = table_var_caption.dataset["queryType"];
						
						const objectInfo = aagwa.systemObjectInfo[object_id_su_table];

						//console.log(objectInfo);
						//return ;
						if( parent_id ){
							const conf_get_data = {
								"type":objectInfo["type"],
								"object_id":object_id_su_table,
								"table_id" : "table-"+object_id_su_table,
								"where_column":"parent_id",
								"where_value":parent_id,
							}
							//console.log(conf_get_data);
							AdmindUtils.getAllData(conf_get_data);
						}
						
					}
				}
			}
	},
	getSelectedText(el) {
	  if (el.selectedIndex === -1) {
		return null;
	  }
	  return el.options[el.selectedIndex].text;
	},
	extractOption(settings){
		// //console.log("settings extractOption");
		// //console.log(settings);
		const followingVar = settings["followingVar"];
		let tabOption = {
			"filter" : [],
			// "options"[],
			"override_option" : false,
			"mapping" : {},
			"followingVar" : followingVar
		};
		const data = settings["data"];
		const nameVar = settings["nameVar"];
		const jVar = settings["jVar"];
		

		if( jVar.caracteristique.typeVariable === "select"){
			// //console.log(data)
			tabOption["options_info"] = {};
			for( let i = 0 ; i < data.length ; i +=1 ){
				const jData = data[i];
				if( jData && typeof(jData) === "object" && jData.hasOwnProperty(nameVar) ){
					
					const dataVar = jData[nameVar];

					if( tabOption["filter"].indexOf(jData[nameVar]) === -1 ){
						tabOption["filter"].push(jData[nameVar]);
					}
					
					// tabOption["options_info"][options["text"]] = options;
					
					if( followingVar.length > 0 ){
						if(!tabOption["mapping"].hasOwnProperty(dataVar)){
							tabOption["mapping"][dataVar] = {};
						}

						followingVar.forEach((x)=>{
							if( jData.hasOwnProperty(x)  ){
								if( !tabOption["mapping"][dataVar].hasOwnProperty(x) ){
									tabOption["mapping"][dataVar][x] = [];
								}
								if( tabOption["mapping"][dataVar][x].indexOf(jData[x]) == -1 ){
									tabOption["mapping"][dataVar][x].push(jData[x]);
								}
								/*if( tabOption["mapping"][dataVar][x].indexOf() ){
									tabOption["mapping"][dataVar][x] =  ;
								}*/
							}
						});
					}

				}
			}
		}
		else{
			tabOption["options"] = [];
			tabOption["override_option"] = true;
			for( let i = 0 ; i < data.length ; i +=1 ){
				const jData = data[i];
				if( jData && typeof(jData) === "object" && jData.hasOwnProperty(nameVar) ){
					const dataVar = jData[nameVar];

					let options = {
						text : dataVar
					}
					if( jData.hasOwnProperty("parent_id") ){
						options["parent_id"] = jData["parent_id"];
					}
					if( jData.hasOwnProperty("id") ){
						options["id"] = jData["id"];
					}
					if( tabOption["filter"].indexOf(options["text"]) === -1 ){
						tabOption["filter"].push(options["text"]);
						tabOption["options"].push(options);
					}
					if( followingVar.length > 0 ){
						if(!tabOption["mapping"].hasOwnProperty(dataVar)){
							tabOption["mapping"][dataVar] = {};
						}

						followingVar.forEach((x)=>{
							if( jData.hasOwnProperty(x)  ){
								if( !tabOption["mapping"][dataVar].hasOwnProperty(x) ){
									tabOption["mapping"][dataVar][x] = [];
								}
								if( tabOption["mapping"][dataVar][x].indexOf(jData[x]) == -1 ){
									tabOption["mapping"][dataVar][x].push(jData[x]);
								}
								/*if( tabOption["mapping"][dataVar][x].indexOf() ){
									tabOption["mapping"][dataVar][x] =  ;
								}*/
							}
						});
					}
					

				}
			}
		}
		// //console.log("tabOption")
		// //console.log(tabOption)
		return tabOption;

	},
	redrawSelectTagMapping(event){
		console.log("event.target.dataset redrawSelectTagMapping");
		console.log(event.target.dataset);
		if( event.target.dataset.hasOwnProperty("data_var") ){
			const selectedIndex = event.target.selectedIndex;
			const option_selected_node = event.target.options[selectedIndex];

			const data_var = JSON.parse(event.target.dataset.data_var);
			// //console.log("data_var");
			// //console.log(data_var);

			/*const field = event.target.value;
			const  value_current = isNaN(parseFloat(field)) ? field : parseFloat(field);
			//console.log("value_current");
			//console.log(value_current);
			//console.log("field");
			//console.log(field);*/

			const value_current = event.target.dataset.hasOwnProperty("get_label") && event.target.dataset.get_label === "true" ? option_selected_node.innerHTML : event.target.value;
			//console.log("value_current");
			//console.log(value_current);

			if( data_var && typeof(data_var) === "object" && data_var.mapping && typeof(data_var["mapping"]) === "object" && data_var["mapping"].hasOwnProperty(value_current) ){

				const data_current = data_var["mapping"][value_current];
				const followingVar = data_var["followingVar"];
				if( Array.isArray(followingVar) && followingVar.length > 0 ){

					// const target_id = event.target.getAttribute("id");
					const parent_id = event.target.dataset["parent_id"];
					const parent_node = document.getElementById(parent_id);
					console.log("parent_node")
					console.log(parent_node)

					followingVar.forEach((item) => {
						console.log("item")
						console.log(item)
						const node = parent_node.querySelector(`#${item}`);
						if(node){
							
							for(let i = node.options.length-1 ; i >= 0 ; i -= 1){
								node.remove(node.remove[i]);
							}
							
						}
					});
					const nextVar = followingVar[0];
					const nextVar_node = parent_node.querySelector(`#${nextVar}`);
					if( nextVar_node && nextVar_node.dataset.options_string ){
						const node_options =  new DOMParser().parseFromString(nextVar_node.dataset.options_string, "text/html");
						
						const tabOption = node_options.body.querySelectorAll("option");
						
						// //console.log("tabOption");
						// //console.log(tabOption);
						
						console.log("data_current");
						console.log(data_current);
						if( data_current.hasOwnProperty(nextVar) && Array.isArray(data_current[nextVar]) ){
							const tab_relevent_option = data_current[nextVar].sort();

							console.log("tab_relevent_option");
							console.log(tab_relevent_option);

							if( data_current[nextVar].length > 0  && nextVar_node.dataset.hasOwnProperty("get_label") && nextVar_node.dataset.get_label === "true" ){
								console.log("tabOption 1402");
								console.log(tabOption);
								tabOption.forEach((option_item) => {
									console.log("tab_relevent_option");
									console.log(tab_relevent_option);
									console.log("option_item.innerHTML");
									console.log(option_item.innerHTML);
									console.log("tab_relevent_option.indexOf(option_item.innerHTML)");
									console.log(tab_relevent_option.indexOf(option_item.innerHTML));
									console.log("tab_relevent_option.indexOf(option_item.innerHTML)");
									console.log(tab_relevent_option.indexOf(option_item.innerHTML));
									if( option_item.value === "" || tab_relevent_option.indexOf(option_item.innerHTML) != -1 || ( AdmindUtils.canConvertToNumber(option_item.innerHTML) === true &&  tab_relevent_option.indexOf(Number(option_item.innerHTML)) != -1 ) ){
										console.log("option_item")
										console.log(option_item)
										nextVar_node.options.add(option_item);
									}
								})
							}
							else{
								console.log("tabOption 1414");
								console.log(tabOption);
								tabOption.forEach((option_item) => {
									//console.log("option_item.value");
									//console.log(option_item.value);
									if( option_item.value === "" || tab_relevent_option.indexOf(option_item.value) != -1 || ( AdmindUtils.canConvertToNumber(option_item.valueL) === true &&  tab_relevent_option.indexOf(Number(option_item.value)) != -1 ) ){
										nextVar_node.options.add(option_item);
									}
								})
							}
						}

					}

					/*followingVar.forEach((item) => {
						//console.log("item");
						//console.log(item);
						const node = parent_node.querySelector(`#${item}`);
						if(node){
							// //console.log(node.dataset);
							for(let i = node.options.length-1 ; i >= 0 ; i -= 1){
								node.remove(node.remove[i]);
							}

						}
					});*/

					
					/*const formElts = parent_node.getElementsByClassName("object-form-elt");
					//console.log(formElts);
					////console.log(parent_node.indexOf(event.target));

					let curentEltFound = false;
					formElts.forEach((item) =>{
						if( item.target.getAttribute("id") === taget_id ){
							curentEltFound = true;
						}
						else if( curentEltFound === true ){
							const nameVar = item.target.getAttribute("name");
							if(  ){

							}
						}
					})*/
				}
			}
		}
	},
	canConvertToNumber(str) {
      return !isNaN(Number(str)); // Or !isNaN(+str)
    },
	renderVisualizationTools(settings){
		//console.log()
		const feature = settings["feature"];
		const sibling = settings["sibling"]; //ag_crop_mapping

		let str_colorscaleselect = "";
		/*if( settings.hasOwnProperty("from_georaster") && settings["from_georaster"] === true ){
			str_colorscaleselect = `onchange="AdmindUtils.changePixelColor('${feature}-ex1_colorscaleselect');"`;
		}*/

		const tabListElt = 	`<li><a href="#${feature}-settings" role="tab"><i class="fa fa-gear "></i></a></li>`;
		const pane = `<div class="leaflet-sidebar-pane" id="${feature}-settings">
						<h1 class="leaflet-sidebar-header">
							Visualization Tools
							<span class="leaflet-sidebar-close"><i
									class="fa fa-caret-left"></i></span>
						</h1>
						<p>
						<div class="col-lg-12 col-sm-12 iq-sm-mt-30">
							<h5 class="centered_text">Filter</h5>
							<div class="row">
								<div class="col-md-12">
									<!-- Min -->
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<table class="min_max_table">
										<tr>
											<td>
												<label>Min</label>
											</td>
											<td>
												<div class="range-wrap">
													<div
														class="rangeV_min range-value" id="${feature}-rangeV_min"></div>
														<input id="${feature}-ex1_min" type="range" min="12" max="1948" value="12" class="ex1_min">
												</div>
											</td>
										</tr>
									</table>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<table class="min_max_table">
										<tr>
											<td>
												<label>Max</label>
											</td>
											<td>
												<div class="range-wrap">
													<div
														class="range-value_max rangeV_max" id="${feature}-rangeV_max"></div>
														<input id="${feature}-ex1_max" type="range" min="12" max="1948" value="1948" class="ex1_max">
												</div>
											</td>
										</tr>
									</table>
								</div>
							</div>
							<h5 class="centered_text mg_bottom_20 mg_top_20">
								Color scale</h5>
							<div class="row">
								<div class="col-md-12">
							   <span class="custom-dropdown big">
								 <select id="${feature}-ex1_colorscaleselect" class="ex1_colorscaleselect" ${str_colorscaleselect} data-feature="${feature}">
								   <option value="viridis">viridis</option>
								   <option value="inferno">inferno</option>
								   <option value="rainbow">rainbow</option>
								   <option value="jet">jet</option>
								   <option value="hot">hot</option>
								   <option value="greys">greys</option>
								   <option value="yignbu">yignbu</option>
								   <option value="greens">greens</option>
								   <option value="yiorrd">yiorrd</option>
								   <option value="bluered">bluered</option>
								   <option value="rdbu">rdbu</option>
								   <option value="picnic">picnic</option>
								   <option value="portland">portland</option>
								   <option value="blackbody">blackbody</option>
								   <option value="earth">earth</option>
								   <option value="spectral">spectral</option>
								   <option value="paired">paired</option>
								   <option value="electric">electric</option>
								 </select>
							   </span>
								</div>
							</div>
						</div>
						</p>
					</div>`;
		
		return {
			tabListElt : tabListElt,
			pane : pane
		};
		
	},
	renderDownloadTools(settings){
		//console.log()
		const feature = settings["feature"];
		const sibling = settings["sibling"]; //ag_crop_mapping

		let str_colorscaleselect = "";
		/*if( settings.hasOwnProperty("from_georaster") && settings["from_georaster"] === true ){
			str_colorscaleselect = `onchange="AdmindUtils.changePixelColor('${feature}-ex1_colorscaleselect');"`;
		}*/

		const tabListElt = 	`<li><a href="#${feature}-prod_map_download" role="tab"><i class="fa fa-download "></i></a></li>`;
		//const tabListElt = <li><a href="#prod_map_download" role="tab"><i class="fa fa-download"></i></a></li>
		const pane = `<div class="leaflet-sidebar-pane" id="${feature}-prod_map_download" >
						<h1 class="leaflet-sidebar-header">Access to data
							<span class="leaflet-sidebar-close"><i
									class="fa fa-caret-left"></i></span>
						</h1>
						<p>
						<div class="downloads_map_sect">
							<div class="row sect">
								<div class="col-md-8">
									<span>Print map (.png)</span>
								</div>
								<div class="col-md-4">
									<a data-toggle="modal"
									   data-target="#${feature}-pop_up-print_map"
									   style="cursor: pointer;" 
									   title="Download map"><i
											class="fa fa-file-image-o"></i></a>
									<div class="modal fade"
										 id="${feature}-pop_up-print_map"
										 tabindex="-1" role="dialog"
										 aria-hidden="true">
										<div class="modal-dialog"
											 role="document">
											<div class="modal-content">
												<div
													class="modal-header">
													<h5 class="modal-title">
														<div
															id="${feature}-print_map_title"></div>
														<br/>
													</h5>
													<button
														type="button"
														class="close"
														data-dismiss="modal"
														aria-label="Close">
																			<span
																				aria-hidden="true">&times;</span>
													</button>
												</div>
												<div
													class="modal-body row">
													<div
														class="col-md-12">
														<table>
															<tr>
																<td>
																	<div
																		class="citation_label">
																		Citation
																	</div>
																	<div
																		class="input-group row citation_text">
																		<input
																			readonly
																			class="col-md-9"
																			id="${feature}-citation_print_map"
																			type="text">
																		<span
																			class="col-md-3 input-group-button">
										   <button id="${feature}-copy" class="btn clipboard_cp"
												   type="button" data-clipboard-demo=""
												   data-clipboard-target="#${feature}-citation_print_map" style="background-color:white;">
											 <!--<img class="clippy" src="${General_config.data_url}/assets/img/clippy.svg"
												  width="13" alt="Copy to clipboard"
												  title="Copy to clipboard">-->
													<svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
<g fill="#000000">
<path fill-rule="evenodd" d="M3.25 2.5H4v.25C4 3.44 4.56 4 5.25 4h5.5C11.44 4 12 3.44 12 2.75V2.5h.75a.75.75 0 01.75.75v3a.75.75 0 001.5 0v-3A2.25 2.25 0 0012.75 1h-.775c-.116-.57-.62-1-1.225-1h-5.5c-.605 0-1.11.43-1.225 1H3.25A2.25 2.25 0 001 3.25v10.5A2.25 2.25 0 003.25 16h9.5A2.25 2.25 0 0015 13.75v-1a.75.75 0 00-1.5 0v1a.75.75 0 01-.75.75h-9.5a.75.75 0 01-.75-.75V3.25a.75.75 0 01.75-.75zm2.25-1v1h5v-1h-5z" clip-rule="evenodd"/>
<path d="M4.75 5.5a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zM4 12.25a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zM4.75 8.5a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2zM16 9.25a.75.75 0 01-.75.75h-4.19l1.22 1.22a.75.75 0 11-1.06 1.06l-2.5-2.5a.752.752 0 010-1.06l2.5-2.5a.75.75 0 111.06 1.06L11.06 8.5h4.19a.75.75 0 01.75.75z"/>
</g>
</svg>
										   </button>
										 </span>
																	</div>
																</td>
																<td>
																	<div
																		class="">
																		<a style="font-size: 23px;cursor: pointer;"
																		   id="${feature}-save_image_map_output" class="save_image_map_output" data-feature="${feature}">
																			<i class="fa fa-download"></i>
																		</a>
																	</div>
																</td>
															</tr>
														</table>
													</div>
												</div>
												<div
													class="modal-footer">
													<button
														type="button"
														class="btn btn-default btn_font_16"
														data-dismiss="modal">
														Close
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row sect">
								<div class="col-md-8">
									<span>GeoTTIF format (.tif)</span>
								</div>
								<div class="col-md-4">
									<a data-toggle="modal"
									   data-target="#${feature}-pop_up-geottif"
									   title="Download GeoTTIF"
									   style="cursor: pointer;"
									   title="Download map"><i
											class="fa fa-file-image-o"></i></a>
									<!-- Modal -->
									<div class="modal fade" title="Download GeoTTIF" id="${feature}-pop_up-geottif"
										 tabindex="-1" role="dialog" aria-hidden="true">
										<div class="modal-dialog"
											 role="document">
											<div class="modal-content">
												<div
													class="modal-header">
													<h5 class="modal-title">
														<div
															id="${feature}-download_geottif_title"></div>
														<br/>
													</h5>
													<button
														type="button"
														class="close"
														data-dismiss="modal"
														aria-label="Close">
																			<span
																				aria-hidden="true">&times;</span>
													</button>
												</div>
												<div
													class="modal-body row">
													<div
														class="col-md-12">
														<table>
															<tr>
																<td>
																	<div
																		class="citation_label">
																		Citation
																	</div>
																	<div
																		class="input-group row citation_text">
																		<input
																			readonly
																			class="col-md-9"
																			id="${feature}-citation_geottif"
																			type="text"
																			value="">
																		<span
																			class="col-md-3 input-group-button">
										   <button id="${feature}-copy2" class="btn clipboard_cp" type="button"
												   data-clipboard-demo=""
												   data-clipboard-target="#${feature}-citation_geottif" style="background-color:white;">
											 <!--<img class="clippy" src="${General_config.data_url}/assets/img/clippy.svg"
												  width="13" alt="Copy to clipboard"
												  title="Copy to clipboard">-->
													<svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
											<g fill="#000000">
											<path fill-rule="evenodd" d="M3.25 2.5H4v.25C4 3.44 4.56 4 5.25 4h5.5C11.44 4 12 3.44 12 2.75V2.5h.75a.75.75 0 01.75.75v3a.75.75 0 001.5 0v-3A2.25 2.25 0 0012.75 1h-.775c-.116-.57-.62-1-1.225-1h-5.5c-.605 0-1.11.43-1.225 1H3.25A2.25 2.25 0 001 3.25v10.5A2.25 2.25 0 003.25 16h9.5A2.25 2.25 0 0015 13.75v-1a.75.75 0 00-1.5 0v1a.75.75 0 01-.75.75h-9.5a.75.75 0 01-.75-.75V3.25a.75.75 0 01.75-.75zm2.25-1v1h5v-1h-5z" clip-rule="evenodd"/>
											<path d="M4.75 5.5a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zM4 12.25a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zM4.75 8.5a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2zM16 9.25a.75.75 0 01-.75.75h-4.19l1.22 1.22a.75.75 0 11-1.06 1.06l-2.5-2.5a.752.752 0 010-1.06l2.5-2.5a.75.75 0 111.06 1.06L11.06 8.5h4.19a.75.75 0 01.75.75z"/>
											</g>
											</svg>
										   </button>
										 </span>
																	</div>
																</td>
																<td>
																	<div
																		class="">
																		<a style="font-size: 16px;cursor: pointer;"
																		   id="${feature}-geottif_src">
																			<i class="fa fa-download geottif_src"></i>
																		</a>
																	</div>
																</td>
															</tr>
														</table>
													</div>
												</div>
												<div
													class="modal-footer">
													<button
														type="button"
														class="btn btn-default btn_font_16"
														data-dismiss="modal">
														Close
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						</p>
					</div>`;
		
		return {
			tabListElt : tabListElt,
			pane : pane
		};

	},
	changePixelColor(id_node){
		//console.log("pixel color changed");
		// const dataset = this.target.dataset;
		//console.log(id_node);
		if(dataset.hasOwnProperty("feature")){
			const feature = dataset["feature"];
			if( Aagwa_config.hasOwnProperty(feature) && Aagwa_config[feature].hasOwnProperty("layer")){
				const color_value = event.target.value;
				var scale = chroma.scale(color_value).domain(prod.range);
				layer.setColor(scale);


				
				var range = prod.range;
				var scale = chroma.scale(color_value).domain(prod.range);

				
			}

		}
	},
	addDownloadIcon(settings){
		return L.easyPrint({
			tileLayer: settings.baseMaps,
			//sizeModes: 'Current',
			// sizeModes: ['Current', 'A4Landscape', 'A4Portrait']
			exportOnly : true,
			filename: 'myMap',
			exportOnly: true,
			hideClasses: ['leaflet-control-easyPrint'],
			hideControlContainer: false
		})
	},
	loadTemperatureTrendAnalysis : async (event) => {
		console.log(Aagwa_config.getCountryParam());

		const object_id = `${Aagwa_config.country}_temperature_trend_analysis`;
		const body = {
			"type":"get_folder_content",
			"object_id":object_id,
			// "where_column":"parent_id",
			// "where_value":parent_id,
			// "return":true
		};
		// //console.log("conf_get_data");
		// //console.log(conf_get_data);
		//dataOption = await AdmindUtils.getAllData(conf_get_data);

		const json = {
			"headers": {
				"Content-Type": "application/json"
			},
			"method": "POST",
			"body":JSON.stringify(body)
		};
		const jSonResponse = await AdmindUtils.makeRequest(General_config.aagwa_request_url,json);
		console.log("jSonResponse");
		console.log(jSonResponse);
		config_temp = Object.assign({"type" : "folder"},Aagwa_config["config_temperature_trend"]);

		if(jSonResponse && typeof(jSonResponse) === "object" && jSonResponse.hasOwnProperty("msg") && Array.isArray(jSonResponse.msg)){
			const breadcrumb_container = document.getElementById(config_temp["breadcrumb-container"]);
			const breadcrumb_item_exist = breadcrumb_container.querySelector(`a[data-id=${object_id}]`);
			console.log("breadcrumb_item_exist");
			console.log(breadcrumb_item_exist);
			if( !breadcrumb_item_exist ){
				breadcrumb_container.appendChild(aagwa.renderTag({
					"tag" : "li",
					"attributes" : [
						{
							"type" : "class",
							"value" : "breadcrumb-item"
						}
					],
					"children" : [
						{
							"tag" : "a",
							"attributes" : [
								{
									"type" : "href",
									"value" : "#"
								},
								{
									"type" : "text",
									"value" : "Home"
								},
								{
									"type" : "data-id",
									"value" : object_id
								},
								{
									"type" : "data-path",
									"value" : ""
								}
							],
							"events" : [
								{
									"type" : "click",
									"value" : AdmindUtils.manageBreadCrumb
								}
							]
						}
					]
				}))
			}

			AdmindUtils.showFolderContent(jSonResponse.msg,[object_id],config_temp);
		}
	},
	showFolderContent(tab,path,settings){
		console.log(tab);
		console.log(path);
		console.log(settings);
		// const node_table_temp_trend = document.getElementById('table-temp-trend');
		const table_body = document.getElementById(settings["table-body-id"]);
		table_body.innerHTML = "";
		for( let i = 0 ; i < tab.length ; i ++ ){
			let tr = aagwa.renderTag({
				"tag" : "tr",
				"attributes" : [
					{
						"type" : "data-name",
						"value" : tab[i]
					}
				],
				"children" : [
					{
						"tag" : "td",
						"attributes" : [
							{
								"type" : "text",
								"value" : i+1
							},
							/*{
								"type" : "style",
								"value" : "font-size:20px;text-align:left;vertical-align:middle;padding:0px 17px;"
							},*/
							{
								"type" : "style",
								"value" : "font-size:20px;text-align:left;vertical-align:middle;"
							},
							/*{
								"type" : "class",
								"value" : "font-weight-bold"
							}*/
						]
						/*"children" : [
							{
								"tag" : "i",
								"attributes" : [
									{
										"type" : "class",
										"value" : "bi fi-folder"
									}
								]
							}
						]*/
					},
					/*{
						"tag" : "td",
						"attributes" : [
							{
								"type" : "style",
								"value" : "text-align:left;vertical-align:middle;padding:0px 17px;"
							},
						],
						"children" : [
							{
								"tag" : "img",
								"attributes" : [
									
									{
										"type" : "src",
										"value" : `${General_config.data_url}/assets/img/folder.svg`
									},
									
								]
							}
						]
					},*/
					{
						"tag" : "td",
						"attributes" : [
							/*{
								"type" : "text",
								"value" : tab[i]
							},*/
							{
								"type" : "style",
								"value" : "font-size:20px;"
							},
							{
								"type" : "class",
								"value" : "text-left btn-temp-trend-analysis"
							},
							{
								"type" : "data-id",
								"value" : tab[i]
							},
							{
								"type" : "data-path",
								"value" : path.join("__sep__")
							}
						],
						"events" : [
							{
								"type" : "click",
								"value" : AdmindUtils.loadContent
							}
						],
						"children" : [
							{
								"tag" : "tr",
								"attributes" : [
									{
										"type" : "style",
										"value" : "background-color:transparent;"
									}
								],
								"children" : [
									/*{
										"tag" : "td",
										"children" : [
											{
												"tag" : "svg",
												"attributes" : [
													{
														"type" : "version",
														"value" : "1.1"
													},
													{
														"type" : "xmnls",
														"value" : "http://www.w3.org/2000/svg"
													},
													{
														"type" : "xmlns:xlink",
														"value" : "http://www.w3.org/1999/xlink"
													},
													{
														"type" : "x",
														"value" : "0px"
													},
													{
														"type" : "y",
														"value" : "0px"
													},
													{
														"type" : "viewBox",
														"value" : "0 0 90 2200"
													},
													{
														"type" : "width",
														"value" : "90"
													},
													{
														"type" : "height",
														"value" : "50"
													},
												],
												"children" : [
													{
														"tag" : "g",
														"attributes" : [
															{
																"type" : "id",
																"value" : "Objects"
															}
														],
														"children" : [
															{
																"tag" : "g",
																"children" : [
																	{
																		"tag" : "path",
																		"attributes" : [
																			{
																				"type" : "style",
																				"value" : "fill:#EDAF00;"
																			},
																			{
																				"type" : "d",
																				"value" : `M205.898,1698.159c-2.714-7.933-4.194-16.437-4.194-25.292V472.901 c0-43.027,34.873-77.901,77.901-77.901h525.452c25.499,0,50.116,9.387,69.15,26.356l141.766,126.485 c19.034,16.969,43.637,26.356,69.15,26.356h591.503c43.027,0,77.901,34.873,77.901,77.901v101.569L205.898,1698.159z`
																			}
																		]
																	},
																	{
																		"tag" : "path",
																		"attributes" : [
																			{
																				"type" : "style",
																				"value" : "fill:#E8E8E8;"
																			},
																			{
																				"type" : "d",
																				"value" : `M333,1275V703.023c0-17.255,13.985-31.241,31.241-31.241h1246.04 c17.255,0,31.241,13.985,31.241,31.241v493.047L333,1275z`
																			}
																		]
																	},
																	{
																		"tag" : "path",
																		"attributes" : [
																			{
																				"type" : "style",
																				"value" : "fill:#FFFFFF;"
																			},
																			{
																				"type" : "d",
																				"value" : `M361,1311V739.023c0-17.255,13.985-31.241,31.241-31.241h1246.04 c17.255,0,31.241,13.985,31.241,31.241v493.047L361,1311z`
																			}
																		]
																	},
																	{
																		"tag" : "path",
																		"attributes" : [
																			{
																				"type" : "style",
																				"value" : "fill:#FFCE00;"
																			},
																			{
																				"type" : "d",
																				"value" : `M1995.405,852.428l-248.311,893.404c-9.719,34.969-41.561,59.168-77.856,59.168H282.56 c-53.33,0-92.034-50.749-77.929-102.179l207.051-754.959c9.28-33.839,40.038-57.297,75.126-57.297h665.039 c18.541,0,36.744-4.963,52.719-14.374l183.59-108.15c15.975-9.411,34.178-14.374,52.719-14.374h479.475 C1971.872,753.667,2009.202,802.788,1995.405,852.428z`
																			}
																		]
																	},
																]
															}
														]
													}
												]
											}
											
										]
									},*/
									{
										"tag" : "td",
										/*"attributes" : [
											{

												"type" : "text",
												"value" : tab[i]
											}
										],*/
										"children" : [
											{
												"tag" : "img",
												"attributes" : [
													{
														"type" : "width",
														"value" : "32"
													},
													{
														"type" : "height",
														"value" : "32"
													},
													{
														"type" : "src",
														"value" : settings.hasOwnProperty("type") && settings.type === "folder" ? `${General_config.data_url}/assets/img/folder.png` : `${General_config.data_url}/assets/img/file.jpg`
													},
													{
														"type" : "style",
														"value" : "text-align:left;background-color:transparent;padding:0px 0px;font-weight: normal;text-transform:capitalize"
													},
													{
														"type" : "data-id",
														"value" : tab[i]
													},
													{
														"type" : "data-path",
														"value" : path.join("__sep__")
													}
												]
											}
										]
									},
									{
										"tag" : "td",
										"attributes" : [
											{

												"type" : "text",
												"value" : tab[i]
											},
											{
												"type" : "data-id",
												"value" : tab[i]
											},
											{
												"type" : "data-path",
												"value" : path.join("__sep__")
											}
										]
									}
								]
							}
							/*{
								"tag" : "button",
								"attributes" : [
									{
										"type" : "class",
										"value" : "btn btn-link text-body text-left btn-temp-trend-analysis"
									},
									{
										"type" : "style",
										"value" : "display:inline-block;font-size:20px;background-color:transparent;padding:0px 0px;font-weight: normal;text-transform:capitalize"
									},
									{
										"type" : "data-id",
										"value" : tab[i]
									},
									{
										"type" : "data-path",
										"value" : path.join("__sep__")
									}
								],
								"children" : [
									{
										"tag" : "img",
										"attributes" : [
											{
												"type" : "width",
												"value" : "90"
											},
											{
												"type" : "height",
												"value" : "50"
											},
											{
												"type" : "src",
												"value" : `${General_config.data_url}/assets/img/folder.svg`
											},
											{
												"type" : "style",
												"value" : "text-align:left;background-color:transparent;padding:0px 0px;font-weight: normal;text-transform:capitalize"
											},
										]
									},
									{
										"tag" : "span",
										"attributes" : [
										],
										"children" : [
											
											{
												"tag" : "span",
												"attributes" : [
													{

														"type" : "text",
														"value" : tab[i]
													}
												]
											}
										]
									}
									
								],
								"events" : [
									{
										"type" : "click",
										"value" : AdmindUtils.loadContent
									}
								]
							}*/
						]
					}
				]
			});
			table_body.appendChild(tr);
		}
	},
	loadContent : async (event) => {
		console.log("event.target")
		console.log(event.target)
		const dataset = event.target.dataset;
		if( dataset.hasOwnProperty('id') && dataset.hasOwnProperty('path')){
			const object_id = dataset.id;
			const path = dataset.path.split("__sep__");

			const body = {
				"type":"get_folder_content",
				"object_id":object_id,
				"path" : path
				// "where_column":"parent_id",
				// "where_value":parent_id,
				// "return":true
			};
			// //console.log("conf_get_data");
			// //console.log(conf_get_data);
			//dataOption = await AdmindUtils.getAllData(conf_get_data);

			const json = {
				"headers": {
					"Content-Type": "application/json"
				},
				"method": "POST",
				"body":JSON.stringify(body)
			};
			const jSonResponse = await AdmindUtils.makeRequest(General_config.aagwa_request_url,json);
			console.log("jSonResponse");
			console.log(jSonResponse);

			config_temp = Object.assign({"type" : "file"},Aagwa_config["config_temperature_trend"]);

			if(jSonResponse && typeof(jSonResponse) === "object" && jSonResponse.hasOwnProperty("msg") ){
				const msg = jSonResponse.msg;
				if(Array.isArray(msg)){

					const breadcrumb_container = document.getElementById(config_temp["breadcrumb-container"]);
					const breadcrumb_item_exist = breadcrumb_container.querySelector(`a[data-id=${object_id}]`);
					console.log("breadcrumb_item_exist");
					console.log(breadcrumb_item_exist);
					if( !breadcrumb_item_exist ){
						const breadcrumb_container = document.getElementById(Aagwa_config["config_temperature_trend"]["breadcrumb-container"]);
						breadcrumb_container.appendChild(aagwa.renderTag({
							"tag" : "li",
							"attributes" : [
								{
									"type" : "class",
									"value" : "breadcrumb-item"
								}
							],
							"children" : [
								{
									"tag" : "a",
									"attributes" : [
										{
											"type" : "href",
											"value" : "#"
										},
										{
											"type" : "text",
											"value" : object_id
										},
										{
											"type" : "data-id",
											"value" : object_id
										},
										{
											"type" : "data-path",
											"value" : path
										},
									],
									"events" : [
										{
											"type" : "click",
											"value" : AdmindUtils.manageBreadCrumb
										}
									]
								}
							]
						}))
					}
					AdmindUtils.showFolderContent(msg,path.concat([object_id]),config_temp);
				}
				else if( typeof(msg) === "object" && msg.hasOwnProperty('type')){
					const type = msg.type;
					if( type === "file" && msg.hasOwnProperty('info') ){
						const info = msg.info;
						if( typeof(info) === 'object'){
							const extension = info.extension;
							if( (extension === "png" || extension === "csv") && msg.hasOwnProperty('path')){
								console.log("momo")
								window.open(`${General_config.data_url}/${msg.path}`,"_blank");
							}
						}
					}
					
				}
			}
		}
	},
	manageBreadCrumb(event){
		console.log(event.target.parentNode)
		const node_after = AdmindUtils.removeNodesAfter(event.target.parentNode);
		if( node_after === true ){
			const path = event.target.dataset.path;
			if(path){

			}
			else{
				AdmindUtils.loadTemperatureTrendAnalysis();
			}
		}
	},
	removeNodesAfter(targetNode) {
	  // Ensure the targetNode exists and has a parent
	  if (!targetNode || !targetNode.parentNode) {
		console.log("Target node or its parent not found.");
		return;
	  }

	  const parent = targetNode.parentNode;
	  let currentNode = targetNode.nextSibling;
	  let node_after = false;
	  while (currentNode) {
		const nodeToRemove = currentNode;
		currentNode = currentNode.nextSibling; // Move to the next sibling before removal
		parent.removeChild(nodeToRemove);
		node_after = true;
	  }
	  return node_after;
	},
	createMapFromGEOJSON(settings){
		console.log(settings)
		const map_container = settings["map_container"];
		const map_title = settings["map_title"];
		const map_subtitle = settings["map_subtitle"];
		const pointFormat = settings["pointFormat"];
		
		//const nullFormat = settings["nullFormat"];
		const series = settings["series"];
		console.log(series)
		let colorAxis;
		if( settings.hasOwnProperty("colorAxis")){
			colorAxis = settings["colorAxis"];
		}
		else{
			colorAxis = {
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
			}
		}

		let chart;
		if( settings.hasOwnProperty("chart") ){
			chart = settings["chart"]
			console.log("monto")
		}
		else{
			chart =  {
				// height: 300,
				// margin: 10,
				// height: 700,
				map: Aagwa_config.mapData
			};
		}
		let ndviMap = Highcharts.mapChart(map_container, {
			chart: chart,
			/*chart: {
				// height: 300,
				// margin: 10,
				// height: 700,
				map: Aagwa_config.mapData
			},*/
			boost: {
				useGPUTranslations: true,
				seriesThreshold: 5
			},
			title: map_title,
			subtitle: map_subtitle,
			mapNavigation: {
				enabled: true,
				buttonOptions: {
					verticalAlign: 'bottom'
				}
			},
			credits: {
				enabled: false
			},
			colorAxis: colorAxis,
			tooltip: {
				useHTML :true,
				headerFormat: ' ',
				pointFormat: pointFormat,
				// nullFormat: nullFormat 
			},
			series: series,
			/*plotOptions: {
		        series: {
		            allowPointSelect: true, // Allows selection of all points
		            // nullInteraction: true,
		            //borderColor: 'black',
		            // nullColor: 'black'
		             // Allows interaction with null points
		        },
		        map :{
		        	borderColor: 'black',
		        }
		        
		    },*/
		});
	},
	/*buildCharComponent(tab,indice,result,extra){
		if( indice < tab.length ){
			const item = tab[indice];
			console.log("item");
			console.log(item);
			const type = item["type"];
			if (type === "series"){
				if(  !result.hasOwnProperty(type) ){
					result[type] = {
						"type" : type,
						"data" : [],
						"tab_name" : []
					};
				}
				const name = item["name"];
				let index_name = result[type].tab_name.indexOf(name)

				if( index_name === -1 ){
					result[type].tab_name.push(name);
					index_name = result[type].tab_name.length-1;
					result[type].data[index_name] = {
						"name" : name,
						"data" : []
					};
				}
				// temp_data = item.data.split(",").map(x => parseFloat(x));
				temp_data = item.data.split(",");
				// if(extra.hasOwnProperty("check_leap_year") && extra.check_leap_year === true && item["month"] === 2){
				// 	const is_leap_year = AdmindUtils.isLeapYear(item["year"]);
				// 	if( is_leap_year === false ){
				// 		temp_data.push(temp_data[temp_data.length-1]);
				// 		//result[type].data[index_name]["data"].splice(61,0,result[type].data[index_name]["data"][60])
				// 	}//28 indice 60
				// }
				console.log("temp_data")
				console.log(temp_data)
				console.log("index_name")
				console.log(index_name)
				result[type].data[index_name]["data"] = result[type].data[index_name]["data"].concat(temp_data);
				
				console.log("result")
				console.log(result)
				
			}

			AdmindUtils.buildCharComponent(tab,indice+1,result,extra);
		}
	},*/
	buildCharComponent(tab,indice,result,extra){
		if( indice < tab.length ){
			const item = tab[indice];
			console.log("item");
			console.log(item);
			const type = item["type"];
			if (type === "series"){
				if(  !result.hasOwnProperty(type) ){
					result[type] = {
						"type" : type,
						"data" : [],
						"tab_name" : []
					};
				}
				const tab_stats = extra["stats"];

				extra["tab_stat"].forEach( (stat) => {
					const name = `${stat["text"]} ${item['year']}`;
					let index_name = result[type].tab_name.indexOf(name);
					if (index_name === -1){
						result[type].tab_name.push(name);
						index_name = result[type].tab_name.length-1;
						result[type].data[index_name] = {
							"name" : name,
							"data" : []
						};
					}
					result[type].data[index_name]["data"].push(item[stat.key]);
					if( item["month"] === 2 && item["day"] === 28 && AdmindUtils.isLeapYear(item["year"]) === false){
						result[type].data[index_name]["data"].push(item[stat.key]);
					}
					

				})
				/*const name = item["name"];
				let index_name = result[type].tab_name.indexOf(name)

				if( index_name === -1 ){
					result[type].tab_name.push(name);
					index_name = result[type].tab_name.length-1;
					result[type].data[index_name] = {
						"name" : name,
						"data" : []
					};
				}*/
				// temp_data = item.data.split(",").map(x => parseFloat(x));
				// temp_data = item.data.split(",");
				/*if(extra.hasOwnProperty("check_leap_year") && extra.check_leap_year === true && item["month"] === 2){
					const is_leap_year = AdmindUtils.isLeapYear(item["year"]);
					if( is_leap_year === false ){
						temp_data.push(temp_data[temp_data.length-1]);
						//result[type].data[index_name]["data"].splice(61,0,result[type].data[index_name]["data"][60])
					}//28 indice 60
				}*/
				/*console.log("temp_data")
				console.log(temp_data)
				console.log("index_name")
				console.log(index_name)
				result[type].data[index_name]["data"] = result[type].data[index_name]["data"].concat(temp_data);
				
				console.log("result")
				console.log(result)*/
				
			}

			AdmindUtils.buildCharComponent(tab,indice+1,result,extra);
		}
	},
	get365DayRange(startDate) {
	  const dates = [];
	  let currentDate = new Date(startDate); // Create a mutable copy

	  for (let i = 0; i < 365; i++) {
	  	const date = new Date(currentDate);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 and pad with leading zero if needed
		const day = String(date.getDate()).padStart(2, '0'); // Pad with leading zero if needed

		const formattedDate = `${year}-${month}-${day}`;



	    //dates.push(new Date(currentDate)); // Push a copy of the current date
	    dates.push(formattedDate); // Push a copy of the current date
	    currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
	  }
	  return dates;
	},
	isLeapYear(year) {
		if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
			return true; // It's a leap year
	  	}
	  	else {
			return false; // It's not a leap year
	  	}
	},
	scrollIntoView(){
		console.log("focus")
	},
	createDefaultHeatMapChart(settings){
		const container = settings["container"];
		const title = settings["map_title"];
		const subtitle = settings.hasOwnProperty("subtitle") ? settings["subtitle"] : "";
		const yAxis = settings["yAxis"];
		const xAxis = settings["xAxis"];
		let chart;
		/*if( settings.hasOwnProperty("chart") ){
			chart = settings["chart"]
			console.log("monto")
		}
		else{
			chart = {
		        type: 'heatmap',
		        marginTop: 40,
		        marginBottom: 80,
		        plotBorderWidth: 1,
		        scrollablePlotArea: {
		            minHeight: 2000
		        }
		    };
		}*/
		// const subtitle = settings["map_subtitle"];
		// Substring template helper for the responsive labels
		Highcharts.Templating.helpers.substr = (s, from, length) =>
		    s.substr(from, length);

		// Create the chart
		Highcharts.chart(container, {

		    // chart: chart,
		   chart: {
		        type: 'heatmap',
		        marginTop: 40,
		        marginBottom: 80,
		        plotBorderWidth: 1,
		        scrollablePlotArea: {
		            minHeight: 2000
		        }
		    },
		    credits: {
				enabled: false
			},

		    title: title,
		    subtitle:subtitle,
		    /*title: {
		        text: 'Sales per employee per weekday',
		        style: {
		            fontSize: '1em'
		        }
		    },*/

		    /*xAxis: {
		        categories: settings.xAxis.categories
		    },*/
		    xAxis : xAxis,
		    yAxis: yAxis,
		    /*yAxis: {
		        
		        categories: settings.yAxis.categories,
		        title: null,
		        reversed: true
		    },*/

		    /*accessibility: {
		        point: {
		            descriptionFormat: '{(add index 1)}. ' +
		                '{series.xAxis.categories.(x)} sales ' +
		                '{series.yAxis.categories.(y)}, {value}.'
		        }
		    },*/

		    colorAxis: {
		        min: settings.min,
		        max: settings.max,
		        reversed: false,
		        stops: [
		            [0.2, 'lightblue'],
		            [0.4, '#CBDFC8'],
		            [0.6, '#F3E99E'],
		            [0.9, '#F9A05C']
		        ],
		        labels: {
		            format: '{value}'
		        }
		    },

		    legend: {
		        align: 'right',
		        layout: 'vertical',
		        margin: 0,
		        verticalAlign: 'top',
		        y: 25,
		        symbolHeight: 280
		    },

		    tooltip: {
		        format: '<b>{series.xAxis.categories.(point.x)}</b> ,' +
		        		'<b>{series.yAxis.categories.(point.y)}</b> : '+
		            '<b>{point.value:.2f}</b>'
		            
		    },

		    series: [{
		        name: 'Sales per employee',
		        borderWidth: 1,
		        data:settings.series.data,
		        dataLabels: {
		            enabled: true,
		            color: 'contrast', // Black color for better visibility
		            formatter: function() {
		                return Highcharts.numberFormat(this.point.value, 2); // Format to 1 decimal place
		            }
		        }
		    }],
		    responsive: {
		        rules: [{
		            condition: {
		                maxWidth: 500
		            },
		            chartOptions: {
		                yAxis: {
		                    labels: {
		                        format: '{substr value 0 1}'
		                    }
		                }
		            }
		        }]
		    }

		});
		const container_node = document.getElementById(container);
		/*container_node.addEventListener("mouseover",()=>{
			console.log("momo")
			container_node.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});*/

		container_node.addEventListener('wheel', function(event) {
		    // Prevent the default scrolling behavior of the document or parent elements
		    event.stopPropagation(); 
	  	});
	},
	createHeatMapChart(settings){
		console.log(settings)
		const container = settings["container"];
		const title = settings["map_title"];
		const subtitle = settings["map_subtitle"];
		const yAxis = settings["yAxis"];
		const xAxis = settings["xAxis"];
		const series = settings["series"];
		/*Highcharts.Templating.helpers.substr = (s, from, length) =>
    s.substr(from, length);*/
		Highcharts.chart(container, {
			chart: {
		        type: 'heatmap',
		        marginTop: 40,
		        marginBottom: 80,
		        plotBorderWidth: 1
		    },
			title: title,
			subtitle: subtitle,
			colorAxis: {
		       minColor: '#FF0000', // Color for minimum value (e.g., strong negative)
	            maxColor: '#00FF00', // Color for maximum value (e.g., strong positive)
	            stops: [
	                [0, '#FF0000'], // Pure red for 0 and negative values
	                [0.5, '#FFFFFF'], // White for values near 0 (transition point)
	                [1, '#00FF00']  // Pure green for positive values
	            ],
	            min: -10, // Adjust min based on your data's expected negative range
	            max: 10  
    		},
		    
			xAxis : xAxis,
			yAxis : yAxis,
			accessibility: {
		        point: {
		            descriptionFormat: '{(add index 1)}. ' +
		                '{series.xAxis.categories.(x)} sales ' +
		                '{series.yAxis.categories.(y)}, {value}.'
		        }
		    },
		    legend: {
		        align: 'right',
		        layout: 'vertical',
		        margin: 0,
		        verticalAlign: 'top',
		        y: 25,
		        symbolHeight: 280
		    },
		    tooltip: {
		        format: '<b>{series.xAxis.categories.(point.x)}</b> sold<br>' +
		            '<b>{point.value}</b> items on <br>' +
		            '<b>{series.yAxis.categories.(point.y)}</b>'
		    },
			credits: {
				enabled: false
			},
			series :series	
			
		})
	},
	createStockChart(settings) {
		const container = settings["container"];
		const series = settings["series"];
		const yAxis = settings["yAxis"];
		const xAxis = settings["xAxis"];
        Highcharts.stockChart(container, {
        	title: settings["map_title"],
        	chart: {
                height: 650, // Sets a fixed height of 500 pixels
                //marginLeft: 20
            },
            rangeSelector: {
                selected: 4
            },
            xAxis : xAxis,
            yAxis : yAxis,

           /* yAxis: {
                labels: {
                    format: '{#if (gt value 0)}+{/if}{value}%'
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },*/
            plotOptions: {
                series: {
                    compare: 'percent',
                    showInNavigator: true
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">' +
                    '{series.name}</span>: <b>{point.y}</b> ' +
                    '<br/>',
                valueDecimals: 5,
                split: true
            },
            series
        });

    },
	createLineChart(settings){
		console.log("settings");
		console.log(settings);
		const container = settings["container"];
		const title = settings["map_title"];
		const subtitle = settings["map_subtitle"];
		const yAxis = settings["yAxis"];
		const xAxis = settings["xAxis"];
		const series = settings["series"];
		let tooltip;
		if(settings.hasOwnProperty("tooltip")){
			tooltip = settings["tooltip"];
		}
		else{
			tooltip = {
		        format: '<span style="font-size: 0.8em">{key}</span><br/>' +
		            '{#each points}' +
		            '<span style="color:{color}">\u25CF</span> ' +
		            '{series.name}: <b>{y:.2f}</b><br/>' +
		            '{/each}',
		        shared: true
		    }
		}

		Aagwa_config[settings.feature].chart_holder =  Highcharts.chart(container, {
			/*chart: {
				type: 'line'
			},*/
			title: title,
			subtitle: subtitle,
			xAxis : xAxis,
			yAxis : yAxis,
			/*xAxis: {
				categories: [
					'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
					'Oct', 'Nov', 'Dec'
				]
			},
			yAxis: {
				title: {
					text: 'Temperature (°C)'
				}
			},*/
			credits: {
				enabled: false
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
			/*plotOptions: {
				line: {
					dataLabels: {
						enabled: false
					},
					enableMouseTracking: false,
					marker : false
				}
			},*/
			plotOptions: {
				series: {
					//showInNavigator: true,
					dataLabels: {
						enabled: false,
					},
					//marker : false
				}
			},
			series :series,
			tooltip: tooltip,
			/*series: [{
				name: 'Reggane',
				data: [
					16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
					22.0, 17.8
				]
			}, {
				name: 'Tallinn',
				data: [
					-2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
					2.0, -0.9
				]
			}]*/
		})
	},
	createChart(settings){
		const container = settings["container"];
		const title = settings["map_title"];
		const subtitle = settings["map_subtitle"];
		const yAxis = settings["yAxis"];
		const xAxis = settings["xAxis"];
		const series = settings["series"];
		Highcharts.chart(container, {

	title: title,

	subtitle: subtitle,

	yAxis: yAxis,
	xAxis: xAxis,
	legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'middle'
	},

	plotOptions: {
		series: {
			label: {
				connectorAllowed: false
			},
			pointStart: 2010
		}
	},

	series: series,

	responsive: {
		rules: [{
			condition: {
				maxWidth: 500
			},
			chartOptions: {
				legend: {
					layout: 'horizontal',
					align: 'center',
					verticalAlign: 'bottom'
				}
			}
		}]
	}

});
	}
};