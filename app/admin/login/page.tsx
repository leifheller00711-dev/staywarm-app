'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login process
    setTimeout(() => {
      if (email === 'admin@staywarm.de' && password === 'admin123') {
        // Redirect to admin dashboard
        window.location.href = '/admin/dashboard';
      } else {
        setError('Ungültige Anmeldedaten');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-blue-600">🛡️</span>
              </div>
              <CardTitle className="text-2xl text-white">Administrator Login</CardTitle>
              <p className="text-gray-300">
                Melden Sie sich mit Ihren Administrator-Zugangsdaten an
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="E-Mail-Adresse"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@staywarm.de"
                  required
                />
                
                <div className="relative">
                  <Input
                    label="Passwort"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ihr Passwort"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <span className="text-sm">🙈</span>
                    ) : (
                      <span className="text-sm">👁️</span>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-900/50 p-3 rounded-md">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Anmeldung läuft...' : 'Anmelden'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Demo-Zugangsdaten:<br />
                  E-Mail: admin@staywarm.de<br />
                  Passwort: admin123
                </p>
              </div>

              <div className="mt-6 text-center">
                <Link href="/" className="text-sm text-blue-400 hover:text-blue-300">
                  ← Zurück zur Startseite
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}