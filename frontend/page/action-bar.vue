<template>
	<div id="action-bar">
		<h1 class="item site-name">
			Orc
		</h1>
		<span class="item right about">
			关于
		</span>
		<span class="item right view">
			视图
		</span>
		<span class="item right theme">
			主题
		</span>
		<span class="item right file">
			文件
		</span>
	</div>
</template>

<script>
	export default {
		name: 'action-bar',
	};
</script>

<style lang= "less">
	#action-bar {
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #dfdfdf;
		.item {
			display: inline-block;
			cursor: pointer;
			padding: 0 15px;
		}
		/* .item.site-name {
			font-size: 32px;
			width: 200px;
			text-align: center;
		} */
		.item.right {
			float: right;
		}
	}
</style>