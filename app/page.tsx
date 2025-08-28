import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DonationMap } from '@/components/DonationMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

// Real Bremen organizations data
const bremenOrganizations = [
  {
    id: '1',
    name: 'Bahnhofsmission Bremen',
    description: 'Soforthilfe für Wohnungslose, warme Getränke, kleine Snacks, Aufenthaltsraum, Gespräch und Begleitung, Unterstützung bei Ämtern oder Arztbesuchen',
    address: 'Hauptbahnhof Bremen, Ausgang Süd (Ostflügel)',
    city: 'Bremen',
    postal_code: '28195',
    latitude: 53.0831,
    longitude: 8.8067,
    contact_person: 'Bahnhofsmission Team',
    email: 'info@bahnhofsmission-bremen.de',
    phone: '0421 / 163 50 33',
    website: 'bahnhofsmission.de/bremen',
    opening_hours: 'täglich geöffnet, auch an Sonn- und Feiertagen',
    needs: [
      { category: 'food', subcategory: 'Warme Getränke', priority: 'high' as const, quantity_needed: 50 },
      { category: 'food', subcategory: 'Kleine Snacks', priority: 'medium' as const, quantity_needed: 30 },
      { category: 'clothing', subcategory: 'Winterjacken', priority: 'urgent' as const, quantity_needed: 15 },
      { category: 'hygiene', subcategory: 'Körperpflege', priority: 'high' as const, quantity_needed: 25 }
    ]
  },
  {
    id: '2',
    name: 'Café Papagei (Inneren Mission Bremen)',
    description: 'Tagestreff für Wohnungslose und Menschen in Armut; günstige Mahlzeiten, Duschen, Wäsche waschen, Internetzugang, medizinische Erstversorgung',
    address: 'Auf der Brake 2',
    city: 'Bremen',
    postal_code: '28195',
    latitude: 53.0758,
    longitude: 8.8072,
    contact_person: 'Café Papagei Team',
    email: 'info@innere-mission-bremen.de',
    phone: '0421 / 16898-11',
    website: 'innere-mission-bremen.de',
    opening_hours: 'Mo–So, 7:30 – 13:30 Uhr (Frühstück + Mittagessen), ärztliche Notversorgung Mo/Mi/Fr 13–16 Uhr',
    needs: [
      { category: 'food', subcategory: 'Frühstück', priority: 'high' as const, quantity_needed: 100 },
      { category: 'food', subcategory: 'Mittagessen', priority: 'high' as const, quantity_needed: 80 },
      { category: 'hygiene', subcategory: 'Duschutensilien', priority: 'medium' as const, quantity_needed: 40 },
      { category: 'medical', subcategory: 'Erste Hilfe', priority: 'medium' as const, quantity_needed: 20 }
    ]
  },
  {
    id: '3',
    name: 'frauenzimmer – Tagestreff für wohnungslose Frauen',
    description: 'Speziell für Frauen – geschützter Raum, Essen & Getränke, Aufenthaltsmöglichkeiten, Beratung, medizinische Sprechstunde, Hilfe bei Behörden',
    address: 'Abbentorstraße 5',
    city: 'Bremen',
    postal_code: '28195',
    latitude: 53.0707,
    longitude: 8.8037,
    contact_person: 'Frauenzimmer Team',
    email: 'info@frauenzimmer-bremen.de',
    phone: '0421 / 79 10 169',
    website: 'frauenzimmer-bremen.de',
    opening_hours: 'Mo–Fr, 10:00 – 18:00 Uhr',
    needs: [
      { category: 'clothing', subcategory: 'Damenbekleidung', priority: 'high' as const, quantity_needed: 35 },
      { category: 'hygiene', subcategory: 'Damenhygiene', priority: 'urgent' as const, quantity_needed: 50 },
      { category: 'food', subcategory: 'Essen & Getränke', priority: 'medium' as const, quantity_needed: 60 },
      { category: 'medical', subcategory: 'Medizinische Beratung', priority: 'high' as const, quantity_needed: 10 }
    ]
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hilfe für Obdachlose
              <span className="block text-blue-200">einfach gemacht</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Verbinde dich direkt mit Organisationen in Bremen und spende gezielt das, 
              was wirklich gebraucht wird.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#map">
                <Button size="lg" className="bg-gray-800 text-white hover:bg-gray-700 hover:text-blue-200 transform hover:scale-105 transition-all duration-200">
                  <span className="mr-2">📍</span>
                  Organisationen finden
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Wie StayWarm funktioniert
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Transparente und direkte Hilfe für Menschen in Not
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <CardTitle className="text-white">Organisationen finden</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Entdecke Bahnhofsmissionen, Unterkünfte und Hilfswerke in Bremen 
                  auf unserer interaktiven Karte.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <CardTitle className="text-white">Bedarfe einsehen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Sieh dir die aktuellen Bedarfslisten an und erfahre, was wirklich 
                  benötigt wird - von Kleidung bis hin zu Lebensmitteln.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle className="text-white">Gezielt spenden</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Spende Sachspenden oder Geld direkt an die Organisationen - 
                  per Abholung, Abgabe oder Überweisung.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Organisationen in Bremen
            </h2>
            <p className="text-lg text-gray-300">
              Finde Hilfsorganisationen und ihre aktuellen Bedarfe
            </p>
          </div>
          
          <DonationMap organizations={bremenOrganizations} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Bist du eine Organisation?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Registriere dich kostenlos und verwalte deine Bedarfslisten selbst. 
            Erreiche mehr Spender und erhalte gezielt die Hilfe, die du brauchst.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/organization/register">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Organisation registrieren
              </Button>
            </Link>
            <Link href="/organization/login">
              <Button size="lg" variant="secondary" className="bg-gray-700 text-white hover:bg-gray-600 hover:text-blue-200 transform hover:scale-105 transition-all duration-200">
                Bereits registriert? Anmelden
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}