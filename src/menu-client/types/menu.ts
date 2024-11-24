export type MenuItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  steps: string[];
  tags: Tag[];
};

export type Tag = {
  id: string;
  title: string;
  description: string;
}