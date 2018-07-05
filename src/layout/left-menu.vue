<template>
    <ul id="ul_nav" class="nav nav-pills nav-stacked col-md-3">
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
                    <a href="#">
                        <span class="glyphicon glyphicon-user"></span>&nbsp; 群组1
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="glyphicon glyphicon-user"></span>&nbsp; 群组2
                    </a>
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
</style>
