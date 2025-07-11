import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import CreatePromoForm from './CreatePromoForm';
import { PromoFormData } from '../../core/CreatePromo/api/data';
import {createPromoFactory} from "../../factory/createPromoFactory.ts";
import {DASHBOARD_ROUTE} from "../../core/Common/constants.ts";
import {AppRoute} from "../../App.tsx";


interface CreatePromoPageProps {
  redirectUser: (destination: AppRoute, error?: string) => void;

}

const createPromo = createPromoFactory();

const CreatePromoPage: React.FC<CreatePromoPageProps> = ({redirectUser}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (formData: PromoFormData) => {
    setIsLoading(true);
    setError(null);
    createPromo.create(formData).subscribe((redirection) => {
      setIsLoading(false);
      redirectUser(redirection.path as AppRoute);
    })
  };

  const navigateToDashboard = () => {
    // Navigate to dashboard using redirectUser
    redirectUser(DASHBOARD_ROUTE);
  };

  const handleGoBack = () => {
    // Navigate back to dashboard instead of previous page
    navigateToDashboard();
  };

  const handleCancel = () => {
    // Always navigate to dashboard on cancel
    navigateToDashboard();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-[#A0A0A8]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">Create New Promo</h1>
            <p className="text-sm text-[#A0A0A8]">Design your promotional campaign</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <CreatePromoForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          onCancel={handleCancel}
          redirectUser={redirectUser}
        />
      </main>
    </div>
  );
};

export default CreatePromoPage;