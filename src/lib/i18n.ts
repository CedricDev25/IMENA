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
      "rwanda_franc": "FRw",
      "summary": "Financial Summary",
      "insight_positive": "Your business is showing healthy growth. Consider reinvesting your profits into high-margin products.",
      "insight_neutral": "Your margins are stable, but there's room to optimize operational costs in the coming weeks.",
      "insight_negative": "Expenses are tracking higher than usual. We recommend reviewing your inventory or supplier costs."
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
      "rwanda_franc": "FRw",
      "summary": "Résumé Financier",
      "insight_positive": "Votre entreprise affiche une croissance saine. Envisagez de réinvestir vos bénéfices dans des produits à marge élevée.",
      "insight_neutral": "Vos marges sont stables, mais il est possible d'optimiser les coûts opérationnels dans les semaines à venir.",
      "insight_negative": "Les dépenses sont plus élevées que d'habitude. Nous vous recommandons de revoir vos coûts d'inventaire ou de fournisseur."
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
      "rwanda_franc": "FRw",
      "summary": "Incamake y'Imari",
      "insight_positive": "Ubucuruzi bwanyu buragenda neza. Mutekereze gushora inyungu mu bintu bizana inyungu nyinshi.",
      "insight_neutral": "Inyungu ntabwo ihinduka cyane, ariko mushobora kugabanya amafaranga akoreshwa mu mirimo ya buri munsi mu byumweru biri imbere.",
      "insight_negative": "Ibisohoka biragaragara ko ari byinshi ugereranyije n'ibisanzwe. Turabagira inama yo gusuzuma amafaranga akoreshwa mu kugura ibicuruzwa cyangwa ababigurisha."
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
