import { supabase } from '../lib/supabase';

export const messageService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  update: async (id, messageData) => {
    const { data, error } = await supabase
      .from('contact_messages')
      .update(messageData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  delete: async (id) => {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  send: async (messageData) => {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([messageData])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  markAsRead: async (id) => {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};
