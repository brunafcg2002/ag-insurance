import Homepage from '../../frontend/components/Homepage.jsx';
import { pageMetadata } from '../../frontend/seo/metadata.js';

export const metadata = pageMetadata('pt');
export default function Page() {
  return <Homepage language="pt" />;
}
