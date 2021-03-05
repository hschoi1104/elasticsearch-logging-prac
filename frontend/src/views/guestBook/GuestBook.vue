<template>
	<v-container fluid>
		<div class="ma-3 pa-3">
			<v-row justify="center">
				<v-col cols="8" sm="8" md="8" lg="8">
					<v-card class="ma-2 pa-2" align="center" flat>
						<v-row align="center" class="">
							<v-col cols="2">
								<v-text-field label="이름" v-model="post.name"></v-text-field>
							</v-col>
							<v-col cols="8">
								<v-text-field
									label="내용"
									v-model="post.content"
								></v-text-field>
							</v-col>
							<v-col cols="2" align="center" justify="end">
								<v-btn color="primary" @click="createPost(post)">작성</v-btn>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
			</v-row>

			<v-row justify="center">
				<v-col cols="8">
					<v-data-iterator :items="posts" hide-default-footer>
						<template v-slot:default="props">
							<v-row>
								<v-col
									v-for="post in props.items"
									:key="post._id"
									cols="12"
									sm="12"
									md="12"
									lg="12"
								>
									<v-card class="ma-2">
										<v-row align="center">
											<v-col class="text-center" cols="2">
												{{ post.name }}
											</v-col>
											<v-col cols="8" class="text-left">
												{{ post.content }}
											</v-col>
											<v-col cols="2" align="center" justify="end">
												<v-btn color="error" @click="deletePost(post)"
													>삭제</v-btn
												>
											</v-col>
										</v-row>
									</v-card>
								</v-col>
							</v-row>
						</template>
					</v-data-iterator>
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>
<script>
export default {
	name: 'guestbook',
	data: function() {
		return {
			itemsPerPage: 4,
			posts: [],
			post: {
				name: '',
				content: '',
			},
		};
	},
	async created() {
		await this.fetch();
	},
	methods: {
		async fetch() {
			try {
				const result = await this.$axiosResource.get('/guestbook');
				this.posts = result.data.result;
			} catch (err) {
				this.posts = [];
			}
		},
		async createPost() {
			try {
				await this.$axiosResource.post('/guestbook', {
					name: this.post.name,
					content: this.post.content,
				});
				this.post.name = '';
				this.post.content = '';
				await this.fetch();
				// eslint-disable-next-line no-empty
			} catch (err) {}
		},
		async deletePost(post) {
			try {
				await this.$axiosResource.delete(`/guestbook/${post._id}`);
				await this.fetch();
				// eslint-disable-next-line no-empty
			} catch (err) {}
		},
	},
};
</script>
