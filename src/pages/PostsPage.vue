<template>
	<div>
		<h1>Страница с постами</h1>
		<my-input v-focus v-model="searchQuery" style="width: 50%" placeholder="Поиск..." />
		<div class="app__btns">
			<my-button @click="showDialog">Создать пост</my-button>
			<my-select v-model="selectedSort" :options="sortOptions" />
		</div>
		<my-dialog v-model:show="dialogVisible">
			<post-form @create="createPost" />
		</my-dialog>
		<!-- <post-form @create="createPost" /> -->
		<post-list
			:posts="sortedAndSearchedposts"
			@remove="removePost"
			v-if="!isPostsLoading"
		/>
		<div v-else>Идёт загрузка...</div>
		<div v-intersection="loadMorePosts" ref="observer"></div>
		<!-- <div class="page__wrapper">
			<div
				v-for="pageNumber in totalPages"
				:key="pageNumber"
				class="page"
				:class="{
					'page-current': page === pageNumber,
				}"
				@click="changePage(pageNumber)"
			>
				{{ pageNumber }}
			</div>
		</div> -->
	</div>
</template>

<script>
	import PostForm from "@/components/PostForm";
	import PostList from "@/components/PostList";
	import MyButton from "@/components/UI/MyButton";
	import MySelect from "@/components/UI/MySelect";
	import MyInput from "@/components/UI/MyInput";
	import axios from "axios";
	
	export default {
		components: {
			PostForm,
			PostList,
			MyButton,
			MySelect,
			MyInput,
		},
		data() {
			return {
				posts: [
					/*{ id: 1, title: "Vue3 (a)", body: "Описание поста - 1" },
																			{ id: 2, title: "Vue3 (b)", body: "Описание поста - 2" },
																			{ id: 3, title: "Vue3 (c)", body: "Описание поста - 3" },*/
				],
				dialogVisible: false,
				isPostsLoading: false,
				selectedSort: "",
				searchQuery: "",
				page: 1,
				limit: 10,
				totalPages: 0,
				sortOptions: [
					{ value: "title", name: "По названию" },
					{ value: "body", name: "По содержимому" },
				],
			};
		},
		methods: {
			createPost(post) {
				this.posts.push(post);
				this.dialogVisible = false;
			},
			removePost(post) {
				this.posts = this.posts.filter((p) => p.id !== post.id);
			},
			showDialog() {
				this.dialogVisible = true;
			},
			/*changePage(pageNumber) {
					this.page = pageNumber;
					// this.fetchPosts(); The first option is to load the posts of the selected page.
				},*/
			async fetchPosts() {
				try {
					this.isPostsLoading = true;
					const response = await axios.get(
						"https://jsonplaceholder.typicode.com/posts",
						{
							params: {
								_page: this.page,
								_limit: this.limit,
							},
						}
					);
					this.totalPages = Math.ceil(
						response.headers["x-total-count"] / this.limit
					);
					this.posts = response.data;
					// console.log(response);
				} catch (e) {
					alert("Ошибка!");
				} finally {
					this.isPostsLoading = false;
				}
			},
			async loadMorePosts() {
				try {
					this.page += 1;
					// this.isPostsLoading = true;
					const response = await axios.get(
						"https://jsonplaceholder.typicode.com/posts",
						{
							params: {
								_page: this.page,
								_limit: this.limit,
							},
						}
					);
					this.totalPages = Math.ceil(
						response.headers["x-total-count"] / this.limit
					);
					this.posts = [...this.posts, ...response.data];
					//this.posts = response.data;
					// console.log(response);
				} catch (e) {
					alert("Ошибка!");
				} finally {
					// this.isPostsLoading = false;
				}
			},
		},
		mounted() {
			this.fetchPosts();
			console.log(this.$refs.observer);
			// const options = {
			// 	// root: document.querySelector("#scrollArea"),
			// 	rootMargin: "0px",
			// 	threshold: 1.0,
			// };
			// const callback = (entries, observer) => {
			// 	if (entries[0].isIntersecting && this.page < this.totalPages) {
			// 		// console.log();
			// 		this.loadMorePosts();
			// 	}
			// };
			// const observer = new IntersectionObserver(callback, options);
			// observer.observe(this.$refs.observer);
		},
		computed: {
			sortedPosts() {
				return [...this.posts].sort((post1, post2) =>
					post1[this.selectedSort]?.localeCompare(
						post2[this.selectedSort]
					)
				);
			},
			sortedAndSearchedposts() {
				return this.sortedPosts.filter((post) =>
					post.title
						.toLowerCase()
						.includes(this.searchQuery.toLowerCase())
				);
			},
		},
		watch: {
			/* dialogVisible(newValue) {
					console.log(newValue);
				},
				page() {
					this.fetchPosts(); // The second option is to load the posts of the selected page.
				}, */
		},
	};
</script>

<style scoped>
	.app__btns {
		display: flex;
		justify-content: space-between;
		margin: 15px 0;
	}

	.page {
		border: 1px solid black;
		cursor: pointer;
		padding: 10px;
	}

	.page-current {
		outline: 2px solid teal;
	}

	.page__wrapper {
		display: flex;
		margin-top: 15px;
	}

	/*.observer {
		height: 30px;
		background: green;
	}*/
</style>
