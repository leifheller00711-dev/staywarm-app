import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          address: string;
          city: string;
          postal_code: string;
          latitude: number | null;
          longitude: number | null;
          contact_person: string;
          email: string;
          phone: string | null;
          website: string | null;
          opening_hours: string | null;
          donation_methods: string[];
          bank_details: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          address: string;
          city: string;
          postal_code: string;
          latitude?: number | null;
          longitude?: number | null;
          contact_person: string;
          email: string;
          phone?: string | null;
          website?: string | null;
          opening_hours?: string | null;
          donation_methods?: string[];
          bank_details?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          address?: string;
          city?: string;
          postal_code?: string;
          latitude?: number | null;
          longitude?: number | null;
          contact_person?: string;
          email?: string;
          phone?: string | null;
          website?: string | null;
          opening_hours?: string | null;
          donation_methods?: string[];
          bank_details?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      needs: {
        Row: {
          id: string;
          organization_id: string;
          category: string;
          subcategory: string;
          description: string | null;
          quantity_needed: number | null;
          priority: 'low' | 'medium' | 'high' | 'urgent';
          estimated_value: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          category: string;
          subcategory: string;
          description?: string | null;
          quantity_needed?: number | null;
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          estimated_value?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          category?: string;
          subcategory?: string;
          description?: string | null;
          quantity_needed?: number | null;
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          estimated_value?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      organization_users: {
        Row: {
          id: string;
          organization_id: string;
          email: string;
          password_hash: string;
          role: 'admin' | 'manager';
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          email: string;
          password_hash: string;
          role?: 'admin' | 'manager';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          email?: string;
          password_hash?: string;
          role?: 'admin' | 'manager';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          is_super_admin: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          is_super_admin?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          is_super_admin?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};