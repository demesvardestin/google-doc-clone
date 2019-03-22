<template>
    <h3>Redirecting you to your document...</h3>
    <router-link id="router">redirect</router-link>
</template>

<script>
    export default {
        name: 'newPage',
        data() {
            return {};
        },
        props: {},
        mounted: function () {
            let token = Math.random().toString(36).substr(2);
            document.querySelector('#router')
            .setAttribute('to', token);
        },
    }
</script>