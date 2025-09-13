export interface Memory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  date: string;
  people: string[];
  tags: string[];
}

