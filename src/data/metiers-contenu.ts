// Corps rédactionnel et FAQ des 12 pages /metiers/{slug} (registre de mots-clés du 15/10/2026).
// Cible : 450–600 mots par page (avec corps-metier.ts), 3 questions-réponses balisées FAQPage.
// Mot-clé principal dans l'introduction (corps-metier.ts) ; secondaires dans les sous-titres ci-dessous.
// Règles : aucun prix, délai, label, garantie ni chiffre non fourni par le client (décisions 3 et 6).
// Clé = `slug` d'une entrée de corps-metier.ts.

import type { FaqItem } from './home';

export interface MetierSection {
  /** H2 : porte une expression secondaire du registre. */
  titre: string;
  paragraphes: string[];
}

export interface MetierContenu {
  sections: MetierSection[];
  /** 3 questions-réponses par page métier. */
  faq: FaqItem[];
}

export const metiersContenu: Record<string, MetierContenu> = {
  'toiture-couverture': {
    sections: [
      {
        titre: 'Réfection de toiture : partir de l’état réel de la couverture',
        paragraphes: [
          'Dans l’agglomération toulousaine, les toitures sont le plus souvent couvertes de tuiles canal, posées sur des charpentes de tous âges. Avant de parler de réfection de toiture, nous examinons l’état des tuiles, des supports, des rives et de la zinguerie.',
          'Ce diagnostic distingue une reprise ponctuelle d’un remplacement complet. Il évite aussi bien les travaux superflus que les mauvaises surprises en cours de chantier.',
        ],
      },
      {
        titre: 'Couvreur, charpente, isolation : un chantier à coordonner',
        paragraphes: [
          'Une couverture ne se refait pas isolément. Selon les cas, la charpente doit être reprise, l’isolation renforcée, les gouttières remplacées.',
          'Nous planifions ces interventions dans le bon ordre, de la dépose à la remise en place des tuiles, afin que la maison reste protégée des intempéries pendant toute la durée des travaux.',
        ],
      },
      {
        titre: 'Étanchéité de toiture : toitures-terrasses et points sensibles',
        paragraphes: [
          'Les toitures-terrasses, les relevés autour des cheminées et des fenêtres de toit, les noues et les solins concentrent la plupart des infiltrations. Leur traitement demande des supports sains et une exécution précise.',
          'Le devis précise la nature de chaque reprise, pour que vous sachiez exactement ce qui est traité et ce qui ne l’est pas.',
        ],
      },
    ],
    faq: [
      {
        question: 'Comment savoir si ma toiture doit être refaite ou seulement réparée ?',
        reponse:
          'Seul un examen sur place permet de trancher : état des tuiles et de la charpente, traces d’humidité sous la couverture, ancienneté de l’ouvrage. Le devis détaille ensuite ce qui relève de la réparation et ce qui justifie un remplacement.',
      },
      {
        question: 'Peut-on rester dans la maison pendant une réfection de toiture ?',
        reponse:
          'Souvent oui : le chantier est organisé pour que la maison reste protégée des intempéries. Pour une toiture très dégradée ou une intervention sur la charpente, nous l’évaluons avec vous lors de la visite.',
      },
      {
        question: 'Faut-il une autorisation pour refaire une toiture ?',
        reponse:
          'Cela dépend de la commune et du projet. Une réfection à l’identique est plus simple qu’une modification d’aspect, de pente ou l’ajout de fenêtres de toit, et certains secteurs protégés imposent des règles. Nous identifions les démarches avec vous ; l’instruction relève du service d’urbanisme.',
      },
    ],
  },

  charpente: {
    sections: [
      {
        titre: 'Charpente traditionnelle ou fermettes : deux logiques de structure',
        paragraphes: [
          'La charpente traditionnelle, faite de pièces de bois de forte section assemblées entre elles, se retrouve dans le bâti ancien et laisse souvent des combles aménageables. Les fermettes, des triangles industrialisés posés à intervalles réguliers, répondent à des constructions plus récentes.',
          'Le choix dépend du bâtiment, de l’usage des combles et de la couverture prévue. Nous en discutons avec vous lors de la visite.',
        ],
      },
      {
        titre: 'Réparation de charpente : diagnostiquer avant de renforcer',
        paragraphes: [
          'Humidité, insectes xylophages, pièces fatiguées par un ancien percement : une charpente vieillissante signale rarement ses faiblesses avant qu’elles ne se voient en toiture.',
          'Nous examinons les assemblages, les appuis sur les murs et l’état du bois, puis nous proposons selon le cas un traitement, le remplacement de pièces ou un renforcement. Le devis distingue chaque intervention.',
        ],
      },
      {
        titre: 'Charpentier et corps d’état associés : un planning commun',
        paragraphes: [
          'Une charpente se prépare avec la maçonnerie qui la reçoit et la couverture qui la recouvre. En coordonnant ces métiers, nous évitons les attentes entre deux interventions et les reprises liées à des cotes mal communiquées.',
          'Pour une extension, une surélévation ou un aménagement de combles, la structure est conçue dès l’origine avec l’ensemble du projet.',
        ],
      },
    ],
    faq: [
      {
        question: 'Quelle différence entre charpente traditionnelle et fermettes ?',
        reponse:
          'La charpente traditionnelle est conçue sur mesure, avec des pièces de bois de forte section, et laisse souvent les combles libres. Les fermettes sont des éléments industrialisés, rapides à poser mais qui occupent le volume des combles. Le bon choix dépend de votre bâtiment.',
      },
      {
        question: 'Comment savoir si ma charpente est saine ?',
        reponse:
          'Des traces d’humidité, des déformations de la toiture ou de la sciure au sol sont des signaux d’alerte. Une visite permet d’examiner les bois et leurs assemblages, et de dire si un traitement, une réparation ou un renforcement est nécessaire.',
      },
      {
        question: 'Peut-on renforcer une charpente existante pour aménager les combles ?',
        reponse:
          'Souvent, mais cela dépend de la structure en place et des charges à reprendre. L’étude de faisabilité précise ce qui est possible, ce qu’il faut renforcer et les démarches d’urbanisme à prévoir.',
      },
    ],
  },

  'isolation-thermique': {
    sections: [
      {
        titre: 'Isolation des combles : le premier poste à examiner',
        paragraphes: [
          'Dans une maison, une part importante des déperditions de chaleur passe par la toiture. L’isolation des combles est donc souvent le premier poste étudié, qu’ils soient perdus, simplement accessibles ou destinés à être aménagés.',
          'Nous déterminons sur place le mode d’isolation adapté à la configuration des combles, à la charpente et à la couverture en place.',
        ],
      },
      {
        titre: 'Isolation des murs : bâti en brique, en pierre ou en parpaing',
        paragraphes: [
          'Les murs d’une maison toulousaine en brique ou en pierre ne s’isolent pas comme ceux d’une construction récente. Ils gèrent l’humidité à leur manière, et un isolant inadapté peut la piéger.',
          'Nous choisissons les matériaux et le mode de pose, par l’intérieur ou par l’extérieur, en tenant compte de la nature du support et de la ventilation du logement.',
        ],
      },
      {
        titre: 'Rénovation énergétique : traiter la maison comme un ensemble',
        paragraphes: [
          'Isoler sans regarder les fenêtres, la ventilation ou le chauffage donne des résultats décevants. Nous abordons la rénovation énergétique comme un ensemble cohérent.',
          'Les travaux sont hiérarchisés selon votre budget et vos priorités, puis planifiés pour qu’ils ne se gênent pas les uns les autres.',
        ],
      },
    ],
    faq: [
      {
        question: 'Par où commencer pour isoler une maison ?',
        reponse:
          'Par un état des lieux : toiture et combles, murs, planchers, menuiseries, ventilation. La visite permet de hiérarchiser les travaux selon leur effet attendu et votre budget, puis de les planifier dans le bon ordre.',
      },
      {
        question: 'Isolation par l’intérieur ou par l’extérieur ?',
        reponse:
          'L’isolation par l’intérieur est plus simple à mettre en œuvre mais réduit légèrement la surface habitable. Celle par l’extérieur s’associe naturellement à un ravalement et limite les ponts thermiques, mais elle modifie l’aspect de la façade et suppose parfois une autorisation d’urbanisme.',
      },
      {
        question: 'Peut-on isoler une maison ancienne en brique ou en pierre ?',
        reponse:
          'Oui, à condition de choisir des matériaux compatibles avec la façon dont ces murs gèrent l’humidité. Nous examinons le support avant de recommander une solution.',
      },
    ],
  },

  'facade-ravalement': {
    sections: [
      {
        titre: 'Façade en brique : nettoyer et réparer sans abîmer',
        paragraphes: [
          'La brique rose fait l’identité de nombreux quartiers de Toulouse. Elle se nettoie, se rejointoie et se protège avec des techniques précises : un décapage trop agressif, ou un enduit étanche posé sur un support qui doit respirer, peut l’endommager durablement.',
          'Nous évaluons l’état des briques et des joints avant de proposer une intervention proportionnée.',
        ],
      },
      {
        titre: 'Enduit de façade : préparer le support avant de finir',
        paragraphes: [
          'Un enduit de façade tient autant par la préparation du support que par la qualité du produit. Fissures, remontées d’humidité, parties décollées et soubassements dégradés sont traités avant toute finition.',
          'Le devis précise les étapes de préparation, la nature de l’enduit et la teinte envisagée.',
        ],
      },
      {
        titre: 'Isolation par l’extérieur : profiter du ravalement',
        paragraphes: [
          'Lorsque l’échafaudage est en place, il peut être pertinent d’associer le ravalement à une isolation par l’extérieur. Cette option modifie l’épaisseur des murs, les appuis de fenêtres et parfois l’aspect de la façade.',
          'Elle est étudiée avec vous et vérifiée au regard des règles d’urbanisme de votre commune.',
        ],
      },
    ],
    faq: [
      {
        question: 'Le ravalement de façade est-il obligatoire ?',
        reponse:
          'Cela dépend de votre commune et du secteur où se trouve le bâtiment. Renseignez-vous auprès de votre mairie ; nous pouvons ensuite vous aider à préparer et à organiser les travaux.',
      },
      {
        question: 'Peut-on ravaler une façade en brique ?',
        reponse:
          'Oui. La brique se nettoie et se rejointoie, mais elle demande des produits compatibles avec un support qui respire. Nous évaluons son état avant de proposer l’intervention la plus adaptée.',
      },
      {
        question: 'Faut-il une autorisation pour ravaler ou isoler une façade ?',
        reponse:
          'Un ravalement qui modifie l’aspect extérieur (teinte, enduit, isolation par l’extérieur) est en général soumis à déclaration préalable, et les secteurs protégés ajoutent des contraintes. Nous identifions les démarches avec vous.',
      },
    ],
  },

  'maconnerie-gros-oeuvre': {
    sections: [
      {
        titre: 'Ouverture de mur porteur : une intervention de structure',
        paragraphes: [
          'Ouvrir un mur porteur pour agrandir un séjour est l’un des travaux les plus demandés en rénovation. Il suppose de comprendre le cheminement des charges, de dimensionner une poutre ou un portique, d’étayer le plancher pendant l’intervention, puis de reprendre les appuis.',
          'Les calculs nécessaires sont établis avant le démarrage et le chantier est séquencé pour assurer la stabilité à chaque étape.',
        ],
      },
      {
        titre: 'Maçon en rénovation : les particularités du bâti toulousain',
        paragraphes: [
          'Brique foraine, galets de Garonne, murs en pierre, planchers sur solives en bois : chaque type de mur impose ses techniques de reprise, ses mortiers et ses précautions.',
          'Nous identifions sur place la nature du bâti avant de définir les interventions, pour que les reprises soient compatibles avec l’existant.',
        ],
      },
      {
        titre: 'Fondations et dalles : stabiliser avant de construire',
        paragraphes: [
          'Dans la région toulousaine, les sols argileux peuvent être sensibles aux variations d’humidité. Des fissures récentes ou une extension projetée justifient d’examiner les fondations.',
          'Nous intervenons en reprise de fondations, en création de dalles et de chapes, et nous coordonnons ces travaux avec le terrassement et les réseaux enterrés.',
        ],
      },
    ],
    faq: [
      {
        question: 'Peut-on ouvrir un mur porteur dans une maison ?',
        reponse:
          'Oui, sous conditions : la structure doit être étudiée, une poutre ou un dispositif de reprise dimensionné, et le chantier étayé. Selon votre situation (copropriété, commune), une autorisation peut être demandée ; nous la vérifions avec vous lors de la visite.',
      },
      {
        question: 'Comment savoir si mon mur est porteur ?',
        reponse:
          'On ne peut pas le déduire de l’épaisseur seule. L’orientation des solives ou des poutres, les plans et l’examen sur place permettent de le déterminer ; cette vérification précède toute intervention.',
      },
      {
        question: 'Que comprend un chantier de gros œuvre en rénovation ?',
        reponse:
          'Selon le projet : démolitions et ouvertures, reprise de murs, fondations, dalles, planchers, chapes et terrassement associé. Le devis détaille chaque poste pour que le périmètre soit clair avant le démarrage.',
      },
    ],
  },

  'menuiseries-exterieures': {
    sections: [
      {
        titre: 'Changement de fenêtres : choisir matériau, vitrage et pose',
        paragraphes: [
          'Remplacer des fenêtres ne se résume pas à choisir un modèle. Le matériau, le type de vitrage, le sens d’ouverture et surtout la manière de poser comptent autant : une fenêtre performante mal posée perd l’essentiel de ses qualités.',
          'Nous prenons les cotes sur place, vérifions l’état des dormants existants et précisons au devis le mode de pose retenu.',
        ],
      },
      {
        titre: 'Baie vitrée : ouvrir la maison sur le jardin',
        paragraphes: [
          'Une baie vitrée transforme une pièce, mais elle modifie aussi la structure du mur qui la reçoit, l’apport de lumière et la chaleur en été. Lorsqu’elle remplace une partie de mur porteur, l’ouverture est étudiée avec la maçonnerie.',
          'L’orientation, les protections solaires et les raccords avec le sol et la façade sont pensés dès le départ.',
        ],
      },
      {
        titre: 'Volets, portes et fermetures : la cohérence de la façade',
        paragraphes: [
          'Les volets, les portes d’entrée et les fermetures participent au caractère de la façade et à la sécurité du logement. Dans les secteurs protégés ou les copropriétés, leur aspect peut être encadré.',
          'Nous identifions ces contraintes avec vous avant la commande, pour éviter tout refus ou toute modification après coup.',
        ],
      },
    ],
    faq: [
      {
        question: 'Faut-il une autorisation pour changer ses fenêtres ?',
        reponse:
          'Si l’aspect extérieur change (forme, teinte, matériau), une déclaration préalable est en général nécessaire, et les secteurs protégés ou les copropriétés peuvent imposer des règles. Un remplacement à l’identique est plus simple. Nous vérifions avec vous avant de commander.',
      },
      {
        question: 'Comment se déroule la pose de fenêtres ?',
        reponse:
          'Nous relevons les cotes sur place, puis les menuiseries sont fabriquées sur mesure. Les anciennes sont déposées et les nouvelles posées, avec reprise des tableaux, des joints et des finitions. Le devis précise chaque étape.',
      },
      {
        question: 'Peut-on remplacer ses fenêtres sans refaire les murs ?',
        reponse:
          'Souvent oui : la pose en rénovation conserve l’ancien dormant, tandis que la pose en dépose totale reprend les tableaux. La solution dépend de l’état de l’existant et se décide lors de la visite.',
      },
    ],
  },

  'extension-surelevation': {
    sections: [
      {
        titre: 'Extension de maison : vérifier la faisabilité avant de dessiner',
        paragraphes: [
          'Avant de dessiner une extension, il faut savoir ce que le terrain et les règles autorisent : emprise au sol, hauteur, recul par rapport aux limites, aspect extérieur.',
          'Nous étudions avec vous le plan local d’urbanisme de votre commune, l’état du bâti existant et la nature du sol. Cette étude de faisabilité évite de concevoir un projet irréalisable.',
        ],
      },
      {
        titre: 'Surélévation de maison : gagner un étage sans toucher au sol',
        paragraphes: [
          'La surélévation convient aux parcelles où l’on ne peut plus s’étendre au sol. Elle suppose de vérifier que les murs et les fondations existants supportent la charge supplémentaire, parfois de les renforcer, puis de reprendre la charpente et la couverture.',
          'Une ossature légère, en bois ou en acier, peut limiter le poids ajouté.',
        ],
      },
      {
        titre: 'Maître d’œuvre pour une extension : un chantier, un pilote',
        paragraphes: [
          'Une extension mobilise la maçonnerie, la charpente, la couverture, les menuiseries, les réseaux et les finitions. En tant que maître d’œuvre de votre agrandissement de maison, nous coordonnons ces métiers, planifions leur enchaînement et suivons l’exécution, du premier croquis à la réception.',
          'Le raccord avec le bâti existant fait l’objet d’une attention particulière.',
        ],
      },
    ],
    faq: [
      {
        question: 'Quelle autorisation pour une extension de maison ?',
        reponse:
          'Selon la surface créée et la commune, une déclaration préalable ou un permis de construire est requis, et le plan local d’urbanisme fixe des règles d’emprise et de hauteur. Nous identifions les démarches avec vous dès l’étude ; l’instruction relève du service d’urbanisme.',
      },
      {
        question: 'Extension ou surélévation : comment choisir ?',
        reponse:
          'L’extension de plain-pied s’appuie sur le terrain disponible ; la surélévation convient quand la parcelle est contrainte, à condition que la structure existante le permette. La visite et l’étude de faisabilité tranchent entre les deux.',
      },
      {
        question: 'Peut-on vivre dans la maison pendant l’extension ?',
        reponse:
          'Souvent oui pour une extension de plain-pied, dont le raccord à la maison intervient en fin de gros œuvre. Pour une surélévation, la réponse dépend du phasage ; nous l’évaluons avec vous.',
      },
    ],
  },

  cuisine: {
    sections: [
      {
        titre: 'Rénovation de cuisine : penser l’implantation avant le mobilier',
        paragraphes: [
          'Une cuisine réussie commence par l’implantation : circulation entre l’évier, la plaque et le réfrigérateur, emplacement des arrivées d’eau, de la hotte, des prises.',
          'Nous reprenons ces points avec vous avant de fixer le mobilier, quitte à déplacer une cloison ou une évacuation lorsque le gain d’usage le justifie.',
        ],
      },
      {
        titre: 'Pose de cuisine : des réseaux à la finition',
        paragraphes: [
          'La pose de cuisine n’intervient qu’en fin de chantier. En amont, il faut déposer l’ancienne, reprendre les réseaux d’eau, d’évacuation et d’électricité, refaire les murs et les sols.',
          'Nous planifions chaque métier au bon moment pour que le mobilier soit posé sur des supports prêts et l’électroménager raccordé proprement.',
        ],
      },
      {
        titre: 'Cuisine sur mesure ou modèle de série : ce que prévoit le devis',
        paragraphes: [
          'Que vous choisissiez une cuisine sur mesure ou un modèle de série, le devis détaille chaque poste : dépose, réseaux, finitions, pose du mobilier, du plan de travail et de l’électroménager.',
          'Vous pouvez ainsi comparer et décider en connaissant le périmètre exact des travaux.',
        ],
      },
    ],
    faq: [
      {
        question: 'Que comprend la rénovation d’une cuisine ?',
        reponse:
          'Selon votre projet : dépose de l’ancienne cuisine, reprise des réseaux d’eau et d’électricité, sols, revêtements muraux, peinture, éclairage, puis pose du mobilier, du plan de travail et de l’électroménager.',
      },
      {
        question: 'Peut-on déplacer l’évier ou la cuisine dans une autre pièce ?',
        reponse:
          'C’est souvent possible, à condition de vérifier les évacuations, la ventilation et l’alimentation électrique. La faisabilité s’étudie lors de la visite.',
      },
      {
        question: 'Comment obtenir un devis de cuisine précis ?',
        reponse:
          'Une visite sur place permet de relever les cotes, d’examiner les réseaux et de préciser vos attentes. Le devis détaille ensuite chaque poste, ce qui rend les travaux lisibles avant le démarrage.',
      },
    ],
  },

  'salle-de-bain': {
    sections: [
      {
        titre: 'Douche à l’italienne : l’étanchéité avant tout',
        paragraphes: [
          'Une douche à l’italienne n’a ni bac ni rebord : l’eau s’évacue par une pente du sol vers un siphon. Ce confort repose sur une préparation soignée du support, une étanchéité sous carrelage continue et des relevés sur les murs.',
          'Nous contrôlons ces étapes avant de poser le carrelage, car un défaut caché ne se corrige qu’en démolissant.',
        ],
      },
      {
        titre: 'Création de salle de bain : plomberie, ventilation, électricité',
        paragraphes: [
          'Créer une salle de bain dans une pièce existante demande d’anticiper les arrivées et évacuations d’eau, la ventilation et les règles de sécurité électrique propres aux pièces d’eau.',
          'Nous vérifions la faisabilité, notamment la pente des évacuations et l’état du plancher, avant de définir le plan.',
        ],
      },
      {
        titre: 'Devis salle de bain : un budget lisible poste par poste',
        paragraphes: [
          'Dépose, plomberie, étanchéité, carrelage, meubles vasques, robinetterie, éclairage : le devis détaille chaque poste.',
          'Vous savez ainsi ce qui est inclus et pouvez arbitrer entre plusieurs niveaux de finition avant le démarrage des travaux.',
        ],
      },
    ],
    faq: [
      {
        question: 'Comment transformer une baignoire en douche à l’italienne ?',
        reponse:
          'Il faut déposer la baignoire, reprendre le sol pour créer la pente d’évacuation, réaliser l’étanchéité, puis poser le receveur de plain-pied ou le carrelage. La faisabilité dépend de l’épaisseur du plancher et des évacuations, vérifiées lors de la visite.',
      },
      {
        question: 'Peut-on créer une salle de bain dans une autre pièce ?',
        reponse:
          'Souvent oui, sous réserve d’évacuations accessibles, d’une ventilation possible et d’un plancher adapté. L’étude sur place permet de le confirmer.',
      },
      {
        question: 'Pourquoi l’étanchéité est-elle si importante ?',
        reponse:
          'Une fuite derrière le carrelage reste invisible longtemps et peut abîmer les murs ou le plancher. Une étanchéité sous carrelage correctement exécutée protège la structure ; nous la contrôlons avant la pose du revêtement.',
      },
    ],
  },

  'chauffage-climatisation': {
    sections: [
      {
        titre: 'Installation de climatisation : dimensionner selon le logement',
        paragraphes: [
          'Une climatisation sous-dimensionnée peine à rafraîchir ; surdimensionnée, elle consomme davantage et s’use plus vite. Le choix de l’appareil dépend du volume des pièces, de leur exposition, de l’isolation et de l’usage.',
          'Nous étudions ces éléments sur place avant de proposer un équipement et l’emplacement des unités intérieures et extérieures.',
        ],
      },
      {
        titre: 'Climatisation réversible : rafraîchir l’été, chauffer à la mi-saison',
        paragraphes: [
          'Une climatisation réversible peut aussi assurer un chauffage d’appoint hors des périodes les plus froides. Elle se raccorde à l’électricité du logement et demande une évacuation des condensats, un passage pour les liaisons et un emplacement discret pour l’unité extérieure.',
          'Nous réglons ces points avec vous avant l’installation.',
        ],
      },
      {
        titre: 'Chauffage et ventilation : un système cohérent',
        paragraphes: [
          'Un équipement de chauffage fonctionne avec l’isolation, la plomberie, l’électricité et la ventilation du logement. Nous vérifions ces interactions et suivons la mise en service.',
          'Le choix du système est discuté avec vous au regard de l’état du bâtiment et de vos usages.',
        ],
      },
    ],
    faq: [
      {
        question: 'Quelle différence entre climatisation et climatisation réversible ?',
        reponse:
          'Une climatisation simple ne fait que rafraîchir. Une climatisation réversible peut aussi chauffer, ce qui en fait un équipement utilisable en plusieurs saisons. Le choix dépend de votre logement et de vos besoins.',
      },
      {
        question: 'Faut-il une autorisation pour installer une climatisation ?',
        reponse:
          'L’unité extérieure modifie l’aspect de la façade : selon votre commune et votre situation (copropriété, secteur protégé), une autorisation peut être nécessaire. Nous le vérifions avec vous avant l’installation.',
      },
      {
        question: 'Comment choisir la puissance d’une climatisation ?',
        reponse:
          'Elle dépend du volume des pièces, de leur exposition, de l’isolation et du nombre d’occupants. Nous la déterminons sur place plutôt qu’à partir de la seule surface.',
      },
    ],
  },

  electricite: {
    sections: [
      {
        titre: 'Mise aux normes électriques : d’abord un état des lieux',
        paragraphes: [
          'Dans un logement ancien, l’installation électrique a souvent été complétée au fil du temps : circuits surchargés, prises sans mise à la terre, tableau dépassé.',
          'Nous commençons par relever l’existant circuit par circuit, pour définir ce qui peut être conservé et ce qu’il faut reprendre afin que l’installation soit sûre et adaptée à vos usages d’aujourd’hui.',
        ],
      },
      {
        titre: 'Tableau électrique : le cœur de l’installation',
        paragraphes: [
          'Le tableau électrique répartit et protège les circuits du logement. Son remplacement s’accompagne d’une organisation claire des protections et d’un repérage lisible de chaque départ.',
          'C’est souvent le point de départ d’une rénovation de l’installation, menée pièce par pièce ou en une seule fois.',
        ],
      },
      {
        titre: 'Électricité en rénovation : l’intégrer au planning du chantier',
        paragraphes: [
          'En rénovation, l’électricité intervient avant les cloisons et les enduits, puis après les peintures. Nous l’intégrons au planning général pour limiter les saignées dans des murs déjà refaits et les reprises tardives.',
          'Le chiffrage est détaillé poste par poste, éclairage intérieur et extérieur compris.',
        ],
      },
    ],
    faq: [
      {
        question: 'Comment savoir si mon installation électrique est aux normes ?',
        reponse:
          'Des disjoncteurs qui sautent, un tableau ancien, des prises sans terre ou des fils apparents sont des signaux d’alerte. Un contrôle sur place permet d’évaluer l’installation et de préciser les reprises à prévoir.',
      },
      {
        question: 'Peut-on rénover l’électricité sans refaire les murs ?',
        reponse:
          'En partie, souvent : certains circuits peuvent être repris en réutilisant les passages existants. Selon l’état des murs et l’ampleur des travaux, des saignées restent parfois nécessaires ; nous l’évaluons à la visite.',
      },
      {
        question: 'Que comprend le remplacement d’un tableau électrique ?',
        reponse:
          'La dépose de l’ancien tableau, la pose du nouveau avec ses protections, le raccordement des circuits et leur repérage. Il peut s’accompagner de reprises de circuits si l’installation le justifie.',
      },
    ],
  },

  'platrerie-peinture-carrelage': {
    sections: [
      {
        titre: 'Cloisons et faux plafonds : la plâtrerie qui structure l’espace',
        paragraphes: [
          'Cloisons, doublages et faux plafonds redéfinissent l’espace et accueillent les réseaux, l’éclairage et parfois l’isolation. Ils doivent être posés d’aplomb et de niveau, avec des joints soignés, car la peinture ne rattrape pas un support irrégulier.',
          'Nous coordonnons leur pose avec l’électricité et la plomberie.',
        ],
      },
      {
        titre: 'Peinture : préparer pour que la finition dure',
        paragraphes: [
          'Une peinture réussie tient à sa préparation : rebouchage, ponçage, enduits, sous-couche adaptée au support. Dans les maisons anciennes, des murs irréguliers ou humides demandent un traitement préalable.',
          'Le devis précise la préparation prévue, les teintes et le nombre de couches.',
        ],
      },
      {
        titre: 'Carrelage : des supports prêts avant la pose',
        paragraphes: [
          'Le carrelage supporte mal un support déformé ou humide. Nous contrôlons la planéité et l’état du sol ou du mur avant la pose, adaptons colles et joints à l’usage de la pièce, et soignons les raccords avec les plinthes, les seuils et les équipements.',
        ],
      },
    ],
    faq: [
      {
        question: 'Dans quel ordre se déroulent les travaux de finition ?',
        reponse:
          'En général : cloisons et plafonds, électricité et plomberie, enduits, puis peintures et sols, enfin plinthes et équipements. L’ordre exact est établi pour chaque chantier afin que chaque métier trouve un support prêt.',
      },
      {
        question: 'Peut-on poser du carrelage sur un ancien carrelage ?',
        reponse:
          'C’est parfois possible si le support est sain, plan et bien adhérent, mais cela ajoute de l’épaisseur et peut gêner portes et seuils. Nous évaluons la solution lors de la visite.',
      },
      {
        question: 'Comment limiter les nuisances d’un chantier de finitions ?',
        reponse:
          'En planifiant les interventions poussiéreuses avant les finitions, en protégeant les sols et le mobilier, et en nettoyant à chaque étape. Le chantier est remis propre à la réception.',
      },
    ],
  },
};
