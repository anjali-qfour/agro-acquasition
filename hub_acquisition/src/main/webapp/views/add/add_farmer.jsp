<!DOCTYPE html>
<html lang="en">
<base href="/">

<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="shortcut icon" type="image/x-icon" href="content/images/favicon.ico">

	
	<title>Add Farmer</title>
	
	<link rel="shortcut icon" type="image/x-icon" href="content/images/favicon.ico">
	
	<!-- Custom fonts for this template-->
	<link href="content/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Muli:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
	
	<!-- Custom styles for this template-->
	<link href="content/css/sb-admin-2.css" rel="stylesheet">
	<link href="content/css/main.css" rel="stylesheet">



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
					Gro Systems
				</div>
			</a>

			<!-- Divider -->
			<hr class="sidebar-divider my-0">

			<!-- Nav Item - Dashboard -->
			<li class="nav-item">
				<a class="nav-link" href="user/home"> 
					<i class="fas fa-fw fa-tachometer-alt"></i> 
					<span>Dashboard</span>
				</a>
			</li>

			<!-- Divider -->
			<hr class="sidebar-divider">

			<!-- Heading -->
			<div class="sidebar-heading">Utilities</div>



			<!-- Nav Item - Vendor -->
			<li class="nav-item active">
				<a class="nav-link collapsed" href="#" 
					data-toggle="collapse" data-target="#collapse_nav_vendor" 
					aria-expanded="true" aria-controls="collapse_nav_vendor"> 
						<i class="fas fa-tractor"></i>						
						<span>Vendor</span>
				</a>
				<div id="collapse_nav_vendor" class="collapse show" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header">Select action</h6>
						<a class="collapse-item active" href="user/add/farmer">Add</a> 
						<a class="collapse-item" href="user/search/farmer">Search & view</a>						
					</div>
				</div>
			</li>
			



			<!-- Nav Item - Consignment -->
			<li class="nav-item">
				<a class="nav-link collapsed" href="#" 
					data-toggle="collapse" data-target="#collapse_nav_consignment" 
					aria-expanded="true" aria-controls="collapse_nav_consignment"> 
						<i class="fas fa-dolly"></i>					
						<span>Consignment</span>
				</a>
				<div id="collapse_nav_consignment" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header">Select action</h6>
						<a class="collapse-item" href="user/add/consignment">Add</a> 
						<a class="collapse-item" href="user/search/consignment">Search & view</a>						
					</div>
				</div>
			</li>
			
			
			
			

			<!-- Nav Item - Transport (Farm to Hub) -->
			<li class="nav-item">
				<a class="nav-link collapsed" href="#" 
					data-toggle="collapse" data-target="#collapse_nav_transporter_f2h" 
					aria-expanded="true" aria-controls="collapse_nav_transporter_f2h"> 
						<i class="fas fa-truck"></i>					
						<span>Transport-Farm 2 Hub</span>
				</a>
				<div id="collapse_nav_transporter_f2h" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header">Select action</h6>
						<a class="collapse-item" href="user/add/transporter_f2h">Add</a> 
						<a class="collapse-item" href="user/search/transporter_f2h">Search & view</a>						
					</div>
				</div>
			</li>
			
			
			
			
			
			
			<!-- Nav Item - Invoice -->
			<li class="nav-item ">
				<a class="nav-link collapsed" href="#" 
					data-toggle="collapse" data-target="#collapse_nav_invoice" 
					aria-expanded="true" aria-controls="collapse_nav_invoice"> 
						<i class="fas fa-file-invoice-dollar"></i>					
						<span>Invoice</span>
				</a>
				<div id="collapse_nav_invoice" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header"> Farmer Invoice : </h6>
						
						<a class="collapse-item " href="user/search/farmer_invoice">Search & View</a>		
						<h6 class="collapse-header"> Transporter(F2H) Invoice : </h6>
						 
						<a class="collapse-item " href="user/search/transporter_f2h_invoice">Search & View</a>							
					</div>
				</div>
			</li>






			

			
			<!-- Nav Item - product summary -->
			<li class="nav-item  ">
				<a class="nav-link collapsed" href="#" 
					data-toggle="collapse" data-target="#collapse_nav_adminuser" 
					aria-expanded="true" aria-controls="collapse_nav_adminuser"> 
						<i class="fas fa-clipboard-check"></i>						
						<span> Summary </span>
				</a>
				<div id="collapse_nav_adminuser" class="collapse  " aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header">Select action</h6>
						<a class="collapse-item " href="user/search/summary/products">Products</a> 
					</div>
				</div>
			</li>
			



			<!-- Divider -->	
			<hr class="sidebar-divider d-none d-md-block">

			<!-- Sidebar Toggler (Sidebar) -->
			<div class="text-center d-none d-md-inline">
				<button  id="sidebarToggle" class="rounded-circle border-0"></button>
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
							<a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
								<span class="mr-2 d-none d-lg-inline text-gray-600 small"></span> 
								<img class="img-profile rounded-circle" src="content/img/undraw_profile.svg">
							</a> <!-- Dropdown - User Information -->
							<div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
								
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal"> 
									<i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> 
									Logout
								</a>
							</div>
						</li>

					</ul>

				</nav>
				<!-- End of Topbar -->

				<!-- Begin Page Content -->
				<div class="container-fluid">

					<!-- Page Heading -->
					<h1 class="h3 mb-4 text-gray-800">Add Farmer </h1>
					
					
					
					
					
					<div class="row">
						<div class="col">
						
							<div class="card shadow mb-4">
								<div class="card-header">Farmer Details</div>
								<div class="card-body">
									<form>
									
									
										<div class="form-group mb-5">
											<label for="farmer_id_input" class="text-blue ">Farmer ID (Autogenerated)</label> 
											<input id="farmer_id_input" class="form-control border-0 text-uppercase text-monospace"  type="text" placeholder="" value="" readonly>
										</div>
										
										
										
										
										<div class="row">
											<div class="col-4">
											

												<div class="form-group">
													<label for="farmer_name_input  " class="text-blue ">Name</label> 
													<input id="farmer_name_input" class="form-control border-blue "  type="text" placeholder="">
												</div>
												
											</div>
											<div class="col-4">
											

												<div class="form-group">
													<label for="farmer_surname_input" class="text-blue ">Surname</label> 
													<input id="farmer_surname_input" class="form-control border-blue "  type="text" placeholder="">
												</div>
													
											</div>
											
											<div class="col-4">
											
												<div class="form-group">
													<label for="farmer_phone_input" class="text-blue ">Phone</label> 
													<input  id="farmer_phone_input" class="form-control border-blue"type="text" placeholder="">
												</div>
													
											</div>
										</div>
										
										
										
										
										
