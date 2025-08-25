import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords, children }) => {
  return (
    <Helmet>
      <title>{title ? `${title} | Kasa` : 'Kasa - Trouvez le logement de vos rêves'}</title>
      <meta 
        name="description" 
        content={description || 'Découvrez des milliers de logements uniques pour votre prochain voyage. Kasa vous met en relation avec des hôtes de confiance.'} 
      />
      {keywords && <meta name="keywords" content={keywords} />}
      {children}
    </Helmet>
  );
};

export default Meta;
