'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { DONATION_CATEGORIES, CategoryKey } from '@/lib/categories';

interface Organization {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  contact_person: string;
  email: string;
  phone?: string;
  website?: string;
  opening_hours: string;
  needs: Array<{
    category: string;
    subcategory: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    quantity_needed?: number;
  }>;
}

interface DonationMapProps {
  organizations: Organization[];
}

export function DonationMap({ organizations }: DonationMapProps) {
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>(organizations);
  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Dynamically import Leaflet to avoid SSR issues
        const L = (await import('leaflet')).default;
        
        // Fix for default markers in Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        if (mapRef.current && !mapInstance.current) {
          // Create map centered on Bremen
          const map = L.map(mapRef.current).setView([53.0793, 8.8017], 13);

          // Add dark tile layer from CartoDB
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }).addTo(map);

          mapInstance.current = map;
          setMapLoaded(true);
        }
      } catch (error) {
        console.error('Error loading map:', error);
        setMapLoaded(false);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const updateMarkers = async () => {
      if (mapLoaded && mapInstance.current) {
        const L = (await import('leaflet')).default;
        
        // Clear existing markers
        markersRef.current.forEach(marker => mapInstance.current.removeLayer(marker));
        markersRef.current = [];

        // Add markers for filtered organizations
        filteredOrganizations.forEach((org, index) => {
          // Create custom icon with number
          const customIcon = L.divIcon({
            html: `<div style="
              background-color: #ef4444;
              color: white;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 14px;
              border: 3px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">${index + 1}</div>`,
            className: 'custom-div-icon',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          const marker = L.marker([org.latitude, org.longitude], { icon: customIcon })
            .addTo(mapInstance.current);

          // Add popup with organization info
          const popupContent = `
            <div style="color: #1f2937; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px;">${org.name}</h3>
              <p style="margin: 0 0 8px 0; font-size: 14px;">${org.address}</p>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${org.opening_hours}</p>
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <button onclick="window.openOrgModal('${org.id}')" style="
                  background: #3b82f6;
                  color: white;
                  border: none;
                  padding: 6px 12px;
                  border-radius: 6px;
                  font-size: 12px;
                  cursor: pointer;
                ">Details</button>
                <button onclick="window.location.href='/donate?org=${org.id}'" style="
                  background: #ef4444;
                  color: white;
                  border: none;
                  padding: 6px 12px;
                  border-radius: 6px;
                  font-size: 12px;
                  cursor: pointer;
                ">Spenden</button>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent);
          markersRef.current.push(marker);
        });
      }
    };

    updateMarkers();
  }, [filteredOrganizations, mapLoaded]);

  // Global function for modal opening from map popup
  useEffect(() => {
    (window as any).openOrgModal = (orgId: string) => {
      const org = organizations.find(o => o.id === orgId);
      if (org) {
        openModal(org);
      }
    };

    return () => {
      delete (window as any).openOrgModal;
    };
  }, [organizations]);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredOrganizations(organizations);
    } else {
      const filtered = organizations.filter(org =>
        org.needs.some(need =>
          selectedCategories.includes(need.category as CategoryKey)
        )
      );
      setFilteredOrganizations(filtered);
    }
  }, [selectedCategories, organizations]);

  const toggleCategory = (category: CategoryKey) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

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

  const openModal = (org: Organization) => {
    setSelectedOrg(org);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrg(null);
  };

  const handleDonate = (orgId: string) => {
    window.location.href = `/donate?org=${orgId}`;
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <span>🔍</span>
            <span>Filter</span>
          </Button>
          {selectedCategories.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">
                {selectedCategories.length} Filter aktiv
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-400 hover:text-red-300"
              >
                <span>✕</span>
              </Button>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-300">
          {filteredOrganizations.length} von {organizations.length} Organisationen
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="fade-in">
          <CardHeader>
            <CardTitle className="text-white">Nach Kategorien filtern</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.entries(DONATION_CATEGORIES).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => toggleCategory(key as CategoryKey)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    selectedCategories.includes(key as CategoryKey)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700 text-white'
                  }`}
                >
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <div className="text-sm font-medium">{category.name}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map and Organization List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OpenStreetMap */}
        <div className="h-96 rounded-lg border border-gray-600 bg-gray-800 relative overflow-hidden">
          <div ref={mapRef} className="w-full h-full rounded-lg" />
          
          {/* Leaflet CSS */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""
          />
          
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-gray-300">Karte wird geladen...</p>
              </div>
            </div>
          )}

          {/* Map Legend */}
          <div className="absolute bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="text-white text-xs space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <span>Organisation</span>
              </div>
              <div className="text-gray-300 text-xs">
                Klicken für Details
              </div>
            </div>
          </div>
        </div>

        {/* Organization List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredOrganizations.map((org, index) => (
            <Card 
              key={org.id} 
              className="cursor-pointer transition-all hover:shadow-md hover:border-blue-500"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-white">{org.name}</h3>
                    <p className="text-sm text-gray-300 mb-2">
                      📍 {org.address}, {org.postal_code} {org.city}
                    </p>
                    <p className="text-sm mb-3 text-gray-300">
                      <strong>Ansprechpartner:</strong> {org.contact_person}
                    </p>
                    
                    {org.needs.length > 0 && (
                      <div className="mb-3">
                        <h4 className="font-medium text-sm mb-2 text-white">Aktuelle Bedarfe:</h4>
                        <div className="space-y-1">
                          {org.needs.slice(0, 3).map((need, needIndex) => (
                            <div key={needIndex} className="flex items-center justify-between text-xs text-gray-300">
                              <span>{need.subcategory}</span>
                              <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(need.priority)}`}>
                                {getPriorityLabel(need.priority)}
                              </span>
                            </div>
                          ))}
                          {org.needs.length > 3 && (
                            <p className="text-xs text-gray-400">
                              +{org.needs.length - 3} weitere Bedarfe
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => openModal(org)}
                      >
                        Details ansehen
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleDonate(org.id)}
                      >
                        Spenden
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for Organization Details */}
      {showModal && selectedOrg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">{selectedOrg.name}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300">{selectedOrg.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <span className="text-gray-500">📍</span>
                      <span>{selectedOrg.address}, {selectedOrg.postal_code} {selectedOrg.city}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <span className="text-gray-500">📞</span>
                      <span>{selectedOrg.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <span className="text-gray-500">📧</span>
                      <span>{selectedOrg.email}</span>
                    </div>
                    {selectedOrg.website && (
                      <div className="flex items-center space-x-2 text-gray-300">
                        <span className="text-gray-500">🌐</span>
                        <a href={`https://${selectedOrg.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          {selectedOrg.website}
                        </a>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <span className="text-gray-500">🕒</span>
                      <span>{selectedOrg.opening_hours}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300 mt-2">
                      <span className="text-gray-500">👤</span>
                      <span>{selectedOrg.contact_person}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white">Alle aktuellen Bedarfe:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedOrg.needs.map((need, index) => (
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

                <div className="flex space-x-4 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      closeModal();
                      handleDonate(selectedOrg.id);
                    }}
                  >
                    <span className="mr-2">❤️</span>
                    Jetzt spenden
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={closeModal}
                    className="flex-1"
                  >
                    Schließen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}