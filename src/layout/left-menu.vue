<template>
    <ul id="ul_nav" class="nav nav-pills nav-stacked">
        <li>
            <!--data-toggle，用于告诉 js需要对按钮做什么-->
            <!--collapse即是折叠-->
            <!--<a href="#sub1" data-toggle="collapse">系统功能</a>-->
            <!--data-target指示要切换到哪一个元素-->
            <a href="#" data-toggle="collapse" data-target="#sub1">预警室&nbsp;
                <span class="glyphicon glyphicon-list-alt"></span>
            </a>
            <ul id="sub1" class="nav collapse">                
                <li>
                    <router-link to="/content/3">
                        <span class="glyphicon glyphicon-user"></span>&nbsp; 海浪
                    </router-link>
                    <!-- <a href="#">
                        <span class="glyphicon glyphicon-user"></span>&nbsp; 群组1
                    </a> -->
                </li>
                <li>
                    <router-link to="/content/4">
                        <span class="glyphicon glyphicon-user"></span>&nbsp; 海啸
                    </router-link>
                </li>
                <li>
                    <a href="#">
                        <span class="glyphicon glyphicon-user"></span>&nbsp; 群组2
                    </a>
                </li>
            </ul>
        </li>
        <li>
            <a href="#">测试功能</a>
        </li>
    </ul>
</template>

<script>
    export default {

    }
</script>

<style>
#ul_nav{
    position: fixed;
    left: 0px;
    top:50px;
    bottom:0px;
    width: 200px;
}
</style>
