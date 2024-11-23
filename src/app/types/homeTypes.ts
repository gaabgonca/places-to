export interface HomeProps {
  parks: Park[];
}

export interface Park {
  parkName: string;
  city: string;
  country: string;
  notableFeature: string;
  latitude: string;
  longitude: string;
  locationLink: string;
  description: string;
  submittedByLink: string;
  submittedByHandle: string;
  suggestedBook: string;
  suggestedBookLink: string;
  id?: string;
  safety?: string;
}