<template>
    <div class="container">
        <doc v-if="currentlyEditing" :docID="currentDoc" />
        
        <div class="row" id="cards-row" v-else>
            <div class="col-md-3 cards-div">
                <div class="card" id="new-document">
                    <a @click="createNewDocument" href="#" id="new-document-link">
                        <div class="card-body" id="new-document-body">
                            <div id="icon-area">
                                <div id="icon-div">
                                    <i class="fa fa-plus"></i>
                                </div>
                                <div id="icon-text-div">
                                    <h5>New Document</h5>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import doc from './doc.vue'
    
    export default {
        name: 'dashboard',
        data() {
            return {
                currentlyEditing: false,
                currentDoc: ''
            };
        },
        components: {
            doc
        },
        props: {
            userID: String
        },
        mounted: function () {
            let docRef = window.location.pathname.split('/')[1];
            if (docRef.length == 20) {
                this.currentDoc = docRef.toString();
                this.currentlyEditing = true;
            }
            
            firestore.collection('pages').where('user', '==', this.userID)
            .get().then( docs => {
                docs.forEach( doc => {
                    let container = document.querySelector('#cards-row');
                    let col = document.createElement('div');
                    let card = document.createElement('div');
                    let a = document.createElement('a');
                    let cardBody = document.createElement('div');
                    let p = document.createElement('p');
                    let cardStyle = 'margin-bottom: 15px;';
                    let cardBodyStyle = 'height: 180px; text-align: center; margin: 15px 0; cursor: pointer;';
                    let pStyle = 'margin-top: 40px;';
                    
                    
                    p.setAttribute('style', pStyle);
                    p.innerHTML = 'Doc <br><span><b>' + doc.id + '</b></span>';
                    
                    col.setAttribute('class', 'col-md-3');
                    
                    card.setAttribute('class', 'card document');
                    card.setAttribute('style', cardStyle);
                    card.setAttribute('onmouseover', "this.classList.add('box-shadow')");
                    card.setAttribute('onmouseout', "this.classList.remove('box-shadow')");
                    
                    a.setAttribute('onclick', 'window.location.replace("/' + doc.id + '")');
                    
                    cardBody.setAttribute('class', 'card-body');
                    cardBody.setAttribute('style', cardBodyStyle);
                    
                    cardBody.appendChild(p);
                    a.appendChild(cardBody);
                    card.appendChild(a);
                    col.appendChild(card);
                    container.appendChild(col);
                });
            });
        },
        methods: {
            createNewDocument: function () {
                let vm = this;
                
                firestore.collection('pages').add({
                    user: this.userID,
                    content: ''
                }).then(function(docRef) {
                    vm.currentlyEditing = true;
                    vm.currentDoc = docRef.id;
                });
            }
        }
    }
</script>

<style scoped>
    #new-document-body {
        height: 180px;
        text-align: center;
        margin: 15px 0;
    }
    
    #new-document {
        margin-bottom: 15px;
    }
    
    #cards-row {
        padding-top: 20px;
    }
    
    #icon-area {
        height: 100%;
        margin: auto;
        padding-top: 40px;
    }
    
    .fa-plus {
        font-size: 30px;
        font-weight: bold;
        margin: auto;
    }
    
    #new-document-link:hover {
        text-decoration: none;
    }
</style>