export interface Seller {
    _id: string;
    userId: string;
    profile: {
      bio: string;
      location: string;
      contactInfo: {
        email: string;
        phone: string;
        socialMedia?: {
          twitter?: string;
          facebook?: string;
          instagram?: string;
        };
      };
      specialties: string[];
    };
  }
  