<template>
	<div>
		<v-container>
			<v-app-bar absolute color="#2F5FD2" class="white--text">
				<v-toolbar-title> <strong>OAuth 2.0</strong></v-toolbar-title>

				<v-spacer></v-spacer>

				<v-row class="justify-end">
					<v-card flat color="#2F5FD2" @click="$router.push('/')">
						<v-card-text class="white--text">홈</v-card-text>
					</v-card>
					<v-card
						v-if="loginCheck"
						flat
						color="#2F5FD2"
						@click="$router.push('/user/manage/auth')"
					>
						<v-card-text class="white--text">권한 관리</v-card-text>
					</v-card>
					<v-card
						v-if="loginCheck"
						flat
						color="#2F5FD2"
						@click="Push('/arobject')"
					>
						<v-card-text class="white--text">오브젝트 관리</v-card-text>
					</v-card>
					<!-- <v-card
						v-if="loginCheck"
						flat
						color="#2F5FD2"
						@click="Push('/board')"
					>
						<v-card-text class="white--text">게시판</v-card-text>
					</v-card>
					<v-card
						v-if="loginCheck"
						flat
						color="#2F5FD2"
						@click="Push('/guestBook')"
					>
						<v-card-text class="white--text">방명록</v-card-text>
					</v-card>-->
					<v-card
						v-if="!loginCheck"
						flat
						color="#2F5FD2"
						@click="Push('/signup')"
					>
						<v-card-text class="white--text">회원가입</v-card-text>
					</v-card>

					<v-card
						v-if="!loginCheck"
						flat
						color="#2F5FD2"
						@click="Push('/login')"
					>
						<v-card-text class="white--text">로그인</v-card-text>
					</v-card>
					<v-card v-if="loginCheck" flat color="#2F5FD2" @click="Logout">
						<v-card-text class="white--text">로그아웃</v-card-text>
					</v-card>
				</v-row>
			</v-app-bar>
		</v-container>
	</div>
</template>
<script>
export default {
	name: 'Home',
	methods: {
		Logout() {
			this.$store.dispatch('Logout');
		},
		Push(to) {
			this.$router.push(to).catch(() => {});
		},
	},
	computed: {
		loginCheck() {
			return this.$store.state.accessToken;
		},
	},
};
</script>
