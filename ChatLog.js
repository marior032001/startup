import React from 'react';

function ChatLog({ chatLog }) {
  return (
    <div style={styles.chatBox}>
      <h2 style={styles.chatBoxHeader}>Chat Log</h2>
      <div style={styles.chatBoxContent}>
        {chatLog.length === 0 ? (
          <p style={styles.chatPlaceholder}>No submissions yet.</p>
        ) : (
          chatLog.map((log, index) => (
            <p key={index} style={styles.chatMessage}>
              {log}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  chatBox: {
    marginTop: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  chatBoxHeader: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#333',
  },
  chatBoxContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  chatMessage: {
    marginBottom: '5px',
    padding: '10px',
    backgroundColor: '#e6f7ff',
    borderRadius: '5px',
  },
  chatPlaceholder: {
    color: '#888',
    textAlign: 'center',
  },
};

export default ChatLog;
