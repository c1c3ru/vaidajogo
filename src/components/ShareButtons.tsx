import React from 'react';
import { faWhatsapp, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ShareButtonProps {
  icon: import('@fortawesome/fontawesome-svg-core').IconDefinition;
  url: string;
  className: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ icon, url, className }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={icon} className={className} />
    </a>
  );
};

import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const ShareButtons: React.FC = () => {
  const shareUrl = 'https://www.example.com/sorteio';

  return (
    <div className="flex gap-4">
      <ShareButton
        icon={faWhatsapp}
        url={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
        className="h-6 w-6 text-green-500"
      />
      <ShareButton
        icon={faFacebook}
        url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        className="h-6 w-6 text-blue-600"
      />
      <ShareButton
        icon={faTwitter}
        url={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
        className="h-6 w-6 text-blue-400"
      />
      <ShareButton
        icon={faInstagram}
        url={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
        className="h-6 w-6 text-pink-500"
      />
    </div>
  );
};

export default ShareButtons;