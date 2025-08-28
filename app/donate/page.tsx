'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DONATION_CATEGORIES, DONATION_METHODS } from '@/lib/categories';
import { useSearchParams } from 'next/navigation';

interface DonationItem {
  id: string;
  organizationId: string;
  organizationName: string;
  category: string;
  subcategory: string;
  item: string;
  quantity: number;
  estimatedValue: number;
}

export default function DonatePage() {
  const [cart, setCart] = useState<DonationItem[]>([]);
  const [donationType, setDonationType] = useState<'items' | 'money'>('items');
  const searchParams = useSearchParams();
  const orgId = searchParams.get('org');

  // Bremen organizations data
  const bremenOrganizations = [
    {
      id: '1',
      name: 'Bahnhofsmission Bremen',
      needs: [
        { category: 'food', subcategory: 'Warme Getränke', items: ['Tee', 'Kaffee', 'Heißer Kakao'], estimatedValue: 3 },
        { category: 'food', subcategory: 'Kleine Snacks', items: ['Müsliriegel', 'Kekse', 'Nüsse'], estimatedValue: 2 },
        { category: 'clothing', subcategory: 'Winterjacken', items: ['Herren XL', 'Damen M', 'Kinder 140'], estimatedValue: 25 },
        { category: 'hygiene', subcategory: 'Körperpflege', items: ['Seife', 'Shampoo', 'Zahnbürsten'], estimatedValue: 5 }
      ]
    },
    {
      id: '2',
      name: 'Café Papagei (Inneren Mission Bremen)',
      needs: [
        { category: 'food', subcategory: 'Frühstück', items: ['Brot', 'Marmelade', 'Butter'], estimatedValue: 4 },
        { category: 'food', subcategory: 'Mittagessen', items: ['Warme Mahlzeiten', 'Suppen', 'Eintöpfe'], estimatedValue: 6 },
        { category: 'hygiene', subcategory: 'Duschutensilien', items: ['Duschgel', 'Handtücher', 'Waschlappen'], estimatedValue: 8 },
        { category: 'medical', subcategory: 'Erste Hilfe', items: ['Pflaster', 'Verbandsmaterial', 'Desinfektionsmittel'], estimatedValue: 10 }
      ]
    },
    {
      id: '3',
      name: 'frauenzimmer – Tagestreff für wohnungslose Frauen',
      needs: [
        { category: 'clothing', subcategory: 'Damenbekleidung', items: ['Oberteile', 'Hosen', 'Unterwäsche'], estimatedValue: 15 },
        { category: 'hygiene', subcategory: 'Damenhygiene', items: ['Binden', 'Tampons', 'Intimhygiene'], estimatedValue: 12 },
        { category: 'food', subcategory: 'Essen & Getränke', items: ['Warme Getränke', 'Snacks', 'Obst'], estimatedValue: 5 },
        { category: 'medical', subcategory: 'Medizinische Beratung', items: ['Beratungsgespräche', 'Gesundheitscheck'], estimatedValue: 0 }
      ]
    }
  ];

  // Filter organizations based on orgId if provided
  const organizations = orgId 
    ? bremenOrganizations.filter(org => org.id === orgId)
    : bremenOrganizations;

  const addToCart = (orgId: string, orgName: string, category: string, subcategory: string, item: string, estimatedValue: number) => {
    const newItem: DonationItem = {
      id: `${orgId}-${category}-${subcategory}-${item}-${Date.now()}`,
      organizationId: orgId,
      organizationName: orgName,
      category,
      subcategory,
      item,
      quantity: 1,
      estimatedValue
    };
    setCart(prev => [...prev, newItem]);
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getTotalValue = () => {
    return cart.reduce((total, item) => total + (item.estimatedValue * item.quantity), 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.organizationId]) {
      acc[item.organizationId] = {
        organizationName: item.organizationName,
        items: []
      };
    }
    acc[item.organizationId].items.push(item);
    return acc;
  }, {} as Record<string, { organizationName: string; items: DonationItem[] }>);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-800 py-12 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              {orgId ? `Spenden für ${organizations[0]?.name}` : 'Spenden zusammenstellen'}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {orgId 
                ? 'Wählen Sie aus den aktuellen Bedarfen dieser Organisation aus'
                : 'Wählen Sie aus den aktuellen Bedarfen der Organisationen aus und stellen Sie Ihren Spendenkorb zusammen'
              }
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Donation Type Toggle */}
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Art der Spende</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button
                    variant={donationType === 'items' ? 'default' : 'outline'}
                    onClick={() => setDonationType('items')}
                    className="flex-1"
                  >
                    Sachspenden
                  </Button>
                  <Button
                    variant={donationType === 'money' ? 'default' : 'outline'}
                    onClick={() => setDonationType('money')}
                    className="flex-1"
                  >
                    Geldspende
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Organizations and Needs */}
            {organizations.map(org => (
              <Card key={org.id}>
                <CardHeader>
                  <CardTitle className="text-white">{org.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {org.needs.map((need, needIndex) => (
                      <div key={needIndex} className="border border-gray-600 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center text-white">
                          <span className="text-2xl mr-2">
                            {DONATION_CATEGORIES[need.category as keyof typeof DONATION_CATEGORIES]?.icon}
                          </span>
                          {need.subcategory}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {need.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                              <div>
                                <div className="text-sm font-medium text-white">{item}</div>
                                {donationType === 'money' && (
                                  <div className="text-xs text-gray-400">
                                    ~{formatCurrency(need.estimatedValue)}
                                  </div>
                                )}
                              </div>
                              <Button
                                size="sm"
                                onClick={() => addToCart(org.id, org.name, need.category, need.subcategory, item, need.estimatedValue)}
                              >
                               <span>➕</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Shopping Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                 <span className="mr-2">🛒</span>
                  Spendenkorb ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    Ihr Spendenkorb ist leer
                  </p>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(groupedCart).map(([orgId, group]) => (
                      <div key={orgId} className="border-b border-gray-600 pb-4">
                        <h4 className="font-semibold text-sm mb-2 text-white">{group.organizationName}</h4>
                        <div className="space-y-2">
                          {group.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between text-sm">
                              <div className="flex-1">
                                <div className="font-medium text-white">{item.item}</div>
                                <div className="text-gray-400 text-xs">{item.subcategory}</div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="p-1 hover:bg-gray-600 rounded"
                                >
                                  <span className="text-xs">➖</span>
                                </button>
                                <span className="w-8 text-center text-white">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="p-1 hover:bg-gray-600 rounded"
                                >
                                  <span className="text-xs">➕</span>
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-1 hover:bg-gray-600 rounded text-red-400"
                                >
                                  <span className="text-xs">🗑️</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t border-gray-600">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-lg text-white">
                          {donationType === 'money' ? formatCurrency(getTotalValue()) : `${cart.length} Artikel`}
                        </span>
                        <span className="font-bold text-lg text-white">{formatCurrency(getTotalValue())}</span>
                      </div>
                      
                      <Button className="w-full mb-2">
                        {donationType === 'items' ? 'Sachspende abschließen' : 'Geldspende abschließen'}
                      </Button>
                      {donationType === 'items' && (
                        <Button variant="outline" className="w-full">
                          Als Geldspende ({formatCurrency(getTotalValue())})
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}