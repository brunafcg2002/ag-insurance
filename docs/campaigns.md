# Zurich campaign research

Checked on **23 October 2026** against live official Zurich Portugal pages. Two independent research agents checked the offers, dates, conditions, and distribution context. The example expiry in the conversation was illustrative and was not used.

| Card | Benefit and requirements | Period | Official source |
| --- | --- | --- | --- |
| Zurich Lar Flex | Up to 15% for new contracts: 5% for Z4U registration, 5% for direct debit, plus 5% for Zurich Auto customers. | 01/01/2026–31/12/2026 | [Zurich Lar Flex](https://www.zurich.com.pt/pt-pt/particulares/habitacao/lar-flex) |
| Zurich Auto Ligeiros e Comerciais | Up to 10%: 5% for Z4U registration and 5% for payment by debit from a bank account. | 18/02/2026–31/12/2026 | [Zurich Auto](https://www.zurich.com.pt/pt-pt/particulares/automovel/automovel) |
| Zurich Saúde, Option 3 | First two monthly payments of the first annual period free, exclusively with monthly instalments. Additional WHOOP wristband and 12-month WHOOP subscription for customers aged 30–55. | 01/10/2026–31/12/2026 | [Zurich Saúde](https://www.zurich.com.pt/pt-pt/particulares/saude/zurich-saude) |

## Distribution and scope

All three official pages direct visitors to mediators; Lar Flex includes that link beside the offer terms. No online-only restriction was found, nor a separate campaign regulation. Public pages do not independently confirm this agency's individual eligibility. Cards identify these as Zurich campaigns, do not claim agency exclusivity, and do not promise every visitor a discount. The dialog links to the official offer and leads to the agency contact form to discuss the matching insurance category.

The previous indexed health offer at `/pt-pt/particulares/saude/campanha-saude` offered the 12th and 24th monthly payments for policies issued from 27 April to 31 July 2026. It is expired and that URL returned 404 during verification. It must not be confused with the current October campaign on the product page.

Insurance coverage remains subject to the product's contractual and pre-contractual information. The site does not calculate premiums or submit applications.

## Maintenance

The offers and dates are static. Review before **31 December 2026** and replace or remove expired offers. Card markup lives in `src/frontend/components/Homepage.jsx`; dialog conditions, source URLs, and contact categories live in `campaigns` in `src/frontend/interactions/site-interactions.js`. Only the photographs referenced by the final site are retained under `assets/images/`; unused originals and the source PDF were removed during pre-commit cleanup.
