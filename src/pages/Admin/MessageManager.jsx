import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, Trash2, Calendar, User, Search, UserCircle } from 'lucide-react';
import { messageService } from '../../services/messageService';
import styles from './Admin.module.css';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      const data = await messageService.getAll();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id, currentStatus) => {
    try {
      await messageService.markAsRead(id, !currentStatus);
      const updatedMessages = messages.map(m => m.id === id ? { ...m, is_read: !currentStatus } : m);
      setMessages(updatedMessages);
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: !currentStatus });
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour.');
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Supprimer ce message définitivement ?')) {
      try {
        await messageService.delete(id);
        setMessages(messages.filter(m => m.id !== id));
        if (selectedMessage && selectedMessage.id === id) setSelectedMessage(null);
      } catch (error) {
        alert('Erreur lors de la suppression.');
      }
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Chargement de la messagerie...</div>;

  return (
    <div className={styles.messageManager}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Messagerie</h1>
          <p className={styles.subtitle}>
            {messages.filter(m => !m.is_read).length} nouveau(x) message(s) non lu(s)
          </p>
        </div>
      </header>

      <div className={styles.formGrid}>
        {/* Liste des messages */}
        <div className={styles.formSection}>
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Rechercher un message..." 
              className={styles.input} 
              style={{ paddingLeft: '3rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.card} style={{ padding: 0 }}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Expéditeur</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
                        Aucun message trouvé
                      </td>
                    </tr>
                  ) : (
                    filteredMessages.map((msg) => (
                      <tr 
                        key={msg.id} 
                        onClick={() => setSelectedMessage(msg)}
                        style={{ cursor: 'pointer', background: selectedMessage?.id === msg.id ? 'rgba(59, 130, 246, 0.05)' : 'transparent' }}
                      >
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ color: msg.is_read ? 'var(--admin-text-secondary)' : 'var(--admin-accent)' }}>
                              {msg.is_read ? <MailOpen size={18} /> : <Mail size={18} />}
                            </div>
                            <div>
                              <div style={{ fontWeight: msg.is_read ? '500' : '700', fontSize: '0.9rem' }}>{msg.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {msg.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>
                          {new Date(msg.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button 
                            onClick={(e) => handleDelete(e, msg.id)}
                            className={`${styles.btn} ${styles.btnDanger}`}
                            style={{ padding: '0.4rem' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Aperçu du message */}
        <div className={styles.formSection}>
          {selectedMessage ? (
            <div className={`${styles.card} ${styles.glassCard}`} style={{ position: 'sticky', top: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-accent)' }}>
                    <UserCircle size={24} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{selectedMessage.name}</h3>
                    <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>{selectedMessage.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleToggleRead(selectedMessage.id, selectedMessage.is_read)}
                  className={styles.btnSecondary}
                  style={{ padding: '0.5rem', borderRadius: '8px' }}
                >
                  {selectedMessage.is_read ? <Mail size={18} /> : <MailOpen size={18} />}
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--admin-border)', minHeight: '200px', lineHeight: '1.6', fontSize: '1rem', color: '#e0e0e0' }}>
                {selectedMessage.message}
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--admin-text-secondary)', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={14} />
                  Reçu le {new Date(selectedMessage.created_at).toLocaleString()}
                </div>
                <a href={`mailto:${selectedMessage.email}`} className={`${styles.btn} ${styles.btnPrimary}`}>
                  Répondre
                </a>
              </div>
            </div>
          ) : (
            <div className={styles.card} style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.2, borderStyle: 'dashed' }}>
              <Mail size={64} strokeWidth={1} style={{ marginBottom: '1rem' }} />
              <p>Sélectionnez un message pour le lire</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageManager;
