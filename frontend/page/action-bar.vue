<template>
	<div id="action-bar">
		<h1 class="item site-name">
			Orc
		</h1>
		<span class="item right about">
			关于
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