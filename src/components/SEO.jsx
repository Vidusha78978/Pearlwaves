import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, image, url }) {
  const siteName = 'Pearl Waves';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Web, App & Software Development Agency`;
  const defaultDescription = 'Partner with Pearl Waves for premium web development, custom software, and mobile app solutions. We bring your digital projects to life with cutting-edge technology and design.';
  const defaultKeywords = 'pearlwaves, pearl waves, pearlwaves.online, hire web developer, software development agency, mobile app developers, IT services, custom website design, web app development, tech solutions for business';
  const defaultImage = 'https://pearlwaves.online/logo.jpg';
  const currentUrl = url ? `https://pearlwaves.online${url}` : 'https://pearlwaves.online';

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
