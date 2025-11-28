import React, { useState } from 'react';
import { faWhatsapp, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { Button } from './ui/button';
import QRCodeGenerator from './QRCodeGenerator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface ShareButtonProps {
  icon: import('@fortawesome/fontawesome-svg-core').IconDefinition;
  url: string;
  className: string;
  label: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ icon, url, className, label }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
      title={label}
    >
      <FontAwesomeIcon icon={icon} className={className} />
      <span className="text-xs text-gray-600">{label}</span>
    </a>
  );
};

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title = 'Confira este sorteio!',
  description = 'Participe do sorteio de times'
}) => {
  const [qrCodeOpen, setQrCodeOpen] = useState(false);

  // Usa a URL fornecida ou a URL atual da página
  const shareUrl = url || `https://${window.location.host}${window.location.pathname}`;
  const shareText = `${title} - ${description}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-center">
        <ShareButton
          icon={faWhatsapp}
          url={`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`}
          className="h-8 w-8 text-green-500"
          label="WhatsApp"
        />
        <ShareButton
          icon={faFacebook}
          url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          className="h-8 w-8 text-blue-600"
          label="Facebook"
        />
        <ShareButton
          icon={faTwitter}
          url={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
          className="h-8 w-8 text-blue-400"
          label="Twitter"
        />
        <ShareButton
          icon={faInstagram}
          url={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
          className="h-8 w-8 text-pink-500"
          label="Instagram"
        />

        {/* Botão QR Code */}
        <Dialog open={qrCodeOpen} onOpenChange={setQrCodeOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 p-3 h-auto"
            >
              <FontAwesomeIcon icon={faQrcode} className="h-8 w-8 text-purple-600" />
              <span className="text-xs text-gray-600">QR Code</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Compartilhar via QR Code</DialogTitle>
            </DialogHeader>
            <QRCodeGenerator
              url={shareUrl}
              title="Escaneie para acessar"
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* URL para copiar */}
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
        />
        <Button
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(shareUrl);
          }}
        >
          Copiar
        </Button>
      </div>
    </div>
  );
};

export default ShareButtons;