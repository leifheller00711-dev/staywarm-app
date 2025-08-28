import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

// Mock data
const mockOrganizations = [
  {
    id: '1',
    name: 'Bahnhofsmission Berlin Hauptbahnhof',
    description: 'Wir helfen Menschen in Not am Berliner Hauptbahnhof mit Beratung, warmen Mahlzeiten und Notunterkünften.',
    address: 'Hauptbahnhof, Europaplatz 1',
    city: 'Berlin',
    postal_code: '10557',
    contact_person: 'Maria Schmidt',
    email: 'info@bahnhofsmission-berlin.de',
    phone: '+49 30 12345678',
    website: 'https://bahnhofsmission-berlin.de',
    opening_hours: 'Mo-So: 6:00-22:00 Uhr',
    donation_methods: ['pickup', 'delivery', 'bank'],
    needs: [
      { category: 'clothing', subcategory: 'Winterjacken', priority: 'urgent', quantity_needed: 20 },
      { category: 'food', subcategory: 'Warme Getränke', priority: 'high', quantity_needed: 50 },
      { category: 'sleeping', subcategory: 'Schlafsäcke', priority: 'urgent', quantity_needed: 15 }
    ]
  },
  {
    id: '2',
    name: 'Kältehilfe München',
    description: 'Notübernachtung und Betreuung für obdachlose Menschen in den Wintermonaten.',
    address: 'Bayerstraße 77a',
    city: 'München',
    postal_code: '80335',
    contact_person: 'Thomas Weber',
    email: 'kontakt@kaeltehilfe-muenchen.de',
    phone: '+49 89 98765432',
    opening_hours: 'Nov-März: 19:00-8:00 Uhr',
    donation_methods: ['delivery', 'mail', 'bank'],
    needs: [
      { category: 'hygiene', subcategory: 'Körperpflege', priority: 'medium', quantity_needed: 30 },
      { category: 'food', subcategory: 'Konserven', priority: 'high', quantity_needed: 100 },
      { category: 'clothing', subcategory: 'Socken', priority: 'high', quantity_needed: 40 }
    ]
  },
  {
    id: '3',
    name: 'Hamburger Tafel',
    description: 'Verteilung von Lebensmitteln an bedürftige Menschen und Familien.',
    address: 'Nagelsweg 14',
    city: 'Hamburg',
    postal_code: '20097',
    contact_person: 'Anna Müller',
    email: 'info@hamburger-tafel.de',
    phone: '+49 40 11223344',
    opening_hours: 'Di, Do, Sa: 10:00-14:00 Uhr',
    donation_methods: ['pickup', 'delivery'],
    needs: [
      { category: 'food', subcategory: 'Frische Lebensmittel', priority: 'urgent', quantity_needed: 200 },
      { category: 'other', subcategory: 'Fahrkarten', priority: 'medium', quantity_needed: 25 }
    ]
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'Dringend';
    case 'high': return 'Hoch';
    case 'medium': return 'Mittel';
    default: return 'Niedrig';
  }
};

export default function OrganizationsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-800 py-12 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Alle Organisationen
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Entdecke alle registrierten Hilfsorganisationen und ihre aktuellen Bedarfe
            </p>
          </div>
        </div>
      </section>

      {/* Organizations List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {mockOrganizations.map((org) => (
              <Card key={org.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2 text-white">{org.name}</CardTitle>
                      <p className="text-gray-300 mb-4">{org.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-300">
                          <span className="text-gray-500">📍</span>
                          <span>{org.address}, {org.postal_code} {org.city}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <span className="text-gray-500">📞</span>
                          <span>{org.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <span className="text-gray-500">📧</span>
                          <span>{org.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <span className="text-gray-500">🕒</span>
                          <span>{org.opening_hours}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <div className="flex flex-col space-y-2">
                        <Link href={`/organizations/${org.id}`}>
                          <Button className="w-full lg:w-auto">
                            Details ansehen
                          </Button>
                        </Link>
                        <Link href={`/donate?org=${org.id}`}>
                          <Button variant="outline" className="w-full lg:w-auto">
                            <span className="mr-2">❤️</span>
                            Spenden
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-3 text-white">Aktuelle Bedarfe:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {org.needs.map((need, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div>
                            <div className="font-medium text-sm text-white">{need.subcategory}</div>
                            {need.quantity_needed && (
                              <div className="text-xs text-gray-400">
                                Benötigt: {need.quantity_needed}
                              </div>
                            )}
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(need.priority)}`}>
                            {getPriorityLabel(need.priority)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}