// Định nghĩa các kiểu dữ liệu cho cơ sở dữ liệu

// Kiểu dữ liệu cho danh mục hiện vật
export interface Category {
    id: string
    name: string
    description?: string
    createdAt: Date
    updatedAt: Date
  }
  
  // Kiểu dữ liệu cho thời kỳ lịch sử
  export interface Period {
    id: string
    name: string
    startYear?: number
    endYear?: number
    description?: string
    createdAt: Date
    updatedAt: Date
  }
  
  // Kiểu dữ liệu cho khu vực trưng bày
  export interface Location {
    id: string
    name: string
    floor?: number
    building?: string
    description?: string
    mapCoordinates?: string
    createdAt: Date
    updatedAt: Date
  }
  
  // Kiểu dữ liệu cho hiện vật
  export interface Artifact {
    id: number
    code: string
    name: string
    description: string
    year?: number
    categoryId?: string
    periodId?: string
    locationId?: string
    acquisitionDate?: Date
    condition?: string
    material?: string
    dimensions?: string
    weight?: string
    origin?: string
    historicalSignificance?: string
    hasAudio: boolean
    isFeatured: boolean
    createdAt: Date
    updatedAt: Date
  
    // Các trường quan hệ (sẽ được điền sau khi truy vấn)
    category?: Category
    period?: Period
    location?: Location
    images?: ArtifactImage[]
    audio?: ArtifactAudio[]
    relatedArtifacts?: Artifact[]
    tags?: Tag[]
  }
  
  // Kiểu dữ liệu cho hình ảnh hiện vật
  export interface ArtifactImage {
    id: number
    artifactId: number
    imageUrl: string
    caption?: string
    isPrimary: boolean
    displayOrder: number
    createdAt: Date
  }
  
  // Kiểu dữ liệu cho file âm thanh
  export interface ArtifactAudio {
    id: number
    artifactId: number
    audioUrl: string
    duration?: number
    language: string
    transcript?: string
    createdAt: Date
  }
  
  // Kiểu dữ liệu cho mối quan hệ giữa các hiện vật
  export interface ArtifactRelation {
    id: number
    artifactId: number
    relatedArtifactId: number
    relationType?: string
    createdAt: Date
  }
  
  // Kiểu dữ liệu cho tương tác với hiện vật
  export interface ArtifactInteraction {
    id: number
    artifactId: number
    userId?: number
    interactionType: "view" | "like" | "favorite"
    createdAt: Date
  }
  
  // Kiểu dữ liệu cho bình luận và đánh giá
  export interface ArtifactComment {
    id: number
    artifactId: number
    userId: number
    comment?: string
    rating?: number
    isApproved: boolean
    createdAt: Date
  }
  
  // Kiểu dữ liệu cho từ khóa
  export interface Tag {
    id: number
    name: string
    createdAt: Date
  }
  
  // Kiểu dữ liệu cho hiện vật nổi bật
  export interface FeaturedArtifact {
    id: number
    artifactId: number
    featureDate: Date
    featureText?: string
    createdAt: Date
    artifact?: Artifact
  }
  
  