export const DONATION_CATEGORIES = {
  clothing: {
    name: 'Kleidung',
    icon: '👕',
    subcategories: {
      underwear: {
        name: 'Unterwäsche',
        items: ['Damen', 'Herren', 'Kinder', 'Verschiedene Größen']
      },
      socks: {
        name: 'Socken',
        items: ['Damen', 'Herren', 'Kinder', 'Warme Socken', 'Sportsocken']
      },
      shirts: {
        name: 'Shirts',
        items: ['Kurzarm', 'Langarm', 'T-Shirts', 'Pullover']
      },
      pants: {
        name: 'Hosen',
        items: ['Kurze Hosen', 'Lange Hosen', 'Jeans', 'Jogginghosen']
      },
      jackets: {
        name: 'Jacken',
        items: ['Dünne Jacken', 'Dicke Jacken', 'Winterjacken', 'Übergangsjacken', 'Regenjacken']
      },
      shoes: {
        name: 'Schuhe',
        items: ['Winterschuhe', 'Sportschuhe', 'Stiefel', 'Verschiedene Größen']
      }
    }
  },
  food: {
    name: 'Essen',
    icon: '🍽️',
    subcategories: {
      canned: {
        name: 'Konserven',
        items: ['Fleischkonserven', 'Gemüsekonserven', 'Suppen', 'Fertiggerichte']
      },
      dry: {
        name: 'Trockennahrung',
        items: ['Nudeln', 'Reis', 'Brot', 'Müsli', 'Nüsse']
      },
      beverages: {
        name: 'Getränke',
        items: ['Wasser', 'Tee', 'Kaffee', 'Säfte', 'Warme Getränke']
      },
      fresh: {
        name: 'Frische Lebensmittel',
        items: ['Obst', 'Gemüse', 'Brot', 'Milchprodukte']
      }
    }
  },
  sleeping: {
    name: 'Schlaf & Ausrüstung',
    icon: '🏕️',
    subcategories: {
      sleeping_bags: {
        name: 'Schlafsäcke',
        items: ['Sommerschlafsäcke', 'Winterschlafsäcke', 'Kinderschlafsäcke']
      },
      tents: {
        name: 'Zelte',
        items: ['1-Person Zelte', '2-Person Zelte', 'Notunterkünfte']
      },
      blankets: {
        name: 'Decken',
        items: ['Wolldecken', 'Fleece-Decken', 'Notfalldecken']
      },
      mats: {
        name: 'Isomatten',
        items: ['Schlafmatten', 'Isoliermatten', 'Campingmatten']
      }
    }
  },
  hygiene: {
    name: 'Hygieneartikel',
    icon: '🧼',
    subcategories: {
      personal: {
        name: 'Körperpflege',
        items: ['Seife', 'Shampoo', 'Zahnbürsten', 'Zahnpasta', 'Deodorant']
      },
      feminine: {
        name: 'Damenhygiene',
        items: ['Binden', 'Tampons', 'Intimhygiene']
      },
      baby: {
        name: 'Babypflege',
        items: ['Windeln', 'Babycreme', 'Feuchttücher']
      }
    }
  },
  medical: {
    name: 'Erste Hilfe',
    icon: '🏥',
    subcategories: {
      bandages: {
        name: 'Verbandsmaterial',
        items: ['Pflaster', 'Bandagen', 'Mullbinden', 'Desinfektionsmittel']
      },
      medication: {
        name: 'Medikamente',
        items: ['Schmerzmittel', 'Erkältungsmittel', 'Salben']
      }
    }
  },
  other: {
    name: 'Sonstiges',
    icon: '📦',
    subcategories: {
      electronics: {
        name: 'Elektronik',
        items: ['Handys', 'Ladegeräte', 'Taschenlampen', 'Batterien']
      },
      documents: {
        name: 'Dokumente & Beratung',
        items: ['Rechtsberatung', 'Behördenhilfe', 'Übersetzungen']
      },
      transport: {
        name: 'Transport',
        items: ['Fahrkarten', 'Fahrräder', 'Reparaturen']
      }
    }
  }
} as const;

export type CategoryKey = keyof typeof DONATION_CATEGORIES;
export type SubcategoryKey<T extends CategoryKey> = keyof typeof DONATION_CATEGORIES[T]['subcategories'];

export const DONATION_METHODS = [
  { value: 'pickup', label: 'Abholung vor Ort' },
  { value: 'delivery', label: 'Persönliche Abgabe' },
  { value: 'mail', label: 'Versand per Post' },
  { value: 'bank', label: 'Banküberweisung' },
  { value: 'online', label: 'Online-Spende' }
] as const;

export const PRIORITY_LEVELS = [
  { value: 'low', label: 'Niedrig', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Mittel', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'Hoch', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Dringend', color: 'bg-red-100 text-red-800' }
] as const;