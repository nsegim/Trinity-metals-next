'use client';
import Link from "next/link";
import { Container } from "react-bootstrap";
import { useTranslation} from "@/app/context/TranslationContext";

// export const metadata = {
//   title: "Cookie Policy",
//   description: "How we use cookies on this website.",
// };

export default function CookiePolicyPage() {
    const { dict, lang } = useTranslation();
  return (
    <Container className="cookie-policy-container py-5">
        <main className="cookie-policy-page">
            <h1>Cookie policy</h1>
            <p className="meta">Last updated: April 2026</p>

            <p>
                This policy explains what cookies are, which ones we use on this
                website, and how you can control them.
            </p>

            <hr />

            <h2>What are cookies?</h2>
            <p>
                Cookies are small text files stored on your device when you visit a
                website. They help the site remember information about your visit to
                make it work better or faster.
            </p>

            <hr />

            {/* <h2>What we collect and why</h2>
            <p>We only collect data through four touchpoints on this site:</p>

            <table className="cookie-table">
                <thead>
                <tr>
                    <th>Touchpoint</th>
                    <th>Data collected</th>
                    <th>Purpose</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Google Analytics</td>
                    <td>Pages visited, time on site, device type, approximate location</td>
                    <td>Understand how visitors use the site</td>
                    <td><span className="badge badge-blue">Analytics</span></td>
                </tr>
                <tr>
                    <td>Contact form</td>
                    <td>Name, email address, message</td>
                    <td>Respond to your enquiry</td>
                    <td><span className="badge badge-gray">Necessary</span></td>
                </tr>
                <tr>
                    <td>Newsletter subscription</td>
                    <td>Email address</td>
                    <td>Send you newsletter updates</td>
                    <td><span className="badge badge-gray">Necessary</span></td>
                </tr>
                <tr>
                    <td>Job application form</td>
                    <td>Name, email, CV, cover letter</td>
                    <td>Process your job application</td>
                    <td><span className="badge badge-gray">Necessary</span></td>
                </tr>
                </tbody>
            </table> */}

          

            <h2>Cookie categories</h2>

            <h3>Strictly necessary</h3>
            <p>
                These cookies are essential for the site to work and cannot be turned
                off. They are set only in response to actions you take — such as
                filling in a form or setting your preferences.
            </p>

            <h3>Analytics</h3>
            <p>
                We use Google Analytics to understand how visitors interact with our
                site. All data is anonymised and aggregated — we cannot identify
                individual visitors. These cookies are only placed if you give your
                consent.
            </p>

            <h3>Functional</h3>
            <p>
                These cookies remember your preferences across visits, such as your
                language setting and whether you have already subscribed to our
                newsletter.
            </p>

            <hr />

            <h2>Your choices</h2>
            <p>
                You can update your cookie preferences at any time by clicking
                &quot;Cookie preferences&quot; in the footer of any page. You can also clear
                all cookies through your browser settings — note this will reset
                your saved preferences.
            </p>

            <hr />

            <h2>Third-party services</h2>
            <p>
                We use Google Analytics, a service operated by Google LLC. Google
                may process and store data on servers outside your country. For more
                details, see{" "}
                <a
                
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                >
                Google&apos;s privacy policy
                </a>
                .
            </p>

            <hr />

            <h2>Changes to this policy</h2>
            <p>
                We may update this policy from time to time. Any changes will be
                posted on this page with an updated date at the top.
            </p>

            <hr />

            <h2>Contact us</h2>
            <p>
                If you have any questions about this cookie policy, please reach out
                via our <Link href={`/${lang}/contact-us`}>contact form</Link>.
            </p>
        </main>
    </Container>
    
  );
}