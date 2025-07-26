<template>
  <div class="min-h-screen bg-gray-900 py-2 px-4 sm:px-6 lg:px-7">
    
      <div class="text-center mb-12">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-800 mb-6">
          <i class="fas fa-balance-scale text-2xl text-blue-400"></i>
        </div>
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          Privacy Policy
        </h2>
        <p class="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          We're here to help you with any questions about Nairobi Connect
        </p>
      </div>

      <div class="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div class="p-6 sm:p-8">
          <h3 class="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
            🛡️ Privacy Policy for Nairobi Connect
          </h3>
          
          <div class="prose prose-sm max-w-none text-gray-300">
            <p class="text-sm text-gray-400 mb-4">
              <strong>Effective Date:</strong> July 26, 2025<br>
              <strong>Last Updated:</strong> July 26, 2025
            </p>

            <h4 class="text-lg font-semibold text-blue-400 mt-6 mb-3">1. Introduction</h4>
            <p>
              Nairobi Connect ("we", "our", or "us") is committed to protecting your privacy in compliance with Google Play Store policies and applicable data protection regulations. This Privacy Policy explains how our app handles user information when you use our services via the Nairobi Connect mobile application.
            </p>

            <h4 class="text-lg font-semibold text-blue-400 mt-6 mb-3">2. Information We Collect</h4>
            <p>
              We do not collect personal information unless required to provide specific features of the app. When you use Nairobi Connect, the following data may be accessed locally or temporarily, but not stored or shared:
            </p>
            <ul class="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Location Data:</strong> Used to show nearby routes, traffic, and boda availability. Your precise location is only used within the app for navigation and is not stored on our servers.
              </li>
              <li>
                <strong>Chat Content:</strong> Messages shared via the Live Chat Feed are temporarily stored and automatically deleted after 24 hours. We do not use or share your chat data for analytics or advertising.
              </li>
              <li>
                <strong>Device Permissions:</strong> Location for route planning, Network Access to fetch live data, and Storage only if you upload content voluntarily (future feature).
              </li>
            </ul>

            <h4 class="text-lg font-semibold text-blue-400 mt-6 mb-3">3. How We Use Your Information</h4>
            <ul class="list-disc pl-5 space-y-2">
              <li>To display real-time traffic and public user reports</li>
              <li>To allow communication within the app (chat)</li>
              <li>To personalize your experience based on location</li>
            </ul>
            <p class="mt-2">
              We do not sell or share any personal information with third-party advertisers or analytics platforms in compliance with Google Play Store requirements.
            </p>

            <h4 class="text-lg font-semibold text-blue-400 mt-6 mb-3">4. Data Security</h4>
            <p>
              We implement appropriate technical and organizational measures to protect user data, including standard encryption practices to protect data in transit. No personal data is permanently stored or exposed.
            </p>

            <h4 class="text-lg font-semibold text-blue-400 mt-6 mb-3">5. User-Generated Content</h4>
            <p>
              Users are responsible for the content they post in the live chat. Inappropriate or harmful content may be flagged and removed in accordance with our content moderation policies. Chat messages are automatically deleted after 24 hours.
            </p>

            <h4 class="text-lg font-semibold text-blue-400 mt-6 mb-3">6. Children's Privacy</h4>
            <p>
              Nairobi Connect is not intended for children under the age of 13. We do not knowingly collect personal data from children in compliance with COPPA regulations.
            </p>

            <h4 class="text-lg font-semibold text-blue-400 mt-6 mb-3">7. Third-Party Services</h4>
            <p>
              We currently do not integrate third-party SDKs for ads, analytics, or monetization. If future versions of the app do so, this policy will be updated accordingly with proper disclosures as required by Google Play policies.
            </p>

            <h4 class="text-lg font-semibold text-blue-400 mt-6 mb-3">8. Your Rights & Choices</h4>
            <p>
              You can:
            </p>
            <ul class="list-disc pl-5 space-y-2 mt-2">
              <li>Turn off location access at any time from your device settings</li>
              <li>Use the app anonymously without creating an account (guest mode)</li>
              <li>Request deletion of any data associated with your usage</li>
            </ul>

            <h4 class="text-lg font-semibold text-blue-400 mt-6 mb-3">9. Policy Changes</h4>
            <p>
              We may update this Privacy Policy as the app evolves. Changes will be posted here with an updated date. Continued use of the app constitutes acceptance of the updated policy.
            </p>

            <h4 class="text-lg font-semibold text-blue-400 mt-6 mb-3">10. Contact Us</h4>
            <p>
              If you have any questions about this policy or wish to exercise your data protection rights, please contact:
            </p>
            <p class="mt-2 bg-gray-700 p-3 rounded inline-block">
              Samwel Monda<br>
              📧 Email: <a href="mailto:samwelmonda48@gmail.com" class="text-blue-400 hover:text-blue-300">samwelmonda48@gmail.com</a>
            </p>

            <div class="mt-8 p-4 bg-gray-700 rounded-lg">
              <p class="text-sm text-gray-300">
                <strong>Compliance Note:</strong> Nairobi Connect complies with all applicable Google Play Store policies regarding user data collection, privacy, and security. Our app only requests permissions necessary for core functionality and provides clear information about data usage.
              </p>
            </div>
          </div>
        </div>
      </div>
    
  </div>
</template>

<script>
export default {
  name: 'privacypolicy',
  props: ['searchQuery']
}
</script>

<style scoped>
.prose ul {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.prose li {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
a {
  transition: color 0.2s ease;
}
</style>