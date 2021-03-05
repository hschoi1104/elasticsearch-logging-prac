<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="4">
				<v-card class="elevation-12">
					<v-toolbar flat color="#2F5FD2">
						<v-toolbar-title class="white--text">
							로그인
						</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-text-field
							label="Id"
							name="login"
							prepend-icon="fas fa-user"
							type="text"
							v-model="user.id"
							:error="!!errorMsg"
						/>

						<v-text-field
							id="password"
							label="Password"
							name="password"
							prepend-icon="fas fa-lock"
							type="password"
							v-model="user.password"
							:error="!!errorMsg"
							:error-messages="errorMsg"
						/>
					</v-card-text>
					<v-card-actions>
						<v-spacer />
						<v-btn
							@click="$router.push('/signup')"
							color="#2F5FD2"
							class="white--text"
						>
							회원가입
						</v-btn>
						<v-btn @click="onLogin" color="#2F5FD2" class="white--text">
							로그인
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	name: 'login',
	data: function() {
		return {
			user: {
				id: '',
				password: '',
			},
			errorMsg: '',
		};
	},
	methods: {
		async onLogin() {
			if (!this.user.id) {
				this.errorMsg = '아이디를 입력하세요.';
				return;
			}
			if (!this.user.password) {
				this.errorMsg = '비밀번호를 입력하세요.';
				return;
			}
			try {
				const { id, password } = this.user;
				await this.$store.dispatch('Login', { id, password });

				return this.$router.push('/');
			} catch (error) {
				this.errorMsg = '로그인 실패';
			}
		},
	},
};
</script>
