<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="4">
				<v-card tile minHeight="95%" class="elevation-12 ma-3 pa-3">
					<v-toolbar flat color="#2F5FD2">
						<v-toolbar-title class="white--text">
							회원가입
						</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<validation-observer ref="observer" v-slot="{ invalid }">
							<validation-provider
								v-slot="{ errors }"
								name="Name"
								:rules="{ required: true }"
							>
								<v-text-field
									v-model="name"
									:error-messages="errors"
									label="이름"
									required
								></v-text-field>
							</validation-provider>
							<validation-provider
								v-slot="{ errors }"
								name="Id"
								:rules="{
									required: true,
									max: 30,
									min: 5,
								}"
							>
								<v-text-field
									v-model="id"
									:counter="30"
									:error-messages="errors"
									label="아이디"
									required
								></v-text-field>
							</validation-provider>

							<validation-provider
								v-slot="{ errors }"
								name="password"
								ref="password"
								:rules="{
									required: true,
									min: 8,
									max: 30,
								}"
							>
								<v-text-field
									v-model="password"
									type="password"
									:counter="30"
									:error-messages="errors"
									label="비밀번호"
									required
								></v-text-field>
							</validation-provider>

							<validation-provider
								v-slot="{ errors }"
								name="password confirm"
								:rules="{
									required: true,
									min: 8,
									max: 30,
									confirmed: 'password',
								}"
							>
								<v-text-field
									v-model="confirmation"
									type="password"
									:counter="30"
									:error-messages="errors"
									label="비밀번호 확인"
									required
								></v-text-field>
							</validation-provider>
							<v-spacer></v-spacer>
							<div class="ma-3 mx-3" align="right">
								<v-btn @click="register" :disabled="invalid">
									회원가입
								</v-btn>
							</div>
						</validation-observer>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.color">
			{{ snackbar.text }}
			<v-btn text @click="snackbar.show = false">
				닫기
			</v-btn>
		</v-snackbar>
	</v-container>
</template>
<script>
import { required, max, min, confirmed } from 'vee-validate/dist/rules';
import {
	extend,
	ValidationObserver,
	ValidationProvider,
	setInteractionMode,
} from 'vee-validate';

setInteractionMode('eager');

extend('required', {
	...required,
	message: '내용을 입력해 주세요',
});

extend('max', {
	...max,
	message: '{length}자 보다 길수 없습니다.',
});
extend('min', {
	...min,
	message: '{length}자 보다 길어야 합니다.',
});
extend('confirmed', {
	...confirmed,
	message: '비밀번호가 일치하지 않습니다.',
});

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
	},
	data: () => ({
		name: '',
		id: '',
		password: '',
		confirmation: '',
		snackbar: {
			show: false,
			text: '',
			color: '',
		},
	}),

	methods: {
		submit() {
			this.$refs.observer.validate();
		},
		async register() {
			try {
				const result = await this.$axiosAuth.post('/user', {
					id: this.id,
					password: this.password,
					name: this.name,
				});
				if (result.status == 201) {
					this.snackbar.color = 'success';
					this.snackbar.text = '회원가입 성공';
					this.snackbar.show = true;
				}
				this.$router.push('/login');
			} catch (err) {
				this.snackbar.color = 'error';
				this.snackbar.text = '이미 사용중인 아이디 입니다.';
				this.snackbar.show = true;
			}
		},
	},
};
</script>
