export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Truemailer",
    "applicationCategory": "DeveloperApplication",
    "description": "Fast, reliable email validation API built with Hono and deployed on Cloudflare Workers. Validate emails in real-time, detect disposable addresses, and prevent spam.",
    "url": "https://truemailer.io",
    "author": {
      "@type": "Person",
      "name": "Shaswat Raj",
      "url": "https://sh20raj.github.io"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Truemailer"
    },
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free email validation API with no authentication required"
    },
    "featureList": [
      "RFC-compliant email syntax validation",
      "Domain and MX record verification",
      "Disposable email detection",
      "Spam score calculation",
      "Edge-deployed for fast response times",
      "No authentication required",
      "REST API interface"
    ],
    "screenshot": "https://truemailer.io/screenshot.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
