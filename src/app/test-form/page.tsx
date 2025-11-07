'use client';

import { EmailCaptureForm } from '@/components/shared/EmailCaptureForm';

export default function TestFormPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">EmailCaptureForm Variants Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Light Variant */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-charcoal">Light Variant (Default)</h2>
          <EmailCaptureForm source="test-light" variant="light" />
        </div>

        {/* Dark Variant */}
        <div className="bg-charcoal p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-white">Dark Variant</h2>
          <EmailCaptureForm source="test-dark" variant="dark" />
        </div>
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Real-world Examples</h2>
        
        {/* Footer Example */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Footer Newsletter (Dark Background)</h3>
          <div className="bg-charcoal p-8 rounded-xl">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <EmailCaptureForm source="footer-test" variant="dark" />
            </div>
          </div>
        </div>

        {/* CTA Section Example */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">CTA Section (Charcoal Background)</h3>
          <div className="bg-charcoal py-20 px-8 rounded-xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-white text-center mb-8">Join the Presale</h2>
              <EmailCaptureForm source="cta-test" variant="dark" />
            </div>
          </div>
        </div>

        {/* Light Background Example */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Light Background Example</h3>
          <div className="bg-stone py-20 px-8 rounded-xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-charcoal text-center mb-8">Stay Updated</h2>
              <EmailCaptureForm source="light-test" variant="light" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}