// Initialisation de l'application Vue
const app = new Vue({
  el: '#app',
  data: {
    articles: [],
    nouveauCommentaire: {
      nom: '',
      message: ''
    }
  },
  mounted() {
    // Récupération des articles à partir de l'API RESTful
    fetch('http://localhost:3000/articles')
      .then(response => response.json())
      .then(data => {
        this.articles = data;
      })
  },
  methods: {
    ajouterCommentaire(articleId) {
      // Envoi du nouveau commentaire à l'API RESTful
      fetch(`http://localhost:3000/articles/${articleId}/commentaires`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.nouveauCommentaire)
      })
        .then(response => response.json())
        .then(data => {
          // Ajout du nouveau commentaire à l'article correspondant
          const article = this.articles.find(a => a.id === articleId);
          article.commentaires.push(data);
          
          // Réinitialisation du formulaire de nouveau commentaire
          this.nouveauCommentaire = {
            nom: '',
            message: ''
          };
        })
    }
  }
});
