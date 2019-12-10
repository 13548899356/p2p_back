<template>
	<!-- <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
	 text-color="#fff" active-text-color="#ffd04b">
		<el-menu-item index="1">处理中心</el-menu-item>
		<el-submenu index="2">
			<template slot="title">我的工作台</template>
			<el-menu-item index="2-1">选项1</el-menu-item>
			<el-menu-item index="2-2">选项2</el-menu-item>
			<el-menu-item index="2-3">选项3</el-menu-item>
			<el-submenu index="2-4">
				<template slot="title">选项4</template>
				<el-menu-item index="2-4-1">选项1</el-menu-item>
				<el-menu-item index="2-4-2">选项2</el-menu-item>
				<el-menu-item index="2-4-3">选项3</el-menu-item>
			</el-submenu>
		</el-submenu>

		<el-menu-item index="3" disabled>消息中心</el-menu-item>
		<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
	</el-menu> -->
	<el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff" active-text-color="#fff">
		<el-button class="buttonimg">
			<img class="showimg" :src="collapsed?imgshow:imgsq" @click="doToggle()">
		</el-button>
		<el-submenu index="2" class="submenu">
			<template slot="title">当前用户:</template>
			<el-menu-item index="2-1">设置</el-menu-item>
			<el-menu-item index="2-2">个人中心</el-menu-item>
			<el-menu-item @click="exit()" index="2-3">退出</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	export default {
		name:'TopNav',
		data:function(){
			return{
				collapsed:false,
				imgshow:require('../assets/img/show.png'),
				imgsq:require('../assets/img/sq.png'),
			};

		},
		methods:{
			doToggle:function(){
				this.collapsed=!this.collapsed;
				this.$emit('topnav-collapsed',this.collapsed);
			},
			exit:function(){
				 this.$confirm('确定要退出吗？', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          this.$message({
				            type: 'success',
				            message: '注销成功!',
				          });
							this.$store.commit("clear",{});
						  this.$router.push('/');
				        }).catch(() => {});

			}

		},
		/*computed:{
			getUser:function(){
				console.log(this.$store.getters.getUser);
				let userName=this.$store.getters.getUser[0].role.roleName;
				return userName;
			},
			position:function(){
				let position=null;
				if(this.$store.getters.getUser[0].position==1){
					position="客户经理";
				}
				else if(this.$store.getters.getUser[0].position==2){
					position="销售主管";
				}
				else if(this.$store.getters.getUser[0].position==3){
					position="系统管理员";
				}
				else if(this.$store.getters.getUser[0].position==4){
					position="高管";
				}

				return position;
			}
			*/


	}
</script>

<style scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		border: none;
	}

	.submenu {
		float: right;
	}

	.buttonimg {
		height: 60px;
		background-color: transparent;
		border: none;
	}

	.showimg {
		width: 26px;
		height: 26px;
		position: absolute;
		top: 17px;
		left: 17px;
	}

	.showimg:active {
		border: none;
	}
</style>
