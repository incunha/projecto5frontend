import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "username": "Username",
          "password": "Password",
          "login": "Login",
          "Failed to login": "Failed to login",
          "Home": "Home",
          "New Task": "New Task",
          "Deleted Tasks": "Deleted Tasks",
          "Users": "Users",
          "New User": "New User",
          "Deleted Users": "Deleted Users",
          "Profile": "Profile"
        }
      },
      pt: {
        translation: {
          "username": "Nome do user",
          "password": "Senha",
          "login": "Entrar",
          "Failed to login": "Falha ao entrar",
          "Home": "Início",
          "New Task": "Nova Tarefa",
          "Deleted Tasks": "Tarefas Excluídas",
          "Users": "Utilizadores",
          "New User": "Novo Utilizador",
          "Deleted Users": "Utilizadores Excluídos",
          "Profile": "Perfil"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;