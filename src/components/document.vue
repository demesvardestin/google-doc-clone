<template>
    <main class="document">
        <div class="row">
            <div class="col-md-8 offset-md-2" style="height: 100vh; padding: 20px 0;">
                <section id="editable-area" class="card">
                    <textarea id="input-area" v-on:focus="documentFocused"
                        placeholder="Start typing here..."></textarea>
                </section>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'document',
        props: {},
        methods: {
            documentFocused: function (event) {
                let doc = document.querySelector('#editable-area');
                doc.classList.toggle('document-focused');
                
                if (event) {
                    // do something here
                }
            }
        }
    }
</script>

<style scoped>
    #editable-area {
        min-height: 100%;
        padding: 20px 40px;
    }
    
    #input-area {
        box-shadow: none;
        border: none;
        outline: none;
        padding: 0;
        font-size: 15px;
        min-height: 100%;
    }
</style>