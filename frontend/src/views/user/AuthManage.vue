<template>
	<div class="ma-3 pa-3">
		<v-data-iterator :items="users" hide-default-footer>
			<template v-slot:default="props">
				<v-row>
					<v-col
						v-for="user in props.items"
						:key="user.id"
						cols="12"
						sm="6"
						md="4"
						lg="3"
					>
						<v-card>
							<v-card-title>
								<v-row align="center">
									<v-col class="font-weight-bold" cols="7">
										{{ user.id }}
									</v-col>
									<v-col cols="5" class="text-right" justify="end">
										{{ user.name }}</v-col
									>
								</v-row>
							</v-card-title>
							<v-divider></v-divider>

							<v-card-actions>
								<v-list-item class="grow">
									<v-list-item-content>
										<v-list-item-title>관리자 권한</v-list-item-title>
									</v-list-item-content>

									<v-row align="center" justify="end">
										<v-switch
											v-model="user.isManager"
											@click="updateAuth(user)"
										></v-switch>
									</v-row>
								</v-list-item>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</template>
		</v-data-iterator>
	</div>
</template>
<script>
import { UserService } from './../../service/user.service';
export default {
	name: 'AuthManage',
	data: function() {
		return {
			itemsPerPage: 4,
			users: [],
		};
	},
	async created() {
		await this.fetch();
	},
	methods: {
		async fetch() {
			this.users = await UserService.getUsers();
		},
		async updateAuth(user) {
			await this.$axiosAuth.patch(`/user/${user.id}`, {
				isManager: user.isManager,
			});
			await this.fetch();
		},
	},
};
</script>
