import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "dashboard": "Dashboard",
      "transactions": "Transactions",
      "ai_coach": "AI Coach",
      "settings": "Settings",
      "revenue": "Total Revenue",
      "expenses": "Expenses",
      "profit": "Net Profit",
      "margin": "Profit Margin",
      "add_transaction": "Add Transaction",
      "amount": "Amount",
      "description": "Description",
      "category": "Category",
      "type": "Type",
      "income": "Income",
      "expense": "Expense",
      "save": "Save",
      "login": "Login",
      "signup": "Sign Up",
      "email": "Email",
      "password": "Password",
      "logout": "Logout",
      "welcome_back": "Welcome back",
      "create_account": "Create Account",
      "no_account": "Don't have an account?",
      "have_account": "Already have an account?",
      "invalid_email": "Please enter a valid email",
      "auth_error": "Authentication failed",
      "muraho": "Muraho!",
      "market_trends": "I've analyzed the recent Rwandan market trends. How can I help your business grow today?",
      "rwanda_franc": "FRw"
    }
  },
  fr: {
    translation: {
      "dashboard": "Tableau de Bord",
      "transactions": "Transactions",
      "ai_coach": "Coach IA",
      "settings": "Paramètres",
      "revenue": "Revenu Total",
      "expenses": "Dépenses",
      "profit": "Bénéfice Net",
      "margin": "Marge de Profit",
      "add_transaction": "Ajouter Transaction",
      "amount": "Montant",
      "description": "Description",
      "category": "Catégorie",
      "type": "Type",
      "income": "Revenu",
      "expense": "Dépense",
      "save": "Enregistrer",
      "login": "Connexion",
      "signup": "S'inscrire",
      "email": "E-mail",
      "password": "Mot de passe",
      "logout": "Déconnexion",
      "welcome_back": "Bon retour",
      "create_account": "Créer un compte",
      "no_account": "Pas encore de compte ?",
      "have_account": "Déjà un compte ?",
      "invalid_email": "Veuillez entrer un e-mail valide",
      "auth_error": "Échec de l'authentification",
      "muraho": "Bonjour !",
      "market_trends": "J'ai analysé les tendances du marché rwandais. Comment puis-je vous aider ?",
      "rwanda_franc": "FRw"
    }
  },
  rw: {
    translation: {
      "dashboard": "Idashibodi",
      "transactions": "Ibikorwa",
      "ai_coach": "Umujyanama",
      "settings": "Igenamiterere",
      "revenue": "Amafaranga Yinjiye yose",
      "expenses": "Amafaranga Yasohotse",
      "profit": "Inyungu",
      "margin": "Ijanisha ry'inyungu",
      "add_transaction": "Ongeraho igikorwa",
      "amount": "Umubare",
      "description": "Ibisobanuro",
      "category": "Icyiciro",
      "type": "Ubwoko",
      "income": "Inyungu",
      "expense": "Igishoro/Ibisohoka",
      "save": "Bika",
      "login": "Injira",
      "signup": "Iyandikishe",
      "email": "Imeri",
      "password": "Ijambo ranga",
      "logout": "Sohoka",
      "welcome_back": "Kaze neza",
      "create_account": "Fungura konti",
      "no_account": "Nta konti ufite?",
      "have_account": "Usanywe ufite konti?",
      "invalid_email": "Imeri ntabwo yemewe",
      "auth_error": "Habaye ikibazo mu kwinjira",
      "muraho": "Muraho!",
      "market_trends": "Nasuzumye uko isoko ryo mu Rwanda rifashe uyu munsi. Nabafasha iki?",
      "rwanda_franc": "FRw"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
