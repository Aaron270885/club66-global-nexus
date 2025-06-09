export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_form_submissions: {
        Row: {
          created_at: string | null
          data: Json
          form_id: string | null
          id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          form_id?: string | null
          id?: string
          status?: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          form_id?: string | null
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "admin_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_forms: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          fields: Json
          id: string
          name: string
          notification_email: string | null
          redirect_url: string | null
          store_submissions: boolean
          submit_button_text: string
          success_message: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          fields: Json
          id?: string
          name: string
          notification_email?: string | null
          redirect_url?: string | null
          store_submissions?: boolean
          submit_button_text: string
          success_message: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          fields?: Json
          id?: string
          name?: string
          notification_email?: string | null
          redirect_url?: string | null
          store_submissions?: boolean
          submit_button_text?: string
          success_message?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_forms_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_media: {
        Row: {
          created_at: string | null
          created_by: string | null
          dimensions: Json | null
          id: string
          name: string
          size: number
          tags: string[] | null
          thumbnail_url: string | null
          type: string
          url: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          dimensions?: Json | null
          id?: string
          name: string
          size: number
          tags?: string[] | null
          thumbnail_url?: string | null
          type: string
          url: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          dimensions?: Json | null
          id?: string
          name?: string
          size?: number
          tags?: string[] | null
          thumbnail_url?: string | null
          type?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_media_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_menu_items: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          label: string
          order_index: number
          parent_id: string | null
          target: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          label: string
          order_index: number
          parent_id?: string | null
          target?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          label?: string
          order_index?: number
          parent_id?: string | null
          target?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_menu_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "admin_menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_pages: {
        Row: {
          content: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          seo: Json | null
          slug: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          seo?: Json | null
          slug: string
          status: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          seo?: Json | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_pages_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_sections: {
        Row: {
          content: Json
          created_at: string | null
          id: string
          name: string
          order_index: number
          page_id: string | null
          settings: Json | null
          type: string
          updated_at: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          id?: string
          name: string
          order_index: number
          page_id?: string | null
          settings?: Json | null
          type: string
          updated_at?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: string
          name?: string
          order_index?: number
          page_id?: string | null
          settings?: Json | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "admin_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: Json | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value?: Json | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          membership: string | null
          role: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          membership?: string | null
          role: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          membership?: string | null
          role?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      agents: {
        Row: {
          agent_type: Database["public"]["Enums"]["agent_type"]
          commissions_pending: number | null
          commissions_withdrawn: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          qr_code: string | null
          referral_code: string
          total_commissions: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_type?: Database["public"]["Enums"]["agent_type"]
          commissions_pending?: number | null
          commissions_withdrawn?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          qr_code?: string | null
          referral_code: string
          total_commissions?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_type?: Database["public"]["Enums"]["agent_type"]
          commissions_pending?: number | null
          commissions_withdrawn?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          qr_code?: string | null
          referral_code?: string
          total_commissions?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      competition_participants: {
        Row: {
          competition_id: string
          created_at: string | null
          id: string
          participant_name: string
          participant_phone: string
          profile_picture_url: string | null
          user_id: string
          vote_count: number | null
        }
        Insert: {
          competition_id: string
          created_at?: string | null
          id?: string
          participant_name: string
          participant_phone: string
          profile_picture_url?: string | null
          user_id: string
          vote_count?: number | null
        }
        Update: {
          competition_id?: string
          created_at?: string | null
          id?: string
          participant_name?: string
          participant_phone?: string
          profile_picture_url?: string | null
          user_id?: string
          vote_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "competition_participants_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      competition_votes: {
        Row: {
          competition_id: string
          id: string
          participant_id: string
          vote_date: string | null
          voted_at: string | null
          voter_id: string
        }
        Insert: {
          competition_id: string
          id?: string
          participant_id: string
          vote_date?: string | null
          voted_at?: string | null
          voter_id: string
        }
        Update: {
          competition_id?: string
          id?: string
          participant_id?: string
          vote_date?: string | null
          voted_at?: string | null
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competition_votes_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "competition_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          created_at: string | null
          current_entries: number | null
          description: string | null
          end_date: string
          id: string
          location: string | null
          max_entries: number | null
          prize: string | null
          start_date: string
          status: Database["public"]["Enums"]["competition_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_entries?: number | null
          description?: string | null
          end_date: string
          id?: string
          location?: string | null
          max_entries?: number | null
          prize?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["competition_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_entries?: number | null
          description?: string | null
          end_date?: string
          id?: string
          location?: string | null
          max_entries?: number | null
          prize?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["competition_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      discount_usage: {
        Row: {
          amount_saved: number | null
          discount_percentage: number | null
          id: string
          merchant_id: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          amount_saved?: number | null
          discount_percentage?: number | null
          id?: string
          merchant_id: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          amount_saved?: number | null
          discount_percentage?: number | null
          id?: string
          merchant_id?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discount_usage_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applicant_id: string
          applied_at: string | null
          cover_letter: string | null
          id: string
          job_id: string
          resume_url: string | null
          status: string | null
        }
        Insert: {
          applicant_id: string
          applied_at?: string | null
          cover_letter?: string | null
          id?: string
          job_id: string
          resume_url?: string | null
          status?: string | null
        }
        Update: {
          applicant_id?: string
          applied_at?: string | null
          cover_letter?: string | null
          id?: string
          job_id?: string
          resume_url?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          application_deadline: string | null
          benefits: string | null
          category_id: string | null
          company: string
          created_at: string | null
          currency: string | null
          description: string
          employment_type: string
          id: string
          is_active: boolean | null
          location: string
          posted_by: string | null
          requirements: string | null
          salary_max: number | null
          salary_min: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          application_deadline?: string | null
          benefits?: string | null
          category_id?: string | null
          company: string
          created_at?: string | null
          currency?: string | null
          description: string
          employment_type: string
          id?: string
          is_active?: boolean | null
          location: string
          posted_by?: string | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          application_deadline?: string | null
          benefits?: string | null
          category_id?: string | null
          company?: string
          created_at?: string | null
          currency?: string | null
          description?: string
          employment_type?: string
          id?: string
          is_active?: boolean | null
          location?: string
          posted_by?: string | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "job_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          created_at: string | null
          expiry_date: string | null
          id: string
          is_active: boolean | null
          member_id: string | null
          monthly_fee_current: boolean | null
          physical_card_requested: boolean | null
          qr_code: string | null
          registration_fee_paid: boolean | null
          start_date: string | null
          tier: Database["public"]["Enums"]["membership_tier"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean | null
          member_id?: string | null
          monthly_fee_current?: boolean | null
          physical_card_requested?: boolean | null
          qr_code?: string | null
          registration_fee_paid?: boolean | null
          start_date?: string | null
          tier?: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean | null
          member_id?: string | null
          monthly_fee_current?: boolean | null
          physical_card_requested?: boolean | null
          qr_code?: string | null
          registration_fee_paid?: boolean | null
          start_date?: string | null
          tier?: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      merchants: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          discount_percentage: number
          id: string
          is_active: boolean | null
          location: string | null
          logo_url: string | null
          name: string
          sector: string
          updated_at: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          discount_percentage: number
          id?: string
          is_active?: boolean | null
          location?: string | null
          logo_url?: string | null
          name: string
          sector: string
          updated_at?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          discount_percentage?: number
          id?: string
          is_active?: boolean | null
          location?: string | null
          logo_url?: string | null
          name?: string
          sector?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          membership_id: string | null
          payment_method: string
          payment_type: string
          receipt_sent: boolean | null
          status: Database["public"]["Enums"]["payment_status"] | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          membership_id?: string | null
          payment_method: string
          payment_type: string
          receipt_sent?: boolean | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          membership_id?: string | null
          payment_method?: string
          payment_type?: string
          receipt_sent?: boolean | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: false
            referencedRelation: "memberships"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          full_name: string
          id: string
          phone: string | null
          profile_image_url: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          full_name: string
          id: string
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          agent_id: string
          commission_amount: number
          commission_paid: boolean | null
          created_at: string | null
          id: string
          referred_user_id: string
        }
        Insert: {
          agent_id: string
          commission_amount: number
          commission_paid?: boolean | null
          created_at?: string | null
          id?: string
          referred_user_id: string
        }
        Update: {
          agent_id?: string
          commission_amount?: number
          commission_paid?: boolean | null
          created_at?: string | null
          id?: string
          referred_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_member_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      increment_competition_entries: {
        Args: { competition_id: string }
        Returns: undefined
      }
      increment_vote_count: {
        Args: { participant_id: string }
        Returns: undefined
      }
    }
    Enums: {
      agent_type: "individual" | "merchant" | "distributor"
      competition_status: "upcoming" | "active" | "completed" | "cancelled"
      membership_tier: "essential" | "premium" | "elite"
      payment_status: "pending" | "completed" | "failed" | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_type: ["individual", "merchant", "distributor"],
      competition_status: ["upcoming", "active", "completed", "cancelled"],
      membership_tier: ["essential", "premium", "elite"],
      payment_status: ["pending", "completed", "failed", "refunded"],
    },
  },
} as const
