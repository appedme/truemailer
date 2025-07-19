import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">TrueMailer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LoginLink className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Sign in
              </LoginLink>
              <RegisterLink className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Get Started
              </RegisterLink>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Email Verification</span>
            <span className="block text-blue-600">Made Simple</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Detect temporary, disposable, and invalid email addresses with our powerful API. 
            Protect your platform from fake signups and improve your email deliverability.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <RegisterLink className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors">
                Start Free Trial
              </RegisterLink>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="#features"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Powerful Email Validation Features
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to ensure email quality and protect your platform
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-blue-500 rounded-md flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🛡️</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Temp Email Detection</h3>
                <p className="mt-2 text-base text-gray-500">
                  Identify and block temporary email addresses from popular disposable email providers.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-green-500 rounded-md flex items-center justify-center mb-4">
                  <span className="text-white text-xl">✅</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Syntax Validation</h3>
                <p className="mt-2 text-base text-gray-500">
                  Verify email format and syntax according to RFC standards.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-purple-500 rounded-md flex items-center justify-center mb-4">
                  <span className="text-white text-xl">📫</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Mailbox Verification</h3>
                <p className="mt-2 text-base text-gray-500">
                  Check if the email address actually exists and can receive emails.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-md flex items-center justify-center mb-4">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Fast API</h3>
                <p className="mt-2 text-base text-gray-500">
                  Lightning-fast response times with global CDN and optimized infrastructure.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-red-500 rounded-md flex items-center justify-center mb-4">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Analytics Dashboard</h3>
                <p className="mt-2 text-base text-gray-500">
                  Track usage, monitor validation results, and manage your API keys.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-12 h-12 bg-indigo-500 rounded-md flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🔧</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Easy Integration</h3>
                <p className="mt-2 text-base text-gray-500">
                  Simple REST API with SDKs for popular programming languages.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-blue-600 rounded-lg shadow-xl">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Join thousands of developers who trust TrueMailer for email validation.
              </p>
              <div className="mt-8">
                <RegisterLink className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors">
                  Start Your Free Trial
                </RegisterLink>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}