<!-- 										border-bottom border-dark pb-3 mb-5 -->
										<div class="row  ">
											<div class="col-9">
												<div class="form-group">
													<label for="home_address_input">Home address</label>
													<textarea  id="home_address_input" class="form-control" rows="3"></textarea>
												</div>
											</div>

											<div class="col-3">
												<div class="form-group mb-4">
													<label for="home_pincode_input">Home pincode</label> 
													<input id="home_pincode_input" class="form-control "  type="text" placeholder="">
												</div>
											</div>
											
										</div>
										
										
										
										
										<div id="new_relative_row"></div>

											
										<button id="addRow" class="btn btn-info btn-sm btn-icon-split float-right rounded-pill" type="button">
										
											<span class="icon text-white-50 rounded-circle">
												<i class="fas fa-plus-circle"></i>
											</span>
											<span class="text">Add Relative</span>
										
										</button>
					
					
					
					
									
									</form>
								
								</div>
								
							</div>
						</div>
					</div>

					
					
					
					

					
					<!-- Farm Details -->
					
					<div class="row farm_detail_row">
						<div class="col">


							<div class="card shadow mb-4">
								<div class="card-header">Farms Details</div>
								<div class="card-body">
									 
										<div class="d-flex justify-content-between mb-3">
										
										
											<h6 class="">List of farms</h6>
										
										
											
											<button id="add_farm_btn" class="btn btn-info btn-sm btn-icon-split rounded-pill" type="button">	
													
											
												<span class="icon text-white-50 ">
													<i class="fas fa-plus-circle"></i>
												</span>
												<span class="text">Add farm</span>
											
											</button>

											
											  
										</div>
					
				
									
										<ul class="nav nav-tabs mb-4" id="farm_tab" role="tablist">
											
										</ul>
										
										
										
										<div class="tab-content" id="farm_tab_content">
										  
										</div>
									
									
									
									
								 
									
								</div>
							</div>

						</div>

					</div>
					
				
				
				
				

					<div class="row">
						<div class="col">


							<div class="card shadow mb-4">
								<div class="card-header">Financial Details</div>
								<div class="card-body">
									<form>
									
									

										<div class="row ">
											<div class="col-6">

												<div class="form-group mb-4">
													<label for="loan_amount_input">Loan taken (amount)</label> 
													<input class="form-control " id="loan_amount_input" type="text" placeholder="">
												</div>

											</div>

											<div class="col-6">

												<div class="form-group mb-4">
													<label for="bank_name_input">Bank</label> 
													<input id="bank_name_input" class="form-control "  type="text" placeholder="">
												</div>

											</div>

										</div>


									</form>
								
								</div>
								
							</div>
							
							
						</div>
					</div>





				
									
