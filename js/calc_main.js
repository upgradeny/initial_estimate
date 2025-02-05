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
            }
			
			
			
			
    


			function populateAccessories(selector, min, max) {
				let select = jQuery(selector);
				select.empty(); // Clear existing options
				select.append(`<option value="0" selected="selected">Select Quantity</option>`);

				for (let i = min; i <= max; i++) {
					select.append(`<option value="${i}">${i}</option>`);
				}
			}

			populateAccessories("#accessories", 1, 50);

			
			jQuery('#toggleOptional').change(function () {
				if ($(this).is(':checked')) {
					$('.calc_field_hidden').show(); // Show with animation
				} else {
					$('.calc_field_hidden').hide(); // Hide with animation
				}
			});

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
					required: false,
					number: true,
					min: 0,
					max: 9999999
				},
				base_cabinets: {
					required: false,
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
				
				speciality_item: {
					required: false,
					number: true,
					min: 0,
					max: 999999999999999
				},
				
			  }
			});
			
			// perform validation and calculations on click
				
			jQuery( "#price_calc_btn , select , input.form-control" ).on("click change", function(event) {

				event.preventDefault();

				
				var validator = $( "#priceCalcForm" ).validate();
					if( ! validator.form() ){
						$('html, body').animate({
							scrollTop: $("body").offset().top
						}, 1000);
						return;

					} 

				// defining variables and getting input values
				
				let linear_feet = jQuery('#linear_feet').val();
				let main_brand = jQuery('#main_brand').val();
				let sub_brand = jQuery('#sub_brand').val();
				
				let sub_brand_calc = sub_brand * linear_feet;
				
				let wood_specie = jQuery('#wood_specie').val();
				let door_finish = jQuery('#door_finish').val();
				let door_finish_calc = sub_brand_calc * door_finish / 100; 
				let wood_specie_calc = sub_brand_calc * wood_specie / 100; 				
				
				let base_cabinets = jQuery('#base_cabinets').val();
				let wall_cabinets = jQuery('#wall_cabinets').val();
				let tall_cabinets = jQuery('#tall_cabinets').val();
				
				var base_cabinets_calc = 0;
				var wall_cabinets_calc = 0;
				
				if (base_cabinets) { 
					base_cabinets_calc = sub_brand * ( base_cabinets - Math.floor(linear_feet * 2/5 ) ) *base_cabinets_price_per_feet * base_cabinets_factor;
				}
				if (wall_cabinets) { 
					wall_cabinets_calc = sub_brand * ( wall_cabinets - Math.floor(linear_feet * 2/5 ) ) *wall_cabinets_price_per_feet * wall_cabinets_factor;
				}
				
				
				
				
				let tall_cabinets_calc = sub_brand * tall_cabinets  * tall_cabinets_price_per_feet * tall_cabinets_factor;
				
				/*
				console.log("base_cabinets_calc: " + base_cabinets_calc);
				console.log("wall_cabinets_calc: " + wall_cabinets_calc);
				console.log("tall_cabinets_calc: " + tall_cabinets_calc);
				*/
				
				let drawer_bases = jQuery('#drawer_bases').val();
				let molding = jQuery('#molding').val();
				let height = jQuery('#height').val();
				let channals = jQuery('#channals').val();
				
				let drawer_bases_calc = round_2_digits( sub_brand_calc * drawer_bases / 100 ); 
				let molding_calc = round_2_digits ( sub_brand_calc * molding / 100 ); 
				let height_calc = sub_brand_calc * height / 100; 
				let channals_calc = sub_brand_calc * channals / 100; 

				let accessories = jQuery('#accessories').val();
				console.log(accessories);
				let acessories_calc = accessories * acessories_factor; 

				
				let speciality_item = parseFloat ( jQuery('#speciality_item').val() );
				
				var estimated_total_value = round_2_digits ( sub_brand_calc + wood_specie_calc + door_finish_calc + base_cabinets_calc + wall_cabinets_calc + tall_cabinets_calc + drawer_bases_calc + molding_calc + height_calc + channals_calc + acessories_calc + speciality_item );
				
				
				//estimated_total_value = Math.round(estimated_total_value / 1000) * 1000;
				estimated_total_value = Math.ceil(estimated_total_value / 50) * 50;
				/*
				if (estimated_total_value > 9999 ) {
					estimated_total_value = Math.round(estimated_total_value / 1000) * 1000;
				}
				*/
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
				
				jQuery('#sub_brand_calc').text(  " $ " + round_2_digits ( sub_brand_calc ) );
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
				
				
				
			});	
			
});
