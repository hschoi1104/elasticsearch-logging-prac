<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-card>
				<v-card-title class="display-3 text-center">Home Page</v-card-title>
				<v-card-text
					class="success text-center display-1"
					v-if="this.accessToken"
				>
					accessToken 저장되어있음
				</v-card-text>
				<v-card-text
					class="error text-center display-1"
					v-if="!this.accessToken"
				>
					accessToken 없음
				</v-card-text>
			</v-card>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Home',
	computed: {
		accessToken() {
			return this.$store.state.accessToken;
		},
	},
};
</script>
