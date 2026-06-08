# Scola - School Management System

Un système complet de gestion scolaire avec authentification par rôles, gestion des élèves, notes, communication et paiements.

## Fonctionnalités

### Authentification
- 🔐 Admin/Contrôleur (mot de passe: 214977)
- 👨‍🏫 Enseignants (connexion par nom)
- 👨‍👩‍👧 Parents (connexion par nom)
- 👨‍🎓 Élèves (connexion par nom)

### Fonctionnalités par rôle
- **Admin** : Gestion complète de l'école, des élèves, des enseignants
- **Enseignants** : Gestion des notes, communication, voir les données des élèves
- **Parents** : Voir les notes de leurs enfants, communiquer
- **Élèves** : Voir leurs notes, données personnelles, communiquer
- **Tous** : Paiement des frais de scolarité, messagerie

## Installation

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Configuration

Modifiez `.env` pour configurer votre base de données MongoDB.
