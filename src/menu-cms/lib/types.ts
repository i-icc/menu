export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  image: string;
  steps: string[];
  tags: Tag[];
};

export type Tag = {
  id: string;
  title: string;
  description: string;
}

export type MenuItemFormData = Omit<MenuItem, 'id' | 'tags'> & {
  tags: string[];
  imageFile?: File;
};