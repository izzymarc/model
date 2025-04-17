import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en/translation.json';

// Create basic structure for French translations
// This avoids showing raw translation keys when switching to French
const frTranslation = {
  meta: {
    title: "Mirabel N. Udeagha | Modèle de Mode Internationale",
    description: "Portfolio professionnel de Mirabel N. Udeagha, Modèle de Mode et Éditorial International"
  },
  nav: {
    home: "Accueil",
    about: "À Propos",
    portfolio: "Portfolio",
    experience: "Expérience",
    press: "Presse",
    contact: "Contact"
  },
  hero: {
    name: "Mirabel N. Udeagha",
    tagline: "Modèle de Mode et Éditorial International",
    profession: "Mannequin",
    cta: "Voir Portfolio",
    contact: "Me Contacter"
  },
  instagram: {
    title: "Instagram",
    followMe: "Suivez-moi sur Instagram",
    viewPost: "Voir sur Instagram",
    post: "Post Instagram {{number}}"
  },
  about: { 
    title: "À Propos",
    subtitle: "À Propos de Moi",
    connect: "Connectez-vous",
    emailMe: "Envoyez-moi un email",
    quote: "Ma passion est de raconter des histoires à travers la mode et de donner vie aux visions des créateurs.",
    paragraph1: "Avec plus de 7 ans dans l'industrie de la mode, j'ai acquis une réputation de polyvalence et de professionnalisme. Mon parcours a commencé à Lagos, au Nigeria, avant de s'étendre aux marchés internationaux.",
    paragraph2: "Je me spécialise dans le mannequinat éditorial, de défilé et commercial, avec une force particulière dans la photographie avant-garde et haute couture.",
    paragraph3: "Je crois que le bon mannequinat consiste à collaborer et à donner vie aux visions créatives par l'expression authentique et la précision technique.",
    height: {
      label: "Taille",
      value: "5'11\" / 180cm"
    },
    hair: {
      label: "Cheveux",
      value: "Noirs"
    },
    eyes: {
      label: "Yeux",
      value: "Marrons"
    },
    bust: {
      label: "Buste",
      value: "32\" / 81cm"
    },
    waist: {
      label: "Taille",
      value: "24\" / 61cm"
    },
    hips: {
      label: "Hanches",
      value: "34\" / 86cm"
    }
  },
  portfolio: { 
    title: "Portfolio",
    subtitle: "Explorez mon travail professionnel à travers différents styles et campagnes",
    filters: {
      all: "Tous",
      editorial: "Éditorial",
      runway: "Défilé",
      commercial: "Commercial",
      beauty: "Beauté"
    },
    loadMore: "Charger Plus",
    items: {
      luxury: {
        title: "Campagne Beauté de Luxe",
        description: "Collection de Parfum 2025"
      },
      golden: {
        title: "Éditorial à l'Heure Dorée",
        description: "Fashion Week Spotlight"
      },
      contemporary: {
        title: "Style Contemporain",
        description: "Collection Blue Marble"
      },
      executive: {
        title: "Élégance Exécutive",
        description: "Collection Business Moderne"
      },
      geometric: {
        title: "Rêves Géométriques",
        description: "Série Couture Blanche"
      },
      scarlet: {
        title: "Déclaration Écarlate",
        description: "Vitrine Haute Couture"
      },
      fashion1: {
        title: "Défilé Moderne",
        description: "Semaine de la Mode de Paris 2024"
      },
      fashion2: {
        title: "Défilé Contemporain",
        description: "Semaine de la Mode de Milan 2024"
      },
      fashion3: {
        title: "Campagne Saisonnière",
        description: "Collection Été 2024"
      },
      fashion4: {
        title: "Couture de Luxe",
        description: "Éditorial de Mode Premium"
      },
      fashion5: {
        title: "Éditorial Vogue",
        description: "Campagne Haute Couture 2025"
      }
    }
  },
  experience: { 
    title: "Expérience",
    pfw: {
      title: "Semaine de la Mode de Paris",
      description: "Défilé pour Louis Vuitton et Chanel lors des défilés de la collection Printemps/Été."
    },
    dior: {
      title: "Campagne Dior",
      description: "Campagne internationale print et digitale pour la collection Automne/Hiver."
    },
    elle: {
      title: "Couverture du Magazine Elle",
      description: "En couverture du numéro de septembre, avec un reportage de 10 pages sur la mode et le développement durable."
    },
    nyfw: {
      title: "Semaine de la Mode de New York",
      description: "Ouverture pour Michael Kors et clôture pour Marc Jacobs pendant la NYFW."
    },
    img: {
      title: "Signée avec IMG Models",
      description: "A rejoint la prestigieuse agence IMG Models, représentant leurs divisions à New York, Paris et Milan."
    }
  },
  services: { 
    title: "Services", 
    inquire: "Renseignez-vous",
    fashion: {
      title: "Mode & Éditorial",
      description: "Modèle professionnel pour les éditoriaux de haute couture."
    },
    runway: {
      title: "Défilé",
      description: "Modèle de défilé expérimentée pour les défilés de mode."
    },
    commercial: {
      title: "Commercial",
      description: "Modèle commercial pour les marques et produits."
    },
    beauty: {
      title: "Beauté",
      description: "Modèle spécialisée pour les marques de cosmétiques."
    },
    video: {
      title: "Vidéo & Motion",
      description: "Modèle professionnel pour les films de mode."
    },
    events: {
      title: "Événements & Apparitions",
      description: "Apparitions professionnelles lors d'événements de mode."
    }
  },
  testimonials: { 
    title: "Témoignages",
    gucci: {
      quote: "Mirabel apporte une présence extraordinaire sur le podium. Sa capacité à incarner l'essence d'une collection est inégalée."
    },
    vogue: {
      quote: "Travailler avec Mirabel est toujours un plaisir. Elle comprend la lumière et la composition intuitivement."
    },
    loreal: {
      quote: "Le professionnalisme et la polyvalence de Mirabel en font un talent exceptionnel."
    }
  },
  press: { 
    title: "Presse", 
    readArticle: "Lire l'article",
    vogue: {
      title: "Magazine Vogue",
      description: "Reportage de couverture et interview exclusive sur la mode durable."
    },
    harpers: {
      title: "Harper's Bazaar",
      description: "En vedette dans l'éditorial 'L'Avenir de la Mode'."
    },
    elle: {
      title: "Magazine Elle",
      description: "Interview sur l'équilibre entre carrière internationale et défense de la diversité."
    }
  },
  contact: { 
    title: "Contact",
    getInTouch: "Contactez-moi",
    intro: "Pour les réservations, collaborations ou demandes, veuillez remplir le formulaire ou contacter directement mon agence.",
    followMe: "Suivez-moi",
    email: {
      title: "Email"
    },
    phone: {
      title: "Téléphone"
    },
    agency: {
      title: "Agence"
    },
    form: {
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      projectType: "Type de Projet",
      selectProjectType: "Sélectionnez un type de projet",
      projectTypes: {
        editorial: "Éditorial",
        commercial: "Commercial",
        runway: "Défilé",
        event: "Apparition d'Événement",
        other: "Autre"
      },
      projectDate: "Date du Projet",
      budgetRange: "Gamme de Budget",
      selectBudget: "Sélectionnez une gamme de budget",
      budgetRanges: {
        below5k: "Moins de 5 000 €",
        "5kTo10k": "5 000 € - 10 000 €",
        "10kTo25k": "10 000 € - 25 000 €",
        above25k: "Plus de 25 000 €"
      },
      message: "Message",
      consent: "Je consens à ce que ce site stocke mes informations soumises afin qu'ils puissent répondre à ma demande.",
      sendMessage: "Envoyer le Message",
      sending: "Envoi en cours..."
    },
    success: {
      title: "Message Envoyé",
      message: "Merci pour votre message. Nous vous répondrons dès que possible."
    },
    error: {
      title: "Erreur",
      message: "Il y a eu un problème lors de l'envoi de votre message. Veuillez réessayer plus tard."
    }
  },
  newsletter: { 
    title: "Newsletter",
    description: "Abonnez-vous à ma newsletter pour des mises à jour sur mes derniers projets, événements à venir et contenu exclusif.",
    emailPlaceholder: "Votre adresse email",
    subscribe: "S'abonner",
    subscribing: "Abonnement...",
    success: {
      title: "Abonnement Réussi",
      message: "Merci de vous être abonné à ma newsletter!"
    },
    error: {
      title: "Erreur d'Abonnement",
      message: "Il y a eu un problème avec votre abonnement. Veuillez réessayer plus tard."
    }
  },
  footer: { 
    tagline: "Modèle de Mode et Éditorial International",
    navigation: "Navigation",
    contact: "Contact",
    rights: "Tous droits réservés.",
    privacy: "Politique de Confidentialité",
    terms: "Conditions d'Utilisation"
  }
};

// Resources for translations
const resources = {
  en: {
    translation: enTranslation
  },
  fr: {
    translation: frTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Function to dynamically load translations for a language
export const loadLanguageAsync = async (language: string) => {
  if (i18n.hasResourceBundle(language, 'translation')) {
    return;
  }

  try {
    // In a real app, you would fetch this from a server or import dynamically
    // For now, we've included basic French translations directly
    if (language === 'fr') {
      i18n.addResourceBundle(language, 'translation', frTranslation);
    }
  } catch (error) {
    console.error(`Failed to load ${language} translations:`, error);
  }
};

export default i18n;
