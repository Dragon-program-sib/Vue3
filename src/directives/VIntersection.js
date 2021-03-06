export default {
    mounted(el, binding) {
        // console.log(el, binding);
        const options = {
            // root: document.querySelector("#scrollArea"),
            rootMargin: "0px",
            threshold: 1.0,
        };
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting) {
                // console.log();
                //this.loadMorePosts();
                binding.value();
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },
    name: 'intersection',
}
