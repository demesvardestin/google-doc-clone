<template>
    <main class="document container">
        <section class="row document-page">
            <div class="col-md-8 offset-md-2" style="padding: 20px 0;">
                <textarea id="input-area" v-on:focus="documentFocused"
                    v-on:blur="documentBlurred" v-on:keyup="processContent" class="card"
                    placeholder="Start typing here..." v-bind:height="inputHeight"
                    ></textarea>
            </div>
            <div class="col-md-2">
                <span class="badge badge-light hide" id="saving-indicator">
                    Saving...
                </span>
            </div>
        </section>
    </main>
</template>

<script>
    export default {
        name: 'doc',
        data() {
            return {};
        },
        props: {},
        mounted: function () {
            firestore.collection("pages").doc("test")
            .onSnapshot(function(doc) {
                document.querySelector('#input-area')
                .value = doc.data().content;
            });
        },
        methods: {
            doc: function () {
                return document.querySelector('#input-area');
            },
            
            savingIndicator: function () {
                return document.querySelector('#saving-indicator');
            },
            
            // Focus document
            documentFocused: function () {
                this.doc().classList.toggle('document-focused');
            },
            
            // Blur document
            documentBlurred: function () {
                this.doc().classList.toggle('document-focused');
            },
            
            // Retrieve height of textarea
            inputHeight: function (height=null) {
                return height || this.doc().offsetHeight;
            },
            
            // Auto expand/contract textarea based on document content
            expandInput: function () {
                let height = this.inputHeight();
                let charCount = this.doc().value.length;
                
                //  Arbitrary number (2350) for now
                if (charCount > 2350) {
                    this.doc().style.height = (height + (height * 0.05)).toString() + 'px';
                } else {
                    this.doc().style.height = 'initial';
                }
            },
            
            // Save to Firebase
            addToFirebase: function () {
                firestore.collection('pages').doc('test').set({
                    content: this.doc().value
                }).then(function(docRef) {
                    if (docRef) {
                        // will do something here
                    }
                    
                    let ind = document.querySelector('#saving-indicator');
                    ind.innerHTML = 'saved!';
                    
                    setTimeout( function () {
                        ind.classList.add('hide');
                        ind.innerHTML = 'saving...';
                    }, 3000 );
                })
            },
            
            processContent: function () {
                this.savingIndicator().innerHTML = 'saving...';
                this.savingIndicator().classList.remove('hide');
                this.addToFirebase();
            }
        }
    }
</script>

<style scoped>
    #input-area:focused {
        border-color: initial !important;
    }
    
    #input-area {
        outline: none;
        padding: 20px;
        width: 100%;
        font-size: 15px;
        min-height: calc(100vh - 80px);
        resize: none;
        overflow: hidden;
    }
</style>