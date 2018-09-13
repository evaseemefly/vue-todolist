<template>
    <!-- <ul v-if="groups.lenght>0" id="ul_nav" class="nav nav-pills nav-stacked"> -->
    <ul v-if="isShow()" id="ul_nav" class="nav nav-pills nav-stacked">    
        <!-- <li v-for="(group,index) in groups"> -->
        <li>
            <!--data-toggle，用于告诉 js需要对按钮做什么-->
            <!--collapse即是折叠-->
            <!--<a href="#sub1" data-toggle="collapse">系统功能</a>-->
            <!--data-target指示要切换到哪一个元素-->
            <a href="#" data-toggle="collapse" data-target="#sub1">
                <!-- {{group.department.derpartmentname}}&nbsp; -->
                {{groups.department.derpartmentname}}
                <span class="glyphicon glyphicon-list-alt"></span>
            </a>
            <!-- <ul id="sub1" class="nav " :class="index==group_index?'collapse':''"> -->
            <ul id="sub1" class="nav collapse">
                <li v-for="temp in groups.duty_list">
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
        data() {
            return {
                group_index: 0,
                // isShow:false
            }
        },
        props: {
            groups: {
                // type: Object,
                required: true
            }
        },
        methods: {
            //子组件将当前选中的值传递给父组件
            changeIndex: function (index) {
                // alert(index);
                //将当前index值传递给父组件
                this.group_index = index;
                this.groups=this.groups[index];
                console.log(this.groups);
            },
            isShow:function(item){
                if(this.groups.hasOwnProperty('department')){
                    return true;
                }
                else{
                    return false;
                }
            },
            // isShow(item){
            //     if(this.groups.length>0){
            //         return true;
            //     }
            //     else{
            //         return false;
            //     }
            // }
        },
        mounted: function () {
            console.log(this.groups);
        }
    }
</script>

<style scoped>
    #ul_nav {
        position: fixed;
        left: 0px;
        top: 50px;
        bottom: 0px;
        width: 200px;
    }
</style>
