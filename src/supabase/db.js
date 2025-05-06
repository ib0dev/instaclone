import { supabase } from './config';

export const postsTable = 'posts';

export async function addDoc(table, data) {
  const { error } = await supabase.from(table).insert(data);
  if (error) throw error;
}

export async function getDocs(table) {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return { docs: data };
}

export async function updateDoc(table, id, updates) {
  const { error } = await supabase.from(table).update(updates).eq('id', id);
  if (error) throw error;
}

export async function deleteDoc(table, id) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

export { supabase };