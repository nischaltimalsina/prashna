export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  district?: string;
  bio?: string;
  role: 'user' | 'moderator' | 'admin' | 'superadmin';
  level: 'citizen' | 'advocate' | 'leader';
  impactPoints: number;
  accountStatus: 'active' | 'suspended' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface Official {
  id: string;
  name: string
  position: string
  district: string
  party: string
  term: {
    start: Date
    end: Date
  }
  dob: Date
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say'
  verified?: boolean
  contactInfo: {
    email?: string
    phone?: string
    address?: string
    website?: string
    office: string
    socialMedia?: {
      facebook?: string
      twitter?: string
      instagram?: string
      linkedIn?: string
    }
  }
  bio?: string
  photo?: string
  ratings: Rating[]
  averageRating: {
    integrity: number
    responsiveness: number
    effectiveness: number
    transparency: number
    overall: number
  }
  totalRatings: number
  createdAt: Date
  updatedAt: Date

}

export interface Rating {
  id: string;
  officialId: string;
  userId: string;
  integrity: number;
  responsiveness: number;
  effectiveness: number;
  transparency: number;
  comment?: string;
  evidence?: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Promise {
  id: string;
  officialId: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'kept' | 'broken';
  datePromised: string;
  source?: string;
  evidence: Array<{
    description: string;
    source: string;
    status: 'supporting' | 'opposing';
    upvotes: number;
    submittedBy: string;
    submittedAt: string;
  }>;
  comments: Array<{
    id: string;
    text: string;
    userId: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  category: string;
  district: string;
  goal: number;
  supportersCount: number;
  status: 'active' | 'completed' | 'paused';
  image?: string;
  createdBy: string;
  updates: Array<{
    id: string;
    content: string;
    createdAt: string;
  }>;
  discussions: Array<{
    id: string;
    content: string;
    userId: string;
    replies: Array<{
      id: string;
      content: string;
      userId: string;
      createdAt: string;
    }>;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: 'civics' | 'laws' | 'rights' | 'constitution';
  region: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  quiz?: {
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
  estimatedTime: number;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface District {
  id: string;
  name: string;
  type: 'federal' | 'provincial' | 'municipal';
  region: string;
  active: boolean;
  statistics?: {
    totalOfficials: number;
    totalCampaigns: number;
    totalUsers: number;
  };
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
  message?: string;
}

// Request types
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  twoFactorCode?: string;
}

export interface RatingRequest {
  integrity: number;
  responsiveness: number;
  effectiveness: number;
  transparency: number;
  comment?: string;
  evidence?: string;
}

export interface CampaignRequest {
  title: string;
  description: string;
  category: string;
  district: string;
  goal: number;
  image?: string;
}

// Query filter types
export interface OfficialsFilters {
  page?: number;
  limit?: number;
  district?: string;
  sort?: string;
}

export interface CampaignsFilters {
  page?: number;
  limit?: number;
  status?: string;
  district?: string;
  category?: string;
}

export interface PromisesFilters {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  officialId?: string;
}

export interface LearningFilters {
  page?: number;
  limit?: number;
  category?: string;
  region?: string;
}
export interface DistrictFilters {
  page?: number;
  limit?: number;
  type?: string;
  active?: boolean;
  region?: string;
  district?: string;
  sort?: string;
}
