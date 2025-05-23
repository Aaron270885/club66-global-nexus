
import React from "react";
import Layout from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-club66-purple">
          Terms of Use
        </h1>
        
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p className="text-gray-500">Last updated: May 23, 2025</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Club66 website, mobile application, or any Club66 services, you agree to be bound by these Terms of Use. If you do not agree to all of these terms, you may not access or use our services.
          </p>
          
          <h2>2. Membership</h2>
          <p>
            Club66 offers different membership tiers with varying benefits as described on our website. By purchasing a membership, you agree to:
          </p>
          <ul>
            <li>Provide accurate and complete information during registration</li>
            <li>Pay all fees associated with your chosen membership tier</li>
            <li>Maintain the security of your account credentials</li>
            <li>Accept that memberships are valid for one year and subject to renewal</li>
          </ul>
          
          <h2>3. Payment Terms</h2>
          <p>
            Membership fees consist of an annual registration fee and monthly subscription fees as specified for your membership tier. You authorize Club66 to charge the payment method you provide for these fees.
          </p>
          <p>
            Monthly fees will be automatically charged on the same day each month. Failure to pay monthly fees may result in suspension of membership benefits until payment is made.
          </p>
          
          <h2>4. Membership Card</h2>
          <p>
            Your digital membership card is personal to you and may not be transferred or shared with others. Any misuse of the membership card may result in termination of your membership without refund.
          </p>
          
          <h2>5. Discounts and Benefits</h2>
          <p>
            Discounts offered through Club66 are subject to the terms set by each participating merchant. Club66 does not guarantee the availability of specific discounts and reserves the right to modify the discount program at any time.
          </p>
          
          <h2>6. Intellectual Property</h2>
          <p>
            All content on Club66 platforms, including but not limited to text, graphics, logos, and software, is the property of Club66 or its content suppliers and protected by intellectual property laws.
          </p>
          
          <h2>7. Limitation of Liability</h2>
          <p>
            Club66 shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
          </p>
          
          <h2>8. Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance with the laws of Mali, without regard to its conflict of law provisions.
          </p>
          
          <h2>9. Changes to Terms</h2>
          <p>
            Club66 reserves the right to modify these Terms of Use at any time. We will notify members of significant changes via email or through our website.
          </p>
          
          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Use, please contact us at:
          </p>
          <p>
            Email: legal@club66global.com<br />
            Phone: +223 78 00 00 00<br />
            Address: 123 Main Street, Bamako, Mali
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
