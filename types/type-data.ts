export interface UserData {
  id: string;
  email: string;
  name: string;
  password: string;
  errors?: { [key: string]: string };
}

export interface ContactData {
  id?: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  zipCode?: string;
}
export interface Category {
  label: string;
  value?: string;
}

export interface TaskData {
  title: string;
  description: string;
  contacts: ContactData[];
  category: string | Category;
  userId: string;
  dueDate: string;
  prio: string;
  status?: string;
}
