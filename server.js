const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuration de la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'blog'
});

connection.connect();

// Récupération de tous les articles
app.get('/articles', (req, res) => {
  const sql = 'SELECT * FROM articles';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Récupération d'un article par ID
app.get('/articles/:id', (req, res) => {
  const sql = `SELECT * FROM articles WHERE id = ${req.params.id}`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    const article = results[0];
    
    // Récupération des commentaires de l'article correspondant
    const sql2 = `SELECT * FROM commentaires WHERE article_id = ${article.id}`;
    connection.query(sql2, (error2, results2
