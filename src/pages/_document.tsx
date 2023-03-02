import Document, { Head, Html, Main, NextScript } from 'next/document';

import { AppConfig } from '@/utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale} data-theme="lofi">
        <Head />
        <body className="overflow-x-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
