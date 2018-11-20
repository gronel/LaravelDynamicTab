<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Title -->
    <title>@yield('browser-title', config('app.name'))</title>

    <link rel="icon" href="{{ asset('img/favicon.ico') }}">

    <!-- Icons-->
    <link href="{{ asset('css/coreui-icons.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/flag-icon.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/simple-line-icons/css/simple-line-icons.css') }}" rel="stylesheet">

    <!-- Main styles for this application-->

    <link href="{{ asset('css/style.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/pace.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/hamburgers.css') }}" rel="stylesheet">
    <link href="{{ asset('vendors/spinkit/css/spinkit.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('vendors/toastr/css/toastr.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('vendors/ladda/css/ladda-themeless.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('vendors/select2/css/select2.min.css') }}" rel="stylesheet" />
    <style>
        .nav-tabs > li .close {
            margin: -2px 0 0 10px;
            font-size: 18px;
        }
        .marginBottom {
            margin-bottom :1px !important;
        }
        .operationDiv {
            padding:5px 10px 5px 5px;
        }
        .operationDivWrapper {
            margin-top:-1px;
        }
        .leftMenu {
            height :70%;
            background-color: #E6E6E6;
            border-right: 2px solid #BFBFBF;
        }

    </style>
</head>

<body>
<div class="container">

        <ul class="nav nav-tabs marginBottom" id="myTab" role="tablist">
            <li class="nav-item ">
                <a href="#home" class="nav-link active backgroundRed" data-toggle="tab" >Main </a>

            </li>
        </ul>
        <div class="tab-content span4">
            <div class="tab-pane active" id="home">
                @include('person/index')
            </div>

        </div>
        <div>
            <div class="operationDiv">
                <button type="submit" class="btn" id="composeButton">Compose</button>
            </div>
        </div>



</div>
<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->

<script src="{{ asset('vendors/jquery.min.js') }}"></script>
<script src="{{ asset('vendors/popper.min.js') }}"></script>
<script src="{{ asset('vendors/bootstrap.min.js') }}"></script>
<script src="{{ asset('vendors/pace.min.js') }}"></script>
<script src="{{ asset('vendors/perfect-scrollbar.min.js') }}"></script>
<script src="{{ asset('vendors/coreui.min.js') }}"></script>
<script src="{{ asset('vendors/ladda/js/spin.min.js') }}"></script>
<script src="{{ asset('vendors/ladda/js/ladda.min.js') }}"></script>
<script src="{{ asset('vendors/jquery-validation/dist/jquery.validate.js') }}"></script>
<script src="{{ asset('vendors/ladda/js/spin.min.js') }}"></script>
<script src="{{ asset('vendors/ladda/js/ladda.min.js') }}"></script>
<script src="{{ asset('vendors/select2/js/select2.min.js') }}"></script>

<script src="{{ asset('vendors/toastr/js/toastr.js') }}"></script>
<script src="{{ asset('js/dynamic-tab/dynamic-tab.js') }}"></script>

</body>
</html>