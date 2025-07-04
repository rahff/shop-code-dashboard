import React, { useEffect, useState } from 'react';
import { QrCode } from 'lucide-react';
import { useAuth } from 'react-oidc-context';
import {getAuthentication} from "../../functions.ts";
import {AppRoute} from "../../App.tsx";
import {Authentication} from "../../core/Model/Authentication.ts";

interface RefreshSessionComponentProps {
  redirectUser: (destination: AppRoute, error?: string) => void;
  onAuthentication: (authentication: Authentication) => void;
}

const RefreshSessionComponent: React.FC<RefreshSessionComponentProps> = ({ redirectUser, onAuthentication }) => {
  const [loadingText, setLoadingText] = useState('Refreshing session...');
  const auth = useAuth();
  useEffect(() => {
    const refreshSession = () => {
    setLoadingText('Refreshing authentication...');
    auth.signinSilent().then((user) => {
      if(user){
        const authentication: Authentication = getAuthentication(user)!;
        onAuthentication(authentication);
        setLoadingText('Session refreshed successfully...');
        // Small delay for UX, then redirect to bootstrap
        setTimeout(() => {
          redirectUser('bootstrap');
        }, 100);
        return;
      }else {
        redirectUser('bootstrap')
      }
    }).catch((error) => {
        console.error("Session refresh failed:", error);
        setLoadingText('Session refresh failed...');
        setTimeout(() => {
          redirectUser('bootstrap');
        }, 100);
      })
    };
    refreshSession();
  }, [redirectUser, onAuthentication]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C63FF] to-[#5845E9] flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl">
            <QrCode className="w-12 h-12 text-[#6C63FF]" />
          </div>
          <h1 className="text-4xl font-bold text-white font-['Inter'] mb-2">Shop-Code</h1>
          <p className="text-white/80 text-lg">Dashboard</p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          
          <p className="text-white/90 text-lg font-medium">{loadingText}</p>
          
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse" style={{ 
              animation: 'progress 2s ease-in-out infinite',
              width: '60%'
            }}></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default RefreshSessionComponent;