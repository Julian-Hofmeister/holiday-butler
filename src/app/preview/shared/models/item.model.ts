export interface Item  {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  img?: string;
  imgRef?: string;
  phoneLink?: string;
  mapsLink?:string;
  websiteLink?: string;
  // customBtnText?: string;
  standOutBtn?: 'phone' | 'maps' | 'website' | 'undefined';
  //-----------------
  kind: string;
  page: string;
  isLiked?: boolean;
  embedded_map?: any;
  apartments?: [string] | null;
  infoRows?: [{name: string; content: string}] | null;
}
