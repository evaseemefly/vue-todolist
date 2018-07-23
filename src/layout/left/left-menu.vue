<template>
    <ul id="ul_nav" class="nav nav-pills nav-stacked">
        <li v-for="group in groups">
            <!--data-toggle，用于告诉 js需要对按钮做什么-->
            <!--collapse即是折叠-->
            <!--<a href="#sub1" data-toggle="collapse">系统功能</a>-->
            <!--data-target指示要切换到哪一个元素-->
            <a href="#" data-toggle="collapse" data-target="#sub1">{{group.department.derpartmentname}}&nbsp;
                <span class="glyphicon glyphicon-list-alt"></span>
            </a>
            <ul id="sub1" class="nav collapse">
                <li v-for="temp in group.duty_list">
                    <router-link to="/home/content/4">
                        <span class="glyphicon glyphicon-user"></span>&nbsp; {{temp.dutyname}}
                    </router-link>
                </li>                
            </ul>
        </li>
        <!-- <li>
            <a href="#">测试功能</a>
        </li> -->
    </ul>
</template>

<script>
    export default {
        data(){
            return{
                group_index:0
            }
        },
        props: {
            groups: {
                // type: Object,
                required: true
            }
        }
    }
</script>

<style>
    #ul_nav {
        position: fixed;
        left: 0px;
        top: 50px;
        bottom: 0px;
        width: 200px;
    }
</style>
