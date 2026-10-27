import Homepage from '../../../frontend/components/Homepage.jsx';
import { pageMetadata } from '../../../frontend/seo/metadata.js';

export const metadata = pageMetadata('en');
export default function Page() {
  return <Homepage language="en" />;
}