<!-- 				Documentation upload -->
					
					<div class="row">
						<div class="col">
						
							<div class="card shadow mb-4">
								<div class="card-header">Farmer Documentation</div>
								<div class="card-body">
									
									
									
									<form>
									
									
									
										<div class="row my-2">
											
											
											<div class="col-4">
											
												<div class="form-group">
													<label for="aadhar_card_input">Aadhar card</label> 
													<input id="aadhar_card_input" class="form-control "  type="text" placeholder="">
												</div>
												
											</div>
											
											
											<div class="col-3 uploaded_file_input">
													<div class="form-group mb-0">
														<label for="aadhar_card_upload_input">Upload Aadhar card </label>
	
													    <div class="custom-file ">
														    <input  id="aadhar_card_upload_input" type="file" class="custom-file-input cursor_on" >
<!-- 														     <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  -->
														    
														    <label class="custom-file-label" for="aadhar_card_upload">Choose file...</label>
														    <div class="upload_message text-info  d-flex invisible">
														    	<small> Loading ... </small>
														    
														    
														    </div>
													    </div>
															
													</div>
											
											</div>
											
											
											<div class="col-5 border-bottom  pl-3 uploaded_file_name_list">
											
												<div class="form-group mb-1">
													<label class="" >Uploaded files</label>		
													<div class="upload_file_list ">
														
													</div>
													
												</div>
												
											
											</div>
											
											
										</div>
										
										
										
										
										
										

										
										<div class="row my-2">
											
											
											<div class="col-4">
											
												<div class="form-group ">
													<label for="pan_card_input">Pan card</label> 
													<input id="pan_card_input" class="form-control "  type="text" placeholder="">
												</div>
												
											</div>
											
											
											<div class="col-3 uploaded_file_input">
													<div class="form-group mb-0">
														<label for="pan_card_upload_input">Upload Aadhar card </label>
	
													    <div class="custom-file ">
														    <input  id="pan_card_upload_input" type="file" class="custom-file-input cursor_on" >
