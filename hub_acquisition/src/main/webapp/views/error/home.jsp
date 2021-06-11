<!DOCTYPE html>
<html lang="en">
<base href="/agroai_dashboard_m1/">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>View Consignments</title>

<!-- Custom fonts for this template-->
<link href="content/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

<!-- Custom styles for this template-->
<link href="content/css/sb-admin-2.min.css" rel="stylesheet">
<link href="content/css/consignment.css" rel="stylesheet">

</head>

<body id="page-top">

	<!-- Page Wrapper -->
	<div id="wrapper">

		<!-- Sidebar -->
		<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

			<!-- Sidebar - Brand -->
			<a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
				<div class="sidebar-brand-icon rotate-n-15">
					<i class="fas fa-leaf"></i>
				</div>
				<div class="sidebar-brand-text mx-3">
					Dashami Agro 
				</div>
			</a>

			<!-- Divider -->
			<hr class="sidebar-divider my-0">

			<!-- Nav Item - Dashboard -->
			<li class="nav-item"><a class="nav-link" href="index.html"> <i class="fas fa-fw fa-tachometer-alt"></i> <span>Dashboard</span></a></li>

			<!-- Divider -->
			<hr class="sidebar-divider">

			<!-- Heading -->
			<div class="sidebar-heading">Utilities</div>


			<!-- Nav Item - Utilities Search -->
			<li class="nav-item">
				<a class="nav-link collapsed" href="#" 
					data-toggle="collapse" data-target="#collapse_nav_search" 
					aria-expanded="true" aria-controls="collapse_nav_search"> 
						<i class="fas fa-fw fa-search"></i> 
						<span>Search</span>
				</a>
				<div id="collapse_nav_search" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header">Search Components:</h6>
						<a class="collapse-item" href="user/search/consignment">Consignments</a> 
						<a class="collapse-item" href="user/search/farmer">Farmers</a>
					</div>
				</div>
			</li>
			
			
			
			<!-- Nav Item - Utilities Add -->
			<li class="nav-item">
				<a class="nav-link collapsed" href="#" 
					data-toggle="collapse" data-target="#collapse_nav_add" 
					aria-expanded="true" aria-controls="collapse_nav_add"> 
						<i class="fas fa-fw fa-plus"></i> 
						<span>Add</span>
				</a>
				<div id="collapse_nav_add" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header">Add Components:</h6>
						<a class="collapse-item " href="user/add/consignment">Consignments</a> 
						<a class="collapse-item" href="user/add/farmer">Farmers</a>
					</div>
				</div>
			</li>

			<!-- Divider -->	
			<hr class="sidebar-divider d-none d-md-block">

			<!-- Sidebar Toggler (Sidebar) -->
			<div class="text-center d-none d-md-inline">
				<button class="rounded-circle border-0" id="sidebarToggle"></button>
			</div>

		</ul>
		<!-- End of Sidebar -->

		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">

				<!-- Topbar -->
				<nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


					<!-- Topbar Navbar -->
					<ul class="navbar-nav ml-auto">

	

						<div class="topbar-divider d-none d-sm-block"></div>

						<!-- Nav Item - User Information -->
						<li class="nav-item dropdown no-arrow">
							<a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="mr-2 d-none d-lg-inline text-gray-600 small">Douglas
										McGee</span> <img class="img-profile rounded-circle" src="content/img/undraw_profile.svg">
							</a> <!-- Dropdown - User Information -->
							<div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
							
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal"> <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
								</a>
							</div>
						</li>

					</ul>

				</nav>
				<!-- End of Topbar -->

				<!-- Begin Page Content -->
				<div class="container-fluid">

					<!-- Page Heading -->
					<h1 class="h3 mb-4 text-gray-800">View Consignment </h1>
					
					
					
										
					<div id= "timeline_row" class="row mb-5">
							<div class="col">
							
							
							<!-- Timeline -->
							<ul class="timeline">
							
							
								<li>
									<!-- begin timeline-time -->
							        <div class="timeline-time">
							        	<span class="date">today</span>
							            <span class="time">04:20</span>
							        </div>
							        <!-- end timeline-time -->
							        <!-- begin timeline-icon -->
							        <div class="timeline-icon ">
							        	<a  class="bg-success" href="javascript:;">&nbsp;</a>
						        	</div>
						        	<!-- end timeline-icon -->
						        	<!-- begin timeline-body -->
						        	<div class="timeline-body shadow">
							            <div class="timeline-header">
							               <span class="timeline-header-text"><a href="user/view/consignment/#consignment_details"> Received Consigment </a> </span>
							            </div>
							            <div class="timeline-content">
							            	<div class="value-row mb-3">
							            		<span class="variable-name">Farm ID : </span>
							            		<span class="variable-value"> 3234-3283-4923-3434 </span>
							            	</div>
							            	
							            	<div class="value-row mb-3">
							            		<span class="variable-name">Product Type : </span>
							            		<span class="variable-value"> Fruit-Mango </span>
							            	</div>
							               
							            	<div class="value-row mb-3">
							            		<span class="variable-name">Weight : </span>
							            		<span class="variable-value"> 16 kg </span>
							            	</div>
							            	
							               
							               
							            </div>
							            
							            <div class="timeline-footer">
	<!-- 						            	<span class="fa-stack fa-fw stats-icon"> -->
	<!-- 					                  	<i class="fa fa-circle fa-xs fa-angle-left text-success text-inverse-lighter"></i> -->
	<!-- <!-- 					                  	<i class="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i> --> 
	<!-- 					                  	</span> -->
							            
							               <a href="javascript:;" class="m-r-15 ">
							               	<i class="fa fa-circle fa-xs text-success fa-fw fa-lg m-r-3"></i> 
							               	Status : <span class="variable-value"> Completed </span>
							               	</a>
							            </div>
							            
							         	</div>
							         <!-- end timeline-body -->
						      		</li>
						      		
						      		
						      		<li>
									<!-- begin timeline-time -->
								        <div class="timeline-time">
								        	<span class="date">24 February 2014</span>
								            <span class="time">08:17</span>
								        </div>
								        <!-- end timeline-time -->
								        <!-- begin timeline-icon -->
								        <div class="timeline-icon ">
								        	<a  class="bg-warning" href="javascript:;">&nbsp;</a>
							        	</div>
							        	<!-- end timeline-icon -->
							        	<!-- begin timeline-body -->
							        	<div class="timeline-body shadow">
								            <div class="timeline-header">
								               <span class="timeline-header-text"><a href="javascript:;"> Processing : Sorting </a> </span>
								            </div>
								            <div class="timeline-content">
								            
								            
								            	<span class="spinner-grow text-warning spinner-grow-sm " role="status" aria-hidden="true"></span>
								            
								            	<span class="variable-name ml-2 "> In process... </span>
							            	  
								            	
								            </div>
								            
								            <div class="timeline-footer">
		<!-- 						            	<span class="fa-stack fa-fw stats-icon"> -->
		<!-- 					                  	<i class="fa fa-circle fa-xs fa-angle-left text-success text-inverse-lighter"></i> -->
		<!-- <!-- 					                  	<i class="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i> --> 
		<!-- 					                  	</span> -->
								            
								               <a href="javascript:;" class="m-r-15 ">
								               	<i class="fa fa-circle fa-xs text-warning fa-fw fa-lg mr-2 "></i> 
								               	Status : <span class="variable-value mt-1"> In progress </span>
								               	</a>
								            </div>
							            
							         	</div>
							         <!-- end timeline-body -->
						      		</li>
						      		
						      		
						      		<li>
									<!-- begin timeline-time -->
								        <div class="timeline-time">
								        	<span class="date">24 February 2014</span>
								            <span class="time">08:17</span>
								        </div>
								        <!-- end timeline-time -->
								        <!-- begin timeline-icon -->
								        <div class="timeline-icon ">
								        	<a  class="" href="javascript:;">&nbsp;</a>
							        	</div>
							        	<!-- end timeline-icon -->
							        	<!-- begin timeline-body -->
							        	<div class="timeline-body shadow">
								            <div class="timeline-header">
								               <span class="timeline-header-text"><a href="javascript:;"> Packaging </a> </span>
								            </div>
								            <div class="timeline-content">
								            
								            	<span class="variable-name"> Not Started </span>
								            	
								            </div>
								            
								            <div class="timeline-footer">
		<!-- 						            	<span class="fa-stack fa-fw stats-icon"> -->
		<!-- 					                  	<i class="fa fa-circle fa-xs fa-angle-left text-success text-inverse-lighter"></i> -->
		<!-- <!-- 					                  	<i class="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i> --> 
		<!-- 					                  	</span> -->
								            
								               <a href="javascript:;" class="m-r-15 ">
								               	<i class="fa fa-circle fa-xs  fa-fw fa-lg m-r-3"></i> 
								               	Status : <span class="variable-value"> Not Started </span>
								               	</a>
								            </div>
							            
							         	</div>
							         <!-- end timeline-body -->
						      		</li>
						      		


				</div>
				<!-- /.container-fluid -->

			</div>
			
					
					
								
					<div id = "consignment_details"class="row">
						<div class="col">


							<div class="card shadow mb-4">
								<div class="card-header">Consignment Details</div>
								<div class="card-body">
									<form>
									
									
									
										<div class="form-group mb-5">
											<label for="consignment_id_input">Consignment ID (Autogenerated)</label> 
											<input class="form-control .border-0" id="" product_weight_input"" type="text" placeholder="" value="573283749299" readonly>
										</div>

										<div class="row">
											<div class="col-3">
												<div class="dropdown ">
													<button class="btn btn-primary dropdown-toggle px-5" id="dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Product</button>
													<div class="dropdown-menu " style="width: 98%;" aria-labelledby="dropdown_product_select">
														<a class="dropdown-item px-5" href="javascript:dropdown_product_select('mango');">Mango</a> <a class="dropdown-item px-5" href="javascript:dropdown_product_select('vegitable');">Vegetable</a> <a class="dropdown-item px-5"
															href="javascript:dropdown_product_select('fruit');">Fruits</a>
													</div>


												</div>
											</div>

											<div class="col-9">
												<div class="form-group">
													<input class="form-control " id="product_type_input" type="text" placeholder="">
												</div>
											</div>



										</div>



										<div class="form-group">
											<!-- Date input -->
											<label class="control-label" for="product_harv_date">Harvest Date</label> <input class="form-control" id="product_harv_date" name="product_harv_date" placeholder="MM/DD/YYY" type="text" />
										</div>


										<div class="form-group">
											<label for="product_weight_input">Weight (Kg)</label> 
											<input class="form-control " id="" product_weight_input"" type="text" placeholder="">
										</div>


									</form>
								</div>
							</div>

						</div>

					</div>
			
			
			
			<!-- End of Main Content -->

			<!-- Footer -->
			<footer class="sticky-footer bg-white">
				<div class="container my-auto">
					<div class="copyright text-center my-auto">
						<span>Copyright &copy; Your Website 2020</span>
					</div>
				</div>
			</footer>
			<!-- End of Footer -->

		</div>
		<!-- End of Content Wrapper -->

	</div>
	<!-- End of Page Wrapper -->

	<!-- Scroll to Top Button-->
	<a class="scroll-to-top rounded" href="#page-top"> <i class="fas fa-angle-up"></i>
	</a>

	<!-- Logout Modal-->
	<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
					<button class="close" type="button" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
				<div class="modal-footer">
					<button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
					<a class="btn btn-primary" href="login.html">Logout</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Bootstrap core JavaScript-->
	<script src="content/vendor/jquery/jquery.min.js"></script>
	<script src="content/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

	<!-- Core plugin JavaScript-->
	<script src="content/vendor/jquery-easing/jquery.easing.min.js"></script>

	<!-- Custom scripts for all pages-->
	<script src="content/js/sb-admin-2.min.js"></script>



	<script type="text/javascript">
		$('.input-group.date').datepicker({
			format : "dd.mm.yyyy"
		});

		$(document)
				.ready(
						function() {

							var date_input = $('input[name="product_harv_date"]'); //our date input has the name "date"
							var container = $('.bootstrap-iso form').length > 0 ? $(
									'.bootstrap-iso form').parent()
									: "body";
							var options = {
								format : 'dd/mm/yyyy',
								container : container,
								todayHighlight : true,
								autoclose : true,
							};
							date_input.datepicker(options);

							$("#addRow")
									.click(
											function() {
												var html = '';
												html += '<div id="inputFormRow">';

												html += '<div id="inputFormRow" class="card pt-2 pl-2 mb-2">';

												html += '	<div class="row"> ';
												html += '		<div class="col-4">';

												html += '				<div class="form-group">';
												html += '		    	<label for="product_weight_input" class=" font-weight-bolder text-black-75 small ">Name of relative</label>';
												html += '		    	<input class="form-control " id=""product_weight_input"" type="text" placeholder="">';
												html += '	    	</div>';

												html += '		</div>';
												html += '		<div class="col-3">';

												html += '				<div class="form-group">';
												html += '		    	<label for="product_weight_input" class=" font-weight-bolder text-black-75 small ">Relation</label>';
												html += '		    	<input class="form-control " id=""product_weight_input"" type="text" placeholder="">';
												html += '	    	</div>';

												html += '		</div>';

												html += '		<div class="col-1">';

												html += '				<div class="form-group">';
												html += '		    	<label for="product_weight_input" class=" font-weight-bolder text-black-75 small ">Age</label>';
												html += '		    	<input class="form-control " id=""product_weight_input"" type="text" placeholder="">';
												html += '	    	</div>';

												html += '		</div>';

												html += '		<div class="col-3 ">';

												html += '    		<div class="">';
												html += '    			<div class="form-group  ">';
												html += '			    	<label for="product_weight_input" class=" font-weight-bolder text-black-75 small ">Education</label>';
												html += '			    	<input class="form-control " id=""product_weight_input"" type="text" placeholder="">';
												html += '		    	</div>';

												html += '            </div>';

												html += '		</div>';

												html += '		<div class="col-1 ">';
												html += '			<div class="form-group py-2">';
												html += '				<label for="product_weight_input "></label>';

												html += '                <button id="removeRow" type="button" class="btn btn-danger btn-md mt-4 shadow-sm btn-icon btn-circle">';
												html += '                	<i class="fa fa-trash" aria-hidden="true"></i>';
												html += '                </button>';

												html += '            </div>';
												html += '		</div>';

												html += '	</div>';

												html += '</div>';

												$('#newRow').append(html);
											});

							// remove row
							$(document).on('click', '#removeRow', function() {
								$(this).closest('#inputFormRow').remove();
							});

						})

		function dropdown_product_select(product_type) {

			console.log(product_type);

			$("#product_type_input").val(product_type);

		}

		function dropdown_irrigation_select(product_type) {

			console.log(product_type);

			$("#farm_irrig_type_input").val(product_type);

		}
	</script>

</body>

</html>