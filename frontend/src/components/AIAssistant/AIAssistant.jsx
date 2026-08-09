import React from 'react';
import Container from '../../components/Container/Container';
import PageHeader from '../../components/PageHeader/PageHeader';
import AIAssistantPanel from '../../components/AIAssistantPanel/AIAssistantPanel';
import styles from './AIAssistant.module.css';

const AIAssistant = () => {
  return (
    <div className={styles.aiPage}>
      <PageHeader
        title="AI Assistant"
        subtitle="Ask anything about buying, selling or trading vehicles."
        breadcrumbs={[{ label: 'AI Concierge' }]}
      />

      <Container className={styles.containerPadding}>
        <AIAssistantPanel storageKey="rainbowTraders.aiAssistant.v1" showQuickActions />
      </Container>
    </div>
  );
};

export default AIAssistant;
