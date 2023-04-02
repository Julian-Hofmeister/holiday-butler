export interface  Item  {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  img?: string;
  phoneLink?: string;
  mapsLink:string;
  websiteLink: string;
  linkText?: string;
  //-----------------
  kind: string;
  page: string;
  isLiked: boolean;
  embedded_map: any;
  apartment?: string;
  infoRows?: [{name: string; content: string}]
}
