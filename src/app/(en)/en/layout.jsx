import DocumentLayout from '../../../frontend/components/DocumentLayout.jsx';

export const viewport = { themeColor: '#013781' };
export default function Layout({ children }) {
  return <DocumentLayout language="en">{children}</DocumentLayout>;
}
