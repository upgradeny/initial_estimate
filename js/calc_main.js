$(document).ready(function(){	
			function round_zero_decimal_digits(num1){
				return Math.round(parseFloat(num1)) ;
			}
			function round_2_digits(num1){
				return Math.round( parseFloat(num1) * 100 ) / 100;
			}
			function numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			
			function group_price_calculate(opt,multiplier,markup,surcharge,input_price){
				let cost_price = 0;
				let retail_price = 0;
				if( opt == "C"){
					cost_price = round_2_digits( input_price * surcharge );
					retail_price = round_2_digits( cost_price * markup  ) ;
				}else{
					cost_price = round_2_digits( input_price * surcharge * multiplier);
					retail_price = round_2_digits( cost_price * markup  ) ;
				}
				
				return [cost_price,retail_price];
				
			}
		
		/*
            const brandData = {
                "NoBrand": { "N/A": 632.50 },
                "Wise": { "Standard": 333.50 },
                "CNC": {
                    "Country Oak (R)": 280.60,
                    "Luxor (L)": 347.30,
                    "Concord Elegant (A)": 432.40,
                    "Milano/Versailles (F)": 466.90,
                    "Alvic (H)": 448.50,
                    "Alvic (I)": 600.30
                },
                "Cubitac": {
                    "Ridgefield Latte": 414.00,
                    "Bolt Lace": 420.90,
                    "Oxford Latte": 420.90,
                    "Dover Latte": 460.00,
                    "Madison Latte": 522.10,
                    "Montclair Cashmere": 634.80
                },
                "Fabuwood": {
                    "Discovery/Metro": 381.80,
                    "Galaxy": 552.00,
                    "Luna/Onyx/Nexus/Fusion/Imperio": 630.20,
                    "Catalina (Solids & Designer)": 680.80
                },
                "CNG": {
                    "Adroit PET": 391.00,
                    "Adroit Tafisa": 361.10,
                    "CNG PET // Comodo Box + Metal Drawer": 411.70,
                    "CNG PET // White Box + Plywood Drawer + Blum": 506.00,
                    "CNG PET // White Box + Metal drawer": 446.20
                },
                "Adornus": {
                    "Trends": 607.20,
                    "Essential": 356.50,
                    "Designer": 338.10
                },
                "Candlelight": {
                    "Group A/B (Amherst) // Euro Full Overlay": 671.60,
                    "Group B/B (Park Ave - MDF) // Euro Full Overlay": 685.40,
                    "Group D/F (Alexandria) // Euro Full Overlay": 738.30,
                    "Group A/B (Amherst) // Beaded Inset Overlay": 926.90,
                    "Group A/B (Amherst) // Full Inset Overlay": 878.60
                },
                "CuisineIdeale": {
                    "PG 01 (Polymer)": 510.60,
                    "PG 03 (Belmont)": 676.20,
                    "PG 04 (Bristol)": 805.00,
                    "PG 09 (Stanbridge)": 844.10
                },
                "Glamour": {
                    "Custom // 3/4\" Shaker // Melamine": 1000.50,
                    "Custom // Slab Door // Melamine": 752.10,
                    "Custom // Slab Door // Paint": 1000.50,
                    "Custom // Slab Door // Wood Veneer": 1251.20
                }
            };
			*/
			
			function populateMainBrands() {
                jQuery.each(brandData, function (brand) {
                    jQuery('#main_brand').append(new Option(brand, brand));
                });
            }
			
			function populateSubBrands() {
                let selectedBrand = $('#main_brand').val();
                let subBrandSelect = $('#sub_brand');
                subBrandSelect.empty();
                
                if (brandData[selectedBrand]) {
                    jQuery.each(brandData[selectedBrand], function (subBrand, price) {
                        subBrandSelect.append(new Option(subBrand, price));
                    });
                }
                //updatePrice();
            }
			
			jQuery('#toggleOptional').change(function () {
				if ($(this).is(':checked')) {
					$('#optional_calcs_div').slideDown(); // Show with animation
				} else {
					$('#optional_calcs_div').slideUp(); // Hide with animation
				}
			});
		
		
/*
            function updatePrice() {
                let selectedPrice = $('#sub_brand').val();
                $('#price').val(selectedPrice);
            }

            function updatePriceManual() {
                let selectedBrand = $('#main_brand').val();
                let selectedSubBrand = $('#sub_brand option:selected').text();
                let newPrice = parseFloat($('#price').val());
                if (!isNaN(newPrice)) {
                    brandData[selectedBrand][selectedSubBrand] = newPrice;
                    alert("Price updated successfully!");
                }
            }
*/
/*

            function populateSubBrands() {
                let selectedBrand = $('#main_brand').val();
                let subBrandSelect = $('#sub_brand');
                subBrandSelect.empty();
                
                if (brandData[selectedBrand]) {
                    $.each(brandData[selectedBrand], function (subBrand) {
                        subBrandSelect.append(new Option(subBrand, subBrand));
                    });
                }
                updatePrice();
            }

            function updatePrice() {
                let selectedBrand = $('#main_brand').val();
                let selectedSubBrand = $('#sub_brand').val();
                if (brandData[selectedBrand] && brandData[selectedBrand][selectedSubBrand]) {
                    $('#price').val(brandData[selectedBrand][selectedSubBrand]);
                }
            }

            function updatePriceManual() {
                let selectedBrand = $('#main_brand').val();
                let selectedSubBrand = $('#sub_brand').val();
                let newPrice = parseFloat($('#price').val());
                if (!isNaN(newPrice)) {
                    brandData[selectedBrand][selectedSubBrand] = newPrice;
                    alert("Price updated successfully!");
                }
            }

            
            $('#sub_brand').change(updatePrice);
            $('#update_price_btn').click(updatePriceManual);
*/

            populateMainBrands();
            populateSubBrands();
			jQuery('#main_brand').change(populateSubBrands);
			
			jQuery("#priceCalcForm").validate({
			  rules: {
				// simple rule, converted to {required:true}
				main_brand: {
					required: true,
				},
				sub_brand: {
					required: true,
				},
				linear_feet: {
					required: true,
					number: true,
					min: 1,
					max: 9999999
				},
				wall_cabinets: {
					required: true,
					number: true,
					min: 0,
					max: 9999999
				},
				base_cabinets: {
					required: true,
					number: true,
					min: 0,
					max: 9999999
				},
				tall_cabinets: {
					required: true,
					number: true,
					min: 0,
					max: 9999999
				},
				
				
			  }
			});
			
			
			
			
			
			
			
			
			
			
			
			
			
			// perform validation and calculations on click
				
			jQuery( "#price_calc_btn" ).click(function( event ){

				event.preventDefault();
				
				// jQuery("#input_data_table_1, #input_data_table_2, #input_data_table_3, #input_data_table_4, #input_data_table_t_cost, #input_data_table_5,  .table_print_1, .br_line").remove();
				
				var validator = $( "#priceCalcForm" ).validate();
					if( ! validator.form() ){
						$('html, body').animate({
							scrollTop: $("body").offset().top
						}, 1000);
						return;

					} 

				// defining variables and getting input values
				/*
				let price = 0;
				let totalCost = 0;
				let clientPrice = 0;
				let listprice = 0;
				let modificationprice = 0;
				var price_func_arr = [];
				
				var priceInput_Array = [];
				*/
				
				let linear_feet = jQuery('#linear_feet').val();
				let main_brand = jQuery('#main_brand').val();
				let sub_brand = jQuery('#sub_brand').val();
				
				let sub_brand_calc = sub_brand * linear_feet;
				
				let wood_specie = jQuery('#wood_specie').val();
				let door_finish = jQuery('#door_finish').val();
				let door_finish_calc = sub_brand_calc * door_finish / 100; 
				let wood_specie_calc = sub_brand_calc * wood_specie / 100; 
				
				//console.log("door_finish_calc: " + door_finish_calc);
				//console.log("wood_specie_calc: " + wood_specie_calc);
				
				
				let base_cabinets = jQuery('#base_cabinets').val();
				let wall_cabinets = jQuery('#wall_cabinets').val();
				let tall_cabinets = jQuery('#tall_cabinets').val();
				
				
				let base_cabinets_calc = sub_brand * ( base_cabinets - Math.floor(linear_feet * 2/5 ) ) *base_cabinets_price_per_feet * base_cabinets_factor;
				
				let wall_cabinets_calc = sub_brand * ( wall_cabinets - Math.floor(linear_feet * 2/5 ) ) *wall_cabinets_price_per_feet * wall_cabinets_factor;
				
				let tall_cabinets_calc = sub_brand * tall_cabinets  * tall_cabinets_price_per_feet * tall_cabinets_factor;
				
				//let base_cabinets_calc = linear_feet * base_cabinets / 100;
				console.log("base_cabinets_calc: " + base_cabinets_calc);
				console.log("wall_cabinets_calc: " + wall_cabinets_calc);
				console.log("tall_cabinets_calc: " + tall_cabinets_calc);
				
				
				let drawer_bases = jQuery('#drawer_bases').val();
				let molding = jQuery('#molding').val();
				let height = jQuery('#height').val();
				let channals = jQuery('#channals').val();
				
				let drawer_bases_calc = round_2_digits( sub_brand_calc * drawer_bases / 100 ); 
				let molding_calc = round_2_digits ( sub_brand_calc * molding / 100 ); 
				let height_calc = sub_brand_calc * height / 100; 
				let channals_calc = sub_brand_calc * channals / 100; 
				/*
				console.log("drawer_bases_calc: " + drawer_bases_calc);
				console.log("molding_calc: " + molding_calc);
				console.log("height_calc: " + height_calc);
				console.log("channals_calc: " + channals_calc);
				*/
				let acessories = jQuery('#acessories').val();
				let acessories_calc = acessories * acessories_factor; 
				
				//console.log("acessories_calc: " + acessories_calc);
				
				let speciality_item = parseFloat ( jQuery('#speciality_item').val() );
				
				var estimated_total_value = round_2_digits ( sub_brand_calc + wood_specie_calc + door_finish_calc + base_cabinets_calc + wall_cabinets_calc + tall_cabinets_calc + drawer_bases_calc + molding_calc + height_calc + channals_calc + acessories_calc + speciality_item );
				
				estimated_total_value = Math.ceil(estimated_total_value / 50) * 50;
				
				//var range_estimate_low = round_2_digits ( estimated_total_value * 0.93 );
				//range_estimate_low = Math.floor(estimated_total_value / 1000) * 1000;
				range_estimate_low = Math.round((estimated_total_value * 0.93) / 1000) * 1000;
				
				//var range_estimate_high = round_2_digits ( estimated_total_value * 1.07 );
				//range_estimate_high = Math.ceil(estimated_total_value / 1000) * 1000;
				range_estimate_high = Math.round((estimated_total_value * 1.07) / 1000) * 1000;
				
				jQuery('#estimated_total_value').text(" $ " + estimated_total_value);
				jQuery('#range_estimate_low').text(" $ " +range_estimate_low);
				jQuery('#range_estimate_high').text(" $ " +range_estimate_high);
				
				
				
				jQuery('#brand_text').text(jQuery('#main_brand  option:selected').text());
				jQuery('#sub_brand_text').text(jQuery('#sub_brand  option:selected').text());
				jQuery('#wood_specie_text').text(jQuery('#wood_specie  option:selected').text());
				jQuery('#door_finish_text').text(jQuery('#door_finish  option:selected').text());
				jQuery('#drawer_bases_text').text(jQuery('#drawer_bases  option:selected').text());
				jQuery('#molding_text').text(jQuery('#molding  option:selected').text());
				jQuery('#height_text').text(jQuery('#height  option:selected').text());
				jQuery('#channals_text').text(jQuery('#channals  option:selected').text());
				//jQuery('#sub_brand_text').text(jQuery('#sub_brand  option:selected').text());
				
				
				
				
				
				jQuery('#sub_brand_calc').text(  " $ " + sub_brand_calc);
				jQuery('#wood_specie_calc').text( " $ " + round_2_digits ( wood_specie_calc ) );
				jQuery('#door_finish_calc').text( " $ " + round_2_digits ( door_finish_calc ) );
				jQuery('#base_cabinets_calc').text( " $ " + round_2_digits ( base_cabinets_calc ) );
				
				jQuery('#linear_feet_calc').text(linear_feet + " ft ");
				jQuery('#wood_specie_calc').text(  " $ " + round_2_digits ( wood_specie_calc ) );
				jQuery('#base_cabinets_calc').text(  " $ " + round_2_digits ( base_cabinets_calc ) );
				jQuery('#wall_cabinets_calc').text(  " $ " + round_2_digits ( wall_cabinets_calc ) );
				jQuery('#tall_cabinets_calc').text(  " $ " + round_2_digits ( tall_cabinets_calc ) );
				
				jQuery('#drawer_bases_calc').text(  " $ " + round_2_digits ( drawer_bases_calc ) );
				jQuery('#molding_calc').text(  " $ " + round_2_digits ( molding_calc ) );
				jQuery('#height_calc').text(  " $ " + round_2_digits ( height_calc ) );
				jQuery('#channals_calc').text(  " $ " + round_2_digits ( channals_calc ) );
				
				jQuery('#acessories_calc').text(  " $ " + round_2_digits ( acessories_calc ) );
				jQuery('#speciality_item_calc').text(  " $ " + round_2_digits ( speciality_item ) );
				
				/*
				
				console.log("estimated_total_value: " + estimated_total_value);
				console.log("range_estimate_low: " + range_estimate_low);
				console.log("range_estimate_high: " + range_estimate_high);
				
				
				console.log("Main Brand: " + main_brand);
				console.log("Sub Brand: " + sub_brand_calc);
				console.log("Wood Specie: " + wood_specie_calc);
				console.log("Door Finish: " + door_finish_calc);
				console.log("Linear Feet: " + linear_feet);
				console.log("Base Cabinets: " + base_cabinets_calc);
				console.log("Wall Cabinets: " + wall_cabinets_calc);
				console.log("Tall Cabinets: " + tall_cabinets_calc);
				
				console.log("drawer_bases: " + drawer_bases_calc);
				console.log("molding: " + molding_calc);
				console.log("height: " + height_calc);
				console.log("channals: " + channals_calc);
				
				console.log("acessories: " + acessories_calc);
				console.log("speciality_item: " + speciality_item);
				*/
				
			});	
			
});
