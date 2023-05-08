export interface  House  {
  _id: string;
  email: string;
  pageTitle: string;
  pageSubtitle?: string;
  welcomeMessage?: string;
  backgroundImage?: string;
  backgroundImageRef?: string;
  multilingual: boolean;
  tab1: string;
  tab2: string;
  apartments: [string];
}