<!-- 														     <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  -->
														    
														    <label class="custom-file-label" for="pan_card_upload">Choose file...</label>
														    <div class="upload_message text-info  d-flex invisible">
														    	<small> Loading ... </small>
														    
														    
														    </div>
													    </div>
															
													</div>
											
											</div>
											
											
											<div class="col-5 border-bottom  pl-3 uploaded_file_name_list">
											
												<div class="form-group mb-1">
													<label class="" >Uploaded files</label>		
													<div class="upload_file_list ">
														
														
													</div>
													
												</div>
												
											
											</div>
											
											
										</div>
										
										
									
					
					
					
					

										
										<div class="row my-2">
											
											<div class="col-7 uploaded_file_input">
											
													<div class="form-group mb-0 ">
														<label for="address_proof_upload_input">Upload  Address proof </label>
	
													    <div class="custom-file ">
														    <input  id="address_proof_upload_input" type="file" class="custom-file-input cursor_on" >
														    
														    <label class="custom-file-label" for="address_proof_upload_input">Choose file...</label>
														    <div class="upload_message text-info  d-flex invisible">
														    	<small> Loading ... </small>
														    
														    </div>
													    </div>
															
													</div>
											
											</div>
											
											
											<div class="col-5 border-bottom  pl-3 uploaded_file_name_list">
											
												<div class="form-group mb-1">
													<label class="" >Uploaded files</label>		
													<div class="upload_file_list "></div>
															
												</div>
												
											</div>
											
											
										</div>
										
										

									
									</form>
								
								</div>
								
							</div>
						</div>
					</div>
					
					






					<div class="row">
						<div class="col">


							<div class="card shadow mb-4">
								<div class="card-header">Payment Details</div>
								<div class="card-body">

									
									<div class="d-flex justify-content-between mb-3">
										
										
										<h6 class="">List of Payment Details</h6>
									
									
										
										<button id="add_payment_btn" class="btn btn-info btn-sm btn-icon-split rounded-pill" type="button">	
												
										
											<span class="icon text-white-50 ">
												<i class="fas fa-plus-circle"></i>
											</span>
											<span class="text">Add Payment Detail</span>
										
										</button>
																					
											  
									</div>
					

									
								
									<ul class="nav nav-tabs mb-4" id="payment_tab_nav" role="tablist">
										
									</ul>
									
									
									
									<div class="tab-content" id="payment_tab_content">
									  
									</div>
													
										


								
								</div>
								
							</div>
							
							
						</div>
					</div>







				<div class="row ">

					<div class="col">
					
						<div class="card shadow mb-4">
							<div class="card-body">
							
								
								<button class="btn btn-success btn-icon-split float-right add_save" type="submit">
								
									<span class="icon text-white-50" >
<!-- 										<i  class="fas fa-exclamation"></i> -->
										<i class="fas fa-save"></i>
									</span>
									<span class="text">Save</span>
								
								</button>    
								
								
								
									
								
								                         
                                 
                                 
							</div>
						</div>					


					
					</div>
				</div>













				</div>
				<!-- /.container-fluid -->

			</div>
			<!-- End of Main Content -->

			<!-- Footer -->
			<footer class="sticky-footer bg-white">
				<div class="container my-auto">
					<div class="copyright text-center my-auto">
						<span>Copyright &copy;   2021</span>
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
						<span aria-hidden="true">—<i class="fas fa-times"></i></span>
					</button>
				</div>
				<div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
				<div class="modal-footer">
					<button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
					<a class="btn btn-primary" href="/logout">Logout</a>
				</div>
			</div>
		</div>
	</div>


	


	<!-- Bootstrap core JavaScript-->
	<script src="content/vendor/jquery/jquery.min.js"></script>
	
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.6.0/umd/popper.min.js" integrity="sha512-BmM0/BQlqh02wuK5Gz9yrbe7VyIVwOzD1o40yi1IsTjriX/NGF37NyXHfmFzIlMmoSIBXgqDiG1VNU6kB5dBbA==" crossorigin="anonymous"></script>	
	<script src="content/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

	

	<!-- Core plugin JavaScript-->
	<script src="content/vendor/jquery-easing/jquery.easing.min.js"></script>

	<!-- Custom scripts for all pages-->
	<script src="content/js/sb-admin-2.min.js"></script>


	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css" />


	<script src="content/js/base.js"></script>
	<script src="content/js/upload.js"></script>	
	<script src="content/js/add_farmer.js"></script>

	<script type="text/javascript">
	
	

		var userinfo = ${userinfo};

		$("#userDropdown span").text(userinfo.name+" "+userinfo.family_name);
		
		
		

		init_add_farmer();





	</script>

</body>

</html>