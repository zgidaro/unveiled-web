import { Label, PrimaryButton } from '@fluentui/react';
import React from 'react';
import { Share } from '../Icons/Share';
import { UnveiledLogo } from '../Icons/UnveiledLogo';
import { UserSignup } from '../Icons/UserSignup';
import { Wallet } from '../Icons/Wallet';

import './Home.scss';

export const Home = () => {
  return (
    <div className="home">
      <header>
        <UnveiledLogo height={24} fill="rgb(12, 5, 109)" />
        <PrimaryButton>Get Started</PrimaryButton>
      </header>
      <div className="home-container">
        <h1>The cool way to show off your NFTs.</h1>
        <div className="signup-steps">
          <div className="step">
            <UserSignup size={48} />
            <Label>Create an account</Label>
          </div>
          <div className="step">
            <Wallet size={48} />
            <Label>Connect your wallets</Label>
          </div>
          <div className="step">
            <Share size={48} />
            <Label>Add your unique URL to your social bios</Label>
          </div>
        </div>
      </div>
    </div>
  );
}