import { createContactHandler } from '../../../backend/contact/composition.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function contact(request) {
  return createContactHandler({ env: process.env })(request);
}

export { contact as GET, contact as POST, contact as OPTIONS };
