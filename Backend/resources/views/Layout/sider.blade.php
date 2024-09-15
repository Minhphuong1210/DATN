<div>
    <!-- Let all your things have their places; let each part of your business have its time. - Benjamin Franklin -->
</div>
<div class="app-sidebar-menu">
    <div class="h-100" data-simplebar>

        <!--- Sidemenu -->
        <div id="sidebar-menu">

            <div class="logo-box">
                <a class='logo logo-light' href=''>
                    <span class="logo-sm">
                        <img src="{{ asset('assets/admin/assets/images/logo-sm.png') }}" alt="" height="22">
                    </span>
                    <span class="logo-lg">
                        <img src="{{ asset('assets/admin/assets/images/logo-light.png') }}" alt=""
                            height="24">
                    </span>
                </a>
                <a class='logo logo-dark' href=''>
                    <span class="logo-sm">
                        <img src="{{ asset('assets/admin/assets/images/logo-sm.png') }}" alt="" height="22">
                    </span>
                    <span class="logo-lg">
                        <img src="{{ asset('assets/admin/assets/images/logo-dark.png') }}" alt=""
                            height="24">
                    </span>
                </a>
            </div>

            <ul id="side-menu">
                <li class="menu-title">Quản trị hệ thống</li>
                <li>
                   
                    <a href="{{ route('admins.orders.index') }}">
                        <i data-feather="shopping-cart"></i>
                        <span> Đơn hàng </span>
                    </a>
                </li>

            </ul>

        </div>
        <!-- End Sidebar -->

        <div class="clearfix"></div>

    </div>
</div>