#  Trouver Mon Artisan — Plateforme régionale des artisans d’Auvergne Rhône-Alpes

> Projet étudiant — Développement d’une plateforme web permettant aux particuliers de trouver et contacter facilement un artisan de la région Auvergne Rhône-Alpes.


## Contexte du projet

La région **Auvergne Rhône-Alpes** souhaite créer une plateforme dédiée aux artisans régionaux.  
L’objectif est de permettre aux **particuliers** de rechercher un artisan par catégorie et spécialité, puis de **le contacter via un formulaire**.

##  Structure du projet

 trouver-mon-artisan
├──  backend/ → API Node.js + MySQL
│ ├── index.js
│ ├── db.js
│ ├── routes/
│ ├── controllers/
│ └── .env
│
├──  frontend/ → Application React
│ ├── src/
│ ├── public/
│ └── package.json
│
└── README.md


##  Technologies utilisées

###  Frontend
- [ReactJS](https://react.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [React Router](https://reactrouter.com/)
- [React-Snap](https://github.com/stereobooster/react-snap) (pour le pré-rendu)

### 🔹Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)
- [Nodemailer](https://nodemailer.com/) (envoi d’e-mails)
- [Nodemon](https://www.npmjs.com/package/nodemon) (pour le développement)

---

## 🧩 Fonctionnalités principales

### Backend
- Connexion sécurisée à une base de données MySQL via `mysql2`
- Routes RESTful pour la gestion des artisans, catégories et spécialités
- Envoi de formulaires de contact via Nodemailer
- Gestion des erreurs et des connexions simultanées via `createPool`
- Utilisation d’un fichier `.env` pour les variables sensibles

### Frontend
- Interface responsive **mobile-first**
- Affichage dynamique des données depuis l’API
- Formulaire de contact pour joindre un artisan
- Footer avec liens (mentions légales, accessibilité, etc.)
- Page “Site en construction” pour les sections en cours de développement

---

##  Sécurité & Accessibilité

- Respect des bonnes pratiques de sécurité 
- Accessibilité conforme à la norme **WCAG 2.1**
- Conception **mobile first**


##  Installation et lancement du projet

###  Cloner le dépôt
```bash
git clone https://github.com/MarieFanti/Devoir-Trouve-ton-artisan
cd trouver-mon-artisan

- Configuration du backend
cd backend
npm install


Créer un fichier .env :

DB_HOST=localhost
DB_USER=root
DB_PASS=motdepasse
DB_NAME=artisans
PORT=5000


-> Lancer le serveur :
npm run dev

-> Lancer le frontend
cd frontend
npm install
npm start


L’application s’ouvrira sur :
👉 http://localhost:3000

🔗 Communication entre les deux parties

Le frontend communique avec le backend via :

http://localhost:5000


Lors du déploiement (Render, Vercel, Netlify), il faudra remplacer cette URL par celle du backend hébergé.

🚀 Déploiement (à venir)

Backend : prévu sur Render

👩‍💻 Auteur

Projet réalisé dans le cadre d’un projet étudiant.
Développé par Marie Fanti
📅 Année 2025