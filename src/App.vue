<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <!-- <my-button @click="fetchPosts">Получить посты</my-button> -->
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions" />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <!-- <post-form @create="createPost" /> -->
        <post-list :posts="posts" @remove="removePost" v-if="!isPostsLoading" />
        <div v-else>Идёт загрузка...</div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import axios from "axios";
export default {
    components: {
        PostForm,
        PostList,
        MyButton,
        MySelect,
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
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts?_limit=10"
                );
                this.posts = response.data;
                // console.log(response);
            } catch (e) {
                alert("Ошибка!");
            } finally {
                this.isPostsLoading = false;
            }
        },
    },
    mounted() {
        this.fetchPosts();
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}

.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
</style>
