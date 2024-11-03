export interface SeoModel {
    meta_title: string;
    og_title: string;
    og_url: string;
    og_image?: string;
    og_image_height?: number;
    og_image_width?: number;
    meta_description: string;
    og_type: string;
  }


export interface RemoveType {
    acknowledge: boolean;
    deletedCount: number;
}