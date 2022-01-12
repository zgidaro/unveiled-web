import React from 'react';
import { Label } from '@fluentui/react';
import { Share } from '../Icons/Share';
import { UserSignup } from '../Icons/UserSignup';
import { Wallet } from '../Icons/Wallet';
import { useHome } from './hooks';
import { NFTPlaceholder } from './NFTPlaceholder/NFTPlaceholder';

import './Home.scss';

export const Home = () => {
  const { assets } = useHome();

  return (
    <div className="home">
      <h1>The cool way to show off your NFTs.</h1>
      <div className="signup-steps">
        <div className="step card">
          <UserSignup size={48} />
          <Label>Create an account</Label>
        </div>
        <div className="step card">
          <Wallet size={48} />
          <Label>Connect your wallets</Label>
        </div>
        <div className="step card">
          <Share size={48} />
          <Label>Add your unique URL to your social bios</Label>
        </div>
      </div>
      <h1 className="recent-nfts">Recent OpenSea NFTs</h1>
      <div className="opensea-nfts">
        {assets.map((a) => <NFTPlaceholder key={a.id} nft={{ name: a.name, image: a.image_url, description: a.name }} href={a.permalink} />)}
      </div>
    </div>
  );
}