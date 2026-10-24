# Website privacy notice

Updated 24 October 2026. The PT/EN visitor notices in `translations.js` describes the deployed static site rather than an assumed future email backend.

## Verified technical behaviour

- The default configuration disables form sending. The previous local email draft/clipboard form flow was removed. Cloudflare/Resend delivery is implemented but inactive until explicitly enabled and configured. When enabled, the form sends a POST request to the Worker, which verifies Turnstile and forwards one email through Resend. No analytics or client storage has been added.
- The form does not use the clipboard or open the email application; direct contact links can still open an external email application.
- Telephone and email links open external applications. A message sent by email is a separate communication received by the business, not an automatic form submission.
- GitHub Pages hosts the site and logs visitor IP addresses for security. OpenStreetMap and Esri receive technical data when their map tiles load; no device geolocation is requested.
- The language choice uses distinct static page URLs (legacy `?lang=pt` and `?lang=en` are supported), without cookies or browser storage.
- Site photographs, fonts, logos, and Leaflet code are local. Google Maps and Zurich are external links.

## Owner details still to confirm

The notice is explicitly marked as a version under review. Each unknown value is shown as the literal `[PlaceHolder]` followed by its purpose. These are visible in the public dialog and are not verified business facts. Replace the fields and remove the review note once the company has confirmed the content.

| Field in the notice | Confirmation needed |
| --- | --- |
| Legal controller | Full legal name of the entity behind the trading name. |
| Registered office | Confirm the legal seat; the known office remains the correspondence address. |
| Data protection officer | Confirm whether one is designated; enter contact details if so, otherwise replace with an accurate statement or omit this paragraph. This field does not imply a DPO is mandatory. |
| Business email provider | Provider and privacy policy. |
| Recipients | Actual authorised staff/service categories and any insurer disclosures. |
| International transfers | Relevant contracted services, countries/situations, applicable safeguards and how to obtain details. Do not invent a transfer mechanism. |
| Enquiries without a contract | Actual retention period or concrete criteria and starting point. |
| Proposals/contracts | Applicable retention periods/criteria and legal duties, aligned with the separate insurance privacy information. |
| Security and access | Measures actually implemented for business email and enquiry handling. |

The notice keeps verified website behaviour separate from unconfirmed business practices. The legal bases for proposal enquiries and other communications are a proposed framework for company review, not a legal compliance certification. The company should validate the legitimate-interest assessment and the law applicable to its insurance activity. Do not invent a NIF, fixed retention period, processor contract, or security measure.

If a sending service is configured later, update the form notice and privacy policy to identify that service, the data flow, relevant recipients/transfers, and retention before enabling it. The mailto handoff does not enable server-side email submission.

## Sources consulted

- [European Commission: information individuals must receive](https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en)
- [CNPD: rights](https://www.cnpd.pt/cidadaos/direitos/)
- [CNPD: legal bases and consent](https://www.cnpd.pt/organizacoes/areas-tematicas/consentimento/)
- [CNPD: cookies](https://www.cnpd.pt/media/x2zdus50/nota-informativa-cnpd_cookies_20210625.pdf)
- [GitHub Pages: visitor data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [GitHub privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [OpenStreetMap Foundation privacy policy](https://osmfoundation.org/wiki/Privacy_Policy)
- [Esri privacy statement](https://www.esri.com/en-us/privacy/privacy-statements/privacy-statement)

The new optional delivery mode is described conditionally in both policies. Cloudflare hosts the endpoint and provides Turnstile verification; Resend processes the message for delivery. See [delivery notes](contact-delivery.md). Provider agreements, safeguards, retention and the existing company placeholders still require company confirmation before activation.
