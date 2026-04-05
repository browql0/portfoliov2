import { supabase } from '../lib/supabase';

export const projectService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  create: async (projectData) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  update: async (id, projectData) => {
    const { data, error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  delete: async (id) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  uploadImage: async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `screenshots/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-screenshots')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('project-screenshots')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  deleteScreenshot: async (url) => {
    // Extraire le chemin relatif de l'URL publique
    // Exemple d'URL : https://xxx.supabase.co/storage/v1/object/public/project-screenshots/screenshots/0.123.png
    const path = url.split('project-screenshots/')[1];
    if (!path) return;

    const { error } = await supabase.storage
      .from('project-screenshots')
      .remove([path]);
    
    if (error) throw error;
  }
};
